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
      log.print('[ERROR]', JSON.stringify(err));
      log.print('p:', JSON.stringify(p));
      log.print('File:', file.fullName);
      log.print('Content:\n', content);
    }
  } else {
    text = content;
  }

  return text;
}

module.exports = execute;