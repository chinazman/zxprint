import TextDecorationOption from "./TextDecorationOption.js";
/**
 * 标题文本装饰
 * @class TitleTextDecorationOption
 * @extends TextDecorationOption
 */
class TitleTextDecorationOption extends TextDecorationOption {
  constructor() {
    super();
    this.name = "titleTextDecoration";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>span:first"), value);
    }
  }
}

export default TitleTextDecorationOption;