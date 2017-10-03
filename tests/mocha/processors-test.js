'use strict';

const assert = require('assert');
let filesPath = require('files-path');
const merge = require('merge');

const defaultOptions = require('../../lib/default-options');

const configJs = require('../../lib/processors/config-js');

describe('processors-test', function () {

  filesPath = filesPath({
    basePath: 'tests/data/all/json',
    useBasePath: true,
  });

  it('Test Config JS', function () {
    const options = merge(true, defaultOptions);
    const files = filesPath.sync({
      path: '.',
      filters: 'config.js',
    });

    configJs(options, files[0]);
    //console.log(JSON.stringify(options, null, 2));
    assert.ok(options.env && options.env.length > 0, 'js not work');
  });
  
  it('Test Config JS', function () {
    const options = merge(true, defaultOptions);
    const files = filesPath.sync({
      path: '.',
      filters: 'config.js',
    });

    configJs(options, files[0]);
    //console.log(JSON.stringify(options, null, 2));
    assert.ok(options.env && options.env.length > 0, 'js not work');
  });

});