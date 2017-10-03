
'use strict';

const path = require('path');

function log() {
  if (arguments && arguments.length > 0) {
    if (arguments[0].verbose === true) {
      let value = arguments[1];
      try {
        let vStack2 = ((new Error().stack).split("at ")[2]).trim().replace(/.*\(/,'').replace(/\).*/,'');
        let rootDir = __dirname.replace(/^(.*).node_modules(.*)$/, '$1');

        let exec = vStack2.replace(/\s.*/ig, "");
        exec = exec.substr(rootDir.length);
        exec = './lib' + exec;
        exec = path.normalize(exec);
        exec = exec.replace(/\\/g, '/');

        console.log(exec + ': ' + value);
      } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
      }
    }
  }
}

module.exports = log;
