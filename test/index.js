import convertReference  from '../ling-ref.js';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import yaml              from 'yaml';

const { readFile } = fs.promises;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const bibliographyPath = path.join(currentDir, `bibliography.html`);
const referencesPath   = path.join(currentDir, `references.yml`);

void async function test() {

  const yamlReferences = await readFile(referencesPath, `utf8`);
  const bibliography   = await readFile(bibliographyPath, `utf8`);
  const references     = yaml.parse(yamlReferences);

  const citations = references
  .map(convertReference)
  .map(citation => `<p>${citation}</p>`);

  const referenceList = citations.join(`\n  `);

  const testString = `<ul>\n${referenceList}\n</ul>`;

  const noChange = testString === bibliography;

  if (noChange) process.exit(0);
  else process.exit(1);

}();
