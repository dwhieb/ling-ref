/*
This script runs a local server for serving static files from a folder. It can be run as a module or from the command line. Usage from command line:

node test/server.js [rootPath='.'] [port=3000]
*/

const express          = require('express');
const exphbs           = require('express-handlebars');
const handlebars       = require('handlebars');
const http             = require('http');
const lingRef          = require('../src');
const { readFileSync } = require('fs');
const references       = require('./references');

const rootPath = process.argv[2] || '.';
const port     = process.argv[3] || 3000;
const app      = express();

// Initialize ling-ref
lingRef(handlebars);
const reference = readFileSync(`test/reference.hbs`, `utf8`);
handlebars.registerPartial({ reference });

app.engine(`hbs`, exphbs({
  defaultLayout: false,
  handlebars,
}));

app.set(`port`, port);
app.set(`view engine`, `hbs`);
app.set(`views`, `test`);

// This route tests client-side templates
app.use(express.static(rootPath));

// This route tests server-side templates
app.get(`/test`, (req, res) => res.render(`test`, { references }));

const server = http.createServer(app);

// Start server
const start = () => server.listen(port, () => {
  console.log(`Server started. Press Ctrl+C to terminate.
  Root: ${rootPath}
  Port: ${port}
  Time: ${new Date}
  Node: ${process.version}`);
});

// Start immediately if run from the command line
if (require.main === module) start();

// Export start method if run as a module
module.exports = start;
