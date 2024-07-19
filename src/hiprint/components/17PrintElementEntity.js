"use strict";

/**
 * 打印元素对象
 */

var PrintElementEntity = (function () {
  return function (tid, options, printElementType) {
    this.tid = tid;
    this.options = options;
    this.printElementType = printElementType;
  };
})();
export default PrintElementEntity;
