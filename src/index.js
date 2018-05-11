// A Handlebars helper that checks whether the first and second argument are the same
const is = function(a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this); // eslint-disable-line no-invalid-this
};

export { is };
