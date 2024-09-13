
/**
 * 工具类
 */
import { $ } from "../hiprint.comm.js";
// 数字转中文,大写,金额
import Nzh from "nzh/dist/nzh.min.js";

let eventMap;
const hinnn = {};

// 事件处理系统
hinnn.event = (eventMap = {}, {
  // 绑定事件
  on: (eventName, handler) => {
    eventMap[eventName] = eventMap[eventName] || [];
    eventMap[eventName].push(handler);
  },
  id: 0,
  // 解绑事件
  off: (eventName, handler) => {
    const handlers = eventMap[eventName];
    if (handlers) {
      const index = handlers.findIndex(h => h === handler);
      if (index >= 0) eventMap[eventName].splice(index, 1);
    }
  },
  // 触发事件
  trigger: function(eventName, ...args) {
    const handlers = eventMap[eventName];
    if (handlers && handlers.length) {
      handlers.forEach(handler => handler.apply(this, args));
    }
  },
  // 清除事件
  clear: (eventName) => {
    eventMap[eventName] = [];
  },
  // 获取新ID
  getId: function() {
    return ++this.id;
  },
  // 获取带ID的名称
  getNameWithId: function(name) {
    return `${name}-${this.getId()}`;
  }
});

// 表单序列化
hinnn.form = {
  serialize: (form) => {
    const array = $(form).serializeArray();
    const object = {};
    $.each(array, function() {
      if (object[this.name]) {
        if (Array.isArray(object[this.name])) {
          object[this.name].push(this.value);
        } else {
          object[this.name] = [object[this.name], this.value];
        }
      } else {
        object[this.name] = this.value;
      }
    });
    return object;
  }
};

// 点到像素的转换
hinnn.pt = {
  toPx: (pt) => {
    return pt * (hinnn.pt.getDpi() / 72);
  },
  toMm: (pt) => {
    return hinnn.px.toMm(hinnn.pt.toPx(pt));
  },
  dpi: 0,
  getDpi: function() {
    if (!this.dpi) {
      const div = document.createElement("DIV");
      div.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
      document.body.appendChild(div);
      this.dpi = div.offsetHeight;
    }
    return this.dpi;
  }
};

// 像素到点和毫米的转换
hinnn.px = {
  toPt: (px) => {
    return px * (72 / hinnn.px.getDpi());
  },
  toMm: (px) => {
    return Math.round((px / hinnn.px.getDpi()) * 25.4 * 100) / 100;
  },
  dpi: 0,
  getDpi: function() {
    if (!this.dpi) {
      const div = document.createElement("DIV");
      div.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
      document.body.appendChild(div);
      this.dpi = div.offsetHeight;
    }
    return this.dpi;
  }
};

// 毫米到点和像素的转换
hinnn.mm = {
  toPt: (mm) => {
    return (72 / 25.4) * mm;
  },
  toPx: (mm) => {
    return hinnn.pt.toPx(hinnn.mm.toPt(mm));
  }
};

// 节流函数
hinnn.throttle = (func, wait, options) => {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  options = options || {};

  const later = () => {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function() {
    const now = _.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// 防抖函数
hinnn.debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  const later = () => {
    const last = _.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = _.now();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

// 转换为UTF-8编码
hinnn.toUtf8 = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 1 && code <= 127) {
      result += str.charAt(i);
    } else if (code > 2047) {
      result += String.fromCharCode(224 | ((code >> 12) & 15));
      result += String.fromCharCode(128 | ((code >> 6) & 63));
      result += String.fromCharCode(128 | ((code >> 0) & 63));
    } else {
      result += String.fromCharCode(192 | ((code >> 6) & 31));
      result += String.fromCharCode(128 | ((code >> 0) & 63));
    }
  }
  return result;
};

// 数组分组
hinnn.groupBy = (array, props, grouper) => {
  const groups = {};
  array.forEach(item => {
    const key = JSON.stringify(grouper(item));
    if (!groups[key]) {
      groups[key] = { rows: [] };
      props.forEach(prop => {
        groups[key][prop] = item[prop];
      });
    }
    groups[key].rows.push(item);
  });
  return Object.values(groups);
};

// 数组排序
hinnn.orderBy = function(array, iteratee) {
  if (array.length <= 1) return array;
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (const item of array) {
    if (iteratee(item) < iteratee(pivot)) {
      left.push(item);
    } else {
      right.push(item);
    }
  }
  return this.orderBy(left, iteratee).concat([pivot], this.orderBy(right, iteratee));
};

// 日期格式化
hinnn.dateFormat = (date, format) => {
  format = format || "yyyy-MM-dd";

  if (date) {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      const map = {
        "y+": dateObj.getFullYear(),
        "M+": dateObj.getMonth() + 1,
        "d+": dateObj.getDate(),
        "H+": dateObj.getHours(),
        "m+": dateObj.getMinutes(),
        "s+": dateObj.getSeconds(),
        "q+": Math.floor((dateObj.getMonth() + 3) / 3),
        "S": dateObj.getMilliseconds()
      };

      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (const key in map) {
        if (new RegExp(`(${key})`).test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? map[key] : ("00" + map[key]).substr(("" + map[key]).length));
        }
      }

      return format;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  return "";
};

// 数字格式化
hinnn.numFormat = (num, digits) => {
  if (num !== undefined) {
    try {
      const number = typeof num === "string" ? parseFloat(num) : num;
      const precision = parseInt(digits);
      if (precision > 0) {
        return number.toFixed(precision);
      }
      return parseInt(number.toString());
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  return "";
};

// 数字转大写
hinnn.toUpperCase = (type, value) => {
  if (!Nzh) return value;
  let result = value;
  switch (type) {
    case "0":
      result = Nzh.cn.encodeS(value);
      break;
    case "1":
      result = Nzh.cn.encodeS(value, { tenMin: false });
      break;
    case "2":
      result = Nzh.cn.encodeB(value, { tenMin: true });
      break;
    case "3":
      result = Nzh.cn.encodeB(value);
      break;
    case "4":
      result = Nzh.cn.toMoney(value, { tenMin: true });
      break;
    case "5":
      result = Nzh.cn.toMoney(value);
      break;
    case "6":
      result = Nzh.cn.toMoney(value, { complete: true });
      break;
    case "7":
      result = Nzh.cn.toMoney(value, { complete: true, outSymbol: false });
      break;
    case "8":
      result = Nzh.cn.toMoney(value, {outSymbol: false});
      break;
    case "9":
      result = Nzh.cn.toMoney(value, { tenMin: true , outSymbol: false});
      break;
  }
  return result;
};
//将普通文本转换为html文本
hinnn.textToHtml = (text, enc) => {
  if (!text){
    return;
  }
  text = text.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
  if (enc) {
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  return text;

}
window.hinnn = hinnn;
export default hinnn;