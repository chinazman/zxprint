import {i18n,$} from "../../hiprint.comm.js";

// 表格底部汇总选项
class TableSummaryOption {
  constructor() {
    this.name = "tableSummary";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合类型')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('不聚合')}</option><option value="count">${i18n.__('计数')}</option><option value="sum">${i18n.__('合计')}</option><option value="avg">${i18n.__('平均值')}</option><option value="min">${i18n.__('最小值')}</option><option value="max">${i18n.__('最大值')}</option><option value="text">${i18n.__('仅文本')}</option></select></div></div>`);
    return this.target;
  }

  getValue() {
    return this.target.find("select").val();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TableSummaryOption;