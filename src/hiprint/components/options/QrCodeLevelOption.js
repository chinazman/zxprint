import {i18n,$} from "../../hiprint.comm.js";
// 二维码容错率
class QrCodeLevelOption {
    constructor() {
      // 设置选项名称
      this.name = "qrCodeLevel";
    }
  
    // 创建目标元素
    createTarget() {
      // 创建 HTML 结构并返回
      this.target = $(`<div class="hiprint-option-item">
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
      </div>`);
      return this.target;
    }
  
    // 获取当前选择的值
    getValue() {
      const selectedValue = this.target.find("select").val();
      return parseInt(selectedValue || 0);
    }
  
    // 设置选择的值
    setValue(newValue) {
      this.target.find("select").val(newValue);
    }
  
    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

export default QrCodeLevelOption;