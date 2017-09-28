'use strict';

var path = require('path');
var log = require('../log');

var execute = function (p, file) {
  if (file.fullName.startsWith(path.sep)) {
    require(file.fullName)(p, file);
  } else {
    var func = require(path.resolve('.' + path.sep + file.fullName));
    if (typeof func === 'function') {
      func(p, file);
    } else {
      log(p, '[WARN] ' + file.fullName + ' is not a function: ' + func);
    }
  }
};

module.exports = execute;