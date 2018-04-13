/*!
 * length.js v0.0.1 (https://github.com/appalaszynski/length.js)
 * Copyright (c) 2018 appalaszynski (https://github.com/appalaszynski)
 * Licensed under MIT (https://github.com/appalaszynski/length.js/blob/master/LICENSE)
 */
;(function (global) {

  // Main length function (availavlable by global.length) which is
  // allowing us to create an object by calling 'length()' istead of 'new Length()'
  var length = function (value, unit) {
    // Check if passed arguments are valid. If not - throw an error.
    validate(value, unit);
    return new Length(value, unit)
  }

  // Current length.js version.
  var version = "0.0.1";

  // Currently supported units.
  var supportedUnits = ['cm', 'm', 'ft', 'in'];

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
    const toStandardByUnit = {
      'm': () => value * 100,
      'cm': () => value,
      'ft': () => value * 30.48,
      'in': () => value * 2.54,
    }
    // Returns value in centimeters
    return toStandardByUnit[unit];
  }

  function to(unit) {
    // Just check if passed unit is available - value is not important in this case
    validate(1, unit);
    const standardUnit = toStandard(this.value, this.unit)();

    const toByUnit = {
      'm': () => standardUnit * 0.01,
      'cm': () => standardUnit,
      'ft': () => standardUnit * (1 / 30.48),
      'in': () => standardUnit * (1 / 2.58),
    }

    return toByUnit[unit]();
  }

  // Initialize Length object prototype
  var proto = Length.prototype = {};
  // Insert functions into Length object prototype
  proto.version = version;
  proto.to = to;

  // Expose Length prototype If user wants to add new functions
  length.fn = proto;

  // The actual Length object is created here
  function Length(value, unit) {
    this.value = value || 1;
    this.unit = unit || 'cm';
  }

  // Expose 'length' and 'L$' identifiers
  global.length = global.L$ = length;
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = length
  }

}(this));
