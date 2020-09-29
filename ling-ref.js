const compilers = {
  book:    compileBook,
  journal: compileArticle,
};

// compilers for specific fields

function compileAuthors(authors, { initial = true } = {}) {
  if (!authors?.length) return `unknown`;
  return compileNames(authors, { initial });
}

function compileDOI(doi) {
  if (doi) return `DOI:<a href="https://doi.org/${doi}">${doi}</a>.`;
  return ``;
}

function compileEdition(edition) {

  if (!edition) return ``;

  let ordinal;

  switch (edition) {
    case `1`: ordinal = `1<sup>st</sup>`; break;
    case `2`: ordinal = `2<sup>nd</sup>`; break;
    case `3`: ordinal = `3<sup>rd</sup>`; break;
    default: ordinal = `${edition}<sup>th</sup>`;
  }

  return `, ${ordinal} ed.`;

}

function compileEditors(editors, { initial = true } = {}) {

  if (!editors?.length) return ``;

  const names      = compileNames(editors, { initial });
  const identifier = editors.length === 1 ? `ed.` : `eds.`;

  return `${names} (${identifier})`;

}

function compileIssue(issue) {
  if (issue) return `(${issue})`;
  return ``;
}

function compileNames(names, { initial = true } = {}) {

  if (!names?.length) return ``;

  const firstPerson = names.pop();

  let firstPersonText;

  if (initial) firstPersonText = `${firstPerson.last_name}, ${firstPerson.first_name}`;
  else firstPersonText = `${firstPerson.first_name} ${firstPerson.last_name}`;

  if (!names.length) return firstPersonText;

  const lastPerson     = names.pop();
  const lastPersonText = ` & ${lastPerson.first_name} ${lastPerson.last_name}`;

  if (!names.length) return `${firstPersonText}${lastPersonText}`;

  let text = firstPersonText;

  names.forEach(({ first_name, last_name }) => {
    text += `, ${first_name} ${last_name}`;
  });

  text += lastPersonText;

  return text;

}

function compilePages(pages) {
  return pages.replace(/-+/u, `–`);
}

function compilePlusEditors(doc) {

  const hasPlusEditors = doc.authors?.length && doc.editors?.length;

  if (hasPlusEditors) {
    const names = compileNames(doc.editors, { initial: false });
    return `Edited by ${names}.`;
  }

  return ``;


}

function compilePublisherInfo(doc) {

  let info = ``;

  if (doc.city) info += `${doc.city}: `;

  if (doc.publisher) info += doc.publisher;
  else if (doc.institution) info += doc.institution;

  return `${info}.`;

}

function compileSeriesInfo(doc) {

  if (!doc.series) return ``;

  let info = doc.series;

  if (doc.volume) info += ` ${doc.volume}`;
  else if (doc.revision) info += ` ${doc.revision}`;

  return `(${info})`;

}

function compileTranslators(translators) {
  if (!translators?.length) return ``;
  return `Translated by ${compileNames(translators, { initial: false })}.`;
}

function compileYear(year) {
  return year ?? `n.d.`;
}

// compilers by document type

function compileArticle(doc) {

  const authors = compileAuthors(doc.authors);
  const year    = compileYear(doc.year);
  const issue   = compileIssue(doc.issue);
  const pages   = compilePages(doc.pages);
  const doi     = compileDOI(doc.identifiers?.doi);

  return `${authors}. ${year}. ${doc.title}. <cite>${doc.source}</cite> ${doc.volume}${issue}: ${pages}. ${doi}`;

}

function compileBook(doc) {

  const authors       = compileAuthors(doc.authors);
  const editors       = compileEditors(doc.editors);
  const year          = compileYear(doc.year);
  const edition       = compileEdition(doc.edition);
  const seriesInfo    = compileSeriesInfo(doc);
  const plusEditors   = compilePlusEditors(doc);
  const translators   = compileTranslators(doc.translators);
  const publisherInfo = compilePublisherInfo(doc);
  const doi           = compileDOI(doc.identifiers?.doi);

  return `${authors ?? editors}. ${year}. <cite>${doc.title}</cite>${edition} ${seriesInfo}. ${plusEditors} ${translators} ${publisherInfo} ${doi}`;

}

export default function lingRef(doc) {

  const compile = compilers[doc.type];

  if (!compile) return ``;

  return compile(doc)
  .replace(/\.{2,}/gu, `.`)
  .replace(/\s{2,}/gu, ` `)
  .replace(/\s+\./gu, `.`)
  .trim();

}
