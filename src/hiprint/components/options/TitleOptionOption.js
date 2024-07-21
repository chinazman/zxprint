import {i18n,$} from "../../hiprint.comm.js";

// 标题选择器类
class TitleOptionOption {
  constructor() {
    this.name = "title";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('标题')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:50px;" placeholder="${i18n.__('请输入标题')}" class="auto-submit"></textarea>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const textareaValue = this.target.find("textarea").val();
    if (textareaValue) return textareaValue;
  }

  setValue(value) {
    this.target.find("textarea").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TitleOptionOption;