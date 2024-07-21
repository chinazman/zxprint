import {i18n,$} from "../../hiprint.comm.js";

// 表体行边框选项类
class TableBodyRowBorderOption {
  constructor() {
    this.name = "tableBodyRowBorder";
  }

  // 设置CSS样式
  css(element, value) {
    if (element.find("tbody tr").length) {
      if ("border" == value || value == undefined) {
        return element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-all");
      }
      
      switch(value) {
        case "noBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-none");
          break;
        case "leftBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-left");
          break;
        case "rightBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-right");
          break;
        case "leftRightBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-lr");
          break;
        case "topBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-top");
          break;
        case "bottomBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-bottom");
          break;
        case "topBottomBorder":
          element.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-tb");
          break;
        default:
          element.find("tbody tr").removeClass();
      }
    }
    return null;
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表体行边框')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>    
        <option value="border" >${i18n.__('有边框')}</option>
        <option value="noBorder" >${i18n.__('无边框')}</option>
        <option value="leftBorder" >${i18n.__('左边框')}</option>
        <option value="rightBorder" >${i18n.__('右边框')}</option>
        <option value="leftRightBorder" >${i18n.__('左右边框')}</option>
        <option value="topBorder" >${i18n.__('上边框')}</option>
        <option value="bottomBorder" >${i18n.__('下边框')}</option>
        <option value="topBottomBorder" >${i18n.__('上下边框')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 获取选项值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // 设置选项值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁选项
  destroy() {
    this.target.remove();
  }
}

export default TableBodyRowBorderOption;