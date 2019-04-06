const hbs  = require(`handlebars`);
const path = require(`path`);

const {
  readFile,
  writeFile,
} = require(`fs`).promises;

async function buildTestPage() {
  const pageTemplate = await readFile(path.join(__dirname, `index.hbs`), `utf8`);
  const compile      = hbs.compile(pageTemplate);
  const html         = compile({});
  await writeFile(path.join(__dirname, `index.html`), html, `utf8`);
}

module.exports = buildTestPage;
