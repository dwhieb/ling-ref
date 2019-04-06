/**
 * This script generates the necessary testing files, and runs the tests using Jasmine
 */

/* eslint-disable
  camelcase,
*/

const Jasmine = require(`jasmine`);
const path    = require(`path`);

const jasmine = new Jasmine(); // eslint-disable-line no-shadow

jasmine.loadConfig({
  spec_dir:   path.join(__dirname, `../test`),
  spec_files: [path.join(__dirname, `../test/node.test.js`)],
});

module.exports = () => jasmine.execute();
