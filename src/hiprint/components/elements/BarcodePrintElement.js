import {i18n,$} from "../../hiprint.comm.js";
import bwipjs from "bwip-js";
import hinnn from "../hinnn.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
//条形码打印元素
class BarcodePrintElement extends BasePrintElement {
  constructor(options, config) {
    super(options);
    this.options = new PrintElementOption(config);
    this.options.setDefault(new PrintElementOption(PrintConfig.instance.barcode.default).getPrintElementOptionEntity());
  }

  updateDesignViewFromOptions() {
    if (this.designTarget) {
      const data = this.getData();
      this.css(this.designTarget, data);
      this.initBarcode(this.designTarget, this.getTitle(), this.getData());
    }
  }

  getConfigOptions() {
    return PrintConfig.instance.barcode;
  }

  getBarAutoWidth() {
    return (this.options.barAutoWidth == null ? this.options.defaultOptions.barAutoWidth === "true" : this.options.barAutoWidth === "true") ?? true;
  }

  onResize(arg1, arg2, arg3, arg4, arg5) {
    super.onResize(arg1, arg2, arg3, arg4, arg5);
    this.initBarcode(this.designTarget, this.getTitle(), this.getData());
  }

  getTitle() {
    return this.options.title || this.printElementType.title;
  }

  getData(context) {
    let data;
    const field = this.getField();
    data = context ? (field ? field.split('.').reduce((acc, key) => acc ? acc[key] : context ? context[key] : "", false) || "" : "") : this.options.testData || this.printElementType.getData() || "";
    return data;
  }

  initBarcode(target, title, value) {
    target = target || this.designTarget;
    if(this.execHiddenExpression(target, value)){
      return ;
    }
    value = this.execFormatterExpression(value);
    const content = target.find('.hiprint-printElement-barcode-content');
    try {
      const height = hinnn.pt.toMm(this.options.height - (!this.options.hideTitle ? this.options.lineHeight ?? (this.options.fontSize ?? 10.5) * 1.5 : 0));
      let barcode = bwipjs.toSVG({
        bcid: this.options.barcodeType || 'code128',
        text: value || this.options.testData || this.options.title,
        scale: this.options.barWidth || 1,
        width: !this.getBarAutoWidth() ? parseInt(hinnn.pt.toMm(this.options.getWidth())) : '',
        height: parseInt(height),
        includetext: !this.options.hideTitle,
        barcolor: this.options.barColor || "#000"
      });

      barcode = $(barcode);
      barcode.attr("preserveAspectRatio", "none slice");
      let svgWidth = barcode[0].attributes.viewBox.value.split(" ")[2];
      svgWidth = Math.ceil(hinnn.px.toPt(svgWidth * 1.05));
      if (this.getBarAutoWidth() && svgWidth > this.options.width) {
        content.parent().css("width", svgWidth + 'pt');
        barcode.css("height", "100%");
        this.options.width = svgWidth;
      }
      content.html(barcode);
    } catch (error) {
      console.error(error);
      content.html($(`<div>${i18n.__('条形码生成失败')}</div>`));
    }
  }

  getReizeableShowPoints() {
    return ['s', 'e', 'se', 'r'];
  }

  createTarget(title, data) {
    const designTarget = $('<div class="hiprint-printElement hiprint-printElement-barcode" style="position: absolute;"><div class="hiprint-printElement-barcode-content" style="height:100%;width:100%;display:flex;flex-direction:column"></div></div>');
    this.initBarcode(designTarget, title, data);
    return designTarget;
  }

  getHtml(arg1, arg2, arg3) {
    return this.getHtml2(arg1, arg2, arg3);
  }
}

export default BarcodePrintElement;