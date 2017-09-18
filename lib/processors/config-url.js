'use strict';

var fileString = require('../parsers/file-string');

var execute = function (p, file) {
  var content = fileString(p, file);
  p.options.url = content;
};

module.exports = execute;