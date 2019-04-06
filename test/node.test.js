const handlebars = require(`handlebars`);
const LingRef    = require(`../src/index.js`);

describe(`LingRef`, () => {

  it(`registers the partial with Handlebars`, () => {
    new LingRef; // eslint-disable-line no-new
    expect(handlebars.partials.reference).toBeDefined();
  });

  it(`compiles a reference to HTML`, () => {
    const lingRef = new LingRef;
    const html    = lingRef.compile({});
    expect(typeof html).toBe(`string`);
  });

});
