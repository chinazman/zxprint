/* eslint-disable */
/**
 * jQuery Hiprint 2.5.4
 *
 * Copyright (c) 2016-2021 www.hinnn.com. All rights reserved.
 *
 * Licensed under the LGPL or commercial licenses
 * To use it on other terms please contact us: hinnn.com@gmail.com
 *
 */

"use strict";

/**
 * import 相关资源
 */
import {languages,i18n,$,jQuery} from "./hiprint.comm.js";
// js颜色选择
import "@claviska/jquery-minicolors/jquery.minicolors.min";
// 条形码
import JsBarcode from "jsbarcode";
// 二维码
import "./plugins/qrcode.js";
import bwipjs from "bwip-js";
// 水印
import watermark from "./plugins/watermark.js";
// 直接打印需要
import { io } from "socket.io-client";
//引入标尺
import lImg from "./css/image/l_img.svg";
import vImg from "./css/image/v_img.svg";
// pdf
import { jsPDF } from "jspdf";
import html2canvas from "@wtto00/html2canvas";
// 数字转中文,大写,金额
import Nzh from "nzh/dist/nzh.min.js";
// 解析svg 到 canvas, 二维码条形码需要
import Canvg from 'canvg';
// 默认自定义拖拽列表
import defaultTypeProvider from "./etypes/default-etyps-provider";

import part00 from "./parts/part00.js";
import part01 from "./parts/part01.js";
import part02 from "./parts/part02.js";
import part03 from "./parts/part03.js";
import part04 from "./parts/part04.js";
import part05 from "./parts/part05.js";
import part06 from "./parts/part06.js";
import part07 from "./parts/part07.js";
import part08 from "./parts/part08.js";
import part09 from "./parts/part09.js";
import part10 from "./parts/part10.js";
import part11 from "./parts/part11.js";
import part12 from "./parts/part12.js";
import part13 from "./parts/part13.js";
import part14 from "./parts/part14.js";
import part15 from "./parts/part15.js";
import part16 from "./parts/part16.js";
import part17 from "./parts/part17.js";
import part18 from "./parts/part18.js";
import part19 from "./parts/part19.js";
import part20 from "./parts/part20.js";
import part21 from "./parts/part21.js";
import part22 from "./parts/part22.js";
import part23 from "./parts/part23.js";
import part24 from "./parts/part24.js";
import part25 from "./parts/part25.js";
import part26 from "./parts/part26.js";
import part27 from "./parts/part27.js";
import part28 from "./parts/part28.js";
import part29 from "./parts/part29.js";
import part30 from "./parts/part30.js";
import part31 from "./parts/part31.js";
import part32 from "./parts/part32.js";
import part33 from "./parts/part33.js";

window.$ = window.jQuery = $;
window.autoConnect = true;
window.io = io;

var hiprint = function (modules) {
  var moduleCache = {};

  function require(moduleId) {
    if (moduleCache[moduleId]) return moduleCache[moduleId].exports;
    var module = moduleCache[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, require), module.l = !0, module.exports;
  }

  require.m = modules;
  require.c = moduleCache;
  require.d = function (exports, exportName, getter) {
    require.o(exports, exportName) || Object.defineProperty(exports, exportName, {
      enumerable: !0,
      get: getter
    });
  };
   require.r = function (moduleExports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(moduleExports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(moduleExports, "__esModule", {
      value: !0
    });
  };
  require.t = function (value, mode) {
    if (1 & mode && (value = require(value)), 8 & mode) return value;
    if (4 & mode && "object" == _typeof(value) && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (require.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) {
      require.d(ns, key, function (k) {
        return value[k];
      }.bind(null, key));
    }
    return ns;
  };
  require.n = function (getter) {
    var getModuleExports = getter && getter.__esModule ? function () {
      return getter.default;
    } : function () {
      return getter;
    };
    return require.d(getModuleExports, "a", getModuleExports), getModuleExports;
  }
  require.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  require.p = "/";
  return require(require.s = 21);
}
([ part00,part01, part02, part03, part04, part05, part06, part07, part08, part09, part10, part11
  , part12 ,part13, part14, part15, part16, part17, part18, part19, part20, part21, part22, part23
  , part24, part25, part26, part27, part28, part29, part30, part31, part32, part33]);

var defaultElementTypeProvider = defaultTypeProvider(hiprint);

export {
  hiprint,
  defaultElementTypeProvider };