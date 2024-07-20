import {i18n,$} from "../../hiprint.comm.js";
// 表尾边框类
class TableFooterBorderOption {
    constructor() {
      this.name = "tableFooterBorder";
    }
  
    css(targetElement, borderStyle) {
      if (targetElement.find("tfoot tr").length) {
        if (borderStyle === "border" || borderStyle === undefined) {
          return targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-all");
        }
        
        switch (borderStyle) {
          case "noBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-none");
            break;
          case "leftBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-left");
            break;
          case "rightBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-right");
            break;
          case "leftRightBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-lr");
            break;
          case "topBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-top");
            break;
          case "bottomBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-bottom");
            break;
          case "topBottomBorder":
            targetElement.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-tb");
            break;
          default:
            targetElement.find("tfoot tr").removeClass();
        }
      }
      return null;
    }
  
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
          ${i18n.__('表尾边框')}
          </div>
          <div class="hiprint-option-item-field">
          <select class="auto-submit">
          <option value="">${i18n.__('默认')}</option>    
          <option value="border">${i18n.__('有边框')}</option>
          <option value="noBorder">${i18n.__('无边框')}</option>
          <option value="leftBorder">${i18n.__('左边框')}</option>
          <option value="rightBorder">${i18n.__('右边框')}</option>
          <option value="leftRightBorder">${i18n.__('左右边框')}</option>
          <option value="topBorder">${i18n.__('上边框')}</option>
          <option value="bottomBorder">${i18n.__('下边框')}</option>
          <option value="topBottomBorder">${i18n.__('上下边框')}</option>
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

  export default TableFooterBorderOption;