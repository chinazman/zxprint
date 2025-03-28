import {i18n,$} from "../../hiprint.comm.js";
  class BarWidthOption {
    constructor() {
      this.name = "barWidth";
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__('条码宽度')}</div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="">${i18n.__('默认')}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        </select>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      const value = this.target.find("select").val();
      return value || undefined;
    }

    // 设置选择的值
    setValue(value) {
      this.target.find("select").val(value);
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default BarWidthOption;