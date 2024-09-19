import FontSizeOption from "./FontSizeOption.js";
/**
 * 标题字体大小选项类
 * @extends FontSizeOption
 */
class TitleFontSizeOption extends FontSizeOption {
  constructor() {
    super();
    this.name = "titleFontSize";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>b:first"), value);
    }
  }
}

export default TitleFontSizeOption;