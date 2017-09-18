'use strict';


var fileProperties = require('../parsers/file-properties');

var execute = function (p, file) {
  var objProperties = fileProperties(p, file);

  p.options.headers = p.options.headers || {};

  for (var key in objProperties) {
    if (objProperties.hasOwnProperty(key)) {
      p.options.headers[key] = objProperties[key];
    }
  }
};

module.exports = execute;