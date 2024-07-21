import {i18n,$} from "../../hiprint.comm.js";

// 每页最大行数类
class MaxRowsOption {
  constructor() {
    this.name = "maxRows";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('每页最大行数')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="number" value="1" step="1" min="1" class="auto-submit"/>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return parseInt(inputValue.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default MaxRowsOption;