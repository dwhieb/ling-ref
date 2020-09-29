import convertReference  from '../ling-ref.js';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import path              from 'path';
import yaml              from 'yaml';

const { readFile } = fs.promises;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const bibliographyPath = path.join(currentDir, `bibliography.html`);
const referencesPath   = path.join(currentDir, `references.yml`);
const contextChars     = 50;

void async function test() {

  const yamlReferences = await readFile(referencesPath, `utf8`);
  let   bibliography   = await readFile(bibliographyPath, `utf8`);
  const references     = yaml.parse(yamlReferences);

  bibliography = bibliography
  .replace(/\r\n/gu, `\n`)
  .trim();

  const citations = references
  .map(convertReference)
  .map(citation => `<li><p>${citation}</p></li>`);

  const referenceList = citations.join(`\n`);
  const testString    = `<ul>\n${referenceList}\n</ul>`;
  const noChange      = testString === bibliography;

  if (noChange) {
    console.info(`Test passed!`);
    return process.exit(0);
  }

  const bibliographyChars = Array.from(bibliography);

  const firstDifferenceIndex = Array.from(testString)
  .findIndex((char, i) => bibliographyChars[i] !== char);

  const pre = bibliography.slice(Math.max(firstDifferenceIndex - contextChars, 0), firstDifferenceIndex);

  console.info(`Text immediately preceding the first difference: ${pre}`);

  process.exit(1);

}();
