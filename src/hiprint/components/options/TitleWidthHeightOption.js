import {i18n,$} from "../../hiprint.comm.js";
/**
 * 标题宽高选项类

 * @class TitleWidthHeightOption
 * @extends WidthHeightOption
 */
class TitleWidthHeightOption  {
  constructor() {
    this.name = "titleWidthHeight";

  }

  // 创建目标元素
  createTarget(element, options) {
    const self = this;
    self.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">
      ${i18n.__('宽高大小')}
      </div>
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
      <input type="number" style="width:48%" placeholder="${i18n.__('宽')}" class="auto-submit" /><label style="margin: 0 4px;text-align:center;" > </label>
      <input type="number" style="width:48%" placeholder="${i18n.__('高')}" class="auto-submit" />
      </div>
      </div>`);
    return self.target;
  }

  // 设置CSS
  css(element) {
    if (element && element.length && this.target) {
        element = element.find(".hiprint-printElement-text-content>span:first");
        const value = this.getValue();
        if (value.titleWidth){
            element.css("width", value.titleWidth + "pt");
        }
        if (value.titleHeight){
            element.css("height", value.titleHeight + "pt");
        }
        return null;
    }
    return null;
  }

  // 获取值
  getValue() {
    const value = {
        titleWidth: parseFloat(this.target.find("input:first").val() || 0),
        titleHeight: parseFloat(this.target.find("input:last").val() || 0)
      };
      return value;
  }

  // 设置值
  setValue(value, el) {
    if (value){
        this.target.find("input:first").val(value.titleWidth);
        this.target.find("input:last").val(value.titleHeight);
    }
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default TitleWidthHeightOption;