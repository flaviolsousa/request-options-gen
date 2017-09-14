'use strict';

module.exports.execute = function (p) {
  p.websocket = p.websocket || {};

  switch (p.env) {
    case 'DEV':
      p.websocket.protocol = 'http';
      p.websocket.host = 'websocket-dev.services.cvc.com.br';
      p.websocket.port = '80';
      break;
    case 'HOM':
      p.websocket.protocol = 'http';
      p.websocket.host = 'websocket-hom.services.cvc.com.br';
      p.websocket.port = '80';
      break;
    case 'TI':
      p.websocket.protocol = 'http';
      p.websocket.host = 'websocket-ti.services.cvc.com.br';
      p.websocket.port = '80';
      break;
    case 'PRD':
      p.websocket.protocol = 'https';
      p.websocket.host = 'gtw-websocket.services.cvc.com.br';
      p.websocket.port = '80';
      break;
    default:
      p.websocket.protocol = 'http';
      p.websocket.host = 'gtw-websocket.services.cvc.com.br';
      p.websocket.port = '80';
  }

  p.websocket.url = `${p.websocket.protocol}://${p.websocket.host}${p.websocket.port != "80" ? ":" + p.websocket.port : ''}`;
};