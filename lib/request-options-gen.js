/*!
 * @name JavaScript/NodeJS request-options-gen (fp)
 * @author Flavio L Sousa
 * @repository https://github.com/flaviolsousa/files-path#readme

 * Copyright 2017 Flavio L Sousa - MIT license
 * http://www.apache.org/licenses/LICENSE-2.0.html
 */

'use strict';

const merge = require('merge');
const filesPath = require('files-path');

const defaultOptions = require('./default-options');
const log = require('log-verbose');

function process(options) {
  filesPath.sync(options);
  enrichRequestOptions(options);
}

function enrichRequestOptions(options) {
  if (options.options.body) {
    if (typeof options.options.body === 'object') {
      options.options.body = JSON.stringify(options.options.body);
    }
  }

  if (!options.options.method) {
    if (options.options.body) {
      options.options.method = 'POST';
    } else {
      options.options.method = 'GET';
    }
  }

  delete options.filters;
}

function enrichOptions(options) {
  options.options = {};
  options.useBasePath = true;
  options.request = (callback) => {
    const request = require('request');
    request(options.options, callback);
  };
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
  {
    pattern: '*method.txt',
    callback: function (file) {
      require('./processors/config-method')(options, file);
    }
  },
  ];
}

function RequestOptionsGen(options) {
  const instance = this;

  this.options = merge(true, defaultOptions);
  merge(this.options, options);

  this.gen = function (userOptions) {
    let options = merge(true, instance.options);
    options = merge(options, userOptions);
    enrichOptions(options);
    log(options, 'options: ' + JSON.stringify(options));
    process(options);
    log(options, 'options: ' + JSON.stringify(options));
    return options;
  };

  return this;
}


function create(options) {
  return new RequestOptionsGen(options);
}
const defaultInstance = create();
create.gen = defaultInstance.gen;
create.options = defaultInstance.options;

module.exports = create;
