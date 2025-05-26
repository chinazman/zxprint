import {i18n,$} from "../../hiprint.comm.js";
  class TableBodyRowHeightOption {
    constructor() {
      this.name = "tableBodyRowHeight";
    }

    // 设置表体行高
    css(element, rowHeight) {
      if (element.find("tbody tr td").length) {
        if (rowHeight) {
          element.find("tbody tr td").css("height", `${rowHeight}pt`);
          return `height:${rowHeight}pt`;
        }
        element.find("tbody tr td").map(function(index, cell) {
          cell.style.height = "";
        });
      }
      return null;
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('表体行高')}
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

  export default TableBodyRowHeightOption;