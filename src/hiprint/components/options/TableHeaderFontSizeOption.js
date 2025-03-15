import {i18n,$} from "../../hiprint.comm.js";
  class TableHeaderFontSizeOption {
    constructor() {
      this.name = "tableHeaderFontSize";
      this.type = "thead";
      this.label = i18n.__('表头字体大小');
    }

    // 设置表头字体大小
    css(element, fontSize) {
      if (element.find(this.type).length) {
        if (fontSize) {
          element.find(this.type).css("font-size", `${fontSize}pt`);
          return `font-size:${fontSize}pt`;
        }
        element.find(this.type).map(function(index, header) {
          header.style.fontSize = "";
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
        <option value="6">6pt</option>
        <option value="6.75">6.75pt</option>
        <option value="7.5">7.5pt</option>
        <option value="8.25">8.25pt</option>
        <option value="9">9pt</option>
        <option value="9.75">9.75pt</option>
        <option value="10.5">10.5pt</option>
        <option value="11.25">11.25pt</option>
        <option value="12">12pt</option>
        <option value="12.75">12.75pt</option>
        <option value="13.5">13.5pt</option>
        <option value="14.25">14.25pt</option>
        <option value="15">15pt</option>
        <option value="15.75">15.75pt</option>
        <option value="16.5">16.5pt</option>
        <option value="17.25">17.25pt</option>
        <option value="18">18pt</option>
        <option value="18.75">18.75pt</option>
        <option value="19.5">19.5pt</option>
        <option value="20.25">20.25pt</option>
        <option value="21">21pt</option>
        <option value="21.75">21.75pt</option>
        </select>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      const value = this.target.find("select").val();
      return value ? parseFloat(value.toString()) : undefined;
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
export default TableHeaderFontSizeOption;