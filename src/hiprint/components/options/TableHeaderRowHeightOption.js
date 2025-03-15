import {i18n,$} from "../../hiprint.comm.js";
  class TableHeaderRowHeightOption {
    constructor() {
      this.name = "tableHeaderRowHeight";
      this.type = "thead";
      this.label = i18n.__('表头字体粗细');
    }

    // 设置表头行高
    css(element, rowHeight) {
      if (element.find(this.type + " tr td").length) {
        if (rowHeight) {
          element.find(this.type + " tr td:not([rowspan])").css("height", `${rowHeight}pt`);
          return `height:${rowHeight}pt`;
        }
        element.find(this.type + " tr td").map(function(index, cell) {
          cell.style.height = "";
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
        <option value="22.5">22.5pt</option>
        <option value="23.25">23.25pt</option>
        <option value="24">24pt</option>
        <option value="24.75">24.75pt</option>
        <option value="25.5">25.5pt</option>
        <option value="26.25">26.25pt</option>
        <option value="27">27pt</option>
        <option value="27.75">27.75pt</option>
        <option value="28.5">28.5pt</option>
        <option value="29.25">29.25pt</option>
        <option value="30">30pt</option>
        <option value="30.75">30.75pt</option>
        <option value="31.5">31.5pt</option>
        <option value="32.25">32.25pt</option>
        <option value="33">33pt</option>
        <option value="33.75">33.75pt</option>
        <option value="34.5">34.5pt</option>
        <option value="35.25">35.25pt</option>
        <option value="36">36pt</option>
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

  export default TableHeaderRowHeightOption;