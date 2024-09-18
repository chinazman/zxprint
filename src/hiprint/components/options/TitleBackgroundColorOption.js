import BackgroundColorOption from "./BackgroundColorOption.js";
/**
 * 标题背景颜色选项类
 * @extends BackgroundColorOption
 */
class TitleBackgroundColorOption extends BackgroundColorOption {
  constructor() {
    super();
    this.name = "titleBackgroundColor";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>span:first"), value);
    }
  }
}

export default TitleBackgroundColorOption;