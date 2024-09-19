import ColorOption from "./ColorOption.js";
/**
 * 标题颜色选项类
 * @extends ColorOption
 */
class HColorOption extends ColorOption {
  constructor() {
    super();
    this.name = "hColor";
  }
  css(element, value) {
   
  }
}

export default HColorOption;