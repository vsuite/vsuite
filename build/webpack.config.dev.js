const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlPlugin = require('html-webpack-plugin')
const HtmlHarddiskPlugin = require('html-webpack-harddisk-plugin')

const webpackConfigBase = require('./webpack.config.base')
const config = require('./config')

/**
 * 根据 src/pages 下 文件生成 对应 html 文件。
 * @return {Array}
 */
function generateHtmlPluginInstances() {
  const templatePath = path.resolve(__dirname, '../src/pages')
  const paths = fs.readdirSync(templatePath)
  const plugins = []

  for (let i = 0, len = paths.length; i < len; i++) {
    const filePath = path.resolve(templatePath, paths[i])

    if (fs.statSync(filePath).isFile()) {
      plugins.push(
        new HtmlPlugin({
          title: 'wibi theme testing',
          template: filePath,
          filename: paths[i],
          alwaysWriteToDisk: true,
        })
      )
    }
  }

  plugins.push(new HtmlHarddiskPlugin({ outputPath: config.dev.outputPath }))

  return plugins
}

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  ...generateHtmlPluginInstances(),
]

const devWebpackConfig = merge(webpackConfigBase, {
  plugins,
})

console.dir(devWebpackConfig)

module.exports = devWebpackConfig
