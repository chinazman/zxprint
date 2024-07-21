import {i18n,$} from "../../hiprint.comm.js";

// 单元格上下对齐类
class VAlignOption {
  constructor() {
    this.name = "vAlign";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('单元格上下对齐')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="top" >${i18n.__('上')}</option>
        <option value="middle" >${i18n.__('中')}</option>
        <option value="bottom" >${i18n.__('下')}</option>
        
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

export default VAlignOption;