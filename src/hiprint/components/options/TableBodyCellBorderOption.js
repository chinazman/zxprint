import {i18n,$} from "../../hiprint.comm.js";
  class TableBodyCellBorderOption {
    constructor() {
      this.name = "tableBodyCellBorder";
    }

    // 设置表体单元格边框样式
    css(element, borderType) {
      if (element.find("tbody tr").length) {
        if (borderType === "border" || borderType === undefined) {
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-td-all");
        } else if (borderType === "noBorder") {
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-td-none");
        } else {
          element.find("tbody tr").removeClass();
        }
      }
      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表体单元格边框')}
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

  export default TableBodyCellBorderOption;