/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

const { is } = require('../dist/helpers.bundled.js');

describe('helpers', function() {

  it(`is`, function() {
    expect(typeof is).toBe(`function`);
  });

});
