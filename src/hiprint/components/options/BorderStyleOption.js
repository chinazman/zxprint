import {i18n,$} from "../../hiprint.comm.js";

// 边框样式选项类
class BorderStyleOption {
  constructor() {
    this.name = "borderStyle";
  }

  // 设置CSS样式
  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("border-style", value);
        return "border-style:1px";
      }
      element[0].style.borderStyle = "";
    }

    return null;
  }

  // 创建选项目标元素
  createTarget(options) {
    const name = ['hline', 'vline', 'rect', 'oval'].includes(options.printElementType.type) ? `${i18n.__('样式')}` : `${i18n.__('边框样式')}`;
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
       ${name}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
            <option value="" >${i18n.__('默认')}</option>
            <option value="solid" >${i18n.__('实线')}</option>
            <option value="dashed" >${i18n.__('长虚线')}</option>
            <option value="dotted" >${i18n.__('短虚线')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 获取值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
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

export default BorderStyleOption;