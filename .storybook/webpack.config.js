const path = require('path');

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
                singleQuote: true,
                trailingComma: 'es5',
                bracketSpacing: true,
              },
            },
          },
        ],
        include: [path.resolve(__dirname, '../src/components')],
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
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        use: ['file-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      langs: path.resolve(__dirname, '../src/langs'),
      mixins: path.resolve(__dirname, '../src/mixins'),
      plugins: path.resolve(__dirname, '../src/plugins'),
      styles: path.resolve(__dirname, '../src/styles'),
      utils: path.resolve(__dirname, '../src/utils'),
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
