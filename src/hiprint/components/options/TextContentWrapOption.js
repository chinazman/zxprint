import {i18n,$} from "../../hiprint.comm.js";

// 文本换行选项类
class TextContentWrapOption {
  constructor() {
    this.name = "textContentWrap";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('文本换行')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="nowrap" >${i18n.__('不换行')}</option>
        <option value="clip" >${i18n.__('不换行&隐藏')}</option>
        <option value="ellipsis" >${i18n.__('不换行&省略')}</option>
        <option value="shrink" >${i18n.__('不换行&缩小')}</option>
       </select>
        </div>
    </div>`);
    return this.target;
  }

  // 设置CSS样式
  css(element, value) {
    if (element && element.length && !element.is("table") && !element.hasClass("hiprint-printElement-table")) {
      element.removeClass("hiprint-text-content-wrap");
      element.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-nowrap");
      element.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-clip");
      element.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-ellipsis");
      element.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-shrink");
      if (value) {
        element.addClass("hiprint-text-content-wrap");
        element.find(".hiprint-printElement-text-content").addClass("hiprint-text-content-wrap-" + value);
        return "";
      }
    }

    return null;
  }

  // 获取值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // 设置值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default TextContentWrapOption;