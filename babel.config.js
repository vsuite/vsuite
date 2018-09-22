// https://github.com/facebook/jest/issues/6053#issuecomment-383632515
module.exports = {
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: [
    '@babel/plugin-syntax-jsx',
    'transform-vue-jsx',
    'transform-object-rest-spread',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env'],
    },
  },
};
