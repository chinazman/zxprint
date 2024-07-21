import {i18n,$} from "../../hiprint.comm.js";

// 表格二维码级别选项类
class TableQRCodeLevelOption {
  constructor() {
    this.name = "tableQRCodeLevel";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('二维码容错率')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="1" >7% L</option>
        <option value="0" >15% M</option>
        <option value="3" >25% Q</option>
        <option value="2" >30% H</option>
        </select>
        </div>
    </div>`
    );
    return this.target;
  }

  // 获取值
  getValue() {
    const selectedValue = this.target.find("select").val();
    return parseInt(selectedValue || 0);
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

export default TableQRCodeLevelOption;