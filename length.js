/*!
 * length.js v0.0.5 (https://github.com/appalaszynski/length.js)
 * Copyright (c) 2018 appalaszynski (https://github.com/appalaszynski)
 * Licensed under MIT (https://github.com/appalaszynski/length.js/blob/master/LICENSE)
 */
;(function (global) {

  // Main length function (availavlable by global.length) which is
  // allowing us to create an object by calling 'length()' instead of 'new Length()'
  var length = function (value, unit) {
    return new Length(value, unit)
  }

  // Current length.js version.
  var version = "0.0.5";

  // Currently supported units.
  var supportedUnits = ['cm', 'dm', 'm', 'km', 'in', 'ft', 'yd', 'mi'];

  // Function used during new Length object creation. Check 'length' function.
  function validate(value, unit) {
    if (!value || !unit) {
      throw Error('You have to pass value and unit type!')
    } else if (typeof value !== 'number') {
      throw Error('Value must be a number!')
    } else if (supportedUnits.indexOf(unit) == -1) {
      throw Error('Unsupported unit type! Supported units list:\n' + supportedUnits)
    }
  }

  function toStandard(value, unit) {
    var toStandardByUnit = {
      cm: function() {
        return value;
      },
      dm: function() {
        return value * 10;
      },
      m: function() {
        return value * 100;
      },
      km: function() {
        return value * 10000;
      },
      in: function() {
        return value * 2.54;
      },
      ft: function() {
        return value * 30.48;
      },
      yd: function() {
        return value * 91.44;
      },
      mi: function() {
        return value *  16093.43979;
      },
    }
    // Returns value in centimeters
    return toStandardByUnit[unit];
  }

  function to(unit) {
    // Just check if passed unit is available - value is not important in this case
    validate(1, unit);
    var standardUnit = toStandard(this.value, this.unit)();

    var toByUnit = {
      cm: function() {
        return standardUnit;
      },
      dm: function() {
        return standardUnit * 0.1;
      },
      m: function() {
        return standardUnit * 0.01;
      },
      km: function() {
        return standardUnit * 0.0001;
      },
      in: function() {
        return standardUnit * (1 / 2.54);
      },
      ft: function() {
        return standardUnit * (1 / 30.48);
      },
      yd: function() {
        return standardUnit * (1 / 91.44);
      },
      mi: function() {
        return standardUnit * (1 /  16093.43979);
      },
    }

    this.unit = unit;
    this.value = toByUnit[unit]()

    return this;
  }

  function add(value) {
    if (typeof value !== 'number' || !value || value <= 0) {
      throw Error('add() argument must be number bigger than 0!')
    }
    this.value = this.value + value;
    return this;
  }

  function getValue() {
    return this.value;
  }

  function getUnit() {
    return this.unit;
  }

  function getString(digits) {
    var value;

    value = digits ? this.value.toFixed(digits) : this.value;
    return value + this.unit;
  }

  // Initialize Length object prototype
  var proto = Length.prototype = {};
  // Insert functions into Length object prototype
  proto.version = version;
  proto.to = to;
  proto.add = add;
  proto.getValue = getValue;
  proto.getUnit = getUnit;
  proto.getString = getString;

  // Expose Length prototype If user wants to add new functions
  length.fn = proto;

  // The actual Length object is created here
  function Length(value, unit) {
    validate(value, unit);
    this.value = value;
    this.unit = unit;
  }

  // Expose 'length' and 'L$' identifiers
  global.length = global.L$ = length;
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = length
  }

}(this));
