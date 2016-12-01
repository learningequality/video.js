"use strict";

exports.__esModule = true;
exports.each = each;
exports.reduce = reduce;
/**
 * @file obj.js
 */

/**
 * Array-like iteration for objects.
 *
 * @param  {Object}   object
 * @param  {Function} fn
 *         A callback function which is called for each key in the object. It
 *         receives the value and key as arguments.
 */
function each(object, fn) {
  Object.keys(object).forEach(function (key) {
    return fn(object[key], key);
  });
}

/**
 * Array-like reduce for objects.
 *
 * @param  {Object}   object
 * @param  {Function} fn
 *         A callback function which is called for each key in the object. It
 *         receives the accumulated value and the per-iteration value and key
 *         as arguments.
 * @param  {Mixed}    [initial = 0]
 * @return {Mixed}
 */
function reduce(object, fn) {
  var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return Object.keys(object).reduce(function (accum, key) {
    return fn(accum, object[key], key);
  }, initial);
}
