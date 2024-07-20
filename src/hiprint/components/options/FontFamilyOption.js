import {i18n,$} from "../../hiprint.comm.js";
// 字体选项类
class FontFamilyOption {
    constructor() {
      this.name = "fontFamily";
    }
  
    // 创建选项目标元素
    createTarget(context) {
      let fontList;
      if (context && (fontList = context.getFontList())) {
        this.target = this.createCustomFontList(fontList);
      } else {
        this.target = this.createDefaultFontList();
      }
      return this.target;
    }
  
    // 创建自定义字体列表
    createCustomFontList(fontList) {
      const options = fontList.map(font => 
        `<option value="${font.value || ""}">${font.title || ""}</option>`
      ).join('');
  
      return $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__('字体')}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__('默认')}</option>
              ${options}
            </select>
          </div>
        </div>
      `);
    }
  
    // 创建默认字体列表
    createDefaultFontList() {
      return $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__('字体')}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__('默认')}</option>
              <option value="SimSun">${i18n.__('宋体')}</option>
              <option value="Microsoft YaHei">${i18n.__('微软雅黑')}</option>
            </select>
          </div>
        </div>
      `);
    }
  
    // 设置或清除CSS样式
    css(element, value) {
      if (element && element.length) {
        if (value) {
          element.css("font-family", value);
          return `font-family:${value}`;
        }
        element[0].style.fontFamily = "inherit"; // 从父元素继承字体, 否则模板字体无效
      }
      return null;
    }
  
    // 获取选中的值
    getValue() {
      const selectedValue = this.target.find("select").val();
      return selectedValue ? selectedValue.toString() : undefined;
    }
  
    // 设置选中的值
    setValue(value) {
      if (value) {
        if (!this.target.find(`option[value="${value}"]`).length) {
          this.target.find("select").prepend(`<option value="${value}">${value}</option>`);
        }
        this.target.find("select").val(value);
      }
    }
  
    // 销毁目标元素
    destroy() {
      this.target.remove();
    }
  }

  export default FontFamilyOption;