'use strict';

const merge = require('merge');
const fileObject = require('../parsers/file-object');

function execute(p, file) {
  let body = fileObject(p, file);
  if (typeof body === 'object' && typeof p.options.body === 'object') {
    merge(p.options.body, body);
  } else {
    p.options.body = body;
  }
}

module.exports = execute;