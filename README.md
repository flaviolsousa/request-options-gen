# request-options-gen
JS Library to generate options for [request library](https://www.npmjs.com/package/request) by templates files

[![NPM version](https://img.shields.io/npm/v/request-options-gen.svg)](https://www.npmjs.com/package/request-options-gen)
[![Build Status](https://travis-ci.org/flaviolsousa/request-options-gen.svg?branch=master)](https://travis-ci.org/flaviolsousa/request-options-gen)
[![codecov](https://codecov.io/gh/flaviolsousa/request-options-gen/branch/master/graph/badge.svg)](https://codecov.io/gh/flaviolsousa/request-options-gen)
[![dependencies Status](https://david-dm.org/flaviolsousa/request-options-gen/status.svg)](https://david-dm.org/flaviolsousa/request-options-gen)
[![Known Vulnerabilities](https://snyk.io/test/github/flaviolsousa/request-options-gen/badge.svg)](https://snyk.io/test/github/flaviolsousa/request-options-gen)
Install
```
npm install --save request
npm install --save request-options-gen
```
Super simple to use:
```
var rog = require('request-options-gen');
var request = require('request');

var options = rog.gen({
  basePath: 'tests/data',
  path: 'reqres/list-users'
});

console.log('Options: ');
console.log(JSON.stringify(options));

request(options,  function (error, response, body) {
  console.log('\nBody: ');
  console.log(JSON.stringify(JSON.parse(body)));
});
```

Will process the following files with this template [folder](https://github.com/flaviolsousa/request-options-gen/tree/master/tests/data):
```
♦
└┄ ▼ tests
   └┄ ▼ data
      ├┄ ▼ reqres
      │  ├┄ ▼ list-users
      │  │  ├┄ • qs.txt
      │  │  └┄ • url.txt
      │  ├┄ • default-headers.txt
      │  └┄ • init-config.js
      ├┄ • config.js
      └┄ • generic-headers.txt
```

```json
Options:
{
	"headers": {
		"Content-Type": "application/json",
		"gtw-transaction-id": "2017-09-28T16:33:45.280Z-Note_M_17294",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache"
	},
	"qs": {
		"page": "2"
	},
	"url": "https://reqres.in/api/users"
}

Body: 
{
	"page": 2,
	"per_page": 3,
	"total": 12,
	"total_pages": 4,
	"data": [{
			"id": 4,
			"first_name": "Eve",
			"last_name": "Holt",
			"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
		}, {
			"id": 5,
			"first_name": "Charles",
			"last_name": "Morris",
			"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
		}, {
			"id": 6,
			"first_name": "Tracey",
			"last_name": "Ramos",
			"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
		}
	]
}
```

## Table of contents
- [Methods](#methods)
- [Specials Files](#specials-files)
- [Options](#options)

[back to top](#table-of-contents)

---

## Methods

See: [Options](#options)
Method 1: _Without edit options_
```
const rog = require('request-options-gen');
rog.gen(options).request(callback);
```

Method 2: _Permit edit options_
```
const request = require('request');
const rog = require('request-options-gen');
let data = rog.gen(options);
request(data.options, callback);
```

[back to top](#table-of-contents)

---

## Options

<dl>
  <dt>basePath</dt>
  <dd>
    <em>Default: <b>.</b> (current folder)</em>
    <br/>
    Initial folder search
    <br/>
    <em>The files on this path will not be returned</em>
    <br/>
    <code>./my/relative/initial/path</code>
  </dd>
  
  <dt>Path</dt>
  <dd>
    <em><b>Required</b></em>
    <br/>
    Specials files on this path will be processed
    <br/>
    <code>./folders/to/search/files/dir-1/dir-2/dir-n</code>
  </dd>

  <dt>verbose</dt>
  <dd>
    <em>Default: <b>false</b></em>
    <br/>
    Show logs on console
  </dd>
</dl>

[back to top](#table-of-contents)

---

## Specials Files 
Named files that end with: 

#### url.txt
  Generate:
  ```
  {
    "url": "${value}"
  }
  ```
  Sample File 1:
  ```
  http://google.com
    ↕
  {
    "url": "http://google.com"
  }
  ```
  Sample File 2:
  ```
  `http://${p.host}:${p.port}.com/my-url/`
    ↕
  {
    "url": "http://my-host:8080.com/my-url/"
  }
  ```

#### qs.txt
  Generate:
  ```
  {
    "qs": {
      "${attr-name-1}": "${attr-value}",
      "${attr-name-2}": "${attr-value}",
      "${attr-name-n}": "${attr-value}"
    }
  }
  ```
  Sample File:
  ```
  id:`require('uuid/v4')()`
  page:2
    ↕
  {
    "qs": {
      "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
      "page": "2"
    }
  }
  ```

#### headers.txt
  ```
  {
    "headers": {
      "${attr-name-1}": "${attr-value}",
      "${attr-name-2}": "${attr-value}",
      "${attr-name-n}": "${attr-value}"
    }
  }
  ```
  Sample File:
  ```
  Pragma:no-cache
  Cache-Control:no-cache
  x-time:`new Date().toISOString()`
    ↕
  {
    "headers": {
      "Pragma": "no-cache",
      "Cache-Control": "no-cache",
      "x-time": "2017-10-02T14:11:35.511Z"
    }
  }
  ```

#### body.txt
  ```
  {
    "body": "${value}"
  }
  ```

#### config.js
  Generates temporary values to be used by other processors.
  ##### Sample:
  ###### data/main-config.js
  ```js
  'use strict';
  module.exports = function (p) {
    p.env = process.env.ENVIRONMENT || 'PRD';
    p.hotels = p.hotels || {};
    p.hotels.middleware = p.hotels.middleware || {};

    switch (p.env) {
      case 'PRD':
        p.hotels.middleware.host = 'prod.sample.com.br';
        p.hotels.middleware.port = '80';
        break;
      default:
        p.hotels.middleware.host = '127.0.0.1';
        p.hotels.middleware.port = '7011';
    }
  };
  ```
  ###### data/hotel/url.txt
  ```
  `http://${p.hotels.middleware.host}:${p.hotels.middleware.port}/hotels`
  ```
  Generate:
  - if ENVIRONMENT == PRD: http://prod.sample.com.br:80/hotels
  - if ENVIRONMENT <> PRD: http://127.0.0.1:7011/hotels

[back to top](#table-of-contents)

---