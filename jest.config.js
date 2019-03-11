module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/', '/docs/', '/examples?/', '/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@storybook/.*\\.vue$))',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,vue}',
    '!src/**/*.{story,stories}.js',
    '!**/node_modules/**',
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^stories/(.*)$': '<rootDir>/.storybook/stories/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/test/setup.js'],
  bail: true,
};
