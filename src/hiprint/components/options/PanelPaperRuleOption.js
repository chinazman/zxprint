import {i18n,$} from "../../hiprint.comm.js";

// 面板纸张规则选项类
class PanelPaperRuleOption {
  constructor() {
    this.name = "panelPaperRule";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('打印规则')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="odd" >${i18n.__('保持奇数')}</option>
            <option value="even" >${i18n.__('保持偶数')}</option>
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

export default PanelPaperRuleOption;