/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const Handlebars = require('handlebars');
const lingRef    = require('../src/index.js');

describe('helpers', function() {

  beforeAll(function() {
    lingRef(Handlebars);
  });

  it(`is`, function() {
    expect(typeof Handlebars.helpers.is).toBe(`function`);
  });

  it(`md`, function() {
    expect(typeof Handlebars.helpers.md).toBe(`function`);
  });

});
