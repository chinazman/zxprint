import {i18n,$} from "../../hiprint.comm.js";

// 格式化函数选项
class FormatterOption {
  constructor() {
    this.name = "formatter";
  }

  createTarget() {
    const html = `<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('格式化函数')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(title,value,options,templateData,target){}" class="auto-submit"></textarea>
        </div>
    </div>`;
    this.target = $(html);
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

export default FormatterOption;