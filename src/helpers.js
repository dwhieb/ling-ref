/**
 * Handlebars helpers used by the ling-ref template
 */

/* eslint-disable
  eqeqeq,
  no-invalid-this,
*/

const { decode } = require(`he`);
const handlebars = require(`handlebars`);
const markdown   = require(`./markdown`);

const months = {
  1:  `January`,
  2:  `February`,
  3:  `March`,
  4:  `April`,
  5:  `May`,
  6:  `June`,
  7:  `July`,
  8:  `August`,
  9:  `September`,
  10: `October`,
  11: `November`,
  12: `December`,
};

/**
 * Checks whether the first and second arguments are the same
 * @param  {Any}     a    First argument to check
 * @param  {Any}     b    Second argument to check
 * @param  {Object}  opts The Handlebars options hash
 * @return {Boolean}
 */
function is(a, b, opts) {
  return a == b ? opts.fn(this) : opts.inverse(this);
}

/**
 * Converts Markdown to HTML, and unescapes any escaped HTML characters, <br>s, or newlines.
 * @param  {String} text   The Markdown text to convert
 * @param  {String} inline Whether to use inline text or a block paragraph to render text into. Must be set to "inline" to render inline
 * @return {String}        Returns the HTML string
 */
function md(text, inline) {

  if (!text) return ``;

  const method = inline === `inline` ? `renderInline` : `render`;

  // Unescape HTML, <br> and newline characters
  const breakRegExp   = new RegExp(`<br[ /]*>`, `gu`);
  const newlineRegExp = new RegExp(`\\\\n`, `gu`);

  const unescapedText = decode(text)
  .replace(breakRegExp, `\n`)
  .replace(newlineRegExp, `\n`);

  return new handlebars.SafeString(markdown[method](unescapedText));

}

/**
 * Converts a numeric representation of a month to a string
 * @param  {Integer} m The number of the month
 * @return {String}    The name of the month for that number
 */
function month(m) {
  return months[m] || m;
}

/**
 * A Handlebars helper that replaces the specified regular expression with the given string
 * @param  {RegExp} expression  The regular expression to search for
 * @param  {String} replacement The String to replace matches of the regular expression with
 * @param  {Object} opts        The Handlebars options hash
 * @return {String}
 */
function replace(expression, replacement, opts) {
  const regexp = new RegExp(expression, `gu`);
  return opts.fn(this).replace(regexp, replacement);
}

module.exports = {
  'lr-is':      is,
  'lr-md':      md,
  'lr-month':   month,
  'lr-replace': replace,
};
