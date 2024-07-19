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

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
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
import $ from "jquery";
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

window.$ = window.jQuery = $;
window.autoConnect = true;
window.io = io;

var languages = {};
const ctx = require.context("../i18n", true, /\.json$/);
ctx.keys().forEach((key) => {
  languages[key.match(/\.\/([^.]+)/)[1]] = ctx(key);
});

var i18n = {
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
}([function (v10036, v10037, v10038) {/**/
  "use strict";

  var v10039;
  v10038.d(v10037, "a", function () {
    return hinnn;
  }), window.hinnn = {}, hinnn.event = (v10039 = {}, {
    on: function on(v10041, v10042) {
      v10039[v10041] || (v10039[v10041] = []), v10039[v10041].push(v10042);
    },
    id: 0,
    off: function off(v10043, v10044) {
      var v10045 = v10039[v10043];
      if (v10045) {
        for (var v10046 = -1, v10047 = 0; v10047 < v10045.length; v10047++) {
          if (v10045[v10047] === v10044) {
            v10046 = v10047;
            break;
          }
        }
        v10046 < 0 || v10039[v10043].splice(v10046, 1);
      }
    },
    trigger: function trigger(v10048) {
      var v10049 = v10039[v10048];
      if (v10049 && v10049.length) for (var v10050 = Array.prototype.slice.call(arguments, 1), v10051 = 0; v10051 < v10049.length; v10051++) {
        v10049[v10051].apply(this, v10050);
      }
    },
    clear: function clear(v10052) {
      v10039[v10052] = [];
    },
    getId: function getId() {
      return this.id += 1, this.id;
    },
    getNameWithId: function getNameWithId(v10053) {
      return v10053 + "-" + this.getId();
    }
  }), hinnn.form = {
    serialize: function serialize(v10054) {
      var v10055 = $(v10054).serializeArray(),
        v10056 = {};
      return $.each(v10055, function () {
        v10056[this.name] ? "[object Array]" == Object.prototype.toString.call(v10056[this.name]) ? v10056[this.name].push(this.value) : v10056[this.name] = [v10056[this.name], this.value] : v10056[this.name] = this.value;
      }), v10056;
    }
  }, hinnn.pt = {
    toPx: function toPx(v10057) {
      return v10057 * (this.getDpi() / 72);
    },
    toMm: function toMm(v10058) {
      return hinnn.px.toMm(hinnn.pt.toPx(v10058));
    },
    dpi: 0,
    getDpi: function getDpi() {
      if (!this.dpi) {
        var _t2 = document.createElement("DIV");

        _t2.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden", document.body.appendChild(_t2), this.dpi = _t2.offsetHeight;
      }

      return this.dpi;
    }
  }, hinnn.px = {
    toPt: function toPt(v10059) {
      return v10059 * (72 / this.getDpi());
    },
    toMm: function toMm(v10060) {
      return Math.round(v10060 / this.getDpi() * 25.4 * 100) / 100;
    },
    dpi: 0,
    getDpi: function getDpi() {
      if (!this.dpi) {
        var _t3 = document.createElement("DIV");

        _t3.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden", document.body.appendChild(_t3), this.dpi = _t3.offsetHeight;
      }

      return this.dpi;
    }
  }, hinnn.mm = {
    toPt: function toPt(v10061) {
      return 72 / 25.4 * v10061;
    },
    toPx: function toPx(v10062) {
      return hinnn.pt.toPx(hinnn.mm.toPt(v10062));
    }
  }, hinnn.throttle = function (v10063, v10064, v10065) {
    var v10066,
      v10067,
      v10068,
      v10069 = null,
      v10070 = 0;
    v10065 || (v10065 = {});

    var v10071 = function v10072() {
      v10070 = !1 === v10065.leading ? 0 : _.now(), v10069 = null, v10068 = v10063.apply(v10066, v10067), v10069 || (v10066 = v10067 = null);
    };

    return function () {
      var v10074 = _.now();

      v10070 || !1 !== v10065.leading || (v10070 = v10074);
      var v10076 = v10064 - (v10074 - v10070);
      return v10066 = this, v10067 = arguments, v10076 <= 0 || v10076 > v10064 ? (v10069 && (clearTimeout(v10069), v10069 = null), v10070 = v10074, v10068 = v10063.apply(v10066, v10067), v10069 || (v10066 = v10067 = null)) : v10069 || !1 === v10065.trailing || (v10069 = setTimeout(v10071, v10076)), v10068;
    };
  }, hinnn.debounce = function (v10077, v10078, v10079) {
    var v10080,
      v10081,
      v10082,
      v10083,
      v10084,
      v10085 = function v10086() {
        var v10087 = _.now() - v10083;
        v10087 < v10078 && v10087 >= 0 ? v10080 = setTimeout(v10086, v10078 - v10087) : (v10080 = null, v10079 || (v10084 = v10077.apply(v10082, v10081), v10080 || (v10082 = v10081 = null)));
      };

    return function () {
      v10082 = this, v10081 = arguments, v10083 = _.now();
      var v10090 = v10079 && !v10080;
      return v10080 || (v10080 = setTimeout(v10085, v10078)), v10090 && (v10084 = v10077.apply(v10082, v10081), v10082 = v10081 = null), v10084;
    };
  }, hinnn.toUtf8 = function (v10091) {
    var v10092, v10093, v10094, v10095;

    for (v10092 = "", v10094 = v10091.length, v10093 = 0; v10093 < v10094; v10093++) {
      (v10095 = v10091.charCodeAt(v10093)) >= 1 && v10095 <= 127 ? v10092 += v10091.charAt(v10093) : v10095 > 2047 ? (v10092 += String.fromCharCode(224 | v10095 >> 12 & 15), v10092 += String.fromCharCode(128 | v10095 >> 6 & 63), v10092 += String.fromCharCode(128 | v10095 >> 0 & 63)) : (v10092 += String.fromCharCode(192 | v10095 >> 6 & 31), v10092 += String.fromCharCode(128 | v10095 >> 0 & 63));
    }

    return v10092;
  }, hinnn.groupBy = function (v10096, v10097, v10098) {
    var v10099 = {};
    return v10096.forEach(function (v10100) {
      var v10101 = JSON.stringify(v10098(v10100));
      v10099[v10101] || (v10099[v10101] = {
        rows: []
      }, v10097.forEach(function (v10102) {
        v10099[v10101][v10102] = v10100[v10102];
      })), v10099[v10101].rows.push(v10100);
    }), Object.keys(v10099).map(function (v10103) {
      return v10099[v10103];
    });
  }, hinnn.orderBy = function (v10104, v10105) {
    if (v10104.length <= 1) return v10104;
    var v10106 = Math.floor(v10104.length / 2),
      v10107 = v10104.splice(v10106, 1)[0],
      v10108 = [],
      v10109 = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = v10104[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _n = _step.value;
        v10105(_n) < v10105(v10107) ? v10108.push(_n) : v10109.push(_n);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return this.orderBy(v10108, v10105).concat([v10107], this.orderBy(v10109, v10105));
  }, hinnn.dateFormat = function (v10110, v10111) {
    if (v10110) try {
      var v10112 = "string" == typeof v10110 ? new Date(v10110) : v10110;
      var v10113 = {
        "y+": v10112.getFullYear(),
        "M+": v10112.getMonth() + 1,
        "d+": v10112.getDate(),
        "H+": v10112.getHours(),
        "m+": v10112.getMinutes(),
        "s+": v10112.getSeconds(),
        "q+": Math.floor((v10112.getMonth() + 3) / 3),
        S: v10112.getMilliseconds()
      };

      for (var v10115 in /(y+)/.test(v10111) && (v10111 = v10111.replace(RegExp.$1, (v10112.getFullYear() + "").substr(4 - RegExp.$1.length))), v10113) {
        new RegExp("(" + v10115 + ")").test(v10111) && (v10111 = v10111.replace(RegExp.$1, 1 == RegExp.$1.length ? v10113[v10115] : ("00" + v10113[v10115]).substr(("" + v10113[v10115]).length)));
      }

      return v10111;
    } catch (v10116) {
      return console.log(v10116), "";
    }
    return "";
  }, hinnn.numFormat = function (v10117, v10118) {
    if (v10117 != void 0) try {
      var v10119 = "string" == typeof v10117 ? parseFloat(v10117) : v10117;
      var v10120 = parseInt(v10118);
      if (v10120 > 0) {
        return v10119.toFixed(v10120);
      }
      return parseInt(v10119.toString());
    } catch (v10121) {
      return console.log(v10121), "";
    }
    return "";
  }, hinnn.toUpperCase = function (type, val) {
    if (!Nzh) return val;
    var backStr = val;
    switch (type) {
      case "0":
        backStr = Nzh.cn.encodeS(val);
        break;
      case "1":
        backStr = Nzh.cn.encodeS(val, { tenMin: false });
        break;
      case "2":
        backStr = Nzh.cn.encodeB(val, { tenMin: true });
        break;
      case "3":
        backStr = Nzh.cn.encodeB(val);
        break;
      case "4":
        backStr = Nzh.cn.toMoney(val, { tenMin: true });
        break;
      case "5":
        backStr = Nzh.cn.toMoney(val);
        break;
      case "6":
        backStr = Nzh.cn.toMoney(val, { complete: true });
        break;
      case "7":
        backStr = Nzh.cn.toMoney(val, { complete: true, outSymbol: false });
        break;
    }
    return backStr;
  };
}, function (v10122, v10123, v10124) {
  "use strict";

  v10124.d(v10123, "a", function () {
    return v10126;
  });

  var v10127 = v10124(9),
    v10126 = function () {
      function v10128() {

        // see hiprint.config.js
      }
      return v10128.prototype.init = function (v10129) {
        v10129 && $.extend(this, v10129);
      }, v10128.prototype.on = function (v10130, v10131) {
        hinnn.event.on(v10130, v10131);
      }, v10128.prototype.clear = function (v10132) {
        hinnn.event.clear(v10132);
      }, v10128.prototype.registerItems = function (items) {
        items.forEach(function (v10133) {
          v10127.a.registerItem(new v10133());
        });
      }, Object.defineProperty(v10128, "instance", {
        get: function get() {
          return v10128._instance || (v10128._instance = new v10128(), window.HIPRINT_CONFIG && $.extend(v10128._instance, HIPRINT_CONFIG), v10128._instance.optionItems && v10128._instance.optionItems.forEach(function (v10135) {
            v10127.a.registerItem(new v10135());
          })), v10128._instance;
        },
        enumerable: !0,
        configurable: !0
      }), v10128;
    }();
}, function (v10137, v10138, v10139) {
  "use strict";

  var v10140 = function () {
    function v10142(v10141) {
      this.printElement = v10141;
    }

    return v10142.prototype.updatePosition = function (v10143, v10144) {
      this.left = v10143, this.top = v10144;
    }, v10142;
  }();

  v10139.d(v10138, "a", function () {
    return v10146;
  });

  var v10146 = function () {
    function v10147() {
      this.printTemplateContainer = {}, this.A1 = {
        width: 841,
        height: 594
      }, this.A2 = {
        width: 420,
        height: 594
      }, this.A3 = {
        width: 420,
        height: 297
      }, this.A4 = {
        width: 210,
        height: 297
      }, this.A5 = {
        width: 210,
        height: 148
      }, this.A6 = {
        width: 105,
        height: 148
      }, this.A7 = {
        width: 105,
        height: 74
      }, this.A8 = {
        width: 52,
        height: 74
      }, this.B1 = {
        width: 1e3,
        height: 707
      }, this.B2 = {
        width: 500,
        height: 707
      }, this.B3 = {
        width: 500,
        height: 353
      }, this.B4 = {
        width: 250,
        height: 353
      }, this.B5 = {
        width: 250,
        height: 176
      }, this.B6 = {
        width: 125,
        height: 176
      }, this.B7 = {
        width: 125,
        height: 88
      }, this.B8 = {
        width: 62,
        height: 88
      }, this.dragLengthCNum = function (v10148, v10149) {
        var v10150 = .75 * v10148;
        return v10149 && (v10149 = v10149), Math.round(v10150 / v10149) * v10149;
      };
    }

    return Object.defineProperty(v10147, "instance", {
      get: function get() {
        return this._instance || (this._instance = new v10147()), this._instance;
      },
      enumerable: !0,
      configurable: !0
    }), v10147.prototype.getDragingPrintElement = function () {
      return v10147.instance.dragingPrintElement;
    }, v10147.prototype.setDragingPrintElement = function (v10151) {
      v10147.instance.dragingPrintElement = new v10140(v10151);
    }, v10147.prototype.guid = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (v10152) {
        var v10153 = 16 * Math.random() | 0;
        return ("x" == v10152 ? v10153 : 3 & v10153 | 8).toString(16);
      });
    }, v10147.prototype.imageToBase64 = function (v10154) {
      if (-1 == $(v10154).attr("src").indexOf("base64")) try {
        var v10155 = document.createElement("canvas"),
          v10156 = new Image();
        v10156.src = v10154.attr("src"), v10155.width = v10156.width, v10155.height = v10156.height, v10155.getContext("2d").drawImage(v10156, 0, 0), v10154.attr("src", v10155.toDataURL("image/png"));
      } catch (v10157) {
        try {
          this.xhrLoadImage(v10154);
        } catch (v10158) {
          console.log(v10158);
        }
      }
    }, v10147.prototype.xhrLoadImage = function (v10159) {
    }, v10147.prototype.transformImg = function (v10160) {
      var v10161 = this;
      v10160.map(function (v10162, v10163) {
        v10161.imageToBase64($(v10163));
      });
    }, v10147.prototype.getPrintTemplateById = function (v10164) {
      return v10147.instance.printTemplateContainer[v10164];
    }, v10147.prototype.setPrintTemplateById = function (v10165, v10166) {
      return v10147.instance.printTemplateContainer[v10165] = v10166;
    }, v10147;
  }();
}, function (v10167, v10168, v10169) {
  "use strict";

  var v10170 = function () {
    return function () {
    };
  }();

  v10169.d(v10168, "a", function () {
    return v10172;
  });

  var v10172 = function () {
    function v10174(v10173) {
      v10173 = v10173 || {}, this.left = v10173.left, this.top = v10173.top, this.topInDesign = this.top, this.height = v10173.height, this.width = v10173.width, this.transform = v10173.transform, this.init(v10173);
    }

    return v10174.prototype.setDefault = function (v10175) {
      this.defaultOptions = v10175, this.initSize();
      Object.keys(this.defaultOptions).forEach((key) => {
        this[key] = this[key] || this.defaultOptions[key];
      });
    }, v10174.prototype.initSize = function () {
      this.width || this.setWidth(this.defaultOptions.width), this.height || this.setHeight(this.defaultOptions.height);
    }, v10174.prototype.initSizeByHtml = function (v10176, v10177) {
      this.width || this.setWidth(v10176), this.height || this.setHeight(v10177);
    }, v10174.prototype.getRectInfo = function () {
      var v10178 = { w: 0, h: 0, diffW: 0, diffH: 0 };
      if (this.transform) {
        var rad = this.transform * Math.PI / 180,
          width = this.width,height = this.height,
          sin = Math.sin(rad),cos = Math.cos(rad),
          v10179 = Math.abs(width * cos) + Math.abs(height * sin),
          v10180 = Math.abs(width * sin) + Math.abs(height * cos),
          diffW = (width - v10179) / 2,diffH = (height - v10180) / 2;
        v10178.w = v10179, v10178.h = v10180, v10178.diffW = diffW, v10178.diffH = diffH;
      }
      return v10178;
    }, v10174.prototype.getLeft = function () {
      return this.left;
    }, v10174.prototype.posLeft = function () {
      var left = this.left;
      if (this.transform) left += this.getRectInfo().diffW;
      return Math.floor(left * 10) / 10;
    }, v10174.prototype.setRotate = function (v10183) {
      null != v10183 && (this.transform = v10183);
    }, v10174.prototype.displayLeft = function (v10184) {
      if (this.transform && v10184) {
        return this.left + this.getRectInfo().diffW + "pt";
      }
      return this.left + "pt";
    }, v10174.prototype.setLeft = function (v10185) {
      null != v10185 && (this.left = v10185);
    }, v10174.prototype.getTop = function () {
      return this.top;
    }, v10174.prototype.posTop = function () {
      var top = this.top;
      if (this.transform) top += this.getRectInfo().diffH;
      return Math.floor(top * 10) / 10;
    }, v10174.prototype.getTopInDesign = function () {
      return this.topInDesign;
    }, v10174.prototype.displayTop = function (v10186) {
      if (this.transform && v10186) {
        return this.top + this.getRectInfo().diffH + "pt";
      }
      return this.top + "pt";
    }, v10174.prototype.setTop = function (v10187) {
      null != v10187 && (this.top = v10187);
    }, v10174.prototype.copyDesignTopFromTop = function () {
      this.topInDesign = this.top;
    }, v10174.prototype.getHeight = function () {
      if (this.transform) {
        var v10188 = this.getRectInfo();
        return v10188.h + v10188.diffH;
      }
      return this.height;
    }, v10174.prototype.displayHeight = function () {
      return this.height + "pt";
    }, v10174.prototype.setHeight = function (v10190) {
      null != v10190 && (this.height = v10190);
    }, v10174.prototype.getWidth = function () {
      if (this.transform) {
        var v10191 = this.getRectInfo();
        return v10191.w + v10191.diffW;
      }
      return this.width;
    }, v10174.prototype.displayWidth = function () {
      return this.width + "pt";
    }, v10174.prototype.setWidth = function (v10193) {
      null != v10193 && (this.width = v10193);
    }, v10174.prototype.getValueFromOptionsOrDefault = function (v10194) {
      return null == this[v10194] ? this.defaultOptions[v10194] : this[v10194];
    }, v10174.prototype.getPrintElementOptionEntity = function () {
      var v10195 = new v10170(),
        v10196 = this;
      return Object.keys(this).filter(function (v10197) {
        return "topInDesign" != v10197;
      }).forEach(function (v10198) {
        if ("number" != typeof v10196[v10198] && "string" != typeof v10196[v10198] && !['fields'].includes(v10198) && _typeof(v10196[v10198]) != _typeof(!0) || (v10195[v10198] = v10196[v10198]), "style" == v10198) {
          v10195.style = {};
          var v10199 = v10196[v10198];
          if (v10199) Object.keys(v10199).forEach(function (v10200) {
            "number" != typeof v10199[v10200] && "string" != typeof v10199[v10200] || (v10195.style[v10200] = v10199[v10200]);
          });
        }
      }), v10195;
    }, v10174.prototype.init = function (v10201) {
      var v10202 = this;
      v10201 && Object.keys(v10201).forEach(function (v10203) {
        v10202[v10203] = v10201[v10203];
      });
    }, v10174;
  }();
}, function (module, __webpack_exports__, __webpack_require__) {
  "use strict";

  __webpack_require__.d(__webpack_exports__, "a", function () {
    return BasePrintElement;
  });

  var _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1),
    _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2),
    BasePrintElement = function () {
      function BasePrintElement(v10205) {
        this.printElementType = v10205, this.id = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.guid();
      }

      return BasePrintElement.prototype.getConfigOptionsByName = function (v10207) {
        return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance[v10207];
      }, BasePrintElement.prototype.getProxyTarget = function (v10209) {
        v10209 && this.SetProxyTargetOption(v10209);
        var v10210 = this.getData(),
          v10211 = this.createTarget(this.getTitle(), v10210);
        return this.updateTargetSize(v10211), this.css(v10211, v10210), v10211;
      }, BasePrintElement.prototype.SetProxyTargetOption = function (v10212) {
        this.options.getPrintElementOptionEntity();
        $.extend(this.options, v10212);
        this.copyFromType();
      }, BasePrintElement.prototype.showInPage = function (v10213, v10214) {
        var v10215 = this.options.showInPage,
          v10216 = this.options.unShowInPage;

        if (v10215) {
          if ("first" == v10215) return 0 == v10213;
          if (v10213 == v10214 - 1 && "last" == v10216) return !1;
          if ("odd" == v10215) return (0 != v10213 || "first" != v10216) && v10213 % 2 == 0;
          if ("even" == v10215) return v10213 % 2 == 1;
          if ("last" == v10215) return v10213 == v10214 - 1;
        }

        return (0 != v10213 || "first" != v10216) && (v10213 != v10214 - 1 || "last" != v10216);
      }, BasePrintElement.prototype.setTemplateId = function (v10217) {
        this.templateId = v10217;
      }, BasePrintElement.prototype.setPanel = function (v10218) {
        this.panel = v10218;
      }, BasePrintElement.prototype.getField = function () {
        return this.options.field || this.printElementType.field;
      }, BasePrintElement.prototype.getTitle = function () {
        return this.printElementType.title;
      }, BasePrintElement.prototype.updateSizeAndPositionOptions = function (v10219, v10220, v10221, v10222) {
        const template = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId);
        if (this.panel !== void 0 && !template.willOutOfBounds) {
          const panelWidthPt = hinnn.mm.toPt(this.panel.width);
          const panelHeightPt = hinnn.mm.toPt(this.panel.height);
          if (v10219 < 0) {
            return;
          }
          if (v10220 < 0) {
            return;
          }
          if (v10219 + this.options.width > panelWidthPt) {
            return;
          }
          if (v10220 + this.options.height > panelHeightPt) {
            return;
          }
        }
        this.options.setLeft(v10219), this.options.setTop(v10220), this.options.copyDesignTopFromTop(), this.options.setWidth(v10221), this.options.setHeight(v10222);
      }, BasePrintElement.prototype.initSizeByHtml = function (v10224) {
        if (v10224 && v10224.length) {
          this.createTempContainer();
          var v10225 = v10224.clone();
          this.getTempContainer().append(v10225), this.options.initSizeByHtml(parseInt(hinnn.px.toPt(v10225.width()).toString()), parseInt(hinnn.px.toPt(v10225.height()).toString())), this.removeTempContainer();
        }
      }, BasePrintElement.prototype.updateTargetSize = function (v10226) {
        v10226.css("width", this.options.displayWidth()), v10226.css("height", this.options.displayHeight());
      }, BasePrintElement.prototype.updateTargetWidth = function (v10227) {
        v10227.css("width", this.options.displayWidth());
      }, BasePrintElement.prototype.getDesignTarget = function (v10228) {
        var v10229 = this,lastTimeStamp = 0;
        return this.designTarget = this.getHtml(v10228)[0].target, this.designPaper = v10228, this.designTarget.click(function (ev) {
          if (ev.timeStamp - lastTimeStamp > 500) {
            hinnn.event.trigger(v10229.getPrintElementSelectEventKey(), {
              printElement: v10229
            });
          }
          lastTimeStamp = ev.timeStamp;
        }), this.designTarget.dblclick(function (ev) {
          var v10230 = v10229.designTarget.find(".hiprint-printElement-content");
          if (v10230) {
            var v10231 = v10229.designTarget.find(".resize-panel");
            if (v10229.printElementType.type == "text" && !(v10229.options.textType && "text" != v10229.options.textType)) {
              v10229._editing = true;
              v10229.designTarget.hidraggable('update', { draggable: false });
              v10230.css("cursor", "text"), v10230.addClass("editing");
              v10229.designTarget.addClass("editing");
              v10230.click(function (ev) {
                if (v10229._editing) {
                  ev.stopPropagation();
                }
              });
              v10230.attr("contenteditable", true), v10231 && v10231.css("display", "none");
              v10229.selectEnd(v10230);
            }
          }
        }), this.designTarget;
      }, BasePrintElement.prototype.selectEnd = function (el) {
        el.focus();
        if (typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined") {
          var v10232 = document.createRange();
          v10232.selectNodeContents(el[0]);
          v10232.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(v10232);
        } else if (typeof document.body.createTextRange != "undefined") {
          var v10232 = document.body.createTextRange();
          v10232.moveToElementText(el[0]), v10232.collapse(false), v10232.select();
        }
      }, BasePrintElement.prototype.updateByContent = function (clear) {
        var v10233 = this,v10234 = v10233.designTarget.find(".hiprint-printElement-content");
        if (v10233._editing) {
          v10234 && v10234.css("cursor", "") && v10234.removeClass("editing") && v10234.removeAttr("contenteditable");
          v10233.designTarget.removeClass("editing");
          var v10235 = v10234.text(),title = v10233.options.title;
          if (v10235.startsWith(title) && v10233.options.field) {
            if (v10235.length > title.length) {
              v10233.options.testData = v10235.split("：")[1];
            } else {
              v10233.options.title = v10235;
              v10233.options.testData = "";
            }
          } else {
            v10233.options.title = v10235;
          }
          v10233.options.title = v10233.options.title.split("：")[0];
          if (!clear) {
            hinnn.event.trigger(v10233.getPrintElementSelectEventKey(), {
              printElement: v10233
            });
          }
          v10233.updateDesignViewFromOptions(), hinnn.event.trigger("hiprintTemplateDataChanged_" + v10233.templateId, "编辑修改");
          v10233._editing = false;
          var draggable = v10233.options.draggable == undefined || true == v10233.options.draggable;
          v10233.designTarget.hidraggable('update', { draggable: draggable });
        }
      }, BasePrintElement.prototype.getPrintElementSelectEventKey = function () {
        return "PrintElementSelectEventKey_" + this.templateId;
      }, BasePrintElement.prototype.design = function (v10236, v10237) {
        var v10238 = this;
        this.designTarget.hidraggable({
          // 添加 draggable 属性
          draggable: v10238.options.draggable,
          axis: v10238.options.axis ? v10238.options.axis : void 0,
          designTarget: v10238,
          onDrag: function onDrag(v10239, v10240, v10241) {
            // 处理按住 ctrl / command 多选元素
            var els = v10238.panel.printElements.filter(function (v10242) {
              return 'block' == v10242.designTarget.children().last().css('display') &&
              v10242.designTarget.children().last().hasClass('selected') && !v10242.printElementType.type.includes('table');
            });
            var isMultiple = els.length > 1;
            var notSelected = !v10238.designTarget.children().last().hasClass('selected');
            if (isMultiple) {
              var left = v10240 - v10238.options.left,top = v10241 - v10238.options.top;
              els.forEach(function (v10243) {
                v10243.updateSizeAndPositionOptions(left + v10243.options.getLeft(), top + v10243.options.getTop()),
                v10243.designTarget.css("left", v10243.options.displayLeft()), v10243.designTarget.css("top", v10243.options.displayTop());
                v10243.createLineOfPosition(v10237);
              });
              if (notSelected) {
                v10238.updateSizeAndPositionOptions(v10240, v10241), v10238.createLineOfPosition(v10237);
              }
            } else {
              v10238.updateSizeAndPositionOptions(v10240, v10241), v10238.createLineOfPosition(v10237);
            }
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = !0;
          },
          moveUnit: "pt",
          minMove: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
          onBeforeDrag: function onBeforeDrag(v10246) {
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0, v10238.designTarget.focus(), v10238.createLineOfPosition(v10237);
          },
          onBeforeSelectAllDrag: function onBeforeSelectAllDrag() {
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0, v10238.designTarget.focus();
          },
          getScale: function getScale() {
            return v10238.designPaper.scale || 1;
          },
          onStopDrag: function onStopDrag(v10249) {
            // 普通元素拖动结束事件history
            if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed) hinnn.event.trigger("hiprintTemplateDataChanged_" + v10238.templateId, "移动");
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !1,
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = !1;
            var els = v10238.panel.printElements.filter(function (v10253) {
              return 'block' == v10253.designTarget.children().last().css('display') && !v10253.printElementType.type.includes('table');
            });
            if (els.length > 1) {
              els.forEach(function (v10254) {v10254.removeLineOfPosition();});
            } else v10238.removeLineOfPosition();
          }
        }), this.setResizePanel(), this.bingCopyEvent(this.designTarget), this.bingKeyboardMoveEvent(this.designTarget, v10237);
      }, BasePrintElement.prototype.getPrintElementEntity = function (v10255) {
        return v10255 ? new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(void 0, this.options.getPrintElementOptionEntity(), this.printElementType.getPrintElementTypeEntity()) : new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(this.printElementType.tid, this.options.getPrintElementOptionEntity());
      }, BasePrintElement.prototype.submitOption = function () {
        var els = this.panel.printElements.filter(function (v10258) {
          return 'block' == v10258.designTarget.children().last().css('display') &&
          v10258.designTarget.children().last().hasClass('selected') &&
          !v10258.printElementType.type.includes('table');
        });
        els = els.filter((ele) => ele.printElementType.type == this.printElementType.type);
        var v10259 = this,v10260 = this.getConfigOptions();
        if (v10260 && v10260.tabs && v10260.tabs.length) {
          this.getPrintElementOptionTabs().forEach(function (tab) {
            // 样式更新要应用到其他选中的同种元素
            if (tab.name === "样式" && els.length) {
              tab.list.forEach(function (v10261) {
                els.forEach((ele) => {
                  var v10262 = v10261.getValue(),
                    v10263 = 'textType' == v10261.name && ele.options[v10261.name] !== v10262,
                    v10264 = 'axis' == v10261.name && ele.options[v10261.name] !== v10262;
                  v10262 && "object" == _typeof(v10262) ? Object.keys(v10262).forEach(function (v10265) {
                    ele.options[v10265] = v10262[v10265];
                  }) : ele.options[v10261.name] = v10262;
                  if (v10263) {
                    ele.setResizePanel();
                  }
                  if (v10264) {
                    ele.designTarget.hidraggable('update', { axis: v10262 });
                  }
                });
              });
            } else {
              tab.list.forEach(function (v10266) {
                var v10267 = v10266.getValue(),v10268 = 'textType' == v10266.name && v10259.options[v10266.name] !== v10267,
                  v10269 = 'axis' == v10266.name && v10259.options[v10266.name] !== v10267;
                v10267 && "object" == _typeof(v10267) ? Object.keys(v10267).forEach(function (v10270) {
                  v10259.options[v10270] = v10267[v10270];
                }) : v10259.options[v10266.name] = v10267;
                if (v10268) {
                  v10259.setResizePanel();
                }
                if (v10269) {
                  v10259.designTarget.hidraggable('update', { axis: v10267 });
                }
              });
            }
          });
        } else {
          this.getPrintElementOptionItems().forEach(function (v10271) {
            var v10272 = v10271.getValue(),v10273 = 'textType' == v10271.name && v10259.options[v10271.name] !== v10272,
              v10274 = 'axis' == v10271.name && v10259.options[v10271.name] !== v10272;
            v10272 && "object" == _typeof(v10272) ? Object.keys(v10272).forEach(function (v10275) {
              v10259.options[v10275] = v10272[v10275];
            }) : v10259.options[v10271.name] = v10272;
            if (v10273) {
              v10259.setResizePanel();
            }
            if (v10274) {
              v10259.designTarget.hidraggable('update', { axis: v10272 });
            }
          });
        }
        this.updateDesignViewFromOptions(), hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "元素修改");
      }, BasePrintElement.prototype.updateOption = function (v10276, v10277, v10278) {
        try {
          var v10279 = this.getConfigOptions();
          var optionKeys = [];
          if (v10279 && v10279.tabs && v10279.tabs.length) {
            v10279.tabs.forEach(function (v10280) {
              v10280.options.forEach(function (v10281) {
                optionKeys.push(v10281.name);
              });
            });
          } else {
            optionKeys = v10279.supportOptions.map(function (v10282) {return v10282.name;});
          }
          if (optionKeys && optionKeys.includes(v10276)) {
            this.options[v10276] = v10277;
            this.updateDesignViewFromOptions();
            if (!v10278) {
              hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "参数修改");
            }
          }
          this._printElementOptionTabs.forEach((tab) => {
            tab.list.forEach((item) => {
              if (item.name === v10276) {
                item.target.find('select')?.val(v10277.toString());
                item.target.find('input')?.val(v10277.toString());
              }
            });
          });
        } catch (v10283) {
          console.log('updateOption error', v10283);
        }
      }, BasePrintElement.prototype.getReizeableShowPoints = function () {
        return ['barcode', 'qrcode'].includes(this.options.textType) ? ["se", "s", "e", "r"] : ["s", "e", "r"];
      }, BasePrintElement.prototype.setResizePanel = function () {
        var v10284 = this,v10285 = this.designPaper;
        this.designTarget.hireizeable({
          showPoints: v10284.getReizeableShowPoints(),
          draggable: v10284.options.draggable, // 元素是否可拖拽、删除
          // 是否显示宽高box
          showSizeBox: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.showSizeBox,
          getScale: function getScale() {
            return v10284.designPaper.scale || 1;
          },
          onBeforeResize: function onBeforeResize() {
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0;
          },
          onResize: function onResize(v10288, v10289, v10290, v10291, v10292, rt) {
            if (undefined != rt) {
              v10284.onRotate(v10288, rt);
            } else {
              v10284.onResize(v10288, v10289, v10290, v10291, v10292);
            }
            v10284.createLineOfPosition(v10285);
          },
          onStopResize: function onStopResize(v10293) {
            hinnn.event.trigger("hiprintTemplateDataChanged_" + v10284.templateId, v10293 ? "旋转" : "大小");
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !1, v10284.removeLineOfPosition();
          }
        });
      }, BasePrintElement.prototype.onRotate = function (v10295, v10296) {
        this.options.setRotate(v10296);
      }, BasePrintElement.prototype.onResize = function (v10297, v10298, v10299, v10300, v10301) {
        this.updateSizeAndPositionOptions(v10301, v10300, v10299, v10298);
      }, BasePrintElement.prototype.getOrderIndex = function () {
        return this.options.getTop();
      }, BasePrintElement.prototype.getHtml = function (v10302, v10303, v10304) {
        var v10305 = 0;
        this.setCurrenttemplateData(v10303);
        var v10306 = [],
          v10307 = this.getBeginPrintTopInPaperByReferenceElement(v10302),
          v10308 = v10302.getPaperFooter(v10305);
        this.isHeaderOrFooter() || this.isFixed() || v10307 > v10308 && "none" != v10302.panelPageRule && (v10306.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
          target: void 0,
          printLine: void 0
        })), v10307 = v10307 - v10308 + v10302.paperHeader, v10305++, v10308 = v10302.getPaperFooter(v10305));
        var v10310 = this.getData(v10303),
          v10311 = this.createTarget(this.getTitle(), v10310, v10304);
        this.updateTargetSize(v10311), this.css(v10311, v10310), v10311.css("position", "absolute"), v10311.css("left", this.options.displayLeft()), v10311.css("top", v10307 + "pt"), v10306.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
          target: v10311,
          printLine: v10307 + this.options.getHeight(),
          referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: v10302.index,
            bottomInLastPaper: v10307 + this.options.getHeight(),
            printTopInPaper: v10307
          })
        }));
        if (v10303 && this.options.pageBreak) {
          v10306[0].target.css("top", v10302.paperHeader + "pt");
          v10306[0].referenceElement.top = this.options.getTop() - this.options.getHeight() - v10302.paperHeader;
          v10306[0].printLine = v10302.paperHeader;
          v10306[0].referenceElement.bottomInLastPaper = 0;
          v10306[0].referenceElement.printTopInPaper = v10302.paperHeader;
          v10306.unshift(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: v10311,
            printLine: v10302.height,
            referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
              top: 0,
              left: 0,
              height: 0,
              width: 0,
              beginPrintPaperIndex: v10302.index,
              bottomInLastPaper: v10302.height,
              printTopInPaper: v10302.paperHeader
            })
          }));
        }
        return v10306;
      }, BasePrintElement.prototype.getHtml2 = function (v10316, v10317, v10318) {
        var v10319 = 0;
        this.setCurrenttemplateData(v10317);
        var v10320 = [],
          v10321 = this.getBeginPrintTopInPaperByReferenceElement(v10316),
          v10322 = v10316.getPaperFooter(v10319);
        // 处理文本/辅助元素 当高度大于模板高度, 插入的分页...
        this.isHeaderOrFooter() || this.isFixed() || ("none" != v10316.panelPageRule && v10321 > v10322 && (v10320.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
          target: void 0,
          printLine: void 0
          // (e && r + this.options.getHeight() > a) --> 设计时拖拽元素高度超过页脚线时,导致报错问题
        })), v10321 = v10321 - v10322 + v10316.paperHeader, v10319++, v10322 = v10316.getPaperFooter(v10319)), v10321 <= v10322 && v10317 && v10321 + this.options.getHeight() > v10322 && "none" != v10316.panelPageRule && (v10320.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
          target: void 0,
          printLine: void 0
        })), v10321 = v10316.paperHeader, v10319++, v10322 = v10316.getPaperFooter(v10319)));
        var v10325 = this.getData(v10317),
          v10326 = this.createTarget(this.getTitle(), v10325);
        if ("none" == v10316.panelPageRule && v10321 + this.options.getHeight() > v10322) this.updatePanelHeight(v10321 + this.options.getHeight(), v10316);
        this.updateTargetSize(v10326), this.css(v10326, v10325), v10326.css("position", "absolute"), v10326.css("left", this.options.displayLeft()), v10326.css("top", v10321 + "pt"), v10320.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
          target: v10326,
          printLine: v10321 + this.options.getHeight(),
          referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: v10316.index,
            bottomInLastPaper: v10321 + this.options.getHeight(),
            printTopInPaper: v10321
          })
        }));
        if (v10317 && this.options.pageBreak) {
          v10320[0].target.css("top", v10316.paperHeader + "pt");
          v10320[0].referenceElement.top = this.options.getTop() - this.options.getHeight() - v10316.paperHeader;
          v10320[0].printLine = v10316.paperHeader;
          v10320[0].referenceElement.bottomInLastPaper = 0;
          v10320[0].referenceElement.printTopInPaper = v10316.paperHeader;
          v10320.unshift(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: v10326,
            printLine: v10316.height,
            referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
              top: 0,
              left: 0,
              height: 0,
              width: 0,
              beginPrintPaperIndex: v10316.index,
              bottomInLastPaper: v10316.height,
              printTopInPaper: v10316.paperHeader
            })
          }));
        }
        return v10320;
      }, BasePrintElement.prototype.updatePanelHeight = function (v10331, v10332) {
        if ("none" == this.panel.panelPageRule) {
          var nmh = hinnn.pt.toMm(v10331);
          // 更改模板高度 paperType, width(mm), height(mm), rotate
          // this.panel.resize(void 0, t.mmwidth, nmh, !1);
          // 这个会更新模板的高度...
          // this.panel.target.css("height", nmh + "mm"), this.panel.target.attr("original-height", nmh);
          v10332.paperFooter = v10331;
          v10332.target.css("height", nmh + "mm"), v10332.target.attr("original-height", nmh);
        }
      }, BasePrintElement.prototype.getBeginPrintTopInPaperByReferenceElement = function (v10333) {
        var v10334 = this.options.getTop();
        return this.isHeaderOrFooter() || this.isFixed() ? v10334 : v10333.referenceElement.isPositionLeftOrRight(v10334) ? v10333.referenceElement.printTopInPaper + (v10334 - v10333.referenceElement.top) : v10333.referenceElement.bottomInLastPaper + (v10334 - (v10333.referenceElement.top + v10333.referenceElement.height));
      }, BasePrintElement.prototype.css = function (v10335, v10336) {
        var v10337 = this,
          v10338 = [],
          v10339 = this.getConfigOptions();

        if (v10339) {
          var v10340;
          if (v10339.tabs && v10339.tabs.length) {
            v10340 = [];
            v10339.tabs.forEach(function (v10341) {
              v10340 = v10340.concat(v10341.options);
            });
          } else {
            v10340 = v10339.supportOptions;
          }
          v10340 && v10340.forEach(function (v10342) {
            var v10343 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10342.name);

            if (v10343 && v10343.css) {
              var v10345 = v10343.css(v10335, v10337.options.getValueFromOptionsOrDefault(v10342.name));
              v10345 && v10338.push(v10345);
            }
          });
        }

        this.stylerCss(v10335, v10336);
      }, BasePrintElement.prototype.stylerCss = function (v10346, v10347) {
        var v10348 = this.getStyler();

        if (v10348) {
          var v10349 = v10348(v10347, this.options, v10346, this._currenttemplateData);
          if (v10349) Object.keys(v10349).forEach(function (v10350) {
            v10346.css(v10350, v10349[v10350]);
          });
        }
      }, BasePrintElement.prototype.getData = function (v10351) {
        var v10352 = this.getField();
        return v10351 ? v10352 ? v10352.split('.').reduce((v10353, v10354) => v10353 ? v10353[v10354] : v10351 ? v10351[v10354] : "", !1) || "" : "" : this.printElementType.getData();
      }, BasePrintElement.prototype.copyFromType = function () {
        var options = this.options,type = this.printElementType;
        var v10355 = this.getConfigOptions();
        var names = [];
        if (v10355 && v10355.tabs && v10355.tabs.length) {
          v10355.tabs.forEach(function (v10356) {
            v10356.options.forEach(function (v10357) {
              names.push(v10357.name);
            });
          });
        } else {
          names = v10355.supportOptions.map(function (v10358) {return v10358.name;});
        }
        Object.keys(type).forEach(function (v10359) {
          if (type[v10359] && 'columns' != v10359 && names.indexOf(v10359) > -1) {
            options[v10359] = 'function' == _typeof(type[v10359]) ? type[v10359].toString() : type[v10359];
          }
        });
        return options;
      }, BasePrintElement.prototype.getPrintElementOptionTabs = function () {
        if (this._printElementOptionTabs) return this._printElementOptionTabs;
        var tabs = [],
          v10360 = this.getConfigOptions();
        if (v10360) {
          var v10361 = v10360.tabs;
          v10361 && v10361.forEach(function (v10362, v10363) {
            tabs.push({ name: v10362.name, list: [] });
            v10362.options.filter(function (v10364) {
              return !v10364.hidden;
            }).forEach(function (v10365) {
              var v10366 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10365.name);
              tabs[v10363].list.push(v10366);
            });
          });
        }
        return this._printElementOptionTabs = tabs, this._printElementOptionItems = void 0, this._printElementOptionTabs;
      }, BasePrintElement.prototype.getPrintElementOptionItems = function () {
        if (this._printElementOptionItems) return this._printElementOptionItems;
        var v10368 = [],
          v10369 = this.getConfigOptions();

        if (v10369) {
          var v10370;
          if (v10369.tabs && v10369.tabs.length) {
            v10370 = [];
            v10369.tabs.forEach(function (v10371) {
              v10371 = v10371.concat(v10371.options);
            });
          } else {
            v10370 = v10369.supportOptions;
          }
          v10370 && v10370.filter(function (v10372) {
            return !v10372.hidden;
          }).forEach(function (v10373) {
            var v10374 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10373.name);

            v10368.push(v10374);
          });
        }

        return this._printElementOptionItems = this.filterOptionItems(v10368.concat()), this._printElementOptionTabs = void 0, this._printElementOptionItems;
      }, BasePrintElement.prototype.getPrintElementOptionItemsByName = function (v10376) {
        var v10377 = [],
          v10378 = this.getConfigOptionsByName(v10376);

        if (v10378) {
          var v10379;
          if (v10378.tabs && v10378.tabs.length) {
            v10379 = [];
            v10378.tabs.forEach(function (v10380) {
              v10379 = v10379.concat(v10380.options);
            });
          } else {
            v10379 = v10378.supportOptions;
          }
          v10379 && v10379.filter(function (v10381) {
            return !v10381.hidden;
          }).forEach(function (v10382) {
            var v10383 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10382.name);

            v10377.push(v10383);
          });
        }

        return v10377.concat();
      }, BasePrintElement.prototype.filterOptionItems = function (v10385) {
        return this.printElementType.field ? v10385.filter(function (v10386) {
          return "field" != v10386.name;
        }) : v10385;
      }, BasePrintElement.prototype.createTempContainer = function () {
        this.removeTempContainer(), $("body").append($('<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'));
      }, BasePrintElement.prototype.removeTempContainer = function () {
        $(".hiprint_temp_Container").remove();
      }, BasePrintElement.prototype.getTempContainer = function () {
        return $(".hiprint_temp_Container");
      }, BasePrintElement.prototype.isHeaderOrFooter = function () {
        return this.options.getTopInDesign() < this.panel.paperHeader || this.options.getTopInDesign() >= this.panel.paperFooter;
      }, BasePrintElement.prototype.delete = function () {
        this.designTarget && this.designTarget.remove();
      }, BasePrintElement.prototype.setCurrenttemplateData = function (v10387) {
        this._currenttemplateData = v10387;
      }, BasePrintElement.prototype.isFixed = function () {
        return this.options.fixed;
      }, BasePrintElement.prototype.onRendered = function (v10388, v10389) {
        this.printElementType && this.printElementType.onRendered && this.printElementType.onRendered(v10389, this.options, v10388.getTarget());
      }, BasePrintElement.prototype.createLineOfPosition = function (v10390) {
        var v10391 = $(".toplineOfPosition.id" + this.id),
          topPos = $(".topPosition.id" + this.id),
          v10392 = $(".leftlineOfPosition.id" + this.id),
          leftPos = $(".leftPosition.id" + this.id),
          v10393 = $(".rightlineOfPosition.id" + this.id),
          v10394 = $(".bottomlineOfPosition.id" + this.id);
        var config = _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance;
        if (v10391.length) v10391.css("top", this.options.displayTop(true));else {
          var v10391 = $('<div class="toplineOfPosition id' + this.id + '" style="position: absolute; width: 100%;"></div>');
          v10391.css("top", this.options.displayTop(true)), v10391.css("width", v10390.displayWidth()), this.designTarget.parents(".hiprint-printPaper-content").append(v10391);
        }
        if (config.showPosition) {
          if (topPos.length) {
            topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
            topPos.text(this.options.posTop() + (config.positionUnit ? 'pt' : ''));
            topPos.css("top", this.options.posTop() - topPos.height() + "pt");
            if (config.positionLineMode) {
              topPos.css("left", this.options.posLeft() - topPos.width() / 2 + "pt");
            } else {
              topPos.css("left", this.options.posLeft() + 2 + "pt");
            }
            this.designTarget.find('.size-box') && this.designTarget.find('.size-box').toggleClass('hide', true);
          } else {
            var topPos = $('<div class="topPosition id' + this.id + '" style="position: absolute;"></div>');
            topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
            topPos.text(this.options.posTop() + (config.positionUnit ? 'pt' : ''));
            if (config.positionLineMode) {
              topPos.css("left", this.options.posLeft() - topPos.width() / 2 + "pt");
            } else {
              topPos.css("left", this.options.posLeft() + 2 + "pt");
            }
            this.designTarget.find('.size-box') && this.designTarget.find('.size-box').toggleClass('hide', true);
            this.designTarget.parents(".hiprint-printPaper-content").append(topPos);
            topPos.css("top", this.options.posTop() - topPos.height() + "pt");
          }
        }
        if (v10392.length) v10392.css("left", this.options.displayLeft(true));else {
          var v10396 = $('<div class="leftlineOfPosition id' + this.id + '" style="position: absolute;height: 100%;"></div>');
          v10396.css("left", this.options.displayLeft(true)), v10396.css("height", v10390.displayHeight()), this.designTarget.parents(".hiprint-printPaper-content").append(v10396);
        }
        if (config.showPosition) {
          if (leftPos.length) {
            leftPos.text(this.options.posLeft() + (config.positionUnit ? 'pt' : ''));
            leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
            leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
            if (config.positionLineMode) {
              leftPos.css("top", this.options.posTop() - leftPos.height() / 3 + "pt");
            } else {
              leftPos.css("top", this.options.posTop() + 2 + "pt");
            }
          } else {
            var leftPos = $('<div class="leftPosition id' + this.id + '" style="position: absolute;"></div>');
            leftPos.text(this.options.posLeft() + (config.positionUnit ? 'pt' : ''));
            leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
            if (config.positionLineMode) {
              leftPos.css("top", this.options.posTop() - leftPos.height() / 3 + "pt");
            } else {
              leftPos.css("top", this.options.posTop() + 2 + "pt");
            }
            this.designTarget.parents(".hiprint-printPaper-content").append(leftPos);
            leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
          }
        }
        if (v10393.length) v10393.css("left", this.options.getLeft() + this.options.getWidth() + "pt");else {
          var v10395 = $('<div class="rightlineOfPosition id' + this.id + '" style="position: absolute;height: 100%;"></div>');
          v10395.css("left", this.options.getLeft() + this.options.getWidth() + "pt"), v10395.css("height", v10390.displayHeight()), this.designTarget.parents(".hiprint-printPaper-content").append(v10395);
        }
        if (v10394.length) v10394.css("top", this.options.getTop() + this.options.getHeight() + "pt");else {
          var v10397 = $('<div class="bottomlineOfPosition id' + this.id + '" style="position: absolute;width: 100%;"></div>');
          v10397.css("top", this.options.getTop() + this.options.getHeight() + "pt"), v10397.css("width", v10390.displayWidth()), this.designTarget.parents(".hiprint-printPaper-content").append(v10397);
        }
      }, BasePrintElement.prototype.removeLineOfPosition = function () {
        $(".toplineOfPosition.id" + this.id).remove(), $(".topPosition.id" + this.id).remove(), this.designTarget.find('.size-box') && this.designTarget.find('.size-box').toggleClass('hide', false), $(".leftlineOfPosition.id" + this.id).remove(), $(".leftPosition.id" + this.id).remove(), $(".rightlineOfPosition.id" + this.id).remove(), $(".bottomlineOfPosition.id" + this.id).remove();
      }, BasePrintElement.prototype.getFontList = function () {
        var v10398 = this.options.fontList;
        return v10398 || (v10398 = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId).getFontList());
      }, BasePrintElement.prototype.getFields = function () {
        if ("table" == this.printElementType.type) {
          var v10400 = this.options.tableFields;
          return v10400;
        }
        var v10400 = this.options.fields;
        return v10400 || (v10400 = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId).getFields());
      }, BasePrintElement.prototype.getOnImageChooseClick = function () {
        var v10402 = this.options.onImageChooseClick;
        return v10402 || (v10402 = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId).getOnImageChooseClick());
      }, BasePrintElement.prototype.bingCopyEvent = function (v10404) {
        var v10405 = this;
        v10404.keydown(function (v10406) {
          if (v10405._editing) {
            if (!v10406.altKey && 13 == v10406.keyCode) {
              v10405.updateByContent();
              return;
            }
          }
          // ctrl + c / command + c
          if ((v10406.ctrlKey || v10406.metaKey) && 67 == v10406.keyCode) {
            v10405.copyJson();
            v10406.preventDefault();
          }
        });
      }, BasePrintElement.prototype.copyJson = function () {
        try {
          var v10407 = this;
          // 使用textarea 存储复制的元素信息
          var copyArea = $('#copyArea');
          if (!copyArea.length) copyArea = $('<textarea id="copyArea" style="position: absolute; left: 0px; top: 0px;opacity: 0"></textarea>');
          $("body").append(copyArea);
          let copyElements = this.panel.printElements.filter((ele) => {
            return 'block' == ele.designTarget.children().last().css('display') && !ele.printElementType.type.includes('table');
          });
          copyElements = copyElements.map((ele) => {
            return {
              options: ele.options,
              printElementType: ele.printElementType,
              id: ele.id,
              templateId: ele.templateId
            };
          });
          var json = JSON.stringify(copyElements);
          // var json = JSON.stringify({
          //   options: n.options,
          //   printElementType: n.printElementType,
          //   id: n.id,
          //   templateId: n.templateId
          // });
          copyArea.text(json);
          // 元素需可见才能选中复制到剪切板
          copyArea.css('visibility', 'visible');
          // 尝试修复对复制元素的自动聚焦
          // copyArea.focus();
          if (copyArea.setSelectionRange)
          copyArea.setSelectionRange(0, copyArea.value.length);else

          copyArea.select();
          var flag = false;
          flag = document.execCommand("copy");
          copyArea.css('visibility', 'hidden');
          // 获取元素焦点，不然无法粘贴（keydown问题）
          v10407.designTarget.focus();
          console.log('copyJson success');
        } catch (v10408) {
          flag = false;
          console.log('copyJson error', v10408);
        }
        return flag;
      }, BasePrintElement.prototype.clone = function (v10409) {
        var v10410 = this;
        let newObj = v10410.printElementType.createPrintElement();
        Object.keys(v10410.options).forEach(function (key) {
          newObj.options[key] = v10410.options[key];
        });
        return newObj;
      }, BasePrintElement.prototype.getFormatter = function () {
        var formatter = void 0;
        if (this.printElementType.formatter && (formatter = this.printElementType.formatter), this.options.formatter) try {
          var v10411 = "formatter=" + this.options.formatter;
          eval(v10411);
        } catch (v10412) {
          console.log(v10412);
        }
        return formatter;
      }, BasePrintElement.prototype.getStyler = function () {
        var fnstyler = void 0;
        if (this.printElementType.styler && (fnstyler = this.printElementType.styler), this.options.styler) try {
          var v10413 = "fnstyler=" + this.options.styler;
          eval(v10413);
        } catch (v10414) {
          console.log(v10414);
        }
        return fnstyler;
      }, BasePrintElement.prototype.bingKeyboardMoveEvent = function (v10415, v10416) {
        var v10417 = this,
          v10418 = void 0,
          v10419 = void 0;
        v10415.attr("tabindex", "1"), v10415.keydown(function (v10420) {
          // 处理 table / input 输入时 删除元素问题
          if ('INPUT' == v10420.target.tagName) {
            return;
          }
          // 元素编辑
          if (v10417._editing && !v10420.altKey) {
            return;
          }
          // 元素禁止移动
          if (false === v10417.options.draggable) {
            return;
          }
          // 处理按住 ctrl / command 多选元素
          var els = v10417.panel.printElements.filter(function (v10421) {
            return 'block' == v10421.designTarget.children().last().css('display') && !v10421.printElementType.type.includes('table');
          });
          var isMultiple = els.length > 1;
          var movingDistance = _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance;
          switch (v10420.keyCode) {
            // BackSpace/Delete 删除元素
            case 8:
            case 46:
              var templete = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(v10417.templateId);
              templete.deletePrintElement(v10417);
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v10417.templateId, "删除");
              hinnn.event.trigger("clearSettingContainer");
              // 获取到了template 拿到template里面所有被选中的元素
              els.forEach((ele) => {
                templete.deletePrintElement(ele);
                hinnn.event.trigger("hiprintTemplateDataChanged_" + ele.templateId, "删除");
              });
              hinnn.event.trigger("clearSettingContainer");
              break;
            case 37:
              v10418 = v10417.options.getLeft();
              if (isMultiple) {
                els.forEach(function (v10424) {
                  v10424.updatePositionByMultipleSelect(0 - movingDistance, 0);
                });
              } else {
                v10417.updateSizeAndPositionOptions(v10418 - movingDistance), v10415.css("left", v10417.options.displayLeft());
              }
              v10420.preventDefault();
              break;

            case 38:
              v10419 = v10417.options.getTop();
              if (isMultiple) {
                els.forEach(function (v10425) {
                  v10425.updatePositionByMultipleSelect(0, 0 - movingDistance);
                });
              } else {
                v10417.updateSizeAndPositionOptions(void 0, v10419 - movingDistance), v10415.css("top", v10417.options.displayTop());
              }
              v10420.preventDefault();
              break;

            case 39:
              v10418 = v10417.options.getLeft();
              if (isMultiple) {
                els.forEach(function (v10426) {
                  v10426.updatePositionByMultipleSelect(movingDistance, 0);
                });
              } else {
                v10417.updateSizeAndPositionOptions(v10418 + movingDistance), v10415.css("left", v10417.options.displayLeft());
              }
              v10420.preventDefault();
              break;

            case 40:
              v10419 = v10417.options.getTop();
              if (isMultiple) {
                els.forEach(function (v10427) {
                  v10427.updatePositionByMultipleSelect(0, movingDistance);
                });
              } else {
                v10417.updateSizeAndPositionOptions(void 0, v10419 + movingDistance), v10415.css("top", v10417.options.displayTop());
              }
              v10420.preventDefault();
          }
          if ([37, 38, 39, 40].includes(v10420.keyCode)) {
            hinnn.event.trigger("hiprintTemplateDataChanged_" + v10417.templateId, "键盘移动");
          }
        });
      }, BasePrintElement.prototype.inRect = function (v10428) {
        var ptr = this.designPaper.scale || 1;
        var x1 = this.designTarget[0].offsetLeft,
          y1 = this.designTarget[0].offsetTop,v10429 = this.designTarget[0].offsetHeight,
          v10430 = this.designTarget[0].offsetWidth,
          x2 = x1 + v10430,y2 = y1 + v10429,
          ex1 = $(v10428.target[0]).position().left / ptr,ey1 = $(v10428.target[0]).position().top / ptr,
          eh = v10428.target[0].offsetHeight,ew = v10428.target[0].offsetWidth,
          ex2 = ex1 + ew,ey2 = ey1 + eh;
        return ex1 < x2 && ex2 > x1 && y1 < ey2 && y2 > ey1;
      }, BasePrintElement.prototype.multipleSelect = function (v10431) {
        v10431 ? this.designTarget.addClass("multipleSelect") : this.designTarget.removeClass("multipleSelect");
      }, BasePrintElement.prototype.updatePositionByMultipleSelect = function (v10432, v10433) {
        if (false === this.options.draggable) return;
        this.updateSizeAndPositionOptions(v10432 + this.options.getLeft(), v10433 + this.options.getTop()), this.designTarget.css("left", this.options.displayLeft()), this.designTarget.css("top", this.options.displayTop());
      }, BasePrintElement;
    }();
}, function (v10434, v10435, v10436) {
  "use strict";

  var v10437 = function () {
      function v10438() {
      }

      return v10438.prototype.init = function (v10439) {
        this.target = $('<input type="text" class="hitable-editor-text" value="" />'), v10439.getTarget().append(this.target), this.target.focus();
      }, v10438.prototype.getValue = function () {
        return this.target.val();
      }, v10438.prototype.setValue = function (v10440) {
        this.target.val(v10440);
      }, v10438.prototype.destroy = function () {
        this.target.remove();
      }, v10438;
    }(),
    v10441 = function () {
      function v10442() {
        this.text = new v10437();
      }

      return Object.defineProperty(v10442, "Instance", {
        get: function get() {
          return v10442._instance || (v10442._instance = new v10442()), v10442._instance;
        },
        enumerable: !0,
        configurable: !0
      }), v10442;
    }(),
    i2 = function () {
      function v10443() {
      }
      // 表格头双击字段选择
      return v10443.prototype.init = function (v10444, v10445) {
        var v10446 = `<select class="auto-submit" style="width:100%">\n                <option value="" disabled>${i18n.__('请选择字段')}</option>`;
        v10444.forEach(function (v10447, v10448) {
          if (v10447.field == v10445.field) {
            v10446 += ' <option value="' + (v10447.field || "") + '" selected >' + (v10447.text || "") + "</option>";
          } else {
            v10446 += ' <option value="' + (v10447.field || "") + '" >' + (v10447.text || "") + "</option>";
          }
        }), v10446 += " </select>";
        this.target = $(v10446), v10445.getTarget().append(this.target), this.target.focus();
      }, v10443.prototype.getValue = function () {
        var val = this.target.val();
        var text = this.target.find('option[value="' + val + '"]').text();
        return text + '#' + val;
      }, v10443.prototype.setValue = function (v10449) {
        v10449 && (this.target.find('option[value="' + v10449 + '"]').length || this.target.find("select").prepend('<option value="' + v10449 + '" >' + v10449 + "</option>"));
        this.target.find("select").val(v10449);
      }, v10443.prototype.destroy = function () {
        this.target.remove();
      }, v10443;
    }(),
    o2 = function () {
      function v10450() {
        this.select = new i2();
      }

      return Object.defineProperty(v10450, "Instance", {
        get: function get() {
          return v10450._instance || (v10450._instance = new v10450()), v10450._instance;
        },
        enumerable: !0,
        configurable: !0
      }), v10450;
    }(),
    v10451 = function () {
      function v10452() {
      }

      return Object.defineProperty(v10452, "Instance", {
        get: function get() {
          return v10441._instance || (v10452._instance = new v10452()), v10452._instance;
        },
        enumerable: !0,
        configurable: !0
      }), v10452.prototype.createEditor = function (v10453) {
        return $.extend({}, v10441.Instance[v10453]);
      }, v10452.prototype.createSelect = function (v10454) {
        return $.extend({}, o2.Instance[v10454]);
      }, v10452;
    }(),
    v10455 = v10436(10),
    v10456 = v10436(14),
    v10457 = v10436(11),
    v10458 = function () {
      function v10459() {
      }

      return v10459.prototype.init = function (v10460, v10461) {
        var v10462 = this;
        this.tableOptions = v10461, this.title = v10460.title, this.field = v10460.field, v10460.getTarget().unbind("dblclick.hitable").bind("dblclick.hitable", function () {
          v10460.isEditing = !0, v10462.beginEdit(v10460);
        });
      }, v10459.prototype.getDisplayHtml = function () {
        return this.title;
      }, v10459.prototype.beginEdit = function (v10463) {
        var v10464 = this;
        if (v10464.tableOptions.options.fields && v10464.tableOptions.options.fields.length) {
          this.editor = v10451.Instance.createSelect("select"), v10463.getTarget().html(""), this.editor.init(v10464.tableOptions.options.fields, v10463), this.editor.setValue(this.field || ""), $(this.editor.target).keydown(function (v10465) {
            13 == v10465.keyCode && v10464.endEdit(v10463);
          }), $(this.editor.target).change(function (v10466) {
            v10464.endEdit(v10463);
          }), $(this.editor.target).blur(function (v10467) {
            v10464.endEdit(v10463);
          });
        } else {
          this.editor = v10451.Instance.createEditor("text"), v10463.getTarget().html(""), this.editor.init(v10463), (this.title || this.field) && (this.tableOptions.options.isEnableEditField ? this.editor.setValue((this.title || "") + "#" + (this.field || "")) : this.editor.setValue(this.title || "")), $(this.editor.target).keydown(function (v10468) {
            13 == v10468.keyCode && v10464.endEdit(v10463);
          }), $(this.editor.target).blur(function (v10469) {
            v10464.endEdit(v10463);
          }), this.tableOptions.editingCell && this.tableOptions.editingCell.id != v10463.id && this.tableOptions.editingCell.innerElement.endEdit(this.tableOptions.editingCell), this.tableOptions.editingCell = v10463;
        }
      }, v10459.prototype.endEdit = function (v10470) {
        v10470.isEditing = 0;
        var v10471 = this.editor.getValue();
        if (v10471) {
          if (this.tableOptions.options.isEnableEditField || this.tableOptions.options.fields) {
            var v10472 = v10471.split("#");
            v10470.title = this.title = v10472[0], v10472.length > 0 && (v10470.columnId = v10470.field = this.field = v10472[1]);
            v10470.id && v10470.target.attr("id", v10470.id), v10470.columnId && v10470.target.attr("column-id", v10470.columnId);
            hinnn.event.trigger("hiprintTemplateDataChanged_" + this.tableOptions.options.templateId, "调整表格列字段");
          } else v10470.title = this.title = v10471;
        } else this.tableOptions.options.isEnableEditField ? (v10470.title = this.title = "", v10470.field = this.field = "") : v10470.title = this.title = "";
        this.editor.destroy(), v10470.getTarget().html(this.title);
      }, v10459;
    }(),
    v10473 = function () {
      return function (v10474) {
        this.title = v10474.title, this.field = v10474.field, this.width = v10474.width, this.align = v10474.align, this.halign = v10474.halign, this.vAlign = v10474.vAlign, this.colspan = v10474.colspan, this.rowspan = v10474.rowspan, this.checked = v10474.checked, this.columnId = v10474.columnId, this.tableSummaryTitle = v10474.tableSummaryTitle, this.tableSummaryText = v10474.tableSummaryText, this.tableSummaryColspan = v10474.tableSummaryColspan, this.tableSummary = v10474.tableSummary, this.tableSummaryAlign = v10474.tableSummaryAlign, this.tableSummaryNumFormat = v10474.tableSummaryNumFormat, this.tableSummaryFormatter = v10474.tableSummaryFormatter, this.showCodeTitle = v10474.showCodeTitle, this.upperCase = v10474.upperCase, this.renderFormatter = v10474.renderFormatter && v10474.renderFormatter.toString(), this.formatter2 = v10474.formatter2 && v10474.formatter2.toString(), this.styler2 = v10474.styler2 && v10474.styler2.toString(), this.stylerHeader = v10474.stylerHeader && v10474.stylerHeader.toString(), this.tableColumnHeight = v10474.tableColumnHeight, this.tableTextType = v10474.tableTextType, this.tableBarcodeMode = v10474.tableBarcodeMode, this.tableQRCodeLevel = v10474.tableQRCodeLevel;
      };
    }(),
    v10475 = function () {
      function v10476() {
        this.id = v10457.a.createId();
      }

      return v10476.prototype.init = function (v10478, v10479, v10480, v10481) {
        this.isHead = v10481, this.rowId = v10480, this.isEditing = !1;
        var v10482 = /^[0-9]*$/;
        this.target = v10478, this.tableOptions = v10479;
        var v10483 = this.target.attr("colspan");
        this.colspan = v10482.test(v10483) ? parseInt(v10483) : 1;
        var v10484 = this.target.attr("rowspan");
        this.rowspan = v10482.test(v10484) ? parseInt(v10484) : 1, this.initEvent(), this.isHead && this.initInnerEelement();
      }, v10476.prototype.beginEdit = function () {
        if (!this.isEditing && this.tableOptions.isEnableEdit && this.tableOptions.onBeforEdit(this)) {
          var v10485 = this.getValue();
          this.editor = v10451.Instance.createEditor("text"), this.isEditing = !0, this.tableOptions.editingCell = this, this.target.html(""), this.editor.init(this), this.editor.setValue(v10485);
        }
      }, v10476.prototype.endEdit = function () {
        this.isEditing = !1;
        var v10486 = this.editor.getValue();
        this.editor.destroy(), this.target.html(v10486);
      }, v10476.prototype.getTarget = function () {
        return this.target;
      }, v10476.prototype.getValue = function () {
        return this.target.html();
      }, v10476.prototype.setValue = function (v10487) {
      }, v10476.prototype.initInnerEelement = function () {
        this.innerElement = new v10458(), this.innerElement.init(this, this.tableOptions);
      }, v10476.prototype.initEvent = function () {
      }, v10476.prototype.isXYinCell = function (v10488, v10489) {
        var v10490 = new v10455.b({
          x: v10488,
          y: v10489,
          height: 0,
          width: 0
        });
        return this.isOverlap(v10490);
      }, v10476.prototype.getTableRect = function () {
        return new v10455.b({
          x: this.target.offset().left,
          y: this.target.offset().top,
          height: this.target[0].offsetHeight,
          width: this.target[0].offsetWidth
        });
      }, v10476.prototype.isOverlap = function (v10497) {
        var v10498 = this.getTableRect();
        return v10497.x + v10497.width > v10498.x && v10498.x + v10498.width > v10497.x && v10497.y + v10497.height > v10498.y && v10498.y + v10498.height > v10497.y;
      }, v10476.prototype.isInRect = function (v10507) {
        var v10508 = v10507.rect,
          v10509 = this.getTableRect();

        // if (e.x + e.width > n.x && n.x + n.width > e.x && e.y + e.height > n.y && n.y + n.height > e.y) {
        if (v10509.x >= v10508.x && v10509.x + v10509.width <= v10508.x + v10508.width && v10509.y >= v10508.y && v10509.y + v10509.height <= v10508.y + v10508.height) {
          var v10518 = v10456.a.mergeRect(v10508, v10509);
          return JSON.stringify(v10508) == JSON.stringify(v10518) || (v10507.changed = !0, v10507.rect = v10518, !0);
        }

        return !1;
      }, v10476.prototype.isSelected = function () {
        return this.target.hasClass("selected");
      }, v10476.prototype.select = function () {
        this.target.addClass("selected");
      }, v10476.prototype.isHeader = function () {
        return !1;
      }, v10476.prototype.setAlign = function (v10520) {
        this.align = v10520, v10520 ? this.target.css("text-align", v10520) : this.target[0].style.textAlign = "";
      }, v10476.prototype.setVAlign = function (v10521) {
        this.vAlign = v10521, v10521 ? this.target.css("vertical-align", v10521) : this.target[0].style.verticalAlign = "";
      }, v10476.prototype.getEntity = function () {
        return new v10473(this);
      }, v10476;
    }();

  v10436.d(v10435, "a", function () {
    return v10523;
  });

  var _c,
    v10524 = (_c = function v10525(v10526, v10527) {
      return (_c = Object.setPrototypeOf || _instanceof({
        __proto__: []
      }, Array) && function (v10528, v10529) {
        v10528.__proto__ = v10529;
      } || function (v10530, v10531) {
        for (var v10532 in v10531) {
          v10531.hasOwnProperty(v10532) && (v10530[v10532] = v10531[v10532]);
        }
      })(v10526, v10527);
    }, function (v10533, v10534) {
      function v10535() {
        this.constructor = v10533;
      }

      _c(v10533, v10534), v10533.prototype = null === v10534 ? Object.create(v10534) : (v10535.prototype = v10534.prototype, new v10535());
    }),
    v10523 = function (v10536) {
      function v10539(v10537) {
        var v10538 = this;
        return v10537 = v10537 || {}, (v10538 = v10536.call(this) || this).width = v10537.width ? parseFloat(v10537.width.toString()) : 100, v10538.title = v10537.title, v10538.descTitle = v10537.descTitle, v10538.field = v10537.field, v10538.fixed = v10537.fixed, v10538.rowspan = v10537.rowspan ? parseInt(v10537.rowspan) : 1, v10538.colspan = v10537.colspan ? parseInt(v10537.colspan) : 1, v10538.align = v10537.align, v10538.halign = v10537.halign, v10538.vAlign = v10537.vAlign, v10538.formatter = v10537.formatter, v10538.styler = v10537.styler, v10538.renderFormatter = v10537.renderFormatter, v10538.formatter2 = v10537.formatter2, v10538.styler2 = v10537.styler2, v10538.stylerHeader = v10537.stylerHeader, v10538.checkbox = v10537.checkbox, v10538.checked = 0 != v10537.checked, v10538.columnId = v10537.columnId || v10537.field, v10538.tableColumnHeight = v10537.tableColumnHeight, v10538.tableTextType = v10537.tableTextType, v10538.tableBarcodeMode = v10537.tableBarcodeMode, v10538.tableQRCodeLevel = v10537.tableQRCodeLevel, v10538.tableSummaryTitle = v10537.tableSummaryTitle, v10538.tableSummaryText = v10537.tableSummaryText, v10538.tableSummaryColspan = v10537.tableSummaryColspan, v10538.tableSummary = v10537.tableSummary, v10538.tableSummaryAlign = v10537.tableSummaryAlign, v10538.tableSummaryNumFormat = v10537.tableSummaryNumFormat, v10538.tableSummaryFormatter = v10537.tableSummaryFormatter,
        v10538.showCodeTitle = v10537.showCodeTitle, v10538.upperCase = v10537.upperCase, v10538;
      }

      return v10524(v10539, v10536), v10539.prototype.css = function (v10540) {
      }, v10539;
    }(v10475);
}, function (v10541, v10542, v10543) {
  "use strict";

  v10543.d(v10542, "a", function () {
    return v10545;
  });

  var v10545 = function () {
    return function (v10546) {
      this.printLine = v10546.printLine, this.target = v10546.target, this.referenceElement = v10546.referenceElement;
    };
  }();
}, function (module, __webpack_exports__, __webpack_require__) {
  "use strict";

  __webpack_require__.d(__webpack_exports__, "a", function () {
    return TableExcelHelper;
  });

  var _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
    TableExcelHelper = function () {
      function TableExcelHelper() {
      }

      return TableExcelHelper.createTableHead = function (v10548, v10549) {
        for (var v10550 = TableExcelHelper.reconsitutionTableColumnTree(v10548), v10551 = $("<thead></thead>"), colgroup = $("<colgroup></colgroup>"), v10552 = TableExcelHelper.getColumnsWidth(v10550, v10549), v10553 = function v10554(v10555) {
            var v10556 = $("<tr></tr>");
            // 重置 colgroup，解决多行表头 col 添加错误问题，仅以最后一行添加
            colgroup = $("<colgroup></colgroup>");
            v10550[v10555].filter(function (v10557) {
              return v10557.checked;
            }).forEach(function (v10558) {
              var v10559 = $("<td></td>");
              v10558.id && v10559.attr("id", v10558.id), v10558.columnId && v10559.attr("column-id", v10558.columnId), (v10558.align || v10558.halign) && v10559.css("text-align", v10558.halign || v10558.align), v10558.vAlign && v10559.css("vertical-align", v10558.vAlign), v10558.colspan > 1 && v10559.attr("colspan", v10558.colspan), v10558.rowspan > 1 && v10559.attr("rowspan", v10558.rowspan), v10559.html(v10558.title), v10552[v10558.id] ? (v10558.hasWidth = !0, v10558.targetWidth = v10552[v10558.id], v10559.attr("haswidth", "haswidth"), v10559.css("width", v10552[v10558.id] + "pt")) : v10558.hasWidth = !1;
              var v10560 = TableExcelHelper.getHeaderStyler(v10558);
              if (v10560) {
                var v10561 = v10560(v10558);
                if (v10561) Object.keys(v10561).forEach(function (v10562) {
                  v10559.css(v10562, v10561[v10562]);
                });
              }
              v10556.append(v10559);
              colgroup.append(`<col column-id="${v10558.columnId}" width="${v10558.width}pt"></col>`);
            }), v10551.append(v10556);
          }, v10563 = 0; v10563 < v10550.totalLayer; v10563++) {
          v10553(v10563);
        }
        return TableExcelHelper.syncTargetWidthToOption(v10548), [v10551, colgroup];
      }, TableExcelHelper.createTableFooter = function (v10564, v10565, v10566, v10567, v10568, v10569) {
        // n=>options e=>表格所有数据 o=>所有打印数据 r=>表格每页数据
        var v10570 = $("<tfoot></tfoot>"),v10571 = this.getFooterFormatter(v10566, v10567);
        var tst = this.tableSummaryTitle;
        let tSumData = v10566.tableFooterRepeat == "last" ? v10565 : v10569;
        let idx = v10566.columns.length - 1;
        var rowColumns = this.rowColumns || v10566.columns[idx].columns;
        if (v10566.tableFooterRepeat != 'no' && rowColumns.some(function (column) {return column.tableSummary;})) {
          var tableFooter = $("<tr></tr>");
          rowColumns.filter(function (v10572) {
            return v10572.checked;
          }).forEach(function (column) {
            var fieldData = tSumData.filter(function (row) {
              return row && row[column.field];
            }).map(function (row) {
              return new RegExp("^-?(0|[1-9]\\d*)(\\.\\d+)?").test(row[column.field]) ? Number(row[column.field]) : 0;
            });
            var text = column.tableSummaryText;
            var numF = column.tableSummaryNumFormat || 2;
            var style = `text-align: ${column.tableSummaryAlign || "center"}`;
            var colspan = column.tableSummaryColspan == void 0 ? 1 : column.tableSummaryColspan;
            var upperCaseType = column.upperCase;
            let { toUpperCase, numFormat } = _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a;
            var tableSummaryFormatter = TableExcelHelper.getColumnTableSummaryFormatter(column);
            var formatterResult = tableSummaryFormatter ? tableSummaryFormatter(column, fieldData, v10565, v10566) : '';
            if (formatterResult) {
              tableFooter.append(formatterResult);
              return;
            }
            switch (column.tableSummary) {
              case "count":
                var title = tst(column, text || `${i18n.__('计数')}:`, v10568);
                var count = toUpperCase(upperCaseType, tSumData.filter((v10574) => v10574).length || 0);
                tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${count}</td>`);
                break;
              case "sum":
                var sum = parseFloat(Number(fieldData.reduce(function (prev, cur) {
                  return prev + cur;
                }, 0)));
                sum = toUpperCase(upperCaseType, numFormat(sum, numF));
                var title = tst(column, text || `${i18n.__('合计')}:`, v10568);
                tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${sum}</td>`);
                break;
              case "avg":
                var sum = parseFloat(Number(fieldData.reduce(function (prev, cur) {
                  return prev + cur;
                }, 0)));
                var avg = parseFloat(Number(sum / (fieldData.length || 1)));
                avg = toUpperCase(upperCaseType, numFormat(avg, numF));
                var title = tst(column, text || `${i18n.__('平均值')}:`, v10568);
                tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${avg}</td>`);
                break;
              case "min":
                var min = Math.min(...fieldData) || 0;
                min == Infinity && (min = 0);
                min = toUpperCase(upperCaseType, numFormat(min, numF));
                var title = tst(column, text || `${i18n.__('最小值')}:`, v10568);
                tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${min || 0}</td>`);
                break;
              case "max":
                var max = Math.max(...fieldData);
                max == -Infinity && (max = 0);
                max = toUpperCase(upperCaseType, numFormat(max, numF));
                var title = tst(column, text || `${i18n.__('最大值')}:`, v10568);
                tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${max || 0}</td>`);
                break;
              case "text":
                tableFooter.append(`<td style="${style}" colspan="${colspan}">${text || ""}</td>`);
                break;
              default:
                if (colspan >= 1) {
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${text || ""}</td>`);
                }
                break;
            }
          });
          v10570.append(tableFooter);
        }
        if (v10571) {
          v10570.append(v10571(v10566, v10565, v10568, v10569));
        }
        return v10570;
      }, TableExcelHelper.tableSummaryTitle = function (column, title, data) {
        var v10575 = column.tableSummaryTitle == undefined || column.tableSummaryTitle == true;
        return v10575 ? `${title}` : data ? `` : `<span style="color:firebrick">${title}</span>`;
      }, TableExcelHelper.createTableRow = function (v10576, v10577, printData, v10578, v10579) {
        var v10580 = this;
        var v10581 = TableExcelHelper.reconsitutionTableColumnTree(v10576),
          v10582 = $("<tbody></tbody>");
        var gff = v10580.getGroupFieldsFormatter(v10578, v10579);
        var groupFields = gff ? v10578.groupFields = gff(v10579, v10578, v10577) : v10579.groupFields ? v10579.groupFields : [];
        (v10577 || (v10577 = []), groupFields.length) ? _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a.groupBy(v10577, groupFields, function (v10584) {
          var v10585 = {};
          return groupFields.forEach(function (v10586) {
            return v10585[v10586] = v10584[v10586];
          }), v10585;
        }).forEach(function (v10587) {
          var groupFormatter = v10580.getGroupFormatter(v10578, v10579);
          if (groupFormatter) {
            let result = groupFormatter(v10581.colspan, v10577, printData, v10587, v10578);
            if ($(result).is("tr")) {
              v10582.append(result);
            } else if ($(result).is("td")) {
              v10582.append(`<tr>${result}</tr>`);
            } else {
              v10582.append(`<tr><td>${result}</td></tr>`);
            }
          }
          var groupFooterFormatter = v10580.getGroupFooterFormatter(v10578, v10579);
          var groupData = v10587;
          if (groupData.rows.forEach(function (v10588, rowIndex) {
            var v10589 = TableExcelHelper.createRowTarget(v10581, v10588, v10578, v10579, rowIndex, groupData.rows, printData);
            v10582.append(v10589);
          }), groupFooterFormatter) {
            let result = groupFooterFormatter(v10581.colspan, v10577, printData, v10587, v10578);
            if ($(result).is("tr")) {
              v10582.append(result);
            } else if ($(result).is("td")) {
              v10582.append(`<tr>${result}</tr>`);
            } else {
              v10582.append(`<tr><td>${result}</td></tr>`);
            }
          }
        }) : v10577.forEach(function (v10590, rowIndex) {
          var row = TableExcelHelper.createRowTarget(v10581, v10590, v10578, v10579, rowIndex, v10577, printData);
          v10582.append(row);
        });
        return v10582;
      }, TableExcelHelper.createRowTarget = function (v10591, v10592, v10593, v10594, rowIndex, tableData, printData) {
        var v10595 = $("<tr></tr>");
        var columns = v10591.rowColumns.filter(function (v10596) {
          return v10596.checked;
        });
        v10595.data("rowData", v10592), v10591.rowColumns.filter(function (v10597) {
          return v10597.checked;
        }).forEach(function (v10598, v10599) {
          if (!v10598.checked) return;
          var rowsColumnsMerge = '';
          if (v10593.rowsColumnsMerge) {
            eval('rowsColumnsMerge=' + v10593.rowsColumnsMerge);
            var rowsColumnsArr = rowsColumnsMerge(v10592, v10598, v10599, rowIndex, tableData, printData) || [1, 1];
            var v10600 = $(`<td style = 'display:${!(rowsColumnsArr[0] && rowsColumnsArr[1]) ? "none" : ""}' rowspan = '${rowsColumnsArr[0]}' colspan = '${rowsColumnsArr[1]}'></td>`);
          } else {
            var v10600 = $("<td></td>");
          }
          // 设计时不去计算宽度
          if (v10592 && Object.keys(v10592).length > 0 && ("first" == v10593.tableHeaderRepeat || "none" == v10593.tableHeaderRepeat)) {
            v10598.field && v10600.attr("field", v10598.field), v10598.align && v10600.css("text-align", v10598.align), v10598.vAlign && v10600.css("vertical-align", v10598.vAlign);
            // 无表头时跨行无效，需根据所跨行数重新计算宽度
            if (v10593.rowsColumnsMerge) {
              if (rowsColumnsArr[1] > 1) {
                var width = 0;
                columns.forEach((item, index) => {
                  if (index >= v10599 && index < v10599 + rowsColumnsArr[1]) {
                    width += item.width;
                  }
                });
              }
            }
            v10600.css("width", (width || v10598.width) + "pt");
          } else {
            v10598.field && v10600.attr("field", v10598.field), v10598.align && v10600.css("text-align", v10598.align), v10598.vAlign && v10600.css("vertical-align", v10598.vAlign);
          }
          var v10601 = TableExcelHelper.getColumnFormatter(v10598),
            v10602 = v10601 ? v10601(v10592[v10598.field], v10592, v10599, v10593) : v10592[v10598.field];
          var rf = TableExcelHelper.getColumnRenderFormatter(v10598);
          if (rf) {
            v10600.html(rf(v10592[v10598.field], v10592, v10599, v10593, rowIndex));
            //表格内容插入二维码等
          } else if ("text" == v10598.tableTextType || v10598.tableTextType == void 0) v10600.html(v10602);else
          {
            if ("barcode" == v10598.tableTextType) {
              v10600.html(
                '<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg ><div class="hibarcode_displayValue"></div>'
              );
              try {
                v10602 ? (JsBarcode(v10600.find(".hibarcode_imgcode")[0], v10602, {
                  format: v10598.tableBarcodeMode || "CODE128A",
                  width: 1,
                  textMargin: -1,
                  lineColor: "#000000",
                  margin: 0,
                  height: parseInt(10),
                  displayValue: !1
                }), v10600.find(".hibarcode_imgcode").attr("height", v10598.tableColumnHeight || 30 + 'pt'), v10600.find(".hibarcode_imgcode").css("margin", '5pt 10pt'), v10600.find(".hibarcode_imgcode").attr("width", "calc(100% - 20pt)")) : v10600.html("");
                // this.options.hideTitle || r.find(".hibarcode_displayValue").html(n)
                if (v10598.showCodeTitle) {
                  v10600.find('.hibarcode_displayValue').html(v10602);
                }
              } catch (v10603) {
                console.log(v10603), v10600.html(`${i18n.__('此格式不支持该文本')}`);
              }
            }
            if ("image" == v10598.tableTextType) {
              v10600.html('');
              if (v10602) {

                var imagebox = $('<div><img style = "max-width:100%;max-height:100%"/></div>');
                imagebox.find('img').attr('src', v10602);
                console.log(imagebox.find('img').css('width'));
                v10600.html(imagebox);
              }

            }
            if ("qrcode" == v10598.tableTextType) {
              v10600.html("");
              try {
                var qrcodebox = $('<div style="margin:2pt 0pt" class="hiqrcode_imgcode"></div>');

                if (v10602) {
                  var v10604 = parseInt(v10598.width || v10598.targetWidth || 20),
                    v10605 = parseInt(v10598.tableColumnHeight || 20);
                  qrcodebox.css('height', (v10604 > v10605 ? v10605 : v10604) + 'pt');
                  new QRCode(qrcodebox[0], {
                    width: v10604 > v10605 ? v10605 : v10604,
                    height: v10604 > v10605 ? v10605 : v10604,
                    colorDark: "#000000",
                    useSVG: !0,
                    correctLevel: v10598.tableQRCodeLevel || 0
                  }).makeCode(v10602);
                  // r.find(".hiqrcode_imgcode").css("margin", '5pt 0pt'),
                  v10600.html(qrcodebox);
                  if (v10598.showCodeTitle) {
                    v10600.append(
                      '<div class="hiqrcode_displayValue"></div>'
                    );
                    v10600.find('.hiqrcode_displayValue').html(v10602);
                  }
                }
              } catch (v10606) {
                console.log(v10606), v10600.html(`${i18n.__('二维码生成失败')}`);
              }
            }
            if ('sequence' === v10598.tableTextType) {
              v10600.html(rowIndex + 1);
            }
          }
          var v10607 = TableExcelHelper.getColumnStyler(v10598);

          if (v10607) {
            var v10604 = v10607(v10592[v10598.field], v10592, v10599, v10593);
            if (v10604) Object.keys(v10604).forEach(function (v10608) {
              v10600.css(v10608, v10604[v10608]);
            });
          }

          v10595.append(v10600);
        });
        var v10609 = TableExcelHelper.getRowStyler(v10593, v10594);

        if (v10609) {
          var v10610 = v10609(v10592, v10593);
          if (v10610) Object.keys(v10610).forEach(function (v10611) {
            v10595.css(v10611, v10610[v10611]);
          });
        }

        return v10595;
      }, TableExcelHelper.createEmptyRowTarget = function (v10612, tableElement) {
        var v10613 = TableExcelHelper.reconsitutionTableColumnTree(v10612),
          v10614 = $("<tr></tr>");
        v10613.rowColumns.filter(function (v10615) {
          return v10615.checked;
        }).forEach(function (v10616, v10617) {
          var v10618 = $("<td></td>");
          v10616.field && v10618.attr("field", v10616.field), v10616.align && v10618.css("text-align", v10616.align), v10616.vAlign && v10618.css("vertical-align", v10616.vAlign), v10614.append(v10618);
        });
        if (tableElement && tableElement.options.tableBodyRowHeight) {
          v10614.find('td:not([rowspan])').css('height', tableElement.options.tableBodyRowHeight + 'pt');
        }
        return v10614;
      }, TableExcelHelper.getColumnsWidth = function (v10619, v10620) {
        var v10621 = {},
          v10622 = TableExcelHelper.allAutoWidth(v10619),
          v10623 = TableExcelHelper.allFixedWidth(v10619);
        return v10619.rowColumns.filter(function (v10624) {
          return v10624.checked;
        }).forEach(function (v10625) {
          if (v10625.fixed) v10621[v10625.id] = v10625.width;else {
            var v10626 = v10620 - v10623,
              v10627 = v10625.width / v10622 * (v10626 > 0 ? v10626 : 0);
            v10621[v10625.id] = v10627;
          }
        }), v10621;
      }, TableExcelHelper.resizeTableCellWidth = function (v10628, v10629, v10630) {
        var v10631 = TableExcelHelper.reconsitutionTableColumnTree(v10629),
          v10632 = TableExcelHelper.getColumnsWidth(v10631, v10630);
        v10628.find("thead tr td[haswidth]").map(function (v10633, v10634) {
          var v10635 = $(v10634).attr("id"),
            v10636 = v10632[v10635];
          $(v10634).css("width", v10636 + "pt");
        });
      }, TableExcelHelper.allAutoWidth = function (v10637) {
        var v10638 = 0,v10639 = {};
        return v10637.rowColumns.filter(function (v10640) {
          return v10640.checked;
        }).forEach(function (v10641) {
          v10639[v10641.id] ? v10639[v10641.id] = 0 : v10639[v10641.id] = v10641.width;
          v10638 += v10641.fixed ? 0 : v10639[v10641.id];
        }), v10638;
      }, TableExcelHelper.allFixedWidth = function (v10642) {
        var v10643 = 0,v10644 = {};;
        return v10642.rowColumns.filter(function (v10645) {
          return v10645.checked;
        }).forEach(function (v10646) {
          v10644[v10646.id] ? v10644[v10646.id] = 0 : v10644[v10646.id] = v10646.width;
          v10643 += v10646.fixed ? v10644[v10646.id] : 0;
        }), v10643;
      }, TableExcelHelper.reconsitutionTableColumnTree = function (v10647, v10648, v10649) {
        var v10650 = v10648 || new _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__.a();
        v10650.colspan = 0;

        for (var v10652 = function v10653(v10654) {
            v10650.totalLayer = v10654 + 1, v10650[v10654] = v10647[v10654].columns, 0 == v10654 && v10647[v10654].columns.forEach(function (v10655) {
              0 == v10654 && (v10650.colspan += v10655.colspan);
            });
          }, v10656 = 0; v10656 < v10647.length; v10656++) {
          v10652(v10656);
        }

        return v10650.rowColumns = TableExcelHelper.getOrderdColumns(v10650), v10650;
      }, TableExcelHelper.syncTargetWidthToOption = function (v10657) {
        v10657.forEach(function (v10658) {
          v10658.columns.forEach(function (v10659) {
            v10659.hasWidth && (v10659.width = v10659.targetWidth);
          });
        });
      }, TableExcelHelper.getGroupFieldsFormatter = function (options, tablePrintElementType) {
        var groupFieldsFormatter = void 0;
        if (tablePrintElementType.groupFields && tablePrintElementType.groupFields.length) {
          var arr = typeof tablePrintElementType.groupFields == "string" ? tablePrintElementType.groupFields : JSON.stringify(tablePrintElementType.groupFields);
          options.groupFieldsFormatter = "function(type,options,data){ return " + arr + " }";
        }
        if (tablePrintElementType.groupFieldsFormatter && (groupFieldsFormatter = tablePrintElementType.groupFieldsFormatter), options.groupFieldsFormatter) try {
          var v10660 = "groupFieldsFormatter=" + options.groupFieldsFormatter;
          eval(v10660);
        } catch (v10661) {
          console.log(v10661);
        }
        return groupFieldsFormatter;
      }, TableExcelHelper.getGroupFormatter = function (options, tablePrintElementType) {
        var groupFormatter = void 0;
        if (tablePrintElementType.groupFormatter && (groupFormatter = tablePrintElementType.groupFormatter), options.groupFormatter) try {
          var v10662 = "groupFormatter=" + options.groupFormatter;
          eval(v10662);
        } catch (v10663) {
          console.log(v10663);
        }
        return groupFormatter;
      }, TableExcelHelper.getGroupFooterFormatter = function (options, tablePrintElementType) {
        var groupFooterFormatter = void 0;
        if (tablePrintElementType.groupFooterFormatter && (groupFooterFormatter = tablePrintElementType.groupFooterFormatter), options.groupFooterFormatter) try {
          var v10664 = "groupFooterFormatter=" + options.groupFooterFormatter;
          eval(v10664);
        } catch (v10665) {
          console.log(v10665);
        }
        return groupFooterFormatter;
      }, TableExcelHelper.getFooterFormatter = function (options, tablePrintElementType) {
        var footerFormatter = void 0;
        if (tablePrintElementType.footerFormatter && (footerFormatter = tablePrintElementType.footerFormatter), options.footerFormatter) try {
          var v10666 = "footerFormatter=" + options.footerFormatter;
          eval(v10666);
        } catch (v10667) {
          console.log(v10667);
        }
        return footerFormatter;
      }, TableExcelHelper.getRowStyler = function (options, tablePrintElementType) {
        var rowStyler = void 0;
        if (tablePrintElementType.rowStyler && (rowStyler = tablePrintElementType.rowStyler), options.rowStyler) try {
          var v10668 = "rowStyler=" + options.rowStyler;
          eval(v10668);
        } catch (v10669) {
          console.log(v10669);
        }
        return rowStyler;
      }, TableExcelHelper.getColumnTableSummaryFormatter = function (column) {
        var tableSummaryFormatter = void 0;
        if (column.tableSummaryFormatter && (tableSummaryFormatter = column.tableSummaryFormatter), column.tableSummaryFormatter) try {
          var v10670 = "tableSummaryFormatter=" + column.tableSummaryFormatter;
          eval(v10670);
        } catch (v10671) {
          console.log(v10671);
        }
        return tableSummaryFormatter;
      }, TableExcelHelper.getColumnStyler = function (column) {
        var styler = void 0;
        if (column.styler && (styler = column.styler), column.styler2) try {
          var v10672 = "styler=" + column.styler2;
          eval(v10672);
        } catch (v10673) {
          console.log(v10673);
        }
        return styler;
      }, TableExcelHelper.getHeaderStyler = function (column) {
        var stylerHeader = void 0;
        if (column.stylerHeader && (stylerHeader = column.stylerHeader), column.stylerHeader) try {
          var v10674 = "stylerHeader=" + column.stylerHeader;
          eval(v10674);
        } catch (v10675) {
          console.log(v10675);
        }
        return stylerHeader;
      }, TableExcelHelper.getColumnRenderFormatter = function (column) {
        var renderFormatter = void 0;
        if (column.renderFormatter && (renderFormatter = column.renderFormatter), column.renderFormatter) try {
          var v10676 = "renderFormatter=" + column.renderFormatter;
          eval(v10676);
        } catch (v10677) {
          console.log(v10677);
        }
        return renderFormatter;
      }, TableExcelHelper.getColumnFormatter = function (column) {
        var formatter = void 0;
        if (column.formatter && (formatter = column.formatter), column.formatter2) try {
          var v10678 = "formatter=" + column.formatter2;
          eval(v10678);
        } catch (v10679) {
          console.log(v10679);
        }
        return formatter;
      }, TableExcelHelper.getOrderdColumns = function (v10680) {
        // 新数据
        let newColumns = {};
        // 遍历所有 rawData columns，先处理 colspan 防止后面 rowspan 插入取下标错误
        for (let v10681 = 0; v10681 < v10680.totalLayer; v10681++) {
          newColumns[v10681] = []; // 新数据中添加对应 columns
          v10680[v10681].forEach((column, columnIdx) => {
            newColumns[v10681].push(...new Array(column.colspan).fill({ ...column, colspan: 1 })); // 创建 colspan 个
          });
        }
        // 再次遍历 rawData columns，处理 rowspan 给后面 columns 插入相同 column
        for (let v10682 = 0; v10682 < v10680.totalLayer; v10682++) {
          newColumns[v10682].forEach((column, columnIdx) => {
            for (let v10683 = 1; v10683 < column.rowspan; v10683++) {
              newColumns[v10682 + v10683].splice(columnIdx, 0, { ...column, rowspan: 1 });
            }
          });
        }
        // 把上层/其他层的 field 赋值给最下层
        let lastColumns = [];
        for (let v10684 = 0; v10684 < v10680.totalLayer; v10684++) {
          if (v10684 >= v10680.totalLayer - 1) {
            newColumns[v10684].forEach((column, columnIdx) => {
              if (!column.field) {
                column.field = lastColumns[columnIdx];
              }
            });
          } else {
            newColumns[v10684].forEach((column, columnIdx) => {
              if (v10684 == 0) {
                lastColumns.push(column.field || "");
              } else {
                column.field && (lastColumns[columnIdx] = column.field);
              }
            });
          }
        }
        this.rowColumns = newColumns[v10680.totalLayer - 1];
        return newColumns[v10680.totalLayer - 1];
      }, TableExcelHelper;
    }();
}, function (v10685, v10686, v10687) {
  "use strict";

  v10687.d(v10686, "a", function () {
    return v10689;
  });

  var v10689 = function () {
    function v10691(v10690) {
      this.top = v10690.top, this.left = v10690.left, this.height = v10690.height, this.width = v10690.width, this.bottomInLastPaper = v10690.bottomInLastPaper, this.beginPrintPaperIndex = v10690.beginPrintPaperIndex, this.printTopInPaper = v10690.printTopInPaper, this.endPrintPaperIndex = v10690.endPrintPaperIndex;
    }

    return v10691.prototype.isPositionLeftOrRight = function (v10692) {
      return this.top <= v10692 && this.top + this.height > v10692;
    }, v10691;
  }();
}, function (v10693, v10694, v10695) {
  "use strict";

  var v10696 = function () {
      function v10697() {
        this.name = "lineHeight";
      }

      return v10697.prototype.css = function (v10698, v10699) {
        if (v10698 && v10698.length) {
          if (v10699) return v10698.css("line-height", v10699 + "pt"), "line-height:" + v10699 + "pt";
          v10698[0].style.lineHeight = "";
        }

        return null;
      }, v10697.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体行高')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10697.prototype.getValue = function () {
        var v10700 = this.target.find("select").val();
        if (v10700) return parseFloat(v10700.toString());
      }, v10697.prototype.setValue = function (v10701) {
        v10701 && (this.target.find('option[value="' + v10701 + '"]').length || this.target.find("select").prepend('<option value="' + v10701 + '" >' + v10701 + "</option>"));
        this.target.find("select").val(v10701);
      }, v10697.prototype.destroy = function () {
        this.target.remove();
      }, v10697;
    }(),
    fontFamily = function () {
      function v10702() {
        this.name = "fontFamily";
      }
      return v10702.prototype.createTarget = function (v10703) {
        var v10704 = void 0;
        if (v10703 && (v10704 = v10703.getFontList()), v10704) {
          var v10705 = `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>`;
          v10704.forEach(function (v10706, v10707) {
            v10705 += ' <option value="' + (v10706.value || "") + '" >' + (v10706.title || "") + "</option>";
          }), v10705 += " </select>\n            </div>\n        </div>", this.target = $(v10705);
        } else {
          this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="SimSun" >${i18n.__('宋体')}</option>\n            <option value="Microsoft YaHei" >${i18n.__('微软雅黑')}</option>\n        </select>\n        </div>\n    </div>`);
        }
        return this.target;
      }, v10702.prototype.css = function (v10708, v10709) {
        if (v10708 && v10708.length) {
          if (v10709) return v10708.css("font-family", v10709), "font-family:" + v10709;
          v10708[0].style.fontFamily = "inherit"; // 从父元素继承字体, 否则模板字体无效
        }
        return null;
      }, v10702.prototype.getValue = function () {
        var v10710 = this.target.find("select").val();
        if (v10710) return v10710.toString();
      }, v10702.prototype.setValue = function (v10711) {
        v10711 && (this.target.find('option[value="' + v10711 + '"]').length || this.target.find("select").prepend('<option value="' + v10711 + '" >' + v10711 + "</option>"));
        this.target.find("select").val(v10711);
      }, v10702.prototype.destroy = function () {
        this.target.remove();
      }, v10702;
    }(),
    v10712 = function () {
      function v10713() {
        this.name = "fontSize";
      }

      return v10713.prototype.css = function (v10714, v10715) {
        if (v10714 && v10714.length) {
          if (v10715) return v10714.css("font-size", v10715 + "pt"), "font-size:" + v10715 + "pt";
          v10714[0].style.fontSize = "";
        }

        return null;
      }, v10713.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体大小')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10713.prototype.getValue = function () {
        var v10716 = this.target.find("select").val();
        if (v10716) return parseFloat(v10716.toString());
      }, v10713.prototype.setValue = function (v10717) {
        v10717 && (this.target.find('option[value="' + v10717 + '"]').length || this.target.find("select").prepend('<option value="' + v10717 + '" >' + v10717 + "</option>"));
        this.target.find("select").val(v10717);
      }, v10713.prototype.destroy = function () {
        this.target.remove();
      }, v10713;
    }(),
    v10718 = function () {
      function v10719() {
        this.name = "fontWeight";
      }

      return v10719.prototype.css = function (v10720, v10721) {
        if (v10720 && v10720.length) {
          if (v10721) return v10720.css("font-weight", v10721), "font-weight:" + v10721;
          v10720[0].style.fontWeight = "";
        }

        return null;
      }, v10719.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体粗细')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="lighter" >${i18n.__('更细')}</option>\n        <option value="bold" >${i18n.__('粗体')}</option>\n        <option value="bolder" >${i18n.__('粗体+')}</option>\n            <option value="100" >100</option>\n            <option value="200" >200</option>\n            <option value="300" >300</option>\n            <option value="400" >400</option>\n            <option value="500" >500</option>\n            <option value="600" >600</option>\n            <option value="700" >700</option>\n            <option value="800" >800</option>\n            <option value="900" >900</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10719.prototype.getValue = function () {
        var v10722 = this.target.find("select").val();
        if (v10722) return v10722.toString();
      }, v10719.prototype.setValue = function (v10723) {
        v10723 && (this.target.find('option[value="' + v10723 + '"]').length || this.target.find("select").prepend('<option value="' + v10723 + '" >' + v10723 + "</option>"));
        this.target.find("select").val(v10723);
      }, v10719.prototype.destroy = function () {
        this.target.remove();
      }, v10719;
    }(),
    v10724 = function () {
      function v10725() {
        this.name = "letterSpacing";
      }
      return v10725.prototype.css = function (v10726, v10727) {
        if (v10726 && v10726.length) {
          if (v10727) return v10726.css("letter-spacing", v10727 + "pt"), "letter-spacing:" + v10727 + "pt";
          v10726[0].style.letterSpacing = "";
        }
        return null;
      }, v10725.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字间距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10725.prototype.getValue = function () {
        var v10728 = this.target.find("select").val();
        if (v10728) return parseFloat(v10728.toString());
      }, v10725.prototype.setValue = function (v10729) {
        v10729 && (this.target.find('option[value="' + v10729 + '"]').length || this.target.find("select").prepend('<option value="' + v10729 + '" >' + v10729 + "</option>"));
        this.target.find("select").val(v10729);
      }, v10725.prototype.destroy = function () {
        this.target.remove();
      }, v10725;
    }(),
    v10730 = function () {
      function v10731() {
        this.name = "textAlign";
      }
      return v10731.prototype.css = function (v10732, v10733) {
        if (v10732 && v10732.length) {
          if (v10733) return v10732.css("text-align", v10733), "justify" == v10733 ? (v10732.css("text-align-last", "justify"), v10732.css("text-justify", "distribute-all-lines")) : (v10732[0].style.textAlignLast = "", v10732[0].style.textJustify = ""), "text-align:" + v10733;
          v10732[0].style.textAlign = "", v10732[0].style.textAlignLast = "", v10732[0].style.textJustify = "";
        }

        return null;
      }, v10731.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10731.prototype.getValue = function () {
        var v10734 = this.target.find("select").val();
        if (v10734) return v10734.toString();
      }, v10731.prototype.setValue = function (v10735) {
        this.target.find("select").val(v10735);
      }, v10731.prototype.destroy = function () {
        this.target.remove();
      }, v10731;
    }(),
    v10736 = function () {
      function v10737() {
        this.name = "hideTitle";
      }

      return v10737.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('标题显示隐藏')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="false" >${i18n.__('显示')}</option>\n            <option value="true" >${i18n.__('隐藏')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10737.prototype.getValue = function () {
        if ("true" == this.target.find("select").val()) return !0;
      }, v10737.prototype.setValue = function (v10738) {
        this.target.find("select").val((null == v10738 ? "" : v10738).toString());
      }, v10737.prototype.destroy = function () {
        this.target.remove();
      }, v10737;
    }(),
    v10739 = function () {
      function v10740() {
        this.name = "tableBorder";
      }

      return v10740.prototype.css = function (v10741, v10742) {
        if (v10741.find("table").length) {
          if ("border" == v10742 || void 0 == v10742) return v10741.find("table").css("border", "1px solid"), "border:1px solid";
          "noBorder" == v10742 ? v10741.find("table").css("border", "0px solid") : v10741.find("table")[0].style.border = "";
        }

        return null;
      }, v10740.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="border" >${i18n.__('有边框')}</option>\n            <option value="noBorder" >${i18n.__('无边框')}</option>\n            </select>\n        </div>\n    </div>`), this.target;
      }, v10740.prototype.getValue = function () {
        var v10743 = this.target.find("select").val();
        if (v10743) return v10743.toString();
      }, v10740.prototype.setValue = function (v10744) {
        this.target.find("select").val(v10744);
      }, v10740.prototype.destroy = function () {
        this.target.remove();
      }, v10740;
    }(),
    v10745 = function () {
      function v10746() {
        this.name = "tableHeaderBorder";
      }

      return v10746.prototype.css = function (v10747, v10748) {
        if (v10747.find("thead tr").length) {
          if ("border" == v10748 || void 0 == v10748) return v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-all");
          "noBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-none") : "leftBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-left") : "rightBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-right") : "leftRightBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-lr") : "topBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-top") : "bottomBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-bottom") : "topBottomBorder" == v10748 ? v10747.find("thead tr").addClass("hiprint-printElement-tableTarget-border-tb") : v10747.find("thead tr").removeClass();
        }

        return null;
      }, v10746.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表头边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>    \n        <option value="border" >${i18n.__('有边框')}</option>\n        <option value="noBorder" >${i18n.__('无边框')}</option>\n        <option value="leftBorder" >${i18n.__('左边框')}</option>\n        <option value="rightBorder" >${i18n.__('右边框')}</option>\n        <option value="leftRightBorder" >${i18n.__('左右边框')}</option>\n        <option value="topBorder" >${i18n.__('上边框')}</option>\n        <option value="bottomBorder" >${i18n.__('下边框')}</option>\n        <option value="topBottomBorder" >${i18n.__('上下边框')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10746.prototype.getValue = function () {
        var v10749 = this.target.find("select").val();
        if (v10749) return v10749.toString();
      }, v10746.prototype.setValue = function (v10750) {
        this.target.find("select").val(v10750);
      }, v10746.prototype.destroy = function () {
        this.target.remove();
      }, v10746;
    }(),
    v10751 = function () {
      function v10752() {
        this.name = "tableHeaderCellBorder";
      }

      return v10752.prototype.css = function (v10753, v10754) {
        if (v10753.find("thead tr").length) {
          if ("border" == v10754 || void 0 == v10754) return v10753.find("thead tr").addClass("hiprint-printElement-tableTarget-border-td-all");
          "noBorder" == v10754 ? v10753.find("thead tr").addClass("hiprint-printElement-tableTarget-border-td-none") : v10753.find("thead tr").removeClass();
        }

        return null;
      }, v10752.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表头单元格边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>    \n        <option value="border" >${i18n.__('有边框')}</option>\n        <option value="noBorder" >${i18n.__('无边框')}</option>\n      \n        </select>\n        </div>\n    </div>`), this.target;
      }, v10752.prototype.getValue = function () {
        var v10755 = this.target.find("select").val();
        if (v10755) return v10755.toString();
      }, v10752.prototype.setValue = function (v10756) {
        this.target.find("select").val(v10756);
      }, v10752.prototype.destroy = function () {
        this.target.remove();
      }, v10752;
    }(),
    d2 = function () {
      function v10757() {
        this.name = "tableFooterBorder";
      }

      return v10757.prototype.css = function (v10758, v10759) {
        if (v10758.find("tfoot tr").length) {
          if ("border" == v10759 || void 0 == v10759) return v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-all");
          "noBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-none") : "leftBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-left") : "rightBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-right") : "leftRightBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-lr") : "topBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-top") : "bottomBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-bottom") : "topBottomBorder" == v10759 ? v10758.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-tb") : v10758.find("tfoot tr").removeClass();
        }

        return null;
      }, v10757.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表尾边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>    \n        <option value="border" >${i18n.__('有边框')}</option>\n        <option value="noBorder" >${i18n.__('无边框')}</option>\n        <option value="leftBorder" >${i18n.__('左边框')}</option>\n        <option value="rightBorder" >${i18n.__('右边框')}</option>\n        <option value="leftRightBorder" >${i18n.__('左右边框')}</option>\n        <option value="topBorder" >${i18n.__('上边框')}</option>\n        <option value="bottomBorder" >${i18n.__('下边框')}</option>\n        <option value="topBottomBorder" >${i18n.__('上下边框')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10757.prototype.getValue = function () {
        var v10760 = this.target.find("select").val();
        if (v10760) return v10760.toString();
      }, v10757.prototype.setValue = function (v10761) {
        this.target.find("select").val(v10761);
      }, v10757.prototype.destroy = function () {
        this.target.remove();
      }, v10757;
    }(),
    c2 = function () {
      function v10762() {
        this.name = "tableFooterCellBorder";
      }

      return v10762.prototype.css = function (v10763, v10764) {
        if (v10763.find("tfoot tr").length) {
          if ("border" == v10764 || void 0 == v10764) return v10763.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-td-all");
          "noBorder" == v10764 ? v10763.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-td-none") : v10763.find("tfoot tr").removeClass();
        }

        return null;
      }, v10762.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表尾单元格边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>    \n        <option value="border" >${i18n.__('有边框')}</option>\n        <option value="noBorder" >${i18n.__('无边框')}</option>\n      \n        </select>\n        </div>\n    </div>`), this.target;
      }, v10762.prototype.getValue = function () {
        var v10765 = this.target.find("select").val();
        if (v10765) return v10765.toString();
      }, v10762.prototype.setValue = function (v10766) {
        this.target.find("select").val(v10766);
      }, v10762.prototype.destroy = function () {
        this.target.remove();
      }, v10762;
    }(),
    v10767 = function () {
      function v10768() {
        this.name = "tableHeaderRowHeight";
      }

      return v10768.prototype.css = function (v10769, v10770) {
        if (v10769.find("thead tr td").length) {
          if (v10770) return v10769.find("thead tr td:not([rowspan])").css("height", v10770 + "pt"), "height:" + v10770 + "pt";
          v10769.find("thead tr td").map(function (v10771, v10772) {
            v10772.style.height = "";
          });
        }

        return null;
      }, v10768.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表头行高')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n       \n        <option value="" >${i18n.__('默认')}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10768.prototype.getValue = function () {
        var v10773 = this.target.find("select").val();
        if (v10773) return parseFloat(v10773.toString());
      }, v10768.prototype.setValue = function (v10774) {
        v10774 && (this.target.find('option[value="' + v10774 + '"]').length || this.target.find("select").prepend('<option value="' + v10774 + '" >' + v10774 + "</option>"));
        this.target.find("select").val(v10774);
      }, v10768.prototype.destroy = function () {
        this.target.remove();
      }, v10768;
    }(),
    v10775 = function () {
      function v10776() {
        this.name = "tableHeaderFontSize";
      }

      return v10776.prototype.css = function (v10777, v10778) {
        if (v10777.find("thead").length) {
          if (v10778) return v10777.find("thead").css("font-size", v10778 + "pt"), "font-size:" + v10778 + "pt";
          v10777.find("thead").map(function (v10779, v10780) {
            v10780.style.fontSize = "";
          });
        }

        return null;
      }, v10776.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表头字体大小')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10776.prototype.getValue = function () {
        var v10781 = this.target.find("select").val();
        if (v10781) return parseFloat(v10781.toString());
      }, v10776.prototype.setValue = function (v10782) {
        v10782 && (this.target.find('option[value="' + v10782 + '"]').length || this.target.find("select").prepend('<option value="' + v10782 + '" >' + v10782 + "</option>"));
        this.target.find("select").val(v10782);
      }, v10776.prototype.destroy = function () {
        this.target.remove();
      }, v10776;
    }(),
    v10783 = function () {
      function v10784() {
        this.name = "tableHeaderFontWeight";
      }

      return v10784.prototype.css = function (v10785, v10786) {
        if (v10785.find("thead").length) {
          if (v10786) return v10785.find("thead tr td").css("font-weight", v10786), "font-weight:" + v10786;
          v10785.find("thead tr td").map(function (v10787, v10788) {
            v10788.style.fontWeight = "";
          });
        }

        return null;
      }, v10784.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表头字体粗细')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit"> \n        <option value="" >${i18n.__('默认')}</option>\n        <option value="lighter" >${i18n.__('更细')}</option>\n        <option value="bold" >${i18n.__('粗体')}</option>\n        <option value="bolder" >${i18n.__('粗体+')}</option>\n        <option value="100" >100</option>\n        <option value="200" >200</option>\n        <option value="300" >300</option>\n        <option value="400" >400</option>\n        <option value="500" >500</option>\n        <option value="600" >600</option>\n        <option value="700" >700</option>\n        <option value="800" >800</option>\n        <option value="900" >900</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10784.prototype.getValue = function () {
        var v10789 = this.target.find("select").val();
        if (v10789) return v10789;
      }, v10784.prototype.setValue = function (v10790) {
        v10790 && (this.target.find('option[value="' + v10790 + '"]').length || this.target.find("select").prepend('<option value="' + v10790 + '" >' + v10790 + "</option>"));
        this.target.find("select").val(v10790);
      }, v10784.prototype.destroy = function () {
        this.target.remove();
      }, v10784;
    }(),
    v10791 = function () {
      function v10792() {
        this.name = "tableBodyCellBorder";
      }

      return v10792.prototype.css = function (v10793, v10794) {
        if (v10793.find("tbody tr").length) {
          if ("border" == v10794 || void 0 == v10794) return v10793.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-td-all");
          "noBorder" == v10794 ? v10793.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-td-none") : v10793.find("tbody tr").removeClass();
        }

        return null;
      }, v10792.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n            ${i18n.__('表体单元格边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="border" >${i18n.__('有边框')}</option>\n            <option value="noBorder" >${i18n.__('无边框')}</option>\n            </select>\n        </div>\n    </div>`), this.target;
      }, v10792.prototype.getValue = function () {
        var v10795 = this.target.find("select").val();
        if (v10795) return v10795.toString();
      }, v10792.prototype.setValue = function (v10796) {
        this.target.find("select").val(v10796);
      }, v10792.prototype.destroy = function () {
        this.target.remove();
      }, v10792;
    }(),
    v10797 = function () {
      function v10798() {
        this.name = "tableBodyRowHeight";
      }

      return v10798.prototype.css = function (v10799, v10800) {
        if (v10799.find("tbody tr td").length) {
          if (v10800) return v10799.find("tbody tr td").css("height", v10800 + "pt"), "height:" + v10800 + "pt";
          v10799.find("tbody tr td").map(function (v10801, v10802) {
            v10802.style.height = "";
          });
        }

        return null;
      }, v10798.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n            ${i18n.__('表体行高')}\n        </div>\n        <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="6" >6pt</option>\n            <option value="6.75" >6.75pt</option>\n            <option value="7.5" >7.5pt</option>\n            <option value="8.25" >8.25pt</option>\n            <option value="9" >9pt</option>\n            <option value="9.75" >9.75pt</option>\n            <option value="10.5" >10.5pt</option>\n            <option value="11.25" >11.25pt</option>\n            <option value="12" >12pt</option>\n            <option value="12.75" >12.75pt</option>\n            <option value="13.5" >13.5pt</option>\n            <option value="14.25" >14.25pt</option>\n            <option value="15" >15pt</option>\n            <option value="15.75" >15.75pt</option>\n            <option value="16.5" >16.5pt</option>\n            <option value="17.25" >17.25pt</option>\n            <option value="18" >18pt</option>\n            <option value="18.75" >18.75pt</option>\n            <option value="19.5" >19.5pt</option>\n            <option value="20.25" >20.25pt</option>\n            <option value="21" >21pt</option>\n            <option value="21.75" >21.75pt</option>\n            <option value="22.5" >22.5pt</option>\n            <option value="23.25" >23.25pt</option>\n            <option value="24" >24pt</option>\n            <option value="24.75" >24.75pt</option>\n            <option value="25.5" >25.5pt</option>\n            <option value="26.25" >26.25pt</option>\n            <option value="27" >27pt</option>\n            <option value="27.75" >27.75pt</option>\n            <option value="28.5" >28.5pt</option>\n            <option value="29.25" >29.25pt</option>\n            <option value="30" >30pt</option>\n            <option value="30.75" >30.75pt</option>\n            <option value="31.5" >31.5pt</option>\n            <option value="32.25" >32.25pt</option>\n            <option value="33" >33pt</option>\n            <option value="33.75" >33.75pt</option>\n            <option value="34.5" >34.5pt</option>\n            <option value="35.25" >35.25pt</option>\n            <option value="36" >36pt</option>\n            </select>\n        </div>\n    </div>`), this.target;
      }, v10798.prototype.getValue = function () {
        var v10803 = this.target.find("select").val();
        if (v10803) return parseFloat(v10803.toString());
      }, v10798.prototype.setValue = function (v10804) {
        v10804 && (this.target.find('option[value="' + v10804 + '"]').length || this.target.find("select").prepend('<option value="' + v10804 + '" >' + v10804 + "</option>"));
        this.target.find("select").val(v10804);
      }, v10798.prototype.destroy = function () {
        this.target.remove();
      }, v10798;
    }(),
    v10805 = function () {
      function v10806() {
        this.name = "tableHeaderBackground";
      }

      return v10806.prototype.css = function (v10807, v10808) {
        if (v10807.find("thead").length) {
          if (v10808) return v10807.find("thead").css("background", v10808), "background:" + v10808;
          v10807.find("thead").map(function (v10809, v10810) {
            v10810.style.background = "";
          });
        }

        return null;
      }, v10806.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表头背景')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>`), this.target;
      }, v10806.prototype.getValue = function () {
        var v10811 = this.target.find("input").val();
        if (v10811) return v10811.toString();
      }, v10806.prototype.setValue = function (v10812) {
        this.target.find("input").minicolors({
          defaultValue: v10812 || "",
          theme: "bootstrap"
        }), this.target.find("input").val(v10812);
      }, v10806.prototype.destroy = function () {
        this.target.remove();
      }, v10806;
    }(),
    v10813 = function () {
      function v10814() {
        this.name = "borderWidth";
      }

      return v10814.prototype.createTarget = function (v10815) {
        var name = ['hline', 'vline', 'rect', 'oval'].includes(v10815.printElementType.type) ? `${i18n.__('线宽')}` : `${i18n.__('边框大小')}`;
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10814.prototype.css = function (v10816, v10817) {
        if (v10816 && v10816.length) {
          if (v10817) return v10816.css("border-width", v10817 + "pt"), "border-width:" + v10817 + "pt";
          v10816[0].style.borderWidth = "";
        }

        return null;
      }, v10814.prototype.getValue = function () {
        var v10818 = this.target.find("select").val();
        if (v10818) return v10818.toString();
      }, v10814.prototype.setValue = function (v10819) {
        v10819 && (this.target.find('option[value="' + v10819 + '"]').length || this.target.find("select").prepend('<option value="' + v10819 + '" >' + v10819 + "</option>"));
        this.target.find("select").val(v10819);
      }, v10814.prototype.destroy = function () {
        this.target.remove();
      }, v10814;
    }(),
    v10820 = function () {
      function v10821() {
        this.name = "barcodeMode";
      }

      return v10821.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('条形码格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="CODE128A" >CODE128A</option>\n        <option value="CODE128B" >CODE128B</option>\n        <option value="CODE128C" >CODE128C</option>\n        <option value="CODE39" >CODE39</option>\n        <option value="EAN13" >EAN-13</option>\n        <option value="EAN8" >EAN-8</option>\n        <option value="EAN5" >EAN-5</option>\n        <option value="EAN2" >EAN-2</option>\n        <option value="UPC" >UPC（A）</option>\n        <option value="ITF" >ITF</option>\n        <option value="ITF14" >ITF-14</option>\n        <option value="MSI" >MSI</option>\n            <option value="MSI10" >MSI10</option>\n            <option value="MSI11" >MSI11</option>\n            <option value="MSI1010" >MSI1010</option>\n            <option value="MSI1110" >MSI1110</option>\n            <option value="Pharmacode" >Pharmacode</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10821.prototype.getValue = function () {
        var v10822 = this.target.find("select").val();
        return v10822 || void 0;
      }, v10821.prototype.setValue = function (v10823) {
        this.target.find("select").val(v10823);
      }, v10821.prototype.destroy = function () {
        this.target.remove();
      }, v10821;
    }(),
    barWidth = function () {
      function v10824() {
        this.name = "barWidth";
      }
      return v10824.prototype.createTarget = function () {
        this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('条码宽度')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div></div>`);
        return this.target;
      }, v10824.prototype.getValue = function () {
        var v10825 = this.target.find("select").val();
        return v10825 || void 0;
      }, v10824.prototype.setValue = function (v10826) {
        this.target.find("select").val(v10826);
      }, v10824.prototype.destroy = function () {
        this.target.remove();
      }, v10824;
    }(),
    barAutoWidth = function () {
      function v10827() {
        this.name = "barAutoWidth";
      }
      return v10827.prototype.createTarget = function () {
        this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('条码自动增宽')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="true">${i18n.__('自动')}</option><option value="false">${i18n.__('不自动')}</option></select></div></div>`);
        return this.target;
      }, v10827.prototype.getValue = function () {
        var v10828 = this.target.find("select").val();
        return v10828 || void 0;
      }, v10827.prototype.setValue = function (v10829) {
        this.target.find("select").val(v10829);
      }, v10827.prototype.destroy = function () {
        this.target.remove();
      }, v10827;
    }(),
    barcodeType = function () {
      function v10830() {
        this.name = "barcodeType";
      }

      return v10830.prototype.createTarget = function () {
        var options = [{
          label: `${i18n.__('默认')}(Code 128)`,
          value: ""
        },
        {
          label: `${i18n.__('商品条码')}`,
          children: [
          {
            label: "EAN-13",
            value: "ean13"
          },
          {
            label: "EAN-8",
            value: "ean8"
          },
          {
            label: "UPC-A",
            value: "upca"
          },
          {
            label: "UPC-E",
            value: "upce"
          },
          {
            label: "ISBN",
            value: "isbn"
          },
          {
            label: "ISMN",
            value: "ismn"
          },
          {
            label: "ISSN",
            value: "issn"
          }]

        },
        {
          label: `${i18n.__('条形码')}`,
          children: [
          {
            label: "Code 39",
            value: "code39"
          },
          {
            label: "Code 39 Extended",
            value: "code39ext"
          },
          {
            label: "Code 93",
            value: "code93"
          },
          {
            label: "Code 93 Extended",
            value: "code93ext"
          },
          {
            label: "Code 128",
            value: "code128"
          },
          {
            label: "Interleaved 2 of 5 (ITF)",
            value: "interleaved2of5"
          }]

        },
        {
          label: `${i18n.__('物流')}`,
          children: [
          {
            label: "EAN-14",
            value: "ean14"
          },
          {
            label: "GS1-128",
            value: "gs1-128"
          },
          {
            label: "ITF-14",
            value: "itf14"
          },
          {
            label: "SSCC-18",
            value: "sscc18"
          }]

        },
        {
          label: "GS1 DataBar",
          children: [
          {
            label: "扩展式 GS1 DataBar",
            value: "databarexpanded"
          },
          {
            label: "层排扩展式 GS1 DataBar",
            value: "databarexpandedstacked"
          },
          {
            label: "限定式 GS1 DataBar",
            value: "databarlimited"
          },
          {
            label: "全向式 GS1 DataBar",
            value: "databaromni"
          },
          {
            label: "层排式 GS1 DataBar",
            value: "databarstacked"
          },
          {
            label: "全向层排式 GS1 DataBar",
            value: "databarstackedomni"
          },
          {
            label: "截短式 GS1 DataBar",
            value: "databartruncated"
          },
          {
            label: "GS1 北美优惠券码",
            value: "gs1northamericancoupon"
          }]

        },
        {
          label: `${i18n.__('邮政和快递编码')}`,
          children: [
          {
            label: "AusPost 4 State Customer Code",
            value: "auspost"
          },
          {
            label: "Deutsche Post Identcode",
            value: "identcode"
          },
          {
            label: "Deutsche Post Leitcode",
            value: "leitcode"
          },
          {
            label: "Japan Post 4 State Customer Code",
            value: "japanpost"
          },
          {
            label: "Royal TNT Post",
            value: "kix"
          },
          {
            label: "Royal Mail 4 State Customer Code",
            value: "royalmail"
          },
          {
            label: "Royal Mail Mailmark",
            value: "mailmark"
          },
          {
            label: "MaxiCode",
            value: "maxicode"
          },
          {
            label: "USPS FIM symbols",
            value: "symbol"
          },
          {
            label: "USPS Intelligent Mail",
            value: "onecode"
          },
          {
            label: "USPS PLANET",
            value: "planet"
          },
          {
            label: "USPS POSTNET",
            value: "postnet"
          }]

        },
        {
          label: `${i18n.__('医疗产品编码')}`,
          children: [
          {
            label: "Italian Pharmacode",
            value: "code32"
          },
          {
            label: "Pharmaceutical Binary Code",
            value: "pharmacode"
          },
          {
            label: "Pharmazentralnummer (PZN)",
            value: "pzn"
          },
          {
            label: "Two-track Pharmacode",
            value: "pharmacode2"
          },
          {
            label: "HIBC Aztec Code",
            value: "hibcazteccode"
          },
          {
            label: "HIBC Codablock F",
            value: "hibccodablockf"
          },
          {
            label: "HIBC Code 128",
            value: "hibccode128"
          },
          {
            label: "HIBC Code 39",
            value: "hibccode39"
          }]

        },
        {
          label: `${i18n.__('不常用编码')}`,
          children: [
          {
            label: "Code 11",
            value: "code11"
          },
          {
            label: "Code 16K",
            value: "code16k"
          },
          {
            label: "Code 2 of 5",
            value: "code2of5"
          },
          {
            label: "Code 49",
            value: "code49"
          },
          {
            label: "Code One",
            value: "codeone"
          },
          {
            label: "Codabar",
            value: "rationalizedCodabar"
          },
          {
            label: "Codablock F",
            value: "codablockf"
          },
          {
            label: "BC412",
            value: "bc412"
          },
          {
            label: "COOP 2 of 5",
            value: "coop2of5"
          },
          {
            label: "Channel Code",
            value: "channelcode"
          },
          {
            label: "Datalogic 2 of 5",
            value: "datalogic2of5"
          },
          {
            label: "DotCode",
            value: "dotcode"
          },
          {
            label: "IATA 2 of 5",
            value: "iata2of5"
          },
          {
            label: "MSI Plessey",
            value: "msi"
          },
          {
            label: "Matrix 2 of 5",
            value: "matrix2of5"
          },
          {
            label: "Plessey UK",
            value: "plessey"
          },
          {
            label: "PosiCode",
            value: "posicode"
          },
          {
            label: "Telepen",
            value: "telepen"
          },
          {
            label: "Telepen Numeric",
            value: "telepennumeric"
          }]

        },
        {
          label: "GS1 复合编码",
          children: [
          {
            label: "复合 EAN-13",
            value: "ean13composite"
          },
          {
            label: "复合 EAN-8",
            value: "ean8composite"
          },
          {
            label: "复合 UPC-A",
            value: "upcacomposite"
          },
          {
            label: "复合 UPC-E",
            value: "upcecomposite"
          },
          {
            label: "层排扩展式复合 GS1 DataBar",
            value: "databarexpandedstackedcomposite"
          },
          {
            label: "扩展式复合 GS1 DataBar",
            value: "databarexpandedcomposite"
          },
          {
            label: "限定式复合 GS1 DataBar",
            value: "databarlimitedcomposite"
          },
          {
            label: "全向式复合 GS1 DataBar",
            value: "databaromnicomposite"
          },
          {
            label: "层排式复合 GS1 DataBar",
            value: "databarstackedcomposite"
          },
          {
            label: "全向层排式复合 GS1 DataBar",
            value: "databarstackedomnicomposite"
          },
          {
            label: "截短式复合 GS1 DataBar",
            value: "databartruncatedcomposite"
          },
          {
            label: "复合 GS1-128",
            value: "gs1-128composite"
          }]

        },
        {
          label: `${i18n.__('附加组件')}`,
          children: [
          {
            label: "EAN-2 (2 位附加码)",
            value: "ean2"
          },
          {
            label: "EAN-5 (5 位附加码)",
            value: "ean5"
          },
          {
            label: "GS1 复合 2D 组件",
            value: "gs1-cc"
          }]

        },
        {
          label: `${i18n.__('实验编码')}`,
          children: [
          {
            label: "Raw",
            value: "raw"
          },
          {
            label: "Custom 4 state symbology",
            value: "daft"
          },
          {
            label: "Flattermarken",
            value: "flattermarken"
          }]

        }];
        this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('条码类型')}</div><div class="hiprint-option-item-field"><select class="auto-submit"></select></div></div>`);
        var select = this.target.find('select.auto-submit');
        options.forEach((item) => {
          if (item.children) {
            var optgroup = $(`<optgroup label="${item.label}"></optgroup`);
            item.children.forEach((chil) => {
              optgroup.append($(`<option value="${chil.value}">${chil.label}</option>`));
            });
            select.append(optgroup);
          } else {
            select.append(`<option value="${item.value}">${item.label}</option>`);
          }
        });
        return this.target;
      }, v10830.prototype.getValue = function () {
        return this.target.find("select").val() || void 0;
      }, v10830.prototype.setValue = function (v10831) {
        this.target.find("select").val(v10831);
      }, v10830.prototype.destroy = function () {
        this.target.remove();
      }, v10830;
    }(),
    qrcodeType = function () {
      function v10832() {
        this.name = "qrcodeType";
      }

      return v10832.prototype.createTarget = function () {
        var options = [{
          label: `${i18n.__('默认')}(qrcode)`,
          value: ""
        },
        {
          label: "QR Code",
          value: "qrcode"
        },
        {
          label: "Micro QR Code",
          value: "microqrcode"
        },
        {
          label: "Swiss QR Code",
          value: "swissqrcode"
        },
        {
          label: "Rectangular Micro QR Code",
          value: "rectangularmicroqrcode"
        },
        {
          label: "Aztec Code",
          value: "azteccode"
        },
        {
          label: "Aztec Runes",
          value: "aztecrune"
        },
        {
          label: "Compact Aztec Code",
          value: "azteccodecompact"
        },
        {
          label: "Data Matrix",
          value: "datamatrix"
        },
        {
          label: "Data Matrix Rectangular",
          value: "datamatrixrectangular"
        },
        {
          label: "汉信码",
          value: "hanxin"
        },
        {
          label: "GS1 Data Matrix",
          value: "gs1datamatrix"
        },
        {
          label: "GS1 Data Matrix Rectangular",
          value: "gs1datamatrixrectangular"
        },
        {
          label: "GS1 QR Code",
          value: "gs1qrcode"
        },
        {
          label: "HIBC Data Matrix",
          value: "hibcdatamatrix"
        },
        {
          label: "HIBC Data Matrix Rectangular",
          value: "hibcdatamatrixrectangular"
        },
        {
          label: "HIBC MicroPDF417",
          value: "hibcmicropdf417"
        },
        {
          label: "HIBC PDF417",
          value: "hibcpdf417"
        },
        {
          label: "HIBC QR Code",
          value: "hibcqrcode"
        }];
        this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('二维码类型')}</div><div class="hiprint-option-item-field"><select class="auto-submit"></select></div></div>`);
        var select = this.target.find('select.auto-submit');
        options.forEach((item) => {
          select.append(`<option value="${item.value}">${item.label}</option>`);
        });
        return this.target;
      }, v10832.prototype.getValue = function () {
        return this.target.find("select").val() || void 0;
      }, v10832.prototype.setValue = function (v10833) {
        this.target.find("select").val(v10833);
      }, v10832.prototype.destroy = function () {
        this.target.remove();
      }, v10832;
    }(),
    qrCodeLevel = function () {
      function v10834() {
        this.name = "qrCodeLevel";
      }

      return v10834.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('二维码容错率')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1" >7% L</option>\n        <option value="0" >15% M</option>\n        <option value="3" >25% Q</option>\n        <option value="2" >30% H</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10834.prototype.getValue = function () {
        var v10835 = this.target.find("select").val();
        return parseInt(v10835 || 0);
      }, v10834.prototype.setValue = function (v10836) {
        this.target.find("select").val(v10836);
      }, v10834.prototype.destroy = function () {
        this.target.remove();
      }, v10834;
    }(),
    v10837 = function () {
      function v10838() {
        this.name = "color";
      }

      return v10838.prototype.css = function (v10839, v10840) {
        if (v10839 && v10839.length) {
          if (v10840) return v10839.css("color", v10840), "color:" + v10840;
          v10839[0].style.color = "";
        }

        return null;
      }, v10838.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体颜色')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v10838.prototype.getValue = function () {
        var v10841 = this.target.find("input").val();
        if (v10841) return v10841.toString();
      }, v10838.prototype.setValue = function (v10842) {
        this.target.find("input").minicolors({
          defaultValue: v10842 || "",
          theme: "bootstrap"
        }), this.target.find("input").val(v10842);
      }, v10838.prototype.destroy = function () {
        this.target.remove();
      }, v10838;
    }(),
    v10843 = function () {
      function v10844() {
        this.name = "textDecoration";
      }

      return v10844.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('文本修饰')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="underline" >${i18n.__('下划线')}</option>\n            <option value="overline" >${i18n.__('上划线')}</option>\n            <option value="line-through" >${i18n.__('穿梭线')}</option>\n           \n        </select>\n        </div>\n    </div>`), this.target;
      }, v10844.prototype.css = function (v10845, v10846) {
        if (v10845 && v10845.length) {
          if (v10846) return v10845.css("text-decoration", v10846), "text-decoration:" + v10846;
          v10845[0].style.textDecoration = "";
        }

        return null;
      }, v10844.prototype.getValue = function () {
        var v10847 = this.target.find("select").val();
        if (v10847) return v10847.toString();
      }, v10844.prototype.setValue = function (v10848) {
        v10848 && (this.target.find('option[value="' + v10848 + '"]').length || this.target.find("select").prepend('<option value="' + v10848 + '" >' + v10848 + "</option>"));
        this.target.find("select").val(v10848);
      }, v10844.prototype.destroy = function () {
        this.target.remove();
      }, v10844;
    }(),
    v10849 = function () {
      function v10850() {
        this.name = "field";
      }

      return v10850.prototype.createTarget = function (v10851) {
        var v10852 = void 0;

        if (v10851 && (v10852 = v10851.getFields()), v10852) {
          this.isSelect = !0;
          var v10853 = `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__('字段名')}\n            </div>\n            <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n                <option value="" >${i18n.__('请选择字段')}</option>`;
          v10852.forEach(function (v10854, v10855) {
            v10853 += ' <option value="' + (v10854.field || "") + '" >' + (v10854.text || "") + "</option>";
          }), v10853 += " </select>\n            </div>\n        </div>", this.target = $(v10853);
        } else {
          this.isSelect = !1;
          this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__('字段名')}\n            </div>\n            <div class="hiprint-option-item-field">\n            <input type="text" placeholder="${i18n.__('请输入字段名')}" class="auto-submit">\n            </div>\n        </div>`);
        }

        return this.target;
      }, v10850.prototype.getValue = function () {
        return (this.isSelect ? this.target.find("select").val() : this.target.find("input").val()) || void 0;
      }, v10850.prototype.setValue = function (v10856) {
        this.isSelect ? v10856 && (this.target.find('option[value="' + v10856 + '"]').length || this.target.find("select").prepend('<option value="' + v10856 + '" >' + v10856 + "</option>"), this.target.find("select").val(v10856)) : this.target.find("input").val(v10856);
      }, v10850.prototype.destroy = function () {
        this.target.remove();
      }, v10850;
    }(),
    v10857 = function () {
      function v10858() {
        this.name = "title";
      }

      return v10858.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('标题')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:50px;" placeholder="${i18n.__('请输入标题')}" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v10858.prototype.getValue = function () {
        var v10859 = this.target.find("textarea").val();
        if (v10859) return v10859;
      }, v10858.prototype.setValue = function (v10860) {
        this.target.find("textarea").val(v10860);
      }, v10858.prototype.destroy = function () {
        this.target.remove();
      }, v10858;
    }(),
    v10861 = function () {
      function v10862() {
        this.name = "testData";
      }

      return v10862.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('测试数据')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('仅字段名称存在时有效')}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
      }, v10862.prototype.getValue = function () {
        var v10863 = this.target.find("input").val();
        if (v10863) return v10863.toString();
      }, v10862.prototype.setValue = function (v10864) {
        this.target.find("input").val(v10864);
      }, v10862.prototype.destroy = function () {
        this.target.remove();
      }, v10862;
    }(),
    coordinate = function () {
      function v10865() {
        this.name = "coordinate";
      }

      return v10865.prototype.createTarget = function (v10866, v10867) {
        var v10868 = this;
        v10868.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">\n        ${i18n.__('位置坐标')}\n        </div>
          <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
          <input type="number" style="width:48%" placeholder="${i18n.__('X位置(左)')}" class="auto-submit" />\n
          <input type="number" style="width:48%" placeholder="${i18n.__('Y位置(上)')}" class="auto-submit" />\n
          </div>\n
          </div>`);
        v10868.syncLock = v10867.coordinateSync || false;
        v10868.createSyncLock(v10868.syncLock);
        return v10868.target;
      }, v10865.prototype.createSyncLock = function (v10869) {
        var v10870 = this;
        v10870.lockTarget = v10870.syncLock ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`) : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
        v10870.lockTarget.click(function () {
          if (v10870.syncLock) {
            v10870.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
          } else {
            v10870.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
          }
          v10870.syncLock = !v10870.syncLock;
        });
        v10870.target.find("input:first").after(v10870.lockTarget);
        // 同步编辑...
        v10870.target.find("input:first").change(function () {
          if (v10870.syncLock) {
            v10870.target.find("input:last").val($(this).val());
          }
        });
        v10870.target.find("input:last").change(function () {
          if (v10870.syncLock) {
            v10870.target.find("input:first").val($(this).val());
          }
        });
        return v10870.lockTarget;
      }, v10865.prototype.css = function (v10871) {
        if (v10871 && v10871.length && this.target) {
          // 仅当前元素被选中才更新坐标位置, 以避免冲突
          if (('block' == v10871.find('.resize-panel').css('display') || v10871[0].className.includes('table')) && this.el == v10871) {
            var v10872 = this.getValue();
            return v10871.css("left", v10872.left + "pt").css("top", v10872.top + "pt");
          }
        }
        return null;
      }, v10865.prototype.getValue = function () {
        var v10873 = {
          coordinateSync: this.syncLock,
          left: 0,
          top: 0
        };
        v10873.left = parseFloat(this.target.find("input:first").val() || 0);
        v10873.top = parseFloat(this.target.find("input:last").val() || 0);
        return v10873;
      }, v10865.prototype.setValue = function (v10874, el) {
        this.el = el.designTarget || el;
        this.target.find("input:first").val(v10874.left);
        this.target.find("input:last").val(v10874.top);
      }, v10865.prototype.destroy = function () {
        this.target.remove();
      }, v10865;
    }(),
    widthHeight = function () {
      function v10875() {
        this.name = "widthHeight";
      }

      return v10875.prototype.createTarget = function (v10876, v10877) {
        var v10878 = this;
        v10878.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">\n        ${i18n.__('宽高大小')}\n        </div>
          <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
          <input type="number" style="width:48%" placeholder="${i18n.__('宽')}" class="auto-submit" />\n
          <input type="number" style="width:48%" placeholder="${i18n.__('高')}" class="auto-submit" />\n
          </div>\n
          </div>`);
        v10878.syncLock = v10877.widthHeightSync || false;
        v10878.createSyncLock(v10878.syncLock);
        return v10878.target;
      }, v10875.prototype.createSyncLock = function (v10879) {
        var v10880 = this;
        v10880.lockTarget = v10880.syncLock ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`) : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
        v10880.lockTarget.click(function () {
          if (v10880.syncLock) {
            v10880.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
          } else {
            v10880.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
          }
          v10880.syncLock = !v10880.syncLock;
        });
        v10880.target.find("input:first").after(v10880.lockTarget);
        // 同步编辑...
        v10880.target.find("input:first").change(function () {
          if (v10880.syncLock) {
            v10880.target.find("input:last").val($(this).val());
          }
        });
        v10880.target.find("input:last").change(function () {
          if (v10880.syncLock) {
            v10880.target.find("input:first").val($(this).val());
          }
        });
        return v10880.lockTarget;
      }, v10875.prototype.css = function (v10881) {
        if (v10881 && v10881.length && this.target) {
          // 仅当前元素被选中才更新宽高大小, 以避免冲突
          if (('block' == v10881.find('.resize-panel').css('display') || v10881[0].className.includes('table')) && this.el == v10881) {
            var v10882 = this.getValue();
            return v10881.css("width", v10882.width + "pt").css("height", v10882.height + "pt");
          }
        }
        return null;
      }, v10875.prototype.getValue = function () {
        var v10883 = {
          widthHeightSync: this.syncLock,
          width: 0,
          height: 0
        };
        v10883.width = parseFloat(this.target.find("input:first").val() || 0);
        v10883.height = parseFloat(this.target.find("input:last").val() || 0);
        return v10883;
      }, v10875.prototype.setValue = function (v10884, el) {
        this.el = el.designTarget || el;
        this.target.find("input:first").val(v10884.width);
        this.target.find("input:last").val(v10884.height);
      }, v10875.prototype.destroy = function () {
        this.target.remove();
      }, v10875;
    }(),
    v10885 = function () {
      function v10886() {
        this.name = "src";
      }

      return v10886.prototype.createTarget = function (v10887) {
        this.el = v10887;
        var v10888 = void 0,v10889 = this;
        this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('图片地址')}\n        </div>\n        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n        <input type="text" placeholder="${i18n.__('请输入图片地址')}" class="auto-submit" style="width:70%">\n    <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__('选择')}</button>        </div>\n    </div>`);
        if (v10887 && (v10888 = v10887.getOnImageChooseClick()), v10888) {
          this.target.find('button').click(function () {
            v10888 && v10888(v10889);
          });
        }
        return this.target;
      }, v10886.prototype.getValue = function () {
        var v10890 = this.target.find("input").val();
        if (v10890) return v10890.toString();
      }, v10886.prototype.setValue = function (v10891) {
        this.target.find("input").val(v10891);
      }, v10886.prototype.refresh = function (v10892, opt, cb) {
        var that = this;
        this.setValue(v10892), this.target.find("input").change();
        if (this.el && opt) {
          var img = new Image();
          img.src = v10892;
          if (img.complete) {
            that.updateEl(img.width, img.height, opt, cb);
          } else {
            img.onload = function () {
              that.updateEl(img.width, img.height, opt, cb);
            };
          }
        }
      }, v10886.prototype.updateEl = function (width, height, opt, cb) {
        if (opt) {
          var ratio, v10893, v10894;
          if (opt && opt.auto) {
            if (width >= height) {
              opt.width = true;
            } else {
              opt.height = true;
            }
          }
          if (opt.width) {
            ratio = height / width;
            v10893 = this.el.options.width;
            v10894 = Math.floor(v10893 * ratio * 10) / 10;
            this.el.options.height = v10894;
            this.el.designTarget.css('height', v10894 + "pt");
          } else if (opt.height) {
            ratio = width / height;
            v10894 = this.el.options.height;
            v10893 = Math.floor(v10894 * ratio * 10) / 10;
            this.el.options.width = v10893;
            this.el.designTarget.css('width', v10893 + "pt");
          } else if (opt.real) {
            v10893 = hinnn.px.toPt(width);
            v10894 = hinnn.px.toPt(height);
            this.el.options.width = v10893;
            this.el.options.height = v10894;
            this.el.designTarget.css('width', v10893 + "pt");
            this.el.designTarget.css('height', v10894 + "pt");
          }
          this.el.designTarget.children('.resize-panel').trigger($.Event('click'));
        }
        cb && cb(this.el, width, height);
      }, v10886.prototype.destroy = function () {
        this.target.remove();
      }, v10886;
    }(),
    imageFit = function () {
      function v10895() {
        this.name = "fit";
      }

      return v10895.prototype.css = function (v10896, v10897) {
        if (v10896 && v10896.length) {
          if (v10897) return v10896.find("img").css("object-fit", v10897), "object-fit:" + v10897;
          v10896.find("img")[0].style['object-fit'] = "";
        }
        return null;
      }, v10895.prototype.createTarget = function () {
        this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('图片缩放')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="contain" >${i18n.__('等比')}</option>\n        <option value="cover" >${i18n.__('剪裁')}</option>\n        <option value="fill" >${i18n.__('填充')}</option>\n        <option value="none" >${i18n.__('原始尺寸')}</option>\n                </select>\n        </div>\n    </div>`), this.target;
        return this.target;
      }, v10895.prototype.getValue = function () {
        return this.target.find("select").val();
      }, v10895.prototype.setValue = function (v10898) {
        this.target.find("select").val(v10898);
      }, v10895.prototype.destroy = function () {
        this.target.remove();
      }, v10895;
    }(),
    v10899 = function () {
      function v10900() {
        this.name = "borderColor";
      }

      return v10900.prototype.css = function (v10901, v10902) {
        if (v10901 && v10901.length) {
          if (v10902) return v10901.css("border-color", v10902), "border-color:" + v10902;
          v10901[0].style.borderColor = "";
        }

        return null;
      }, v10900.prototype.createTarget = function (v10903) {
        var name = ['hline', 'vline', 'rect', 'oval'].includes(v10903.printElementType.type) ? `${i18n.__('颜色')}` : `${i18n.__('边框颜色')}`;
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>`), this.target;
      }, v10900.prototype.getValue = function () {
        var v10904 = this.target.find("input").val();
        if (v10904) return v10904.toString();
      }, v10900.prototype.setValue = function (v10905) {
        this.target.find("input").minicolors({
          defaultValue: v10905 || "",
          theme: "bootstrap"
        }), this.target.find("input").val(v10905);
      }, v10900.prototype.destroy = function () {
        this.target.remove();
      }, v10900;
    }(),
    watermarkOptions = function () {
      function v10906() {
        this.name = "watermarkOptions";
      }
      return v10906.prototype.createTarget = function () {
        this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('水印功能')}</div></div>`);
        this.content = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('水印内容')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('水印内容')}" class="auto-submit"></div>`);
        this.fillStyle = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;margin-top: 4px"><div style="width:25%">${i18n.__('字体颜色')}:</div><input style="width:110%" data-format="rgb" data-opacity="0.3" type="text" placeholder="${i18n.__('字体颜色')}" class="auto-submit"></div>`);
        this.fontSize = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('字体大小')}:</div><input style="width:75%" type="range" min="10" max="80" placeholder="${i18n.__('字体大小')}" class="auto-submit"></div>`);
        this.rotate = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('旋转角度')}:</div><input style="width:75%" type="range" min="0" max="180" placeholder="${i18n.__('旋转角度')}" class="auto-submit"></div>`);
        this.width = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('水平密度')}:</div><input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__('水平密度')}" class="auto-submit"></div>`);
        this.height = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('垂直密度')}:</div><input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__('垂直密度')}" class="auto-submit"></div>`);
        this.timestamp = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('水印时间')}:</div><input style="width:18px;height:18px;margin:0 0 4px 0;" type="checkbox" placeholder="${i18n.__('水印时间')}" class="auto-submit"></div>`);
        let formatlist = [
        "YYYY-MM-DD HH:mm:ss",
        "YYYY-MM-DD HH:mm",
        "YYYY-MM-DD HH",
        "YYYY-MM-DD",
        "YYYY-MMMM",
        "YYYY-MM",
        "YYYY"];

        let timeFormatList = `\n            <option value="" >${i18n.__('默认')}(YYYY-MM-DD HH:mm)</option>`;
        formatlist.forEach(function (v10907) {
          timeFormatList += '\n            <option value="' + v10907 + '">' + v10907 + '</option>';
        });
        this.format = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('时间格式')}:</div><select style="width:75%" class="auto-submit"></select></div>`);
        this.format.find(".auto-submit").append($(timeFormatList));
        this.target.append(this.content);
        this.target.append(this.fillStyle);
        this.target.append(this.fontSize);
        this.target.append(this.rotate);
        this.target.append(this.width);
        this.target.append(this.height);
        this.target.append(this.timestamp);
        this.target.append(this.format);
        return this.target;
      }, v10906.prototype.getValue = function () {
        let opt = {
          content: this.content.find('input').val(),
          fillStyle: this.fillStyle.find('input').val() || "rgba(184, 184, 184, 0.3)",
          fontSize: parseInt(this.fontSize.find('input').val() || "14") + "px",
          rotate: parseInt(this.rotate.find('input').val() || "25"),
          width: parseInt(this.width.find('input').val() || "200"),
          height: parseInt(this.height.find('input').val() || "200"),
          timestamp: this.timestamp.find('input').is(':checked'),
          format: this.format.find('select').val() == "" ? "YYYY-MM-DD HH:mm" : this.format.find('select').val()
        };
        let options = Object.assign({}, this.options, opt);
        return options;
      }, v10906.prototype.setValue = function (v10908) {
        this.options = v10908;
        this.content.find("input").val(v10908.content || "");
        this.fillStyle.find("input").val(v10908.fillStyle || "rgba(184, 184, 184, 0.3)");
        this.fillStyle.find("input").minicolors({
          format: "rgb",
          opacity: true,
          theme: "bootstrap"
        });
        const fontSize = parseInt(v10908.fontSize || "14");
        this.fontSize.find("input").val(fontSize);
        this.rotate.find("input").val(v10908.rotate || 25);
        this.width.find("input").val(v10908.width || 200);
        this.height.find("input").val(v10908.height || 200);
        this.timestamp.find("input").attr("checked", v10908.timestamp == void 0 ? false : v10908.timestamp);
        this.format.find("select").val(v10908.format || "YYYY-MM-DD HH:mm");
      }, v10906.prototype.destroy = function () {
        this.target.remove();
      }, v10906;
    }(),
    v10909 = function () {
      function v10910() {
        this.name = "paperNumberFormat";
      }

      return v10910.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('页码格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="\${paperNo}-\${paperCount}" class="auto-submit">\n        </div>\n    </div>`), this.target;
      }, v10910.prototype.getValue = function () {
        var v10911 = this.target.find("input").val();
        if (v10911) return v10911.toString();
      }, v10910.prototype.setValue = function (v10912) {
        this.target.find("input").val(v10912);
      }, v10910.prototype.destroy = function () {
        this.target.remove();
      }, v10910;
    }(),
    v10913 = function () {
      function v10914() {
        this.name = "paperNumberDisabled";
      }

      return v10914.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('显示页码')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('显示')}</option>\n        <option value="true" >${i18n.__('隐藏')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10914.prototype.getValue = function () {
        if ("true" == this.target.find("select").val()) return !0;
      }, v10914.prototype.setValue = function (v10915) {
        this.target.find("select").val((null == v10915 ? "" : v10915).toString());
      }, v10914.prototype.destroy = function () {
        this.target.remove();
      }, v10914;
    }(),
    paperNumberContinue = function () {
      function v10916() {
        this.name = "paperNumberContinue";
      }

      return v10916.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('页码续排')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="true" >${i18n.__('续排')}</option>\n        <option value="reset" >${i18n.__('重排')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10916.prototype.getValue = function () {
        return "true" == this.target.find("select").val();
      }, v10916.prototype.setValue = function (v10917) {
        this.target.find("select").val((v10917 == void 0 || v10917 ? "true" : "reset").toString());
      }, v10916.prototype.destroy = function () {
        this.target.remove();
      }, v10916;
    }(),
    v10918 = function () {
      function v10919() {
        this.name = "longTextIndent";
      }

      return v10919.prototype.css = function (v10920, v10921) {
        return null;
      }, v10919.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('每行缩进')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10919.prototype.getValue = function () {
        var v10922 = this.target.find("select").val();
        if (v10922) return parseFloat(v10922.toString());
      }, v10919.prototype.setValue = function (v10923) {
        v10923 && (this.target.find('option[value="' + v10923 + '"]').length || this.target.find("select").prepend('<option value="' + v10923 + '" >' + v10923 + "</option>"));
        this.target.find("select").val(v10923);
      }, v10919.prototype.destroy = function () {
        this.target.remove();
      }, v10919;
    }(),
    v10924 = function () {
      function v10925() {
        this.name = "showInPage";
      }

      return v10925.prototype.css = function (v10926, v10927) {
        if (v10926 && v10926.length) {
          if (v10927 && 'none' == v10927) return v10926.addClass('alwaysHide');
          v10926.removeClass('alwaysHide');
        }
        return null;
      }, v10925.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('显示规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="none" >${i18n.__('始终隐藏')}</option>\n            <option value="first" >${i18n.__('首页')}</option>\n            <option value="odd" >${i18n.__('奇数页')}</option>\n            <option value="even" >${i18n.__('偶数页')}</option>\n            <option value="last" >${i18n.__('尾页')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10925.prototype.getValue = function () {
        var v10928 = this.target.find("select").val();
        if (v10928) return v10928.toString();
      }, v10925.prototype.setValue = function (v10929) {
        this.target.find("select").val(v10929);
      }, v10925.prototype.destroy = function () {
        this.target.remove();
      }, v10925;
    }(),
    pageBreak = function () {
      function v10930() {
        this.name = "pageBreak";
      }

      return v10930.prototype.css = function (v10931, v10932) {
        if (v10931 && v10931.length) {
          if (v10932 && 'none' == v10932) return v10931.addClass('alwaysHide');
          v10931.removeClass('alwaysHide');
        }
        return null;
      }, v10930.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('强制分页')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="true" >${i18n.__('是')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10930.prototype.getValue = function () {
        if ("true" == this.target.find("select").val()) return !0;
      }, v10930.prototype.setValue = function (v10933) {
        this.target.find("select").val((null == v10933 ? "" : v10933).toString());
      }, v10930.prototype.destroy = function () {
        this.target.remove();
      }, v10930;
    }(),
    v10934 = function () {
      function v10935() {
        this.name = "panelPaperRule";
      }

      return v10935.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('打印规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="odd" >${i18n.__('保持奇数')}</option>\n            <option value="even" >${i18n.__('保持偶数')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10935.prototype.getValue = function () {
        var v10936 = this.target.find("select").val();
        if (v10936) return v10936.toString();
      }, v10935.prototype.setValue = function (v10937) {
        this.target.find("select").val(v10937);
      }, v10935.prototype.destroy = function () {
        this.target.remove();
      }, v10935;
    }(),
    M2 = function () {
      function v10938() {
        this.name = "panelPageRule";
      }

      return v10938.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分页规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="none" >${i18n.__('不分页')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10938.prototype.getValue = function () {
        var v10939 = this.target.find("select").val();
        if (v10939) return v10939.toString();
      }, v10938.prototype.setValue = function (v10940) {
        this.target.find("select").val(v10940);
      }, v10938.prototype.destroy = function () {
        this.target.remove();
      }, v10938;
    }(),
    v10941 = function () {
      function v10942() {
        this.name = "leftSpaceRemoved";
      }

      return v10942.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('移除段落左侧空白')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="true" >${i18n.__('移除')}</option>\n            <option value="false" >${i18n.__('不移除')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10942.prototype.getValue = function () {
        if ("false" == this.target.find("select").val()) return !1;
      }, v10942.prototype.setValue = function (v10943) {
        this.target.find("select").val((null == v10943 ? "" : v10943).toString());
      }, v10942.prototype.destroy = function () {
        this.target.remove();
      }, v10942;
    }(),
    v10944 = function () {
      function v10945() {
        this.name = "firstPaperFooter";
      }

      return v10945.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('首页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('首页页尾')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
      }, v10945.prototype.getValue = function () {
        var v10946 = this.target.find("input").val();
        if (v10946) return parseFloat(v10946.toString());
      }, v10945.prototype.setValue = function (v10947) {
        this.target.find("input").val(v10947);
      }, v10945.prototype.destroy = function () {
        this.target.remove();
      }, v10945;
    }(),
    v10948 = function () {
      function v10949() {
        this.name = "lastPaperFooter";
      }

      return v10949.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('尾页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('尾页页尾')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
      }, v10949.prototype.getValue = function () {
        var v10950 = this.target.find("input").val();
        if (v10950) return parseFloat(v10950.toString());
      }, v10949.prototype.setValue = function (v10951) {
        this.target.find("input").val(v10951);
      }, v10949.prototype.destroy = function () {
        this.target.remove();
      }, v10949;
    }(),
    v10952 = function () {
      function v10953() {
        this.name = "evenPaperFooter";
      }

      return v10953.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('偶数页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偶数页页尾')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
      }, v10953.prototype.getValue = function () {
        var v10954 = this.target.find("input").val();
        if (v10954) return parseFloat(v10954.toString());
      }, v10953.prototype.setValue = function (v10955) {
        this.target.find("input").val(v10955);
      }, v10953.prototype.destroy = function () {
        this.target.remove();
      }, v10953;
    }(),
    v10956 = function () {
      function v10957() {
        this.name = "oddPaperFooter";
      }

      return v10957.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('奇数页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('奇数页页尾')}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
      }, v10957.prototype.getValue = function () {
        var v10958 = this.target.find("input").val();
        if (v10958) return parseFloat(v10958.toString());
      }, v10957.prototype.setValue = function (v10959) {
        this.target.find("input").val(v10959);
      }, v10957.prototype.destroy = function () {
        this.target.remove();
      }, v10957;
    }(),
    v10960 = function () {
      function v10961() {
        this.name = "fixed";
      }

      return v10961.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('位置固定')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="false" >${i18n.__('否')}</option>\n            <option value="true" >${i18n.__('是')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10961.prototype.getValue = function () {
        if ("true" == this.target.find("select").val()) return !0;
      }, v10961.prototype.setValue = function (v10962) {
        this.target.find("select").val((null == v10962 ? "" : v10962).toString());
      }, v10961.prototype.destroy = function () {
        this.target.remove();
      }, v10961;
    }(),
    v10963 = function () {
      function v10964() {
        this.name = "axis";
      }

      return v10964.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('拖动方向')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="h" >${i18n.__('横向')}</option>\n        <option value="v" >${i18n.__('竖向')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10964.prototype.getValue = function () {
        var v10965 = this.target.find("select").val();
        return v10965 || void 0;
      }, v10964.prototype.setValue = function (v10966) {
        this.target.find("select").val(v10966);
      }, v10964.prototype.destroy = function () {
        this.target.remove();
      }, v10964;
    }(),
    v10967 = function () {
      function v10968() {
        this.name = "leftOffset";
      }

      return v10968.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左偏移')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit" >\n        </div>\n    </div>`), this.target;
      }, v10968.prototype.getValue = function () {
        var v10969 = this.target.find("input").val();
        if (v10969) return parseFloat(v10969.toString());
      }, v10968.prototype.setValue = function (v10970) {
        this.target.find("input").val(v10970);
      }, v10968.prototype.destroy = function () {
        this.target.remove();
      }, v10968;
    }(),
    v10971 = function () {
      function v10972() {
        this.name = "lHeight";
      }

      return v10972.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('最低高度')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('文本过短或为空时的高度')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
      }, v10972.prototype.getValue = function () {
        var v10973 = this.target.find("input").val();
        if (v10973) return parseFloat(v10973.toString());
      }, v10972.prototype.setValue = function (v10974) {
        this.target.find("input").val(v10974);
      }, v10972.prototype.destroy = function () {
        this.target.remove();
      }, v10972;
    }(),
    v10975 = function () {
      function v10976() {
        this.name = "unShowInPage";
      }

      return v10976.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('隐藏规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="first" >${i18n.__('首页')}</option>\n            <option value="last" >${i18n.__('尾页')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10976.prototype.getValue = function () {
        var v10977 = this.target.find("select").val();
        if (v10977) return v10977;
      }, v10976.prototype.setValue = function (v10978) {
        this.target.find("select").val(v10978);
      }, v10976.prototype.destroy = function () {
        this.target.remove();
      }, v10976;
    }(),
    v10979 = function () {
      function v10980() {
        this.name = "tableBodyRowBorder";
      }

      return v10980.prototype.css = function (v10981, v10982) {
        if (v10981.find("tbody tr").length) {
          if ("border" == v10982 || void 0 == v10982) return v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-all");
          "noBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-none") : "leftBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-left") : "rightBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-right") : "leftRightBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-lr") : "topBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-top") : "bottomBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-bottom") : "topBottomBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-tb") : v10981.find("tbody tr").removeClass();
        }

        return null;
      }, v10980.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表体行边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>    \n        <option value="border" >${i18n.__('有边框')}</option>\n        <option value="noBorder" >${i18n.__('无边框')}</option>\n        <option value="leftBorder" >${i18n.__('左边框')}</option>\n        <option value="rightBorder" >${i18n.__('右边框')}</option>\n        <option value="leftRightBorder" >${i18n.__('左右边框')}</option>\n        <option value="topBorder" >${i18n.__('上边框')}</option>\n        <option value="bottomBorder" >${i18n.__('下边框')}</option>\n        <option value="topBottomBorder" >${i18n.__('上下边框')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v10980.prototype.getValue = function () {
        var v10983 = this.target.find("select").val();
        if (v10983) return v10983.toString();
      }, v10980.prototype.setValue = function (v10984) {
        this.target.find("select").val(v10984);
      }, v10980.prototype.destroy = function () {
        this.target.remove();
      }, v10980;
    }(),
    v10985 = function () {
      function v10986() {
        this.name = "transform";
      }

      return v10986.prototype.css = function (v10987, v10988) {
        if (v10987 && v10987.length) {
          var v10989 = v10987.find(".hiprint-printElement-content").parent(".hiprint-printElement");
          if (!v10989.length) {
            v10989 = v10987;
          }
          if (v10988) return v10989.css("transform", "rotate(" + v10988 + "deg)"), v10989.css("-ms-transform", "rotate(" + v10988 + "deg)"), v10989.css("-moz-transform", "rotate(" + v10988 + "deg)"), v10989.css("-webkit-transform", "rotate(" + v10988 + "deg)"), v10989.css("-o-transform", "rotate(" + v10988 + "deg)"), "transform:rotate(" + v10988 + "deg)";
          v10989.length && (v10989[0].style.transform = "");
        }

        return null;
      }, v10986.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('旋转角度')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v10986.prototype.getValue = function () {
        var v10990 = this.target.find("input").val();
        if (v10990) return parseFloat(v10990.toString());
      }, v10986.prototype.setValue = function (v10991) {
        this.target.find("input").val(v10991);
      }, v10986.prototype.destroy = function () {
        this.target.remove();
      }, v10986;
    }(),
    zIndex = function () {
      function v10992() {
        this.name = "zIndex";
      }

      return v10992.prototype.css = function (v10993, v10994) {
        if (v10993 && v10993.length) {
          if (v10994) return v10993.css('z-index', v10994);
        }
        return null;
      }, v10992.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('元素层级')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v10992.prototype.getValue = function () {
        var v10995 = this.target.find("input").val();
        if (v10995) return parseInt(v10995.toString());
      }, v10992.prototype.setValue = function (v10996) {
        this.target.find("input").val(v10996);
      }, v10992.prototype.destroy = function () {
        this.target.remove();
      }, v10992;
    }(),
    borderRadius = function () {
      function v10997() {
        this.name = "borderRadius";
      }

      return v10997.prototype.css = function (v10998, v10999) {
        if (v10998 && v10998.length) {
          if (v10999) return v10998.css('border-raduis', v10999);
        }
        return null;
      }, v10997.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('边框圆角')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v10997.prototype.getValue = function () {
        var v11000 = this.target.find("input").val();
        if (v11000) return v11000;
      }, v10997.prototype.setValue = function (v11001) {
        this.target.find("input").val(v11001);
      }, v10997.prototype.destroy = function () {
        this.target.remove();
      }, v10997;
    }(),
    v11002 = function () {
      function v11003() {
        this.name = "optionsGroup";
      }

      return v11003.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('边框设置')}\n        </div>\n       \n    </div>`), this.target;
      }, v11003.prototype.getValue = function () {
      }, v11003.prototype.setValue = function (v11004) {
      }, v11003.prototype.destroy = function () {
        this.target.remove();
      }, v11003;
    }(),
    v11005 = function () {
      function v11006() {
        this.name = "borderTop";
      }

      return v11006.prototype.css = function (v11007, v11008) {
        if (v11007 && v11007.length) {
          if (v11008) return v11007.css("border-top-style", v11008), "border-top:1px";
          v11007[0].style.borderTopStyle = "", v11007[0].style.borderTopWidth = "";
        }

        return null;
      }, v11006.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('上边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >${i18n.__('否')}</option>\n            <option value="solid" >${i18n.__('实线')}</option>\n            <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11006.prototype.getValue = function () {
        var v11009 = this.target.find("select").val();
        if (v11009) return v11009;
      }, v11006.prototype.setValue = function (v11010) {
        this.target.find("select").val(v11010);
      }, v11006.prototype.destroy = function () {
        this.target.remove();
      }, v11006;
    }(),
    v11011 = function () {
      function v11012() {
        this.name = "borderLeft";
      }

      return v11012.prototype.css = function (v11013, v11014) {
        if (v11013 && v11013.length) {
          if (v11014) return v11013.css("border-left-style", v11014), "border-left:1px";
          v11013[0].style.borderLeftStyle = "", v11013[0].style.borderLeftWidth = "";
        }

        return null;
      }, v11012.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('否')}</option>\n        <option value="solid" >${i18n.__('实线')}</option>\n        <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11012.prototype.getValue = function () {
        var v11015 = this.target.find("select").val();
        if (v11015) return v11015;
      }, v11012.prototype.setValue = function (v11016) {
        this.target.find("select").val(v11016);
      }, v11012.prototype.destroy = function () {
        this.target.remove();
      }, v11012;
    }(),
    v11017 = function () {
      function v11018() {
        this.name = "borderRight";
      }

      return v11018.prototype.css = function (v11019, v11020) {
        if (v11019 && v11019.length) {
          if (v11020) return v11019.css("border-right-style", v11020), "border-right:1px";
          v11019[0].style.borderRightStyle = "", v11019[0].style.borderRightWidth = "";
        }

        return null;
      }, v11018.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('右边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('否')}</option>\n        <option value="solid" >${i18n.__('实线')}</option>\n        <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11018.prototype.getValue = function () {
        var v11021 = this.target.find("select").val();
        if (v11021) return v11021;
      }, v11018.prototype.setValue = function (v11022) {
        this.target.find("select").val(v11022);
      }, v11018.prototype.destroy = function () {
        this.target.remove();
      }, v11018;
    }(),
    v11023 = function () {
      function v11024() {
        this.name = "borderBottom";
      }

      return v11024.prototype.css = function (v11025, v11026) {
        if (v11025 && v11025.length) {
          if (v11026) return v11025.css("border-bottom-style", v11026), "border-bottom-style:1px solid";
          v11025[0].style.borderBottomStyle = "", v11025[0].style.borderBottomWidth = "";
        }

        return null;
      }, v11024.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('下边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('否')}</option>\n        <option value="solid" >${i18n.__('实线')}</option>\n        <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11024.prototype.getValue = function () {
        var v11027 = this.target.find("select").val();
        if (v11027) return v11027;
      }, v11024.prototype.setValue = function (v11028) {
        this.target.find("select").val(v11028);
      }, v11024.prototype.destroy = function () {
        this.target.remove();
      }, v11024;
    }(),
    v11029 = function () {
      function v11030() {
        this.name = "contentPaddingLeft";
      }

      return v11030.prototype.css = function (v11031, v11032) {
        var v11033 = v11031.find(".hiprint-printElement-content");

        if (v11033 && v11033.length) {
          if (v11032) return v11033.css("padding-left", v11032 + "pt"), "padding-left";
          v11033[0].style.paddingLeft = "";
        }

        return null;
      }, v11030.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11030.prototype.getValue = function () {
        var v11034 = this.target.find("select").val();
        if (v11034) return parseFloat(v11034.toString());
      }, v11030.prototype.setValue = function (v11035) {
        v11035 && (this.target.find('option[value="' + v11035 + '"]').length || this.target.find("select").prepend('<option value="' + v11035 + '" >' + v11035 + "</option>"));
        this.target.find("select").val(v11035);
      }, v11030.prototype.destroy = function () {
        this.target.remove();
      }, v11030;
    }(),
    v11036 = function () {
      function v11037() {
        this.name = "contentPaddingTop";
      }

      return v11037.prototype.css = function (v11038, v11039) {
        var v11040 = v11038.find(".hiprint-printElement-content");

        if (v11040 && v11040.length) {
          if (v11039) return v11040.css("padding-top", v11039 + "pt"), "padding-top";
          v11040[0].style.paddingTop = "";
        }

        return null;
      }, v11037.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('上内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11037.prototype.getValue = function () {
        var v11041 = this.target.find("select").val();
        if (v11041) return parseFloat(v11041.toString());
      }, v11037.prototype.setValue = function (v11042) {
        v11042 && (this.target.find('option[value="' + v11042 + '"]').length || this.target.find("select").prepend('<option value="' + v11042 + '" >' + v11042 + "</option>"));
        this.target.find("select").val(v11042);
      }, v11037.prototype.destroy = function () {
        this.target.remove();
      }, v11037;
    }(),
    v11043 = function () {
      function v11044() {
        this.name = "contentPaddingRight";
      }

      return v11044.prototype.css = function (v11045, v11046) {
        var v11047 = v11045.find(".hiprint-printElement-content");

        if (v11047 && v11047.length) {
          if (v11046) return v11047.css("padding-right", v11046 + "pt"), "padding-right";
          v11047[0].style.paddingRight = "";
        }

        return null;
      }, v11044.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('右内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11044.prototype.getValue = function () {
        var v11048 = this.target.find("select").val();
        if (v11048) return parseFloat(v11048.toString());
      }, v11044.prototype.setValue = function (v11049) {
        v11049 && (this.target.find('option[value="' + v11049 + '"]').length || this.target.find("select").prepend('<option value="' + v11049 + '" >' + v11049 + "</option>"));
        this.target.find("select").val(v11049);
      }, v11044.prototype.destroy = function () {
        this.target.remove();
      }, v11044;
    }(),
    tt = function () {
      function v11050() {
        this.name = "contentPaddingBottom";
      }

      return v11050.prototype.css = function (v11051, v11052) {
        var v11053 = v11051.find(".hiprint-printElement-content");

        if (v11053 && v11053.length) {
          if (v11052) return v11053.css("padding-bottom", v11052 + "pt"), "padding-bottom";
          v11053[0].style.paddingBottom = "";
        }

        return null;
      }, v11050.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('下内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11050.prototype.getValue = function () {
        var v11054 = this.target.find("select").val();
        if (v11054) return parseFloat(v11054.toString());
      }, v11050.prototype.setValue = function (v11055) {
        v11055 && (this.target.find('option[value="' + v11055 + '"]').length || this.target.find("select").prepend('<option value="' + v11055 + '" >' + v11055 + "</option>"));
        this.target.find("select").val(v11055);
      }, v11050.prototype.destroy = function () {
        this.target.remove();
      }, v11050;
    }(),
    et = function () {
      function v11056() {
        this.name = "borderStyle";
      }

      return v11056.prototype.css = function (v11057, v11058) {
        if (v11057 && v11057.length) {
          if (v11058) return v11057.css("border-style", v11058), "border-style:1px";
          v11057[0].style.borderStyle = "";
        }

        return null;
      }, v11056.prototype.createTarget = function (v11059) {
        var name = ['hline', 'vline', 'rect', 'oval'].includes(v11059.printElementType.type) ? `${i18n.__('样式')}` : `${i18n.__('边框样式')}`;
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n       ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="solid" >${i18n.__('实线')}</option>\n            <option value="dashed" >${i18n.__('长虚线')}</option>\n            <option value="dotted" >${i18n.__('短虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11056.prototype.getValue = function () {
        var v11060 = this.target.find("select").val();
        if (v11060) return v11060;
      }, v11056.prototype.setValue = function (v11061) {
        this.target.find("select").val(v11061);
      }, v11056.prototype.destroy = function () {
        this.target.remove();
      }, v11056;
    }(),
    nt = function () {
      function v11062() {
        this.name = "backgroundColor";
      }

      return v11062.prototype.css = function (v11063, v11064) {
        if (v11063 && v11063.length) {
          if (v11064) return v11063.css("background-color", v11064), "background-color:" + v11064;
          v11063[0].style.backgroundColor = "";
        }

        return null;
      }, v11062.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('背景颜色')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v11062.prototype.getValue = function () {
        var v11065 = this.target.find("input").val();
        if (v11065) return v11065.toString();
      }, v11062.prototype.setValue = function (v11066) {
        this.target.find("input").minicolors({
          defaultValue: v11066 || "",
          theme: "bootstrap"
        }), this.target.find("input").val(v11066);
      }, v11062.prototype.destroy = function () {
        this.target.remove();
      }, v11062;
    }(),
    barColor = function () {
      function v11067() {
        this.name = "barColor";
      }

      return v11067.prototype.css = function (v11068, v11069) {
        if (v11068 && v11068.length) {


          // if (e) return t.css("background-color", e), "background-color:" + e;
          // t[0].style.backgroundColor = "";
        }return null;}, v11067.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('条码颜色')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v11067.prototype.getValue = function () {
        var v11070 = this.target.find("input").val();
        if (v11070) return v11070.toString();
      }, v11067.prototype.setValue = function (v11071) {
        this.target.find("input").minicolors({
          defaultValue: v11071 || "",
          theme: "bootstrap"
        }), this.target.find("input").val(v11071);
      }, v11067.prototype.destroy = function () {
        this.target.remove();
      }, v11067;
    }(),

    it = function () {
      function v11072() {
        this.name = "orient";
      }

      return v11072.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('纸张方向(仅自定义纸质有效)')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1" >${i18n.__('纵向')}</option>\n        <option value="2" >${i18n.__('横向')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11072.prototype.getValue = function () {
        var v11073 = this.target.find("select").val();
        if (v11073) return parseFloat(v11073.toString());
      }, v11072.prototype.setValue = function (v11074) {
        this.target.find("select").val(v11074);
      }, v11072.prototype.destroy = function () {
        this.target.remove();
      }, v11072;
    }(),
    ot = function () {
      function v11075() {
        this.name = "textContentVerticalAlign";
      }

      return v11075.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('上下对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="middle" >${i18n.__('垂直居中')}</option>\n        <option value="bottom" >${i18n.__('底部')}</option>\n       \n        </select>\n        </div>\n    </div>`), this.target;
      }, v11075.prototype.css = function (v11076, v11077) {
        if (v11076 && v11076.length) {
          v11076.removeClass("hiprint-text-content-middle"), v11076.removeClass("hiprint-text-content-bottom");
          if (v11077) return "middle" === v11077 && v11076.addClass("hiprint-text-content-middle"), "bottom" === v11077 && v11076.addClass("hiprint-text-content-bottom"), "";
        }

        return null;
      }, v11075.prototype.getValue = function () {
        var v11078 = this.target.find("select").val();
        if (v11078) return v11078.toString();
      }, v11075.prototype.setValue = function (v11079) {
        this.target.find("select").val(v11079);
      }, v11075.prototype.destroy = function () {
        this.target.remove();
      }, v11075;
    }(),
    textWrap = function () {
      function v11080() {
        this.name = "textContentWrap";
      }

      return v11080.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('文本换行')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="nowrap" >${i18n.__('不换行')}</option>\n        <option value="clip" >${i18n.__('不换行&隐藏')}</option>\n        <option value="ellipsis" >${i18n.__('不换行&省略')}</option>\n       </select>\n        </div>\n    </div>`), this.target;
      }, v11080.prototype.css = function (v11081, v11082) {
        if (v11081 && v11081.length) {
          v11081.removeClass("hiprint-text-content-wrap");
          v11081.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-nowrap");
          v11081.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-clip");
          v11081.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-ellipsis");
          if (v11082) return v11081.addClass("hiprint-text-content-wrap"), v11081.find(".hiprint-printElement-text-content").addClass("hiprint-text-content-wrap-" + v11082), "";
        }

        return null;
      }, v11080.prototype.getValue = function () {
        var v11083 = this.target.find("select").val();
        if (v11083) return v11083.toString();
      }, v11080.prototype.setValue = function (v11084) {
        this.target.find("select").val(v11084);
      }, v11080.prototype.destroy = function () {
        this.target.remove();
      }, v11080;
    }(),
    rt = v10695(5),
    at = function () {
      function v11085() {
        this.name = "columns";
      }

      return v11085.prototype.createTarget = function () {
        $('<div class="indicator"></div>').appendTo("body");
        return " </ul>\n       </div>\n    </div>", this.target = $(' <div class="hiprint-option-item hiprint-option-item-row">\n       <div>\n            <ul class="hiprint-option-table-selected-columns"> </ul>\n       </div>\n    </div>'), this.target;
      }, v11085.prototype.getValue = function () {
        return this.buildData();
      }, v11085.prototype.setValue = function (v11086, v11087, v11088) {
        var v11089 = this,
          v11090 = this;
        this.value = v11086, this.options = v11087, this.printElementType = v11088;
        var v11091 = v11088.columns[0].filter(function (v11092) {
          return 0 == v11086[0].columns.filter(function (v11093) {
            return v11092.columnId == v11093.columnId;
          }).length;
        }).map(function (v11094) {
          var v11095 = new rt.a(v11094);
          return v11095.checked = !1, v11095;
        });
        this.allColumns = v11086[0].columns.concat(v11091), v11086 && 1 == v11086.length && (this.target.find("ul").html(this.allColumns.map(function (v11097, v11098) {
          return '<li  class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">\n                ' + (v11097.checked ? '<input type="checkbox"   checked column-id="' + (v11097.id || v11097.columnId) + '" />' : '<input type="checkbox"  column-id="' + (v11097.id || v11097.columnId) + '" />') + '\n                <div class="state">\n                    <label></label>\n                </div>\n            </div><span class="column-title">' + (v11097.title || v11097.descTitle || "") + "</span></li>";
        }).join("")), this.target.find("input").change(function (v11099) {
          var checked = v11099.target.checked,id = v11099.target.attributes['column-id'].nodeValue || '';
          var idx = v11089.allColumns.findIndex(function (v11100) {
            return v11100.field == id || v11100.id == id;
          });
          if (idx >= 0) {
            v11089.allColumns[idx]['checked'] = checked;
          }
          v11089.submit();
        }), this.printElementType.columnDisplayIndexEditable && this.target.find("li").hidraggable({
          revert: !0,
          handle: ".column-title",
          moveUnit: "pt",
          deltaX: 0,
          deltaY: 0
        }).hidroppable({
          onDragOver: function onDragOver(v11101, v11102) {
            $(this).css("border-top-color", "red");
          },
          onDragLeave: function onDragLeave(v11103, v11104) {
            $(this).css("border-top-color", "");
          },
          onDrop: function onDrop(v11105, v11106) {
            $(v11106).insertBefore(this), $(this).css("border-top-color", ""), v11090.submit();
          }
        }));
      }, v11085.prototype.buildData = function () {
        var v11107 = this,v11108 = [];
        if (v11107.options.columns.length > 1) {
          return this.value;
        }
        v11107.printElementType.makeColumnObj(v11107.allColumns);
        this.target.find("input").map(function (v11109, v11110) {
          var v11111 = $(v11110).attr("column-id");
          var v11112 = v11107.printElementType.getColumnByColumnId(v11111);
          if (v11112) {
            var v11113 = new rt.a(v11112);
            v11113.checked = v11112.checked, v11108.push(v11113);
          }
        });
        return this.value[0].columns = v11108, this.value;
      }, v11085.prototype.destroy = function () {
        this.target.remove();
      }, v11085;
    }(),
    pt = function () {
      function v11115() {
        this.name = "textType";
      }

      return v11115.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('打印类型')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="" >${i18n.__('文本')}</option>\n        <option value="barcode" >${i18n.__('条形码')}</option>\n        <option value="qrcode" >${i18n.__('二维码')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11115.prototype.getValue = function () {
        var v11116 = this.target.find("select").val();
        if (v11116) return v11116;
      }, v11115.prototype.setValue = function (v11117) {
        this.target.find("select").val(v11117);
      }, v11115.prototype.destroy = function () {
        this.target.remove();
      }, v11115;
    }(),
    tablept = function () {
      function v11118() {
        this.name = "tableTextType";
      }

      return v11118.prototype.createTarget = function () {
        return this.target = $(
          `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字段类型')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认(文本)')}</option>\n        <option value="text" >${i18n.__('文本')}</option>\n <option value="sequence" >${i18n.__('序号')}</option>\n       <option value="barcode" >${i18n.__('条形码')}</option>\n        <option value="qrcode" >${i18n.__('二维码')}</option>\n    <option value="image" >${i18n.__('图片')}</option>\n        </select>\n        </div>\n    </div>`
        ), this.target;
      }, v11118.prototype.getValue = function () {
        var v11119 = this.target.find("select").val();
        if (v11119) return v11119;
      }, v11118.prototype.setValue = function (v11120) {
        this.target.find("select").val(v11120);
      }, v11118.prototype.destroy = function () {
        this.target.remove();
      }, v11118;
    }(),
    tableE = function () {
      function v11121() {
        this.name = "tableBarcodeMode";
      }

      return v11121.prototype.createTarget = function () {
        return this.target = $(
          `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('条形码格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n         <option value="" >${i18n.__('默认')}(CODE128A)</option>\n         <option value="CODE128A" >CODE128A</option>\n        <option value="CODE128B" >CODE128B</option>\n        <option value="CODE128C" >CODE128C</option>\n        <option value="CODE39" >CODE39</option>\n        <option value="EAN-13" >EAN-13</option>\n        <option value="EAN-8" >EAN-8</option>\n        <option value="EAN-5" >EAN-5</option>\n        <option value="EAN-2" >EAN-2</option>\n        <option value="UPC（A）" >UPC（A）</option>\n        <option value="ITF" >ITF</option>\n        <option value="ITF-14" >ITF-14</option>\n        <option value="MSI" >MSI</option>\n            <option value="MSI10" >MSI10</option>\n            <option value="MSI11" >MSI11</option>\n            <option value="MSI1010" >MSI1010</option>\n            <option value="MSI1110" >MSI1110</option>\n            <option value="Pharmacode" >Pharmacode</option>\n        </select>\n        </div>\n    </div>`
        ), this.target;
      }, v11121.prototype.getValue = function () {
        var v11122 = this.target.find("select").val();
        return v11122 || void 0;
      }, v11121.prototype.setValue = function (v11123) {
        this.target.find("select").val(v11123);
      }, v11121.prototype.destroy = function () {
        this.target.remove();
      }, v11121;
    }(),
    tableQRCodeLevel = function () {
      function v11124() {
        this.name = "tableQRCodeLevel";
      }

      return v11124.prototype.createTarget = function () {
        return this.target = $(
          `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('二维码容错率')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1" >7% L</option>\n        <option value="0" >15% M</option>\n        <option value="3" >25% Q</option>\n        <option value="2" >30% H</option>\n        </select>\n        </div>\n    </div>`
        ), this.target;
      }, v11124.prototype.getValue = function () {
        var v11125 = this.target.find("select").val();
        return parseInt(v11125 || 0);
      }, v11124.prototype.setValue = function (v11126) {
        this.target.find("select").val(v11126);
      }, v11124.prototype.destroy = function () {
        this.target.remove();
      }, v11124;
    }(),
    tableColumnH = function () {
      function v11127() {
        this.name = "tableColumnHeight";
      }

      return v11127.prototype.createTarget = function () {
        return this.target = $(
          `<div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格高度')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('条形码、二维码以及图片有效')}" class="auto-submit" >\n        </div>\n    </div>`
        ), this.target;
      }, v11127.prototype.getValue = function () {
        var v11128 = this.target.find("input").val();
        if (v11128) return v11128.toString();
      }, v11127.prototype.setValue = function (v11129) {
        this.target.find("input").val(v11129);
      }, v11127.prototype.destroy = function () {
        this.target.remove();
      }, v11127;
    }(),
    tableSummaryTitle = function () {
      function v11130() {
        this.name = "tableSummaryTitle";
      }

      return v11130.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合标题')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="true">${i18n.__('显示')}</option><option value="false">${i18n.__('隐藏')}</option></select></div></div>`), this.target;
      }, v11130.prototype.getValue = function () {
        return !("false" == this.target.find("select").val());
      }, v11130.prototype.setValue = function (v11131) {
        this.target.find("select").val((null == v11131 ? "" : v11131).toString());
      }, v11130.prototype.destroy = function () {
        this.target.remove();
      }, v11130;
    }(),
    tableSummaryText = function () {
      function v11132() {
        this.name = "tableSummaryText";
      }

      return v11132.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合文本')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('聚合类型')}:" class="auto-submit" >\n        </div>\n    </div>`), this.target;
      }, v11132.prototype.getValue = function () {
        var v11133 = this.target.find("input").val();
        if (v11133) return v11133.toString();
      }, v11132.prototype.setValue = function (v11134) {
        this.target.find("input").val(v11134);
      }, v11132.prototype.destroy = function () {
        this.target.remove();
      }, v11132;
    }(),
    tableSummaryColspan = function () {
      function v11135() {
        this.name = "tableSummaryColspan";
      }

      return v11135.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合合并列数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" min="0" step="1" placeholder="${i18n.__('合并列数')}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
      }, v11135.prototype.getValue = function () {
        var v11136 = this.target.find("input").val();
        if (v11136) return v11136.toString();
      }, v11135.prototype.setValue = function (v11137) {
        this.target.find("input").val(v11137);
      }, v11135.prototype.destroy = function () {
        this.target.remove();
      }, v11135;
    }(),
    tableSummaryAlign = function () {
      function v11138() {
        this.name = "tableSummaryAlign";
      }

      return v11138.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合类型左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11138.prototype.getValue = function () {
        var v11139 = this.target.find("select").val();
        if (v11139) return v11139.toString();
      }, v11138.prototype.setValue = function (v11140) {
        this.target.find("select").val(v11140);
      }, v11138.prototype.destroy = function () {
        this.target.remove();
      }, v11138;
    }(),
    tableSummaryNumFormat = function () {
      function v11141() {
        this.name = "tableSummaryNumFormat";
      }

      return v11141.prototype.createTarget = function () {
        var list = [{ t: `${i18n.__('整数')}`, v: '0' }],num = [1, 2, 3, 4, 5, 6];
        num.forEach(function (v11144) {
          list.push({ t: i18n.__n(`保留%s位`, v11144), v: '' + v11144 });
        });
        var v11147 = `\n            <option value="" >${i18n.__('默认')}</option>`;
        list.forEach(function (v11148) {
          v11147 += '\n            <option value="' + (v11148.v || "") + '">' + (v11148.t || "") + '</option>';
        });
        this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合小数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit"></select>\n        </div>\n    </div>`);
        this.target.find(".auto-submit").append($(v11147));
        return this.target;
      }, v11141.prototype.getValue = function () {
        var v11151 = this.target.find("select").val();
        if (v11151) return v11151.toString();
      }, v11141.prototype.setValue = function (v11152) {
        this.target.find("select").val(v11152);
      }, v11141.prototype.destroy = function () {
        this.target.remove();
      }, v11141;
    }(),
    showCodeTitle = function () {
      function v11153() {
        this.name = 'showCodeTitle';
      }
      return (
        v11153.prototype.createTarget = function () {
          return (
            this.target = $(
              ` <div class="hiprint-option-item" title="条形码底部是否显示内容">\n        <div class="hiprint-option-item-label">\n          ${i18n.__('显示码值')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="true" >${i18n.__('显示')}</option>\n            <option value="false" >${i18n.__('隐藏')}</option>\n        </select>\n        </div>\n    </div>`
            ),
            this.target);

        },
        v11153.prototype.getValue = function () {
          if ('true' == this.target.find('select').val()) return !0;
        },
        v11153.prototype.setValue = function (v11154) {
          this.target.find('select').val((null == v11154 ? '' : v11154).toString());
        },
        v11153.prototype.destroy = function () {
          this.target.remove();
        },
        v11153);

    }(),
    tableSummaryFormatter = function () {
      function v11155() {
        this.name = "tableSummaryFormatter";
      }
      return v11155.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(column,fieldPageData,tableData,options){ return \'<td></td>\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11155.prototype.getValue = function () {
        var v11156 = this.target.find("textarea").val();
        if (v11156) return v11156;
      }, v11155.prototype.setValue = function (v11157) {
        this.target.find("textarea").val(v11157 ? v11157.toString() : null);
      }, v11155.prototype.destroy = function () {
        this.target.remove();
      }, v11155;
    }(),

    upperCase = function () {
      function v11158() {
        this.name = "upperCase";
      }
      return v11158.prototype.createTarget = function () {
        var list = [
        { t: "「小写」十点八", v: "0" },
        { t: "「小写」一十点八", v: "1" },
        { t: "「大写」拾点捌", v: "2" },
        { t: "「大写」壹拾点捌", v: "3" },
        { t: "「金额」人民币拾元捌角", v: "4" },
        { t: "「金额」人民币壹拾元捌角", v: "5" },
        { t: "「金额」人民币壹拾元捌角零分", v: "6" },
        { t: "「金额」壹拾元捌角零分", v: "7" }];

        var v11175 = `\n<option value="">${i18n.__('默认')}</option>`;
        list.forEach((v11176) => {
          v11175 += `\n<option value='${v11176.v}'>${v11176.t}</option>`;
        });
        this.target = $(
          `<div class="hiprint-option-item hiprint-option-item-row">\n<div class="hiprint-option-item-label">\n${i18n.__('转大小写')}\n</div>\n<div class="hiprint-option-item-field">\n<select class="auto-submit"></select>\n</div>\n</div>`
        );
        this.target.find(".auto-submit").append($(v11175));
        return this.target;
      }, v11158.prototype.getValue = function () {
        var v11179 = this.target.find("select").val();
        if (v11179) return v11179.toString();
      }, v11158.prototype.setValue = function (v11180) {
        this.target.find("select").val(v11180);
      }, v11158.prototype.destroy = function () {
        this.target.remove();
      }, v11158;
    }(),

    // 表格底部合计栏
    tableSummary = function () {
      function v11181() {
        this.name = "tableSummary";
      }
      return v11181.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合类型')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('不聚合')}</option><option value="count">${i18n.__('计数')}</option><option value="sum">${i18n.__('合计')}</option><option value="avg">${i18n.__('平均值')}</option><option value="min">${i18n.__('最小值')}</option><option value="max">${i18n.__('最大值')}</option><option value="text">${i18n.__('仅文本')}</option></select></div></div>`), this.target;
      }, v11181.prototype.getValue = function () {
        return this.target.find("select").val();
      }, v11181.prototype.setValue = function (v11182) {
        this.target.find("select").val(v11182);
      }, v11181.prototype.destroy = function () {
        this.target.remove();
      }, v11181;
    }(),
    st = function () {
      function v11183() {
        this.name = "topOffset";
      }

      return v11183.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('顶部偏移')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit">\n        </div>\n    </div>`), this.target;
      }, v11183.prototype.getValue = function () {
        var v11184 = this.target.find("input").val();
        if (v11184) return parseFloat(v11184.toString());
      }, v11183.prototype.setValue = function (v11185) {
        this.target.find("input").val(v11185);
      }, v11183.prototype.destroy = function () {
        this.target.remove();
      }, v11183;
    }(),
    panelLayoutOptions = function () {
      function v11186() {
        this.name = "panelLayoutOptions";
      }
      return v11186.prototype.createTarget = function () {
        this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('面板排列')}</div></div>`);
        this.layoutType = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('排列方式')}:</div><select style="width:75%" class="auto-submit"><option value="column" >${i18n.__('纵向')}</option><option value="row" >${i18n.__('横向')}</option></select></div></div>`);
        this.layoutRowGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('垂直间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('垂直间距mm')}" class="auto-submit"></div>`);
        this.layoutColumnGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('水平间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('水平间距mm')}" class="auto-submit"></div>`);
        this.target.append(this.layoutType);
        this.target.append(this.layoutRowGap);
        this.target.append(this.layoutColumnGap);
        return this.target;
      }, v11186.prototype.getValue = function () {
        let opt = {
          layoutType: this.layoutType.find("select").val() || 'column',
          layoutRowGap: parseInt(this.layoutRowGap.find('input').val() || 0),
          layoutColumnGap: parseInt(this.layoutColumnGap.find('input').val() || 0)
        };
        let options = Object.assign({}, this.options, opt);
        return options;
      }, v11186.prototype.setValue = function (v11187) {
        this.options = v11187;
        this.layoutType.find("select").val(v11187.layoutType || 'column');
        this.layoutRowGap.find("input").val(v11187.layoutRowGap);
        this.layoutColumnGap.find("input").val(v11187.layoutColumnGap);
      }, v11186.prototype.destroy = function () {
        this.target.remove();
      }, v11186;
    }(),
    lt = function () {
      function v11188() {
        this.name = "gridColumns";
      }

      return v11188.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('一行多组')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="2" >${i18n.__('一行二列')}</option>\n        <option value="3" >${i18n.__('一行三列')}</option>\n        <option value="4" >${i18n.__('一行四列')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11188.prototype.getValue = function () {
        var v11189 = this.target.find("select").val();
        if (v11189) return parseFloat(v11189.toString());
      }, v11188.prototype.setValue = function (v11190) {
        v11190 && (this.target.find('option[value="' + v11190 + '"]').length || this.target.find("select").prepend('<option value="' + v11190 + '" >' + v11190 + "</option>"));
        this.target.find("select").val(v11190);
      }, v11188.prototype.destroy = function () {
        this.target.remove();
      }, v11188;
    }(),
    ut = function () {
      function v11191() {
        this.name = "gridColumnsGutter";
      }

      return v11191.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('一行多组间隔')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.25" >7.25pt</option>\n        <option value="8.5" >8.5pt</option>\n        <option value="9" >9pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11191.prototype.getValue = function () {
        var v11192 = this.target.find("select").val();
        if (v11192) return parseFloat(v11192.toString());
      }, v11191.prototype.css = function (v11193, v11194) {
        if (v11193 && v11193.length) {
          if (v11194) return v11193.find(".table-grid-row").css("margin-left", "-" + v11194 + "pt").css("margin-right", "-" + v11194 + "pt"), v11193.find(".tableGridColumnsGutterRow").css("padding-left", v11194 + "pt").css("padding-right", v11194 + "pt"), null;
          v11193.find(".table-grid-row").map(function (v11195, v11196) {
            v11196.style.marginLeft = "", v11196.style.marginRight = "";
          }), v11193.find(".tableGridColumnsGutterRow").map(function (v11197, v11198) {
            v11198.style.paddingLeft = "", v11198.style.paddingRight = "";
          });
        }

        return null;
      }, v11191.prototype.setValue = function (v11199) {
        v11199 && (this.target.find('option[value="' + v11199 + '"]').length || this.target.find("select").prepend('<option value="' + v11199 + '" >' + v11199 + "</option>"));
        this.target.find("select").val(v11199);
      }, v11191.prototype.destroy = function () {
        this.target.remove();
      }, v11191;
    }(),
    ith = function () {
      function v11200() {
        this.name = "tableHeaderRepeat";
      }

      return v11200.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格头显示')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="page" >${i18n.__('每页显示')}</option>\n        <option value="first" >${i18n.__('首页显示')}</option>\n        <option value="none" >${i18n.__('不显示')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11200.prototype.getValue = function () {
        var v11201 = this.target.find("select").val();
        if (v11201) return v11201.toString();
      }, v11200.prototype.setValue = function (v11202) {
        this.target.find("select").val(v11202);
      }, v11200.prototype.destroy = function () {
        this.target.remove();
      }, v11200;
    }(),
    dt = function () {
      function v11203() {
        this.name = "paddingLeft";
      }

      return v11203.prototype.css = function (v11204, v11205) {
        var v11206 = v11204;

        if (v11206 && v11206.length) {
          if (v11205) return v11206.css("padding-left", v11205 + "pt"), "padding-left";
          v11206[0].style.paddingLeft = "";
        }

        return null;
      }, v11203.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11203.prototype.getValue = function () {
        var v11207 = this.target.find("select").val();
        if (v11207) return parseFloat(v11207.toString());
      }, v11203.prototype.setValue = function (v11208) {
        v11208 && (this.target.find('option[value="' + v11208 + '"]').length || this.target.find("select").prepend('<option value="' + v11208 + '" >' + v11208 + "</option>"));
        this.target.find("select").val(v11208);
      }, v11203.prototype.destroy = function () {
        this.target.remove();
      }, v11203;
    }(),
    ct = function () {
      function v11209() {
        this.name = "paddingRight";
      }

      return v11209.prototype.css = function (v11210, v11211) {
        var v11212 = v11210;

        if (v11212 && v11212.length) {
          if (v11211) return v11212.css("padding-right", v11211 + "pt"), "padding-right";
          v11212[0].style.paddingRight = "";
        }

        return null;
      }, v11209.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('右内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11209.prototype.getValue = function () {
        var v11213 = this.target.find("select").val();
        if (v11213) return parseFloat(v11213.toString());
      }, v11209.prototype.setValue = function (v11214) {
        v11214 && (this.target.find('option[value="' + v11214 + '"]').length || this.target.find("select").prepend('<option value="' + v11214 + '" >' + v11214 + "</option>"));
        this.target.find("select").val(v11214);
      }, v11209.prototype.destroy = function () {
        this.target.remove();
      }, v11209;
    }(),
    ht = function () {
      function v11215() {
        this.name = "dataType";
      }

      return v11215.prototype.createTarget = function () {
        var v11216 = this;
        return this.target = $(`\n        <div class="hiprint-option-item-row">\n        <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('数据类型')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="hiprint-option-item-datatype">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="datetime" >${i18n.__('日期时间')}</option>\n        <option value="boolean" >${i18n.__('布尔')}</option>\n        </select>\n        </div>\n    </div>\n    <div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label ">\n        ${i18n.__('格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select  class="auto-submit hiprint-option-item-datatype-select-format">\n        <option value="" >${i18n.__('默认')}</option>\n        \n        </select>\n        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">\n        </div>\n    </div>\n        </div>\n`), $(this.target.find(".hiprint-option-item-datatype")).change(function () {
          var v11217 = $(v11216.target.find(".hiprint-option-item-datatype")).val();
          v11216.loadFormatSelectByDataType(v11217), v11216.submit(v11216.getValue());
        }), this.target;
      }, v11215.prototype.getValue = function () {
        var v11218 = this.target.find(".hiprint-option-item-datatype").val();

        if (v11218) {
          var v11219 = this.target.find(".hiprint-option-item-datatype-format").val();
          return {
            dataType: v11218,
            format: v11219 || void 0
          };
        }

        return {
          dataType: void 0,
          format: void 0
        };
      }, v11215.prototype.setValue = function (v11220, v11221) {
        this.target.find(".hiprint-option-item-datatype").val(v11221.dataType || ""), this.loadFormatSelectByDataType(v11221.dataType), this.target.find(".hiprint-option-item-datatype-format").val(v11221.format || "");
      }, v11215.prototype.destroy = function () {
        this.target.remove();
      }, v11215.prototype.loadFormatSelectByDataType = function (v11222) {
        "boolean" === v11222 ? (this.target.find(".hiprint-option-item-datatype-select-format").removeClass("hiprint-option-item-datatype-format").hide().val(""), this.target.find(".hiprint-option-item-datatype-input-format").addClass("hiprint-option-item-datatype-format").show()) : "datetime" === v11222 ? (this.target.find(".hiprint-option-item-datatype-select-format").addClass("hiprint-option-item-datatype-format").show(), this.target.find(".hiprint-option-item-datatype-input-format").removeClass("hiprint-option-item-datatype-format").hide().val(""), this.target.find(".hiprint-option-item-datatype-select-format").html(`\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="M/d" >M/d</option>\n            <option value="MM/dd" >MM/dd</option>\n            <option value="yy/M/d" >yy/M/d</option>\n            <option value="yy/MM/dd" >yy/MM/dd</option>\n            <option value="yyyy/M/d" >yyyy/M/d</option>\n            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>\n            <option value="yy/M/d H:m" >yy/M/d H:m</option>\n            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>\n            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>\n            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>\n            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>\n            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>\n            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>\n            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>\n            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>\n            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>\n            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>\n            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>\n            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>\n            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>\n            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>\n            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>\n\n            <option value="M-d" >M-d</option>\n            <option value="MM-dd" >MM-dd</option>\n            <option value="yy-M-d" >yy-M-d</option>\n            <option value="yy-MM-dd" >yy-MM-dd</option>\n            <option value="yyyy-M-d" >yyyy-M-d</option>\n            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>\n            <option value="yy-M-d H:m" >yy-M-d H:m</option>\n            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>\n            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>\n            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>\n            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>\n            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>\n            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>\n            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>\n            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>\n            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>\n            <option value="yyyy-M-d HH:mm" >yyyy-M-d HH:mm</option>\n            <option value="yyyy-M-d HH:mm:ss" >yyyy-M-d HH:mm:ss</option>\n            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>\n            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>\n            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>\n            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>\n`)) : (this.target.find(".hiprint-option-item-datatype-select-format").show(), this.target.find(".hiprint-option-item-datatype-input-format").hide().val(""), this.target.find(".hiprint-option-item-datatype-format").html(`\n            <option value="" >${i18n.__('默认')}</option>\n`));
      }, v11215;
    }(),
    ft = function () {
      function v11223() {
        this.name = "formatter";
      }

      return v11223.prototype.createTarget = function () {
        var v11224 = `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(title,value,options,templateData,target){}" class="auto-submit"></textarea>\n        </div>\n    </div>`;
        return this.target = $(v11224), this.target;
      }, v11223.prototype.getValue = function () {
        var v11225 = this.target.find("textarea").val();
        if (v11225) return v11225;
      }, v11223.prototype.setValue = function (v11226) {
        this.target.find("textarea").val(v11226 ? v11226.toString() : null);
      }, v11223.prototype.destroy = function () {
        this.target.remove();
      }, v11223;
    }(),
    gt = function () {
      function v11227() {
        this.name = "styler";
      }

      return v11227.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value, options, target,templateData){}" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11227.prototype.getValue = function () {
        var v11228 = this.target.find("textarea").val();
        if (v11228) return v11228;
      }, v11227.prototype.setValue = function (v11229) {
        this.target.find("textarea").val(v11229 ? v11229.toString() : null);
      }, v11227.prototype.destroy = function () {
        this.target.remove();
      }, v11227;
    }(),
    rowcolumns = function () {
      function v11230() {
        this.name = "rowsColumnsMerge";
      }

      return v11230.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('行/列合并函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(data, col, colIndex, rowIndex, tableData, printData){ return [1,1] }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11230.prototype.getValue = function () {
        var v11231 = this.target.find("textarea").val();
        if (v11231) return v11231;
      }, v11230.prototype.setValue = function (v11232) {
        this.target.find("textarea").val(v11232 ? v11232.toString() : null);
      }, v11230.prototype.destroy = function () {
        this.target.remove();
      }, v11230;
    }(),
    rowsColumnsMergeClean = function () {
      function v11233() {
        this.name = "rowsColumnsMergeClean";
      }

      return v11233.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('跨页合并是否清除')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="true" >${i18n.__('是')}</option>\n        <option value="false" >${i18n.__('否')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11233.prototype.getValue = function () {
        if ("true" == this.target.find("select").val()) return !0;
      }, v11233.prototype.setValue = function (v11234) {
        this.target.find("select").val((null == v11234 ? "" : v11234).toString());
      }, v11233.prototype.destroy = function () {
        this.target.remove();
      }, v11233;
    }(),
    mt = function () {
      function v11235() {
        this.name = "footerFormatter";
      }

      return v11235.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格脚函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return \'<tr></tr>\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11235.prototype.getValue = function () {
        var v11236 = this.target.find("textarea").val();
        if (v11236) return v11236;
      }, v11235.prototype.setValue = function (v11237) {
        this.target.find("textarea").val(v11237 ? v11237.toString() : null);
      }, v11235.prototype.destroy = function () {
        this.target.remove();
      }, v11235;
    }(),
    groupFieldsFormatter = function () {
      function v11238() {
        this.name = "groupFieldsFormatter";
      }

      return v11238.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分组字段函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(type,options,data){ return [] }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11238.prototype.getValue = function () {
        var v11239 = this.target.find("textarea").val();
        if (v11239) return v11239;
      }, v11238.prototype.setValue = function (v11240) {
        this.target.find("textarea").val(v11240 ? v11240.toString() : null);
      }, v11238.prototype.destroy = function () {
        this.target.remove();
      }, v11238;
    }(),
    groupFormatter = function () {
      function v11241() {
        this.name = "groupFormatter";
      }

      return v11241.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分组头格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return \'${i18n.__('分组头信息')}(html)\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11241.prototype.getValue = function () {
        var v11242 = this.target.find("textarea").val();
        if (v11242) return v11242;
      }, v11241.prototype.setValue = function (v11243) {
        this.target.find("textarea").val(v11243 ? v11243.toString() : null);
      }, v11241.prototype.destroy = function () {
        this.target.remove();
      }, v11241;
    }(),
    groupFooterFormatter = function () {
      function v11244() {
        this.name = "groupFooterFormatter";
      }

      return v11244.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分组脚格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return \'${i18n.__('分组脚信息')}(html)\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11244.prototype.getValue = function () {
        var v11245 = this.target.find("textarea").val();
        if (v11245) return v11245;
      }, v11244.prototype.setValue = function (v11246) {
        this.target.find("textarea").val(v11246 ? v11246.toString() : null);
      }, v11244.prototype.destroy = function () {
        this.target.remove();
      }, v11244;
    }(),
    vt = function () {
      function v11247() {
        this.name = "gridColumnsFooterFormatter";
      }

      return v11247.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('多组表格脚函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return \'\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11247.prototype.getValue = function () {
        var v11248 = this.target.find("textarea").val();
        if (v11248) return v11248;
      }, v11247.prototype.setValue = function (v11249) {
        this.target.find("textarea").val(v11249 ? v11249.toString() : null);
      }, v11247.prototype.destroy = function () {
        this.target.remove();
      }, v11247;
    }(),
    yt = function () {
      function v11250() {
        this.name = "rowStyler";
      }

      return v11250.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('行样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,options){ return \'\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11250.prototype.getValue = function () {
        var v11251 = this.target.find("textarea").val();
        if (v11251) return v11251;
      }, v11250.prototype.setValue = function (v11252) {
        this.target.find("textarea").val(v11252 ? v11252.toString() : null);
      }, v11250.prototype.destroy = function () {
        this.target.remove();
      }, v11250;
    }(),
    bt = function () {
      function v11253() {
        this.name = "align";
      }

      return v11253.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11253.prototype.getValue = function () {
        var v11254 = this.target.find("select").val();
        if (v11254) return v11254.toString();
      }, v11253.prototype.setValue = function (v11255) {
        this.target.find("select").val(v11255);
      }, v11253.prototype.destroy = function () {
        this.target.remove();
      }, v11253;
    }(),
    Et = function () {
      function v11256() {
        this.name = "vAlign";
      }

      return v11256.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格上下对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="top" >${i18n.__('上')}</option>\n        <option value="middle" >${i18n.__('中')}</option>\n        <option value="bottom" >${i18n.__('下')}</option>\n        \n        </select>\n        </div>\n    </div>`), this.target;
      }, v11256.prototype.getValue = function () {
        var v11257 = this.target.find("select").val();
        if (v11257) return v11257.toString();
      }, v11256.prototype.setValue = function (v11258) {
        this.target.find("select").val(v11258);
      }, v11256.prototype.destroy = function () {
        this.target.remove();
      }, v11256;
    }(),
    Tt = function () {
      function v11259() {
        this.name = "halign";
      }

      return v11259.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格头单元格左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11259.prototype.getValue = function () {
        var v11260 = this.target.find("select").val();
        if (v11260) return v11260.toString();
      }, v11259.prototype.setValue = function (v11261) {
        this.target.find("select").val(v11261);
      }, v11259.prototype.destroy = function () {
        this.target.remove();
      }, v11259;
    }(),
    Pt = function () {
      function v11262() {
        this.name = "styler2";
      }

      return v11262.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11262.prototype.getValue = function () {
        var v11263 = this.target.find("textarea").val();
        if (v11263) return v11263;
      }, v11262.prototype.setValue = function (v11264) {
        this.target.find("textarea").val(v11264 ? v11264.toString() : null);
      }, v11262.prototype.destroy = function () {
        this.target.remove();
      }, v11262;
    }(),
    stylerHeader = function () {
      function v11265() {
        this.name = "stylerHeader";
      }

      return v11265.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格头样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11265.prototype.getValue = function () {
        var v11266 = this.target.find("textarea").val();
        if (v11266) return v11266;
      }, v11265.prototype.setValue = function (v11267) {
        this.target.find("textarea").val(v11267 ? v11267.toString() : null);
      }, v11265.prototype.destroy = function () {
        this.target.remove();
      }, v11265;
    }(),
    _t = function () {
      function v11268() {
        this.name = "formatter2";
      }

      return v11268.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return \'\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11268.prototype.getValue = function () {
        var v11269 = this.target.find("textarea").val();
        if (v11269) return v11269;
      }, v11268.prototype.setValue = function (v11270) {
        this.target.find("textarea").val(v11270 ? v11270.toString() : null);
      }, v11268.prototype.destroy = function () {
        this.target.remove();
      }, v11268;
    }(),
    renderFormatter = function () {
      function v11271() {
        this.name = "renderFormatter";
      }

      return v11271.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格渲染函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,colIndex,options,rowIndex){ return \'<td></td>\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
      }, v11271.prototype.getValue = function () {
        var v11272 = this.target.find("textarea").val();
        if (v11272) return v11272;
      }, v11271.prototype.setValue = function (v11273) {
        this.target.find("textarea").val(v11273 ? v11273.toString() : null);
      }, v11271.prototype.destroy = function () {
        this.target.remove();
      }, v11271;
    }(),
    wt = function () {
      function v11274() {
        this.name = "autoCompletion";
      }

      return v11274.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('自动补全')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="true" >${i18n.__('是')}</option>\n        <option value="false" >${i18n.__('否')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11274.prototype.getValue = function () {
        if ("true" == this.target.find("select").val()) return !0;
      }, v11274.prototype.setValue = function (v11275) {
        this.target.find("select").val((null == v11275 ? "" : v11275).toString());
      }, v11274.prototype.destroy = function () {
        this.target.remove();
      }, v11274;
    }(),
    maxRows = function () {
      function v11276() {
        this.name = "maxRows";
      }

      return v11276.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('每页最大行数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" value="1" step="1" min="1" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
      }, v11276.prototype.getValue = function () {
        var v11277 = this.target.find("input").val();
        if (v11277) return parseInt(v11277.toString());
      }, v11276.prototype.setValue = function (v11278) {
        this.target.find("input").val(v11278);
      }, v11276.prototype.destroy = function () {
        this.target.remove();
      }, v11276;
    }(),
    xt = function () {
      function v11279() {
        this.name = "tableFooterRepeat";
      }

      return v11279.prototype.createTarget = function () {
        return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格脚显示')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="no" >${i18n.__('不显示')}</option>\n        <option value="page" >${i18n.__('每页显示')}</option>\n        <option value="last" >${i18n.__('最后显示')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
      }, v11279.prototype.getValue = function () {
        var v11280 = this.target.find("select").val();
        if (v11280) return v11280.toString();
      }, v11279.prototype.setValue = function (v11281) {
        this.target.find("select").val(v11281);
      }, v11279.prototype.destroy = function () {
        this.target.remove();
      }, v11279;
    }();

  v10695.d(v10694, "a", function () {
    return Ct;
  });

  var Ct = function () {
    function v11283() {
    }

    return v11283.init = function () {
      v11283.printElementOptionItems || (v11283.printElementOptionItems = {}, v11283._printElementOptionItems.forEach(function (v11284) {
        v11283.printElementOptionItems[v11284.name] = v11284;
      }));
    }, v11283.registerItem = function (v11285) {
      if (!v11285.name) throw new Error("styleItem must have name");
      v11283.init(), v11283.printElementOptionItems[v11285.name] = v11285;
    }, v11283.getItem = function (v11286) {
      return v11283.init(), v11283.printElementOptionItems[v11286];
    }, v11283._printElementOptionItems = [new fontFamily(), new v10712(), new v10718(), new v10724(), new v10696(), new v10730(), new v10736(), new pt(), new v10739(), new v10745(), new v10751(), new v10767(), new v10775(), new v10783(), new v10791(), new d2(), new c2(), new v10797(), new v10805(), new v10813(), new v10820(), new qrCodeLevel(), new v10837(), new v10843(), new v10849(), new v10857(), new v10861(), new coordinate(), new widthHeight(), new v10885(), new imageFit(), new v10899(), new v10909(), new v10913(), new paperNumberContinue(), new watermarkOptions(), new v10918(), new v10924(), new pageBreak(), new v10934(), new M2(), new v10941(), new v10944(), new v10948(), new v10952(), new v10956(), new v10960(), new v10963(), new st(), new v10967(), new v10971(), new v10975(), new v10979(), new v10985(), new borderRadius(), new zIndex(), new v11002(), new v11005(), new v11011(), new v11017(), new v11023(), new v11036(), new v11029(), new v11043(), new tt(), new et(), new nt(), new it(), new ot(), new textWrap(), new at(), new lt(), new panelLayoutOptions(), new ut(), new ith(), new dt(), new ct(), new ht(), new ft(), new gt(), new mt(), new rowcolumns(), new rowsColumnsMergeClean(), new groupFieldsFormatter(), new groupFormatter(), new groupFooterFormatter(), new vt(), new yt(), new bt(), new Tt(), new Et(), new Pt(), new stylerHeader(), new renderFormatter(), new _t(), new wt(), new maxRows(), new xt(), new tableColumnH(), new tableE(), new tableQRCodeLevel(), new tablept(), new tableSummaryTitle(), new tableSummaryText(), new tableSummaryColspan(), new tableSummary(), new tableSummaryAlign(), new tableSummaryNumFormat(), new tableSummaryFormatter(), new showCodeTitle(), new upperCase(), new barcodeType(), new qrcodeType(), new barColor(), new barWidth(), new barAutoWidth()], v11283;
  }();
}, function (v11287, v11288, v11289) {
  "use strict";

  v11289.d(v11288, "a", function () {
    return v11291;
  }), v11289.d(v11288, "b", function () {
    return v11293;
  });

  var v11294 = v11289(14),
    v11291 = function () {
      function v11297(v11295, v11296) {
        this.selectedCells = [], this.rows = v11295, this.tableTatget = v11296;
      }

      return v11297.prototype.clear = function () {
        this.tableTatget.find("td").removeClass("selected");
      }, v11297.prototype.setSingleSelect = function (v11298) {
        this.startCell = v11298, this.selectedCells = [];
      }, v11297.prototype.getSingleSelect = function () {
        if (this.selectedCells.length) {
          if (1 == this.selectedCells.length) return 1 == this.selectedCells[0].length ? this.selectedCells[0][0] : void 0;
          if (this.selectedCells.length > 1) return;
        }

        return this.startCell;
      }, v11297.prototype.singleSelectByXY = function (v11299, v11300) {
        var v11301 = this.getCellByXY(v11299, v11300);
        v11301 && (this.clear(), v11301 && (v11301.cell.select(), this.startCell = v11301, this.selectedCells = []));
      }, v11297.prototype.multipleSelectByXY = function (v11302, v11303) {
        this.clear();
        var v11304 = [];

        if (this.startCell) {
          var v11305 = this.getCellByXY(v11302, v11303);

          if (v11305) {
            var v11306 = v11294.a.mergeRect(this.startCell.cell.getTableRect(), v11305.cell.getTableRect());
            this.selectByRect(new v11307(v11306), v11304);
          }
        }

        this.selectedCells = v11304;
      }, v11297.prototype.selectByRect = function (v11308, v11309) {
        this.rows.forEach(function (v11310, v11311) {
          var v11312 = [];
          v11310.columns.forEach(function (v11313) {
            v11313.isInRect(v11308) && (v11312.push(new v11314(v11311, v11313)), v11313.select());
          }), v11312.length && v11309.push(v11312);
        }), v11308.changed && (v11308.changed = !1, v11309.splice(0, v11309.length), this.selectByRect(v11308, v11309));
      }, v11297.prototype.getSelectedCells = function () {
        return this.selectedCells;
      }, v11297.prototype.getCellByXY = function (v11315, v11316) {
        var v11317;
        return this.rows.forEach(function (v11318, v11319) {
          var v11320 = (v11318.columns || []).filter(function (column) {return column.checked;}).filter(function (v11321) {
            return v11321.isXYinCell(v11315, v11316);
          });
          v11320.length && (v11317 = new v11314(v11319, v11320[0]));
        }), v11317;
      }, v11297;
    }(),
    v11293 = function () {
      return function (v11322) {
        this.x = v11322.x, this.y = v11322.y, this.height = v11322.height, this.width = v11322.width;
      };
    }(),
    v11307 = function () {
      return function (v11327) {
        this.rect = v11327;
      };
    }(),
    v11314 = function () {
      return function (v11328, v11329) {
        this.rowIndex = v11328, this.cell = v11329;
      };
    }();
}, function (v11330, v11331, v11332) {
  "use strict";

  v11332.d(v11331, "a", function () {
    return v11334;
  });

  var v11334 = function () {
    function v11335() {
    }

    return v11335.createId = function () {
      return this.id += 1, this.id;
    }, v11335.id = 1, v11335;
  }();
}, function (v11336, v11337, v11338) {
  "use strict";

  v11338.d(v11337, "a", function () {
    return v11340;
  });

  var _i,
    v11341 = v11338(5),
    v11342 = v11338(13),
    v11343 = (_i = function v11344(v11345, v11346) {
      return (_i = Object.setPrototypeOf || _instanceof({
        __proto__: []
      }, Array) && function (v11347, v11348) {
        v11347.__proto__ = v11348;
      } || function (v11349, v11350) {
        for (var v11351 in v11350) {
          v11350.hasOwnProperty(v11351) && (v11349[v11351] = v11350[v11351]);
        }
      })(v11345, v11346);
    }, function (v11352, v11353) {
      function v11354() {
        this.constructor = v11352;
      }

      _i(v11352, v11353), v11352.prototype = null === v11353 ? Object.create(v11353) : (v11354.prototype = v11353.prototype, new v11354());
    }),
    v11340 = function (v11355) {
      function v11362(v11356) {
        var v11357 = v11355.call(this) || this;
        (v11357.columns = [], v11356 && v11356.constructor === Array) ? (v11356 || []).forEach(function (v11358) {
          v11357.columns.push(new v11341.a(v11358));
        }) : v11356.columns && (v11356.columns || []).forEach(function (v11360) {
          v11357.columns.push(new v11341.a(v11360));
        });
        return v11357;
      }

      return v11343(v11362, v11355), v11362.prototype.getPrintElementOptionEntity = function () {
        var v11363 = [];
        var all = this.allColumns ? this.allColumns.filter(function (v11364) {return !v11364.checked;}) : [];
        return [...this.columns, ...all].forEach(function (v11365) {
          v11363.push(v11365.getEntity());
        }), v11363;
      }, v11362;
    }(v11342.a);
}, function (v11367, v11368, v11369) {
  "use strict";

  v11369.d(v11368, "a", function () {
    return v11371;
  });

  var v11372 = v11369(11),
    v11373 = v11369(5),
    v11371 = function () {
      function v11374() {
        this.id = v11372.a.createId();
      }

      return v11374.prototype.init = function (v11376, v11377, v11378) {
        this.isHead = v11378, this.target = v11377 || $("<tr></tr>"), this.tableOptions = v11376,
        this.allColumns = this.columns || [],
        this.initCells((this.columns || []).filter(function (column) {return column.checked;}));
      }, v11374.prototype.getTarget = function () {
        return this.target;
      }, v11374.prototype.initCells = function (v11379) {
        var v11380 = this;
        v11379 ? (this.columns = v11379, v11379.forEach(function (v11381, v11382) {
          v11381.init(v11380.target.find("td:eq(" + v11382 + ")"), v11380.tableOptions, v11380.id, v11380.isHead);
        })) : (this.columns = [], this.target.find("td").map(function (v11383, v11384) {
          var v11385 = new v11373.a();
          v11385.init($(v11384), v11380.tableOptions, v11380.id, v11380.isHead), v11380.columns.push(v11385);
        }));
      }, v11374.prototype.removeCell = function (v11387) {
        var v11388 = this.columns.indexOf(v11387);
        this.columns[v11388].getTarget().remove(), this.columns.splice(v11388, 1);
      }, v11374.prototype.createTableCell = function (v11389, v11390) {
        var v11391 = new v11373.a();
        return v11391.init($("<td></td>"), this.tableOptions, this.id, this.isHead), v11389 > 1 && (v11391.getTarget().attr("rowspan", v11389), v11391.rowspan = v11389), v11390 > 1 && (v11391.getTarget().attr("colspan", v11390), v11391.colspan = v11390), v11391;
      }, v11374.prototype.insertToTargetCellLeft = function (v11393, v11394) {
        var v11395 = this.columns.indexOf(v11393);
        v11393.getTarget().before(v11394.getTarget()), this.columns.splice(v11395, 0, v11394);
      }, v11374.prototype.insertToTargetCellRight = function (v11396, v11397) {
        var v11398 = this.columns.indexOf(v11396);
        this.columns[v11398].getTarget().after(v11397.getTarget()), this.columns.splice(v11398 + 1, 0, v11397);
      }, v11374.prototype.insertCellToFirst = function (v11399) {
        this.target.prepend(v11399.getTarget()), this.columns.splice(0, 0, v11399);
      }, v11374.prototype.insertCellToLast = function (v11400) {
        this.columns.push(v11400), this.target.append(v11400.getTarget());
      }, v11374.prototype.getPrintElementOptionEntity = function () {
        var v11401 = [];
        return [...this.columns, ...this.allColumns.filter(function (v11402) {return !v11402.checked;})].forEach(function (v11403) {
          v11401.push(v11403.getEntity());
        }), v11401;
      }, v11374;
    }();
}, function (v11404, v11405, v11406) {
  "use strict";

  v11406.d(v11405, "a", function () {
    return v11408;
  });

  var v11409 = v11406(10),
    v11408 = function () {
      function v11410() {
      }

      return v11410.mergeRect = function (v11411, v11412) {
        var v11413 = Math.min(v11411.x, v11412.x),
          v11416 = Math.min(v11411.y, v11412.y);
        return new v11409.b({
          x: v11413,
          y: v11416,
          height: Math.max(v11411.y + v11411.height, v11412.y + v11412.height) - v11416,
          width: Math.max(v11411.x + v11411.width, v11412.x + v11412.width) - v11413
        });
      }, v11410.Rect = function (v11426, v11427, v11428, v11429) {
        return {
          minX: v11426 < v11428 ? v11426 : v11428,
          minY: v11427 < v11429 ? v11427 : v11429,
          maxX: v11426 < v11428 ? v11428 : v11426,
          maxY: v11427 < v11429 ? v11429 : v11427
        };
      }, v11410;
    }();
}, function (module, __webpack_exports__, __webpack_require__) {
  "use strict";

  __webpack_require__.d(__webpack_exports__, "a", function () {
    return TablePrintElement;
  });

  var _BasePrintElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8),
    _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18),
    _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7),
    _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16),
    _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2),
    __extends = (_extendStatics = function extendStatics(v11431, v11432) {
      return (_extendStatics = Object.setPrototypeOf || _instanceof({
        __proto__: []
      }, Array) && function (v11433, v11434) {
        v11433.__proto__ = v11434;
      } || function (v11435, v11436) {
        for (var v11437 in v11436) {
          v11436.hasOwnProperty(v11437) && (v11435[v11437] = v11436[v11437]);
        }
      })(v11431, v11432);
    }, function (v11438, v11439) {
      function v11440() {
        this.constructor = v11438;
      }

      _extendStatics(v11438, v11439), v11438.prototype = null === v11439 ? Object.create(v11439) : (v11440.prototype = v11439.prototype, new v11440());
    }),
    _extendStatics,
    TablePrintElement = function (_super) {
      function TablePrintElement(v11441, v11442) {
        var v11443 = _super.call(this, v11441) || this;
        return v11443.gridColumnsFooterCss = "hiprint-gridColumnsFooter", v11443.tableGridRowCss = "table-grid-row", v11443.options = new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(v11442, v11443.printElementType), v11443.options.setDefault(new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(_HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table.default).getPrintElementOptionEntity()), v11443;
      }

      return __extends(TablePrintElement, _super), TablePrintElement.prototype.getColumns = function () {
        return this.options.columns;
      }, TablePrintElement.prototype.getColumnByColumnId = function (v11447) {
        return this.options.getColumnByColumnId(v11447);
      }, TablePrintElement.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v11448 = this.designTarget.find(".hiprint-printElement-table-content"),
            v11449 = this.getHtml(this.designPaper);
          v11448.html(""), v11448.append(v11449[0].target.find(".table-grid-row")), this.printElementType.editable && this.setHitable(), this.setColumnsOptions();
          // 渲染完再处理样式 ==> fix 表脚边框参数设置问题
          this.css(this.designTarget, this.getData());
        }
      }, TablePrintElement.prototype.css = function (v11450, v11451) {
        if ((this.getField() || !this.options.content) && !this.printElementType.formatter) return _super.prototype.css.call(this, v11450, v11451);
      }, TablePrintElement.prototype.getDesignTarget = function (v11452) {
        return this.designTarget = this.getHtml(v11452)[0].target, this.css(this.designTarget, this.getData()), this.designPaper = v11452, this.designTarget.find("td").hidroppable({
          accept: ".rn-draggable-item",
          onDrop: function onDrop(v11453, v11454) {
          },
          onDragEnter: function onDragEnter(v11455, v11456) {
            $(v11456).removeClass("rn-draggable-item");
          },
          onDragLeave: function onDragLeave(v11457, v11458) {
            $(v11458).addClass("rn-draggable-item");
          }
        }), this.designTarget;
      }, TablePrintElement.prototype.getConfigOptions = function () {
        return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table;
      }, TablePrintElement.prototype.createTarget = function (v11460, v11461, v11462) {
        for (var v11463 = $('<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>'), v11464 = this.createGridColumnsStructure(v11462), v11465 = 0; v11465 < v11464.gridColumns; v11465++) {
          v11464.getByIndex(v11465).append(this.getTableHtml(v11461, v11462));
        }

        return v11463.find(".hiprint-printElement-table-content").append(v11464.target), v11463;
      }, TablePrintElement.prototype.createGridColumnsStructure = function (v11466) {
        for (var v11467 = $('<div class="hi-grid-row table-grid-row"></div>'), v11468 = 0; v11468 < this.options.getGridColumns(); v11468++) {
          var v11469 = $('<div class="tableGridColumnsGutterRow hi-grid-col" style="width:' + 100 / this.options.getGridColumns() + '%;"></div>');
          v11467.append(v11469);
        }

        var v11470 = this.getGridColumnsFooterFormatter();

        if (v11470) {
          var v11471 = $('<div class="hiprint-gridColumnsFooter"></div>');
          v11471.append(v11470(this.options, this.getData(v11466), v11466, [])), v11467.append(v11471);
        }

        return new _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__.a(this.options.getGridColumns(), v11467);
      }, TablePrintElement.prototype.createtempEmptyRowsTargetStructure = function (v11473) {
        if (this.getField()) return this.createTarget(this.printElementType.title, []);
        var v11474 = this.createTarget(this.printElementType.title, []).clone();
        return v11474.find(".hiprint-printElement-tableTarget tbody tr").remove(), v11474;
      }, TablePrintElement.prototype.getTableHtml = function (v11475, v11476) {
        var v11477, v11478;
        if (!this.getField() && this.options.content) return (v11477 = $("<div></div>")).append(this.options.content), (v11478 = v11477.find("table")).addClass("hiprint-printElement-tableTarget"), v11478;
        if (this.printElementType.formatter) return (v11477 = $("<div></div>")).append(this.printElementType.formatter(v11475)), (v11478 = v11477.find("table")).addClass("hiprint-printElement-tableTarget"), v11478;
        var v11479 = $('<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;"></table>');
        let headerList = _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableHead(this.getColumns(), this.options.getWidth() / this.options.getGridColumns());
        return this.isNotDesign ? v11479.append(headerList) : v11479.append(headerList[0]), v11479.append(_table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableRow(this.getColumns(), v11475, v11476, this.options, this.printElementType)), "no" == this.options.tableFooterRepeat || _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableFooter(this.printElementType.columns, v11475, this.options, this.printElementType, v11476, v11475).insertBefore(v11479.find("tbody")), v11479;
      }, TablePrintElement.prototype.getEmptyRowTarget = function () {
        return _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createEmptyRowTarget(this.getColumns(), this);
      }, TablePrintElement.prototype.getHtml = function (v11484, v11485) {
        this.createTempContainer();
        this.isNotDesign = v11485 != void 0;
        var v11486 = this.getPaperHtmlResult(v11484, v11485);
        return this.removeTempContainer(), v11486;
      }, TablePrintElement.prototype.getPaperHtmlResult = function (v11487, v11488) {
        var v11489 = [],
          v11490 = this.getData(v11488),
          v11491 = this.getTableHtml(v11490, v11488),
          v11492 = this.createtempEmptyRowsTargetStructure(v11488);
        v11488 ? this.updateTargetWidth(v11492) : this.updateTargetSize(v11492), this.css(v11492, v11490), this.css(v11491, v11490), this.getTempContainer().html(""), this.getTempContainer().append(v11492);
        // 页脚导致 分页高度的问题, -> 获取到表格脚高度后移除避免重复
        var tfh = v11492.find('tfoot').outerHeight() || 0;
        v11492.find('tfoot').remove();
        for (var v11493, v11494 = this.getBeginPrintTopInPaperByReferenceElement(v11487), v11495 = 0, v11496 = !1; !v11496;) {
          var v11497 = 0,
            v11498 = v11487.getPaperFooter(v11495);
          0 == v11495 && v11494 > v11498 && "none" != v11487.panelPageRule && (v11494 = v11494 - v11498 + v11487.paperHeader, v11489.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
            target: void 0,
            printLine: void 0
          })), v11497 = v11487.getContentHeight(v11495) - (v11494 - v11487.paperHeader), v11495++, v11498 = v11487.getPaperFooter(v11495));
          var v11500 = v11489.length > 0 ? v11489[v11489.length - 1].target : void 0,
            v11501 = this.getRowsInSpecificHeight(v11488, v11497 > 0 ? v11497 : 0 == v11495 ? v11498 - v11494 : v11487.getContentHeight(v11495), v11492, v11491, v11495, v11500, tfh);
          v11496 = v11501.isEnd;
          if (v11497 < 0) {
            v11489[0].target = $(`<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__('没有足够空间进行表格分页，请调整页眉/页脚线')}</div>`);
            v11489[0].printLine = v11494;
            v11489[0].referenceElement = new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
              top: this.options.getTop(),
              left: this.options.getLeft(),
              height: this.options.getHeight(),
              width: this.options.getWidth(),
              beginPrintPaperIndex: v11487.index,
              bottomInLastPaper: v11494 + this.options.lHeight,
              printTopInPaper: v11494
            });
            v11489[0].target.css("top", v11494 + "pt");
            v11489[0].target.css("left", this.options.displayLeft());
            break;
          }
          var v11503 = void 0;
          v11501.target && (v11501.target.css("left", this.options.displayLeft()), v11501.target[0].height = "");
          if (0 == v11495 || v11497 > 0) {
            v11501.target && (v11493 = v11494, v11501.target.css("top", v11494 + "pt")),
            v11503 = v11496 && null != this.options.lHeight ? v11494 + (v11501.height > this.options.lHeight ? v11501.height : this.options.lHeight) : v11494 + v11501.height;
          } else {
            v11501.target && (v11493 = v11487.paperHeader, v11501.target.css("top", v11487.paperHeader + "pt")), v11503 = v11487.paperHeader + v11501.height;
          }
          v11489.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
            target: v11501.target,
            printLine: v11503,
            referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
              top: this.options.getTop(),
              left: this.options.getLeft(),
              height: this.options.getHeight(),
              width: this.options.getWidth(),
              beginPrintPaperIndex: v11487.index,
              bottomInLastPaper: v11503,
              printTopInPaper: v11493
            })
          })), v11495++;
          v11488 && this.updatePanelHeight(v11503 + this.options.getHeight(), v11487);
        }

        return v11489;
      }, TablePrintElement.prototype.getRowsInSpecificHeight = function (v11506, v11507, v11508, v11509, v11510, v11511, tfh) {
        var that = this;
        var v11512 = v11509.find("tbody"),
          v11513 = _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.pt.toPx(v11507);

        v11508.find(".hiprint-printElement-tableTarget tbody").html("");
        // 不是最后显示页脚
        if ("last" != this.options.tableFooterRepeat) {
          v11508.find(".hiprint-printElement-tableTarget tfoot").remove();
        }
        // 仅首页显示表头
        if ("first" == this.options.tableHeaderRepeat && v11510 > 0) {
          v11508.find(".hiprint-printElement-tableTarget thead").remove();
        } else if ("none" == this.options.tableHeaderRepeat) {
          // 有数据（不是design）
          if (v11506) {
            v11508.find(".hiprint-printElement-tableTarget thead").remove();
          } else {
            v11508.find(".hiprint-printElement-tableTarget thead").css("background", "firebrick");
            v11508.find(".hiprint-printElement-tableTarget thead tr").css("background", "firebrick");
          }
        }
        var noPaging = "none" == this.panel.panelPageRule;
        // 不分页, 且不是设计时, 移除 thead
        var headTr;
        if (v11506 && noPaging) {
          var headStyle = v11508.find(".hiprint-printElement-tableTarget thead").attr("style");
          headTr = v11508.find(".hiprint-printElement-tableTarget thead tr").clone();
          if (headStyle) {
            headTr.attr("style", headStyle);
          } else {
            headTr.css({ "background": "#e8e8e8" });
          }
          v11508.find(".hiprint-printElement-tableTarget thead").remove();
        }
        var v11515 = v11508.outerHeight();
        if (!noPaging && v11515 > v11513) return {
          target: void 0,
          length: 0,
          height: 0,
          isEnd: !1
        };
        var getGridColumns = this.options.getGridColumns();
        for (var v11516 = [], v11517 = 0; v11517 < getGridColumns; v11517++) {
          for (var v11518 = v11508.find(".hiprint-printElement-tableTarget:eq(" + v11517 + ")"), v11519 = void 0, v11520 = [];;) {
            // 不分页处理
            if (noPaging) {
              var trLen = v11512.find("tr").length;
              if (0 == trLen) v11519 = {
                height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
                isEnd: !0
              }, v11506 && this.options.autoCompletion && (this.autoCompletion(v11513, v11518, tfh), v11515 = v11508.outerHeight());else {
                var v11522 = v11512.find("tr:lt(1)");
                if (v11520.length == 0 && headTr) {
                  v11518.find("tbody").append(headTr);
                }
                v11518.find("tbody").append(v11522);
                var v11523 = v11522.data("rowData");
                v11516.push(v11523), v11520.push(v11523), v11515 = v11508.outerHeight();
                0 == trLen && (v11512.prepend(v11522), v11516.pop(), v11520.pop(), v11519 = {
                  height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
                  isEnd: !1
                });
              }
            } else {
              if (v11515 <= v11513) if (0 == v11512.find("tr").length) v11519 = {
                height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
                isEnd: !0
              }, v11506 && this.options.autoCompletion && (this.autoCompletion(v11513, v11518, tfh), v11515 = v11518.outerHeight());else {
                var v11522 = v11512.find("tr:lt(1)");
                if (that.options.rowsColumnsMerge && (v11510 > 0 || v11517 > 0) && v11520.length == 0) {
                  v11522 = that.fixMergeSpan(v11522, v11512);
                }
                v11518.find("tbody").append(v11522);
                var v11523 = v11522.data("rowData");
                v11516.push(v11523), v11520.push(v11523), ((v11515 = v11518.outerHeight(), "last" == this.options.tableFooterRepeat ? v11515 : v11515 += tfh) > v11513 || this.options.maxRows && v11520.length > +this.options.maxRows) && (v11512.prepend(v11522), v11516.pop(), v11520.pop(), v11515 = v11518.outerHeight(), v11519 = {
                  height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
                  isEnd: !1
                });
              }
            }

            if (v11519) {
              // 这里是table 没有tfoot, 后面再看什么原因...
              if ("last" == this.options.tableFooterRepeat && !v11519.isEnd) break;
              if ("no" !== this.options.tableFooterRepeat) {
                if (noPaging) {
                  v11518.find("tbody").append(_table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableFooter(this.printElementType.columns, this.getData(v11506), this.options, this.printElementType, v11506, v11520).children());
                } else {
                  _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableFooter(this.printElementType.columns, this.getData(v11506), this.options, this.printElementType, v11506, v11520).insertBefore(v11518.find("tbody"));
                }
                that.css(v11518, v11506);
              }
              break;
            }
          }
        }

        var v11529 = v11508.find(".hiprint-printElement-tableTarget tbody tr").length,
          v11530 = this.getGridColumnsFooterFormatter();
        v11530 && v11508.find(this.gridColumnsFooterCss).html(v11530(this.options, this.getData(v11506), v11506, v11516));
        v11515 = v11508.outerHeight();
        // 当每一页数据,都无法容纳表格行内容时:
        let curRow = v11512.find("tr:lt(1)");
        if (v11529 == 0 && curRow.length && v11523 == curRow.data("rowData")) {
          v11518.find("tbody").append(curRow);
          let height = v11518.find("tbody tr").outerHeight();
          v11512.prepend(curRow);
          return {
            target: $(`<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__('没有足够空间,显示下方内容, 可分页高度')}: ` + v11513 + `px < ${i18n.__('当前需要高度')}: ` + height + 'px</div>').append(curRow.css("background", "blue")),
            length: v11529,
            height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
            isEnd: !1
          };
        }
        // 方便调试看 值...
        var zz = 0 == v11512.find("tr").length ? 0 == v11529 && v11511 ? {
          target: void 0,
          length: 0,
          height: 0,
          isEnd: !0
        } : {
          target: v11508.clone(),
          length: v11529,
          height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
          isEnd: !0
        } : {
          target: v11508.clone(),
          length: v11529,
          height: _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(v11515),
          isEnd: !1
        };
        return zz;
      }, TablePrintElement.prototype.fixMergeSpan = function (tr, tbody) {
        const nextRowMap = new Map();
        tr.children().each((v11534, td) => {
          var field = $(td).attr('field');
          nextRowMap.set(field, {
            rowSpan: 1,
            rowEnd: false
          });
          tr.nextAll().each((v11535, nextTr) => {
            if ($(nextTr).has(`td[field=${field}][rowspan=0]`).length && !nextRowMap.get(field).rowEnd) {
              nextRowMap.set(field, { rowSpan: ++nextRowMap.get(field).rowSpan, rowEnd: false });
            } else {
              nextRowMap.set(field, { ...nextRowMap.get(field), rowEnd: true });
            }
          });

          if ($(td).attr("rowspan") < 1) {
            $(td).attr("rowspan", nextRowMap.get(field).rowSpan);
            $(td).css("display", "");
            if (this.options.rowsColumnsMergeClean) {
              $(td).text("");
            }
          }
        });
        return tr;
      }, TablePrintElement.prototype.autoCompletion = function (v11536, v11537, tfh) {
        var that = this;
        for (var v11538, v11539 = this.getEmptyRowTarget(), v11540 = v11537.outerHeight() + tfh; v11536 > v11540;) {
          v11538 = v11539.clone(), v11537.find("tbody").append(v11538), v11540 = v11537.outerHeight() + tfh;
          if (that.options.maxRows && v11537.find("tbody").children().length > that.options.maxRows) {
            break;
          }
        }

        v11538 && v11538.remove();
      }, TablePrintElement.prototype.getData = function (v11541) {
        if (!v11541) {
          // 设计时表格 测试数据
          try {
            let testData = this.options.testData || '[{}]';
            return JSON.parse(testData);
          } catch (v11542) {
            console.log('table testData parse error', v11542);
            return [{}];
          }
        };
        var v11543 = this.getField();
        var v11544 = v11543 ? v11543.split('.').reduce((v11545, v11546) => v11545 ? v11545[v11546] : v11541 ? v11541[v11546] : "", !1) || "" : "";
        return v11544 ? JSON.parse(JSON.stringify(v11544)) : [];
      }, TablePrintElement.prototype.onResize = function (v11547, v11548, v11549, v11550, v11551) {
        _super.prototype.updateSizeAndPositionOptions.call(this, v11551, v11550, v11549, v11548), _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.resizeTableCellWidth(this.designTarget, this.getColumns(), this.options.getWidth());
      }, TablePrintElement.prototype.getReizeableShowPoints = function () {
        return ["s", "e"];
      }, TablePrintElement.prototype.design = function (v11553, v11554) {
        var v11555 = this;
        this.designTarget.hidraggable({
          handle: this.designTarget.find(".hiprint-printElement-table-handle"),
          axis: v11555.options.axis ? v11555.options.axis : void 0,
          designTarget: v11555,
          onDrag: function onDrag(v11556, v11557, v11558) {
            v11555.updateSizeAndPositionOptions(v11557, v11558), v11555.createLineOfPosition(v11554);
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed = !0;
          },
          moveUnit: "pt",
          minMove: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
          onBeforeDrag: function onBeforeDrag(v11561) {
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !0, v11555.createLineOfPosition(v11554);
          },
          getScale: function getScale() {
            return v11555.designPaper.scale || 1;
          },
          onStopDrag: function onStopDrag(v11563) {
            if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed) _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger("hiprintTemplateDataChanged_" + v11555.templateId, "移动");
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !1,
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed = !1,
            v11555.removeLineOfPosition();
          }
        }), this.printElementType.editable && this.setHitable(), this.setColumnsOptions(), this.designTarget.hireizeable({
          showPoints: v11555.getReizeableShowPoints(),
          // 是否显示宽高box
          showSizeBox: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.showSizeBox,
          noContainer: !0,
          onBeforeResize: function onBeforeResize() {
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !0;
          },
          getScale: function getScale() {
            return v11555.designPaper.scale || 1;
          },
          onResize: function onResize(v11570, v11571, v11572, v11573, v11574) {
            v11555.onResize(v11570, v11571, v11572, v11573, v11574), v11555.hitable && v11555.hitable.updateColumnGrips(), v11555.createLineOfPosition(v11554);
          },
          onStopResize: function onStopResize(v11575) {
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger("hiprintTemplateDataChanged_" + v11555.templateId, v11575 ? "旋转" : "大小");
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = !1, v11555.removeLineOfPosition();
          }
        }), this.bingKeyboardMoveEvent(this.designTarget, v11554);
      }, TablePrintElement.prototype.setHitable = function () {
        var v11578 = this;
        this.hitable = new _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__.a({
          templateId: v11578.templateId,
          table: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)"),
          rows: this.getColumns(),
          resizeRow: !1,
          resizeColumn: !0,
          fields: this.options.fields,
          trs: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("tbody tr"),
          handle: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("thead"),
          isEnableEdit: this.printElementType.editable ? this.printElementType.editable : !0,
          columnDisplayEditable: this.printElementType.columnDisplayEditable != undefined ? this.printElementType.columnDisplayEditable : !0,
          columnDisplayIndexEditable: this.printElementType.columnDisplayIndexEditable != undefined ? this.printElementType.columnDisplayIndexEditable : !0,
          columnResizable: this.printElementType.columnResizable != undefined ? this.printElementType.columnResizable : !0,
          columnAlignEditable: this.printElementType.columnAlignEditable != undefined ? this.printElementType.columnAlignEditable : !0,
          isEnableEditText: this.printElementType.columnTitleEditable != undefined ? this.printElementType.columnTitleEditable : !0,
          isEnableEditField: this.printElementType.isEnableEditField != undefined ? this.printElementType.isEnableEditField : !0,
          isEnableContextMenu: this.printElementType.isEnableContextMenu != undefined ? this.printElementType.isEnableContextMenu : !0,
          isEnableInsertRow: this.printElementType.isEnableInsertRow != undefined ? this.printElementType.isEnableInsertRow : !0,
          isEnableDeleteRow: this.printElementType.isEnableDeleteRow != undefined ? this.printElementType.isEnableDeleteRow : !0,
          isEnableInsertColumn: this.printElementType.isEnableInsertColumn != undefined ? this.printElementType.isEnableInsertColumn : !0,
          isEnableDeleteColumn: this.printElementType.isEnableDeleteColumn != undefined ? this.printElementType.isEnableDeleteColumn : !0,
          isEnableMergeCell: this.printElementType.isEnableMergeCell != undefined ? this.printElementType.isEnableMergeCell : !0
        }), _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.on("updateTable" + this.hitable.id, function () {
          v11578.updateDesignViewFromOptions();
          _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger("hiprintTemplateDataChanged_" + v11578.templateId, "调整表头");
        });
      }, TablePrintElement.prototype.setColumnsOptions = function () {
        var v11582 = this;
        this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("thead td").bind("click.hiprint", function (v11583) {
          var v11584 = $(v11583.target).attr("id") || $(v11583.target).attr("column-id"),
            v11585 = v11582.getColumnByColumnId(v11584);

          if (v11585) {
            var v11586 = v11582.getPrintElementOptionItemsByName("tableColumn");

            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(v11582.getPrintElementSelectEventKey(), {
              printElement: v11582,
              customOptionsInput: [{
                title: (v11585.title || `${v11585.id}(id)`) + `-${i18n.__('列属性')}`,
                optionItems: v11586,
                options: v11585,
                callback: function callback(v11588) {
                  v11586.forEach(function (v11589) {
                    var v11590 = v11589.getValue();
                    if ("title" == v11589.name && v11590 && !v11590.trim().endsWith("#") && !v11590.trim().startsWith("#")) {
                      var v11591 = v11590 ? v11590.split("#") : "";
                      v11585.title = v11591[0], v11591.length > 1 && (v11585.columnId = v11585.field = v11591[1]);
                      v11585.columnId && v11585.target.attr("column-id", v11585.columnId);
                      v11589.target.find("textarea").val(v11591[0]);
                      return;
                    }
                    v11585[v11589.name] = v11590;
                  });
                }
              }]
            });
          } else _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(v11582.getPrintElementSelectEventKey(), {
            printElement: v11582
          });
        });
      }, TablePrintElement.prototype.filterOptionItems = function (v11593) {
        var v11594 = _super.prototype.filterOptionItems.call(this, v11593);

        return this.printElementType.editable && 1 == this.options.columns.length ? v11594 : v11593.filter(function (v11595) {
          return "columns" != v11595.name;
        });
      }, TablePrintElement.prototype.getFooterFormatter = function () {
        var footerFormatter = void 0;
        if (this.printElementType.footerFormatter && (footerFormatter = this.printElementType.footerFormatter), this.options.footerFormatter) try {
          var v11596 = "footerFormatter=" + this.options.footerFormatter;
          eval(v11596);
        } catch (v11597) {
          console.log(v11597);
        }
        return footerFormatter;
      }, TablePrintElement.prototype.getGridColumnsFooterFormatter = function () {
        var gridColumnsFooterFormatter = void 0;
        if (this.printElementType.gridColumnsFooterFormatter && (gridColumnsFooterFormatter = this.printElementType.gridColumnsFooterFormatter), this.options.gridColumnsFooterFormatter) try {
          var v11598 = "gridColumnsFooterFormatter=" + this.options.gridColumnsFooterFormatter;
          eval(v11598);
        } catch (v11599) {
          console.log(v11599);
        }
        return gridColumnsFooterFormatter;
      }, TablePrintElement;
    }(_BasePrintElement__WEBPACK_IMPORTED_MODULE_0__.a);
}, function (v11601, v11602, v11603) {
  "use strict";

  var v11604 = function () {
      return function (v11605) {
        this.table = v11605.table, this.templateId = v11605.templateId, this.fields = v11605.fields, this.isEnableEdit = v11605.isEnableEdit, this.trs = v11605.trs, this.resizeRow = v11605.resizeRow, this.resizeColumn = v11605.resizeColumn, this.isEnableEditField = v11605.isEnableEditField, this.isEnableContextMenu = v11605.isEnableContextMenu, this.isEnableEditField = v11605.isEnableEditField, this.isEnableInsertRow = v11605.isEnableInsertRow, this.isEnableDeleteRow = v11605.isEnableDeleteRow, this.isEnableInsertColumn = v11605.isEnableInsertColumn, this.isEnableDeleteColumn = v11605.isEnableDeleteColumn, this.isEnableMergeCell = v11605.isEnableMergeCell, this.columnResizable = v11605.columnResizable, this.columnAlignEditable = v11605.columnAlignEditable;
      };
    }(),
    v11606 = function () {
      function v11608(v11607) {
        this.options = new v11604(v11607);
      }

      return v11608.prototype.enableEidt = function () {
        this.options.isEnableEdit;
      }, v11608.prototype.disableEdit = function () {
        this.options.isEnableEdit;
      }, v11608.prototype.isEnableEdit = function () {
        return this.options.isEnableEdit;
      }, v11608;
    }(),
    v11609 = v11603(0),
    v11610 = function () {
      return function (v11611) {
        this.cell = v11611.cell, this.link = v11611.link, this.linkType = v11611.linkType, this.bottom = v11611.bottom, this.rightMost = v11611.rightMost, this.rowLevel = v11611.rowLevel, this.columnLevel = v11611.columnLevel, this.indexInTableGridRow = v11611.indexInTableGridRow, this.indexInTableGridColumn = v11611.indexInTableGridColumn;
      };
    }(),
    v11612 = v11603(10),
    v11613 = function () {
      function v11614() {
      }

      return v11614.getLeftTableCell = function (v11615, v11616) {
        var v11617;
        return v11615.forEach(function (v11618, v11619) {
          v11618.cell && v11619 < v11616 && (v11617 = v11618.cell);
        }), v11617;
      }, v11614.getIndex = function (v11620, v11621) {
        var v11622;
        return v11620.forEach(function (v11623, v11624) {
          v11623.cell && v11623.cell.id == v11621 && (v11622 = v11624);
        }), v11622;
      }, v11614;
    }(),
    v11625 = v11603(13),
    v11626 = v11603(11),
    v11627 = function () {
      return function (v11628, v11629) {
        this.target = v11628, this.grips = v11629;
      };
    }(),
    v11630 = function () {
      return function (v11631) {
        this.target = v11631;
      };
    }(),
    v11632 = function () {
      return function () {
        this.rowColumns = [];
      };
    }(),
    v11633 = function () {
      function v11634() {
      }

      return v11634.getColumnsWidth = function (v11635, v11636) {
        var v11637 = {},
          v11638 = v11634.allAutoWidth(v11635);
        return v11635.rowColumns.forEach(function (v11639) {
          var v11640 = v11636 - 0,
            v11641 = v11639.width / v11638 * (v11640 > 0 ? v11640 : 0);
          v11637[v11639.id] = v11641;
        }), v11637;
      }, v11634.resizeTableCellWeight = function (v11642) {
        v11642.forEach(function (v11643) {
          v11643.columns.forEach(function (v11644) {
            v11644.hasWidth && $(v11644.getTarget()).css("width", v11644.width + "pt");
          });
        });
      }, v11634.allAutoWidth = function (v11645) {
        var v11646 = 0;
        return v11645.rowColumns.forEach(function (v11647) {
          v11646 += v11647.width;
        }), v11646;
      }, v11634.reconsitutionTableColumnTree = function (v11648, v11649, v11650) {
        for (var v11651 = v11649 || new v11632(), v11652 = function v11653(v11654) {
            v11651.totalLayer = v11654 + 1, v11651[v11654] = v11648[v11654].columns, v11651.rowColumns = v11651.rowColumns.concat(v11651[v11654].filter(function (v11655) {
              return v11655.rowspan == v11648.length - v11654;
            }));
          }, v11656 = 0; v11656 < v11648.length; v11656++) {
          v11652(v11656);
        }

        return v11651;
      }, v11634;
    }(),
    v11657 = v11603(2),
    v11658 = function () {
      function v11660(v11659) {
        this.signature = "HiTresizer", this.hitable = v11659, this.rows = v11659.rows, this.target = v11659.target;
      }

      return v11660.prototype.init = function () {
        this.addResizeRowAndColumn(), this.hitable.optionsCoat.options.resizeColumn && this.createColumnGrips(), this.hitable.optionsCoat.options.resizeRow && this.createRowGrips();
      }, v11660.prototype.resizeTableCellWidth = function () {
        v11633.resizeTableCellWeight(this.rows);
      }, v11660.prototype.addResizeRowAndColumn = function () {
      }, v11660.prototype.createColumnGrips = function () {
        var v11661 = this,
          v11662 = this,
          v11663 = [],
          v11664 = $('<div class="columngrips"/>');
        v11664.width(this.target.width()), this.rows.forEach(function (v11665) {
          (v11665.columns || []).filter(function (column) {return column.checked;}).forEach(function (v11666, v11667) {
            if (v11666.getTarget().attr("haswidth")) {
              var v11668 = $('<div class="columngrip"><div class="gripResizer"></div></div>');
              v11664.append(v11668);
              var v11669 = new v11630(v11668);
              v11663.length > 0 && (v11663[v11663.length - 1].nextGrip = v11669), v11663.push(v11669), v11661.syncGrips(v11666, v11669), $(v11668).hidraggable({
                axis: "h",
                onDrag: function onDrag(v11670, v11671, v11672) {
                },
                moveUnit: "pt",
                minMove: 1,
                getScale: function getScale() {
                  return $('.hiprint-printPaper')[0].style.transform && parseFloat($('.hiprint-printPaper')[0].style.transform.slice(6, -1)) || 1;
                },
                onBeforeDrag: function onBeforeDrag(v11673) {
                  if (v11657.a.instance.draging = !0, !v11669.nextGrip) return !1;
                  v11662.dragingGrip = v11669, v11662.dragingGrip.left = parseFloat(v11662.dragingGrip.target.css("left").replace("px", "")), v11669.target.addClass("columngripDraging");
                },
                onStopDrag: function onStopDrag(v11675) {
                  v11657.a.instance.draging = !1;
                  var v11677 = parseFloat(v11662.dragingGrip.target.css("left").replace("px", "")),
                    v11678 = v11609.a.px.toPt(v11677 - v11662.dragingGrip.left);
                  // 表格列宽限制 最小宽度为10pt
                  if (v11669.cell.width + v11678 < 10) {
                    v11678 = 10 - v11669.cell.width;
                  } else if (v11669.nextGrip.cell.width - v11678 < 10) {
                    v11678 = v11669.nextGrip.cell.width - 10;
                  }
                  v11669.cell.width = v11669.cell.width + v11678, v11669.nextGrip.cell.width = v11669.nextGrip.cell.width - v11678, v11661.resizeTableCellWidth(), v11669.target.removeClass("columngripDraging"), v11662.updateColumnGrips();
                }
              });
            }
          });
        }), this.target.before(v11664), this.cgripContariner = new v11627(v11664, v11663);
      }, v11660.prototype.updateColumnGrips = function () {
        this.cgripContariner && (this.cgripContariner.target.remove(), this.createColumnGrips());
      }, v11660.prototype.updateRowGrips = function () {
        this.rgripContariner && (this.rgripContariner.target.remove(), this.createRowGrips());
      }, v11660.prototype.createRowGrips = function () {
        var v11680 = this,
          v11681 = this,
          v11682 = [],
          v11683 = $('<div class="rowgrips"/>');
        this.rows.forEach(function (v11684, v11685) {
          var v11686 = $('<div class="rowgrip"><div class="gripResizer"></div></div>');
          v11683.append(v11686);
          var v11687 = new v11630(v11686);
          v11682.push(v11687), v11685 > 0 && v11685 < v11680.rows.length && $(v11686).hidraggable({
            axis: "v",
            onDrag: function onDrag(v11688, v11689, v11690) {
            },
            moveUnit: "pt",
            minMove: 1,
            onBeforeDrag: function onBeforeDrag(v11691) {
              v11681.dragingGrip = v11687, v11681.dragingGrip.top = parseFloat(v11681.dragingGrip.target.css("top").replace("px", "")), v11687.target.addClass("rowgripDraging");
            },
            onStopDrag: function onStopDrag(v11692) {
              var v11693 = parseFloat(v11681.dragingGrip.target.css("top").replace("px", "")),
                v11694 = v11609.a.px.toPt(v11693 - v11681.dragingGrip.top + v11681.rows[v11685].columns[0].getTarget().height());
              v11681.rows[v11685].columns[0].getTarget().css("height", v11694 + "pt"), v11681.syncRowGrips(), v11687.target.removeClass("rowgripDraging");
            }
          });
        }), this.target.before(v11683), this.rgripContariner = new v11627(v11683, v11682), this.syncRowGrips();
      }, v11660.prototype.syncGrips = function (v11696, v11697) {
        var v11698 = v11696.getTarget();
        v11697.cell = v11696, v11697.target.css({
          left: v11698.offset().left - this.target.offset().left + v11698.outerWidth(!1),
          height: 30
        });
      }, v11660.prototype.syncRowGrips = function () {
        var v11699 = this;
        this.rgripContariner.target.height(this.target.height()), this.rows.forEach(function (v11700, v11701) {
          var v11702 = v11700.columns[0].getTarget();
          v11699.rgripContariner.grips[v11701].target.css({
            top: v11702.offset().top - v11699.target.offset().top + v11702.outerHeight(!1),
            width: 30
          });
        });
      }, v11660.prototype.addResizerHeadRow = function () {
        this.target.find("thead").prepend();
      }, v11660;
    }(),
    v11703 = function () {
      function v11704() {
      }

      return v11704.prototype.init = function () {
      }, v11704.prototype.updateRowGrips = function () {
      }, v11704.prototype.updateColumnGrips = function () {
      }, v11704;
    }();

  v11603.d(v11602, "a", function () {
    return v11706;
  });

  var v11706 = function () {
    function v11710(v11707) {
      this.id = v11626.a.createId(), this.optionsCoat = new v11606(v11707), this.handle = v11707.handle, this.target = v11707.table, this.initRows(v11707.rows), this.init(v11707), this.tableCellSelector = new v11612.a(this.rows, this.target), this.resizer = this.optionsCoat.options.columnResizable ? new v11658(this) : new v11703(), this.resizer.init();
    }

    return v11710.prototype.insertRow = function (v11711, v11712, v11713) {
      var v11714 = v11712 || this.tableCellSelector.getSingleSelect(),
        v11715 = v11714.cell,
        v11716 = this.rows[v11714.rowIndex],
        v11717 = v11714.rowIndex,
        v11718 = this.getCellGrid(),
        v11719 = new v11625.a();
      if (v11719.init(this.optionsCoat, void 0, v11716.isHead), v11713 && v11719.getTarget().addClass(v11713), "above" == v11711) v11718[v11717].forEach(function (v11721) {
        var v11722 = v11721.link ? v11721.link : v11721.cell,
          v11723 = v11722.width / v11722.colspan;

        if (0 == v11721.columnLevel) {
          var v11724 = v11719.createTableCell();
          v11724.width = v11723, v11719.insertCellToLast(v11724);
        } else {
          if ("column" == v11721.linkType) {
            var v11725 = v11721.link.getTarget();
            v11721.link.rowspan += 1, v11725.attr("rowspan", v11721.link.rowspan);
          }

          v11721.linkType;
        }
      }), this.rows.splice(v11717, 0, v11719), v11716.getTarget().before(v11719.getTarget()), v11609.a.event.trigger("newRow" + this.id, v11719);else {
        var v11727 = v11717 + v11715.rowspan - 1;
        v11718[v11727].forEach(function (v11728) {
          var v11729 = v11728.link ? v11728.link : v11728.cell,
            v11730 = v11729.width / v11729.colspan;

          if (v11728.bottom) {
            var v11731 = v11719.createTableCell();
            v11731.width = v11730, v11719.insertCellToLast(v11731);
          } else {
            if (v11728.cell) {
              var v11732 = v11728.cell.getTarget();
              v11728.cell.rowspan += 1, v11732.attr("rowspan", v11728.cell.rowspan);
            }

            if ("column" == v11728.linkType) {
              v11732 = v11728.link.getTarget();
              v11728.link.rowspan += 1, v11732.attr("rowspan", v11728.link.rowspan);
            }
          }
        }), this.rows.splice(v11727 + 1, 0, v11719), this.rows[v11727].getTarget().after(v11719.getTarget()), v11609.a.event.trigger("newRow" + this.id, v11719);
      }
    }, v11710.prototype.insertColumn = function (v11734, v11735, v11736, v11737) {
      var v11738 = this,
        v11739 = this.rows.concat(this.trRows),
        v11740 = v11735 || this.tableCellSelector.getSingleSelect(),
        v11741 = v11740.cell,
        v11742 = v11740.rowIndex,
        v11743 = this.getCellGrid(v11739),
        v11744 = v11743[v11742].filter(function (v11745) {
          return v11745.cell && v11745.cell.id == v11741.id || v11745.link && v11745.link.id == v11741.id;
        });

      if ("left" == v11734) {
        var v11746 = v11744[0].indexInTableGridRow;
        v11743.forEach(function (v11747, v11748) {
          var v11749 = v11747[v11746],
            v11750 = v11747.filter(function (v11751, v11752) {
              return v11752 >= v11746 && v11751.cell;
            });

          if (0 == v11749.rowLevel) {
            var v11753 = v11739[v11748],
              v11754 = v11739[v11748].createTableCell();
            v11736 && v11754.getTarget().addClass(v11736), null != v11737 && (v11754.width = v11737), v11750.length ? v11753.insertToTargetCellLeft(v11750[0].cell, v11754) : v11753.insertCellToLast(v11754), v11609.a.event.trigger("newCell" + v11738.id, v11754);
          } else if ("row" == v11749.linkType) {
            var v11756 = v11749.link.getTarget();
            v11749.link.colspan += 1, v11756.attr("colspan", v11749.link.colspan);
          }
        });
      } else {
        var v11757 = v11744[v11744.length - 1].indexInTableGridRow;
        v11743.forEach(function (v11758, v11759) {
          var v11760 = v11758[v11757],
            v11761 = v11758.filter(function (v11762, v11763) {
              return v11763 <= v11757 && v11762.cell;
            });

          if (v11760.rightMost) {
            var v11764 = v11739[v11759],
              v11765 = v11764.createTableCell();
            v11736 && v11765.getTarget().addClass(v11736), null != v11737 && (v11765.width = v11737), v11761.length ? v11764.insertToTargetCellRight(v11761[v11761.length - 1].cell, v11765) : v11764.insertCellToFirst(v11765), v11609.a.event.trigger("newCell" + v11738.id, v11765);
          } else {
            var v11767 = v11760.link || v11760.cell;

            if ("row" == v11760.linkType) {
              var v11768 = v11767.getTarget();
              v11767.colspan += 1, v11768.attr("colspan", v11767.colspan);
            }

            if (v11760.cell) {
              v11768 = v11767.getTarget();
              v11767.colspan += 1, v11768.attr("colspan", v11767.colspan);
            }
          }
        });
      }
    }, v11710.prototype.deleteRow = function () {
      var v11769 = this,
        v11770 = this.tableCellSelector.getSingleSelect(),
        v11771 = (v11770.cell, this.rows[v11770.rowIndex], v11770.rowIndex),
        v11772 = this.getCellGrid(),
        v11773 = this.rows[v11771];
      v11772[v11771].forEach(function (v11774, v11775) {
        if (v11774.cell) {
          if (1 == v11774.cell.rowspan) v11773.removeCell(v11774.cell);else {
            v11773.removeCell(v11774.cell);
            var v11776 = v11772[v11771 + 1].filter(function (v11777, v11778) {
                return v11777.cell && v11778 > v11775;
              }),
              v11779 = v11769.rows[v11771 + 1],
              v11780 = v11779.createTableCell(v11774.cell.rowspan - 1, v11774.cell.colspan);
            v11776.length ? v11779.insertToTargetCellLeft(v11776[0].cell, v11780) : v11779.insertCellToLast(v11780);
          }
        } else if ("column" == v11774.linkType) {
          var v11781 = v11774.link;
          v11781.rowspan -= 1, v11781.getTarget().attr("rowspan", v11781.rowspan);
        }
      }), v11773.getTarget().remove(), this.rows.splice(v11771, 1);
    }, v11710.prototype.deleteColums = function () {
      var v11782 = this.rows.concat(this.trRows),
        v11783 = this.tableCellSelector.getSingleSelect(),
        v11784 = v11783.cell,
        v11785 = v11783.rowIndex,
        v11786 = this.getCellGrid(v11782),
        v11787 = v11786[v11785].filter(function (v11788) {
          return v11788.cell && v11788.cell.id == v11784.id || v11788.link && v11788.link.id == v11784.id;
        })[0].indexInTableGridRow;
      v11786.forEach(function (v11789, v11790) {
        var v11791 = v11789[v11787];
        v11791.cell ? 1 == v11791.cell.colspan ? v11782[v11790].removeCell(v11791.cell) : (v11791.cell.colspan -= 1, v11791.cell.getTarget().attr("colspan", v11791.cell.colspan)) : "row" == v11791.linkType && (v11791.link.colspan -= 1, v11791.link.getTarget().attr("colspan", v11791.link.colspan));
      });
    }, v11710.prototype.mergeCell = function () {
      var v11792 = this,
        v11793 = this.tableCellSelector.getSelectedCells();

      if (0 != v11793.length) {
        var v11794 = v11793[0][0].cell;
        v11793.forEach(function (v11795, v11796) {
          v11795.forEach(function (v11797, v11798) {
            0 == v11796 ? 0 != v11798 && (v11794.colspan += v11797.cell.colspan, v11792.rows[v11797.rowIndex].removeCell(v11797.cell)) : v11792.rows[v11797.rowIndex].removeCell(v11797.cell), 0 == v11798 && v11793[0][0].rowIndex + v11794.rowspan - 1 < v11797.rowIndex && (v11794.rowspan += v11797.cell.rowspan);
          });
        }), v11794.getTarget().attr("colspan", v11794.colspan), v11794.getTarget().attr("rowspan", v11794.rowspan), this.tableCellSelector.setSingleSelect(v11793[0][0]);
      }
    }, v11710.prototype.splitCell = function () {
      var v11799 = this.tableCellSelector.getSingleSelect(),
        v11800 = this.getCellGrid(),
        v11801 = v11613.getIndex(v11800[v11799.rowIndex], v11799.cell.id);

      if (v11799) {
        for (var v11802 = v11799.rowIndex; v11802 < v11799.rowIndex + v11799.cell.rowspan; v11802++) {
          for (var v11803 = this.rows[v11802], v11804 = v11802 == v11799.rowIndex ? v11799.cell : v11613.getLeftTableCell(v11800[v11802], v11801), v11805 = 0; v11805 < v11799.cell.colspan; v11805++) {
            v11802 == v11799.rowIndex && 0 == v11805 || (v11804 ? v11803.insertToTargetCellRight(v11804, v11803.createTableCell()) : v11803.insertCellToFirst(v11803.createTableCell()));
          }
        }

        v11799.cell.rowspan = 1, v11799.cell.colspan = 1, v11799.cell.getTarget().attr("colspan", v11799.cell.colspan), v11799.cell.getTarget().attr("rowspan", v11799.cell.rowspan);
      }
    }, v11710.prototype.init = function (v11806) {
      var v11807 = this;
      $(this.target).addClass("hitable"), this.optionsCoat.onBeforEdit = function (v11808) {
        if (v11807.optionsCoat.options.onBeforEdit && !1 === v11806.onBeforEdit(v11808)) return !1;
        return v11807.optionsCoat.editingCell && v11807.optionsCoat.editingCell.endEdit(), !0;
      }, $(this.target).mousedown(function (v11809) {
        v11807.optionsCoat.isLeftMouseButtonDown = !0;
      }), $(this.target).mouseup(function (v11810) {
        v11807.optionsCoat.isLeftMouseButtonDown = !1;
      }), this.initContext(), this.target.on("mousemove", function (v11811) {
        1 === v11811.buttons && v11807.tableCellSelector.multipleSelectByXY(v11811.pageX, v11811.pageY);
      }).on("mousedown", function (v11812) {
        1 === v11812.buttons && v11807.tableCellSelector.singleSelectByXY(v11812.pageX, v11812.pageY);
      });
    }, v11710.prototype.initRows = function (v11813) {
      var v11814 = this;

      if (this.trRows = [], v11813) {
        this.rows = v11813, v11813.forEach(function (v11815, v11816) {
          v11815.init(v11814.optionsCoat, v11814.target.find("tr:eq(" + v11816 + ")"), !0);
        });
        var v11817 = this.optionsCoat.options.trs;
        v11817 && this.initRowsByTrs(v11817).forEach(function (v11818) {
          v11814.trRows.push(v11818);
        });
      } else this.rows = this.initRowsByTrs(this.target.find("tr"));
    }, v11710.prototype.initRowsByTrs = function (v11819) {
      var v11820 = this;
      return v11819.map(function (v11821, v11822) {
        var v11823 = new v11625.a();
        return v11823.init(v11820.optionsCoat, $(v11822)), v11823;
      }).get();
    }, v11710.prototype.enableEidt = function () {
      this.optionsCoat.enableEidt();
    }, v11710.prototype.disableEdit = function () {
      this.optionsCoat.disableEdit();
    }, v11710.prototype.getCellGrid = function (v11825) {
      var v11826 = v11825 || this.rows,
        v11827 = this.getColumnStep(),
        v11828 = new Array();
      return v11826.forEach(function (v11829, v11830) {
        v11829.columns.forEach(function (v11831, v11832) {
          for (var v11833 = 0; v11833 < v11831.colspan; v11833++) {
            for (var v11834 = 0, v11835 = !1; v11834 < v11827 && !v11835;) {
              if (v11828[v11830] = v11828[v11830] || [], v11828[v11830][v11834]) ;else {
                v11828[v11830][v11834] = new v11610({
                  cell: 0 == v11833 ? v11831 : void 0,
                  link: 0 != v11833 ? v11831 : void 0,
                  linkType: v11833 > 0 ? "row" : void 0,
                  rightMost: v11833 == v11831.colspan - 1 || void 0,
                  bottom: 0 == v11831.rowspan - 1,
                  rowLevel: v11833,
                  columnLevel: 0,
                  indexInTableGridRow: v11834,
                  indexInTableGridColumn: v11830
                });

                for (var v11836 = v11830 + 1, v11837 = 1; v11837 < v11831.rowspan; v11837++) {
                  v11828[v11836] = v11828[v11836] || [], v11828[v11836][v11834] = new v11610({
                    cell: void 0,
                    link: v11831,
                    linkType: v11833 > 0 ? "rowColumn" : "column",
                    rightMost: v11833 == v11831.colspan - 1 || void 0,
                    bottom: v11837 == v11831.rowspan - 1,
                    rowLevel: v11833,
                    columnLevel: v11837,
                    indexInTableGridRow: v11834,
                    indexInTableGridColumn: v11836
                  }), v11836 += 1;
                }

                v11835 = !0;
              }
              v11834++;
            }
          }
        });
      }), v11828;
    }, v11710.prototype.setAlign = function (v11838) {
      var v11839 = this.tableCellSelector.getSingleSelect();
      v11839 && v11839.cell.setAlign(v11838);
    }, v11710.prototype.setVAlign = function (v11840) {
      var v11841 = this.tableCellSelector.getSingleSelect();
      v11841 && v11841.cell.setVAlign(v11840);
    }, v11710.prototype.getColumnStep = function (v11842) {
      var v11843 = 0;
      return this.rows.length && this.rows[v11842 || 0].columns.forEach(function (v11844) {
        v11843 += v11844.colspan;
      }), v11843;
    }, v11710.prototype.initContext = function () {
      var v11845 = this;
      if (!this.optionsCoat.options.isEnableContextMenu) return !1;
      $(this.handle).hicontextMenu({
        menus: [{
          text: `${i18n.__('在上方插入行')}`,
          enabled: this.optionsCoat.options.isEnableInsertRow,
          disable: function disable() {
            return !v11845.tableCellSelector.getSingleSelect();
          },
          callback: function callback() {
            v11845.insertRow("above"), v11845.resizer.updateRowGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('在下方插入行')}`,
          borderBottom: !0,
          enabled: this.optionsCoat.options.isEnableInsertRow,
          disable: function disable() {
            return !v11845.tableCellSelector.getSingleSelect();
          },
          callback: function callback() {
            v11845.insertRow("below"), v11845.resizer.updateRowGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('向左方插入列')}`,
          enabled: this.optionsCoat.options.isEnableInsertColumn,
          disable: function disable() {
            return !v11845.tableCellSelector.getSingleSelect();
          },
          callback: function callback() {
            v11845.insertColumn("left"), v11845.resizer.updateColumnGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('向右方插入列')}`,
          enabled: this.optionsCoat.options.isEnableInsertColumn,
          disable: function disable() {
            return !v11845.tableCellSelector.getSingleSelect();
          },
          borderBottom: !0,
          callback: function callback() {
            v11845.insertColumn("right"), v11845.resizer.updateColumnGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('删除行')}`,
          enabled: this.optionsCoat.options.isEnableDeleteRow,
          disable: function disable() {
            return !v11845.tableCellSelector.getSingleSelect() || v11845.rows.length <= 1;
          },
          callback: function callback() {
            v11845.deleteRow(), v11845.resizer.updateRowGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('删除列')}`,
          borderBottom: !0,
          enabled: this.optionsCoat.options.isEnableDeleteColumn,
          disable: function disable() {
            return !v11845.tableCellSelector.getSingleSelect() || v11845.rows.length > 0 && v11845.rows[0].columns.length <= 1;
          },
          callback: function callback() {
            v11845.deleteColums(), v11845.resizer.updateColumnGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('对齐')}`,
          borderBottom: !0,
          enabled: this.optionsCoat.options.columnAlignEditable,
          menus: [{
            text: `${i18n.__('左')}`,
            callback: function callback() {
              v11845.setAlign("left");
            }
          }, {
            text: `${i18n.__('左右居中')}`,
            callback: function callback() {
              v11845.setAlign("center");
            }
          }, {
            text: `${i18n.__('右')}`,
            callback: function callback() {
              v11845.setAlign("right");
            }
          }, {
            text: `${i18n.__('默认')}`,
            borderBottom: !0,
            callback: function callback() {
              v11845.setAlign("");
            }
          }, {
            text: `${i18n.__('上')}`,
            callback: function callback() {
              v11845.setVAlign("top");
            }
          }, {
            text: `${i18n.__('垂直居中')}`,
            callback: function callback() {
              v11845.setVAlign("middle");
            }
          }, {
            text: `${i18n.__('下')}`,
            callback: function callback() {
              v11845.setVAlign("bottom");
            }
          }, {
            text: `${i18n.__('默认')}`,
            callback: function callback() {
              v11845.setVAlign("");
            }
          }]
        }, {
          text: `${i18n.__('合并单元格')}`,
          enabled: this.optionsCoat.options.isEnableMergeCell,
          disable: function disable() {
            return v11845.tableCellSelector.getSingleSelect();
          },
          callback: function callback() {
            v11845.mergeCell(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }, {
          text: `${i18n.__('解开单元格')}`,
          enabled: this.optionsCoat.options.isEnableMergeCell,
          disable: function disable() {
            var v11853 = v11845.tableCellSelector.getSingleSelect();
            return !v11853 || 1 == v11853.cell.rowspan && 1 == v11853.cell.colspan;
          },
          callback: function callback() {
            v11845.splitCell(), v11609.a.event.trigger("updateTable" + v11845.id);
          }
        }].filter(function (v11855) {
          return v11855.enabled;
        })
      });
    }, v11710.prototype.getTableWidth = function () {
      return v11609.a.px.toPt(this.target.outerWidth(!1));
    }, v11710.prototype.updateColumnGrips = function () {
      this.resizer.updateColumnGrips();
    }, v11710.prototype.updateRowGrips = function () {
      this.resizer.updateRowGrips();
    }, v11710;
  }();
}, function (v11857, v11858, v11859) {
  "use strict";

  v11859.d(v11858, "a", function () {
    return v11861;
  });

  var v11861 = function () {
    return function (v11862, v11863, v11864) {
      this.tid = v11862, this.options = v11863, this.printElementType = v11864;
    };
  }();
}, function (v11865, v11866, v11867) {
  "use strict";

  var v11868 = v11867(3),
    v11869 = v11867(12),
    v11870 = (function () {
    }(), function () {
      return function (v11871) {
        this.width = v11871.width, this.title = v11871.title, this.field = v11871.field, this.checked = v11871.checked, this.columnId = v11871.columnId, this.fixed = !1, this.rowspan = v11871.rowspan || 1, this.colspan = v11871.colspan || 1, this.align = v11871.align, this.halign = v11871.halign, this.vAlign = v11871.vAlign, this.renderFormatter = v11871.renderFormatter, this.formatter2 = v11871.formatter2, this.styler2 = v11871.styler2, this.stylerHeader = v11871.stylerHeader, this.tableColumnHeight = v11871.tableColumnHeight, this.tableTextType = v11871.tableTextType, this.tableBarcodeMode = v11871.tableBarcodeMode, this.tableQRCodeLevel = v11871.tableQRCodeLevel, this.tableSummaryTitle = v11871.tableSummaryTitle, this.tableSummaryText = v11871.tableSummaryText, this.tableSummaryColspan = v11871.tableSummaryColspan, this.tableSummary = v11871.tableSummary, this.tableSummaryAlign = v11871.tableSummaryAlign, this.tableSummaryNumFormat = v11871.tableSummaryNumFormat, this.tableSummaryFormatter = v11871.tableSummaryFormatter, this.showCodeTitle = v11871.showCodeTitle, this.upperCase = v11871.upperCase;
      };
    }()),
    v11872 = v11867(5);
  v11867.d(v11866, "a", function () {
    return v11874;
  });

  var _p,
    v11875 = (_p = function v11876(v11877, v11878) {
      return (_p = Object.setPrototypeOf || _instanceof({
        __proto__: []
      }, Array) && function (v11879, v11880) {
        v11879.__proto__ = v11880;
      } || function (v11881, v11882) {
        for (var v11883 in v11882) {
          v11882.hasOwnProperty(v11883) && (v11881[v11883] = v11882[v11883]);
        }
      })(v11877, v11878);
    }, function (v11884, v11885) {
      function v11886() {
        this.constructor = v11884;
      }

      _p(v11884, v11885), v11884.prototype = null === v11885 ? Object.create(v11885) : (v11886.prototype = v11885.prototype, new v11886());
    }),
    v11874 = function (v11887) {
      function v11901(v11888, v11889) {
        var v11890 = this;
        (v11888 = v11888 || {}, (v11890 = v11887.call(this, v11888) || this).lHeight = v11888.lHeight, v11890.autoCompletion = v11888.autoCompletion, v11890.tableFooterRepeat = v11888.tableFooterRepeat, v11889) && (v11890.columns = [], v11889.editable && v11888.columns && v11888.columns.length ? v11888.columns.forEach(function (v11891) {
          var v11892 = [];
          v11891.forEach(function (v11893) {
            var v11894 = new v11870(v11893),
              v11895 = v11889.getColumnByColumnId(v11894.columnId),
              v11896 = v11895 ? $.extend(v11895, v11894) : new v11872.a(v11894);
            v11892.push(v11896);
          }), v11890.columns.push(new v11869.a(v11892));
        }) : v11889.columns.forEach(function (v11899) {
          v11890.columns.push(new v11869.a(v11899));
        }));
        return v11890;
      }

      return v11875(v11901, v11887), v11901.prototype.getColumnByColumnId = function (v11902) {
        return this.makeColumnObj()[v11902];
      }, v11901.prototype.makeColumnObj = function () {
        var v11903 = {};
        return this.columns && this.columns.forEach(function (v11904) {
          v11904.columns.forEach(function (v11905) {
            (v11905.id || v11905.columnId) && (v11903[v11905.id || v11905.columnId] = v11905);
          });
        }), v11903;
      }, v11901.prototype.getGridColumns = function () {
        return this.gridColumns || 1;
      }, v11901.prototype.getPrintElementOptionEntity = function () {
        var v11906 = v11887.prototype.getPrintElementOptionEntity.call(this);
        v11906.fields = this.fields;
        return this.columns && (v11906.columns = [], this.columns.forEach(function (v11907) {
          var v11908 = v11907.getPrintElementOptionEntity().map(function (v11909) {
            return new v11870(v11909);
          });
          v11906.columns.push(v11908);
        })), v11906;
      }, v11901;
    }(v11868.a);
}, function (v11911, v11912, v11913) {
  "use strict";

  v11913.d(v11912, "a", function () {
    return v11915;
  });

  var v11915 = function () {
    return function () {
      this.rowColumns = [];
    };
  }();
}, function (v11916, v11917, v11918) {
  "use strict";

  v11918.d(v11917, "a", function () {
    return v11920;
  });

  var v11920 = function () {
    function v11923(v11921, v11922) {
      this.gridColumns = v11921, this.target = v11922;
    }

    return v11923.prototype.getByIndex = function (v11924) {
      return this.target.find(".hi-grid-col:eq(" + v11924 + ")");
    }, v11923;
  }();
}, function (v11925, v11926, v11927) {
  v11925.exports = v11927(33);
}, function (v11928, v11929) {
  !function (v11930) {
    function v11948(v11931) {
      var v11932 = v11930.data(v11931.data.target, "hidraggable"),
        v11933 = v11932.options,
        v11934 = v11932.proxy,
        v11935 = v11931.data,
        v11936 = v11935.startLeft + (v11931.pageX - v11935.startX) / (v11932.options.getScale() || 1),
        v11937 = v11935.startTop + (v11931.pageY - v11935.startY) / (v11932.options.getScale() || 1);
      v11934 && (v11934.parent()[0] == document.body ? (v11936 = null != v11933.deltaX && null != v11933.deltaX ? v11931.pageX + v11933.deltaX : v11931.pageX - v11931.data.offsetWidth, v11937 = null != v11933.deltaY && null != v11933.deltaY ? v11931.pageY + v11933.deltaY : v11931.pageY - v11931.data.offsetHeight) : (null != v11933.deltaX && null != v11933.deltaX && (v11936 += v11931.data.offsetWidth + v11933.deltaX), null != v11933.deltaY && null != v11933.deltaY && (v11937 += v11931.data.offsetHeight + v11933.deltaY))),
      v11931.data.parent != document.body && (v11936 += v11930(v11931.data.parent).scrollLeft(), v11937 += v11930(v11931.data.parent).scrollTop()),
      "h" == v11933.axis ? v11935.left = v11936 : "v" == v11933.axis ? v11935.top = v11937 : v11931.shiftKey && v11931.altKey ? v11935.top = v11937 : v11931.shiftKey ? v11935.left = v11936 : (v11935.left = v11936, v11935.top = v11937);
    }

    function v11949(v11939) {
      var v11938 = v11930.data(v11939.data.target, "hidraggable"),
        v11940 = v11938.options,
        v11941 = v11938.proxy;
      v11941 || (v11941 = v11930(v11939.data.target)), v11941.css({
        left: v11930.fn.dragLengthC(v11939.data.left, v11940),
        top: v11930.fn.dragLengthC(v11939.data.top, v11940)
      }), v11930("body").css("cursor", v11940.cursor);
    }

    function v12019(v11942) {
      v11930.fn.hidraggable.isDragging = !0;
      var v11943 = v11930.data(v11942.data.target, "hidraggable"),
        v11944 = v11943.options,
        v11945 = v11930(".hidroppable").filter(function () {
          return v11942.data.target != this;
        }).filter(function () {
          var v11946 = v11930.data(this, "hidroppable").options.accept;
          return !v11946 || v11930(v11946).filter(function () {
            return this == v11942.data.target;
          }).length > 0;
        });
      v11943.hidroppables = v11945;
      var v11947 = v11943.proxy;
      return v11947 || (v11944.proxy ? (v11947 = "clone" == v11944.proxy ? v11930(v11942.data.target).clone().insertAfter(v11942.data.target) : v11944.proxy.call(v11942.data.target, v11942.data.target), v11943.proxy = v11947) : v11947 = v11930(v11942.data.target)), v11947.css("position", "absolute"), v11948(v11942), v11949(v11942), v11944.onStartDrag.call(v11942.data.target, v11942), !1;
    }

    function createVerLine(op, cp, v11950, tt, v11951, pc) {
      if (Math.abs(op[v11950] - cp[tt]) <= HIPRINT_CONFIG.adsorbLineMin) {
        if (op.v.length) {
          op.v.css("left", op[v11950] + "pt");
        } else {
          op.v = $("<div class='verLine id-" + op.id + "'></div>");
          op.v.css("height", v11951 + "pt");
          op.v.css("left", op[v11950] + "pt");
          pc.append(op.v);
        }
      } else {
        op.v && op.v.remove();
      }
    }

    function removeVerLine(op) {
      if (op) op.v && op.v.remove();
      $(".verLine").remove();
    }

    function createHorLine(op, cp, v11962, tt, v11963, pc) {
      if (Math.abs(op[v11962] - cp[tt]) <= HIPRINT_CONFIG.adsorbLineMin) {
        if (op.h.length) {
          op.h.css("top", op[v11962] + "pt");
        } else {
          op.h = $("<div class='horLine id-" + op.id + "'></div>");
          op.h.css("width", v11963 + "pt");
          op.h.css("top", op[v11962] + "pt");
          pc.append(op.h);
        }
      } else {
        op.h && op.h.remove();
      }
    }

    function removeHorLine(op) {
      if (op) op.h && op.h.remove();
      $(".horLine").remove();
    }

    function v12020(v11975) {
      // 移动开始动作
      var v11974 = v11930.data(v11975.data.target, "hidraggable");
      v11948(v11975);
      if (!(v11975.ctrlKey || v11975.metaKey) && (v11975.data.target.className.startsWith('resize-panel') || "2" == v11975.data.target.style.zIndex || v11975.data.target.className.startsWith('hiprint-printElement'))) {
        var data = v11975.data;
        if (v11930(".mouseRect").length == 0 && v11974.options.designTarget && v11974.options.designTarget.panel.printElements.filter(function (el) {
          return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
        }).length <= 1) {
          let left = window.hinnn.px.toPt(data.left);
          let top = window.hinnn.px.toPt(data.top);
          let cPosition = v11974.options.designTarget.options;
          cPosition.left = left;
          cPosition.top = top;
          cPosition.right = left + cPosition.width;
          cPosition.bottom = top + cPosition.height;
          cPosition.vCenter = left + cPosition.width / 2;
          cPosition.hCenter = top + cPosition.height / 2;
          (() => {
            let oPositions = v11974.options.designTarget.panel.printElements.filter((el) => el.id != v11974.options.designTarget.id).map((el) => {
              let { left, top, width, height } = el.options;
              let right = left + width,vCenter = left + width / 2,hCenter = top + height / 2;
              let cVCenter = cPosition.left + cPosition.width / 2,cHCenter = cPosition.top + cPosition.height / 2,
                cRight = cPosition.left + cPosition.width;
              let distance, d1, d2, d3;
              d1 = Math.sqrt(Math.pow(left - cPosition.left, 2) + Math.pow(hCenter - cHCenter, 2));
              d2 = Math.sqrt(Math.pow(vCenter - cVCenter, 2) + Math.pow(hCenter - cHCenter, 2));
              d3 = Math.sqrt(Math.pow(right - cRight, 2) + Math.pow(hCenter - cHCenter, 2));
              distance = Math.min(d1, d2, d3);
              return {
                ...el.options,
                distance,
                h: $(".horLine.id-" + el.id),
                v: $(".verLine.id-" + el.id),
                bottom: top + height,
                right: left + width,
                vCenter,
                hCenter
              };
            }).sort((v11978, v11979) => v11978.distance - v11979.distance).slice(0, 1);
            let paper = v11974.options.designTarget.designPaper;
            let paperContent = paper.target.find(".hiprint-printPaper-content");
            let paperW = paper.width,paperH = paper.height;
            let showAline = HIPRINT_CONFIG.showAdsorbLine,aMin = HIPRINT_CONFIG.adsorbMin,aLMin = HIPRINT_CONFIG.adsorbLineMin;
            oPositions.forEach((item, idx) => {
              // 元素左边线
              if (Math.abs(oPositions[idx].left - cPosition.left) <= aMin) {
                cPosition.left = oPositions[idx].left;
                removeVerLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].vCenter - cPosition.left) <= aMin) {
                cPosition.left = oPositions[idx].vCenter;
                removeVerLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].right - cPosition.left) <= aMin) {
                cPosition.left = oPositions[idx].right;
                removeVerLine(oPositions[idx]);
              }
              // 元素垂直中线
              if (Math.abs(oPositions[idx].left - cPosition.vCenter) <= aMin) {
                cPosition.left = oPositions[idx].left - cPosition.width / 2;
                removeVerLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].vCenter - cPosition.vCenter) <= aMin) {
                cPosition.left = oPositions[idx].vCenter - cPosition.width / 2;
                removeVerLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].right - cPosition.vCenter) <= aMin) {
                cPosition.left = oPositions[idx].right - cPosition.width / 2;
                removeVerLine(oPositions[idx]);
              }
              // 元素右边线
              if (Math.abs(oPositions[idx].left - cPosition.right) <= aMin) {
                cPosition.left = oPositions[idx].left - cPosition.width;
                removeVerLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].vCenter - cPosition.right) <= aMin) {
                cPosition.left = oPositions[idx].vCenter - cPosition.width;
                removeVerLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].right - cPosition.right) <= aMin) {
                cPosition.left = oPositions[idx].right - cPosition.width;
                removeVerLine(oPositions[idx]);
              }
              // 元素顶边线
              if (Math.abs(oPositions[idx].top - cPosition.top) <= aMin) {
                cPosition.top = oPositions[idx].top;
                removeHorLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].hCenter - cPosition.top) <= aMin) {
                cPosition.top = oPositions[idx].hCenter;
                removeHorLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].bottom - cPosition.top) <= aMin) {
                cPosition.top = oPositions[idx].bottom;
                removeHorLine(oPositions[idx]);
              }
              // 元素水平中线
              if (Math.abs(oPositions[idx].top - cPosition.hCenter) <= aMin) {
                cPosition.top = oPositions[idx].top - cPosition.height / 2;
                removeHorLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].hCenter - cPosition.hCenter) <= aMin) {
                cPosition.top = oPositions[idx].hCenter - cPosition.height / 2;
                removeHorLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].bottom - cPosition.hCenter) <= aMin) {
                cPosition.top = oPositions[idx].bottom - cPosition.height / 2;
                removeHorLine(oPositions[idx]);
              }
              // 元素底边线
              if (Math.abs(oPositions[idx].top - cPosition.bottom) <= aMin) {
                cPosition.top = oPositions[idx].top - cPosition.height;
                removeHorLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].hCenter - cPosition.bottom) <= aMin) {
                cPosition.top = oPositions[idx].hCenter - cPosition.height;
                removeHorLine(oPositions[idx]);
              } else if (Math.abs(oPositions[idx].bottom - cPosition.bottom) <= aMin) {
                cPosition.top = oPositions[idx].bottom - cPosition.height;
                removeHorLine(oPositions[idx]);
              }

              if (showAline) {
                if (Math.abs(oPositions[idx].left - cPosition.left) > aMin && Math.abs(oPositions[idx].left - cPosition.left) <= aLMin) {// 左
                  createVerLine(oPositions[idx], cPosition, "left", "left", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].vCenter - cPosition.left) > aMin && Math.abs(oPositions[idx].vCenter - cPosition.left) <= aLMin) {
                  createVerLine(oPositions[idx], cPosition, "vCenter", "left", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].right - cPosition.left) > aMin && Math.abs(oPositions[idx].right - cPosition.left) <= aLMin) {
                  createVerLine(oPositions[idx], cPosition, "right", "left", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].left - cPosition.vCenter) > aMin && Math.abs(oPositions[idx].left - cPosition.vCenter) <= aLMin) {// 中
                  createVerLine(oPositions[idx], cPosition, "left", "vCenter", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].vCenter - cPosition.vCenter) > aMin && Math.abs(oPositions[idx].vCenter - cPosition.vCenter) <= aLMin) {
                  createVerLine(oPositions[idx], cPosition, "vCenter", "vCenter", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].right - cPosition.vCenter) > aMin && Math.abs(oPositions[idx].right - cPosition.vCenter) <= aLMin) {
                  createVerLine(oPositions[idx], cPosition, "right", "vCenter", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].left - cPosition.right) > aMin && Math.abs(oPositions[idx].left - cPosition.right) <= aLMin) {// 右
                  createVerLine(oPositions[idx], cPosition, "left", "right", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].vCenter - cPosition.right) > aMin && Math.abs(oPositions[idx].vCenter - cPosition.right) <= aLMin) {
                  createVerLine(oPositions[idx], cPosition, "vCenter", "right", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].right - cPosition.right) > aMin && Math.abs(oPositions[idx].right - cPosition.right) <= aLMin) {
                  createVerLine(oPositions[idx], cPosition, "right", "right", paperH, paperContent);
                } else if (Math.abs(oPositions[idx].top - cPosition.top) > aMin && Math.abs(oPositions[idx].top - cPosition.top) <= aLMin) {// 上
                  createHorLine(oPositions[idx], cPosition, "top", "top", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].hCenter - cPosition.top) > aMin && Math.abs(oPositions[idx].hCenter - cPosition.top) <= aLMin) {
                  createHorLine(oPositions[idx], cPosition, "hCenter", "top", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].bottom - cPosition.top) > aMin && Math.abs(oPositions[idx].bottom - cPosition.top) <= aLMin) {
                  createHorLine(oPositions[idx], cPosition, "bottom", "top", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].top - cPosition.hCenter) > aMin && Math.abs(oPositions[idx].top - cPosition.hCenter) <= aLMin) {// 中
                  createHorLine(oPositions[idx], cPosition, "top", "hCenter", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].hCenter - cPosition.hCenter) > aMin && Math.abs(oPositions[idx].hCenter - cPosition.hCenter) <= aLMin) {
                  createHorLine(oPositions[idx], cPosition, "hCenter", "hCenter", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].bottom - cPosition.hCenter) > aMin && Math.abs(oPositions[idx].bottom - cPosition.hCenter) <= aLMin) {
                  createHorLine(oPositions[idx], cPosition, "bottom", "hCenter", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].top - cPosition.bottom) > aMin && Math.abs(oPositions[idx].top - cPosition.bottom) <= aLMin) {// 下
                  createHorLine(oPositions[idx], cPosition, "top", "bottom", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].hCenter - cPosition.bottom) > aMin && Math.abs(oPositions[idx].hCenter - cPosition.bottom) <= aLMin) {
                  createHorLine(oPositions[idx], cPosition, "hCenter", "bottom", paperW, paperContent);
                } else if (Math.abs(oPositions[idx].bottom - cPosition.bottom) > aMin && Math.abs(oPositions[idx].bottom - cPosition.bottom) <= aLMin) {
                  createHorLine(oPositions[idx], cPosition, "bottom", "bottom", paperW, paperContent);
                } else {
                  removeVerLine(oPositions[idx]);
                  removeHorLine(oPositions[idx]);
                }
              }
            });
          })();
          v11975.data.left = window.hinnn.pt.toPx(cPosition.left);
          v11975.data.top = window.hinnn.pt.toPx(cPosition.top);
        }
        // 当前纸张宽高
        var parent = data.parent.className.endsWith('design') ? data.parent : data.parent.offsetParent;
        var paperW = parent.clientWidth,paperH = parent.clientHeight;
        // 当前元素宽高
        var elementW = data.target.clientWidth,elementH = data.target.clientHeight,
          diffLeft = 0,diffTop = 0;
        if (v11974.options.designTarget && v11974.options.designTarget.options.transform) {
          var info = v11974.options.designTarget.options.getRectInfo();
          diffLeft = window.hinnn.pt.toPx(info.diffW), diffTop = window.hinnn.pt.toPx(info.diffH);
        }
        // 左右
        if (data.left < 0 - diffLeft) {
          data.left = 0 - diffLeft;
        } else if (data.left >= paperW - elementW + diffLeft) {
          data.left = paperW - elementW + diffLeft;
        }
        // 上下
        if (data.top < 0 - diffTop) {
          data.top = 0 - diffTop;
        } else if (data.top >= paperH - elementH + diffTop) {
          data.top = paperH - elementH + diffTop;
        }
        v11975.data = data;
      }
      0 != v11974.options.onDrag.call(v11975.data.target, v11975, v11930.fn.dragLengthCNum(v11975.data.left, v11974.options), v11930.fn.dragLengthCNum(v11975.data.top, v11974.options)) && v11949(v11975);
      var v11980 = v11975.data.target;
      return v11974.hidroppables.each(function () {
        var v11981 = v11930(this);

        if (!v11981.hidroppable("options").disabled) {
          var v11982 = v11981.offset();
          v11975.pageX > v11982.left && v11975.pageX < v11982.left + v11981.outerWidth() && v11975.pageY > v11982.top && v11975.pageY < v11982.top + v11981.outerHeight() ? (this.entered || (v11930(this).trigger("_dragenter", [v11980]), this.entered = !0), v11930(this).trigger("_dragover", [v11980])) : this.entered && (v11930(this).trigger("_dragleave", [v11980]), this.entered = !1);
        }
      }), !1;
    }

    function v12021(v11984) {
      // 这里原 mouseup时, 回调了 o(e) ==> onDrag
      v11930.fn.hidraggable.isDragging = !1;
      removeVerLine(), removeHorLine();
      var v11985,
        v11986,
        v11983 = v11930.data(v11984.data.target, "hidraggable"),
        v11987 = v11983.proxy,
        v11988 = v11983.options;
      v11988.revert ? 1 == v11989() ? v11930(v11984.data.target).css({
        position: v11984.data.startPosition,
        left: v11984.data.startLeft,
        top: v11984.data.startTop
      }) : v11987 ? (v11987.parent()[0] == document.body ? (v11985 = v11984.data.startX - v11984.data.offsetWidth, v11986 = v11984.data.startY - v11984.data.offsetHeight) : (v11985 = v11984.data.startLeft, v11986 = v11984.data.startTop), v11987.animate({
        left: v11985,
        top: v11986
      }, function () {
        v11990();
      })) : v11930(v11984.data.target).animate({
        left: v11984.data.startLeft,
        top: v11984.data.startTop
      }, function () {
        v11930(v11984.data.target).css("position", v11984.data.startPosition);
      }) : (v11930(v11984.data.target).css({
        position: "absolute",
        left: v11930.fn.dragLengthC(v11984.data.left, v11988),
        top: v11930.fn.dragLengthC(v11984.data.top, v11988)
      }), v11989());

      function v11990() {
        v11987 && v11987.remove(), v11983.proxy = null;
      }

      function v11989() {
        var v11991 = !1;
        return v11983.hidroppables.each(function () {
          var v11992 = v11930(this);

          if (!v11992.hidroppable("options").disabled) {
            var v11993 = v11992.offset();
            var ptr = this.style.transform && parseFloat(this.style.transform.slice(6, -1)) || 1;
            return v11984.pageX > v11993.left && v11984.pageX < v11993.left + v11992.outerWidth() * ptr && v11984.pageY > v11993.top && v11984.pageY < v11993.top + v11992.outerHeight() * ptr ? (v11988.revert && v11930(v11984.data.target).css({
              position: v11984.data.startPosition,
              left: v11984.data.startLeft,
              top: v11984.data.startTop
            }), v11930(this).trigger("_drop", [v11984.data.target]), v11990(), v11991 = !0, this.entered = !1, !1) : void 0;
          }
        }), v11991 || v11988.revert || v11990(), v11991;
      }

      return v11988.onStopDrag.call(v11984.data.target, v11984), v11930(document).unbind(".hidraggable"), setTimeout(function () {
        v11930("body").css("cursor", "");
      }, 100), !1;
    }

    v11930.fn.hidraggable = function (v11994, v11995) {
      return "string" == typeof v11994 ? v11930.fn.hidraggable.methods[v11994](this, v11995) : this.each(function () {
        var v11996,
          v11997 = v11930.data(this, "hidraggable");
        v11997 ? (v11997.handle.unbind(".hidraggable"), v11996 = v11930.extend(v11997.options, v11994)) : v11996 = v11930.extend({}, v11930.fn.hidraggable.defaults, v11930.fn.hidraggable.parseOptions(this), v11994 || {});
        var v11998 = v11996.handle ? "string" == typeof v11996.handle ? v11930(v11996.handle, this) : v11996.handle : v11930(this);

        function v12011(v12000) {
          var v12001 = v11930.data(v12000.data.target, "hidraggable"),
            v12002 = v12001.handle,
            v12003 = v11930(v12002).offset(),
            tr = v11930(v12002)[0].style.transform && parseInt(v11930(v12002)[0].style.transform.slice(7, -1)),
            ptr = v12001.options.getScale(),
            v12004 = v11930(v12002).outerWidth();
          var v12005 = v11930(v12002).outerHeight();
          if (tr) {
            var rad = tr * Math.PI / 180,
              width = v11930(v12002).outerWidth(),
              height = v11930(v12002).outerHeight(),
              sin = Math.sin(rad),
              cos = Math.cos(rad);
            v12004 = Math.abs(width * cos) + Math.abs(height * sin),
            v12005 = Math.abs(width * sin) + Math.abs(height * cos);
          }
          if (ptr) {
            v12004 *= ptr, v12005 *= ptr;
          }
          var v12006 = v12000.pageY - v12003.top,
            v11999 = v12003.left + v12004 - v12000.pageX,
            v12007 = v12003.top + v12005 - v12000.pageY,
            v12008 = v12000.pageX - v12003.left;
          return Math.min(v12006, v11999, v12007, v12008) > v12001.options.edge;
        }

        v11930.data(this, "hidraggable", {
          options: v11996,
          handle: v11998
        }), v11996.disabled ? v11930(this).css("cursor", "") : v11998.unbind(".hidraggable").bind("mousemove.hidraggable", {
          target: this
        }, function (v12009) {
          if (!v11930.fn.hidraggable.isDragging) {
            var v12010 = v11930.data(v12009.data.target, "hidraggable").options;
            v12011(v12009) ? v11930(this).css("cursor", v12010.cursor) : v11930(this).css("cursor", "");
          }
        }).bind("mouseleave.hidraggable", {
          target: this
        }, function (v12012) {
          v11930(this).css("cursor", "");
        }).bind("mousedown.hidraggable", {
          target: this
        }, function (v12013) {
          if (0 != v12011(v12013)) {
            v11930(this).css("cursor", "");
            var v12014 = v11930(v12013.data.target).position(),
              v12015 = v11930(v12013.data.target).offset(),
              v12016 = {
                startPosition: v11930(v12013.data.target).css("position"),
                startLeft: v12014.left,
                startTop: v12014.top,
                left: v12014.left,
                top: v12014.top,
                startX: v12013.pageX,
                startY: v12013.pageY,
                offsetWidth: v12013.pageX - v12015.left,
                offsetHeight: v12013.pageY - v12015.top,
                target: v12013.data.target,
                parent: v11930(v12013.data.target).parent()[0]
              };
            var ops = v11930.data(v12013.data.target, "hidraggable");
            // item禁止移动
            if (ops.options.draggable === false) {
              return;
            }
            // 旋转时不允许移动
            if ('r resizebtn' == v12013.target.className) {
              return;
            }
            var ptr = ops.options.getScale();
            if (ptr) {
              v12016.left /= ptr, v12016.top /= ptr, v12016.startLeft /= ptr, v12016.startTop /= ptr;
            }
            var tr = v12016.target.style.transform && parseInt(v12016.target.style.transform.slice(7, -1));
            if (tr) {
              var rad = tr * Math.PI / 180,
                width = v11930(v12013.data.target).outerWidth(),
                height = v11930(v12013.data.target).outerHeight(),
                sin = Math.sin(rad),
                cos = Math.cos(rad);
              var v12017 = Math.abs(width * cos) + Math.abs(height * sin),
                v12018 = Math.abs(width * sin) + Math.abs(height * cos);
              var diffW = (v12017 - width) / 2,diffH = (v12018 - height) / 2;
              v12016.left += diffW, v12016.top += diffH, v12016.startLeft += diffW, v12016.startTop += diffH;
            }
            v11930.extend(v12013.data, v12016);
            0 != v11930.data(v12013.data.target, "hidraggable").options.onBeforeDrag.call(v12013.data.target, v12013) && (v11930(document).bind("mousedown.hidraggable", v12013.data, v12019), v11930(document).bind("mousemove.hidraggable", v12013.data, v12020), v11930(document).bind("mouseup.hidraggable", v12013.data, v12021));
          }
        });
      });
    }, v11930.fn.hidraggable.methods = {
      options: function options(v12022) {
        return v11930.data(v12022[0], "hidraggable").options;
      },
      update: function update(v12023, v12024) {
        if (v12024 && "object" == typeof v12024) {
          v11930.data(v12023[0], "hidraggable") && Object.keys(v12024).forEach(function (v12025) {
            v11930.data(v12023[0], "hidraggable").options[v12025] = v12024[v12025];
          });
        }
      },
      proxy: function proxy(v12026) {
        return v11930.data(v12026[0], "hidraggable").proxy;
      },
      enable: function enable(v12027) {
        return v12027.each(function () {
          v11930(this).hidraggable({
            disabled: !1
          });
        });
      },
      disable: function disable(v12028) {
        return v12028.each(function () {
          v11930(this).hidraggable({
            disabled: !0
          });
        });
      }
    }, v11930.fn.hidraggable.parseOptions = function (v12029) {
      var v12030 = v11930(v12029);
      return v11930.extend({}, v11930.hiprintparser.parseOptions(v12029, ["cursor", "handle", "axis", {
        revert: "boolean",
        deltaX: "number",
        deltaY: "number",
        edge: "number"
      }]), {
        disabled: !!v12030.attr("disabled") || void 0
      });
    }, v11930.fn.hidraggable.defaults = {
      proxy: null,
      revert: !1,
      cursor: "move",
      deltaX: null,
      deltaY: null,
      handle: null,
      disabled: !1,
      edge: 0,
      axis: null,
      getScale: function getScale(v12031) {},
      onBeforeDrag: function onBeforeDrag(v12032) {
      },
      onStartDrag: function onStartDrag(v12033) {
      },
      onDrag: function onDrag(v12034) {
      },
      onStopDrag: function onStopDrag(v12035) {
      }
    }, v11930.fn.hidraggable.isDragging = !1;
  }(jQuery);
}, function (v12036, v12037) {
  !function (v12038) {
    v12038.fn.hidroppable = function (v12039, v12040) {
      return "string" == typeof v12039 ? v12038.fn.hidroppable.methods[v12039](this, v12040) : (v12039 = v12039 || {}, this.each(function () {
        var v12041,
          v12042 = v12038.data(this, "hidroppable");
        v12042 ? v12038.extend(v12042.options, v12039) : (v12038(v12041 = this).addClass("hidroppable"), v12038(v12041).bind("_dragenter", function (v12043, v12044) {
          v12038.data(v12041, "hidroppable").options.onDragEnter.apply(v12041, [v12043, v12044]);
        }), v12038(v12041).bind("_dragleave", function (v12045, v12046) {
          v12038.data(v12041, "hidroppable").options.onDragLeave.apply(v12041, [v12045, v12046]);
        }), v12038(v12041).bind("_dragover", function (v12047, v12048) {
          v12038.data(v12041, "hidroppable").options.onDragOver.apply(v12041, [v12047, v12048]);
        }), v12038(v12041).bind("_drop", function (v12049, v12050) {
          v12038.data(v12041, "hidroppable").options.onDrop.apply(v12041, [v12049, v12050]);
        }), v12038.data(this, "hidroppable", {
          options: v12038.extend({}, v12038.fn.hidroppable.defaults, v12038.fn.hidroppable.parseOptions(this), v12039)
        }));
      }));
    }, v12038.fn.hidroppable.methods = {
      options: function options(v12051) {
        return v12038.data(v12051[0], "hidroppable").options;
      },
      enable: function enable(v12052) {
        return v12052.each(function () {
          v12038(this).hidroppable({
            disabled: !1
          });
        });
      },
      disable: function disable(v12053) {
        return v12053.each(function () {
          v12038(this).hidroppable({
            disabled: !0
          });
        });
      }
    }, v12038.fn.hidroppable.parseOptions = function (v12054) {
      var v12055 = v12038(v12054);
      return v12038.extend({}, v12038.hiprintparser.parseOptions(v12054, ["accept"]), {
        disabled: !!v12055.attr("disabled") || void 0
      });
    }, v12038.fn.hidroppable.defaults = {
      accept: null,
      disabled: !1,
      onDragEnter: function onDragEnter(v12056, v12057) {
      },
      onDragOver: function onDragOver(v12058, v12059) {
      },
      onDragLeave: function onDragLeave(v12060, v12061) {
      },
      onDrop: function onDrop(v12062, v12063) {
      }
    };
  }(jQuery);
}, function (v12064, v12065) {
  var v12066;
  (v12066 = jQuery).hiprintparser = {
    parseOptions: function parseOptions(v12067, v12068) {
      var v12069 = v12066(v12067),
        v12070 = {},
        v12071 = v12066.trim(v12069.attr("data-options"));

      if (v12071 && ("{" != v12071.substring(0, 1) && (v12071 = "{" + v12071 + "}"), v12070 = new Function("return " + v12071)()), v12068) {
        for (var v12072 = {}, v12073 = 0; v12073 < v12068.length; v12073++) {
          var v12074 = v12068[v12073];
          if ("string" == typeof v12074) v12072[v12074] = "width" == v12074 || "height" == v12074 || "left" == v12074 || "top" == v12074 ? parseInt(v12067.style[v12074]) || void 0 : v12069.attr(v12074);else for (var v12075 in v12074) {
            var v12076 = v12074[v12075];
            "boolean" == v12076 ? v12072[v12075] = v12069.attr(v12075) ? "true" == v12069.attr(v12075) : void 0 : "number" == v12076 && (v12072[v12075] = "0" == v12069.attr(v12075) ? 0 : parseFloat(v12069.attr(v12075)) || void 0);
          }
        }

        v12066.extend(v12070, v12072);
      }

      return v12070;
    }
  }, v12066.fn.dragLengthC = function (v12077, v12078) {
    return "pt" == v12078.moveUnit ? v12066.fn.dragLengthCNum(v12077, v12078) + "pt" : v12066.fn.dragLengthCNum(v12077, v12078);
  }, v12066.fn.dragLengthCNum = function (v12079, v12080) {
    var v12081 = 3;

    if ("pt" == v12080.moveUnit) {
      var v12082 = .75 * v12079;
      return v12080.minMove && (v12081 = v12080.minMove), Math.round(v12082 / v12081) * v12081;
    }

    return Math.round(v12082 / v12081) * v12081;
  };
}, function (v12083, v12084) {
  var v12085, v12086, v12087;
  v12085 = jQuery, v12086 = {
    maxPanelIndex: 0
  }, (v12087 = function v12088(v12089) {
    this.options = v12085.data(v12089.target, "hireizeable").options, this.init(v12089.target);
  }).prototype = {
    numHandlerText: function numHandlerText(v12090) {
      return this.numHandler(v12090) + "pt";
    },
    numHandler: function numHandler(v12091) {
      var v12092 = 1.5,
        v12093 = .75 * v12091;
      return this.options.minResize && (v12092 = this.options.minResize), Math.round(v12093 / v12092) * v12092;
    },
    init: function init(v12094) {
      this.initResizeBox(v12094);
    },
    initResizeBox: function initResizeBox(v12095) {
      var v12096 = this;
      v12085(v12095).each(function () {
        var v12097;
        v12086.maxPanelIndex += 1, v12096.options.noContainer ? v12097 = v12085(v12095) : (v12097 = v12085("<div panelIndex=" + v12086.maxPanelIndex + ' class="resize-panel"></div>')).css({
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          position: "absolute",
          "background-color": "rgba(0,0,0,0.5)",
          cursor: "move",
          display: "none"
        }), v12096.appendHandler(v12097, v12085(this));

        var v12098 = {
            name: "n",
            target: v12085('<div class="n resizebtn" style="cursor: n-resize;top: -12px;margin-left: -4px;left: 50%;"></div>')
          },
          v12099 = {
            name: "s",
            target: v12085('<div class="s resizebtn" style="cursor: s-resize;bottom: -12px;margin-left: -4px;left: 50%;"></div>')
          },
          v12100 = {
            name: "w",
            target: v12085('<div class="w resizebtn" style="cursor: w-resize;left: -12px;margin-top: -4px;top: 50%;"></div>')
          },
          v12101 = {
            name: "e",
            target: v12085('<div class="e resizebtn" style="cursor: e-resize; top: 50%; margin-top:-4px;right: -12px;"></div>')
          },
          v12102 = {
            name: "ne",
            target: v12085('<div class="ne resizebtn" style="cursor: ne-resize;top: -12px;right: -12px;"></div>')
          },
          v12103 = {
            name: "nw",
            target: v12085('<div class="nw resizebtn" style=" cursor: nw-resize;top: -12px;left:-12px;"></div>')
          },
          v12104 = {
            name: "se",
            target: v12085('<div class="se resizebtn" style="cursor: se-resize;bottom:-12px;right: -12px;"></div>')
          },
          v12105 = {
            name: "sw",
            target: v12085('<div class="sw resizebtn" style="cursor: sw-resize;bottom: -12px;left: -12px;"></div>')
          },
          v12098 = {
            name: "r",
            target: v12085('<div class="r resizebtn" style="cursor:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURUdwTP///9XV1R0dHf///3Nzc////////////////1ZWVq+vr/T09PX19QQEBP///////8XFxf///////////wYGBv///+jo6P///4aGhqioqMzMzP///2BgYP///////////zExMf///wAAAP///xLps0AAAAAjdFJOUwCxxOdixRDmzSDMv8/Z+tz5wWpXWPk3zALCv8KnyXZVMNuNPnv3CwAAAJ1JREFUKM/NkckOwyAMRFkDBMhC9qWr+//fWCIV1WlzrjoXS36yxmMT8hdqqKoUvRAjMtw22kvecem1GjTuK1vApmI+wQMBbQFy5li+QQRaX4AtRX+vbntAJeRl9HTTx4TiwESs61DXNUPmVQeujzVrQwh43TTxpeRBslVfMUhbiXKWyiAwvnIsMcdyJkfJYdpNvG/ltDm+bjP+8KFP8ggL+zQLGxwAAAAASUVORK5CYII=\') 14 14,alias;top: -16px;margin-left: -4px;left: 50%;"></div>')
          },
          sizeBox = v12085('<div class="size-box" style="position: absolute;left:-2px;"></div>'),
          deleteBtn = v12085('<div class="del-btn">✕</div>'),
          v12106 = function v12107() {
            var v12108 = [],
              v12109 = v12096.options.showPoints;
            return v12085.each([v12098, v12099, v12100, v12101, v12102, v12103, v12104, v12105], function (v12110, v12111) {
              v12085.inArray(v12111.name, v12109) > -1 && v12108.push(v12111.target);
            }), v12108;
          };
        v12096.refreshSizeBox(void 0, sizeBox, v12097);
        // draggable 为 false 时不显示 resizebox 右上角删除按钮
        if (v12096.options.draggable != false) {
          v12097.append(deleteBtn);
          v12097.on("mousedown", ".del-btn", () => {
            var keyboardEvent = new KeyboardEvent("keydown", { bubbles: true, keyCode: 46 });
            v12095.dispatchEvent(keyboardEvent);
          });
        }
        v12096.addHandlerCss(v12106()), v12096.appendHandler(v12106(), v12097), v12096.bindResizeEvent(v12097, v12085(this));
        var v12112 = v12085(this);
        v12085(v12097).on("mousedown", ".resizebtn", function () {
          v12112.addClass("resizeing");
        }), v12085(".easyui-droppable").on("mouseup", function () {
          v12112.removeClass("resizeing");
        }), v12096.bindTrigger(v12085(this));
      }), v12096.bindHidePanel();
    },
    addHandlerCss: function addHandlerCss(v12113) {
      for (var v12114 = 0; v12114 < v12113.length; v12114++) {
        v12113[v12114].css({
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "#ff6600",
          "border-radius": "50%"
        });
      }
    },
    appendHandler: function appendHandler(v12115, v12116) {
      v12116.find(".resize-panel").remove();
      for (var v12117 = 0; v12117 < v12115.length; v12117++) {
        v12116.append(v12115[v12117]);
      }
    },
    refreshSizeBox: function refreshSizeBox(v12118, box, v12119) {
      if (!this.options.showSizeBox) return;
      if (box) {
        v12119.append(box);
      }
      var style, sizeBox;
      if (v12118 && v12118.length) {
        style = v12118[0].style;
        sizeBox = v12118.children("div[panelindex]").find(".size-box");
      } else if (v12119 && v12119.parent()) {
        var v12118 = v12119.parent();
        if (v12118.hasClass("hiprint-printPaper-content")) return;
        style = v12118[0].style;
        if (!style.width) {
          style.width = hinnn.px.toPt(v12118[0].offsetWidth) + "pt";
        }
        if (!style.height) {
          style.height = hinnn.px.toPt(v12118[0].offsetHeight) + "pt";
        }
        sizeBox = v12118.children("div[panelindex]").find(".size-box");
      }
      if (sizeBox) {
        sizeBox.text(style.width + ' x ' + style.height);
        sizeBox.css('top', -(sizeBox.outerHeight() || 20));
      }
    },
    triggerResize: function triggerResize(v12120, v12121) {
      // 处理按住 ctrl / command 点击元素 多选
      if (!(v12121.ctrlKey || v12121.metaKey)) {
        v12120.siblings().children("div[panelindex]").removeClass('selected');
        v12120.siblings().children("div[panelindex]").css({
          display: "none"
        });
      }
      v12120.children("div[panelindex]").addClass('selected');
      v12120.children("div[panelindex]").css({
        display: "block"
      });
      this.refreshSizeBox(v12120);
    },
    bindResizeEvent: function bindResizeEvent(v12122, v12123) {
      var v12124 = this,
        v12125 = 0,
        v12126 = 0,
        v12127 = v12122.width(),
        v12128 = v12122.height(),
        v12129 = v12122.offset().left,
        v12130 = v12122.offset().top,
        v12131 = v12124.options.noContainer ? v12085(v12123) : v12122.parent(),
        v12132 = !1; // 右
      v12122.on("mousedown", ".e", function (v12133) {
        v12125 = v12133.pageX, v12127 = v12122.width(), v12132 = !0;
      });
      var v12134 = !1; // 下
      v12122.on("mousedown", ".s", function (v12135) {
        v12126 = v12135.pageY, v12128 = v12122.height(), v12134 = !0;
      });
      var v12136 = !1; // 左
      v12122.on("mousedown", ".w", function (v12137) {
        v12125 = v12137.pageX, v12127 = v12122.width(), v12136 = !0, v12129 = v12131.offset().left;
      });
      var v12138 = !1; // 上
      v12122.on("mousedown", ".n", function (v12139) {
        v12126 = v12139.pageY, v12128 = v12122.height(), v12138 = !0, v12130 = v12131.offset().top;
      });
      var v12140 = !1; // 右上
      v12122.on("mousedown", ".ne", function (v12141) {
        v12125 = v12141.pageX, v12126 = v12141.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12140 = !0, v12130 = v12131.offset().top;
      });
      var v12142 = !1; // 左上
      v12122.on("mousedown", ".nw", function (v12143) {
        v12125 = v12143.pageX, v12126 = v12143.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12130 = v12131.offset().top, v12129 = v12131.offset().left, v12142 = !0;
      });
      var v12144 = !1; // 右下
      v12122.on("mousedown", ".se", function (v12145) {
        v12125 = v12145.pageX, v12126 = v12145.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12144 = !0;
      });
      var v12146 = !1; // 左下
      v12122.on("mousedown", ".sw", function (v12147) {
        v12125 = v12147.pageX, v12126 = v12147.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12146 = !0, v12129 = v12131.offset().left;
      });
      var rt = !1; // 旋转
      v12122.on("mousedown", ".r", function (v12148) {
        v12125 = v12148.pageX, v12126 = v12148.pageY, v12127 = v12122.width(), v12128 = v12122.height(), rt = !0, v12129 = v12127 / 2 + v12131.offset().left, v12130 = v12128 / 2 + v12131.offset().top;
      });
      v12122.on("dblclick", ".r", function (v12149) {
        v12131.css({ transform: "rotate(" + 0 + "deg)" });
        v12124.options.onResize(v12149, void 0, void 0, void 0, void 0, 0);
      });
      var v12150 = !1;
      v12122.on("mousedown", function (v12151) {
        v12124.options.onBeforeResize(), v12125 = v12151.pageX, v12126 = v12151.pageY, v12130 = v12131.offset().top, v12129 = v12131.offset().left, v12150 = !1;
      }), v12085(v12124.options.stage).on("mousemove", function (v12152) {
        if (v12132) {// 右
          var v12153 = (v12152.pageX - v12125) / v12124.options.getScale();
          v12122.css({
            width: "100%"
          }), v12131.css({
            width: v12124.numHandlerText(v12127 + v12153)
          }), v12124.options.onResize(v12152, void 0, v12124.numHandler(v12127 + v12153), void 0, void 0);
        } else if (v12134) {// 下
          var v12154 = (v12152.pageY - v12126) / v12124.options.getScale();
          v12122.css({
            height: "100%"
          }), v12131.css({
            height: v12124.numHandlerText(v12128 + v12154)
          }), v12124.options.onResize(v12152, v12124.numHandler(v12128 + v12154), void 0, void 0, void 0);
        } else if (rt) {// 旋转
          v12122.css({ height: "100%" });
          var eo = v12152.pageX,er = v12152.pageY;
          var direct = (eo - v12125) * 360 / 100;
          v12125 = v12152.pageX;
          var lastAngle = v12131[0].style.transform && parseInt(v12131[0].style.transform.slice(7, -1)) || 0;
          var v12155 = lastAngle + direct;
          if (Math.abs(v12155) > 360) {
            v12155 = v12155 % 360;
          }
          v12131.css({ transform: "rotate(" + v12155 + "deg)" });
          v12124.options.onResize(v12152, void 0, void 0, void 0, void 0, v12155);
        } else if (v12136) {// 左
          v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12122.css({
            width: "100%"
          }), v12131.css({
            width: v12124.numHandlerText(v12127 - v12153),
            left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153))
          }), v12124.options.onResize(v12152, void 0, v12124.numHandler(v12127 - v12153), void 0, v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153));
        } else if (v12138) {// 上
          v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
            height: "100%"
          }), v12131.css({
            height: v12124.numHandlerText(v12128 - v12154),
            top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154)
          }), v12124.options.onResize(v12152, v12124.numHandler(v12128 - v12154), void 0, v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), void 0);
        } else if (v12140) {// 右上
          v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
            height: "100%",
            width: "100%"
          }), v12131.css({
            height: v12124.numHandlerText(v12128 - v12154),
            top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154),
            width: v12124.numHandlerText(v12127 + v12153)
          }), v12124.options.onResize(v12152, v12124.numHandler(v12128 - v12154), v12124.numHandler(v12127 + v12153), v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), void 0);
        } else if (v12142) {// 左上
          v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
            height: "100%",
            width: "100%"
          }), v12131.css({
            height: v12124.numHandlerText(v12128 - v12154),
            top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154),
            width: v12124.numHandlerText(v12127 - v12153),
            left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12129 + v12153)
          }), v12124.options.onResize(v12152, v12124.numHandler(v12128 - v12154), v12124.numHandler(v12127 - v12153), v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153));
        } else if (v12144) {// 右下
          (v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale()),
          v12122.css({ width: "100%", height: "100%" });
          if (v12152.shiftKey) {
            v12131.css({ width: v12124.numHandlerText(v12127 + v12153), height: v12124.numHandlerText(v12128 + v12154) });
            v12124.options.onResize(v12152, v12124.numHandler(v12128 + v12154), v12124.numHandler(v12127 + v12153), void 0, void 0);
          } else {
            // 宽高比
            var ratio = v12128 / v12127;
            var width = v12127 + v12153,height = v12128 + v12154;
            height = width * ratio;
            v12131.css({ width: v12124.numHandlerText(width), height: v12124.numHandlerText(height) });
            v12124.options.onResize(v12152, v12124.numHandler(height), v12124.numHandler(width), void 0, void 0);
          }
        } else if (v12146) {// 左下
          v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
            width: "100%",
            height: "100%"
          }), v12131.css({
            width: v12124.numHandlerText(v12127 - v12153),
            left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12129 + v12153),
            height: v12124.numHandlerText(v12128 + v12154)
          }), v12124.options.onResize(v12152, v12124.numHandler(v12128 + v12154), v12124.numHandler(v12127 - v12153), v12124.numHandler(otundefinedop), v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153));
        } else {// 按下
          v12150 && (v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12131.css({
            left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12129 + v12153),
            top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154)
          }), v12124.options.onResize(v12152, void 0, void 0, v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153)));
        }
        ;
      }).on("mouseup", function (v12156) {
        // i.options.onStopResize(rt);
        // 当某个 '控制点' 按下时 (每个'控制点'按下状态是独立的)
        if (v12132 || v12134 || v12136 || v12138 || v12140 || v12142 || v12146 || v12144 || v12150 || rt) {
          v12124.options.onStopResize(rt);
        }
        v12132 = !1, v12134 = !1, v12136 = !1, v12138 = !1, v12140 = !1, v12142 = !1, v12146 = !1, v12144 = !1, v12150 = !1, rt = !1;
      });
    },
    bindTrigger: function bindTrigger(v12157) {
      var v12158 = this;
      v12157.on("click", function (_n) {
        _n.stopPropagation(), v12158.triggerResize(v12157, _n), v12085(".mouseRect").remove();
      });
    },
    bindHidePanel: function bindHidePanel(v12159) {
      if (v12086.maxPanelIndex < 2) {
        var v12160 = this.options.stage;
        v12085(v12160).bind("click", function (v12161) {
          // 仅点击设计面板时清除多选元素
          if (v12161.target.className && _typeof(v12161.target.className) == "string" && v12161.target.className.includes("design")) {
            v12161.stopPropagation(), v12085("div[panelindex]").css({
              display: "none"
            });
            v12085("div[panelindex]").removeClass("selected");
          }
        });
      }
    }
  }, v12085.fn.extend({
    hireizeable: function hireizeable(v12162) {
      return this.each(function () {
        var v12163,
          v12164 = v12085.data(this, "hireizeable");
        v12163 = v12164 ? v12085.extend({}, v12164.options, v12162 || {}) : v12085.extend({}, v12085.fn.hireizeable.defaults, v12162 || {});
        v12085.data(this, "hireizeable", {
          options: v12163
        }), new v12087({
          target: this,
          onResize: function onResize(v12165, v12166, v12167, v12168, v12169) {
          },
          onStopResize: function onStopResize(v12170, v12171, v12172, v12173, v12174) {
          }
        });
      });
    }
  }), v12085.fn.hireizeable.defaults = {
    stage: document,
    reizeUnit: "pt",
    minResize: 1.5,
    showSizeBox: !0,
    showPoints: ["s", "e"],
    noContainer: !1,
    onBeforeResize: function onBeforeResize(v12175, v12176, v12177, v12178, v12179) {
    },
    onResize: function onResize(v12180, v12181, v12182, v12183, v12184) {
    },
    onStopResize: function onStopResize(v12185, v12186, v12187, v12188, v12189) {
    },
    noDrag: !1
  };
}, function (v12190, v12191) {
  var v12192, v12193;
  jQuery, v12192 = "connected", v12193 = "reconnecting", window.hiwebSocket = {
    opened: !1,
    name: "webSockets",
    host: "http://localhost:17521",
    token: null,
    reconnectTimeout: 6e4,
    reconnectWindowSetTimeout: null,
    reconnectDelay: 2e3,
    supportsKeepAlive: function supportsKeepAlive() {
      return !0;
    },
    hasIo: function hasIo(v12194) {
      return window.io;
    },
    send: function send(v12195) {
      try {
        this.socket.emit("news", v12195);
      } catch (v12196) {
        console.log("send data error:" + (v12195 || "") + JSON.stringify(v12196));
      }
    },
    getPrinterList: function getPrinterList() {
      return this.printerList;
    },
    refreshPrinterList: function refreshPrinterList() {
      try {
        this.socket.emit("refreshPrinterList");
      } catch (v12197) {
        console.log("refreshPrinterList error:" + JSON.stringify(v12197));
      }
    },
    getPaperSizeInfo: function getPaperSizeInfo(printer) {
      try {
        console.warn("getPaperSizeInfo 是一个测试功能，仅win客户端支持该api！");
        this.socket.emit("getPaperSizeInfo", printer);
      } catch (v12198) {
        console.log("getPaperSizeInfo error:" + JSON.stringify(v12198));
      }
    },
    getClients: function getClients() {
      try {
        this.socket.emit("getClients");
      } catch (v12199) {
        console.log("getClients error:" + JSON.stringify(v12199));
      }
    },
    getClientInfo: function getClientInfo() {
      try {
        this.socket.emit("getClientInfo");
      } catch (v12200) {
        console.log("getClientInfo error:" + JSON.stringify(v12200));
      }
    },
    getAddress: function getAddress(type, ...args) {
      try {
        this.socket.emit("address", type, ...args);
      } catch (v12201) {
        console.log("getAddress error:" + JSON.stringify(v12201));
      }
    },
    ippPrint: function ippPrint(options) {
      try {
        this.socket.emit("ippPrint", options);
      } catch (v12202) {
        console.log("ippPrint error:" + JSON.stringify(v12202));
      }
    },
    ippRequest: function ippRequest(options) {
      try {
        this.socket.emit("ippRequest", options);
      } catch (v12203) {
        console.log("ippRequest error:" + JSON.stringify(v12203));
      }
    },
    setHost: function (host, token, cb) {
      if (typeof token === "function") {
        cb = token;
        token = undefined;
      }
      this.host = host;
      this.token = token;
      this.stop();
      this.start(cb);
    },
    start: function start(cb) {
      var _this = this;

      var v12204 = this;
      window.WebSocket ? this.socket || (this.socket = window.io(this.host, {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        auth: {
          token: this.token
        }
      }), this.socket.on("connect", function (v12205) {
        v12204.opened = !0, console.log("Websocket opened."), _this.socket.on("successs", function (v12206) {
          hinnn.event.trigger("printSuccess_" + v12206.templateId, v12206);
        }), _this.socket.on("error", function (v12207) {
          hinnn.event.trigger("printError_" + v12207.templateId, v12207);
        }), _this.socket.on("clients", function (clients) {
          v12204.clients = clients;
          hinnn.event.trigger("clients", clients);
        }), _this.socket.on("clientInfo", function (clientInfo) {
          v12204.clientInfo = clientInfo;
          hinnn.event.trigger("clientInfo", clientInfo);
        }), _this.socket.on("printerList", function (v12208) {
          v12204.printerList = v12208;
          hinnn.event.trigger("printerList", v12208);
        }), _this.socket.on("paperSizeInfo", function (v12209) {
          v12204.paperSize = Array.isArray(v12209) ? v12209 : [v12209];
          hinnn.event.trigger("paperSizeInfo", v12204.paperSize);
        }), _this.socket.on("address", function (type, addr, v12210) {
          hinnn.event.trigger("address_" + type, { 'addr': addr, 'e': v12210 });
        }), _this.socket.on("ippPrinterConnected", function (printer) {
          hinnn.event.trigger("ippPrinterConnected", printer);
        }), _this.socket.on("ippPrinterCallback", function (err, res) {
          hinnn.event.trigger("ippPrinterCallback", { 'err': err, 'res': res });
        }), _this.socket.on("ippRequestCallback", function (err, res) {
          hinnn.event.trigger("ippRequestCallback", { 'err': err, 'res': res });
        }), v12204.state = v12192;
        cb && cb(true, v12205);
      }), this.socket.on("connect_error", function (v12211) {
        console.error(v12211);
        hinnn.event.trigger("connect_error", v12211);
      }), this.socket.on("disconnect", function () {
        v12204.opened = !1;
        cb && cb(false);
      })) : console.log("WebSocket start fail"), cb && cb(false);
    },
    reconnect: function reconnect() {
      this.state !== v12192 && this.state !== v12193 || (this.stop(), this.ensureReconnectingState() && (console.log("Websocket reconnecting."), this.start()));
    },
    stop: function stop() {
      this.socket && (console.log("Closing the Websocket."), this.socket.close(), this.socket = null, this.printerList = []);
    },
    ensureReconnectingState: function ensureReconnectingState() {
      return this.state = v12193, this.state === v12193;
    }
  };
}, function (v12212, v12213, v12214) {
  var v12215 = v12214(28);
  "string" == typeof v12215 && (v12215 = [[v12212.i, v12215, ""]]);
  var v12217 = {
    hmr: !0,
    transform: void 0,
    insertInto: void 0
  };
  v12214(30)(v12215, v12217);
  v12215.locals && (v12212.exports = v12215.locals);
}, function (v12218, v12219, v12220) {
  (v12218.exports = v12220(29)(!1)).push([v12218.i, ".hicontextmenu {\r\n\tposition: absolute;\r\n\tdisplay: inline-block;\r\n\twidth: 215px;\r\n\tpadding: 0 0;\r\n\tmargin: 0;\r\n\tfont-family: inherit;\r\n\tfont-size: inherit;\r\n\tlist-style-type: none;\r\n\tlist-style: none;\r\n\tbackground: #fff;\r\n\tborder: 1px solid #bebebe;\r\n\tborder-radius: 2px;\r\n\tfont-size: 13px;\r\n}\r\n\r\n.hicontextmenuroot .hicontextmenuitem {\r\n\tposition: relative;\r\n\t-webkit-box-sizing: content-box;\r\n\t-moz-box-sizing: content-box;\r\n\tbox-sizing: content-box;\r\n\tpadding: .2em 12px;\r\n\tcolor: #2f2f2f;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\ttext-decoration: none;\r\n\r\n\tuser-select: none;\r\n\tbackground-color: #fff;\r\n\r\n}\r\n\r\n.hicontextmenuroot>.hicontextmenuitem:hover,\r\n.hicontextmenuroot .hicontextmenuitem > a:hover {\r\n\tbackground-color: #f3f3f3;\r\n}\r\n\r\n.hicontextmenuroot .hicontextmenuitem>a {\r\n\ttext-decoration: none;\r\n\tcolor: #363636;\r\n\tline-height: 22px;\r\n\r\n}\r\n\r\n.hicontextmenuroot .hicontextsubmenu>ul {\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\r\n}\r\n\r\n.hicontextmenuroot .hicontextsubmenu:hover>ul {\r\n\tdisplay: block;\r\n\tleft: 100%;\r\n\ttop: -1px;\r\n\tmargin-left: 0px;\r\n}\r\n\r\n.hicontextmenuroot .borderBottom {\r\n\tborder-bottom: 1px solid #efe6e6;\r\n}\r\n\r\n.hicontextmenuroot .disable> a {\r\n  \r\n    color: #ccc;\r\n   \r\n}\r\n.hicontextmenuroot>.disable:hover,\r\n.hicontextmenuroot .disable> a:hover {\r\n\tbackground-color:#fff;\r\n}", ""]);
}, function (v12222, v12223, v12224) {
  "use strict";

  v12222.exports = function (v12225) {
    var v12226 = [];
    return v12226.toString = function () {
      return this.map(function (v12227) {
        var v12228 = function (v12229, v12230) {
          var v12231 = v12229[1] || "",
            v12232 = v12229[3];
          if (!v12232) return v12231;

          if (v12230 && "function" == typeof btoa) {
            var v12233 = (v12234 = v12232, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(v12234)))) + " */"),
              v12235 = v12232.sources.map(function (v12236) {
                return "/*# sourceURL=" + v12232.sourceRoot + v12236 + " */";
              });
            return [v12231].concat(v12235).concat([v12233]).join("\n");
          }

          var v12234;
          return [v12231].join("\n");
        }(v12227, v12225);

        return v12227[2] ? "@media " + v12227[2] + "{" + v12228 + "}" : v12228;
      }).join("");
    }, v12226.i = function (v12238, v12239) {
      "string" == typeof v12238 && (v12238 = [[null, v12238, ""]]);

      for (var v12240 = {}, v12241 = 0; v12241 < this.length; v12241++) {
        var v12242 = this[v12241][0];
        null != v12242 && (v12240[v12242] = !0);
      }

      for (v12241 = 0; v12241 < v12238.length; v12241++) {
        var v12243 = v12238[v12241];
        null != v12243[0] && v12240[v12243[0]] || (v12239 && !v12243[2] ? v12243[2] = v12239 : v12239 && (v12243[2] = "(" + v12243[2] + ") and (" + v12239 + ")"), v12226.push(v12243));
      }
    }, v12226;
  };
}, function (v12244, v12245, v12246) {
  var v12247,
    v12248,
    v12249 = {},
    v12250 = (v12247 = function v12251() {
      return window && document && document.all && !window.atob;
    }, function () {
      return void 0 === v12248 && (v12248 = v12247.apply(this, arguments)), v12248;
    }),
    v12252 = function (v12253) {
      var v12254 = {};
      return function (v12255, v12256) {
        if ("function" == typeof v12255) return v12255();

        if (void 0 === v12254[v12255]) {
          var v12257 = function (v12258, v12259) {
            return v12259 ? v12259.querySelector(v12258) : document.querySelector(v12258);
          }.call(this, v12255, v12256);

          if (window.HTMLIFrameElement && _instanceof(v12257, window.HTMLIFrameElement)) try {
            v12257 = v12257.contentDocument.head;
          } catch (v12260) {
            v12257 = null;
          }
          v12254[v12255] = v12257;
        }

        return v12254[v12255];
      };
    }(),
    v12261 = null,
    v12262 = 0,
    v12263 = [],
    v12264 = v12246(31);

  function v12265(v12266, v12267) {
    for (var v12268 = 0; v12268 < v12266.length; v12268++) {
      var v12269 = v12266[v12268],
        v12270 = v12249[v12269.id];

      if (v12270) {
        v12270.refs++;

        for (var v12271 = 0; v12271 < v12270.parts.length; v12271++) {
          v12270.parts[v12271](v12269.parts[v12271]);
        }

        for (; v12271 < v12269.parts.length; v12271++) {
          v12270.parts.push(v12272(v12269.parts[v12271], v12267));
        }
      } else {
        var v12273 = [];

        for (v12271 = 0; v12271 < v12269.parts.length; v12271++) {
          v12273.push(v12272(v12269.parts[v12271], v12267));
        }

        v12249[v12269.id] = {
          id: v12269.id,
          refs: 1,
          parts: v12273
        };
      }
    }
  }

  function v12274(v12275, v12276) {
    for (var v12277 = [], v12278 = {}, v12279 = 0; v12279 < v12275.length; v12279++) {
      var v12280 = v12275[v12279],
        v12281 = v12276.base ? v12280[0] + v12276.base : v12280[0],
        v12282 = {
          css: v12280[1],
          media: v12280[2],
          sourceMap: v12280[3]
        };
      v12278[v12281] ? v12278[v12281].parts.push(v12282) : v12277.push(v12278[v12281] = {
        id: v12281,
        parts: [v12282]
      });
    }

    return v12277;
  }

  function v12283(v12284, v12285) {
    var v12286 = v12252(v12284.insertInto);
    if (!v12286) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
    var v12287 = v12263[v12263.length - 1];
    if ("top" === v12284.insertAt) v12287 ? v12287.nextSibling ? v12286.insertBefore(v12285, v12287.nextSibling) : v12286.appendChild(v12285) : v12286.insertBefore(v12285, v12286.firstChild), v12263.push(v12285);else if ("bottom" === v12284.insertAt) v12286.appendChild(v12285);else {
      if ("object" != _typeof(v12284.insertAt) || !v12284.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
      var v12288 = v12252(v12284.insertAt.before, v12286);
      v12286.insertBefore(v12285, v12288);
    }
  }

  function v12289(v12290) {
    if (null === v12290.parentNode) return !1;
    v12290.parentNode.removeChild(v12290);
    var v12291 = v12263.indexOf(v12290);
    v12291 >= 0 && v12263.splice(v12291, 1);
  }

  function v12292(v12293) {
    var v12294 = document.createElement("style");

    if (void 0 === v12293.attrs.type && (v12293.attrs.type = "text/css"), void 0 === v12293.attrs.nonce) {
      var v12295 = function () {
        0;
        return v12246.nc;
      }();

      v12295 && (v12293.attrs.nonce = v12295);
    }

    return v12296(v12294, v12293.attrs), v12283(v12293, v12294), v12294;
  }

  function v12296(v12297, v12298) {
    Object.keys(v12298).forEach(function (v12299) {
      v12297.setAttribute(v12299, v12298[v12299]);
    });
  }

  function v12272(v12300, v12301) {
    var v12302, v12303, v12304, v12305;

    if (v12301.transform && v12300.css) {
      if (!(v12305 = "function" == typeof v12301.transform ? v12301.transform(v12300.css) : v12301.transform.default(v12300.css))) return function () {
      };
      v12300.css = v12305;
    }

    if (v12301.singleton) {
      var v12306 = v12262++;
      v12302 = v12261 || (v12261 = v12292(v12301)), v12303 = v12307.bind(null, v12302, v12306, !1), v12304 = v12307.bind(null, v12302, v12306, !0);
    } else v12300.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (v12302 = function (v12308) {
      var v12309 = document.createElement("link");
      return void 0 === v12308.attrs.type && (v12308.attrs.type = "text/css"), v12308.attrs.rel = "stylesheet", v12296(v12309, v12308.attrs), v12283(v12308, v12309), v12309;
    }(v12301), v12303 = function (v12310, v12311, v12312) {
      var v12313 = v12312.css,
        v12314 = v12312.sourceMap,
        v12315 = void 0 === v12311.convertToAbsoluteUrls && v12314;
      (v12311.convertToAbsoluteUrls || v12315) && (v12313 = v12264(v12313));
      v12314 && (v12313 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(v12314)))) + " */");
      var v12316 = new Blob([v12313], {
          type: "text/css"
        }),
        v12317 = v12310.href;
      v12310.href = URL.createObjectURL(v12316), v12317 && URL.revokeObjectURL(v12317);
    }.bind(null, v12302, v12301), v12304 = function v12318() {
      v12289(v12302), v12302.href && URL.revokeObjectURL(v12302.href);
    }) : (v12302 = v12292(v12301), v12303 = function (v12319, v12320) {
      var v12321 = v12320.css,
        v12322 = v12320.media;
      v12322 && v12319.setAttribute("media", v12322);
      if (v12319.styleSheet) v12319.styleSheet.cssText = v12321;else {
        for (; v12319.firstChild;) {
          v12319.removeChild(v12319.firstChild);
        }

        v12319.appendChild(document.createTextNode(v12321));
      }
    }.bind(null, v12302), v12304 = function v12323() {
      v12289(v12302);
    });

    return v12303(v12300), function (v12324) {
      if (v12324) {
        if (v12324.css === v12300.css && v12324.media === v12300.media && v12324.sourceMap === v12300.sourceMap) return;
        v12303(v12300 = v12324);
      } else v12304();
    };
  }

  v12244.exports = function (v12325, v12326) {
    if ("undefined" != typeof DEBUG && DEBUG && "object" != (typeof document === "undefined" ? "undefined" : _typeof(document))) throw new Error("The style-loader cannot be used in a non-browser environment");
    (v12326 = v12326 || {}).attrs = "object" == _typeof(v12326.attrs) ? v12326.attrs : {}, v12326.singleton || "boolean" == typeof v12326.singleton || (v12326.singleton = v12250()), v12326.insertInto || (v12326.insertInto = "head"), v12326.insertAt || (v12326.insertAt = "bottom");
    var v12327 = v12274(v12325, v12326);
    return v12265(v12327, v12326), function (v12328) {
      for (var v12329 = [], v12330 = 0; v12330 < v12327.length; v12330++) {
        var v12331 = v12327[v12330];
        (v12332 = v12249[v12331.id]).refs--, v12329.push(v12332);
      }

      v12328 && v12265(v12274(v12328, v12326), v12326);

      for (v12330 = 0; v12330 < v12329.length; v12330++) {
        var v12332;

        if (0 === (v12332 = v12329[v12330]).refs) {
          for (var v12333 = 0; v12333 < v12332.parts.length; v12333++) {
            v12332.parts[v12333]();
          }

          delete v12249[v12332.id];
        }
      }
    };
  };

  var v12334,
    v12335 = (v12334 = [], function (v12336, v12337) {
      return v12334[v12336] = v12337, v12334.filter(Boolean).join("\n");
    });

  function v12307(v12338, v12339, v12340, v12341) {
    var v12342 = v12340 ? "" : v12341.css;
    if (v12338.styleSheet) v12338.styleSheet.cssText = v12335(v12339, v12342);else {
      var v12343 = document.createTextNode(v12342),
        v12344 = v12338.childNodes;
      v12344[v12339] && v12338.removeChild(v12344[v12339]), v12344.length ? v12338.insertBefore(v12343, v12344[v12339]) : v12338.appendChild(v12343);
    }
  }
}, function (v12345, v12346) {
  v12345.exports = function (v12347) {
    var v12348 = "undefined" != typeof window && window.location;
    if (!v12348) throw new Error("fixUrls requires window.location");
    if (!v12347 || "string" != typeof v12347) return v12347;
    var v12349 = v12348.protocol + "//" + v12348.host,
      v12350 = v12349 + v12348.pathname.replace(/\/[^\/]*$/, "/");
    return v12347.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (v12351, v12352) {
      var v12353,
        v12354 = v12352.trim().replace(/^"(.*)"$/, function (v12355, v12356) {
          return v12356;
        }).replace(/^'(.*)'$/, function (v12357, v12358) {
          return v12358;
        });
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(v12354) ? v12351 : (v12353 = 0 === v12354.indexOf("//") ? v12354 : 0 === v12354.indexOf("/") ? v12349 + v12354 : v12350 + v12354.replace(/^\.\//, ""), "url(" + JSON.stringify(v12353) + ")");
    });
  };
}, function (v12359, v12360) {
  var v12361, v12362;
  window, document, v12361 = jQuery, (v12362 = function v12363(v12364, v12365) {
    this.init(v12364, v12365);
  }).prototype = {
    init: function init(v12366, v12367) {
      this.ele = v12366, this.defaults = {
        menu: [{
          text: "text",
          menus: [{}, {}],
          callback: function callback() {
          }
        }],
        target: function target(v12368) {
        },
        width: 100,
        itemHeight: 28,
        bgColor: "#fff",
        color: "#333",
        fontSize: 14,
        hoverBgColor: "#f5f5f5"
      }, this.opts = v12361.extend(!0, {}, this.defaults, v12367), this.random = new Date().getTime() + parseInt(1e3 * Math.random()), this.eventBind();
    },
    renderMenu: function renderMenu(v12369, v12370) {
      var v12371 = this,
        v12372 = v12370;

      if (v12369 && v12369.length) {
        var v12373 = $('<ul class="hicontextmenu" style="z-index: 9999;"></ul>');
        v12372 || (v12372 = v12373).addClass("hicontextmenuroot"), $.each(v12369, function (v12374, v12375) {
          var v12376 = !!v12375.disable && v12375.disable(),
            v12377 = $('<li class="hicontextmenuitem"><a href="javascript:void(0);"><span>' + (v12375.text || "") + "</span></a></li>");
          v12376 && v12377.addClass("disable"), v12375.borderBottom && v12377.addClass("borderBottom"), v12375.menus && (v12377.addClass("hicontextsubmenu"), v12371.renderMenu(v12375.menus, v12377)), v12375.callback && v12377.click(function (v12378) {
            $(this).hasClass("disable") ? v12378.stopPropagation() : ($(".hicontextmenuroot").remove(), v12375.callback(), v12378.stopPropagation());
          }), v12373.append(v12377);
        }), v12370 && v12370.append(v12373);
      }

      v12370 || $("body").append(v12372).find(".hicontextmenuroot").hide();
    },
    setPosition: function setPosition(v12379) {
      $(".hicontextmenuroot").css({
        left: v12379.pageX + 2,
        top: v12379.pageY + 2
      }).show();
    },
    eventBind: function eventBind() {
      var v12380 = this;
      this.ele.on("contextmenu", function (v12381) {
        $(".hicontextmenuroot").remove(), v12381.preventDefault(), v12380.renderMenu(v12380.opts.menus), v12380.setPosition(v12381), v12380.opts.target && "function" == typeof v12380.opts.target && v12380.opts.target(v12361(this));
      }), v12361("body").on("click", function () {
        v12361(".hicontextmenuroot").remove();
      });
    }
  }, v12361.fn.hicontextMenu = function (v12382) {
    return new v12362(this, v12382), this;
  };
}, function (v12383, v12384, v12385) {
  "use strict";

  v12385.r(v12384);
  v12385(22), v12385(23), v12385(24), v12385(25);
  var v12387,
    v12388 = v12385(0);
  v12385(26);
  window.hiLocalStorage = (v12387 = window.localStorage || null, {
    saveLocalData: function saveLocalData(v12389, v12390) {
      return !(!v12387 || !v12390 || (v12387.setItem(v12389, v12390), 0));
    },
    getLocalData: function getLocalData(v12391) {
      return v12387 ? v12387.getItem(v12391) : null;
    },
    removeItem: function removeItem(v12392) {
      v12387 && v12387.removeItem(v12392);
    }
  });
  v12385(27), v12385(32);

  var _r,
    v12393 = function () {
      function v12394() {
        this.allElementTypes = [];
      }

      return Object.defineProperty(v12394, "instance", {
        get: function get() {
          return v12394._instance || (v12394._instance = new v12394()), v12394._instance;
        },
        enumerable: !0,
        configurable: !0
      }), v12394.prototype.addPrintElementTypes = function (v12395, v12396) {
        var v12397 = this;
        this[v12395] ? this[v12395] = this[v12395].concat(v12396) : this[v12395] = v12396, v12396.forEach(function (v12398) {
          v12397.allElementTypes = v12397.allElementTypes.concat(v12398.printElementTypes);
        });
      }, v12394.prototype.removePrintElementTypes = function (v12399) {
        var v12400 = this;
        delete v12400[v12399], v12400.allElementTypes = v12400.allElementTypes.filter(function (v12401) {
          return !v12401.tid.startsWith(v12399);
        });
      }, v12394.prototype.getElementTypeGroups = function (v12402) {
        return this[this.formatterModule(v12402)] || [];
      }, v12394.prototype.getElementType = function (v12403) {
        var v12404 = this.allElementTypes.filter(function (v12405) {
          return v12405.tid == v12403;
        });
        if (v12404.length > 0) return v12404[0];
      }, v12394.prototype.updateElementType = function (v12406, v12407) {
        var type = this.getElementType(v12406);
        if (v12407) {
          var newType = v12407(type);
          var idx = this.allElementTypes.findIndex(function (v12408) {
            return v12408.tid == v12406;
          });
          if (idx >= 0) {
            this.allElementTypes.splice(idx, 1, newType);
            return newType;
          }
        }
        return type;
      }, v12394.prototype.formatterModule = function (v12409) {
        return v12409 || "_default";
      }, v12394;
    }(),
    v12410 = v12385(1),
    v12411 = v12385(2),
    v12412 = function () {
      function v12413() {
      }

      return v12413.prototype.createPrintElementTypeHtml = function (v12414, v12415) {
        var v12416 = $('<ul class="hiprint-printElement-type"></ul>');
        return v12415.forEach(function (v12417) {
          var v12418 = $("<li></li>");
          v12418.append('<span class="title">' + v12417.name + "</span>");
          var v12419 = $("<ul></ul>");
          v12418.append(v12419), v12417.printElementTypes.forEach(function (v12420) {
            v12419.append('<li><a class="ep-draggable-item" tid="' + v12420.tid + '">  ' + v12420.getText() + " </a></li>");
          }), v12416.append(v12418);
        }), $(v12414).append(v12416), v12416.find(".ep-draggable-item");
      }, v12413;
    }(),
    v12421 = v12385(5),
    v12422 = v12385(15),
    v12423 = function () {
      return function (v12424) {
        this.title = v12424.title, this.type = v12424.type;
      };
    }(),
    ctable = function () {
      return function (v12425) {
        this.title = v12425.title, this.type = v12425.type, this.editable = v12425.editable, this.columnDisplayEditable = v12425.columnDisplayEditable, this.columnDisplayIndexEditable = v12425.columnDisplayIndexEditable, this.columnTitleEditable = v12425.columnTitleEditable, this.columnResizable = v12425.columnResizable, this.columnAlignEditable = v12425.columnAlignEditable,
        this.isEnableEditField = v12425.isEnableEditField, this.isEnableContextMenu = v12425.isEnableContextMenu, this.isEnableInsertRow = v12425.isEnableInsertRow, this.isEnableDeleteRow = v12425.isEnableDeleteRow, this.isEnableInsertColumn = v12425.isEnableInsertColumn, this.isEnableDeleteColumn = v12425.isEnableDeleteColumn, this.isEnableMergeCell = v12425.isEnableMergeCell;
      };
    }(),
    v12426 = function () {
      function v12431(v12427) {
        var v12428 = this;
        this.text = v12427.text, this.field = v12427.field, this.fields = v12427.fields, this.title = v12427.title, this.tid = v12427.tid, this.data = v12427.data, this.styler = v12427.styler, this.formatter = v12427.formatter, this.type = v12427.type, this.options = v12427.options, this.editable = v12427.editable != void 0 ? v12427.editable : !0, this.columnDisplayEditable = v12427.columnDisplayEditable != void 0 ? v12427.columnDisplayEditable : !0, this.columnDisplayIndexEditable = v12427.columnDisplayIndexEditable != void 0 ? v12427.columnDisplayIndexEditable : !0, this.columnTitleEditable = v12427.columnTitleEditable != void 0 ? v12427.columnTitleEditable : !0, this.columnResizable = v12427.columnResizable != void 0 ? v12427.columnResizable : !0, this.columnAlignEditable = v12427.columnAlignEditable != void 0 ? v12427.columnAlignEditable : !0, this.columns = [], (v12427.columns || []).forEach(function (v12429, v12430) {
          v12428.columns.push(v12428.createTableColumnArray(v12429));
        }), this.rowStyler = v12427.rowStyler, this.striped = v12427.striped, this.groupFields = v12427.groupFields || [], this.groupFormatter = v12427.groupFormatter, this.groupFooterFormatter = v12427.groupFooterFormatter, this.footerFormatter = v12427.footerFormatter, this.rowsColumnsMerge = v12427.rowsColumnsMerge, this.rowsColumnsMergeClean = v12427.rowsColumnsMergeClean, this.gridColumnsFooterFormatter = v12427.gridColumnsFooterFormatter,
        this.isEnableEditField = v12427.isEnableEditField != void 0 ? v12427.isEnableEditField : !0, this.isEnableContextMenu = v12427.isEnableContextMenu != void 0 ? v12427.isEnableContextMenu : !0, this.isEnableInsertRow = v12427.isEnableInsertRow != void 0 ? v12427.isEnableInsertRow : !0, this.isEnableDeleteRow = v12427.isEnableDeleteRow != void 0 ? v12427.isEnableDeleteRow : !0, this.isEnableInsertColumn = v12427.isEnableInsertColumn != void 0 ? v12427.isEnableInsertColumn : !0, this.isEnableDeleteColumn = v12427.isEnableDeleteColumn != void 0 ? v12427.isEnableDeleteColumn : !0, this.isEnableMergeCell = v12427.isEnableMergeCell != void 0 ? v12427.isEnableMergeCell : !0, this.columnObj = this.makeColumnObj();
      }

      return v12431.prototype.getText = function () {
        return this.text || this.title || "";
      }, v12431.prototype.createPrintElement = function (v12432) {
        var v12433 = this;
        return this.columns && 0 == this.columns.length && (v12432.columns || []).forEach(function (v12434, v12435) {
          v12433.columns.push(v12433.createTableColumnArray(v12434));
        }), new v12422.a(this, v12432);
      }, v12431.prototype.getData = function () {
        return [{}];
      }, v12431.prototype.createTableColumnArray = function (v12437) {
        var v12438 = [];
        return v12437.forEach(function (v12439, v12440) {
          v12438.push(new v12421.a(v12439));
        }), v12438;
      }, v12431.prototype.getPrintElementTypeEntity = function () {
        if ('table' == this.type) {
          return new ctable({
            title: this.title,
            type: this.type,
            editable: this.editable,
            columnDisplayEditable: this.columnDisplayEditable,
            columnDisplayIndexEditable: this.columnDisplayIndexEditable,
            columnResizable: this.columnResizable,
            columnAlignEditable: this.columnAlignEditable,
            columnTitleEditable: this.columnTitleEditable,
            isEnableEditField: this.isEnableEditField,
            isEnableContextMenu: this.isEnableContextMenu,
            isEnableInsertRow: this.isEnableInsertRow,
            isEnableDeleteRow: this.isEnableDeleteRow,
            isEnableInsertColumn: this.isEnableInsertColumn,
            isEnableDeleteColumn: this.isEnableDeleteColumn,
            isEnableMergeCell: this.isEnableMergeCell
          });
        }
        return new v12423({
          title: this.title,
          type: this.type
        });
      }, v12431.prototype.getFields = function () {
        return this.fields;
      }, v12431.prototype.getOptions = function () {
        return this.options || {};
      }, v12431.prototype.getColumnByColumnId = function (v12442) {
        return this.columnObj[v12442];
      }, v12431.prototype.makeColumnObj = function (columns) {
        var v12443 = {};
        return columns ? columns.forEach(function (v12444) {
          (v12444.id || v12444.columnId) && (v12443[v12444.id || v12444.columnId] = v12444);
        }) : this.columns && this.columns.forEach(function (v12445) {
          v12445.forEach(function (v12446) {
            (v12446.id || v12446.columnId) && (v12443[v12446.id || v12446.columnId] = v12446);
          });
        }), this.columnObj = v12443, v12443;
      }, v12431;
    }(),
    v12447 = v12385(4),
    v12448 = v12385(3),
    v12449 = (_r = function v12450(v12451, v12452) {
      return (_r = Object.setPrototypeOf || _instanceof({
        __proto__: []
      }, Array) && function (v12453, v12454) {
        v12453.__proto__ = v12454;
      } || function (v12455, v12456) {
        for (var v12457 in v12456) {
          v12456.hasOwnProperty(v12457) && (v12455[v12457] = v12456[v12457]);
        }
      })(v12451, v12452);
    }, function (v12458, v12459) {
      function v12460() {
        this.constructor = v12458;
      }

      _r(v12458, v12459), v12458.prototype = null === v12459 ? Object.create(v12459) : (v12460.prototype = v12459.prototype, new v12460());
    }),
    v12461 = function (v12462) {
      function v12469(v12463, v12464) {
        var v12465 = v12462.call(this, v12463) || this;
        return v12465.options = new v12448.a(v12464), v12465.options.setDefault(new v12448.a(v12410.a.instance.image.default).getPrintElementOptionEntity()), v12465;
      }

      return v12449(v12469, v12462), v12469.prototype.getReizeableShowPoints = function () {
        return ["s", "e", "se", "r"];
      }, v12469.prototype.getData = function (v12470) {
        var v12471 = "",v12472 = this.getField();
        v12470 ? v12471 = v12472 ? v12472.split('.').reduce((v12473, v12474) => v12473 ? v12473[v12474] : v12470[v12474], !1) || "" : this.options.src || this.printElementType.getData() : v12471 = this.options.src || this.printElementType.getData();
        var v12475 = this.getFormatter();
        return v12475 && (v12471 = v12475(v12471, this.options, this._currenttemplateData)), v12471 || "";
      }, v12469.prototype.createTarget = function (v12476, v12477) {
        var v12478 = $('<div  class="hiprint-printElement hiprint-printElement-image" style="position: absolute;"><div class="hiprint-printElement-image-content" style="height:100%;width:100%"></div></div>');
        return this.updateTargetImage(v12478, v12476, v12477), v12478;
      }, v12469.prototype.initSizeByHtml = function (v12479) {
        v12462.prototype.initSizeByHtml.call(this, v12479), this.css(v12479, this.getData());
      }, v12469.prototype.getConfigOptions = function () {
        return v12410.a.instance.image;
      }, v12469.prototype.updateDesignViewFromOptions = function () {
        this.designTarget && (this.css(this.designTarget, this.getData()), this.updateTargetImage(this.designTarget, this.getTitle(), this.getData()));
      }, v12469.prototype.updateTargetImage = function (v12481, v12482, v12483) {
        var v12484 = v12481.find(".hiprint-printElement-image-content");
        v12484.find("img").length ? v12484.find("img").attr("src", v12483) : v12484.html('<img style="width:100%;height:100%;" src="' + v12483 + '">');
        if (v12483.length) v12484.find("img").css('cssText', `width:100%;height:100%;content:url("${v12483}")!important`);else
        v12484.find("img").css('cssText', 'width:100%;height:100%;');
        if (this.options.fit) v12484.find("img").css("object-fit", this.options.fit);
        if (this.options.borderRadius) v12484.find("img").css("border-radius", this.options.borderRadius);
      }, v12469.prototype.getHtml = function (v12485, v12486, v12487) {
        return this.getHtml2(v12485, v12486, v12487);
      }, v12469;
    }(v12447.a),
    v12489 = function () {
      var _t4 = function v12490(v12491, v12492) {
        return (_t4 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12493, v12494) {
          v12493.__proto__ = v12494;
        } || function (v12495, v12496) {
          for (var v12497 in v12496) {
            v12496.hasOwnProperty(v12497) && (v12495[v12497] = v12496[v12497]);
          }
        })(v12491, v12492);
      };

      return function (v12498, v12499) {
        function v12500() {
          this.constructor = v12498;
        }

        _t4(v12498, v12499), v12498.prototype = null === v12499 ? Object.create(v12499) : (v12500.prototype = v12499.prototype, new v12500());
      };
    }(),
    v12501 = function (v12502) {
      function v12505(v12503) {
        var v12504 = this;
        return v12503 = v12503 || {}, (v12504 = v12502.call(this, v12503) || this).leftSpaceRemoved = v12503.leftSpaceRemoved, v12504;
      }

      return v12489(v12505, v12502), v12505.prototype.getHideTitle = function () {
        return null == this.hideTitle ? this.defaultOptions.hideTitle : this.hideTitle;
      }, v12505;
    }(v12448.a),
    v12507 = v12385(8),
    v12508 = function () {
      function v12523(v12509, idx, watermarkOptions, pr, scl, v12510, v12511, v12512, v12513, v12514, v12515, v12516, s1, v12517, v12518, v12519) {
        this.panelPageRule = pr, this.scale = scl, this.watermarkOptions = watermarkOptions,
        this.defaultPaperNumberFormat = "${paperNo}-${paperCount}", this.printLine = 0, this.templateId = v12509, this.panelIdx = idx, this.width = v12388.a.mm.toPt(v12510), this.height = v12388.a.mm.toPt(v12511), this.mmwidth = v12510, this.mmheight = v12511, this.paperHeader = v12512 >= 0 ? v12512 : 0, this.paperFooter = v12513, this.contentHeight = v12513 - v12512, this.createTarget(), this.index = v12518, this.paperNumberLeft = v12514 || parseInt((this.width - 30).toString()), this.paperNumberTop = v12515 || parseInt((this.height - 22).toString()), this.paperNumberDisabled = v12516, this.paperNumberContinue = s1, this.paperNumberFormat = v12517, this.referenceElement = v12519 ? $.extend({}, v12519) : new v12507.a({
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          bottomInLastPaper: 0,
          beginPrintPaperIndex: 0,
          printTopInPaper: 0,
          endPrintPaperIndex: 0
        });
      }

      return v12523.prototype.subscribePaperBaseInfoChanged = function (v12524) {
        this.onPaperBaseInfoChanged = v12524;
      }, v12523.prototype.triggerOnPaperBaseInfoChanged = function (v12525) {
        this.onPaperBaseInfoChanged && this.onPaperBaseInfoChanged({
          panelPageRule: this.panelPageRule,
          scale: this.scale,
          paperHeader: this.paperHeader,
          paperFooter: this.paperFooter,
          paperNumberLeft: this.paperNumberLeft,
          paperNumberTop: this.paperNumberTop,
          paperNumberDisabled: this.paperNumberDisabled,
          paperNumberContinue: this.paperNumberContinue,
          paperNumberFormat: this.paperNumberFormat
        });
        v12388.a.event.trigger("hiprintTemplateDataChanged_" + this.templateId, v12525 || "模板调整");
      }, v12523.prototype.setFooter = function (v12527, v12528, v12529, v12530) {
        this.firstPaperFooter = v12527, this.evenPaperFooter = v12528, this.oddPaperFooter = v12529, this.lastPaperFooter = v12530;
      }, v12523.prototype.setOffset = function (v12531, v12532) {
        this.setLeftOffset(v12531), this.setTopOffset(v12532);
      }, v12523.prototype.setLeftOffset = function (v12533) {
        v12533 ? this.paperContentTarget.css("left", v12533 + "pt") : this.paperContentTarget[0].style.left = "";
      }, v12523.prototype.setTopOffset = function (v12534) {
        v12534 ? this.paperContentTarget.css("top", v12534 + "pt") : this.paperContentTarget[0].style.top = "";
      }, v12523.prototype.createTarget = function () {
        this.target = $('<div class="hiprint-printPaper"><div class="hiprint-printPaper-content"></div></div>'), this.paperContentTarget = this.target.find(".hiprint-printPaper-content"), this.target.css("width", this.mmwidth + "mm"), this.target.css("height", this.mmheight - v12410.a.instance.paperHeightTrim + "mm"), this.target.attr("original-height", this.mmheight), this.zoom(this.scale);
      }, v12523.prototype.createHeaderLine = function () {
        var v12536 = this;
        this.headerLinetarget = $('<div class="hiprint-headerLine"  style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>'), this.headerLinetarget.css("top", (this.paperHeader || -1) + "pt"), 0 == this.paperHeader && this.headerLinetarget.addClass("hideheaderLinetarget"), this.paperContentTarget.append(this.headerLinetarget), this.dragHeadLineOrFootLine(this.headerLinetarget, function (v12537, v12538) {
          if (v12538 >= v12536.paperFooter) {
            v12538 = v12536.paperFooter - 10;
          }
          v12536.paperHeader = v12538 >= 0 ? v12538 : 0, v12536.triggerOnPaperBaseInfoChanged();
        });
      }, v12523.prototype.createFooterLine = function () {
        var v12539 = this;
        this.footerLinetarget = $('<div class="hiprint-footerLine"  style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>'), this.footerLinetarget.css("top", parseInt(this.paperFooter.toString()) + "pt"), this.paperFooter == this.height && (this.footerLinetarget.css("top", this.mmheight - v12410.a.instance.paperHeightTrim + "mm"), this.footerLinetarget.addClass("hidefooterLinetarget")), this.paperContentTarget.append(this.footerLinetarget), this.dragHeadLineOrFootLine(this.footerLinetarget, function (v12541, v12542) {
          if (v12542 <= v12539.paperHeader) {
            v12542 = v12539.paperHeader + 10;
          }
          v12539.paperFooter = v12542, v12539.triggerOnPaperBaseInfoChanged();
        });
      }, v12523.prototype.createPaperNumber = function (v12543, v12544) {
        var v12545 = this,
          v12546 = this.target.find(".hiprint-paperNumber");
        if (v12546.length) return v12546.html(v12543), v12546;
        var v12547 = $('<span class="hiprint-paperNumber"  style="position: absolute">' + v12543 + "</span>");
        return v12547.css("top", this.paperNumberTop + "pt"), v12547.css("left", this.paperNumberLeft + "pt"), this.paperContentTarget.append(v12547), v12544 && this.dragHeadLineOrFootLine(v12547, function (v12548, v12549) {
          v12545.paperNumberTop = v12549, v12545.paperNumberLeft = v12548, v12545.triggerOnPaperBaseInfoChanged();
        }, !0), v12547;
      }, v12523.prototype.getTarget = function () {
        return this.target;
      }, v12523.prototype.append = function (v12550) {
        this.paperContentTarget.append(v12550);
      }, v12523.prototype.updateReferenceElement = function (v12551) {
        v12551 && (this.referenceElement = v12551);
      }, v12523.prototype.updatePrintLine = function (v12552) {
        v12552 >= this.printLine && (this.printLine = v12552);
      }, v12523.prototype.design = function (v12553) {
        var v12554 = this;
        this.createHeaderLine(), this.createFooterLine(), this.target.addClass("design"), v12553 && v12553.grid && this.target.addClass("grid"), this.paperNumberTarget = this.createPaperNumber(this.formatPaperNumber(1, 1), true), this.createRuler(), this.createWaterMark(true, this.panelIdx, this.watermarkOptions), this.resetPaperNumber(this.paperNumberTarget), $(this.paperNumberTarget).bind("dblclick.hiprint", function () {
          null == v12554.paperNumberDisabled && (v12554.paperNumberDisabled = !1), v12554.paperNumberDisabled = !v12554.paperNumberDisabled, v12554.resetPaperNumber(v12554.paperNumberTarget), v12554.triggerOnPaperBaseInfoChanged("初始");
        }), $(this.paperNumberTarget).bind("click.hiprint", function () {
          v12388.a.event.trigger("BuildCustomOptionSettingEventKey_" + v12554.templateId, {
            options: {
              paperNumberFormat: v12554.paperNumberFormat,
              paperNumberDisabled: v12554.paperNumberDisabled,
              paperNumberContinue: v12554.paperNumberContinue
            },
            callback: function callback(v12556) {
              v12554.paperNumberDisabled = !!v12556.paperNumberDisabled || void 0, v12554.paperNumberContinue = v12556.paperNumberContinue, v12554.paperNumberFormat = v12556.paperNumberFormat ? v12556.paperNumberFormat : void 0, v12554.createPaperNumber(v12554.formatPaperNumber(1, 1), true), v12554.resetPaperNumber(v12554.paperNumberTarget), v12554.triggerOnPaperBaseInfoChanged();
            }
          });
        });
      }, v12523.prototype.resetPaperNumber = function (v12557) {
        this.paperNumberDisabled ? v12557.addClass("hiprint-paperNumber-disabled") : v12557.removeClass("hiprint-paperNumber-disabled");
      }, v12523.prototype.updatePaperNumber = function (v12558, v12559, v12560) {
        var v12561 = this.createPaperNumber(this.formatPaperNumber(v12558, v12559));
        this.paperNumberDisabled ? v12561.hide() : v12560 && this.index % 2 == 1 && (v12561[0].style.left = "", v12561.css("right", this.paperNumberLeft + "pt"));
      }, v12523.prototype.formatPaperNumber = function (v12562, v12563) {
        this.createWaterMark(false, v12562, this.watermarkOptions);
        return eval("`" + (this.paperNumberFormat ? this.paperNumberFormat : this.defaultPaperNumberFormat).replace("paperNo", v12562).replace("paperCount", v12563) + "`");
      }, v12523.prototype.dragHeadLineOrFootLine = function (v12564, v12565, v12566) {
        var v12567 = this;
        v12564.hidraggable({
          axis: v12566 ? void 0 : "v",
          onDrag: function onDrag(v12568, v12569, v12570) {
            v12565(v12569, v12570);
          },
          moveUnit: "pt",
          minMove: v12410.a.instance.movingDistance,
          onBeforeDrag: function onBeforeDrag(v12572) {
            v12411.a.instance.draging = !0;
          },
          getScale: function getScale() {
            return v12567.scale || 1;
          },
          onStopDrag: function onStopDrag(v12574) {
            v12567.headerLinetarget.css("top", v12567.paperHeader + "pt");
            v12567.footerLinetarget.css("top", v12567.paperFooter + "pt");
            v12411.a.instance.draging = !1, v12567.footerLinetarget.removeClass("hidefooterLinetarget"), v12567.headerLinetarget.removeClass("hideheaderLinetarget");
          }
        });
      }, v12523.prototype.resize = function (v12576, v12577) {
        // 获取页脚高度比例
        var parperFooterRatio = this.paperFooter / this.height;
        this.width = v12388.a.mm.toPt(v12576), this.height = v12388.a.mm.toPt(v12577), this.mmwidth = v12576, this.mmheight = v12577, this.target.css("width", v12576 + "mm"), this.target.css("height", v12577 - v12410.a.instance.paperHeightTrim + "mm"), this.target.attr("original-height", this.mmheight);
        // 按比例计算页脚高度
        var paperFooter = this.height * parperFooterRatio;
        this.paperFooter = paperFooter || this.height, this.footerLinetarget.css("top", paperFooter + "pt"),
        this.contentHeight = this.paperFooter - this.paperHeader,
        // 设置纸张后, 页码位置重置问题
        this.paperNumberLeft = this.paperNumberLeft > this.width ? parseInt((this.width - 30).toString()) : this.paperNumberLeft;
        this.paperNumberTop = this.paperNumberTop > this.height ? this.paperNumberTop = parseInt((this.height - 22).toString()) : this.paperNumberTop;
        this.paperNumberTarget.css("top", this.paperNumberTop + "pt"),
        this.paperNumberTarget.css("left", this.paperNumberLeft + "pt"),
        this.triggerOnPaperBaseInfoChanged("调整大小");
      }, v12523.prototype.zoom = function (v12581) {
        if (v12581) {
          this.scale = v12581, this.target.css("transform", "scale(" + v12581 + ")");
          if (v12581 > 1) {
            this.target.css("transform-origin", "-" + v12581 + "% -" + v12581 + "%");
          } else {
            this.target.css("transform-origin", "0 0");
          }
          this.triggerOnPaperBaseInfoChanged("缩放");
        }
      }, v12523.prototype.getPaperFooter = function (v12582) {
        var v12583 = this.index + v12582;
        return 0 == v12583 ? this.firstPaperFooter ? this.firstPaperFooter : this.oddPaperFooter ? this.oddPaperFooter : this.paperFooter : v12583 % 2 == 0 ? this.oddPaperFooter ? this.oddPaperFooter : this.paperFooter : v12583 % 2 == 1 ? this.evenPaperFooter ? this.evenPaperFooter : this.paperFooter : void 0;
      }, v12523.prototype.getContentHeight = function (v12584) {
        return this.getPaperFooter(v12584) - this.paperHeader;
      }, v12523.prototype.createRuler = function () {
        this.target.append('<div class="hiprint_rul_wrapper">\n                     <img class="h_img" src="' + lImg + '" />\n                     <img class="v_img" src="' + vImg + '" />\n                    </div>');
      }, v12523.prototype.createWaterMark = function (watch, idx, opts) {
        var v12585 = this;
        var options = Object.assign({}, opts || {}, {
          id: `${v12585.templateId}_${v12585.panelIdx}_${idx || 1}_${watch ? 'design' : v12585.index}`,
          watch: watch,
          container: v12585.target[0]
        });
        if (!options.container) return;
        if (options.content) {
          if (watch) {
            watermark.destroyWatermark(Object.assign({}, options, {
              id: `${v12585.templateId}_${v12585.panelIdx}_${idx || 1}_${v12585.index}`
            }));
          }
          watermark.createWatermark(options);
        } else {
          watermark.destroyWatermark(options);
        }
      }, v12523.prototype.displayHeight = function () {
        return this.mmheight - v12410.a.instance.paperHeightTrim + "mm";
      }, v12523.prototype.displayWidth = function () {
        return this.mmwidth + "mm";
      }, v12523.prototype.getPanelTarget = function () {
        return this.target.parent(".hiprint-printPanel ");
      }, v12523;
    }(),
    v12587 = v12385(6),
    v12588 = function () {
      var _t5 = function v12589(v12590, v12591) {
        return (_t5 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12592, v12593) {
          v12592.__proto__ = v12593;
        } || function (v12594, v12595) {
          for (var v12596 in v12595) {
            v12595.hasOwnProperty(v12596) && (v12594[v12596] = v12595[v12596]);
          }
        })(v12590, v12591);
      };

      return function (v12597, v12598) {
        function v12599() {
          this.constructor = v12597;
        }

        _t5(v12597, v12598), v12597.prototype = null === v12598 ? Object.create(v12598) : (v12599.prototype = v12598.prototype, new v12599());
      };
    }(),
    v12600 = function (v12601) {
      function v12606(v12602, v12603) {
        var v12604 = v12601.call(this, v12602) || this;
        return v12604.options = new v12501(v12603), v12604.options.setDefault(new v12501(v12410.a.instance.longText.default).getPrintElementOptionEntity()), v12604;
      }

      return v12588(v12606, v12601), v12606.prototype.getDesignTarget = function (v12607) {
        var v12608 = v12601.prototype.getDesignTarget.call(this, v12607);
        return v12608.find(".hiprint-printElement-longText-content").css("border", "1px dashed #cebcbc"), v12608;
      }, v12606.prototype.getProxyTarget = function (v12609) {
        v12609 && this.SetProxyTargetOption(v12609);
        var v12610 = this.getData(),
          v12611 = this.createTarget(this.printElementType.getText(!0), v12610);
        return this.updateTargetSize(v12611), this.css(v12611, v12610), v12611;
      }, v12606.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12612 = this.getData(),
            v12613 = this.getHtml(this.designPaper)[0].target;
          this.designTarget.find(".hiprint-printElement-longText-content").html(v12613.find(".hiprint-printElement-longText-content").html()), this.css(this.designTarget, v12612);
        }
      }, v12606.prototype.getConfigOptions = function () {
        return v12410.a.instance.longText;
      }, v12606.prototype.getTitle = function () {
        return this.options.title || this.printElementType.title;
      }, v12606.prototype.getData = function (v12615) {
        var v12616 = this.getField();
        var v12617 = v12616 ? v12616.split('.').reduce((v12618, v12619) => v12618 ? v12618[v12619] : v12615 ? v12615[v12619] : "", !1) || "" : "";
        return v12615 ? v12617 || "" : this.options.testData || this.printElementType.getData() || "";
      }, v12606.prototype.updateTargetText = function (v12620, v12621, v12622) {
        var v12623 = v12620.find(".hiprint-printElement-longText-content"),
          v12624 = this.getText(v12621, v12622);
        v12623.html(v12624);
      }, v12606.prototype.createTarget = function (v12625, v12626) {
        var v12627 = $('<div  class="hiprint-printElement hiprint-printElement-longText" style="position: absolute;"><div class="hiprint-printElement-longText-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>');
        return this.updateTargetText(v12627, v12625, v12626), v12627;
      }, v12606.prototype.getText = function (v12628, v12629) {
        var v12630 = this.getFormatter();
        v12629 && (v12629 = 0 != this.options.leftSpaceRemoved ? v12629.toString().replace(/^\s*/, "") : v12629);
        return (this.getField() ? (this.options.getHideTitle() ? "" : v12628 ? v12628 + "：" : "") + (v12630 ? v12630(v12628, v12629, this.options, this._currenttemplateData) : v12629) : v12630 ? v12630(v12628, v12628, this.options, this._currenttemplateData) : v12628 || "") || "";
      }, v12606.prototype.getHtml = function (v12631, v12632) {
        this.setCurrenttemplateData(v12632), this.createTempContainer();
        var v12633 = this.getPaperHtmlResult(v12631, v12632);
        return this.removeTempContainer(), v12633;
      }, v12606.prototype.getHeightByData = function (v12634) {
        this.createTempContainer();
        var v12635 = this.getPaperHtmlResult(new v12508("", "", void 0, 1e3, 1e3, 0, 25e3, 0, 0, !0, !0, void 0, 0, void 0), {}, v12634);
        return this.removeTempContainer(), v12635[0].referenceElement.bottomInLastPaper - v12635[0].referenceElement.printTopInPaper;
      }, v12606.prototype.getLongTextIndent = function () {
        return this.options.longTextIndent ? '<span class="long-text-indent" style="margin-left:' + this.options.longTextIndent + 'pt"></span>' : '<span class="long-text-indent"></span>';
      }, v12606.prototype.getPaperHtmlResult = function (v12636, v12637, v12638) {
        var v12639 = this,
          v12640 = [],
          v12641 = 0,
          v12642 = v12638 || this.getData(v12637),
          v12643 = this.getText(this.getTitle(), v12642),
          v12644 = this.createTarget(this.getTitle(), this.options.testData || "");
        this.css(v12644, v12642), v12637 ? this.updateTargetWidth(v12644) : this.updateTargetSize(v12644), this.getTempContainer().html(""), this.getTempContainer().append(v12644);
        var v12645 = [this.getLongTextIndent()],
          v12646 = v12643.split(new RegExp("\r|\n", "g"));
        if (v12646.forEach(function (v12647, v12648) {
          var v12649 = 0 != v12639.options.leftSpaceRemoved ? (v12647 || "").toString().replace(/^\s*/, "") : v12647;
          v12645 = v12645.concat(v12649.split("")), v12648 < v12646.length - 1 && v12645.push("<br/>" + v12639.getLongTextIndent());
        }), 0 == v12645.length && (v12645 = [""]), this.isHeaderOrFooter() || this.isFixed() || !v12637) return (v12650 = this.getStringBySpecificHeight(v12645, 25e3, v12644)).target.css("left", this.options.displayLeft()), v12650.target.css("top", this.options.displayTop()), v12650.target[0].height = "", v12640.push(new v12587.a({
          target: v12650.target,
          printLine: this.options.displayTop() + v12650.height,
          referenceElement: new v12507.a({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: v12636.index,
            bottomInLastPaper: this.options.getTop() + v12650.height,
            printTopInPaper: this.options.getTop()
          })
        })), v12640;

        for (var v12653 = this.getBeginPrintTopInPaperByReferenceElement(v12636); v12645.length > 0;) {
          var v12654 = 0,
            v12655 = v12636.getPaperFooter(v12641);
          0 == v12641 && v12653 > v12655 && "none" != v12636.panelPageRule && (v12653 = v12653 - v12655 + v12636.paperHeader, v12640.push(new v12587.a({
            target: void 0,
            printLine: void 0
          })), v12641++, v12654 = v12636.getContentHeight(v12641) - (v12653 - v12636.paperHeader), v12655 = v12636.getPaperFooter(v12641));
          var v12650 = this.getStringBySpecificHeight(v12645, v12654 > 0 ? v12654 : 0 == v12641 ? v12655 - v12653 : v12636.getContentHeight(v12641), v12644);
          v12645.splice(0, v12650.length);
          var v12657 = void 0,
            v12658 = void 0;
          v12650.target.css("left", this.options.displayLeft()), v12650.target[0].height = "", 0 == v12641 || v12654 > 0 ? (v12658 = v12653, v12650.target.css("top", v12658 + "pt"), v12657 = v12645.length > 0 ? v12653 + v12650.height : null != this.options.lHeight ? v12653 + (v12650.height > this.options.lHeight ? v12650.height : this.options.lHeight) : v12653 + v12650.height) : (v12658 = v12636.paperHeader, v12650.target.css("top", v12658 + "pt"), v12657 = v12658 + v12650.height), v12640.push(new v12587.a({
            target: v12650.target,
            printLine: v12657,
            referenceElement: new v12507.a({
              top: this.options.getTop(),
              left: this.options.getLeft(),
              height: this.options.getHeight(),
              width: this.options.getWidth(),
              beginPrintPaperIndex: v12636.index,
              bottomInLastPaper: v12657,
              printTopInPaper: v12658
            })
          })), v12641++;
          v12637 && this.updatePanelHeight(v12657 + this.options.getHeight(), v12636);
        }

        return v12640;
      }, v12606.prototype.getStringBySpecificHeight = function (v12661, v12662, v12663) {
        var v12664 = v12388.a.pt.toPx(v12662);
        var v12666 = void 0;
        var noPaging = "none" == this.panel.panelPageRule;
        if (noPaging) {
          v12666 = this.IsPaginationIndex(v12661, v12661.length, -1, v12663);
        } else {
          v12666 = this.IsPaginationIndex(v12661, v12661.length - 1, v12664, v12663);
        }
        return v12666.IsPagination ? v12666 : this.BinarySearch(v12661, 0, v12661.length - 1, v12664, v12663);
      }, v12606.prototype.BinarySearch = function (v12667, v12668, v12669, v12670, v12671) {
        var v12672 = Math.floor((v12668 + v12669) / 2);
        if (v12668 > v12669) return v12671.find(".hiprint-printElement-longText-content").html(""), {
          IsPagination: !0,
          height: 0,
          length: 0,
          target: v12671.clone()
        };
        var v12673 = this.IsPaginationIndex(v12667, v12672, v12670, v12671);
        return v12673.IsPagination ? v12673 : "l" == v12673.move ? this.BinarySearch(v12667, v12668, v12672 - 1, v12670, v12671) : this.BinarySearch(v12667, v12672 + 1, v12669, v12670, v12671);
      }, v12606.prototype.IsPaginationIndex = function (v12674, v12675, v12676, v12677) {
        if (-1 == v12676) {
          v12677.find(".hiprint-printElement-longText-content").html(v12674.slice(0, v12675).join(""));
          var v12678 = v12677.height();
          return {
            IsPagination: !0,
            height: v12388.a.px.toPt(v12678),
            length: v12674.length,
            target: v12677.clone()
          };
        }
        v12677.find(".hiprint-printElement-longText-content").html(v12674.slice(0, v12675 + 2).join(""));
        var v12680 = v12677.height();
        v12677.find(".hiprint-printElement-longText-content").html(v12674.slice(0, v12675 + 1).join(""));
        var v12678 = v12677.height();
        return v12675 >= v12674.length - 1 && v12678 < v12676 ? {
          IsPagination: !0,
          height: v12388.a.px.toPt(v12678),
          length: v12674.length,
          target: v12677.clone()
        } : v12678 <= v12676 && v12680 >= v12676 ? {
          IsPagination: !0,
          height: v12678,
          length: v12675 + 1,
          target: v12677.clone()
        } : v12678 >= v12676 ? {
          IsPagination: !1,
          move: "l"
        } : v12680 <= v12676 ? {
          IsPagination: !1,
          move: "r"
        } : {
          IsPagination: !0,
          result: 1
        };
      }, v12606;
    }(v12447.a),
    v12683 = function () {
      function v12684() {
      }

      return v12684.replaceEnterAndNewline = function (v12685, v12686) {
        return v12685.replace(new RegExp("\r|\n|/g", "g"), v12686);
      }, v12684.replaceTab = function (v12687, v12688) {
        return v12687.replace(new RegExp("\t/g", "g"), v12688);
      }, v12684.replaceEnterAndNewlineAndTab = function (v12689, v12690) {
        return v12689.replace(new RegExp("\r|\n|\t|/g", "g"), v12690);
      }, v12684;
    }(),
    v12691 = function () {
      var _t6 = function v12692(v12693, v12694) {
        return (_t6 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12695, v12696) {
          v12695.__proto__ = v12696;
        } || function (v12697, v12698) {
          for (var v12699 in v12698) {
            v12698.hasOwnProperty(v12699) && (v12697[v12699] = v12698[v12699]);
          }
        })(v12693, v12694);
      };

      return function (v12700, v12701) {
        function v12702() {
          this.constructor = v12700;
        }

        _t6(v12700, v12701), v12700.prototype = null === v12701 ? Object.create(v12701) : (v12702.prototype = v12701.prototype, new v12702());
      };
    }(),
    v12703 = function (v12704) {
      function v12707(v12705) {
        var v12706 = v12704.call(this, v12705) || this;
        return v12706.title && (v12706.title = v12683.replaceEnterAndNewlineAndTab(v12706.title, "")), v12706;
      }

      return v12691(v12707, v12704), v12707.prototype.getHideTitle = function () {
        return null == this.hideTitle ? this.defaultOptions.hideTitle : this.hideTitle;
      }, v12707.prototype.getTextType = function () {
        return (null == this.textType ? this.defaultOptions.textType : this.textType) || "text";
      }, v12707.prototype.getFontSize = function () {
        return (null == this.fontSize ? this.defaultOptions.fontSize : this.fontSize) || 9;
      }, v12707.prototype.getbarcodeMode = function () {
        return (null == this.barcodeMode ? this.defaultOptions.barcodeMode : this.barcodeMode) || "CODE128";
      }, v12707.prototype.getBarWidth = function () {
        return (null == this.barWidth ? this.defaultOptions.barWidth : this.barWidth) || 1;
      }, v12707.prototype.getBarAutoWidth = function () {
        // 该属性 "true" 为 true，其余一概为 false
        return (null == this.barAutoWidth ? this.defaultOptions.barAutoWidth === "true" : this.barAutoWidth === "true") ?? true;
      }, v12707.prototype.getQRcodeLevel = function () {
        return (null == this.qrCodeLevel ? this.defaultOptions.qrCodeLevel : this.qrCodeLevel) || 0;
      }, v12707;
    }(v12448.a),
    v12709 = function () {
      var _t7 = function v12710(v12711, v12712) {
        return (_t7 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12713, v12714) {
          v12713.__proto__ = v12714;
        } || function (v12715, v12716) {
          for (var v12717 in v12716) {
            v12716.hasOwnProperty(v12717) && (v12715[v12717] = v12716[v12717]);
          }
        })(v12711, v12712);
      };

      return function (v12718, v12719) {
        function v12720() {
          this.constructor = v12718;
        }

        _t7(v12718, v12719), v12718.prototype = null === v12719 ? Object.create(v12719) : (v12720.prototype = v12719.prototype, new v12720());
      };
    }(),
    v12721 = function (v12722) {
      function v12727(v12723, v12724) {
        var v12725 = v12722.call(this, v12723) || this;
        return v12725.options = new v12703(v12724), v12725.options.setDefault(new v12703(v12410.a.instance.text.default).getPrintElementOptionEntity()), v12725;
      }

      return v12709(v12727, v12722), v12727.prototype.getDesignTarget = function (v12728) {
        return v12722.prototype.getDesignTarget.call(this, v12728);
      }, v12727.prototype.getProxyTarget = function (v12729) {
        v12729 && this.SetProxyTargetOption(v12729);
        var v12730 = this.getData(),
          v12731 = this.createTarget(this.printElementType.getText(!0), v12730);
        return this.updateTargetSize(v12731), this.css(v12731, v12730), v12731;
      }, v12727.prototype.updateDesignViewFromOptions = function () {
        // ! pub-beta 0.0.57-beta22 这里的处理似乎重复了，影响了 updateTargetText 方法执行，故在此处注释掉
        // var els = this.panel.printElements.filter(function (t) {
        //   return ('block' == t.designTarget.children().last().css('display')
        //     && t.designTarget.children().last().hasClass('selected')) && !t.printElementType.type.includes('table');
        // });
        // els.forEach(ele => {
        //   var t = ele.getData()
        //   ele.css(ele.designTarget, t)
        //   this.updateTargetText(ele.designTarget, ele.getTitle(), t)
        // })
        if (this.designTarget) {
          var v12732 = this.getData();
          this.css(this.designTarget, v12732), this.updateTargetText(this.designTarget, this.getTitle(), v12732);
        }
      }, v12727.prototype.getConfigOptions = function () {
        return v12410.a.instance.text;
      }, v12727.prototype.getTitle = function () {
        var v12734 = this.options.title || this.printElementType.title || "";
        return v12734 && (v12734 = v12683.replaceEnterAndNewlineAndTab(v12734, "")), v12734;
      }, v12727.prototype.getData = function (v12735) {
        var v12736 = void 0;
        var v12737 = this.getField();
        if (v12736 = v12735 ? v12737 ? v12737.split('.').reduce((v12738, v12739) => v12738 ? v12738[v12739] : v12735 ? v12735[v12739] : "", !1) || "" : "" : this.options.testData || this.printElementType.getData() || "", this.options.format) {
          if ("datetime" == this.options.dataType) return v12388.a.dateFormat(v12736, this.options.format);

          if ("boolean" == this.options.dataType) {
            var v12741 = this.options.format.split(":");
            if (v12741.length > 0) return !0 === v12736 || "true" === v12736 ? v12741[0] : v12741[1];
          }
        }
        return v12736;
      }, v12727.prototype.updateTargetText = function (v12742, v12743, v12744, v12745, rowIndex) {
        var v12746 = this.getFormatter(),
          v12747 = v12742.find(".hiprint-printElement-text-content"),
          v12748 = "";
        v12748 = this.getField() ? (this.options.getHideTitle() ? "" : v12743 ? v12743 + "：" : "") + hinnn.toUpperCase(this.options.upperCase, v12746 ? v12746(v12743, v12744, this.options, this._currenttemplateData, v12742) : v12744) : v12744 = hinnn.toUpperCase(this.options.upperCase, v12746 ? v12746(v12743, v12743, this.options, this._currenttemplateData, v12742) : v12743);
        var v12749 = this.options.getTextType();
        if ("text" == v12749) v12747.html(v12748);else {
          if ("barcode" == v12749) {
            v12747.css({
              "display": "flex",
              "flex-direction": "column"
            });
            // pub-beta 0.0.57-beta22 移除插件通过 div 添加的文本元素，默认使用 JsBarcode 生成条形码文本
            v12747.html('<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg>');
            try {
              v12744 ? (JsBarcode(v12747.find(".hibarcode_imgcode")[0], v12744, {
                format: this.options.getbarcodeMode(),
                width: this.options.getBarWidth(),
                textMargin: -1,
                lineColor: this.options.color || "#000000",
                margin: 0,
                height: parseInt(v12388.a.pt.toPx(this.options.getHeight() || 10).toString()),
                displayValue: !this.options.hideTitle
              }), v12747.find(".hibarcode_imgcode").attr("height", "100%"), v12747.find(".hibarcode_imgcode").attr("width", "100%")) : v12747.html("");
              // pub-beta 0.0.57-beta22 解决条形码自动宽度问题
              let svgWidth = v12747.find(".hibarcode_imgcode rect")[0].attributes.width.value;
              svgWidth = Math.ceil(hinnn.px.toPt(svgWidth * 1.05));
              if (this.options.getBarAutoWidth() && svgWidth > this.options.width) {
                v12747.parent().css("width", svgWidth + 'pt');
                this.options.width = svgWidth;
              }
            } catch (v12751) {
              console.log(v12751), v12747.html(`${i18n.__('此格式不支持该文本')}`);
            }
          }

          if ("qrcode" == v12749) {
            v12747.html("");

            try {
              if (v12744) {
                v12747.css({
                  "display": "flex",
                  "flex-direction": "column"
                });
                var width = this.options.width;
                var height = this.options.height - (!this.options.hideTitle ? this.options.lineHeight ?? (this.options.fontSize ?? 10.5) * 1.5 : 0);
                var box = $('<div class="hiqrcode_imgcode"></div>').css({
                  "width": Math.min(width, height) + 'pt',
                  "height": Math.min(width, height) + 'pt',
                  "margin": "auto"
                });
                new QRCode(box[0], {
                  width: "100%",
                  height: "100%",
                  colorDark: this.options.color || "#000000",
                  useSVG: !0,
                  correctLevel: this.options.getQRcodeLevel()
                }).makeCode(v12744);
                v12747.html(box), !this.options.hideTitle && v12747.append(`<div class="hiqrcode_displayValue" style="white-space:nowrap">${v12744}</div>`);
              }
            } catch (v12752) {
              console.log(v12752), v12747.html(`${i18n.__('二维码生成失败')}`);
            }
          }
        }
      }, v12727.prototype.onResize = function (v12753, v12754, v12755, v12756, v12757) {
        v12722.prototype.onResize.call(this, v12753, v12754, v12755, v12756, v12757);
        "barcode" != this.options.getTextType() && "qrcode" != this.options.getTextType() || this.updateTargetText(this.designTarget, this.getTitle(), this.getData());
      }, v12727.prototype.createTarget = function (v12758, v12759, v12760) {
        var v12761 = $('<div tabindex="1" class="hiprint-printElement hiprint-printElement-text" style="position: absolute;"><div class="hiprint-printElement-text-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>');
        return this.updateTargetText(v12761, v12758, v12759, v12760), v12761;
      }, v12727.prototype.getHtml = function (v12762, v12763, v12764) {
        return this.getHtml2(v12762, v12763, v12764);
      }, v12727;
    }(v12447.a),
    v12766 = function () {
      var _t8 = function v12767(v12768, v12769) {
        return (_t8 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12770, v12771) {
          v12770.__proto__ = v12771;
        } || function (v12772, v12773) {
          for (var v12774 in v12773) {
            v12773.hasOwnProperty(v12774) && (v12772[v12774] = v12773[v12774]);
          }
        })(v12768, v12769);
      };

      return function (v12775, v12776) {
        function v12777() {
          this.constructor = v12775;
        }

        _t8(v12775, v12776), v12775.prototype = null === v12776 ? Object.create(v12776) : (v12777.prototype = v12776.prototype, new v12777());
      };
    }(),
    v12778 = function (v12779) {
      function v12781(v12780) {
        return v12779.call(this, v12780) || this;
      }

      return v12766(v12781, v12779), v12781;
    }(v12448.a),
    v12783 = function () {
      var _t9 = function v12784(v12785, v12786) {
        return (_t9 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12787, v12788) {
          v12787.__proto__ = v12788;
        } || function (v12789, v12790) {
          for (var v12791 in v12790) {
            v12790.hasOwnProperty(v12791) && (v12789[v12791] = v12790[v12791]);
          }
        })(v12785, v12786);
      };

      return function (v12792, v12793) {
        function v12794() {
          this.constructor = v12792;
        }

        _t9(v12792, v12793), v12792.prototype = null === v12793 ? Object.create(v12793) : (v12794.prototype = v12793.prototype, new v12794());
      };
    }(),
    v12795 = function (v12796) {
      function v12801(v12797, v12798) {
        var v12799 = v12796.call(this, v12797) || this;
        return v12799.options = new v12778(v12798), v12799.options.setDefault(new v12778(v12410.a.instance.html.default).getPrintElementOptionEntity()), v12799;
      }

      return v12783(v12801, v12796), v12801.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12802 = this.getData();
          this.css(this.designTarget, v12802), this.updateTargetHtml();
        }
      }, v12801.prototype.updateTargetHtml = function () {
        var v12803 = this.getFormatter();

        if (v12803) {
          var v12804 = v12803(this.getData(), this.options, this._currenttemplateData);
          this.designTarget.find(".hiprint-printElement-html-content").html(v12804);
        }
      }, v12801.prototype.getConfigOptions = function () {
        return v12410.a.instance.html;
      }, v12801.prototype.createTarget = function (v12806, v12807) {
        var v12808 = $('<div  class="hiprint-printElement hiprint-printElement-html" style="position: absolute;"><div class="hiprint-printElement-html-content" style="height:100%;width:100%"></div></div>'),
          v12809 = this.getFormatter();

        if (v12809) {
          var v12810 = v12809(this.getData(), this.options, this._currenttemplateData);
          v12808.find(".hiprint-printElement-html-content").append(v12810);
        } else this.options.content && v12808.find(".hiprint-printElement-html-content").append(this.options.content);

        return v12808;
      }, v12801.prototype.getHtml = function (v12811, v12812, v12813) {
        return this.getHtml2(v12811, v12812, v12813);
      }, v12801;
    }(v12447.a),
    v12815 = function () {
      var _t10 = function v12816(v12817, v12818) {
        return (_t10 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12819, v12820) {
          v12819.__proto__ = v12820;
        } || function (v12821, v12822) {
          for (var v12823 in v12822) {
            v12822.hasOwnProperty(v12823) && (v12821[v12823] = v12822[v12823]);
          }
        })(v12817, v12818);
      };

      return function (v12824, v12825) {
        function v12826() {
          this.constructor = v12824;
        }

        _t10(v12824, v12825), v12824.prototype = null === v12825 ? Object.create(v12825) : (v12826.prototype = v12825.prototype, new v12826());
      };
    }(),
    v12827 = function (v12828) {
      function v12835(v12829, v12830) {
        var v12831 = v12828.call(this, v12829) || this;
        return v12831.options = new v12448.a(v12830), v12831.options.setDefault(new v12448.a(v12410.a.instance.vline.default).getPrintElementOptionEntity()), v12831;
      }

      return v12815(v12835, v12828), v12835.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12836 = this.getData();
          this.css(this.designTarget, v12836);
        }
      }, v12835.prototype.getConfigOptions = function () {
        return v12410.a.instance.vline;
      }, v12835.prototype.createTarget = function (v12838, v12839) {
        return $('<div class="hiprint-printElement hiprint-printElement-vline" style="border-left:1px solid;position: absolute;"></div>');
      }, v12835.prototype.getReizeableShowPoints = function () {
        return ["s", "r"];
      }, v12835.prototype.getHtml = function (v12840, v12841, v12842) {
        return this.getHtml2(v12840, v12841, v12842);
      }, v12835;
    }(v12447.a),
    v12844 = function () {
      var _t11 = function v12845(v12846, v12847) {
        return (_t11 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12848, v12849) {
          v12848.__proto__ = v12849;
        } || function (v12850, v12851) {
          for (var v12852 in v12851) {
            v12851.hasOwnProperty(v12852) && (v12850[v12852] = v12851[v12852]);
          }
        })(v12846, v12847);
      };

      return function (v12853, v12854) {
        function v12855() {
          this.constructor = v12853;
        }

        _t11(v12853, v12854), v12853.prototype = null === v12854 ? Object.create(v12854) : (v12855.prototype = v12854.prototype, new v12855());
      };
    }(),
    v12856 = function (v12857) {
      function v12864(v12858, v12859) {
        var v12860 = v12857.call(this, v12858) || this;
        return v12860.options = new v12448.a(v12859), v12860.options.setDefault(new v12448.a(v12410.a.instance.hline.default).getPrintElementOptionEntity()), v12860;
      }

      return v12844(v12864, v12857), v12864.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12865 = this.getData();
          this.css(this.designTarget, v12865);
        }
      }, v12864.prototype.getConfigOptions = function () {
        return v12410.a.instance.hline;
      }, v12864.prototype.createTarget = function (v12867, v12868) {
        return $('<div class="hiprint-printElement hiprint-printElement-hline" style="border-top:1px solid;position: absolute;"></div>');
      }, v12864.prototype.getReizeableShowPoints = function () {
        return ["e", "r"];
      }, v12864;
    }(v12447.a),
    v12870 = function () {
      var _t12 = function v12871(v12872, v12873) {
        return (_t12 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12874, v12875) {
          v12874.__proto__ = v12875;
        } || function (v12876, v12877) {
          for (var v12878 in v12877) {
            v12877.hasOwnProperty(v12878) && (v12876[v12878] = v12877[v12878]);
          }
        })(v12872, v12873);
      };

      return function (v12879, v12880) {
        function v12881() {
          this.constructor = v12879;
        }

        _t12(v12879, v12880), v12879.prototype = null === v12880 ? Object.create(v12880) : (v12881.prototype = v12880.prototype, new v12881());
      };
    }(),
    v12882 = function (v12883) {
      function v12890(v12884, v12885) {
        var v12886 = v12883.call(this, v12884) || this;
        return v12886.options = new v12448.a(v12885), v12886.options.setDefault(new v12448.a(v12410.a.instance.rect.default).getPrintElementOptionEntity()), v12886;
      }

      return v12870(v12890, v12883), v12890.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12891 = this.getData();
          this.css(this.designTarget, v12891);
        }
      }, v12890.prototype.getConfigOptions = function () {
        return v12410.a.instance.rect;
      }, v12890.prototype.createTarget = function (v12893, v12894) {
        return $('<div class="hiprint-printElement hiprint-printElement-rect" style="border:1px solid;position: absolute;"></div>');
      }, v12890.prototype.getHtml = function (v12895, v12896, v12897) {
        return this.getHtml2(v12895, v12896, v12897);
      }, v12890;
    }(v12447.a),
    v12899 = function () {
      var _t13 = function v12900(v12901, v12902) {
        return (_t13 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12903, v12904) {
          v12903.__proto__ = v12904;
        } || function (v12905, v12906) {
          for (var v12907 in v12906) {
            v12906.hasOwnProperty(v12907) && (v12905[v12907] = v12906[v12907]);
          }
        })(v12901, v12902);
      };

      return function (v12908, v12909) {
        function v12910() {
          this.constructor = v12908;
        }

        _t13(v12908, v12909), v12908.prototype = null === v12909 ? Object.create(v12909) : (v12910.prototype = v12909.prototype, new v12910());
      };
    }(),
    v12911 = function (v12912) {
      function v12919(v12913, v12914) {
        var v12915 = v12912.call(this, v12913) || this;
        return v12915.options = new v12448.a(v12914), v12915.options.setDefault(new v12448.a(v12410.a.instance.oval.default).getPrintElementOptionEntity()), v12915;
      }

      return v12899(v12919, v12912), v12919.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12920 = this.getData();
          this.css(this.designTarget, v12920);
        }
      }, v12919.prototype.getConfigOptions = function () {
        return v12410.a.instance.oval;
      }, v12919.prototype.createTarget = function (v12922, v12923) {
        return $('<div class="hiprint-printElement hiprint-printElement-oval" style="border:1px solid;position: absolute;border-radius: 50%;"></div>');
      }, v12919.prototype.getHtml = function (v12924, v12925, v12926) {
        return this.getHtml2(v12924, v12925, v12926);
      }, v12919;
    }(v12447.a),
    barcode = function (v12928) {
      function v12935(v12929, v12930) {
        var v12931 = v12928.call(this, v12929) || this;
        return v12931.options = new v12448.a(v12930), v12931.options.setDefault(new v12448.a(v12410.a.instance.barcode.default).getPrintElementOptionEntity()), v12931;
      }
      return v12899(v12935, v12928), v12935.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12936 = this.getData();
          this.css(this.designTarget, v12936), this.initBarcode(this.designTarget, this.getTitle(), this.getData());
        }
      }, v12935.prototype.getConfigOptions = function () {
        return v12410.a.instance.barcode;
      }, v12935.prototype.getBarAutoWidth = function () {
        return (null == this.options.barAutoWidth ? this.options.defaultOptions.barAutoWidth === "true" : this.options.barAutoWidth === "true") ?? true;
      }, v12935.prototype.onResize = function (v12938, v12939, v12940, v12941, v12942) {
        v12928.prototype.onResize.call(this, v12938, v12939, v12940, v12941, v12942);
        this.initBarcode(this.designTarget, this.getTitle(), this.getData());
      }, v12935.prototype.getTitle = function () {
        return this.options.title || this.printElementType.title;
      }, v12935.prototype.getData = function (v12943) {
        var v12944 = void 0;
        var v12945 = this.getField();
        v12944 = v12943 ? v12945 ? v12945.split('.').reduce((v12946, v12947) => v12946 ? v12946[v12947] : v12943 ? v12943[v12947] : "", !1) || "" : "" : this.options.testData || this.printElementType.getData() || "";
        return v12944;
      }, v12935.prototype.initBarcode = function (designTarget, title, text) {
        designTarget = designTarget || this.designTarget;
        var content = designTarget.find('.hiprint-printElement-barcode-content');
        try {
          // 计算 barcode 的高度，判断是否需要减去 title，使 title 包含在元素内部
          const height = v12388.a.pt.toMm(this.options.height - (!this.options.hideTitle ? this.options.lineHeight ?? (this.options.fontSize ?? 10.5) * 1.5 : 0));
          var barcode = bwipjs.toSVG({
            bcid: this.options.barcodeType || 'code128',
            text: text || this.options.testData || this.options.title,
            scale: this.options.barWidth || 1,
            width: !this.getBarAutoWidth() ? parseInt(v12388.a.pt.toMm(this.options.getWidth())) : '',
            height: parseInt(height),
            includetext: !this.options.hideTitle,
            barcolor: this.options.barColor || "#000"
          });
          // pub-beta 0.0.57-beta22 优化了条码自动调整宽度的逻辑，title 文本改为使用 bwipjs 文本内部实现
          barcode = $(barcode);
          // pub-beta 0.0.57-beta22 svg 元素需要添加 preserveAspectRatio 属性，使其横向可以自适应缩放
          barcode.attr("preserveAspectRatio", "none slice");
          let svgWidth = barcode[0].attributes.viewBox.value.split(" ")[2]; // 通过 viewBox 属性获取 bwipjs 内部生成的 svg 宽度
          svgWidth = Math.ceil(hinnn.px.toPt(svgWidth * 1.05));
          if (this.getBarAutoWidth() && svgWidth > this.options.width) {
            content.parent().css("width", svgWidth + 'pt');
            barcode.css("height", "100%");
            this.options.width = svgWidth;
          }
          content.html(barcode);
          // if (!this.options.hideTitle) {
          //   const titleText = title ? title + ( text ? ':' : '' ) : '';
          //   const textAlign = this.options.textAlign || 'center';
          //   // 支持type为barcode的textAlign属性
          //   const textStyle = textAlign === 'justify' ? 'text-align-last: justify;text-justify: distribute-all-lines;' : `text-align: ${ textAlign };`
          //   content.append($(`<div class="hiprint-printElement-barcode-content-title" style="${ textStyle }">${ titleText }${ text }</div>`))
          // }
        } catch (error) {
          console.error(error);
          content.html($(`<div>${i18n.__('条形码生成失败')}</div>`));
        }
      },
      // 设置 barcode 元素 resize 控制点
      v12935.prototype.getReizeableShowPoints = function () {
        return ['s', 'e', 'se', 'r'];
      }, v12935.prototype.createTarget = function (title, data) {
        var designTarget = $('<div class="hiprint-printElement hiprint-printElement-barcode" style="position: absolute;"><div class="hiprint-printElement-barcode-content" style="height:100%;width:100%;display:flex;flex-direction:column"></div></div>');
        this.initBarcode(designTarget, title, data);
        return designTarget;
      }, v12935.prototype.getHtml = function (v12950, v12951, v12952) {
        return this.getHtml2(v12950, v12951, v12952);
      }, v12935;
    }(v12447.a),
    qrcode = function (v12954) {
      function v12961(v12955, v12956) {
        var v12957 = v12954.call(this, v12955) || this;
        return v12957.options = new v12448.a(v12956), v12957.options.setDefault(new v12448.a(v12410.a.instance.qrcode.default).getPrintElementOptionEntity()), v12957;
      }
      return v12899(v12961, v12954), v12961.prototype.updateDesignViewFromOptions = function () {
        if (this.designTarget) {
          var v12962 = this.getData();
          this.css(this.designTarget, v12962), this.initQrcode(this.designTarget, this.getTitle(), this.getData());
        }
      }, v12961.prototype.getConfigOptions = function () {
        return v12410.a.instance.qrcode;
      }, v12961.prototype.onResize = function (v12964, v12965, v12966, v12967, v12968) {
        v12954.prototype.onResize.call(this, v12964, v12965, v12966, v12967, v12968);
        this.initQrcode(this.designTarget, this.getTitle(), this.getData());
      }, v12961.prototype.getTitle = function () {
        return this.options.title || this.printElementType.title;
      }, v12961.prototype.getData = function (v12969) {
        var v12970 = void 0;
        var v12971 = this.getField();
        v12970 = v12969 ? v12971 ? v12971.split('.').reduce((v12972, v12973) => v12972 ? v12972[v12973] : v12969 ? v12969[v12973] : "", !1) || "" : "" : this.options.testData || this.printElementType.getData() || "";
        return v12970;
      }, v12961.prototype.initQrcode = function (designTarget, title, text) {
        designTarget = designTarget || this.designTarget;
        var content = designTarget.find('.hiprint-printElement-qrcode-content');
        try {
          const width = v12388.a.pt.toPx(this.options.getWidth());
          // 计算 qrcode 的高度，判断是否需要减去 title，使 title 包含在元素内部
          const height = v12388.a.pt.toPx(this.options.height - (!this.options.hideTitle ? this.options.lineHeight ?? (this.options.fontSize ?? 10.5) * 1.5 : 0));
          // 根据宽高 判断 qrcode 上下、左右 留白边距
          const paddingwidth = width >= height ? Math.abs(parseInt((width - height) / 2)) : 0;
          const paddingheight = width >= height ? 0 : Math.abs(parseInt((height - width) / 2));
          var qrcode = bwipjs.toSVG({
            bcid: this.options.qrcodeType || 'qrcode',
            text: text || this.options.testData || this.options.title,
            scale: 1,
            paddingwidth,
            paddingheight,
            // 保持 qrcode 始终为正方形
            width: Math.min(parseInt(width / 2.835), parseInt(height / 2.835)),
            height: Math.min(parseInt(width / 2.835), parseInt(height / 2.835)),
            includetext: false,
            eclevel: ['M', 'L', 'H', 'Q'][this.options.qrCodeLevel ?? 0],
            barcolor: this.options.barColor || "#000"
          });
          content.html($(qrcode));
          if (!this.options.hideTitle) {
            const titleText = title ? title + (text ? ':' : '') : '';
            const textAlign = this.options.textAlign || 'center';
            // 支持type为qrcode的textAlign属性
            const textStyle = textAlign === 'justify' ? 'text-align-last: justify;text-justify: distribute-all-lines;' : `text-align: ${textAlign};`;
            content.append($(`<div class="hiprint-printElement-qrcode-content-title" style="${textStyle}">${titleText}${text}</div>`));
          }
        } catch (error) {
          console.error(error);
          content.html($(`<div>${i18n.__('二维码生成失败')}</div>`));
        }
      },
      // 设置 qrcode 元素 resize 控制点
      v12961.prototype.getReizeableShowPoints = function () {
        return ['s', 'e', 'se', 'r'];
      }, v12961.prototype.createTarget = function (title, data) {
        var designTarget = $('<div class="hiprint-printElement hiprint-printElement-qrcode" style="position: absolute;"><div class="hiprint-printElement-qrcode-content" style="height:100%;width:100%;display:flex;flex-direction:column"></div></div>');
        this.initQrcode(designTarget, title, data);
        return designTarget;
      }, v12961.prototype.getHtml = function (v12976, v12977, v12978) {
        return this.getHtml2(v12976, v12977, v12978);
      }, v12961;
    }(v12447.a),
    v12980 = function () {
      function v12981() {
      }

      return v12981.createPrintElement = function (v12982, v12983) {
        return "text" == v12982.type ? new v12721(v12982, v12983) : "image" == v12982.type ? new v12461(v12982, v12983) : "longText" == v12982.type ? new v12600(v12982, v12983) : "table" == v12982.type ? new v12422.a(v12982, v12983) : "html" == v12982.type ? new v12795(v12982, v12983) : "vline" == v12982.type ? new v12827(v12982, v12983) : "hline" == v12982.type ? new v12856(v12982, v12983) : "rect" == v12982.type ? new v12882(v12982, v12983) : "oval" == v12982.type ? new v12911(v12982, v12983) : "barcode" == v12982.type ? new barcode(v12982, v12983) : "qrcode" == v12982.type ? new qrcode(v12982, v12983) : void 0;
      }, v12981;
    }(),
    v12985 = function () {
      function v12987(v12986) {
        this.field = v12986.field, this.fields = v12986.fields, this.title = v12986.title, this.text = v12986.text, this.tid = v12986.tid, this.data = v12986.data, this.styler = v12986.styler, this.formatter = v12986.formatter, this.type = v12986.type, this.onRendered = v12986.onRendered, this.options = v12986.options;
      }

      return v12987.prototype.getText = function (v12988) {
        return v12988 ? this.title || this.text || "" : this.text || this.title || "";
      }, v12987.prototype.getData = function () {
        return this.data;
      }, v12987.prototype.createPrintElement = function (v12989) {
        var v12990 = {};
        return $.extend(v12990, v12989 || {}), v12980.createPrintElement(this, v12990);
      }, v12987.prototype.getPrintElementTypeEntity = function () {
        return new v12423({
          title: this.title,
          type: this.type
        });
      }, v12987.prototype.getFields = function () {
        return this.fields;
      }, v12987.prototype.getOptions = function () {
        return this.options || {};
      }, v12987;
    }(),
    v12991 = v12385(16),
    v12992 = v12385(12),
    v12993 = function () {
      var _t14 = function v12994(v12995, v12996) {
        return (_t14 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v12997, v12998) {
          v12997.__proto__ = v12998;
        } || function (v12999, v13000) {
          for (var v13001 in v13000) {
            v13000.hasOwnProperty(v13001) && (v12999[v13001] = v13000[v13001]);
          }
        })(v12995, v12996);
      };

      return function (v13002, v13003) {
        function v13004() {
          this.constructor = v13002;
        }

        _t14(v13002, v13003), v13002.prototype = null === v13003 ? Object.create(v13003) : (v13004.prototype = v13003.prototype, new v13004());
      };
    }(),
    v13005 = function (v13006) {
      function v13014(v13007) {
        var v13008 = v13006.call(this, v13007) || this;
        (v13007 = v13007 || {}).columns ? (v13008.columns = [], v13007.columns.forEach(function (v13009) {
          v13008.columns.push(new v12992.a(v13009));
        })) : v13008.columns = [new v12992.a({
          columns: [new v12421.a({
            width: 100
          }), new v12421.a({
            width: 100
          })]
        })];
        return v13008.lHeight = v13007.lHeight, v13008.autoCompletion = v13007.autoCompletion, v13008.tableFooterRepeat = v13007.tableFooterRepeat, v13008;
      }

      return v12993(v13014, v13006), v13014.prototype.getPrintElementOptionEntity = function () {
        var v13015 = v13006.prototype.getPrintElementOptionEntity.call(this);
        v13015.fields = this.fields;
        return v13015.columns = [], this.columns.forEach(function (v13016) {
          v13015.columns.push(v13016.getPrintElementOptionEntity());
        }), v13015;
      }, v13014;
    }(v12448.a),
    v13018 = function () {
      var _t16 = function v13019(v13020, v13021) {
        return (_t16 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v13022, v13023) {
          v13022.__proto__ = v13023;
        } || function (v13024, v13025) {
          for (var v13026 in v13025) {
            v13025.hasOwnProperty(v13026) && (v13024[v13026] = v13025[v13026]);
          }
        })(v13020, v13021);
      };

      return function (v13027, v13028) {
        function v13029() {
          this.constructor = v13027;
        }

        _t16(v13027, v13028), v13027.prototype = null === v13028 ? Object.create(v13028) : (v13029.prototype = v13028.prototype, new v13029());
      };
    }(),
    tt = function () {
      var _t17 = function v13030(v13031, v13032) {
        return (_t17 = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v13033, v13034) {
          v13033.__proto__ = v13034;
        } || function (v13035, v13036) {
          for (var v13037 in v13036) {
            v13036.hasOwnProperty(v13037) && (v13035[v13037] = v13036[v13037]);
          }
        })(v13031, v13032);
      };

      return function (v13038, v13039) {
        function v13040() {
          this.constructor = v13038;
        }

        _t17(v13038, v13039), v13038.prototype = null === v13039 ? Object.create(v13039) : (v13040.prototype = v13039.prototype, new v13040());
      };
    }(),
    et = function (v13041) {
      function v13043(v13042) {
        return v13041.call(this, v13042) || this;
      }

      return tt(v13043, v13041), v13043.prototype.createPrintElement = function (v13044) {
        var v13045 = {};
        return $.extend(v13045, v13044 || {}), v12980.createPrintElement(this, v13045);
      }, v13043.prototype.getPrintElementTypeEntity = function () {
        return new v12423({
          title: this.title,
          type: this.type
        });
      }, v13043;
    }(v12985),
    nt = function () {
      function v13046() {
      }

      return v13046.createPrintElementType = function (v13047) {
        return v13047.type = v13047.type || "text", "text" == v13047.type ? new et(v13047) : "table" == v13047.type ? new v12426(v13047) : new v12985(v13047);
      }, v13046;
    }(),
    it = function () {
      function v13048() {
      }

      return v13048.getElementTypeGroups = function (v13049) {
        var v13050 = v13048.formatterModule(v13049);
        return v12393.instance[v13050] || [];
      }, v13048.getElementType = function (v13051, v13052) {
        if (v13051) return v12393.instance.getElementType(v13051);
        nt.createPrintElementType({
          type: v13052
        });
      }, v13048.build = function (v13053, v13054) {
        var v13055 = v13048.formatterModule(v13054),
          v13056 = new v12412().createPrintElementTypeHtml(v13053, this.getElementTypeGroups(v13055));
        this.enableDrag(v13056);
      }, v13048.buildByHtml = function (v13057) {
        this.enableDrag(v13057);
      }, v13048.enableDrag = function (v13058) {
        v13058.hidraggable({
          revert: !0,
          proxy: function proxy(v13059) {
            var v13060 = v12411.a.instance.getDragingPrintElement(),
              v13062 = v13060.printElement.getProxyTarget(v13060.printElement.printElementType.getOptions());
            return v13062.appendTo("body"), v13062.css("z-index", "9999"), v13062;
          },
          moveUnit: "pt",
          minMove: 4,
          onBeforeDrag: function onBeforeDrag(v13063) {
            v12411.a.instance.draging = !0;
            var tid = $(v13063.data.target).attr("tid");
            var v13065 = v13048.getElementType(tid, $(v13063.data.target).attr("ptype"));
            if (!v13065) {
              throw new Error(`${i18n.__('请检查 hiprint.init 的 provider 是否配置了')} [${tid}]`);
              return !1;
            }
            var ele = v13065.createPrintElement();
            if (!ele) {
              if (v13065.type == 'tableCustom') {
                throw new Error(`${i18n.__("已移除'tableCustom',请替换使用'table'详情见更新记录")}`);
                return !1;
              }
            }
            return v12411.a.instance.setDragingPrintElement(ele), !0;
          },
          onDrag: function onDrag(v13067, v13068, v13069) {
            v12411.a.instance.getDragingPrintElement().updatePosition(v13068, v13069);
          },
          onStopDrag: function onStopDrag(v13071) {
            v12411.a.instance.draging = !1;
          }
        });
      }, v13048.formatterModule = function (v13073) {
        return v13073 || "_default";
      }, v13048;
    }(),
    ot = function () {
      return function (v13074, v13075) {
        var v13076 = this;
        this.name = v13074, this.printElementTypes = [], v13075.forEach(function (v13077) {
          v13076.printElementTypes.push(nt.createPrintElementType(v13077));
        });
      };
    }(),
    rt = function () {
      return function (v13078) {
        if (this.index = v13078.index, this.name = v13078.name, this.paperType = v13078.paperType, this.paperType) {
          var v13079 = v12411.a.instance[this.paperType];
          v13078.height ? (this.height = v13078.height, this.width = v13078.width) : (this.height = v13079.height, this.width = v13079.width);
        } else this.height = v13078.height, this.width = v13078.width;

        this.paperHeader = v13078.paperHeader || 0, this.paperFooter = v13078.paperFooter || v12388.a.mm.toPt(this.height), this.printElements = v13078.printElements || [], this.paperNumberLeft = v13078.paperNumberLeft, this.paperNumberTop = v13078.paperNumberTop, this.paperNumberDisabled = v13078.paperNumberDisabled, this.paperNumberContinue = v13078.paperNumberContinue, this.paperNumberFormat = v13078.paperNumberFormat, this.panelPaperRule = v13078.panelPaperRule, this.panelPageRule = v13078.panelPageRule, this.rotate = v13078.rotate || void 0, this.firstPaperFooter = v13078.firstPaperFooter, this.evenPaperFooter = v13078.evenPaperFooter, this.oddPaperFooter = v13078.oddPaperFooter, this.lastPaperFooter = v13078.lastPaperFooter, this.topOffset = v13078.topOffset, this.fontFamily = v13078.fontFamily, this.leftOffset = v13078.leftOffset, this.orient = v13078.orient, this.scale = v13078.scale, this.watermarkOptions = v13078.watermarkOptions, this.panelLayoutOptions = v13078.panelLayoutOptions;
      };
    }(),
    at = function () {
      function v13086(v13082, v13083, v13084, v13085) {
        this.bx = v13082, this.by = v13083, this.ex = v13082, this.ey = v13083, this.startX = this.minX = v13082, this.startY = this.minY = v13083, this.maxX = v13082, this.maxY = v13083, this.lastLeft = v13084, this.lastTop = v13085;
      }

      return v13086.prototype.updateRect = function (v13087, v13088, v13089) {
        var scale = v13089.designPaper.scale || 1.0;
        this.ex = v13087;
        this.ey = v13088;
        this.minX = this.startX / scale < v13087 / scale ? this.startX / scale : v13087 / scale,
        this.minY = this.startY / scale < v13088 / scale ? this.startY / scale : v13088 / scale,
        this.maxX = this.startX / scale < v13087 / scale ? v13087 / scale : this.startX / scale,
        this.maxY = this.startY / scale < v13088 / scale ? v13088 / scale : this.startY / scale;

      }, v13086.prototype.updatePositionByMultipleSelect = function (v13090, v13091) {
        null != v13090 && (this.lastLeft = this.lastLeft + v13090), null != v13091 && (this.lastTop = this.lastTop + v13091), this.target.css({
          left: this.lastLeft + "pt",
          top: this.lastTop + "pt"
        });
      }, v13086;
    }(),
    pt = function () {
      function v13094(v13092, v13093) {
        this.templateId = v13093, this.index = v13092.index, this.name = v13092.name, this.width = v13092.width, this.height = v13092.height, this.paperType = v13092.paperType, this.paperHeader = v13092.paperHeader, this.paperFooter = v13092.paperFooter, this.initPrintElements(v13092.printElements), this.paperNumberLeft = v13092.paperNumberLeft, this.paperNumberTop = v13092.paperNumberTop, this.paperNumberDisabled = v13092.paperNumberDisabled, this.paperNumberContinue = v13092.paperNumberContinue == void 0 ? true : v13092.paperNumberContinue, this.paperNumberFormat = v13092.paperNumberFormat, this.panelPaperRule = v13092.panelPaperRule, this.panelPageRule = v13092.panelPageRule, this.firstPaperFooter = v13092.firstPaperFooter, this.evenPaperFooter = v13092.evenPaperFooter, this.oddPaperFooter = v13092.oddPaperFooter, this.lastPaperFooter = v13092.lastPaperFooter, this.topOffset = v13092.topOffset, this.leftOffset = v13092.leftOffset, this.fontFamily = v13092.fontFamily, this.orient = v13092.orient, this.target = this.createTarget(), this.rotate = v13092.rotate, this.scale = v13092.scale, this.watermarkOptions = v13092.watermarkOptions || {}, this.panelLayoutOptions = v13092.panelLayoutOptions || {};
      }

      return v13094.prototype.design = function (v13095) {
        var v13096 = this;
        this.orderPrintElements(), this.designPaper = this.createNewPage(0), this.target.html(""), this.target.append(this.designPaper.getTarget()), this.droppablePaper(this.designPaper), this.designPaper.design(v13095), this.designPaper.subscribePaperBaseInfoChanged(function (v13097) {
          v13096.paperHeader = v13097.paperHeader, v13096.paperFooter = v13097.paperFooter, v13096.paperNumberLeft = v13097.paperNumberLeft, v13096.paperNumberTop = v13097.paperNumberTop, v13096.paperNumberDisabled = v13097.paperNumberDisabled, v13096.paperNumberFormat = v13097.paperNumberFormat;
        }), this.printElements.forEach(function (v13098) {
          v13096.appendDesignPrintElement(v13096.designPaper, v13098), v13098.design(v13095, v13096.designPaper);
        }), this.target.bind("click.hiprint", function (v13099) {
          let panelOptions = {
            panelPaperRule: v13096.panelPaperRule,
            panelPageRule: v13096.panelPageRule,
            firstPaperFooter: v13096.firstPaperFooter,
            evenPaperFooter: v13096.evenPaperFooter,
            oddPaperFooter: v13096.oddPaperFooter,
            lastPaperFooter: v13096.lastPaperFooter,
            leftOffset: v13096.leftOffset,
            topOffset: v13096.topOffset,
            panelLayoutOptions: v13096.panelLayoutOptions || {},
            fontFamily: v13096.fontFamily,
            orient: v13096.orient,
            paperNumberDisabled: v13096.paperNumberDisabled,
            paperNumberContinue: v13096.paperNumberContinue,
            paperNumberFormat: v13096.paperNumberFormat,
            watermarkOptions: v13096.watermarkOptions || {}
          };
          if (!v12410.a.instance.paperNumberContinue) {
            delete panelOptions['paperNumberContinue'];
          }
          v12388.a.event.trigger("BuildCustomOptionSettingEventKey_" + v13096.templateId, {
            options: panelOptions,
            callback: function callback(v13102) {
              v13096.panelLayoutOptions = v13102.panelLayoutOptions || {}, v13096.watermarkOptions = v13102.watermarkOptions || void 0, v13102.watermarkOptions && v13096.designPaper.createWaterMark(true, 1, v13102.watermarkOptions);
              v13096.panelPaperRule = v13102.panelPaperRule, v13096.panelPageRule = v13102.panelPageRule, v13096.firstPaperFooter = v13102.firstPaperFooter, v13096.evenPaperFooter = v13102.evenPaperFooter, v13096.oddPaperFooter = v13102.oddPaperFooter, v13096.lastPaperFooter = v13102.lastPaperFooter, v13096.leftOffset = v13102.leftOffset, v13096.topOffset = v13102.topOffset, v13096.fontFamily = v13102.fontFamily, v13096.orient = v13102.orient, v13096.paperNumberDisabled = v13096.designPaper.paperNumberDisabled = !!v13102.paperNumberDisabled || void 0, v13096.paperNumberContinue = v13096.designPaper.paperNumberContinue = v13102.paperNumberContinue, v13096.paperNumberFormat = v13102.paperNumberFormat, v13096.designPaper.paperNumberFormat = v13102.paperNumberFormat, v13102.paperNumberFormat && (v13096.designPaper.paperNumberTarget = v13096.designPaper.createPaperNumber(v13096.designPaper.formatPaperNumber(1, 1), true)), v13096.designPaper.setOffset(v13096.leftOffset, v13096.topOffset), v13096.css(v13096.target), v13096.designPaper.resetPaperNumber(v13096.designPaper.paperNumberTarget), v13096.designPaper.triggerOnPaperBaseInfoChanged();
            }
          });
        }), this.bindShortcutKeyEvent();
        this.bingPasteEvent();
        this.bindBatchMoveElement();
      }, v13094.prototype.update = function (v13103) {
        try {
          var start = Date.now();
          console.log('start', start);
          var v13104 = this;
          this.index = v13103.index, this.name = v13103.name, this.width = v13103.width, this.height = v13103.height, this.paperType = v13103.paperType, this.paperHeader = v13103.paperHeader, this.paperFooter = v13103.paperFooter;
          this.designPaper.width = v12388.a.mm.toPt(v13103.width), this.designPaper.height = v12388.a.mm.toPt(this.height), this.designPaper.paperType = this.paperType, this.designPaper.paperHeader = this.paperHeader, this.designPaper.paperFooter = this.paperFooter;
          this.designPaper.mmheight = v13103.height, this.designPaper.mmwidth = v13103.width;
          // 页眉线
          this.designPaper.headerLinetarget.css("top", (this.paperHeader || -1) + "pt"),
          0 == this.paperHeader && this.designPaper.headerLinetarget.addClass("hideheaderLinetarget");
          // 页脚线
          this.designPaper.footerLinetarget.css("top", parseInt(this.paperFooter.toString()) + "pt"),
          this.paperFooter == this.height && this.designPaper.footerLinetarget.css("top", v13103.height - v12410.a.instance.paperHeightTrim + "mm");
          // 水印参数
          this.watermarkOptions = v13103.watermarkOptions || {};
          this.designPaper.createWaterMark(true, this.index, this.watermarkOptions);
          // 页码
          this.paperNumberLeft = v13103.paperNumberLeft, this.paperNumberTop = v13103.paperNumberTop, this.paperNumberDisabled = v13103.paperNumberDisabled, this.paperNumberContinue = v13103.paperNumberContinue, this.paperNumberFormat = v13103.paperNumberFormat;
          this.designPaper.paperNumberLeft = this.paperNumberLeft, this.designPaper.paperNumberTop = this.paperNumberTop, this.designPaper.paperNumberDisabled = this.paperNumberDisabled, this.designPaper.paperNumberContinue = this.paperNumberContinue, this.designPaper.paperNumberFormat = this.paperNumberFormat;
          this.designPaper.paperNumberTarget.css("top", this.paperNumberTop + "pt").css("left", this.paperNumberLeft + "pt"), this.designPaper.resetPaperNumber(this.designPaper.paperNumberTarget);
          // 字体方向
          this.fontFamily = v13103.fontFamily, this.orient = v13103.orient, this.rotate = v13103.rotate, this.scale = v13103.scale;
          this.designPaper.fontFamily = this.fontFamily, this.designPaper.orient = this.orient, this.designPaper.scale = v13104.designPaper.scale || this.scale;
          // 面板参数
          this.panelLayoutOptions = v13103.panelLayoutOptions, this.panelPaperRule = v13103.panelPaperRule, this.panelPageRule = v13103.panelPageRule, this.firstPaperFooter = v13103.firstPaperFooter, this.evenPaperFooter = v13103.evenPaperFooter,
          this.oddPaperFooter = v13103.oddPaperFooter, this.lastPaperFooter = v13103.lastPaperFooter, this.topOffset = v13103.topOffset, this.leftOffset = v13103.leftOffset;
          this.designPaper.setFooter(this.firstPaperFooter, this.evenPaperFooter, this.oddPaperFooter, this.lastPaperFooter),
          this.designPaper.setOffset(this.leftOffset, this.topOffset);
          var end = Date.now();
          console.log('更新参数 end', end);
          console.log('更新参数 time:', end - start);
          // 清空面板
          this.printElements.forEach(function (v13108) {
            v13108.designTarget && v13108.designTarget.length && v13108.designTarget.remove();
          }), this.printElements = [];
          var end = Date.now();
          console.log('清空面板 end', end);
          console.log('清空面板 time:', end - start);
          // 更新面板
          this.initPrintElements(v13103.printElements);
          var end = Date.now();
          console.log('初始化元素 end', end);
          console.log('初始化元素 time:', end - start);
          this.printElements.forEach(function (v13109) {
            v13104.appendDesignPrintElement(v13104.designPaper, v13109), v13109.design(v13103, v13104.designPaper);
          });
          var end = Date.now();
          console.log('插入面板 end', end);
          console.log('插入面板 time:', end - start);
        } catch (v13110) {
          console.log('???????');
          console.log(v13110);
        }
      }, v13094.prototype.bindShortcutKeyEvent = function () {
        var v13111 = this;
        $(document).keydown(function (v13112) {
          if ('INPUT' == v13112.target.tagName) return;
          // ctrl/command + z 撤销 / ctrl/command + shift + z 重做
          if ((v13112.ctrlKey || v13112.metaKey) && 90 == v13112.keyCode) {
            if (v13112.shiftKey) {
              v12388.a.event.trigger("hiprintTemplateDataShortcutKey_" + v13111.templateId, "redo");
            } else {
              v12388.a.event.trigger("hiprintTemplateDataShortcutKey_" + v13111.templateId, "undo");
            }
            v13112.preventDefault();
          }
        });
      }, v13094.prototype.bingPasteEvent = function () {
        var v13115 = this;
        v13115.designPaper.target.attr("tabindex", "1");
        v13115.designPaper.target.keydown(function (v13116) {
          // ctrl + v / command + v
          if ('INPUT' == v13116.target.tagName) return;
          if ((v13116.ctrlKey || v13116.metaKey) && 86 == v13116.keyCode) {
            v13115.pasteJson(v13116);
            v13116.preventDefault();
          }
        });
      }, v13094.prototype.pasteJson = function (v13117) {
        var copyArea = $('#copyArea');
        if (!copyArea.length) return;
        try {
          var json = copyArea.text();
          var objList = JSON.parse(json);
          let operationPasterPosition = null;
          let replacePosition = null;
          var left = null;
          var top = null;
          objList.forEach((obj, index) => {
            if (!obj.printElementType && !obj.templateId) return;
            // 复制使用当前模板内的元素 进行克隆
            // todo: 使用参数创建
            var v13118 = this,v13119 = obj.options,ele = v13118.getElementById(obj.id);
            if (!ele) return;
            var v13120 = ele.clone(obj);
            if (!v13120) return;
            // 判断是否是在元素上进行paste
            if (index === 0) {
              operationPasterPosition = {
                x: obj.options.left,
                y: obj.options.top
              };
              var useMouse = v13117.currentTarget.className != v13117.target.className;
              left = !useMouse && v13118.mouseOffsetX && v12388.a.px.toPt(v13118.mouseOffsetX) || (v13119.left += 10);
              top = !useMouse && v13118.mouseOffsetY && v12388.a.px.toPt(v13118.mouseOffsetY) || (v13119.top += 10);
              replacePosition = {
                x: left,
                y: top
              };
            } else {
              const position = {
                x: obj.options.left,
                y: obj.options.top
              };
              const incrementPosition = {
                x: position.x - operationPasterPosition.x,
                y: position.y - operationPasterPosition.y
              };
              left = replacePosition.x + incrementPosition.x;
              top = replacePosition.y + incrementPosition.y;

            }
            v13120.options.setLeft(left);
            v13120.options.setTop(top);
            v13120.setTemplateId(v13118.templateId), v13120.setPanel(v13118);
            v13118.appendDesignPrintElement(v13118.designPaper, v13120, !1);
            // 在复制的地方也重新给他算轮次
            const template = v12411.a.instance.getPrintTemplateById(v13118.templateId);
            if (v13120.options.field && template.qtDesigner) {
              v13120.options.qid = template.qtDesignderFunction(v13120.options.field);
            }
            v13118.printElements.push(v13120), v13120.design(void 0, v13118.designPaper);
            console.log('pasteJson success');
            v12388.a.event.trigger("hiprintTemplateDataChanged_" + v13118.templateId, "复制");
            // 点击克隆出来的元素
            v13120.designTarget.children('.resize-panel').trigger($.Event('click'));
          });
        } catch (v13141) {
          console.error('pasteJson error', v13141);
        }
      }, v13094.prototype.css = function (v13142) {
        if (this.fontFamily) v13142.css("fontFamily", this.fontFamily);else
        v13142[0].style.fontFamily = '';
      }, v13094.prototype.getConfig = function () {
        return v12410.a.instance;
      }, v13094.prototype.getHtml = function (v13144, v13145, v13146, v13147, v13148) {
        var v13149 = this;
        this.orderPrintElements();
        let config = v13149.getConfig();
        var v13150,
          v13151 = v13146 || [],
          v13152 = v13147 || this,
          v13153 = void 0;

        if (v13147) {
          v13153 = v13151[v13151.length - 1];
          v13150 = v13153.getPanelTarget();
          v13153.updateReferenceElement(new v12507.a({
            top: this.paperHeader,
            left: 0,
            height: 0,
            width: 0,
            bottomInLastPaper: v13153.referenceElement.bottomInLastPaper,
            beginPrintPaperIndex: v13151.length - 1,
            printTopInPaper: v13153.referenceElement.bottomInLastPaper,
            endPrintPaperIndex: v13151.length - 1
          }));
        } else {
          v13150 = v13152.createTarget();
          v13153 = v13152.createNewPage(v13151.length);
          v13151.push(v13153);
          v13150.append(v13153.getTarget());
        }
        this.printElements.filter(function (v13155) {
          return !v13155.isFixed() && !v13155.isHeaderOrFooter();
        }).forEach(function (v13156) {
          var v13157 = [],
            v13158 = v13151[v13151.length - 1];
          if (v13158.referenceElement.isPositionLeftOrRight(v13156.options.getTop())) {
            v13153 = v13151[v13158.referenceElement.beginPrintPaperIndex];
          } else {
            v13153 = v13151[v13158.referenceElement.endPrintPaperIndex];
          }
          v13157 = v13156.getHtml(v13153, v13144);
          v13157.forEach(function (v13159, v13160) {
            v13159.referenceElement && (v13159.referenceElement.endPrintPaperIndex = v13159.referenceElement.beginPrintPaperIndex + v13157.length - 1);
            if (v13160 > 0) {
              if (v13153.index < v13151.length - 1) {
                v13153 = v13151[v13153.index + 1];
              } else {
                v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement);
                v13151.push(v13153);
              }
              v13150.append(v13153.getTarget());
            }
            // 元素隐藏时不添加到html内
            v13159.target && ("none" != v13156.options.showInPage && v13153.append(v13159.target), v13153.updatePrintLine(v13159.printLine), v13156.onRendered(v13153, v13159.target));
            v13160 == v13157.length - 1 && v13159.referenceElement && v13153.updateReferenceElement(v13159.referenceElement);
          });
        });
        v13148 && v13148.templates.forEach(function (v13161, v13162) {
          var v13163 = v13161.data || {},
            v13164 = v13161.options || {};
          v13161.template.printPanels.forEach(function (v13165) {
            v13165.getHtml(v13163, v13164, v13146, v13149);
          });
        });
        // config 是否开启页码续排
        if (config.paperNumberContinue) {
          // 面板是否页码续排
          if (v13149.paperNumberContinue) {
            hinnn._paperList = [...(hinnn._paperList || []), ...v13151];
          } else {
            hinnn._paperList = [...v13151];
          }
        }
        if (!v13147) {
          if (this.lastPaperFooter) v13151[v13151.length - 1].printLine > this.lastPaperFooter && (v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement), v13151.push(v13153), v13150.append(v13153.getTarget()));
          // 这里是处理奇偶页设置
          this.panelPaperRule && ("odd" == this.panelPaperRule && v13151.length % 2 == 0 && (v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement), v13151.push(v13153), v13150.append(v13153.getTarget())), "even" == this.panelPaperRule && v13151.length % 2 == 1 && (v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement), v13151.push(v13153), v13150.append(v13153.getTarget())));
          v13151.forEach(function (v13166) {
            v13166.updatePaperNumber(v13166.index + 1, v13151.length, v13145.paperNumberToggleInEven), v13149.fillPaperHeaderAndFooter(v13166, v13144, v13151.length), v13145 && (null != v13145.leftOffset && v13166.setLeftOffset(v13145.leftOffset), null != v13145.topOffset && v13166.setTopOffset(v13145.topOffset));
          });
          v13150.prepend(this.getPrintStyle());
          // config 是否开启页码续排
          if (config.paperNumberContinue) {
            hinnn._paperList.forEach(function (v13167, index) {
              v13167.updatePaperNumber(index + 1, hinnn._paperList.length);
            });
          }
        }

        return v13150;
      }, v13094.prototype.resize = function (v13168, v13169, v13170, v13171) {
        this.width = v13169, this.height = v13170, this.paperType = v13168, this.rotate = v13171, this.designPaper.resize(v13169, v13170);
      }, v13094.prototype.rotatePaper = function () {
        null == this.rotate && (this.rotate = !1), this.rotate = !this.rotate, this.resize(this.paperType, this.height, this.width, this.rotate);
      }, v13094.prototype.zoom = function (v13172, v13173) {
        if (v13173) {
          this.scale = v13172;
        } else {
          this.scale = void 0;
        }
        this.designPaper.zoom(v13172);
      }, v13094.prototype.getTarget = function () {
        return this.target;
      }, v13094.prototype.enable = function () {
        this.target.removeClass("hipanel-disable");
      }, v13094.prototype.disable = function () {
        this.target.addClass("hipanel-disable");
      }, v13094.prototype.getPanelEntity = function (v13174) {
        var v13175 = [];
        return this.printElements.forEach(function (v13176) {
          v13175.push(v13176.getPrintElementEntity(v13174));
        }), new rt({
          index: this.index,
          name: this.name || this.index + 1,
          width: this.width,
          height: this.height,
          paperType: this.paperType,
          paperHeader: this.paperHeader,
          paperFooter: this.paperFooter,
          paperNumberDisabled: !!this.paperNumberDisabled || void 0,
          paperNumberContinue: this.paperNumberContinue == void 0 ? !0 : this.paperNumberContinue,
          paperNumberFormat: this.paperNumberFormat ? this.paperNumberFormat : void 0,
          panelPaperRule: this.panelPaperRule ? this.panelPaperRule : void 0,
          panelPageRule: this.panelPageRule ? this.panelPageRule : void 0,
          paperNumberLeft: this.paperNumberLeft,
          paperNumberTop: this.paperNumberTop,
          printElements: v13175,
          rotate: this.rotate,
          firstPaperFooter: this.firstPaperFooter,
          evenPaperFooter: this.evenPaperFooter,
          oddPaperFooter: this.oddPaperFooter,
          lastPaperFooter: this.lastPaperFooter,
          topOffset: this.topOffset,
          fontFamily: this.fontFamily,
          orient: this.orient,
          scale: this.scale,
          watermarkOptions: this.watermarkOptions ? this.watermarkOptions : void 0,
          leftOffset: this.leftOffset,
          panelLayoutOptions: this.panelLayoutOptions || {}
        });
      }, v13094.prototype.createTarget = function () {
        var v13177 = $('<div class="hiprint-printPanel panel-index-' + this.index + '"></div>');
        return this.css(v13177), v13177;
      }, v13094.prototype.droppablePaper = function (v13178) {
        var v13179 = this;
        v13178.getTarget().hidroppable({
          accept: ".ep-draggable-item",
          onDrop: function onDrop(v13180, v13181) {
            const template = v12411.a.instance.getPrintTemplateById(v13179.templateId);
            var v13183 = v12411.a.instance.getDragingPrintElement(),
              v13182 = v13183.printElement;
            var ptr = v13179.designPaper.scale || 1;
            var left = (v13183.left - v12388.a.px.toPt(v13179.target.children(".hiprint-printPaper").offset().left)) / ptr,
              top = (v13183.top - v12388.a.px.toPt(v13179.target.children(".hiprint-printPaper").offset().top)) / ptr;
            v13182.updateSizeAndPositionOptions(v13179.mathroundToporleft(left), v13179.mathroundToporleft(top));
            v13182.setTemplateId(v13179.templateId), v13182.setPanel(v13179), v13179.appendDesignPrintElement(v13179.designPaper, v13182, !0);
            // 如果说编辑器开启qtDesigner,那么就将唯一ID构建唯一ID生成逻辑代码
            if (v13182.options.field && template.qtDesigner) {
              v13182.options.qid = template.qtDesignderFunction(v13182.options.field);
            }
            v13179.printElements.push(v13182), v13182.design(void 0, v13178);
            v12388.a.event.trigger("hiprintTemplateDataChanged_" + v13179.templateId, "新增");
          }
        });
      }, v13094.prototype.initPrintElements = function (v13188) {
        var v13189 = this;
        this.printElements = [], v13188 && v13188.forEach(function (v13190) {
          var v13191;

          if (v13191 = v13190.printElementType ? nt.createPrintElementType(v13190.printElementType) : v12393.instance.getElementType(v13190.tid)) {
            var v13192 = v13191.createPrintElement(v13190.options);
            v13192.setTemplateId(v13189.templateId), v13192.setPanel(v13189), v13189.printElements.push(v13192);
          } else console.log("miss " + JSON.stringify(v13188));
        });
      }, v13094.prototype.mathroundToporleft = function (v13193) {
        var v13194 = v12410.a.instance.movingDistance;
        return Math.round(v13193 / v13194) * v13194;
      }, v13094.prototype.appendDesignPrintElement = function (v13196, v13197, v13198) {
        v13197.setCurrenttemplateData(void 0);
        var v13199 = v13197.getDesignTarget(v13196);
        v13199.addClass("design"), v13198 && v13197.initSizeByHtml(v13199), v13196.append(v13199);
      }, v13094.prototype.createNewPage = function (v13200, v13201) {
        var v13202 = new v12508(this.templateId, this.index, this.watermarkOptions, this.panelPageRule, this.scale, this.width, this.height, this.paperHeader, this.paperFooter, this.paperNumberLeft, this.paperNumberTop, this.paperNumberDisabled, this.paperNumberContinue, this.paperNumberFormat, v13200, v13201);
        return v13202.setFooter(this.firstPaperFooter, this.evenPaperFooter, this.oddPaperFooter, this.lastPaperFooter), v13202.setOffset(this.leftOffset, this.topOffset), v13202;
      }, v13094.prototype.orderPrintElements = function () {
        this.printElements = v12388.a.orderBy(this.printElements, function (v13204) {
          return v13204.options.getLeft();
        }), this.printElements = v12388.a.orderBy(this.printElements, function (v13206) {
          return v13206.options.getTop();
        });
      }, v13094.prototype.fillPaperHeaderAndFooter = function (v13207, v13208, v13209) {
        this.printElements.filter(function (v13210) {
          return v13210.isFixed() || v13210.isHeaderOrFooter();
        }).forEach(function (v13211) {
          if (v13211.isFixed(), v13211.showInPage(v13207.index, v13209)) {
            var v13212 = v13211.getHtml(v13207, v13208);
            v13212.length && v13207.append(v13212[0].target);
          }
        });
      }, v13094.prototype.clear = function () {
        this.printElements.forEach(function (v13213) {
          v13213.designTarget && v13213.designTarget.length && v13213.designTarget.remove();
        }), this.printElements = [];
        v12388.a.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "清空");
      }, v13094.prototype.insertPrintElementToPanel = function (v13215) {
        var v13216 = this.getPrintElementTypeByEntity(v13215);

        if (v13216) {
          var v13217 = v13216.createPrintElement(v13215.options);
          v13217.setTemplateId(this.templateId), v13217.setPanel(this), this.printElements.push(v13217);
        }
      }, v13094.prototype.addPrintText = function (v13218) {
        v13218.printElementType = v13218.printElementType || {}, v13218.printElementType.type = "text", this.insertPrintElementToPanel(v13218);
      }, v13094.prototype.addPrintHtml = function (v13219) {
        v13219.printElementType = v13219.printElementType || {}, v13219.printElementType.type = "html", this.insertPrintElementToPanel(v13219);
      }, v13094.prototype.addPrintTable = function (v13220) {
        if (v13220.printElementType = v13220.printElementType || {}, v13220.printElementType.type = "table", v13220.options && v13220.options.columns) {
          var v13221 = $.extend({}, v13220.options.columns);
          v13220.printElementType.columns = v13221.columns, v13221.columns = void 0;
        }

        this.insertPrintElementToPanel(v13220);
      }, v13094.prototype.addPrintImage = function (v13222) {
        v13222.printElementType = v13222.printElementType || {}, v13222.printElementType.type = "image", this.insertPrintElementToPanel(v13222);
      }, v13094.prototype.addPrintLongText = function (v13223) {
        v13223.printElementType = v13223.printElementType || {}, v13223.printElementType.type = "longText", this.insertPrintElementToPanel(v13223);
      }, v13094.prototype.addPrintVline = function (v13224) {
        v13224.printElementType = v13224.printElementType || {}, v13224.printElementType.type = "vline", this.insertPrintElementToPanel(v13224);
      }, v13094.prototype.addPrintHline = function (v13225) {
        v13225.printElementType = v13225.printElementType || {}, v13225.printElementType.type = "hline", this.insertPrintElementToPanel(v13225);
      }, v13094.prototype.addPrintRect = function (v13226) {
        v13226.printElementType = v13226.printElementType || {}, v13226.printElementType.type = "rect", this.insertPrintElementToPanel(v13226);
      }, v13094.prototype.addPrintOval = function (v13227) {
        v13227.printElementType = v13227.printElementType || {}, v13227.printElementType.type = "oval", this.insertPrintElementToPanel(v13227);
      }, v13094.prototype.getPrintElementTypeByEntity = function (v13228) {
        var v13229;
        return (v13229 = v13228.tid ? v12393.instance.getElementType(v13228.tid) : nt.createPrintElementType(v13228.printElementType)) || console.log("miss " + JSON.stringify(v13228)), v13229;
      }, v13094.prototype.getPrintStyle = function () {
        let layoutStyle = '';
        if (this.panelLayoutOptions && this.panelLayoutOptions['layoutType'] === 'row') {
          layoutStyle = `
            <style>
            .hiprint-printTemplate{
              margin: -${(Number(this.panelLayoutOptions['layoutRowGap']) || 0) / 2}mm -${(Number(this.panelLayoutOptions['layoutColumnGap']) || 0) / 2}mm;
            }
              .hiprint-printTemplate .hiprint-printPanel {
                display:inline-block;
                padding: ${(Number(this.panelLayoutOptions['layoutRowGap']) || 0) / 2}mm ${(Number(this.panelLayoutOptions['layoutColumnGap']) || 0) / 2}mm;
              }
            </style>
          `;
        }
        return layoutStyle + " <style printStyle>\n        @page\n        {\n             border:0;\n             padding:0cm;\n             margin:0cm;\n             " + this.getPrintSizeStyle() + "\n        }\n        </style>\n";
      }, v13094.prototype.getPrintSizeStyle = function () {
        return this.paperType ? "size:" + this.paperType + " " + (this.height > this.width ? "portrait" : "landscape") + ";" : "size: " + this.width + "mm " + this.height + "mm " + (this.orient ? 1 == this.orient ? "portrait" : "landscape" : "") + ";";
      }, v13094.prototype.deletePrintElement = function (v13230) {
        var v13231 = this;
        this.printElements.filter(function (v13232, v13233) {
          v13232.id == v13230.id && (v13230.delete(), v13231.printElements.splice(v13233, 1));
        });
      }, v13094.prototype.getElementByTid = function (v13234) {
        return this.printElements.filter(function (v13235) {
          return v13235.printElementType.tid === v13234;
        }).map(function (v13236, v13237) {
          return v13236;
        });
      }, v13094.prototype.getElementByName = function (v13238) {
        return this.printElements.filter(function (v13239) {
          return v13239.options.name === v13238;
        }).map(function (v13240, v13241) {
          return v13240;
        });
      }, v13094.prototype.getElementById = function (v13242) {
        return this.printElements.find(function (v13243) {
          return v13243.id === v13242;
        });
      }, v13094.prototype.getFieldsInPanel = function () {
        var v13244 = [];
        return this.printElements.forEach(function (v13245) {
          v13245.options && v13245.options.field ? v13244.push(v13245.options.field) : v13245.printElementType.field && v13244.push(v13245.printElementType.field);
        }), v13244;
      }, v13094.prototype.getTestData = function () {
        var v13246 = {};
        return this.printElements.forEach(function (v13247) {
          if ("table" != v13247.printElementType.type) {
            v13247.options && v13247.options.field ? v13246[v13247.options.field] = v13247.options.testData : v13247.printElementType.field ? v13246[v13247.printElementType.field] = v13247.printElementType.data || v13247.options.testData : void 0;
          }
        }), v13246;
      }, v13094.prototype.bindBatchMoveElement = function () {
        var v13248 = this;
        this.designPaper.getTarget().on("mousemove", function (v13249) {
          if (v13249.target.className && _typeof(v13249.target.className) == "string" && v13249.target.className.includes("editing")) {
            return;
          }
          if (v13249.currentTarget.className == v13248.designPaper.target[0].className) {
            v13248.mouseOffsetX = v13249.offsetX, v13248.mouseOffsetY = v13249.offsetY;
          } else {
            v13248.mouseOffsetX = v13248.mouseOffsetY = void 0;
          }
          v12411.a.instance.draging || 1 === v13249.buttons && v12411.a.instance.rectDraging && v13248.mouseRect && (v13248.mouseRect.updateRect(v13249.pageX, v13249.pageY, v13248), v13248.updateRectPanel(v13248.mouseRect));
        }).on("mousedown", function (v13252) {
          v12411.a.instance.rectDraging = true;
          if (v13252.target.className && _typeof(v13252.target.className) == "string" && v13252.target.className.includes("editing")) {
            return;
          }
          v12411.a.instance.draging || (v13248.mouseRect && v13248.mouseRect.target && v13248.mouseRect.target.remove(), 1 === v13252.buttons && _typeof(v13252.target.className) == "string" && v13252.target.className.includes("hiprint-printPaper hidroppable design") && (v13248.mouseRect = new at(v13252.pageX, v13252.pageY, v12411.a.instance.dragLengthCNum(v13252.pageX - v13248.designPaper.getTarget().offset().left, v12410.a.instance.movingDistance), v12411.a.instance.dragLengthCNum(v13252.pageY - v13248.designPaper.getTarget().offset().top, v12410.a.instance.movingDistance))));
        }).on("mouseup", function (v13259) {
          v12411.a.instance.rectDraging = false;
        });
      }, v13094.prototype.getElementInRect = function (v13261) {
        var v13262 = [];
        return this.printElements.filter(function (v13263) {
          return v13263.options.draggable !== false;
        }).forEach(function (v13264) {
          v13264.inRect(v13261) && v13262.push(v13264);
        }), v13262;
      }, v13094.prototype.updateRectPanel = function (v13265) {
        var v13266 = this,
          v13267 = this.designPaper.getTarget();
        var ptr = this.designPaper.scale || 1;
        this.mouseRect.target || (this.mouseRect.target = $('<div tabindex="1" class="mouseRect" style="z-index:2;position: absolute;opacity:0.2;border: 1px dashed #000;background-color:#31676f;"><span></span></div>'), v13267.find(".hiprint-printPaper-content").append(this.mouseRect.target), this.bingKeyboardMoveEvent(this.mouseRect.target), this.mouseRect.target.hidraggable({
          onDrag: function onDrag(v13268, v13269, v13270) {
            v13266.mouseRect.lastLeft = v13266.mouseRect.lastLeft ? v12388.a.px.toPt(v13266.mouseRect.target[0].offsetLeft) : v13269 / ptr, v13266.mouseRect.lastTop = v13266.mouseRect.lastTop ? v12388.a.px.toPt(v13266.mouseRect.target[0].offsetTop) : v13270 / ptr,
            (v13266.mouseRect.mouseRectSelectedElement || []).forEach(function (v13273) {
              v13273.updatePositionByMultipleSelect(v13269 - v13266.mouseRect.lastLeft, v13270 - v13266.mouseRect.lastTop);
            }),
            v13266.mouseRect.lastLeft = v13269 / ptr,
            v13266.mouseRect.lastTop = v13270 / ptr,
            v12411.a.instance.changed = !0;
          },
          moveUnit: "pt",
          minMove: v12410.a.instance.movingDistance,
          onBeforeDrag: function onBeforeDrag(v13276) {
            v13266.mouseRect.target.focus(), v12411.a.instance.draging = !0, v13266.mouseRect.mouseRectSelectedElement || (v13266.mouseRect.mouseRectSelectedElement = v13266.getElementInRect(v13266.mouseRect));
            v13266.mouseRect.target.css({
              transform: 'unset'
            });
          },
          getScale: function getScale() {
            return v13266.designPaper.scale || 1;
          },
          onStopDrag: function onStopDrag(v13278) {
            if (v12411.a.instance.changed) v12388.a.event.trigger("hiprintTemplateDataChanged_" + v13267.templateId, "框选移动");
            v12411.a.instance.draging = !1;
            v12411.a.instance.changed = !1;
          }
        }));
        if (v13265.ex >= v13265.bx && v13265.ey >= v13265.by) {// 终点大于起点
          this.mouseRect.target.css({
            height: v13265.maxY - v13265.minY + "px",
            width: v13265.maxX - v13265.minX + "px",
            left: v13265.lastLeft / ptr + "pt",
            top: v13265.lastTop / ptr + "pt",
            transform: 'unset'
          });
        } else if (v13265.ex < v13265.bx && v13265.ey < v13265.by) {
          this.mouseRect.target.css({
            height: v13265.maxY - v13265.minY + "px",
            width: v13265.maxX - v13265.minX + "px",
            left: v13265.lastLeft / ptr + "pt",
            top: v13265.lastTop / ptr + "pt",
            transform: 'rotate(180deg)',
            'transform-origin': '0 0'
          });
          // 左下角
        } else if (v13265.ex < v13265.bx && v13265.ey > v13265.by) {
          this.mouseRect.target.css({
            height: v13265.maxY - v13265.minY + "px",
            width: v13265.maxX - v13265.minX + "px",
            left: v13265.lastLeft / ptr + "pt",
            top: v13265.lastTop / ptr + "pt",
            transform: 'rotateY(180deg)',
            'transform-origin': '0 0'
          });
        } else if (v13265.ex > v13265.bx && v13265.ey < v13265.by) {
          this.mouseRect.target.css({
            height: v13265.maxY - v13265.minY + "px",
            width: v13265.maxX - v13265.minX + "px",
            left: v13265.lastLeft / ptr + "pt",
            top: v13265.lastTop / ptr + "pt",
            transform: 'rotateX(180deg)',
            'transform-origin': '0 0'
          });
        }
        v13265.target.focus();
      }, v13094.prototype.bingKeyboardMoveEvent = function (v13283) {
        var v13284 = this;
        v13283.attr("tabindex", "1"), v13283.keydown(function (v13285) {
          v13284.mouseRect.mouseRectSelectedElement || (v13284.mouseRect.mouseRectSelectedElement = v13284.getElementInRect(v13284.mouseRect));
          var v13286 = v13284.mouseRect.mouseRectSelectedElement || [];

          switch (v13285.keyCode) {
            case 37:
              v13284.mouseRect.updatePositionByMultipleSelect(0 - v12410.a.instance.movingDistance, 0), v13286.forEach(function (v13288) {
                v13288.updatePositionByMultipleSelect(0 - v12410.a.instance.movingDistance, 0);
              }), v13285.preventDefault();
              break;

            case 38:
              v13284.mouseRect.updatePositionByMultipleSelect(0, 0 - v12410.a.instance.movingDistance), v13286.forEach(function (v13291) {
                v13291.updatePositionByMultipleSelect(0, 0 - v12410.a.instance.movingDistance);
              }), v13285.preventDefault();
              break;

            case 39:
              v13284.mouseRect.updatePositionByMultipleSelect(v12410.a.instance.movingDistance, 0), v13286.forEach(function (v13294) {
                v13294.updatePositionByMultipleSelect(v12410.a.instance.movingDistance, 0);
              }), v13285.preventDefault();
              break;

            case 40:
              v13284.mouseRect.updatePositionByMultipleSelect(0, v12410.a.instance.movingDistance), v13286.forEach(function (v13297) {
                v13297.updatePositionByMultipleSelect(0, v12410.a.instance.movingDistance);
              }), v13285.preventDefault();
          }
          if ([37, 38, 39, 40].includes(v13285.keyCode)) {
            v12388.a.event.trigger("hiprintTemplateDataChanged_" + v13284.templateId, "框选移动");
          }
        });
      }, v13094;
    }(),
    st = function () {
      return function (v13300) {
        if (v13300) if (v13300.panels) {
          this.panels = [];

          for (var v13301 = 0; v13301 < v13300.panels.length; v13301++) {
            this.panels.push(new rt(v13300.panels[v13301]));
          }
        } else this.panels = [];
      };
    }(),
    lt = v12385(9),
    ut = function () {
      function v13310(v13302, v13303) {
        var v13304 = this;
        this.printElementOptionSettingPanel = {}, this.printTemplate = v13302, this.settingContainer = $(v13303), v12388.a.event.on(v13302.getPrintElementSelectEventKey(), function (v13306) {
          v13304.buildSetting(v13306);
        }), v12388.a.event.on(v13302.getBuildCustomOptionSettingEventKey(), function (v13308) {
          v13304.buildSettingByCustomOptions(v13308);
        }), v12388.a.event.on('clearSettingContainer', function () {
          v13304.clearSettingContainer();
        });
      }

      return v13310.prototype.init = function () {
      }, v13310.prototype.clearSettingContainer = function () {
        this.clearLastPrintElement(), this.settingContainer.html("");
      }, v13310.prototype.clearLastPrintElement = function () {
        if (this.lastPrintElement) {
          if (this.lastPrintElement._editing) {
            this.lastPrintElement.updateByContent(true);
          }
          if (this.lastPrintElement._printElementOptionTabs) {
            this.lastPrintElement._printElementOptionTabs.forEach(function (v13311) {
              v13311.list && v13311.list.forEach(function (v13312) {
                v13312.destroy();
              });
            });
          }
          if (this.lastPrintElement._printElementOptionItems) {
            this.lastPrintElement._printElementOptionItems.forEach(function (v13313) {
              v13313.destroy();
            });
          }
        }
        this.lastPrintElement = void 0;
      }, v13310.prototype.buildSetting = function (v13314) {
        var v13315 = this,
          v13316 = this,
          v13317 = v13314.printElement,
          v13318 = v13314.customOptionsInput;
        var tabs = v13317.getPrintElementOptionTabs();
        v13315.clearSettingContainer();
        var v13319;
        if (tabs.length) {
          v13319 = $('<div class="prop-tabs"><ul class="prop-tab-items"></ul></div>');
          tabs.forEach(function (tab) {
            var item = $('<li class="prop-tab-item"><span class="tab-title">' + i18n.__(tab.name) + '</span></li>');
            v13319.find('.prop-tab-items').append(item);
            var options = $('<div class="hiprint-option-items" data-title="' + i18n.__(tab.name) + '"></div>');
            tab.list.forEach(function (v13320) {
              v13320.submit = function (v13321) {
                v13317.submitOption();
              };
              var v13322 = v13320.createTarget(v13317, v13317.options, v13317.printElementType);
              v13315.printElementOptionSettingPanel[v13320.name] = v13322, options.append(v13322);
              // 貌似只有这两个才需要多个参数
              if (['columns', 'dataType'].includes(v13320.name)) {
                v13320.setValue(v13317.options[v13320.name], v13317.options, v13317.printElementType);
              } else {
                // 传入所有参数
                if (['coordinate', 'widthHeight'].includes(v13320.name)) {
                  v13320.setValue(v13317.options, v13317);
                } else {
                  // options 没有就取 printElementType内的 (如 table 的 footerFormatter)
                  v13320.setValue(v13317.options[v13320.name] || v13317.printElementType[v13320.name]);
                }
              }
              v13322.find("textarea").bind("dblclick.textarea", function (event) {
                if (!$(this).val()) {
                  var placeholder = event.target.placeholder || "";
                  $(this).val(placeholder);
                };
              });
            });
            if (tab.list.length == 0 && v13318 && v13318.length) {
              v13318.forEach(function (v13323) {
                var n2 = v13323.callback;
                v13323.callback = function (v13324) {
                  n2 && n2(v13324);
                };
                var tableColumn = v13323.optionItems;
                v13323.title && options.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + v13323.title + "\n            </div>\n        </div>");
                tableColumn.forEach(function (v13325) {
                  v13325.submit = function (v13326) {
                    v13323.callback(v13316.getValueByOptionItems(tableColumn));
                  }, options.append(v13325.createTarget(v13316.printTemplate, v13323.options, void 0)),
                  v13325.setValue(v13323.options[v13325.name], v13323.options, void 0);
                });
                options.find('.auto-submit').change(function () {
                  v13323.callback(v13316.getValueByOptionItems(tableColumn));
                });
                options.find('.auto-submit:input').bind('keydown.submitOption', function (v13327) {
                  13 === v13327.keyCode && v13323.callback(v13316.getValueByOptionItems(tableColumn));
                });
                options.find("textarea").bind("dblclick.textarea", function (event) {
                  if (!$(this).val()) {
                    var placeholder = event.target.placeholder || "";
                    $(this).val(placeholder);
                  };
                });
              });
            }
            v13319.append(options);
          });
        } else {
          v13319 = $('<div class="hiprint-option-items"></div>');
          v13317.getPrintElementOptionItems().forEach(function (v13328) {
            v13328.submit = function (v13329) {
              v13317.submitOption();
            };

            var v13330 = v13328.createTarget(v13317, v13317.options, v13317.printElementType);
            v13315.printElementOptionSettingPanel[v13328.name] = v13330, v13319.append(v13330);
            // 貌似只有这两个才需要多个参数
            if (['columns', 'dataType'].includes(v13328.name)) {
              v13328.setValue(v13317.options[v13328.name], v13317.options, v13317.printElementType);
            } else {
              // 传入所有参数
              if (['coordinate', 'widthHeight'].includes(v13328.name)) {
                v13328.setValue(v13317.options, v13317);
              } else {
                // options 没有就取 printElementType内的 (如 table 的 footerFormatter)
                v13328.setValue(v13317.options[v13328.name] || v13317.printElementType[v13328.name]);
              }
            }
          });
        }
        var v13331 = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">${i18n.__('确定')}</button>`),
          v13332 = $(`<button  class="hiprint-option-item-settingBtn hiprint-option-item-deleteBtn"\n        type="button">${i18n.__('删除')}</button>`);
        v13319.append(v13331);
        v13317.options.draggable != false && v13319.append(v13332); // draggable 为 false 时不显示参数面板 删除 按钮
        if (tabs.length) {
          v13319.on('click', '.prop-tab-item', function () {
            var $li = $(this);
            var index = $li.index();
            // 上次点击tab的index
            v13315.settingContainer.data('last-index', index);
            $li.addClass('active');
            $li.siblings().removeClass('active');
            var options = v13319.find('.hiprint-option-items:eq(' + index + ')');
            options.addClass('active');
            options.siblings().removeClass('active');
          });
          var lastIndex = +(v13315.settingContainer.data('last-index') || 0);
          if (lastIndex >= tabs.length) {
            lastIndex = 0;
          }
          v13319.find('.prop-tab-item:eq(' + lastIndex + ')').click();
        }
        v13331.bind("click.submitOption", function () {
          v13317.submitOption();
        }), v13332.bind("click.deleteBtn", function () {
          hinnn.event.trigger("hiprintTemplateDataChanged_" + v13317.templateId, "删除");
          v13316.printTemplate.deletePrintElement(v13317);
          v13315.clearSettingContainer();
        }), v13319.find(".auto-submit").change(function (v13333) {
          v13317.submitOption();
        }), v13319.find(".auto-submit:input").bind("keydown.submitOption", function (v13334) {
          13 == v13334.keyCode && v13317.submitOption();
        }), this.settingContainer.append(v13319), tabs.length < 1 && v13318 && v13318.forEach(function (v13335) {
          var v13336 = v13335.callback;
          v13335.callback = function (v13337) {
            v13336 && (v13336(v13337), v13317.submitOption());
          }, v13315.buildSettingByCustomOptions(v13335, v13315.settingContainer);
        }), this.lastPrintElement = v13317;
      }, v13310.prototype.buildSettingByCustomOptions = function (v13338, v13339) {
        var v13340 = this;
        this.clearLastPrintElement();
        var v13341 = v13339 || this.settingContainer;
        v13339 || this.settingContainer.html("");
        var v13342 = [],supportOptions = v12410.a.instance.panel.supportOptions.filter(function (v13344) {
            return !v13344.hidden;
          }).map(function (v13345) {
            return v13345.name;
          });
        v13338.optionItems ? v13342 = v13338.optionItems : Object.keys(v13338.options).filter(function (v13346) {
          return supportOptions.includes(v13346);
        }).forEach(function (v13347) {
          var v13348 = lt.a.getItem(v13347);
          v13348 && v13342.push(v13348);
        });
        var v13350 = $('<div class="hiprint-option-items"></div>');
        v13338.title && v13350.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + v13338.title + "\n            </div>\n        </div>"), v13342.forEach(function (v13351) {
          v13351.submit = function (v13352) {
            v13338.callback(v13340.getValueByOptionItems(v13342));
          }, v13350.append(v13351.createTarget(v13340.printTemplate, v13338.options, void 0)), v13351.setValue(v13338.options[v13351.name], v13338.options, void 0);
        });
        var v13343 = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">${i18n.__('确定')}</button>`);
        v13350.append(v13343), v13343.bind("click.submitOption", function () {
          v13338.callback(v13340.getValueByOptionItems(v13342));
        }), v13350.find(".auto-submit").change(function (v13353) {
          v13338.callback(v13340.getValueByOptionItems(v13342));
        }), v13350.find(".auto-submit:input").bind("keydown.submitOption", function (v13354) {
          13 == v13354.keyCode && v13338.callback(v13340.getValueByOptionItems(v13342));
        }), v13341.append(v13350);
      }, v13310.prototype.getValueByOptionItems = function (v13355) {
        var v13356 = {};
        return v13355.forEach(function (v13357) {
          v13356[v13357.name] = v13357.getValue();
        }), v13356;
      }, v13310;
    }(),
    dt = function () {
      function v13360(v13358, v13359) {
        this.paginationContainer = v13358, this.jqPaginationContainer = $(this.paginationContainer), this.template = v13359;
      }

      return v13360.prototype.buildPagination = function (v13361) {
        var v13362 = this.template.getPaneltotal(),
          v13363 = this;
        this.jqPaginationContainer.html("");

        for (var v13364 = $('<ul class="hiprint-pagination"></ul>'), v13365 = function v13366() {
            var v13367 = v13368,
              name = v13363.template.printPanels[v13367].name || v13367 + 1,
              v13369 = $("<li><span>" + name + '</span><a href="javascript:void(0);">x</a></li>');
            v13369.find("span").click(function () {
              v13363.template.selectPanel(v13367), v13369.siblings().removeClass("selected"), $(this).parent("li").addClass("selected");
            }), v13369.find("a").click(function () {
              v13363.template.deletePanel(v13367), v13363.buildPagination();
            }), v13364.append(v13369);
          }, v13368 = 0; v13368 < v13362; v13368++) {
          v13365();
        }

        var v13370 = $("<li><span>+</span></li>");
        v13364.append(v13370), this.jqPaginationContainer.append(v13364), v13370.click(function () {
          var createPanel = function (v13371) {
            v13363.template.addPrintPanel(v13371 || void 0, !0), v13363.buildPagination();
            $('.hiprint-pagination li').removeClass('selected');
            $('.hiprint-pagination li:nth-last-child(2)').addClass('selected');
          };
          if (v13363.template.onPanelAddClick) {
            var panel = {
              index: v13363.template.printPanels.length,
              paperType: "A4"
            };
            v13363.template.onPanelAddClick(panel, createPanel);
          } else {
            createPanel();
          }
        });
      }, v13360.prototype.selectPanel = function (idx) {
        var v13372 = idx || this.template.editingPanel.index;
        var li = $('.hiprint-pagination li:nth(' + v13372 + ')');
        if (li.length) {
          li.siblings().removeClass('selected');
          li.addClass("selected");
        }
        hinnn.event.trigger("onSelectPanel", this.template.editingPanel, v13372, li);
      }, v13360;
    }(),
    ct = function () {
      function v13381(v13373) {
        var v13374 = this;
        this.tempimageBase64 = {}, this.id = v12411.a.instance.guid(), v12411.a.instance.setPrintTemplateById(this.id, this);
        var v13377 = v13373 || {};
        this.printPanels = [];
        this.dataMode = v13377.dataMode || 1;
        this.history = v13377.history != void 0 ? v13377.history : !0;
        this.willOutOfBounds = v13377.willOutOfBounds != void 0 ? v13377.willOutOfBounds : !0;
        this.onDataChanged = v13377.onDataChanged;
        this.onUpdateError = v13377.onUpdateError;
        this.lastJson = v13377.template || {};
        this.historyList = [{ id: v12411.a.instance.guid(), type: '初始', json: this.lastJson }];
        this.historyPos = 0;
        this.defaultPanelName = v13377.defaultPanelName;
        this.designOptions = {};
        this.qtDesigner = v13377.qtDesigner != void 0 ? v13377.qtDesigner : !0;
        this.qtDesignerMap = {};
        this.qtDesignderFunction = function (field) {
          this.qtDesignerMap = {};
          const fieldTitle = field.split("_")[0];
          for (const item of this.editingPanel.printElements) {
            if (item.options.field === void 0) {
              continue;
            }
            const renderKey = item.options.field.split("_")[0];
            if (this.qtDesignerMap[renderKey] === void 0) {
              this.qtDesignerMap[renderKey] = 1;
            } else {
              this.qtDesignerMap[renderKey] += 1;
            }
          }
          if (this.qtDesignerMap[fieldTitle] === 0 || this.qtDesignerMap[fieldTitle] === void 0) {
            return fieldTitle;
          } else {
            return fieldTitle + "_" + this.qtDesignerMap[fieldTitle];
          }
        };
        var v13379 = new st(v13377.template || []);
        v13377.template && v13379.panels.forEach(function (v13380) {
          v13374.printPanels.push(new pt(v13380, v13374.id));
        }), v13377.fontList && (this.fontList = v13377.fontList), v13377.fields && (this.fields = v13377.fields), v13377.onImageChooseClick && (this.onImageChooseClick = v13377.onImageChooseClick),
        v13377.onPanelAddClick && (this.onPanelAddClick = v13377.onPanelAddClick),
        v13377.settingContainer && new ut(this, v13377.settingContainer), v13377.paginationContainer && (this.printPaginationCreator = new dt(v13377.paginationContainer, this), this.printPaginationCreator.buildPagination()), this.initAutoSave();
      }

      return v13381.prototype.design = function (v13382, v13383) {
        var v13384 = this;

        if (v13383 || (v13383 = {}), 0 == this.printPanels.length) {
          var v13385 = this.createDefaultPanel();
          this.printPanels.push(v13385);
        }

        if (!v13382) throw new Error("options.container can not be empty");
        v13384.designOptions = v13383;
        this.createContainer(v13382), this.printPanels.forEach(function (v13386, v13387) {
          v13384.container.append(v13386.getTarget()), v13387 > 0 && v13386.disable(), v13386.design(v13383);
        }), this.selectPanel(0);
      }, v13381.prototype.getSimpleHtml = function (v13388, v13389) {
        var v13390 = this;
        v13389 || (v13389 = {});
        var v13391 = $('<div class="hiprint-printTemplate"></div>');
        v13388 && v13388.constructor === Array ? v13388.forEach(function (data, dataIndex) {
          data && v13390.printPanels.forEach(function (v13392, v13393) {
            v13391.append(v13392.getHtml(data, v13389));
            // 批量打印 续排页码
            if (dataIndex == v13388.length - 1) {
              delete hinnn._paperList;
            }
          });
        }) : this.printPanels.forEach(function (panel, panelIndex) {
          v13391.append(panel.getHtml(v13388, v13389));
          // 多面板打印 续排页码
          if (panelIndex == v13390.printPanels.length - 1) {
            delete hinnn._paperList;
          }
        });
        return v13389 && v13389.imgToBase64 && this.transformImg(v13391.find("img")), v13391;
      }, v13381.prototype.getHtml = function (v13394, v13395) {
        return v13394 || (v13394 = {}), this.getSimpleHtml(v13394, v13395);
      }, v13381.prototype.getJointHtml = function (v13396, v13397, v13398) {
        var v13399 = $('<div class="hiprint-printTemplate"></div>'),
          v13400 = [];
        return this.printPanels.forEach(function (v13401, v13402) {
          v13399.append(v13401.getHtml(v13396, v13397, v13400, void 0, v13398));
        }), v13399;
      }, v13381.prototype.setPaper = function (v13403, v13404) {
        if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(v13403)) this.editingPanel.resize(void 0, parseFloat(v13403), parseFloat(v13404), !1);else {
          var v13405 = v12411.a.instance[v13403];
          if (!v13405) throw new Error("not found pagetype:" + (v13403 || ""));
          this.editingPanel.resize(v13403, v13405.width, v13405.height, !1);
        }
      }, v13381.prototype.rotatePaper = function () {
        this.editingPanel.rotatePaper();
      }, v13381.prototype.zoom = function (v13407, v13408) {
        this.editingPanel.zoom(v13407, v13408);
      }, v13381.prototype.addPrintPanel = function (v13409, v13410) {
        var v13411 = v13409 ? new pt(new rt(v13409), this.id) : this.createDefaultPanel();
        return v13409 && (v13409.index = this.printPanels.length), v13410 && (this.container.append(v13411.getTarget()), v13411.design(this.designOptions)), this.printPanels.push(v13411), v13410 && this.selectPanel(v13411.index), v13411;
      }, v13381.prototype.selectPanel = function (v13412) {
        var v13413 = this;
        if (v13412 > v13413.printPanels.length - 1) v13412 = v13413.printPanels.length - 1;
        this.printPanels.forEach(function (v13414, v13415) {
          v13412 == v13415 ? (v13414.enable(), v13413.editingPanel = v13414, v13413.printPaginationCreator && v13413.printPaginationCreator.selectPanel(v13412)) : v13414.disable();
        });
      }, v13381.prototype.deletePanel = function (v13416) {
        this.printPanels[v13416].clear(), this.printPanels[v13416].getTarget().remove(), this.printPanels.splice(v13416, 1);
      }, v13381.prototype.getPaneltotal = function () {
        return this.printPanels.length;
      }, v13381.prototype.createDefaultPanel = function () {
        return new pt(new rt({
          index: this.printPanels.length,
          name: this.defaultPanelName,
          paperType: "A4"
        }), this.id);
      }, v13381.prototype.createContainer = function (v13417) {
        v13417 ? (this.container = $(v13417), this.container.addClass("hiprint-printTemplate")) : this.container = $('<div class="hiprint-printTemplate"></div>');
      }, v13381.prototype.getJsonTid = function () {
        var v13418 = [];
        return this.printPanels.forEach(function (v13419) {
          v13419.getPanelEntity().printElements.length && v13418.push(v13419.getPanelEntity());
        }), new st({
          panels: v13418
        });
      }, v13381.prototype.getJson = function () {
        var v13420 = [];
        return this.printPanels.forEach(function (v13421) {
          v13420.push(v13421.getPanelEntity(!0));
        }), new st({
          panels: v13420
        });
      }, v13381.prototype.undo = function (v13422) {
        v12388.a.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "undo");
      }, v13381.prototype.redo = function (v13424) {
        v12388.a.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "redo");
      }, v13381.prototype.getPrintElementSelectEventKey = function () {
        return "PrintElementSelectEventKey_" + this.id;
      }, v13381.prototype.getBuildCustomOptionSettingEventKey = function () {
        return "BuildCustomOptionSettingEventKey_" + this.id;
      }, v13381.prototype.clear = function () {
        this.printPanels.forEach(function (v13426) {
          if (v13426.clear(), v13426.index > 0) {
            var v13427 = v13426.getTarget();
            v13427 && v13427.length && v13427.remove();
          }
        }), this.printPanels = [this.printPanels[0]], this.printPaginationCreator && this.printPaginationCreator.buildPagination();
      }, v13381.prototype.getPaperType = function (v13428) {
        return null == v13428 && (v13428 = 0), this.printPanels[0].paperType;
      }, v13381.prototype.getOrient = function (v13429) {
        return null == v13429 && (v13429 = 0), this.printPanels[v13429].height > this.printPanels[v13429].width ? 1 : 2;
      }, v13381.prototype.getPrintStyle = function (v13430) {
        return this.printPanels[v13430].getPrintStyle();
      }, v13381.prototype.print = function (v13431, v13432, v13433) {
        v13431 || (v13431 = {}), this.getHtml(v13431, v13432).hiwprint(v13433);
      }, v13381.prototype.print2 = function (v13434, v13435) {
        if (v13434 || (v13434 = {}), v13435 || (v13435 = {}), this.clientIsOpened()) {
          var v13436 = this,
            v13437 = 0,
            v13438 = {},
            v13439 = $('link[media=print][href*="print-lock.css"]'),
            css = '';
          if (v13435.styleHandler) {
            css += v13435.styleHandler();
          }
          if (v13439.length <= 0) {
            throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
            return;
          }
          v13439.each(function (v13440, v13441) {
            var v13442 = new XMLHttpRequest();
            v13442.open("GET", $(v13441).attr("href")), v13442.onreadystatechange = function () {
              if (4 === v13442.readyState && 200 === v13442.status && (v13438[v13440 + ""] = '<style rel="stylesheet" type="text/css">' + v13442.responseText + "</style>", ++v13437 == v13439.length)) {
                for (var v13443 = "", v13444 = 0; v13444 < v13439.length; v13444++) {
                  v13443 += v13438[v13444 + ""];
                }
                if (css) v13443 = css + v13443;
                v13436.sentToClient(v13443, v13434, v13435);
              }
            }, v13442.send();
          });
        } else alert(`${i18n.__('连接客户端失败')}`);
      }, v13381.prototype.imageToBase64 = function (v13445) {
        var v13446 = $(v13445).attr("src");
        if (-1 == v13446.indexOf("base64")) try {
          if (!this.tempimageBase64[v13446]) {
            var v13447 = document.createElement("canvas"),
              v13448 = new Image();
            v13448.src = v13445.attr("src"), v13447.width = v13448.width, v13447.height = v13448.height, v13447.getContext("2d").drawImage(v13448, 0, 0), v13446 && (this.tempimageBase64[v13446] = v13447.toDataURL("image/png"));
          }

          v13445.attr("src", this.tempimageBase64[v13446]);
        } catch (v13449) {
          try {
            this.xhrLoadImage(v13445);
          } catch (v13450) {
            console.log(v13450);
          }
        }
      }, v13381.prototype.xhrLoadImage = function (v13451) {
      }, v13381.prototype.sentToClient = function (v13452, v13453, v13454) {
        v13453 || (v13453 = {});
        var v13455 = $.extend({}, v13454 || {});
        v13455.imgToBase64 = !0;
        var v13456 = v13452 + this.getHtml(v13453, v13455)[0].outerHTML;
        v13455.id = v12411.a.instance.guid(), v13455.html = v13456, v13455.templateId = this.id, hiwebSocket.send(v13455);
      }, v13381.prototype.printByHtml = function (v13458) {
        $(v13458).hiwprint();
      }, v13381.prototype.printByHtml2 = function (v13459, v13460) {
        if (v13460 || (v13460 = {}), this.clientIsOpened()) {
          var v13461 = this,
            v13462 = 0,
            v13463 = {},
            v13464 = $('link[media=print][href*="print-lock.css"]');
          if (v13464.length <= 0) {
            throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
            return;
          }
          v13464.each(function (v13465, v13466) {
            var v13467 = new XMLHttpRequest();
            v13467.open("GET", $(v13466).attr("href")), v13467.onreadystatechange = function () {
              if (4 === v13467.readyState && 200 === v13467.status && (v13463[v13465 + ""] = '<style rel="stylesheet" type="text/css">' + v13467.responseText + "</style>", ++v13462 == v13464.length)) {
                for (var v13468 = "", v13469 = 0; v13469 < v13464.length; v13469++) {
                  v13468 += v13463[v13469 + ""];
                }

                var v13470 = v13468 + $(v13459)[0].outerHTML,
                  v13471 = $.extend({}, v13460 || {});
                v13471.id = v12411.a.instance.guid(), v13471.html = v13470, v13471.templateId = v13461.id, hiwebSocket.send(v13471);
              }
            }, v13467.send();
          });
        } else alert(`${i18n.__('连接客户端失败')}`);
      }, v13381.prototype.deletePrintElement = function (v13473) {
        this.printPanels.forEach(function (v13474) {
          v13474.deletePrintElement(v13473);
        });
      }, v13381.prototype.transformImg = function (v13475) {
        var v13476 = this;
        v13475.map(function (v13477, v13478) {
          v13476.imageToBase64($(v13478));
        });
      }, v13381.prototype.toPdf = function (v13479, v13480, options) {
        var v13481 = this;
        var dtd = $.Deferred();
        var isDownload = true;
        if (this.printPanels.length) {
          var v13482 = v12388.a.mm.toPt(this.printPanels[0].width),
            v13483 = v12388.a.mm.toPt(this.printPanels[0].height),
            v13485 = $.extend({
              scale: 2,
              width: v12388.a.pt.toPx(v13482),
              x: 0,
              y: 0,
              useCORS: !0
            }, options || {}),
            v13489 = new jsPDF({
              orientation: 1 == this.getOrient(0) ? "portrait" : "landscape",
              unit: "pt",
              format: this.printPanels[0].paperType ? this.printPanels[0].paperType.toLocaleLowerCase() : [v13482, v13483]
            }),
            v13490 = this.getHtml(v13479, options);
          if (options && undefined != options.isDownload) {
            isDownload = options.isDownload;
          }
          this.createTempContainer();
          var v13491 = this.getTempContainer();
          this.svg2canvas(v13490), v13491.html(v13490[0]);
          var v13492 = v13491.find(".hiprint-printPanel .hiprint-printPaper").length;
          $(v13490).css("position:fixed"), html2canvas(v13490[0], v13485).then(function (v13493) {
            var v13494 = v13493.getContext("2d");
            v13494.mozImageSmoothingEnabled = !1, v13494.webkitImageSmoothingEnabled = !1, v13494.msImageSmoothingEnabled = !1, v13494.imageSmoothingEnabled = !1;

            for (var v13495 = v13493.toDataURL("image/jpeg"), v13496 = 0; v13496 < v13492; v13496++) {
              v13489.addImage(v13495, "JPEG", 0, 0 - v13496 * v13483, v13482, v13492 * v13483), v13496 < v13492 - 1 && v13489.addPage();
            }
            if (isDownload) {
              v13481.removeTempContainer(), v13480.indexOf(".pdf") > -1 ? v13489.save(v13480) : v13489.save(v13480 + ".pdf");
            } else {
              v13481.removeTempContainer();
              let type = options.type || 'blob';
              var pdfFile = v13489.output(type);
              dtd.resolve(pdfFile);
            }
          });
        }
        return dtd.promise();
      }, v13381.prototype.createTempContainer = function () {
        this.removeTempContainer(), $("body").prepend($('<div class="hiprint_temp_Container" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'));
      }, v13381.prototype.removeTempContainer = function () {
        $(".hiprint_temp_Container").remove();
      }, v13381.prototype.getTempContainer = function () {
        return $(".hiprint_temp_Container");
      }, v13381.prototype.svg2canvas = function (v13497) {
        var that = this;
        v13497.find("svg").each(function (v13498, v13499) {
          var v13500 = v13499.parentNode,v13501 = that.parentWidthHeight(v13500),
            v13502 = document.createElement("canvas");
          v13502.width = v13501.width, v13502.height = v13501.height;
          var ctx = v13502.getContext('2d'),
            str = new XMLSerializer().serializeToString(v13499);
          Canvg.fromString(ctx, str).render(), $(v13499).before(v13502), v13500.removeChild(v13499);
        });
      }, v13381.prototype.parentWidthHeight = function (v13503) {
        if (v13503.style.width.endsWith('%') || v13503.style.height.endsWith('%')) {
          if (v13503.className != 'hiprint-printPaper-content') {
            return this.parentWidthHeight(v13503.parentNode);
          }
          return { width: 10, height: 10 };
        } else {
          return { width: v12388.a.pt.toPx(parseFloat(v13503.style.width)), height: v12388.a.pt.toPx(parseFloat(v13503.style.height)) };
        }
      }, v13381.prototype.on = function (v13506, v13507) {
        v12388.a.event.clear(v13506 + "_" + this.id);
        v12388.a.event.on(v13506 + "_" + this.id, v13507);
      }, v13381.prototype.clientIsOpened = function () {
        return hiwebSocket.opened;
      }, v13381.prototype.getPrinterList = function () {
        var v13510 = hiwebSocket.getPrinterList();
        return v13510 || [];
      }, v13381.prototype.getElementByTid = function (v13511, v13512) {
        return null == v13512 && (v13512 = 0), this.printPanels[v13512].getElementByTid(v13511);
      }, v13381.prototype.getElementByName = function (v13513, v13514) {
        return null == v13514 && (v13514 = 0), this.printPanels[v13514].getElementByName(v13513);
      }, v13381.prototype.getPanel = function (v13515) {
        return null == v13515 && (v13515 = 0), this.printPanels[v13515];
      }, v13381.prototype.loadAllImages = function (v13516, v13517, v13518) {
        var v13519 = this;
        null == v13518 && (v13518 = 0);

        for (var v13520 = v13516[0].getElementsByTagName("img"), v13521 = !0, v13522 = 0; v13522 < v13520.length; v13522++) {
          var v13523 = v13520[v13522];
          v13523.src && v13523.src !== window.location.href && -1 == v13523.src.indexOf("base64") && (v13523 && void 0 !== v13523.naturalWidth && 0 !== v13523.naturalWidth && v13523.complete || (v13521 = !1));
        }

        v13518++, !v13521 && v13518 < 10 ? setTimeout(function () {
          v13519.loadAllImages(v13516, v13517, v13518);
        }, 500) : v13517();
      }, v13381.prototype.setFontList = function (v13524) {
        this.fontList = v13524;
      }, v13381.prototype.getFontList = function () {
        return this.fontList;
      }, v13381.prototype.setFields = function (v13525) {
        this.fields = v13525;
      }, v13381.prototype.getFields = function () {
        return this.fields;
      }, v13381.prototype.setOnImageChooseClick = function (v13526) {
        this.onImageChooseClick = v13526;
      }, v13381.prototype.getOnImageChooseClick = function () {
        return this.onImageChooseClick;
      }, v13381.prototype.getFieldsInPanel = function () {
        var v13527 = [];
        return this.printPanels.forEach(function (v13528) {
          v13527 = v13527.concat(v13528.getFieldsInPanel());
        }), v13527;
      }, v13381.prototype.getTestData = function () {
        var v13529 = {};
        return this.printPanels.forEach(function (v13530) {
          v13529 = Object.assign(v13529, v13530.getTestData());
        }), v13529;
      }, v13381.prototype.update = function (v13531, idx) {
        var v13532 = this;
        try {
          if (v13531 && "object" == _typeof(v13531) && v13531.panels.length > 0) {
            var curLen = v13532.printPanels.length - 1;
            v13531.panels.forEach(function (panel, index) {
              if (index > curLen) {
                v13532.printPanels.push(new pt(panel, v13532.id));
                var v13533 = v13532.printPanels[index];
                v13532.container.append(v13533.getTarget()), index > 0 && v13533.disable(), v13533.design(v13532.designOptions);
                v13532.printPaginationCreator && v13532.printPaginationCreator.buildPagination();
              }
              var temp = new rt(panel);
              v13532.editingPanel = v13532.printPanels[index];
              v13532.editingPanel.update(temp);
            });
            v13532.selectPanel(idx || 0);
          }
        } catch (er) {
          console.log(er);
          v13532.onUpdateError && v13532.onUpdateError(er);
        }
      }, v13381.prototype.getSelectEls = function () {
        var v13534 = this;
        var elements = [];
        // 获取选区元素
        if (v13534.editingPanel.mouseRect && v13534.editingPanel.mouseRect.target && $(".mouseRect").length) {
          elements = v13534.editingPanel.getElementInRect(v13534.editingPanel.mouseRect);
        } else {// 获取多选元素
          elements = v13534.editingPanel.printElements.filter(function (el) {
            return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
          });
        }
        return elements;
      },
      v13381.prototype.selectElementsByField = function (fieldsArray) {
        var hiPrintEntity = this;
        var v13535 = $;
        hiPrintEntity.editingPanel.printElements.forEach((v13536, index) => {
          if (fieldsArray && fieldsArray.includes(v13536.options.field)) {
            let designTarget = v13536.designTarget;
            designTarget.children("div[panelindex]").addClass("selected");
            designTarget.children().last().css({
              display: "block"
            });
            designTarget = designTarget[0];
            v13535.data(designTarget, "hidraggable").options.onBeforeSelectAllDrag.call(designTarget, {});
          }
        });
      },
      v13381.prototype.selectAllElements = function () {
        var hiPrintEntity = this;
        var v13537 = $;
        hiPrintEntity.editingPanel.printElements.forEach((v13538, index) => {
          let designTarget = v13538.designTarget;
          designTarget.children("div[panelindex]").addClass("selected");
          designTarget.children().last().css({
            display: "block"
          });
          designTarget = designTarget[0];
          v13537.data(designTarget, "hidraggable").options.
          onBeforeSelectAllDrag.
          call(designTarget, {});
        });
      },
      v13381.prototype.updateOption = function (option, v13539) {// 批量更新参数
        var elements = this.getSelectEls();
        if (elements && elements.length) {
          elements.forEach(function (v13540) {
            v13540.updateOption(option, v13539, true);
          });
          v12388.a.event.trigger("hiprintTemplateDataChanged_" + this.id, "批量修改");
        }
      }, v13381.prototype.setElsAlign = function (v13542) {// 设置框选、多选元素对齐api
        var v13543 = this;
        var elements = this.getSelectEls();
        if (elements.length) {
          var minLeft = Math.min.apply(null, elements.map(function (el) {return el.options.left;}));
          var maxRight = Math.max.apply(null, elements.map(function (el) {return el.options.left + el.options.width;}));
          var minTop = Math.min.apply(null, elements.map(function (el) {return el.options.top;}));
          var maxBottom = Math.max.apply(null, elements.map(function (el) {return el.options.top + el.options.height;}));
          switch (v13542) {
            case "left": // 左对齐
              elements.forEach(function (el) {
                el.updateSizeAndPositionOptions(minLeft);
                el.designTarget.css("left", el.options.displayLeft());
              });
              break;
            case "vertical": // 居中
              var vertical = minLeft + (maxRight - minLeft) / 2;
              elements.forEach(function (el) {
                el.updateSizeAndPositionOptions(vertical - el.options.width / 2);
                el.designTarget.css("left", el.options.displayLeft());
              });
              break;
            case "right": // 右对齐
              elements.forEach(function (el) {
                el.updateSizeAndPositionOptions(maxRight - el.options.width);
                el.designTarget.css("left", el.options.displayLeft());
              });
              break;
            case "top": // 顶部对齐
              elements.forEach(function (el) {
                el.updateSizeAndPositionOptions(undefined, minTop);
                el.designTarget.css("top", el.options.displayTop());
              });
              break;
            case "horizontal": // 垂直居中
              var horizontal = minTop + (maxBottom - minTop) / 2;
              elements.forEach(function (el) {
                el.updateSizeAndPositionOptions(undefined, horizontal - el.options.height / 2);
                el.designTarget.css("top", el.options.displayTop());
              });
              break;
            case "bottom": //底部对齐
              elements.forEach(function (el) {
                el.updateSizeAndPositionOptions(undefined, maxBottom - el.options.height);
                el.designTarget.css("top", el.options.displayTop());
              });
              break;
            case "distributeHor": // 横向分散
              var sumWidth = [].reduce.call(elements, function (total, el) {
                return total + el.options.width;
              }, 0);
              var distributeHor = (maxRight - minLeft - sumWidth) / (elements.length - 1);
              elements.sort(function (prev, curr) {
                return prev.options.left - curr.options.left;
              });
              elements.forEach(function (el, index) {
                if (![0, elements.length - 1].includes(index)) {
                  el.updateSizeAndPositionOptions(elements[index - 1].options.left + elements[index - 1].options.width + distributeHor);
                  el.designTarget.css("left", el.options.displayLeft());
                }
              });
              break;
            case "distributeVer": // 纵向分散
              var sumHeight = [].reduce.call(elements, function (total, el) {
                return total + el.options.height;
              }, 0);
              var distributeVer = (maxBottom - minTop - sumHeight) / (elements.length - 1);
              elements.sort(function (prev, curr) {
                return prev.options.top - curr.options.top;
              });
              elements.forEach(function (el, index) {
                if (![0, elements.length - 1].includes(index)) {
                  el.updateSizeAndPositionOptions(undefined, elements[index - 1].options.top + elements[index - 1].options.height + distributeVer);
                  el.designTarget.css("top", el.options.displayTop());
                }
              });
              break;
          }
        }
      }, v13381.prototype.setElsSpace = function (dis, isHor) {
        var v13544 = this;
        var elements = this.getSelectEls();
        if (elements.length) {
          if (isHor) {// 水平距离 →
            elements.sort(function (prev, curr) {
              return prev.options.left - curr.options.left;
            });
            elements.forEach(function (el, index) {
              if (index > 0) {
                el.updateSizeAndPositionOptions(elements[index - 1].options.left + elements[index - 1].options.width + dis);
                el.designTarget.css("left", el.options.displayLeft());
              }
            });
          } else {// 垂直距离 ↓
            elements.sort(function (prev, curr) {
              return prev.options.top - curr.options.top;
            });
            elements.forEach(function (el, index) {
              if (index > 0) {
                el.updateSizeAndPositionOptions(undefined, elements[index - 1].options.top + elements[index - 1].options.height + dis);
                el.designTarget.css("top", el.options.displayTop());
              }
            });
          }
        }
      }, v13381.prototype.initAutoSave = function () {
        var v13545 = this;
        v12388.a.event.on("hiprintTemplateDataShortcutKey_" + this.id, function (key) {
          if (!v13545.history) return;
          switch (key) {
            case "undo":
              if (v13545.historyPos > 0) {
                v13545.historyPos -= 1;
                var cur = v13545.historyList[v13545.historyPos];
                v13545.update(cur.json);
              }
              break;
            case "redo":
              if (v13545.historyPos < v13545.historyList.length - 1) {
                v13545.historyPos += 1;
                var cur = v13545.historyList[v13545.historyPos];
                v13545.update(cur.json);
              }
              break;
          }
        });
        v12388.a.event.on("hiprintTemplateDataChanged_" + this.id, function (type) {
          if (v13545.history) {
            var v13548 = 1 == v13545.dataMode ? v13545.getJson() : v13545.getJsonTid();
            v13545.lastJson = v13548;
            if (v13545.historyPos < v13545.historyList.length - 1) {
              v13545.historyList = v13545.historyList.slice(0, v13545.historyPos + 1);
            }
            v13545.historyList.push({ id: v12411.a.instance.guid(), type: type, json: v13548 });
            if (v13545.historyList.length > 50) {
              v13545.historyList = v13545.historyList.slice(0, 1).concat(v13545.historyList.slice(1, 50));
            } else {
              v13545.historyPos += 1;
            }
            v13545.onDataChanged && v13545.onDataChanged(type, v13548);
          }
        });
      }, v13381;
    }();

  function ht(v13550) {
    this.getHtml(v13550).hiwprint();
  }

  function ft(v13551, v13552, v13553) {
    $.extend({}, v13551 || {}).imgToBase64 = !0;
    var v13554 = new ct({});
    v13554.on("printSuccess", v13552), v13554.on("printError", v13553), v13554.printByHtml2(this.getHtml(v13551), v13551.options);
  }

  function gt(v13555) {
    var v13556 = void 0;
    return v13555 && v13555.templates.forEach(function (v13557, v13558) {
      var v13559 = $.extend({}, v13557.options || {});
      v13555.imgToBase64 && (v13559.imgToBase64 = !0), v13556 ? v13556.append(v13557.template.getHtml(v13557.data, v13559).html()) : v13556 = v13557.template.getHtml(v13557.data, v13559);
    }), v13556;
  }

  function mt(v13560) {
    v12410.a.instance.init(v13560), v12410.a.instance.providers && v12410.a.instance.providers.forEach(function (v13564) {
      v13564.addElementTypes(v12393.instance);
    });
    if (window.autoConnect && (v12410.a.instance.host != hiwebSocket.host || v12410.a.instance.token != hiwebSocket.token)) {
      hiwebSocket.stop();
      v12410.a.instance.host && (hiwebSocket.host = v12410.a.instance.host);
      v12410.a.instance.token && (hiwebSocket.token = v12410.a.instance.token);
      hiwebSocket.start();
    }
    if (v12410.a.instance.lang && Object.keys(languages).includes(v12410.a.instance.lang)) {
      i18n.lang = v12410.a.instance.lang;
    } else {
      i18n.lang = 'cn';
    }
  }

  function cig(v13574) {
    if (v13574) {
      v13574 && Object.keys(v13574).forEach(function (v13575) {
        if (v13575 == "optionItems" && v13574.optionItems && v13574.optionItems.length) {
          v12410.a.instance.registerItems(v13574.optionItems);
        } else
        if (v13574[v13575].tabs && v13574[v13575].tabs.length) {
          v13574[v13575].tabs.forEach(function (tab, idx) {
            if (tab.replace) {
              $.extend(v12410.a.instance[v13575].tabs[idx], tab);
            } else {
              var options = tab.options,list = v12410.a.instance[v13575].tabs[idx].options;
              options.forEach(function (v13579) {
                var idx = list.findIndex(function (v13580) {
                  return v13580.name == v13579.name;
                });
                if (idx > -1) list[idx].hidden = v13579.hidden;else
                {
                  if (v13579.after) {
                    idx = list.findIndex(function (v13581) {
                      return v13581.name == v13579.after;
                    });
                    if (idx > -1) list.splice(idx + 1, 0, v13579);
                  } else list.push(v13579);
                }
              });
              $.extend(v12410.a.instance[v13575].tabs[idx], {
                name: tab.name,
                options: list
              });
            }
          });
          delete v13574[v13575].tabs;
        } else
        if (v13574[v13575].supportOptions) {
          var options = v13574[v13575].supportOptions,list = v12410.a.instance[v13575].supportOptions;
          options.forEach(function (v13584) {
            var idx = list.findIndex(function (v13585) {
              return v13585.name == v13584.name;
            });
            if (idx > -1) list[idx].hidden = v13584.hidden;else
            {
              if (v13584.after) {
                idx = list.findIndex(function (v13586) {
                  return v13586.name == v13584.after;
                });
                if (idx > -1) list.splice(idx + 1, 0, v13584);
              } else list.push(v13584);
            }
          });
          $.extend(v12410.a.instance[v13575].supportOptions, list);
          delete v13574[v13575].supportOptions;
        } else {
          var keyMap = {};
          keyMap[v13575] = v13574[v13575];
          $.extend(v12410.a.instance, keyMap);
        }
      });
    } else {
      $.extend(v12410.a.instance, HIPRINT_CONFIG);
    }
  }

  function uep(v13590, v13591) {
    return v12393.instance.updateElementType(v13590, v13591);
  }

  function rpl(v13592) {
    v12410.a.instance.clear("printerList");
    v12410.a.instance.on("printerList", v13592);
    hiwebSocket.refreshPrinterList();
  }

  function getClients(v13595) {
    v12410.a.instance.clear("clients");
    v12410.a.instance.on("clients", v13595);
    hiwebSocket.getClients();
  }

  function getClientInfo(v13598) {
    v12410.a.instance.clear("clientInfo");
    v12410.a.instance.on("getClientInfo", v13598);
    hiwebSocket.getClientInfo();
  }

  function getAddr(type, v13601, ...args) {
    v12410.a.instance.clear("address_" + type);
    v12410.a.instance.on("address_" + type, v13601);
    hiwebSocket.getAddress(type, ...args);
  }

  function ippPrint(options, callback, connected) {
    v12410.a.instance.clear("ippPrinterCallback");
    v12410.a.instance.on("ippPrinterCallback", callback);
    v12410.a.instance.clear("ippPrinterConnected");
    v12410.a.instance.on("ippPrinterConnected", connected);
    hiwebSocket.ippPrint(options);
  }

  function ippRequest(options, callback) {
    v12410.a.instance.clear("ippRequestCallback");
    v12410.a.instance.on("ippRequestCallback", callback);
    hiwebSocket.ippRequest(options);
  }

  v12385.d(v12384, "init", function () {
    return mt;
  }), v12385.d(v12384, "setConfig", function () {
    return cig;
  }), v12385.d(v12384, "updateElementType", function () {
    return uep;
  }), v12385.d(v12384, "hiwebSocket", function () {
    return hiwebSocket;
  }), v12385.d(v12384, "refreshPrinterList", function () {
    return rpl;
  }), v12385.d(v12384, "getClients", function () {
    return getClients;
  }), v12385.d(v12384, "getClientInfo", function () {
    return getClientInfo;
  }), v12385.d(v12384, "getAddress", function () {
    return getAddr;
  }), v12385.d(v12384, "ippPrint", function () {
    return ippPrint;
  }), v12385.d(v12384, "ippRequest", function () {
    return ippRequest;
  }), v12385.d(v12384, "PrintElementTypeManager", function () {
    return it;
  }), v12385.d(v12384, "PrintElementTypeGroup", function () {
    return ot;
  }), v12385.d(v12384, "PrintTemplate", function () {
    return ct;
  }), v12385.d(v12384, "print", function () {
    return ht;
  }), v12385.d(v12384, "print2", function () {
    return ft;
  }), v12385.d(v12384, "getHtml", function () {
    return gt;
  }), $(document).ready(function () {
    console.log('document ready');
    console.log(window.autoConnect);
    if (hiwebSocket.hasIo() && window.autoConnect) {
      hiwebSocket.start();
    }
  });
}]);

var defaultElementTypeProvider = defaultTypeProvider(hiprint);

export {
  hiprint,
  defaultElementTypeProvider };