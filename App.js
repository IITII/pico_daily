/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/12/26
 */
'use strict'

const config = require('./config/config.js')
const logger = require('./config/log4js.js')
const {list_by_user, list_with_top, comment_create_axios} = require('./libs/pico.js')
const dayjs = require('dayjs')
const {sleep} = require('./libs/utils.js')
const {get_cache, flush_cache} = require('./libs/cache.js')

async function main(filter = /^\d+月\d+日每日一题领积分/) {
  logger.info('Start to run...')
  let posts, today, item_id, post_detail, comments, comment_detail, comment_res, random_sleep
  today = `${dayjs().month() + 1}月${dayjs().date()}日`
  if (get_cache() === today) {
    logger.info('Already done today.')
    return
  }
  for (const cookie of config.cookies) {
    random_sleep = Math.floor(Math.random() * 1000 * 60 * config.random_wait)
    logger.info(`Sleep ${random_sleep / 1000} seconds before next request`)
    await sleep(random_sleep)
    logger.info(`Start to run with cookie: ${cookie}`)
    posts = await list_by_user(cookie)
    posts = posts.data
    posts = posts.map(p => {
      let name = p.content.name
      name = name.replace(/[\[\]()+*.\\/\-—–?${}@!&\n\r~`|=#…%;；:：'"<>。，,《》【】「」、！￥（）～]/g, '')
      name = name.replace(/\s/g, '')
      return {...p, post_format_name: name}
    })
      .filter(p => {
        let {post_format_name} = p
        return post_format_name.match(filter) !== null
      })
    logger.info(`Got ${posts.length} posts, filter today: ${today}...`)
    logger.debug(posts)
    posts = posts.filter(p => p.post_format_name.includes(today))
    if (posts.length === 0) {
      logger.info('No post today, skip...')
    } else {
      if (posts.length > 1) {
        logger.warn(`Got more than one post, ues first as default...`, posts)
      }
      posts = posts[0]
      item_id = posts.content.item_id
      logger.debug(`Post detail:`, posts)
      logger.info(`Start to run with post: ${item_id} ${posts.content.name}`)
      // post_detail = await get_post(cookie, item_id)
      comments = await list_with_top(cookie, item_id)
      logger.info(`Got ${comments.data.length} comments, using first as default...`)
      if (comments.data.length === 0) {
        logger.error('No comment today, skip...', comments)
      }
      comments = comments.data[0]
      comment_detail = comments.comment.content
      logger.info(`Got comment: ${comment_detail} for post: ${item_id} ${posts.content.name}`)
      comment_res = await comment_create_axios(cookie, item_id, comment_detail)
      logger.info(`Commented: ${comment_detail} for post: ${item_id} ${posts.content.name}`)
      logger.debug(`Comment result:`, comment_res)
      flush_cache(today)
      logger.info(`Flush cache: ${today}`)
    }
  }
}

main().catch(e => {
  logger.error(e.stack)
  logger.debug(e)
})
