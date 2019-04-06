/* global Handlebars, LingRef */

// Alias Handlebars as "hbs"
const hbs = Handlebars;

const template = `
  <ol class=references>
    {{#each references}}
      <li>
        {{> reference this}}
      </li>
    {{/each}}
  </ol>
`;

/**
 * Retrieves the list of test references from references.json
 * @return {Promise}
 */
async function getReferences() {
  const res = await fetch(`references.json`);
  return res.json();
}

/**
 * Retrieves the LingRef template in reference.hbs
 * @return {Promise}
 */
async function getTemplate() {
  const res = await fetch(`reference.hbs`);
  return res.text();
}

describe(`LingRef`, () => {

  beforeAll(async function setup() {

    const reference = await getTemplate();

    hbs.registerPartial({ reference });
    hbs.registerHelper(LingRef);

    this.references = await getReferences();
    const compile   = hbs.compile(template);
    const html      = compile({ references: this.references });

    document.body.insertAdjacentHTML(`beforeend`, html);

  });

  it(`formats references correctly`, function checkReferences() {
    this.references.forEach(({ entry, citation_key: key, tags = [] }) => {

      // Citation key is included on reference
      const el = document.querySelector(`[data-key=${key}]`);

      // Citation is formatted correctly
      expect(el.innerText).toBe(entry);

      // Tags are included on the reference
      expect(el.dataset.tags).toBe(tags.join(`,`));

    });
  });

});
