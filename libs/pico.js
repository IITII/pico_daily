/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/12/26
 */
'use strict'

const cloudscraper = require('cloudscraper')
const config = require('../config/config.js')
const {axios} = require('./axios_client.js')

async function list_by_user(cookies, user_id = '251594') {
  return cloudscraper({
    method: 'POST',
    uri: 'https://bbs.picoxr.com/ttarch/api/content/v1/content/list_by_user?app_id=264482&service_id=0&lang=zh-Hans-CN&web_id=7179264044305303101',
    formData: {'cursor': '', user_id, 'item_type': '2'},
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
  })
    .then(_ => JSON.parse(_))
}

async function get_post(cookies, item_id = '7179481239827513402') {
  return cloudscraper({
    method: 'get',
    uri: `https://bbs.picoxr.com/ttarch/api/content/v1/content/get?app_id=264482&item_id=${item_id}&item_type=2&service_id=0&lang=zh-Hans-CN&web_id=7179264044305303101`,
    // uri: `https://bbs.picoxr.com/ttarch/api/content/v1/content/get?app_id=264482&item_id=7179481239827513402&item_type=2&service_id=0&lang=zh-Hans-CN&web_id=7179264044305303101`,
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
  })
    .then(_ => JSON.parse(_))
}

async function list_with_top(cookies, item_id = '7179481239827513402') {
  return cloudscraper({
    method: 'get',
    uri: `https://bbs.picoxr.com/ttarch/api/interact/v1/comment/list_with_top?app_id=264482&page_size=10&item_id=${item_id}&item_type=2&comment_id=&service_id=0&lang=zh-Hans-CN&web_id=7179264044305303101`,
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
  })
    .then(_ => JSON.parse(_))
}

async function comment_create_axios(cookies, item_id = '7179481239827513402', content = '251594') {
  return axios.post('https://bbs.picoxr.com/ttarch/api/interact/v1/comment/create?app_id=264482&service_id=0&lang=zh-Hans-CN&web_id=7179264044305303101', {
    comment: {item_type: 2, item_id, content, rec_list: []}
  }, {
    headers: {
      ...axios.defaults.headers,
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
  }).then(_ => _.data)
}

/**
 * @deprecated socket.on error
 */
async function comment_create(cookies, item_id = '7179481239827513402', content = '251594') {
  let comment = {item_type: 2, item_id, content, rec_list: []}
  return cloudscraper({
    method: 'POST',
    uri: 'https://bbs.picoxr.com/ttarch/api/interact/v1/comment/create?app_id=264482&service_id=0&lang=zh-Hans-CN&web_id=7179264044305303101',
    formData: JSON.stringify({comment}),
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
    }
  })
    .then(_ => JSON.parse(_))
}

module.exports = {
  list_by_user,
  get_post,
  list_with_top,
  comment_create,
  comment_create_axios,
}

// list_by_user(config.cookies[0]).then(_ => console.log(_))
// get_post(config.cookies[0]).then(_ => console.log(_))
// list_with_top(config.cookies[0]).then(_ => console.log(_))
