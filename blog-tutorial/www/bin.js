const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const app = require('../app.js')
module.exports.main = vertex.entry(app)
