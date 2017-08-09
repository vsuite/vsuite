const fs = require('fs-extra')
const path = require('path')

fs.removeSync(path.resolve(__dirname, '../public/*.html'))
fs.removeSync(path.resolve(__dirname, '../dist'))
