import convertReference from '../ling-ref.js';
import fs               from 'fs-extra';

const { readJSON } = fs;

void async function sample() {

  const documents = await readJSON(`test/Algonquian.json`);
  const webpages = documents.filter(doc => doc.type === `web_page`);
  console.log(webpages.map(page => page.authors));

}();
