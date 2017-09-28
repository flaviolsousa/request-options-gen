'use strict';

var assert = require('assert');
var request = require('request');

var rog = require('../../lib/request-options-gen');
var log = require('../../lib/log');

describe('main', function () {
  // only skip
  /*
  it.only('TMP TEST', function () {
    var fp = requireLib(); //require('files-path');
    
  });
  */

  it('Basic test all', function (done) {
    var options = {
      basePath: 'tests/data',
      path: 'all/json/subfolder'
    };
    var data = rog.sync(options);

    assert.ok(data.env === 'PRD_override', 'data.env -> Overide js not work');

    assert.ok(data.options.qs.source === 'CVC', 'source -> Overide qs on subfolder');
    assert.ok(data.options.qs.preferences === 'persistLog', 'preferences-> New qs on subfolder');
    assert.ok(data.options.qs.zoneId === '13528', 'zoneId -> qs on first folder');

    assert.ok(data.options.headers['Gtw-Agent-Sign'] === 'LOJ', 'Gtw-Agent-Sign -> Overide headers on subfolder');
    assert.ok(data.options.headers['Gtw-WebSocket-Id'] === 'qwertyu', 'Gtw-WebSocket-Id -> New overide on subfolder');
    assert.ok(data.options.headers['Gtw-Username'] === 'MTZCPD262', 'Gtw-Username -> header on first folder');

    assert.ok(data.options.url === 'http://PRD_override/hotels', 'Overide url not work');

    done();
  });

  it('reqres\list-users', function (done) {
    var options = {
      basePath: 'tests/data',
      path: 'reqres/list-users',
      // verbose: true,
    };
    var data = rog.sync(options);

    log(options, 'request return data: ' + JSON.stringify(data));
    request(data, function (error, response, body) {
      log(options, 'request return error: ' + JSON.stringify(error));
      log(options, 'request return body: ' + JSON.stringify(body));

      assert.ok(!error, 'request return error: ' + JSON.stringify(error));
      assert.ok(body, 'request return body: ' + JSON.stringify(body));

      body = JSON.parse(body);

      assert.ok(body.page === 2, 'Do not return page == 2');
      assert.ok(body.data.length > 0, 'Do not return page == 2');

      done();
    });

  });

  it('reqres\list-users - overide page to 3', function (done) {
    var options = {
      basePath: 'tests/data',
      path: 'reqres/list-users/page3',
      // verbose: true,
    };
    var data = rog.sync(options);

    log(options, 'request return data: ' + JSON.stringify(data));
    request(data, function (error, response, body) {
      log(options, 'request return error: ' + JSON.stringify(error));
      log(options, 'request return body: ' + JSON.stringify(body));

      assert.ok(!error, 'request return error: ' + JSON.stringify(error));
      assert.ok(body, 'request return body: ' + JSON.stringify(body));

      body = JSON.parse(body);

      assert.ok(body.page === 3, 'Do not return page == 2');
      assert.ok(body.data.length > 0, 'Do not return page == 2');

      done();
    });

  });

});
