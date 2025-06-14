import {i18n,$} from "../../hiprint.comm.js";

// 表脚文本换行选项类
class FooterCellWrapOption {
  constructor() {
    this.name = "footerCellWrap";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表尾文本换行')}
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

export default FooterCellWrapOption;