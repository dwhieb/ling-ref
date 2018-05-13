const CopyWebpackPlugin     = require('copy-webpack-plugin');
const path                  = require('path');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry:     `./src/index.js`,
  externals: `handlebars`,
  mode:      `production`,
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
      {
        from: path.resolve(__dirname, `src/reference.hbs`),
        to:   path.resolve(__dirname, `test/reference.hbs`),
      },
      {
        from: path.resolve(__dirname, `dist/index.js`),
        to:   path.resolve(__dirname, `test/ling-ref.js`),
      },
    ]),
    new UglifyJSWebpackPlugin(),
  ],
};
