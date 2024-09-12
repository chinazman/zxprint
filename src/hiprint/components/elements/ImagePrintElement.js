import {$} from "../../hiprint.comm.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";

// 图片打印元素类
class ImagePrintElement extends BasePrintElement {
  constructor(printElementType, options) {
    super(printElementType);
    this.options = new PrintElementOption(options);
    this.options.setDefault(new PrintElementOption(PrintConfig.instance.image.default).getPrintElementOptionEntity());
  }

  // 获取可调整大小的点
  getReizeableShowPoints() {
    return ["s", "e", "se", "r"];
  }

  // 获取数据
  getData(dataSource) {
    let imageData = "";
    const field = this.getField();
    
    if (dataSource) {
      imageData = field ? 
        field.split('.').reduce((obj, prop) => obj ? obj[prop] : dataSource[prop], false) || "" :
        this.options.src || this.printElementType.getData();
    } else {
      imageData = this.options.src || this.printElementType.getData();
    }

    const formatter = this.getFormatter();
    if (formatter) {
      imageData = formatter(imageData, this.options, this._currenttemplateData);
    }

    return imageData || "";
  }

  // 创建目标元素
  createTarget(title, value) {
    const target = $('<div class="hiprint-printElement hiprint-printElement-image" style="position: absolute;"><div class="hiprint-printElement-image-content" style="height:100%;width:100%"></div></div>');
    this.updateTargetImage(target, title, value);
    return target;
  }

  // 根据HTML初始化大小
  initSizeByHtml(element) {
    super.initSizeByHtml(element);
    this.css(element, this.getData());
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.image;
  }

  // 从选项更新设计视图
  updateDesignViewFromOptions() {
    if (this.designTarget) {
      this.css(this.designTarget, this.getData());
      this.updateTargetImage(this.designTarget, this.getTitle(), this.getData());
    }
  }

  // 更新目标图片
  updateTargetImage(target, title, value) {
    if(this.execHiddenExpression(target, value)){
      return ;
    }
    value = this.execFormatterExpression(value);
    const contentElement = target.find(".hiprint-printElement-image-content");
    if (contentElement.find("img").length) {
      contentElement.find("img").attr("src", value);
    } else {
      contentElement.html('<img style="width:100%;height:100%;" src="' + value + '">');
    }
    
    if (value.length) {
      contentElement.find("img").css('cssText', `width:100%;height:100%;content:url("${value}")!important`);
    } else {
      contentElement.find("img").css('cssText', 'width:100%;height:100%;');
    }
    
    if (this.options.fit) {
      contentElement.find("img").css("object-fit", this.options.fit);
    }
    if (this.options.borderRadius) {
      contentElement.find("img").css("border-radius", this.options.borderRadius);
    }
  }

  // 获取HTML
  getHtml(data, templateId, htmlId) {
    return this.getHtml2(data, templateId, htmlId);
  }
}

export default ImagePrintElement;