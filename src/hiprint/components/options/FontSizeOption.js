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
            <select class="auto-submit">
              <option value="">${i18n.__('默认')}</option>
              ${this.generateOptions()}
            </select>
          </div>
        </div>
      `);
      return this.target;
    }
  
    // 生成选项
    generateOptions() {
      const fontSizes = [
        6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22
      ];
      return fontSizes.map(size => `<option value="${size}">${size}pt</option>`).join('');
    }
  
    // 获取选中的值
    getValue() {
      const selectedValue = this.target.find("select").val();
      return selectedValue ? parseFloat(selectedValue) : undefined;
    }
  
    // 设置选中的值
    setValue(value) {
      if (value) {
        if (!this.target.find(`option[value="${value}"]`).length) {
          this.target.find("select").prepend(`<option value="${value}">${value}</option>`);
        }
        this.target.find("select").val(value);
      }
    }
  
    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }
  export default FontSizeOption;