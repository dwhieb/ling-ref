const compilers = {
  book:                   compileBook,
  book_section:           compileChapter,
  conference_proceedings: compileProceedings,
  encyclopedia_article:   compileChapter,
  generic:                compileGeneric,
  journal:                compileArticle,
  magazine_article:       compileArticle,
  report:                 compileBook,
  thesis:                 compileThesis,
  web_page:               compileWebpage,
  working_paper:          compileArticle,
};

// utilities

function getMonthString(monthNum) {
  if (monthNum === undefined) return ``;
  const d = new Date;
  d.setMonth(monthNum);
  return d.toLocaleString('default', { month: 'long' });
}

// compilers for specific fields and parts of the citation

function compileAuthors(authors, { initial = true } = {}) {
  if (!authors?.length) return `unknown`;
  const text = compileNames(authors, { initial });
  return `${text}.`;
}

function compileDateAccessed(timestamp) {

  if (!timestamp) return ``;

  const d = new Date(timestamp);

  const dateString = d.toLocaleDateString(`en-US`, {
    day:      `numeric`,
    month:    `long`,
    timeZone: `UTC`,
    year:     `numeric`,
  });

  return `Accessed: ${dateString}.`;

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

function compileEditorInfo(editors) {

  if (!editors?.length) return ``;

  const names = compileNames(editors, { initial: false });
  return `Edited by ${names}.`;

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

function compileName({ first_name, last_name }, { reverse = false } = {}) {
  if (!(first_name && last_name)) return first_name || last_name;
  if (reverse) return `${last_name}, ${first_name}`;
  return `${first_name} ${last_name}`;
}

function compileNames(input, { initial = true } = {}) {

  if (!input?.length) return ``;

  const names       = [...input];
  const firstPerson = names.shift();

  let firstPersonText;

  if (initial) firstPersonText = compileName(firstPerson, { reverse: true });
  else firstPersonText = compileName(firstPerson);

  if (!names.length) return firstPersonText;

  const lastPerson     = names.pop();
  const lastPersonText = ` & ${compileName(lastPerson)}`;

  if (!names.length) return `${firstPersonText}${lastPersonText}`;

  let text = firstPersonText;

  names.forEach(person => {
    text += `, ${compileName(person)}`;
  });

  text += lastPersonText;

  return text;

}

function compilePageInfo(pages) {
  if (!pages) return ``;
  const pageRange = compilePages(pages);
  return `, pp. ${pageRange}`;
}

function compilePages(pages) {
  if (!pages) return ``;
  return pages.replace(/-+/u, `–`);
}

function compileParts(input, { separator = `, ` } = {}) {
  const parts = input.filter(Boolean);
  if (!parts.length) return ``;
  return `${parts.join(separator)}.`;
}

function compilePublisherInfo(doc) {

  let info = ``;

  if (doc.city) info += `${doc.city}: `;

  if (doc.publisher) info += doc.publisher;
  else if (doc.institution) info += doc.institution;

  info = info.trim();

  if (info) return `${info}.`;
  return ``;

}

function compileSeriesInfo(doc) {
  if (!doc.series) return ``;
  let text = compileParts([doc.series, doc.volume || doc.revision], { separator: ` ` });
  text     = text.slice(0, text.length - 1);
  return `(${text})`;
}

function compileTranslators(translators) {
  if (!translators?.length) return ``;
  return `Translated by ${compileNames(translators, { initial: false })}.`;
}

function compileURL(websites) {
  if (!websites?.length) return ``;
  const [link] = websites;
  return `<a href="${link}">${link}</a>.`;
}

function compileYear(year) {
  if (year) return `${year}.`;
  return `n.d.`;
}

// compilers by document type

function compileArticle(doc) {

  const authors = compileAuthors(doc.authors);
  const year    = compileYear(doc.year);
  const issue   = compileIssue(doc.issue);
  const pages   = compilePages(doc.pages);
  const doi     = compileDOI(doc.identifiers?.doi);

  return `${authors} ${year} ${doc.title}. <cite>${doc.source}</cite> ${doc.volume}${issue}: ${pages}. ${doi}`;

}

function compileBook(doc) {

  const authors          = compileNames(doc.authors);
  const editors          = compileEditors(doc.editors);
  const year             = compileYear(doc.year);
  const edition          = compileEdition(doc.edition);
  const seriesInfo       = compileSeriesInfo(doc);
  const secondaryEditors = authors?.length ? `` : compileEditorInfo(doc.editors);
  const translators      = compileTranslators(doc.translators);
  const publisherInfo    = compilePublisherInfo(doc);
  const doi              = compileDOI(doc.identifiers?.doi);

  return `${authors ?? editors}. ${year} <cite>${doc.title}</cite>${edition} ${seriesInfo}. ${secondaryEditors} ${translators} ${publisherInfo} ${doi}`;

}

function compileChapter(doc) {

  const authors       = compileAuthors(doc.authors);
  const year          = compileYear(doc.year);
  const editorNames   = compileEditors(doc.editors, { initial: false });
  const editors       = editorNames ? `${editorNames},` : ``;
  const edition       = compileEdition(doc.edition);
  const seriesInfo    = compileSeriesInfo(doc);
  const pageInfo      = compilePageInfo(doc.pages);
  const translators   = compileTranslators(doc.translators);
  const publisherInfo = compilePublisherInfo(doc);
  const doi           = compileDOI(doc.identifiers?.doi);

  return `${authors} ${year} ${doc.title}. In ${editors} <cite>${doc.source}</cite>${edition} ${seriesInfo}${pageInfo}. ${translators} ${publisherInfo} ${doi}`;

}

function compileGeneric(doc) {

  const authors       = compileAuthors(doc.authors);
  const editorNames   = compileEditors(doc.editors, { initial: false });
  const editors       = editorNames ? `${editorNames},` : ``;
  const year          = compileYear(doc.year);
  const publisherInfo = compilePublisherInfo(doc);
  const doi           = compileDOI(doc.identifiers?.doi);
  const context       = compileParts([
    doc.user_context,
    doc.source,
    doc.department,
    doc.institution,
  ]);

  return `${authors ?? editors}. ${year} <cite>${doc.title}</cite>. ${context} ${publisherInfo} ${doi}`;

}

function compileProceedings(doc) {

  const authors       = compileAuthors(doc.authors);
  const doi           = compileDOI(doc.identifiers?.doi);
  const editorNames   = compileEditors(doc.editors, { initial: false });
  const editors       = editorNames ? `In ${editorNames},` : ``;
  const localeInfo    = compileParts([doc.institution, doc.city, getMonthString(doc.month), doc.day]);
  const pageInfo      = compilePageInfo(doc.pages);
  const publisherInfo = compilePublisherInfo(doc);
  const volume        = doc.volume ? ` ${doc.volume}` : ``;
  const year          = compileYear(doc.year);

  return `${authors} ${year} ${doc.title}. ${editors} <cite>${doc.source}</cite>${volume}${pageInfo}. ${doc.publisher ? publisherInfo : localeInfo} ${doi}`;

}

function compileThesis(doc) {

  const author     = compileAuthors(doc.authors);
  const year       = compileYear(doc.year);
  const thesisInfo = compileParts([doc.user_context, doc.department, doc.institution]);
  const doi        = compileDOI(doc.identifiers?.doi);

  return `${author} ${year} <cite>${doc.title}</cite>. ${thesisInfo} ${doi}`;

}

function compileWebpage(doc) {

  const authors         = compileAuthors(doc.authors);
  const year            = compileYear(doc.year);
  const institution     = doc.institution || doc.source || ``;
  const institutionInfo = institution ? `${institution}.` : ``;
  const dateAccessed    = compileDateAccessed(doc.accessed);
  const url             = compileURL(doc.websites);

  return `${authors} ${year} <cite>${doc.title}</cite>. ${institutionInfo} ${dateAccessed} ${url}`;

}

export default function lingRef(doc) {

  const compile = compilers[doc.type];

  if (!compile) return ``;

  return compile(doc)
  .replace(/\.+/gu, `.`)
  .replace(/\s+/gu, ` `)
  .replace(/\s+(?<punctuation>[,.])/gu, `$<punctuation>`)
  .replace(/\.+/gu, `.`)
  .replace(/\s+/gu, ` `)
  .trim();

}
