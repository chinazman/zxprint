import {i18n,$} from "../../hiprint.comm.js";

// 表格列高度选项
class TableColumnHeightOption {
  constructor() {
    this.name = "tableColumnHeight";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item ">
        <div class="hiprint-option-item-label">
        ${i18n.__('单元格高度')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('条形码、二维码以及图片有效')}" class="auto-submit" >
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

export default TableColumnHeightOption;