const CopyWebpackPlugin = require('copy-webpack-plugin');
const path              = require('path');

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename:      `index.js`,
    library:       `lingRef`,
    libraryTarget: `umd`,
    path:          path.resolve(__dirname, `dist`),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, `src/reference.hbs`),
        to:   path.resolve(__dirname, `dist/reference.hbs`),
      },
    ]),
  ],
};
