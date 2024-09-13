import {i18n,$} from "../../hiprint.comm.js";

// 单元格格式化表达式
class CellFormatterExpressionOption {
  constructor() {
    this.name = "cellFormatterExpression";
  }

  createTarget() {
    const html = `<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('单元格格式化表达式')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="row.price*value + '吨'" class="auto-submit"/>
        </div>
    </div>`;
    this.target = $(html);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("input").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

export default CellFormatterExpressionOption;