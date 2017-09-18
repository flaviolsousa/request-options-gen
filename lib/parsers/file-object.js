
'use strict';

var fileString = require('./file-string');

var execute = function (p, file) {
  var content = fileString(p, file);

  if (content.match(/^\s*\{/)) {
    try {
      var objContent = JSON.parse(content);
      return objContent;
    } catch (err) {
      return content;
    }
  } else {
    return content;
  }
};

module.exports = execute;