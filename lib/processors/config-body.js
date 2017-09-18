'use strict';

var merge = require('merge');
var fileObject = require('../parsers/file-object');

var execute = function (p, file) {
  var body = fileObject(p, file);
  if (typeof body === 'object' && typeof p.options.body === 'object') {
    merge(p.options.body, body);
  } else {
    p.options.body = body;
  }
};

module.exports = execute;