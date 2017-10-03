'use strict';

const fileString = require('../parsers/file-string');

let execute = function (p, file) {
  let content = fileString(p, file);
  p.options.url = content;
};

module.exports = execute;