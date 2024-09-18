import {i18n,$} from "../../hiprint.comm.js";
/**
 * 标题显示冒号选项类
 */
class TitleShowColonOption {
    constructor() {
      this.name = "titleShowColon";
    }

    // 创建目标元素
    createTarget() {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('显示冒号')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="">${i18n.__('默认')}</option>
            <option value="true">${i18n.__('显示')}</option>
            <option value="false">${i18n.__('隐藏')}</option>
        </select>
        </div>
      </div>`);
      return this.target;
    }

    // 获取选择的值
    getValue() {
      return this.target.find("select").val() === "false" ? false : true;
    }

    // 设置选择的值
    setValue(value) {
      this.target.find("select").val(value == null ? "" : value.toString());
    }

    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default TitleShowColonOption;