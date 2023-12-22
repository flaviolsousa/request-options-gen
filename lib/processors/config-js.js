'use strict';

const path = require('path');
const log = require('log-verbose');

function execute(p, file) {
  if (file.fullName.startsWith(path.sep)) {
    require(file.fullName)(p, file);
  } else {
    let func = require(path.resolve(file.fullName));
    if (typeof func === 'function') {
      func(p, file);
    } else {
      log.print('[WARN]', file.fullName, 'is not a function:\n', '' + func);
    }
  }
}

module.exports = execute;