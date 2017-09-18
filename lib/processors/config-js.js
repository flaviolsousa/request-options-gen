'use strict';

var path = require('path');

var execute = function (p, file) {
  if (file.fullName.startsWith(path.sep)) {
    require(file.fullName)(p, file);
  } else {
    require.main.require('.' + path.sep + file.fullName)(p, file);
  }
};

module.exports = execute;