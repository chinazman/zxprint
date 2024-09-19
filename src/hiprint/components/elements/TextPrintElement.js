import {i18n,$} from "../../hiprint.comm.js";
// 条形码
import JsBarcode from "jsbarcode";
import hinnn from "../hinnn.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";

class PrintTextHelper {
    static replaceEnterAndNewline(text, replacement) {
      return text.replace(new RegExp("\r|\n|/g", "g"), replacement);
    }
  
    static replaceTab(text, replacement) {
      return text.replace(new RegExp("\t/g", "g"), replacement);
    }
  
    static replaceEnterAndNewlineAndTab(text, replacement) {
      return text.replace(new RegExp("\r|\n|\t|/g", "g"), replacement);
    }
  }
  
  class TextPrintElementOption extends PrintElementOption {
    constructor(option) {
      super(option);
      if (this.title) {
        this.title = PrintTextHelper.replaceEnterAndNewlineAndTab(this.title, "");
      }
    }
  
    // 获取隐藏标题选项
    getHideTitle() {
      return this.hideTitle == null ? this.defaultOptions.hideTitle : this.hideTitle;
    }
  
    // 获取文本类型
    getTextType() {
      return (this.textType == null ? this.defaultOptions.textType : this.textType) || "text";
    }
  
    // 获取字体大小
    getFontSize() {
      return (this.fontSize == null ? this.defaultOptions.fontSize : this.fontSize) || 9;
    }
  
    // 获取条形码模式
    getBarcodeMode() {
      return (this.barcodeMode == null ? this.defaultOptions.barcodeMode : this.barcodeMode) || "CODE128";
    }
  
    // 获取条形码宽度
    getBarWidth() {
      return (this.barWidth == null ? this.defaultOptions.barWidth : this.barWidth) || 1;
    }
  
    // 获取条形码自动宽度
    getBarAutoWidth() {
      return this.barAutoWidth == null ? this.defaultOptions.barAutoWidth === "true" : this.barAutoWidth === "true";
    }
  
    // 获取二维码纠错级别
    getQRcodeLevel() {
      return (this.qrCodeLevel == null ? this.defaultOptions.qrCodeLevel : this.qrCodeLevel) || 0;
    }
  }
  
  class TextPrintElement extends BasePrintElement {
    constructor(elementType, options) {
      const instance = super(elementType) || this;
      instance.options = new TextPrintElementOption(options);
      instance.options.setDefault(new TextPrintElementOption(PrintConfig.instance.text.default).getPrintElementOptionEntity());
      return instance;
    }
  
    // 获取设计目标
    getDesignTarget(designPaper) {
      return super.getDesignTarget(designPaper);
    }
  
    // 获取代理目标
    getProxyTarget(proxyOption) {
      if (proxyOption) this.setProxyTargetOption(proxyOption);
      const data = this.getData();
      const target = this.createTarget(this.printElementType.getText(true), data);
      this.updateTargetSize(target);
      this.css(target, data);
      return target;
    }
  
    // 从选项更新设计视图
    updateDesignViewFromOptions() {
      // 重复处理影响了 updateTargetText 方法执行，故在此处注释掉
      // var els = this.panel.printElements.filter(function (t) {
      //   return ('block' == t.designTarget.children().last().css('display')
      //     && t.designTarget.children().last().hasClass('selected')) && !t.printElementType.type.includes('table');
      // });
      // els.forEach(ele => {
      //   var t = ele.getData()
      //   ele.css(ele.designTarget, t)
      //   this.updateTargetText(ele.designTarget, ele.getTitle(), t)
      // })
      if (this.designTarget) {
        const data = this.getData();
        this.updateTargetText(this.designTarget, this.getTitle(), data);
        this.css(this.designTarget, data);
      }
    }
  
    // 获取配置选项
    getConfigOptions() {
      return PrintConfig.instance.text;
    }
  
    // 获取标题
    getTitle() {
      let title = this.options.title || this.printElementType.title || "";
      if (title) {
        title = PrintTextHelper.replaceEnterAndNewlineAndTab(title, "");
      }
      return title;
    }
  
    // 获取数据
    getData(dataContext) {
      let data;
      const field = this.getField();
      if (dataContext) {
        data = field ? field.split('.').reduce((context, part) => context ? context[part] : dataContext ? dataContext[part] : "", false) || "" : "";
      } else {
        data = this.options.testData || this.printElementType.getData() || "";
      }
  
      if (this.options.format) {
        if (this.options.dataType === "datetime") {
          return hinnn.dateFormat(data, this.options.format);
        }
        if (this.options.dataType === "boolean") {
          const formatOptions = this.options.format.split(":");
          if (formatOptions.length > 0) {
            return data === true || data === "true" ? formatOptions[0] : formatOptions[1];
          }
        }
      }
      return data;
    }
  
    // 更新目标文本
    updateTargetText(target, title, value, extraParam, rowIndex) {
      if(this.execHiddenExpression(target, value)){
        return ;
      }
      value = this.execFormatterExpression(value);

      const formatter = this.getFormatter();
      const contentElement = target.find(".hiprint-printElement-text-content");
      
      const textType = this.options.getTextType();
      if (textType === "text") {
        title = hinnn.textToHtml(title);
        value = value === undefined? "":hinnn.textToHtml(value);
        let styles = "display:inline-block";
        if (this.options.titleWidth){
          styles += ";width:"+this.options.titleWidth+"pt";
        }
        if (this.options.titleHeight){
          styles += ";height:"+this.options.titleHeight+"pt";
        }
        const text = this.getField()
        ? (this.options.getHideTitle() ? "" : title ? '<b style="'+styles+'">'+ title + (this.options.titleShowColon === false?'':'：') +'</b>' : "") +
          '<span>'+hinnn.toUpperCase(this.options.upperCase, formatter ? formatter(title, value, this.options, this._currenttemplateData, target) : value) +'</span>'
        : '<span>'+hinnn.toUpperCase(this.options.upperCase, formatter ? formatter(title, title, this.options, this._currenttemplateData, target) : title)+'</span>';
        contentElement.html(text);
      } else {
        if (textType === "barcode") {
          contentElement.css({
            display: "flex",
            "flex-direction": "column"
          });
          contentElement.html('<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg>');
          try {
            if (value) {
              JsBarcode(contentElement.find(".hibarcode_imgcode")[0], value, {
                format: this.options.getBarcodeMode(),
                width: this.options.getBarWidth(),
                textMargin: -1,
                lineColor: this.options.color || "#000000",
                margin: 0,
                height: parseInt(hinnn.pt.toPx(this.options.getHeight() || 10).toString()),
                displayValue: !this.options.hideTitle
              });
              contentElement.find(".hibarcode_imgcode").attr("height", "100%");
              contentElement.find(".hibarcode_imgcode").attr("width", "100%");
              // 解决条形码自动宽度问题
              let svgWidth = contentElement.find(".hibarcode_imgcode rect")[0].attributes.width.value;
              svgWidth = Math.ceil(hinnn.px.toPt(svgWidth * 1.05));
              if (this.options.getBarAutoWidth() && svgWidth > this.options.width) {
                contentElement.parent().css("width", svgWidth + 'pt');
                this.options.width = svgWidth;
              }
            } else {
              contentElement.html("");
            }
          } catch (error) {
            console.log(error);
            contentElement.html(`${i18n.__('此格式不支持该文本')}`);
          }
        }
  
        if (textType === "qrcode") {
          contentElement.html("");
          try {
            if (value) {
              contentElement.css({
                display: "flex",
                "flex-direction": "column"
              });
              const width = this.options.width;
              const height = this.options.height - (!this.options.hideTitle ? this.options.lineHeight ?? (this.options.fontSize ?? 10.5) * 1.5 : 0);
              const box = $('<div class="hiqrcode_imgcode"></div>').css({
                width: Math.min(width, height) + 'pt',
                height: Math.min(width, height) + 'pt',
                margin: "auto"
              });
              new QRCode(box[0], {
                width: "100%",
                height: "100%",
                colorDark: this.options.color || "#000000",
                useSVG: true,
                correctLevel: this.options.getQRcodeLevel()
              }).makeCode(value);
              contentElement.html(box);
              if (!this.options.hideTitle) {
                contentElement.append(`<div class="hiqrcode_displayValue" style="white-space:nowrap">${value}</div>`);
              }
            }
          } catch (error) {
            console.log(error);
            contentElement.html(`${i18n.__('二维码生成失败')}`);
          }
        }
      }
    }
  
    // 当元素调整大小时
    onResize(event, ui, width, height, forceUpdate) {
      super.onResize(event, ui, width, height, forceUpdate);
      if (this.options.getTextType() === "barcode" || this.options.getTextType() === "qrcode") {
        this.updateTargetText(this.designTarget, this.getTitle(), this.getData());
      }
    }
  
    // 创建目标元素
    createTarget(title, data, extraParam) {
      const target = $('<div tabindex="1" class="hiprint-printElement hiprint-printElement-text" style="position: absolute;"><div class="hiprint-printElement-text-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>');
      this.updateTargetText(target, title, data, extraParam);
      return target;
    }
  
    // 获取 HTML
    getHtml(paper, templateData, extraParam) {
      return this.getHtml2(paper, templateData, extraParam);
    }
  }

  export default TextPrintElement;