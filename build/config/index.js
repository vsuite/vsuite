const os = require('os')
const path = require('path')

/**
 * 获取 内网 ip地址
 *
 * @return {*}
 */
function getHost() {
  const networkInterfaces = os.networkInterfaces()
  const networkInterface = networkInterfaces.en0

  for (let i = 0, len = networkInterface.length; i < len; i++) {
    if (networkInterface[i].family === 'IPv4') {
      return networkInterface[i].address
    }
  }

  return 'localhost'
}

module.exports = {
  dev: {
    envFile: path.resolve(__dirname, './.env.dev'),
    outputPath: path.resolve(__dirname, '../../public'),
  },
  pro: {
    envFile: path.resolve(__dirname, './.env.pro'),
    outputPath: path.resolve(__dirname, '../../dist'),
    gzip: false,
  },
  app: {
    host: getHost(),
    port: '2017',
    proxy: {},
    browsers: ['last 2 versions', 'ie > 10'],
  },
}
