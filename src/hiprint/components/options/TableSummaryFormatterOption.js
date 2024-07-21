import {i18n,$} from "../../hiprint.comm.js";

// 表格汇总格式化函数选项
class TableSummaryFormatterOption {
  constructor() {
    this.name = "tableSummaryFormatter";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('底部聚合格式化函数')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(column,fieldPageData,tableData,options){ return '<td></td>'; }" class="auto-submit"></textarea>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const textareaValue = this.target.find("textarea").val();
    if (textareaValue) return textareaValue;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

export default TableSummaryFormatterOption;