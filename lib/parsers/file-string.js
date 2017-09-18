'use strict';

var fs = require('fs');

var execute = function (p, file) {
  var content = fs.readFileSync(file.fullName, p.encoding);

  var text;
  if (content.startsWith('`') && content.endsWith('`')) {
    text = eval(content);
  } else {
    text = content;
  }

  return text;
};

module.exports = execute;