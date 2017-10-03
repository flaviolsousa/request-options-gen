'use strict';


const fileProperties = require('../parsers/file-properties');

function execute(p, file) {
  let objProperties = fileProperties(p, file);

  p.options.headers = p.options.headers || {};

  for (let key in objProperties) {
    if (objProperties.hasOwnProperty(key)) {
      p.options.headers[key] = objProperties[key];
    }
  }
}

module.exports = execute;