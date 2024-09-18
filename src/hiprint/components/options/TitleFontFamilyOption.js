import FontFamilyOption from "./FontFamilyOption.js";
/**
 * 标题字体选项类
 * @extends FontFamilyOption
 */
class TitleFontFamilyOption extends FontFamilyOption {
  constructor() {
    super();
    this.name = "titleFontFamily";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>span:first"), value);
    }
  }
}

export default TitleFontFamilyOption;