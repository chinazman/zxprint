import {i18n,$} from "../../hiprint.comm.js";

// 图片适应选项类
class ImageIsBackgroundOption {
  constructor() {
    this.name = "isBackground";

  }

  css(element, value) {
    if (element && element.length) {
      if (value == "yes") {
        element.addClass('no-print');
        return null;
      }
      element.removeClass('no-print');
    }
    return null;
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('是否套打背景')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="yes" >${i18n.__('是')}</option>
        <option value="no" >${i18n.__('否')}</option>
                </select>
        </div>
    </div>`);

    this.target.find('select').on("change", function () {
      if (this.value == "yes") {
        $("#PrintElementOptionSetting").find("div[option-name='fit']").find('select').val("contain");
        $("#PrintElementOptionSetting").find("div[option-name='zIndex']").find('input').val("0");
      }

    })
    
    return this.target;
  }

  getValue() {
    return this.target.find("select").val();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default ImageIsBackgroundOption;