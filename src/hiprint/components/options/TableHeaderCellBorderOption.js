import {i18n,$} from "../../hiprint.comm.js";
class TableHeaderCellBorderOption {
    constructor() {
      this.name = "tableHeaderCellBorder";
      this.type = "thead";
      this.label = i18n.__('表头单元格边框');
    }

    // 设置表头单元格边框样式
    css(element, borderType) {
      if (element.find(this.type + " tr").length) {
        switch (borderType) {
          case "border":
          case undefined:
            element.find(this.type + " tr").addClass("hiprint-printElement-tableTarget-border-td-all");
            break;
          case "noBorder":
            element.find(this.type + " tr").addClass("hiprint-printElement-tableTarget-border-td-none");
            break;
          default:
            element.find(this.type + " tr").removeClass();
        }
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

  export default TableHeaderCellBorderOption;