var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AI_URL:'"https://complete-land-188108.appspot.com/visionEndPoints/"',
  SERV_URL:'"https://us-central1-complete-land-188108.cloudfunctions.net/"',
  
})
