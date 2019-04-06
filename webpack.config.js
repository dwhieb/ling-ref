const CopyPlugin = require(`copy-webpack-plugin`);
const path       = require(`path`);

module.exports = {
  entry:  path.join(__dirname, `src/helpers`),
  mode:   `production`,
  output: {
    filename:      `helpers.js`,
    globalObject:  `this`,
    library:       `LingRef`,
    libraryTarget: `umd`,
    path:          path.join(__dirname, `dist`),
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(__dirname, `node_modules/handlebars/dist/handlebars.min.js`),
        to:   path.join(__dirname, `test/handlebars.js`),
      },
      {
        from: path.join(__dirname, `dist/helpers.js`),
        to:   path.join(__dirname, `test/helpers.js`),
      },
      {
        from: path.join(__dirname, `src/reference.hbs`),
        to:   path.join(__dirname, `dist/reference.hbs`),
      },
      {
        from: path.join(__dirname, `src/reference.hbs`),
        to:   path.join(__dirname, `test/reference.hbs`),
      },
    ]),
  ],
};
