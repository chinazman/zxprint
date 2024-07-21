import {i18n,$} from "../../hiprint.comm.js";

// 表格条形码模式选项类
class TableBarcodeModeOption {
  constructor() {
    this.name = "tableBarcodeMode";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('条形码格式')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
         <option value="" >${i18n.__('默认')}(CODE128A)</option>
         <option value="CODE128A" >CODE128A</option>
        <option value="CODE128B" >CODE128B</option>
        <option value="CODE128C" >CODE128C</option>
        <option value="CODE39" >CODE39</option>
        <option value="EAN-13" >EAN-13</option>
        <option value="EAN-8" >EAN-8</option>
        <option value="EAN-5" >EAN-5</option>
        <option value="EAN-2" >EAN-2</option>
        <option value="UPC（A）" >UPC（A）</option>
        <option value="ITF" >ITF</option>
        <option value="ITF-14" >ITF-14</option>
        <option value="MSI" >MSI</option>
            <option value="MSI10" >MSI10</option>
            <option value="MSI11" >MSI11</option>
            <option value="MSI1010" >MSI1010</option>
            <option value="MSI1110" >MSI1110</option>
            <option value="Pharmacode" >Pharmacode</option>
        </select>
        </div>
    </div>`
    );
    return this.target;
  }

  // 获取值
  getValue() {
    const selectedValue = this.target.find("select").val();
    return selectedValue || undefined;
  }

  // 设置值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default TableBarcodeModeOption;