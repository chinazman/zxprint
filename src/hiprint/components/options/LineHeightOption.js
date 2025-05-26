import {i18n,$} from "../../hiprint.comm.js";
// 行高选项类
class LineHeightOption {
    constructor() {
      this.name = "lineHeight";
    }
  
    // 设置或清除CSS样式
    css(element, value) {
      if (element && element.length) {
        if (value) {
          element.css("line-height", value + "pt");
          return `line-height:${value}pt`;
        }
        element[0].style.lineHeight = "";
      }
      return null;
    }
  
    // 创建选项目标元素
    createTarget() {
      this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__('字体行高')}
          </div>
          <div class="hiprint-option-item-field">
            <input class="auto-submit"/>
          </div>
        </div>
      `);
      return this.target;
    }
  
    // 生成选项

  
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

  export default LineHeightOption;