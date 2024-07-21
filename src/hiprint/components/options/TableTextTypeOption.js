import {i18n,$} from "../../hiprint.comm.js";

// 表格文本类型选项类
class TableTextTypeOption {
  constructor() {
    this.name = "tableTextType";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('字段类型')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认(文本)')}</option>
        <option value="text" >${i18n.__('文本')}</option>
 <option value="sequence" >${i18n.__('序号')}</option>
       <option value="barcode" >${i18n.__('条形码')}</option>
        <option value="qrcode" >${i18n.__('二维码')}</option>
    <option value="image" >${i18n.__('图片')}</option>
        </select>
        </div>
    </div>`
    );
    return this.target;
  }

  // 获取值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
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

export default TableTextTypeOption;