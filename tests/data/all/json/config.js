'use strict';

module.exports = function (p) {
  p.env = process.env.ENVIRONMENT || 'PRD';
};