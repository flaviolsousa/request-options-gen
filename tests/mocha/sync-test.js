'use strict';

const assert = require('assert');
const request = require('request');

const rog = require('../../lib/request-options-gen');
const log = require('log-verbose');

describe('main', function () {

  log({ verbose: true }, "Init");
  // only skip
  /*
  it.only('TMP TEST', function () {
    var fp = requireLib(); //require('files-path');
    
  });
  */

  it('Basic test all', function (done) {
    const options = {
      basePath: 'tests/data',
      path: 'all/json/subfolder'
    };
    let data = rog.gen(options);

    assert.ok(data.env === 'PRD_override', 'data.env -> Overide js not work');

    assert.ok(data.options.qs.source === 'CVC', 'source -> Overide qs on subfolder');
    assert.ok(data.options.qs.preferences === 'persistLog', 'preferences-> New qs on subfolder');
    assert.ok(data.options.qs.zoneId === '13528', 'zoneId -> qs on first folder');
    assert.ok(data.options.qs.checkIn.endsWith('T12:00:00'), 'checkIn without time: ' + data.options.qs.checkIn);
    
    assert.ok(data.options.headers['Gtw-Agent-Sign'] === 'LOJ', 'Gtw-Agent-Sign -> Overide headers on subfolder');
    assert.ok(data.options.headers['Gtw-WebSocket-Id'] === 'qwertyu', 'Gtw-WebSocket-Id -> New overide on subfolder');
    assert.ok(data.options.headers['Gtw-Username'] === 'MTZCPD262', 'Gtw-Username -> header on first folder');

    assert.ok(data.options.url === 'http://PRD_override/hotels', 'Overide url not work');

    done();
  });

  it('reqres\\list-users', function (done) {
    const options = {
      basePath: 'tests/data',
      path: 'reqres/list-users',
      // verbose: true,
    };
    let data = rog.gen(options);

    log(options, 'request return data: ' + JSON.stringify(data));
    request(data.options, function (error, response, body) {
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

  it('reqres\\list-users - overide page to 3', function (done) {
    const options = {
      basePath: 'tests/data',
      path: 'reqres/list-users/page3',
      // verbose: true,
    };
    let data = rog.gen(options);

    log(options, 'request return data: ' + JSON.stringify(data));
    request(data.options, function (error, response, body) {
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

  it('reqres\\create-users - POST', function (done) {
    const options = {
      basePath: 'tests/data',
      path: 'reqres/create-user',
      // verbose: true,
    };
    rog.gen(options).request(function (error, response, body) {
      log(options, 'request return error: ' + JSON.stringify(error));
      log(options, 'request return body: ' + JSON.stringify(body));

      assert.ok(!error, 'request return error: ' + JSON.stringify(error));
      assert.ok(body, 'request return body: ' + JSON.stringify(body));

      body = JSON.parse(body);

      assert.ok(body.id > 0, 'User not created');

      describe('POS -> reqres\\create-users - POST', function () {
        it('reqres\\update-user - PUT', function (done) {
          options.user = body;
          options.path = 'reqres/update-user';
          rog.gen(options).request(function (error, response, body) {
            assert.ok(!error, 'request return error: ' + JSON.stringify(error));
            assert.ok(body, 'request return body: ' + JSON.stringify(body));

            log(options, body);
            body = JSON.parse(body);

            assert.ok(body.updatedAt, 'User not updated');
            done();
          });
        });
      });

      done();
    });

  });

});
