import {i18n,$} from "../../hiprint.comm.js";

// 表格汇总列合并选项
class TableSummaryColspanOption {
  constructor() {
    this.name = "tableSummaryColspan";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('底部聚合合并列数')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="number" min="0" step="1" placeholder="${i18n.__('合并列数')}" class="auto-submit" >
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return inputValue.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TableSummaryColspanOption;