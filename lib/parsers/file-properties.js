'use strict';

const fs = require('fs');
const log = require('log-verbose');

function execute(p, file) {
  let content = fs.readFileSync(file.fullName, p.encoding);

  let items = {};
  let listItems = content.split(/[\r\n]+/);
  for (let i = 0; i < listItems.length; i++) {
    let line = listItems[i].trim();
    if (line && line.length > 0) {
      let lineSplitted = line.match(/^(.+?)\:(.+)$/);
      if (lineSplitted) {
        let label = lineSplitted[1];
        let value = lineSplitted[2];
        if (label && !label.match(/^\/\//g)) { // remove comments on file
          if (value.match(/^\s*`/) && value.match(/`\s*$/)) { // process templating strings
            try {
              /*jshint -W061 */
              items[label] = eval(value);
              /*jshint +W061 */
            } catch (err) {
              log.print('[ERROR]', JSON.stringify(err));
              log.print('p:', JSON.stringify(p));
              log.print('File:', file.fullName);
              log.print('Content:\n', content);
            }
          } else {
            items[label] = value;
          }
        }
      }
    }
  }
  return items;
}

module.exports = execute;