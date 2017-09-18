'use strict';

var rog = require('../../lib/request-options-gen');

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
      path: 'all/json/subfolder',
      verbose: true
    };
    var data = rog.sync(options);
    // console.log('sync-test:20', JSON.stringify(data, null, 2));
    done();
  });

});