var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://192.168.127.76:9091"',
  REM_URL:'"https://us-central1-complete-land-188108.cloudfunctions.net/visionendpoints?token=1fccd19d207874326a0bf705fbe909d5b9408cbaf0e1d17d60b141389d86742183"'


})
