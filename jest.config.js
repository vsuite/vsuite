module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/', '/docs/', '/examples?/', '/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(vue)$': 'vue-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,vue}', '!**/node_modules/**'],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^stories/(.*)$': '<rootDir>/.storybook/stories/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  bail: true,
};
