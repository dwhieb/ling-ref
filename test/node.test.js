const Handlebars = require(`handlebars`);
const LingRef    = require(`../src/index.js`);

describe(`LingRef`, () => {

  it(`registers the partial with Handlebars`, () => {
    new LingRef; // eslint-disable-line no-new
    const compile = Handlebars.compile(`{{> reference}}`);
    const html    = compile({});
    expect(typeof html).toBe(`string`);
  });

  it(`.compile()`, () => {
    const lingRef = new LingRef;
    const html    = lingRef.compile({});
    expect(typeof html).toBe(`string`);
  });

  describe(`options`, () => {

    it(`handlebars`, () => {
      const hbs = Handlebars.create();
      new LingRef({ handlebars: hbs }); // eslint-disable-line no-new
      expect(hbs.partials.reference).toBeDefined();
    });

  });

});
