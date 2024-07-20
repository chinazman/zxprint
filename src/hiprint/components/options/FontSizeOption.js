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
        6, 6.75, 7.5, 8.25, 9, 9.75, 10.5, 11.25, 12, 12.75, 13.5, 14.25,
        15, 15.75, 16.5, 17.25, 18, 18.75, 19.5, 20.25, 21, 21.75
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