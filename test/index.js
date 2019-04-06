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
 * Checks whether the inner text of a rendered reference is displayed correctly
 * @param  {Object}  ref A Mendeley reference object
 * @return {Boolean}
 */
function isFormatted({ citation_key: key, entry }) {
  const ref  = document.querySelector(`[data-key=${key}]`);
  const text = ref.innerText;
  return text === entry;
}

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
    this.references.forEach(ref => expect(isFormatted(ref)).toBe(true));
  });

});
