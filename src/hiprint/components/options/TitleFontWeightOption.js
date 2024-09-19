import FontWeightOption from "./FontWeightOption.js";
/**
 * 标题字体粗细选项类
 * @extends FontWeightOption
 */
class TitleFontWeightOption extends FontWeightOption {
  constructor() {
    super();
    this.name = "titleFontWeight";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>b:first"), value);
    }
  }
}

export default TitleFontWeightOption;