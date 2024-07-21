import {i18n,$} from "../../hiprint.comm.js";

// 表格汇总文本选项
class TableSummaryTextOption {
  constructor() {
    this.name = "tableSummaryText";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('底部聚合文本')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('聚合类型')}:" class="auto-submit" >
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

export default TableSummaryTextOption;