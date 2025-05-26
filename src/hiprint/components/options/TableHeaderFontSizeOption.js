import {i18n,$} from "../../hiprint.comm.js";
  class TableHeaderFontSizeOption {
    constructor() {
      this.name = "tableHeaderFontSize";
      this.type = "thead";
      this.label = i18n.__('表头字体大小');
    }

    // 设置表头字体大小
    css(element, fontSize) {
      if (element.find(this.type).length) {
        if (fontSize) {
          element.find(this.type).css("font-size", `${fontSize}pt`);
          return `font-size:${fontSize}pt`;
        }
        element.find(this.type).map(function(index, header) {
          header.style.fontSize = "";
        });
      }
      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${this.label}
        </div>
        <div class="hiprint-option-item-field">
        <input class="auto-submit"/>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      const value = this.target.find("input").val();
      return value ? parseFloat(value.toString()) : undefined;
    }

    // 设置选择的值
    setValue(value) {
      this.target.find("input").val(value);
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }
export default TableHeaderFontSizeOption;