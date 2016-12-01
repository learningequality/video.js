'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @file merge-options.js
                                                                                                                                                                                                                                                                               */


exports['default'] = mergeOptions;

var _merge = require('lodash-compat/object/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isPlain(obj) {
  return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.toString() === '[object Object]' && obj.constructor === Object;
}

/**
 * Merge customizer. video.js simply overwrites non-simple objects
 * (like arrays) instead of attempting to overlay them.
 * @see https://lodash.com/docs#merge
 */
function customizer(destination, source) {
  // If we're not working with a plain object, copy the value as is
  // If source is an array, for instance, it will replace destination
  if (!isPlain(source)) {
    return source;
  }

  // If the new value is a plain object but the first object value is not
  // we need to create a new object for the first object to merge with.
  // This makes it consistent with how merge() works by default
  // and also protects from later changes the to first object affecting
  // the second object's values.
  if (!isPlain(destination)) {
    return mergeOptions(source);
  }
}

/**
 * Merge one or more options objects, recursively merging **only**
 * plain object properties.  Previously `deepMerge`.
 *
 * @param  {...Object} source One or more objects to merge
 * @returns {Object}          a new object that is the union of all
 * provided objects
 * @function mergeOptions
 */
function mergeOptions() {
  for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  // unshift an empty object into the front of the call as the target
  // of the merge
  objects.unshift({});

  // customize conflict resolution to match our historical merge behavior
  objects.push(customizer);

  _merge2['default'].apply(null, objects);

  // return the mutated result object
  return objects[0];
}
