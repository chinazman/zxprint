import {i18n,$} from "../../hiprint.comm.js";
class TableHeaderBorderOption {
    constructor() {
      this.name = "tableHeaderBorder";
    }

    // 设置表头边框样式
    css(element, borderType) {
      if (element.find("thead tr").length) {
        switch (borderType) {
          case "border":
          case undefined:
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-all");
            break;
          case "noBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-none");
            break;
          case "leftBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-left");
            break;
          case "rightBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-right");
            break;
          case "leftRightBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-lr");
            break;
          case "topBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-top");
            break;
          case "bottomBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-bottom");
            break;
          case "topBottomBorder":
            element.find("thead tr").addClass("hiprint-printElement-tableTarget-border-tb");
            break;
          default:
            element.find("thead tr").removeClass();
        }
      }

      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表头边框')}
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

  export default TableHeaderBorderOption;