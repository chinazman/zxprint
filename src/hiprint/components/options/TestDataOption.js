import {i18n,$} from "../../hiprint.comm.js";

// 测试数据选择器类
class TestDataOption {
  constructor() {
    this.name = "testData";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('测试数据')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('仅字段名称存在时有效')}" class="auto-submit" >
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return inputValue.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default TestDataOption;