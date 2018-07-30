const path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, '../../src', relativePath || '');
}

function resolveRoot(relativePath) {
  return path.resolve(__dirname, '../../', relativePath || '');
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      components: resolve('components'),
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
