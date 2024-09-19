import TextAlignOption from "./TextAlignOption.js";
/**
 * 标题文本对齐选项类
 * @extends TextAlignOption
 */
class TitleTextAlignOption extends TextAlignOption {
  constructor() {
    super();
    this.name = "titleTextAlign";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>b:first"), value);
    }
  }
}

export default TitleTextAlignOption;