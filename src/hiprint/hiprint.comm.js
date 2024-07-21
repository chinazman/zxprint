"use strict";
/**
 * 这个函数是 Babel 编译器中用于 polyfill 的一部分，用于确保在不支持 ES6 的环境中也能正确地识别 Symbol 类型。
 * 在现代浏览器和 JavaScript 环境中，通常不需要这样的 polyfill，因为它们原生支持 Symbol 类型。
 * @param {*} obj 
 * @returns 
 */
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
