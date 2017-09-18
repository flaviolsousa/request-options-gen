'use strict';

var fs = require('fs');

var execute = function (p, file) {
  var content = fs.readFileSync(file.fullName, p.encoding);
  
  var items = {};
  var listItems = content.split(/[\r\n]+/);
  for (var i = 0; i < listItems.length; i++) {
    var line = listItems[i].trim();
    if (line && line.length > 0) {
      var v = line.split(/\:/);
      if (!v[0].match(/^\/\//g)) { // remove comments on file
        if (v[1].startsWith('`') && v[1].endsWith('`')) { // process templating strings
          items[v[0]] = eval(v[1]);
        } else {
          items[v[0]] = v[1];
        }
      }
    }
  }
  return items;
};

module.exports = execute;