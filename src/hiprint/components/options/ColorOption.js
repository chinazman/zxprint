import {i18n,$} from "../../hiprint.comm.js";

// 颜色选择器类
class ColorOption {
  constructor() {
    this.name = "color";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("color", value);
        return "color:" + value;
      }
      element[0].style.color = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('字体颜色')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit"/>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return inputValue.toString();
  }

  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap"
    });
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default ColorOption;