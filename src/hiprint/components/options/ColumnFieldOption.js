import {i18n,$} from "../../hiprint.comm.js";

// 列字段类
class ColumnFieldOption {
  constructor() {
    this.name = "columnField";
  }

  createTarget() {
    const html = `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('字段名')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit"></input>
        </div>
    </div>`;
    this.target = $(html);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("input").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

export default ColumnFieldOption;