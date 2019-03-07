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
      // {
      //   test: [/\.story\.jsx?$/, /story\/*\.jsx?$/],
      //   use: [
      //     {
      //       loader: require.resolve('@storybook/addon-storysource/loader'),
      //       options: {
      //         prettierConfig: {
      //           parser: 'babylon',
      //           singleQuote: true,
      //           trailingComma: 'es5',
      //           bracketSpacing: true,
      //         },
      //       },
      //     },
      //   ],
      //   include: [resolve('components')],
      //   enforce: 'pre',
      // },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          },
        ],
        include: [resolve(), resolveRoot('.storybook')],
      },
      {
        test: /\.css/,
        use: ['vue-style-loader', 'css-loader'],
        include: [resolve(), resolveRoot('.storybook')],
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
    modules: [resolve(), 'node_modules'],
    alias: {
      stories: resolveRoot('.storybook/stories'),
      '@': resolve(),
    },
  },
};
