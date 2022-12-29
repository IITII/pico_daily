/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/12/28
 */
'use strict'
const fs = require('fs')
const {checked: CacheFile} = require('../config/config.js')
const logger = require('../config/log4js.js')
let cache = ''

if (fs.existsSync(CacheFile)) {
  try {
    const rawText = fs.readFileSync(CacheFile).toString(),
      arr = rawText.split('\n').filter(x => !!x).map(_ => _.trim())
    cache = [...new Set(arr)][0]
  } catch (e) {
    logger.warn(`Cache init failed: ${e.message}`)
  }
}

const get_cache = () => cache
const flush_cache = new_cache => {
  fs.writeFileSync(CacheFile, new_cache)
  cache = new_cache
}

module.exports = {
  get_cache,
  flush_cache,
}
