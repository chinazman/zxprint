import {i18n,$} from "../../hiprint.comm.js";

// 隐藏表达式
class HiddenExpressionOption {
  constructor() {
    this.name = "hiddenExpression";
  }

  createTarget() {
    const html = `<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('隐藏表达式')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="templateData.type>1 && value>0" class="auto-submit"></input>
        </div>
    </div>`;
    this.target = $(html);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("input").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

export default HiddenExpressionOption;