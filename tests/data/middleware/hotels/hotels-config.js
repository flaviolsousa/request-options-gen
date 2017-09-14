'use strict';

module.exports.execute = function (p) {
  p.hotels = p.hotels || {};
  p.hotels.middleware = p.hotels.middleware || {};

  switch (p.env) {
    case 'PRD':
      p.hotels.middleware.host = 'prod-lb-osb-public-1581218921.sa-east-1.elb.amazonaws.com';
      p.hotels.middleware.port = '80';
      break;
    case 'HOM':
      p.hotels.middleware.host = 'osb-qa.services.cvc.com.br';
      p.hotels.middleware.port = '80';
      break;
    default:
      p.hotels.middleware.host = '127.0.0.1';
      p.hotels.middleware.port = '7011';
  }
};