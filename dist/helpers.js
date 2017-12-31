/* globals
  Handlebars
*/

(() => {

  // A Handlebars helper that checks whether the first String ends with the second
  const endsWith = function(a, b, opts) {
    return a.endsWith(b) ? opts.fn(this) : opts.inverse(this); // eslint-disable-line no-invalid-this
  };

  // A Handlebars helper that checks whether the first and second argument are the same
  const is = function(a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this); // eslint-disable-line no-invalid-this
  };

  // Register Handlebars helpers
  Handlebars.registerHelper({ endsWith, is });

})();
