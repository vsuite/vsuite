const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const errorOverlayMiddleware = require('react-error-overlay/middleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const clearConsole = require('react-dev-utils/clearConsole')
const openBrowser = require('react-dev-utils/openBrowser')

const isInteractive = process.stdout.isTTY

const webpackConfig = require('./webpack.config.dev')
const config = require('./config')

let server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: config.dev.outputPath,
  publicPath: '/',
  // 其他配置项
  clientLogLevel: 'none',
  watchContentBase: true,
  compress: true,
  hot: true,
  quiet: true,
  noInfo: true,
  historyApiFallback: { disableDotRule: true },
  stats: { colors: true },
  watchOptions: { ignored: /node_modules/ },
  overlay: false,
  proxy: config.app.proxy,
  setup(app) {
    app.use(errorOverlayMiddleware())
    app.use(noopServiceWorkerMiddleware())
  }
})

server.listen(
  config.app.port,
  config.app.host,
  (err, result) => {
    if (err) {
      return console.log(err)
    }

    if (isInteractive) {
      clearConsole()
    }

    console.log(chalk.blue(`
              ┌──────────────────────────────────────────────────────────┐
              │                                                          │
              │                  _       __________  ____                │
              │                 | |     / /  _/ __ )/  _/                │
              │                 | | /| / // // __  |/ /                  │
              │                 | |/ |/ // // /_/ // /                   │
              │                 |__/|__/___/_____/___/                   │
              │                                                          │
              │              ┌─────────────────────────────┐             │
              └──────────────┤ Simple and Beautiful theme! ├─────────────┘
                             └─────────────────────────────┘              
`))
    console.log(chalk.cyan(`Listening at http://${config.app.host}:${config.app.port}/ \n`))

    openBrowser(`http://${config.app.host}:${config.app.port}/`)
  }
)
