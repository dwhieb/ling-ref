const CopyPlugin = require(`copy-webpack-plugin`);
const path       = require(`path`);

module.exports = {
  entry:     path.join(__dirname, `src/index.js`),
  externals: {
    handlebars: {
      amd:       'handlebars',
      commonjs:  'handlebars',
      commonjs2: 'handlebars',
      root:      'handlebars',
    },
  },
  mode:   `production`,
  output: {
    filename:      `LingRef.js`,
    library:       `LingRef`,
    libraryTarget: `umd`,
    path:          __dirname,
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(__dirname, `LingRef.js`),
        to:   path.join(__dirname, `test/LingRef.js`),
      },
      {
        from: path.join(__dirname, `node_modules/handlebars/dist/handlebars.js`),
        to:   path.join(__dirname, `test/handlebars.js`),
      },
    ]),
  ],
};
