const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcPath = path.resolve(__dirname, 'src')
// const distPath = path.resolve(__dirname, 'dist')
const testPath = path.resolve(__dirname, 'test')

const extractLight = new ExtractTextPlugin('test/css/wibi.css')
const extractDark = new ExtractTextPlugin('test/css/wibi-dark.css')
const extractTypo = new ExtractTextPlugin('test/css/wibi-typo.css')

const extractStylusOptions = {
  fallback: 'style-loader',
  use: [
    'css-loader',
    {
      loader: 'stylus-loader',
      options: {
        use: [],
      },
    },
  ],
}

module.exports = {
  entry: {
    index: path.resolve(srcPath, 'scripts/index.js'),
  },
  output: {
    filename: "js/wibi.js",
    path: testPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'xo-loader',
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
        test: /^light\.styl$/,
        use: extractLight.extract(extractStylusOptions),
      },
      {
        test: /^dark\.styl$/,
        use: extractDark.extract(extractStylusOptions),
      },
      {
        test: /^typo\.styl$/,
        use: extractTypo.extract(extractStylusOptions),
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        use: 'file-loader?name=[name].[ext]&outputPath=test/images',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'file-loader?name=[name].[ext]&outputPath=test/fonts',
      },
    ],
  },
  plugins: [
    extractLight,
    extractDark,
    extractTypo,
  ]
}
