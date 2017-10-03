'use strict';

const fs = require('fs');

function execute(p, file) {
  let content = fs.readFileSync(file.fullName, p.encoding);

  let items = {};
  let listItems = content.split(/[\r\n]+/);
  for (let i = 0; i < listItems.length; i++) {
    let line = listItems[i].trim();
    if (line && line.length > 0) {
      let v = line.split(/\:/);
      if (!v[0].match(/^\/\//g)) { // remove comments on file
        if (v[1].startsWith('`') && v[1].endsWith('`')) { // process templating strings
          /*jshint -W061 */
          items[v[0]] = eval(v[1]);
          /*jshint +W061 */
        } else {
          items[v[0]] = v[1];
        }
      }
    }
  }
  return items;
}

module.exports = execute;