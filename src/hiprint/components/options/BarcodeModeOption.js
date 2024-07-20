import {i18n,$} from "../../hiprint.comm.js";
  class BarcodeModeOption {
    constructor() {
      this.name = "barcodeMode";
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('条形码格式')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="">${i18n.__('默认')}</option>
        <option value="CODE128A">CODE128A</option>
        <option value="CODE128B">CODE128B</option>
        <option value="CODE128C">CODE128C</option>
        <option value="CODE39">CODE39</option>
        <option value="EAN13">EAN-13</option>
        <option value="EAN8">EAN-8</option>
        <option value="EAN5">EAN-5</option>
        <option value="EAN2">EAN-2</option>
        <option value="UPC">UPC（A）</option>
        <option value="ITF">ITF</option>
        <option value="ITF14">ITF-14</option>
        <option value="MSI">MSI</option>
        <option value="MSI10">MSI10</option>
        <option value="MSI11">MSI11</option>
        <option value="MSI1010">MSI1010</option>
        <option value="MSI1110">MSI1110</option>
        <option value="Pharmacode">Pharmacode</option>
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

  export default BarcodeModeOption;