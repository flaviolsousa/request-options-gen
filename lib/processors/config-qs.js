'use strict';

var fileProperties = require('../parsers/file-properties');

var execute = function (p, file) {
  var objProperties = fileProperties(p, file);

  p.options.qs = p.options.qs || {};

  for (var key in objProperties) {
    if (objProperties.hasOwnProperty(key)) {
      p.options.qs[key] = objProperties[key];
    }
  }
};

module.exports = execute;