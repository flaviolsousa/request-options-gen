'use strict';

var assert = require('assert');
var filesPath = require('files-path');
var merge = require('merge');

var defaultOptions = require('../../lib/default-options');

var configHeaders = require('../../lib/processors/config-headers');
var configJs = require('../../lib/processors/config-js');

describe('processors-test', function () {

  filesPath = filesPath({
    basePath: 'tests/data/all/json',
    useBasePath: true,
  });

  it('Test Config Header', function () {
    var options = merge(true, defaultOptions);
    var files = filesPath.sync({
      path: '.',
      filters: 'generic-headers.txt',
    });

    configHeaders(options, files[0]);

    assert.ok(options.options.headers['Content-Type'] === 'application/json', 'header not work');
    assert.ok(options.options.headers['gtw-transaction-id'].indexOf(require('os').hostname()) >= 0, 'header not work');

  });

  it('Test Config JS', function () {
    var options = merge(true, defaultOptions);
    var files = filesPath.sync({
      path: '.',
      filters: 'config.js',
    });

    configJs(options, files[0]);
    //console.log(JSON.stringify(options, null, 2));
    assert.ok(options.env && options.env.length > 0, 'js not work');
  });
  
  it('Test Config JS', function () {
    var options = merge(true, defaultOptions);
    var files = filesPath.sync({
      path: '.',
      filters: 'config.js',
    });

    configJs(options, files[0]);
    //console.log(JSON.stringify(options, null, 2));
    assert.ok(options.env && options.env.length > 0, 'js not work');
  });

});