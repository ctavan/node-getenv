const assert = require('assert');

const getenv = require('../index');

const tests = {};

// order dependent test
tests['getenv.disableFallbacks() makes relying on fallbacks an error'] = function () {
  getenv.disableFallbacks();
  assert.throws(function () {
    getenv.string('url', 'http://localhost');
  });
  getenv.enableFallbacks();
};

Object.keys(tests).forEach(function (key) {
  console.log('Test: %s', key);
  tests[key]();
});
