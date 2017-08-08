const path = require('path')

module.exports = {
  dev: {
    env: {
      NODE_ENV: '"development"',
    },
    outputPath: path.resolve(__dirname, '../test'),
  },
  pro: {
    env: {
      NODE_ENV: '"production"',
    },
    outputPath: path.resolve(__dirname, '../dist'),
  },
}
