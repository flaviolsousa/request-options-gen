# request-options-gen
JS Library to generate options for [request library](https://www.npmjs.com/package/request) by templates files

[![NPM version](https://img.shields.io/npm/v/request-options-gen.svg)](https://www.npmjs.com/package/files-path)
[![Build Status](https://travis-ci.org/flaviolsousa/request-options-gen.svg?branch=master)](https://travis-ci.org/flaviolsousa/request-options-gen)
[![codecov](https://codecov.io/gh/flaviolsousa/request-options-gen/branch/master/graph/badge.svg)](https://codecov.io/gh/flaviolsousa/request-options-gen)
[![dependencies Status](https://david-dm.org/flaviolsousa/request-options-gen/status.svg)](https://david-dm.org/flaviolsousa/request-options-gen)
[![Known Vulnerabilities](https://snyk.io/test/github/flaviolsousa/request-options-gen/badge.svg)](https://snyk.io/test/github/flaviolsousa/request-options-gen)

Super simple to use:
```
var rog = require('request-options-gen');
var request = require('request');

var options = rog.sync({
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
