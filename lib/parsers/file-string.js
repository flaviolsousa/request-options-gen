'use strict';

const fs = require('fs');
const log = require('log-verbose');

function execute(p, file) {
  let content = fs.readFileSync(file.fullName, p.encoding);

  let text;
  if (content.startsWith('`') && content.endsWith('`')) {
    try {
      /*jshint -W061 */
      text = eval(content);
      /*jshint +W061 */
    } catch (err) {
      log.force('Error: ', JSON.stringify(err));
      log.force('p: ', JSON.stringify(p));
      log.force('File: ', file.fullName);
      log.force('Content: \n', content);
    }
  } else {
    text = content;
  }

  return text;
}

module.exports = execute;