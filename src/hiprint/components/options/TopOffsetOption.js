import {i18n,$} from "../../hiprint.comm.js";

// 顶部偏移选项
class TopOffsetOption {
  constructor() {
    this.name = "topOffset";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('顶部偏移')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit">
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return parseFloat(inputValue.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TopOffsetOption;