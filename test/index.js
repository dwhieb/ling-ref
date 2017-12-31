// A comparator function (for using with sorts)
const compare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return +1;
  return 0;
};

// Creates the render function from the Handlebars template and the list element
const createRenderer = (compile, list) => ref => {
  const html = compile(ref);
  list.insertAdjacentHTML(`beforeend`, html);
};

// Preformats a Mendeley reference before rendering
/* eslint-disable no-param-reassign */
const format = ref => {
  if (!ref.year) ref.year = 0;
  if (ref.authors) {
    ref.sortKey = ref.authors[0].last_name;
    if (ref.authors.length === 1 && ref.authors[0].first_name.endsWith('.')) {
      ref.authors[0].first_name = ref.authors[0].first_name.slice(0, -1);
    }
  }
  if (ref.editors) ref.sortKey = ref.editors[0].last_name;
  if (!(`sortKey` in ref)) ref.sortKey = ``;
  if (ref.pages) ref.pages = ref.pages.replace('-', '–');
  return ref;
};
/* eslint-enable no-param-reassign */

// Fetches the test references and returns them as a JavaScript Array
const getReferences = async () => {
  const res = await fetch(`./references.json`);
  return res.json();
};

// Fetches the Handlebars template and returns it as a String
const getTemplate = async () => {
  const res      = await fetch(`../../dist/reference.hbs`);
  const template = await res.text();
  return Handlebars.compile(template);
};

// Sorts the Array of Mendeley references
const sort = (a, b) => compare(a.sortKey.toLowerCase(), b.sortKey.toLowerCase())
  || compare(a.year, b.year)
  || compare(a.title, b.title);

// Run the script
(async () => {

  const compile    = await getTemplate();
  const references = await getReferences();
  const list       = document.getElementById(`references`);
  const render     = createRenderer(compile, list);
  const refs       = references.map(format);

  refs.sort(sort);
  refs.forEach(render);

})();
