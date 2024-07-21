import {i18n,$} from "../../hiprint.comm.js";

// 表格汇总数字格式选项
class TableSummaryNumFormatOption {
  constructor() {
    this.name = "tableSummaryNumFormat";
  }

  createTarget() {
    const list = [{ t: `${i18n.__('整数')}`, v: '0' }];
    const num = [1, 2, 3, 4, 5, 6];
    num.forEach((item) => {
      list.push({ t: i18n.__n(`保留%s位`, item), v: '' + item });
    });
    let optionsHtml = `\n            <option value="" >${i18n.__('默认')}</option>`;
    list.forEach((item) => {
      optionsHtml += '\n            <option value="' + (item.v || "") + '">' + (item.t || "") + '</option>';
    });
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('底部聚合小数')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit"></select>
        </div>
    </div>`);
    this.target.find(".auto-submit").append($(optionsHtml));
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

export default TableSummaryNumFormatOption;