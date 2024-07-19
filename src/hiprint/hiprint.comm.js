"use strict";

export function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

export function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

/**
 * import 相关资源
 */
import $j from "jquery";

export const $ = $j;
export const jQuery = $j;

export const languages = {};
const ctx = require.context("../i18n", true, /\.json$/);
ctx.keys().forEach((key) => {
  languages[key.match(/\.\/([^.]+)/)[1]] = ctx(key);
});

export const i18n = {
  lang: 'cn',
  languages,
  __: function (key, params) {
    var str = this.languages[this.lang][key] || key;
    if (params && params instanceof Object) {
      Object.keys(params).forEach((key) => {
        str = str.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
      });
      return str;
    } else if (params) {
      str = str.replace(/%s/g, params);
      return str;
    } else {
      return str;
    }
  },
  __n: function (key, val) {
    var str = this.languages[this.lang][key];
    str = str.replace(/%s/g, val);
    return str;
  }
};
