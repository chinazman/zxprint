import {i18n,$} from "../../hiprint.comm.js";

// 跨页合并清除类
class RowColumnsMergeCleanOption {
  constructor() {
    this.name = "rowsColumnsMergeClean";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('跨页合并是否清除')}
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

export default RowColumnsMergeCleanOption;