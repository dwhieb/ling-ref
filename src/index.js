const Handlebars       = require(`handlebars`);
const helpers          = require(`./helpers`);
const { readFileSync } = require(`fs`);

class LingRef {

  constructor({
    handlebars = Handlebars,
    partial    = `reference`,
    template   = `reference.hbs`,
  } = {}) {

    this.handlebars   = handlebars;
    this.partialName  = partial;
    this.templatePath = template;
    this.template     = readFileSync(this.templatePath, `utf8`);
    this.compile      = this.handlebars.compile(this.template);
    this.handlebars.registerPartial({ [this.partialName]: this.template });
    this.handlebars.registerHelper(helpers);

  }

}

module.exports = LingRef;
