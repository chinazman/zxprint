import {i18n,$} from "../../hiprint.comm.js";

// 显示码值选项
class ShowCodeTitleOption {
  constructor() {
    this.name = 'showCodeTitle';
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item" title="条形码底部是否显示内容">
        <div class="hiprint-option-item-label">
          ${i18n.__('显示码值')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="true" >${i18n.__('显示')}</option>
            <option value="false" >${i18n.__('隐藏')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    if ('true' == this.target.find('select').val()) return true;
  }

  setValue(value) {
    this.target.find('select').val((value == null ? '' : value).toString());
  }

  destroy() {
    this.target.remove();
  }
}

export default ShowCodeTitleOption;