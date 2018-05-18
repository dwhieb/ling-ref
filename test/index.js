/* global
  Handlebars,
  lingRef,
*/

/* eslint-disable
  no-param-reassign,
 */

// a comparator function (for using with sorts)
const compare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return +1;
  return 0;
};

// creates the render function from the Handlebars template and the list element
const createRenderer = (compile, list) => ref => {
  ref.details  = true; // render using a details / summary element
  const html   = compile(ref);
  const li     = document.createElement(`li`);
  li.innerHTML = html;
  list.appendChild(li);
};

// preformats a Mendeley reference and adds a sorting key before rendering
/* eslint-disable no-param-reassign */
const format = ref => {

  // authors
  if (ref.authors) {
    ref.sortKey = ref.authors[0].last_name;
  }

  // editors
  if (ref.editors && !ref.sortKey) ref.sortKey = ref.editors[0].last_name;

  // year
  if (!ref.year) ref.year = 0;

  // sortKey
  if (!(`sortKey` in ref)) ref.sortKey = ``;

  return ref;

};
/* eslint-enable no-param-reassign */

// fetches the test references and returns them as a JavaScript Array
const getReferences = async () => {
  const res = await fetch(`./references.json`);
  return res.json();
};

// fetches the Handlebars template and returns it as a String
const getTemplate = async () => {
  const res      = await fetch(`reference.hbs`);
  const template = await res.text();
  return Handlebars.compile(template);
};

// sorts the Array of Mendeley references
const sort = (a, b) => compare(a.sortKey.toLowerCase(), b.sortKey.toLowerCase())
  || compare(a.year, b.year)
  || compare(a.title, b.title);

// run the script
(async () => {

  // register Handlebars helpers
  lingRef(Handlebars);

  const compile    = await getTemplate();
  const references = await getReferences();
  const list       = document.getElementById(`references`);
  const render     = createRenderer(compile, list);
  const refs       = references.map(format);

  refs.sort(sort);
  refs.forEach(render);

})();
