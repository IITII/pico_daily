/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/05/26
 */
'use strict'
const fs = require('fs'),
  path = require('path'),
  logger = require('./log4js')

const pico = {
  // 随机等待 5 分钟
  random_wait: 5,
  cookies: process.env.PICO || [

  ],
  // 今天签到了吗？
  checked: './checked.txt',
}

const config = {
  ...pico,
  axiosConf: {
    // baseURL: 'https://api.telegram.org/bot',
    // proxy: process.env.PROXY,
    proxy: undefined,
    timeout: 1000 * 10,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  },
}

// DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
if (!config.cookies || config.cookies.length === 0) {
  logger.error('PICO COOKIE IS EMPTY')
  process.exit(1)
} else if (!Array.isArray(config.cookies)) {
  if (config.cookies.startsWith('[')) {
    logger.warn('try to parse cookies as json...')
    config.cookies = JSON.parse(config.cookies)
  } else {
    config.cookies = [config.cookies]
  }
}
const proxy = process.env.HTTP_PROXY?.replace(/https?:\/\//, '')
if (proxy) {
  config.axios.proxy = {
    host: proxy.split(':')[0],
    port: proxy.split(':')[1],
  }
}

config.checked = path.resolve(__dirname, config.checked)

function mkdir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true})
    console.log(`mkdir ${dir}`)
  }
}

module.exports = config
