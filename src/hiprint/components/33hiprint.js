import {languages,i18n,$,_instanceof,_typeof} from "../hiprint.comm.js";
// 条形码
import JsBarcode from "jsbarcode";
import bwipjs from "bwip-js";
// 水印
import watermark from "../plugins/watermark.js";
//引入标尺
import lImg from "../css/image/l_img.svg";
import vImg from "../css/image/v_img.svg";
// pdf
import { jsPDF } from "jspdf";
import html2canvas from "@wtto00/html2canvas";
// 解析svg 到 canvas, 二维码条形码需要
import Canvg from 'canvg';

import "../plugins/22jquery.hidraggable.js";
import "../plugins/23jquery.hidroppable.js";
import "../plugins/24jquery.hiprintparser.js";
import "../plugins/25jquery.hireizeable.js";
import hinnn from "../components/00hinnn.js";
import "../plugins/26hiwebSocket.js";
//import "../plugins/27css.js";
import "../plugins/32jquery.hicontextMenu.js";
import PrintConfig from "./01PrintConfig.js";
import PrintLib from "./02PrintLib.js";
import PrintTableCell from "./05PrintTableCell.js";
import TablePrintElement from "./15TablePrintElement.js";
import BasePrintElement from "./04BasePrintElement.js";
import PrintElementOption from "./03PrintElementOption.js";
import PrintReferenceElement from "./08PrintReferenceElement.js";
import PaperHtmlResult from "./06PaperHtmlResult.js";
// import PrintTable from "./16PrintTable.js";
import PrintElementTableRow from "./12PrintElementTableRow.js";
import PrintElementOptionItemManager from "./09PrintElementOptionItemManager.js";

import "../plugins/hiLocalStorage.js"

import {PrintElementTypeContext,PrintElementTypeHtmlProvider,PrintElementTypeEntity,PrintElementTypeTable} from "./commonEntitys.js";
import PrintPage from "./PrintPage.js";

import ImagePrintElement from "./elements/ImagePrintElement.js";
import LongTextPrintElement from "./elements/LongTextPrintElement.js";
import TextPrintElement from "./elements/TextPrintElement.js";
import HtmlPrintElement from "./elements/HtmlPrintElement.js";
import VLinePrintElement from "./elements/VLinePrintElement.js";
import HLinePrintElement from "./elements/HLinePrintElement.js";
import RectPrintElement from "./elements/RectPrintElement.js";
import OvalPrintElement from "./elements/OvalPrintElement.js";
import BarcodePrintElement from "./elements/BarcodePrintElement.js";
import QrcodePrintElement from "./elements/QrcodePrintElement.js";

// 打印元素工厂类
class PrintElementFactory {
  static createPrintElement(elementType, options) {
    switch (elementType.type) {
      case "text":
        return new TextPrintElement(elementType, options);
      case "image":
        return new ImagePrintElement(elementType, options);
      case "longText":
        return new LongTextPrintElement(elementType, options);
      case "table":
        return new TablePrintElement(elementType, options);
      case "html":
        return new HtmlPrintElement(elementType, options);
      case "vline":
        return new VLinePrintElement(elementType, options);
      case "hline":
        return new HLinePrintElement(elementType, options);
      case "rect":
        return new RectPrintElement(elementType, options);
      case "oval":
        return new OvalPrintElement(elementType, options);
      case "barcode":
        return new BarcodePrintElement(elementType, options);
      case "qrcode":
        return new QrcodePrintElement(elementType, options);
      default:
        return undefined;
    }
  }
}

// 打印元素类型其他
class PrintElementTypeOther {
  constructor(config) {
    this.field = config.field;
    this.fields = config.fields;
    this.title = config.title;
    this.text = config.text;
    this.tid = config.tid;
    this.data = config.data;
    this.styler = config.styler;
    this.formatter = config.formatter;
    this.type = config.type;
    this.onRendered = config.onRendered;
    this.options = config.options;
  }

  getText(isTitle) {
    return isTitle ? this.title || this.text || "" : this.text || this.title || "";
  }

  getData() {
    return this.data;
  }

  createPrintElement(options) {
    const mergedOptions = {};
    $.extend(mergedOptions, options || {});
    return PrintElementFactory.createPrintElement(this, mergedOptions);
  }

  getPrintElementTypeEntity() {
    return new PrintElementTypeEntity({
      title: this.title,
      type: this.type
    });
  }

  getFields() {
    return this.fields;
  }

  getOptions() {
    return this.options || {};
  }
}

// 打印元素类型文本
class PrintElementTypeText extends PrintElementTypeOther {
  constructor(options) {
    super(options);
  }

  createPrintElement(options) {
    const mergedOptions = {};
    $.extend(mergedOptions, options || {});
    return PrintElementFactory.createPrintElement(this, mergedOptions);
  }

  getPrintElementTypeEntity() {
    return new PrintElementTypeEntity({
      title: this.title,
      type: this.type
    });
  }
}

// 打印元素类型工厂
class PrintElementTypeFactory {
  static createPrintElementType(options) {
    options.type = options.type || "text";
    switch (options.type) {
      case "text":
        return new PrintElementTypeText(options);
      case "table":
        return new PrintElementTypeTable(options);
      default:
        return new PrintElementTypeOther(options);
    }
  }
}

// 打印元素类型管理器
class PrintElementTypeManager {
  static getElementTypeGroups(module) {
    const formattedModule = PrintElementTypeManager.formatterModule(module);
    return PrintElementTypeContext.instance[formattedModule] || [];
  }

  static getElementType(tid, type) {
    if (tid) return PrintElementTypeContext.instance.getElementType(tid);
    return PrintElementTypeFactory.createPrintElementType({
      type: type
    });
  }

  static build(container, module) {
    const formattedModule = PrintElementTypeManager.formatterModule(module);
    const elementTypeHtml = new PrintElementTypeHtmlProvider().createPrintElementTypeHtml(container, this.getElementTypeGroups(formattedModule));
    this.enableDrag(elementTypeHtml);
  }

  static buildByHtml(container) {
    this.enableDrag(container);
  }

  static enableDrag(container) {
    container.hidraggable({
      revert: true,
      proxy: function(source) {
        const dragingElement = PrintLib.instance.getDragingPrintElement();
        const proxyTarget = dragingElement.printElement.getProxyTarget(dragingElement.printElement.printElementType.getOptions());
        proxyTarget.appendTo("body");
        proxyTarget.css("z-index", "9999");
        return proxyTarget;
      },
      moveUnit: "pt",
      minMove: 4,
      onBeforeDrag: function(e) {
        PrintLib.instance.draging = true;
        const tid = $(e.data.target).attr("tid");
        const elementType = PrintElementTypeManager.getElementType(tid, $(e.data.target).attr("ptype"));
        if (!elementType) {
          throw new Error(`${i18n.__('请检查 hiprint.init 的 provider 是否配置了')} [${tid}]`);
        }
        const element = elementType.createPrintElement();
        if (!element) {
          if (elementType.type === 'tableCustom') {
            throw new Error(`${i18n.__("已移除'tableCustom',请替换使用'table'详情见更新记录")}`);
          }
          return false;
        }
        PrintLib.instance.setDragingPrintElement(element);
        return true;
      },
      onDrag: function(e, left, top) {
        PrintLib.instance.getDragingPrintElement().updatePosition(left, top);
      },
      onStopDrag: function(e) {
        PrintLib.instance.draging = false;
      }
    });
  }

  static formatterModule(module) {
    return module || "_default";
  }
}

// 打印元素类型组
class PrintElementTypeGroup {
  constructor(name, options) {
    this.name = name;
    this.printElementTypes = [];
    options.forEach(option => {
      this.printElementTypes.push(PrintElementTypeFactory.createPrintElementType(option));
    });
  }
}

// 打印面板选项
class PrintPanelOption {
  constructor(options) {
    this.index = options.index;
    this.name = options.name;
    this.paperType = options.paperType;

    if (this.paperType) {
      const paperSize = PrintLib.instance[this.paperType];
      if (options.height) {
        this.height = options.height;
        this.width = options.width;
      } else {
        this.height = paperSize.height;
        this.width = paperSize.width;
      }
    } else {
      this.height = options.height;
      this.width = options.width;
    }

    this.paperHeader = options.paperHeader || 0;
    this.paperFooter = options.paperFooter || hinnn.mm.toPt(this.height);
    this.printElements = options.printElements || [];
    this.paperNumberLeft = options.paperNumberLeft;
    this.paperNumberTop = options.paperNumberTop;
    this.paperNumberDisabled = options.paperNumberDisabled;
    this.paperNumberContinue = options.paperNumberContinue;
    this.paperNumberFormat = options.paperNumberFormat;
    this.panelPaperRule = options.panelPaperRule;
    this.panelPageRule = options.panelPageRule;
    this.rotate = options.rotate || undefined;
    this.firstPaperFooter = options.firstPaperFooter;
    this.evenPaperFooter = options.evenPaperFooter;
    this.oddPaperFooter = options.oddPaperFooter;
    this.lastPaperFooter = options.lastPaperFooter;
    this.topOffset = options.topOffset;
    this.fontFamily = options.fontFamily;
    this.leftOffset = options.leftOffset;
    this.orient = options.orient;
    this.scale = options.scale;
    this.watermarkOptions = options.watermarkOptions;
    this.panelLayoutOptions = options.panelLayoutOptions;
  }
}

// 鼠标矩形
class MouseRect {
  constructor(startX, startY, lastLeft, lastTop) {
    this.bx = startX;
    this.by = startY;
    this.ex = startX;
    this.ey = startY;
    this.startX = this.minX = startX;
    this.startY = this.minY = startY;
    this.maxX = startX;
    this.maxY = startY;
    this.lastLeft = lastLeft;
    this.lastTop = lastTop;
  }

  updateRect(endX, endY, context) {
    const scale = context.designPaper.scale || 1.0;
    this.ex = endX;
    this.ey = endY;
    this.minX = Math.min(this.startX / scale, endX / scale);
    this.minY = Math.min(this.startY / scale, endY / scale);
    this.maxX = Math.max(this.startX / scale, endX / scale);
    this.maxY = Math.max(this.startY / scale, endY / scale);
  }

  updatePositionByMultipleSelect(deltaX, deltaY) {
    if (deltaX != null) {
      this.lastLeft += deltaX;
    }
    if (deltaY != null) {
      this.lastTop += deltaY;
    }
    this.target.css({
      left: this.lastLeft + "pt",
      top: this.lastTop + "pt"
    });
  }
}

// 打印面板类
class PrintPanel {
  constructor(panelOptions, templateId) {
    this.templateId = templateId;
    this.index = panelOptions.index;
    this.name = panelOptions.name;
    this.width = panelOptions.width;
    this.height = panelOptions.height;
    this.paperType = panelOptions.paperType;
    this.paperHeader = panelOptions.paperHeader;
    this.paperFooter = panelOptions.paperFooter;
    this.initPrintElements(panelOptions.printElements);
    this.paperNumberLeft = panelOptions.paperNumberLeft;
    this.paperNumberTop = panelOptions.paperNumberTop;
    this.paperNumberDisabled = panelOptions.paperNumberDisabled;
    this.paperNumberContinue = panelOptions.paperNumberContinue === undefined ? true : panelOptions.paperNumberContinue;
    this.paperNumberFormat = panelOptions.paperNumberFormat;
    this.panelPaperRule = panelOptions.panelPaperRule;
    this.panelPageRule = panelOptions.panelPageRule;
    this.firstPaperFooter = panelOptions.firstPaperFooter;
    this.evenPaperFooter = panelOptions.evenPaperFooter;
    this.oddPaperFooter = panelOptions.oddPaperFooter;
    this.lastPaperFooter = panelOptions.lastPaperFooter;
    this.topOffset = panelOptions.topOffset;
    this.leftOffset = panelOptions.leftOffset;
    this.fontFamily = panelOptions.fontFamily;
    this.orient = panelOptions.orient;
    this.target = this.createTarget();
    this.rotate = panelOptions.rotate;
    this.scale = panelOptions.scale;
    this.watermarkOptions = panelOptions.watermarkOptions || {};
    this.panelLayoutOptions = panelOptions.panelLayoutOptions || {};
  }

  // 设计面板
  design(options) {
    const panel = this;
    this.orderPrintElements();
    this.designPaper = this.createNewPage(0);
    this.target.html("");
    this.target.append(this.designPaper.getTarget());
    this.droppablePaper(this.designPaper);
    this.designPaper.design(options);
    this.designPaper.subscribePaperBaseInfoChanged((paperBaseInfo) => {
      panel.paperHeader = paperBaseInfo.paperHeader;
      panel.paperFooter = paperBaseInfo.paperFooter;
      panel.paperNumberLeft = paperBaseInfo.paperNumberLeft;
      panel.paperNumberTop = paperBaseInfo.paperNumberTop;
      panel.paperNumberDisabled = paperBaseInfo.paperNumberDisabled;
      panel.paperNumberFormat = paperBaseInfo.paperNumberFormat;
    });
    this.printElements.forEach((printElement) => {
      panel.appendDesignPrintElement(panel.designPaper, printElement);
      printElement.design(options, panel.designPaper);
    });
    this.target.bind("click.hiprint", (event) => {
      let panelOptions = {
        panelPaperRule: panel.panelPaperRule,
        panelPageRule: panel.panelPageRule,
        firstPaperFooter: panel.firstPaperFooter,
        evenPaperFooter: panel.evenPaperFooter,
        oddPaperFooter: panel.oddPaperFooter,
        lastPaperFooter: panel.lastPaperFooter,
        leftOffset: panel.leftOffset,
        topOffset: panel.topOffset,
        panelLayoutOptions: panel.panelLayoutOptions || {},
        fontFamily: panel.fontFamily,
        orient: panel.orient,
        paperNumberDisabled: panel.paperNumberDisabled,
        paperNumberContinue: panel.paperNumberContinue,
        paperNumberFormat: panel.paperNumberFormat,
        watermarkOptions: panel.watermarkOptions || {}
      };
      if (!PrintConfig.instance.paperNumberContinue) {
        delete panelOptions['paperNumberContinue'];
      }
      hinnn.event.trigger("BuildCustomOptionSettingEventKey_" + panel.templateId, {
        options: panelOptions,
        callback: (updatedOptions) => {
          panel.panelLayoutOptions = updatedOptions.panelLayoutOptions || {};
          panel.watermarkOptions = updatedOptions.watermarkOptions || undefined;
          updatedOptions.watermarkOptions && panel.designPaper.createWaterMark(true, 1, updatedOptions.watermarkOptions);
          panel.panelPaperRule = updatedOptions.panelPaperRule;
          panel.panelPageRule = updatedOptions.panelPageRule;
          panel.firstPaperFooter = updatedOptions.firstPaperFooter;
          panel.evenPaperFooter = updatedOptions.evenPaperFooter;
          panel.oddPaperFooter = updatedOptions.oddPaperFooter;
          panel.lastPaperFooter = updatedOptions.lastPaperFooter;
          panel.leftOffset = updatedOptions.leftOffset;
          panel.topOffset = updatedOptions.topOffset;
          panel.fontFamily = updatedOptions.fontFamily;
          panel.orient = updatedOptions.orient;
          panel.paperNumberDisabled = panel.designPaper.paperNumberDisabled = !!updatedOptions.paperNumberDisabled || undefined;
          panel.paperNumberContinue = panel.designPaper.paperNumberContinue = updatedOptions.paperNumberContinue;
          panel.paperNumberFormat = updatedOptions.paperNumberFormat;
          panel.designPaper.paperNumberFormat = updatedOptions.paperNumberFormat;
          updatedOptions.paperNumberFormat && (panel.designPaper.paperNumberTarget = panel.designPaper.createPaperNumber(panel.designPaper.formatPaperNumber(1, 1), true));
          panel.designPaper.setOffset(panel.leftOffset, panel.topOffset);
          panel.css(panel.target);
          panel.designPaper.resetPaperNumber(panel.designPaper.paperNumberTarget);
          panel.designPaper.triggerOnPaperBaseInfoChanged();
        }
      });
    });
    this.bindShortcutKeyEvent();
    this.bingPasteEvent();
    this.bindBatchMoveElement();
  }

  // 更新面板
  update(panelOptions) {
    try {
      const start = Date.now();
      console.log('start', start);
      const panel = this;
      this.index = panelOptions.index;
      this.name = panelOptions.name;
      this.width = panelOptions.width;
      this.height = panelOptions.height;
      this.paperType = panelOptions.paperType;
      this.paperHeader = panelOptions.paperHeader;
      this.paperFooter = panelOptions.paperFooter;

      this.designPaper.width = hinnn.mm.toPt(panelOptions.width);
      this.designPaper.height = hinnn.mm.toPt(this.height);
      this.designPaper.paperType = this.paperType;
      this.designPaper.paperHeader = this.paperHeader;
      this.designPaper.paperFooter = this.paperFooter;
      this.designPaper.mmheight = panelOptions.height;
      this.designPaper.mmwidth = panelOptions.width;
      // 页眉线
      this.designPaper.headerLinetarget.css("top", (this.paperHeader || -1) + "pt");
      0 == this.paperHeader && this.designPaper.headerLinetarget.addClass("hideheaderLinetarget");
      // 页脚线
      this.designPaper.footerLinetarget.css("top", parseInt(this.paperFooter.toString()) + "pt");
      this.paperFooter == this.height && this.designPaper.footerLinetarget.css("top", panelOptions.height - PrintConfig.instance.paperHeightTrim + "mm");
      // 水印参数
      this.watermarkOptions = panelOptions.watermarkOptions || {};
      this.designPaper.createWaterMark(true, this.index, this.watermarkOptions);
      // 页码
      this.paperNumberLeft = panelOptions.paperNumberLeft;
      this.paperNumberTop = panelOptions.paperNumberTop;
      this.paperNumberDisabled = panelOptions.paperNumberDisabled;
      this.paperNumberContinue = panelOptions.paperNumberContinue;
      this.paperNumberFormat = panelOptions.paperNumberFormat;

      this.designPaper.paperNumberLeft = this.paperNumberLeft;
      this.designPaper.paperNumberTop = this.paperNumberTop;
      this.designPaper.paperNumberDisabled = this.paperNumberDisabled;
      this.designPaper.paperNumberContinue = this.paperNumberContinue;
      this.designPaper.paperNumberFormat = this.paperNumberFormat;

      this.designPaper.paperNumberTarget.css("top", this.paperNumberTop + "pt").css("left", this.paperNumberLeft + "pt");
      this.designPaper.resetPaperNumber(this.designPaper.paperNumberTarget);
      // 字体方向
      this.fontFamily = panelOptions.fontFamily;
      this.orient = panelOptions.orient;
      this.rotate = panelOptions.rotate;
      this.scale = panelOptions.scale;

      this.designPaper.fontFamily = this.fontFamily;
      this.designPaper.orient = this.orient;
      this.designPaper.scale = panel.designPaper.scale || this.scale;
      // 面板参数
      this.panelLayoutOptions = panelOptions.panelLayoutOptions;
      this.panelPaperRule = panelOptions.panelPaperRule;
      this.panelPageRule = panelOptions.panelPageRule;
      this.firstPaperFooter = panelOptions.firstPaperFooter;
      this.evenPaperFooter = panelOptions.evenPaperFooter;
      this.oddPaperFooter = panelOptions.oddPaperFooter;
      this.lastPaperFooter = panelOptions.lastPaperFooter;
      this.topOffset = panelOptions.topOffset;
      this.leftOffset = panelOptions.leftOffset;

      this.designPaper.setFooter(this.firstPaperFooter, this.evenPaperFooter, this.oddPaperFooter, this.lastPaperFooter);
      this.designPaper.setOffset(this.leftOffset, this.topOffset);

      let end = Date.now();
      console.log('更新参数 end', end);
      console.log('更新参数 time:', end - start);
      // 清空面板
      this.printElements.forEach((printElement) => {
        printElement.designTarget && printElement.designTarget.length && printElement.designTarget.remove();
      });
      this.printElements = [];

      end = Date.now();
      console.log('清空面板 end', end);
      console.log('清空面板 time:', end - start);
      // 更新面板
      this.initPrintElements(panelOptions.printElements);
      end = Date.now();
      console.log('初始化元素 end', end);
      console.log('初始化元素 time:', end - start);
      this.printElements.forEach((printElement) => {
        panel.appendDesignPrintElement(panel.designPaper, printElement);
        printElement.design(panelOptions, panel.designPaper);
      });
      end = Date.now();
      console.log('插入面板 end', end);
      console.log('插入面板 time:', end - start);
    } catch (error) {
      console.log('???????');
      console.log(error);
    }
  }

  // 绑定快捷键事件
  bindShortcutKeyEvent() {
    const panel = this;
    $(document).keydown((event) => {
      if ('INPUT' == event.target.tagName) return;
      // ctrl/command + z 撤销 / ctrl/command + shift + z 重做
      if ((event.ctrlKey || event.metaKey) && 90 == event.keyCode) {
        if (event.shiftKey) {
          hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + panel.templateId, "redo");
        } else {
          hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + panel.templateId, "undo");
        }
        event.preventDefault();
      }
    });
  }

  // 绑定粘贴事件
  bingPasteEvent() {
    const panel = this;
    panel.designPaper.target.attr("tabindex", "1");
    panel.designPaper.target.keydown((event) => {
      // ctrl + v / command + v
      if ('INPUT' == event.target.tagName) return;
      if ((event.ctrlKey || event.metaKey) && 86 == event.keyCode) {
        panel.pasteJson(event);
        event.preventDefault();
      }
    });
  }

  // 粘贴JSON
  pasteJson(event) {
    const copyArea = $('#copyArea');
    if (!copyArea.length) return;
    try {
      const json = copyArea.text();
      const objList = JSON.parse(json);
      let operationPasterPosition = null;
      let replacePosition = null;
      let left = null;
      let top = null;
      objList.forEach((obj, index) => {
        if (!obj.printElementType && !obj.templateId) return;
        // 复制使用当前模板内的元素 进行克隆
        // todo: 使用参数创建
        const panel = this;
        const options = obj.options;
        const element = panel.getElementById(obj.id);
        if (!element) return;
        const clonedElement = element.clone(obj);
        if (!clonedElement) return;
        // 判断是否是在元素上进行paste
        if (index === 0) {
          operationPasterPosition = {
            x: obj.options.left,
            y: obj.options.top
          };
          const useMouse = event.currentTarget.className != event.target.className;
          left = !useMouse && panel.mouseOffsetX && hinnn.px.toPt(panel.mouseOffsetX) || (options.left += 10);
          top = !useMouse && panel.mouseOffsetY && hinnn.px.toPt(panel.mouseOffsetY) || (options.top += 10);
          replacePosition = {
            x: left,
            y: top
          };
        } else {
          const position = {
            x: obj.options.left,
            y: obj.options.top
          };
          const incrementPosition = {
            x: position.x - operationPasterPosition.x,
            y: position.y - operationPasterPosition.y
          };
          left = replacePosition.x + incrementPosition.x;
          top = replacePosition.y + incrementPosition.y;
        }
        clonedElement.options.setLeft(left);
        clonedElement.options.setTop(top);
        clonedElement.setTemplateId(panel.templateId);
        clonedElement.setPanel(panel);
        panel.appendDesignPrintElement(panel.designPaper, clonedElement, false);
        // 在复制的地方也重新给他算轮次
        const template = PrintLib.instance.getPrintTemplateById(panel.templateId);
        if (clonedElement.options.field && template.qtDesigner) {
          clonedElement.options.qid = template.qtDesignderFunction(clonedElement.options.field);
        }
        panel.printElements.push(clonedElement);
        clonedElement.design(undefined, panel.designPaper);
        console.log('pasteJson success');
        hinnn.event.trigger("hiprintTemplateDataChanged_" + panel.templateId, "复制");
        // 点击克隆出来的元素
        clonedElement.designTarget.children('.resize-panel').trigger($.Event('click'));
      });
    } catch (error) {
      console.error('pasteJson error', error);
    }
  }

  // 应用CSS样式
  css(target) {
    if (this.fontFamily) {
      target.css("fontFamily", this.fontFamily);
    } else {
      target[0].style.fontFamily = '';
    }
  }

  // 获取配置
  getConfig() {
    return PrintConfig.instance;
  }

  // 获取HTML
  getHtml(printData, paperFooterInfo, paperList, pwidget, settingInfo) {
    const panel = this;
    this.orderPrintElements();
    let config = panel.getConfig();
    let currentPage;
    let pageList = paperList || [];
    let widget = pwidget || this;
    let lastPage;

    if (pwidget) {
      lastPage = pageList[pageList.length - 1];
      currentPage = lastPage.getPanelTarget();
      lastPage.updateReferenceElement(new PrintReferenceElement({
        top: this.paperHeader,
        left: 0,
        height: 0,
        width: 0,
        bottomInLastPaper: lastPage.referenceElement.bottomInLastPaper,
        beginPrintPaperIndex: pageList.length - 1,
        printTopInPaper: lastPage.referenceElement.bottomInLastPaper,
        endPrintPaperIndex: pageList.length - 1
      }));
    } else {
      currentPage = widget.createTarget();
      lastPage = widget.createNewPage(pageList.length);
      pageList.push(lastPage);
      currentPage.append(lastPage.getTarget());
    }
    this.printElements.filter((element) => {
      return !element.isFixed() && !element.isHeaderOrFooter();
    }).forEach((element) => {
      let elementHtmls = [];
      let page = pageList[pageList.length - 1];
      if (page.referenceElement.isPositionLeftOrRight(element.options.getTop())) {
        currentPage = pageList[page.referenceElement.beginPrintPaperIndex];
      } else {
        currentPage = pageList[page.referenceElement.endPrintPaperIndex];
      }
      elementHtmls = element.getHtml(currentPage, printData);
      elementHtmls.forEach((elementHtml, index) => {
        elementHtml.referenceElement && (elementHtml.referenceElement.endPrintPaperIndex = elementHtml.referenceElement.beginPrintPaperIndex + elementHtmls.length - 1);
        if (index > 0) {
          if (currentPage.index < pageList.length - 1) {
            currentPage = pageList[currentPage.index + 1];
          } else {
            currentPage = widget.createNewPage(pageList.length, currentPage.referenceElement);
            pageList.push(currentPage);
          }
          currentPage.append(currentPage.getTarget());
        }
        // 元素隐藏时不添加到html内
        elementHtml.target && ("none" != element.options.showInPage && currentPage.append(elementHtml.target), currentPage.updatePrintLine(elementHtml.printLine), element.onRendered(currentPage, elementHtml.target));
        index == elementHtmls.length - 1 && elementHtml.referenceElement && currentPage.updateReferenceElement(elementHtml.referenceElement);
      });
    });
    settingInfo && settingInfo.templates.forEach((template, index) => {
      const templateData = template.data || {};
      const templateOptions = template.options || {};
      template.template.printPanels.forEach((printPanel) => {
        printPanel.getHtml(templateData, templateOptions, paperList, panel);
      });
    });
    // config 是否开启页码续排
    if (config.paperNumberContinue) {
      // 面板是否页码续排
      if (panel.paperNumberContinue) {
        hinnn._paperList = [...(hinnn._paperList || []), ...pageList];
      } else {
        hinnn._paperList = [...pageList];
      }
    }
    if (!pwidget) {
      if (this.lastPaperFooter) pageList[pageList.length - 1].printLine > this.lastPaperFooter && (currentPage = widget.createNewPage(pageList.length, currentPage.referenceElement), pageList.push(currentPage), currentPage.append(currentPage.getTarget()));
      // 这里是处理奇偶页设置
      this.panelPaperRule && ("odd" == this.panelPaperRule && pageList.length % 2 == 0 && (currentPage = widget.createNewPage(pageList.length, currentPage.referenceElement), pageList.push(currentPage), currentPage.append(currentPage.getTarget())), "even" == this.panelPaperRule && pageList.length % 2 == 1 && (currentPage = widget.createNewPage(pageList.length, currentPage.referenceElement), pageList.push(currentPage), currentPage.append(currentPage.getTarget())));
      pageList.forEach((page) => {
        page.updatePaperNumber(page.index + 1, pageList.length, paperFooterInfo.paperNumberToggleInEven);
        panel.fillPaperHeaderAndFooter(page, printData, pageList.length);
        paperFooterInfo && (null != paperFooterInfo.leftOffset && page.setLeftOffset(paperFooterInfo.leftOffset), null != paperFooterInfo.topOffset && page.setTopOffset(paperFooterInfo.topOffset));
      });
      currentPage.prepend(this.getPrintStyle());
      // config 是否开启页码续排
      if (config.paperNumberContinue) {
        hinnn._paperList.forEach((page, index) => {
          page.updatePaperNumber(index + 1, hinnn._paperList.length);
        });
      }
    }

    return currentPage;
  }

  // 调整大小
  resize(paperType, width, height, rotate) {
    this.width = width;
    this.height = height;
    this.paperType = paperType;
    this.rotate = rotate;
    this.designPaper.resize(width, height);
  }

  // 旋转纸张
  rotatePaper() {
    this.rotate == null && (this.rotate = false);
    this.rotate = !this.rotate;
    this.resize(this.paperType, this.height, this.width, this.rotate);
  }

  // 缩放
  zoom(scale, setScale) {
    if (setScale) {
      this.scale = scale;
    } else {
      this.scale = undefined;
    }
    this.designPaper.zoom(scale);
  }

  // 获取目标元素
  getTarget() {
    return this.target;
  }

  // 启用
  enable() {
    this.target.removeClass("hipanel-disable");
  }

  // 禁用
  disable() {
    this.target.addClass("hipanel-disable");
  }

  // 获取面板实体
  getPanelEntity(isPrintTemplate) {
    const printElements = [];
    this.printElements.forEach((element) => {
      printElements.push(element.getPrintElementEntity(isPrintTemplate));
    });
    return new PrintPanelOption({
      index: this.index,
      name: this.name || this.index + 1,
      width: this.width,
      height: this.height,
      paperType: this.paperType,
      paperHeader: this.paperHeader,
      paperFooter: this.paperFooter,
      paperNumberDisabled: !!this.paperNumberDisabled || undefined,
      paperNumberContinue: this.paperNumberContinue == undefined ? true : this.paperNumberContinue,
      paperNumberFormat: this.paperNumberFormat ? this.paperNumberFormat : undefined,
      panelPaperRule: this.panelPaperRule ? this.panelPaperRule : undefined,
      panelPageRule: this.panelPageRule ? this.panelPageRule : undefined,
      paperNumberLeft: this.paperNumberLeft,
      paperNumberTop: this.paperNumberTop,
      printElements: printElements,
      rotate: this.rotate,
      firstPaperFooter: this.firstPaperFooter,
      evenPaperFooter: this.evenPaperFooter,
      oddPaperFooter: this.oddPaperFooter,
      lastPaperFooter: this.lastPaperFooter,
      topOffset: this.topOffset,
      fontFamily: this.fontFamily,
      orient: this.orient,
      scale: this.scale,
      watermarkOptions: this.watermarkOptions ? this.watermarkOptions : undefined,
      leftOffset: this.leftOffset,
      panelLayoutOptions: this.panelLayoutOptions || {}
    });
  }

  // 创建目标元素
  createTarget() {
    const target = $(`<div class="hiprint-printPanel panel-index-${this.index}"></div>`);
    this.css(target);
    return target;
  }

  // 可拖放纸张
  droppablePaper(paper) {
    const panel = this;
    paper.getTarget().hidroppable({
      accept: ".ep-draggable-item",
      onDrop: (event, ui) => {
        const template = PrintLib.instance.getPrintTemplateById(panel.templateId);
        const draggingElement = PrintLib.instance.getDragingPrintElement();
        const element = draggingElement.printElement;
        const ptr = panel.designPaper.scale || 1;
        const left = (draggingElement.left - hinnn.px.toPt(panel.target.children(".hiprint-printPaper").offset().left)) / ptr;
        const top = (draggingElement.top - hinnn.px.toPt(panel.target.children(".hiprint-printPaper").offset().top)) / ptr;
        element.updateSizeAndPositionOptions(panel.mathroundToporleft(left), panel.mathroundToporleft(top));
        element.setTemplateId(panel.templateId);
        element.setPanel(panel);
        panel.appendDesignPrintElement(panel.designPaper, element, true);
        // 如果说编辑器开启qtDesigner,那么就将唯一ID构建唯一ID生成逻辑代码
        if (element.options.field && template.qtDesigner) {
          element.options.qid = template.qtDesignderFunction(element.options.field);
        }
        panel.printElements.push(element);
        element.design(undefined, paper);
        hinnn.event.trigger("hiprintTemplateDataChanged_" + panel.templateId, "新增");
      }
    });
  }

  // 初始化打印元素
  initPrintElements(printElements) {
    const panel = this;
    this.printElements = [];
    printElements && printElements.forEach((elementOption) => {
      let elementType;

      if (elementType = elementOption.printElementType ? PrintElementTypeFactory.createPrintElementType(elementOption.printElementType) : PrintElementTypeContext.instance.getElementType(elementOption.tid)) {
        const element = elementType.createPrintElement(elementOption.options);
        element.setTemplateId(panel.templateId);
        element.setPanel(panel);
        panel.printElements.push(element);
      } else {
        console.log("miss " + JSON.stringify(printElements));
      }
    });
  }

  // 四舍五入到最近的移动距离
  mathroundToporleft(value) {
    const movingDistance = PrintConfig.instance.movingDistance;
    return Math.round(value / movingDistance) * movingDistance;
  }

  // 添加设计打印元素
  appendDesignPrintElement(paper, element, isDrag) {
    element.setCurrentTemplateData(undefined);
    const target = element.getDesignTarget(paper);
    target.addClass("design");
    isDrag && element.initSizeByHtml(target);
    paper.append(target);
  }

  // 创建新页面
  createNewPage(index, referenceElement) {
    const page = new PrintPage(this.templateId, this.index, this.watermarkOptions, this.panelPageRule, this.scale, this.width, this.height, this.paperHeader, this.paperFooter, this.paperNumberLeft, this.paperNumberTop, this.paperNumberDisabled, this.paperNumberContinue, this.paperNumberFormat, index, referenceElement);
    page.setFooter(this.firstPaperFooter, this.evenPaperFooter, this.oddPaperFooter, this.lastPaperFooter);
    page.setOffset(this.leftOffset, this.topOffset);
    return page;
  }

  // 排序打印元素
  orderPrintElements() {
    this.printElements = hinnn.orderBy(this.printElements, (element) => {
      return element.options.getLeft();
    });
    this.printElements = hinnn.orderBy(this.printElements, (element) => {
      return element.options.getTop();
    });
  }

  // 填充页眉和页脚
  fillPaperHeaderAndFooter(page, printData, paperCount) {
    this.printElements.filter((element) => {
      return element.isFixed() || element.isHeaderOrFooter();
    }).forEach((element) => {
      if (element.isFixed(), element.showInPage(page.index, paperCount)) {
        const elementHtmls = element.getHtml(page, printData);
        elementHtmls.length && page.append(elementHtmls[0].target);
      }
    });
  }

  // 清空
  clear() {
    this.printElements.forEach((element) => {
      element.designTarget && element.designTarget.length && element.designTarget.remove();
    });
    this.printElements = [];
    hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "清空");
  }

  // 插入打印元素到面板
  insertPrintElementToPanel(elementEntity) {
    const elementType = this.getPrintElementTypeByEntity(elementEntity);

    if (elementType) {
      const element = elementType.createPrintElement(elementEntity.options);
      element.setTemplateId(this.templateId);
      element.setPanel(this);
      this.printElements.push(element);
    }
  }

  // 添加文本元素
  addPrintText(options) {
    options.printElementType = options.printElementType || {};
    options.printElementType.type = "text";
    this.insertPrintElementToPanel(options);
  }

  // 添加HTML元素
  addPrintHtml(options) {
    options.printElementType = options.printElementType || {};
    options.printElementType.type = "html";
    this.insertPrintElementToPanel(options);
  }
  // 添加打印表格
  addPrintTable(tableOptions) {
    tableOptions.printElementType = tableOptions.printElementType || {};
    tableOptions.printElementType.type = "table";
    if (tableOptions.options && tableOptions.options.columns) {
      const extendedOptions = $.extend({}, tableOptions.options.columns);
      tableOptions.printElementType.columns = extendedOptions.columns;
      extendedOptions.columns = undefined;
    }
    this.insertPrintElementToPanel(tableOptions);
  }

  // 添加打印图片
  addPrintImage(imageOptions) {
    imageOptions.printElementType = imageOptions.printElementType || {};
    imageOptions.printElementType.type = "image";
    this.insertPrintElementToPanel(imageOptions);
  }

  // 添加打印长文本
  addPrintLongText(longTextOptions) {
    longTextOptions.printElementType = longTextOptions.printElementType || {};
    longTextOptions.printElementType.type = "longText";
    this.insertPrintElementToPanel(longTextOptions);
  }

  // 添加打印垂直线
  addPrintVline(vlineOptions) {
    vlineOptions.printElementType = vlineOptions.printElementType || {};
    vlineOptions.printElementType.type = "vline";
    this.insertPrintElementToPanel(vlineOptions);
  }

  // 添加打印水平线
  addPrintHline(hlineOptions) {
    hlineOptions.printElementType = hlineOptions.printElementType || {};
    hlineOptions.printElementType.type = "hline";
    this.insertPrintElementToPanel(hlineOptions);
  }

  // 添加打印矩形
  addPrintRect(rectOptions) {
    rectOptions.printElementType = rectOptions.printElementType || {};
    rectOptions.printElementType.type = "rect";
    this.insertPrintElementToPanel(rectOptions);
  }

  // 添加打印椭圆
  addPrintOval(ovalOptions) {
    ovalOptions.printElementType = ovalOptions.printElementType || {};
    ovalOptions.printElementType.type = "oval";
    this.insertPrintElementToPanel(ovalOptions);
  }

  // 根据实体获取打印元素类型
  getPrintElementTypeByEntity(entity) {
    let elementType;
    elementType = entity.tid ? PrintElementTypeContext.instance.getElementType(entity.tid) : PrintElementTypeFactory.createPrintElementType(entity.printElementType);
    if (!elementType) {
      console.log("miss " + JSON.stringify(entity));
    }
    return elementType;
  }

  // 获取打印样式
  getPrintStyle() {
    let layoutStyle = '';
    if (this.panelLayoutOptions && this.panelLayoutOptions['layoutType'] === 'row') {
      layoutStyle = `
        <style>
        .hiprint-printTemplate{
          margin: -${(Number(this.panelLayoutOptions['layoutRowGap']) || 0) / 2}mm -${(Number(this.panelLayoutOptions['layoutColumnGap']) || 0) / 2}mm;
        }
          .hiprint-printTemplate .hiprint-printPanel {
            display:inline-block;
            padding: ${(Number(this.panelLayoutOptions['layoutRowGap']) || 0) / 2}mm ${(Number(this.panelLayoutOptions['layoutColumnGap']) || 0) / 2}mm;
          }
        </style>
      `;
    }
    return layoutStyle + " <style printStyle>\n        @page\n        {\n             border:0;\n             padding:0cm;\n             margin:0cm;\n             " + this.getPrintSizeStyle() + "\n        }\n        </style>\n";
  }

  // 获取打印尺寸样式
  getPrintSizeStyle() {
    return this.paperType ? "size:" + this.paperType + " " + (this.height > this.width ? "portrait" : "landscape") + ";" : "size: " + this.width + "mm " + this.height + "mm " + (this.orient ? 1 == this.orient ? "portrait" : "landscape" : "") + ";";
  }

  // 删除打印元素
  deletePrintElement(element) {
    this.printElements.filter((item, index) => {
      if (item.id == element.id) {
        element.delete();
        this.printElements.splice(index, 1);
      }
    });
  }

  // 通过tid获取元素
  getElementByTid(tid) {
    return this.printElements.filter(item => item.printElementType.tid === tid).map((item, index) => item);
  }

  // 通过名称获取元素
  getElementByName(name) {
    return this.printElements.filter(item => item.options.name === name).map((item, index) => item);
  }

  // 通过id获取元素
  getElementById(id) {
    return this.printElements.find(item => item.id === id);
  }

  // 获取面板中的字段
  getFieldsInPanel() {
    const fields = [];
    this.printElements.forEach(item => {
      if (item.options && item.options.field) {
        fields.push(item.options.field);
      } else if (item.printElementType.field) {
        fields.push(item.printElementType.field);
      }
    });
    return fields;
  }

  // 获取测试数据
  getTestData() {
    const testData = {};
    this.printElements.forEach(item => {
      if (item.printElementType.type != "table") {
        if (item.options && item.options.field) {
          testData[item.options.field] = item.options.testData;
        } else if (item.printElementType.field) {
          testData[item.printElementType.field] = item.printElementType.data || item.options.testData;
        }
      }
    });
    return testData;
  }

  // 绑定批量移动元素
  bindBatchMoveElement() {
    this.designPaper.getTarget().on("mousemove", event => {
      if (event.target.className && typeof event.target.className == "string" && event.target.className.includes("editing")) {
        return;
      }
      if (event.currentTarget.className == this.designPaper.target[0].className) {
        this.mouseOffsetX = event.offsetX;
        this.mouseOffsetY = event.offsetY;
      } else {
        this.mouseOffsetX = this.mouseOffsetY = undefined;
      }
      if (!PrintLib.instance.draging && event.buttons === 1 && PrintLib.instance.rectDraging && this.mouseRect) {
        this.mouseRect.updateRect(event.pageX, event.pageY, this);
        this.updateRectPanel(this.mouseRect);
      }
    }).on("mousedown", event => {
      PrintLib.instance.rectDraging = true;
      if (event.target.className && typeof event.target.className == "string" && event.target.className.includes("editing")) {
        return;
      }
      if (!PrintLib.instance.draging) {
        if (this.mouseRect && this.mouseRect.target) {
          this.mouseRect.target.remove();
        }
        if (event.buttons === 1 && typeof event.target.className == "string" && event.target.className.includes("hiprint-printPaper hidroppable design")) {
          this.mouseRect = new MouseRect(event.pageX, event.pageY, PrintLib.instance.dragLengthCNum(event.pageX - this.designPaper.getTarget().offset().left, PrintConfig.instance.movingDistance), PrintLib.instance.dragLengthCNum(event.pageY - this.designPaper.getTarget().offset().top, PrintConfig.instance.movingDistance));
        }
      }
    }).on("mouseup", event => {
      PrintLib.instance.rectDraging = false;
    });
  }

  // 获取矩形内的元素
  getElementInRect(rect) {
    const elementsInRect = [];
    this.printElements.filter(item => item.options.draggable !== false).forEach(item => {
      if (item.inRect(rect)) {
        elementsInRect.push(item);
      }
    });
    return elementsInRect;
  }

  // 更新矩形面板
  updateRectPanel(rect) {
    const designTarget = this.designPaper.getTarget();
    const scale = this.designPaper.scale || 1;
    if (!this.mouseRect.target) {
      this.mouseRect.target = $('<div tabindex="1" class="mouseRect" style="z-index:2;position: absolute;opacity:0.2;border: 1px dashed #000;background-color:#31676f;"><span></span></div>');
      designTarget.find(".hiprint-printPaper-content").append(this.mouseRect.target);
      this.bindKeyboardMoveEvent(this.mouseRect.target);
      this.mouseRect.target.hidraggable({
        onDrag: (event, left, top) => {
          this.mouseRect.lastLeft = this.mouseRect.lastLeft ? hinnn.px.toPt(this.mouseRect.target[0].offsetLeft) : left / scale;
          this.mouseRect.lastTop = this.mouseRect.lastTop ? hinnn.px.toPt(this.mouseRect.target[0].offsetTop) : top / scale;
          (this.mouseRect.mouseRectSelectedElement || []).forEach(element => {
            element.updatePositionByMultipleSelect(left - this.mouseRect.lastLeft, top - this.mouseRect.lastTop);
          });
          this.mouseRect.lastLeft = left / scale;
          this.mouseRect.lastTop = top / scale;
          PrintLib.instance.changed = true;
        },
        moveUnit: "pt",
        minMove: PrintConfig.instance.movingDistance,
        onBeforeDrag: event => {
          this.mouseRect.target.focus();
          PrintLib.instance.draging = true;
          if (!this.mouseRect.mouseRectSelectedElement) {
            this.mouseRect.mouseRectSelectedElement = this.getElementInRect(this.mouseRect);
          }
          this.mouseRect.target.css({
            transform: 'unset'
          });
        },
        getScale: () => {
          return this.designPaper.scale || 1;
        },
        onStopDrag: event => {
          if (PrintLib.instance.changed) hinnn.event.trigger("hiprintTemplateDataChanged_" + designTarget.templateId, "框选移动");
          PrintLib.instance.draging = false;
          PrintLib.instance.changed = false;
        }
      });
    }
    if (rect.ex >= rect.bx && rect.ey >= rect.by) {
      // 终点大于起点
      this.mouseRect.target.css({
        height: rect.maxY - rect.minY + "px",
        width: rect.maxX - rect.minX + "px",
        left: rect.lastLeft / scale + "pt",
        top: rect.lastTop / scale + "pt",
        transform: 'unset'
      });
    } else if (rect.ex < rect.bx && rect.ey < rect.by) {
      this.mouseRect.target.css({
        height: rect.maxY - rect.minY + "px",
        width: rect.maxX - rect.minX + "px",
        left: rect.lastLeft / scale + "pt",
        top: rect.lastTop / scale + "pt",
        transform: 'rotate(180deg)',
        'transform-origin': '0 0'
      });
    } else if (rect.ex < rect.bx && rect.ey > rect.by) {
      // 左下角
      this.mouseRect.target.css({
        height: rect.maxY - rect.minY + "px",
        width: rect.maxX - rect.minX + "px",
        left: rect.lastLeft / scale + "pt",
        top: rect.lastTop / scale + "pt",
        transform: 'rotateY(180deg)',
        'transform-origin': '0 0'
      });
    } else if (rect.ex > rect.bx && rect.ey < rect.by) {
      this.mouseRect.target.css({
        height: rect.maxY - rect.minY + "px",
        width: rect.maxX - rect.minX + "px",
        left: rect.lastLeft / scale + "pt",
        top: rect.lastTop / scale + "pt",
        transform: 'rotateX(180deg)',
        'transform-origin': '0 0'
      });
    }
    rect.target.focus();
  }

  // 绑定键盘移动事件
  bindKeyboardMoveEvent(target) {
    target.attr("tabindex", "1");
    target.keydown(event => {
      if (!this.mouseRect.mouseRectSelectedElement) {
        this.mouseRect.mouseRectSelectedElement = this.getElementInRect(this.mouseRect);
      }
      const selectedElements = this.mouseRect.mouseRectSelectedElement || [];

      switch (event.keyCode) {
        case 37: // 左箭头
          this.mouseRect.updatePositionByMultipleSelect(0 - PrintConfig.instance.movingDistance, 0);
          selectedElements.forEach(element => {
            element.updatePositionByMultipleSelect(0 - PrintConfig.instance.movingDistance, 0);
          });
          event.preventDefault();
          break;
        case 38: // 上箭头
          this.mouseRect.updatePositionByMultipleSelect(0, 0 - PrintConfig.instance.movingDistance);
          selectedElements.forEach(element => {
            element.updatePositionByMultipleSelect(0, 0 - PrintConfig.instance.movingDistance);
          });
          event.preventDefault();
          break;
        case 39: // 右箭头
          this.mouseRect.updatePositionByMultipleSelect(PrintConfig.instance.movingDistance, 0);
          selectedElements.forEach(element => {
            element.updatePositionByMultipleSelect(PrintConfig.instance.movingDistance, 0);
          });
          event.preventDefault();
          break;
        case 40: // 下箭头
          this.mouseRect.updatePositionByMultipleSelect(0, PrintConfig.instance.movingDistance);
          selectedElements.forEach(element => {
            element.updatePositionByMultipleSelect(0, PrintConfig.instance.movingDistance);
          });
          event.preventDefault();
      }
      if ([37, 38, 39, 40].includes(event.keyCode)) {
        hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "框选移动");
      }
    });
  }
}
class PanelOptionCollection {
  constructor(panelData) {
    // 如果 panelData 有效且包含 panels 属性
    if (panelData && panelData.panels) {
      this.panels = [];

      // 遍历 panels 数组,创建 PrintPanelOption 对象并添加到 this.panels 数组
      for (let panelIndex = 0; panelIndex < panelData.panels.length; panelIndex++) {
        this.panels.push(new PrintPanelOption(panelData.panels[panelIndex]));
      }
    } else {
      this.panels = [];
    }
  }
}

// 设置容器事件管理器类
class SettingContainerEventManager {
  constructor(printTemplate, settingContainerSelector) {
    this.printElementOptionSettingPanel = {};
    this.printTemplate = printTemplate;
    this.settingContainer = $(settingContainerSelector);

    // 监听打印元素选择事件
    hinnn.event.on(printTemplate.getPrintElementSelectEventKey(), (eventData) => {
      this.buildSetting(eventData);
    });

    // 监听自定义选项设置事件
    hinnn.event.on(printTemplate.getBuildCustomOptionSettingEventKey(), (customOptions) => {
      this.buildSettingByCustomOptions(customOptions);
    });

    // 监听清除设置容器事件
    hinnn.event.on('clearSettingContainer', () => {
      this.clearSettingContainer();
    });
  }

  // 初始化方法
  init() {}

  // 清除设置容器
  clearSettingContainer() {
    this.clearLastPrintElement();
    this.settingContainer.html("");
  }

  // 清除上一个打印元素
  clearLastPrintElement() {
    if (this.lastPrintElement) {
      if (this.lastPrintElement._editing) {
        this.lastPrintElement.updateByContent(true);
      }
      if (this.lastPrintElement._printElementOptionTabs) {
        this.lastPrintElement._printElementOptionTabs.forEach((tab) => {
          tab.list && tab.list.forEach((item) => {
            item.destroy();
          });
        });
      }
      if (this.lastPrintElement._printElementOptionItems) {
        this.lastPrintElement._printElementOptionItems.forEach((item) => {
          item.destroy();
        });
      }
    }
    this.lastPrintElement = undefined;
  }

  // 构建设置面板
  buildSetting(eventData) {
    const self = this;
    const printElement = eventData.printElement;
    const customOptionsInput = eventData.customOptionsInput;
    const tabs = printElement.getPrintElementOptionTabs();

    self.clearSettingContainer();

    let settingContent;
    if (tabs.length) {
      // 创建选项卡结构
      settingContent = $('<div class="prop-tabs"><ul class="prop-tab-items"></ul></div>');
      tabs.forEach((tab) => {
        const tabItem = $('<li class="prop-tab-item"><span class="tab-title">' + i18n.__(tab.name) + '</span></li>');
        settingContent.find('.prop-tab-items').append(tabItem);
        const optionsContainer = $('<div class="hiprint-option-items" data-title="' + i18n.__(tab.name) + '"></div>');
        
        tab.list.forEach((optionItem) => {
          optionItem.submit = (formData) => {
            printElement.submitOption();
          };
          const optionTarget = optionItem.createTarget(printElement, printElement.options, printElement.printElementType);
          self.printElementOptionSettingPanel[optionItem.name] = optionTarget;
          optionsContainer.append(optionTarget);
          
          // 设置选项值
          if (['columns', 'dataType'].includes(optionItem.name)) {
            optionItem.setValue(printElement.options[optionItem.name], printElement.options, printElement.printElementType);
          } else if (['coordinate', 'widthHeight'].includes(optionItem.name)) {
            optionItem.setValue(printElement.options, printElement);
          } else {
            optionItem.setValue(printElement.options[optionItem.name] || printElement.printElementType[optionItem.name]);
          }
          
          optionTarget.find("textarea").bind("dblclick.textarea", function(event) {
            if (!$(this).val()) {
              const placeholder = event.target.placeholder || "";
              $(this).val(placeholder);
            }
          });
        });

        // 处理自定义选项
        if (tab.list.length == 0 && customOptionsInput && customOptionsInput.length) {
          customOptionsInput.forEach((customOption) => {
            const originalCallback = customOption.callback;
            customOption.callback = (data) => {
              originalCallback && originalCallback(data);
            };
            const tableColumn = customOption.optionItems;
            customOption.title && optionsContainer.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + customOption.title + "\n            </div>\n        </div>");
            
            tableColumn.forEach((columnItem) => {
              columnItem.submit = (formData) => {
                customOption.callback(self.getValueByOptionItems(tableColumn));
              };
              optionsContainer.append(columnItem.createTarget(self.printTemplate, customOption.options, undefined));
              columnItem.setValue(customOption.options[columnItem.name], customOption.options, undefined);
            });
            
            optionsContainer.find('.auto-submit').change(function() {
              customOption.callback(self.getValueByOptionItems(tableColumn));
            });
            optionsContainer.find('.auto-submit:input').bind('keydown.submitOption', function(event) {
              if (event.keyCode === 13) {
                customOption.callback(self.getValueByOptionItems(tableColumn));
              }
            });
            optionsContainer.find("textarea").bind("dblclick.textarea", function(event) {
              if (!$(this).val()) {
                const placeholder = event.target.placeholder || "";
                $(this).val(placeholder);
              }
            });
          });
        }
        settingContent.append(optionsContainer);
      });
    } else {
      // 创建单一选项列表
      settingContent = $('<div class="hiprint-option-items"></div>');
      printElement.getPrintElementOptionItems().forEach((optionItem) => {
        optionItem.submit = (formData) => {
          printElement.submitOption();
        };

        const optionTarget = optionItem.createTarget(printElement, printElement.options, printElement.printElementType);
        self.printElementOptionSettingPanel[optionItem.name] = optionTarget;
        settingContent.append(optionTarget);
        
        // 设置选项值
        if (['columns', 'dataType'].includes(optionItem.name)) {
          optionItem.setValue(printElement.options[optionItem.name], printElement.options, printElement.printElementType);
        } else if (['coordinate', 'widthHeight'].includes(optionItem.name)) {
          optionItem.setValue(printElement.options, printElement);
        } else {
          optionItem.setValue(printElement.options[optionItem.name] || printElement.printElementType[optionItem.name]);
        }
      });
    }

    // 添加确定和删除按钮
    const submitButton = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn" type="button">${i18n.__('确定')}</button>`);
    const deleteButton = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-deleteBtn" type="button">${i18n.__('删除')}</button>`);
    settingContent.append(submitButton);
    printElement.options.draggable !== false && settingContent.append(deleteButton);

    // 为选项卡添加点击事件
    if (tabs.length) {
      settingContent.on('click', '.prop-tab-item', function() {
        const $li = $(this);
        const index = $li.index();
        self.settingContainer.data('last-index', index);
        $li.addClass('active');
        $li.siblings().removeClass('active');
        const options = settingContent.find('.hiprint-option-items:eq(' + index + ')');
        options.addClass('active');
        options.siblings().removeClass('active');
      });
      let lastIndex = +(self.settingContainer.data('last-index') || 0);
      if (lastIndex >= tabs.length) {
        lastIndex = 0;
      }
      settingContent.find('.prop-tab-item:eq(' + lastIndex + ')').click();
    }

    // 绑定按钮事件
    submitButton.bind("click.submitOption", () => {
      printElement.submitOption();
    });
    deleteButton.bind("click.deleteBtn", () => {
      hinnn.event.trigger("hiprintTemplateDataChanged_" + printElement.templateId, "删除");
      self.printTemplate.deletePrintElement(printElement);
      self.clearSettingContainer();
    });
    settingContent.find(".auto-submit").change(() => {
      printElement.submitOption();
    });
    settingContent.find(".auto-submit:input").bind("keydown.submitOption", (event) => {
      if (event.keyCode == 13) printElement.submitOption();
    });

    this.settingContainer.append(settingContent);

    // 处理自定义选项
    if (tabs.length < 1 && customOptionsInput) {
      customOptionsInput.forEach((customOption) => {
        const originalCallback = customOption.callback;
        customOption.callback = (data) => {
          originalCallback && (originalCallback(data), printElement.submitOption());
        };
        self.buildSettingByCustomOptions(customOption, self.settingContainer);
      });
    }

    this.lastPrintElement = printElement;
  }

  // 根据自定义选项构建设置
  buildSettingByCustomOptions(customOption, container) {
    const self = this;
    this.clearLastPrintElement();
    const targetContainer = container || this.settingContainer;
    if (!container) this.settingContainer.html("");

    const optionItems = [];
    const supportOptions = PrintConfig.instance.panel.supportOptions.filter((option) => !option.hidden).map((option) => option.name);

    if (customOption.optionItems) {
      optionItems.push(...customOption.optionItems);
    } else {
      Object.keys(customOption.options).filter((key) => supportOptions.includes(key)).forEach((key) => {
        const optionItem = PrintElementOptionItemManager.getItem(key);
        optionItem && optionItems.push(optionItem);
      });
    }

    const optionsContainer = $('<div class="hiprint-option-items"></div>');
    customOption.title && optionsContainer.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + customOption.title + "\n            </div>\n        </div>");
    
    optionItems.forEach((optionItem) => {
      optionItem.submit = (formData) => {
        customOption.callback(self.getValueByOptionItems(optionItems));
      };
      optionsContainer.append(optionItem.createTarget(self.printTemplate, customOption.options, undefined));
      optionItem.setValue(customOption.options[optionItem.name], customOption.options, undefined);
    });

    const submitButton = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn" type="button">${i18n.__('确定')}</button>`);
    optionsContainer.append(submitButton);

    submitButton.bind("click.submitOption", () => {
      customOption.callback(self.getValueByOptionItems(optionItems));
    });
    optionsContainer.find(".auto-submit").change(() => {
      customOption.callback(self.getValueByOptionItems(optionItems));
    });
    optionsContainer.find(".auto-submit:input").bind("keydown.submitOption", (event) => {
      if (event.keyCode == 13) customOption.callback(self.getValueByOptionItems(optionItems));
    });

    targetContainer.append(optionsContainer);
  }

  // 获取选项值
  getValueByOptionItems(optionItems) {
    const result = {};
    optionItems.forEach((item) => {
      result[item.name] = item.getValue();
    });
    return result;
  }
}

// 打印分页创建器类
class PrintPaginationCreator {
  constructor(paginationContainer, template) {
    this.paginationContainer = paginationContainer;
    this.jqPaginationContainer = $(this.paginationContainer);
    this.template = template;
  }

  // 构建分页
  buildPagination() {
    const panelTotal = this.template.getPaneltotal();
    const self = this;
    this.jqPaginationContainer.html("");

    const paginationList = $('<ul class="hiprint-pagination"></ul>');

    // 创建面板列表项
    const createPanelItem = (index) => {
      const panelIndex = index;
      const panelName = self.template.printPanels[panelIndex].name || panelIndex + 1;
      const panelItem = $("<li><span>" + panelName + '</span><a href="javascript:void(0);">x</a></li>');

      panelItem.find("span").click(function() {
        self.template.selectPanel(panelIndex);
        panelItem.siblings().removeClass("selected");
        $(this).parent("li").addClass("selected");
      });

      panelItem.find("a").click(function() {
        self.template.deletePanel(panelIndex);
        self.buildPagination();
      });

      paginationList.append(panelItem);
    };

    for (let index = 0; index < panelTotal; index++) {
      createPanelItem(index);
    }

    // 添加新面板按钮
    const addPanelButton = $("<li><span>+</span></li>");
    paginationList.append(addPanelButton);
    this.jqPaginationContainer.append(paginationList);

    addPanelButton.click(function() {
      const createPanel = (options) => {
        self.template.addPrintPanel(options || undefined, true);
        self.buildPagination();
        $('.hiprint-pagination li').removeClass('selected');
        $('.hiprint-pagination li:nth-last-child(2)').addClass('selected');
      };

      if (self.template.onPanelAddClick) {
        const panel = {
          index: self.template.printPanels.length,
          paperType: "A4"
        };
        self.template.onPanelAddClick(panel, createPanel);
      } else {
        createPanel();
      }
    });
  }

  // 选择面板
  selectPanel(idx) {
    const panelIndex = idx || this.template.editingPanel.index;
    const panelItem = $('.hiprint-pagination li:nth(' + panelIndex + ')');
    if (panelItem.length) {
      panelItem.siblings().removeClass('selected');
      panelItem.addClass("selected");
    }
    hinnn.event.trigger("onSelectPanel", this.template.editingPanel, panelIndex, panelItem);
  }
}

class PrintTemplate {
  // 构造函数
  constructor(options) {
    let templateOptions = this;
    this.tempimageBase64 = {};
    this.id = PrintLib.instance.guid();
    PrintLib.instance.setPrintTemplateById(this.id, this);
    
    let initOptions = options || {};
    this.printPanels = [];
    this.dataMode = initOptions.dataMode || 1;
    this.history = initOptions.history !== undefined ? initOptions.history : true;
    this.willOutOfBounds = initOptions.willOutOfBounds !== undefined ? initOptions.willOutOfBounds : true;
    this.onDataChanged = initOptions.onDataChanged;
    this.onUpdateError = initOptions.onUpdateError;
    this.lastJson = initOptions.template || {};
    this.historyList = [{ id: PrintLib.instance.guid(), type: '初始', json: this.lastJson }];
    this.historyPos = 0;
    this.defaultPanelName = initOptions.defaultPanelName;
    this.designOptions = {};
    this.qtDesigner = initOptions.qtDesigner !== undefined ? initOptions.qtDesigner : true;
    this.qtDesignerMap = {};
    this.qtDesignderFunction = function (field) {
      this.qtDesignerMap = {};
      const fieldTitle = field.split("_")[0];
      for (const item of this.editingPanel.printElements) {
        if (item.options.field === undefined) {
          continue;
        }
        const renderKey = item.options.field.split("_")[0];
        if (this.qtDesignerMap[renderKey] === undefined) {
          this.qtDesignerMap[renderKey] = 1;
        } else {
          this.qtDesignerMap[renderKey] += 1;
        }
      }
      if (this.qtDesignerMap[fieldTitle] === 0 || this.qtDesignerMap[fieldTitle] === undefined) {
        return fieldTitle;
      } else {
        return fieldTitle + "_" + this.qtDesignerMap[fieldTitle];
      }
    };
    
    let panelOptions = new PanelOptionCollection(initOptions.template || []);
    if (initOptions.template) {
      panelOptions.panels.forEach(function (panelOption) {
        templateOptions.printPanels.push(new PrintPanel(panelOption, templateOptions.id));
      });
    }
    
    if (initOptions.fontList) this.fontList = initOptions.fontList;
    if (initOptions.fields) this.fields = initOptions.fields;
    if (initOptions.onImageChooseClick) this.onImageChooseClick = initOptions.onImageChooseClick;
    if (initOptions.onPanelAddClick) this.onPanelAddClick = initOptions.onPanelAddClick;
    if (initOptions.settingContainer) new SettingContainerEventManager(this, initOptions.settingContainer);
    if (initOptions.paginationContainer) {
      this.printPaginationCreator = new PrintPaginationCreator(initOptions.paginationContainer, this);
      this.printPaginationCreator.buildPagination();
    }
    this.initAutoSave();
  }

  // 设计方法
  design(container, options) {
    let templateOptions = this;

    if (!options) options = {};
    if (this.printPanels.length == 0) {
      let defaultPanel = this.createDefaultPanel();
      this.printPanels.push(defaultPanel);
    }

    if (!container) throw new Error("options.container cannot be empty");
    templateOptions.designOptions = options;
    this.createContainer(container);
    this.printPanels.forEach(function (panel, index) {
      templateOptions.container.append(panel.getTarget());
      if (index > 0) panel.disable();
      panel.design(options);
    });
    this.selectPanel(0);
  }

  // 获取简单HTML
  getSimpleHtml(data, options) {
    let templateOptions = this;
    if (!options) options = {};
    let container = $('<div class="hiprint-printTemplate"></div>');
    if (data && data.constructor === Array) {
      data.forEach(function(item, index) {
        if (item) {
          templateOptions.printPanels.forEach(function(panel, panelIndex) {
            container.append(panel.getHtml(item, options));
            // 批量打印 续排页码
            if (index == data.length - 1) {
              delete hinnn._paperList;
            }
          });
        }
      });
    } else {
      this.printPanels.forEach(function(panel, panelIndex) {
        container.append(panel.getHtml(data, options));
        // 多面板打印 续排页码
        if (panelIndex == templateOptions.printPanels.length - 1) {
          delete hinnn._paperList;
        }
      });
    }
    if (options && options.imgToBase64) {
      this.transformImg(container.find("img"));
    }
    return container;
  }

  // 获取HTML
  getHtml(data, options) {
    if (!data) data = {};
    return this.getSimpleHtml(data, options);
  }

  // 获取联合HTML
  getJointHtml(data, options, callback) {
    let container = $('<div class="hiprint-printTemplate"></div>');
    let printData = [];
    this.printPanels.forEach(function(panel, index) {
      container.append(panel.getHtml(data, options, printData, undefined, callback));
    });
    return container;
  }

  // 设置纸张
  setPaper(paperType, width) {
    if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(paperType)) {
      this.editingPanel.resize(undefined, parseFloat(paperType), parseFloat(width), false);
    } else {
      let paperSize = PrintLib.instance[paperType];
      if (!paperSize) throw new Error("not found pagetype:" + (paperType || ""));
      this.editingPanel.resize(paperType, paperSize.width, paperSize.height, false);
    }
  }

  // 旋转纸张
  rotatePaper() {
    this.editingPanel.rotatePaper();
  }

  // 缩放
  zoom(scale, center) {
    this.editingPanel.zoom(scale, center);
  }

  // 添加打印面板
  addPrintPanel(options, index) {
    let panel = options ? new PrintPanel(new PrintPanelOption(options), this.id) : this.createDefaultPanel();
    if (options) {
      options.index = this.printPanels.length;
    }
    if (index) {
      this.container.append(panel.getTarget());
      panel.design(this.designOptions);
    }
    this.printPanels.push(panel);
    if (index) {
      this.selectPanel(panel.index);
    }
    return panel;
  }

  // 选择面板
  selectPanel(index) {
    let templateOptions = this;
    if (index > templateOptions.printPanels.length - 1) index = templateOptions.printPanels.length - 1;
    this.printPanels.forEach(function(panel, i) {
      if (index == i) {
        panel.enable();
        templateOptions.editingPanel = panel;
        templateOptions.printPaginationCreator && templateOptions.printPaginationCreator.selectPanel(index);
      } else {
        panel.disable();
      }
    });
  }

  // 删除面板
  deletePanel(index) {
    this.printPanels[index].clear();
    this.printPanels[index].getTarget().remove();
    this.printPanels.splice(index, 1);
  }

  // 获取面板总数
  getPaneltotal() {
    return this.printPanels.length;
  }

  // 创建默认面板
  createDefaultPanel() {
    return new PrintPanel(new PrintPanelOption({
      index: this.printPanels.length,
      name: this.defaultPanelName,
      paperType: "A4"
    }), this.id);
  }

  // 创建容器
  createContainer(container) {
    if (container) {
      this.container = $(container);
      this.container.addClass("hiprint-printTemplate");
    } else {
      this.container = $('<div class="hiprint-printTemplate"></div>');
    }
  }

  // 获取JSON TID
  getJsonTid() {
    let panels = [];
    this.printPanels.forEach(function(panel) {
      if (panel.getPanelEntity().printElements.length) {
        panels.push(panel.getPanelEntity());
      }
    });
    return new PanelOptionCollection({
      panels: panels
    });
  }

  // 获取JSON
  getJson() {
    let panels = [];
    this.printPanels.forEach(function(panel) {
      panels.push(panel.getPanelEntity(true));
    });
    return new PanelOptionCollection({
      panels: panels
    });
  }

  // 撤销
  undo(callback) {
    hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "undo");
  }

  // 重做
  redo(callback) {
    hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "redo");
  }

  // 获取打印元素选择事件键
  getPrintElementSelectEventKey() {
    return "PrintElementSelectEventKey_" + this.id;
  }

  // 获取构建自定义选项设置事件键
  getBuildCustomOptionSettingEventKey() {
    return "BuildCustomOptionSettingEventKey_" + this.id;
  }

  // 清除
  clear() {
    this.printPanels.forEach(function(panel) {
      if (panel.clear(), panel.index > 0) {
        let target = panel.getTarget();
        target && target.length && target.remove();
      }
    });
    this.printPanels = [this.printPanels[0]];
    this.printPaginationCreator && this.printPaginationCreator.buildPagination();
  }

  // 获取纸张类型
  getPaperType(index) {
    if (index == null) index = 0;
    return this.printPanels[0].paperType;
  }

  // 获取方向
  getOrient(index) {
    if (index == null) index = 0;
    return this.printPanels[index].height > this.printPanels[index].width ? 1 : 2;
  }

  // 获取打印样式
  getPrintStyle(index) {
    return this.printPanels[index].getPrintStyle();
  }

  // 打印
  print(data, options, callback) {
    if (!data) data = {};
    this.getHtml(data, options).hiwprint(callback);
  }

  // 打印2
  print2(data, options) {
    if (!data) data = {};
    if (!options) options = {};
    if (this.clientIsOpened()) {
      let templateOptions = this;
      let cssIndex = 0;
      let cssMap = {};
      let printCss = $('link[media=print][href*="print-lock.css"]');
      let css = '';
      if (options.styleHandler) {
        css += options.styleHandler();
      }
      if (printCss.length <= 0) {
        throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
        return;
      }
      printCss.each(function(index, item) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", $(item).attr("href"));
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            cssMap[index + ""] = '<style rel="stylesheet" type="text/css">' + xhr.responseText + "</style>";
            if (++cssIndex == printCss.length) {
              let allCss = "";
              for (let i = 0; i < printCss.length; i++) {
                allCss += cssMap[i + ""];
              }
              if (css) allCss = css + allCss;
              templateOptions.sentToClient(allCss, data, options);
            }
          }
        };
        xhr.send();
      });
    } else {
      alert(`${i18n.__('连接客户端失败')}`);
    }
  }

  // 图片转Base64
  imageToBase64(image) {
    let src = $(image).attr("src");
    if (src.indexOf("base64") == -1) {
      try {
        if (!this.tempimageBase64[src]) {
          let canvas = document.createElement("canvas");
          let img = new Image();
          img.src = image.attr("src");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);
          if (src) {
            this.tempimageBase64[src] = canvas.toDataURL("image/png");
          }
        }
        image.attr("src", this.tempimageBase64[src]);
      } catch (error) {
        try {
          this.xhrLoadImage(image);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  // XHR加载图片
  xhrLoadImage(image) {
    // 实现XHR加载图片的逻辑
  }

  // 发送到客户端
  sentToClient(css, data, options) {
    if (!data) data = {};
    let printOptions = $.extend({}, options || {});
    printOptions.imgToBase64 = true;
    let html = css + this.getHtml(data, printOptions)[0].outerHTML;
    printOptions.id = PrintLib.instance.guid();
    printOptions.html = html;
    printOptions.templateId = this.id;
    hiwebSocket.send(printOptions);
  }

  // 通过HTML打印
  printByHtml(html) {
    $(html).hiwprint();
  }

  // 通过HTML打印2
  printByHtml2(html, options) {
    if (!options) options = {};
    if (this.clientIsOpened()) {
      let templateOptions = this;
      let cssIndex = 0;
      let cssMap = {};
      let printCss = $('link[media=print][href*="print-lock.css"]');
      if (printCss.length <= 0) {
        throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
        return;
      }
      printCss.each(function(index, item) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", $(item).attr("href"));
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            cssMap[index + ""] = '<style rel="stylesheet" type="text/css">' + xhr.responseText + "</style>";
            if (++cssIndex == printCss.length) {
              let allCss = "";
              for (let i = 0; i < printCss.length; i++) {
                allCss += cssMap[i + ""];
              }
              let fullHtml = allCss + $(html)[0].outerHTML;
              let sendOptions = $.extend({}, options || {});
              sendOptions.id = PrintLib.instance.guid();
              sendOptions.html = fullHtml;
              sendOptions.templateId = templateOptions.id;
              hiwebSocket.send(sendOptions);
            }
          }
        };
        xhr.send();
      });
    } else {
      alert(`${i18n.__('连接客户端失败')}`);
    }
  }

  // 删除打印元素
  deletePrintElement(elementId) {
    this.printPanels.forEach(function(panel) {
      panel.deletePrintElement(elementId);
    });
  }

  // 转换图片
  transformImg(images) {
    let templateOptions = this;
    images.map(function(index, image) {
      templateOptions.imageToBase64($(image));
    });
  }

  // 转换为PDF
  toPdf(data, filename, options) {
    let templateOptions = this;
    let dtd = $.Deferred();
    let isDownload = true;
    if (this.printPanels.length) {
      let width = hinnn.mm.toPt(this.printPanels[0].width);
      let height = hinnn.mm.toPt(this.printPanels[0].height);
      let pdfOptions = $.extend({
        scale: 2,
        width: hinnn.pt.toPx(width),
        x: 0,
        y: 0,
        useCORS: true
      }, options || {});
      let pdf = new jsPDF({
        orientation: this.getOrient(0) == 1 ? "portrait" : "landscape",
        unit: "pt",
        format: this.printPanels[0].paperType ? this.printPanels[0].paperType.toLocaleLowerCase() : [width, height]
      });
      let htmlContent = this.getHtml(data, options);
      if (options && options.isDownload !== undefined) {
        isDownload = options.isDownload;
      }
      this.createTempContainer();
      let tempContainer = this.getTempContainer();
      this.svg2canvas(htmlContent);
      tempContainer.html(htmlContent[0]);
      let pageCount = tempContainer.find(".hiprint-printPanel .hiprint-printPaper").length;
      $(htmlContent).css("position:fixed");
      html2canvas(htmlContent[0], pdfOptions).then(function(canvas) {
        let context = canvas.getContext("2d");
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        let imgData = canvas.toDataURL("image/jpeg");
        for (let i = 0; i < pageCount; i++) {
          pdf.addImage(imgData, "JPEG", 0, 0 - i * height, width, pageCount * height);
          if (i < pageCount - 1) pdf.addPage();
        }
        if (isDownload) {
          templateOptions.removeTempContainer();
          filename.indexOf(".pdf") > -1 ? pdf.save(filename) : pdf.save(filename + ".pdf");
        } else {
          templateOptions.removeTempContainer();
          let type = options.type || 'blob';
          let pdfFile = pdf.output(type);
          dtd.resolve(pdfFile);
        }
      });
    }
    return dtd.promise();
  }

  // 创建临时容器
  createTempContainer() {
    this.removeTempContainer();
    $("body").prepend($('<div class="hiprint_temp_Container" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'));
  }

  // 移除临时容器
  removeTempContainer() {
    $(".hiprint_temp_Container").remove();
  }

  // 获取临时容器
  getTempContainer() {
    return $(".hiprint_temp_Container");
  }

  // SVG转Canvas
  svg2canvas(content) {
    let that = this;
    content.find("svg").each(function(index, svg) {
      let parent = svg.parentNode;
      let parentSize = that.parentWidthHeight(parent);
      let canvas = document.createElement("canvas");
      canvas.width = parentSize.width;
      canvas.height = parentSize.height;
      let ctx = canvas.getContext('2d');
      let svgString = new XMLSerializer().serializeToString(svg);
      Canvg.fromString(ctx, svgString).render();
      $(svg).before(canvas);
      parent.removeChild(svg);
    });
  }

  // 获取父元素宽高
  parentWidthHeight(element) {
    if (element.style.width.endsWith('%') || element.style.height.endsWith('%')) {
      if (element.className != 'hiprint-printPaper-content') {
        return this.parentWidthHeight(element.parentNode);
      }
      return { width: 10, height: 10 };
    } else {
      return { width: hinnn.pt.toPx(parseFloat(element.style.width)), height: hinnn.pt.toPx(parseFloat(element.style.height)) };
    }
  }

  // 绑定事件
  on(eventName, callback) {
    hinnn.event.clear(eventName + "_" + this.id);
    hinnn.event.on(eventName + "_" + this.id, callback);
  }

  // 客户端是否打开
  clientIsOpened() {
    return hiwebSocket.opened;
  }

  // 获取打印机列表
  getPrinterList() {
    let printers = hiwebSocket.getPrinterList();
    return printers || [];
  }

  // 通过TID获取元素
  getElementByTid(tid, index) {
    if (index == null) index = 0;
    return this.printPanels[index].getElementByTid(tid);
  }

  // 通过名称获取元素
  getElementByName(name, index) {
    if (index == null) index = 0;
    return this.printPanels[index].getElementByName(name);
  }

  // 获取面板
  getPanel(index) {
    if (index == null) index = 0;
    return this.printPanels[index];
  }

  // 加载所有图片
  loadAllImages(content, callback, tryCount) {
    let templateOptions = this;
    if (tryCount == null) tryCount = 0;
    let images = content[0].getElementsByTagName("img");
    let loadedFlag = true;
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (image.src && image.src !== window.location.href && image.src.indexOf("base64") == -1) {
        if (!(image && image.naturalWidth !== undefined && image.naturalWidth !== 0 && image.complete)) {
          loadedFlag = false;
        }
      }
    }
    tryCount++;
    if (!loadedFlag && tryCount < 10) {
      setTimeout(function() {
        templateOptions.loadAllImages(content, callback, tryCount);
      }, 500);
    } else {
      callback();
    }
  }

  // 设置字体列表
  setFontList(fontList) {
    this.fontList = fontList;
  }

  // 获取字体列表
  getFontList() {
    return this.fontList;
  }

  // 设置字段
  setFields(fields) {
    this.fields = fields;
  }

  // 获取字段
  getFields() {
    return this.fields;
  }

  // 设置图片选择点击事件
  setOnImageChooseClick(callback) {
    this.onImageChooseClick = callback;
  }

  // 获取图片选择点击事件
  getOnImageChooseClick() {
    return this.onImageChooseClick;
  }

  // 获取面板中的字段
  getFieldsInPanel() {
    let panelFields = [];
    this.printPanels.forEach(function(panel) {
      panelFields = panelFields.concat(panel.getFieldsInPanel());
    });
    return panelFields;
  }

  // 获取测试数据
  getTestData() {
    let testData = {};
    this.printPanels.forEach(function(panel) {
      testData = Object.assign(testData, panel.getTestData());
    });
    return testData;
  }

  // 更新
  update(json, index) {
    let templateOptions = this;
    try {
      if (json && typeof json === "object" && json.panels.length > 0) {
        let currentLength = templateOptions.printPanels.length - 1;
        json.panels.forEach(function(panelJson, panelIndex) {
          if (panelIndex > currentLength) {
            templateOptions.printPanels.push(new PrintPanel(panelJson, templateOptions.id));
            let newPanel = templateOptions.printPanels[panelIndex];
            templateOptions.container.append(newPanel.getTarget());
            if (panelIndex > 0) newPanel.disable();
            newPanel.design(templateOptions.designOptions);
            templateOptions.printPaginationCreator && templateOptions.printPaginationCreator.buildPagination();
          }
          let panelOption = new PrintPanelOption(panelJson);
          templateOptions.editingPanel = templateOptions.printPanels[panelIndex];
          templateOptions.editingPanel.update(panelOption);
        });
        templateOptions.selectPanel(index || 0);
      }
    } catch (error) {
      console.log(error);
      templateOptions.onUpdateError && templateOptions.onUpdateError(error);
    }
  }

  // 获取选中的元素
  getSelectEls() {
    let templateOptions = this;
    let elements = [];
    // 获取选区元素
    if (templateOptions.editingPanel.mouseRect && templateOptions.editingPanel.mouseRect.target && $(".mouseRect").length) {
      elements = templateOptions.editingPanel.getElementInRect(templateOptions.editingPanel.mouseRect);
    } else { // 获取多选元素
      elements = templateOptions.editingPanel.printElements.filter(function(el) {
        return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
      });
    }
    return elements;
  }

  // 通过字段选择元素
  selectElementsByField(fieldsArray) {
    let hiPrintEntity = this;
    let jQueryObj = $;
    hiPrintEntity.editingPanel.printElements.forEach((element, index) => {
      if (fieldsArray && fieldsArray.includes(element.options.field)) {
        let designTarget = element.designTarget;
        designTarget.children("div[panelindex]").addClass("selected");
        designTarget.children().last().css({
          display: "block"
        });
        designTarget = designTarget[0];
        jQueryObj.data(designTarget, "hidraggable").options.onBeforeSelectAllDrag.call(designTarget, {});
      }
    });
  }

  // 选择所有元素
  selectAllElements() {
    let hiPrintEntity = this;
    let jQueryObj = $;
    hiPrintEntity.editingPanel.printElements.forEach((element, index) => {
      let designTarget = element.designTarget;
      designTarget.children("div[panelindex]").addClass("selected");
      designTarget.children().last().css({
        display: "block"
      });
      designTarget = designTarget[0];
      jQueryObj.data(designTarget, "hidraggable").options.onBeforeSelectAllDrag.call(designTarget, {});
    });
  }

  // 更新选项
  updateOption(option, value) {
    let elements = this.getSelectEls();
    if (elements && elements.length) {
      elements.forEach(function(element) {
        element.updateOption(option, value, true);
      });
      hinnn.event.trigger("hiprintTemplateDataChanged_" + this.id, "批量修改");
    }
  }

    // 设置框选、多选元素对齐api
    setElsAlign = (alignType) => {
      const selectedElements = this.getSelectEls();
      if (selectedElements.length) {
        const minLeft = Math.min(...selectedElements.map(el => el.options.left));
        const maxRight = Math.max(...selectedElements.map(el => el.options.left + el.options.width));
        const minTop = Math.min(...selectedElements.map(el => el.options.top));
        const maxBottom = Math.max(...selectedElements.map(el => el.options.top + el.options.height));
  
        switch (alignType) {
          case "left": // 左对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(minLeft);
              el.designTarget.css("left", el.options.displayLeft());
            });
            break;
          case "vertical": // 居中
            const verticalCenter = minLeft + (maxRight - minLeft) / 2;
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(verticalCenter - el.options.width / 2);
              el.designTarget.css("left", el.options.displayLeft());
            });
            break;
          case "right": // 右对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(maxRight - el.options.width);
              el.designTarget.css("left", el.options.displayLeft());
            });
            break;
          case "top": // 顶部对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(undefined, minTop);
              el.designTarget.css("top", el.options.displayTop());
            });
            break;
          case "horizontal": // 垂直居中
            const horizontalCenter = minTop + (maxBottom - minTop) / 2;
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(undefined, horizontalCenter - el.options.height / 2);
              el.designTarget.css("top", el.options.displayTop());
            });
            break;
          case "bottom": //底部对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(undefined, maxBottom - el.options.height);
              el.designTarget.css("top", el.options.displayTop());
            });
            break;
          case "distributeHor": // 横向分散
            const sumWidth = selectedElements.reduce((total, el) => total + el.options.width, 0);
            const distributeHor = (maxRight - minLeft - sumWidth) / (selectedElements.length - 1);
            selectedElements.sort((prev, curr) => prev.options.left - curr.options.left);
            selectedElements.forEach((el, index) => {
              if (![0, selectedElements.length - 1].includes(index)) {
                el.updateSizeAndPositionOptions(selectedElements[index - 1].options.left + selectedElements[index - 1].options.width + distributeHor);
                el.designTarget.css("left", el.options.displayLeft());
              }
            });
            break;
          case "distributeVer": // 纵向分散
            const sumHeight = selectedElements.reduce((total, el) => total + el.options.height, 0);
            const distributeVer = (maxBottom - minTop - sumHeight) / (selectedElements.length - 1);
            selectedElements.sort((prev, curr) => prev.options.top - curr.options.top);
            selectedElements.forEach((el, index) => {
              if (![0, selectedElements.length - 1].includes(index)) {
                el.updateSizeAndPositionOptions(undefined, selectedElements[index - 1].options.top + selectedElements[index - 1].options.height + distributeVer);
                el.designTarget.css("top", el.options.displayTop());
              }
            });
            break;
        }
      }
    }
  
    // 设置元素间距
    setElsSpace = (distance, isHorizontal) => {
      const selectedElements = this.getSelectEls();
      if (selectedElements.length) {
        if (isHorizontal) {// 水平距离 →
          selectedElements.sort((prev, curr) => prev.options.left - curr.options.left);
          selectedElements.forEach((el, index) => {
            if (index > 0) {
              el.updateSizeAndPositionOptions(selectedElements[index - 1].options.left + selectedElements[index - 1].options.width + distance);
              el.designTarget.css("left", el.options.displayLeft());
            }
          });
        } else {// 垂直距离 ↓
          selectedElements.sort((prev, curr) => prev.options.top - curr.options.top);
          selectedElements.forEach((el, index) => {
            if (index > 0) {
              el.updateSizeAndPositionOptions(undefined, selectedElements[index - 1].options.top + selectedElements[index - 1].options.height + distance);
              el.designTarget.css("top", el.options.displayTop());
            }
          });
        }
      }
    }
  
    // 初始化自动保存
    initAutoSave = () => {
      hinnn.event.on("hiprintTemplateDataShortcutKey_" + this.id, (key) => {
        if (!this.history) return;
        switch (key) {
          case "undo":
            if (this.historyPos > 0) {
              this.historyPos -= 1;
              const currentState = this.historyList[this.historyPos];
              this.update(currentState.json);
            }
            break;
          case "redo":
            if (this.historyPos < this.historyList.length - 1) {
              this.historyPos += 1;
              const currentState = this.historyList[this.historyPos];
              this.update(currentState.json);
            }
            break;
        }
      });
  
      hinnn.event.on("hiprintTemplateDataChanged_" + this.id, (type) => {
        if (this.history) {
          const currentJson = this.dataMode === 1 ? this.getJson() : this.getJsonTid();
          this.lastJson = currentJson;
          if (this.historyPos < this.historyList.length - 1) {
            this.historyList = this.historyList.slice(0, this.historyPos + 1);
          }
          this.historyList.push({ id: PrintLib.instance.guid(), type: type, json: currentJson });
          if (this.historyList.length > 50) {
            this.historyList = this.historyList.slice(0, 1).concat(this.historyList.slice(1, 50));
          } else {
            this.historyPos += 1;
          }
          this.onDataChanged && this.onDataChanged(type, currentJson);
        }
      });
    }
  }

     
  
    function print(v13550) {
      this.getHtml(v13550).hiwprint();
    }
  
    function print2(v13551, v13552, v13553) {
      $.extend({}, v13551 || {}).imgToBase64 = !0;
      var v13554 = new PrintTemplate({});
      v13554.on("printSuccess", v13552), v13554.on("printError", v13553), v13554.printByHtml2(this.getHtml(v13551), v13551.options);
    }
  
    function getHtml(v13555) {
      var v13556 = void 0;
      return v13555 && v13555.templates.forEach(function (v13557, v13558) {
        var v13559 = $.extend({}, v13557.options || {});
        v13555.imgToBase64 && (v13559.imgToBase64 = !0), v13556 ? v13556.append(v13557.template.getHtml(v13557.data, v13559).html()) : v13556 = v13557.template.getHtml(v13557.data, v13559);
      }), v13556;
    }
  
    function init(v13560) {
      PrintConfig.instance.init(v13560), PrintConfig.instance.providers && PrintConfig.instance.providers.forEach(function (v13564) {
        v13564.addElementTypes(PrintElementTypeContext.instance);
      });
      if (window.autoConnect && (PrintConfig.instance.host != hiwebSocket.host || PrintConfig.instance.token != hiwebSocket.token)) {
        hiwebSocket.stop();
        PrintConfig.instance.host && (hiwebSocket.host = PrintConfig.instance.host);
        PrintConfig.instance.token && (hiwebSocket.token = PrintConfig.instance.token);
        hiwebSocket.start();
      }
      if (PrintConfig.instance.lang && Object.keys(languages).includes(PrintConfig.instance.lang)) {
        i18n.lang = PrintConfig.instance.lang;
      } else {
        i18n.lang = 'cn';
      }
    }
  
    function setConfig(v13574) {
      if (v13574) {
        v13574 && Object.keys(v13574).forEach(function (v13575) {
          if (v13575 == "optionItems" && v13574.optionItems && v13574.optionItems.length) {
            PrintConfig.instance.registerItems(v13574.optionItems);
          } else
          if (v13574[v13575].tabs && v13574[v13575].tabs.length) {
            v13574[v13575].tabs.forEach(function (tab, idx) {
              if (tab.replace) {
                $.extend(PrintConfig.instance[v13575].tabs[idx], tab);
              } else {
                var options = tab.options,list = PrintConfig.instance[v13575].tabs[idx].options;
                options.forEach(function (v13579) {
                  var idx = list.findIndex(function (v13580) {
                    return v13580.name == v13579.name;
                  });
                  if (idx > -1) list[idx].hidden = v13579.hidden;else
                  {
                    if (v13579.after) {
                      idx = list.findIndex(function (v13581) {
                        return v13581.name == v13579.after;
                      });
                      if (idx > -1) list.splice(idx + 1, 0, v13579);
                    } else list.push(v13579);
                  }
                });
                $.extend(PrintConfig.instance[v13575].tabs[idx], {
                  name: tab.name,
                  options: list
                });
              }
            });
            delete v13574[v13575].tabs;
          } else
          if (v13574[v13575].supportOptions) {
            var options = v13574[v13575].supportOptions,list = PrintConfig.instance[v13575].supportOptions;
            options.forEach(function (v13584) {
              var idx = list.findIndex(function (v13585) {
                return v13585.name == v13584.name;
              });
              if (idx > -1) list[idx].hidden = v13584.hidden;else
              {
                if (v13584.after) {
                  idx = list.findIndex(function (v13586) {
                    return v13586.name == v13584.after;
                  });
                  if (idx > -1) list.splice(idx + 1, 0, v13584);
                } else list.push(v13584);
              }
            });
            $.extend(PrintConfig.instance[v13575].supportOptions, list);
            delete v13574[v13575].supportOptions;
          } else {
            var keyMap = {};
            keyMap[v13575] = v13574[v13575];
            $.extend(PrintConfig.instance, keyMap);
          }
        });
      } else {
        $.extend(PrintConfig.instance, HIPRINT_CONFIG);
      }
    }
  
    function updateElementType(v13590, v13591) {
      return PrintElementTypeContext.instance.updateElementType(v13590, v13591);
    }
  
    function refreshPrinterList(v13592) {
      PrintConfig.instance.clear("printerList");
      PrintConfig.instance.on("printerList", v13592);
      hiwebSocket.refreshPrinterList();
    }
  
    function getClients(v13595) {
      PrintConfig.instance.clear("clients");
      PrintConfig.instance.on("clients", v13595);
      hiwebSocket.getClients();
    }
  
    function getClientInfo(v13598) {
      PrintConfig.instance.clear("clientInfo");
      PrintConfig.instance.on("getClientInfo", v13598);
      hiwebSocket.getClientInfo();
    }
  
    function getAddress(type, v13601, ...args) {
      PrintConfig.instance.clear("address_" + type);
      PrintConfig.instance.on("address_" + type, v13601);
      hiwebSocket.getAddress(type, ...args);
    }
  
    function ippPrint(options, callback, connected) {
      PrintConfig.instance.clear("ippPrinterCallback");
      PrintConfig.instance.on("ippPrinterCallback", callback);
      PrintConfig.instance.clear("ippPrinterConnected");
      PrintConfig.instance.on("ippPrinterConnected", connected);
      hiwebSocket.ippPrint(options);
    }
  
    function ippRequest(options, callback) {
      PrintConfig.instance.clear("ippRequestCallback");
      PrintConfig.instance.on("ippRequestCallback", callback);
      hiwebSocket.ippRequest(options);
    }

    //放这里不合适后续要移除了
    $(document).ready(function () {
      console.log('document ready');
      console.log(window.autoConnect);
      if (hiwebSocket.hasIo() && window.autoConnect) {
        hiwebSocket.start();
      }
    });

    export default {
      init: init,
      setConfig: setConfig,
      updateElementType: updateElementType,
      hiwebSocket: hiwebSocket,
      refreshPrinterList: refreshPrinterList,
      getClients: getClients,
      getClientInfo: getClientInfo,
      getAddress: getAddress,
      ippPrint: ippPrint,
      ippRequest: ippRequest,
      PrintElementTypeManager: PrintElementTypeManager,
      PrintElementTypeGroup: PrintElementTypeGroup,
      PrintTemplate: PrintTemplate,
      print: print,
      print2: print2,
      getHtml: getHtml
    };