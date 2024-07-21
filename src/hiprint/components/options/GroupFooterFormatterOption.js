import {i18n,$} from "../../hiprint.comm.js";

// 分组脚格式化函数类
class GroupFooterFormatterOption {
  constructor() {
    this.name = "groupFooterFormatter";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('分组脚格式化函数')}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__('分组脚信息')}(html)' }" class="auto-submit"></textarea>
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

export default GroupFooterFormatterOption;