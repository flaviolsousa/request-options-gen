'use strict';

const fileString = require('../parsers/file-string');

function execute(p, file) {
  let content = fileString(p, file);
  p.options.method = content;
}

module.exports = execute;