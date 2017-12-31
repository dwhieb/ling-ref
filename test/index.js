// Creates the render function from the Handlebars template
const createRenderer = compile => ref => {};

const endsWith = function(a, b, opts) {
  return a.endsWith(b) ? opts.fn(this) : opts.inverse(this); // eslint-disable-line no-invalid-this
};

// Preformats a Mendeley reference before rendering
/* eslint-disable no-param-reassign */
const format = ref => {

  if (!ref.year) ref.year = 0;
  if (ref.authors) ref.sortKey = ref.authors[0].last_name;
  if (ref.editors) ref.sortKey = ref.editors[0].last_name;
  if (!(`sortKey` in ref)) ref.sortKey = ``;
  if (ref.pages) ref.pages = ref.pages.replace('-', '–');

};
/* eslint-enable no-param-reassign */

// Fetches the test references and returns them as a JavaScript Array
const getReferences = async () => {
  const res = await fetch(`./references.json`);
  return res.json();
};

// Fetches the Handlebars template and returns it as a String
const getTemplate = async () => {
  const res      = await fetch(`../../templates/reference.hbs`);
  const template = await res.text();
  return Handlebars.compile(template);
};

// A Handlebars helper that checks whether the first and second argument are the same
const is = function(a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this); // eslint-disable-line no-invalid-this
};

// Sorts the Array of Mendeley references
const sort = (a, b) => {};

// Run the script
(async () => {

  Handlebars.registerHelper({ endsWith, is });

  const compile    = await getTemplate();
  const references = await getReferences();
  const render     = createRenderer(compile);
  const refs       = references.map(format);

  refs.sort(sort);
  refs.forEach(render);

})();
