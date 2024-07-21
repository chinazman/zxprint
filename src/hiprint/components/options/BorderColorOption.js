import {i18n,$} from "../../hiprint.comm.js";

// 边框颜色选项类
class BorderColorOption {
  constructor() {
    this.name = "borderColor";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("border-color", value);
        return "border-color:" + value;
      }
      element[0].style.borderColor = "";
    }
    return null;
  }

  createTarget(options) {
    const name = ['hline', 'vline', 'rect', 'oval'].includes(options.printElementType.type) ? `${i18n.__('颜色')}` : `${i18n.__('边框颜色')}`;
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${name}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit" />
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
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

export default BorderColorOption;