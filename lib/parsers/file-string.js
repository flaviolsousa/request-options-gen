'use strict';

const fs = require('fs');

function execute(p, file) {
  let content = fs.readFileSync(file.fullName, p.encoding);

  let text;
  if (content.startsWith('`') && content.endsWith('`')) {
    /*jshint -W061 */
    text = eval(content);
    /*jshint +W061 */
  } else {
    text = content;
  }

  return text;
}

module.exports = execute;