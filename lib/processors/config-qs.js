'use strict';

const fileProperties = require('../parsers/file-properties');

function execute(p, file) {
  let objProperties = fileProperties(p, file);

  p.options.qs = p.options.qs || {};

  for (let key in objProperties) {
    if (objProperties.hasOwnProperty(key)) {
      p.options.qs[key] = objProperties[key];
    }
  }
}

module.exports = execute;