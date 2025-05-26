import {i18n,$} from "../../hiprint.comm.js";
  class TableHeaderRowHeightOption {
    constructor() {
      this.name = "tableHeaderRowHeight";
      this.type = "thead";
      this.label = i18n.__('表头行高');
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
        <input class="auto-submit"/>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      const value = this.target.find("input").val();
      return value ? parseFloat(value.toString()) : undefined;
    }

    // 设置选择的值
    setValue(value) {
      this.target.find("input").val(value);
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default TableHeaderRowHeightOption;