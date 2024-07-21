import {i18n,$} from "../../hiprint.comm.js";

// 显示规则选项类
class ShowInPageOption {
  constructor() {
    this.name = "showInPage";
  }

  // 设置CSS样式
  css(element, value) {
    if (element && element.length) {
      if (value && 'none' == value) return element.addClass('alwaysHide');
      element.removeClass('alwaysHide');
    }
    return null;
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('显示规则')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="none" >${i18n.__('始终隐藏')}</option>
            <option value="first" >${i18n.__('首页')}</option>
            <option value="odd" >${i18n.__('奇数页')}</option>
            <option value="even" >${i18n.__('偶数页')}</option>
            <option value="last" >${i18n.__('尾页')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 获取选项值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // 设置选项值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁选项
  destroy() {
    this.target.remove();
  }
}

export default ShowInPageOption;