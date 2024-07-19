"use strict";

/**
 * 打印引用对象
 */


/**
 * PrintReferenceElement 类
 * 表示打印参考元素，用于定位和布局
 */
class PrintReferenceElement {
  /**
   * 创建一个新的 PrintReferenceElement 实例
   * @param {Object} options - 参考元素的属性
   * @param {number} options.top - 顶部位置
   * @param {number} options.left - 左侧位置
   * @param {number} options.height - 高度
   * @param {number} options.width - 宽度
   * @param {number} options.bottomInLastPaper - 在上一页纸中的底部位置
   * @param {number} options.beginPrintPaperIndex - 开始打印的纸张索引
   * @param {number} options.printTopInPaper - 在纸张中的顶部打印位置
   * @param {number} options.endPrintPaperIndex - 结束打印的纸张索引
   */
  constructor(options) {
      this.top = options.top;
      this.left = options.left;
      this.height = options.height;
      this.width = options.width;
      this.bottomInLastPaper = options.bottomInLastPaper;
      this.beginPrintPaperIndex = options.beginPrintPaperIndex;
      this.printTopInPaper = options.printTopInPaper;
      this.endPrintPaperIndex = options.endPrintPaperIndex;
  }

  /**
   * 判断给定的垂直位置是否在元素的左侧或右侧
   * @param {number} verticalPosition - 要检查的垂直位置
   * @returns {boolean} 如果位置在元素的左侧或右侧，则返回 true
   */
  isPositionLeftOrRight(verticalPosition) {
      return this.top <= verticalPosition && this.top + this.height > verticalPosition;
  }
}

export default PrintReferenceElement;