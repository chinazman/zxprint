import {i18n,$} from "../../hiprint.comm.js";

// 表格脚显示类
class TableFooterRepeatOption {
  constructor() {
    this.name = "tableFooterRepeat";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表格脚显示')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="no" >${i18n.__('不显示')}</option>
        <option value="page" >${i18n.__('每页显示')}</option>
        <option value="last" >${i18n.__('最后显示')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const selectValue = this.target.find("select").val();
    if (selectValue) return selectValue.toString();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TableFooterRepeatOption;