const path = require(`path`);

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
};
