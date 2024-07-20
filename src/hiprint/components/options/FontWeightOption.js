import {i18n,$} from "../../hiprint.comm.js";
// 字体粗细选项类
class FontWeightOption {
    constructor() {
      this.name = "fontWeight";
    }
  
    css(element, value) {
      if (element && element.length) {
        if (value) {
          element.css("font-weight", value);
          return `font-weight:${value}`;
        }
        element[0].style.fontWeight = "";
      }
      return null;
    }
  
    createTarget() {
      this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__('字体粗细')}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__('默认')}</option>
              <option value="lighter">${i18n.__('更细')}</option>
              <option value="bold">${i18n.__('粗体')}</option>
              <option value="bolder">${i18n.__('粗体+')}</option>
              ${[100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => 
                `<option value="${weight}">${weight}</option>`
              ).join('')}
            </select>
          </div>
        </div>
      `);
      return this.target;
    }
  
    getValue() {
      const selectedValue = this.target.find("select").val();
      return selectedValue ? selectedValue.toString() : undefined;
    }
  
    setValue(value) {
      if (value) {
        if (!this.target.find(`option[value="${value}"]`).length) {
          this.target.find("select").prepend(`<option value="${value}">${value}</option>`);
        }
        this.target.find("select").val(value);
      }
    }
  
    destroy() {
      this.target.remove();
    }
  }

  export default FontWeightOption;