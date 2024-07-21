import {i18n,$} from "../../hiprint.comm.js";

// 尾页页尾选项类
class LastPaperFooterOption {
  constructor() {
    this.name = "lastPaperFooter";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('尾页页尾')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('尾页页尾')}" class="auto-submit">
        </div>
    </div>`);
    return this.target;
  }

  // 获取选项值
  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return parseFloat(inputValue.toString());
  }

  // 设置选项值
  setValue(value) {
    this.target.find("input").val(value);
  }

  // 销毁选项
  destroy() {
    this.target.remove();
  }
}

export default LastPaperFooterOption;