import {i18n,$} from "../../hiprint.comm.js";
class TableBorderOption {
    constructor() {
      this.name = "tableBorder";
    }

    // 设置表格边框样式
    css(element, borderType) {
      if (element.find("table").length) {
        if (borderType === "border" || borderType === undefined) {
          element.find("table").css("border", "1px solid");
          return "border:1px solid";
        } else if (borderType === "noBorder") {
          element.find("table").css("border", "0px solid");
        } else {
          element.find("table")[0].style.border = "";
        }
      }

      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表格边框')}
        </div>
        <div class="hiprint-option-item-field">
            <select class="auto-submit">
            <option value="">${i18n.__('默认')}</option>
            <option value="border">${i18n.__('有边框')}</option>
            <option value="noBorder">${i18n.__('无边框')}</option>
            </select>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      const value = this.target.find("select").val();
      return value ? value.toString() : undefined;
    }

    // 设置选择的值
    setValue(value) {
      this.target.find("select").val(value);
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default TableBorderOption;