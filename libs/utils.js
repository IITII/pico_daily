/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/12/26
 */
'use strict'

async function sleep(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  sleep,
}
