import {i18n,$} from "../../hiprint.comm.js";

// 纸张方向选项类
class OrientOption {
  constructor() {
    this.name = "orient";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('纸张方向(仅自定义纸质有效)')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="1" >${i18n.__('纵向')}</option>
        <option value="2" >${i18n.__('横向')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 获取值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
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

export default OrientOption;