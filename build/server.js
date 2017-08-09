const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfig = require('./webpack.config.dev')
const config = require('./config')

// 拷贝public目录下文件
fs.copySync(
  path.resolve(__dirname, '../public'),
  path.resolve(__dirname, '../test')
)

let server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: config.dev.outputPath,
  publicPath: '/',
  proxy: config.app.proxy,
  // 其他配置项
  compress: true,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  stats: { colors: true },
  disableHostCheck: true
})

server.listen(
  config.app.port,
  config.app.host,
  (err, result) => {
    if (err) {
      return console.log(err)
    }

    console.log(`Listening at http://${config.app.host}:${config.app.port}/`);
  }
)
