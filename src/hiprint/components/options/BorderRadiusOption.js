import {i18n,$} from "../../hiprint.comm.js";

// 边框圆角选项类
class BorderRadiusOption {
  constructor() {
    this.name = "borderRadius";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) return element.css('border-raduis', value);
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('边框圆角')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit"/>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return inputValue;
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default BorderRadiusOption;