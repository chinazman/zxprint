import {i18n,$} from "../../hiprint.comm.js";

// 选项组类
class OptionsGroup {
  constructor() {
    this.name = "optionsGroup";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('边框设置')}
        </div>
       
    </div>`);
    return this.target;
  }

  getValue() {
  }

  setValue(value) {
  }

  destroy() {
    this.target.remove();
  }
}

export default OptionsGroup;