import {i18n,$} from "../../hiprint.comm.js";

// 网格列数选项
class GridColumnsOption {
  constructor() {
    this.name = "gridColumns";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('一行多组')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="2" >${i18n.__('一行二列')}</option>
        <option value="3" >${i18n.__('一行三列')}</option>
        <option value="4" >${i18n.__('一行四列')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const selectValue = this.target.find("select").val();
    if (selectValue) return parseFloat(selectValue.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default GridColumnsOption;