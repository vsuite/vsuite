const path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, '../src', relativePath || '');
}

function resolveRoot(relativePath) {
  return path.resolve(__dirname, '..', relativePath || '');
}

module.exports = ({ config }) => {
  config.module.rules = [
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
      include: [resolveRoot('.storybook/stories/svg')],
      exclude: [resolve('styles')],
    },
    {
      test: /\.(eot|svg|ttf|woff2?)$/,
      use: ['file-loader'],
      include: [resolve('styles')],
      exclude: [resolveRoot('.storybook/stories/svg')],
    },
  ].concat(
    config.module.rules.map(x => {
      if (x.test.test('demo.svg')) {
        x.exclude = [resolveRoot('.storybook/stories/svg')];
      }

      return x;
    })
  );

  config.resolve.modules = [resolve(), 'node_modules'];

  config.resolve.alias = {
    ...config.resolve.alias,
    stories: resolveRoot('.storybook/stories'),
    '@': resolve(),
  };

  return config;
};
