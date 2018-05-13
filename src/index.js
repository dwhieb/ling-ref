/**
 * Registers the helpers with Handlebars
 */

const createHelpers = require('./helpers');

const register = hbs => {
  const { is, md } = createHelpers(hbs);
  hbs.registerHelper({ is, md });
  return hbs;
};

module.exports = register;
