import {i18n,$} from "../../hiprint.comm.js";

// 隐藏规则选项类
class UnShowInPageOption {
  constructor() {
    this.name = "unShowInPage";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('隐藏规则')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="first" >${i18n.__('首页')}</option>
            <option value="last" >${i18n.__('尾页')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 获取选项值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
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

export default UnShowInPageOption;