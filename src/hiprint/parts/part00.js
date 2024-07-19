"use strict";

/**
 * import 相关资源
 */
import {$} from "../hiprint.comm.js";
// 数字转中文,大写,金额
import Nzh from "nzh/dist/nzh.min.js";


export default function (v10036, v10037, v10038) {/**/
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
};