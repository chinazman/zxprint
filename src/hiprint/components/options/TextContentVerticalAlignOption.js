import {i18n,$} from "../../hiprint.comm.js";

// 文本内容垂直对齐选项类
class TextContentVerticalAlignOption {
  constructor() {
    this.name = "textContentVerticalAlign";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('上下对齐')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="middle" >${i18n.__('垂直居中')}</option>
        <option value="bottom" >${i18n.__('底部')}</option>
       
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 设置CSS样式
  css(element, value) {
    if (element && element.length) {
      element.removeClass("hiprint-text-content-middle");
      element.removeClass("hiprint-text-content-bottom");
      if (value) {
        if (value === "middle") element.addClass("hiprint-text-content-middle");
        if (value === "bottom") element.addClass("hiprint-text-content-bottom");
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

export default TextContentVerticalAlignOption;