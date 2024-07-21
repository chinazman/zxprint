import {i18n,$} from "../../hiprint.comm.js";

// 文本装饰选择器类
class TextDecorationOption {
  constructor() {
    this.name = "textDecoration";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('文本修饰')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="underline" >${i18n.__('下划线')}</option>
            <option value="overline" >${i18n.__('上划线')}</option>
            <option value="line-through" >${i18n.__('穿梭线')}</option>
           
        </select>
        </div>
    </div>`);
    return this.target;
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("text-decoration", value);
        return "text-decoration:" + value;
      }
      element[0].style.textDecoration = "";
    }
    return null;
  }

  getValue() {
    const selectValue = this.target.find("select").val();
    if (selectValue) return selectValue.toString();
  }

  setValue(value) {
    if (value && !this.target.find('option[value="' + value + '"]').length) {
      this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TextDecorationOption;