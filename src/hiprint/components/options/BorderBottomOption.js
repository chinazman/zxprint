import {i18n,$} from "../../hiprint.comm.js";

// 下边框选项类
class BorderBottomOption {
  constructor() {
    this.name = "borderBottom";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("border-bottom-style", value);
        return "border-bottom-style:1px solid";
      }
      element[0].style.borderBottomStyle = "";
      element[0].style.borderBottomWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('下边框')}
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

export default BorderBottomOption;