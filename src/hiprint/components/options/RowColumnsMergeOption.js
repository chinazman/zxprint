import {i18n,$} from "../../hiprint.comm.js";

// 行列合并类
class RowColumnsMergeOption {
  constructor() {
    this.name = "rowsColumnsMerge";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('行/列合并函数')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(data, col, colIndex, rowIndex, tableData, printData){ return [1,1] }" class="auto-submit"></textarea>
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

export default RowColumnsMergeOption;