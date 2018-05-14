/**
 * Registers the helpers with Handlebars
 */

const createHelpers = require('./helpers');

const register = hbs => {
  const helpers = createHelpers(hbs);
  hbs.registerHelper(helpers);
  return hbs;
};

module.exports = register;
