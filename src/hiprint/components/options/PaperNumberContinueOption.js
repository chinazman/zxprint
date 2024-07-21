import {i18n,$} from "../../hiprint.comm.js";

// 页码续排选项类
class PaperNumberContinueOption {
  constructor() {
    this.name = "paperNumberContinue";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('页码续排')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="true" >${i18n.__('续排')}</option>
        <option value="reset" >${i18n.__('重排')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    return "true" == this.target.find("select").val();
  }

  setValue(value) {
    this.target.find("select").val((value == undefined || value ? "true" : "reset").toString());
  }

  destroy() {
    this.target.remove();
  }
}

export default PaperNumberContinueOption;