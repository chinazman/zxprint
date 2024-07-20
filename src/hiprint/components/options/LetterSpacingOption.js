import {i18n,$} from "../../hiprint.comm.js";
// 字间距选项类
class LetterSpacingOption {
    constructor() {
      this.name = "letterSpacing";
    }
  
    css(element, value) {
      if (element && element.length) {
        if (value) {
          element.css("letter-spacing", value + "pt");
          return `letter-spacing:${value}pt`;
        }
        element[0].style.letterSpacing = "";
      }
      return null;
    }
  
    createTarget() {
      this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__('字间距')}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__('默认')}</option>
              ${[0.75, 1.5, 2.25, 3, 3.75, 4.5, 5.25, 6, 6.75, 7.5, 8.25, 9, 9.75, 10.5, 11.25, 12].map(spacing => 
                `<option value="${spacing}">${spacing}pt</option>`
              ).join('')}
            </select>
          </div>
        </div>
      `);
      return this.target;
    }
  
    getValue() {
      const selectedValue = this.target.find("select").val();
      return selectedValue ? parseFloat(selectedValue) : undefined;
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

  export default LetterSpacingOption;