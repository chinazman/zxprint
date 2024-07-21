import {i18n,$} from "../../hiprint.comm.js";

// 宽高类
class WidthHeightOption {
  constructor() {
    this.name = "widthHeight";
  }

  // 创建目标元素
  createTarget(element, options) {
    const self = this;
    self.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">
      ${i18n.__('宽高大小')}
      </div>
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
      <input type="number" style="width:48%" placeholder="${i18n.__('宽')}" class="auto-submit" />
      <input type="number" style="width:48%" placeholder="${i18n.__('高')}" class="auto-submit" />
      </div>
      </div>`);
    self.syncLock = options.widthHeightSync || false;
    self.createSyncLock(self.syncLock);
    return self.target;
  }

  // 创建同步锁
  createSyncLock(isLocked) {
    const self = this;
    self.lockTarget = isLocked ? 
      $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`) : 
      $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
    self.lockTarget.click(() => {
      if (self.syncLock) {
        self.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
      } else {
        self.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
      }
      self.syncLock = !self.syncLock;
    });
    self.target.find("input:first").after(self.lockTarget);
    // 同步编辑
    self.target.find("input:first").change(function() {
      if (self.syncLock) {
        self.target.find("input:last").val($(this).val());
      }
    });
    self.target.find("input:last").change(function() {
      if (self.syncLock) {
        self.target.find("input:first").val($(this).val());
      }
    });
    return self.lockTarget;
  }

  // 设置CSS
  css(element) {
    if (element && element.length && this.target) {
      // 仅当前元素被选中才更新宽高大小, 以避免冲突
      if (('block' == element.find('.resize-panel').css('display') || element[0].className.includes('table')) && this.el == element) {
        const value = this.getValue();
        return element.css("width", value.width + "pt").css("height", value.height + "pt");
      }
    }
    return null;
  }

  // 获取值
  getValue() {
    const value = {
      widthHeightSync: this.syncLock,
      width: 0,
      height: 0
    };
    value.width = parseFloat(this.target.find("input:first").val() || 0);
    value.height = parseFloat(this.target.find("input:last").val() || 0);
    return value;
  }

  // 设置值
  setValue(value, el) {
    this.el = el.designTarget || el;
    this.target.find("input:first").val(value.width);
    this.target.find("input:last").val(value.height);
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default WidthHeightOption;