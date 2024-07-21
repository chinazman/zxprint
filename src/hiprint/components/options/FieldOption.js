import {i18n,$} from "../../hiprint.comm.js";

// 字段选择器类
class FieldOption {
  constructor() {
    this.name = "field";
  }

  createTarget(context) {
    let fields;
    if (context) {
      fields = context.getFields();
    }

    if (fields) {
      this.isSelect = true;
      let selectHtml = `<div class="hiprint-option-item hiprint-option-item-row">
            <div class="hiprint-option-item-label">
            ${i18n.__('字段名')}
            </div>
            <div class="hiprint-option-item-field">
            <select class="auto-submit">
                <option value="" >${i18n.__('请选择字段')}</option>`;
      fields.forEach((field) => {
        selectHtml += ' <option value="' + (field.field || "") + '" >' + (field.text || "") + "</option>";
      });
      selectHtml += ` </select>
            </div>
        </div>`;
      this.target = $(selectHtml);
    } else {
      this.isSelect = false;
      this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
            <div class="hiprint-option-item-label">
            ${i18n.__('字段名')}
            </div>
            <div class="hiprint-option-item-field">
            <input type="text" placeholder="${i18n.__('请输入字段名')}" class="auto-submit">
            </div>
        </div>`);
    }

    return this.target;
  }

  getValue() {
    return (this.isSelect ? this.target.find("select").val() : this.target.find("input").val()) || undefined;
  }

  setValue(value) {
    if (this.isSelect) {
      if (value && !this.target.find('option[value="' + value + '"]').length) {
        this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
      }
      this.target.find("select").val(value);
    } else {
      this.target.find("input").val(value);
    }
  }

  destroy() {
    this.target.remove();
  }
}

export default FieldOption;