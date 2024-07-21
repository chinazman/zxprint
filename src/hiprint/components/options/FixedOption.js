import {i18n,$} from "../../hiprint.comm.js";

// 位置固定选项类
class FixedOption {
  constructor() {
    this.name = "fixed";
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('位置固定')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
            <option value="false" >${i18n.__('否')}</option>
            <option value="true" >${i18n.__('是')}</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  // 获取选项值
  getValue() {
    if ("true" == this.target.find("select").val()) return true;
  }

  // 设置选项值
  setValue(value) {
    this.target.find("select").val((value == null ? "" : value).toString());
  }

  // 销毁选项
  destroy() {
    this.target.remove();
  }
}

export default FixedOption;