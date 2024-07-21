import {i18n,$} from "../../hiprint.comm.js";
import bwipjs from "bwip-js";
import hinnn from "../00hinnn.js";
import PrintConfig from "../01PrintConfig.js";
import BasePrintElement from "../04BasePrintElement.js";
import PrintElementOption from "../03PrintElementOption.js";
// QRCode 类,继承自 BasePrintElement
class QrcodePrintElement extends BasePrintElement {
    constructor(baseElement, options) {
      super(baseElement);
      this.options = new PrintElementOption(options);
      this.options.setDefault(new PrintElementOption(PrintConfig.instance.qrcode.default).getPrintElementOptionEntity());
    }
  
    // 更新设计视图中的选项
    updateDesignViewFromOptions() {
      if (this.designTarget) {
        const data = this.getData();
        this.css(this.designTarget, data);
        this.initQrcode(this.designTarget, this.getTitle(), data);
      }
    }
  
    // 获取配置选项
    getConfigOptions() {
      return PrintConfig.instance.qrcode;
    }
  
    // 处理调整大小事件
    onResize(width, height, minWidth, minHeight, isFixed) {
      super.onResize(width, height, minWidth, minHeight, isFixed);
      this.initQrcode(this.designTarget, this.getTitle(), this.getData());
    }
  
    // 获取标题
    getTitle() {
      return this.options.title || this.printElementType.title;
    }
  
    // 获取数据
    getData(context) {
      let result;
      const field = this.getField();
      if (context) {
        result = field ? field.split('.').reduce((obj, key) => obj ? obj[key] : context ? context[key] : "", false) || "" : "";
      } else {
        result = this.options.testData || this.printElementType.getData() || "";
      }
      return result;
    }
  
    // 初始化二维码
    initQrcode(designTarget, title, text) {
      designTarget = designTarget || this.designTarget;
      const content = designTarget.find('.hiprint-printElement-qrcode-content');
      try {
        const width = hinnn.pt.toPx(this.options.getWidth());
        // 计算 qrcode 的高度，判断是否需要减去 title，使 title 包含在元素内部
        const height = hinnn.pt.toPx(this.options.height - (!this.options.hideTitle ? this.options.lineHeight ?? (this.options.fontSize ?? 10.5) * 1.5 : 0));
        // 根据宽高 判断 qrcode 上下、左右 留白边距
        const paddingWidth = width >= height ? Math.abs(parseInt((width - height) / 2)) : 0;
        const paddingHeight = width >= height ? 0 : Math.abs(parseInt((height - width) / 2));
        const qrcode = bwipjs.toSVG({
          bcid: this.options.qrcodeType || 'qrcode',
          text: text || this.options.testData || this.options.title,
          scale: 1,
          paddingwidth: paddingWidth,
          paddingheight: paddingHeight,
          // 保持 qrcode 始终为正方形
          width: Math.min(parseInt(width / 2.835), parseInt(height / 2.835)),
          height: Math.min(parseInt(width / 2.835), parseInt(height / 2.835)),
          includetext: false,
          eclevel: ['M', 'L', 'H', 'Q'][this.options.qrCodeLevel ?? 0],
          barcolor: this.options.barColor || "#000"
        });
        content.html($(qrcode));
        if (!this.options.hideTitle) {
          const titleText = title ? title + (text ? ':' : '') : '';
          const textAlign = this.options.textAlign || 'center';
          // 支持type为qrcode的textAlign属性
          const textStyle = textAlign === 'justify' ? 'text-align-last: justify;text-justify: distribute-all-lines;' : `text-align: ${textAlign};`;
          content.append($(`<div class="hiprint-printElement-qrcode-content-title" style="${textStyle}">${titleText}${text}</div>`));
        }
      } catch (error) {
        console.error(error);
        content.html($('<div>' + i18n.__('二维码生成失败') + '</div>'));
      }
    }
  
    // 设置 qrcode 元素 resize 控制点
    getReizeableShowPoints() {
      return ['s', 'e', 'se', 'r'];
    }
  
    // 创建目标元素
    createTarget(title, data) {
      const designTarget = $('<div class="hiprint-printElement hiprint-printElement-qrcode" style="position: absolute;"><div class="hiprint-printElement-qrcode-content" style="height:100%;width:100%;display:flex;flex-direction:column"></div></div>');
      this.initQrcode(designTarget, title, data);
      return designTarget;
    }
  
    // 获取 HTML
    getHtml(data, options, index) {
      return this.getHtml2(data, options, index);
    }
  }

  export default QrcodePrintElement