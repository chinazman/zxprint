/**
 * 页面结果
 */
class PaperHtmlResult {
  constructor({ printLine, target, referenceElement }) {
    this.printLine = printLine; // 打印行的函数
    this.target = target; // 目标元素
    this.referenceElement = referenceElement; // 参考元素
  }
}

export default PaperHtmlResult;
