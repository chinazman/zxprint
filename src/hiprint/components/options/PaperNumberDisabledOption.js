import {i18n,$} from "../../hiprint.comm.js";

// 页码显示选项类
class PaperNumberDisabledOption {
  constructor() {
    this.name = "paperNumberDisabled";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('显示页码')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('显示')}</option>
        <option value="true" >${i18n.__('隐藏')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    if ("true" == this.target.find("select").val()) return true;
  }

  setValue(value) {
    this.target.find("select").val((value == null ? "" : value).toString());
  }

  destroy() {
    this.target.remove();
  }
}

export default PaperNumberDisabledOption;