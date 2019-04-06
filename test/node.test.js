const Handlebars       = require(`handlebars`);
const LingRef          = require(`../src/index.js`);
const path             = require(`path`);
const { readFileSync } = require(`fs`);

const templatePath = path.join(__dirname, `../src/reference.hbs`);

describe(`LingRef`, () => {

  it(`registers the partial with Handlebars`, () => {

    const hbs = Handlebars.create();

    new LingRef({
      handlebars: hbs,
      template:   templatePath,
    });

    const compile = hbs.compile(`{{> reference}}`);
    const html    = compile({});

    expect(typeof html).toBe(`string`);

  });

  it(`.compile()`, () => {

    const hbs = Handlebars.create();

    const lingRef = new LingRef({
      handlebars: hbs,
      template:   templatePath,
    });

    const html = lingRef.compile({});

    expect(typeof html).toBe(`string`);

  });

  describe(`options`, () => {

    it(`handlebars`, () => {

      const hbs = Handlebars.create();

      new LingRef({
        handlebars: hbs,
        template:   templatePath,
      });

      expect(hbs.partials.reference).toBeDefined();

    });

    it(`partial`, () => {

      const hbs = Handlebars.create();

      new LingRef({
        handlebars: hbs,
        partial:    `ref`,
        template:   templatePath,
      });

      expect(hbs.partials.reference).toBeUndefined();
      expect(hbs.partials.ref).toBeDefined();

    });

    it(`template`, () => {

      const hbs = Handlebars.create();

      // eslint-disable-next-line no-shadow
      const templatePath = path.join(__dirname, `index.html`);

      new LingRef({
        handlebars: hbs,
        template:   templatePath,
      });

      const template = readFileSync(templatePath, `utf8`);

      expect(hbs.partials.reference).toBe(template);

    });

  });

});
