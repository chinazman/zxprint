import {i18n,$} from "../../hiprint.comm.js";
// 表尾单元格边框类
class TableFooterCellBorderOption {
    constructor() {
      this.name = "tableFooterCellBorder";
    }
  
    css(targetElement, borderStyle) {
      if (targetElement.find("tfoot tr").length) {
        if (borderStyle === "border" || borderStyle === undefined) {
          return targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-td-all");
        }
        if (borderStyle === "noBorder") {
          targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-td-none");
        } else {
          targetElement.find("tfoot tr").removeClass();
        }
      }
      return null;
    }
  
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
          ${i18n.__('表尾单元格边框')}
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
  
    getValue() {
      const selectedValue = this.target.find("select").val();
      if (selectedValue) return selectedValue.toString();
    }
  
    setValue(value) {
      this.target.find("select").val(value);
    }
  
    destroy() {
      this.target.remove();
    }
  }

  export default TableFooterCellBorderOption;