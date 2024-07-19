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

var hiprint = function (v10002) {
  var v10003 = {};

  function v10004(v10005) {
    if (v10003[v10005]) return v10003[v10005].exports;
    var v10006 = v10003[v10005] = {
      i: v10005,
      l: !1,
      exports: {}
    };
    return v10002[v10005].call(v10006.exports, v10006, v10006.exports, v10004), v10006.l = !0, v10006.exports;
  }

  return v10004.m = v10002, v10004.c = v10003, v10004.d = function (v10013, v10014, v10015) {
    v10004.o(v10013, v10014) || Object.defineProperty(v10013, v10014, {
      enumerable: !0,
      get: v10015
    });
  }, v10004.r = function (v10018) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(v10018, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(v10018, "__esModule", {
      value: !0
    });
  }, v10004.t = function (v10020, v10021) {
    if (1 & v10021 && (v10020 = v10004(v10020)), 8 & v10021) return v10020;
    if (4 & v10021 && "object" == _typeof(v10020) && v10020 && v10020.__esModule) return v10020;
    var v10022 = Object.create(null);
    if (v10004.r(v10022), Object.defineProperty(v10022, "default", {
      enumerable: !0,
      value: v10020
    }), 2 & v10021 && "string" != typeof v10020) for (var v10024 in v10020) {
      v10004.d(v10022, v10024, function (v10026) {
        return v10020[v10026];
      }.bind(null, v10024));
    }
    return v10022;
  }, v10004.n = function (v10028) {
    var v10029 = v10028 && v10028.__esModule ? function () {
      return v10028.default;
    } : function () {
      return v10028;
    };
    return v10004.d(v10029, "a", v10029), v10029;
  }, v10004.o = function (v10032, v10033) {
    return Object.prototype.hasOwnProperty.call(v10032, v10033);
  }, v10004.p = "/", v10004(v10004.s = 21);
}
([ part00,part01, part02, part03, part04, part05, part06, part07, part08, part09, part10, part11
  , part12 ,part13, part14, part15, part16, part17, part18, part19, part20, part21, part22, part23
  , part24, part25, part26, part27, part28, part29, part30, part31, part32, part33]);

var defaultElementTypeProvider = defaultTypeProvider(hiprint);

export {
  hiprint,
  defaultElementTypeProvider };