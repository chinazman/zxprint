import {i18n,$} from "../../hiprint.comm.js";

// 面板页面规则选项类
class PanelPageRuleOption {
  constructor() {
    this.name = "panelPageRule";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('分页规则')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="none" >${i18n.__('不分页')}</option>
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

export default PanelPageRuleOption;