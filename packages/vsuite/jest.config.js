const jestConfig = require("../../test/jest-base");

module.exports = {
  ...jestConfig(__dirname),
  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!(@storybook/.*\\.vue$))",
  // ],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/test/mock/svgMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/src/components/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/src/components/**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
