import {i18n,$} from "../../hiprint.comm.js";

// 自动补全类
class AutoCompletionOption {
  constructor() {
    this.name = "autoCompletion";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('自动补全')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="true" >${i18n.__('是')}</option>
        <option value="false" >${i18n.__('否')}</option>
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

export default AutoCompletionOption;