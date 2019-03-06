const path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, '../../src', relativePath || '');
}

function resolveRoot(relativePath) {
  return path.resolve(__dirname, '../../', relativePath || '');
}

module.exports = {
  resolve: {
    modules: [resolve(), 'node_modules'],
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      stories: resolveRoot('.storybook/stories'),
      '@': resolve(),
    },
  },
};
