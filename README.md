# getenv

[![Build Status](https://secure.travis-ci.org/ctavan/getenv.png)](http://travis-ci.org/ctavan/getenv)

Helper to get and typecast environment variables.

Unlike the C call an exception is thrown if the requested environment variable is not set.

## Installation

```
npm install getenv
```

## Usage

Set environment variables:

```bash
export HTTP_HOST="localhost"
export HTTP_PORT=8080
export HTTP_START=true
export AB_TEST_RATIO=0.5
export KEYWORDS="sports,business"
export PRIMES="2,3,5,7"
```

Get and use them:

```javascript
var getenv = require('getenv');

var host = getenv('HTTP_HOST'); // same as getenv.string('HTTP_HOST');
var port = getenv.int('HTTP_PORT');
var start = getenv.bool('HTTP_START');

if (start === true) {
  // var server = http.createServer();
  // server.listen(port, host);
}

var abTestRatio = getenv.float('AB_TEST_RATIO');

if (Math.random() < abTestRatio) {
  // test A
} else {
  // test B
}

var keywords = getenv.array('KEYWORDS');
keywords.forEach(function(keyword) {
  // console.log(keyword);
});

var primes = getenv.array('PRIMES', 'int');
primes.forEach(function(prime) {
  // console.log(prime, typeof prime);
});
```

## Changelog

### v0.1.0
- Initial release

## Authors

- Moritz von Hase (initial author)
- Christoph Tavan <dev@tavan.de>
- Jonas Dohse <jonas@dohse.ch>

## License

This module is licensed under the MIT license.
