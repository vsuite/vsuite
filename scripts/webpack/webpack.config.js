const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      components: path.resolve(__dirname, '../../src/components'),
      langs: path.resolve(__dirname, '../../src/langs'),
      mixins: path.resolve(__dirname, '../../src/mixins'),
      plugins: path.resolve(__dirname, '../../src/plugins'),
      styles: path.resolve(__dirname, '../../src/styles'),
      utils: path.resolve(__dirname, '../../src/utils'),
      '@': path.resolve(__dirname, '../../src'),
    },
  },
};
