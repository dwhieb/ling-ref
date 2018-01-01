const path = require('path');

module.exports = {
  entry: `./dist/helpers.js`,
  output: {
    filename:      `helpers.bundled.js`,
    library:       `lingRef`,
    libraryTarget: `umd`,
    path:          path.resolve(__dirname, `dist`),
  },
};
