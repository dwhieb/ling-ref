import convertReference from '../ling-ref.js';
import fs               from 'fs-extra';

const { readJSON } = fs;

void async function sample() {

  const documents = await readJSON(`test/Algonquian.json`);
  const generics = documents.filter(doc => doc.type === `unspecified`);
  console.log(generics);

}();
