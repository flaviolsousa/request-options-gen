/*!
 * @name JavaScript/NodeJS request-options-gen (fp)
 * @author Flavio L Sousa
 * @repository https://github.com/flaviolsousa/files-path#readme

 * Copyright 2017 Flavio L Sousa - MIT license
 * http://www.apache.org/licenses/LICENSE-2.0.html
 */

'use strict';

var merge = require('merge');
var filesPath = require('files-path');

var defaultOptions = require('./default-options');
var log = require('./log');


function process(options) {
  filesPath.sync(options);
  delete options.filters;
}

function enrichOptions(options) {
  options.useBasePath = true;
  options.filters = [{
    pattern: '*config.js',
    callback: function (file) {
      require('./processors/config-js')(options, file);
    }
  },
  {
    pattern: '*qs.txt',
    callback: function (file) {
      require('./processors/config-qs')(options, file);
    }
  },
  {
    pattern: '*headers.txt',
    callback: function (file) {
      require('./processors/config-headers')(options, file);
    }
  },
  {
    pattern: '*body.txt',
    callback: function (file) {
      require('./processors/config-body')(options, file);
    }
  },
  {
    pattern: '*url.txt',
    callback: function (file) {
      require('./processors/config-url')(options, file);
    }
  },
  ];
}

function RequestOptionsGen(options) {
  var instance = this;

  this.options = merge(true, defaultOptions);
  merge(this.options, options);

  this.sync = function (userOptions) {
    var options = merge(true, instance.options);
    options = merge(options, userOptions);
    enrichOptions(options);
    log(options, 'options: ' + JSON.stringify(options));
    process(options);
    log(options, 'options: ' + JSON.stringify(options));
    return options.options;
  };

  return this;
}


function create(options) {
  return new RequestOptionsGen(options);
}
var defaultInstance = create();
create.sync = defaultInstance.sync;
create.options = defaultInstance.options;

module.exports = create;
