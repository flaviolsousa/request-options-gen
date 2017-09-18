'use strict';

var defaultOptions = {
  basePath: './data',
  useBasePath: true,
  verbose: false,
  encoding: 'utf8',
  clean: function () {
    this.options = {};
  }
};
defaultOptions.clean();

module.exports = defaultOptions;
