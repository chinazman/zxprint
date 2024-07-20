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
      const lineHeights = [
        6, 6.75, 7.5, 8.25, 9, 9.75, 10.5, 11.25, 12, 12.75, 13.5, 14.25, 15, 15.75,
        16.5, 17.25, 18, 18.75, 19.5, 20.25, 21, 21.75, 22.5, 23.25, 24, 24.75,
        25.5, 26.25, 27, 27.75, 28.5, 29.25, 30, 30.75, 31.5, 32.25, 33, 33.75,
        34.5, 35.25, 36
      ];
      return lineHeights.map(height => `<option value="${height}">${height}pt</option>`).join('');
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

  export default LineHeightOption;