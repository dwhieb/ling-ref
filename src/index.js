const handlebars       = require(`handlebars`);
const helpers          = require(`./helpers`);
const path             = require(`path`);
const { readFileSync } = require(`fs`);

const templatePath = path.join(__dirname, `reference.hbs`);

const defaults = {};

class LingRef {

  constructor(options = defaults) {
    this.template = readFileSync(templatePath, `utf8`);
    this.compile  = handlebars.compile(this.template);
    handlebars.registerPartial({ reference: this.template });
    handlebars.registerHelper(helpers);
  }

}

module.exports = LingRef;
