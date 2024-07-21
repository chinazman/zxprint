import {i18n,$} from "../../hiprint.comm.js";

// 表格汇总标题选项
class TableSummaryTitleOption {
  constructor() {
    this.name = "tableSummaryTitle";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合标题')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="true">${i18n.__('显示')}</option><option value="false">${i18n.__('隐藏')}</option></select></div></div>`);
    return this.target;
  }

  getValue() {
    return !("false" == this.target.find("select").val());
  }

  setValue(value) {
    this.target.find("select").val((value == null ? "" : value).toString());
  }

  destroy() {
    this.target.remove();
  }
}

export default TableSummaryTitleOption;