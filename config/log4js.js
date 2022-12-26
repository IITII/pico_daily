/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/05/31
 */
'use strict'
const fs = require('fs'),
  path = require('path'),
  log4js = require('log4js')
const LOG_NAME = process.env.LOG_NAME || 'pico'
const APPEND_TO_FILE = process.env.APPEND_TO_FILE === 'true'
const loggerLevel = process.env.LOG_LEVEL || 'INFO'
const logDir = process.env.LOG_DIR || path.resolve(__dirname, '../logs')

if (APPEND_TO_FILE && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
  console.log(`[INFO] Create log directory: ${logDir}`)
}

let config = {
  'appenders': {
    console: {type: 'console'},
    'app': {
      'type': 'dateFile',
      'filename': `${logDir}/app.log`,
      'pattern': '-yyyy-MM-dd',
      'maxLogSize': 10485760,
      'numBackups': 0,
      'category': 'http',
      compress: false,
    },
    'errors': {
      'type': 'logLevelFilter',
      'level': 'ERROR',
      'appender': 'errorFile',
    },
    'errorFile': {
      'type': 'file',
      'filename': `${logDir}/errors.log`,
      'maxLogSize': 10485760,
      'numBackups': 1,
    },
  },
  'categories': {
    'default': {
      'appenders': ['console'],
      'level': loggerLevel,
      enableCallStack: true,
    },
  },
}

if (APPEND_TO_FILE) {
  ['app', 'errors'].forEach(c => {
    config.categories.default.appenders.push(c)
  })
}

log4js.configure(config)

module.exports = log4js.getLogger(LOG_NAME)
