'use strict';

const DEFAULT_OPTIONS = {
  basePath: './data',
  useBasePath: true,
  verbose: false,
  encoding: 'utf8',
  clean: function () {
    this.options = {};
  }
};
DEFAULT_OPTIONS.clean();

module.exports = DEFAULT_OPTIONS;
