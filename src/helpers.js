/**
 * Handlebars helpers used by the ling-ref template
 */

/* eslint-disable
  no-invalid-this,
*/

const markdown = require('./markdown');

const createHelpers = hbs => {

  /**
   * A Handlebars helper that replaces the specified regular expression with the given string
   * @param  {RegExp} expression  The regular expression to search for
   * @param  {String} replacement The String to replace matches of the regular expression with
   * @param  {Object} opts        The Handlebars options hash
   * @return {String}
   */
  const replace = function(expression, replacement, opts) {
    const regexp = new RegExp(expression, `gu`);
    return opts.fn(this).replace(regexp, replacement);
  };

  /**
   * A Handlebars helper that checks whether the first and second arguments are the same
   * @param  {Any}     a    First argument to check
   * @param  {Any}     b    Second argument to check
   * @param  {Object}  opts The Handlebars options hash
   * @return {Boolean}
   */
  const is = function(a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this);
  };

  /**
   * A Handlebars helper that converts Markdown to HTML
   * @param  {String} text The Markdown text to convert
   * @return {String}
   */
  const md = function(text) {
    if (!text) return ``;
    return new hbs.SafeString(markdown.render(text));
  };

  return {
    is,
    md,
    replace,
  };

};

module.exports = createHelpers;
