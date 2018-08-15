const path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, '../src', relativePath || '');
}

function resolveRoot(relativePath) {
  return path.resolve(__dirname, '..', relativePath || '');
}

module.exports = {
  module: {
    rules: [
      {
        test: [/\.stories\.jsx?$/, /stories\/*\.jsx?$/],
        use: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              prettierConfig: {
                parser: 'babylon',
                singleQuote: true,
                trailingComma: 'es5',
                bracketSpacing: true,
              },
            },
          },
        ],
        include: [resolve('components')],
        enforce: 'pre',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          },
        ],
        include: [resolve()],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
        exclude: [resolve('styles')],
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        use: ['file-loader'],
        include: [resolve('styles')],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      components: resolve('components'),
      directives: resolve('directives'),
      langs: resolve('langs'),
      mixins: resolve('mixins'),
      plugins: resolve('plugins'),
      stories: resolveRoot('.storybook/stories'),
      shares: resolve('shares'),
      styles: resolve('styles'),
      utils: resolve('utils'),
      '@': resolve(),
    },
  },
};
