import {i18n,$} from "../../hiprint.comm.js";

// 背景颜色选项类
class BackgroundColorOption {
  constructor() {
    this.name = "backgroundColor";
  }

  // 设置CSS样式
  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("background-color", value);
        return "background-color:" + value;
      }
      element[0].style.backgroundColor = "";
    }

    return null;
  }

  // 创建选项目标元素
  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('背景颜色')}
        </div>
        <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit"/>
        </div>
    </div>`);
    return this.target;
  }

  // 获取值
  getValue() {
    const inputValue = this.target.find("input").val();
    if (inputValue) return inputValue.toString();
  }

  // 设置值
  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap"
    });
    this.target.find("input").val(value);
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default BackgroundColorOption;