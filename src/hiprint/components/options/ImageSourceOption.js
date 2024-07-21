import {i18n,$} from "../../hiprint.comm.js";

// 图片源类
class ImageSourceOption {
  constructor() {
    this.name = "src";
  }

  // 创建目标元素
  createTarget(element) {
    this.el = element;
    let onImageChooseClick;
    const self = this;
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('图片地址')}
        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <input type="text" placeholder="${i18n.__('请输入图片地址')}" class="auto-submit" style="width:70%">
    <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__('选择')}</button>        </div>
    </div>`);
    if (element && (onImageChooseClick = element.getOnImageChooseClick())) {
      this.target.find('button').click(() => {
        onImageChooseClick && onImageChooseClick(self);
      });
    }
    return this.target;
  }

  // 获取值
  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  // 设置值
  setValue(value) {
    this.target.find("input").val(value);
  }

  // 刷新
  refresh(value, opt, cb) {
    const that = this;
    this.setValue(value);
    this.target.find("input").change();
    if (this.el && opt) {
      const img = new Image();
      img.src = value;
      if (img.complete) {
        that.updateEl(img.width, img.height, opt, cb);
      } else {
        img.onload = () => {
          that.updateEl(img.width, img.height, opt, cb);
        };
      }
    }
  }

  // 更新元素
  updateEl(width, height, opt, cb) {
    if (opt) {
      let ratio, widthValue, heightValue;
      if (opt && opt.auto) {
        if (width >= height) {
          opt.width = true;
        } else {
          opt.height = true;
        }
      }
      if (opt.width) {
        ratio = height / width;
        widthValue = this.el.options.width;
        heightValue = Math.floor(widthValue * ratio * 10) / 10;
        this.el.options.height = heightValue;
        this.el.designTarget.css('height', heightValue + "pt");
      } else if (opt.height) {
        ratio = width / height;
        heightValue = this.el.options.height;
        widthValue = Math.floor(heightValue * ratio * 10) / 10;
        this.el.options.width = widthValue;
        this.el.designTarget.css('width', widthValue + "pt");
      } else if (opt.real) {
        widthValue = hinnn.px.toPt(width);
        heightValue = hinnn.px.toPt(height);
        this.el.options.width = widthValue;
        this.el.options.height = heightValue;
        this.el.designTarget.css('width', widthValue + "pt");
        this.el.designTarget.css('height', heightValue + "pt");
      }
      this.el.designTarget.children('.resize-panel').trigger($.Event('click'));
    }
    cb && cb(this.el, width, height);
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default ImageSourceOption;