import convertReference from '../ling-ref.js';
import fs               from 'fs-extra';

const { readJSON } = fs;

void async function sample() {

  const documents = await readJSON(`test/Algonquian.json`);
  const institutions = documents.filter(doc => doc.institution);
  console.log(institutions);

}();
