import {i18n,$} from "../../hiprint.comm.js";
  class TableHeaderFontWeightOption {
    constructor() {
      this.name = "tableHeaderFontWeight";
      this.type = "thead";
      this.label = i18n.__('表头字体粗细');
    }

    // 设置表头字体粗细
    css(element, fontWeight) {
      if (element.find(this.type).length) {
        if (fontWeight) {
          element.find(this.type + " tr td[hfontweight!='1']").css("font-weight", fontWeight);
          return `font-weight:${fontWeight}`;
        }
        element.find(this.type + " tr td[hfontweight!='1']").map(function(index, cell) {
          cell.style.fontWeight = "";
        });
      }
      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${this.label}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="">${i18n.__('默认')}</option>
        <option value="lighter">${i18n.__('更细')}</option>
        <option value="bold">${i18n.__('粗体')}</option>
        <option value="bolder">${i18n.__('粗体+')}</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
        <option value="600">600</option>
        <option value="700">700</option>
        <option value="800">800</option>
        <option value="900">900</option>
        </select>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      const value = this.target.find("select").val();
      return value ? value : undefined;
    }

    // 设置选择的值
    setValue(value) {
      if (value && !this.target.find(`option[value="${value}"]`).length) {
        this.target.find("select").prepend(`<option value="${value}">${value}</option>`);
      }
      this.target.find("select").val(value);
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default TableHeaderFontWeightOption;