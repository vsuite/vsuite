const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')

const webpackConfigBase = require('./webpack.config.base')
const config = require('./config')

const plugins = []

if (config.pro.gzip) {
  plugins.push(
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = merge(webpackConfigBase, {
  plugins,
})
