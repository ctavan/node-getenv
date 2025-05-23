const assert = require('assert');

const getenv = require('../index');

// Setting env vars for testing
process.env.TEST_GETENV_EMPTY_STRING = '';
process.env.TEST_GETENV_STRING = 'This is a string.';
process.env.TEST_GETENV_INT1 = '10';
process.env.TEST_GETENV_INT2 = '0';
process.env.TEST_GETENV_INT3 = '-1';
process.env.TEST_GETENV_FLOAT1 = '12.3';
process.env.TEST_GETENV_FLOAT2 = '0.0';
process.env.TEST_GETENV_INFINITY1 = Infinity;
process.env.TEST_GETENV_INFINITY2 = -Infinity;
process.env.TEST_GETENV_FALSE = 'false';
process.env.TEST_GETENV_FALSE1 = 'False';
process.env.TEST_GETENV_FALSE2 = 'FALSE';
process.env.TEST_GETENV_TRUE = 'true';
process.env.TEST_GETENV_TRUE1 = 'True';
process.env.TEST_GETENV_TRUE2 = 'TRUE';
process.env.TEST_GETENV_NOT_REALLY_TRUE = '1';
process.env.TEST_GETENV_NOT_REALLY_FALSE = '0';
process.env.TEST_GETENV_WRONG_NUMBER_INPUT = '3 test';
process.env.TEST_GETENV_STRING_ARRAY1 = 'one';
process.env.TEST_GETENV_STRING_ARRAY2 = 'one, two ,three , four';
process.env.TEST_GETENV_STRING_ARRAY3 = 'one, two,';
process.env.TEST_GETENV_STRING_ARRAY4 = ' ';
process.env.TEST_GETENV_STRING_ARRAY5 = 'one;two:three,four';
process.env.TEST_GETENV_STRING_ARRAY6 = 'one two ';
process.env.TEST_GETENV_INT_ARRAY = '1,2, 3';
process.env.TEST_GETENV_INT_ARRAY2 = '1  2 3';
process.env.TEST_GETENV_INT_ARRAY_INVALID1 = '1, 2.2, 3';
process.env.TEST_GETENV_INT_ARRAY_INVALID2 = '1, true, 3';
process.env.TEST_GETENV_INT_ARRAY_INVALID3 = '1, abc, 3';
process.env.TEST_GETENV_FLOAT_ARRAY = '1.9,2, 3e5';
process.env.TEST_GETENV_FLOAT_ARRAY2 = '1.9 2  3e5';
process.env.TEST_GETENV_FLOAT_ARRAY_INVALID1 = '1.9,true, 3e5';
process.env.TEST_GETENV_FLOAT_ARRAY_INVALID2 = '1.9, abc, 3e5';
process.env.TEST_GETENV_FLOAT_ARRAY_INVALID3 = '1.9, Infinity, 3e5';
process.env.TEST_GETENV_BOOL_ARRAY = 'true, false, true';
process.env.TEST_GETENV_BOOL_ARRAY2 = 'true false true';
process.env.TEST_GETENV_BOOL_ARRAY_INVALID1 = 'true, 1, true';
process.env.TEST_GETENV_BOOL_ARRAY_INVALID2 = 'true, 1.2, true';
process.env.TEST_GETENV_BOOL_ARRAY_INVALID3 = 'true, abc, true';

process.env.TEST_GETENV_URL_1 = 'tcp://localhost:80';
process.env.TEST_GETENV_URL_2 = 'tcp://localhost:2993';
process.env.TEST_GETENV_URL_3 = 'http://192.162.22.11:2993';

const tests = {};

tests['getenv() same as getenv.string()'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_STRING',
      expected: 'This is a string.',
    },
    {
      varName: 'TEST_GETENV_EMPTY_STRING',
      expected: '',
    },
  ];

  data.forEach(function (item) {
    const stringVar1 = getenv(item.varName);
    const stringVar2 = getenv.string(item.varName);
    assert.strictEqual(stringVar1, stringVar2);
  });
};

tests['getenv.string() valid input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_STRING',
      expected: 'This is a string.',
    },
    {
      varName: 'TEST_GETENV_EMPTY_STRING',
      expected: '',
    },
  ];

  data.forEach(function (item) {
    const stringVar = getenv.string(item.varName);
    assert.strictEqual(stringVar, item.expected);
  });
};

tests['getenv.string() nonexistent variable'] = function () {
  assert.throws(function () {
    getenv('TEST_GETENV_NONEXISTENT');
  });
  assert.throws(function () {
    getenv.string('TEST_GETENV_NONEXISTENT');
  });
};

tests['getenv.string() nonexistent variable with fallback'] = function () {
  const expect = 'fallback';
  let stringVar = getenv.string('TEST_GETENV_NONEXISTENT', expect);
  assert.strictEqual(stringVar, expect);
  stringVar = getenv('TEST_GETENV_NONEXISTENT', expect);
  assert.strictEqual(stringVar, expect);
};

tests['getenv.int() valid input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_INT1',
      expected: 10,
    },
    {
      //use default
      varName: 'TEST_GETENV_INT2',
      expected: 0,
    },
    {
      //use default
      varName: 'TEST_GETENV_INT3',
      expected: -1,
    },
  ];

  data.forEach(function (item) {
    const intVar = getenv.int(item.varName);
    assert.strictEqual(intVar, item.expected);
  });
};

tests['getenv.int() invalid input'] = function () {
  const data = [
    { varName: 'TEST_GETENV_FLOAT' },
    { varName: 'TEST_GETENV_WRONG_NUMBER_INPUT' },
    { varName: 'TEST_GETENV_EMPTY_STRING' },
    { varName: 'TEST_GETENV_INFINITY1' },
    { varName: 'TEST_GETENV_INFINITY2' },
  ];

  data.forEach(function (item) {
    assert.throws(function () {
      const intVar = getenv.int(item.varName);
    });
  });
};

tests['getenv.int() nonexistent variable'] = function () {
  assert.throws(function () {
    getenv.int('TEST_GETENV_NONEXISTENT');
  });
};

tests['getenv.int() nonexistent variable with fallback'] = function () {
  const expect = 10;
  const intVar = getenv.int('TEST_GETENV_NONEXISTENT', expect);
  assert.strictEqual(intVar, expect);
};

tests['getenv.float() valid input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_FLOAT1',
      expected: 12.3,
    },
    {
      varName: 'TEST_GETENV_FLOAT2',
      expected: 0.0,
    },
  ];

  data.forEach(function (item) {
    const floatVar = getenv.float(item.varName);
    assert.strictEqual(floatVar, item.expected);
  });
};

tests['getenv.float() invalid input'] = function () {
  const data = [
    { varName: 'TEST_GETENV_WRONG_NUMBER_INPUT' },
    { varName: 'TEST_GETENV_EMPTY_STRING' },
    { varName: 'TEST_GETENV_INFINITY1' },
    { varName: 'TEST_GETENV_INFINITY2' },
  ];

  data.forEach(function (item) {
    assert.throws(function () {
      const floatVar = getenv.float(item.varName);
    });
  });
};

tests['getenv.float() nonexistent variable'] = function () {
  assert.throws(function () {
    getenv.float('TEST_GETENV_NONEXISTENT');
  });
};

tests['getenv.float() nonexistent variable with fallback'] = function () {
  const expect = 2.2;
  const floatVar = getenv.float('TEST_GETENV_NONEXISTENT', expect);
  assert.strictEqual(floatVar, expect);
};

tests['getenv.bool() valid input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_FALSE',
      expected: false,
    },
    {
      varName: 'TEST_GETENV_FALSE1',
      expected: false,
    },
    {
      varName: 'TEST_GETENV_FALSE2',
      expected: false,
    },
    {
      varName: 'TEST_GETENV_TRUE',
      expected: true,
    },
    {
      varName: 'TEST_GETENV_TRUE1',
      expected: true,
    },
    {
      varName: 'TEST_GETENV_TRUE2',
      expected: true,
    },
  ];

  data.forEach(function (item) {
    const boolVar = getenv.bool(item.varName);
    assert.strictEqual(boolVar, item.expected);
  });
};

tests['getenv.bool() invalid input'] = function () {
  const data = [
    { varName: 'TEST_GETENV_STRING' },
    { varName: 'TEST_GETENV_EMPTY_STRING' },
    { varName: 'TEST_GETENV_NOT_REALLY_TRUE' },
    { varName: 'TEST_GETENV_NOT_REALLY_FALSE' },
  ];

  data.forEach(function (item) {
    assert.throws(function () {
      const boolVar = getenv.bool(item.varName);
    });
  });
};

tests['getenv.boolish() valid input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_FALSE',
      expected: false,
    },
    {
      varName: 'TEST_GETENV_TRUE',
      expected: true,
    },
    {
      varName: 'TEST_GETENV_NOT_REALLY_FALSE',
      expected: false,
    },
    {
      varName: 'TEST_GETENV_NOT_REALLY_TRUE',
      expected: true,
    },
  ];

  data.forEach(function (item) {
    const boolVar = getenv.boolish(item.varName);
    assert.strictEqual(boolVar, item.expected);
  });
};

tests['getenv.boolish() invalid input'] = function () {
  const data = [{ varName: 'TEST_GETENV_STRING' }, { varName: 'TEST_GETENV_EMPTY_STRING' }];

  data.forEach(function (item) {
    assert.throws(function () {
      const boolVar = getenv.boolish(item.varName);
    });
  });
};

tests['getenv.bool() nonexistent variable'] = function () {
  assert.throws(function () {
    getenv.bool('TEST_GETENV_NONEXISTENT');
  });
};

tests['getenv.bool() nonexistent variable with fallback'] = function () {
  const expect = true;
  const boolVar = getenv.bool('TEST_GETENV_NONEXISTENT', expect);
  assert.strictEqual(boolVar, expect);
};

tests['getenv.array() valid string (default) input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_EMPTY_STRING',
      expected: [''],
    },
    {
      varName: 'TEST_GETENV_STRING_ARRAY1',
      expected: ['one'],
    },
    {
      varName: 'TEST_GETENV_STRING_ARRAY2',
      expected: ['one', 'two', 'three', 'four'],
    },
    {
      varName: 'TEST_GETENV_STRING_ARRAY3',
      expected: ['one', 'two', ''],
    },
    {
      varName: 'TEST_GETENV_STRING_ARRAY4',
      expected: [' '],
    },
    {
      varName: 'TEST_GETENV_STRING_ARRAY5',
      expected: ['one;two:three', 'four'],
    },
  ];

  data.forEach(function (item) {
    const arrayVar = getenv.array(item.varName);
    assert.deepStrictEqual(arrayVar, item.expected);
  });
};

tests['getenv.array() valid inputs split by separator'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_STRING_ARRAY6',
      type: 'string',
      expected: ['one', 'two', ''],
    },
    {
      varName: 'TEST_GETENV_INT_ARRAY2',
      type: 'int',
      expected: [1, 2, 3],
    },
    {
      varName: 'TEST_GETENV_FLOAT_ARRAY2',
      type: 'float',
      expected: [1.9, 2, 3e5],
    },
    {
      varName: 'TEST_GETENV_BOOL_ARRAY2',
      type: 'boolish',
      expected: [true, false, true],
    },
  ];

  data.forEach(function (item) {
    const arrayVar = getenv.array(item.varName, item.type, [], /\s+/);
    assert.deepStrictEqual(arrayVar, item.expected);
  });
};

tests['getenv.array() valid integer input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_INT_ARRAY',
      expected: [1, 2, 3],
    },
  ];

  data.forEach(function (item) {
    const arrayVar = getenv.array(item.varName, 'int');
    // @TODO Something like https://github.com/joyent/node/issues/594 would be
    // handy.
    assert.strictEqual(arrayVar.length, item.expected.length);
    for (let i = 0; i < item.expected.length; i++) {
      assert.strictEqual(arrayVar[i], item.expected[i]);
    }
  });
};

tests['getenv.array() invalid integer input'] = function () {
  const data = [
    { varName: 'TEST_GETENV_INT_ARRAY_INVALID1' },
    { varName: 'TEST_GETENV_INT_ARRAY_INVALID2' },
    { varName: 'TEST_GETENV_INT_ARRAY_INVALID3' },
  ];

  data.forEach(function (item) {
    assert.throws(function () {
      const data = getenv.array(item.varName, 'int');
    });
  });
};

tests['getenv.array() valid float input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_FLOAT_ARRAY',
      expected: [1.9, 2, 3e5],
    },
  ];

  data.forEach(function (item) {
    const arrayVar = getenv.array(item.varName, 'float');
    assert.strictEqual(arrayVar.length, item.expected.length);
    for (let i = 0; i < item.expected.length; i++) {
      assert.strictEqual(arrayVar[i], item.expected[i]);
    }
  });
};

tests['getenv.array() invalid float input'] = function () {
  const data = [
    { varName: 'TEST_GETENV_FLOAT_ARRAY_INVALID1' },
    { varName: 'TEST_GETENV_FLOAT_ARRAY_INVALID2' },
    { varName: 'TEST_GETENV_FLOAT_ARRAY_INVALID3' },
  ];

  data.forEach(function (item) {
    assert.throws(function () {
      const data = getenv.array(item.varName, 'float');
    });
  });
};

tests['getenv.array() valid bool input'] = function () {
  const data = [
    {
      varName: 'TEST_GETENV_BOOL_ARRAY',
      expected: [true, false, true],
    },
  ];

  data.forEach(function (item) {
    const arrayVar = getenv.array(item.varName, 'bool');
    assert.strictEqual(arrayVar.length, item.expected.length);
    for (let i = 0; i < item.expected.length; i++) {
      assert.strictEqual(arrayVar[i], item.expected[i]);
    }
  });
};

tests['getenv.array() invalid bool input'] = function () {
  const data = [
    { varName: 'TEST_GETENV_BOOL_ARRAY_INVALID1' },
    { varName: 'TEST_GETENV_BOOL_ARRAY_INVALID2' },
    { varName: 'TEST_GETENV_BOOL_ARRAY_INVALID3' },
  ];

  data.forEach(function (item) {
    assert.throws(function () {
      const data = getenv.array(item.varName, 'bool');
    });
  });
};

tests['getenv.array() nonexistent variable'] = function () {
  assert.throws(function () {
    getenv.array('TEST_GETENV_NONEXISTENT');
  });
};

tests['getenv.array() nonexistent variable with fallback'] = function () {
  const expect = ['A', 'B', 'C'];
  const arrayVar = getenv.array('TEST_GETENV_NONEXISTENT', 'string', expect);
  assert.deepStrictEqual(arrayVar, expect);
};

tests['getenv.array() nonexistent type'] = function () {
  assert.throws(function () {
    getenv.array('TEST_GETENV_STRING_ARRAY1', 'unknown');
  });
};

tests['getenv.multi([string]) multiple env vars'] = function () {
  const spec = {
    foo: 'TEST_GETENV_STRING', // throws when nonexistant
  };
  const config = getenv.multi(spec);
  const expect = {
    foo: process.env.TEST_GETENV_STRING,
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv([string]) multiple env vars shortcut'] = function () {
  const spec = {
    foo: 'TEST_GETENV_STRING', // throws when nonexistant
  };
  const config = getenv(spec);
  const expect = {
    foo: process.env.TEST_GETENV_STRING,
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv.multi([string/throw]) multiple env vars'] = function () {
  const spec = {
    foo: 'TEST_GETENV_NONEXISTENT', // throws when nonexistant
  };
  assert.throws(function () {
    const config = getenv.multi(spec);
  });
};

tests['getenv.multi([string/typecast]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_STRING', undefined, 'string'],
  };
  const config = getenv.multi(spec);
  const expect = {
    foo: process.env.TEST_GETENV_STRING,
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv.multi([string/typecast/defaultval]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_NONEXISTENT', 'default', 'string'], // throws when nonexistant
  };
  const config = getenv.multi(spec);
  const expect = {
    foo: 'default',
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv.multi([string/typecast/throw]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_NONEXISTENT', undefined, 'string'], // throws when nonexistant
  };
  assert.throws(function () {
    const config = getenv.multi(spec);
  });
};

tests['getenv.multi([string/defaultval]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_STRING', 'default'], // throws when nonexistant
  };
  const config = getenv.multi(spec);
  const expect = {
    foo: process.env.TEST_GETENV_STRING,
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv.multi([string/defaultval/throw]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_NONEXISTENT', 'default'], // throws when nonexistant
  };
  const config = getenv.multi(spec);
  const expect = {
    foo: 'default',
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv.multi([string/single]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_STRING'], // throws when nonexistant
  };
  const config = getenv.multi(spec);
  const expect = {
    foo: process.env.TEST_GETENV_STRING,
  };
  assert.deepStrictEqual(expect, config);
};

tests['getenv.multi([string/single/throw]) multiple env vars'] = function () {
  const spec = {
    foo: ['TEST_GETENV_NONEXISTENT'], // throws when nonexistant
  };
  assert.throws(function () {
    const config = getenv.multi(spec);
  });
};

tests['getenv.url() valid input'] = function () {
  const expected = [
    { hostname: 'localhost', port: '80', protocol: 'tcp:' },
    { hostname: 'localhost', port: '2993', protocol: 'tcp:' },
    { hostname: '192.162.22.11', port: '2993', protocol: 'http:' },
  ];

  const prefix = 'TEST_GETENV_URL_';

  expected.forEach(function (expectation, i) {
    const parsed = getenv.url(prefix + (i + 1));
    const actual = Object.keys(expectation).reduce(function (h, key) {
      h[key] = parsed[key];
      return h;
    }, {});
    assert.deepStrictEqual(actual, expectation);
  });
};

Object.keys(tests).forEach(function (key) {
  console.log('Test: %s', key);
  tests[key]();
});
