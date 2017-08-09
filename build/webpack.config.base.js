const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const autoprefixer = require('autoprefixer-stylus')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const config = require('./config')

const srcPath = path.resolve(__dirname, '../src')
const isDev = process.env.NODE_ENV === 'development'
const outputPath = isDev ? config.dev.outputPath : config.pro.outputPath
const envFile = isDev ? config.dev.envFile : config.pro.envFile
const devTool = isDev ? 'cheap-module-source-map' : 'hidden-source-map'
const entry = []

const extractLight = new ExtractTextPlugin(`css/wibi.${isDev ? '' : 'min.'}css`)
const extractDark = new ExtractTextPlugin(`css/wibi-dark.${isDev ? '' : 'min.'}css`)
const extractTypo = new ExtractTextPlugin(`css/wibi-typo.${isDev ? '' : 'min.'}css`)

const extractStylusOptions = {
  fallback: 'style-loader',
  use: [
    'css-loader',
    {
      loader: 'stylus-loader',
      options: {
        use: [
          autoprefixer({ browsers: config.app.browsers })
        ],
      },
    },
  ],
}

// 测试环境
if (isDev) {
  // entry.push(
  //   `webpack-dev-server/client?http://${config.app.host}:${config.app.port}`
  // )
  // entry.push('webpack/hot/only-dev-server')
  entry.push(require.resolve('react-dev-utils/webpackHotDevClient'))
  entry.push(require.resolve('react-error-overlay'))
}

entry.push(path.resolve(srcPath, 'scripts/index.js'))

module.exports = {
  entry,
  output: {
    filename: `js/wibi.${isDev ? '' : 'min.'}js`,
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),
            // @remove-on-eject-begin
            baseConfig: {
              extends: [require.resolve('eslint-config-finger')],
            },
            ignore: false,
            useEslintrc: false,
            // @remove-on-eject-end
          },
          loader: require.resolve('eslint-loader'),
        },
        enforce: 'pre',
        include: [path.resolve(srcPath, 'scripts')],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve(srcPath, 'scripts')],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
        include: [path.resolve(srcPath, 'pages')],
      },
      {
        test: /light\.styl$/,
        use: extractLight.extract(extractStylusOptions),
      },
      {
        test: /dark\.styl$/,
        use: extractDark.extract(extractStylusOptions),
      },
      {
        test: /typo\.styl$/,
        use: extractTypo.extract(extractStylusOptions),
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        use: `file-loader?name=[name].[ext]&outputPath=${path.resolve(outputPath, 'images')}`,
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: `file-loader?name=[name].[ext]&outputPath=${path.resolve(outputPath, 'fonts')}`,
      },
    ],
  },
  devtool: devTool,
  resolve: {
    alias: {
      scripts: path.resolve(srcPath, 'scripts'),
      styles: path.resolve(srcPath, 'styles'),
      pages: path.resolve(srcPath, 'pages'),
      images: path.resolve(srcPath, 'images'),
      fonts: path.resolve(srcPath, 'fonts'),
    },
    extensions: ['.js', '.styl'],
    modules: [srcPath, 'node_modules'],
  },
  plugins: [
    new DotenvPlugin({ path: envFile }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    extractLight,
    extractDark,
    extractTypo,
  ]
}
