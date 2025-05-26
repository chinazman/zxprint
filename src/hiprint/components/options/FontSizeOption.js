import {i18n,$} from "../../hiprint.comm.js";
// 字体大小选项类
class FontSizeOption {
    constructor() {
      this.name = "fontSize";
    }
  
    // 设置或清除CSS样式
    css(element, value) {
      if (element && element.length) {
        if (value) {
          element.css("font-size", value + "pt");
          return `font-size:${value}pt`;
        }
        element[0].style.fontSize = "";
      }
      return null;
    }
  
    // 创建选项目标元素
    createTarget() {
      this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__('字体大小')}
          </div>
          <div class="hiprint-option-item-field">
            <input class="auto-submit"/>
          </div>
        </div>
      `);
      return this.target;
    }
  
  
    // 获取选中的值
    getValue() {
      const selectedValue = this.target.find("input").val();
      return selectedValue ? parseFloat(selectedValue) : undefined;
    }
  
    // 设置选中的值
    setValue(value) {
      this.target.find("input").val(value);
    }
  
    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }
  export default FontSizeOption;