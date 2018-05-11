/*
This script runs a local server for serving static files from a folder. It can be run as a module or from the command line. Usage from command line:

node test/server.js [rootPath='.'] [port=3000]
*/

const express = require('../node_modules/express');
const http    = require('http');

const rootPath = process.argv[2] || '.';
const port     = process.argv[3] || 3000;
const app      = express();

app.set(`port`, port);

app.use(express.static(rootPath));

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
