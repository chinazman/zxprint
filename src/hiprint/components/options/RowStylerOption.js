import {i18n,$} from "../../hiprint.comm.js";

// 行样式函数类
class RowStylerOption {
  constructor() {
    this.name = "rowStyler";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('行样式函数')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(value,options){ return '' }" class="auto-submit"></textarea>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const textareaValue = this.target.find("textarea").val();
    if (textareaValue) return textareaValue;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

export default RowStylerOption;