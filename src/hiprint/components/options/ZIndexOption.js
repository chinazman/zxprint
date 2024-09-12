import {i18n,$} from "../../hiprint.comm.js";

// z-index选项类
class ZIndexOption {
  constructor() {
    this.name = "zIndex";
  }

  css(element, value) {
    if (element && element.length) {
      if (value !== undefined) return element.css('z-index', value);
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('元素层级')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="number" class="auto-submit"/>
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

export default ZIndexOption;