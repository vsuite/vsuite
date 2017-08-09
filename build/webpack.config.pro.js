const webpack = require('webpack')
const merge = require('webpack-merge')

const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackConfigBase = require('./webpack.config.base')
const config = require('./config')

const plugins = [
  new webpack.HashedModuleIdsPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new UglifyJSPlugin(),
  new BundleAnalyzerPlugin(),
]

if (config.pro.gzip) {
  plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = merge(webpackConfigBase, {
  plugins,
})
