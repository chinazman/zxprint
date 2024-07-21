import {i18n,$} from "../../hiprint.comm.js";

// 大小写转换选项
class UpperCaseOption {
  constructor() {
    this.name = "upperCase";
  }

  createTarget() {
    const list = [
      { t: "「小写」十点八", v: "0" },
      { t: "「小写」一十点八", v: "1" },
      { t: "「大写」拾点捌", v: "2" },
      { t: "「大写」壹拾点捌", v: "3" },
      { t: "「金额」人民币拾元捌角", v: "4" },
      { t: "「金额」人民币壹拾元捌角", v: "5" },
      { t: "「金额」人民币壹拾元捌角零分", v: "6" },
      { t: "「金额」壹拾元捌角零分", v: "7" }
    ];

    let optionsHtml = `\n<option value="">${i18n.__('默认')}</option>`;
    list.forEach((item) => {
      optionsHtml += `\n<option value='${item.v}'>${item.t}</option>`;
    });
    this.target = $(
      `<div class="hiprint-option-item hiprint-option-item-row">
<div class="hiprint-option-item-label">
${i18n.__('转大小写')}
</div>
<div class="hiprint-option-item-field">
<select class="auto-submit"></select>
</div>
</div>`
    );
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

export default UpperCaseOption;