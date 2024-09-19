import FontSizeOption from "./FontSizeOption.js";
/**
 * 标题字体大小选项类
 * @extends FontSizeOption
 */
class HFontSizeOption extends FontSizeOption {
  constructor() {
    super();
    this.name = "hFontSize";
  }
  css(element, value) {
    
  }
}

export default HFontSizeOption;