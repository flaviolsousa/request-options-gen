'use strict';

const path = require('path');
const log = require('log-verbose');

function execute(p, file) {
  if (file.fullName.startsWith(path.sep)) {
    require(file.fullName)(p, file);
  } else {
    let func = require(path.resolve('.' + path.sep + file.fullName));
    if (typeof func === 'function') {
      func(p, file);
    } else {
      log(p, '[WARN] ' + file.fullName + ' is not a function: ' + func);
    }
  }
}

module.exports = execute;