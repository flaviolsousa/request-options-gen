
'use strict';

const fileString = require('./file-string');

function execute(p, file) {
  let content = fileString(p, file);

  if (content.match(/^\s*\{/)) {
    try {
      let objContent = JSON.parse(content);
      return objContent;
    } catch (err) {
      return content;
    }
  } else {
    return content;
  }
}

module.exports = execute;