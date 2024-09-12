import {i18n,$} from "../../hiprint.comm.js";

// 变换选项类
class TransformOption {
  constructor() {
    this.name = "transform";
  }

  css(element, value) {
    if (element && element.length) {
      const targetElement = element.find(".hiprint-printElement-content,.hiprint-printElement-image-content").parent(".hiprint-printElement");
      if (value && targetElement.length > 0) {
        targetElement.css("transform", "rotate(" + value + "deg)");
        targetElement.css("-ms-transform", "rotate(" + value + "deg)");
        targetElement.css("-moz-transform", "rotate(" + value + "deg)");
        targetElement.css("-webkit-transform", "rotate(" + value + "deg)");
        targetElement.css("-o-transform", "rotate(" + value + "deg)");
        return "transform:rotate(" + value + "deg)";
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('旋转角度')}
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

export default TransformOption;