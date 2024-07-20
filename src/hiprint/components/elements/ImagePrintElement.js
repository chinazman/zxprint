import {languages,i18n,$} from "../../hiprint.comm.js";
// 条形码
import JsBarcode from "jsbarcode";
import bwipjs from "bwip-js";
// 水印
import watermark from "../../plugins/watermark.js";
//引入标尺
import lImg from "../../css/image/l_img.svg";
import vImg from "../../css/image/v_img.svg";
// pdf
import { jsPDF } from "jspdf";
import html2canvas from "@wtto00/html2canvas";
// 解析svg 到 canvas, 二维码条形码需要
import Canvg from 'canvg';

import hinnn from "../00hinnn.js";
import PrintConfig from "../01PrintConfig.js";
import PrintLib from "../02PrintLib.js";
import PrintTableCell from "../05PrintTableCell.js";
import TablePrintElement from "../15TablePrintElement.js";
import BasePrintElement from "../04BasePrintElement.js";
import PrintElementOption from "../03PrintElementOption.js";
import PrintReferenceElement from "../08PrintReferenceElement.js";
import PaperHtmlResult from "../06PaperHtmlResult.js";
// import PrintTable from "./16PrintTable.js";
import PrintElementTableRow from "../12PrintElementTableRow.js";
import PrintElementOptionItemManager from "../09PrintElementOptionItemManager.js";

import {PrintElementTypeContext,PrintElementTypeHtmlProvider,PrintElementTypeEntity,PrintElementType} from "../commonEntitys.js";
import PrintPage from "../PrintPage.js";

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
  createTarget(title, data) {
    const target = $('<div class="hiprint-printElement hiprint-printElement-image" style="position: absolute;"><div class="hiprint-printElement-image-content" style="height:100%;width:100%"></div></div>');
    this.updateTargetImage(target, title, data);
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
  updateTargetImage(target, title, imageUrl) {
    const contentElement = target.find(".hiprint-printElement-image-content");
    if (contentElement.find("img").length) {
      contentElement.find("img").attr("src", imageUrl);
    } else {
      contentElement.html('<img style="width:100%;height:100%;" src="' + imageUrl + '">');
    }
    
    if (imageUrl.length) {
      contentElement.find("img").css('cssText', `width:100%;height:100%;content:url("${imageUrl}")!important`);
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