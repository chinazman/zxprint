import {$} from "../hiprint.comm.js";
import hinnn from "./hinnn.js";
import PrintConfig from "./PrintConfig.js";
import PrintLib from "./PrintLib.js";
import PrintReferenceElement from "./PrintReferenceElement.js";
import PrintElementTypeContext from "./PrintElementTypeContext.js";
import PrintPanelOption from "./PrintPanelOption.js";
import PrintPage from "./PrintPage.js";
import PrintElementTypeFactory from "./PrintElementTypeFactory.js";

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
    this.bgImage = panelOptions.bgImage;
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
        bgImage: panel.bgImage,
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
          panel.bgImage = updatedOptions.bgImage;
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
    this.addBgImage();
  }
  /**
 * 向面板添加背景图像
 * 如果面板有背景图像，则创建一个图像打印元素并将其添加到面板的设计纸上
 */
  addBgImage(paper, data) {
    const panel = this;
    const imageData = data || panel.bgImage;
    const thisPaper = paper|| panel.designPaper;
    // 移除之前的图像打印元素
    // thisPaper.target.children(".hiprint-printElement-image").remove();
    // if (imageData){
    //   const elementType = PrintElementTypeFactory.createPrintElementType({
    //       "title": "BgImage",
    //       "type": "image"
    //   });
    //   const bgElement = elementType.createPrintElement({
    //       "x": 0,
    //       "y": 0,
    //       "width": hinnn.mm.toPt(panel.width),
    //       "height": hinnn.mm.toPt(panel.height),
    //       "src": imageData.src
    //   });
    //   bgElement.setTemplateId(panel.templateId);
    //   bgElement.setPanel(panel);
    //   // panel.printElements.unshift(bgElement);
    //   panel.appendDesignPrintElement(thisPaper, bgElement);
    //   // bgElement.design(null, panel.designPaper);
    //   bgElement.designTarget.prependTo(thisPaper.target);//bgElement.designTarget.parent().parent()
    //   bgElement.designTarget.addClass("no-print");
    // }
    thisPaper.target.children(".bgimage").remove();
    if (imageData){
      $(`<div class="no-print bgimage" style="position:absolute;user-select:none;top:0;left:0;width: ${panel.width}mm; height: ${panel.height}mm;;z-index:0;pointer-events:none !important;background-repeat:repeat;background-image:url('${imageData.src}')"></div>`)
      .prependTo(thisPaper.target);
    }
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
      this.bgImage = panelOptions.bgImage;
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
      console.log('更新面板异常');
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
  async pasteJson(event) {
    let json = null;
    // 从剪切板获取JSON数据
    if (navigator.clipboard){
      json = await navigator.clipboard.readText();
      console.log('pasteJson', json);
      if (json && json.startsWith("zprint://")){
        json = json.substring(9);
      }
    }
    if (!json){
      const copyArea = $('#copyArea');
      if (!copyArea.length) return;
      json = copyArea.text();
    }
    try {
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
        // const element = panel.getElementById(obj.id);
        // if (!element) return;
        // const clonedElement = element.clone(obj);
        const elementType = this.getPrintElementTypeByEntity(obj);
        const clonedElement = elementType == null? null : elementType.createPrintElement(obj.options);
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
        lastPage = pageList[page.referenceElement.beginPrintPaperIndex];
      } else {
        lastPage = pageList[page.referenceElement.endPrintPaperIndex];
      }
      elementHtmls = element.getHtml(lastPage, printData);
      elementHtmls.forEach((elementHtml, index) => {
        elementHtml.referenceElement && (elementHtml.referenceElement.endPrintPaperIndex = elementHtml.referenceElement.beginPrintPaperIndex + elementHtmls.length - 1);
        if (index > 0) {
          if (lastPage.index < pageList.length - 1) {
            lastPage = pageList[lastPage.index + 1];
          } else {
            lastPage = widget.createNewPage(pageList.length, lastPage.referenceElement);
            pageList.push(lastPage);
          }
          currentPage.append(lastPage.getTarget());
        }
        // 元素隐藏时不添加到html内
        elementHtml.target && ("none" != element.options.showInPage && lastPage.append(elementHtml.target), lastPage.updatePrintLine(elementHtml.printLine), element.onRendered(lastPage, elementHtml.target));
        index == elementHtmls.length - 1 && elementHtml.referenceElement && lastPage.updateReferenceElement(elementHtml.referenceElement);
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
          panel.addBgImage(page)
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
      bgImage: this.bgImage ? this.bgImage : undefined,
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
    return layoutStyle + " <style printStyle>\n        @page\n        {\n             border:0;\n             padding:0cm;\n                 " + this.getPrintSizeStyle() + "\n        }\n        </style>\n";
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

export default PrintPanel;
