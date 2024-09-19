import FontWeightOption from "./FontWeightOption.js";
/**
 * 表格头尾字体粗细选项类
 * @extends FontWeightOption
 */
class HFontWeightOption extends FontWeightOption {
  constructor() {
    super();
    this.name = "hFontWeight";
  }
  css(element, value) {
    
  }
}

export default HFontWeightOption;