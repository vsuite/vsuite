const path = require(path);

module.exports = function (dirPath) {
  // const pkg = require(path.resolve(dirPath, "package.json"));
  const dirname = path.dirname(dirPath);

  return {
    rootDir: dirPath,
    displayName: dirname,
    testPathIgnorePatterns: [
      "/dist/",
      "/lib/",
      "/docs?/",
      "/examples?/",
      "/node_modules/",
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.*\\.vue$": "vue-jest",
    },
    moduleDirectories: ["src", "node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "vue"],
    setupFiles: ["<rootDir>/test/setup.js"],
  };
};
