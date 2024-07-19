"use strict";

/**
 * 打印引用对象
 */


    var PrintReferenceElement = function () {
      function v10691(v10690) {
        this.top = v10690.top, this.left = v10690.left, this.height = v10690.height, this.width = v10690.width, this.bottomInLastPaper = v10690.bottomInLastPaper, this.beginPrintPaperIndex = v10690.beginPrintPaperIndex, this.printTopInPaper = v10690.printTopInPaper, this.endPrintPaperIndex = v10690.endPrintPaperIndex;
      }
  
      return v10691.prototype.isPositionLeftOrRight = function (v10692) {
        return this.top <= v10692 && this.top + this.height > v10692;
      }, v10691;
    }();
export default PrintReferenceElement;