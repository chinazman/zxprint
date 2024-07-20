import {i18n,$} from "../../hiprint.comm.js";
  class TableHeaderBackgroundOption {
    constructor() {
      this.name = "tableHeaderBackground";
    }

    // 设置表头背景颜色
    css(element, backgroundColor) {
      if (element.find("thead").length) {
        if (backgroundColor) {
          element.find("thead").css("background", backgroundColor);
          return `background:${backgroundColor}`;
        }
        element.find("thead").map(function(index, header) {
          header.style.background = "";
        });
      }
      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表头背景')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit" />
        </div>
      </div>`);
      return this.target;
    }

    // 获取输入的背景颜色
    getValue() {
      const value = this.target.find("input").val();
      return value ? value.toString() : undefined;
    }

    // 设置背景颜色
    setValue(value) {
      this.target.find("input").minicolors({
        defaultValue: value || "",
        theme: "bootstrap"
      });
      this.target.find("input").val(value);
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default TableHeaderBackgroundOption;