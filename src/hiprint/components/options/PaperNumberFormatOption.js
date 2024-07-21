import {i18n,$} from "../../hiprint.comm.js";

// 页码格式选项类
class PaperNumberFormatOption {
  constructor() {
    this.name = "paperNumberFormat";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('页码格式')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="\${paperNo}-\${paperCount}" class="auto-submit">
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default PaperNumberFormatOption;