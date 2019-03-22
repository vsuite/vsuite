module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/dist/', '/docs/', '/examples?/', '/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.*\\.(vue|md)$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@storybook/.*\\.vue$))',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,vue}',
    '!src/components/**/*.{story,stories}.js',
    '!src/components/**/index.js',
    '!**/node_modules/**',
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'md'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/mock/svgMock.js',
    '^stories/(.*)$': '<rootDir>/.storybook/stories/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/test/setup.js'],
  testMatch: [
    '<rootDir>/src/components/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/components/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  bail: true,
};
