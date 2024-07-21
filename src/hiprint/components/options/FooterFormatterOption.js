import {i18n,$} from "../../hiprint.comm.js";

// 表格脚函数类
class FooterFormatterOption {
  constructor() {
    this.name = "footerFormatter";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('表格脚函数')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return '<tr></tr>' }" class="auto-submit"></textarea>
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

export default FooterFormatterOption;