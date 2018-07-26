const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: [/\.stories\.jsx?$/, /stories\/*\.jsx?$/],
        loaders: [
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
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, '../src'),
      },
    ],
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      styles: path.resolve(__dirname, '../src/styles'),
      utils: path.resolve(__dirname, '../src/utils'),
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
