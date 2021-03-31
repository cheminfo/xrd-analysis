/**
 * xrd-analysis
 * @version v0.6.0
 * @link https://github.com/cheminfo/xrd-analysis#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.XRDAnalysis = {}));
}(this, (function (exports) { 'use strict';

  const toString$1 = Object.prototype.toString;
  function isAnyArray$1(object) {
    return toString$1.call(object).endsWith('Array]');
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  function commonjsRequire (target) {
  	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
  }

  var medianQuickselect_min = createCommonjsModule(function (module) {
    (function () {
      function a(d) {
        for (var e = 0, f = d.length - 1, g = void 0, h = void 0, i = void 0, j = c(e, f); !0;) {
          if (f <= e) return d[j];
          if (f == e + 1) return d[e] > d[f] && b(d, e, f), d[j];

          for (g = c(e, f), d[g] > d[f] && b(d, g, f), d[e] > d[f] && b(d, e, f), d[g] > d[e] && b(d, g, e), b(d, g, e + 1), h = e + 1, i = f; !0;) {
            do h++; while (d[e] > d[h]);

            do i--; while (d[i] > d[e]);

            if (i < h) break;
            b(d, h, i);
          }

          b(d, e, i), i <= j && (e = h), i >= j && (f = i - 1);
        }
      }

      var b = function b(d, e, f) {
        var _ref;

        return _ref = [d[f], d[e]], d[e] = _ref[0], d[f] = _ref[1], _ref;
      },
          c = function c(d, e) {
        return ~~((d + e) / 2);
      };

      module.exports ? module.exports = a : window.median = a;
    })();
  });

  function median(input) {
    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    return medianQuickselect_min(input.slice());
  }

  /**
   * This function xAdd the first array by the second array or a constant value to each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Array}
   */

  function xAdd(array1, array2) {
    let isConstant = false;
    let constant;

    if (isAnyArray$1(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] + constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] + array2[i];
      }
    }

    return array3;
  }

  /**
   * This function xMultiply the first array by the second array or a constant value to each element of the first array
   * @param {Array} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Float64Array}
   */

  function xMultiply(array1, array2) {
    let isConstant = false;
    let constant;

    if (isAnyArray$1(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Float64Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] * constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] * array2[i];
      }
    }

    return array3;
  }

  /**
   * This function divide the first array by the second array or a constant value to each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @param {Array<Number>|Number} array2
   * @return {Array}
   */

  function xDivide(array1, array2) {
    let isConstant = false;
    let constant;

    if (isAnyArray$1(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] / constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] / array2[i];
      }
    }

    return array3;
  }

  /**
   * Checks if input is valdi
   * @param {Array<number>} input

   */

  function xCheck(input) {
    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }
  }

  /**
   * Returns true if x is monotone
   * @param {Array} array
   * @return {boolean}
   */
  function xIsMonotone(array) {
    if (array.length <= 2) {
      return true;
    }

    if (array[0] === array[1]) {
      // maybe a constant series
      for (let i = 1; i < array.length - 1; i++) {
        if (array[i] !== array[i + 1]) return false;
      }

      return true;
    }

    if (array[0] < array[array.length - 1]) {
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] >= array[i + 1]) return false;
      }
    } else {
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] <= array[i + 1]) return false;
      }
    }

    return true;
  }

  function sum(input) {
    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += input[i];
    }

    return sumValue;
  }

  function mean(input) {
    return sum(input) / input.length;
  }

  /**
   * This function pads an array
   * @param {Array} array - the array that will be padded
   * @param {object} [options={}]
   * @param {string} [options.algorithm=''] '', value, circular, duplicate
   * @param {number} [options.size=0] padding size before first element and after last element
   * @param {number} [options.value=0] value to use for padding (if algorithm='value')
   * @return {Array}
   */

  function xPadding(array, options = {}) {
    const {
      size = 0,
      value = 0,
      algorithm = ''
    } = options;
    xCheck(array);

    if (!algorithm) {
      if (array instanceof Float64Array) {
        return array.slice();
      } else {
        return Float64Array.from(array);
      }
    }

    let result = new Float64Array(array.length + size * 2);

    for (let i = 0; i < array.length; i++) {
      result[i + size] = array[i];
    }

    let fromEnd = size + array.length;
    let toEnd = 2 * size + array.length;

    switch (algorithm.toLowerCase()) {
      case 'value':
        for (let i = 0; i < size; i++) {
          result[i] = value;
        }

        for (let i = fromEnd; i < toEnd; i++) {
          result[i] = value;
        }

        break;

      case 'duplicate':
        for (let i = 0; i < size; i++) {
          result[i] = array[0];
        }

        for (let i = fromEnd; i < toEnd; i++) {
          result[i] = array[array.length - 1];
        }

        break;

      case 'circular':
        for (let i = 0; i < size; i++) {
          result[i] = array[(array.length - size % array.length + i) % array.length];
        }

        for (let i = 0; i < size; i++) {
          result[i + fromEnd] = array[i % array.length];
        }

        break;

      default:
        throw Error('xPadding: unknown algorithm');
    }

    return result;
  }

  /**
   * This function calculates a rolling average
   * @param {Array<Number>} array - the array that will be rotated
   * @param {function} fct callback function that from an array returns a value.
   * @param {object} [options={}]
   * @param {number} [options.window=5] rolling window
   * @param {string} [options.padding.size=0] none, value, circular, duplicate
   * @param {string} [options.padding.algorithm='value'] none, value, circular, duplicate
   * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
   * @return {Array<Number>}
   */

  function xRolling(array, fct, options = {}) {
    xCheck(array);
    if (typeof fct !== 'function') throw Error('fct has to be a function');
    const {
      window = 5,
      padding = {}
    } = options;
    const {
      size = window - 1,
      algorithm,
      value
    } = padding;
    array = xPadding(array, {
      size,
      algorithm,
      value
    }); // ensure we get a copy and it is float64

    const newArray = [];

    for (let i = 0; i < array.length - window + 1; i++) {
      let subArray = new Float64Array(array.buffer, i * 8, window); // we will send a view to the original buffer

      newArray.push(fct(subArray));
    }

    return newArray;
  }

  /**
   * This function calculates a rolling average
   * @param {Array<Number>} array - the array that will be rotated
   * @param {object} [options={}]
   * @param {number} [options.window=5] rolling window
   * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
   * @param {string} [options.padding.algorithm=''] none, value, circular, duplicate
   * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
   * @return {Array<Number>}
   */

  function xRollingAverage(array, options = {}) {
    return xRolling(array, mean, options);
  }

  /**
   * This function calculates a rolling average
   * @param {Array<Number>} array - the array that will be rotated
   * @param {object} [options={}]
   * @param {number} [options.window=5] rolling window
   * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
   * @param {string} [options.padding.algorithm=''] none, value, circular, duplicate
   * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
   * @return {Array<Number>}
   */

  function xRollingMedian(array, options = {}) {
    return xRolling(array, median, options);
  }

  function min(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var _options$fromIndex = options.fromIndex,
        fromIndex = _options$fromIndex === void 0 ? 0 : _options$fromIndex,
        _options$toIndex = options.toIndex,
        toIndex = _options$toIndex === void 0 ? input.length : _options$toIndex;

    if (fromIndex < 0 || fromIndex >= input.length || !Number.isInteger(fromIndex)) {
      throw new Error('fromIndex must be a positive integer smaller than length');
    }

    if (toIndex <= fromIndex || toIndex > input.length || !Number.isInteger(toIndex)) {
      throw new Error('toIndex must be an integer greater than fromIndex and at most equal to length');
    }

    var minValue = input[fromIndex];

    for (var i = fromIndex + 1; i < toIndex; i++) {
      if (input[i] < minValue) minValue = input[i];
    }

    return minValue;
  }

  function max(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var _options$fromIndex = options.fromIndex,
        fromIndex = _options$fromIndex === void 0 ? 0 : _options$fromIndex,
        _options$toIndex = options.toIndex,
        toIndex = _options$toIndex === void 0 ? input.length : _options$toIndex;

    if (fromIndex < 0 || fromIndex >= input.length || !Number.isInteger(fromIndex)) {
      throw new Error('fromIndex must be a positive integer smaller than length');
    }

    if (toIndex <= fromIndex || toIndex > input.length || !Number.isInteger(toIndex)) {
      throw new Error('toIndex must be an integer greater than fromIndex and at most equal to length');
    }

    var maxValue = input[fromIndex];

    for (var i = fromIndex + 1; i < toIndex; i++) {
      if (input[i] > maxValue) maxValue = input[i];
    }

    return maxValue;
  }

  /**
   * This function xSubtract the first array by the second array or a constant value from each element of the first array
   * @param {Array} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Array}
   */

  function xSubtract(array1, array2) {
    let isConstant = false;
    let constant;

    if (isAnyArray$1(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] - constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] - array2[i];
      }
    }

    return array3;
  }

  /**
   * Throw an error in no an object of x,y arrays
   * @param {DataXY} [data={}]
   */

  function xyCheck(data = {}) {
    if (!isAnyArray$1(data.x) || !isAnyArray$1(data.y)) {
      throw new Error('Points must be an object of x and y arrays');
    }

    if (data.x.length !== data.y.length) {
      throw new Error('The x and y arrays mush have the same length');
    }
  }

  /**
   * Filters x,y values to allow strictly growing values in x axis.
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @return {DataXY}
   */

  function xyEnsureGrowingX(data = {}) {
    xyCheck(data);
    const x = Array.from(data.x);
    const y = Array.from(data.y);
    let prevX = -Infinity;
    let ansX = [];
    let ansY = [];

    for (let index = 0; index < x.length; index++) {
      if (prevX < x[index]) {
        ansX.push(x[index]);
        ansY.push(y[index]);
        prevX = x[index];
      }
    }

    return {
      x: ansX,
      y: ansY
    };
  }

  /**
   * Filter out all the points for which x <= 0. Useful to display log scale data
   * @param {DataXY} [data={}]
   * @return {{x:[],y:[]}} An object with the filtered data
   */

  function xyFilterXPositive(data = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    const newX = [];
    const newY = [];

    for (let i = 0; i < x.length; i++) {
      if (x[i] > 0) {
        newX.push(x[i]);
        newY.push(y[i]);
      }
    }

    return {
      x: newX,
      y: newY
    };
  }

  function rescale(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    } else if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var output;

    if (options.output !== undefined) {
      if (!isAnyArray$1(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    var currentMin = min(input);
    var currentMax = max(input);

    if (currentMin === currentMax) {
      throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
    }

    var _options$min = options.min,
        minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
        _options$max = options.max,
        maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

    if (minValue >= maxValue) {
      throw new RangeError('min option must be smaller than max option');
    }

    var factor = (maxValue - minValue) / (currentMax - currentMin);

    for (var i = 0; i < input.length; i++) {
      output[i] = (input[i] - currentMin) * factor + minValue;
    }

    return output;
  }

  function addStyle(serie, spectrum, options = {}) {
    let {
      color = '#A9A9A9',
      opacity = 1,
      lineWidth = 1
    } = options; // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec

    if (color.match(/#[0-9A-F]{6}$/i)) {
      color = (color + (opacity * 255 >> 0).toString(16)).toUpperCase();
    } else {
      color = color.replace(/rgb ?\((.*)\)/, `rgba($1,${opacity})`);
    }

    serie.style = [{
      name: 'unselected',
      style: {
        line: {
          color,
          width: lineWidth,
          dash: 1
        }
      }
    }, {
      name: 'selected',
      style: {
        line: {
          color,
          width: lineWidth + 2,
          dash: 1
        }
      }
    }];
    serie.name = spectrum.label || spectrum.id;
  }

  const COLORS = ['#FFB300', '#803E75', '#FF6800', '#A6BDD7', '#C10020', '#CEA262', '#817066', '#007D34', '#F6768E', '#00538A', '#FF7A5C', '#53377A', '#FF8E00', '#B32851', '#F4C800', '#7F180D', '#93AA00', '#593315', '#F13A13', '#232C16'];

  /**
   * Generate a jsgraph chart format from an array of Analysis
   */

  function getJSGraph(analyses, options = {}) {
    const {
      colors = COLORS,
      opacities = [1],
      linesWidth = [1],
      selector = {},
      normalization,
      xAxis = {},
      yAxis = {}
    } = options;
    let series = [];
    let xLabel = '';
    let yLabel = '';

    for (let i = 0; i < analyses.length; i++) {
      const analysis = analyses[i];
      let serie = {};
      let currentData = analysis.getNormalizedSpectrum({
        selector,
        normalization
      });
      if (!currentData) continue;
      if (!xLabel) xLabel = currentData.variables.x.label;
      if (!yLabel) yLabel = currentData.variables.y.label;
      addStyle(serie, analysis, {
        color: colors[i % colors.length],
        opacity: opacities[i % opacities.length],
        lineWidth: linesWidth[i % linesWidth.length]
      });
      serie.data = {
        x: currentData.variables.x.data,
        y: currentData.variables.y.data
      };

      if (xAxis.logScale) {
        serie.data = xyFilterXPositive(serie.data);
      }

      series.push(serie);
    }

    return {
      axes: {
        x: {
          label: xLabel,
          unit: '',
          flipped: false,
          display: true,
          ...xAxis
        },
        y: {
          label: yLabel,
          unit: '',
          flipped: false,
          display: true,
          ...yAxis
        }
      },
      series
    };
  }

  function getNormalizationAnnotations(filter = {}, boundary = {
    y: {
      min: '0px',
      max: '2000px'
    }
  }) {
    let {
      exclusions = []
    } = filter;
    let annotations = [];
    exclusions = exclusions.filter(exclusion => !exclusion.ignore);
    annotations = exclusions.map(exclusion => {
      let annotation = {
        type: 'rect',
        position: [{
          x: exclusion.from,
          y: boundary.y.min
        }, {
          x: exclusion.to,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      };
      return annotation;
    });

    if (filter.from !== undefined) {
      annotations.push({
        type: 'rect',
        position: [{
          x: Number.MIN_SAFE_INTEGER,
          y: boundary.y.min
        }, {
          x: filter.from,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      });
    }

    if (filter.to !== undefined) {
      annotations.push({
        type: 'rect',
        position: [{
          x: filter.to,
          y: boundary.y.min
        }, {
          x: Number.MAX_SAFE_INTEGER,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      });
    }

    return annotations;
  }

  function appendDistinctParameter(values, key, value) {
    if (!values[key]) {
      values[key] = {
        key,
        values: [],
        count: 0
      };
    }

    if (!values[key].values.includes(value)) {
      values[key].values.push(value);
    }

    values[key].count++;
  }

  function appendDistinctValue(values, key) {
    if (!values[key]) {
      values[key] = {
        key,
        count: 0
      };
    }

    values[key].count++;
  }

  class AnalysesManager {
    constructor() {
      this.analyses = [];
    }

    addAnalysis(analysis) {
      let index = this.getAnalysisIndex(analysis.id);

      if (index === undefined) {
        this.analyses.push(analysis);
      } else {
        this.analyses[index] = analysis;
      }
    }

    getAnalyses(options = {}) {
      const {
        ids
      } = options;
      let analyses = [];

      for (const analysis of this.analyses) {
        if (!ids || ids.includes(analysis.id)) {
          analyses.push(analysis);
        }
      }

      return analyses;
    }

    getSpectra() {
      const spectra = [];

      for (const analysis of this.analyses) {
        spectra.push(...analysis.spectra);
      }

      return spectra;
    }
    /**
     * Get an array of objects (key + count) of all the titles
     */


    getDistinctTitles() {
      let values = {};

      for (let spectrum of this.getSpectra()) {
        if (spectrum.title) {
          appendDistinctValue(values, spectrum.title);
        }
      }

      return Object.keys(values).map(key => values[key]);
    }
    /**
     * Get an array of objects (key + count) of all the units
     */


    getDistinctUnits() {
      var _a;

      let values = {};

      for (let spectrum of this.getSpectra()) {
        if (spectrum.variables) {
          for (let key in spectrum.variables) {
            const units = (_a = spectrum.variables[key].units) === null || _a === void 0 ? void 0 : _a.replace(/\s+\[.*/, '');

            if (units) {
              appendDistinctValue(values, units);
            }
          }
        }
      }

      return Object.keys(values).map(key => values[key]);
    }
    /**
     * Get an array of objects (key + count) of all the labels
     */


    getDistinctLabels() {
      let values = {};

      for (let spectrum of this.getSpectra()) {
        if (spectrum.variables) {
          for (let key in spectrum.variables) {
            appendDistinctValue(values, spectrum.variables[key].label.replace(/\s+\[.*/, ''));
          }
        }
      }

      return Object.keys(values).map(key => values[key]);
    }
    /**
     * Get an array of objects (key + count) of all the dataTypes
     */


    getDistinctDataTypes() {
      let values = {};

      for (let spectrum of this.getSpectra()) {
        if (spectrum.dataType) {
          appendDistinctValue(values, spectrum.dataType);
        }
      }

      return Object.keys(values).map(key => values[key]);
    }
    /**
     * Get an array of objects (key + count) of all the meta
     */


    getDistinctMeta() {
      let values = {};

      for (let spectrum of this.getSpectra()) {
        if (spectrum.meta) {
          for (let key in spectrum.meta) {
            appendDistinctParameter(values, key, spectrum.meta[key]);
          }
        }
      }

      return Object.keys(values).map(key => values[key]);
    }

    removeAllAnalyses() {
      this.analyses.splice(0);
    }
    /**
     * Remove the analysis from the AnalysesManager for the specified id
     */


    removeAnalysis(id) {
      let index = this.getAnalysisIndex(id);
      if (index === undefined) return undefined;
      return this.analyses.splice(index, 1);
    }
    /**
     * Returns the index of the analysis in the analyses array
     */


    getAnalysisIndex(id) {
      if (!id) return undefined;

      for (let i = 0; i < this.analyses.length; i++) {
        let analysis = this.analyses[i];
        if (analysis.id === id) return i;
      }

      return undefined;
    }
    /**
     * Checks if the ID of an analysis exists in the AnalysesManager
     */


    includes(id) {
      const index = this.getAnalysisIndex(id);
      return index === undefined ? false : !isNaN(index);
    }

  }

  // Based on https://github.com/scijs/cholesky-solve

  /*
  The MIT License (MIT)

  Copyright (c) 2013 Eric Arnebäck

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  */
  function ldlSymbolic(n
  /* A and L are n-by-n, where n >= 0 */
  , Ap
  /* input of size n + 1, not modified */
  , Ai
  /* input of size nz=Ap[n], not modified */
  , Lp
  /* output of size n + 1, not defined on input */
  , Parent
  /* output of size n, not defined on input */
  , Lnz
  /* output of size n, not defined on input */
  , Flag
  /* workspace of size n, not defn. on input or output */
  ) {
    let i, k, p, kk, p2;

    for (k = 0; k < n; k++) {
      /* L(k,:) pattern: all nodes reachable in etree from nz in A(0:k-1,k) */
      Parent[k] = -1;
      /* parent of k is not yet known */

      Flag[k] = k;
      /* mark node k as visited */

      Lnz[k] = 0;
      /* count of nonzeros in column k of L */

      kk = k;
      /* kth original, or permuted, column */

      p2 = Ap[kk + 1];

      for (p = Ap[kk]; p < p2; p++) {
        /* A (i,k) is nonzero (original or permuted A) */
        i = Ai[p];

        if (i < k) {
          /* follow path from i to root of etree, stop at flagged node */
          for (; Flag[i] !== k; i = Parent[i]) {
            /* find parent of i if not yet determined */
            if (Parent[i] === -1) Parent[i] = k;
            Lnz[i]++;
            /* L (k,i) is nonzero */

            Flag[i] = k;
            /* mark i as visited */
          }
        }
      }
    }
    /* construct Lp index array from Lnz column counts */


    Lp[0] = 0;

    for (k = 0; k < n; k++) {
      Lp[k + 1] = Lp[k] + Lnz[k];
    }
  }

  function ldlNumeric(n
  /* A and L are n-by-n, where n >= 0 */
  , Ap
  /* input of size n+1, not modified */
  , Ai
  /* input of size nz=Ap[n], not modified */
  , Ax
  /* input of size nz=Ap[n], not modified */
  , Lp
  /* input of size n+1, not modified */
  , Parent
  /* input of size n, not modified */
  , Lnz
  /* output of size n, not defn. on input */
  , Li
  /* output of size lnz=Lp[n], not defined on input */
  , Lx
  /* output of size lnz=Lp[n], not defined on input */
  , D
  /* output of size n, not defined on input */
  , Y
  /* workspace of size n, not defn. on input or output */
  , Pattern
  /* workspace of size n, not defn. on input or output */
  , Flag
  /* workspace of size n, not defn. on input or output */
  ) {
    let yi, lKi;
    let i, k, p, kk, p2, len, top;

    for (k = 0; k < n; k++) {
      /* compute nonzero Pattern of kth row of L, in topological order */
      Y[k] = 0.0;
      /* Y(0:k) is now all zero */

      top = n;
      /* stack for pattern is empty */

      Flag[k] = k;
      /* mark node k as visited */

      Lnz[k] = 0;
      /* count of nonzeros in column k of L */

      kk = k;
      /* kth original, or permuted, column */

      p2 = Ap[kk + 1];

      for (p = Ap[kk]; p < p2; p++) {
        i = Ai[p];
        /* get A(i,k) */

        if (i <= k) {
          Y[i] += Ax[p];
          /* scatter A(i,k) into Y (sum duplicates) */

          for (len = 0; Flag[i] !== k; i = Parent[i]) {
            Pattern[len++] = i;
            /* L(k,i) is nonzero */

            Flag[i] = k;
            /* mark i as visited */
          }

          while (len > 0) Pattern[--top] = Pattern[--len];
        }
      }
      /* compute numerical values kth row of L (a sparse triangular solve) */


      D[k] = Y[k];
      /* get D(k,k) and clear Y(k) */

      Y[k] = 0.0;

      for (; top < n; top++) {
        i = Pattern[top];
        /* Pattern[top:n-1] is pattern of L(:,k) */

        yi = Y[i];
        /* get and clear Y(i) */

        Y[i] = 0.0;
        p2 = Lp[i] + Lnz[i];

        for (p = Lp[i]; p < p2; p++) {
          Y[Li[p]] -= Lx[p] * yi;
        }

        lKi = yi / D[i];
        /* the nonzero entry L(k,i) */

        D[k] -= lKi * yi;
        Li[p] = k;
        /* store L(k,i) in column form of L */

        Lx[p] = lKi;
        Lnz[i]++;
        /* increment count of nonzeros in col i */
      }

      if (D[k] === 0.0) return k;
      /* failure, D(k,k) is zero */
    }

    return n;
    /* success, diagonal of D is all nonzero */
  }

  function ldlLsolve(n
  /* L is n-by-n, where n >= 0 */
  , X
  /* size n. right-hand-side on input, soln. on output */
  , Lp
  /* input of size n+1, not modified */
  , Li
  /* input of size lnz=Lp[n], not modified */
  , Lx
  /* input of size lnz=Lp[n], not modified */
  ) {
    let j, p, p2;

    for (j = 0; j < n; j++) {
      p2 = Lp[j + 1];

      for (p = Lp[j]; p < p2; p++) {
        X[Li[p]] -= Lx[p] * X[j];
      }
    }
  }

  function ldlDsolve(n
  /* D is n-by-n, where n >= 0 */
  , X
  /* size n. right-hand-side on input, soln. on output */
  , D
  /* input of size n, not modified */
  ) {
    let j;

    for (j = 0; j < n; j++) {
      X[j] /= D[j];
    }
  }

  function ldlLTsolve(n
  /* L is n-by-n, where n >= 0 */
  , X
  /* size n. right-hand-side on input, soln. on output */
  , Lp
  /* input of size n+1, not modified */
  , Li
  /* input of size lnz=Lp[n], not modified */
  , Lx
  /* input of size lnz=Lp[n], not modified */
  ) {
    let j, p, p2;

    for (j = n - 1; j >= 0; j--) {
      p2 = Lp[j + 1];

      for (p = Lp[j]; p < p2; p++) {
        X[j] -= Lx[p] * X[Li[p]];
      }
    }
  }

  function ldlPerm(n
  /* size of X, B, and P */
  , X
  /* output of size n. */
  , B
  /* input of size n. */
  , P
  /* input permutation array of size n. */
  ) {
    let j;

    for (j = 0; j < n; j++) {
      X[j] = B[P[j]];
    }
  }

  function ldlPermt(n
  /* size of X, B, and P */
  , X
  /* output of size n. */
  , B
  /* input of size n. */
  , P
  /* input permutation array of size n. */
  ) {
    let j;

    for (j = 0; j < n; j++) {
      X[P[j]] = B[j];
    }
  }

  function prepare(M, n, P) {
    // if a permutation was specified, apply it.
    if (P) {
      let Pinv = new Array(n);

      for (let k = 0; k < n; k++) {
        Pinv[P[k]] = k;
      }

      let Mt = []; // scratch memory
      // Apply permutation. We make M into P*M*P^T

      for (let a = 0; a < M.length; ++a) {
        let ar = Pinv[M[a][0]];
        let ac = Pinv[M[a][1]]; // we only store the upper-diagonal elements(since we assume matrix is symmetric, we only need to store these)
        // if permuted element is below diagonal, we simply transpose it.

        if (ac < ar) {
          let t = ac;
          ac = ar;
          ar = t;
        }

        Mt[a] = [];
        Mt[a][0] = ar;
        Mt[a][1] = ac;
        Mt[a][2] = M[a][2];
      }

      M = Mt; // copy scratch memory.
    } else {
      // if P argument is null, we just use an identity permutation.
      P = [];

      for (let i = 0; i < n; ++i) {
        P[i] = i;
      }
    } // The sparse matrix we are decomposing is A.
    // Now we shall create A from M.


    let Ap = new Array(n + 1);
    let Ai = new Array(M.length);
    let Ax = new Array(M.length); // count number of non-zero elements in columns.

    let LNZ = [];

    for (let i = 0; i < n; ++i) {
      LNZ[i] = 0;
    }

    for (let a = 0; a < M.length; ++a) {
      LNZ[M[a][1]]++;
    }

    Ap[0] = 0;

    for (let i = 0; i < n; ++i) {
      Ap[i + 1] = Ap[i] + LNZ[i];
    }

    let coloffset = [];

    for (let a = 0; a < n; ++a) {
      coloffset[a] = 0;
    } // go through all elements in M, and add them to sparse matrix A.


    for (let i = 0; i < M.length; ++i) {
      let e = M[i];
      let col = e[1];
      let adr = Ap[col] + coloffset[col];
      Ai[adr] = e[0];
      Ax[adr] = e[2];
      coloffset[col]++;
    }

    let D = new Array(n);
    let Y = new Array(n);
    let Lp = new Array(n + 1);
    let Parent = new Array(n);
    let Lnz = new Array(n);
    let Flag = new Array(n);
    let Pattern = new Array(n);
    let bp1 = new Array(n);
    let x = new Array(n);
    let d;
    ldlSymbolic(n, Ap, Ai, Lp, Parent, Lnz, Flag);
    let Lx = new Array(Lp[n]);
    let Li = new Array(Lp[n]);
    d = ldlNumeric(n, Ap, Ai, Ax, Lp, Parent, Lnz, Li, Lx, D, Y, Pattern, Flag);

    if (d === n) {
      return function (b) {
        ldlPerm(n, bp1, b, P);
        ldlLsolve(n, bp1, Lp, Li, Lx);
        ldlDsolve(n, bp1, D);
        ldlLTsolve(n, bp1, Lp, Li, Lx);
        ldlPermt(n, x, bp1, P);
        return x;
      };
    } else {
      return null;
    }
  }

  var cuthillMckee_1 = cuthillMckee;

  function compareNum(a, b) {
    return a - b;
  }

  function cuthillMckee(list, n) {
    var adj = new Array(n);
    var visited = new Array(n);

    for (var i = 0; i < n; ++i) {
      adj[i] = [];
      visited[i] = false;
    }

    for (var i = 0; i < list.length; ++i) {
      var l = list[i];
      adj[l[0]].push(l[1]);
    }

    var toVisit = new Array(n);
    var eol = 0;
    var ptr = 0;

    for (var i = 0; i < n; ++i) {
      if (visited[i]) {
        continue;
      }

      toVisit[eol++] = i;
      visited[i] = true;

      while (ptr < eol) {
        var v = toVisit[ptr++];
        var nbhd = adj[v];
        nbhd.sort(compareNum);

        for (var j = 0; j < nbhd.length; ++j) {
          var u = nbhd[j];

          if (visited[u]) {
            continue;
          }

          visited[u] = true;
          toVisit[eol++] = u;
        }
      }
    }

    var result = new Array(n);

    for (var i = 0; i < n; ++i) {
      result[toVisit[i]] = i;
    }

    return result;
  }

  const getClosestNumber = (array = [], goal = 0) => {
    const closest = array.reduce((prev, curr) => {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
    return closest;
  };

  const getCloseIndex = (array = [], goal = 0) => {
    const closest = getClosestNumber(array, goal);
    return array.indexOf(closest);
  };

  const updateSystem = (matrix, y, weights) => {
    let nbPoints = y.length;
    let l = nbPoints - 1;
    let newMatrix = new Array(matrix.length);
    let newVector = new Float64Array(nbPoints);

    for (let i = 0; i < l; i++) {
      let w = weights[i];
      let diag = i * 2;
      let next = diag + 1;
      newMatrix[diag] = matrix[diag].slice();
      newMatrix[next] = matrix[next].slice();

      if (w === 0) {
        newVector[i] = 0;
      } else {
        newVector[i] = y[i] * w;
        newMatrix[diag][2] += w;
      }
    }

    newVector[l] = y[l] * weights[l];
    newMatrix[l * 2] = matrix[l * 2].slice();
    newMatrix[l * 2][2] += weights[l];
    return [newMatrix, newVector];
  };

  const getDeltaMatrix = (nbPoints, lambda) => {
    let matrix = [];
    let last = nbPoints - 1;

    for (let i = 0; i < last; i++) {
      matrix.push([i, i, lambda * 2]);
      matrix.push([i + 1, i, -1 * lambda]);
    }

    matrix[0][2] = lambda;
    matrix.push([last, last, lambda]);
    return {
      lowerTriangularNonZeros: matrix,
      permutationEncodedArray: cuthillMckee_1(matrix, nbPoints)
    };
  };

  /**
   * Fit the baseline drift by iteratively changing weights of sum square error between the fitted baseline and original signals,
   * for further information about the parameters you can get the [paper of airPLS](https://github.com/zmzhang/airPLS/blob/master/airPLS_manuscript.pdf)
   * @param {Array<number>} x - x axis data useful when control points or zones are submitted
   * @param {Array<number>} y - Original data
   * @param {object} [options={}] - Options object
   * @param {number} [options.maxIterations = 100] - Maximal number of iterations if the method does not reach the stop criterion
   * @param {number} [options.factorCriterion = 0.001] - Factor of the sum of absolute value of original data, to compute stop criterion
   * @param {Array<number>} [options.weights = [1,1,...]] - Initial weights vector, default each point has the same weight
   * @param {number} [options.lambda = 100] - Factor of weights matrix in -> [I + lambda D'D]z = x
   * @param {Array<number>} [options.controlPoints = []] - Array of x axis values to force that baseline cross those points.
   * @param {Array<number>} [options.baseLineZones = []] - Array of x axis values (as from - to), to force that baseline cross those zones.
   * @returns {{corrected: Array<number>, error: number, iteration: number, baseline: Array<number>}}
   */

  function airPLS(x, y, options = {}) {
    let {
      maxIterations = 100,
      lambda = 100,
      factorCriterion = 0.001,
      weights = new Array(y.length).fill(1),
      controlPoints = [],
      baseLineZones = []
    } = options;

    if (controlPoints.length > 0) {
      controlPoints.forEach((e, i, arr) => arr[i] = getCloseIndex(x, e));
    }

    if (baseLineZones.length > 0) {
      baseLineZones.forEach(range => {
        let indexFrom = getCloseIndex(x, range.from);
        let indexTo = getCloseIndex(x, range.to);
        if (indexFrom > indexTo) [indexFrom, indexTo] = [indexTo, indexFrom];

        for (let i = indexFrom; i < indexTo; i++) {
          controlPoints.push(i);
        }
      });
    }

    let baseline, iteration;
    let nbPoints = y.length;
    let l = nbPoints - 1;
    let sumNegDifferences = Number.MAX_SAFE_INTEGER;
    let stopCriterion = factorCriterion * y.reduce((sum, e) => Math.abs(e) + sum, 0);
    let {
      lowerTriangularNonZeros,
      permutationEncodedArray
    } = getDeltaMatrix(nbPoints, lambda);

    for (iteration = 0; iteration < maxIterations && Math.abs(sumNegDifferences) > stopCriterion; iteration++) {
      let [leftHandSide, rightHandSide] = updateSystem(lowerTriangularNonZeros, y, weights);
      let cho = prepare(leftHandSide, nbPoints, permutationEncodedArray);
      baseline = cho(rightHandSide);
      sumNegDifferences = 0;
      let difference = y.map(calculateError);
      let maxNegativeDiff = -1 * Number.MAX_SAFE_INTEGER;

      for (let i = 1; i < l; i++) {
        let diff = difference[i];

        if (diff >= 0) {
          weights[i] = 0;
        } else {
          weights[i] = Math.exp(iteration * diff / sumNegDifferences);
          if (maxNegativeDiff < diff) maxNegativeDiff = diff;
        }
      }

      let value = Math.exp(iteration * maxNegativeDiff / sumNegDifferences);
      weights[0] = value;
      weights[l] = value;
      controlPoints.forEach(i => weights[i] = value);
    }

    return {
      corrected: y.map((e, i) => e - baseline[i]),
      baseline,
      iteration,
      error: sumNegDifferences
    };

    function calculateError(e, i) {
      let diff = e - baseline[i];
      if (diff < 0) sumNegDifferences += diff;
      return diff;
    }
  }

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }
  /**
   * Fill an array with sequential numbers
   * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
   * @param {object} [options={}]
   * @param {number} [options.from=0] - first value in the array
   * @param {number} [options.to=10] - last value in the array
   * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
   * @param {number} [options.step] - if not provided calculated from size
   * @return {Array<number>}
   */


  function sequentialFill$1() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (_typeof$1(input) === 'object' && !isAnyArray$1(input)) {
      options = input;
      input = [];
    }

    if (!isAnyArray$1(input)) {
      throw new TypeError('input must be an array');
    }

    var _options = options,
        _options$from = _options.from,
        from = _options$from === void 0 ? 0 : _options$from,
        _options$to = _options.to,
        to = _options$to === void 0 ? 10 : _options$to,
        _options$size = _options.size,
        size = _options$size === void 0 ? input.length : _options$size,
        step = _options.step;

    if (size !== 0 && step) {
      throw new Error('step is defined by the array size');
    }

    if (!size) {
      if (step) {
        size = Math.floor((to - from) / step) + 1;
      } else {
        size = to - from + 1;
      }
    }

    if (!step && size) {
      step = (to - from) / (size - 1);
    }

    if (Array.isArray(input)) {
      // only works with normal array
      input.length = 0;

      for (var i = 0; i < size; i++) {
        input.push(from);
        from += step;
      }
    } else {
      if (input.length !== size) {
        throw new Error('sequentialFill typed array must have the correct length');
      }

      for (var _i = 0; _i < size; _i++) {
        input[_i] = from;
        from += step;
      }
    }

    return input;
  }

  /**
   * Adaptive iteratively reweighted penalized least squares [1]
   *
   * This function calls ml-airpls
   *
   * References:
   * [1] Zhang, Z.-M.; Chen, S.; Liang, Y.-Z.
   * Baseline Correction Using Adaptive Iteratively Reweighted Penalized Least Squares.
   * Analyst 2010, 135 (5), 1138–1146. https://doi.org/10.1039/B922045C.
   * @export
   * @param {Array<number>} ys
   * @param {object} [options] - Options object
   * @param {Array<number>} [options.x] Optional, Independent axis variable. If not specified, we use a linear grid
   * @param {object} [options.regression] - Options for the regression
   * @param {number} [options.regression.maxIterations = 100] - Maximum number of allowed iterations
   * @param {function} [options.regression.§Regression = PolynomialRegression] - Regression class with a predict method
   * @param {*} [options.regression.regressionOptions] - Options for regressionFunction
   * @param {number} [options.regression.tolerance = 0.001] - Convergence error tolerance
   * @returns {BaselineOutput}
   */

  function airPLSBaseline(ys, options = {}) {
    const numberPoints = ys.length;
    let {
      x,
      regressionOptions
    } = options;

    if (!x) {
      x = sequentialFill$1({
        from: 0,
        to: numberPoints - 1,
        size: numberPoints
      });
    }

    let output = airPLS(x, ys, regressionOptions);
    return {
      baseline: output.baseline,
      correctedSpectrum: output.corrected
    };
  }

  const toString = Object.prototype.toString;

  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  var src$1 = isAnyArray;

  function maybeToPrecision(value, digits) {
    if (value < 0) {
      value = 0 - value;

      if (typeof digits === 'number') {
        return `- ${value.toPrecision(digits)}`;
      } else {
        return `- ${value.toString()}`;
      }
    } else {
      if (typeof digits === 'number') {
        return value.toPrecision(digits);
      } else {
        return value.toString();
      }
    }
  }

  function checkArraySize(x, y) {
    if (!src$1(x) || !src$1(y)) {
      throw new TypeError('x and y must be arrays');
    }

    if (x.length !== y.length) {
      throw new RangeError('x and y arrays must have the same length');
    }
  }

  class BaseRegression {
    constructor() {
      if (new.target === BaseRegression) {
        throw new Error('BaseRegression must be subclassed');
      }
    }

    predict(x) {
      if (typeof x === 'number') {
        return this._predict(x);
      } else if (src$1(x)) {
        const y = [];

        for (let i = 0; i < x.length; i++) {
          y.push(this._predict(x[i]));
        }

        return y;
      } else {
        throw new TypeError('x must be a number or array');
      }
    }

    _predict() {
      throw new Error('_predict must be implemented');
    }

    train() {// Do nothing for this package
    }

    toString() {
      return '';
    }

    toLaTeX() {
      return '';
    }
    /**
     * Return the correlation coefficient of determination (r) and chi-square.
     * @param {Array<number>} x
     * @param {Array<number>} y
     * @return {object}
     */


    score(x, y) {
      if (!src$1(x) || !src$1(y) || x.length !== y.length) {
        throw new Error('x and y must be arrays of the same length');
      }

      const n = x.length;
      const y2 = new Array(n);

      for (let i = 0; i < n; i++) {
        y2[i] = this._predict(x[i]);
      }

      let xSum = 0;
      let ySum = 0;
      let chi2 = 0;
      let rmsd = 0;
      let xSquared = 0;
      let ySquared = 0;
      let xY = 0;

      for (let i = 0; i < n; i++) {
        xSum += y2[i];
        ySum += y[i];
        xSquared += y2[i] * y2[i];
        ySquared += y[i] * y[i];
        xY += y2[i] * y[i];

        if (y[i] !== 0) {
          chi2 += (y[i] - y2[i]) * (y[i] - y2[i]) / y[i];
        }

        rmsd += (y[i] - y2[i]) * (y[i] - y2[i]);
      }

      const r = (n * xY - xSum * ySum) / Math.sqrt((n * xSquared - xSum * xSum) * (n * ySquared - ySum * ySum));
      return {
        r: r,
        r2: r * r,
        chi2: chi2,
        rmsd: Math.sqrt(rmsd / n)
      };
    }

  }

  const indent = ' '.repeat(2);
  const indentData = ' '.repeat(4);
  function inspectMatrix() {
    return inspectMatrixWithOptions(this);
  }
  function inspectMatrixWithOptions(matrix, options = {}) {
    const {
      maxRows = 15,
      maxColumns = 10,
      maxNumSize = 8
    } = options;
    return `${matrix.constructor.name} {
${indent}[
${indentData}${inspectData(matrix, maxRows, maxColumns, maxNumSize)}
${indent}]
${indent}rows: ${matrix.rows}
${indent}columns: ${matrix.columns}
}`;
  }

  function inspectData(matrix, maxRows, maxColumns, maxNumSize) {
    const {
      rows,
      columns
    } = matrix;
    const maxI = Math.min(rows, maxRows);
    const maxJ = Math.min(columns, maxColumns);
    const result = [];

    for (let i = 0; i < maxI; i++) {
      let line = [];

      for (let j = 0; j < maxJ; j++) {
        line.push(formatNumber(matrix.get(i, j), maxNumSize));
      }

      result.push(`${line.join(' ')}`);
    }

    if (maxJ !== columns) {
      result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
    }

    if (maxI !== rows) {
      result.push(`... ${rows - maxRows} more rows`);
    }

    return result.join(`\n${indentData}`);
  }

  function formatNumber(num, maxNumSize) {
    const numStr = String(num);

    if (numStr.length <= maxNumSize) {
      return numStr.padEnd(maxNumSize, ' ');
    }

    const precise = num.toPrecision(maxNumSize - 2);

    if (precise.length <= maxNumSize) {
      return precise;
    }

    const exponential = num.toExponential(maxNumSize - 2);
    const eIndex = exponential.indexOf('e');
    const e = exponential.slice(eIndex);
    return exponential.slice(0, maxNumSize - e.length) + e;
  }

  function installMathOperations(AbstractMatrix, Matrix) {
    AbstractMatrix.prototype.add = function add(value) {
      if (typeof value === 'number') return this.addS(value);
      return this.addM(value);
    };

    AbstractMatrix.prototype.addS = function addS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.addM = function addM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.add = function add(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.add(value);
    };

    AbstractMatrix.prototype.sub = function sub(value) {
      if (typeof value === 'number') return this.subS(value);
      return this.subM(value);
    };

    AbstractMatrix.prototype.subS = function subS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.subM = function subM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.sub = function sub(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sub(value);
    };

    AbstractMatrix.prototype.subtract = AbstractMatrix.prototype.sub;
    AbstractMatrix.prototype.subtractS = AbstractMatrix.prototype.subS;
    AbstractMatrix.prototype.subtractM = AbstractMatrix.prototype.subM;
    AbstractMatrix.subtract = AbstractMatrix.sub;

    AbstractMatrix.prototype.mul = function mul(value) {
      if (typeof value === 'number') return this.mulS(value);
      return this.mulM(value);
    };

    AbstractMatrix.prototype.mulS = function mulS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.mulM = function mulM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mul = function mul(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.mul(value);
    };

    AbstractMatrix.prototype.multiply = AbstractMatrix.prototype.mul;
    AbstractMatrix.prototype.multiplyS = AbstractMatrix.prototype.mulS;
    AbstractMatrix.prototype.multiplyM = AbstractMatrix.prototype.mulM;
    AbstractMatrix.multiply = AbstractMatrix.mul;

    AbstractMatrix.prototype.div = function div(value) {
      if (typeof value === 'number') return this.divS(value);
      return this.divM(value);
    };

    AbstractMatrix.prototype.divS = function divS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.divM = function divM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.div = function div(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.div(value);
    };

    AbstractMatrix.prototype.divide = AbstractMatrix.prototype.div;
    AbstractMatrix.prototype.divideS = AbstractMatrix.prototype.divS;
    AbstractMatrix.prototype.divideM = AbstractMatrix.prototype.divM;
    AbstractMatrix.divide = AbstractMatrix.div;

    AbstractMatrix.prototype.mod = function mod(value) {
      if (typeof value === 'number') return this.modS(value);
      return this.modM(value);
    };

    AbstractMatrix.prototype.modS = function modS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.modM = function modM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mod = function mod(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.mod(value);
    };

    AbstractMatrix.prototype.modulus = AbstractMatrix.prototype.mod;
    AbstractMatrix.prototype.modulusS = AbstractMatrix.prototype.modS;
    AbstractMatrix.prototype.modulusM = AbstractMatrix.prototype.modM;
    AbstractMatrix.modulus = AbstractMatrix.mod;

    AbstractMatrix.prototype.and = function and(value) {
      if (typeof value === 'number') return this.andS(value);
      return this.andM(value);
    };

    AbstractMatrix.prototype.andS = function andS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.andM = function andM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.and = function and(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.and(value);
    };

    AbstractMatrix.prototype.or = function or(value) {
      if (typeof value === 'number') return this.orS(value);
      return this.orM(value);
    };

    AbstractMatrix.prototype.orS = function orS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.orM = function orM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.or = function or(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.or(value);
    };

    AbstractMatrix.prototype.xor = function xor(value) {
      if (typeof value === 'number') return this.xorS(value);
      return this.xorM(value);
    };

    AbstractMatrix.prototype.xorS = function xorS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.xorM = function xorM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.xor = function xor(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.xor(value);
    };

    AbstractMatrix.prototype.leftShift = function leftShift(value) {
      if (typeof value === 'number') return this.leftShiftS(value);
      return this.leftShiftM(value);
    };

    AbstractMatrix.prototype.leftShiftS = function leftShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.leftShiftM = function leftShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.leftShift = function leftShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.leftShift(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
      if (typeof value === 'number') return this.signPropagatingRightShiftS(value);
      return this.signPropagatingRightShiftM(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.signPropagatingRightShift(value);
    };

    AbstractMatrix.prototype.rightShift = function rightShift(value) {
      if (typeof value === 'number') return this.rightShiftS(value);
      return this.rightShiftM(value);
    };

    AbstractMatrix.prototype.rightShiftS = function rightShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.rightShiftM = function rightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.rightShift = function rightShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.rightShift(value);
    };

    AbstractMatrix.prototype.zeroFillRightShift = AbstractMatrix.prototype.rightShift;
    AbstractMatrix.prototype.zeroFillRightShiftS = AbstractMatrix.prototype.rightShiftS;
    AbstractMatrix.prototype.zeroFillRightShiftM = AbstractMatrix.prototype.rightShiftM;
    AbstractMatrix.zeroFillRightShift = AbstractMatrix.rightShift;

    AbstractMatrix.prototype.not = function not() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, ~this.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.not = function not(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.not();
    };

    AbstractMatrix.prototype.abs = function abs() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.abs(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.abs = function abs(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.abs();
    };

    AbstractMatrix.prototype.acos = function acos() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acos = function acos(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.acos();
    };

    AbstractMatrix.prototype.acosh = function acosh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acosh = function acosh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.acosh();
    };

    AbstractMatrix.prototype.asin = function asin() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asin = function asin(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.asin();
    };

    AbstractMatrix.prototype.asinh = function asinh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asinh = function asinh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.asinh();
    };

    AbstractMatrix.prototype.atan = function atan() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atan = function atan(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.atan();
    };

    AbstractMatrix.prototype.atanh = function atanh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atanh = function atanh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.atanh();
    };

    AbstractMatrix.prototype.cbrt = function cbrt() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cbrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cbrt = function cbrt(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cbrt();
    };

    AbstractMatrix.prototype.ceil = function ceil() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.ceil(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.ceil = function ceil(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.ceil();
    };

    AbstractMatrix.prototype.clz32 = function clz32() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.clz32(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.clz32 = function clz32(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.clz32();
    };

    AbstractMatrix.prototype.cos = function cos() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cos = function cos(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cos();
    };

    AbstractMatrix.prototype.cosh = function cosh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cosh = function cosh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cosh();
    };

    AbstractMatrix.prototype.exp = function exp() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.exp(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.exp = function exp(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.exp();
    };

    AbstractMatrix.prototype.expm1 = function expm1() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.expm1(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.expm1 = function expm1(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.expm1();
    };

    AbstractMatrix.prototype.floor = function floor() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.floor(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.floor = function floor(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.floor();
    };

    AbstractMatrix.prototype.fround = function fround() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.fround(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.fround = function fround(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.fround();
    };

    AbstractMatrix.prototype.log = function log() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log = function log(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log();
    };

    AbstractMatrix.prototype.log1p = function log1p() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log1p(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log1p = function log1p(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log1p();
    };

    AbstractMatrix.prototype.log10 = function log10() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log10(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log10 = function log10(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log10();
    };

    AbstractMatrix.prototype.log2 = function log2() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log2(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log2 = function log2(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log2();
    };

    AbstractMatrix.prototype.round = function round() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.round(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.round = function round(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.round();
    };

    AbstractMatrix.prototype.sign = function sign() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sign(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sign = function sign(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sign();
    };

    AbstractMatrix.prototype.sin = function sin() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sin = function sin(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sin();
    };

    AbstractMatrix.prototype.sinh = function sinh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sinh = function sinh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sinh();
    };

    AbstractMatrix.prototype.sqrt = function sqrt() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sqrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sqrt = function sqrt(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sqrt();
    };

    AbstractMatrix.prototype.tan = function tan() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tan = function tan(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.tan();
    };

    AbstractMatrix.prototype.tanh = function tanh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tanh = function tanh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.tanh();
    };

    AbstractMatrix.prototype.trunc = function trunc() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.trunc(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.trunc = function trunc(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.trunc();
    };

    AbstractMatrix.pow = function pow(matrix, arg0) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.pow(arg0);
    };

    AbstractMatrix.prototype.pow = function pow(value) {
      if (typeof value === 'number') return this.powS(value);
      return this.powM(value);
    };

    AbstractMatrix.prototype.powS = function powS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), value));
        }
      }

      return this;
    };

    AbstractMatrix.prototype.powM = function powM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
        }
      }

      return this;
    };
  }

  /**
   * @private
   * Check that a row index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */
  function checkRowIndex(matrix, index, outer) {
    let max = outer ? matrix.rows : matrix.rows - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Row index out of range');
    }
  }
  /**
   * @private
   * Check that a column index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */

  function checkColumnIndex(matrix, index, outer) {
    let max = outer ? matrix.columns : matrix.columns - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Column index out of range');
    }
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkRowVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.columns) {
      throw new RangeError('vector size must be the same as the number of columns');
    }

    return vector;
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkColumnVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.rows) {
      throw new RangeError('vector size must be the same as the number of rows');
    }

    return vector;
  }
  function checkIndices(matrix, rowIndices, columnIndices) {
    return {
      row: checkRowIndices(matrix, rowIndices),
      column: checkColumnIndices(matrix, columnIndices)
    };
  }
  function checkRowIndices(matrix, rowIndices) {
    if (typeof rowIndices !== 'object') {
      throw new TypeError('unexpected type for row indices');
    }

    let rowOut = rowIndices.some(r => {
      return r < 0 || r >= matrix.rows;
    });

    if (rowOut) {
      throw new RangeError('row indices are out of range');
    }

    if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
    return rowIndices;
  }
  function checkColumnIndices(matrix, columnIndices) {
    if (typeof columnIndices !== 'object') {
      throw new TypeError('unexpected type for column indices');
    }

    let columnOut = columnIndices.some(c => {
      return c < 0 || c >= matrix.columns;
    });

    if (columnOut) {
      throw new RangeError('column indices are out of range');
    }

    if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
    return columnIndices;
  }
  function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
    if (arguments.length !== 5) {
      throw new RangeError('expected 4 arguments');
    }

    checkNumber('startRow', startRow);
    checkNumber('endRow', endRow);
    checkNumber('startColumn', startColumn);
    checkNumber('endColumn', endColumn);

    if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
      throw new RangeError('Submatrix indices are out of range');
    }
  }
  function newArray(length, value = 0) {
    let array = [];

    for (let i = 0; i < length; i++) {
      array.push(value);
    }

    return array;
  }

  function checkNumber(name, value) {
    if (typeof value !== 'number') {
      throw new TypeError(`${name} must be a number`);
    }
  }

  function checkNonEmpty(matrix) {
    if (matrix.isEmpty()) {
      throw new Error('Empty matrix has no elements to index');
    }
  }

  function sumByRow(matrix) {
    let sum = newArray(matrix.rows);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[i] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumByColumn(matrix) {
    let sum = newArray(matrix.columns);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[j] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumAll(matrix) {
    let v = 0;

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        v += matrix.get(i, j);
      }
    }

    return v;
  }
  function productByRow(matrix) {
    let sum = newArray(matrix.rows, 1);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[i] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productByColumn(matrix) {
    let sum = newArray(matrix.columns, 1);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[j] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productAll(matrix) {
    let v = 1;

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        v *= matrix.get(i, j);
      }
    }

    return v;
  }
  function varianceByRow(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (let i = 0; i < rows; i++) {
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean[i];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / cols) / cols);
      }
    }

    return variance;
  }
  function varianceByColumn(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (let j = 0; j < cols; j++) {
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let i = 0; i < rows; i++) {
        x = matrix.get(i, j) - mean[j];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / rows) / rows);
      }
    }

    return variance;
  }
  function varianceAll(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const size = rows * cols;
    let sum1 = 0;
    let sum2 = 0;
    let x = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean;
        sum1 += x;
        sum2 += x * x;
      }
    }

    if (unbiased) {
      return (sum2 - sum1 * sum1 / size) / (size - 1);
    } else {
      return (sum2 - sum1 * sum1 / size) / size;
    }
  }
  function centerByRow(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[i]);
      }
    }
  }
  function centerByColumn(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[j]);
      }
    }
  }
  function centerAll(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean);
      }
    }
  }
  function getScaleByRow(matrix) {
    const scale = [];

    for (let i = 0; i < matrix.rows; i++) {
      let sum = 0;

      for (let j = 0; j < matrix.columns; j++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByRow(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[i]);
      }
    }
  }
  function getScaleByColumn(matrix) {
    const scale = [];

    for (let j = 0; j < matrix.columns; j++) {
      let sum = 0;

      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByColumn(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[j]);
      }
    }
  }
  function getScaleAll(matrix) {
    const divider = matrix.size - 1;
    let sum = 0;

    for (let j = 0; j < matrix.columns; j++) {
      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / divider;
      }
    }

    return Math.sqrt(sum);
  }
  function scaleAll(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale);
      }
    }
  }

  class AbstractMatrix {
    static from1DArray(newRows, newColumns, newData) {
      let length = newRows * newColumns;

      if (length !== newData.length) {
        throw new RangeError('data length does not match given dimensions');
      }

      let newMatrix = new Matrix(newRows, newColumns);

      for (let row = 0; row < newRows; row++) {
        for (let column = 0; column < newColumns; column++) {
          newMatrix.set(row, column, newData[row * newColumns + column]);
        }
      }

      return newMatrix;
    }

    static rowVector(newData) {
      let vector = new Matrix(1, newData.length);

      for (let i = 0; i < newData.length; i++) {
        vector.set(0, i, newData[i]);
      }

      return vector;
    }

    static columnVector(newData) {
      let vector = new Matrix(newData.length, 1);

      for (let i = 0; i < newData.length; i++) {
        vector.set(i, 0, newData[i]);
      }

      return vector;
    }

    static zeros(rows, columns) {
      return new Matrix(rows, columns);
    }

    static ones(rows, columns) {
      return new Matrix(rows, columns).fill(1);
    }

    static rand(rows, columns, options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        random = Math.random
      } = options;
      let matrix = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          matrix.set(i, j, random());
        }
      }

      return matrix;
    }

    static randInt(rows, columns, options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1000,
        random = Math.random
      } = options;
      if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
      if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let interval = max - min;
      let matrix = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let value = min + Math.round(random() * interval);
          matrix.set(i, j, value);
        }
      }

      return matrix;
    }

    static eye(rows, columns, value) {
      if (columns === undefined) columns = rows;
      if (value === undefined) value = 1;
      let min = Math.min(rows, columns);
      let matrix = this.zeros(rows, columns);

      for (let i = 0; i < min; i++) {
        matrix.set(i, i, value);
      }

      return matrix;
    }

    static diag(data, rows, columns) {
      let l = data.length;
      if (rows === undefined) rows = l;
      if (columns === undefined) columns = rows;
      let min = Math.min(l, rows, columns);
      let matrix = this.zeros(rows, columns);

      for (let i = 0; i < min; i++) {
        matrix.set(i, i, data[i]);
      }

      return matrix;
    }

    static min(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      let rows = matrix1.rows;
      let columns = matrix1.columns;
      let result = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static max(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      let rows = matrix1.rows;
      let columns = matrix1.columns;
      let result = new this(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static checkMatrix(value) {
      return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
    }

    static isMatrix(value) {
      return value != null && value.klass === 'Matrix';
    }

    get size() {
      return this.rows * this.columns;
    }

    apply(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          callback.call(this, i, j);
        }
      }

      return this;
    }

    to1DArray() {
      let array = [];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          array.push(this.get(i, j));
        }
      }

      return array;
    }

    to2DArray() {
      let copy = [];

      for (let i = 0; i < this.rows; i++) {
        copy.push([]);

        for (let j = 0; j < this.columns; j++) {
          copy[i].push(this.get(i, j));
        }
      }

      return copy;
    }

    toJSON() {
      return this.to2DArray();
    }

    isRowVector() {
      return this.rows === 1;
    }

    isColumnVector() {
      return this.columns === 1;
    }

    isVector() {
      return this.rows === 1 || this.columns === 1;
    }

    isSquare() {
      return this.rows === this.columns;
    }

    isEmpty() {
      return this.rows === 0 || this.columns === 0;
    }

    isSymmetric() {
      if (this.isSquare()) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j <= i; j++) {
            if (this.get(i, j) !== this.get(j, i)) {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }

    isEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isEchelonForm = true;
      let checked = false;

      while (i < this.rows && isEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isEchelonForm = false;
            checked = true;
          }
        }

        i++;
      }

      return isEchelonForm;
    }

    isReducedEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isReducedEchelonForm = true;
      let checked = false;

      while (i < this.rows && isReducedEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isReducedEchelonForm = false;
            checked = true;
          }
        }

        for (let k = j + 1; k < this.rows; k++) {
          if (this.get(i, k) !== 0) {
            isReducedEchelonForm = false;
          }
        }

        i++;
      }

      return isReducedEchelonForm;
    }

    echelonForm() {
      let result = this.clone();
      let h = 0;
      let k = 0;

      while (h < result.rows && k < result.columns) {
        let iMax = h;

        for (let i = h; i < result.rows; i++) {
          if (result.get(i, k) > result.get(iMax, k)) {
            iMax = i;
          }
        }

        if (result.get(iMax, k) === 0) {
          k++;
        } else {
          result.swapRows(h, iMax);
          let tmp = result.get(h, k);

          for (let j = k; j < result.columns; j++) {
            result.set(h, j, result.get(h, j) / tmp);
          }

          for (let i = h + 1; i < result.rows; i++) {
            let factor = result.get(i, k) / result.get(h, k);
            result.set(i, k, 0);

            for (let j = k + 1; j < result.columns; j++) {
              result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
            }
          }

          h++;
          k++;
        }
      }

      return result;
    }

    reducedEchelonForm() {
      let result = this.echelonForm();
      let m = result.columns;
      let n = result.rows;
      let h = n - 1;

      while (h >= 0) {
        if (result.maxRow(h) === 0) {
          h--;
        } else {
          let p = 0;
          let pivot = false;

          while (p < n && pivot === false) {
            if (result.get(h, p) === 1) {
              pivot = true;
            } else {
              p++;
            }
          }

          for (let i = 0; i < h; i++) {
            let factor = result.get(i, p);

            for (let j = p; j < m; j++) {
              let tmp = result.get(i, j) - factor * result.get(h, j);
              result.set(i, j, tmp);
            }
          }

          h--;
        }
      }

      return result;
    }

    set() {
      throw new Error('set method is unimplemented');
    }

    get() {
      throw new Error('get method is unimplemented');
    }

    repeat(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        rows = 1,
        columns = 1
      } = options;

      if (!Number.isInteger(rows) || rows <= 0) {
        throw new TypeError('rows must be a positive integer');
      }

      if (!Number.isInteger(columns) || columns <= 0) {
        throw new TypeError('columns must be a positive integer');
      }

      let matrix = new Matrix(this.rows * rows, this.columns * columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          matrix.setSubMatrix(this, this.rows * i, this.columns * j);
        }
      }

      return matrix;
    }

    fill(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, value);
        }
      }

      return this;
    }

    neg() {
      return this.mulS(-1);
    }

    getRow(index) {
      checkRowIndex(this, index);
      let row = [];

      for (let i = 0; i < this.columns; i++) {
        row.push(this.get(index, i));
      }

      return row;
    }

    getRowVector(index) {
      return Matrix.rowVector(this.getRow(index));
    }

    setRow(index, array) {
      checkRowIndex(this, index);
      array = checkRowVector(this, array);

      for (let i = 0; i < this.columns; i++) {
        this.set(index, i, array[i]);
      }

      return this;
    }

    swapRows(row1, row2) {
      checkRowIndex(this, row1);
      checkRowIndex(this, row2);

      for (let i = 0; i < this.columns; i++) {
        let temp = this.get(row1, i);
        this.set(row1, i, this.get(row2, i));
        this.set(row2, i, temp);
      }

      return this;
    }

    getColumn(index) {
      checkColumnIndex(this, index);
      let column = [];

      for (let i = 0; i < this.rows; i++) {
        column.push(this.get(i, index));
      }

      return column;
    }

    getColumnVector(index) {
      return Matrix.columnVector(this.getColumn(index));
    }

    setColumn(index, array) {
      checkColumnIndex(this, index);
      array = checkColumnVector(this, array);

      for (let i = 0; i < this.rows; i++) {
        this.set(i, index, array[i]);
      }

      return this;
    }

    swapColumns(column1, column2) {
      checkColumnIndex(this, column1);
      checkColumnIndex(this, column2);

      for (let i = 0; i < this.rows; i++) {
        let temp = this.get(i, column1);
        this.set(i, column1, this.get(i, column2));
        this.set(i, column2, temp);
      }

      return this;
    }

    addRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[j]);
        }
      }

      return this;
    }

    subRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[j]);
        }
      }

      return this;
    }

    mulRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[j]);
        }
      }

      return this;
    }

    divRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[j]);
        }
      }

      return this;
    }

    addColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[i]);
        }
      }

      return this;
    }

    subColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[i]);
        }
      }

      return this;
    }

    mulColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[i]);
        }
      }

      return this;
    }

    divColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[i]);
        }
      }

      return this;
    }

    mulRow(index, value) {
      checkRowIndex(this, index);

      for (let i = 0; i < this.columns; i++) {
        this.set(index, i, this.get(index, i) * value);
      }

      return this;
    }

    mulColumn(index, value) {
      checkColumnIndex(this, index);

      for (let i = 0; i < this.rows; i++) {
        this.set(i, index, this.get(i, index) * value);
      }

      return this;
    }

    max() {
      if (this.isEmpty()) {
        return NaN;
      }

      let v = this.get(0, 0);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    maxIndex() {
      checkNonEmpty(this);
      let v = this.get(0, 0);
      let idx = [0, 0];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    min() {
      if (this.isEmpty()) {
        return NaN;
      }

      let v = this.get(0, 0);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    minIndex() {
      checkNonEmpty(this);
      let v = this.get(0, 0);
      let idx = [0, 0];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    maxRow(row) {
      checkRowIndex(this, row);

      if (this.isEmpty()) {
        return NaN;
      }

      let v = this.get(row, 0);

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    maxRowIndex(row) {
      checkRowIndex(this, row);
      checkNonEmpty(this);
      let v = this.get(row, 0);
      let idx = [row, 0];

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    minRow(row) {
      checkRowIndex(this, row);

      if (this.isEmpty()) {
        return NaN;
      }

      let v = this.get(row, 0);

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    minRowIndex(row) {
      checkRowIndex(this, row);
      checkNonEmpty(this);
      let v = this.get(row, 0);
      let idx = [row, 0];

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    maxColumn(column) {
      checkColumnIndex(this, column);

      if (this.isEmpty()) {
        return NaN;
      }

      let v = this.get(0, column);

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    maxColumnIndex(column) {
      checkColumnIndex(this, column);
      checkNonEmpty(this);
      let v = this.get(0, column);
      let idx = [0, column];

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    minColumn(column) {
      checkColumnIndex(this, column);

      if (this.isEmpty()) {
        return NaN;
      }

      let v = this.get(0, column);

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    minColumnIndex(column) {
      checkColumnIndex(this, column);
      checkNonEmpty(this);
      let v = this.get(0, column);
      let idx = [0, column];

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    diag() {
      let min = Math.min(this.rows, this.columns);
      let diag = [];

      for (let i = 0; i < min; i++) {
        diag.push(this.get(i, i));
      }

      return diag;
    }

    norm(type = 'frobenius') {
      let result = 0;

      if (type === 'max') {
        return this.max();
      } else if (type === 'frobenius') {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            result = result + this.get(i, j) * this.get(i, j);
          }
        }

        return Math.sqrt(result);
      } else {
        throw new RangeError(`unknown norm type: ${type}`);
      }
    }

    cumulativeSum() {
      let sum = 0;

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          sum += this.get(i, j);
          this.set(i, j, sum);
        }
      }

      return this;
    }

    dot(vector2) {
      if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
      let vector1 = this.to1DArray();

      if (vector1.length !== vector2.length) {
        throw new RangeError('vectors do not have the same size');
      }

      let dot = 0;

      for (let i = 0; i < vector1.length; i++) {
        dot += vector1[i] * vector2[i];
      }

      return dot;
    }

    mmul(other) {
      other = Matrix.checkMatrix(other);
      let m = this.rows;
      let n = this.columns;
      let p = other.columns;
      let result = new Matrix(m, p);
      let Bcolj = new Float64Array(n);

      for (let j = 0; j < p; j++) {
        for (let k = 0; k < n; k++) {
          Bcolj[k] = other.get(k, j);
        }

        for (let i = 0; i < m; i++) {
          let s = 0;

          for (let k = 0; k < n; k++) {
            s += this.get(i, k) * Bcolj[k];
          }

          result.set(i, j, s);
        }
      }

      return result;
    }

    strassen2x2(other) {
      other = Matrix.checkMatrix(other);
      let result = new Matrix(2, 2);
      const a11 = this.get(0, 0);
      const b11 = other.get(0, 0);
      const a12 = this.get(0, 1);
      const b12 = other.get(0, 1);
      const a21 = this.get(1, 0);
      const b21 = other.get(1, 0);
      const a22 = this.get(1, 1);
      const b22 = other.get(1, 1); // Compute intermediate values.

      const m1 = (a11 + a22) * (b11 + b22);
      const m2 = (a21 + a22) * b11;
      const m3 = a11 * (b12 - b22);
      const m4 = a22 * (b21 - b11);
      const m5 = (a11 + a12) * b22;
      const m6 = (a21 - a11) * (b11 + b12);
      const m7 = (a12 - a22) * (b21 + b22); // Combine intermediate values into the output.

      const c00 = m1 + m4 - m5 + m7;
      const c01 = m3 + m5;
      const c10 = m2 + m4;
      const c11 = m1 - m2 + m3 + m6;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      return result;
    }

    strassen3x3(other) {
      other = Matrix.checkMatrix(other);
      let result = new Matrix(3, 3);
      const a00 = this.get(0, 0);
      const a01 = this.get(0, 1);
      const a02 = this.get(0, 2);
      const a10 = this.get(1, 0);
      const a11 = this.get(1, 1);
      const a12 = this.get(1, 2);
      const a20 = this.get(2, 0);
      const a21 = this.get(2, 1);
      const a22 = this.get(2, 2);
      const b00 = other.get(0, 0);
      const b01 = other.get(0, 1);
      const b02 = other.get(0, 2);
      const b10 = other.get(1, 0);
      const b11 = other.get(1, 1);
      const b12 = other.get(1, 2);
      const b20 = other.get(2, 0);
      const b21 = other.get(2, 1);
      const b22 = other.get(2, 2);
      const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
      const m2 = (a00 - a10) * (-b01 + b11);
      const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
      const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
      const m5 = (a10 + a11) * (-b00 + b01);
      const m6 = a00 * b00;
      const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
      const m8 = (-a00 + a20) * (b02 - b12);
      const m9 = (a20 + a21) * (-b00 + b02);
      const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
      const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
      const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
      const m13 = (a02 - a22) * (b11 - b21);
      const m14 = a02 * b20;
      const m15 = (a21 + a22) * (-b20 + b21);
      const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
      const m17 = (a02 - a12) * (b12 - b22);
      const m18 = (a11 + a12) * (-b20 + b22);
      const m19 = a01 * b10;
      const m20 = a12 * b21;
      const m21 = a10 * b02;
      const m22 = a20 * b01;
      const m23 = a22 * b22;
      const c00 = m6 + m14 + m19;
      const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
      const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
      const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
      const c11 = m2 + m4 + m5 + m6 + m20;
      const c12 = m14 + m16 + m17 + m18 + m21;
      const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
      const c21 = m12 + m13 + m14 + m15 + m22;
      const c22 = m6 + m7 + m8 + m9 + m23;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(0, 2, c02);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      result.set(1, 2, c12);
      result.set(2, 0, c20);
      result.set(2, 1, c21);
      result.set(2, 2, c22);
      return result;
    }

    mmulStrassen(y) {
      y = Matrix.checkMatrix(y);
      let x = this.clone();
      let r1 = x.rows;
      let c1 = x.columns;
      let r2 = y.rows;
      let c2 = y.columns;

      if (c1 !== r2) {
        // eslint-disable-next-line no-console
        console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);
      } // Put a matrix into the top left of a matrix of zeros.
      // `rows` and `cols` are the dimensions of the output matrix.


      function embed(mat, rows, cols) {
        let r = mat.rows;
        let c = mat.columns;

        if (r === rows && c === cols) {
          return mat;
        } else {
          let resultat = AbstractMatrix.zeros(rows, cols);
          resultat = resultat.setSubMatrix(mat, 0, 0);
          return resultat;
        }
      } // Make sure both matrices are the same size.
      // This is exclusively for simplicity:
      // this algorithm can be implemented with matrices of different sizes.


      let r = Math.max(r1, r2);
      let c = Math.max(c1, c2);
      x = embed(x, r, c);
      y = embed(y, r, c); // Our recursive multiplication function.

      function blockMult(a, b, rows, cols) {
        // For small matrices, resort to naive multiplication.
        if (rows <= 512 || cols <= 512) {
          return a.mmul(b); // a is equivalent to this
        } // Apply dynamic padding.


        if (rows % 2 === 1 && cols % 2 === 1) {
          a = embed(a, rows + 1, cols + 1);
          b = embed(b, rows + 1, cols + 1);
        } else if (rows % 2 === 1) {
          a = embed(a, rows + 1, cols);
          b = embed(b, rows + 1, cols);
        } else if (cols % 2 === 1) {
          a = embed(a, rows, cols + 1);
          b = embed(b, rows, cols + 1);
        }

        let halfRows = parseInt(a.rows / 2, 10);
        let halfCols = parseInt(a.columns / 2, 10); // Subdivide input matrices.

        let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
        let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
        let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
        let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
        let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
        let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1); // Compute intermediate values.

        let m1 = blockMult(AbstractMatrix.add(a11, a22), AbstractMatrix.add(b11, b22), halfRows, halfCols);
        let m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
        let m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
        let m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
        let m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
        let m6 = blockMult(AbstractMatrix.sub(a21, a11), AbstractMatrix.add(b11, b12), halfRows, halfCols);
        let m7 = blockMult(AbstractMatrix.sub(a12, a22), AbstractMatrix.add(b21, b22), halfRows, halfCols); // Combine intermediate values into the output.

        let c11 = AbstractMatrix.add(m1, m4);
        c11.sub(m5);
        c11.add(m7);
        let c12 = AbstractMatrix.add(m3, m5);
        let c21 = AbstractMatrix.add(m2, m4);
        let c22 = AbstractMatrix.sub(m1, m2);
        c22.add(m3);
        c22.add(m6); // Crop output to the desired size (undo dynamic padding).

        let resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0);
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
      }

      return blockMult(x, y, r, c);
    }

    scaleRows(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let i = 0; i < this.rows; i++) {
        const row = this.getRow(i);

        if (row.length > 0) {
          rescale(row, {
            min,
            max,
            output: row
          });
        }

        newMatrix.setRow(i, row);
      }

      return newMatrix;
    }

    scaleColumns(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let i = 0; i < this.columns; i++) {
        const column = this.getColumn(i);

        if (column.length) {
          rescale(column, {
            min: min,
            max: max,
            output: column
          });
        }

        newMatrix.setColumn(i, column);
      }

      return newMatrix;
    }

    flipRows() {
      const middle = Math.ceil(this.columns / 2);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < middle; j++) {
          let first = this.get(i, j);
          let last = this.get(i, this.columns - 1 - j);
          this.set(i, j, last);
          this.set(i, this.columns - 1 - j, first);
        }
      }

      return this;
    }

    flipColumns() {
      const middle = Math.ceil(this.rows / 2);

      for (let j = 0; j < this.columns; j++) {
        for (let i = 0; i < middle; i++) {
          let first = this.get(i, j);
          let last = this.get(this.rows - 1 - i, j);
          this.set(i, j, last);
          this.set(this.rows - 1 - i, j, first);
        }
      }

      return this;
    }

    kroneckerProduct(other) {
      other = Matrix.checkMatrix(other);
      let m = this.rows;
      let n = this.columns;
      let p = other.rows;
      let q = other.columns;
      let result = new Matrix(m * p, n * q);

      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          for (let k = 0; k < p; k++) {
            for (let l = 0; l < q; l++) {
              result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
            }
          }
        }
      }

      return result;
    }

    transpose() {
      let result = new Matrix(this.columns, this.rows);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          result.set(j, i, this.get(i, j));
        }
      }

      return result;
    }

    sortRows(compareFunction = compareNumbers) {
      for (let i = 0; i < this.rows; i++) {
        this.setRow(i, this.getRow(i).sort(compareFunction));
      }

      return this;
    }

    sortColumns(compareFunction = compareNumbers) {
      for (let i = 0; i < this.columns; i++) {
        this.setColumn(i, this.getColumn(i).sort(compareFunction));
      }

      return this;
    }

    subMatrix(startRow, endRow, startColumn, endColumn) {
      checkRange(this, startRow, endRow, startColumn, endColumn);
      let newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);

      for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
        }
      }

      return newMatrix;
    }

    subMatrixRow(indices, startColumn, endColumn) {
      if (startColumn === undefined) startColumn = 0;
      if (endColumn === undefined) endColumn = this.columns - 1;

      if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
        throw new RangeError('Argument out of range');
      }

      let newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);

      for (let i = 0; i < indices.length; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          if (indices[i] < 0 || indices[i] >= this.rows) {
            throw new RangeError(`Row index out of range: ${indices[i]}`);
          }

          newMatrix.set(i, j - startColumn, this.get(indices[i], j));
        }
      }

      return newMatrix;
    }

    subMatrixColumn(indices, startRow, endRow) {
      if (startRow === undefined) startRow = 0;
      if (endRow === undefined) endRow = this.rows - 1;

      if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
        throw new RangeError('Argument out of range');
      }

      let newMatrix = new Matrix(endRow - startRow + 1, indices.length);

      for (let i = 0; i < indices.length; i++) {
        for (let j = startRow; j <= endRow; j++) {
          if (indices[i] < 0 || indices[i] >= this.columns) {
            throw new RangeError(`Column index out of range: ${indices[i]}`);
          }

          newMatrix.set(j - startRow, i, this.get(j, indices[i]));
        }
      }

      return newMatrix;
    }

    setSubMatrix(matrix, startRow, startColumn) {
      matrix = Matrix.checkMatrix(matrix);

      if (matrix.isEmpty()) {
        return this;
      }

      let endRow = startRow + matrix.rows - 1;
      let endColumn = startColumn + matrix.columns - 1;
      checkRange(this, startRow, endRow, startColumn, endColumn);

      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          this.set(startRow + i, startColumn + j, matrix.get(i, j));
        }
      }

      return this;
    }

    selection(rowIndices, columnIndices) {
      let indices = checkIndices(this, rowIndices, columnIndices);
      let newMatrix = new Matrix(rowIndices.length, columnIndices.length);

      for (let i = 0; i < indices.row.length; i++) {
        let rowIndex = indices.row[i];

        for (let j = 0; j < indices.column.length; j++) {
          let columnIndex = indices.column[j];
          newMatrix.set(i, j, this.get(rowIndex, columnIndex));
        }
      }

      return newMatrix;
    }

    trace() {
      let min = Math.min(this.rows, this.columns);
      let trace = 0;

      for (let i = 0; i < min; i++) {
        trace += this.get(i, i);
      }

      return trace;
    }

    clone() {
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let row = 0; row < this.rows; row++) {
        for (let column = 0; column < this.columns; column++) {
          newMatrix.set(row, column, this.get(row, column));
        }
      }

      return newMatrix;
    }

    sum(by) {
      switch (by) {
        case 'row':
          return sumByRow(this);

        case 'column':
          return sumByColumn(this);

        case undefined:
          return sumAll(this);

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    product(by) {
      switch (by) {
        case 'row':
          return productByRow(this);

        case 'column':
          return productByColumn(this);

        case undefined:
          return productAll(this);

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    mean(by) {
      const sum = this.sum(by);

      switch (by) {
        case 'row':
          {
            for (let i = 0; i < this.rows; i++) {
              sum[i] /= this.columns;
            }

            return sum;
          }

        case 'column':
          {
            for (let i = 0; i < this.columns; i++) {
              sum[i] /= this.rows;
            }

            return sum;
          }

        case undefined:
          return sum / this.size;

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    variance(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        unbiased = true,
        mean = this.mean(by)
      } = options;

      if (typeof unbiased !== 'boolean') {
        throw new TypeError('unbiased must be a boolean');
      }

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByRow(this, unbiased, mean);
          }

        case 'column':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByColumn(this, unbiased, mean);
          }

        case undefined:
          {
            if (typeof mean !== 'number') {
              throw new TypeError('mean must be a number');
            }

            return varianceAll(this, unbiased, mean);
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    standardDeviation(by, options) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      const variance = this.variance(by, options);

      if (by === undefined) {
        return Math.sqrt(variance);
      } else {
        for (let i = 0; i < variance.length; i++) {
          variance[i] = Math.sqrt(variance[i]);
        }

        return variance;
      }
    }

    center(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        center = this.mean(by)
      } = options;

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByRow(this, center);
            return this;
          }

        case 'column':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByColumn(this, center);
            return this;
          }

        case undefined:
          {
            if (typeof center !== 'number') {
              throw new TypeError('center must be a number');
            }

            centerAll(this, center);
            return this;
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    scale(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      let scale = options.scale;

      switch (by) {
        case 'row':
          {
            if (scale === undefined) {
              scale = getScaleByRow(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByRow(this, scale);
            return this;
          }

        case 'column':
          {
            if (scale === undefined) {
              scale = getScaleByColumn(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByColumn(this, scale);
            return this;
          }

        case undefined:
          {
            if (scale === undefined) {
              scale = getScaleAll(this);
            } else if (typeof scale !== 'number') {
              throw new TypeError('scale must be a number');
            }

            scaleAll(this, scale);
            return this;
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    toString(options) {
      return inspectMatrixWithOptions(this, options);
    }

  }
  AbstractMatrix.prototype.klass = 'Matrix';

  if (typeof Symbol !== 'undefined') {
    AbstractMatrix.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspectMatrix;
  }

  function compareNumbers(a, b) {
    return a - b;
  } // Synonyms


  AbstractMatrix.random = AbstractMatrix.rand;
  AbstractMatrix.randomInt = AbstractMatrix.randInt;
  AbstractMatrix.diagonal = AbstractMatrix.diag;
  AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
  AbstractMatrix.identity = AbstractMatrix.eye;
  AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
  AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;
  class Matrix extends AbstractMatrix {
    constructor(nRows, nColumns) {
      super();

      if (Matrix.isMatrix(nRows)) {
        // eslint-disable-next-line no-constructor-return
        return nRows.clone();
      } else if (Number.isInteger(nRows) && nRows >= 0) {
        // Create an empty matrix
        this.data = [];

        if (Number.isInteger(nColumns) && nColumns >= 0) {
          for (let i = 0; i < nRows; i++) {
            this.data.push(new Float64Array(nColumns));
          }
        } else {
          throw new TypeError('nColumns must be a positive integer');
        }
      } else if (Array.isArray(nRows)) {
        // Copy the values from the 2D array
        const arrayData = nRows;
        nRows = arrayData.length;
        nColumns = nRows ? arrayData[0].length : 0;

        if (typeof nColumns !== 'number') {
          throw new TypeError('Data must be a 2D array with at least one element');
        }

        this.data = [];

        for (let i = 0; i < nRows; i++) {
          if (arrayData[i].length !== nColumns) {
            throw new RangeError('Inconsistent array dimensions');
          }

          this.data.push(Float64Array.from(arrayData[i]));
        }
      } else {
        throw new TypeError('First argument must be a positive number or an array');
      }

      this.rows = nRows;
      this.columns = nColumns;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

    removeRow(index) {
      checkRowIndex(this, index);
      this.data.splice(index, 1);
      this.rows -= 1;
      return this;
    }

    addRow(index, array) {
      if (array === undefined) {
        array = index;
        index = this.rows;
      }

      checkRowIndex(this, index, true);
      array = Float64Array.from(checkRowVector(this, array));
      this.data.splice(index, 0, array);
      this.rows += 1;
      return this;
    }

    removeColumn(index) {
      checkColumnIndex(this, index);

      for (let i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns - 1);

        for (let j = 0; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        for (let j = index + 1; j < this.columns; j++) {
          newRow[j - 1] = this.data[i][j];
        }

        this.data[i] = newRow;
      }

      this.columns -= 1;
      return this;
    }

    addColumn(index, array) {
      if (typeof array === 'undefined') {
        array = index;
        index = this.columns;
      }

      checkColumnIndex(this, index, true);
      array = checkColumnVector(this, array);

      for (let i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns + 1);
        let j = 0;

        for (; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        newRow[j++] = array[i];

        for (; j < this.columns + 1; j++) {
          newRow[j] = this.data[i][j - 1];
        }

        this.data[i] = newRow;
      }

      this.columns += 1;
      return this;
    }

  }
  installMathOperations(AbstractMatrix, Matrix);

  class BaseView extends AbstractMatrix {
    constructor(matrix, rows, columns) {
      super();
      this.matrix = matrix;
      this.rows = rows;
      this.columns = columns;
    }

  }

  class MatrixTransposeView extends BaseView {
    constructor(matrix) {
      super(matrix, matrix.columns, matrix.rows);
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(columnIndex, rowIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(columnIndex, rowIndex);
    }

  }

  class WrapperMatrix2D extends AbstractMatrix {
    constructor(data) {
      super();
      this.data = data;
      this.rows = data.length;
      this.columns = data[0].length;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

  }

  class LuDecomposition {
    constructor(matrix) {
      matrix = WrapperMatrix2D.checkMatrix(matrix);
      let lu = matrix.clone();
      let rows = lu.rows;
      let columns = lu.columns;
      let pivotVector = new Float64Array(rows);
      let pivotSign = 1;
      let i, j, k, p, s, t, v;
      let LUcolj, kmax;

      for (i = 0; i < rows; i++) {
        pivotVector[i] = i;
      }

      LUcolj = new Float64Array(rows);

      for (j = 0; j < columns; j++) {
        for (i = 0; i < rows; i++) {
          LUcolj[i] = lu.get(i, j);
        }

        for (i = 0; i < rows; i++) {
          kmax = Math.min(i, j);
          s = 0;

          for (k = 0; k < kmax; k++) {
            s += lu.get(i, k) * LUcolj[k];
          }

          LUcolj[i] -= s;
          lu.set(i, j, LUcolj[i]);
        }

        p = j;

        for (i = j + 1; i < rows; i++) {
          if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
            p = i;
          }
        }

        if (p !== j) {
          for (k = 0; k < columns; k++) {
            t = lu.get(p, k);
            lu.set(p, k, lu.get(j, k));
            lu.set(j, k, t);
          }

          v = pivotVector[p];
          pivotVector[p] = pivotVector[j];
          pivotVector[j] = v;
          pivotSign = -pivotSign;
        }

        if (j < rows && lu.get(j, j) !== 0) {
          for (i = j + 1; i < rows; i++) {
            lu.set(i, j, lu.get(i, j) / lu.get(j, j));
          }
        }
      }

      this.LU = lu;
      this.pivotVector = pivotVector;
      this.pivotSign = pivotSign;
    }

    isSingular() {
      let data = this.LU;
      let col = data.columns;

      for (let j = 0; j < col; j++) {
        if (data.get(j, j) === 0) {
          return true;
        }
      }

      return false;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      let lu = this.LU;
      let rows = lu.rows;

      if (rows !== value.rows) {
        throw new Error('Invalid matrix dimensions');
      }

      if (this.isSingular()) {
        throw new Error('LU matrix is singular');
      }

      let count = value.columns;
      let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
      let columns = lu.columns;
      let i, j, k;

      for (k = 0; k < columns; k++) {
        for (i = k + 1; i < columns; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      for (k = columns - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / lu.get(k, k));
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      return X;
    }

    get determinant() {
      let data = this.LU;

      if (!data.isSquare()) {
        throw new Error('Matrix must be square');
      }

      let determinant = this.pivotSign;
      let col = data.columns;

      for (let j = 0; j < col; j++) {
        determinant *= data.get(j, j);
      }

      return determinant;
    }

    get lowerTriangularMatrix() {
      let data = this.LU;
      let rows = data.rows;
      let columns = data.columns;
      let X = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (i > j) {
            X.set(i, j, data.get(i, j));
          } else if (i === j) {
            X.set(i, j, 1);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get upperTriangularMatrix() {
      let data = this.LU;
      let rows = data.rows;
      let columns = data.columns;
      let X = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (i <= j) {
            X.set(i, j, data.get(i, j));
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }

  }

  function hypotenuse(a, b) {
    let r = 0;

    if (Math.abs(a) > Math.abs(b)) {
      r = b / a;
      return Math.abs(a) * Math.sqrt(1 + r * r);
    }

    if (b !== 0) {
      r = a / b;
      return Math.abs(b) * Math.sqrt(1 + r * r);
    }

    return 0;
  }

  class QrDecomposition {
    constructor(value) {
      value = WrapperMatrix2D.checkMatrix(value);
      let qr = value.clone();
      let m = value.rows;
      let n = value.columns;
      let rdiag = new Float64Array(n);
      let i, j, k, s;

      for (k = 0; k < n; k++) {
        let nrm = 0;

        for (i = k; i < m; i++) {
          nrm = hypotenuse(nrm, qr.get(i, k));
        }

        if (nrm !== 0) {
          if (qr.get(k, k) < 0) {
            nrm = -nrm;
          }

          for (i = k; i < m; i++) {
            qr.set(i, k, qr.get(i, k) / nrm);
          }

          qr.set(k, k, qr.get(k, k) + 1);

          for (j = k + 1; j < n; j++) {
            s = 0;

            for (i = k; i < m; i++) {
              s += qr.get(i, k) * qr.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < m; i++) {
              qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
            }
          }
        }

        rdiag[k] = -nrm;
      }

      this.QR = qr;
      this.Rdiag = rdiag;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      let qr = this.QR;
      let m = qr.rows;

      if (value.rows !== m) {
        throw new Error('Matrix row dimensions must agree');
      }

      if (!this.isFullRank()) {
        throw new Error('Matrix is rank deficient');
      }

      let count = value.columns;
      let X = value.clone();
      let n = qr.columns;
      let i, j, k, s;

      for (k = 0; k < n; k++) {
        for (j = 0; j < count; j++) {
          s = 0;

          for (i = k; i < m; i++) {
            s += qr.get(i, k) * X.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < m; i++) {
            X.set(i, j, X.get(i, j) + s * qr.get(i, k));
          }
        }
      }

      for (k = n - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / this.Rdiag[k]);
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
          }
        }
      }

      return X.subMatrix(0, n - 1, 0, count - 1);
    }

    isFullRank() {
      let columns = this.QR.columns;

      for (let i = 0; i < columns; i++) {
        if (this.Rdiag[i] === 0) {
          return false;
        }
      }

      return true;
    }

    get upperTriangularMatrix() {
      let qr = this.QR;
      let n = qr.columns;
      let X = new Matrix(n, n);
      let i, j;

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (i < j) {
            X.set(i, j, qr.get(i, j));
          } else if (i === j) {
            X.set(i, j, this.Rdiag[i]);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get orthogonalMatrix() {
      let qr = this.QR;
      let rows = qr.rows;
      let columns = qr.columns;
      let X = new Matrix(rows, columns);
      let i, j, k, s;

      for (k = columns - 1; k >= 0; k--) {
        for (i = 0; i < rows; i++) {
          X.set(i, k, 0);
        }

        X.set(k, k, 1);

        for (j = k; j < columns; j++) {
          if (qr.get(k, k) !== 0) {
            s = 0;

            for (i = k; i < rows; i++) {
              s += qr.get(i, k) * X.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < rows; i++) {
              X.set(i, j, X.get(i, j) + s * qr.get(i, k));
            }
          }
        }
      }

      return X;
    }

  }

  class SingularValueDecomposition {
    constructor(value, options = {}) {
      value = WrapperMatrix2D.checkMatrix(value);

      if (value.isEmpty()) {
        throw new Error('Matrix must be non-empty');
      }

      let m = value.rows;
      let n = value.columns;
      const {
        computeLeftSingularVectors = true,
        computeRightSingularVectors = true,
        autoTranspose = false
      } = options;
      let wantu = Boolean(computeLeftSingularVectors);
      let wantv = Boolean(computeRightSingularVectors);
      let swapped = false;
      let a;

      if (m < n) {
        if (!autoTranspose) {
          a = value.clone(); // eslint-disable-next-line no-console

          console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
        } else {
          a = value.transpose();
          m = a.rows;
          n = a.columns;
          swapped = true;
          let aux = wantu;
          wantu = wantv;
          wantv = aux;
        }
      } else {
        a = value.clone();
      }

      let nu = Math.min(m, n);
      let ni = Math.min(m + 1, n);
      let s = new Float64Array(ni);
      let U = new Matrix(m, nu);
      let V = new Matrix(n, n);
      let e = new Float64Array(n);
      let work = new Float64Array(m);
      let si = new Float64Array(ni);

      for (let i = 0; i < ni; i++) si[i] = i;

      let nct = Math.min(m - 1, n);
      let nrt = Math.max(0, Math.min(n - 2, m));
      let mrc = Math.max(nct, nrt);

      for (let k = 0; k < mrc; k++) {
        if (k < nct) {
          s[k] = 0;

          for (let i = k; i < m; i++) {
            s[k] = hypotenuse(s[k], a.get(i, k));
          }

          if (s[k] !== 0) {
            if (a.get(k, k) < 0) {
              s[k] = -s[k];
            }

            for (let i = k; i < m; i++) {
              a.set(i, k, a.get(i, k) / s[k]);
            }

            a.set(k, k, a.get(k, k) + 1);
          }

          s[k] = -s[k];
        }

        for (let j = k + 1; j < n; j++) {
          if (k < nct && s[k] !== 0) {
            let t = 0;

            for (let i = k; i < m; i++) {
              t += a.get(i, k) * a.get(i, j);
            }

            t = -t / a.get(k, k);

            for (let i = k; i < m; i++) {
              a.set(i, j, a.get(i, j) + t * a.get(i, k));
            }
          }

          e[j] = a.get(k, j);
        }

        if (wantu && k < nct) {
          for (let i = k; i < m; i++) {
            U.set(i, k, a.get(i, k));
          }
        }

        if (k < nrt) {
          e[k] = 0;

          for (let i = k + 1; i < n; i++) {
            e[k] = hypotenuse(e[k], e[i]);
          }

          if (e[k] !== 0) {
            if (e[k + 1] < 0) {
              e[k] = 0 - e[k];
            }

            for (let i = k + 1; i < n; i++) {
              e[i] /= e[k];
            }

            e[k + 1] += 1;
          }

          e[k] = -e[k];

          if (k + 1 < m && e[k] !== 0) {
            for (let i = k + 1; i < m; i++) {
              work[i] = 0;
            }

            for (let i = k + 1; i < m; i++) {
              for (let j = k + 1; j < n; j++) {
                work[i] += e[j] * a.get(i, j);
              }
            }

            for (let j = k + 1; j < n; j++) {
              let t = -e[j] / e[k + 1];

              for (let i = k + 1; i < m; i++) {
                a.set(i, j, a.get(i, j) + t * work[i]);
              }
            }
          }

          if (wantv) {
            for (let i = k + 1; i < n; i++) {
              V.set(i, k, e[i]);
            }
          }
        }
      }

      let p = Math.min(n, m + 1);

      if (nct < n) {
        s[nct] = a.get(nct, nct);
      }

      if (m < p) {
        s[p - 1] = 0;
      }

      if (nrt + 1 < p) {
        e[nrt] = a.get(nrt, p - 1);
      }

      e[p - 1] = 0;

      if (wantu) {
        for (let j = nct; j < nu; j++) {
          for (let i = 0; i < m; i++) {
            U.set(i, j, 0);
          }

          U.set(j, j, 1);
        }

        for (let k = nct - 1; k >= 0; k--) {
          if (s[k] !== 0) {
            for (let j = k + 1; j < nu; j++) {
              let t = 0;

              for (let i = k; i < m; i++) {
                t += U.get(i, k) * U.get(i, j);
              }

              t = -t / U.get(k, k);

              for (let i = k; i < m; i++) {
                U.set(i, j, U.get(i, j) + t * U.get(i, k));
              }
            }

            for (let i = k; i < m; i++) {
              U.set(i, k, -U.get(i, k));
            }

            U.set(k, k, 1 + U.get(k, k));

            for (let i = 0; i < k - 1; i++) {
              U.set(i, k, 0);
            }
          } else {
            for (let i = 0; i < m; i++) {
              U.set(i, k, 0);
            }

            U.set(k, k, 1);
          }
        }
      }

      if (wantv) {
        for (let k = n - 1; k >= 0; k--) {
          if (k < nrt && e[k] !== 0) {
            for (let j = k + 1; j < n; j++) {
              let t = 0;

              for (let i = k + 1; i < n; i++) {
                t += V.get(i, k) * V.get(i, j);
              }

              t = -t / V.get(k + 1, k);

              for (let i = k + 1; i < n; i++) {
                V.set(i, j, V.get(i, j) + t * V.get(i, k));
              }
            }
          }

          for (let i = 0; i < n; i++) {
            V.set(i, k, 0);
          }

          V.set(k, k, 1);
        }
      }

      let pp = p - 1;
      let eps = Number.EPSILON;

      while (p > 0) {
        let k, kase;

        for (k = p - 2; k >= -1; k--) {
          if (k === -1) {
            break;
          }

          const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));

          if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
            e[k] = 0;
            break;
          }
        }

        if (k === p - 2) {
          kase = 4;
        } else {
          let ks;

          for (ks = p - 1; ks >= k; ks--) {
            if (ks === k) {
              break;
            }

            let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);

            if (Math.abs(s[ks]) <= eps * t) {
              s[ks] = 0;
              break;
            }
          }

          if (ks === k) {
            kase = 3;
          } else if (ks === p - 1) {
            kase = 1;
          } else {
            kase = 2;
            k = ks;
          }
        }

        k++;

        switch (kase) {
          case 1:
            {
              let f = e[p - 2];
              e[p - 2] = 0;

              for (let j = p - 2; j >= k; j--) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;

                if (j !== k) {
                  f = -sn * e[j - 1];
                  e[j - 1] = cs * e[j - 1];
                }

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                    V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                    V.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 2:
            {
              let f = e[k - 1];
              e[k - 1] = 0;

              for (let j = k; j < p; j++) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;
                f = -sn * e[j];
                e[j] = cs * e[j];

                if (wantu) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                    U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                    U.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 3:
            {
              const scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
              const sp = s[p - 1] / scale;
              const spm1 = s[p - 2] / scale;
              const epm1 = e[p - 2] / scale;
              const sk = s[k] / scale;
              const ek = e[k] / scale;
              const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
              const c = sp * epm1 * (sp * epm1);
              let shift = 0;

              if (b !== 0 || c !== 0) {
                if (b < 0) {
                  shift = 0 - Math.sqrt(b * b + c);
                } else {
                  shift = Math.sqrt(b * b + c);
                }

                shift = c / (b + shift);
              }

              let f = (sk + sp) * (sk - sp) + shift;
              let g = sk * ek;

              for (let j = k; j < p - 1; j++) {
                let t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                let cs = f / t;
                let sn = g / t;

                if (j !== k) {
                  e[j - 1] = t;
                }

                f = cs * s[j] + sn * e[j];
                e[j] = cs * e[j] - sn * s[j];
                g = sn * s[j + 1];
                s[j + 1] = cs * s[j + 1];

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                    V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                    V.set(i, j, t);
                  }
                }

                t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                cs = f / t;
                sn = g / t;
                s[j] = t;
                f = cs * e[j] + sn * s[j + 1];
                s[j + 1] = -sn * e[j] + cs * s[j + 1];
                g = sn * e[j + 1];
                e[j + 1] = cs * e[j + 1];

                if (wantu && j < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                    U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                    U.set(i, j, t);
                  }
                }
              }

              e[p - 2] = f;
              break;
            }

          case 4:
            {
              if (s[k] <= 0) {
                s[k] = s[k] < 0 ? -s[k] : 0;

                if (wantv) {
                  for (let i = 0; i <= pp; i++) {
                    V.set(i, k, -V.get(i, k));
                  }
                }
              }

              while (k < pp) {
                if (s[k] >= s[k + 1]) {
                  break;
                }

                let t = s[k];
                s[k] = s[k + 1];
                s[k + 1] = t;

                if (wantv && k < n - 1) {
                  for (let i = 0; i < n; i++) {
                    t = V.get(i, k + 1);
                    V.set(i, k + 1, V.get(i, k));
                    V.set(i, k, t);
                  }
                }

                if (wantu && k < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = U.get(i, k + 1);
                    U.set(i, k + 1, U.get(i, k));
                    U.set(i, k, t);
                  }
                }

                k++;
              }
              p--;
              break;
            }
          // no default
        }
      }

      if (swapped) {
        let tmp = V;
        V = U;
        U = tmp;
      }

      this.m = m;
      this.n = n;
      this.s = s;
      this.U = U;
      this.V = V;
    }

    solve(value) {
      let Y = value;
      let e = this.threshold;
      let scols = this.s.length;
      let Ls = Matrix.zeros(scols, scols);

      for (let i = 0; i < scols; i++) {
        if (Math.abs(this.s[i]) <= e) {
          Ls.set(i, i, 0);
        } else {
          Ls.set(i, i, 1 / this.s[i]);
        }
      }

      let U = this.U;
      let V = this.rightSingularVectors;
      let VL = V.mmul(Ls);
      let vrows = V.rows;
      let urows = U.rows;
      let VLU = Matrix.zeros(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < scols; k++) {
            sum += VL.get(i, k) * U.get(j, k);
          }

          VLU.set(i, j, sum);
        }
      }

      return VLU.mmul(Y);
    }

    solveForDiagonal(value) {
      return this.solve(Matrix.diag(value));
    }

    inverse() {
      let V = this.V;
      let e = this.threshold;
      let vrows = V.rows;
      let vcols = V.columns;
      let X = new Matrix(vrows, this.s.length);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < vcols; j++) {
          if (Math.abs(this.s[j]) > e) {
            X.set(i, j, V.get(i, j) / this.s[j]);
          }
        }
      }

      let U = this.U;
      let urows = U.rows;
      let ucols = U.columns;
      let Y = new Matrix(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < ucols; k++) {
            sum += X.get(i, k) * U.get(j, k);
          }

          Y.set(i, j, sum);
        }
      }

      return Y;
    }

    get condition() {
      return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }

    get norm2() {
      return this.s[0];
    }

    get rank() {
      let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
      let r = 0;
      let s = this.s;

      for (let i = 0, ii = s.length; i < ii; i++) {
        if (s[i] > tol) {
          r++;
        }
      }

      return r;
    }

    get diagonal() {
      return Array.from(this.s);
    }

    get threshold() {
      return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
    }

    get leftSingularVectors() {
      return this.U;
    }

    get rightSingularVectors() {
      return this.V;
    }

    get diagonalMatrix() {
      return Matrix.diag(this.s);
    }

  }

  function inverse(matrix, useSVD = false) {
    matrix = WrapperMatrix2D.checkMatrix(matrix);

    if (useSVD) {
      return new SingularValueDecomposition(matrix).inverse();
    } else {
      return solve(matrix, Matrix.eye(matrix.rows));
    }
  }
  function solve(leftHandSide, rightHandSide, useSVD = false) {
    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);

    if (useSVD) {
      return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
      return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
  }

  class PolynomialRegression extends BaseRegression {
    constructor(x, y, degree) {
      super();

      if (x === true) {
        this.degree = y.degree;
        this.powers = y.powers;
        this.coefficients = y.coefficients;
      } else {
        checkArraySize(x, y);
        regress(this, x, y, degree);
      }
    }

    _predict(x) {
      let y = 0;

      for (let k = 0; k < this.powers.length; k++) {
        y += this.coefficients[k] * Math.pow(x, this.powers[k]);
      }

      return y;
    }

    toJSON() {
      return {
        name: 'polynomialRegression',
        degree: this.degree,
        powers: this.powers,
        coefficients: this.coefficients
      };
    }

    toString(precision) {
      return this._toFormula(precision, false);
    }

    toLaTeX(precision) {
      return this._toFormula(precision, true);
    }

    _toFormula(precision, isLaTeX) {
      let sup = '^';
      let closeSup = '';
      let times = ' * ';

      if (isLaTeX) {
        sup = '^{';
        closeSup = '}';
        times = '';
      }

      let fn = '';
      let str = '';

      for (let k = 0; k < this.coefficients.length; k++) {
        str = '';

        if (this.coefficients[k] !== 0) {
          if (this.powers[k] === 0) {
            str = maybeToPrecision(this.coefficients[k], precision);
          } else {
            if (this.powers[k] === 1) {
              str = `${maybeToPrecision(this.coefficients[k], precision) + times}x`;
            } else {
              str = `${maybeToPrecision(this.coefficients[k], precision) + times}x${sup}${this.powers[k]}${closeSup}`;
            }
          }

          if (this.coefficients[k] > 0 && k !== this.coefficients.length - 1) {
            str = ` + ${str}`;
          } else if (k !== this.coefficients.length - 1) {
            str = ` ${str}`;
          }
        }

        fn = str + fn;
      }

      if (fn.charAt(0) === '+') {
        fn = fn.slice(1);
      }

      return `f(x) = ${fn}`;
    }

    static load(json) {
      if (json.name !== 'polynomialRegression') {
        throw new TypeError('not a polynomial regression model');
      }

      return new PolynomialRegression(true, json);
    }

  }

  function regress(pr, x, y, degree) {
    const n = x.length;
    let powers;

    if (Array.isArray(degree)) {
      powers = degree;
      degree = powers.length;
    } else {
      degree++;
      powers = new Array(degree);

      for (let k = 0; k < degree; k++) {
        powers[k] = k;
      }
    }

    const F = new Matrix(n, degree);
    const Y = new Matrix([y]);

    for (let k = 0; k < degree; k++) {
      for (let i = 0; i < n; i++) {
        if (powers[k] === 0) {
          F.set(i, k, 1);
        } else {
          F.set(i, k, Math.pow(x[i], powers[k]));
        }
      }
    }

    const FT = new MatrixTransposeView(F);
    const A = FT.mmul(F);
    const B = FT.mmul(new MatrixTransposeView(Y));
    pr.degree = degree - 1;
    pr.powers = powers;
    pr.coefficients = solve(A, B).to1DArray();
  }

  /**
   * Iterative regression-based baseline correction
   * @param {Array<number>} x - Independent axis variable
   * @param {Array<number>} y - Dependent axis variable
   * @param {object} [options] - Options object
   * @param {number} [options.maxIterations = 100] - Maximum number of allowed iterations
   * @param {function} [options.Regression = PolynomialRegression] - Regression class with a predict method
   * @param {*} [options.regressionOptions] - Options for regressionFunction
   * @param {number} [options.tolerance = 0.001] - Convergence error tolerance
   * @return {{corrected: Array<number>, delta: number, iteration: number, baseline: Array<number>}}
   */

  function baselineCorrectionRegression(x, y, options = {}) {
    let {
      maxIterations = 100,
      Regression = PolynomialRegression,
      regressionOptions,
      tolerance = 0.001
    } = options;

    if (!regressionOptions && Regression === PolynomialRegression) {
      regressionOptions = 3;
    }

    let baseline = y.slice();
    let fitting = y.slice();
    let oldFitting = y;
    let iteration = 0;
    let delta;
    let regression;

    while (iteration < maxIterations) {
      // Calculate the fitting result
      regression = new Regression(x, baseline, regressionOptions);
      delta = 0;

      for (let i = 0; i < baseline.length; i++) {
        fitting[i] = regression.predict(x[i]);

        if (baseline[i] > fitting[i]) {
          baseline[i] = fitting[i];
        }

        delta += Math.abs((fitting[i] - oldFitting[i]) / oldFitting[i]);
      } // Stop criterion


      if (delta < tolerance) {
        break;
      } else {
        oldFitting = fitting.slice();
        iteration++;
      }
    } // removes baseline


    let corrected = new Array(baseline.length);

    for (let j = 0; j < baseline.length; j++) {
      corrected[j] = y[j] - baseline[j];
    }

    return {
      corrected,
      delta,
      iteration,
      baseline,
      regression: regression
    };
  }

  /**
   * Iterative polynomial fitting [1]
   *
   * Implementation based on ml-baseline-correction-regression
   *
   * References:
   * [1] Gan, F.; Ruan, G.; Mo, J.
   * Baseline Correction by Improved Iterative Polynomial Fitting with Automatic Threshold.
   *  Chemometrics and Intelligent Laboratory Systems 2006, 82 (1), 59–65.
   * https://doi.org/10.1016/j.chemolab.2005.08.009.
   * @export
   * @param {Array<number>} ys
   * @param {object} [options] - Options object
   * @param {Array<number>} [options.x] Optional, Independent axis variable. If not specified, we use a linear grid
   * @param {Object} [options.regression]
   * @param {number} [options.regression.maxIterations = 100] - Maximum number of allowed iterations
   * @param {Object} [options.regression]
   * @param {function} [options.regression.Regression = PolynomialRegression] - Regression class with a predict method
   * @param {Object} [options.regression.regressionOptions] - Options for regressionFunction
   * @param {number} [options.regression.tolerance = 0.001] - Convergence error tolerance
   * @returns {BaselineOutput}
   */

  function iterativePolynomialBaseline(ys, options = {}) {
    const numberPoints = ys.length;
    let {
      x,
      regressionOptions
    } = options;

    if (!x) {
      x = sequentialFill$1({
        from: 0,
        to: numberPoints - 1,
        size: numberPoints
      });
    }

    let output = baselineCorrectionRegression(x, ys, regressionOptions);
    return {
      baseline: output.baseline,
      correctedSpectrum: output.corrected
    };
  }

  /**

   *
   * @export
   * @param {Array<number>} ys
   * @param {Object} [options={}]
   * @param {number} [options.window] rolling window size, defaults to 10% of the length of the spectrum
   * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
   * @param {string} [options.padding.algorithm='duplicate'] none, value, circular, duplicate
   * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
   * @returns {BaselineOutput}
   */

  function rollingAverageBaseline(ys, options = {}) {
    let window = Math.max(Math.round(ys.length * 0.1), 2);
    let defaults = {
      window: window,
      padding: {
        size: window - 1,
        algorithm: 'duplicate',
        value: 0
      }
    };
    let actualOptions = Object.assign({}, defaults, options);
    let baseline = xRollingAverage(ys, actualOptions);
    let corrected = new Float64Array(ys.length);

    for (let i = 0; i < corrected.length; i++) {
      corrected[i] = ys[i] - baseline[i];
    }

    return {
      baseline: baseline,
      correctedSpectrum: corrected
    };
  }

  /**
   * Rolling ball baseline correction algorithm.
   * From the abstract of (1):
   * "This algorithm behaves equivalently to traditional polynomial backgrounds in simple spectra,
   * [...] and is considerably more robust for multiple overlapping peaks, rapidly varying background [...]
   *
   * The baseline is the trace one gets by rolling a ball below a spectrum. Algorithm has three steps:
   * Finding the minima in each window, find maxima among minima and then smooth over them by averaging.
   *
   * Reference:
   * (1) Kneen, M. A.; Annegarn, H. J.
   *     Algorithm for Fitting XRF, SEM and PIXE X-Ray Spectra Backgrounds.
   *     Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms 1996, 109–110, 209–213.
   *     https://doi.org/10.1016/0168-583X(95)00908-6.
   * (2) Kristian Hovde Liland, Bjørn-Helge Mevik, Roberto Canteri: baseline.
   *     https://cran.r-project.org/web/packages/baseline/index.html
   * @export
   * @param {Array} spectrum
   * @param {Object} [options={}]
   * @param {Number} [options.windowM] - width of local window for minimization/maximization, defaults to 4% of the spectrum length
   * @param {Number} [options.windowS] - width of local window for smoothing, defaults to 8% of the specturm length
   */

  function rollingBall(spectrum, options = {}) {
    if (!isAnyArray$1(spectrum)) {
      throw new Error('Spectrum must be an array');
    }

    if (spectrum.length === 0) {
      throw new TypeError('Spectrum must not be empty');
    }

    const numberPoints = spectrum.length;
    const maxima = new Float64Array(numberPoints);
    const minima = new Float64Array(numberPoints);
    const baseline = new Float64Array(numberPoints); // windowM 4 percent of spectrum length
    // windowS 8 percent of spectrum length

    const {
      windowM = Math.round(numberPoints * 0.04),
      windowS = Math.round(numberPoints * 0.08)
    } = options; // fi(1) in original paper

    for (let i = 0; i < spectrum.length; i++) {
      let windowLeft = max([0, i - windowM]);
      let windowRight = min([i + windowM + 1, spectrum.length]);
      minima[i] = min(spectrum.slice(windowLeft, windowRight));
    } // fi in original paper


    for (let i = 0; i < minima.length; i++) {
      let windowLeft = max([0, i - windowM]);
      let windowRight = min([i + windowM + 1, minima.length]);
      maxima[i] = max(minima.slice(windowLeft, windowRight));
    }

    for (let i = 0; i < minima.length; i++) {
      let windowLeft = max([0, i - windowS]);
      let windowRight = min([i + windowS + 1, maxima.length]);
      baseline[i] = mean(maxima.slice(windowLeft, windowRight));
    }

    return baseline;
  }

  /**
   * Rolling ball baseline correction algorithm.
   * From the abstract of (1):
   * "This algorithm behaves equivalently to traditional polynomial backgrounds in simple spectra,
   * [...] and is considerably more robust for multiple overlapping peaks, rapidly varying background [...]
   *
   * The baseline is the trace one gets by rolling a ball below a spectrum. Algorithm has three steps:
   * Finding the minima in each window, find maxima among minima and then smooth over them by averaging.
   *
   * Algorithm described in (1), but in the implementation here the window width does not change.
   *
   * Reference:
   * (1) Kneen, M. A.; Annegarn, H. J.
   *     Algorithm for Fitting XRF, SEM and PIXE X-Ray Spectra Backgrounds.
   *     Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms 1996, 109–110, 209–213.
   *     https://doi.org/10.1016/0168-583X(95)00908-6.
   * (2) Kristian Hovde Liland, Bjørn-Helge Mevik, Roberto Canteri: baseline.
   *     https://cran.r-project.org/web/packages/baseline/index.html
   *
   * @export
   * @param {Array<number>} ys
   * @param {Object} [options={}]
   * @param {Number} [options.windowM] - width of local window for minimization/maximization, defaults to 4% of the spectrum length
   * @param {Number} [options.windowS] - width of local window for smoothing, defaults to 8% of the specturm length
   * @returns {BaselineOutput}
   */

  function rollingBallBaseline(ys, options = {}) {
    const baseline = rollingBall(ys, options);
    let corrected = new Float64Array(ys.length);

    for (let i = 0; i < corrected.length; i++) {
      corrected[i] = ys[i] - baseline[i];
    }

    return {
      baseline: baseline,
      correctedSpectrum: corrected
    };
  }

  /**

   *
   * @export
   * @param {Array<number>} ys
   * @param {Object} [options={}]
   * @param {number} [options.window] rolling window size, defaults to 10% of the length of the spectrum
   * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
   * @param {string} [options.padding.algorithm='duplicate'] none, value, circular, duplicate
   * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
   * @returns {BaselineOutput}
   */

  function rollingMedianBaseline(ys, options = {}) {
    let window = Math.max(Math.round(ys.length * 0.1), 2);
    let defaults = {
      window: window,
      padding: {
        size: window - 1,
        algorithm: 'duplicate',
        value: 0
      }
    };
    let actualOptions = Object.assign({}, defaults, options);
    let baseline = xRollingMedian(ys, actualOptions);
    let corrected = new Float64Array(ys.length);

    for (let i = 0; i < corrected.length; i++) {
      corrected[i] = ys[i] - baseline[i];
    }

    return {
      baseline: baseline,
      correctedSpectrum: corrected
    };
  }

  function norm(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$algorithm = options.algorithm,
        algorithm = _options$algorithm === void 0 ? 'absolute' : _options$algorithm,
        _options$sumValue = options.sumValue,
        sumValue = _options$sumValue === void 0 ? 1 : _options$sumValue,
        _options$maxValue = options.maxValue,
        maxValue = _options$maxValue === void 0 ? 1 : _options$maxValue;

    if (!isAnyArray$1(input)) {
      throw new Error('input must be an array');
    }

    var output;

    if (options.output !== undefined) {
      if (!isAnyArray$1(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    if (input.length === 0) {
      throw new Error('input must not be empty');
    }

    switch (algorithm.toLowerCase()) {
      case 'absolute':
        {
          var absoluteSumValue = absoluteSum(input) / sumValue;
          if (absoluteSumValue === 0) return input.slice(0);

          for (var i = 0; i < input.length; i++) {
            output[i] = input[i] / absoluteSumValue;
          }

          return output;
        }

      case 'max':
        {
          var currentMaxValue = max(input);
          if (currentMaxValue === 0) return input.slice(0);
          var factor = maxValue / currentMaxValue;

          for (var _i = 0; _i < input.length; _i++) {
            output[_i] = input[_i] * factor;
          }

          return output;
        }

      case 'sum':
        {
          var sumFactor = sum(input) / sumValue;
          if (sumFactor === 0) return input.slice(0);

          for (var _i2 = 0; _i2 < input.length; _i2++) {
            output[_i2] = input[_i2] / sumFactor;
          }

          return output;
        }

      default:
        throw new Error("norm: unknown algorithm: ".concat(algorithm));
    }
  }

  function absoluteSum(input) {
    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += Math.abs(input[i]);
    }

    return sumValue;
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }
  /**
   * Fill an array with sequential numbers
   * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
   * @param {object} [options={}]
   * @param {number} [options.from=0] - first value in the array
   * @param {number} [options.to=10] - last value in the array
   * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
   * @param {number} [options.step] - if not provided calculated from size
   * @return {Array<number>}
   */


  function sequentialFill() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (_typeof(input) === 'object' && !src$1(input)) {
      options = input;
      input = [];
    }

    if (!src$1(input)) {
      throw new TypeError('input must be an array');
    }

    var _options = options,
        _options$from = _options.from,
        from = _options$from === void 0 ? 0 : _options$from,
        _options$to = _options.to,
        to = _options$to === void 0 ? 10 : _options$to,
        _options$size = _options.size,
        size = _options$size === void 0 ? input.length : _options$size,
        step = _options.step;

    if (size && step) {
      throw new Error('step is defined by the array size');
    }

    if (!size) {
      if (step) {
        size = Math.floor((to - from) / step) + 1;
      } else {
        size = to - from + 1;
      }
    }

    if (!step && size) {
      step = (to - from) / (size - 1);
    }

    if (Array.isArray(input)) {
      input.length = 0; // only works with normal array

      for (var i = 0; i < size; i++) {
        input.push(from);
        from += step;
      }
    } else {
      if (input.length !== size) {
        throw new Error('sequentialFill typed array must have the correct length');
      }

      for (var _i = 0; _i < size; _i++) {
        input[_i] = from;
        from += step;
      }
    }

    return input;
  }

  /**
   * Normalize an array of zones:
   * - ensure than from < to
   * - merge overlapping zones
   *
   * The method will always check if from if lower than to and will swap if required.
   * @param {Array} [zones=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
   */
  function normalize$1(zones = [], options = {}) {
    if (zones.length === 0) return [];
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;
    if (from > to) [from, to] = [to, from];
    zones = JSON.parse(JSON.stringify(zones)).map(zone => zone.from > zone.to ? {
      from: zone.to,
      to: zone.from
    } : zone);
    zones = zones.sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      return a.to - b.to;
    });
    zones.forEach(zone => {
      if (from > zone.from) zone.from = from;
      if (to < zone.to) zone.to = to;
    });
    zones = zones.filter(zone => zone.from <= zone.to);
    if (zones.length === 0) return [];
    let currentZone = zones[0];
    let result = [currentZone];

    for (let i = 1; i < zones.length; i++) {
      let zone = zones[i];

      if (zone.from <= currentZone.to) {
        currentZone.to = zone.to;
      } else {
        currentZone = zone;
        result.push(currentZone);
      }
    }

    return result;
  }

  /**
   * Convert an array of exclusions and keep only from / to
   *
   * The method will always check if from if lower than to and will swap if required.
   * @param {Array} [exclusions=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of zones (after inversion)
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of zones (after inversion)
   */

  function invert(exclusions = [], options = {}) {
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;
    if (from > to) [from, to] = [to, from];
    exclusions = normalize$1(exclusions, {
      from,
      to
    });
    if (exclusions.length === 0) return [{
      from,
      to
    }];
    let zones = [];

    for (let i = 0; i < exclusions.length; i++) {
      let exclusion = exclusions[i];
      let nextExclusion = exclusions[i + 1];

      if (i === 0) {
        if (exclusion.from > from) {
          zones.push({
            from,
            to: exclusion.from
          });
        }
      }

      if (i === exclusions.length - 1) {
        if (exclusion.to < to) {
          zones.push({
            from: exclusion.to,
            to
          });
        }
      } else {
        zones.push({
          from: exclusion.to,
          to: nextExclusion.from
        });
      }
    }

    return zones;
  }

  /**
   * Add the number of points per zone to reach a specified total
   * @param {Array} [zones=[]]
   * @param {number} [numberOfPoints] Total number of points to distribute between zones
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
   */

  function zonesWithPoints(zones, numberOfPoints, options = {}) {
    if (zones.length === 0) return zones;
    zones = normalize$1(zones, options);
    const totalSize = zones.reduce((previous, current) => {
      return previous + (current.to - current.from);
    }, 0);
    let unitsPerPoint = totalSize / numberOfPoints;
    let currentTotal = 0;

    for (let i = 0; i < zones.length - 1; i++) {
      let zone = zones[i];
      zone.numberOfPoints = Math.min(Math.round((zone.to - zone.from) / unitsPerPoint), numberOfPoints - currentTotal);
      currentTotal += zone.numberOfPoints;
    }

    zones[zones.length - 1].numberOfPoints = numberOfPoints - currentTotal;
    return zones;
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "slot"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "slot"
   */
  function equallySpacedSlot(x, y, from, to, numberOfPoints) {
    let xLength = x.length;
    let step = (to - from) / (numberOfPoints > 1 ? numberOfPoints - 1 : 1);
    let halfStep = step / 2;
    let lastStep = x[x.length - 1] - x[x.length - 2];
    let start = from - halfStep;
    let output = new Array(numberOfPoints); // Init main variables

    let min = start;
    let max = start + step;
    let previousX = -Number.MAX_VALUE;
    let previousY = 0;
    let nextX = x[0];
    let nextY = y[0];
    let frontOutsideSpectra = 0;
    let backOutsideSpectra = true;
    let currentValue = 0; // for slot algorithm

    let currentPoints = 0;
    let i = 1; // index of input

    let j = 0; // index of output

    main: while (true) {
      if (previousX >= nextX) throw new Error('x must be an increasing serie');

      while (previousX - max > 0) {
        // no overlap with original point, just consume current value
        if (backOutsideSpectra) {
          currentPoints++;
          backOutsideSpectra = false;
        }

        output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
        j++;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        currentValue = 0;
        currentPoints = 0;
      }

      if (previousX > min) {
        currentValue += previousY;
        currentPoints++;
      }

      if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
        currentPoints--;
      }

      previousX = nextX;
      previousY = nextY;

      if (i < xLength) {
        nextX = x[i];
        nextY = y[i];
        i++;
      } else {
        nextX += lastStep;
        nextY = 0;
        frontOutsideSpectra++;
      }
    }

    return output;
  }

  /**
   * Function that calculates the integral of the line between two
   * x-coordinates, given the slope and intercept of the line.
   * @param {number} x0
   * @param {number} x1
   * @param {number} slope
   * @param {number} intercept
   * @return {number} integral value.
   */
  function integral(x0, x1, slope, intercept) {
    return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "smooth"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "smooth"
   */

  function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
    let xLength = x.length;
    let step = (to - from) / (numberOfPoints > 1 ? numberOfPoints - 1 : 1);
    let halfStep = step / 2;
    let output = new Array(numberOfPoints);
    let initialOriginalStep = x[1] - x[0];
    let lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

    let min = from - halfStep;
    let max = from + halfStep;
    let previousX = Number.MIN_VALUE;
    let previousY = 0;
    let nextX = x[0] - initialOriginalStep;
    let nextY = 0;
    let currentValue = 0;
    let slope = 0;
    let intercept = 0;
    let sumAtMin = 0;
    let sumAtMax = 0;
    let i = 0; // index of input

    let j = 0; // index of output

    function getSlope(x0, y0, x1, y1) {
      return (y1 - y0) / (x1 - x0);
    }

    let add = 0;

    main: while (true) {
      if (previousX <= min && min <= nextX) {
        add = integral(0, min - previousX, slope, previousY);
        sumAtMin = currentValue + add;
      }

      while (nextX - max >= 0) {
        // no overlap with original point, just consume current value
        add = integral(0, max - previousX, slope, previousY);
        sumAtMax = currentValue + add;
        output[j++] = (sumAtMax - sumAtMin) / step;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        sumAtMin = sumAtMax;
      }

      currentValue += integral(previousX, nextX, slope, intercept);
      previousX = nextX;
      previousY = nextY;

      if (i < xLength) {
        nextX = x[i];
        nextY = y[i];
        i++;
      } else if (i === xLength) {
        nextX += lastOriginalStep;
        nextY = 0;
      }

      slope = getSlope(previousX, previousY, nextX, nextY);
      intercept = -slope * previousX + previousY;
    }

    return output;
  }

  /**
   * Function that returns a Number array of equally spaced numberOfPoints
   * containing a representation of intensities of the spectra arguments x
   * and y.
   *
   * The options parameter contains an object in the following form:
   * from: starting point
   * to: last point
   * numberOfPoints: number of points between from and to
   * variant: "slot" or "smooth" - smooth is the default option
   *
   * The slot variant consist that each point in the new array is calculated
   * averaging the existing points between the slot that belongs to the current
   * value. The smooth variant is the same but takes the integral of the range
   * of the slot and divide by the step size between two points in the new array.
   *
   * If exclusions zone are present, zones are ignored !
   * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
   * @param {object} [options={}]
   * @param {number} [options.from=x[0]]
   * @param {number} [options.to=x[x.length-1]]
   * @param {string} [options.variant='smooth']
   * @param {number} [options.numberOfPoints=100]
   * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
   * @param {Array} [options.zones=[]] array of from / to that should be kept
   * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
   */

  function equallySpaced(arrayXY = {}, options = {}) {
    let {
      x,
      y
    } = arrayXY;
    let xLength = x.length;
    let reverse = false;

    if (x.length > 1 && x[0] > x[1]) {
      x = x.slice().reverse();
      y = y.slice().reverse();
      reverse = true;
    }

    let {
      from = x[0],
      to = x[xLength - 1],
      variant = 'smooth',
      numberOfPoints = 100,
      exclusions = [],
      zones = []
    } = options;

    if (xLength !== y.length) {
      throw new RangeError("the x and y vector doesn't have the same size.");
    }

    if (typeof from !== 'number' || isNaN(from)) {
      throw new RangeError("'from' option must be a number");
    }

    if (typeof to !== 'number' || isNaN(to)) {
      throw new RangeError("'to' option must be a number");
    }

    if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
      throw new RangeError("'numberOfPoints' option must be a number");
    }

    if (numberOfPoints < 2) {
      throw new RangeError("'numberOfPoints' option must be greater than 1");
    }

    if (zones.length === 0) {
      zones = invert(exclusions, {
        from,
        to
      });
    }

    zones = zonesWithPoints(zones, numberOfPoints, {
      from,
      to
    });
    let xResult = [];
    let yResult = [];

    for (let zone of zones) {
      let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant);
      xResult = xResult.concat(zoneResult.x);
      yResult = yResult.concat(zoneResult.y);
    }

    if (reverse) {
      if (from < to) {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      } else {
        return {
          x: xResult,
          y: yResult
        };
      }
    } else {
      if (from < to) {
        return {
          x: xResult,
          y: yResult
        };
      } else {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      }
    }
  }

  function processZone(x, y, from, to, numberOfPoints, variant) {
    if (numberOfPoints < 1) {
      throw new RangeError('the number of points must be at least 1');
    }

    let output = variant === 'slot' ? equallySpacedSlot(x, y, from, to, numberOfPoints) : equallySpacedSmooth(x, y, from, to, numberOfPoints);
    return {
      x: sequentialFill({
        from,
        to,
        size: numberOfPoints
      }),
      y: output
    };
  }

  function getZones(from, to, exclusions = []) {
    if (from > to) {
      [from, to] = [to, from];
    } // in exclusions from and to have to be defined


    exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
    exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

    exclusions.forEach(exclusion => {
      if (exclusion.from > exclusion.to) {
        [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
      }
    });
    exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

    exclusions.forEach(exclusion => {
      if (exclusion.from < from) exclusion.from = from;
      if (exclusion.to > to) exclusion.to = to;
    });

    for (let i = 0; i < exclusions.length - 1; i++) {
      if (exclusions[i].to > exclusions[i + 1].from) {
        exclusions[i].to = exclusions[i + 1].from;
      }
    }

    exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

    if (!exclusions || exclusions.length === 0) {
      return [{
        from,
        to
      }];
    }

    let zones = [];
    let currentFrom = from;

    for (let exclusion of exclusions) {
      if (currentFrom < exclusion.from) {
        zones.push({
          from: currentFrom,
          to: exclusion.from
        });
      }

      currentFrom = exclusion.to;
    }

    if (currentFrom < to) {
      zones.push({
        from: currentFrom,
        to: to
      });
    }

    return zones;
  }

  /**
   * Filter an array x/y based on various criteria
   * x points are expected to be sorted
   *
   * @param {object} points
   * @param {object} [options={}]
   * @param {array} [options.from]
   * @param {array} [options.to]
   * @param {array} [options.exclusions=[]]
   * @return {{x: Array<number>, y: Array<number>}}
   */

  function filterX(points, options = {}) {
    const {
      x,
      y
    } = points;
    const {
      from = x[0],
      to = x[x.length - 1],
      exclusions = []
    } = options;
    let zones = getZones(from, to, exclusions);
    let currentZoneIndex = 0;
    let newX = [];
    let newY = [];
    let position = 0;

    while (position < x.length) {
      if (x[position] <= zones[currentZoneIndex].to && x[position] >= zones[currentZoneIndex].from) {
        newX.push(x[position]);
        newY.push(y[position]);
      } else {
        if (x[position] > zones[currentZoneIndex].to) {
          currentZoneIndex++;
          if (!zones[currentZoneIndex]) break;
        }
      }

      position++;
    }

    return {
      x: newX,
      y: newY
    };
  }

  var defaultOptions$5 = {
    size: 1,
    value: 0
  };
  /**
   * Case when the entry is an array
   * @param data
   * @param options
   * @returns {Array}
   */

  function arrayCase(data, options) {
    var len = data.length;

    if (typeof options.size === 'number') {
      options.size = [options.size, options.size];
    }

    var cond = len + options.size[0] + options.size[1];
    var output;

    if (options.output) {
      if (options.output.length !== cond) {
        throw new RangeError('Wrong output size');
      }

      output = options.output;
    } else {
      output = new Array(cond);
    }

    var i;

    if (options.value === 'circular') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) {
          output[i] = data[(len - options.size[0] % len + i) % len];
        } else if (i < options.size[0] + len) {
          output[i] = data[i - options.size[0]];
        } else {
          output[i] = data[(i - options.size[0]) % len];
        }
      }
    } else if (options.value === 'replicate') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[0];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[len - 1];
      }
    } else if (options.value === 'symmetric') {
      if (options.size[0] > len || options.size[1] > len) {
        throw new RangeError('expanded value should not be bigger than the data length');
      }

      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[options.size[0] - 1 - i];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[2 * len + options.size[0] - i - 1];
      }
    } else {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = options.value;else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = options.value;
      }
    }

    return output;
  }
  /**
   * Case when the entry is a matrix
   * @param data
   * @param options
   * @returns {Array}
   */


  function matrixCase(data, options) {
    // var row = data.length;
    // var col = data[0].length;
    if (options.size[0] === undefined) {
      options.size = [options.size, options.size, options.size, options.size];
    }

    throw new Error('matrix not supported yet, sorry');
  }
  /**
   * Pads and array
   * @param {Array <number>} data
   * @param {object} options
   */


  function padArray(data, options) {
    options = Object.assign({}, defaultOptions$5, options);

    if (Array.isArray(data)) {
      if (Array.isArray(data[0])) return matrixCase(data, options);else return arrayCase(data, options);
    } else {
      throw new TypeError('data should be an array');
    }
  }

  var src = padArray;

  /**
   * Factorial of a number
   * @ignore
   * @param n
   * @return {number}
   */

  function factorial(n) {
    let r = 1;

    while (n > 0) r *= n--;

    return r;
  }

  const defaultOptions$4 = {
    windowSize: 5,
    derivative: 1,
    polynomial: 2,
    pad: 'none',
    padValue: 'replicate'
  };
  /**
   * Savitzky-Golay filter
   * @param {Array <number>} data
   * @param {number} h
   * @param {Object} options
   * @returns {Array}
   */

  function savitzkyGolay(data, h, options) {
    options = Object.assign({}, defaultOptions$4, options);

    if (options.windowSize % 2 === 0 || options.windowSize < 5 || !Number.isInteger(options.windowSize)) {
      throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
    }

    if (options.derivative < 0 || !Number.isInteger(options.derivative)) {
      throw new RangeError('Derivative should be a positive integer');
    }

    if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) {
      throw new RangeError('Polynomial should be a positive integer');
    }

    let C, norm;
    let step = Math.floor(options.windowSize / 2);

    if (options.pad === 'pre') {
      data = src(data, {
        size: step,
        value: options.padValue
      });
    }

    let ans = new Array(data.length - 2 * step);

    if (options.windowSize === 5 && options.polynomial === 2 && (options.derivative === 1 || options.derivative === 2)) {
      if (options.derivative === 1) {
        C = [-2, -1, 0, 1, 2];
        norm = 10;
      } else {
        C = [2, -1, -2, -1, 2];
        norm = 7;
      }
    } else {
      let J = Matrix.ones(options.windowSize, options.polynomial + 1);
      let inic = -(options.windowSize - 1) / 2;

      for (let i = 0; i < J.rows; i++) {
        for (let j = 0; j < J.columns; j++) {
          if (inic + 1 !== 0 || j !== 0) J.set(i, j, Math.pow(inic + i, j));
        }
      }

      let Jtranspose = new MatrixTransposeView(J);
      let Jinv = inverse(Jtranspose.mmul(J));
      C = Jinv.mmul(Jtranspose);
      C = C.getRow(options.derivative);
      norm = 1 / factorial(options.derivative);
    }

    let det = norm * Math.pow(h, options.derivative);

    for (let k = step; k < data.length - step; k++) {
      let d = 0;

      for (let l = 0; l < C.length; l++) d += C[l] * data[l + k - step] / det;

      ans[k - step] = d;
    }

    if (options.pad === 'post') {
      ans = src(ans, {
        size: step,
        value: options.padValue
      });
    }

    return ans;
  }

  var array = createCommonjsModule(function (module, exports) {

    function compareNumbers(a, b) {
      return a - b;
    }
    /**
     * Computes the sum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.sum = function sum(values) {
      var sum = 0;

      for (var i = 0; i < values.length; i++) {
        sum += values[i];
      }

      return sum;
    };
    /**
     * Computes the maximum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.max = function max(values) {
      var max = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] > max) max = values[i];
      }

      return max;
    };
    /**
     * Computes the minimum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.min = function min(values) {
      var min = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] < min) min = values[i];
      }

      return min;
    };
    /**
     * Computes the min and max of the given values
     * @param {Array} values
     * @returns {{min: number, max: number}}
     */


    exports.minMax = function minMax(values) {
      var min = values[0];
      var max = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] < min) min = values[i];
        if (values[i] > max) max = values[i];
      }

      return {
        min: min,
        max: max
      };
    };
    /**
     * Computes the arithmetic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.arithmeticMean = function arithmeticMean(values) {
      var sum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        sum += values[i];
      }

      return sum / l;
    };
    /**
     * {@link arithmeticMean}
     */


    exports.mean = exports.arithmeticMean;
    /**
     * Computes the geometric mean of the given values
     * @param {Array} values
     * @returns {number}
     */

    exports.geometricMean = function geometricMean(values) {
      var mul = 1;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        mul *= values[i];
      }

      return Math.pow(mul, 1 / l);
    };
    /**
     * Computes the mean of the log of the given values
     * If the return value is exponentiated, it gives the same result as the
     * geometric mean.
     * @param {Array} values
     * @returns {number}
     */


    exports.logMean = function logMean(values) {
      var lnsum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        lnsum += Math.log(values[i]);
      }

      return lnsum / l;
    };
    /**
     * Computes the weighted grand mean for a list of means and sample sizes
     * @param {Array} means - Mean values for each set of samples
     * @param {Array} samples - Number of original values for each set of samples
     * @returns {number}
     */


    exports.grandMean = function grandMean(means, samples) {
      var sum = 0;
      var n = 0;
      var l = means.length;

      for (var i = 0; i < l; i++) {
        sum += samples[i] * means[i];
        n += samples[i];
      }

      return sum / n;
    };
    /**
     * Computes the truncated mean of the given values using a given percentage
     * @param {Array} values
     * @param {number} percent - The percentage of values to keep (range: [0,1])
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */


    exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
      if (alreadySorted === undefined) alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var l = values.length;
      var k = Math.floor(l * percent);
      var sum = 0;

      for (var i = k; i < l - k; i++) {
        sum += values[i];
      }

      return sum / (l - 2 * k);
    };
    /**
     * Computes the harmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.harmonicMean = function harmonicMean(values) {
      var sum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        if (values[i] === 0) {
          throw new RangeError('value at index ' + i + 'is zero');
        }

        sum += 1 / values[i];
      }

      return l / sum;
    };
    /**
     * Computes the contraharmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.contraHarmonicMean = function contraHarmonicMean(values) {
      var r1 = 0;
      var r2 = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        r1 += values[i] * values[i];
        r2 += values[i];
      }

      if (r2 < 0) {
        throw new RangeError('sum of values is negative');
      }

      return r1 / r2;
    };
    /**
     * Computes the median of the given values
     * @param {Array} values
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */


    exports.median = function median(values, alreadySorted) {
      if (alreadySorted === undefined) alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var l = values.length;
      var half = Math.floor(l / 2);

      if (l % 2 === 0) {
        return (values[half - 1] + values[half]) * 0.5;
      } else {
        return values[half];
      }
    };
    /**
     * Computes the variance of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */


    exports.variance = function variance(values, unbiased) {
      if (unbiased === undefined) unbiased = true;
      var theMean = exports.mean(values);
      var theVariance = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        var x = values[i] - theMean;
        theVariance += x * x;
      }

      if (unbiased) {
        return theVariance / (l - 1);
      } else {
        return theVariance / l;
      }
    };
    /**
     * Computes the standard deviation of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */


    exports.standardDeviation = function standardDeviation(values, unbiased) {
      return Math.sqrt(exports.variance(values, unbiased));
    };

    exports.standardError = function standardError(values) {
      return exports.standardDeviation(values) / Math.sqrt(values.length);
    };
    /**
     * IEEE Transactions on biomedical engineering, vol. 52, no. 1, january 2005, p. 76-
     * Calculate the standard deviation via the Median of the absolute deviation
     *  The formula for the standard deviation only holds for Gaussian random variables.
     * @returns {{mean: number, stdev: number}}
     */


    exports.robustMeanAndStdev = function robustMeanAndStdev(y) {
      var mean = 0,
          stdev = 0;
      var length = y.length,
          i = 0;

      for (i = 0; i < length; i++) {
        mean += y[i];
      }

      mean /= length;
      var averageDeviations = new Array(length);

      for (i = 0; i < length; i++) averageDeviations[i] = Math.abs(y[i] - mean);

      averageDeviations.sort(compareNumbers);

      if (length % 2 === 1) {
        stdev = averageDeviations[(length - 1) / 2] / 0.6745;
      } else {
        stdev = 0.5 * (averageDeviations[length / 2] + averageDeviations[length / 2 - 1]) / 0.6745;
      }

      return {
        mean: mean,
        stdev: stdev
      };
    };

    exports.quartiles = function quartiles(values, alreadySorted) {
      if (typeof alreadySorted === 'undefined') alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var quart = values.length / 4;
      var q1 = values[Math.ceil(quart) - 1];
      var q2 = exports.median(values, true);
      var q3 = values[Math.ceil(quart * 3) - 1];
      return {
        q1: q1,
        q2: q2,
        q3: q3
      };
    };

    exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
      return Math.sqrt(exports.pooledVariance(samples, unbiased));
    };

    exports.pooledVariance = function pooledVariance(samples, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var sum = 0;
      var length = 0,
          l = samples.length;

      for (var i = 0; i < l; i++) {
        var values = samples[i];
        var vari = exports.variance(values);
        sum += (values.length - 1) * vari;
        if (unbiased) length += values.length - 1;else length += values.length;
      }

      return sum / length;
    };

    exports.mode = function mode(values) {
      var l = values.length,
          itemCount = new Array(l),
          i;

      for (i = 0; i < l; i++) {
        itemCount[i] = 0;
      }

      var itemArray = new Array(l);
      var count = 0;

      for (i = 0; i < l; i++) {
        var index = itemArray.indexOf(values[i]);
        if (index >= 0) itemCount[index]++;else {
          itemArray[count] = values[i];
          itemCount[count] = 1;
          count++;
        }
      }

      var maxValue = 0,
          maxIndex = 0;

      for (i = 0; i < count; i++) {
        if (itemCount[i] > maxValue) {
          maxValue = itemCount[i];
          maxIndex = i;
        }
      }

      return itemArray[maxIndex];
    };

    exports.covariance = function covariance(vector1, vector2, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var mean1 = exports.mean(vector1);
      var mean2 = exports.mean(vector2);
      if (vector1.length !== vector2.length) throw 'Vectors do not have the same dimensions';
      var cov = 0,
          l = vector1.length;

      for (var i = 0; i < l; i++) {
        var x = vector1[i] - mean1;
        var y = vector2[i] - mean2;
        cov += x * y;
      }

      if (unbiased) return cov / (l - 1);else return cov / l;
    };

    exports.skewness = function skewness(values, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var theMean = exports.mean(values);
      var s2 = 0,
          s3 = 0,
          l = values.length;

      for (var i = 0; i < l; i++) {
        var dev = values[i] - theMean;
        s2 += dev * dev;
        s3 += dev * dev * dev;
      }

      var m2 = s2 / l;
      var m3 = s3 / l;
      var g = m3 / Math.pow(m2, 3 / 2.0);

      if (unbiased) {
        var a = Math.sqrt(l * (l - 1));
        var b = l - 2;
        return a / b * g;
      } else {
        return g;
      }
    };

    exports.kurtosis = function kurtosis(values, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var theMean = exports.mean(values);
      var n = values.length,
          s2 = 0,
          s4 = 0;

      for (var i = 0; i < n; i++) {
        var dev = values[i] - theMean;
        s2 += dev * dev;
        s4 += dev * dev * dev * dev;
      }

      var m2 = s2 / n;
      var m4 = s4 / n;

      if (unbiased) {
        var v = s2 / (n - 1);
        var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
        var b = s4 / (v * v);
        var c = (n - 1) * (n - 1) / ((n - 2) * (n - 3));
        return a * b - 3 * c;
      } else {
        return m4 / (m2 * m2) - 3;
      }
    };

    exports.entropy = function entropy(values, eps) {
      if (typeof eps === 'undefined') eps = 0;
      var sum = 0,
          l = values.length;

      for (var i = 0; i < l; i++) sum += values[i] * Math.log(values[i] + eps);

      return -sum;
    };

    exports.weightedMean = function weightedMean(values, weights) {
      var sum = 0,
          l = values.length;

      for (var i = 0; i < l; i++) sum += values[i] * weights[i];

      return sum;
    };

    exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
      return Math.sqrt(exports.weightedVariance(values, weights));
    };

    exports.weightedVariance = function weightedVariance(values, weights) {
      var theMean = exports.weightedMean(values, weights);
      var vari = 0,
          l = values.length;
      var a = 0,
          b = 0;

      for (var i = 0; i < l; i++) {
        var z = values[i] - theMean;
        var w = weights[i];
        vari += w * (z * z);
        b += w;
        a += w * w;
      }

      return vari * (b / (b * b - a));
    };

    exports.center = function center(values, inPlace) {
      if (typeof inPlace === 'undefined') inPlace = false;
      var result = values;
      if (!inPlace) result = [].concat(values);
      var theMean = exports.mean(result),
          l = result.length;

      for (var i = 0; i < l; i++) result[i] -= theMean;
    };

    exports.standardize = function standardize(values, standardDev, inPlace) {
      if (typeof standardDev === 'undefined') standardDev = exports.standardDeviation(values);
      if (typeof inPlace === 'undefined') inPlace = false;
      var l = values.length;
      var result = inPlace ? values : new Array(l);

      for (var i = 0; i < l; i++) result[i] = values[i] / standardDev;

      return result;
    };

    exports.cumulativeSum = function cumulativeSum(array) {
      var l = array.length;
      var result = new Array(l);
      result[0] = array[0];

      for (var i = 1; i < l; i++) result[i] = result[i - 1] + array[i];

      return result;
    };
  });

  function getNormalizedSpectrum(spectrum, options = {}) {
    var _a;

    let data = {
      x: spectrum.variables.x.data,
      y: spectrum.variables.y.data
    };
    let newSpectrum = {
      variables: {
        x: {
          data: spectrum.variables.x.data,
          units: spectrum.variables.x.units,
          label: spectrum.variables.x.label
        },
        y: {
          data: spectrum.variables.y.data,
          units: spectrum.variables.y.units,
          label: spectrum.variables.y.label
        }
      }
    };
    if (spectrum.title) newSpectrum.title = spectrum.title;
    if (spectrum.dataType) newSpectrum.dataType = spectrum.dataType;
    if (spectrum.meta) newSpectrum.meta = spectrum.meta;
    let {
      from = spectrum.variables.x.min,
      to = spectrum.variables.x.max,
      numberOfPoints,
      filters = [],
      exclusions = [],
      processing = '',
      keepYUnits = false
    } = options;
    let {
      x,
      y
    } = filterX(data, {
      from,
      to
    });

    switch (processing) {
      case 'firstDerivative':
        if (options.processing) {
          newSpectrum.variables.y.units = '';
          newSpectrum.variables.y.label = newSpectrum.variables.y.label && `1st derivative of ${newSpectrum.variables.y.label.replace(/\s*\[.*\]/, '')}`;
          y = savitzkyGolay(y, 1, {
            derivative: 1,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;

      case 'secondDerivative':
        if (options.processing) {
          newSpectrum.variables.y.units = '';
          newSpectrum.variables.y.label = newSpectrum.variables.y.label && `2nd derivative of ${newSpectrum.variables.y.label.replace(/\s*\[.*\]/, '')}`;
          y = savitzkyGolay(y, 1, {
            derivative: 2,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;

      case 'thirdDerivative':
        if (options.processing) {
          newSpectrum.variables.y.units = '';
          newSpectrum.variables.y.label = newSpectrum.variables.y.label && `3rd derivative of ${newSpectrum.variables.y.label.replace(/\s*\[.*\]/, '')}`;
          y = savitzkyGolay(y, 1, {
            derivative: 3,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;
    }

    if (!keepYUnits && filters.length) {
      // filters change the y axis, we get rid of the units
      newSpectrum.variables.y.units = '';
      newSpectrum.variables.y.label = (_a = newSpectrum.variables.y.label) === null || _a === void 0 ? void 0 : _a.replace(/\s*\[.*\]/, '');
    }

    for (let filter of filters) {
      let filterOptions = filter.options || {};

      switch (filter.name.toLowerCase()) {
        case 'centermean':
          {
            let mean = array.mean(y);
            y = xSubtract(y, mean);
            break;
          }

        case 'dividebysd':
          {
            let std = array.standardDeviation(y);
            y = xDivide(y, std);
            break;
          }

        case 'normalize':
          {
            y = norm(y, {
              sumValue: filterOptions.value ? Number(filterOptions.value) : 1,
              algorithm: 'absolute'
            });
            break;
          }

        case 'rescale':
          {
            y = rescale(y, {
              min: filterOptions.min ? Number(filterOptions.min) : 0,
              max: filterOptions.max ? Number(filterOptions.max) : 1
            });
            break;
          }

        case 'dividebymax':
          {
            let maxValue = max(y);
            y = xDivide(y, maxValue);
            break;
          }

        case 'multiply':
          {
            y = xMultiply(y, filterOptions.value ? Number(filterOptions.value) : 1);
            break;
          }

        case 'add':
          {
            y = xAdd(y, filterOptions.value ? Number(filterOptions.value) : 0);
            break;
          }

        case 'airplsbaseline':
          {
            y = airPLSBaseline(y, filterOptions).correctedSpectrum;
            break;
          }

        case 'rollingaveragebaseline':
          {
            y = rollingAverageBaseline(y, filterOptions).correctedSpectrum;
            break;
          }

        case 'iterativepolynomialbaseline':
          {
            y = iterativePolynomialBaseline(y, undefined).correctedSpectrum;
            break;
          }

        case 'rollingballbaseline':
          {
            y = rollingBallBaseline(y, filterOptions).correctedSpectrum;
            break;
          }

        case 'rollingmedianbaseline':
          {
            y = rollingMedianBaseline(y, filterOptions).correctedSpectrum;
            break;
          }

        case 'ensuregrowing':
          {
            const ans = xyEnsureGrowingX({
              x,
              y
            });
            x = ans.x;
            y = ans.y;
            break;
          }

        case '':
        case undefined:
          break;

        default:
          throw new Error(`Unknown process kind: ${filter.name}`);
      }
    }

    if (!numberOfPoints) {
      data = filterX({
        x,
        y
      }, {
        from,
        to,
        exclusions
      });
    } else {
      data = equallySpaced({
        x,
        y
      }, {
        from,
        to,
        numberOfPoints,
        exclusions
      });
    }

    newSpectrum.variables.x.data = x;
    newSpectrum.variables.x.min = min(x);
    newSpectrum.variables.x.max = max(x);
    newSpectrum.variables.x.isMonotone = xIsMonotone(x);
    newSpectrum.variables.y.data = y;
    newSpectrum.variables.y.min = min(y);
    newSpectrum.variables.y.max = max(y);
    newSpectrum.variables.y.isMonotone = xIsMonotone(y);
    return newSpectrum;
  }

  /*
  The MIT License (MIT)
  Copyright © 2006-2007 Kevin C. Olbrich
  Copyright © 2010-2016 LIM SAS (http://lim.eu) - Julien Sanchez

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  of the Software, and to permit persons to whom the Software is furnished to do
  so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  */
  var quantities = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      module.exports = factory() ;
    })(commonjsGlobal, function () {
      /**
       * Tests if a value is a string
       *
       * @param {*} value - Value to test
       *
       * @returns {boolean} true if value is a string, false otherwise
       */

      function isString(value) {
        return typeof value === "string" || value instanceof String;
      }
      /*
       * Prefer stricter Number.isFinite if currently supported.
       * To be dropped when ES6 is finalized. Obsolete browsers will
       * have to use ES6 polyfills.
       */


      var isFiniteImpl = Number.isFinite || window.isFinite;
      /**
       * Tests if a value is a number
       *
       * @param {*} value - Value to test
       *
       * @returns {boolean} true if value is a number, false otherwise
       */

      function isNumber(value) {
        // Number.isFinite allows not to consider NaN or '1' as numbers
        return isFiniteImpl(value);
      }
      /*
       * Identity function
       */


      function identity(value) {
        return value;
      }
      /**
       * Returns unique strings from list
       *
       * @param {string[]} strings - array of strings
       *
       *
       * @returns {string[]} a new array of strings without duplicates
       */


      function uniq(strings) {
        var seen = {};
        return strings.filter(function (item) {
          return seen.hasOwnProperty(item) ? false : seen[item] = true;
        });
      }

      function compareArray(array1, array2) {
        if (array2.length !== array1.length) {
          return false;
        }

        for (var i = 0; i < array1.length; i++) {
          if (array2[i].compareArray) {
            if (!array2[i].compareArray(array1[i])) {
              return false;
            }
          }

          if (array2[i] !== array1[i]) {
            return false;
          }
        }

        return true;
      }

      function assign(target, properties) {
        Object.keys(properties).forEach(function (key) {
          target[key] = properties[key];
        });
      }
      /**
       * Safely multiplies numbers while avoiding floating errors
       * like 0.1 * 0.1 => 0.010000000000000002
       *
       * @param {...number} numbers - numbers to multiply
       *
       * @returns {number} result
       */


      function mulSafe() {
        var result = 1,
            decimals = 0;

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          decimals = decimals + getFractional(arg);
          result *= arg;
        }

        return decimals !== 0 ? round(result, decimals) : result;
      }
      /**
       * Safely divides two numbers while avoiding floating errors
       * like 0.3 / 0.05 => 5.999999999999999
       *
       * @returns {number} result
       * @param {number} num Numerator
       * @param {number} den Denominator
       */


      function divSafe(num, den) {
        if (den === 0) {
          throw new Error("Divide by zero");
        }

        var factor = Math.pow(10, getFractional(den));
        var invDen = factor / (factor * den);
        return mulSafe(num, invDen);
      }
      /**
       * Rounds value at the specified number of decimals
       *
       * @param {number} val - value to round
       * @param {number} decimals - number of decimals
       *
       * @returns {number} rounded number
       */


      function round(val, decimals) {
        return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
      }

      function getFractional(num) {
        // Check for NaNs or Infinities
        if (!isFinite(num)) {
          return 0;
        } // Faster than parsing strings
        // http://jsperf.com/count-decimals/2


        var count = 0;

        while (num % 1 !== 0) {
          num *= 10;
          count++;
        }

        return count;
      }
      /**
       * Custom error type definition
       * @constructor
       */


      function QtyError() {
        var err;

        if (!this) {
          // Allows to instantiate QtyError without new()
          err = Object.create(QtyError.prototype);
          QtyError.apply(err, arguments);
          return err;
        }

        err = Error.apply(this, arguments);
        this.name = "QtyError";
        this.message = err.message;
        this.stack = err.stack;
      }

      QtyError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: QtyError
        }
      });
      /*
       * Throws incompatible units error
       * @param {string} left - units
       * @param {string} right - units incompatible with first argument
       * @throws "Incompatible units" error
       */

      function throwIncompatibleUnits(left, right) {
        throw new QtyError("Incompatible units: " + left + " and " + right);
      }

      var UNITS = {
        /* prefixes */
        "<googol>": [["googol"], 1e100, "prefix"],
        "<kibi>": [["Ki", "Kibi", "kibi"], Math.pow(2, 10), "prefix"],
        "<mebi>": [["Mi", "Mebi", "mebi"], Math.pow(2, 20), "prefix"],
        "<gibi>": [["Gi", "Gibi", "gibi"], Math.pow(2, 30), "prefix"],
        "<tebi>": [["Ti", "Tebi", "tebi"], Math.pow(2, 40), "prefix"],
        "<pebi>": [["Pi", "Pebi", "pebi"], Math.pow(2, 50), "prefix"],
        "<exi>": [["Ei", "Exi", "exi"], Math.pow(2, 60), "prefix"],
        "<zebi>": [["Zi", "Zebi", "zebi"], Math.pow(2, 70), "prefix"],
        "<yebi>": [["Yi", "Yebi", "yebi"], Math.pow(2, 80), "prefix"],
        "<yotta>": [["Y", "Yotta", "yotta"], 1e24, "prefix"],
        "<zetta>": [["Z", "Zetta", "zetta"], 1e21, "prefix"],
        "<exa>": [["E", "Exa", "exa"], 1e18, "prefix"],
        "<peta>": [["P", "Peta", "peta"], 1e15, "prefix"],
        "<tera>": [["T", "Tera", "tera"], 1e12, "prefix"],
        "<giga>": [["G", "Giga", "giga"], 1e9, "prefix"],
        "<mega>": [["M", "Mega", "mega"], 1e6, "prefix"],
        "<kilo>": [["k", "kilo"], 1e3, "prefix"],
        "<hecto>": [["h", "Hecto", "hecto"], 1e2, "prefix"],
        "<deca>": [["da", "Deca", "deca", "deka"], 1e1, "prefix"],
        "<deci>": [["d", "Deci", "deci"], 1e-1, "prefix"],
        "<centi>": [["c", "Centi", "centi"], 1e-2, "prefix"],
        "<milli>": [["m", "Milli", "milli"], 1e-3, "prefix"],
        "<micro>": [["u", "\u03BC"
        /*µ as greek letter*/
        , "\u00B5"
        /*µ as micro sign*/
        , "Micro", "mc", "micro"], 1e-6, "prefix"],
        "<nano>": [["n", "Nano", "nano"], 1e-9, "prefix"],
        "<pico>": [["p", "Pico", "pico"], 1e-12, "prefix"],
        "<femto>": [["f", "Femto", "femto"], 1e-15, "prefix"],
        "<atto>": [["a", "Atto", "atto"], 1e-18, "prefix"],
        "<zepto>": [["z", "Zepto", "zepto"], 1e-21, "prefix"],
        "<yocto>": [["y", "Yocto", "yocto"], 1e-24, "prefix"],
        "<1>": [["1", "<1>"], 1, ""],

        /* length units */
        "<meter>": [["m", "meter", "meters", "metre", "metres"], 1.0, "length", ["<meter>"]],
        "<inch>": [["in", "inch", "inches", "\""], 0.0254, "length", ["<meter>"]],
        "<foot>": [["ft", "foot", "feet", "'"], 0.3048, "length", ["<meter>"]],
        "<yard>": [["yd", "yard", "yards"], 0.9144, "length", ["<meter>"]],
        "<mile>": [["mi", "mile", "miles"], 1609.344, "length", ["<meter>"]],
        "<naut-mile>": [["nmi", "naut-mile"], 1852, "length", ["<meter>"]],
        "<league>": [["league", "leagues"], 4828, "length", ["<meter>"]],
        "<furlong>": [["furlong", "furlongs"], 201.2, "length", ["<meter>"]],
        "<rod>": [["rd", "rod", "rods"], 5.029, "length", ["<meter>"]],
        "<mil>": [["mil", "mils"], 0.0000254, "length", ["<meter>"]],
        "<angstrom>": [["ang", "angstrom", "angstroms"], 1e-10, "length", ["<meter>"]],
        "<fathom>": [["fathom", "fathoms"], 1.829, "length", ["<meter>"]],
        "<pica>": [["pica", "picas"], 0.00423333333, "length", ["<meter>"]],
        "<point>": [["pt", "point", "points"], 0.000352777778, "length", ["<meter>"]],
        "<redshift>": [["z", "red-shift", "redshift"], 1.302773e26, "length", ["<meter>"]],
        "<AU>": [["AU", "astronomical-unit"], 149597900000, "length", ["<meter>"]],
        "<light-second>": [["ls", "light-second"], 299792500, "length", ["<meter>"]],
        "<light-minute>": [["lmin", "light-minute"], 17987550000, "length", ["<meter>"]],
        "<light-year>": [["ly", "light-year"], 9460528000000000, "length", ["<meter>"]],
        "<parsec>": [["pc", "parsec", "parsecs"], 30856780000000000, "length", ["<meter>"]],
        "<datamile>": [["DM", "datamile"], 1828.8, "length", ["<meter>"]],

        /* mass */
        "<kilogram>": [["kg", "kilogram", "kilograms"], 1.0, "mass", ["<kilogram>"]],
        "<AMU>": [["u", "AMU", "amu"], 1.660538921e-27, "mass", ["<kilogram>"]],
        "<dalton>": [["Da", "Dalton", "Daltons", "dalton", "daltons"], 1.660538921e-27, "mass", ["<kilogram>"]],
        "<slug>": [["slug", "slugs"], 14.5939029, "mass", ["<kilogram>"]],
        "<short-ton>": [["tn", "ton", "short-ton"], 907.18474, "mass", ["<kilogram>"]],
        "<metric-ton>": [["tonne", "metric-ton"], 1000, "mass", ["<kilogram>"]],
        "<carat>": [["ct", "carat", "carats"], 0.0002, "mass", ["<kilogram>"]],
        "<pound>": [["lbs", "lb", "pound", "pounds", "#"], 0.45359237, "mass", ["<kilogram>"]],
        "<ounce>": [["oz", "ounce", "ounces"], 0.0283495231, "mass", ["<kilogram>"]],
        "<gram>": [["g", "gram", "grams", "gramme", "grammes"], 1e-3, "mass", ["<kilogram>"]],
        "<grain>": [["grain", "grains", "gr"], 6.479891e-5, "mass", ["<kilogram>"]],
        "<dram>": [["dram", "drams", "dr"], 0.0017718452, "mass", ["<kilogram>"]],
        "<stone>": [["stone", "stones", "st"], 6.35029318, "mass", ["<kilogram>"]],

        /* area */
        "<hectare>": [["hectare"], 10000, "area", ["<meter>", "<meter>"]],
        "<acre>": [["acre", "acres"], 4046.85642, "area", ["<meter>", "<meter>"]],
        "<sqft>": [["sqft"], 1, "area", ["<foot>", "<foot>"]],

        /* volume */
        "<liter>": [["l", "L", "liter", "liters", "litre", "litres"], 0.001, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<gallon>": [["gal", "gallon", "gallons"], 0.0037854118, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<gallon-imp>": [["galimp", "gallon-imp", "gallons-imp"], 0.0045460900, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<quart>": [["qt", "quart", "quarts"], 0.00094635295, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<pint>": [["pt", "pint", "pints"], 0.000473176475, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<pint-imp>": [["ptimp", "pint-imp", "pints-imp"], 5.6826125e-4, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<cup>": [["cu", "cup", "cups"], 0.000236588238, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<fluid-ounce>": [["floz", "fluid-ounce", "fluid-ounces"], 2.95735297e-5, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<fluid-ounce-imp>": [["flozimp", "floz-imp", "fluid-ounce-imp", "fluid-ounces-imp"], 2.84130625e-5, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<tablespoon>": [["tb", "tbsp", "tbs", "tablespoon", "tablespoons"], 1.47867648e-5, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<teaspoon>": [["tsp", "teaspoon", "teaspoons"], 4.92892161e-6, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<bushel>": [["bu", "bsh", "bushel", "bushels"], 0.035239072, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<oilbarrel>": [["bbl", "oilbarrel", "oilbarrels", "oil-barrel", "oil-barrels"], 0.158987294928, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<beerbarrel>": [["bl", "bl-us", "beerbarrel", "beerbarrels", "beer-barrel", "beer-barrels"], 0.1173477658, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<beerbarrel-imp>": [["blimp", "bl-imp", "beerbarrel-imp", "beerbarrels-imp", "beer-barrel-imp", "beer-barrels-imp"], 0.16365924, "volume", ["<meter>", "<meter>", "<meter>"]],

        /* speed */
        "<kph>": [["kph"], 0.277777778, "speed", ["<meter>"], ["<second>"]],
        "<mph>": [["mph"], 0.44704, "speed", ["<meter>"], ["<second>"]],
        "<knot>": [["kt", "kn", "kts", "knot", "knots"], 0.514444444, "speed", ["<meter>"], ["<second>"]],
        "<fps>": [["fps"], 0.3048, "speed", ["<meter>"], ["<second>"]],

        /* acceleration */
        "<gee>": [["gee"], 9.80665, "acceleration", ["<meter>"], ["<second>", "<second>"]],
        "<Gal>": [["Gal"], 1e-2, "acceleration", ["<meter>"], ["<second>", "<second>"]],

        /* temperature_difference */
        "<kelvin>": [["degK", "kelvin"], 1.0, "temperature", ["<kelvin>"]],
        "<celsius>": [["degC", "celsius", "celsius", "centigrade"], 1.0, "temperature", ["<kelvin>"]],
        "<fahrenheit>": [["degF", "fahrenheit"], 5 / 9, "temperature", ["<kelvin>"]],
        "<rankine>": [["degR", "rankine"], 5 / 9, "temperature", ["<kelvin>"]],
        "<temp-K>": [["tempK", "temp-K"], 1.0, "temperature", ["<temp-K>"]],
        "<temp-C>": [["tempC", "temp-C"], 1.0, "temperature", ["<temp-K>"]],
        "<temp-F>": [["tempF", "temp-F"], 5 / 9, "temperature", ["<temp-K>"]],
        "<temp-R>": [["tempR", "temp-R"], 5 / 9, "temperature", ["<temp-K>"]],

        /* time */
        "<second>": [["s", "sec", "secs", "second", "seconds"], 1.0, "time", ["<second>"]],
        "<minute>": [["min", "mins", "minute", "minutes"], 60.0, "time", ["<second>"]],
        "<hour>": [["h", "hr", "hrs", "hour", "hours"], 3600.0, "time", ["<second>"]],
        "<day>": [["d", "day", "days"], 3600 * 24, "time", ["<second>"]],
        "<week>": [["wk", "week", "weeks"], 7 * 3600 * 24, "time", ["<second>"]],
        "<fortnight>": [["fortnight", "fortnights"], 1209600, "time", ["<second>"]],
        "<year>": [["y", "yr", "year", "years", "annum"], 31556926, "time", ["<second>"]],
        "<decade>": [["decade", "decades"], 315569260, "time", ["<second>"]],
        "<century>": [["century", "centuries"], 3155692600, "time", ["<second>"]],

        /* pressure */
        "<pascal>": [["Pa", "pascal", "Pascal"], 1.0, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<bar>": [["bar", "bars"], 100000, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<mmHg>": [["mmHg"], 133.322368, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<inHg>": [["inHg"], 3386.3881472, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<torr>": [["torr"], 133.322368, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<atm>": [["atm", "ATM", "atmosphere", "atmospheres"], 101325, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<psi>": [["psi"], 6894.76, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<cmh2o>": [["cmH2O", "cmh2o"], 98.0638, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<inh2o>": [["inH2O", "inh2o"], 249.082052, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],

        /* viscosity */
        "<poise>": [["P", "poise"], 0.1, "viscosity", ["<kilogram>"], ["<meter>", "<second>"]],
        "<stokes>": [["St", "stokes"], 1e-4, "viscosity", ["<meter>", "<meter>"], ["<second>"]],

        /* substance */
        "<mole>": [["mol", "mole"], 1.0, "substance", ["<mole>"]],

        /* concentration */
        "<molar>": [["M", "molar"], 1000, "concentration", ["<mole>"], ["<meter>", "<meter>", "<meter>"]],
        "<wtpercent>": [["wt%", "wtpercent"], 10, "concentration", ["<kilogram>"], ["<meter>", "<meter>", "<meter>"]],

        /* activity */
        "<katal>": [["kat", "katal", "Katal"], 1.0, "activity", ["<mole>"], ["<second>"]],
        "<unit>": [["U", "enzUnit", "unit"], 16.667e-16, "activity", ["<mole>"], ["<second>"]],

        /* capacitance */
        "<farad>": [["F", "farad", "Farad"], 1.0, "capacitance", ["<second>", "<second>", "<second>", "<second>", "<ampere>", "<ampere>"], ["<meter>", "<meter>", "<kilogram>"]],

        /* charge */
        "<coulomb>": [["C", "coulomb", "Coulomb"], 1.0, "charge", ["<ampere>", "<second>"]],
        "<Ah>": [["Ah"], 3600, "charge", ["<ampere>", "<second>"]],

        /* current */
        "<ampere>": [["A", "Ampere", "ampere", "amp", "amps"], 1.0, "current", ["<ampere>"]],

        /* conductance */
        "<siemens>": [["S", "Siemens", "siemens"], 1.0, "conductance", ["<second>", "<second>", "<second>", "<ampere>", "<ampere>"], ["<kilogram>", "<meter>", "<meter>"]],

        /* inductance */
        "<henry>": [["H", "Henry", "henry"], 1.0, "inductance", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>", "<ampere>", "<ampere>"]],

        /* potential */
        "<volt>": [["V", "Volt", "volt", "volts"], 1.0, "potential", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>", "<second>", "<ampere>"]],

        /* resistance */
        "<ohm>": [["Ohm", "ohm", "\u03A9"
        /*Ω as greek letter*/
        , "\u2126"
        /*Ω as ohm sign*/
        ], 1.0, "resistance", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>", "<second>", "<ampere>", "<ampere>"]],

        /* magnetism */
        "<weber>": [["Wb", "weber", "webers"], 1.0, "magnetism", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>", "<ampere>"]],
        "<tesla>": [["T", "tesla", "teslas"], 1.0, "magnetism", ["<kilogram>"], ["<second>", "<second>", "<ampere>"]],
        "<gauss>": [["G", "gauss"], 1e-4, "magnetism", ["<kilogram>"], ["<second>", "<second>", "<ampere>"]],
        "<maxwell>": [["Mx", "maxwell", "maxwells"], 1e-8, "magnetism", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>", "<ampere>"]],
        "<oersted>": [["Oe", "oersted", "oersteds"], 250.0 / Math.PI, "magnetism", ["<ampere>"], ["<meter>"]],

        /* energy */
        "<joule>": [["J", "joule", "Joule", "joules"], 1.0, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<erg>": [["erg", "ergs"], 1e-7, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<btu>": [["BTU", "btu", "BTUs"], 1055.056, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<calorie>": [["cal", "calorie", "calories"], 4.18400, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<Calorie>": [["Cal", "Calorie", "Calories"], 4184.00, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<therm-US>": [["th", "therm", "therms", "Therm", "therm-US"], 105480400, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<Wh>": [["Wh"], 3600, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],

        /* force */
        "<newton>": [["N", "Newton", "newton"], 1.0, "force", ["<kilogram>", "<meter>"], ["<second>", "<second>"]],
        "<dyne>": [["dyn", "dyne"], 1e-5, "force", ["<kilogram>", "<meter>"], ["<second>", "<second>"]],
        "<pound-force>": [["lbf", "pound-force"], 4.448222, "force", ["<kilogram>", "<meter>"], ["<second>", "<second>"]],

        /* frequency */
        "<hertz>": [["Hz", "hertz", "Hertz"], 1.0, "frequency", ["<1>"], ["<second>"]],

        /* angle */
        "<radian>": [["rad", "radian", "radians"], 1.0, "angle", ["<radian>"]],
        "<degree>": [["deg", "degree", "degrees"], Math.PI / 180.0, "angle", ["<radian>"]],
        "<gradian>": [["gon", "grad", "gradian", "grads"], Math.PI / 200.0, "angle", ["<radian>"]],
        "<steradian>": [["sr", "steradian", "steradians"], 1.0, "solid_angle", ["<steradian>"]],

        /* rotation */
        "<rotation>": [["rotation"], 2.0 * Math.PI, "angle", ["<radian>"]],
        "<rpm>": [["rpm"], 2.0 * Math.PI / 60.0, "angular_velocity", ["<radian>"], ["<second>"]],

        /* information */
        "<byte>": [["B", "byte", "bytes"], 1.0, "information", ["<byte>"]],
        "<bit>": [["b", "bit", "bits"], 0.125, "information", ["<byte>"]],

        /* information rate */
        "<Bps>": [["Bps"], 1.0, "information_rate", ["<byte>"], ["<second>"]],
        "<bps>": [["bps"], 0.125, "information_rate", ["<byte>"], ["<second>"]],

        /* currency */
        "<dollar>": [["USD", "dollar"], 1.0, "currency", ["<dollar>"]],
        "<cents>": [["cents"], 0.01, "currency", ["<dollar>"]],

        /* luminosity */
        "<candela>": [["cd", "candela"], 1.0, "luminosity", ["<candela>"]],
        "<lumen>": [["lm", "lumen"], 1.0, "luminous_power", ["<candela>", "<steradian>"]],
        "<lux>": [["lux"], 1.0, "illuminance", ["<candela>", "<steradian>"], ["<meter>", "<meter>"]],

        /* power */
        "<watt>": [["W", "watt", "watts"], 1.0, "power", ["<kilogram>", "<meter>", "<meter>"], ["<second>", "<second>", "<second>"]],
        "<volt-ampere>": [["VA", "volt-ampere"], 1.0, "power", ["<kilogram>", "<meter>", "<meter>"], ["<second>", "<second>", "<second>"]],
        "<volt-ampere-reactive>": [["var", "Var", "VAr", "VAR", "volt-ampere-reactive"], 1.0, "power", ["<kilogram>", "<meter>", "<meter>"], ["<second>", "<second>", "<second>"]],
        "<horsepower>": [["hp", "horsepower"], 745.699872, "power", ["<kilogram>", "<meter>", "<meter>"], ["<second>", "<second>", "<second>"]],

        /* radiation */
        "<gray>": [["Gy", "gray", "grays"], 1.0, "radiation", ["<meter>", "<meter>"], ["<second>", "<second>"]],
        "<roentgen>": [["R", "roentgen"], 0.009330, "radiation", ["<meter>", "<meter>"], ["<second>", "<second>"]],
        "<sievert>": [["Sv", "sievert", "sieverts"], 1.0, "radiation", ["<meter>", "<meter>"], ["<second>", "<second>"]],
        "<becquerel>": [["Bq", "becquerel", "becquerels"], 1.0, "radiation", ["<1>"], ["<second>"]],
        "<curie>": [["Ci", "curie", "curies"], 3.7e10, "radiation", ["<1>"], ["<second>"]],

        /* rate */
        "<cpm>": [["cpm"], 1.0 / 60.0, "rate", ["<count>"], ["<second>"]],
        "<dpm>": [["dpm"], 1.0 / 60.0, "rate", ["<count>"], ["<second>"]],
        "<bpm>": [["bpm"], 1.0 / 60.0, "rate", ["<count>"], ["<second>"]],

        /* resolution / typography */
        "<dot>": [["dot", "dots"], 1, "resolution", ["<each>"]],
        "<pixel>": [["pixel", "px"], 1, "resolution", ["<each>"]],
        "<ppi>": [["ppi"], 1, "resolution", ["<pixel>"], ["<inch>"]],
        "<dpi>": [["dpi"], 1, "typography", ["<dot>"], ["<inch>"]],

        /* other */
        "<cell>": [["cells", "cell"], 1, "counting", ["<each>"]],
        "<each>": [["each"], 1.0, "counting", ["<each>"]],
        "<count>": [["count"], 1.0, "counting", ["<each>"]],
        "<base-pair>": [["bp", "base-pair"], 1.0, "counting", ["<each>"]],
        "<nucleotide>": [["nt", "nucleotide"], 1.0, "counting", ["<each>"]],
        "<molecule>": [["molecule", "molecules"], 1.0, "counting", ["<1>"]],
        "<dozen>": [["doz", "dz", "dozen"], 12.0, "prefix_only", ["<each>"]],
        "<percent>": [["%", "percent"], 0.01, "prefix_only", ["<1>"]],
        "<ppm>": [["ppm"], 1e-6, "prefix_only", ["<1>"]],
        "<ppt>": [["ppt"], 1e-9, "prefix_only", ["<1>"]],
        "<gross>": [["gr", "gross"], 144.0, "prefix_only", ["<dozen>", "<dozen>"]],
        "<decibel>": [["dB", "decibel", "decibels"], 1.0, "logarithmic", ["<decibel>"]]
      };
      var BASE_UNITS = ["<meter>", "<kilogram>", "<second>", "<mole>", "<ampere>", "<radian>", "<kelvin>", "<temp-K>", "<byte>", "<dollar>", "<candela>", "<each>", "<steradian>", "<decibel>"];
      var UNITY = "<1>";
      var UNITY_ARRAY = [UNITY]; // Setup

      /**
       * Asserts unit definition is valid
       *
       * @param {string} unitDef - Name of unit to test
       * @param {Object} definition - Definition of unit to test
       *
       * @returns {void}
       * @throws {QtyError} if unit definition is not valid
       */

      function validateUnitDefinition(unitDef, definition) {
        var scalar = definition[1];
        var numerator = definition[3] || [];
        var denominator = definition[4] || [];

        if (!isNumber(scalar)) {
          throw new QtyError(unitDef + ": Invalid unit definition. " + "'scalar' must be a number");
        }

        numerator.forEach(function (unit) {
          if (UNITS[unit] === undefined) {
            throw new QtyError(unitDef + ": Invalid unit definition. " + "Unit " + unit + " in 'numerator' is not recognized");
          }
        });
        denominator.forEach(function (unit) {
          if (UNITS[unit] === undefined) {
            throw new QtyError(unitDef + ": Invalid unit definition. " + "Unit " + unit + " in 'denominator' is not recognized");
          }
        });
      }

      var PREFIX_VALUES = {};
      var PREFIX_MAP = {};
      var UNIT_VALUES = {};
      var UNIT_MAP = {};
      var OUTPUT_MAP = {};

      for (var unitDef in UNITS) {
        if (UNITS.hasOwnProperty(unitDef)) {
          var definition = UNITS[unitDef];

          if (definition[2] === "prefix") {
            PREFIX_VALUES[unitDef] = definition[1];

            for (var i = 0; i < definition[0].length; i++) {
              PREFIX_MAP[definition[0][i]] = unitDef;
            }
          } else {
            validateUnitDefinition(unitDef, definition);
            UNIT_VALUES[unitDef] = {
              scalar: definition[1],
              numerator: definition[3],
              denominator: definition[4]
            };

            for (var j = 0; j < definition[0].length; j++) {
              UNIT_MAP[definition[0][j]] = unitDef;
            }
          }

          OUTPUT_MAP[unitDef] = definition[0][0];
        }
      }
      /**
       * Returns a list of available units of kind
       *
       * @param {string} [kind] - kind of units
       * @returns {array} names of units
       * @throws {QtyError} if kind is unknown
       */


      function getUnits(kind) {
        var i;
        var units = [];
        var unitKeys = Object.keys(UNITS);

        if (typeof kind === "undefined") {
          for (i = 0; i < unitKeys.length; i++) {
            if (["", "prefix"].indexOf(UNITS[unitKeys[i]][2]) === -1) {
              units.push(unitKeys[i].substr(1, unitKeys[i].length - 2));
            }
          }
        } else if (this.getKinds().indexOf(kind) === -1) {
          throw new QtyError("Kind not recognized");
        } else {
          for (i = 0; i < unitKeys.length; i++) {
            if (UNITS[unitKeys[i]][2] === kind) {
              units.push(unitKeys[i].substr(1, unitKeys[i].length - 2));
            }
          }
        }

        return units.sort(function (a, b) {
          if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
          }

          if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      }
      /**
       * Returns a list of alternative names for a unit
       *
       * @param {string} unitName - name of unit
       * @returns {string[]} aliases for unit
       * @throws {QtyError} if unit is unknown
       */


      function getAliases(unitName) {
        if (!UNIT_MAP[unitName]) {
          throw new QtyError("Unit not recognized");
        }

        return UNITS[UNIT_MAP[unitName]][0];
      }

      var SIGNATURE_VECTOR = ["length", "time", "temperature", "mass", "current", "substance", "luminosity", "currency", "information", "angle"];
      /*
      calculates the unit signature id for use in comparing compatible units and simplification
      the signature is based on a simple classification of units and is based on the following publication
       Novak, G.S., Jr. "Conversion of units of measurement", IEEE Transactions on Software Engineering,
      21(8), Aug 1995, pp.651-661
      doi://10.1109/32.403789
      http://ieeexplore.ieee.org/Xplore/login.jsp?url=/iel1/32/9079/00403789.pdf?isnumber=9079&prod=JNL&arnumber=403789&arSt=651&ared=661&arAuthor=Novak%2C+G.S.%2C+Jr.
      */

      function unitSignature() {
        if (this.signature) {
          return this.signature;
        }

        var vector = unitSignatureVector.call(this);

        for (var i = 0; i < vector.length; i++) {
          vector[i] *= Math.pow(20, i);
        }

        return vector.reduce(function (previous, current) {
          return previous + current;
        }, 0);
      } // calculates the unit signature vector used by unit_signature


      function unitSignatureVector() {
        if (!this.isBase()) {
          return unitSignatureVector.call(this.toBase());
        }

        var vector = new Array(SIGNATURE_VECTOR.length);

        for (var i = 0; i < vector.length; i++) {
          vector[i] = 0;
        }

        var r, n;

        for (var j = 0; j < this.numerator.length; j++) {
          if (r = UNITS[this.numerator[j]]) {
            n = SIGNATURE_VECTOR.indexOf(r[2]);

            if (n >= 0) {
              vector[n] = vector[n] + 1;
            }
          }
        }

        for (var k = 0; k < this.denominator.length; k++) {
          if (r = UNITS[this.denominator[k]]) {
            n = SIGNATURE_VECTOR.indexOf(r[2]);

            if (n >= 0) {
              vector[n] = vector[n] - 1;
            }
          }
        }

        return vector;
      }

      var SIGN = "[+-]";
      var INTEGER = "\\d+";
      var SIGNED_INTEGER = SIGN + "?" + INTEGER;
      var FRACTION = "\\." + INTEGER;
      var FLOAT = "(?:" + INTEGER + "(?:" + FRACTION + ")?" + ")" + "|" + "(?:" + FRACTION + ")";
      var EXPONENT = "[Ee]" + SIGNED_INTEGER;
      var SCI_NUMBER = "(?:" + FLOAT + ")(?:" + EXPONENT + ")?";
      var SIGNED_NUMBER = SIGN + "?\\s*" + SCI_NUMBER;
      var QTY_STRING = "(" + SIGNED_NUMBER + ")?" + "\\s*([^/]*)(?:\/(.+))?";
      var QTY_STRING_REGEX = new RegExp("^" + QTY_STRING + "$");
      var POWER_OP = "\\^|\\*{2}"; // Allow unit powers representing scalar, length, area, volume; 4 is for some
      // special case representations in SI base units.

      var SAFE_POWER = "[01234]";
      var TOP_REGEX = new RegExp("([^ \\*\\d]+?)(?:" + POWER_OP + ")?(-?" + SAFE_POWER + "(?![a-zA-Z]))");
      var BOTTOM_REGEX = new RegExp("([^ \\*\\d]+?)(?:" + POWER_OP + ")?(" + SAFE_POWER + "(?![a-zA-Z]))");
      /* parse a string into a unit object.
       * Typical formats like :
       * "5.6 kg*m/s^2"
       * "5.6 kg*m*s^-2"
       * "5.6 kilogram*meter*second^-2"
       * "2.2 kPa"
       * "37 degC"
       * "1"  -- creates a unitless constant with value 1
       * "GPa"  -- creates a unit with scalar 1 with units 'GPa'
       * 6'4"  -- recognized as 6 feet + 4 inches
       * 8 lbs 8 oz -- recognized as 8 lbs + 8 ounces
       */

      function parse(val) {
        if (!isString(val)) {
          val = val.toString();
        }

        val = val.trim();
        var result = QTY_STRING_REGEX.exec(val);

        if (!result) {
          throw new QtyError(val + ": Quantity not recognized");
        }

        var scalarMatch = result[1];

        if (scalarMatch) {
          // Allow whitespaces between sign and scalar for loose parsing
          scalarMatch = scalarMatch.replace(/\s/g, "");
          this.scalar = parseFloat(scalarMatch);
        } else {
          this.scalar = 1;
        }

        var top = result[2];
        var bottom = result[3];
        var n, x, nx; // TODO DRY me

        while (result = TOP_REGEX.exec(top)) {
          n = parseFloat(result[2]);

          if (isNaN(n)) {
            // Prevents infinite loops
            throw new QtyError("Unit exponent is not a number");
          } // Disallow unrecognized unit even if exponent is 0


          if (n === 0 && !UNIT_TEST_REGEX.test(result[1])) {
            throw new QtyError("Unit not recognized");
          }

          x = result[1] + " ";
          nx = "";

          for (var i = 0; i < Math.abs(n); i++) {
            nx += x;
          }

          if (n >= 0) {
            top = top.replace(result[0], nx);
          } else {
            bottom = bottom ? bottom + nx : nx;
            top = top.replace(result[0], "");
          }
        }

        while (result = BOTTOM_REGEX.exec(bottom)) {
          n = parseFloat(result[2]);

          if (isNaN(n)) {
            // Prevents infinite loops
            throw new QtyError("Unit exponent is not a number");
          } // Disallow unrecognized unit even if exponent is 0


          if (n === 0 && !UNIT_TEST_REGEX.test(result[1])) {
            throw new QtyError("Unit not recognized");
          }

          x = result[1] + " ";
          nx = "";

          for (var j = 0; j < n; j++) {
            nx += x;
          }

          bottom = bottom.replace(result[0], nx);
        }

        if (top) {
          this.numerator = parseUnits(top.trim());
        }

        if (bottom) {
          this.denominator = parseUnits(bottom.trim());
        }
      }

      var PREFIX_REGEX = Object.keys(PREFIX_MAP).sort(function (a, b) {
        return b.length - a.length;
      }).join("|");
      var UNIT_REGEX = Object.keys(UNIT_MAP).sort(function (a, b) {
        return b.length - a.length;
      }).join("|");
      /*
       * Minimal boundary regex to support units with Unicode characters
       * \b only works for ASCII
       */

      var BOUNDARY_REGEX = "\\b|$";
      var UNIT_MATCH = "(" + PREFIX_REGEX + ")??(" + UNIT_REGEX + ")(?:" + BOUNDARY_REGEX + ")";
      var UNIT_TEST_REGEX = new RegExp("^\\s*(" + UNIT_MATCH + "[\\s\\*]*)+$");
      var UNIT_MATCH_REGEX = new RegExp(UNIT_MATCH, "g"); // g flag for multiple occurences

      var parsedUnitsCache = {};
      /**
       * Parses and converts units string to normalized unit array.
       * Result is cached to speed up next calls.
       *
       * @param {string} units Units string
       * @returns {string[]} Array of normalized units
       *
       * @example
       * // Returns ["<second>", "<meter>", "<second>"]
       * parseUnits("s m s");
       *
       */

      function parseUnits(units) {
        var cached = parsedUnitsCache[units];

        if (cached) {
          return cached;
        }

        var unitMatch,
            normalizedUnits = []; // Scan

        if (!UNIT_TEST_REGEX.test(units)) {
          throw new QtyError("Unit not recognized");
        }

        while (unitMatch = UNIT_MATCH_REGEX.exec(units)) {
          normalizedUnits.push(unitMatch.slice(1));
        }

        normalizedUnits = normalizedUnits.map(function (item) {
          return PREFIX_MAP[item[0]] ? [PREFIX_MAP[item[0]], UNIT_MAP[item[1]]] : [UNIT_MAP[item[1]]];
        }); // Flatten and remove null elements

        normalizedUnits = normalizedUnits.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        normalizedUnits = normalizedUnits.filter(function (item) {
          return item;
        });
        parsedUnitsCache[units] = normalizedUnits;
        return normalizedUnits;
      }
      /**
       * Parses a string as a quantity
       * @param {string} value - quantity as text
       * @throws if value is not a string
       * @returns {Qty|null} Parsed quantity or null if unrecognized
       */


      function globalParse(value) {
        if (!isString(value)) {
          throw new QtyError("Argument should be a string");
        }

        try {
          return this(value);
        } catch (e) {
          return null;
        }
      }
      /**
       * Tests if a value is a Qty instance
       *
       * @param {*} value - Value to test
       *
       * @returns {boolean} true if value is a Qty instance, false otherwise
       */


      function isQty(value) {
        return value instanceof Qty;
      }

      function Qty(initValue, initUnits) {
        assertValidConstructorArgs.apply(null, arguments);

        if (!isQty(this)) {
          return new Qty(initValue, initUnits);
        }

        this.scalar = null;
        this.baseScalar = null;
        this.signature = null;
        this._conversionCache = {};
        this.numerator = UNITY_ARRAY;
        this.denominator = UNITY_ARRAY;

        if (isDefinitionObject(initValue)) {
          this.scalar = initValue.scalar;
          this.numerator = initValue.numerator && initValue.numerator.length !== 0 ? initValue.numerator : UNITY_ARRAY;
          this.denominator = initValue.denominator && initValue.denominator.length !== 0 ? initValue.denominator : UNITY_ARRAY;
        } else if (initUnits) {
          parse.call(this, initUnits);
          this.scalar = initValue;
        } else {
          parse.call(this, initValue);
        } // math with temperatures is very limited


        if (this.denominator.join("*").indexOf("temp") >= 0) {
          throw new QtyError("Cannot divide with temperatures");
        }

        if (this.numerator.join("*").indexOf("temp") >= 0) {
          if (this.numerator.length > 1) {
            throw new QtyError("Cannot multiply by temperatures");
          }

          if (!compareArray(this.denominator, UNITY_ARRAY)) {
            throw new QtyError("Cannot divide with temperatures");
          }
        }

        this.initValue = initValue;
        updateBaseScalar.call(this);

        if (this.isTemperature() && this.baseScalar < 0) {
          throw new QtyError("Temperatures must not be less than absolute zero");
        }
      }

      Qty.prototype = {
        // Properly set up constructor
        constructor: Qty
      };
      /**
       * Asserts constructor arguments are valid
       *
       * @param {*} value - Value to test
       * @param {string} [units] - Optional units when value is passed as a number
       *
       * @returns {void}
       * @throws {QtyError} if constructor arguments are invalid
       */

      function assertValidConstructorArgs(value, units) {
        if (units) {
          if (!(isNumber(value) && isString(units))) {
            throw new QtyError("Only number accepted as initialization value " + "when units are explicitly provided");
          }
        } else {
          if (!(isString(value) || isNumber(value) || isQty(value) || isDefinitionObject(value))) {
            throw new QtyError("Only string, number or quantity accepted as " + "single initialization value");
          }
        }
      }
      /**
       * Tests if a value is a Qty definition object
       *
       * @param {*} value - Value to test
       *
       * @returns {boolean} true if value is a definition object, false otherwise
       */


      function isDefinitionObject(value) {
        return value && typeof value === "object" && value.hasOwnProperty("scalar");
      }

      function updateBaseScalar() {
        if (this.baseScalar) {
          return this.baseScalar;
        }

        if (this.isBase()) {
          this.baseScalar = this.scalar;
          this.signature = unitSignature.call(this);
        } else {
          var base = this.toBase();
          this.baseScalar = base.scalar;
          this.signature = base.signature;
        }
      }

      var KINDS = {
        "-312078": "elastance",
        "-312058": "resistance",
        "-312038": "inductance",
        "-152058": "potential",
        "-152040": "magnetism",
        "-152038": "magnetism",
        "-7997": "specific_volume",
        "-79": "snap",
        "-59": "jolt",
        "-39": "acceleration",
        "-38": "radiation",
        "-20": "frequency",
        "-19": "speed",
        "-18": "viscosity",
        "-17": "volumetric_flow",
        "-1": "wavenumber",
        "0": "unitless",
        "1": "length",
        "2": "area",
        "3": "volume",
        "20": "time",
        "400": "temperature",
        "7941": "yank",
        "7942": "power",
        "7959": "pressure",
        "7961": "force",
        "7962": "energy",
        "7979": "viscosity",
        "7981": "momentum",
        "7982": "angular_momentum",
        "7997": "density",
        "7998": "area_density",
        "8000": "mass",
        "152020": "radiation_exposure",
        "159999": "magnetism",
        "160000": "current",
        "160020": "charge",
        "312058": "conductance",
        "312078": "capacitance",
        "3199980": "activity",
        "3199997": "molar_concentration",
        "3200000": "substance",
        "63999998": "illuminance",
        "64000000": "luminous_power",
        "1280000000": "currency",
        "25599999980": "information_rate",
        "25600000000": "information",
        "511999999980": "angular_velocity",
        "512000000000": "angle"
      };
      /**
       * Returns the list of available well-known kinds of units, e.g.
       * "radiation" or "length".
       *
       * @returns {string[]} names of kinds of units
       */

      function getKinds() {
        return uniq(Object.keys(KINDS).map(function (knownSignature) {
          return KINDS[knownSignature];
        }));
      }

      Qty.prototype.kind = function () {
        return KINDS[this.signature.toString()];
      };

      assign(Qty.prototype, {
        isDegrees: function () {
          // signature may not have been calculated yet
          return (this.signature === null || this.signature === 400) && this.numerator.length === 1 && compareArray(this.denominator, UNITY_ARRAY) && (this.numerator[0].match(/<temp-[CFRK]>/) || this.numerator[0].match(/<(kelvin|celsius|rankine|fahrenheit)>/));
        },
        isTemperature: function () {
          return this.isDegrees() && this.numerator[0].match(/<temp-[CFRK]>/);
        }
      });

      function subtractTemperatures(lhs, rhs) {
        var lhsUnits = lhs.units();
        var rhsConverted = rhs.to(lhsUnits);
        var dstDegrees = Qty(getDegreeUnits(lhsUnits));
        return Qty({
          "scalar": lhs.scalar - rhsConverted.scalar,
          "numerator": dstDegrees.numerator,
          "denominator": dstDegrees.denominator
        });
      }

      function subtractTempDegrees(temp, deg) {
        var tempDegrees = deg.to(getDegreeUnits(temp.units()));
        return Qty({
          "scalar": temp.scalar - tempDegrees.scalar,
          "numerator": temp.numerator,
          "denominator": temp.denominator
        });
      }

      function addTempDegrees(temp, deg) {
        var tempDegrees = deg.to(getDegreeUnits(temp.units()));
        return Qty({
          "scalar": temp.scalar + tempDegrees.scalar,
          "numerator": temp.numerator,
          "denominator": temp.denominator
        });
      }

      function getDegreeUnits(units) {
        if (units === "tempK") {
          return "degK";
        } else if (units === "tempC") {
          return "degC";
        } else if (units === "tempF") {
          return "degF";
        } else if (units === "tempR") {
          return "degR";
        } else {
          throw new QtyError("Unknown type for temp conversion from: " + units);
        }
      }

      function toDegrees(src, dst) {
        var srcDegK = toDegK(src);
        var dstUnits = dst.units();
        var dstScalar;

        if (dstUnits === "degK") {
          dstScalar = srcDegK.scalar;
        } else if (dstUnits === "degC") {
          dstScalar = srcDegK.scalar;
        } else if (dstUnits === "degF") {
          dstScalar = srcDegK.scalar * 9 / 5;
        } else if (dstUnits === "degR") {
          dstScalar = srcDegK.scalar * 9 / 5;
        } else {
          throw new QtyError("Unknown type for degree conversion to: " + dstUnits);
        }

        return Qty({
          "scalar": dstScalar,
          "numerator": dst.numerator,
          "denominator": dst.denominator
        });
      }

      function toDegK(qty) {
        var units = qty.units();
        var q;

        if (units.match(/(deg)[CFRK]/)) {
          q = qty.baseScalar;
        } else if (units === "tempK") {
          q = qty.scalar;
        } else if (units === "tempC") {
          q = qty.scalar;
        } else if (units === "tempF") {
          q = qty.scalar * 5 / 9;
        } else if (units === "tempR") {
          q = qty.scalar * 5 / 9;
        } else {
          throw new QtyError("Unknown type for temp conversion from: " + units);
        }

        return Qty({
          "scalar": q,
          "numerator": ["<kelvin>"],
          "denominator": UNITY_ARRAY
        });
      }

      function toTemp(src, dst) {
        var dstUnits = dst.units();
        var dstScalar;

        if (dstUnits === "tempK") {
          dstScalar = src.baseScalar;
        } else if (dstUnits === "tempC") {
          dstScalar = src.baseScalar - 273.15;
        } else if (dstUnits === "tempF") {
          dstScalar = src.baseScalar * 9 / 5 - 459.67;
        } else if (dstUnits === "tempR") {
          dstScalar = src.baseScalar * 9 / 5;
        } else {
          throw new QtyError("Unknown type for temp conversion to: " + dstUnits);
        }

        return Qty({
          "scalar": dstScalar,
          "numerator": dst.numerator,
          "denominator": dst.denominator
        });
      }

      function toTempK(qty) {
        var units = qty.units();
        var q;

        if (units.match(/(deg)[CFRK]/)) {
          q = qty.baseScalar;
        } else if (units === "tempK") {
          q = qty.scalar;
        } else if (units === "tempC") {
          q = qty.scalar + 273.15;
        } else if (units === "tempF") {
          q = (qty.scalar + 459.67) * 5 / 9;
        } else if (units === "tempR") {
          q = qty.scalar * 5 / 9;
        } else {
          throw new QtyError("Unknown type for temp conversion from: " + units);
        }

        return Qty({
          "scalar": q,
          "numerator": ["<temp-K>"],
          "denominator": UNITY_ARRAY
        });
      }

      assign(Qty.prototype, {
        /**
         * Converts to other compatible units.
         * Instance's converted quantities are cached for faster subsequent calls.
         *
         * @param {(string|Qty)} other - Target units as string or retrieved from
         *                               other Qty instance (scalar is ignored)
         *
         * @returns {Qty} New converted Qty instance with target units
         *
         * @throws {QtyError} if target units are incompatible
         *
         * @example
         * var weight = Qty("25 kg");
         * weight.to("lb"); // => Qty("55.11556554621939 lbs");
         * weight.to(Qty("3 g")); // => Qty("25000 g"); // scalar of passed Qty is ignored
         */
        to: function (other) {
          var cached, target;

          if (other === undefined || other === null) {
            return this;
          }

          if (!isString(other)) {
            return this.to(other.units());
          }

          cached = this._conversionCache[other];

          if (cached) {
            return cached;
          } // Instantiating target to normalize units


          target = Qty(other);

          if (target.units() === this.units()) {
            return this;
          }

          if (!this.isCompatible(target)) {
            if (this.isInverse(target)) {
              target = this.inverse().to(other);
            } else {
              throwIncompatibleUnits(this.units(), target.units());
            }
          } else {
            if (target.isTemperature()) {
              target = toTemp(this, target);
            } else if (target.isDegrees()) {
              target = toDegrees(this, target);
            } else {
              var q = divSafe(this.baseScalar, target.baseScalar);
              target = Qty({
                "scalar": q,
                "numerator": target.numerator,
                "denominator": target.denominator
              });
            }
          }

          this._conversionCache[other] = target;
          return target;
        },
        // convert to base SI units
        // results of the conversion are cached so subsequent calls to this will be fast
        toBase: function () {
          if (this.isBase()) {
            return this;
          }

          if (this.isTemperature()) {
            return toTempK(this);
          }

          var cached = baseUnitCache[this.units()];

          if (!cached) {
            cached = toBaseUnits(this.numerator, this.denominator);
            baseUnitCache[this.units()] = cached;
          }

          return cached.mul(this.scalar);
        },
        // Converts the unit back to a float if it is unitless.  Otherwise raises an exception
        toFloat: function () {
          if (this.isUnitless()) {
            return this.scalar;
          }

          throw new QtyError("Can't convert to Float unless unitless.  Use Unit#scalar");
        },

        /**
         * Returns the nearest multiple of quantity passed as
         * precision
         *
         * @param {(Qty|string|number)} precQuantity - Quantity, string formated
         *   quantity or number as expected precision
         *
         * @returns {Qty} Nearest multiple of precQuantity
         *
         * @example
         * Qty('5.5 ft').toPrec('2 ft'); // returns 6 ft
         * Qty('0.8 cu').toPrec('0.25 cu'); // returns 0.75 cu
         * Qty('6.3782 m').toPrec('cm'); // returns 6.38 m
         * Qty('1.146 MPa').toPrec('0.1 bar'); // returns 1.15 MPa
         *
         */
        toPrec: function (precQuantity) {
          if (isString(precQuantity)) {
            precQuantity = Qty(precQuantity);
          }

          if (isNumber(precQuantity)) {
            precQuantity = Qty(precQuantity + " " + this.units());
          }

          if (!this.isUnitless()) {
            precQuantity = precQuantity.to(this.units());
          } else if (!precQuantity.isUnitless()) {
            throwIncompatibleUnits(this.units(), precQuantity.units());
          }

          if (precQuantity.scalar === 0) {
            throw new QtyError("Divide by zero");
          }

          var precRoundedResult = mulSafe(Math.round(this.scalar / precQuantity.scalar), precQuantity.scalar);
          return Qty(precRoundedResult + this.units());
        }
      });
      /**
       * Configures and returns a fast function to convert
       * Number values from units to others.
       * Useful to efficiently convert large array of values
       * with same units into others with iterative methods.
       * Does not take care of rounding issues.
       *
       * @param {string} srcUnits Units of values to convert
       * @param {string} dstUnits Units to convert to
       *
       * @returns {Function} Converting function accepting Number value
       *   and returning converted value
       *
       * @throws "Incompatible units" if units are incompatible
       *
       * @example
       * // Converting large array of numbers with the same units
       * // into other units
       * var converter = Qty.swiftConverter("m/h", "ft/s");
       * var convertedSerie = largeSerie.map(converter);
       *
       */

      function swiftConverter(srcUnits, dstUnits) {
        var srcQty = Qty(srcUnits);
        var dstQty = Qty(dstUnits);

        if (srcQty.eq(dstQty)) {
          return identity;
        }

        var convert;

        if (!srcQty.isTemperature()) {
          convert = function (value) {
            return value * srcQty.baseScalar / dstQty.baseScalar;
          };
        } else {
          convert = function (value) {
            // TODO Not optimized
            return srcQty.mul(value).to(dstQty).scalar;
          };
        }

        return function converter(value) {
          var i, length, result;

          if (!Array.isArray(value)) {
            return convert(value);
          } else {
            length = value.length;
            result = [];

            for (i = 0; i < length; i++) {
              result.push(convert(value[i]));
            }

            return result;
          }
        };
      }

      var baseUnitCache = {};

      function toBaseUnits(numerator, denominator) {
        var num = [];
        var den = [];
        var q = 1;
        var unit;

        for (var i = 0; i < numerator.length; i++) {
          unit = numerator[i];

          if (PREFIX_VALUES[unit]) {
            // workaround to fix
            // 0.1 * 0.1 => 0.010000000000000002
            q = mulSafe(q, PREFIX_VALUES[unit]);
          } else {
            if (UNIT_VALUES[unit]) {
              q *= UNIT_VALUES[unit].scalar;

              if (UNIT_VALUES[unit].numerator) {
                num.push(UNIT_VALUES[unit].numerator);
              }

              if (UNIT_VALUES[unit].denominator) {
                den.push(UNIT_VALUES[unit].denominator);
              }
            }
          }
        }

        for (var j = 0; j < denominator.length; j++) {
          unit = denominator[j];

          if (PREFIX_VALUES[unit]) {
            q /= PREFIX_VALUES[unit];
          } else {
            if (UNIT_VALUES[unit]) {
              q /= UNIT_VALUES[unit].scalar;

              if (UNIT_VALUES[unit].numerator) {
                den.push(UNIT_VALUES[unit].numerator);
              }

              if (UNIT_VALUES[unit].denominator) {
                num.push(UNIT_VALUES[unit].denominator);
              }
            }
          }
        } // Flatten


        num = num.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        den = den.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        return Qty({
          "scalar": q,
          "numerator": num,
          "denominator": den
        });
      }

      Qty.parse = globalParse;
      Qty.getUnits = getUnits;
      Qty.getAliases = getAliases;
      Qty.mulSafe = mulSafe;
      Qty.divSafe = divSafe;
      Qty.getKinds = getKinds;
      Qty.swiftConverter = swiftConverter;
      Qty.Error = QtyError;
      assign(Qty.prototype, {
        // Returns new instance with units of this
        add: function (other) {
          if (isString(other)) {
            other = Qty(other);
          }

          if (!this.isCompatible(other)) {
            throwIncompatibleUnits(this.units(), other.units());
          }

          if (this.isTemperature() && other.isTemperature()) {
            throw new QtyError("Cannot add two temperatures");
          } else if (this.isTemperature()) {
            return addTempDegrees(this, other);
          } else if (other.isTemperature()) {
            return addTempDegrees(other, this);
          }

          return Qty({
            "scalar": this.scalar + other.to(this).scalar,
            "numerator": this.numerator,
            "denominator": this.denominator
          });
        },
        sub: function (other) {
          if (isString(other)) {
            other = Qty(other);
          }

          if (!this.isCompatible(other)) {
            throwIncompatibleUnits(this.units(), other.units());
          }

          if (this.isTemperature() && other.isTemperature()) {
            return subtractTemperatures(this, other);
          } else if (this.isTemperature()) {
            return subtractTempDegrees(this, other);
          } else if (other.isTemperature()) {
            throw new QtyError("Cannot subtract a temperature from a differential degree unit");
          }

          return Qty({
            "scalar": this.scalar - other.to(this).scalar,
            "numerator": this.numerator,
            "denominator": this.denominator
          });
        },
        mul: function (other) {
          if (isNumber(other)) {
            return Qty({
              "scalar": mulSafe(this.scalar, other),
              "numerator": this.numerator,
              "denominator": this.denominator
            });
          } else if (isString(other)) {
            other = Qty(other);
          }

          if ((this.isTemperature() || other.isTemperature()) && !(this.isUnitless() || other.isUnitless())) {
            throw new QtyError("Cannot multiply by temperatures");
          } // Quantities should be multiplied with same units if compatible, with base units else


          var op1 = this;
          var op2 = other; // so as not to confuse results, multiplication and division between temperature degrees will maintain original unit info in num/den
          // multiplication and division between deg[CFRK] can never factor each other out, only themselves: "degK*degC/degC^2" == "degK/degC"

          if (op1.isCompatible(op2) && op1.signature !== 400) {
            op2 = op2.to(op1);
          }

          var numdenscale = cleanTerms(op1.numerator, op1.denominator, op2.numerator, op2.denominator);
          return Qty({
            "scalar": mulSafe(op1.scalar, op2.scalar, numdenscale[2]),
            "numerator": numdenscale[0],
            "denominator": numdenscale[1]
          });
        },
        div: function (other) {
          if (isNumber(other)) {
            if (other === 0) {
              throw new QtyError("Divide by zero");
            }

            return Qty({
              "scalar": this.scalar / other,
              "numerator": this.numerator,
              "denominator": this.denominator
            });
          } else if (isString(other)) {
            other = Qty(other);
          }

          if (other.scalar === 0) {
            throw new QtyError("Divide by zero");
          }

          if (other.isTemperature()) {
            throw new QtyError("Cannot divide with temperatures");
          } else if (this.isTemperature() && !other.isUnitless()) {
            throw new QtyError("Cannot divide with temperatures");
          } // Quantities should be multiplied with same units if compatible, with base units else


          var op1 = this;
          var op2 = other; // so as not to confuse results, multiplication and division between temperature degrees will maintain original unit info in num/den
          // multiplication and division between deg[CFRK] can never factor each other out, only themselves: "degK*degC/degC^2" == "degK/degC"

          if (op1.isCompatible(op2) && op1.signature !== 400) {
            op2 = op2.to(op1);
          }

          var numdenscale = cleanTerms(op1.numerator, op1.denominator, op2.denominator, op2.numerator);
          return Qty({
            "scalar": mulSafe(op1.scalar, numdenscale[2]) / op2.scalar,
            "numerator": numdenscale[0],
            "denominator": numdenscale[1]
          });
        },
        // Returns a Qty that is the inverse of this Qty,
        inverse: function () {
          if (this.isTemperature()) {
            throw new QtyError("Cannot divide with temperatures");
          }

          if (this.scalar === 0) {
            throw new QtyError("Divide by zero");
          }

          return Qty({
            "scalar": 1 / this.scalar,
            "numerator": this.denominator,
            "denominator": this.numerator
          });
        }
      });

      function cleanTerms(num1, den1, num2, den2) {
        function notUnity(val) {
          return val !== UNITY;
        }

        num1 = num1.filter(notUnity);
        num2 = num2.filter(notUnity);
        den1 = den1.filter(notUnity);
        den2 = den2.filter(notUnity);
        var combined = {};

        function combineTerms(terms, direction) {
          var k;
          var prefix;
          var prefixValue;

          for (var i = 0; i < terms.length; i++) {
            if (PREFIX_VALUES[terms[i]]) {
              k = terms[i + 1];
              prefix = terms[i];
              prefixValue = PREFIX_VALUES[prefix];
              i++;
            } else {
              k = terms[i];
              prefix = null;
              prefixValue = 1;
            }

            if (k && k !== UNITY) {
              if (combined[k]) {
                combined[k][0] += direction;
                var combinedPrefixValue = combined[k][2] ? PREFIX_VALUES[combined[k][2]] : 1;
                combined[k][direction === 1 ? 3 : 4] *= divSafe(prefixValue, combinedPrefixValue);
              } else {
                combined[k] = [direction, k, prefix, 1, 1];
              }
            }
          }
        }

        combineTerms(num1, 1);
        combineTerms(den1, -1);
        combineTerms(num2, 1);
        combineTerms(den2, -1);
        var num = [];
        var den = [];
        var scale = 1;

        for (var prop in combined) {
          if (combined.hasOwnProperty(prop)) {
            var item = combined[prop];
            var n;

            if (item[0] > 0) {
              for (n = 0; n < item[0]; n++) {
                num.push(item[2] === null ? item[1] : [item[2], item[1]]);
              }
            } else if (item[0] < 0) {
              for (n = 0; n < -item[0]; n++) {
                den.push(item[2] === null ? item[1] : [item[2], item[1]]);
              }
            }

            scale *= divSafe(item[3], item[4]);
          }
        }

        if (num.length === 0) {
          num = UNITY_ARRAY;
        }

        if (den.length === 0) {
          den = UNITY_ARRAY;
        } // Flatten


        num = num.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        den = den.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        return [num, den, scale];
      }

      assign(Qty.prototype, {
        eq: function (other) {
          return this.compareTo(other) === 0;
        },
        lt: function (other) {
          return this.compareTo(other) === -1;
        },
        lte: function (other) {
          return this.eq(other) || this.lt(other);
        },
        gt: function (other) {
          return this.compareTo(other) === 1;
        },
        gte: function (other) {
          return this.eq(other) || this.gt(other);
        },
        // Compare two Qty objects. Throws an exception if they are not of compatible types.
        // Comparisons are done based on the value of the quantity in base SI units.
        //
        // NOTE: We cannot compare inverses as that breaks the general compareTo contract:
        //   if a.compareTo(b) < 0 then b.compareTo(a) > 0
        //   if a.compareTo(b) == 0 then b.compareTo(a) == 0
        //
        //   Since "10S" == ".1ohm" (10 > .1) and "10ohm" == ".1S" (10 > .1)
        //     Qty("10S").inverse().compareTo("10ohm") == -1
        //     Qty("10ohm").inverse().compareTo("10S") == -1
        //
        //   If including inverses in the sort is needed, I suggest writing: Qty.sort(qtyArray,units)
        compareTo: function (other) {
          if (isString(other)) {
            return this.compareTo(Qty(other));
          }

          if (!this.isCompatible(other)) {
            throwIncompatibleUnits(this.units(), other.units());
          }

          if (this.baseScalar < other.baseScalar) {
            return -1;
          } else if (this.baseScalar === other.baseScalar) {
            return 0;
          } else if (this.baseScalar > other.baseScalar) {
            return 1;
          }
        },
        // Return true if quantities and units match
        // Unit("100 cm").same(Unit("100 cm"))  # => true
        // Unit("100 cm").same(Unit("1 m"))     # => false
        same: function (other) {
          return this.scalar === other.scalar && this.units() === other.units();
        }
      });
      assign(Qty.prototype, {
        // returns true if no associated units
        // false, even if the units are "unitless" like 'radians, each, etc'
        isUnitless: function () {
          return [this.numerator, this.denominator].every(function (item) {
            return compareArray(item, UNITY_ARRAY);
          });
        },

        /*
        check to see if units are compatible, but not the scalar part
        this check is done by comparing signatures for performance reasons
        if passed a string, it will create a unit object with the string and then do the comparison
        this permits a syntax like:
        unit =~ "mm"
        if you want to do a regexp on the unit string do this ...
        unit.units =~ /regexp/
        */
        isCompatible: function (other) {
          if (isString(other)) {
            return this.isCompatible(Qty(other));
          }

          if (!isQty(other)) {
            return false;
          }

          if (other.signature !== undefined) {
            return this.signature === other.signature;
          } else {
            return false;
          }
        },

        /*
        check to see if units are inverse of each other, but not the scalar part
        this check is done by comparing signatures for performance reasons
        if passed a string, it will create a unit object with the string and then do the comparison
        this permits a syntax like:
        unit =~ "mm"
        if you want to do a regexp on the unit string do this ...
        unit.units =~ /regexp/
        */
        isInverse: function (other) {
          return this.inverse().isCompatible(other);
        },
        // Returns 'true' if the Unit is represented in base units
        isBase: function () {
          if (this._isBase !== undefined) {
            return this._isBase;
          }

          if (this.isDegrees() && this.numerator[0].match(/<(kelvin|temp-K)>/)) {
            this._isBase = true;
            return this._isBase;
          }

          this.numerator.concat(this.denominator).forEach(function (item) {
            if (item !== UNITY && BASE_UNITS.indexOf(item) === -1) {
              this._isBase = false;
            }
          }, this);

          if (this._isBase === false) {
            return this._isBase;
          }

          this._isBase = true;
          return this._isBase;
        }
      });

      function NestedMap() {}

      NestedMap.prototype.get = function (keys) {
        // Allows to pass key1, key2, ... instead of [key1, key2, ...]
        if (arguments.length > 1) {
          // Slower with Firefox but faster with Chrome than
          // Array.prototype.slice.call(arguments)
          // See http://jsperf.com/array-apply-versus-array-prototype-slice-call
          keys = Array.apply(null, arguments);
        }

        return keys.reduce(function (map, key, index) {
          if (map) {
            var childMap = map[key];

            if (index === keys.length - 1) {
              return childMap ? childMap.data : undefined;
            } else {
              return childMap;
            }
          }
        }, this);
      };

      NestedMap.prototype.set = function (keys, value) {
        if (arguments.length > 2) {
          keys = Array.prototype.slice.call(arguments, 0, -1);
          value = arguments[arguments.length - 1];
        }

        return keys.reduce(function (map, key, index) {
          var childMap = map[key];

          if (childMap === undefined) {
            childMap = map[key] = {};
          }

          if (index === keys.length - 1) {
            childMap.data = value;
            return value;
          } else {
            return childMap;
          }
        }, this);
      };
      /**
       * Default formatter
       *
       * @param {number} scalar - scalar value
       * @param {string} units - units as string
       *
       * @returns {string} formatted result
       */


      function defaultFormatter(scalar, units) {
        return (scalar + " " + units).trim();
      }
      /**
       *
       * Configurable Qty default formatter
       *
       * @type {function}
       *
       * @param {number} scalar
       * @param {string} units
       *
       * @returns {string} formatted result
       */


      Qty.formatter = defaultFormatter;
      assign(Qty.prototype, {
        // returns the 'unit' part of the Unit object without the scalar
        units: function () {
          if (this._units !== undefined) {
            return this._units;
          }

          var numIsUnity = compareArray(this.numerator, UNITY_ARRAY);
          var denIsUnity = compareArray(this.denominator, UNITY_ARRAY);

          if (numIsUnity && denIsUnity) {
            this._units = "";
            return this._units;
          }

          var numUnits = stringifyUnits(this.numerator);
          var denUnits = stringifyUnits(this.denominator);
          this._units = numUnits + (denIsUnity ? "" : "/" + denUnits);
          return this._units;
        },

        /**
         * Stringifies the quantity
         * Deprecation notice: only units parameter is supported.
         *
         * @param {(number|string|Qty)} targetUnitsOrMaxDecimalsOrPrec -
         *                              target units if string,
         *                              max number of decimals if number,
         *                              passed to #toPrec before converting if Qty
         *
         * @param {number=} maxDecimals - Maximum number of decimals of
         *                                formatted output
         *
         * @returns {string} reparseable quantity as string
         */
        toString: function (targetUnitsOrMaxDecimalsOrPrec, maxDecimals) {
          var targetUnits;

          if (isNumber(targetUnitsOrMaxDecimalsOrPrec)) {
            targetUnits = this.units();
            maxDecimals = targetUnitsOrMaxDecimalsOrPrec;
          } else if (isString(targetUnitsOrMaxDecimalsOrPrec)) {
            targetUnits = targetUnitsOrMaxDecimalsOrPrec;
          } else if (isQty(targetUnitsOrMaxDecimalsOrPrec)) {
            return this.toPrec(targetUnitsOrMaxDecimalsOrPrec).toString(maxDecimals);
          }

          var out = this.to(targetUnits);
          var outScalar = maxDecimals !== undefined ? round(out.scalar, maxDecimals) : out.scalar;
          out = (outScalar + " " + out.units()).trim();
          return out;
        },

        /**
         * Format the quantity according to optional passed target units
         * and formatter
         *
         * @param {string} [targetUnits=current units] -
         *                 optional units to convert to before formatting
         *
         * @param {function} [formatter=Qty.formatter] -
         *                   delegates formatting to formatter callback.
         *                   formatter is called back with two parameters (scalar, units)
         *                   and should return formatted result.
         *                   If unspecified, formatting is delegated to default formatter
         *                   set to Qty.formatter
         *
         * @example
         * var roundingAndLocalizingFormatter = function(scalar, units) {
         *   // localize or limit scalar to n max decimals for instance
         *   // return formatted result
         * };
         * var qty = Qty('1.1234 m');
         * qty.format(); // same units, default formatter => "1.234 m"
         * qty.format("cm"); // converted to "cm", default formatter => "123.45 cm"
         * qty.format(roundingAndLocalizingFormatter); // same units, custom formatter => "1,2 m"
         * qty.format("cm", roundingAndLocalizingFormatter); // convert to "cm", custom formatter => "123,4 cm"
         *
         * @returns {string} quantity as string
         */
        format: function (targetUnits, formatter) {
          if (arguments.length === 1) {
            if (typeof targetUnits === "function") {
              formatter = targetUnits;
              targetUnits = undefined;
            }
          }

          formatter = formatter || Qty.formatter;
          var targetQty = this.to(targetUnits);
          return formatter.call(this, targetQty.scalar, targetQty.units());
        }
      });
      var stringifiedUnitsCache = new NestedMap();
      /**
       * Returns a string representing a normalized unit array
       *
       * @param {string[]} units Normalized unit array
       * @returns {string} String representing passed normalized unit array and
       *   suitable for output
       *
       */

      function stringifyUnits(units) {
        var stringified = stringifiedUnitsCache.get(units);

        if (stringified) {
          return stringified;
        }

        var isUnity = compareArray(units, UNITY_ARRAY);

        if (isUnity) {
          stringified = "1";
        } else {
          stringified = simplify(getOutputNames(units)).join("*");
        } // Cache result


        stringifiedUnitsCache.set(units, stringified);
        return stringified;
      }

      function getOutputNames(units) {
        var unitNames = [],
            token,
            tokenNext;

        for (var i = 0; i < units.length; i++) {
          token = units[i];
          tokenNext = units[i + 1];

          if (PREFIX_VALUES[token]) {
            unitNames.push(OUTPUT_MAP[token] + OUTPUT_MAP[tokenNext]);
            i++;
          } else {
            unitNames.push(OUTPUT_MAP[token]);
          }
        }

        return unitNames;
      }

      function simplify(units) {
        // this turns ['s','m','s'] into ['s2','m']
        var unitCounts = units.reduce(function (acc, unit) {
          var unitCounter = acc[unit];

          if (!unitCounter) {
            acc.push(unitCounter = acc[unit] = [unit, 0]);
          }

          unitCounter[1]++;
          return acc;
        }, []);
        return unitCounts.map(function (unitCount) {
          return unitCount[0] + (unitCount[1] > 1 ? unitCount[1] : "");
        });
      }

      Qty.version = "1.7.6";
      return Qty;
    });
  });

  function convertUnit(array, fromUnit, toUnit) {
    fromUnit = normalize(fromUnit);
    toUnit = normalize(toUnit);
    if (fromUnit === toUnit) return array;

    try {
      const convert = quantities.swiftConverter(fromUnit, toUnit); // Configures converter

      return convert(array);
    } catch (e) {
      return undefined;
    }
  }

  function normalize(unit) {
    unit = unit.replace(/°C/g, 'tempC');
    unit = unit.replace(/°F/g, 'tempF');
    unit = unit.replace(/(^|\W)K(\W|$)/g, '$1tempK$2');
    return unit;
  }

  const testRegExp = /^\/((?:\\\/|[^/])+)\/([migyu]{0,5})?$/;
  function ensureRegexp(string) {
    const parts = testRegExp.exec(string);

    if (parts) {
      try {
        return new RegExp(parts[1], parts[2]);
      } catch (err) {
        return stringToRegexp(string);
      }
    } else {
      return stringToRegexp(string);
    }
  }

  function stringToRegexp(string, flags = 'i') {
    return new RegExp(string.replace(/[[\]\\{}()+*?.$^|]/g, function (match) {
      return `\\${match}`;
    }), flags);
  }

  function getConvertedVariable(variable, newUnits) {
    const data = variable.units !== undefined && variable.units !== newUnits // would be nice if convertUnit would allow typedArray
    ? convertUnit(Array.from(variable.data), variable.units, newUnits) : variable.data;
    return {
      units: newUnits,
      label: variable.label.replace(`[${variable.units || ''}]`, `[${newUnits}]`),
      data: data || [],
      min: data ? min(data) : undefined,
      max: data ? max(data) : undefined,
      isMonotone: xIsMonotone(data)
    };
  }

  /**
   * Retrieve the spectrum with only X/Y data that match all the selectors
   * If more than one variable match the selector the 'x' or 'y' variable will be
   * taken
   */

  function getXYSpectrum(spectra = [], selector = {}) {
    if (spectra.length < 1) return;

    for (let spectrum of spectra) {
      let variableNames = Object.keys(spectrum.variables);
      if (!(variableNames.length > 1)) continue;
      let {
        dataType,
        title,
        xUnits,
        yUnits,
        variables,
        xVariable = 'x',
        yVariable = 'y',
        units,
        labels,
        xLabel,
        yLabel,
        meta
      } = selector; // we filter on general spectrum information

      if (dataType) {
        dataType = ensureRegexp(dataType);
        if (!spectrum.dataType || !spectrum.dataType.match(dataType)) continue;
      }

      if (title) {
        title = ensureRegexp(title);
        if (!spectrum.title || !spectrum.title.match(title)) continue;
      }

      if (meta && typeof meta === 'object') {
        if (!spectrum.meta) continue;

        for (let key in spectrum.meta) {
          if (!spectrum.meta[key]) continue;
          let value = ensureRegexp(spectrum.meta[key]);
          if (!spectrum.meta[key].match(value)) continue;
        }
      }

      if (units && !xUnits && !yUnits) [yUnits, xUnits] = units.split(/\s*vs\s*/);

      if (labels && !xLabel && !yLabel) {
        [yLabel, xLabel] = labels.split(/\s*vs\s*/);
      }

      if (variables) [yVariable, xVariable] = variables.split(/\s*vs\s*/);
      if (xLabel) xLabel = ensureRegexp(xLabel);
      if (yLabel) yLabel = ensureRegexp(yLabel);
      let x = getPossibleVariable(spectrum.variables, {
        units: xUnits,
        label: xLabel,
        variableName: xVariable
      });
      let y = getPossibleVariable(spectrum.variables, {
        units: yUnits,
        label: yLabel,
        variableName: yVariable
      });

      if (x && y) {
        return {
          title: spectrum.title,
          dataType: spectrum.dataType,
          meta: spectrum.meta,
          variables: {
            x,
            y
          }
        };
      }
    }

    return;
  }

  function getPossibleVariable(variables, selector = {}) {
    const {
      units,
      label,
      variableName
    } = selector;
    let possible = { ...variables
    };

    if (units !== undefined) {
      for (let key in possible) {
        let converted = convertUnit(1, variables[key].units || '', units);

        if (converted) {
          possible[key] = getConvertedVariable(variables[key], units);
        } else {
          possible[key] = undefined;
        }
      }
    }

    if (label !== undefined) {
      for (let key in possible) {
        if (!variables[key].label.match(label)) {
          possible[key] = undefined;
        }
      }
    }

    if (variableName !== undefined) {
      if (possible[variableName]) return possible[variableName];

      if (possible[variableName.toUpperCase()]) {
        return possible[variableName.toUpperCase()];
      }

      if (possible[variableName.toLowerCase()]) {
        return possible[variableName.toLowerCase()];
      }
    }

    const possibleFiltered = Object.values(possible).filter(val => val !== undefined);

    if (possibleFiltered.length > 0) {
      return possibleFiltered[0];
    }
  }

  /**
   * Class allowing to store and manipulate an analysis.
   * An analysis may contain one or more spectra that can be selected
   * based on their units
   */

  class Analysis {
    constructor(options = {}) {
      this.id = options.id || Math.random().toString(36).substring(2, 10);
      this.label = options.label || this.id;
      this.spectrumCallback = options.spectrumCallback;
      this.spectra = [];
      this.cache = {};
    }
    /**
     * Add a spectrum in the internal spectra variable
     */


    pushSpectrum(variables, options = {}) {
      this.spectra.push(standardizeData(variables, options, {
        spectrumCallback: this.spectrumCallback
      }));
      this.cache = {};
    }
    /**
     * Retrieve a Spectrum based on x/y units
     * @param selector.units Units separated by vs like for example "g vs °C"
     * @param selector.xUnits if undefined takes the first variable
     * @param selector.yUnits if undefined takes the second variable
     */


    getXYSpectrum(selector = {}) {
      let id = JSON.stringify(selector);

      if (!this.cache[id]) {
        this.cache[id] = getXYSpectrum(this.spectra, selector);
      }

      return this.cache[id];
    }
    /**
     * Retrieve a xy object
     * @param selector.units Units separated by vs like for example "g vs °C"
     * @param selector.xUnits if undefined takes the first variable
     * @param selector.yUnits if undefined takes the second variable
     */


    getXY(selector = {}) {
      let spectrum = this.getXYSpectrum(selector);
      if (!spectrum) return undefined;
      return {
        x: spectrum.variables.x.data,
        y: spectrum.variables.y.data
      };
    }
    /**
     * Return the data object for specific x/y units with possibly some
     * normalization options
     * @param options.selector.xUnits // if undefined takes the first variable
     * @param options.selector.yUnits // if undefined takes the second variable
     */


    getNormalizedSpectrum(options = {}) {
      const {
        normalization,
        selector
      } = options;
      const spectrum = this.getXYSpectrum(selector);
      if (!spectrum) return undefined;
      return getNormalizedSpectrum(spectrum, normalization);
    }
    /**
     * Returns the first spectrum. This method could be improved in the future
     * @returns
     */


    getSpectrum() {
      return this.spectra[0];
    }
    /**
     * Returns the xLabel
     * @param selector.xUnits // if undefined takes the first variable
     * @param selector.yUnits // if undefined takes the second variable
     */


    getXLabel(selector) {
      var _a;

      return (_a = this.getXYSpectrum(selector)) === null || _a === void 0 ? void 0 : _a.variables.x.label;
    }
    /**
     * Returns the yLabel
     * @param selector.xUnits // if undefined takes the first variable
     * @param selector.yUnits // if undefined takes the second variable
     */


    getYLabel(selector) {
      var _a;

      return (_a = this.getXYSpectrum(selector)) === null || _a === void 0 ? void 0 : _a.variables.y.label;
    }

  }
  /**
   * Internal function that ensure the order of x / y array
   */

  function standardizeData(variables, options, analysisOptions) {
    let {
      meta = {},
      tmp = {},
      dataType = '',
      title = ''
    } = options;
    const {
      spectrumCallback
    } = analysisOptions;

    if (spectrumCallback) {
      spectrumCallback(variables);
    }

    let xVariable = variables.x;
    let yVariable = variables.y;

    if (!xVariable || !yVariable) {
      throw Error('A spectrum must contain at least x and y variables');
    }

    if (!isAnyArray$1(xVariable.data) || !isAnyArray$1(yVariable.data)) {
      throw Error('x and y variables must contain an array data');
    }

    let x = xVariable.data;
    let reverse = x && x.length > 1 && x[0] > x[x.length - 1];

    for (let key in variables) {
      let variable = variables[key];
      if (reverse) variable.data = variable.data.reverse();
      variable.label = variable.label || key;
      variable.units = variable.units || variable.label.replace(/^.*[([](?<units>.*)[)\]].*$/, '$<units>');
      variable.min = min(variable.data);
      variable.max = max(variable.data);
      variable.isMonotone = xIsMonotone(variable.data);
    }

    return {
      variables,
      title,
      dataType,
      meta,
      tmp
    };
  }

  const GC_MS_FIELDS = ['TIC', '.RIC', 'SCANNUMBER'];
  function complexChromatogram(result) {
    let spectra = result.spectra;
    let length = spectra.length;
    let chromatogram = {
      times: new Array(length),
      series: {
        ms: {
          dimension: 2,
          data: new Array(length)
        }
      }
    };
    let existingGCMSFields = [];

    for (let i = 0; i < GC_MS_FIELDS.length; i++) {
      let label = convertMSFieldToLabel(GC_MS_FIELDS[i]);

      if (spectra[0][label]) {
        existingGCMSFields.push(label);
        chromatogram.series[label] = {
          dimension: 1,
          data: new Array(length)
        };
      }
    }

    for (let i = 0; i < length; i++) {
      let spectrum = spectra[i];
      chromatogram.times[i] = spectrum.pageValue;

      for (let j = 0; j < existingGCMSFields.length; j++) {
        chromatogram.series[existingGCMSFields[j]].data[i] = parseFloat(spectrum[existingGCMSFields[j]]);
      }

      if (spectrum.data) {
        chromatogram.series.ms.data[i] = [spectrum.data.x, spectrum.data.y];
      }
    }

    result.chromatogram = chromatogram;
  }
  function isMSField(canonicDataLabel) {
    return GC_MS_FIELDS.indexOf(canonicDataLabel) !== -1;
  }
  function convertMSFieldToLabel(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function convertToFloatArray(stringArray) {
    let floatArray = [];

    for (let i = 0; i < stringArray.length; i++) {
      floatArray.push(parseFloat(stringArray[i]));
    }

    return floatArray;
  }

  function fastParseXYData(spectrum, value) {
    // TODO need to deal with result
    //  console.log(value);
    // we check if deltaX is defined otherwise we calculate it
    let yFactor = spectrum.yFactor;
    let deltaX = spectrum.deltaX;
    spectrum.isXYdata = true;
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData;
    let currentX = spectrum.firstX;
    let currentY = spectrum.firstY; // we skip the first line
    //

    let endLine = false;
    let ascii;
    let i = 0;

    for (; i < value.length; i++) {
      ascii = value.charCodeAt(i);

      if (ascii === 13 || ascii === 10) {
        endLine = true;
      } else {
        if (endLine) break;
      }
    } // we proceed taking the i after the first line


    let newLine = true;
    let isDifference = false;
    let isLastDifference = false;
    let lastDifference = 0;
    let isDuplicate = false;
    let inComment = false;
    let currentValue = 0; // can be a difference or a duplicate

    let lastValue = 0; // must be the real last value

    let isNegative = false;
    let inValue = false;
    let skipFirstValue = false;
    let decimalPosition = 0;

    for (; i <= value.length; i++) {
      if (i === value.length) ascii = 13;else ascii = value.charCodeAt(i);

      if (inComment) {
        // we should ignore the text if we are after $$
        if (ascii === 13 || ascii === 10) {
          newLine = true;
          inComment = false;
        }
      } else {
        // when is it a new value ?
        // when it is not a digit, . or comma
        // it is a number that is either new or we continue
        if (ascii <= 57 && ascii >= 48) {
          // a number
          inValue = true;

          if (decimalPosition > 0) {
            currentValue += (ascii - 48) / Math.pow(10, decimalPosition++);
          } else {
            currentValue *= 10;
            currentValue += ascii - 48;
          }
        } else if (ascii === 44 || ascii === 46) {
          // a "," or "."
          inValue = true;
          decimalPosition++;
        } else {
          if (inValue) {
            // need to process the previous value
            if (newLine) {
              newLine = false; // we don't check the X value
              // console.log("NEW LINE",isDifference, lastDifference);
              // if new line and lastDifference, the first value is just a check !
              // that we don't check ...

              if (isLastDifference) skipFirstValue = true;
            } else {
              // need to deal with duplicate and differences
              if (skipFirstValue) {
                skipFirstValue = false;
              } else {
                if (isDifference) {
                  lastDifference = isNegative ? 0 - currentValue : currentValue;
                  isLastDifference = true;
                  isDifference = false;
                } else if (!isDuplicate) {
                  lastValue = isNegative ? 0 - currentValue : currentValue;
                }

                let duplicate = isDuplicate ? currentValue - 1 : 1;

                for (let j = 0; j < duplicate; j++) {
                  if (isLastDifference) {
                    currentY += lastDifference;
                  } else {
                    currentY = lastValue;
                  }

                  currentData.x.push(currentX);
                  currentData.y.push(currentY * yFactor);
                  currentX += deltaX;
                }
              }
            }

            isNegative = false;
            currentValue = 0;
            decimalPosition = 0;
            inValue = false;
            isDuplicate = false;
          } // positive SQZ digits @ A B C D E F G H I (ascii 64-73)


          if (ascii < 74 && ascii > 63) {
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 64;
          } else if (ascii > 96 && ascii < 106) {
            // negative SQZ digits a b c d e f g h i (ascii 97-105)
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 96;
            isNegative = true;
          } else if (ascii === 115) {
            // DUP digits S T U V W X Y Z s (ascii 83-90, 115)
            inValue = true;
            isDuplicate = true;
            currentValue = 9;
          } else if (ascii > 82 && ascii < 91) {
            inValue = true;
            isDuplicate = true;
            currentValue = ascii - 82;
          } else if (ascii > 73 && ascii < 83) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 73;
          } else if (ascii > 105 && ascii < 115) {
            // negative DIF digits j k l m n o p q r (ascii 106-114)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 105;
            isNegative = true;
          } else if (ascii === 36 && value.charCodeAt(i + 1) === 36) {
            // $ sign, we need to check the next one
            inValue = true;
            inComment = true;
          } else if (ascii === 37) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = 0;
            isNegative = false;
          } else if (ascii === 45) {
            // a "-"
            // check if after there is a number, decimal or comma
            let ascii2 = value.charCodeAt(i + 1);

            if (ascii2 >= 48 && ascii2 <= 57 || ascii2 === 44 || ascii2 === 46) {
              inValue = true;
              if (!newLine) isLastDifference = false;
              isNegative = true;
            }
          } else if (ascii === 13 || ascii === 10) {
            newLine = true;
            inComment = false;
          } // and now analyse the details ... space or tabulation
          // if "+" we just don't care

        }
      }
    }
  }

  const removeCommentRegExp = /\$\$.*/;
  const peakTableSplitRegExp = /[,\t ]+/;
  function parsePeakTable(spectrum, value, result) {
    spectrum.isPeaktable = true;

    if (!spectrum.variables || Object.keys(spectrum.variables) === 2) {
      parseXY(spectrum, value, result);
    } else {
      parseXYZ(spectrum, value, result);
    } // we will add the data in the variables


    if (spectrum.variables) {
      for (let key in spectrum.variables) {
        spectrum.variables[key].data = spectrum.data[key];
      }
    }
  }

  function parseXY(spectrum, value, result) {
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData; // counts for around 20% of the time

    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % 2 === 0) {
        for (let j = 0; j < values.length; j = j + 2) {
          // takes around 40% of the time to add and parse the 2 values nearly exclusively because of parseFloat
          currentData.x.push(parseFloat(values[j]) * spectrum.xFactor);
          currentData.y.push(parseFloat(values[j + 1]) * spectrum.yFactor);
        }
      } else {
        result.logs.push(`Format error: ${values}`);
      }
    }
  }

  function parseXYZ(spectrum, value, result) {
    let currentData = {};
    let variables = Object.keys(spectrum.variables);
    let numberOfVariables = variables.length;
    variables.forEach(variable => currentData[variable] = []);
    spectrum.data = currentData; // counts for around 20% of the time

    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % numberOfVariables === 0) {
        for (let j = 0; j < values.length; j++) {
          // todo should try to find a xFactor (y, ...)
          currentData[variables[j % numberOfVariables]].push(parseFloat(values[j]));
        }
      } else {
        result.logs.push(`Format error: ${values}`);
      }
    }
  }

  function parseXYA(spectrum, value) {
    let removeSymbolRegExp = /(\(+|\)+|<+|>+|\s+)/g;
    spectrum.isXYAdata = true;
    let values;
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData;
    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      values = lines[i].trim().replace(removeSymbolRegExp, '').split(',');
      currentData.x.push(parseFloat(values[0]));
      currentData.y.push(parseFloat(values[1]));
    }
  }

  function convertTo3DZ(spectra) {
    let minZ = spectra[0].data.y[0];
    let maxZ = minZ;
    let ySize = spectra.length;
    let xSize = spectra[0].data.x.length;
    let z = new Array(ySize);

    for (let i = 0; i < ySize; i++) {
      z[i] = spectra[i].data.y;

      for (let j = 0; j < xSize; j++) {
        let value = z[i][j];
        if (value < minZ) minZ = value;
        if (value > maxZ) maxZ = value;
      }
    }

    const firstX = spectra[0].data.x[0];
    const lastX = spectra[0].data.x[spectra[0].data.x.length - 1]; // has to be -2 because it is a 1D array [x,y,x,y,...]

    const firstY = spectra[0].pageValue;
    const lastY = spectra[ySize - 1].pageValue; // Because the min / max value are the only information about the matrix if we invert
    // min and max we need to invert the array

    if (firstX > lastX) {
      for (let spectrum of z) {
        spectrum.reverse();
      }
    }

    if (firstY > lastY) {
      z.reverse();
    }

    const medians = [];

    for (let i = 0; i < z.length; i++) {
      const row = Float64Array.from(z[i]);

      for (let i = 0; i < row.length; i++) {
        if (row[i] < 0) row[i] = -row[i];
      }

      medians.push(median(row));
    }

    const median$1 = median(medians);
    return {
      z: z,
      minX: Math.min(firstX, lastX),
      maxX: Math.max(firstX, lastX),
      minY: Math.min(firstY, lastY),
      maxY: Math.max(firstY, lastY),
      minZ: minZ,
      maxZ: maxZ,
      noise: median$1
    };
  }

  function generateContourLines(zData, options) {
    let noise = zData.noise;
    let z = zData.z;
    let povarHeight0, povarHeight1, povarHeight2, povarHeight3;
    let isOver0, isOver1, isOver2, isOver3;
    let nbSubSpectra = z.length;
    let nbPovars = z[0].length;
    let pAx, pAy, pBx, pBy;
    let x0 = zData.minX;
    let xN = zData.maxX;
    let dx = (xN - x0) / (nbPovars - 1);
    let y0 = zData.minY;
    let yN = zData.maxY;
    let dy = (yN - y0) / (nbSubSpectra - 1);
    let minZ = zData.minZ;
    let maxZ = zData.maxZ; // System.out.prvarln('y0 '+y0+' yN '+yN);
    // -------------------------
    // Povars attribution
    //
    // 0----1
    // |  / |
    // | /  |
    // 2----3
    //
    // ---------------------d------

    let iter = options.nbContourLevels * 2;
    let contourLevels = new Array(iter);
    let lineZValue;

    for (let level = 0; level < iter; level++) {
      // multiply by 2 for positif and negatif
      let contourLevel = {};
      contourLevels[level] = contourLevel;
      let side = level % 2;
      let factor = (maxZ - options.noiseMultiplier * noise) * Math.exp((level >> 1) - options.nbContourLevels);

      if (side === 0) {
        lineZValue = factor + options.noiseMultiplier * noise;
      } else {
        lineZValue = 0 - factor - options.noiseMultiplier * noise;
      }

      let lines = [];
      contourLevel.zValue = lineZValue;
      contourLevel.lines = lines;
      if (lineZValue <= minZ || lineZValue >= maxZ) continue;

      for (let iSubSpectra = 0; iSubSpectra < nbSubSpectra - 1; iSubSpectra++) {
        let subSpectra = z[iSubSpectra];
        let subSpectraAfter = z[iSubSpectra + 1];

        for (let povar = 0; povar < nbPovars - 1; povar++) {
          povarHeight0 = subSpectra[povar];
          povarHeight1 = subSpectra[povar + 1];
          povarHeight2 = subSpectraAfter[povar];
          povarHeight3 = subSpectraAfter[povar + 1];
          isOver0 = povarHeight0 > lineZValue;
          isOver1 = povarHeight1 > lineZValue;
          isOver2 = povarHeight2 > lineZValue;
          isOver3 = povarHeight3 > lineZValue; // Example povar0 is over the plane and povar1 and
          // povar2 are below, we find the varersections and add
          // the segment

          if (isOver0 !== isOver1 && isOver0 !== isOver2) {
            pAx = povar + (lineZValue - povarHeight0) / (povarHeight1 - povarHeight0);
            pAy = iSubSpectra;
            pBx = povar;
            pBy = iSubSpectra + (lineZValue - povarHeight0) / (povarHeight2 - povarHeight0);
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // remove push does not help !!!!


          if (isOver3 !== isOver1 && isOver3 !== isOver2) {
            pAx = povar + 1;
            pAy = iSubSpectra + 1 - (lineZValue - povarHeight3) / (povarHeight1 - povarHeight3);
            pBx = povar + 1 - (lineZValue - povarHeight3) / (povarHeight2 - povarHeight3);
            pBy = iSubSpectra + 1;
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // test around the diagonal


          if (isOver1 !== isOver2) {
            pAx = (povar + 1 - (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dx + x0;
            pAy = (iSubSpectra + (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dy + y0;

            if (isOver1 !== isOver0) {
              pBx = povar + 1 - (lineZValue - povarHeight1) / (povarHeight0 - povarHeight1);
              pBy = iSubSpectra;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver0) {
              pBx = povar;
              pBy = iSubSpectra + 1 - (lineZValue - povarHeight2) / (povarHeight0 - povarHeight2);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver1 !== isOver3) {
              pBx = povar + 1;
              pBy = iSubSpectra + (lineZValue - povarHeight1) / (povarHeight3 - povarHeight1);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver3) {
              pBx = povar + (lineZValue - povarHeight2) / (povarHeight3 - povarHeight2);
              pBy = iSubSpectra + 1;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }
          }
        }
      }
    }

    return {
      minX: zData.minX,
      maxX: zData.maxX,
      minY: zData.minY,
      maxY: zData.maxY,
      segments: contourLevels
    };
  }

  function add2D(result, options) {
    let zData = convertTo3DZ(result.spectra);

    if (!options.noContour) {
      result.contourLines = generateContourLines(zData, options);
      delete zData.z;
    }

    result.minMax = zData;
  }

  // sources:
  // https://en.wikipedia.org/wiki/Gyromagnetic_ratio
  // TODO: #13 can we have a better source and more digits ? @jwist
  const gyromagneticRatio = {
    '1H': 267.52218744e6,
    '2H': 41.065e6,
    '3H': 285.3508e6,
    '3He': -203.789e6,
    '7Li': 103.962e6,
    '13C': 67.28284e6,
    '14N': 19.331e6,
    '15N': -27.116e6,
    '17O': -36.264e6,
    '19F': 251.662e6,
    '23Na': 70.761e6,
    '27Al': 69.763e6,
    '29Si': -53.19e6,
    '31P': 108.291e6,
    '57Fe': 8.681e6,
    '63Cu': 71.118e6,
    '67Zn': 16.767e6,
    '129Xe': -73.997e6
  };

  function postProcessingNMR(entriesFlat) {
    // specific NMR functions
    let observeFrequency = 0;
    let shiftOffsetVal = 0;

    for (let entry of entriesFlat) {
      for (let spectrum of entry.spectra) {
        if (entry.ntuples && entry.ntuples.symbol) {
          if (!observeFrequency && spectrum.observeFrequency) {
            observeFrequency = spectrum.observeFrequency;
          }

          if (!shiftOffsetVal && spectrum.shiftOffsetVal) {
            shiftOffsetVal = spectrum.shiftOffsetVal;
          }
        } else {
          observeFrequency = spectrum.observeFrequency;
          shiftOffsetVal = spectrum.shiftOffsetVal;
        }

        if (observeFrequency) {
          if (spectrum.xUnits && spectrum.xUnits.toUpperCase().includes('HZ')) {
            spectrum.xUnits = 'PPM';
            spectrum.xFactor = spectrum.xFactor / observeFrequency;
            spectrum.firstX = spectrum.firstX / observeFrequency;
            spectrum.lastX = spectrum.lastX / observeFrequency;
            spectrum.deltaX = spectrum.deltaX / observeFrequency;

            for (let i = 0; i < spectrum.data.x.length; i++) {
              spectrum.data.x[i] /= observeFrequency;
            }
          }
        }

        if (shiftOffsetVal) {
          let shift = spectrum.firstX - shiftOffsetVal;
          spectrum.firstX = spectrum.firstX - shift;
          spectrum.lastX = spectrum.lastX - shift;

          for (let i = 0; i < spectrum.data.x.length; i++) {
            spectrum.data.x[i] -= shift;
          }
        } // we will check if some nucleus are missing ...


        if (entry.ntuples && entry.ntuples.nucleus && entry.ntuples.symbol) {
          for (let i = 0; i < entry.ntuples.nucleus.length; i++) {
            let symbol = entry.ntuples.symbol[i];
            let nucleus = entry.ntuples.nucleus[i];

            if (symbol.startsWith('F') && !nucleus) {
              if (symbol === 'F1') entry.ntuples.nucleus[i] = entry.tmp.$NUC2;
              if (symbol === 'F2') entry.ntuples.nucleus[i] = entry.tmp.$NUC1;
            }

            if (symbol === 'F2') {
              entry.yType = entry.ntuples.nucleus[0];
            }
          }
        }

        if (observeFrequency && entry.ntuples && entry.ntuples.symbol && entry.ntuples.nucleus) {
          let unit = '';
          let pageSymbolIndex = entry.ntuples.symbol.indexOf(spectrum.pageSymbol);

          if (entry.ntuples.units && entry.ntuples.units[pageSymbolIndex]) {
            unit = entry.ntuples.units[pageSymbolIndex];
          }

          if (unit !== 'PPM') {
            if (pageSymbolIndex !== 0) {
              throw Error('Not sure about this ntuples format');
            }

            let ratio0 = gyromagneticRatio[entry.ntuples.nucleus[0]];
            let ratio1 = gyromagneticRatio[entry.ntuples.nucleus[1]];

            if (!ratio0 || !ratio1) {
              throw Error('Problem with determination of gyromagnetic ratio');
            }

            let ratio = ratio0 / ratio1 * observeFrequency;
            spectrum.pageValue /= ratio;
          }
        }
      }
    }
  }

  function profiling(result, action, options) {
    if (result.profiling) {
      result.profiling.push({
        action,
        time: Date.now() - options.start
      });
    }
  }

  function simpleChromatogram(result) {
    let data = result.spectra[0].data;
    result.chromatogram = {
      times: data.x.slice(),
      series: {
        intensity: {
          dimension: 1,
          data: data.y.slice()
        }
      }
    };
  }

  function postProcessing(entriesFlat, result, options) {
    // converting Hz to ppm
    postProcessingNMR(entriesFlat);

    for (let entry of entriesFlat) {
      if (Object.keys(entry.ntuples).length > 0) {
        let newNtuples = [];
        let keys = Object.keys(entry.ntuples);

        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          let values = entry.ntuples[key];

          for (let j = 0; j < values.length; j++) {
            if (!newNtuples[j]) newNtuples[j] = {};
            newNtuples[j][key] = values[j];
          }
        }

        entry.ntuples = newNtuples;
      }

      if (entry.twoD && options.wantXY) {
        add2D(entry, options);
        profiling(result, 'Finished countour plot calculation', options);

        if (!options.keepSpectra) {
          delete entry.spectra;
        }
      } // maybe it is a GC (HPLC) / MS. In this case we add a new format


      if (options.chromatogram) {
        if (entry.spectra.length > 1) {
          complexChromatogram(entry);
        } else {
          simpleChromatogram(entry);
        }

        profiling(result, 'Finished chromatogram calculation', options);
      }

      delete entry.tmp;
    }
  }

  function prepareNtuplesDatatable(currentEntry, spectrum, kind) {
    let xIndex = -1;
    let yIndex = -1;
    let firstVariable = '';
    let secondVariable = '';

    if (kind.indexOf('++') > 0) {
      firstVariable = kind.replace(/.*\(([a-zA-Z0-9]+)\+\+.*/, '$1');
      secondVariable = kind.replace(/.*\.\.([a-zA-Z0-9]+).*/, '$1');
    } else {
      kind = kind.replace(/[^a-zA-Z]/g, '');
      firstVariable = kind.charAt(0);
      secondVariable = kind.charAt(1);
      spectrum.variables = {};

      for (let symbol of kind) {
        let lowerCaseSymbol = symbol.toLowerCase();
        let index = currentEntry.ntuples.symbol.indexOf(symbol);
        if (index === -1) throw Error(`Symbol undefined: ${symbol}`);
        spectrum.variables[lowerCaseSymbol] = {};

        for (let key in currentEntry.ntuples) {
          if (currentEntry.ntuples[key][index]) {
            spectrum.variables[lowerCaseSymbol][key.replace(/^var/, '')] = currentEntry.ntuples[key][index];
          }
        }
      }
    }

    xIndex = currentEntry.ntuples.symbol.indexOf(firstVariable);
    yIndex = currentEntry.ntuples.symbol.indexOf(secondVariable);
    if (xIndex === -1) xIndex = 0;
    if (yIndex === -1) yIndex = 0;

    if (currentEntry.ntuples.first) {
      if (currentEntry.ntuples.first.length > xIndex) {
        spectrum.firstX = currentEntry.ntuples.first[xIndex];
      }

      if (currentEntry.ntuples.first.length > yIndex) {
        spectrum.firstY = currentEntry.ntuples.first[yIndex];
      }
    }

    if (currentEntry.ntuples.last) {
      if (currentEntry.ntuples.last.length > xIndex) {
        spectrum.lastX = currentEntry.ntuples.last[xIndex];
      }

      if (currentEntry.ntuples.last.length > yIndex) {
        spectrum.lastY = currentEntry.ntuples.last[yIndex];
      }
    }

    if (currentEntry.ntuples.vardim && currentEntry.ntuples.vardim.length > xIndex) {
      spectrum.nbPoints = currentEntry.ntuples.vardim[xIndex];
    }

    if (currentEntry.ntuples.factor) {
      if (currentEntry.ntuples.factor.length > xIndex) {
        spectrum.xFactor = currentEntry.ntuples.factor[xIndex];
      }

      if (currentEntry.ntuples.factor.length > yIndex) {
        spectrum.yFactor = currentEntry.ntuples.factor[yIndex];
      }
    }

    if (currentEntry.ntuples.units) {
      if (currentEntry.ntuples.units.length > xIndex) {
        if (currentEntry.ntuples.varname && currentEntry.ntuples.varname[xIndex]) {
          spectrum.xUnits = `${currentEntry.ntuples.varname[xIndex]} [${currentEntry.ntuples.units[xIndex]}]`;
        } else {
          spectrum.xUnits = currentEntry.ntuples.units[xIndex];
        }
      }

      if (currentEntry.ntuples.units.length > yIndex) {
        if (currentEntry.ntuples.varname && currentEntry.ntuples.varname[yIndex]) {
          spectrum.yUnits = `${currentEntry.ntuples.varname[yIndex]} [${currentEntry.ntuples.units[yIndex]}]`;
        } else {
          spectrum.yUnits = currentEntry.ntuples.units[yIndex];
        }
      }
    }
  }

  function prepareSpectrum(spectrum) {
    if (!spectrum.xFactor) spectrum.xFactor = 1;
    if (!spectrum.yFactor) spectrum.yFactor = 1;
  }

  const ntuplesSeparatorRegExp = /[ \t]*,[ \t]*/;
  const numberRegExp = /^[-+]?[0-9]*\.?[0-9]+(e[-+]?[0-9]+)?$/;

  class Spectrum {}

  const defaultOptions$3 = {
    keepRecordsRegExp: /^$/,
    canonicDataLabels: true,
    canonicMetadataLabels: false,
    dynamicTyping: true,
    withoutXY: false,
    chromatogram: false,
    keepSpectra: false,
    noContour: false,
    nbContourLevels: 7,
    noiseMultiplier: 5,
    profiling: false
  };
  /**
   *
   * @param {text} jcamp
   * @param {object} [options]
   * @param {number} [options.keepRecordsRegExp=/^$/] By default we don't keep meta information
   * @param {number} [options.canonicDataLabels=true] Canonize the Labels (uppercase without symbol)
   * @param {number} [options.canonicMetadataLabels=false] Canonize the metadata Labels (uppercase without symbol)
   * @param {number} [options.dynamicTyping=false] Convert numbers to Number
   * @param {number} [options.withoutXY=false] Remove the XY data
   * @param {number} [options.chromatogram=false] Special post-processing for GC / HPLC / MS
   * @param {number} [options.keepSpectra=false] Force to keep the spectra in case of 2D
   * @param {number} [options.noContour=false] Don't calculate countour in case of 2D
   * @param {number} [options.nbContourLevels=7] Number of positive / negative contour levels to calculate
   * @param {number} [options.noiseMultiplier=5] Define for 2D the level as 5 times the median as default
   * @param {number} [options.profiling=false] Add profiling information
   */

  function convert(jcamp, options = {}) {
    options = Object.assign({}, defaultOptions$3, options);
    options.wantXY = !options.withoutXY;
    options.start = Date.now();
    let entriesFlat = [];
    let result = {
      profiling: options.profiling ? [] : false,
      logs: [],
      entries: []
    };
    let tmpResult = {
      children: []
    };
    let currentEntry = tmpResult;
    let parentsStack = [];
    let spectrum = new Spectrum();

    if (typeof jcamp !== 'string') {
      throw new TypeError('the JCAMP should be a string');
    }

    profiling(result, 'Before split to LDRS', options);
    let ldrs = jcamp.replace(/[\r\n]+##/g, '\n##').split('\n##');
    profiling(result, 'Split to LDRS', options);
    if (ldrs[0]) ldrs[0] = ldrs[0].replace(/^[\r\n ]*##/, '');

    for (let ldr of ldrs) {
      // This is a new LDR
      let position = ldr.indexOf('=');
      let dataLabel = position > 0 ? ldr.substring(0, position) : ldr;
      let dataValue = position > 0 ? ldr.substring(position + 1).trim() : '';
      let canonicDataLabel = dataLabel.replace(/[_ -]/g, '').toUpperCase();

      if (canonicDataLabel === 'DATATABLE') {
        let endLine = dataValue.indexOf('\n');
        if (endLine === -1) endLine = dataValue.indexOf('\r');

        if (endLine > 0) {
          // ##DATA TABLE= (X++(I..I)), XYDATA
          // We need to find the variables
          let infos = dataValue.substring(0, endLine).split(/[ ,;\t]+/);
          prepareNtuplesDatatable(currentEntry, spectrum, infos[0]);
          spectrum.datatable = infos[0];

          if (infos[1] && infos[1].indexOf('PEAKS') > -1) {
            canonicDataLabel = 'PEAKTABLE';
          } else if (infos[1] && (infos[1].indexOf('XYDATA') || infos[0].indexOf('++') > 0)) {
            canonicDataLabel = 'XYDATA';
            spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
          }
        }
      }

      if (canonicDataLabel === 'XYDATA') {
        if (options.wantXY) {
          prepareSpectrum(spectrum); // well apparently we should still consider it is a PEAK TABLE if there are no '++' after

          if (dataValue.match(/.*\+\+.*/)) {
            // ex: (X++(Y..Y))
            spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
            fastParseXYData(spectrum, dataValue);
          } else {
            parsePeakTable(spectrum, dataValue, result);
          }

          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      } else if (canonicDataLabel === 'PEAKTABLE') {
        if (options.wantXY) {
          prepareSpectrum(spectrum);
          parsePeakTable(spectrum, dataValue, result);
          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (canonicDataLabel === 'PEAKASSIGNMENTS') {
        if (options.wantXY) {
          if (dataValue.match(/.*(XYA).*/)) {
            // ex: (XYA)
            parseXYA(spectrum, dataValue);
          }

          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (canonicDataLabel === 'TITLE') {
        let parentEntry = currentEntry;

        if (!parentEntry.children) {
          parentEntry.children = [];
        }

        currentEntry = {
          spectra: [],
          ntuples: {},
          info: {},
          meta: {},
          tmp: {} // tmp information we need to keep for postprocessing

        };
        parentEntry.children.push(currentEntry);
        parentsStack.push(parentEntry);
        entriesFlat.push(currentEntry);
        currentEntry.title = dataValue;
      } else if (canonicDataLabel === 'DATATYPE') {
        currentEntry.dataType = dataValue;

        if (dataValue.toLowerCase().indexOf('nd') > -1) {
          currentEntry.twoD = true;
        }
      } else if (canonicDataLabel === 'NTUPLES') {
        if (dataValue.toLowerCase().indexOf('nd') > -1) {
          currentEntry.twoD = true;
        }
      } else if (canonicDataLabel === 'DATACLASS') {
        currentEntry.dataClass = dataValue;
      } else if (canonicDataLabel === 'XUNITS') {
        spectrum.xUnits = dataValue;
      } else if (canonicDataLabel === 'YUNITS') {
        spectrum.yUnits = dataValue;
      } else if (canonicDataLabel === 'FIRSTX') {
        spectrum.firstX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'LASTX') {
        spectrum.lastX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'FIRSTY') {
        spectrum.firstY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'LASTY') {
        spectrum.lastY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'NPOINTS') {
        spectrum.nbPoints = parseFloat(dataValue);
      } else if (canonicDataLabel === 'XFACTOR') {
        spectrum.xFactor = parseFloat(dataValue);
      } else if (canonicDataLabel === 'YFACTOR') {
        spectrum.yFactor = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MAXX') {
        spectrum.maxX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MINX') {
        spectrum.minX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MAXY') {
        spectrum.maxY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MINY') {
        spectrum.minY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'DELTAX') {
        spectrum.deltaX = parseFloat(dataValue);
      } else if (canonicDataLabel === '.OBSERVEFREQUENCY' || canonicDataLabel === '$SFO1') {
        if (!spectrum.observeFrequency) {
          spectrum.observeFrequency = parseFloat(dataValue);
        }
      } else if (canonicDataLabel === '.OBSERVENUCLEUS') {
        if (!spectrum.xType) {
          currentEntry.xType = dataValue.replace(/[^a-zA-Z0-9]/g, '');
        }
      } else if (canonicDataLabel === '$OFFSET') {
        // OFFSET for Bruker spectra
        currentEntry.shiftOffsetNum = 0;

        if (!spectrum.shiftOffsetVal) {
          spectrum.shiftOffsetVal = parseFloat(dataValue);
        }
      } else if (canonicDataLabel === '$REFERENCEPOINT') ; else if (canonicDataLabel === 'VARNAME') {
        currentEntry.ntuples.varname = dataValue.split(ntuplesSeparatorRegExp);
      } else if (canonicDataLabel === 'SYMBOL') {
        currentEntry.ntuples.symbol = dataValue.split(ntuplesSeparatorRegExp);
      } else if (canonicDataLabel === 'VARTYPE') {
        currentEntry.ntuples.vartype = dataValue.split(ntuplesSeparatorRegExp);
      } else if (canonicDataLabel === 'VARFORM') {
        currentEntry.ntuples.varform = dataValue.split(ntuplesSeparatorRegExp);
      } else if (canonicDataLabel === 'VARDIM') {
        currentEntry.ntuples.vardim = convertToFloatArray(dataValue.split(ntuplesSeparatorRegExp));
      } else if (canonicDataLabel === 'UNITS') {
        currentEntry.ntuples.units = dataValue.split(ntuplesSeparatorRegExp);
      } else if (canonicDataLabel === 'FACTOR') {
        currentEntry.ntuples.factor = convertToFloatArray(dataValue.split(ntuplesSeparatorRegExp));
      } else if (canonicDataLabel === 'FIRST') {
        currentEntry.ntuples.first = convertToFloatArray(dataValue.split(ntuplesSeparatorRegExp));
      } else if (canonicDataLabel === 'LAST') {
        currentEntry.ntuples.last = convertToFloatArray(dataValue.split(ntuplesSeparatorRegExp));
      } else if (canonicDataLabel === 'MIN') {
        currentEntry.ntuples.min = convertToFloatArray(dataValue.split(ntuplesSeparatorRegExp));
      } else if (canonicDataLabel === 'MAX') {
        currentEntry.ntuples.max = convertToFloatArray(dataValue.split(ntuplesSeparatorRegExp));
      } else if (canonicDataLabel === '.NUCLEUS') {
        if (currentEntry.ntuples) {
          currentEntry.ntuples.nucleus = dataValue.split(ntuplesSeparatorRegExp);
        }
      } else if (canonicDataLabel === 'PAGE') {
        spectrum.page = dataValue.trim();
        spectrum.pageValue = parseFloat(dataValue.replace(/^.*=/, ''));
        spectrum.pageSymbol = spectrum.page.replace(/[=].*/, '');
      } else if (canonicDataLabel === 'RETENTIONTIME') {
        spectrum.pageValue = parseFloat(dataValue);
      } else if (isMSField(canonicDataLabel)) {
        spectrum[convertMSFieldToLabel(canonicDataLabel)] = dataValue;
      } else if (canonicDataLabel === 'SAMPLEDESCRIPTION') {
        spectrum.sampleDescription = dataValue;
      } else if (canonicDataLabel.startsWith('$NUC')) {
        if (!currentEntry.tmp[canonicDataLabel] && !dataValue.includes('off')) {
          currentEntry.tmp[canonicDataLabel] = dataValue.replace(/[<>]/g, '');
        }
      } else if (canonicDataLabel === 'END') {
        currentEntry = parentsStack.pop();
      }

      if (currentEntry && currentEntry.info && currentEntry.meta && canonicDataLabel.match(options.keepRecordsRegExp)) {
        let value = dataValue.trim();
        let target, label;

        if (dataLabel.startsWith('$')) {
          label = options.canonicMetadataLabels ? canonicDataLabel.substring(1) : dataLabel.substring(1);
          target = currentEntry.meta;
        } else {
          label = options.canonicDataLabels ? canonicDataLabel : dataLabel;
          target = currentEntry.info;
        }

        if (options.dynamicTyping) {
          if (value.match(numberRegExp)) {
            value = Number.parseFloat(value);
          }
        }

        if (target[label]) {
          if (!Array.isArray(target[label])) {
            target[label] = [target[label]];
          }

          target[label].push(value);
        } else {
          target[label] = value;
        }
      }
    }

    profiling(result, 'Finished parsing', options);
    postProcessing(entriesFlat, result, options);
    profiling(result, 'Total time', options);
    /*
    if (result.children && result.children.length>0) {
      result = { ...result, ...result.children[0] };
    }
    */

    result.entries = tmpResult.children;
    result.flatten = entriesFlat;
    return result;
  }

  /**
   * Creates a new Analysis from a JCAMP string
   * @param {string} jcamp - String containing the JCAMP data
   * @param {object} [options={}]
   * @param {object} [options.id=Math.random()]
   * @param {string} [options.label=options.id] human redeable label
   * @param {string} [options.spectrumCallback] a callback to apply on variables when creating spectrum
   * @return {Analysis} - New class element with the given data
   */

  function fromJcamp(jcamp, options = {}) {
    let analysis = new Analysis(options);
    addJcamp(analysis, jcamp);
    return analysis;
  }

  function addJcamp(analysis, jcamp) {
    let converted = convert(jcamp, {
      keepRecordsRegExp: /.*/
    });

    for (let entry of converted.flatten) {
      let currentSpectrum = entry.spectra[0]; // we ensure variables

      if (!currentSpectrum.variables) {
        const variables = {};
        currentSpectrum.variables = variables;
        variables.x = {
          label: currentSpectrum.xUnits,
          symbol: 'X',
          data: currentSpectrum.data.x || currentSpectrum.data.X
        };
        variables.y = {
          label: currentSpectrum.yUnits,
          symbol: 'Y',
          data: currentSpectrum.data.y || currentSpectrum.data.Y
        };
      } else {
        for (let key in currentSpectrum.variables) {
          const variable = currentSpectrum.variables[key];
          if (variable.label) continue;
          variable.label = variable.name || variable.symbol || key;

          if (variable.units && !variable.label.includes(variable.units)) {
            variable.label += ` [${variable.units}]`;
          }
        }
      }

      analysis.pushSpectrum(currentSpectrum.variables, {
        dataType: entry.dataType,
        title: entry.title,
        meta: entry.meta
      });
    }
  }

  /**
   * Parse from a xyxy data array
   * @param {Array<Array<number>>} variables
   * @param {object} [meta] - same metadata object format that the fromText
   * @return {string} JCAMP of the input
   */

  function creatorNtuples(variables, options) {
    const {
      meta = {},
      info = {}
    } = options;
    const {
      title = '',
      owner = '',
      origin = '',
      dataType = ''
    } = info;
    const symbol = [];
    const varName = [];
    const varType = [];
    const varDim = [];
    const units = [];
    const first = [];
    const last = [];
    const min$1 = [];
    const max$1 = [];
    const keys = Object.keys(variables);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let variable = variables[key];
      let name = variable.label && variable.label.replace(/ *\[.*/, '');
      let unit = variable.label && variable.label.replace(/.*\[(.*)\].*/, '$1');
      symbol.push(variable.symbol || key);
      varName.push(variable.name || name || key);
      varDim.push(variables[key].data.length);
      varType.push(variable.type ? variable.type.toUpperCase() : i === 0 ? 'INDEPENDENT' : 'DEPENDENT');
      units.push(variable.units || unit || '');
      first.push(variables[key][0]);
      last.push(variables[key][variables[key].length - 1]);
      min$1.push(min(variables[key].data));
      max$1.push(max(variables[key].data));
    }

    let header = `##TITLE=${title}
##JCAMP-DX=6.00
##DATA TYPE=${dataType}
##ORIGIN=${origin}
##OWNER=${owner}\n`;

    for (const key of Object.keys(meta)) {
      header += `##$${key}=${meta[key]}\n`;
    }

    header += `##NTUPLES= ${dataType}
##VAR_NAME=  ${varName.join()}
##SYMBOL=    ${symbol.join()}
##VAR_TYPE=  ${varType.join()}
##VAR_DIM=   ${varDim.join()}
##UNITS=     ${units.join()}
##PAGE= N=1\n`;
    header += `##DATA TABLE= (${symbol.join('')}..${symbol.join('')}), PEAKS\n`;

    for (let i = 0; i < variables[keys[0]].data.length; i++) {
      let point = [];

      for (let key of keys) {
        point.push(variables[key].data[i]);
      }

      header += `${point.join('\t')}\n`;
    }

    header += '##END';
    return header;
  }

  /**
   * Create a jcamp
   * @param {object} data - object of array
   * @param {object} [options={}] - metadata object
   * @param {string} [options.info={}] - metadata of the file
   * @param {string} [options.info.title = ''] - title of the file
   * @param {string} [options.info.owner = ''] - owner of the file
   * @param {string} [options.info.origin = ''] - origin of the file
   * @param {string} [options.info.dataType = ''] - type of data
   * @param {string} [options.info.xUnits = ''] - units for the x axis for variables===undefined
   * @param {string} [options.info.yUnits = ''] - units for the y axis for variables===undefined
   * @param {object} [options.meta = {}] - comments to add to the file

   * @return {string} JCAMP of the input
   */
  function fromJSON(data, options = {}) {
    const {
      meta = {},
      info = {}
    } = options;
    const {
      title = '',
      owner = '',
      origin = '',
      dataType = '',
      xUnits = '',
      yUnits = ''
    } = info;
    let firstX = Number.POSITIVE_INFINITY;
    let lastX = Number.NEGATIVE_INFINITY;
    let firstY = Number.POSITIVE_INFINITY;
    let lastY = Number.NEGATIVE_INFINITY;
    let points = [];

    for (let i = 0; i < data.x.length; i++) {
      let x = data.x[i];
      let y = data.y[i];

      if (firstX > x) {
        firstX = x;
      }

      if (lastX < x) {
        lastX = x;
      }

      if (firstY > y) {
        firstY = y;
      }

      if (lastY < y) {
        lastY = y;
      }

      points.push(`${x} ${y}`);
    }

    let header = `##TITLE=${title}
##JCAMP-DX=4.24
##DATA TYPE=${dataType}
##ORIGIN=${origin}
##OWNER=${owner}
##XUNITS=${xUnits}
##YUNITS=${yUnits}
##FIRSTX=${firstX}
##LASTX=${lastX}
##FIRSTY=${firstY}
##LASTY=${lastY}\n`;

    for (const key of Object.keys(meta)) {
      header += `##$${key}=${meta[key]}\n`;
    } // we leave the header and utf8 fonts ${header.replace(/[^\t\r\n\x20-\x7F]/g, '')


    return `${header}##NPOINTS=${points.length}
##PEAK TABLE=(XY..XY)
${points.join('\n')}
##END`;
  }

  /**
   * Create a jcamp from variables
   * @param {Array<Variable} [variables={}] - object of variables
   * @param {string} [options.info={}] - metadata of the file
   * @param {string} [options.info.title = ''] - title of the file
   * @param {string} [options.info.owner = ''] - owner of the file
   * @param {string} [options.info.origin = ''] - origin of the file
   * @param {string} [options.info.dataType = ''] - type of data
   * @param {object} [options.meta = {}] - comments to add to the file
   * @param {object} [options.forceNtuples = false] - force the ntuples format even if there is only x and y variables
   */

  function fromVariables(variables = {}, options = {}) {
    const {
      info,
      meta,
      forceNtuples
    } = options;
    let jcampOptions = {
      info,
      meta
    };
    let keys = Object.keys(variables).map(key => key.toLowerCase());

    if (keys.length === 2 && keys.includes('x') && keys.includes('y') && !forceNtuples) {
      let x = variables.x;
      let xLabel = x.label || x.name || 'x';
      jcampOptions.info.xUnits = xLabel.includes(variables.x.units) ? xLabel : `${xLabel} [${variables.x.units}]`;
      let y = variables.y;
      let yLabel = y.label || y.name || 'y';
      jcampOptions.info.yUnits = yLabel.includes(variables.y.units) ? yLabel : `${yLabel} [${variables.y.units}]`;
      return fromJSON({
        x: variables.x.data,
        y: variables.y.data
      }, jcampOptions);
    } else {
      return creatorNtuples(variables, options);
    }
  }

  function toJcamps(analysis, options = {}) {
    let jcamps = [];

    for (let spectrum of analysis.spectra) {
      jcamps.push(getJcamp(spectrum, options));
    }

    return jcamps;
  }

  function getJcamp(spectrum, options) {
    const {
      info = {},
      meta = {}
    } = options;
    let jcampOptions = {
      options: {},
      info: {
        title: spectrum.title,
        dataType: spectrum.dataType,
        ...info
      },
      meta: { ...spectrum.meta,
        ...meta
      }
    };
    return fromVariables(spectrum.variables, jcampOptions);
  }

  function toJcamp(analysis, options = {}) {
    return toJcamps(analysis, options).join('\n');
  }

  const JSGraph = {
    getJSGraph,
    getNormalizationAnnotations
  };

  var util = createCommonjsModule(function (module, exports) {

    const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
    const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
    const regexName = new RegExp('^' + nameRegexp + '$');

    const getAllMatches = function (string, regex) {
      const matches = [];
      let match = regex.exec(string);

      while (match) {
        const allmatches = [];
        const len = match.length;

        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }

        matches.push(allmatches);
        match = regex.exec(string);
      }

      return matches;
    };

    const isName = function (string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === 'undefined');
    };

    exports.isExist = function (v) {
      return typeof v !== 'undefined';
    };

    exports.isEmptyObject = function (obj) {
      return Object.keys(obj).length === 0;
    };
    /**
     * Copy all the properties of a into b.
     * @param {*} target
     * @param {*} a
     */


    exports.merge = function (target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a); // will return an array of own properties

        const len = keys.length; //don't make it inline

        for (let i = 0; i < len; i++) {
          if (arrayMode === 'strict') {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    /* exports.merge =function (b,a){
      return Object.assign(b,a);
    } */


    exports.getValue = function (v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return '';
      }
    }; // const fakeCall = function(a) {return a;};
    // const fakeCallNoReturn = function() {};


    exports.buildOptions = function (options, defaultOptions, props) {
      var newOptions = {};

      if (!options) {
        return defaultOptions; //if there are not options
      }

      for (let i = 0; i < props.length; i++) {
        if (options[props[i]] !== undefined) {
          newOptions[props[i]] = options[props[i]];
        } else {
          newOptions[props[i]] = defaultOptions[props[i]];
        }
      }

      return newOptions;
    };
    /**
     * Check if a tag name should be treated as array
     *
     * @param tagName the node tagname
     * @param arrayMode the array mode option
     * @param parentTagName the parent tag name
     * @returns {boolean} true if node should be parsed as array
     */


    exports.isTagNameInArrayMode = function (tagName, arrayMode, parentTagName) {
      if (arrayMode === false) {
        return false;
      } else if (arrayMode instanceof RegExp) {
        return arrayMode.test(tagName);
      } else if (typeof arrayMode === 'function') {
        return !!arrayMode(tagName, parentTagName);
      }

      return arrayMode === "strict";
    };

    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  });

  const convertToJson = function (node, options, parentTagName) {
    const jObj = {}; // when no child node or attr is present

    if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
      return util.isExist(node.val) ? node.val : '';
    } // otherwise create a textnode if node has some text


    if (util.isExist(node.val) && !(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
      const asArray = util.isTagNameInArrayMode(node.tagname, options.arrayMode, parentTagName);
      jObj[options.textNodeName] = asArray ? [node.val] : node.val;
    }

    util.merge(jObj, node.attrsMap, options.arrayMode);
    const keys = Object.keys(node.child);

    for (let index = 0; index < keys.length; index++) {
      const tagName = keys[index];

      if (node.child[tagName] && node.child[tagName].length > 1) {
        jObj[tagName] = [];

        for (let tag in node.child[tagName]) {
          if (node.child[tagName].hasOwnProperty(tag)) {
            jObj[tagName].push(convertToJson(node.child[tagName][tag], options, tagName));
          }
        }
      } else {
        const result = convertToJson(node.child[tagName][0], options, tagName);
        const asArray = options.arrayMode === true && typeof result === 'object' || util.isTagNameInArrayMode(tagName, options.arrayMode, parentTagName);
        jObj[tagName] = asArray ? [result] : result;
      }
    } //add value


    return jObj;
  };

  var convertToJson_1 = convertToJson;
  var node2json = {
    convertToJson: convertToJson_1
  };

  var xmlNode = function (tagname, parent, val) {
    this.tagname = tagname;
    this.parent = parent;
    this.child = {}; //child tags

    this.attrsMap = {}; //attributes map

    this.val = val; //text only

    this.addChild = function (child) {
      if (Array.isArray(this.child[child.tagname])) {
        //already presents
        this.child[child.tagname].push(child);
      } else {
        this.child[child.tagname] = [child];
      }
    };
  };

  const buildOptions$3 = util.buildOptions;
  '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'.replace(/NAME/g, util.nameRegexp); //const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
  //const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");
  //polyfill

  if (!Number.parseInt && window.parseInt) {
    Number.parseInt = window.parseInt;
  }

  if (!Number.parseFloat && window.parseFloat) {
    Number.parseFloat = window.parseFloat;
  }

  const defaultOptions$2 = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseNodeValue: true,
    parseAttributeValue: false,
    arrayMode: false,
    trimValues: true,
    //Trim string values of tag and attributes
    cdataTagName: false,
    cdataPositionChar: '\\c',
    tagValueProcessor: function (a, tagName) {
      return a;
    },
    attrValueProcessor: function (a, attrName) {
      return a;
    },
    stopNodes: [] //decodeStrict: false,

  };
  var defaultOptions_1 = defaultOptions$2;
  const props$2 = ['attributeNamePrefix', 'attrNodeName', 'textNodeName', 'ignoreAttributes', 'ignoreNameSpace', 'allowBooleanAttributes', 'parseNodeValue', 'parseAttributeValue', 'arrayMode', 'trimValues', 'cdataTagName', 'cdataPositionChar', 'tagValueProcessor', 'attrValueProcessor', 'parseTrueNumberOnly', 'stopNodes'];
  var props_1 = props$2;
  /**
   * Trim -> valueProcessor -> parse value
   * @param {string} tagName
   * @param {string} val
   * @param {object} options
   */

  function processTagValue(tagName, val, options) {
    if (val) {
      if (options.trimValues) {
        val = val.trim();
      }

      val = options.tagValueProcessor(val, tagName);
      val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
    }

    return val;
  }

  function resolveNameSpace(tagname, options) {
    if (options.ignoreNameSpace) {
      const tags = tagname.split(':');
      const prefix = tagname.charAt(0) === '/' ? '/' : '';

      if (tags[0] === 'xmlns') {
        return '';
      }

      if (tags.length === 2) {
        tagname = prefix + tags[1];
      }
    }

    return tagname;
  }

  function parseValue(val, shouldParse, parseTrueNumberOnly) {
    if (shouldParse && typeof val === 'string') {
      let parsed;

      if (val.trim() === '' || isNaN(val)) {
        parsed = val === 'true' ? true : val === 'false' ? false : val;
      } else {
        if (val.indexOf('0x') !== -1) {
          //support hexa decimal
          parsed = Number.parseInt(val, 16);
        } else if (val.indexOf('.') !== -1) {
          parsed = Number.parseFloat(val);
          val = val.replace(/\.?0+$/, "");
        } else {
          parsed = Number.parseInt(val, 10);
        }

        if (parseTrueNumberOnly) {
          parsed = String(parsed) === val ? parsed : val;
        }
      }

      return parsed;
    } else {
      if (util.isExist(val)) {
        return val;
      } else {
        return '';
      }
    }
  } //TODO: change regex to capture NS
  //const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");


  const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

  function buildAttributesMap(attrStr, options) {
    if (!options.ignoreAttributes && typeof attrStr === 'string') {
      attrStr = attrStr.replace(/\r?\n/g, ' '); //attrStr = attrStr || attrStr.trim();

      const matches = util.getAllMatches(attrStr, attrsRegx);
      const len = matches.length; //don't make it inline

      const attrs = {};

      for (let i = 0; i < len; i++) {
        const attrName = resolveNameSpace(matches[i][1], options);

        if (attrName.length) {
          if (matches[i][4] !== undefined) {
            if (options.trimValues) {
              matches[i][4] = matches[i][4].trim();
            }

            matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
            attrs[options.attributeNamePrefix + attrName] = parseValue(matches[i][4], options.parseAttributeValue, options.parseTrueNumberOnly);
          } else if (options.allowBooleanAttributes) {
            attrs[options.attributeNamePrefix + attrName] = true;
          }
        }
      }

      if (!Object.keys(attrs).length) {
        return;
      }

      if (options.attrNodeName) {
        const attrCollection = {};
        attrCollection[options.attrNodeName] = attrs;
        return attrCollection;
      }

      return attrs;
    }
  }

  const getTraversalObj = function (xmlData, options) {
    xmlData = xmlData.replace(/\r\n?/g, "\n");
    options = buildOptions$3(options, defaultOptions$2, props$2);
    const xmlObj = new xmlNode('!xml');
    let currentNode = xmlObj;
    let textData = ""; //function match(xmlData){

    for (let i = 0; i < xmlData.length; i++) {
      const ch = xmlData[i];

      if (ch === '<') {
        if (xmlData[i + 1] === '/') {
          //Closing Tag
          const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
          let tagName = xmlData.substring(i + 2, closeIndex).trim();

          if (options.ignoreNameSpace) {
            const colonIndex = tagName.indexOf(":");

            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
            }
          }
          /* if (currentNode.parent) {
            currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue2(tagName, textData , options);
          } */


          if (currentNode) {
            if (currentNode.val) {
              currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tagName, textData, options);
            } else {
              currentNode.val = processTagValue(tagName, textData, options);
            }
          }

          if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
            currentNode.child = [];

            if (currentNode.attrsMap == undefined) {
              currentNode.attrsMap = {};
            }

            currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1);
          }

          currentNode = currentNode.parent;
          textData = "";
          i = closeIndex;
        } else if (xmlData[i + 1] === '?') {
          i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.");
        } else if (xmlData.substr(i + 1, 3) === '!--') {
          i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.");
        } else if (xmlData.substr(i + 1, 2) === '!D') {
          const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.");
          const tagExp = xmlData.substring(i, closeIndex);

          if (tagExp.indexOf("[") >= 0) {
            i = xmlData.indexOf("]>", i) + 1;
          } else {
            i = closeIndex;
          }
        } else if (xmlData.substr(i + 1, 2) === '![') {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
          const tagExp = xmlData.substring(i + 9, closeIndex); //considerations
          //1. CDATA will always have parent node
          //2. A tag with CDATA is not a leaf node so it's value would be string type.

          if (textData) {
            currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData, options);
            textData = "";
          }

          if (options.cdataTagName) {
            //add cdata node
            const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
            currentNode.addChild(childNode); //for backtracking

            currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar; //add rest value to parent node

            if (tagExp) {
              childNode.val = tagExp;
            }
          } else {
            currentNode.val = (currentNode.val || '') + (tagExp || '');
          }

          i = closeIndex + 2;
        } else {
          //Opening tag
          const result = closingIndexForOpeningTag(xmlData, i + 1);
          let tagExp = result.data;
          const closeIndex = result.index;
          const separatorIndex = tagExp.indexOf(" ");
          let tagName = tagExp;
          let shouldBuildAttributesMap = true;

          if (separatorIndex !== -1) {
            tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, '');
            tagExp = tagExp.substr(separatorIndex + 1);
          }

          if (options.ignoreNameSpace) {
            const colonIndex = tagName.indexOf(":");

            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
              shouldBuildAttributesMap = tagName !== result.data.substr(colonIndex + 1);
            }
          } //save text to parent node


          if (currentNode && textData) {
            if (currentNode.tagname !== '!xml') {
              currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData, options);
            }
          }

          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            //selfClosing tag
            if (tagName[tagName.length - 1] === "/") {
              //remove trailing '/'
              tagName = tagName.substr(0, tagName.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }

            const childNode = new xmlNode(tagName, currentNode, '');

            if (tagName !== tagExp) {
              childNode.attrsMap = buildAttributesMap(tagExp, options);
            }

            currentNode.addChild(childNode);
          } else {
            //opening tag
            const childNode = new xmlNode(tagName, currentNode);

            if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
              childNode.startIndex = closeIndex;
            }

            if (tagName !== tagExp && shouldBuildAttributesMap) {
              childNode.attrsMap = buildAttributesMap(tagExp, options);
            }

            currentNode.addChild(childNode);
            currentNode = childNode;
          }

          textData = "";
          i = closeIndex;
        }
      } else {
        textData += xmlData[i];
      }
    }

    return xmlObj;
  };

  function closingIndexForOpeningTag(data, i) {
    let attrBoundary;
    let tagExp = "";

    for (let index = i; index < data.length; index++) {
      let ch = data[index];

      if (attrBoundary) {
        if (ch === attrBoundary) attrBoundary = ""; //reset
      } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
      } else if (ch === '>') {
        return {
          data: tagExp,
          index: index
        };
      } else if (ch === '\t') {
        ch = " ";
      }

      tagExp += ch;
    }
  }

  function findClosingIndex(xmlData, str, i, errMsg) {
    const closingIndex = xmlData.indexOf(str, i);

    if (closingIndex === -1) {
      throw new Error(errMsg);
    } else {
      return closingIndex + str.length - 1;
    }
  }

  var getTraversalObj_1 = getTraversalObj;
  var xmlstr2xmlnode = {
    defaultOptions: defaultOptions_1,
    props: props_1,
    getTraversalObj: getTraversalObj_1
  };

  const defaultOptions$1 = {
    allowBooleanAttributes: false //A tag can have attributes without any value

  };
  const props$1 = ['allowBooleanAttributes']; //const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");

  var validate = function (xmlData, options) {
    options = util.buildOptions(options, defaultOptions$1, props$1); //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
    //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE

    const tags = [];
    let tagFound = false; //indicates that the root tag has been closed (aka. depth 0 has been reached)

    let reachedRoot = false;

    if (xmlData[0] === '\ufeff') {
      // check for byte order mark (BOM)
      xmlData = xmlData.substr(1);
    }

    for (let i = 0; i < xmlData.length; i++) {
      if (xmlData[i] === '<' && xmlData[i + 1] === '?') {
        i += 2;
        i = readPI(xmlData, i);
        if (i.err) return i;
      } else if (xmlData[i] === '<') {
        //starting of tag
        //read until you reach to '>' avoiding any '>' in attribute value
        i++;

        if (xmlData[i] === '!') {
          i = readCommentAndCDATA(xmlData, i);
          continue;
        } else {
          let closingTag = false;

          if (xmlData[i] === '/') {
            //closing tag
            closingTag = true;
            i++;
          } //read tagname


          let tagName = '';

          for (; i < xmlData.length && xmlData[i] !== '>' && xmlData[i] !== ' ' && xmlData[i] !== '\t' && xmlData[i] !== '\n' && xmlData[i] !== '\r'; i++) {
            tagName += xmlData[i];
          }

          tagName = tagName.trim(); //console.log(tagName);

          if (tagName[tagName.length - 1] === '/') {
            //self closing tag without attributes
            tagName = tagName.substring(0, tagName.length - 1); //continue;

            i--;
          }

          if (!validateTagName(tagName)) {
            let msg;

            if (tagName.trim().length === 0) {
              msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
            } else {
              msg = "Tag '" + tagName + "' is an invalid name.";
            }

            return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
          }

          const result = readAttributeStr(xmlData, i);

          if (result === false) {
            return getErrorObject('InvalidAttr', "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
          }

          let attrStr = result.value;
          i = result.index;

          if (attrStr[attrStr.length - 1] === '/') {
            //self closing tag
            attrStr = attrStr.substring(0, attrStr.length - 1);
            const isValid = validateAttributeString(attrStr, options);

            if (isValid === true) {
              tagFound = true; //continue; //text may presents after self closing tag
            } else {
              //the result from the nested function returns the position of the error within the attribute
              //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
              //this gives us the absolute index in the entire xml, which we can use to find the line at last
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            }
          } else if (closingTag) {
            if (!result.tagClosed) {
              return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
            } else if (attrStr.trim().length > 0) {
              return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, i));
            } else {
              const otg = tags.pop();

              if (tagName !== otg) {
                return getErrorObject('InvalidTag', "Closing tag '" + otg + "' is expected inplace of '" + tagName + "'.", getLineNumberForPosition(xmlData, i));
              } //when there are no more tags, we reached the root level.


              if (tags.length == 0) {
                reachedRoot = true;
              }
            }
          } else {
            const isValid = validateAttributeString(attrStr, options);

            if (isValid !== true) {
              //the result from the nested function returns the position of the error within the attribute
              //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
              //this gives us the absolute index in the entire xml, which we can use to find the line at last
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            } //if the root level has been reached before ...


            if (reachedRoot === true) {
              return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
            } else {
              tags.push(tagName);
            }

            tagFound = true;
          } //skip tag text value
          //It may include comments and CDATA value


          for (i++; i < xmlData.length; i++) {
            if (xmlData[i] === '<') {
              if (xmlData[i + 1] === '!') {
                //comment or CADATA
                i++;
                i = readCommentAndCDATA(xmlData, i);
                continue;
              } else if (xmlData[i + 1] === '?') {
                i = readPI(xmlData, ++i);
                if (i.err) return i;
              } else {
                break;
              }
            } else if (xmlData[i] === '&') {
              const afterAmp = validateAmpersand(xmlData, i);
              if (afterAmp == -1) return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
              i = afterAmp;
            }
          } //end of reading tag text value


          if (xmlData[i] === '<') {
            i--;
          }
        }
      } else {
        if (xmlData[i] === ' ' || xmlData[i] === '\t' || xmlData[i] === '\n' || xmlData[i] === '\r') {
          continue;
        }

        return getErrorObject('InvalidChar', "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
      }
    }

    if (!tagFound) {
      return getErrorObject('InvalidXml', 'Start tag expected.', 1);
    } else if (tags.length > 0) {
      return getErrorObject('InvalidXml', "Invalid '" + JSON.stringify(tags, null, 4).replace(/\r?\n/g, '') + "' found.", 1);
    }

    return true;
  };
  /**
   * Read Processing insstructions and skip
   * @param {*} xmlData
   * @param {*} i
   */


  function readPI(xmlData, i) {
    var start = i;

    for (; i < xmlData.length; i++) {
      if (xmlData[i] == '?' || xmlData[i] == ' ') {
        //tagname
        var tagname = xmlData.substr(start, i - start);

        if (i > 5 && tagname === 'xml') {
          return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
        } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
          //check if valid attribut string
          i++;
          break;
        } else {
          continue;
        }
      }
    }

    return i;
  }

  function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
      //comment
      for (i += 3; i < xmlData.length; i++) {
        if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
          i += 2;
          break;
        }
      }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === 'D' && xmlData[i + 2] === 'O' && xmlData[i + 3] === 'C' && xmlData[i + 4] === 'T' && xmlData[i + 5] === 'Y' && xmlData[i + 6] === 'P' && xmlData[i + 7] === 'E') {
      let angleBracketsCount = 1;

      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === '<') {
          angleBracketsCount++;
        } else if (xmlData[i] === '>') {
          angleBracketsCount--;

          if (angleBracketsCount === 0) {
            break;
          }
        }
      }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === '[' && xmlData[i + 2] === 'C' && xmlData[i + 3] === 'D' && xmlData[i + 4] === 'A' && xmlData[i + 5] === 'T' && xmlData[i + 6] === 'A' && xmlData[i + 7] === '[') {
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
          i += 2;
          break;
        }
      }
    }

    return i;
  }

  var doubleQuote = '"';
  var singleQuote = "'";
  /**
   * Keep reading xmlData until '<' is found outside the attribute value.
   * @param {string} xmlData
   * @param {number} i
   */

  function readAttributeStr(xmlData, i) {
    let attrStr = '';
    let startChar = '';
    let tagClosed = false;

    for (; i < xmlData.length; i++) {
      if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
        if (startChar === '') {
          startChar = xmlData[i];
        } else if (startChar !== xmlData[i]) {
          //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
          continue;
        } else {
          startChar = '';
        }
      } else if (xmlData[i] === '>') {
        if (startChar === '') {
          tagClosed = true;
          break;
        }
      }

      attrStr += xmlData[i];
    }

    if (startChar !== '') {
      return false;
    }

    return {
      value: attrStr,
      index: i,
      tagClosed: tagClosed
    };
  }
  /**
   * Select all the attributes whether valid or invalid.
   */


  const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g'); //attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

  function validateAttributeString(attrStr, options) {
    //console.log("start:"+attrStr+":end");
    //if(attrStr.trim().length === 0) return true; //empty string
    const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
    const attrNames = {};

    for (let i = 0; i < matches.length; i++) {
      if (matches[i][1].length === 0) {
        //nospace before attribute name: a="sd"b="saf"
        return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(attrStr, matches[i][0]));
      } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
        //independent attribute: ab
        return getErrorObject('InvalidAttr', "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(attrStr, matches[i][0]));
      }
      /* else if(matches[i][6] === undefined){//attribute without value: ab=
                      return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                  } */


      const attrName = matches[i][2];

      if (!validateAttrName(attrName)) {
        return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(attrStr, matches[i][0]));
      }

      if (!attrNames.hasOwnProperty(attrName)) {
        //check for duplicate attribute.
        attrNames[attrName] = 1;
      } else {
        return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(attrStr, matches[i][0]));
      }
    }

    return true;
  }

  function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;

    if (xmlData[i] === 'x') {
      i++;
      re = /[\da-fA-F]/;
    }

    for (; i < xmlData.length; i++) {
      if (xmlData[i] === ';') return i;
      if (!xmlData[i].match(re)) break;
    }

    return -1;
  }

  function validateAmpersand(xmlData, i) {
    // https://www.w3.org/TR/xml/#dt-charref
    i++;
    if (xmlData[i] === ';') return -1;

    if (xmlData[i] === '#') {
      i++;
      return validateNumberAmpersand(xmlData, i);
    }

    let count = 0;

    for (; i < xmlData.length; i++, count++) {
      if (xmlData[i].match(/\w/) && count < 20) continue;
      if (xmlData[i] === ';') break;
      return -1;
    }

    return i;
  }

  function getErrorObject(code, message, lineNumber) {
    return {
      err: {
        code: code,
        msg: message,
        line: lineNumber
      }
    };
  }

  function validateAttrName(attrName) {
    return util.isName(attrName);
  } // const startsWithXML = /^xml/i;


  function validateTagName(tagname) {
    return util.isName(tagname)
    /* && !tagname.match(startsWithXML) */
    ;
  } //this function returns the line number for the character at the given index


  function getLineNumberForPosition(xmlData, index) {
    var lines = xmlData.substring(0, index).split(/\r?\n/);
    return lines.length;
  } //this function returns the position of the last character of match within attrStr


  function getPositionFromMatch(attrStr, match) {
    return attrStr.indexOf(match) + match.length;
  }

  var validator = {
    validate: validate
  };

  const char = function (a) {
    return String.fromCharCode(a);
  };

  const chars = {
    nilChar: char(176),
    missingChar: char(201),
    nilPremitive: char(175),
    missingPremitive: char(200),
    emptyChar: char(178),
    emptyValue: char(177),
    //empty Premitive
    boundryChar: char(179),
    objStart: char(198),
    arrStart: char(204),
    arrayEnd: char(185)
  };
  const charsArr = [chars.nilChar, chars.nilPremitive, chars.missingChar, chars.missingPremitive, chars.boundryChar, chars.emptyChar, chars.emptyValue, chars.arrayEnd, chars.objStart, chars.arrStart];

  const _e = function (node, e_schema, options) {
    if (typeof e_schema === 'string') {
      //premitive
      if (node && node[0] && node[0].val !== undefined) {
        return getValue(node[0].val);
      } else {
        return getValue(node);
      }
    } else {
      const hasValidData = hasData(node);

      if (hasValidData === true) {
        let str = '';

        if (Array.isArray(e_schema)) {
          //attributes can't be repeated. hence check in children tags only
          str += chars.arrStart;
          const itemSchema = e_schema[0]; //var itemSchemaType = itemSchema;

          const arr_len = node.length;

          if (typeof itemSchema === 'string') {
            for (let arr_i = 0; arr_i < arr_len; arr_i++) {
              const r = getValue(node[arr_i].val);
              str = processValue(str, r);
            }
          } else {
            for (let arr_i = 0; arr_i < arr_len; arr_i++) {
              const r = _e(node[arr_i], itemSchema, options);

              str = processValue(str, r);
            }
          }

          str += chars.arrayEnd; //indicates that next item is not array item
        } else {
          //object
          str += chars.objStart;
          const keys = Object.keys(e_schema);

          if (Array.isArray(node)) {
            node = node[0];
          }

          for (let i in keys) {
            const key = keys[i]; //a property defined in schema can be present either in attrsMap or children tags
            //options.textNodeName will not present in both maps, take it's value from val
            //options.attrNodeName will be present in attrsMap

            let r;

            if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
              r = _e(node.attrsMap[key], e_schema[key], options);
            } else if (key === options.textNodeName) {
              r = _e(node.val, e_schema[key], options);
            } else {
              r = _e(node.child[key], e_schema[key], options);
            }

            str = processValue(str, r);
          }
        }

        return str;
      } else {
        return hasValidData;
      }
    }
  };

  const getValue = function (a
  /*, type*/
  ) {
    switch (a) {
      case undefined:
        return chars.missingPremitive;

      case null:
        return chars.nilPremitive;

      case '':
        return chars.emptyValue;

      default:
        return a;
    }
  };

  const processValue = function (str, r) {
    if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
      str += chars.boundryChar;
    }

    return str + r;
  };

  const isAppChar = function (ch) {
    return charsArr.indexOf(ch) !== -1;
  };

  function hasData(jObj) {
    if (jObj === undefined) {
      return chars.missingChar;
    } else if (jObj === null) {
      return chars.nilChar;
    } else if (jObj.child && Object.keys(jObj.child).length === 0 && (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)) {
      return chars.emptyChar;
    } else {
      return true;
    }
  }

  const buildOptions$2 = util.buildOptions;

  const convert2nimn = function (node, e_schema, options) {
    options = buildOptions$2(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
    return _e(node, e_schema, options);
  };

  var convert2nimn_1 = convert2nimn;
  var nimndata = {
    convert2nimn: convert2nimn_1
  };

  const buildOptions$1 = util.buildOptions; //TODO: do it later

  const convertToJsonString = function (node, options) {
    options = buildOptions$1(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
    options.indentBy = options.indentBy || '';
    return _cToJsonStr(node, options);
  };

  const _cToJsonStr = function (node, options, level) {
    let jObj = '{'; //traver through all the children

    const keys = Object.keys(node.child);

    for (let index = 0; index < keys.length; index++) {
      var tagname = keys[index];

      if (node.child[tagname] && node.child[tagname].length > 1) {
        jObj += '"' + tagname + '" : [ ';

        for (var tag in node.child[tagname]) {
          jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
        }

        jObj = jObj.substr(0, jObj.length - 1) + ' ] '; //remove extra comma in last
      } else {
        jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
      }
    }

    util.merge(jObj, node.attrsMap); //add attrsMap as new children

    if (util.isEmptyObject(jObj)) {
      return util.isExist(node.val) ? node.val : '';
    } else {
      if (util.isExist(node.val)) {
        if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
          jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
        }
      }
    } //add value


    if (jObj[jObj.length - 1] === ',') {
      jObj = jObj.substr(0, jObj.length - 2);
    }

    return jObj + '}';
  };

  function stringval(v) {
    if (v === true || v === false || !isNaN(v)) {
      return v;
    } else {
      return '"' + v + '"';
    }
  }

  var convertToJsonString_1 = convertToJsonString;
  var node2json_str = {
    convertToJsonString: convertToJsonString_1
  };

  const buildOptions = util.buildOptions;
  const defaultOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    cdataTagName: false,
    cdataPositionChar: '\\c',
    format: false,
    indentBy: '  ',
    supressEmptyNode: false,
    tagValueProcessor: function (a) {
      return a;
    },
    attrValueProcessor: function (a) {
      return a;
    }
  };
  const props = ['attributeNamePrefix', 'attrNodeName', 'textNodeName', 'ignoreAttributes', 'cdataTagName', 'cdataPositionChar', 'format', 'indentBy', 'supressEmptyNode', 'tagValueProcessor', 'attrValueProcessor'];

  function Parser(options) {
    this.options = buildOptions(options, defaultOptions, props);

    if (this.options.ignoreAttributes || this.options.attrNodeName) {
      this.isAttribute = function ()
      /*a*/
      {
        return false;
      };
    } else {
      this.attrPrefixLen = this.options.attributeNamePrefix.length;
      this.isAttribute = isAttribute;
    }

    if (this.options.cdataTagName) {
      this.isCDATA = isCDATA;
    } else {
      this.isCDATA = function ()
      /*a*/
      {
        return false;
      };
    }

    this.replaceCDATAstr = replaceCDATAstr;
    this.replaceCDATAarr = replaceCDATAarr;

    if (this.options.format) {
      this.indentate = indentate;
      this.tagEndChar = '>\n';
      this.newLine = '\n';
    } else {
      this.indentate = function () {
        return '';
      };

      this.tagEndChar = '>';
      this.newLine = '';
    }

    if (this.options.supressEmptyNode) {
      this.buildTextNode = buildEmptyTextNode;
      this.buildObjNode = buildEmptyObjNode;
    } else {
      this.buildTextNode = buildTextValNode;
      this.buildObjNode = buildObjectNode;
    }

    this.buildTextValNode = buildTextValNode;
    this.buildObjectNode = buildObjectNode;
  }

  Parser.prototype.parse = function (jObj) {
    return this.j2x(jObj, 0).val;
  };

  Parser.prototype.j2x = function (jObj, level) {
    let attrStr = '';
    let val = '';
    const keys = Object.keys(jObj);
    const len = keys.length;

    for (let i = 0; i < len; i++) {
      const key = keys[i];

      if (typeof jObj[key] === 'undefined') ; else if (jObj[key] === null) {
        val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
      } else if (jObj[key] instanceof Date) {
        val += this.buildTextNode(jObj[key], key, '', level);
      } else if (typeof jObj[key] !== 'object') {
        //premitive type
        const attr = this.isAttribute(key);

        if (attr) {
          attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
        } else if (this.isCDATA(key)) {
          if (jObj[this.options.textNodeName]) {
            val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
          } else {
            val += this.replaceCDATAstr('', jObj[key]);
          }
        } else {
          //tag value
          if (key === this.options.textNodeName) {
            if (jObj[this.options.cdataTagName]) ; else {
              val += this.options.tagValueProcessor('' + jObj[key]);
            }
          } else {
            val += this.buildTextNode(jObj[key], key, '', level);
          }
        }
      } else if (Array.isArray(jObj[key])) {
        //repeated nodes
        if (this.isCDATA(key)) {
          val += this.indentate(level);

          if (jObj[this.options.textNodeName]) {
            val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
          } else {
            val += this.replaceCDATAarr('', jObj[key]);
          }
        } else {
          //nested nodes
          const arrLen = jObj[key].length;

          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];

            if (typeof item === 'undefined') ; else if (item === null) {
              val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
            } else if (typeof item === 'object') {
              const result = this.j2x(item, level + 1);
              val += this.buildObjNode(result.val, key, result.attrStr, level);
            } else {
              val += this.buildTextNode(item, key, '', level);
            }
          }
        }
      } else {
        //nested node
        if (this.options.attrNodeName && key === this.options.attrNodeName) {
          const Ks = Object.keys(jObj[key]);
          const L = Ks.length;

          for (let j = 0; j < L; j++) {
            attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
          }
        } else {
          const result = this.j2x(jObj[key], level + 1);
          val += this.buildObjNode(result.val, key, result.attrStr, level);
        }
      }
    }

    return {
      attrStr: attrStr,
      val: val
    };
  };

  function replaceCDATAstr(str, cdata) {
    str = this.options.tagValueProcessor('' + str);

    if (this.options.cdataPositionChar === '' || str === '') {
      return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
    } else {
      return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
    }
  }

  function replaceCDATAarr(str, cdata) {
    str = this.options.tagValueProcessor('' + str);

    if (this.options.cdataPositionChar === '' || str === '') {
      return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
    } else {
      for (let v in cdata) {
        str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
      }

      return str + this.newLine;
    }
  }

  function buildObjectNode(val, key, attrStr, level) {
    if (attrStr && !val.includes('<')) {
      return this.indentate(level) + '<' + key + attrStr + '>' + val + //+ this.newLine
      // + this.indentate(level)
      '</' + key + this.tagEndChar;
    } else {
      return this.indentate(level) + '<' + key + attrStr + this.tagEndChar + val + //+ this.newLine
      this.indentate(level) + '</' + key + this.tagEndChar;
    }
  }

  function buildEmptyObjNode(val, key, attrStr, level) {
    if (val !== '') {
      return this.buildObjectNode(val, key, attrStr, level);
    } else {
      return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar; //+ this.newLine
    }
  }

  function buildTextValNode(val, key, attrStr, level) {
    return this.indentate(level) + '<' + key + attrStr + '>' + this.options.tagValueProcessor(val) + '</' + key + this.tagEndChar;
  }

  function buildEmptyTextNode(val, key, attrStr, level) {
    if (val !== '') {
      return this.buildTextValNode(val, key, attrStr, level);
    } else {
      return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
    }
  }

  function indentate(level) {
    return this.options.indentBy.repeat(level);
  }

  function isAttribute(name
  /*, options*/
  ) {
    if (name.startsWith(this.options.attributeNamePrefix)) {
      return name.substr(this.attrPrefixLen);
    } else {
      return false;
    }
  }

  function isCDATA(name) {
    return name === this.options.cdataTagName;
  } //formatting
  //indentation
  //\n after each closing or self closing tag


  var json2xml = Parser;

  var parser = createCommonjsModule(function (module, exports) {

    const x2xmlnode = xmlstr2xmlnode;
    const buildOptions = util.buildOptions;

    exports.parse = function (xmlData, options, validationOption) {
      if (validationOption) {
        if (validationOption === true) validationOption = {};
        const result = validator.validate(xmlData, validationOption);

        if (result !== true) {
          throw Error(result.err.msg);
        }
      }

      options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
      const traversableObj = xmlstr2xmlnode.getTraversalObj(xmlData, options); //print(traversableObj, "  ");

      return node2json.convertToJson(traversableObj, options);
    };

    exports.convertTonimn = nimndata.convert2nimn;
    exports.getTraversalObj = xmlstr2xmlnode.getTraversalObj;
    exports.convertToJson = node2json.convertToJson;
    exports.convertToJsonString = node2json_str.convertToJsonString;
    exports.validate = validator.validate;
    exports.j2xParser = json2xml;

    exports.parseToNimn = function (xmlData, schema, options) {
      return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
    };
  });

  /*!

  JSZip v3.6.0 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>

  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/master/LICENSE
  */
  var jszip_min = createCommonjsModule(function (module, exports) {
    !function (e) {
      module.exports = e();
    }(function () {
      return function s(a, o, u) {
        function h(r, e) {
          if (!o[r]) {
            if (!a[r]) {
              var t = "function" == typeof commonjsRequire && commonjsRequire;
              if (!e && t) return t(r, !0);
              if (f) return f(r, !0);
              var n = new Error("Cannot find module '" + r + "'");
              throw n.code = "MODULE_NOT_FOUND", n;
            }

            var i = o[r] = {
              exports: {}
            };
            a[r][0].call(i.exports, function (e) {
              var t = a[r][1][e];
              return h(t || e);
            }, i, i.exports, s, a, o, u);
          }

          return o[r].exports;
        }

        for (var f = "function" == typeof commonjsRequire && commonjsRequire, e = 0; e < u.length; e++) h(u[e]);

        return h;
      }({
        1: [function (l, t, n) {
          (function (r) {
            !function (e) {
              "object" == typeof n && void 0 !== t ? t.exports = e() : ("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this).JSZip = e();
            }(function () {
              return function s(a, o, u) {
                function h(t, e) {
                  if (!o[t]) {
                    if (!a[t]) {
                      var r = "function" == typeof l && l;
                      if (!e && r) return r(t, !0);
                      if (f) return f(t, !0);
                      var n = new Error("Cannot find module '" + t + "'");
                      throw n.code = "MODULE_NOT_FOUND", n;
                    }

                    var i = o[t] = {
                      exports: {}
                    };
                    a[t][0].call(i.exports, function (e) {
                      return h(a[t][1][e] || e);
                    }, i, i.exports, s, a, o, u);
                  }

                  return o[t].exports;
                }

                for (var f = "function" == typeof l && l, e = 0; e < u.length; e++) h(u[e]);

                return h;
              }({
                1: [function (l, t, n) {
                  (function (r) {
                    !function (e) {
                      "object" == typeof n && void 0 !== t ? t.exports = e() : ("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this).JSZip = e();
                    }(function () {
                      return function s(a, o, u) {
                        function h(t, e) {
                          if (!o[t]) {
                            if (!a[t]) {
                              var r = "function" == typeof l && l;
                              if (!e && r) return r(t, !0);
                              if (f) return f(t, !0);
                              var n = new Error("Cannot find module '" + t + "'");
                              throw n.code = "MODULE_NOT_FOUND", n;
                            }

                            var i = o[t] = {
                              exports: {}
                            };
                            a[t][0].call(i.exports, function (e) {
                              return h(a[t][1][e] || e);
                            }, i, i.exports, s, a, o, u);
                          }

                          return o[t].exports;
                        }

                        for (var f = "function" == typeof l && l, e = 0; e < u.length; e++) h(u[e]);

                        return h;
                      }({
                        1: [function (l, t, n) {
                          (function (r) {
                            !function (e) {
                              "object" == typeof n && void 0 !== t ? t.exports = e() : ("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this).JSZip = e();
                            }(function () {
                              return function s(a, o, u) {
                                function h(t, e) {
                                  if (!o[t]) {
                                    if (!a[t]) {
                                      var r = "function" == typeof l && l;
                                      if (!e && r) return r(t, !0);
                                      if (f) return f(t, !0);
                                      var n = new Error("Cannot find module '" + t + "'");
                                      throw n.code = "MODULE_NOT_FOUND", n;
                                    }

                                    var i = o[t] = {
                                      exports: {}
                                    };
                                    a[t][0].call(i.exports, function (e) {
                                      return h(a[t][1][e] || e);
                                    }, i, i.exports, s, a, o, u);
                                  }

                                  return o[t].exports;
                                }

                                for (var f = "function" == typeof l && l, e = 0; e < u.length; e++) h(u[e]);

                                return h;
                              }({
                                1: [function (l, t, n) {
                                  (function (r) {
                                    !function (e) {
                                      "object" == typeof n && void 0 !== t ? t.exports = e() : ("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this).JSZip = e();
                                    }(function () {
                                      return function s(a, o, u) {
                                        function h(t, e) {
                                          if (!o[t]) {
                                            if (!a[t]) {
                                              var r = "function" == typeof l && l;
                                              if (!e && r) return r(t, !0);
                                              if (f) return f(t, !0);
                                              var n = new Error("Cannot find module '" + t + "'");
                                              throw n.code = "MODULE_NOT_FOUND", n;
                                            }

                                            var i = o[t] = {
                                              exports: {}
                                            };
                                            a[t][0].call(i.exports, function (e) {
                                              return h(a[t][1][e] || e);
                                            }, i, i.exports, s, a, o, u);
                                          }

                                          return o[t].exports;
                                        }

                                        for (var f = "function" == typeof l && l, e = 0; e < u.length; e++) h(u[e]);

                                        return h;
                                      }({
                                        1: [function (l, t, n) {
                                          (function (r) {
                                            !function (e) {
                                              "object" == typeof n && void 0 !== t ? t.exports = e() : ("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this).JSZip = e();
                                            }(function () {
                                              return function s(a, o, u) {
                                                function h(t, e) {
                                                  if (!o[t]) {
                                                    if (!a[t]) {
                                                      var r = "function" == typeof l && l;
                                                      if (!e && r) return r(t, !0);
                                                      if (f) return f(t, !0);
                                                      var n = new Error("Cannot find module '" + t + "'");
                                                      throw n.code = "MODULE_NOT_FOUND", n;
                                                    }

                                                    var i = o[t] = {
                                                      exports: {}
                                                    };
                                                    a[t][0].call(i.exports, function (e) {
                                                      return h(a[t][1][e] || e);
                                                    }, i, i.exports, s, a, o, u);
                                                  }

                                                  return o[t].exports;
                                                }

                                                for (var f = "function" == typeof l && l, e = 0; e < u.length; e++) h(u[e]);

                                                return h;
                                              }({
                                                1: [function (e, t, r) {

                                                  var c = e("./utils"),
                                                      l = e("./support"),
                                                      p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                                                  r.encode = function (e) {
                                                    for (var t, r, n, i, s, a, o, u = [], h = 0, f = e.length, l = f, d = "string" !== c.getTypeOf(e); h < e.length;) l = f - h, n = d ? (t = e[h++], r = h < f ? e[h++] : 0, h < f ? e[h++] : 0) : (t = e.charCodeAt(h++), r = h < f ? e.charCodeAt(h++) : 0, h < f ? e.charCodeAt(h++) : 0), i = t >> 2, s = (3 & t) << 4 | r >> 4, a = 1 < l ? (15 & r) << 2 | n >> 6 : 64, o = 2 < l ? 63 & n : 64, u.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));

                                                    return u.join("");
                                                  }, r.decode = function (e) {
                                                    var t,
                                                        r,
                                                        n,
                                                        i,
                                                        s,
                                                        a,
                                                        o = 0,
                                                        u = 0;
                                                    if ("data:" === e.substr(0, "data:".length)) throw new Error("Invalid base64 input, it looks like a data url.");
                                                    var h,
                                                        f = 3 * (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
                                                    if (e.charAt(e.length - 1) === p.charAt(64) && f--, e.charAt(e.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");

                                                    for (h = l.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e.length;) t = p.indexOf(e.charAt(o++)) << 2 | (i = p.indexOf(e.charAt(o++))) >> 4, r = (15 & i) << 4 | (s = p.indexOf(e.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e.charAt(o++))), h[u++] = t, 64 !== s && (h[u++] = r), 64 !== a && (h[u++] = n);

                                                    return h;
                                                  };
                                                }, {
                                                  "./support": 30,
                                                  "./utils": 32
                                                }],
                                                2: [function (e, t, r) {

                                                  var n = e("./external"),
                                                      i = e("./stream/DataWorker"),
                                                      s = e("./stream/Crc32Probe"),
                                                      a = e("./stream/DataLengthProbe");

                                                  function o(e, t, r, n, i) {
                                                    this.compressedSize = e, this.uncompressedSize = t, this.crc32 = r, this.compression = n, this.compressedContent = i;
                                                  }

                                                  o.prototype = {
                                                    getContentWorker: function () {
                                                      var e = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                                                          t = this;
                                                      return e.on("end", function () {
                                                        if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
                                                      }), e;
                                                    },
                                                    getCompressedWorker: function () {
                                                      return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
                                                    }
                                                  }, o.createWorkerFrom = function (e, t, r) {
                                                    return e.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", t);
                                                  }, t.exports = o;
                                                }, {
                                                  "./external": 6,
                                                  "./stream/Crc32Probe": 25,
                                                  "./stream/DataLengthProbe": 26,
                                                  "./stream/DataWorker": 27
                                                }],
                                                3: [function (e, t, r) {

                                                  var n = e("./stream/GenericWorker");
                                                  r.STORE = {
                                                    magic: "\0\0",
                                                    compressWorker: function (e) {
                                                      return new n("STORE compression");
                                                    },
                                                    uncompressWorker: function () {
                                                      return new n("STORE decompression");
                                                    }
                                                  }, r.DEFLATE = e("./flate");
                                                }, {
                                                  "./flate": 7,
                                                  "./stream/GenericWorker": 28
                                                }],
                                                4: [function (e, t, r) {

                                                  var n = e("./utils"),
                                                      a = function () {
                                                    for (var e, t = [], r = 0; r < 256; r++) {
                                                      e = r;

                                                      for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;

                                                      t[r] = e;
                                                    }

                                                    return t;
                                                  }();

                                                  t.exports = function (e, t) {
                                                    return void 0 !== e && e.length ? "string" !== n.getTypeOf(e) ? function (e, t, r) {
                                                      var n = a,
                                                          i = 0 + r;
                                                      e ^= -1;

                                                      for (var s = 0; s < i; s++) e = e >>> 8 ^ n[255 & (e ^ t[s])];

                                                      return -1 ^ e;
                                                    }(0 | t, e, e.length) : function (e, t, r) {
                                                      var n = a,
                                                          i = 0 + r;
                                                      e ^= -1;

                                                      for (var s = 0; s < i; s++) e = e >>> 8 ^ n[255 & (e ^ t.charCodeAt(s))];

                                                      return -1 ^ e;
                                                    }(0 | t, e, e.length) : 0;
                                                  };
                                                }, {
                                                  "./utils": 32
                                                }],
                                                5: [function (e, t, r) {

                                                  r.base64 = !1, r.binary = !1, r.dir = !1, r.createFolders = !0, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
                                                }, {}],
                                                6: [function (e, t, r) {

                                                  var n;
                                                  n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = {
                                                    Promise: n
                                                  };
                                                }, {
                                                  lie: 37
                                                }],
                                                7: [function (e, t, r) {

                                                  var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                                                      i = e("pako"),
                                                      s = e("./utils"),
                                                      a = e("./stream/GenericWorker"),
                                                      o = n ? "uint8array" : "array";

                                                  function u(e, t) {
                                                    a.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
                                                  }

                                                  r.magic = "\b\0", s.inherits(u, a), u.prototype.processChunk = function (e) {
                                                    this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e.data), !1);
                                                  }, u.prototype.flush = function () {
                                                    a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0);
                                                  }, u.prototype.cleanUp = function () {
                                                    a.prototype.cleanUp.call(this), this._pako = null;
                                                  }, u.prototype._createPako = function () {
                                                    this._pako = new i[this._pakoAction]({
                                                      raw: !0,
                                                      level: this._pakoOptions.level || -1
                                                    });
                                                    var t = this;

                                                    this._pako.onData = function (e) {
                                                      t.push({
                                                        data: e,
                                                        meta: t.meta
                                                      });
                                                    };
                                                  }, r.compressWorker = function (e) {
                                                    return new u("Deflate", e);
                                                  }, r.uncompressWorker = function () {
                                                    return new u("Inflate", {});
                                                  };
                                                }, {
                                                  "./stream/GenericWorker": 28,
                                                  "./utils": 32,
                                                  pako: 38
                                                }],
                                                8: [function (e, t, r) {

                                                  function I(e, t) {
                                                    var r,
                                                        n = "";

                                                    for (r = 0; r < t; r++) n += String.fromCharCode(255 & e), e >>>= 8;

                                                    return n;
                                                  }

                                                  function i(e, t, r, n, i, s) {
                                                    var a,
                                                        o,
                                                        u = e.file,
                                                        h = e.compression,
                                                        f = s !== B.utf8encode,
                                                        l = O.transformTo("string", s(u.name)),
                                                        d = O.transformTo("string", B.utf8encode(u.name)),
                                                        c = u.comment,
                                                        p = O.transformTo("string", s(c)),
                                                        m = O.transformTo("string", B.utf8encode(c)),
                                                        _ = d.length !== u.name.length,
                                                        g = m.length !== c.length,
                                                        v = "",
                                                        b = "",
                                                        w = "",
                                                        y = u.dir,
                                                        k = u.date,
                                                        x = {
                                                      crc32: 0,
                                                      compressedSize: 0,
                                                      uncompressedSize: 0
                                                    };

                                                    t && !r || (x.crc32 = e.crc32, x.compressedSize = e.compressedSize, x.uncompressedSize = e.uncompressedSize);
                                                    var S = 0;
                                                    t && (S |= 8), f || !_ && !g || (S |= 2048);
                                                    var z,
                                                        E = 0,
                                                        C = 0;
                                                    y && (E |= 16), "UNIX" === i ? (C = 798, E |= ((z = u.unixPermissions) || (z = y ? 16893 : 33204), (65535 & z) << 16)) : (C = 20, E |= 63 & (u.dosPermissions || 0)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v += "up" + I((b = I(1, 1) + I(T(l), 4) + d).length, 2) + b), g && (v += "uc" + I((w = I(1, 1) + I(T(p), 4) + m).length, 2) + w);
                                                    var A = "";
                                                    return A += "\n\0", A += I(S, 2), A += h.magic, A += I(a, 2), A += I(o, 2), A += I(x.crc32, 4), A += I(x.compressedSize, 4), A += I(x.uncompressedSize, 4), A += I(l.length, 2), A += I(v.length, 2), {
                                                      fileRecord: R.LOCAL_FILE_HEADER + A + l + v,
                                                      dirRecord: R.CENTRAL_FILE_HEADER + I(C, 2) + A + I(p.length, 2) + "\0\0\0\0" + I(E, 4) + I(n, 4) + l + v + p
                                                    };
                                                  }

                                                  var O = e("../utils"),
                                                      s = e("../stream/GenericWorker"),
                                                      B = e("../utf8"),
                                                      T = e("../crc32"),
                                                      R = e("../signature");

                                                  function n(e, t, r, n) {
                                                    s.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = r, this.encodeFileName = n, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
                                                  }

                                                  O.inherits(n, s), n.prototype.push = function (e) {
                                                    var t = e.meta.percent || 0,
                                                        r = this.entriesCount,
                                                        n = this._sources.length;
                                                    this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, s.prototype.push.call(this, {
                                                      data: e.data,
                                                      meta: {
                                                        currentFile: this.currentFile,
                                                        percent: r ? (t + 100 * (r - n - 1)) / r : 100
                                                      }
                                                    }));
                                                  }, n.prototype.openedSource = function (e) {
                                                    this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
                                                    var t = this.streamFiles && !e.file.dir;

                                                    if (t) {
                                                      var r = i(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                                      this.push({
                                                        data: r.fileRecord,
                                                        meta: {
                                                          percent: 0
                                                        }
                                                      });
                                                    } else this.accumulate = !0;
                                                  }, n.prototype.closedSource = function (e) {
                                                    this.accumulate = !1;
                                                    var t,
                                                        r = this.streamFiles && !e.file.dir,
                                                        n = i(e, r, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                                    if (this.dirRecords.push(n.dirRecord), r) this.push({
                                                      data: (t = e, R.DATA_DESCRIPTOR + I(t.crc32, 4) + I(t.compressedSize, 4) + I(t.uncompressedSize, 4)),
                                                      meta: {
                                                        percent: 100
                                                      }
                                                    });else for (this.push({
                                                      data: n.fileRecord,
                                                      meta: {
                                                        percent: 0
                                                      }
                                                    }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
                                                    this.currentFile = null;
                                                  }, n.prototype.flush = function () {
                                                    for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
                                                      data: this.dirRecords[t],
                                                      meta: {
                                                        percent: 100
                                                      }
                                                    });

                                                    var r,
                                                        n,
                                                        i,
                                                        s,
                                                        a,
                                                        o,
                                                        u = this.bytesWritten - e,
                                                        h = (r = this.dirRecords.length, n = u, i = e, s = this.zipComment, a = this.encodeFileName, o = O.transformTo("string", a(s)), R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + I(r, 2) + I(r, 2) + I(n, 4) + I(i, 4) + I(o.length, 2) + o);
                                                    this.push({
                                                      data: h,
                                                      meta: {
                                                        percent: 100
                                                      }
                                                    });
                                                  }, n.prototype.prepareNextSource = function () {
                                                    this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
                                                  }, n.prototype.registerPrevious = function (e) {
                                                    this._sources.push(e);

                                                    var t = this;
                                                    return e.on("data", function (e) {
                                                      t.processChunk(e);
                                                    }), e.on("end", function () {
                                                      t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
                                                    }), e.on("error", function (e) {
                                                      t.error(e);
                                                    }), this;
                                                  }, n.prototype.resume = function () {
                                                    return !!s.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
                                                  }, n.prototype.error = function (e) {
                                                    var t = this._sources;
                                                    if (!s.prototype.error.call(this, e)) return !1;

                                                    for (var r = 0; r < t.length; r++) try {
                                                      t[r].error(e);
                                                    } catch (e) {}

                                                    return !0;
                                                  }, n.prototype.lock = function () {
                                                    s.prototype.lock.call(this);

                                                    for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
                                                  }, t.exports = n;
                                                }, {
                                                  "../crc32": 4,
                                                  "../signature": 23,
                                                  "../stream/GenericWorker": 28,
                                                  "../utf8": 31,
                                                  "../utils": 32
                                                }],
                                                9: [function (e, t, r) {

                                                  var h = e("../compressions"),
                                                      n = e("./ZipFileWorker");

                                                  r.generateWorker = function (e, a, t) {
                                                    var o = new n(a.streamFiles, t, a.platform, a.encodeFileName),
                                                        u = 0;

                                                    try {
                                                      e.forEach(function (e, t) {
                                                        u++;

                                                        var r = function (e, t) {
                                                          var r = e || t,
                                                              n = h[r];
                                                          if (!n) throw new Error(r + " is not a valid compression method !");
                                                          return n;
                                                        }(t.options.compression, a.compression),
                                                            n = t.options.compressionOptions || a.compressionOptions || {},
                                                            i = t.dir,
                                                            s = t.date;

                                                        t._compressWorker(r, n).withStreamInfo("file", {
                                                          name: e,
                                                          dir: i,
                                                          date: s,
                                                          comment: t.comment || "",
                                                          unixPermissions: t.unixPermissions,
                                                          dosPermissions: t.dosPermissions
                                                        }).pipe(o);
                                                      }), o.entriesCount = u;
                                                    } catch (e) {
                                                      o.error(e);
                                                    }

                                                    return o;
                                                  };
                                                }, {
                                                  "../compressions": 3,
                                                  "./ZipFileWorker": 8
                                                }],
                                                10: [function (e, t, r) {

                                                  function n() {
                                                    if (!(this instanceof n)) return new n();
                                                    if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                                                    this.files = {}, this.comment = null, this.root = "", this.clone = function () {
                                                      var e = new n();

                                                      for (var t in this) "function" != typeof this[t] && (e[t] = this[t]);

                                                      return e;
                                                    };
                                                  }

                                                  (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.5.0", n.loadAsync = function (e, t) {
                                                    return new n().loadAsync(e, t);
                                                  }, n.external = e("./external"), t.exports = n;
                                                }, {
                                                  "./defaults": 5,
                                                  "./external": 6,
                                                  "./load": 11,
                                                  "./object": 15,
                                                  "./support": 30
                                                }],
                                                11: [function (e, t, r) {

                                                  var n = e("./utils"),
                                                      i = e("./external"),
                                                      o = e("./utf8"),
                                                      u = e("./zipEntries"),
                                                      s = e("./stream/Crc32Probe"),
                                                      h = e("./nodejsUtils");

                                                  function f(n) {
                                                    return new i.Promise(function (e, t) {
                                                      var r = n.decompressed.getContentWorker().pipe(new s());
                                                      r.on("error", function (e) {
                                                        t(e);
                                                      }).on("end", function () {
                                                        r.streamInfo.crc32 !== n.decompressed.crc32 ? t(new Error("Corrupted zip : CRC32 mismatch")) : e();
                                                      }).resume();
                                                    });
                                                  }

                                                  t.exports = function (e, s) {
                                                    var a = this;
                                                    return s = n.extend(s || {}, {
                                                      base64: !1,
                                                      checkCRC32: !1,
                                                      optimizedBinaryString: !1,
                                                      createFolders: !1,
                                                      decodeFileName: o.utf8decode
                                                    }), h.isNode && h.isStream(e) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n.prepareContent("the loaded zip file", e, !0, s.optimizedBinaryString, s.base64).then(function (e) {
                                                      var t = new u(s);
                                                      return t.load(e), t;
                                                    }).then(function (e) {
                                                      var t = [i.Promise.resolve(e)],
                                                          r = e.files;
                                                      if (s.checkCRC32) for (var n = 0; n < r.length; n++) t.push(f(r[n]));
                                                      return i.Promise.all(t);
                                                    }).then(function (e) {
                                                      for (var t = e.shift(), r = t.files, n = 0; n < r.length; n++) {
                                                        var i = r[n];
                                                        a.file(i.fileNameStr, i.decompressed, {
                                                          binary: !0,
                                                          optimizedBinaryString: !0,
                                                          date: i.date,
                                                          dir: i.dir,
                                                          comment: i.fileCommentStr.length ? i.fileCommentStr : null,
                                                          unixPermissions: i.unixPermissions,
                                                          dosPermissions: i.dosPermissions,
                                                          createFolders: s.createFolders
                                                        });
                                                      }

                                                      return t.zipComment.length && (a.comment = t.zipComment), a;
                                                    });
                                                  };
                                                }, {
                                                  "./external": 6,
                                                  "./nodejsUtils": 14,
                                                  "./stream/Crc32Probe": 25,
                                                  "./utf8": 31,
                                                  "./utils": 32,
                                                  "./zipEntries": 33
                                                }],
                                                12: [function (e, t, r) {

                                                  var n = e("../utils"),
                                                      i = e("../stream/GenericWorker");

                                                  function s(e, t) {
                                                    i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
                                                  }

                                                  n.inherits(s, i), s.prototype._bindStream = function (e) {
                                                    var t = this;
                                                    (this._stream = e).pause(), e.on("data", function (e) {
                                                      t.push({
                                                        data: e,
                                                        meta: {
                                                          percent: 0
                                                        }
                                                      });
                                                    }).on("error", function (e) {
                                                      t.isPaused ? this.generatedError = e : t.error(e);
                                                    }).on("end", function () {
                                                      t.isPaused ? t._upstreamEnded = !0 : t.end();
                                                    });
                                                  }, s.prototype.pause = function () {
                                                    return !!i.prototype.pause.call(this) && (this._stream.pause(), !0);
                                                  }, s.prototype.resume = function () {
                                                    return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
                                                  }, t.exports = s;
                                                }, {
                                                  "../stream/GenericWorker": 28,
                                                  "../utils": 32
                                                }],
                                                13: [function (e, t, r) {

                                                  var i = e("readable-stream").Readable;

                                                  function n(e, t, r) {
                                                    i.call(this, t), this._helper = e;
                                                    var n = this;
                                                    e.on("data", function (e, t) {
                                                      n.push(e) || n._helper.pause(), r && r(t);
                                                    }).on("error", function (e) {
                                                      n.emit("error", e);
                                                    }).on("end", function () {
                                                      n.push(null);
                                                    });
                                                  }

                                                  e("../utils").inherits(n, i), n.prototype._read = function () {
                                                    this._helper.resume();
                                                  }, t.exports = n;
                                                }, {
                                                  "../utils": 32,
                                                  "readable-stream": 16
                                                }],
                                                14: [function (e, t, r) {

                                                  t.exports = {
                                                    isNode: "undefined" != typeof Buffer,
                                                    newBufferFrom: function (e, t) {
                                                      if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
                                                      if ("number" == typeof e) throw new Error('The "data" argument must not be a number');
                                                      return new Buffer(e, t);
                                                    },
                                                    allocBuffer: function (e) {
                                                      if (Buffer.alloc) return Buffer.alloc(e);
                                                      var t = new Buffer(e);
                                                      return t.fill(0), t;
                                                    },
                                                    isBuffer: function (e) {
                                                      return Buffer.isBuffer(e);
                                                    },
                                                    isStream: function (e) {
                                                      return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume;
                                                    }
                                                  };
                                                }, {}],
                                                15: [function (e, t, r) {

                                                  function s(e, t, r) {
                                                    var n,
                                                        i = f.getTypeOf(t),
                                                        s = f.extend(r || {}, d);
                                                    s.date = s.date || new Date(), null !== s.compression && (s.compression = s.compression.toUpperCase()), "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (e = h(e)), s.createFolders && (n = function (e) {
                                                      "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
                                                      var t = e.lastIndexOf("/");
                                                      return 0 < t ? e.substring(0, t) : "";
                                                    }(e)) && g.call(this, n, !0);
                                                    var a,
                                                        o = "string" === i && !1 === s.binary && !1 === s.base64;
                                                    r && void 0 !== r.binary || (s.binary = !o), (t instanceof c && 0 === t.uncompressedSize || s.dir || !t || 0 === t.length) && (s.base64 = !1, s.binary = !0, t = "", s.compression = "STORE", i = "string"), a = t instanceof c || t instanceof l ? t : m.isNode && m.isStream(t) ? new _(e, t) : f.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
                                                    var u = new p(e, a, s);
                                                    this.files[e] = u;
                                                  }

                                                  function h(e) {
                                                    return "/" !== e.slice(-1) && (e += "/"), e;
                                                  }

                                                  var i = e("./utf8"),
                                                      f = e("./utils"),
                                                      l = e("./stream/GenericWorker"),
                                                      a = e("./stream/StreamHelper"),
                                                      d = e("./defaults"),
                                                      c = e("./compressedObject"),
                                                      p = e("./zipObject"),
                                                      o = e("./generate"),
                                                      m = e("./nodejsUtils"),
                                                      _ = e("./nodejs/NodejsStreamInputAdapter"),
                                                      g = function (e, t) {
                                                    return t = void 0 !== t ? t : d.createFolders, e = h(e), this.files[e] || s.call(this, e, null, {
                                                      dir: !0,
                                                      createFolders: t
                                                    }), this.files[e];
                                                  };

                                                  function u(e) {
                                                    return "[object RegExp]" === Object.prototype.toString.call(e);
                                                  }

                                                  var n = {
                                                    load: function () {
                                                      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                                    },
                                                    forEach: function (e) {
                                                      var t, r, n;

                                                      for (t in this.files) this.files.hasOwnProperty(t) && (n = this.files[t], (r = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(r, n));
                                                    },
                                                    filter: function (r) {
                                                      var n = [];
                                                      return this.forEach(function (e, t) {
                                                        r(e, t) && n.push(t);
                                                      }), n;
                                                    },
                                                    file: function (e, t, r) {
                                                      if (1 !== arguments.length) return e = this.root + e, s.call(this, e, t, r), this;

                                                      if (u(e)) {
                                                        var n = e;
                                                        return this.filter(function (e, t) {
                                                          return !t.dir && n.test(e);
                                                        });
                                                      }

                                                      var i = this.files[this.root + e];
                                                      return i && !i.dir ? i : null;
                                                    },
                                                    folder: function (r) {
                                                      if (!r) return this;
                                                      if (u(r)) return this.filter(function (e, t) {
                                                        return t.dir && r.test(e);
                                                      });
                                                      var e = this.root + r,
                                                          t = g.call(this, e),
                                                          n = this.clone();
                                                      return n.root = t.name, n;
                                                    },
                                                    remove: function (r) {
                                                      r = this.root + r;
                                                      var e = this.files[r];
                                                      if (e || ("/" !== r.slice(-1) && (r += "/"), e = this.files[r]), e && !e.dir) delete this.files[r];else for (var t = this.filter(function (e, t) {
                                                        return t.name.slice(0, r.length) === r;
                                                      }), n = 0; n < t.length; n++) delete this.files[t[n].name];
                                                      return this;
                                                    },
                                                    generate: function (e) {
                                                      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                                    },
                                                    generateInternalStream: function (e) {
                                                      var t,
                                                          r = {};

                                                      try {
                                                        if ((r = f.extend(e || {}, {
                                                          streamFiles: !1,
                                                          compression: "STORE",
                                                          compressionOptions: null,
                                                          type: "",
                                                          platform: "DOS",
                                                          comment: null,
                                                          mimeType: "application/zip",
                                                          encodeFileName: i.utf8encode
                                                        })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type) throw new Error("No output type specified.");
                                                        f.checkSupport(r.type), "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
                                                        var n = r.comment || this.comment || "";
                                                        t = o.generateWorker(this, r, n);
                                                      } catch (e) {
                                                        (t = new l("error")).error(e);
                                                      }

                                                      return new a(t, r.type || "string", r.mimeType);
                                                    },
                                                    generateAsync: function (e, t) {
                                                      return this.generateInternalStream(e).accumulate(t);
                                                    },
                                                    generateNodeStream: function (e, t) {
                                                      return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
                                                    }
                                                  };
                                                  t.exports = n;
                                                }, {
                                                  "./compressedObject": 2,
                                                  "./defaults": 5,
                                                  "./generate": 9,
                                                  "./nodejs/NodejsStreamInputAdapter": 12,
                                                  "./nodejsUtils": 14,
                                                  "./stream/GenericWorker": 28,
                                                  "./stream/StreamHelper": 29,
                                                  "./utf8": 31,
                                                  "./utils": 32,
                                                  "./zipObject": 35
                                                }],
                                                16: [function (e, t, r) {
                                                  t.exports = e("stream");
                                                }, {
                                                  stream: void 0
                                                }],
                                                17: [function (e, t, r) {

                                                  var n = e("./DataReader");

                                                  function i(e) {
                                                    n.call(this, e);

                                                    for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
                                                  }

                                                  e("../utils").inherits(i, n), i.prototype.byteAt = function (e) {
                                                    return this.data[this.zero + e];
                                                  }, i.prototype.lastIndexOfSignature = function (e) {
                                                    for (var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t && this.data[s + 1] === r && this.data[s + 2] === n && this.data[s + 3] === i) return s - this.zero;

                                                    return -1;
                                                  }, i.prototype.readAndCheckSignature = function (e) {
                                                    var t = e.charCodeAt(0),
                                                        r = e.charCodeAt(1),
                                                        n = e.charCodeAt(2),
                                                        i = e.charCodeAt(3),
                                                        s = this.readData(4);
                                                    return t === s[0] && r === s[1] && n === s[2] && i === s[3];
                                                  }, i.prototype.readData = function (e) {
                                                    if (this.checkOffset(e), 0 === e) return [];
                                                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                                                    return this.index += e, t;
                                                  }, t.exports = i;
                                                }, {
                                                  "../utils": 32,
                                                  "./DataReader": 18
                                                }],
                                                18: [function (e, t, r) {

                                                  var n = e("../utils");

                                                  function i(e) {
                                                    this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
                                                  }

                                                  i.prototype = {
                                                    checkOffset: function (e) {
                                                      this.checkIndex(this.index + e);
                                                    },
                                                    checkIndex: function (e) {
                                                      if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
                                                    },
                                                    setIndex: function (e) {
                                                      this.checkIndex(e), this.index = e;
                                                    },
                                                    skip: function (e) {
                                                      this.setIndex(this.index + e);
                                                    },
                                                    byteAt: function (e) {},
                                                    readInt: function (e) {
                                                      var t,
                                                          r = 0;

                                                      for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) r = (r << 8) + this.byteAt(t);

                                                      return this.index += e, r;
                                                    },
                                                    readString: function (e) {
                                                      return n.transformTo("string", this.readData(e));
                                                    },
                                                    readData: function (e) {},
                                                    lastIndexOfSignature: function (e) {},
                                                    readAndCheckSignature: function (e) {},
                                                    readDate: function () {
                                                      var e = this.readInt(4);
                                                      return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
                                                    }
                                                  }, t.exports = i;
                                                }, {
                                                  "../utils": 32
                                                }],
                                                19: [function (e, t, r) {

                                                  var n = e("./Uint8ArrayReader");

                                                  function i(e) {
                                                    n.call(this, e);
                                                  }

                                                  e("../utils").inherits(i, n), i.prototype.readData = function (e) {
                                                    this.checkOffset(e);
                                                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                                                    return this.index += e, t;
                                                  }, t.exports = i;
                                                }, {
                                                  "../utils": 32,
                                                  "./Uint8ArrayReader": 21
                                                }],
                                                20: [function (e, t, r) {

                                                  var n = e("./DataReader");

                                                  function i(e) {
                                                    n.call(this, e);
                                                  }

                                                  e("../utils").inherits(i, n), i.prototype.byteAt = function (e) {
                                                    return this.data.charCodeAt(this.zero + e);
                                                  }, i.prototype.lastIndexOfSignature = function (e) {
                                                    return this.data.lastIndexOf(e) - this.zero;
                                                  }, i.prototype.readAndCheckSignature = function (e) {
                                                    return e === this.readData(4);
                                                  }, i.prototype.readData = function (e) {
                                                    this.checkOffset(e);
                                                    var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                                                    return this.index += e, t;
                                                  }, t.exports = i;
                                                }, {
                                                  "../utils": 32,
                                                  "./DataReader": 18
                                                }],
                                                21: [function (e, t, r) {

                                                  var n = e("./ArrayReader");

                                                  function i(e) {
                                                    n.call(this, e);
                                                  }

                                                  e("../utils").inherits(i, n), i.prototype.readData = function (e) {
                                                    if (this.checkOffset(e), 0 === e) return new Uint8Array(0);
                                                    var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
                                                    return this.index += e, t;
                                                  }, t.exports = i;
                                                }, {
                                                  "../utils": 32,
                                                  "./ArrayReader": 17
                                                }],
                                                22: [function (e, t, r) {

                                                  var n = e("../utils"),
                                                      i = e("../support"),
                                                      s = e("./ArrayReader"),
                                                      a = e("./StringReader"),
                                                      o = e("./NodeBufferReader"),
                                                      u = e("./Uint8ArrayReader");

                                                  t.exports = function (e) {
                                                    var t = n.getTypeOf(e);
                                                    return n.checkSupport(t), "string" !== t || i.uint8array ? "nodebuffer" === t ? new o(e) : i.uint8array ? new u(n.transformTo("uint8array", e)) : new s(n.transformTo("array", e)) : new a(e);
                                                  };
                                                }, {
                                                  "../support": 30,
                                                  "../utils": 32,
                                                  "./ArrayReader": 17,
                                                  "./NodeBufferReader": 19,
                                                  "./StringReader": 20,
                                                  "./Uint8ArrayReader": 21
                                                }],
                                                23: [function (e, t, r) {

                                                  r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\b";
                                                }, {}],
                                                24: [function (e, t, r) {

                                                  var n = e("./GenericWorker"),
                                                      i = e("../utils");

                                                  function s(e) {
                                                    n.call(this, "ConvertWorker to " + e), this.destType = e;
                                                  }

                                                  i.inherits(s, n), s.prototype.processChunk = function (e) {
                                                    this.push({
                                                      data: i.transformTo(this.destType, e.data),
                                                      meta: e.meta
                                                    });
                                                  }, t.exports = s;
                                                }, {
                                                  "../utils": 32,
                                                  "./GenericWorker": 28
                                                }],
                                                25: [function (e, t, r) {

                                                  var n = e("./GenericWorker"),
                                                      i = e("../crc32");

                                                  function s() {
                                                    n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
                                                  }

                                                  e("../utils").inherits(s, n), s.prototype.processChunk = function (e) {
                                                    this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e);
                                                  }, t.exports = s;
                                                }, {
                                                  "../crc32": 4,
                                                  "../utils": 32,
                                                  "./GenericWorker": 28
                                                }],
                                                26: [function (e, t, r) {

                                                  var n = e("../utils"),
                                                      i = e("./GenericWorker");

                                                  function s(e) {
                                                    i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
                                                  }

                                                  n.inherits(s, i), s.prototype.processChunk = function (e) {
                                                    if (e) {
                                                      var t = this.streamInfo[this.propName] || 0;
                                                      this.streamInfo[this.propName] = t + e.data.length;
                                                    }

                                                    i.prototype.processChunk.call(this, e);
                                                  }, t.exports = s;
                                                }, {
                                                  "../utils": 32,
                                                  "./GenericWorker": 28
                                                }],
                                                27: [function (e, t, r) {

                                                  var n = e("../utils"),
                                                      i = e("./GenericWorker");

                                                  function s(e) {
                                                    i.call(this, "DataWorker");
                                                    var t = this;
                                                    this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function (e) {
                                                      t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = n.getTypeOf(e), t.isPaused || t._tickAndRepeat();
                                                    }, function (e) {
                                                      t.error(e);
                                                    });
                                                  }

                                                  n.inherits(s, i), s.prototype.cleanUp = function () {
                                                    i.prototype.cleanUp.call(this), this.data = null;
                                                  }, s.prototype.resume = function () {
                                                    return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0);
                                                  }, s.prototype._tickAndRepeat = function () {
                                                    this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
                                                  }, s.prototype._tick = function () {
                                                    if (this.isPaused || this.isFinished) return !1;
                                                    var e = null,
                                                        t = Math.min(this.max, this.index + 16384);
                                                    if (this.index >= this.max) return this.end();

                                                    switch (this.type) {
                                                      case "string":
                                                        e = this.data.substring(this.index, t);
                                                        break;

                                                      case "uint8array":
                                                        e = this.data.subarray(this.index, t);
                                                        break;

                                                      case "array":
                                                      case "nodebuffer":
                                                        e = this.data.slice(this.index, t);
                                                    }

                                                    return this.index = t, this.push({
                                                      data: e,
                                                      meta: {
                                                        percent: this.max ? this.index / this.max * 100 : 0
                                                      }
                                                    });
                                                  }, t.exports = s;
                                                }, {
                                                  "../utils": 32,
                                                  "./GenericWorker": 28
                                                }],
                                                28: [function (e, t, r) {

                                                  function n(e) {
                                                    this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
                                                      data: [],
                                                      end: [],
                                                      error: []
                                                    }, this.previous = null;
                                                  }

                                                  n.prototype = {
                                                    push: function (e) {
                                                      this.emit("data", e);
                                                    },
                                                    end: function () {
                                                      if (this.isFinished) return !1;
                                                      this.flush();

                                                      try {
                                                        this.emit("end"), this.cleanUp(), this.isFinished = !0;
                                                      } catch (e) {
                                                        this.emit("error", e);
                                                      }

                                                      return !0;
                                                    },
                                                    error: function (e) {
                                                      return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
                                                    },
                                                    on: function (e, t) {
                                                      return this._listeners[e].push(t), this;
                                                    },
                                                    cleanUp: function () {
                                                      this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
                                                    },
                                                    emit: function (e, t) {
                                                      if (this._listeners[e]) for (var r = 0; r < this._listeners[e].length; r++) this._listeners[e][r].call(this, t);
                                                    },
                                                    pipe: function (e) {
                                                      return e.registerPrevious(this);
                                                    },
                                                    registerPrevious: function (e) {
                                                      if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                                                      this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
                                                      var t = this;
                                                      return e.on("data", function (e) {
                                                        t.processChunk(e);
                                                      }), e.on("end", function () {
                                                        t.end();
                                                      }), e.on("error", function (e) {
                                                        t.error(e);
                                                      }), this;
                                                    },
                                                    pause: function () {
                                                      return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
                                                    },
                                                    resume: function () {
                                                      if (!this.isPaused || this.isFinished) return !1;
                                                      var e = this.isPaused = !1;
                                                      return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
                                                    },
                                                    flush: function () {},
                                                    processChunk: function (e) {
                                                      this.push(e);
                                                    },
                                                    withStreamInfo: function (e, t) {
                                                      return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
                                                    },
                                                    mergeStreamInfo: function () {
                                                      for (var e in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
                                                    },
                                                    lock: function () {
                                                      if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                                                      this.isLocked = !0, this.previous && this.previous.lock();
                                                    },
                                                    toString: function () {
                                                      var e = "Worker " + this.name;
                                                      return this.previous ? this.previous + " -> " + e : e;
                                                    }
                                                  }, t.exports = n;
                                                }, {}],
                                                29: [function (e, t, r) {

                                                  var h = e("../utils"),
                                                      i = e("./ConvertWorker"),
                                                      s = e("./GenericWorker"),
                                                      f = e("../base64"),
                                                      n = e("../support"),
                                                      a = e("../external"),
                                                      o = null;
                                                  if (n.nodestream) try {
                                                    o = e("../nodejs/NodejsStreamOutputAdapter");
                                                  } catch (e) {}

                                                  function u(e, t, r) {
                                                    var n = t;

                                                    switch (t) {
                                                      case "blob":
                                                      case "arraybuffer":
                                                        n = "uint8array";
                                                        break;

                                                      case "base64":
                                                        n = "string";
                                                    }

                                                    try {
                                                      this._internalType = n, this._outputType = t, this._mimeType = r, h.checkSupport(n), this._worker = e.pipe(new i(n)), e.lock();
                                                    } catch (e) {
                                                      this._worker = new s("error"), this._worker.error(e);
                                                    }
                                                  }

                                                  u.prototype = {
                                                    accumulate: function (e) {
                                                      return o = this, u = e, new a.Promise(function (t, r) {
                                                        var n = [],
                                                            i = o._internalType,
                                                            s = o._outputType,
                                                            a = o._mimeType;
                                                        o.on("data", function (e, t) {
                                                          n.push(e), u && u(t);
                                                        }).on("error", function (e) {
                                                          n = [], r(e);
                                                        }).on("end", function () {
                                                          try {
                                                            var e = function (e, t, r) {
                                                              switch (e) {
                                                                case "blob":
                                                                  return h.newBlob(h.transformTo("arraybuffer", t), r);

                                                                case "base64":
                                                                  return f.encode(t);

                                                                default:
                                                                  return h.transformTo(e, t);
                                                              }
                                                            }(s, function (e, t) {
                                                              var r,
                                                                  n = 0,
                                                                  i = null,
                                                                  s = 0;

                                                              for (r = 0; r < t.length; r++) s += t[r].length;

                                                              switch (e) {
                                                                case "string":
                                                                  return t.join("");

                                                                case "array":
                                                                  return Array.prototype.concat.apply([], t);

                                                                case "uint8array":
                                                                  for (i = new Uint8Array(s), r = 0; r < t.length; r++) i.set(t[r], n), n += t[r].length;

                                                                  return i;

                                                                case "nodebuffer":
                                                                  return Buffer.concat(t);

                                                                default:
                                                                  throw new Error("concat : unsupported type '" + e + "'");
                                                              }
                                                            }(i, n), a);

                                                            t(e);
                                                          } catch (e) {
                                                            r(e);
                                                          }

                                                          n = [];
                                                        }).resume();
                                                      });
                                                      var o, u;
                                                    },
                                                    on: function (e, t) {
                                                      var r = this;
                                                      return "data" === e ? this._worker.on(e, function (e) {
                                                        t.call(r, e.data, e.meta);
                                                      }) : this._worker.on(e, function () {
                                                        h.delay(t, arguments, r);
                                                      }), this;
                                                    },
                                                    resume: function () {
                                                      return h.delay(this._worker.resume, [], this._worker), this;
                                                    },
                                                    pause: function () {
                                                      return this._worker.pause(), this;
                                                    },
                                                    toNodejsStream: function (e) {
                                                      if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
                                                      return new o(this, {
                                                        objectMode: "nodebuffer" !== this._outputType
                                                      }, e);
                                                    }
                                                  }, t.exports = u;
                                                }, {
                                                  "../base64": 1,
                                                  "../external": 6,
                                                  "../nodejs/NodejsStreamOutputAdapter": 13,
                                                  "../support": 30,
                                                  "../utils": 32,
                                                  "./ConvertWorker": 24,
                                                  "./GenericWorker": 28
                                                }],
                                                30: [function (e, t, r) {

                                                  if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = !1;else {
                                                    var n = new ArrayBuffer(0);

                                                    try {
                                                      r.blob = 0 === new Blob([n], {
                                                        type: "application/zip"
                                                      }).size;
                                                    } catch (e) {
                                                      try {
                                                        var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                                        i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
                                                      } catch (e) {
                                                        r.blob = !1;
                                                      }
                                                    }
                                                  }

                                                  try {
                                                    r.nodestream = !!e("readable-stream").Readable;
                                                  } catch (e) {
                                                    r.nodestream = !1;
                                                  }
                                                }, {
                                                  "readable-stream": 16
                                                }],
                                                31: [function (e, t, s) {

                                                  for (var o = e("./utils"), u = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), h = new Array(256), i = 0; i < 256; i++) h[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;

                                                  function a() {
                                                    n.call(this, "utf-8 decode"), this.leftOver = null;
                                                  }

                                                  function f() {
                                                    n.call(this, "utf-8 encode");
                                                  }

                                                  h[254] = h[254] = 1, s.utf8encode = function (e) {
                                                    return u.nodebuffer ? r.newBufferFrom(e, "utf-8") : function (e) {
                                                      var t,
                                                          r,
                                                          n,
                                                          i,
                                                          s,
                                                          a = e.length,
                                                          o = 0;

                                                      for (i = 0; i < a; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;

                                                      for (t = u.uint8array ? new Uint8Array(o) : new Array(o), i = s = 0; s < o; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), r < 128 ? t[s++] = r : (r < 2048 ? t[s++] = 192 | r >>> 6 : (r < 65536 ? t[s++] = 224 | r >>> 12 : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63), t[s++] = 128 | r >>> 6 & 63), t[s++] = 128 | 63 & r);

                                                      return t;
                                                    }(e);
                                                  }, s.utf8decode = function (e) {
                                                    return u.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : function (e) {
                                                      var t,
                                                          r,
                                                          n,
                                                          i,
                                                          s = e.length,
                                                          a = new Array(2 * s);

                                                      for (t = r = 0; t < s;) if ((n = e[t++]) < 128) a[r++] = n;else if (4 < (i = h[n])) a[r++] = 65533, t += i - 1;else {
                                                        for (n &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && t < s;) n = n << 6 | 63 & e[t++], i--;

                                                        1 < i ? a[r++] = 65533 : n < 65536 ? a[r++] = n : (n -= 65536, a[r++] = 55296 | n >> 10 & 1023, a[r++] = 56320 | 1023 & n);
                                                      }

                                                      return a.length !== r && (a.subarray ? a = a.subarray(0, r) : a.length = r), o.applyFromCharCode(a);
                                                    }(e = o.transformTo(u.uint8array ? "uint8array" : "array", e));
                                                  }, o.inherits(a, n), a.prototype.processChunk = function (e) {
                                                    var t = o.transformTo(u.uint8array ? "uint8array" : "array", e.data);

                                                    if (this.leftOver && this.leftOver.length) {
                                                      if (u.uint8array) {
                                                        var r = t;
                                                        (t = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), t.set(r, this.leftOver.length);
                                                      } else t = this.leftOver.concat(t);

                                                      this.leftOver = null;
                                                    }

                                                    var n = function (e, t) {
                                                      var r;

                                                      for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]);) r--;

                                                      return r < 0 ? t : 0 === r ? t : r + h[e[r]] > t ? r : t;
                                                    }(t),
                                                        i = t;

                                                    n !== t.length && (u.uint8array ? (i = t.subarray(0, n), this.leftOver = t.subarray(n, t.length)) : (i = t.slice(0, n), this.leftOver = t.slice(n, t.length))), this.push({
                                                      data: s.utf8decode(i),
                                                      meta: e.meta
                                                    });
                                                  }, a.prototype.flush = function () {
                                                    this.leftOver && this.leftOver.length && (this.push({
                                                      data: s.utf8decode(this.leftOver),
                                                      meta: {}
                                                    }), this.leftOver = null);
                                                  }, s.Utf8DecodeWorker = a, o.inherits(f, n), f.prototype.processChunk = function (e) {
                                                    this.push({
                                                      data: s.utf8encode(e.data),
                                                      meta: e.meta
                                                    });
                                                  }, s.Utf8EncodeWorker = f;
                                                }, {
                                                  "./nodejsUtils": 14,
                                                  "./stream/GenericWorker": 28,
                                                  "./support": 30,
                                                  "./utils": 32
                                                }],
                                                32: [function (e, t, o) {

                                                  var u = e("./support"),
                                                      h = e("./base64"),
                                                      r = e("./nodejsUtils"),
                                                      n = e("set-immediate-shim"),
                                                      f = e("./external");

                                                  function i(e) {
                                                    return e;
                                                  }

                                                  function l(e, t) {
                                                    for (var r = 0; r < e.length; ++r) t[r] = 255 & e.charCodeAt(r);

                                                    return t;
                                                  }

                                                  o.newBlob = function (t, r) {
                                                    o.checkSupport("blob");

                                                    try {
                                                      return new Blob([t], {
                                                        type: r
                                                      });
                                                    } catch (e) {
                                                      try {
                                                        var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                                        return n.append(t), n.getBlob(r);
                                                      } catch (e) {
                                                        throw new Error("Bug : can't construct the Blob.");
                                                      }
                                                    }
                                                  };

                                                  var s = {
                                                    stringifyByChunk: function (e, t, r) {
                                                      var n = [],
                                                          i = 0,
                                                          s = e.length;
                                                      if (s <= r) return String.fromCharCode.apply(null, e);

                                                      for (; i < s;) "array" === t || "nodebuffer" === t ? n.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + r, s)))) : n.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + r, s)))), i += r;

                                                      return n.join("");
                                                    },
                                                    stringifyByChar: function (e) {
                                                      for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);

                                                      return t;
                                                    },
                                                    applyCanBeUsed: {
                                                      uint8array: function () {
                                                        try {
                                                          return u.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
                                                        } catch (e) {
                                                          return !1;
                                                        }
                                                      }(),
                                                      nodebuffer: function () {
                                                        try {
                                                          return u.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
                                                        } catch (e) {
                                                          return !1;
                                                        }
                                                      }()
                                                    }
                                                  };

                                                  function a(e) {
                                                    var t = 65536,
                                                        r = o.getTypeOf(e),
                                                        n = !0;
                                                    if ("uint8array" === r ? n = s.applyCanBeUsed.uint8array : "nodebuffer" === r && (n = s.applyCanBeUsed.nodebuffer), n) for (; 1 < t;) try {
                                                      return s.stringifyByChunk(e, r, t);
                                                    } catch (e) {
                                                      t = Math.floor(t / 2);
                                                    }
                                                    return s.stringifyByChar(e);
                                                  }

                                                  function d(e, t) {
                                                    for (var r = 0; r < e.length; r++) t[r] = e[r];

                                                    return t;
                                                  }

                                                  o.applyFromCharCode = a;
                                                  var c = {};
                                                  c.string = {
                                                    string: i,
                                                    array: function (e) {
                                                      return l(e, new Array(e.length));
                                                    },
                                                    arraybuffer: function (e) {
                                                      return c.string.uint8array(e).buffer;
                                                    },
                                                    uint8array: function (e) {
                                                      return l(e, new Uint8Array(e.length));
                                                    },
                                                    nodebuffer: function (e) {
                                                      return l(e, r.allocBuffer(e.length));
                                                    }
                                                  }, c.array = {
                                                    string: a,
                                                    array: i,
                                                    arraybuffer: function (e) {
                                                      return new Uint8Array(e).buffer;
                                                    },
                                                    uint8array: function (e) {
                                                      return new Uint8Array(e);
                                                    },
                                                    nodebuffer: function (e) {
                                                      return r.newBufferFrom(e);
                                                    }
                                                  }, c.arraybuffer = {
                                                    string: function (e) {
                                                      return a(new Uint8Array(e));
                                                    },
                                                    array: function (e) {
                                                      return d(new Uint8Array(e), new Array(e.byteLength));
                                                    },
                                                    arraybuffer: i,
                                                    uint8array: function (e) {
                                                      return new Uint8Array(e);
                                                    },
                                                    nodebuffer: function (e) {
                                                      return r.newBufferFrom(new Uint8Array(e));
                                                    }
                                                  }, c.uint8array = {
                                                    string: a,
                                                    array: function (e) {
                                                      return d(e, new Array(e.length));
                                                    },
                                                    arraybuffer: function (e) {
                                                      return e.buffer;
                                                    },
                                                    uint8array: i,
                                                    nodebuffer: function (e) {
                                                      return r.newBufferFrom(e);
                                                    }
                                                  }, c.nodebuffer = {
                                                    string: a,
                                                    array: function (e) {
                                                      return d(e, new Array(e.length));
                                                    },
                                                    arraybuffer: function (e) {
                                                      return c.nodebuffer.uint8array(e).buffer;
                                                    },
                                                    uint8array: function (e) {
                                                      return d(e, new Uint8Array(e.length));
                                                    },
                                                    nodebuffer: i
                                                  }, o.transformTo = function (e, t) {
                                                    if (t = t || "", !e) return t;
                                                    o.checkSupport(e);
                                                    var r = o.getTypeOf(t);
                                                    return c[r][e](t);
                                                  }, o.getTypeOf = function (e) {
                                                    return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : u.nodebuffer && r.isBuffer(e) ? "nodebuffer" : u.uint8array && e instanceof Uint8Array ? "uint8array" : u.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
                                                  }, o.checkSupport = function (e) {
                                                    if (!u[e.toLowerCase()]) throw new Error(e + " is not supported by this platform");
                                                  }, o.MAX_VALUE_16BITS = 65535, o.MAX_VALUE_32BITS = -1, o.pretty = function (e) {
                                                    var t,
                                                        r,
                                                        n = "";

                                                    for (r = 0; r < (e || "").length; r++) n += "\\x" + ((t = e.charCodeAt(r)) < 16 ? "0" : "") + t.toString(16).toUpperCase();

                                                    return n;
                                                  }, o.delay = function (e, t, r) {
                                                    n(function () {
                                                      e.apply(r || null, t || []);
                                                    });
                                                  }, o.inherits = function (e, t) {
                                                    function r() {}

                                                    r.prototype = t.prototype, e.prototype = new r();
                                                  }, o.extend = function () {
                                                    var e,
                                                        t,
                                                        r = {};

                                                    for (e = 0; e < arguments.length; e++) for (t in arguments[e]) arguments[e].hasOwnProperty(t) && void 0 === r[t] && (r[t] = arguments[e][t]);

                                                    return r;
                                                  }, o.prepareContent = function (n, e, i, s, a) {
                                                    return f.Promise.resolve(e).then(function (n) {
                                                      return u.blob && (n instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n))) && "undefined" != typeof FileReader ? new f.Promise(function (t, r) {
                                                        var e = new FileReader();
                                                        e.onload = function (e) {
                                                          t(e.target.result);
                                                        }, e.onerror = function (e) {
                                                          r(e.target.error);
                                                        }, e.readAsArrayBuffer(n);
                                                      }) : n;
                                                    }).then(function (e) {
                                                      var t,
                                                          r = o.getTypeOf(e);
                                                      return r ? ("arraybuffer" === r ? e = o.transformTo("uint8array", e) : "string" === r && (a ? e = h.decode(e) : i && !0 !== s && (e = l(t = e, u.uint8array ? new Uint8Array(t.length) : new Array(t.length)))), e) : f.Promise.reject(new Error("Can't read the data of '" + n + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
                                                    });
                                                  };
                                                }, {
                                                  "./base64": 1,
                                                  "./external": 6,
                                                  "./nodejsUtils": 14,
                                                  "./support": 30,
                                                  "set-immediate-shim": 54
                                                }],
                                                33: [function (e, t, r) {

                                                  var n = e("./reader/readerFor"),
                                                      i = e("./utils"),
                                                      s = e("./signature"),
                                                      a = e("./zipEntry"),
                                                      o = (e("./utf8"), e("./support"));

                                                  function u(e) {
                                                    this.files = [], this.loadOptions = e;
                                                  }

                                                  u.prototype = {
                                                    checkSignature: function (e) {
                                                      if (!this.reader.readAndCheckSignature(e)) {
                                                        this.reader.index -= 4;
                                                        var t = this.reader.readString(4);
                                                        throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
                                                      }
                                                    },
                                                    isSignature: function (e, t) {
                                                      var r = this.reader.index;
                                                      this.reader.setIndex(e);
                                                      var n = this.reader.readString(4) === t;
                                                      return this.reader.setIndex(r), n;
                                                    },
                                                    readBlockEndOfCentral: function () {
                                                      this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                                                      var e = this.reader.readData(this.zipCommentLength),
                                                          t = o.uint8array ? "uint8array" : "array",
                                                          r = i.transformTo(t, e);
                                                      this.zipComment = this.loadOptions.decodeFileName(r);
                                                    },
                                                    readBlockZip64EndOfCentral: function () {
                                                      this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};

                                                      for (var e, t, r, n = this.zip64EndOfCentralSize - 44; 0 < n;) e = this.reader.readInt(2), t = this.reader.readInt(4), r = this.reader.readData(t), this.zip64ExtensibleData[e] = {
                                                        id: e,
                                                        length: t,
                                                        value: r
                                                      };
                                                    },
                                                    readBlockZip64EndOfCentralLocator: function () {
                                                      if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
                                                    },
                                                    readLocalFiles: function () {
                                                      var e, t;

                                                      for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
                                                    },
                                                    readCentralDir: function () {
                                                      var e;

                                                      for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);) (e = new a({
                                                        zip64: this.zip64
                                                      }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);

                                                      if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                                                    },
                                                    readEndOfCentral: function () {
                                                      var e = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
                                                      if (e < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                                                      this.reader.setIndex(e);
                                                      var t = e;

                                                      if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
                                                        if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                                                        if (this.reader.setIndex(e), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                                                        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
                                                      }

                                                      var r = this.centralDirOffset + this.centralDirSize;
                                                      this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
                                                      var n = t - r;
                                                      if (0 < n) this.isSignature(t, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n);else if (n < 0) throw new Error("Corrupted zip: missing " + Math.abs(n) + " bytes.");
                                                    },
                                                    prepareReader: function (e) {
                                                      this.reader = n(e);
                                                    },
                                                    load: function (e) {
                                                      this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
                                                    }
                                                  }, t.exports = u;
                                                }, {
                                                  "./reader/readerFor": 22,
                                                  "./signature": 23,
                                                  "./support": 30,
                                                  "./utf8": 31,
                                                  "./utils": 32,
                                                  "./zipEntry": 34
                                                }],
                                                34: [function (e, t, r) {

                                                  var n = e("./reader/readerFor"),
                                                      s = e("./utils"),
                                                      i = e("./compressedObject"),
                                                      a = e("./crc32"),
                                                      o = e("./utf8"),
                                                      u = e("./compressions"),
                                                      h = e("./support");

                                                  function f(e, t) {
                                                    this.options = e, this.loadOptions = t;
                                                  }

                                                  f.prototype = {
                                                    isEncrypted: function () {
                                                      return 1 == (1 & this.bitFlag);
                                                    },
                                                    useUTF8: function () {
                                                      return 2048 == (2048 & this.bitFlag);
                                                    },
                                                    readLocalPart: function (e) {
                                                      var t, r;
                                                      if (e.skip(22), this.fileNameLength = e.readInt(2), r = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                                                      if (null === (t = function (e) {
                                                        for (var t in u) if (u.hasOwnProperty(t) && u[t].magic === e) return u[t];

                                                        return null;
                                                      }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
                                                      this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
                                                    },
                                                    readCentralPart: function (e) {
                                                      this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
                                                      var t = e.readInt(2);
                                                      if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                                                      e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
                                                    },
                                                    processAttributes: function () {
                                                      this.unixPermissions = null, this.dosPermissions = null;
                                                      var e = this.versionMadeBy >> 8;
                                                      this.dir = !!(16 & this.externalFileAttributes), 0 == e && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0);
                                                    },
                                                    parseZIP64ExtraField: function (e) {
                                                      if (this.extraFields[1]) {
                                                        var t = n(this.extraFields[1].value);
                                                        this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = t.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = t.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = t.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = t.readInt(4));
                                                      }
                                                    },
                                                    readExtraFields: function (e) {
                                                      var t,
                                                          r,
                                                          n,
                                                          i = e.index + this.extraFieldsLength;

                                                      for (this.extraFields || (this.extraFields = {}); e.index + 4 < i;) t = e.readInt(2), r = e.readInt(2), n = e.readData(r), this.extraFields[t] = {
                                                        id: t,
                                                        length: r,
                                                        value: n
                                                      };

                                                      e.setIndex(i);
                                                    },
                                                    handleUTF8: function () {
                                                      var e = h.uint8array ? "uint8array" : "array";
                                                      if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);else {
                                                        var t = this.findExtraFieldUnicodePath();
                                                        if (null !== t) this.fileNameStr = t;else {
                                                          var r = s.transformTo(e, this.fileName);
                                                          this.fileNameStr = this.loadOptions.decodeFileName(r);
                                                        }
                                                        var n = this.findExtraFieldUnicodeComment();
                                                        if (null !== n) this.fileCommentStr = n;else {
                                                          var i = s.transformTo(e, this.fileComment);
                                                          this.fileCommentStr = this.loadOptions.decodeFileName(i);
                                                        }
                                                      }
                                                    },
                                                    findExtraFieldUnicodePath: function () {
                                                      var e = this.extraFields[28789];

                                                      if (e) {
                                                        var t = n(e.value);
                                                        return 1 !== t.readInt(1) ? null : a(this.fileName) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5));
                                                      }

                                                      return null;
                                                    },
                                                    findExtraFieldUnicodeComment: function () {
                                                      var e = this.extraFields[25461];

                                                      if (e) {
                                                        var t = n(e.value);
                                                        return 1 !== t.readInt(1) ? null : a(this.fileComment) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5));
                                                      }

                                                      return null;
                                                    }
                                                  }, t.exports = f;
                                                }, {
                                                  "./compressedObject": 2,
                                                  "./compressions": 3,
                                                  "./crc32": 4,
                                                  "./reader/readerFor": 22,
                                                  "./support": 30,
                                                  "./utf8": 31,
                                                  "./utils": 32
                                                }],
                                                35: [function (e, t, r) {

                                                  function n(e, t, r) {
                                                    this.name = e, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = t, this._dataBinary = r.binary, this.options = {
                                                      compression: r.compression,
                                                      compressionOptions: r.compressionOptions
                                                    };
                                                  }

                                                  var s = e("./stream/StreamHelper"),
                                                      i = e("./stream/DataWorker"),
                                                      a = e("./utf8"),
                                                      o = e("./compressedObject"),
                                                      u = e("./stream/GenericWorker");
                                                  n.prototype = {
                                                    internalStream: function (e) {
                                                      var t = null,
                                                          r = "string";

                                                      try {
                                                        if (!e) throw new Error("No output type specified.");
                                                        var n = "string" === (r = e.toLowerCase()) || "text" === r;
                                                        "binarystring" !== r && "text" !== r || (r = "string"), t = this._decompressWorker();
                                                        var i = !this._dataBinary;
                                                        i && !n && (t = t.pipe(new a.Utf8EncodeWorker())), !i && n && (t = t.pipe(new a.Utf8DecodeWorker()));
                                                      } catch (e) {
                                                        (t = new u("error")).error(e);
                                                      }

                                                      return new s(t, r, "");
                                                    },
                                                    async: function (e, t) {
                                                      return this.internalStream(e).accumulate(t);
                                                    },
                                                    nodeStream: function (e, t) {
                                                      return this.internalStream(e || "nodebuffer").toNodejsStream(t);
                                                    },
                                                    _compressWorker: function (e, t) {
                                                      if (this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();

                                                      var r = this._decompressWorker();

                                                      return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r, e, t);
                                                    },
                                                    _decompressWorker: function () {
                                                      return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof u ? this._data : new i(this._data);
                                                    }
                                                  };

                                                  for (var h = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], f = function () {
                                                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                                  }, l = 0; l < h.length; l++) n.prototype[h[l]] = f;

                                                  t.exports = n;
                                                }, {
                                                  "./compressedObject": 2,
                                                  "./stream/DataWorker": 27,
                                                  "./stream/GenericWorker": 28,
                                                  "./stream/StreamHelper": 29,
                                                  "./utf8": 31
                                                }],
                                                36: [function (e, f, t) {
                                                  (function (t) {

                                                    var r,
                                                        n,
                                                        e = t.MutationObserver || t.WebKitMutationObserver;

                                                    if (e) {
                                                      var i = 0,
                                                          s = new e(h),
                                                          a = t.document.createTextNode("");
                                                      s.observe(a, {
                                                        characterData: !0
                                                      }), r = function () {
                                                        a.data = i = ++i % 2;
                                                      };
                                                    } else if (t.setImmediate || void 0 === t.MessageChannel) r = "document" in t && "onreadystatechange" in t.document.createElement("script") ? function () {
                                                      var e = t.document.createElement("script");
                                                      e.onreadystatechange = function () {
                                                        h(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null;
                                                      }, t.document.documentElement.appendChild(e);
                                                    } : function () {
                                                      setTimeout(h, 0);
                                                    };else {
                                                      var o = new t.MessageChannel();
                                                      o.port1.onmessage = h, r = function () {
                                                        o.port2.postMessage(0);
                                                      };
                                                    }

                                                    var u = [];

                                                    function h() {
                                                      var e, t;
                                                      n = !0;

                                                      for (var r = u.length; r;) {
                                                        for (t = u, u = [], e = -1; ++e < r;) t[e]();

                                                        r = u.length;
                                                      }

                                                      n = !1;
                                                    }

                                                    f.exports = function (e) {
                                                      1 !== u.push(e) || n || r();
                                                    };
                                                  }).call(this, void 0 !== r ? r : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                                                }, {}],
                                                37: [function (e, t, r) {

                                                  var i = e("immediate");

                                                  function h() {}

                                                  var f = {},
                                                      s = ["REJECTED"],
                                                      a = ["FULFILLED"],
                                                      n = ["PENDING"];

                                                  function o(e) {
                                                    if ("function" != typeof e) throw new TypeError("resolver must be a function");
                                                    this.state = n, this.queue = [], this.outcome = void 0, e !== h && c(this, e);
                                                  }

                                                  function u(e, t, r) {
                                                    this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected);
                                                  }

                                                  function l(t, r, n) {
                                                    i(function () {
                                                      var e;

                                                      try {
                                                        e = r(n);
                                                      } catch (e) {
                                                        return f.reject(t, e);
                                                      }

                                                      e === t ? f.reject(t, new TypeError("Cannot resolve promise with itself")) : f.resolve(t, e);
                                                    });
                                                  }

                                                  function d(e) {
                                                    var t = e && e.then;
                                                    if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function () {
                                                      t.apply(e, arguments);
                                                    };
                                                  }

                                                  function c(t, e) {
                                                    var r = !1;

                                                    function n(e) {
                                                      r || (r = !0, f.reject(t, e));
                                                    }

                                                    function i(e) {
                                                      r || (r = !0, f.resolve(t, e));
                                                    }

                                                    var s = p(function () {
                                                      e(i, n);
                                                    });
                                                    "error" === s.status && n(s.value);
                                                  }

                                                  function p(e, t) {
                                                    var r = {};

                                                    try {
                                                      r.value = e(t), r.status = "success";
                                                    } catch (e) {
                                                      r.status = "error", r.value = e;
                                                    }

                                                    return r;
                                                  }

                                                  (t.exports = o).prototype.finally = function (t) {
                                                    if ("function" != typeof t) return this;
                                                    var r = this.constructor;
                                                    return this.then(function (e) {
                                                      return r.resolve(t()).then(function () {
                                                        return e;
                                                      });
                                                    }, function (e) {
                                                      return r.resolve(t()).then(function () {
                                                        throw e;
                                                      });
                                                    });
                                                  }, o.prototype.catch = function (e) {
                                                    return this.then(null, e);
                                                  }, o.prototype.then = function (e, t) {
                                                    if ("function" != typeof e && this.state === a || "function" != typeof t && this.state === s) return this;
                                                    var r = new this.constructor(h);
                                                    return this.state !== n ? l(r, this.state === a ? e : t, this.outcome) : this.queue.push(new u(r, e, t)), r;
                                                  }, u.prototype.callFulfilled = function (e) {
                                                    f.resolve(this.promise, e);
                                                  }, u.prototype.otherCallFulfilled = function (e) {
                                                    l(this.promise, this.onFulfilled, e);
                                                  }, u.prototype.callRejected = function (e) {
                                                    f.reject(this.promise, e);
                                                  }, u.prototype.otherCallRejected = function (e) {
                                                    l(this.promise, this.onRejected, e);
                                                  }, f.resolve = function (e, t) {
                                                    var r = p(d, t);
                                                    if ("error" === r.status) return f.reject(e, r.value);
                                                    var n = r.value;
                                                    if (n) c(e, n);else {
                                                      e.state = a, e.outcome = t;

                                                      for (var i = -1, s = e.queue.length; ++i < s;) e.queue[i].callFulfilled(t);
                                                    }
                                                    return e;
                                                  }, f.reject = function (e, t) {
                                                    e.state = s, e.outcome = t;

                                                    for (var r = -1, n = e.queue.length; ++r < n;) e.queue[r].callRejected(t);

                                                    return e;
                                                  }, o.resolve = function (e) {
                                                    return e instanceof this ? e : f.resolve(new this(h), e);
                                                  }, o.reject = function (e) {
                                                    var t = new this(h);
                                                    return f.reject(t, e);
                                                  }, o.all = function (e) {
                                                    var r = this;
                                                    if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                                                    var n = e.length,
                                                        i = !1;
                                                    if (!n) return this.resolve([]);

                                                    for (var s = new Array(n), a = 0, t = -1, o = new this(h); ++t < n;) u(e[t], t);

                                                    return o;

                                                    function u(e, t) {
                                                      r.resolve(e).then(function (e) {
                                                        s[t] = e, ++a !== n || i || (i = !0, f.resolve(o, s));
                                                      }, function (e) {
                                                        i || (i = !0, f.reject(o, e));
                                                      });
                                                    }
                                                  }, o.race = function (e) {
                                                    if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                                                    var t = e.length,
                                                        r = !1;
                                                    if (!t) return this.resolve([]);

                                                    for (var n, i = -1, s = new this(h); ++i < t;) n = e[i], this.resolve(n).then(function (e) {
                                                      r || (r = !0, f.resolve(s, e));
                                                    }, function (e) {
                                                      r || (r = !0, f.reject(s, e));
                                                    });

                                                    return s;
                                                  };
                                                }, {
                                                  immediate: 36
                                                }],
                                                38: [function (e, t, r) {

                                                  var n = {};
                                                  (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
                                                }, {
                                                  "./lib/deflate": 39,
                                                  "./lib/inflate": 40,
                                                  "./lib/utils/common": 41,
                                                  "./lib/zlib/constants": 44
                                                }],
                                                39: [function (e, t, r) {

                                                  var a = e("./zlib/deflate"),
                                                      o = e("./utils/common"),
                                                      u = e("./utils/strings"),
                                                      i = e("./zlib/messages"),
                                                      s = e("./zlib/zstream"),
                                                      h = Object.prototype.toString,
                                                      f = 0,
                                                      l = -1,
                                                      d = 0,
                                                      c = 8;

                                                  function p(e) {
                                                    if (!(this instanceof p)) return new p(e);
                                                    this.options = o.assign({
                                                      level: l,
                                                      method: c,
                                                      chunkSize: 16384,
                                                      windowBits: 15,
                                                      memLevel: 8,
                                                      strategy: d,
                                                      to: ""
                                                    }, e || {});
                                                    var t = this.options;
                                                    t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
                                                    var r = a.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
                                                    if (r !== f) throw new Error(i[r]);

                                                    if (t.header && a.deflateSetHeader(this.strm, t.header), t.dictionary) {
                                                      var n;
                                                      if (n = "string" == typeof t.dictionary ? u.string2buf(t.dictionary) : "[object ArrayBuffer]" === h.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (r = a.deflateSetDictionary(this.strm, n)) !== f) throw new Error(i[r]);
                                                      this._dict_set = !0;
                                                    }
                                                  }

                                                  function n(e, t) {
                                                    var r = new p(t);
                                                    if (r.push(e, !0), r.err) throw r.msg || i[r.err];
                                                    return r.result;
                                                  }

                                                  p.prototype.push = function (e, t) {
                                                    var r,
                                                        n,
                                                        i = this.strm,
                                                        s = this.options.chunkSize;
                                                    if (this.ended) return !1;
                                                    n = t === ~~t ? t : !0 === t ? 4 : 0, "string" == typeof e ? i.input = u.string2buf(e) : "[object ArrayBuffer]" === h.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;

                                                    do {
                                                      if (0 === i.avail_out && (i.output = new o.Buf8(s), i.next_out = 0, i.avail_out = s), 1 !== (r = a.deflate(i, n)) && r !== f) return this.onEnd(r), !(this.ended = !0);
                                                      0 !== i.avail_out && (0 !== i.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(u.buf2binstring(o.shrinkBuf(i.output, i.next_out))) : this.onData(o.shrinkBuf(i.output, i.next_out)));
                                                    } while ((0 < i.avail_in || 0 === i.avail_out) && 1 !== r);

                                                    return 4 === n ? (r = a.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === f) : 2 !== n || (this.onEnd(f), !(i.avail_out = 0));
                                                  }, p.prototype.onData = function (e) {
                                                    this.chunks.push(e);
                                                  }, p.prototype.onEnd = function (e) {
                                                    e === f && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
                                                  }, r.Deflate = p, r.deflate = n, r.deflateRaw = function (e, t) {
                                                    return (t = t || {}).raw = !0, n(e, t);
                                                  }, r.gzip = function (e, t) {
                                                    return (t = t || {}).gzip = !0, n(e, t);
                                                  };
                                                }, {
                                                  "./utils/common": 41,
                                                  "./utils/strings": 42,
                                                  "./zlib/deflate": 46,
                                                  "./zlib/messages": 51,
                                                  "./zlib/zstream": 53
                                                }],
                                                40: [function (e, t, r) {

                                                  var d = e("./zlib/inflate"),
                                                      c = e("./utils/common"),
                                                      p = e("./utils/strings"),
                                                      m = e("./zlib/constants"),
                                                      n = e("./zlib/messages"),
                                                      i = e("./zlib/zstream"),
                                                      s = e("./zlib/gzheader"),
                                                      _ = Object.prototype.toString;

                                                  function a(e) {
                                                    if (!(this instanceof a)) return new a(e);
                                                    this.options = c.assign({
                                                      chunkSize: 16384,
                                                      windowBits: 0,
                                                      to: ""
                                                    }, e || {});
                                                    var t = this.options;
                                                    t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
                                                    var r = d.inflateInit2(this.strm, t.windowBits);
                                                    if (r !== m.Z_OK) throw new Error(n[r]);
                                                    this.header = new s(), d.inflateGetHeader(this.strm, this.header);
                                                  }

                                                  function o(e, t) {
                                                    var r = new a(t);
                                                    if (r.push(e, !0), r.err) throw r.msg || n[r.err];
                                                    return r.result;
                                                  }

                                                  a.prototype.push = function (e, t) {
                                                    var r,
                                                        n,
                                                        i,
                                                        s,
                                                        a,
                                                        o,
                                                        u = this.strm,
                                                        h = this.options.chunkSize,
                                                        f = this.options.dictionary,
                                                        l = !1;
                                                    if (this.ended) return !1;
                                                    n = t === ~~t ? t : !0 === t ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e ? u.input = p.binstring2buf(e) : "[object ArrayBuffer]" === _.call(e) ? u.input = new Uint8Array(e) : u.input = e, u.next_in = 0, u.avail_in = u.input.length;

                                                    do {
                                                      if (0 === u.avail_out && (u.output = new c.Buf8(h), u.next_out = 0, u.avail_out = h), (r = d.inflate(u, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && f && (o = "string" == typeof f ? p.string2buf(f) : "[object ArrayBuffer]" === _.call(f) ? new Uint8Array(f) : f, r = d.inflateSetDictionary(this.strm, o)), r === m.Z_BUF_ERROR && !0 === l && (r = m.Z_OK, l = !1), r !== m.Z_STREAM_END && r !== m.Z_OK) return this.onEnd(r), !(this.ended = !0);
                                                      u.next_out && (0 !== u.avail_out && r !== m.Z_STREAM_END && (0 !== u.avail_in || n !== m.Z_FINISH && n !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = p.utf8border(u.output, u.next_out), s = u.next_out - i, a = p.buf2string(u.output, i), u.next_out = s, u.avail_out = h - s, s && c.arraySet(u.output, u.output, i, s, 0), this.onData(a)) : this.onData(c.shrinkBuf(u.output, u.next_out)))), 0 === u.avail_in && 0 === u.avail_out && (l = !0);
                                                    } while ((0 < u.avail_in || 0 === u.avail_out) && r !== m.Z_STREAM_END);

                                                    return r === m.Z_STREAM_END && (n = m.Z_FINISH), n === m.Z_FINISH ? (r = d.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === m.Z_OK) : n !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(u.avail_out = 0));
                                                  }, a.prototype.onData = function (e) {
                                                    this.chunks.push(e);
                                                  }, a.prototype.onEnd = function (e) {
                                                    e === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = c.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
                                                  }, r.Inflate = a, r.inflate = o, r.inflateRaw = function (e, t) {
                                                    return (t = t || {}).raw = !0, o(e, t);
                                                  }, r.ungzip = o;
                                                }, {
                                                  "./utils/common": 41,
                                                  "./utils/strings": 42,
                                                  "./zlib/constants": 44,
                                                  "./zlib/gzheader": 47,
                                                  "./zlib/inflate": 49,
                                                  "./zlib/messages": 51,
                                                  "./zlib/zstream": 53
                                                }],
                                                41: [function (e, t, r) {

                                                  var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                                                  r.assign = function (e) {
                                                    for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                                                      var r = t.shift();

                                                      if (r) {
                                                        if ("object" != typeof r) throw new TypeError(r + "must be non-object");

                                                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
                                                      }
                                                    }

                                                    return e;
                                                  }, r.shrinkBuf = function (e, t) {
                                                    return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
                                                  };
                                                  var i = {
                                                    arraySet: function (e, t, r, n, i) {
                                                      if (t.subarray && e.subarray) e.set(t.subarray(r, r + n), i);else for (var s = 0; s < n; s++) e[i + s] = t[r + s];
                                                    },
                                                    flattenChunks: function (e) {
                                                      var t, r, n, i, s, a;

                                                      for (t = n = 0, r = e.length; t < r; t++) n += e[t].length;

                                                      for (a = new Uint8Array(n), t = i = 0, r = e.length; t < r; t++) s = e[t], a.set(s, i), i += s.length;

                                                      return a;
                                                    }
                                                  },
                                                      s = {
                                                    arraySet: function (e, t, r, n, i) {
                                                      for (var s = 0; s < n; s++) e[i + s] = t[r + s];
                                                    },
                                                    flattenChunks: function (e) {
                                                      return [].concat.apply([], e);
                                                    }
                                                  };
                                                  r.setTyped = function (e) {
                                                    e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
                                                  }, r.setTyped(n);
                                                }, {}],
                                                42: [function (e, t, r) {

                                                  var u = e("./common"),
                                                      i = !0,
                                                      s = !0;

                                                  try {
                                                    String.fromCharCode.apply(null, [0]);
                                                  } catch (e) {
                                                    i = !1;
                                                  }

                                                  try {
                                                    String.fromCharCode.apply(null, new Uint8Array(1));
                                                  } catch (e) {
                                                    s = !1;
                                                  }

                                                  for (var h = new u.Buf8(256), n = 0; n < 256; n++) h[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;

                                                  function f(e, t) {
                                                    if (t < 65537 && (e.subarray && s || !e.subarray && i)) return String.fromCharCode.apply(null, u.shrinkBuf(e, t));

                                                    for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);

                                                    return r;
                                                  }

                                                  h[254] = h[254] = 1, r.string2buf = function (e) {
                                                    var t,
                                                        r,
                                                        n,
                                                        i,
                                                        s,
                                                        a = e.length,
                                                        o = 0;

                                                    for (i = 0; i < a; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;

                                                    for (t = new u.Buf8(o), i = s = 0; s < o; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), r < 128 ? t[s++] = r : (r < 2048 ? t[s++] = 192 | r >>> 6 : (r < 65536 ? t[s++] = 224 | r >>> 12 : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63), t[s++] = 128 | r >>> 6 & 63), t[s++] = 128 | 63 & r);

                                                    return t;
                                                  }, r.buf2binstring = function (e) {
                                                    return f(e, e.length);
                                                  }, r.binstring2buf = function (e) {
                                                    for (var t = new u.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);

                                                    return t;
                                                  }, r.buf2string = function (e, t) {
                                                    var r,
                                                        n,
                                                        i,
                                                        s,
                                                        a = t || e.length,
                                                        o = new Array(2 * a);

                                                    for (r = n = 0; r < a;) if ((i = e[r++]) < 128) o[n++] = i;else if (4 < (s = h[i])) o[n++] = 65533, r += s - 1;else {
                                                      for (i &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a;) i = i << 6 | 63 & e[r++], s--;

                                                      1 < s ? o[n++] = 65533 : i < 65536 ? o[n++] = i : (i -= 65536, o[n++] = 55296 | i >> 10 & 1023, o[n++] = 56320 | 1023 & i);
                                                    }

                                                    return f(o, n);
                                                  }, r.utf8border = function (e, t) {
                                                    var r;

                                                    for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]);) r--;

                                                    return r < 0 ? t : 0 === r ? t : r + h[e[r]] > t ? r : t;
                                                  };
                                                }, {
                                                  "./common": 41
                                                }],
                                                43: [function (e, t, r) {

                                                  t.exports = function (e, t, r, n) {
                                                    for (var i = 65535 & e | 0, s = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                                                      for (r -= a = 2e3 < r ? 2e3 : r; s = s + (i = i + t[n++] | 0) | 0, --a;);

                                                      i %= 65521, s %= 65521;
                                                    }

                                                    return i | s << 16 | 0;
                                                  };
                                                }, {}],
                                                44: [function (e, t, r) {

                                                  t.exports = {
                                                    Z_NO_FLUSH: 0,
                                                    Z_PARTIAL_FLUSH: 1,
                                                    Z_SYNC_FLUSH: 2,
                                                    Z_FULL_FLUSH: 3,
                                                    Z_FINISH: 4,
                                                    Z_BLOCK: 5,
                                                    Z_TREES: 6,
                                                    Z_OK: 0,
                                                    Z_STREAM_END: 1,
                                                    Z_NEED_DICT: 2,
                                                    Z_ERRNO: -1,
                                                    Z_STREAM_ERROR: -2,
                                                    Z_DATA_ERROR: -3,
                                                    Z_BUF_ERROR: -5,
                                                    Z_NO_COMPRESSION: 0,
                                                    Z_BEST_SPEED: 1,
                                                    Z_BEST_COMPRESSION: 9,
                                                    Z_DEFAULT_COMPRESSION: -1,
                                                    Z_FILTERED: 1,
                                                    Z_HUFFMAN_ONLY: 2,
                                                    Z_RLE: 3,
                                                    Z_FIXED: 4,
                                                    Z_DEFAULT_STRATEGY: 0,
                                                    Z_BINARY: 0,
                                                    Z_TEXT: 1,
                                                    Z_UNKNOWN: 2,
                                                    Z_DEFLATED: 8
                                                  };
                                                }, {}],
                                                45: [function (e, t, r) {

                                                  var o = function () {
                                                    for (var e, t = [], r = 0; r < 256; r++) {
                                                      e = r;

                                                      for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;

                                                      t[r] = e;
                                                    }

                                                    return t;
                                                  }();

                                                  t.exports = function (e, t, r, n) {
                                                    var i = o,
                                                        s = n + r;
                                                    e ^= -1;

                                                    for (var a = n; a < s; a++) e = e >>> 8 ^ i[255 & (e ^ t[a])];

                                                    return -1 ^ e;
                                                  };
                                                }, {}],
                                                46: [function (e, t, r) {

                                                  var u,
                                                      d = e("../utils/common"),
                                                      h = e("./trees"),
                                                      c = e("./adler32"),
                                                      p = e("./crc32"),
                                                      n = e("./messages"),
                                                      f = 0,
                                                      l = 0,
                                                      m = -2,
                                                      i = 2,
                                                      _ = 8,
                                                      s = 286,
                                                      a = 30,
                                                      o = 19,
                                                      g = 2 * s + 1,
                                                      v = 15,
                                                      b = 3,
                                                      w = 258,
                                                      y = w + b + 1,
                                                      k = 42,
                                                      x = 113;

                                                  function S(e, t) {
                                                    return e.msg = n[t], t;
                                                  }

                                                  function z(e) {
                                                    return (e << 1) - (4 < e ? 9 : 0);
                                                  }

                                                  function E(e) {
                                                    for (var t = e.length; 0 <= --t;) e[t] = 0;
                                                  }

                                                  function C(e) {
                                                    var t = e.state,
                                                        r = t.pending;
                                                    r > e.avail_out && (r = e.avail_out), 0 !== r && (d.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, 0 === t.pending && (t.pending_out = 0));
                                                  }

                                                  function A(e, t) {
                                                    h._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, C(e.strm);
                                                  }

                                                  function I(e, t) {
                                                    e.pending_buf[e.pending++] = t;
                                                  }

                                                  function O(e, t) {
                                                    e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
                                                  }

                                                  function B(e, t) {
                                                    var r,
                                                        n,
                                                        i = e.max_chain_length,
                                                        s = e.strstart,
                                                        a = e.prev_length,
                                                        o = e.nice_match,
                                                        u = e.strstart > e.w_size - y ? e.strstart - (e.w_size - y) : 0,
                                                        h = e.window,
                                                        f = e.w_mask,
                                                        l = e.prev,
                                                        d = e.strstart + w,
                                                        c = h[s + a - 1],
                                                        p = h[s + a];
                                                    e.prev_length >= e.good_match && (i >>= 2), o > e.lookahead && (o = e.lookahead);

                                                    do {
                                                      if (h[(r = t) + a] === p && h[r + a - 1] === c && h[r] === h[s] && h[++r] === h[s + 1]) {
                                                        s += 2, r++;

                                                        do {} while (h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && s < d);

                                                        if (n = w - (d - s), s = d - w, a < n) {
                                                          if (e.match_start = t, o <= (a = n)) break;
                                                          c = h[s + a - 1], p = h[s + a];
                                                        }
                                                      }
                                                    } while ((t = l[t & f]) > u && 0 != --i);

                                                    return a <= e.lookahead ? a : e.lookahead;
                                                  }

                                                  function T(e) {
                                                    var t,
                                                        r,
                                                        n,
                                                        i,
                                                        s,
                                                        a,
                                                        o,
                                                        u,
                                                        h,
                                                        f,
                                                        l = e.w_size;

                                                    do {
                                                      if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= l + (l - y)) {
                                                        for (d.arraySet(e.window, e.window, l, l, 0), e.match_start -= l, e.strstart -= l, e.block_start -= l, t = r = e.hash_size; n = e.head[--t], e.head[t] = l <= n ? n - l : 0, --r;);

                                                        for (t = r = l; n = e.prev[--t], e.prev[t] = l <= n ? n - l : 0, --r;);

                                                        i += l;
                                                      }

                                                      if (0 === e.strm.avail_in) break;
                                                      if (a = e.strm, o = e.window, u = e.strstart + e.lookahead, f = void 0, (h = i) < (f = a.avail_in) && (f = h), r = 0 === f ? 0 : (a.avail_in -= f, d.arraySet(o, a.input, a.next_in, f, u), 1 === a.state.wrap ? a.adler = c(a.adler, o, f, u) : 2 === a.state.wrap && (a.adler = p(a.adler, o, f, u)), a.next_in += f, a.total_in += f, f), e.lookahead += r, e.lookahead + e.insert >= b) for (s = e.strstart - e.insert, e.ins_h = e.window[s], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + b - 1]) & e.hash_mask, e.prev[s & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = s, s++, e.insert--, !(e.lookahead + e.insert < b)););
                                                    } while (e.lookahead < y && 0 !== e.strm.avail_in);
                                                  }

                                                  function R(e, t) {
                                                    for (var r, n;;) {
                                                      if (e.lookahead < y) {
                                                        if (T(e), e.lookahead < y && t === f) return 1;
                                                        if (0 === e.lookahead) break;
                                                      }

                                                      if (r = 0, e.lookahead >= b && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== r && e.strstart - r <= e.w_size - y && (e.match_length = B(e, r)), e.match_length >= b) {
                                                        if (n = h._tr_tally(e, e.strstart - e.match_start, e.match_length - b), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= b) {
                                                          for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, 0 != --e.match_length;);

                                                          e.strstart++;
                                                        } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                                                      } else n = h._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
                                                      if (n && (A(e, !1), 0 === e.strm.avail_out)) return 1;
                                                    }

                                                    return e.insert = e.strstart < b - 1 ? e.strstart : b - 1, 4 === t ? (A(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (A(e, !1), 0 === e.strm.avail_out) ? 1 : 2;
                                                  }

                                                  function D(e, t) {
                                                    for (var r, n, i;;) {
                                                      if (e.lookahead < y) {
                                                        if (T(e), e.lookahead < y && t === f) return 1;
                                                        if (0 === e.lookahead) break;
                                                      }

                                                      if (r = 0, e.lookahead >= b && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = b - 1, 0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - y && (e.match_length = B(e, r), e.match_length <= 5 && (1 === e.strategy || e.match_length === b && 4096 < e.strstart - e.match_start) && (e.match_length = b - 1)), e.prev_length >= b && e.match_length <= e.prev_length) {
                                                        for (i = e.strstart + e.lookahead - b, n = h._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - b), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + b - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 != --e.prev_length;);

                                                        if (e.match_available = 0, e.match_length = b - 1, e.strstart++, n && (A(e, !1), 0 === e.strm.avail_out)) return 1;
                                                      } else if (e.match_available) {
                                                        if ((n = h._tr_tally(e, 0, e.window[e.strstart - 1])) && A(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1;
                                                      } else e.match_available = 1, e.strstart++, e.lookahead--;
                                                    }

                                                    return e.match_available && (n = h._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < b - 1 ? e.strstart : b - 1, 4 === t ? (A(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (A(e, !1), 0 === e.strm.avail_out) ? 1 : 2;
                                                  }

                                                  function F(e, t, r, n, i) {
                                                    this.good_length = e, this.max_lazy = t, this.nice_length = r, this.max_chain = n, this.func = i;
                                                  }

                                                  function N() {
                                                    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = _, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new d.Buf16(2 * g), this.dyn_dtree = new d.Buf16(2 * (2 * a + 1)), this.bl_tree = new d.Buf16(2 * (2 * o + 1)), E(this.dyn_ltree), E(this.dyn_dtree), E(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new d.Buf16(v + 1), this.heap = new d.Buf16(2 * s + 1), E(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new d.Buf16(2 * s + 1), E(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
                                                  }

                                                  function U(e) {
                                                    var t;
                                                    return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = i, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? k : x, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = f, h._tr_init(t), l) : S(e, m);
                                                  }

                                                  function P(e) {
                                                    var t,
                                                        r = U(e);
                                                    return r === l && ((t = e.state).window_size = 2 * t.w_size, E(t.head), t.max_lazy_match = u[t.level].max_lazy, t.good_match = u[t.level].good_length, t.nice_match = u[t.level].nice_length, t.max_chain_length = u[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = b - 1, t.match_available = 0, t.ins_h = 0), r;
                                                  }

                                                  function L(e, t, r, n, i, s) {
                                                    if (!e) return m;
                                                    var a = 1;
                                                    if (-1 === t && (t = 6), n < 0 ? (a = 0, n = -n) : 15 < n && (a = 2, n -= 16), i < 1 || 9 < i || r !== _ || n < 8 || 15 < n || t < 0 || 9 < t || s < 0 || 4 < s) return S(e, m);
                                                    8 === n && (n = 9);
                                                    var o = new N();
                                                    return (e.state = o).strm = e, o.wrap = a, o.gzhead = null, o.w_bits = n, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + b - 1) / b), o.window = new d.Buf8(2 * o.w_size), o.head = new d.Buf16(o.hash_size), o.prev = new d.Buf16(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new d.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = t, o.strategy = s, o.method = r, P(e);
                                                  }

                                                  u = [new F(0, 0, 0, 0, function (e, t) {
                                                    var r = 65535;

                                                    for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5);;) {
                                                      if (e.lookahead <= 1) {
                                                        if (T(e), 0 === e.lookahead && t === f) return 1;
                                                        if (0 === e.lookahead) break;
                                                      }

                                                      e.strstart += e.lookahead, e.lookahead = 0;
                                                      var n = e.block_start + r;
                                                      if ((0 === e.strstart || e.strstart >= n) && (e.lookahead = e.strstart - n, e.strstart = n, A(e, !1), 0 === e.strm.avail_out)) return 1;
                                                      if (e.strstart - e.block_start >= e.w_size - y && (A(e, !1), 0 === e.strm.avail_out)) return 1;
                                                    }

                                                    return e.insert = 0, 4 === t ? (A(e, !0), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (A(e, !1), e.strm.avail_out), 1);
                                                  }), new F(4, 4, 8, 4, R), new F(4, 5, 16, 8, R), new F(4, 6, 32, 32, R), new F(4, 4, 16, 16, D), new F(8, 16, 32, 32, D), new F(8, 16, 128, 128, D), new F(8, 32, 128, 256, D), new F(32, 128, 258, 1024, D), new F(32, 258, 258, 4096, D)], r.deflateInit = function (e, t) {
                                                    return L(e, t, _, 15, 8, 0);
                                                  }, r.deflateInit2 = L, r.deflateReset = P, r.deflateResetKeep = U, r.deflateSetHeader = function (e, t) {
                                                    return e && e.state ? 2 !== e.state.wrap ? m : (e.state.gzhead = t, l) : m;
                                                  }, r.deflate = function (e, t) {
                                                    var r, n, i, s;
                                                    if (!e || !e.state || 5 < t || t < 0) return e ? S(e, m) : m;
                                                    if (n = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === n.status && 4 !== t) return S(e, 0 === e.avail_out ? -5 : m);
                                                    if (n.strm = e, r = n.last_flush, n.last_flush = t, n.status === k) if (2 === n.wrap) e.adler = 0, I(n, 31), I(n, 139), I(n, 8), n.gzhead ? (I(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), I(n, 255 & n.gzhead.time), I(n, n.gzhead.time >> 8 & 255), I(n, n.gzhead.time >> 16 & 255), I(n, n.gzhead.time >> 24 & 255), I(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), I(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (I(n, 255 & n.gzhead.extra.length), I(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = p(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (I(n, 0), I(n, 0), I(n, 0), I(n, 0), I(n, 0), I(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), I(n, 3), n.status = x);else {
                                                      var a = _ + (n.w_bits - 8 << 4) << 8;
                                                      a |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6, 0 !== n.strstart && (a |= 32), a += 31 - a % 31, n.status = x, O(n, a), 0 !== n.strstart && (O(n, e.adler >>> 16), O(n, 65535 & e.adler)), e.adler = 1;
                                                    }
                                                    if (69 === n.status) if (n.gzhead.extra) {
                                                      for (i = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), C(e), i = n.pending, n.pending !== n.pending_buf_size));) I(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;

                                                      n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);
                                                    } else n.status = 73;
                                                    if (73 === n.status) if (n.gzhead.name) {
                                                      i = n.pending;

                                                      do {
                                                        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), C(e), i = n.pending, n.pending === n.pending_buf_size)) {
                                                          s = 1;
                                                          break;
                                                        }

                                                        s = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, I(n, s);
                                                      } while (0 !== s);

                                                      n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), 0 === s && (n.gzindex = 0, n.status = 91);
                                                    } else n.status = 91;
                                                    if (91 === n.status) if (n.gzhead.comment) {
                                                      i = n.pending;

                                                      do {
                                                        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), C(e), i = n.pending, n.pending === n.pending_buf_size)) {
                                                          s = 1;
                                                          break;
                                                        }

                                                        s = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, I(n, s);
                                                      } while (0 !== s);

                                                      n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), 0 === s && (n.status = 103);
                                                    } else n.status = 103;

                                                    if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && C(e), n.pending + 2 <= n.pending_buf_size && (I(n, 255 & e.adler), I(n, e.adler >> 8 & 255), e.adler = 0, n.status = x)) : n.status = x), 0 !== n.pending) {
                                                      if (C(e), 0 === e.avail_out) return n.last_flush = -1, l;
                                                    } else if (0 === e.avail_in && z(t) <= z(r) && 4 !== t) return S(e, -5);

                                                    if (666 === n.status && 0 !== e.avail_in) return S(e, -5);

                                                    if (0 !== e.avail_in || 0 !== n.lookahead || t !== f && 666 !== n.status) {
                                                      var o = 2 === n.strategy ? function (e, t) {
                                                        for (var r;;) {
                                                          if (0 === e.lookahead && (T(e), 0 === e.lookahead)) {
                                                            if (t === f) return 1;
                                                            break;
                                                          }

                                                          if (e.match_length = 0, r = h._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (A(e, !1), 0 === e.strm.avail_out)) return 1;
                                                        }

                                                        return e.insert = 0, 4 === t ? (A(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (A(e, !1), 0 === e.strm.avail_out) ? 1 : 2;
                                                      }(n, t) : 3 === n.strategy ? function (e, t) {
                                                        for (var r, n, i, s, a = e.window;;) {
                                                          if (e.lookahead <= w) {
                                                            if (T(e), e.lookahead <= w && t === f) return 1;
                                                            if (0 === e.lookahead) break;
                                                          }

                                                          if (e.match_length = 0, e.lookahead >= b && 0 < e.strstart && (n = a[i = e.strstart - 1]) === a[++i] && n === a[++i] && n === a[++i]) {
                                                            s = e.strstart + w;

                                                            do {} while (n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && i < s);

                                                            e.match_length = w - (s - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
                                                          }

                                                          if (e.match_length >= b ? (r = h._tr_tally(e, 1, e.match_length - b), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = h._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (A(e, !1), 0 === e.strm.avail_out)) return 1;
                                                        }

                                                        return e.insert = 0, 4 === t ? (A(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (A(e, !1), 0 === e.strm.avail_out) ? 1 : 2;
                                                      }(n, t) : u[n.level].func(n, t);
                                                      if (3 !== o && 4 !== o || (n.status = 666), 1 === o || 3 === o) return 0 === e.avail_out && (n.last_flush = -1), l;
                                                      if (2 === o && (1 === t ? h._tr_align(n) : 5 !== t && (h._tr_stored_block(n, 0, 0, !1), 3 === t && (E(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), C(e), 0 === e.avail_out)) return n.last_flush = -1, l;
                                                    }

                                                    return 4 !== t ? l : n.wrap <= 0 ? 1 : (2 === n.wrap ? (I(n, 255 & e.adler), I(n, e.adler >> 8 & 255), I(n, e.adler >> 16 & 255), I(n, e.adler >> 24 & 255), I(n, 255 & e.total_in), I(n, e.total_in >> 8 & 255), I(n, e.total_in >> 16 & 255), I(n, e.total_in >> 24 & 255)) : (O(n, e.adler >>> 16), O(n, 65535 & e.adler)), C(e), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? l : 1);
                                                  }, r.deflateEnd = function (e) {
                                                    var t;
                                                    return e && e.state ? (t = e.state.status) !== k && 69 !== t && 73 !== t && 91 !== t && 103 !== t && t !== x && 666 !== t ? S(e, m) : (e.state = null, t === x ? S(e, -3) : l) : m;
                                                  }, r.deflateSetDictionary = function (e, t) {
                                                    var r,
                                                        n,
                                                        i,
                                                        s,
                                                        a,
                                                        o,
                                                        u,
                                                        h,
                                                        f = t.length;
                                                    if (!e || !e.state) return m;
                                                    if (2 === (s = (r = e.state).wrap) || 1 === s && r.status !== k || r.lookahead) return m;

                                                    for (1 === s && (e.adler = c(e.adler, t, f, 0)), r.wrap = 0, f >= r.w_size && (0 === s && (E(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), h = new d.Buf8(r.w_size), d.arraySet(h, t, f - r.w_size, r.w_size, 0), t = h, f = r.w_size), a = e.avail_in, o = e.next_in, u = e.input, e.avail_in = f, e.next_in = 0, e.input = t, T(r); r.lookahead >= b;) {
                                                      for (n = r.strstart, i = r.lookahead - (b - 1); r.ins_h = (r.ins_h << r.hash_shift ^ r.window[n + b - 1]) & r.hash_mask, r.prev[n & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = n, n++, --i;);

                                                      r.strstart = n, r.lookahead = b - 1, T(r);
                                                    }

                                                    return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = b - 1, r.match_available = 0, e.next_in = o, e.input = u, e.avail_in = a, r.wrap = s, l;
                                                  }, r.deflateInfo = "pako deflate (from Nodeca project)";
                                                }, {
                                                  "../utils/common": 41,
                                                  "./adler32": 43,
                                                  "./crc32": 45,
                                                  "./messages": 51,
                                                  "./trees": 52
                                                }],
                                                47: [function (e, t, r) {

                                                  t.exports = function () {
                                                    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
                                                  };
                                                }, {}],
                                                48: [function (e, t, r) {

                                                  t.exports = function (e, t) {
                                                    var r, n, i, s, a, o, u, h, f, l, d, c, p, m, _, g, v, b, w, y, k, x, S, z, E;

                                                    r = e.state, n = e.next_in, z = e.input, i = n + (e.avail_in - 5), s = e.next_out, E = e.output, a = s - (t - e.avail_out), o = s + (e.avail_out - 257), u = r.dmax, h = r.wsize, f = r.whave, l = r.wnext, d = r.window, c = r.hold, p = r.bits, m = r.lencode, _ = r.distcode, g = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;

                                                    e: do {
                                                      p < 15 && (c += z[n++] << p, p += 8, c += z[n++] << p, p += 8), b = m[c & g];

                                                      t: for (;;) {
                                                        if (c >>>= w = b >>> 24, p -= w, 0 == (w = b >>> 16 & 255)) E[s++] = 65535 & b;else {
                                                          if (!(16 & w)) {
                                                            if (0 == (64 & w)) {
                                                              b = m[(65535 & b) + (c & (1 << w) - 1)];
                                                              continue t;
                                                            }

                                                            if (32 & w) {
                                                              r.mode = 12;
                                                              break e;
                                                            }

                                                            e.msg = "invalid literal/length code", r.mode = 30;
                                                            break e;
                                                          }

                                                          y = 65535 & b, (w &= 15) && (p < w && (c += z[n++] << p, p += 8), y += c & (1 << w) - 1, c >>>= w, p -= w), p < 15 && (c += z[n++] << p, p += 8, c += z[n++] << p, p += 8), b = _[c & v];

                                                          r: for (;;) {
                                                            if (c >>>= w = b >>> 24, p -= w, !(16 & (w = b >>> 16 & 255))) {
                                                              if (0 == (64 & w)) {
                                                                b = _[(65535 & b) + (c & (1 << w) - 1)];
                                                                continue r;
                                                              }

                                                              e.msg = "invalid distance code", r.mode = 30;
                                                              break e;
                                                            }

                                                            if (k = 65535 & b, p < (w &= 15) && (c += z[n++] << p, (p += 8) < w && (c += z[n++] << p, p += 8)), u < (k += c & (1 << w) - 1)) {
                                                              e.msg = "invalid distance too far back", r.mode = 30;
                                                              break e;
                                                            }

                                                            if (c >>>= w, p -= w, (w = s - a) < k) {
                                                              if (f < (w = k - w) && r.sane) {
                                                                e.msg = "invalid distance too far back", r.mode = 30;
                                                                break e;
                                                              }

                                                              if (S = d, (x = 0) === l) {
                                                                if (x += h - w, w < y) {
                                                                  for (y -= w; E[s++] = d[x++], --w;);

                                                                  x = s - k, S = E;
                                                                }
                                                              } else if (l < w) {
                                                                if (x += h + l - w, (w -= l) < y) {
                                                                  for (y -= w; E[s++] = d[x++], --w;);

                                                                  if (x = 0, l < y) {
                                                                    for (y -= w = l; E[s++] = d[x++], --w;);

                                                                    x = s - k, S = E;
                                                                  }
                                                                }
                                                              } else if (x += l - w, w < y) {
                                                                for (y -= w; E[s++] = d[x++], --w;);

                                                                x = s - k, S = E;
                                                              }

                                                              for (; 2 < y;) E[s++] = S[x++], E[s++] = S[x++], E[s++] = S[x++], y -= 3;

                                                              y && (E[s++] = S[x++], 1 < y && (E[s++] = S[x++]));
                                                            } else {
                                                              for (x = s - k; E[s++] = E[x++], E[s++] = E[x++], E[s++] = E[x++], 2 < (y -= 3););

                                                              y && (E[s++] = E[x++], 1 < y && (E[s++] = E[x++]));
                                                            }

                                                            break;
                                                          }
                                                        }
                                                        break;
                                                      }
                                                    } while (n < i && s < o);

                                                    n -= y = p >> 3, c &= (1 << (p -= y << 3)) - 1, e.next_in = n, e.next_out = s, e.avail_in = n < i ? i - n + 5 : 5 - (n - i), e.avail_out = s < o ? o - s + 257 : 257 - (s - o), r.hold = c, r.bits = p;
                                                  };
                                                }, {}],
                                                49: [function (e, t, r) {

                                                  var I = e("../utils/common"),
                                                      O = e("./adler32"),
                                                      B = e("./crc32"),
                                                      T = e("./inffast"),
                                                      R = e("./inftrees"),
                                                      D = 1,
                                                      F = 2,
                                                      N = 0,
                                                      U = -2,
                                                      P = 1,
                                                      n = 852,
                                                      i = 592;

                                                  function L(e) {
                                                    return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
                                                  }

                                                  function s() {
                                                    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
                                                  }

                                                  function a(e) {
                                                    var t;
                                                    return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new I.Buf32(n), t.distcode = t.distdyn = new I.Buf32(i), t.sane = 1, t.back = -1, N) : U;
                                                  }

                                                  function o(e) {
                                                    var t;
                                                    return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, a(e)) : U;
                                                  }

                                                  function u(e, t) {
                                                    var r, n;
                                                    return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? U : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, o(e))) : U;
                                                  }

                                                  function h(e, t) {
                                                    var r, n;
                                                    return e ? (n = new s(), (e.state = n).window = null, (r = u(e, t)) !== N && (e.state = null), r) : U;
                                                  }

                                                  var f,
                                                      l,
                                                      d = !0;

                                                  function j(e) {
                                                    if (d) {
                                                      var t;

                                                      for (f = new I.Buf32(512), l = new I.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;

                                                      for (; t < 256;) e.lens[t++] = 9;

                                                      for (; t < 280;) e.lens[t++] = 7;

                                                      for (; t < 288;) e.lens[t++] = 8;

                                                      for (R(D, e.lens, 0, 288, f, 0, e.work, {
                                                        bits: 9
                                                      }), t = 0; t < 32;) e.lens[t++] = 5;

                                                      R(F, e.lens, 0, 32, l, 0, e.work, {
                                                        bits: 5
                                                      }), d = !1;
                                                    }

                                                    e.lencode = f, e.lenbits = 9, e.distcode = l, e.distbits = 5;
                                                  }

                                                  function Z(e, t, r, n) {
                                                    var i,
                                                        s = e.state;
                                                    return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new I.Buf8(s.wsize)), n >= s.wsize ? (I.arraySet(s.window, t, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (n < (i = s.wsize - s.wnext) && (i = n), I.arraySet(s.window, t, r - n, i, s.wnext), (n -= i) ? (I.arraySet(s.window, t, r - n, n, 0), s.wnext = n, s.whave = s.wsize) : (s.wnext += i, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += i))), 0;
                                                  }

                                                  r.inflateReset = o, r.inflateReset2 = u, r.inflateResetKeep = a, r.inflateInit = function (e) {
                                                    return h(e, 15);
                                                  }, r.inflateInit2 = h, r.inflate = function (e, t) {
                                                    var r,
                                                        n,
                                                        i,
                                                        s,
                                                        a,
                                                        o,
                                                        u,
                                                        h,
                                                        f,
                                                        l,
                                                        d,
                                                        c,
                                                        p,
                                                        m,
                                                        _,
                                                        g,
                                                        v,
                                                        b,
                                                        w,
                                                        y,
                                                        k,
                                                        x,
                                                        S,
                                                        z,
                                                        E = 0,
                                                        C = new I.Buf8(4),
                                                        A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

                                                    if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return U;
                                                    12 === (r = e.state).mode && (r.mode = 13), a = e.next_out, i = e.output, u = e.avail_out, s = e.next_in, n = e.input, o = e.avail_in, h = r.hold, f = r.bits, l = o, d = u, x = N;

                                                    e: for (;;) switch (r.mode) {
                                                      case P:
                                                        if (0 === r.wrap) {
                                                          r.mode = 13;
                                                          break;
                                                        }

                                                        for (; f < 16;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        if (2 & r.wrap && 35615 === h) {
                                                          C[r.check = 0] = 255 & h, C[1] = h >>> 8 & 255, r.check = B(r.check, C, 2, 0), f = h = 0, r.mode = 2;
                                                          break;
                                                        }

                                                        if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                                                          e.msg = "incorrect header check", r.mode = 30;
                                                          break;
                                                        }

                                                        if (8 != (15 & h)) {
                                                          e.msg = "unknown compression method", r.mode = 30;
                                                          break;
                                                        }

                                                        if (f -= 4, k = 8 + (15 & (h >>>= 4)), 0 === r.wbits) r.wbits = k;else if (k > r.wbits) {
                                                          e.msg = "invalid window size", r.mode = 30;
                                                          break;
                                                        }
                                                        r.dmax = 1 << k, e.adler = r.check = 1, r.mode = 512 & h ? 10 : 12, f = h = 0;
                                                        break;

                                                      case 2:
                                                        for (; f < 16;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        if (r.flags = h, 8 != (255 & r.flags)) {
                                                          e.msg = "unknown compression method", r.mode = 30;
                                                          break;
                                                        }

                                                        if (57344 & r.flags) {
                                                          e.msg = "unknown header flags set", r.mode = 30;
                                                          break;
                                                        }

                                                        r.head && (r.head.text = h >> 8 & 1), 512 & r.flags && (C[0] = 255 & h, C[1] = h >>> 8 & 255, r.check = B(r.check, C, 2, 0)), f = h = 0, r.mode = 3;

                                                      case 3:
                                                        for (; f < 32;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        r.head && (r.head.time = h), 512 & r.flags && (C[0] = 255 & h, C[1] = h >>> 8 & 255, C[2] = h >>> 16 & 255, C[3] = h >>> 24 & 255, r.check = B(r.check, C, 4, 0)), f = h = 0, r.mode = 4;

                                                      case 4:
                                                        for (; f < 16;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        r.head && (r.head.xflags = 255 & h, r.head.os = h >> 8), 512 & r.flags && (C[0] = 255 & h, C[1] = h >>> 8 & 255, r.check = B(r.check, C, 2, 0)), f = h = 0, r.mode = 5;

                                                      case 5:
                                                        if (1024 & r.flags) {
                                                          for (; f < 16;) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          r.length = h, r.head && (r.head.extra_len = h), 512 & r.flags && (C[0] = 255 & h, C[1] = h >>> 8 & 255, r.check = B(r.check, C, 2, 0)), f = h = 0;
                                                        } else r.head && (r.head.extra = null);

                                                        r.mode = 6;

                                                      case 6:
                                                        if (1024 & r.flags && (o < (c = r.length) && (c = o), c && (r.head && (k = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), I.arraySet(r.head.extra, n, s, c, k)), 512 & r.flags && (r.check = B(r.check, n, c, s)), o -= c, s += c, r.length -= c), r.length)) break e;
                                                        r.length = 0, r.mode = 7;

                                                      case 7:
                                                        if (2048 & r.flags) {
                                                          if (0 === o) break e;

                                                          for (c = 0; k = n[s + c++], r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k)), k && c < o;);

                                                          if (512 & r.flags && (r.check = B(r.check, n, c, s)), o -= c, s += c, k) break e;
                                                        } else r.head && (r.head.name = null);

                                                        r.length = 0, r.mode = 8;

                                                      case 8:
                                                        if (4096 & r.flags) {
                                                          if (0 === o) break e;

                                                          for (c = 0; k = n[s + c++], r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k)), k && c < o;);

                                                          if (512 & r.flags && (r.check = B(r.check, n, c, s)), o -= c, s += c, k) break e;
                                                        } else r.head && (r.head.comment = null);

                                                        r.mode = 9;

                                                      case 9:
                                                        if (512 & r.flags) {
                                                          for (; f < 16;) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          if (h !== (65535 & r.check)) {
                                                            e.msg = "header crc mismatch", r.mode = 30;
                                                            break;
                                                          }

                                                          f = h = 0;
                                                        }

                                                        r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = 12;
                                                        break;

                                                      case 10:
                                                        for (; f < 32;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        e.adler = r.check = L(h), f = h = 0, r.mode = 11;

                                                      case 11:
                                                        if (0 === r.havedict) return e.next_out = a, e.avail_out = u, e.next_in = s, e.avail_in = o, r.hold = h, r.bits = f, 2;
                                                        e.adler = r.check = 1, r.mode = 12;

                                                      case 12:
                                                        if (5 === t || 6 === t) break e;

                                                      case 13:
                                                        if (r.last) {
                                                          h >>>= 7 & f, f -= 7 & f, r.mode = 27;
                                                          break;
                                                        }

                                                        for (; f < 3;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        switch (r.last = 1 & h, f -= 1, 3 & (h >>>= 1)) {
                                                          case 0:
                                                            r.mode = 14;
                                                            break;

                                                          case 1:
                                                            if (j(r), r.mode = 20, 6 !== t) break;
                                                            h >>>= 2, f -= 2;
                                                            break e;

                                                          case 2:
                                                            r.mode = 17;
                                                            break;

                                                          case 3:
                                                            e.msg = "invalid block type", r.mode = 30;
                                                        }

                                                        h >>>= 2, f -= 2;
                                                        break;

                                                      case 14:
                                                        for (h >>>= 7 & f, f -= 7 & f; f < 32;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        if ((65535 & h) != (h >>> 16 ^ 65535)) {
                                                          e.msg = "invalid stored block lengths", r.mode = 30;
                                                          break;
                                                        }

                                                        if (r.length = 65535 & h, f = h = 0, r.mode = 15, 6 === t) break e;

                                                      case 15:
                                                        r.mode = 16;

                                                      case 16:
                                                        if (c = r.length) {
                                                          if (o < c && (c = o), u < c && (c = u), 0 === c) break e;
                                                          I.arraySet(i, n, s, c, a), o -= c, s += c, u -= c, a += c, r.length -= c;
                                                          break;
                                                        }

                                                        r.mode = 12;
                                                        break;

                                                      case 17:
                                                        for (; f < 14;) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        if (r.nlen = 257 + (31 & h), h >>>= 5, f -= 5, r.ndist = 1 + (31 & h), h >>>= 5, f -= 5, r.ncode = 4 + (15 & h), h >>>= 4, f -= 4, 286 < r.nlen || 30 < r.ndist) {
                                                          e.msg = "too many length or distance symbols", r.mode = 30;
                                                          break;
                                                        }

                                                        r.have = 0, r.mode = 18;

                                                      case 18:
                                                        for (; r.have < r.ncode;) {
                                                          for (; f < 3;) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          r.lens[A[r.have++]] = 7 & h, h >>>= 3, f -= 3;
                                                        }

                                                        for (; r.have < 19;) r.lens[A[r.have++]] = 0;

                                                        if (r.lencode = r.lendyn, r.lenbits = 7, S = {
                                                          bits: r.lenbits
                                                        }, x = R(0, r.lens, 0, 19, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
                                                          e.msg = "invalid code lengths set", r.mode = 30;
                                                          break;
                                                        }

                                                        r.have = 0, r.mode = 19;

                                                      case 19:
                                                        for (; r.have < r.nlen + r.ndist;) {
                                                          for (; g = (E = r.lencode[h & (1 << r.lenbits) - 1]) >>> 16 & 255, v = 65535 & E, !((_ = E >>> 24) <= f);) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          if (v < 16) h >>>= _, f -= _, r.lens[r.have++] = v;else {
                                                            if (16 === v) {
                                                              for (z = _ + 2; f < z;) {
                                                                if (0 === o) break e;
                                                                o--, h += n[s++] << f, f += 8;
                                                              }

                                                              if (h >>>= _, f -= _, 0 === r.have) {
                                                                e.msg = "invalid bit length repeat", r.mode = 30;
                                                                break;
                                                              }

                                                              k = r.lens[r.have - 1], c = 3 + (3 & h), h >>>= 2, f -= 2;
                                                            } else if (17 === v) {
                                                              for (z = _ + 3; f < z;) {
                                                                if (0 === o) break e;
                                                                o--, h += n[s++] << f, f += 8;
                                                              }

                                                              f -= _, k = 0, c = 3 + (7 & (h >>>= _)), h >>>= 3, f -= 3;
                                                            } else {
                                                              for (z = _ + 7; f < z;) {
                                                                if (0 === o) break e;
                                                                o--, h += n[s++] << f, f += 8;
                                                              }

                                                              f -= _, k = 0, c = 11 + (127 & (h >>>= _)), h >>>= 7, f -= 7;
                                                            }

                                                            if (r.have + c > r.nlen + r.ndist) {
                                                              e.msg = "invalid bit length repeat", r.mode = 30;
                                                              break;
                                                            }

                                                            for (; c--;) r.lens[r.have++] = k;
                                                          }
                                                        }

                                                        if (30 === r.mode) break;

                                                        if (0 === r.lens[256]) {
                                                          e.msg = "invalid code -- missing end-of-block", r.mode = 30;
                                                          break;
                                                        }

                                                        if (r.lenbits = 9, S = {
                                                          bits: r.lenbits
                                                        }, x = R(D, r.lens, 0, r.nlen, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
                                                          e.msg = "invalid literal/lengths set", r.mode = 30;
                                                          break;
                                                        }

                                                        if (r.distbits = 6, r.distcode = r.distdyn, S = {
                                                          bits: r.distbits
                                                        }, x = R(F, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S), r.distbits = S.bits, x) {
                                                          e.msg = "invalid distances set", r.mode = 30;
                                                          break;
                                                        }

                                                        if (r.mode = 20, 6 === t) break e;

                                                      case 20:
                                                        r.mode = 21;

                                                      case 21:
                                                        if (6 <= o && 258 <= u) {
                                                          e.next_out = a, e.avail_out = u, e.next_in = s, e.avail_in = o, r.hold = h, r.bits = f, T(e, d), a = e.next_out, i = e.output, u = e.avail_out, s = e.next_in, n = e.input, o = e.avail_in, h = r.hold, f = r.bits, 12 === r.mode && (r.back = -1);
                                                          break;
                                                        }

                                                        for (r.back = 0; g = (E = r.lencode[h & (1 << r.lenbits) - 1]) >>> 16 & 255, v = 65535 & E, !((_ = E >>> 24) <= f);) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        if (g && 0 == (240 & g)) {
                                                          for (b = _, w = g, y = v; g = (E = r.lencode[y + ((h & (1 << b + w) - 1) >> b)]) >>> 16 & 255, v = 65535 & E, !(b + (_ = E >>> 24) <= f);) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          h >>>= b, f -= b, r.back += b;
                                                        }

                                                        if (h >>>= _, f -= _, r.back += _, r.length = v, 0 === g) {
                                                          r.mode = 26;
                                                          break;
                                                        }

                                                        if (32 & g) {
                                                          r.back = -1, r.mode = 12;
                                                          break;
                                                        }

                                                        if (64 & g) {
                                                          e.msg = "invalid literal/length code", r.mode = 30;
                                                          break;
                                                        }

                                                        r.extra = 15 & g, r.mode = 22;

                                                      case 22:
                                                        if (r.extra) {
                                                          for (z = r.extra; f < z;) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          r.length += h & (1 << r.extra) - 1, h >>>= r.extra, f -= r.extra, r.back += r.extra;
                                                        }

                                                        r.was = r.length, r.mode = 23;

                                                      case 23:
                                                        for (; g = (E = r.distcode[h & (1 << r.distbits) - 1]) >>> 16 & 255, v = 65535 & E, !((_ = E >>> 24) <= f);) {
                                                          if (0 === o) break e;
                                                          o--, h += n[s++] << f, f += 8;
                                                        }

                                                        if (0 == (240 & g)) {
                                                          for (b = _, w = g, y = v; g = (E = r.distcode[y + ((h & (1 << b + w) - 1) >> b)]) >>> 16 & 255, v = 65535 & E, !(b + (_ = E >>> 24) <= f);) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          h >>>= b, f -= b, r.back += b;
                                                        }

                                                        if (h >>>= _, f -= _, r.back += _, 64 & g) {
                                                          e.msg = "invalid distance code", r.mode = 30;
                                                          break;
                                                        }

                                                        r.offset = v, r.extra = 15 & g, r.mode = 24;

                                                      case 24:
                                                        if (r.extra) {
                                                          for (z = r.extra; f < z;) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          r.offset += h & (1 << r.extra) - 1, h >>>= r.extra, f -= r.extra, r.back += r.extra;
                                                        }

                                                        if (r.offset > r.dmax) {
                                                          e.msg = "invalid distance too far back", r.mode = 30;
                                                          break;
                                                        }

                                                        r.mode = 25;

                                                      case 25:
                                                        if (0 === u) break e;

                                                        if (c = d - u, r.offset > c) {
                                                          if ((c = r.offset - c) > r.whave && r.sane) {
                                                            e.msg = "invalid distance too far back", r.mode = 30;
                                                            break;
                                                          }

                                                          p = c > r.wnext ? (c -= r.wnext, r.wsize - c) : r.wnext - c, c > r.length && (c = r.length), m = r.window;
                                                        } else m = i, p = a - r.offset, c = r.length;

                                                        for (u < c && (c = u), u -= c, r.length -= c; i[a++] = m[p++], --c;);

                                                        0 === r.length && (r.mode = 21);
                                                        break;

                                                      case 26:
                                                        if (0 === u) break e;
                                                        i[a++] = r.length, u--, r.mode = 21;
                                                        break;

                                                      case 27:
                                                        if (r.wrap) {
                                                          for (; f < 32;) {
                                                            if (0 === o) break e;
                                                            o--, h |= n[s++] << f, f += 8;
                                                          }

                                                          if (d -= u, e.total_out += d, r.total += d, d && (e.adler = r.check = r.flags ? B(r.check, i, d, a - d) : O(r.check, i, d, a - d)), d = u, (r.flags ? h : L(h)) !== r.check) {
                                                            e.msg = "incorrect data check", r.mode = 30;
                                                            break;
                                                          }

                                                          f = h = 0;
                                                        }

                                                        r.mode = 28;

                                                      case 28:
                                                        if (r.wrap && r.flags) {
                                                          for (; f < 32;) {
                                                            if (0 === o) break e;
                                                            o--, h += n[s++] << f, f += 8;
                                                          }

                                                          if (h !== (4294967295 & r.total)) {
                                                            e.msg = "incorrect length check", r.mode = 30;
                                                            break;
                                                          }

                                                          f = h = 0;
                                                        }

                                                        r.mode = 29;

                                                      case 29:
                                                        x = 1;
                                                        break e;

                                                      case 30:
                                                        x = -3;
                                                        break e;

                                                      case 31:
                                                        return -4;

                                                      case 32:
                                                      default:
                                                        return U;
                                                    }

                                                    return e.next_out = a, e.avail_out = u, e.next_in = s, e.avail_in = o, r.hold = h, r.bits = f, (r.wsize || d !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t)) && Z(e, e.output, e.next_out, d - e.avail_out) ? (r.mode = 31, -4) : (l -= e.avail_in, d -= e.avail_out, e.total_in += l, e.total_out += d, r.total += d, r.wrap && d && (e.adler = r.check = r.flags ? B(r.check, i, d, e.next_out - d) : O(r.check, i, d, e.next_out - d)), e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 == l && 0 === d || 4 === t) && x === N && (x = -5), x);
                                                  }, r.inflateEnd = function (e) {
                                                    if (!e || !e.state) return U;
                                                    var t = e.state;
                                                    return t.window && (t.window = null), e.state = null, N;
                                                  }, r.inflateGetHeader = function (e, t) {
                                                    var r;
                                                    return e && e.state ? 0 == (2 & (r = e.state).wrap) ? U : ((r.head = t).done = !1, N) : U;
                                                  }, r.inflateSetDictionary = function (e, t) {
                                                    var r,
                                                        n = t.length;
                                                    return e && e.state ? 0 !== (r = e.state).wrap && 11 !== r.mode ? U : 11 === r.mode && O(1, t, n, 0) !== r.check ? -3 : Z(e, t, n, n) ? (r.mode = 31, -4) : (r.havedict = 1, N) : U;
                                                  }, r.inflateInfo = "pako inflate (from Nodeca project)";
                                                }, {
                                                  "../utils/common": 41,
                                                  "./adler32": 43,
                                                  "./crc32": 45,
                                                  "./inffast": 48,
                                                  "./inftrees": 50
                                                }],
                                                50: [function (e, t, r) {

                                                  var D = e("../utils/common"),
                                                      F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                                                      N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                                                      U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                                                      P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

                                                  t.exports = function (e, t, r, n, i, s, a, o) {
                                                    var u,
                                                        h,
                                                        f,
                                                        l,
                                                        d,
                                                        c,
                                                        p,
                                                        m,
                                                        _,
                                                        g = o.bits,
                                                        v = 0,
                                                        b = 0,
                                                        w = 0,
                                                        y = 0,
                                                        k = 0,
                                                        x = 0,
                                                        S = 0,
                                                        z = 0,
                                                        E = 0,
                                                        C = 0,
                                                        A = null,
                                                        I = 0,
                                                        O = new D.Buf16(16),
                                                        B = new D.Buf16(16),
                                                        T = null,
                                                        R = 0;

                                                    for (v = 0; v <= 15; v++) O[v] = 0;

                                                    for (b = 0; b < n; b++) O[t[r + b]]++;

                                                    for (k = g, y = 15; 1 <= y && 0 === O[y]; y--);

                                                    if (y < k && (k = y), 0 === y) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;

                                                    for (w = 1; w < y && 0 === O[w]; w++);

                                                    for (k < w && (k = w), v = z = 1; v <= 15; v++) if (z <<= 1, (z -= O[v]) < 0) return -1;

                                                    if (0 < z && (0 === e || 1 !== y)) return -1;

                                                    for (B[1] = 0, v = 1; v < 15; v++) B[v + 1] = B[v] + O[v];

                                                    for (b = 0; b < n; b++) 0 !== t[r + b] && (a[B[t[r + b]]++] = b);

                                                    if (c = 0 === e ? (A = T = a, 19) : 1 === e ? (A = F, I -= 257, T = N, R -= 257, 256) : (A = U, T = P, -1), v = w, d = s, S = b = C = 0, f = -1, l = (E = 1 << (x = k)) - 1, 1 === e && 852 < E || 2 === e && 592 < E) return 1;

                                                    for (;;) {
                                                      for (p = v - S, _ = a[b] < c ? (m = 0, a[b]) : a[b] > c ? (m = T[R + a[b]], A[I + a[b]]) : (m = 96, 0), u = 1 << v - S, w = h = 1 << x; i[d + (C >> S) + (h -= u)] = p << 24 | m << 16 | _ | 0, 0 !== h;);

                                                      for (u = 1 << v - 1; C & u;) u >>= 1;

                                                      if (0 !== u ? (C &= u - 1, C += u) : C = 0, b++, 0 == --O[v]) {
                                                        if (v === y) break;
                                                        v = t[r + a[b]];
                                                      }

                                                      if (k < v && (C & l) !== f) {
                                                        for (0 === S && (S = k), d += w, z = 1 << (x = v - S); x + S < y && !((z -= O[x + S]) <= 0);) x++, z <<= 1;

                                                        if (E += 1 << x, 1 === e && 852 < E || 2 === e && 592 < E) return 1;
                                                        i[f = C & l] = k << 24 | x << 16 | d - s | 0;
                                                      }
                                                    }

                                                    return 0 !== C && (i[d + C] = v - S << 24 | 64 << 16 | 0), o.bits = k, 0;
                                                  };
                                                }, {
                                                  "../utils/common": 41
                                                }],
                                                51: [function (e, t, r) {

                                                  t.exports = {
                                                    2: "need dictionary",
                                                    1: "stream end",
                                                    0: "",
                                                    "-1": "file error",
                                                    "-2": "stream error",
                                                    "-3": "data error",
                                                    "-4": "insufficient memory",
                                                    "-5": "buffer error",
                                                    "-6": "incompatible version"
                                                  };
                                                }, {}],
                                                52: [function (e, t, r) {

                                                  var o = e("../utils/common");

                                                  function n(e) {
                                                    for (var t = e.length; 0 <= --t;) e[t] = 0;
                                                  }

                                                  var _ = 15,
                                                      i = 16,
                                                      u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                                                      h = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                                                      a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                                                      f = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                                                      l = new Array(576);
                                                  n(l);
                                                  var d = new Array(60);
                                                  n(d);
                                                  var c = new Array(512);
                                                  n(c);
                                                  var p = new Array(256);
                                                  n(p);
                                                  var m = new Array(29);
                                                  n(m);
                                                  var g,
                                                      v,
                                                      b,
                                                      w = new Array(30);

                                                  function y(e, t, r, n, i) {
                                                    this.static_tree = e, this.extra_bits = t, this.extra_base = r, this.elems = n, this.max_length = i, this.has_stree = e && e.length;
                                                  }

                                                  function s(e, t) {
                                                    this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
                                                  }

                                                  function k(e) {
                                                    return e < 256 ? c[e] : c[256 + (e >>> 7)];
                                                  }

                                                  function x(e, t) {
                                                    e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
                                                  }

                                                  function S(e, t, r) {
                                                    e.bi_valid > i - r ? (e.bi_buf |= t << e.bi_valid & 65535, x(e, e.bi_buf), e.bi_buf = t >> i - e.bi_valid, e.bi_valid += r - i) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r);
                                                  }

                                                  function z(e, t, r) {
                                                    S(e, r[2 * t], r[2 * t + 1]);
                                                  }

                                                  function E(e, t) {
                                                    for (var r = 0; r |= 1 & e, e >>>= 1, r <<= 1, 0 < --t;);

                                                    return r >>> 1;
                                                  }

                                                  function C(e, t, r) {
                                                    var n,
                                                        i,
                                                        s = new Array(_ + 1),
                                                        a = 0;

                                                    for (n = 1; n <= _; n++) s[n] = a = a + r[n - 1] << 1;

                                                    for (i = 0; i <= t; i++) {
                                                      var o = e[2 * i + 1];
                                                      0 !== o && (e[2 * i] = E(s[o]++, o));
                                                    }
                                                  }

                                                  function A(e) {
                                                    var t;

                                                    for (t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;

                                                    for (t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;

                                                    for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;

                                                    e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
                                                  }

                                                  function I(e) {
                                                    8 < e.bi_valid ? x(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
                                                  }

                                                  function O(e, t, r, n) {
                                                    var i = 2 * t,
                                                        s = 2 * r;
                                                    return e[i] < e[s] || e[i] === e[s] && n[t] <= n[r];
                                                  }

                                                  function B(e, t, r) {
                                                    for (var n = e.heap[r], i = r << 1; i <= e.heap_len && (i < e.heap_len && O(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !O(t, n, e.heap[i], e.depth));) e.heap[r] = e.heap[i], r = i, i <<= 1;

                                                    e.heap[r] = n;
                                                  }

                                                  function T(e, t, r) {
                                                    var n,
                                                        i,
                                                        s,
                                                        a,
                                                        o = 0;
                                                    if (0 !== e.last_lit) for (; n = e.pending_buf[e.d_buf + 2 * o] << 8 | e.pending_buf[e.d_buf + 2 * o + 1], i = e.pending_buf[e.l_buf + o], o++, 0 === n ? z(e, i, t) : (z(e, (s = p[i]) + 256 + 1, t), 0 !== (a = u[s]) && S(e, i -= m[s], a), z(e, s = k(--n), r), 0 !== (a = h[s]) && S(e, n -= w[s], a)), o < e.last_lit;);
                                                    z(e, 256, t);
                                                  }

                                                  function R(e, t) {
                                                    var r,
                                                        n,
                                                        i,
                                                        s = t.dyn_tree,
                                                        a = t.stat_desc.static_tree,
                                                        o = t.stat_desc.has_stree,
                                                        u = t.stat_desc.elems,
                                                        h = -1;

                                                    for (e.heap_len = 0, e.heap_max = 573, r = 0; r < u; r++) 0 !== s[2 * r] ? (e.heap[++e.heap_len] = h = r, e.depth[r] = 0) : s[2 * r + 1] = 0;

                                                    for (; e.heap_len < 2;) s[2 * (i = e.heap[++e.heap_len] = h < 2 ? ++h : 0)] = 1, e.depth[i] = 0, e.opt_len--, o && (e.static_len -= a[2 * i + 1]);

                                                    for (t.max_code = h, r = e.heap_len >> 1; 1 <= r; r--) B(e, s, r);

                                                    for (i = u; r = e.heap[1], e.heap[1] = e.heap[e.heap_len--], B(e, s, 1), n = e.heap[1], e.heap[--e.heap_max] = r, e.heap[--e.heap_max] = n, s[2 * i] = s[2 * r] + s[2 * n], e.depth[i] = (e.depth[r] >= e.depth[n] ? e.depth[r] : e.depth[n]) + 1, s[2 * r + 1] = s[2 * n + 1] = i, e.heap[1] = i++, B(e, s, 1), 2 <= e.heap_len;);

                                                    e.heap[--e.heap_max] = e.heap[1], function (e, t) {
                                                      var r,
                                                          n,
                                                          i,
                                                          s,
                                                          a,
                                                          o,
                                                          u = t.dyn_tree,
                                                          h = t.max_code,
                                                          f = t.stat_desc.static_tree,
                                                          l = t.stat_desc.has_stree,
                                                          d = t.stat_desc.extra_bits,
                                                          c = t.stat_desc.extra_base,
                                                          p = t.stat_desc.max_length,
                                                          m = 0;

                                                      for (s = 0; s <= _; s++) e.bl_count[s] = 0;

                                                      for (u[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1; r < 573; r++) p < (s = u[2 * u[2 * (n = e.heap[r]) + 1] + 1] + 1) && (s = p, m++), u[2 * n + 1] = s, h < n || (e.bl_count[s]++, a = 0, c <= n && (a = d[n - c]), o = u[2 * n], e.opt_len += o * (s + a), l && (e.static_len += o * (f[2 * n + 1] + a)));

                                                      if (0 !== m) {
                                                        do {
                                                          for (s = p - 1; 0 === e.bl_count[s];) s--;

                                                          e.bl_count[s]--, e.bl_count[s + 1] += 2, e.bl_count[p]--, m -= 2;
                                                        } while (0 < m);

                                                        for (s = p; 0 !== s; s--) for (n = e.bl_count[s]; 0 !== n;) h < (i = e.heap[--r]) || (u[2 * i + 1] !== s && (e.opt_len += (s - u[2 * i + 1]) * u[2 * i], u[2 * i + 1] = s), n--);
                                                      }
                                                    }(e, t), C(s, h, e.bl_count);
                                                  }

                                                  function D(e, t, r) {
                                                    var n,
                                                        i,
                                                        s = -1,
                                                        a = t[1],
                                                        o = 0,
                                                        u = 7,
                                                        h = 4;

                                                    for (0 === a && (u = 138, h = 3), t[2 * (r + 1) + 1] = 65535, n = 0; n <= r; n++) i = a, a = t[2 * (n + 1) + 1], ++o < u && i === a || (o < h ? e.bl_tree[2 * i] += o : 0 !== i ? (i !== s && e.bl_tree[2 * i]++, e.bl_tree[32]++) : o <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, s = i, h = (o = 0) === a ? (u = 138, 3) : i === a ? (u = 6, 3) : (u = 7, 4));
                                                  }

                                                  function F(e, t, r) {
                                                    var n,
                                                        i,
                                                        s = -1,
                                                        a = t[1],
                                                        o = 0,
                                                        u = 7,
                                                        h = 4;

                                                    for (0 === a && (u = 138, h = 3), n = 0; n <= r; n++) if (i = a, a = t[2 * (n + 1) + 1], !(++o < u && i === a)) {
                                                      if (o < h) for (; z(e, i, e.bl_tree), 0 != --o;);else 0 !== i ? (i !== s && (z(e, i, e.bl_tree), o--), z(e, 16, e.bl_tree), S(e, o - 3, 2)) : o <= 10 ? (z(e, 17, e.bl_tree), S(e, o - 3, 3)) : (z(e, 18, e.bl_tree), S(e, o - 11, 7));
                                                      s = i, h = (o = 0) === a ? (u = 138, 3) : i === a ? (u = 6, 3) : (u = 7, 4);
                                                    }
                                                  }

                                                  n(w);
                                                  var N = !1;

                                                  function U(e, t, r, n) {
                                                    var i, s, a;
                                                    S(e, 0 + (n ? 1 : 0), 3), s = t, a = r, I(i = e), x(i, a), x(i, ~a), o.arraySet(i.pending_buf, i.window, s, a, i.pending), i.pending += a;
                                                  }

                                                  r._tr_init = function (e) {
                                                    N || (function () {
                                                      var e,
                                                          t,
                                                          r,
                                                          n,
                                                          i,
                                                          s = new Array(_ + 1);

                                                      for (n = r = 0; n < 28; n++) for (m[n] = r, e = 0; e < 1 << u[n]; e++) p[r++] = n;

                                                      for (p[r - 1] = n, n = i = 0; n < 16; n++) for (w[n] = i, e = 0; e < 1 << h[n]; e++) c[i++] = n;

                                                      for (i >>= 7; n < 30; n++) for (w[n] = i << 7, e = 0; e < 1 << h[n] - 7; e++) c[256 + i++] = n;

                                                      for (t = 0; t <= _; t++) s[t] = 0;

                                                      for (e = 0; e <= 143;) l[2 * e + 1] = 8, e++, s[8]++;

                                                      for (; e <= 255;) l[2 * e + 1] = 9, e++, s[9]++;

                                                      for (; e <= 279;) l[2 * e + 1] = 7, e++, s[7]++;

                                                      for (; e <= 287;) l[2 * e + 1] = 8, e++, s[8]++;

                                                      for (C(l, 287, s), e = 0; e < 30; e++) d[2 * e + 1] = 5, d[2 * e] = E(e, 5);

                                                      g = new y(l, u, 257, 286, _), v = new y(d, h, 0, 30, _), b = new y(new Array(0), a, 0, 19, 7);
                                                    }(), N = !0), e.l_desc = new s(e.dyn_ltree, g), e.d_desc = new s(e.dyn_dtree, v), e.bl_desc = new s(e.bl_tree, b), e.bi_buf = 0, e.bi_valid = 0, A(e);
                                                  }, r._tr_stored_block = U, r._tr_flush_block = function (e, t, r, n) {
                                                    var i,
                                                        s,
                                                        a = 0;
                                                    0 < e.level ? (2 === e.strm.data_type && (e.strm.data_type = function (e) {
                                                      var t,
                                                          r = 4093624447;

                                                      for (t = 0; t <= 31; t++, r >>>= 1) if (1 & r && 0 !== e.dyn_ltree[2 * t]) return 0;

                                                      if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;

                                                      for (t = 32; t < 256; t++) if (0 !== e.dyn_ltree[2 * t]) return 1;

                                                      return 0;
                                                    }(e)), R(e, e.l_desc), R(e, e.d_desc), a = function (e) {
                                                      var t;

                                                      for (D(e, e.dyn_ltree, e.l_desc.max_code), D(e, e.dyn_dtree, e.d_desc.max_code), R(e, e.bl_desc), t = 18; 3 <= t && 0 === e.bl_tree[2 * f[t] + 1]; t--);

                                                      return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
                                                    }(e), i = e.opt_len + 3 + 7 >>> 3, (s = e.static_len + 3 + 7 >>> 3) <= i && (i = s)) : i = s = r + 5, r + 4 <= i && -1 !== t ? U(e, t, r, n) : 4 === e.strategy || s === i ? (S(e, 2 + (n ? 1 : 0), 3), T(e, l, d)) : (S(e, 4 + (n ? 1 : 0), 3), function (e, t, r, n) {
                                                      var i;

                                                      for (S(e, t - 257, 5), S(e, r - 1, 5), S(e, n - 4, 4), i = 0; i < n; i++) S(e, e.bl_tree[2 * f[i] + 1], 3);

                                                      F(e, e.dyn_ltree, t - 1), F(e, e.dyn_dtree, r - 1);
                                                    }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), T(e, e.dyn_ltree, e.dyn_dtree)), A(e), n && I(e);
                                                  }, r._tr_tally = function (e, t, r) {
                                                    return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & r, e.last_lit++, 0 === t ? e.dyn_ltree[2 * r]++ : (e.matches++, t--, e.dyn_ltree[2 * (p[r] + 256 + 1)]++, e.dyn_dtree[2 * k(t)]++), e.last_lit === e.lit_bufsize - 1;
                                                  }, r._tr_align = function (e) {
                                                    var t;
                                                    S(e, 2, 3), z(e, 256, l), 16 === (t = e).bi_valid ? (x(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : 8 <= t.bi_valid && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8);
                                                  };
                                                }, {
                                                  "../utils/common": 41
                                                }],
                                                53: [function (e, t, r) {

                                                  t.exports = function () {
                                                    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
                                                  };
                                                }, {}],
                                                54: [function (e, t, r) {

                                                  t.exports = "function" == typeof setImmediate ? setImmediate : function () {
                                                    var e = [].slice.apply(arguments);
                                                    e.splice(1, 0, 0), setTimeout.apply(null, e);
                                                  };
                                                }, {}]
                                              }, {}, [10])(10);
                                            });
                                          }).call(this, void 0 !== r ? r : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                                        }, {}]
                                      }, {}, [1])(1);
                                    });
                                  }).call(this, void 0 !== r ? r : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                                }, {}]
                              }, {}, [1])(1);
                            });
                          }).call(this, void 0 !== r ? r : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                        }, {}]
                      }, {}, [1])(1);
                    });
                  }).call(this, void 0 !== r ? r : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                }, {}]
              }, {}, [1])(1);
            });
          }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}]
      }, {}, [1])(1);
    });
  });

  /* eslint-disable no-unused-vars */
  /**
   * Parse metadata from xml file that is contained in BRML
   * @export
   * @param {String} file
   * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
   */

  function parseDiffractogram(file) {
    let json = parser.parse(file, {
      ignoreAttributes: false,
      attributeNamePrefix: '__'
    });
    const data = json.RawData;
    let axes = data.DataRoutes.DataRoute.ScanInformation.ScanAxes.ScanAxisInfo.map(element => ({
      id: element.__AxisId,
      name: element.__AxisName,
      unitBase: element.Unit.__Base,
      unitPrefix: element.Unit.__Prefix,
      reference: element.reference,
      start: element.start,
      stop: element.stop,
      increment: element.increment
    }));
    let adddata = {
      startTime: data.TimeStampStarted,
      endTime: data.TimeStampFinished,
      measurmentPoints: data.DataRoutes.DataRoute.ScanInformation.MeasurementPoints,
      timePerStep: data.DataRoutes.DataRoute.ScanInformation.TimePerStep,
      timePerStepEffective: data.DataRoutes.DataRoute.ScanInformation.TimePerStepEffective,
      scanMode: data.DataRoutes.DataRoute.ScanInformation.ScanMode,
      scanModeVisibleName: data.DataRoutes.DataRoute.ScanInformation.ScanModeVisibleName,
      userName: data.Identifier.__UserName,
      machineName: data.Identifier.__MachineName,
      guid: data.Identifier.Guid,
      axes: axes,
      goniometerType: data.FixedInformation.Instrument.GoniometerType,
      anode: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.TubeMaterial,
      anodeVoltage: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.Generator.Voltage.__Value,
      anodeVoltageUnit: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.Generator.Voltage.__Unit,
      anodeSerialNumber: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.SerialNumber.__Value
    };
    const diffractogram = getXYDiffractogram(data.DataRoutes.DataRoute.Datum);
    diffractogram.meta = { ...adddata,
      ...diffractogram.meta
    };
    let label = adddata.axes[0].name.replace(/two/i, '2').replace(/theta/i, 'ϴ');
    let unit = adddata.axes[0].unitBase.replace(/degree/i, '°');
    diffractogram.info.xUnits = `${label} [${unit}]`;
    return diffractogram;
  }
  /**
   * @param  {array} data array of strings of the measured points
   */

  function getXYDiffractogram(data) {
    let axis1 = [];
    let axis2 = [];
    let measuredTimePerStep = [];
    let plannedTimePerStep = [];
    let counts = [];
    data.forEach(element => {
      const factors = element.split(',');
      measuredTimePerStep.push(parseFloat(factors[0]));
      plannedTimePerStep.push(parseFloat(factors[1]));
      axis1.push(parseFloat(factors[2]));
      axis2.push(parseFloat(factors[3]));
      counts.push(parseFloat(factors[4]));
    });
    const diffractogram = {
      data: {
        x: axis1,
        y: counts
      },
      info: {
        xUnits: '2ϴ [°]',
        yUnits: 'counts',
        dataType: 'XRD pattern',
        origin: 'Data converted from BRML using convert-to-jcamp'
      },
      meta: {
        axis2: axis2,
        measuredTimePerStep: measuredTimePerStep,
        plannedTimePerStep: plannedTimePerStep
      }
    };
    return diffractogram;
  }
  /**
   * Read a BRML file (produced by Bruker instruments, a zip file that contains XMLs)
   * @export
   * @param {String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise} binary BRML file
   * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
   */


  async function readBRML(binary) {
    let zip = new jszip_min();
    const txt = await zip.loadAsync(binary).then(function (zipFiles) {
      return zipFiles.file('Experiment0/RawData0.xml').async('text');
    });
    const diffractogram = parseDiffractogram(txt);
    return diffractogram;
  }

  /**
   * Creates a new Chromatogram element based in a JCAMP string
   * @param {UInt8Array} blob - String containing the JCAMP data
   * @return {Analysis} - New class element with the given data
   */

  async function fromBRML(blob) {
    let parsed = await readBRML(blob);
    let analysis = new Analysis();
    const variables = {
      x: {
        data: parsed.data.x,
        label: parsed.info.xUnits
      },
      y: {
        data: parsed.data.y,
        label: parsed.info.yUnits
      }
    };
    analysis.pushSpectrum(variables, {
      title: parsed.info.title,
      meta: parsed.meta,
      dataType: 'XRD pattern'
    });
    return analysis;
  }

  /**
   * Parse diffractograms saved in xy files that are generated with PowDLL
   * @export
   * @param {String} [text] Text containing the data
   * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
   */
  function parsePowDLLXY(text) {
    let lines = text.split(/\r?\n/).filter(line => !line.match(/^\s*$/));
    const header = lines[0];
    lines.splice(0, 1); // remove header line

    let data = {
      x: [],
      y: []
    };

    for (const line of lines) {
      let tmp = line.split(/\s+/);
      data.x.push(parseFloat(tmp[0].trim()));
      data.y.push(parseFloat(tmp[1].trim()));
    }

    let headerLines = header.split('" '); // try to make metadata consistent with Bruker

    let meta = {};
    meta.id = trimReplace(headerLines[0]);
    meta.comment = trimReplace(headerLines[1]);
    meta.userName = trimReplace(headerLines[2]);
    meta.anode = trimReplace(headerLines[3]);
    meta.scanType = trimReplace(headerLines[4]); // eslint-disable-next-line radix

    meta.timePerStep = parseInt(trimReplace(headerLines[5]));
    const diffractogram = {
      data: {
        x: data.x,
        y: data.y
      },
      info: {
        xUnits: '2ϴ [°]',
        yUnits: 'counts',
        dataType: 'XRD pattern',
        origin: 'Data converted from xy using convert-to-jcamp'
      },
      meta: meta
    };
    return diffractogram;
  }

  function trimReplace(string) {
    return string.split(':')[1].replace('"', '').replace("'", '').trim();
  }

  /**
   * Creates a new Chromatogram element based in a JCAMP string
   * @param {UInt8Array} blob - String containing the JCAMP data
   * @return {Analysis} - New class element with the given data
   */

  function fromPowDLLXY(blob) {
    let parsed = parsePowDLLXY(blob);
    let analysis = new Analysis();
    const variables = {
      x: {
        data: parsed.data.x,
        label: parsed.info.xUnits
      },
      y: {
        data: parsed.data.y,
        label: parsed.info.yUnits
      }
    };
    analysis.pushSpectrum(variables, {
      title: parsed.info.title,
      meta: parsed.meta,
      dataType: 'XRD pattern'
    });
    return analysis;
  }

  // source: http://gisaxs.com/index.php/X-ray_energy
  const kAlpha1Angstrom = {
    CuKa: 1.54184,
    CuKa2: 1.54439,
    CuKa1: 1.54056,
    CuKb1: 1.39222,
    MoKa: 0.71073,
    MoKa2: 0.71359,
    MoKa1: 0.7093,
    MoKb1: 0.63229,
    CrKa: 2.291,
    CrKa2: 2.29361,
    CrKa1: 2.2897,
    CrKb1: 2.08487,
    FeKa: 1.93735,
    FeKa2: 1.93998,
    FeKa1: 1.93604,
    FeKb1: 1.75661,
    CoKa: 1.79026,
    CoKa2: 1.79285,
    CoKa1: 1.78896,
    CoKb1: 1.63079,
    AgKa: 0.560885,
    AgKa2: 0.563813,
    AgKa1: 0.559421,
    AgKb1: 0.497082
  };

  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }
  function getLamba(anode) {
    if (!(anode in kAlpha1Angstrom)) {
      throw new Error('The wavelength for the anode metal in the metadata is not defined');
    }

    return kAlpha1Angstrom[anode];
  }

  /**
   * d = Order of Reflection (n) × Wavelength (λ) / 2 × Sinθ
   *
   */

  /**
   * Calculates the interplanar spacing d according to Bragg's equation
   *
   * @export
   * @param {Array<number>} twoThetas. Note that this is 2θ *not* θ.
   * @param {Object} options.
   * @param {Number} options.orderOfReflection. Order of relection n. Defaults to 1.
   * @param {String} options.anode. Anode type. Defaults to "CuKa" Available options in constants.wavelengths.kAlpha1Angstrom
   * @returns {Array<number>} Interplanar spacings in Angstrom.
   */

  function calculateInterplanarSpacing(twoThetas, options = {}) {
    let {
      orderOfReflection = 1,
      anode = 'CuKa'
    } = options;
    const wavelength = getLamba(anode);
    return twoThetas.map(theta => {
      return orderOfReflection * wavelength / (2 * Math.sin(toRadians(theta)));
    });
  }
  /**
   * Calculates the reflex angles based on the interplanar spacings.
   *
   * @export
   * @param {Array<number>} ds spacings. In Angstrom.
   * @param {Object} options.
   * @param {Number} options.orderOfReflection. Order of relection n. Defaults to 1.
   * @param {String} options.anode. Anode type. Defaults to "CuKa" Available options in constants.wavelengths.kAlpha1Angstrom
   * @returns {Array<number>} twoThetas.
   */

  function calculateReflexes(ds, options = {}) {
    let {
      orderOfReflection = 1,
      anode = 'CuKa'
    } = options;
    const wavelength = getLamba(anode);
    return ds.map(d => {
      return toDegrees(Math.asin(orderOfReflection * wavelength / (2 * d)));
    });
  }

  /* eslint-disable no-empty-function */

  /**
   * Calculate the crystallite size according to the Scherrer equation.
   * Please check the strong assumptions (e.g., grains smaller than 0.1 to 0.2 μm)
   * for this analysis (https://en.wikipedia.org/wiki/Scherrer_equation).
   * The Scherrer equation only provides a lower bound, there also might be instrument broadening
   * (http://prism.mit.edu/XRAY/oldsite/CrystalSizeAnalysis.pdf)
   * @export
   * @param {Number} k  shape factor. The shape factor has a typical value of about 0.9, but varies with the actual shape of the crystallite. For a discussion see J. Appl. Cryst. 11 (1978) p102-113
   * @param {Number} lambda X-ray wavelength (output will be of the same unit)
   * @param {Number} beta FWHM line broadening in degree
   * @param {Number} theta  Bragg angle in degree, i.e. theta and not 2 theta
   * @returns mean size of the ordered (crystalline) domains in the unit of lambda
   */

  function scherrer(k, lambda, beta, theta) {
    return k * lambda / (toRadians(beta) * Math.cos(toRadians(theta)));
  }
  /**
   * Computes the broadening accoding to the Scherrer equation for every reflex
   * in the diffractogram. Uses the anode metal deposited in the metadata to
   * get the wavelength and the peaks previosuly picked
   * @export
   * @param {*} spectrum -with anode metal as metadata and picked peaks with FWHM, all in 2 theta units
   * @param {Number} k shape factor
   * @returns {Array} broadings - array of objects with x in 2 theta and crystallite sizes in nm
   */

  function scherrerForSpectrum(spectrum, k = 0.94) {
    if (!('peaks' in spectrum)) {
      throw new Error('There must be peaks to calculate the scherrer broadening');
    }

    if (!('anode' in spectrum.meta)) {
      throw new Error('The anode metal must be available in the metadata of the spectrum');
    }

    const lambda = getLamba(spectrum.meta.anode);
    let broadenings = [];

    for (let peak of spectrum.peaks) {
      broadenings.push({
        x: peak.x,
        crystalliteSize: scherrer(k, lambda, peak.fwhm, peak.x / 2) / 100
      }); // divide by 100 to convert A to nm
    }

    return broadenings;
  }

  exports.AnalysesManager = AnalysesManager;
  exports.Analysis = Analysis;
  exports.JSGraph = JSGraph;
  exports.calculateInterplanarSpacing = calculateInterplanarSpacing;
  exports.calculateReflexes = calculateReflexes;
  exports.fromBRML = fromBRML;
  exports.fromJcamp = fromJcamp;
  exports.fromPowDLLXY = fromPowDLLXY;
  exports.kAlpha1Angstrom = kAlpha1Angstrom;
  exports.scherrerForSpectrum = scherrerForSpectrum;
  exports.toJcamp = toJcamp;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xrd-analysis.js.map
