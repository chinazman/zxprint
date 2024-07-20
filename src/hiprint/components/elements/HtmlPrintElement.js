
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
class HtmlPrintElementOption extends PrintElementOption {
  constructor(option) {
    super(option);
  }
}

class HtmlPrintElement extends BasePrintElement {
  constructor(elementType, options) {
    const instance = super(elementType) || this;
    instance.options = new HtmlPrintElementOption(options);
    instance.options.setDefault(
      new HtmlPrintElementOption(
        PrintConfig.instance.html.default
      ).getPrintElementOptionEntity()
    );
    return instance;
  }

  // 从选项更新设计视图
  updateDesignViewFromOptions() {
    if (this.designTarget) {
      const data = this.getData();
      this.css(this.designTarget, data);
      this.updateTargetHtml();
    }
  }

  // 更新目标 HTML
  updateTargetHtml() {
    const formatter = this.getFormatter();
    if (formatter) {
      const htmlContent = formatter(
        this.getData(),
        this.options,
        this._currenttemplateData
      );
      this.designTarget
        .find(".hiprint-printElement-html-content")
        .html(htmlContent);
    }
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.html;
  }

  // 创建目标元素
  createTarget(title, data) {
    const target = $(
      '<div class="hiprint-printElement hiprint-printElement-html" style="position: absolute;"><div class="hiprint-printElement-html-content" style="height:100%;width:100%"></div></div>'
    );
    const formatter = this.getFormatter();
    if (formatter) {
      const htmlContent = formatter(
        this.getData(),
        this.options,
        this._currenttemplateData
      );
      target.find(".hiprint-printElement-html-content").append(htmlContent);
    } else if (this.options.content) {
      target
        .find(".hiprint-printElement-html-content")
        .append(this.options.content);
    }
    return target;
  }

  // 获取 HTML 内容
  getHtml(paper, templateData, extraParam) {
    return this.getHtml2(paper, templateData, extraParam);
  }
}

export default HtmlPrintElement;