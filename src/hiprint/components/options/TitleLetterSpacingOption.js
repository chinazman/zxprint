import LetterSpacingOption from "./LetterSpacingOption.js";
/**
 * 标题字间距选项类
 * @extends LetterSpacingOption
 */
class TitleLetterSpacingOption extends LetterSpacingOption {
  constructor() {
    super();
    this.name = "titleLetterSpacing";
  }
  css(element, value) {
    if (element && element.length) {
      return super.css(element.find(".hiprint-printElement-text-content>b:first"), value);
    }
  }
}

export default TitleLetterSpacingOption;