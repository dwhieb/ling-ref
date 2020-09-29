const compilers = {
  journal: compileArticle,
};

// compilers for specific fields

function compileAuthors(authors) {

  const firstAuthor     = authors.pop();
  const firstAuthorText = `${firstAuthor.last_name}, ${firstAuthor.first_name}`;

  if (!authors.length) return firstAuthorText;

  const lastAuthor = authors.pop();
  const lastAuthorText = ` & ${lastAuthor.first_name} ${lastAuthor.last_name}`;

  if (!authors.length) return `${firstAuthorText}${lastAuthorText}`;

  let text = firstAuthorText;

  authors.forEach(({ first_name, last_name }) => {
    text += `, ${first_name} ${last_name}`;
  });

  text += lastAuthorText;

  return text;

}

function compileDOI(doi) {
  if (doi) return ` DOI:<a href="https://doi.org/${doi}">${doi}</a>.`;
  return ``;
}

function compileIssue(issue) {
  if (issue) return `(${issue})`;
  return ``;
}

function compilePages(pages) {
  return pages.replace(/-+/u, `–`);
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

  return `${authors}. ${year}. ${doc.title}. <cite>${doc.source}</cite> ${doc.volume}${issue}: ${pages}.${doi}`;

}

export default function lingRef(doc) {

  const compile = compilers[doc.type];

  if (!compile) return ``;

  return compile(doc)
  .replace(/\.{2,}/gu, `.`)
  .replace(/\s{2,}/gu, ` `);

}
