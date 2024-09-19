import ColorOption from "./ColorOption.js";
/**
 * 标题颜色选项类
 * @extends ColorOption
 */
class TitleColorOption extends ColorOption {
  constructor() {
    super();
    this.name = "titleColor";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>b:first"), value);
    }
  }
}

export default TitleColorOption;