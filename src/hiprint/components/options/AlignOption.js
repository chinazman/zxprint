import {i18n,$} from "../../hiprint.comm.js";

// 单元格左右对齐类
class AlignOption {
  constructor() {
    this.name = "align";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('单元格左右对齐')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="left" >${i18n.__('居左')}</option>
        <option value="center" >${i18n.__('居中')}</option>
        <option value="right" >${i18n.__('居右')}</option>
        <option value="justify" >${i18n.__('两端对齐')}</option>
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

export default AlignOption;