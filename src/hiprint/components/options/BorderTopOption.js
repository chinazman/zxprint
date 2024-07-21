import {i18n,$} from "../../hiprint.comm.js";

// 上边框选项类
class BorderTopOption {
  constructor() {
    this.name = "borderTop";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("border-top-style", value);
        return "border-top:1px";
      }
      element[0].style.borderTopStyle = "";
      element[0].style.borderTopWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('上边框')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
            <option value="" >${i18n.__('否')}</option>
            <option value="solid" >${i18n.__('实线')}</option>
            <option value="dotted" >${i18n.__('虚线')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const selectValue = this.target.find("select").val();
    if (selectValue) return selectValue;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default BorderTopOption;