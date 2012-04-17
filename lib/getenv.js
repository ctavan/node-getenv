function _value(varName) {
  var value = process.env[varName];
  if (value === undefined) {
    throw new Error('GetEnv.Nonexistent: ' + varName + ' does not exist.');
  }
  return value;
}

var convert = {
  string: function(value) {
    return '' + value;
  },
  int: function(value) {
    var isInt = value.match(/^-?\d+$/);
    if (!isInt) {
      throw new Error('GetEnv.NoInteger: ' + value + ' is not an integer.');
    }

    return +value;
  },
  float: function(value) {
    var isInfinity = (+value === Infinity || +value === -Infinity);
    if (isInfinity) {
      throw new Error('GetEnv.Infinity: ' + value + ' is set to +/-Infinity.');
    }

    var isFloat = !(isNaN(value) || value === '');
    if (!isFloat) {
      throw new Error('GetEnv.NoFloat: ' + value + ' is not a number.');
    }

    return +value;
  },
  bool: function(value) {
    var isBool = (value === 'true' || value === 'false');
    if (!isBool) {
      throw new Error('GetEnv.NoBoolean: ' + value + ' is not a boolean.');
    }

    return (value === 'true');
  }
};

var getenv = function(varName) {
  return _value(varName);
};

Object.keys(convert).forEach(function(type) {
  getenv[type] = function(varName) {
    var value = _value(varName);
    return convert[type](value);
  };
});

getenv.array = function array(varName, type) {
  type = type || 'string';
  if (Object.keys(convert).indexOf(type) === -1) {
    throw new Error('GetEnv.ArrayUndefinedType: Unknown array type ' + type);
  }
  var value = _value(varName);
  return value.split(/\s*,\s*/).map(convert[type]);
};

module.exports = getenv;
