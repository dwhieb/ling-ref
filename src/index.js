const Handlebars       = require(`handlebars`);
const helpers          = require(`./helpers`);
const path             = require(`path`);
const { readFileSync } = require(`fs`);

const templatePath = path.join(__dirname, `reference.hbs`);

const defaults = {
  handlebars: Handlebars,
};

class LingRef {

  constructor(options = defaults) {

    const { handlebars } = options;

    this.handlebars = handlebars;
    this.template   = readFileSync(templatePath, `utf8`);
    this.compile    = this.handlebars.compile(this.template);
    this.handlebars.registerPartial({ reference: this.template });
    this.handlebars.registerHelper(helpers);

  }

}

module.exports = LingRef;
