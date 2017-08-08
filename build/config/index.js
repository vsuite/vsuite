const path = require('path')

module.exports = {
  dev: {
    envFile: path.resolve(__dirname, './.env.dev'),
    outputPath: path.resolve(__dirname, '../test'),
  },
  pro: {
    envFile: path.resolve(__dirname, './.env.pro'),
    outputPath: path.resolve(__dirname, '../dist'),
    gzip: false,
  },
}
