/**
 * Handlebars helpers used by the ling-ref template
 */

const markdown = require('./markdown');

const createHelpers = hbs => {

  /**
   * A Handlebars helper that checks whether the first and second arguments are the same
   * @param  {Any}     a    First argument to check
   * @param  {Any}     b    Second argument to check
   * @param  {Object}  opts The Handlebars options hash
   * @return {Boolean}
   */
  const is = function(a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this); // eslint-disable-line no-invalid-this
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
  };

};

module.exports = createHelpers;
