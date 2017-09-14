(() => {
  'use strict';

  const dotenv = require('dotenv');
  const path = require('path');
  dotenv.load({
    path: path.resolve(__dirname, '../.env')
  });
  
  const log = require('../lib/commons/log');

  log.logLevel();

  describe("index", function () {
    /*
    beforeEach(function () {
       console.log("running something before each test");
    });
    */

    require('./mocha/hotel/middleware/sync-single-inter');
    //require('./mocha/hotel/middleware/async-single-inter');

    /*
    after(function () {
        console.log("after all tests");
    });
    */
  });
})();
