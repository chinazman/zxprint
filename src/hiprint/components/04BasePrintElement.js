"use strict";

/**
 * 基础打印对象
 */
import { $, _typeof } from "../hiprint.comm.js";
import PrintElementEntity from "./17PrintElementEntity";
import PrintConfig from "./01PrintConfig.js";
import PrintElementOptionItemManager from "./09PrintElementOptionItemManager.js";
import PaperHtmlResult from "./06PaperHtmlResult.js";
import hinnn from "./00hinnn.js";
import PrintReferenceElement from "./08PrintReferenceElement.js";
import PrintLib from "./02PrintLib.js";

class BasePrintElement {
  constructor(printElementType) {
    this.printElementType = printElementType;
    this.id = PrintLib.instance.guid();
  }

  // 根据名称获取配置选项
  getConfigOptionsByName(optionName) {
    return PrintConfig.instance[optionName];
  }

  // 获取代理目标
  getProxyTarget(proxyTargetOption) {
    if (proxyTargetOption) this.setProxyTargetOption(proxyTargetOption);
    const data = this.getData();
    const targetElement = this.createTarget(this.getTitle(), data);
    this.updateTargetSize(targetElement);
    this.css(targetElement, data);
    return targetElement;
  }

  // 设置代理目标选项
  setProxyTargetOption(proxyTargetOption) {
    this.options.getPrintElementOptionEntity();
    $.extend(this.options, proxyTargetOption);
    this.copyFromType();
  }

  // 判断是否在页面显示
  showInPage(currentPage, totalPages) {
    const showInPageOption = this.options.showInPage;
    const unShowInPageOption = this.options.unShowInPage;

    if (showInPageOption) {
      if (showInPageOption === "first") return currentPage === 0;
      if (currentPage === totalPages - 1 && unShowInPageOption === "last")
        return false;
      if (showInPageOption === "odd")
        return (
          (currentPage !== 0 || unShowInPageOption !== "first") &&
          currentPage % 2 === 0
        );
      if (showInPageOption === "even") return currentPage % 2 === 1;
      if (showInPageOption === "last") return currentPage === totalPages - 1;
    }

    return (
      (currentPage !== 0 || unShowInPageOption !== "first") &&
      (currentPage !== totalPages - 1 || unShowInPageOption !== "last")
    );
  }

  // 设置模板ID
  setTemplateId(templateId) {
    this.templateId = templateId;
  }

  // 设置面板
  setPanel(panel) {
    this.panel = panel;
  }

  // 获取字段
  getField() {
    return this.options.field || this.printElementType.field;
  }

  // 获取标题
  getTitle() {
    return this.printElementType.title;
  }

  // 更新大小和位置选项
  updateSizeAndPositionOptions(left, top, width, height) {
    const template = PrintLib.instance.getPrintTemplateById(this.templateId);
    if (this.panel !== undefined && !template.willOutOfBounds) {
      const panelWidthPt = hinnn.mm.toPt(this.panel.width);
      const panelHeightPt = hinnn.mm.toPt(this.panel.height);
      if (
        left < 0 ||
        top < 0 ||
        left + this.options.width > panelWidthPt ||
        top + this.options.height > panelHeightPt
      ) {
        return;
      }
    }
    this.options.setLeft(left);
    this.options.setTop(top);
    this.options.copyDesignTopFromTop();
    this.options.setWidth(width);
    this.options.setHeight(height);
  }

  // 通过HTML初始化大小
  initSizeByHtml(htmlContent) {
    if (htmlContent && htmlContent.length) {
      this.createTempContainer();
      const tempContent = htmlContent.clone();
      this.getTempContainer().append(tempContent);
      this.options.initSizeByHtml(
        parseInt(hinnn.px.toPt(tempContent.width()).toString()),
        parseInt(hinnn.px.toPt(tempContent.height()).toString())
      );
      this.removeTempContainer();
    }
  }

  // 更新目标元素的大小
  updateTargetSize(targetElement) {
    targetElement.css("width", this.options.displayWidth());
    targetElement.css("height", this.options.displayHeight());
  }

  // 更新目标元素的宽度
  updateTargetWidth(targetElement) {
    targetElement.css("width", this.options.displayWidth());
  }

  // 获取设计目标
  getDesignTarget(designPaper) {
    let lastTimeStamp = 0;
    this.designTarget = this.getHtml(designPaper)[0].target;
    this.designPaper = designPaper;

    this.designTarget.click((event) => {
      if (event.timeStamp - lastTimeStamp > 500) {
        hinnn.event.trigger(this.getPrintElementSelectEventKey(), {
          printElement: this,
        });
      }
      lastTimeStamp = event.timeStamp;
    });

    this.designTarget.dblclick(() => {
      const contentElement = this.designTarget.find(
        ".hiprint-printElement-content"
      );
      if (contentElement) {
        const resizePanel = this.designTarget.find(".resize-panel");
        if (
          this.printElementType.type === "text" &&
          (!this.options.textType || this.options.textType === "text")
        ) {
          this._editing = true;
          this.designTarget.hidraggable("update", { draggable: false });
          contentElement.css("cursor", "text").addClass("editing");
          this.designTarget.addClass("editing");
          contentElement.click((ev) => {
            if (this._editing) ev.stopPropagation();
          });
          contentElement.attr("contenteditable", true);
          if (resizePanel) resizePanel.css("display", "none");
          this.selectEnd(contentElement);
        }
      }
    });

    return this.designTarget;
  }

  // 选择结束时设置焦点
  selectEnd(element) {
    element.focus();
    if (
      typeof window.getSelection !== "undefined" &&
      typeof document.createRange !== "undefined"
    ) {
      const range = document.createRange();
      range.selectNodeContents(element[0]);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(element[0]);
      textRange.collapse(false);
      textRange.select();
    }
  }

  // 根据内容更新
  updateByContent(clear) {
    const contentElement = this.designTarget.find(
      ".hiprint-printElement-content"
    );
    if (this._editing) {
      if (contentElement) {
        contentElement
          .css("cursor", "")
          .removeClass("editing")
          .removeAttr("contenteditable");
      }
      this.designTarget.removeClass("editing");

      const newText = contentElement.text();
      const title = this.options.title;

      if (newText.startsWith(title) && this.options.field) {
        if (newText.length > title.length) {
          this.options.testData = newText.split("：")[1];
        } else {
          this.options.title = newText;
          this.options.testData = "";
        }
      } else {
        this.options.title = newText;
      }
      this.options.title = this.options.title.split("：")[0];

      if (!clear) {
        hinnn.event.trigger(this.getPrintElementSelectEventKey(), {
          printElement: this,
        });
      }
      this.updateDesignViewFromOptions();
      hinnn.event.trigger(
        `hiprintTemplateDataChanged_${this.templateId}`,
        "编辑修改"
      );

      this._editing = false;
      const draggable =
        this.options.draggable === undefined || this.options.draggable === true;
      this.designTarget.hidraggable("update", { draggable });
    }
  }

  // 获取打印元素选择事件的键
  getPrintElementSelectEventKey() {
    return `PrintElementSelectEventKey_${this.templateId}`;
  }

  // 设置设计模式
  design(designPaper, container) {
    this.designTarget.hidraggable({
      draggable: this.options.draggable,
      axis: this.options.axis ? this.options.axis : undefined,
      designTarget: this,
      onDrag: (event, left, top) => {
        // 处理按住 ctrl / command 多选元素
        const selectedElements = this.panel.printElements.filter((element) => {
          return (
            element.designTarget.children().last().css("display") === "block" &&
            element.designTarget.children().last().hasClass("selected") &&
            !element.printElementType.type.includes("table")
          );
        });

        const isMultiple = selectedElements.length > 1;
        const notSelected = !this.designTarget
          .children()
          .last()
          .hasClass("selected");

        if (isMultiple) {
          const offsetX = left - this.options.left;
          const offsetY = top - this.options.top;
          selectedElements.forEach((element) => {
            element.updateSizeAndPositionOptions(
              offsetX + element.options.getLeft(),
              offsetY + element.options.getTop()
            );
            element.designTarget.css("left", element.options.displayLeft());
            element.designTarget.css("top", element.options.displayTop());
            element.createLineOfPosition(container);
          });

          if (notSelected) {
            this.updateSizeAndPositionOptions(left, top);
            this.createLineOfPosition(container);
          }
        } else {
          this.updateSizeAndPositionOptions(left, top);
          this.createLineOfPosition(container);
        }
        PrintLib.instance.changed = true;
      },
      moveUnit: "pt",
      minMove: PrintConfig.instance.movingDistance,
      onBeforeDrag: () => {
        PrintLib.instance.dragging = true;
        this.designTarget.focus();
        this.createLineOfPosition(container);
      },
      onBeforeSelectAllDrag: () => {
        PrintLib.instance.dragging = true;
        this.designTarget.focus();
      },
      getScale: () => {
        return this.designPaper.scale || 1;
      },
      onStopDrag: () => {
        // 拖动结束事件
        if (PrintLib.instance.changed) {
          hinnn.event.trigger(
            `hiprintTemplateDataChanged_${this.templateId}`,
            "移动"
          );
        }
        PrintLib.instance.dragging = false;
        PrintLib.instance.changed = false;

        const selectedElements = this.panel.printElements.filter((element) => {
          return (
            element.designTarget.children().last().css("display") === "block" &&
            !element.printElementType.type.includes("table")
          );
        });

        if (selectedElements.length > 1) {
          selectedElements.forEach((element) => {
            element.removeLineOfPosition();
          });
        } else {
          this.removeLineOfPosition();
        }
      },
    });

    this.setResizePanel();
    this.bindCopyEvent(this.designTarget);
    this.bindKeyboardMoveEvent(this.designTarget, container);
  }

  // 获取打印元素实体
  getPrintElementEntity(createNew) {
    return createNew
      ? new PrintElementEntity(
          undefined,
          this.options.getPrintElementOptionEntity(),
          this.printElementType.getPrintElementTypeEntity()
        )
      : new PrintElementEntity(
          this.printElementType.tid,
          this.options.getPrintElementOptionEntity()
        );
  }

  // 提交选项
  submitOption() {
    let selectedElements = this.panel.printElements.filter((element) => {
      return (
        element.designTarget.children().last().css("display") === "block" &&
        element.designTarget.children().last().hasClass("selected") &&
        !element.printElementType.type.includes("table")
      );
    });

    selectedElements = selectedElements.filter(
      (element) => element.printElementType.type === this.printElementType.type
    );
    const configOptions = this.getConfigOptions();

    if (configOptions && configOptions.tabs && configOptions.tabs.length) {
      this.getPrintElementOptionTabs().forEach((tab) => {
        // 样式更新要应用到其他选中的同种元素
        if (tab.name === "样式" && selectedElements.length) {
          tab.list.forEach((option) => {
            selectedElements.forEach((element) => {
              const value = option.getValue();
              const isTextType =
                option.name === "textType" &&
                element.options[option.name] !== value;
              const isAxis =
                option.name === "axis" &&
                element.options[option.name] !== value;

              if (value && typeof value === "object") {
                Object.keys(value).forEach((key) => {
                  element.options[key] = value[key];
                });
              } else {
                element.options[option.name] = value;
              }

              if (isTextType) {
                element.setResizePanel();
              }

              if (isAxis) {
                element.designTarget.hidraggable("update", { axis: value });
              }
            });
          });
        } else {
          tab.list.forEach((option) => {
            const value = option.getValue();
            const isTextType =
              option.name === "textType" && this.options[option.name] !== value;
            const isAxis =
              option.name === "axis" && this.options[option.name] !== value;

            if (value && typeof value === "object") {
              Object.keys(value).forEach((key) => {
                this.options[key] = value[key];
              });
            } else {
              this.options[option.name] = value;
            }

            if (isTextType) {
              this.setResizePanel();
            }

            if (isAxis) {
              this.designTarget.hidraggable("update", { axis: value });
            }
          });
        }
      });
    } else {
      this.getPrintElementOptionItems().forEach((option) => {
        const value = option.getValue();
        const isTextType =
          option.name === "textType" && this.options[option.name] !== value;
        const isAxis =
          option.name === "axis" && this.options[option.name] !== value;

        if (value && typeof value === "object") {
          Object.keys(value).forEach((key) => {
            this.options[key] = value[key];
          });
        } else {
          this.options[option.name] = value;
        }

        if (isTextType) {
          this.setResizePanel();
        }

        if (isAxis) {
          this.designTarget.hidraggable("update", { axis: value });
        }
      });
    }

    this.updateDesignViewFromOptions();
    hinnn.event.trigger(
      `hiprintTemplateDataChanged_${this.templateId}`,
      "元素修改"
    );
  }

  // 更新选项
  updateOption(optionName, optionValue, skipEvent) {
    try {
      const configOptions = this.getConfigOptions();
      let optionKeys = [];

      if (configOptions && configOptions.tabs && configOptions.tabs.length) {
        configOptions.tabs.forEach((tab) => {
          tab.options.forEach((option) => {
            optionKeys.push(option.name);
          });
        });
      } else {
        optionKeys = configOptions.supportOptions.map((option) => option.name);
      }

      if (optionKeys && optionKeys.includes(optionName)) {
        this.options[optionName] = optionValue;
        this.updateDesignViewFromOptions();

        if (!skipEvent) {
          hinnn.event.trigger(
            `hiprintTemplateDataChanged_${this.templateId}`,
            "参数修改"
          );
        }
      }

      this._printElementOptionTabs.forEach((tab) => {
        tab.list.forEach((item) => {
          if (item.name === optionName) {
            item.target.find("select")?.val(optionValue.toString());
            item.target.find("input")?.val(optionValue.toString());
          }
        });
      });
    } catch (error) {
      console.log("updateOption error", error);
    }
  }

  // 获取可调整大小的显示点
  getReizeableShowPoints() {
    return ["barcode", "qrcode"].includes(this.options.textType)
      ? ["se", "s", "e", "r"]
      : ["s", "e", "r"];
  }

  // 设置调整大小的面板
  setResizePanel() {
    const self = this;
    const designPaper = this.designPaper;

    this.designTarget.hireizeable({
      showPoints: self.getReizeableShowPoints(),
      draggable: self.options.draggable, // 元素是否可拖拽、删除
      // 是否显示宽高box
      showSizeBox: PrintConfig.instance.showSizeBox,
      getScale() {
        return self.designPaper.scale || 1;
      },
      onBeforeResize() {
        PrintLib.instance.draging = true;
      },
      onResize(event, left, top, width, height, rotate) {
        if (rotate !== undefined) {
          self.onRotate(event, rotate);
        } else {
          self.onResize(event, left, top, width, height);
        }
        self.createLineOfPosition(designPaper);
      },
      onStopResize(isRotated) {
        hinnn.event.trigger(
          `hiprintTemplateDataChanged_${self.templateId}`,
          isRotated ? "旋转" : "大小"
        );
        PrintLib.instance.draging = false;
        self.removeLineOfPosition();
      },
    });
  }

  // 旋转事件处理
  onRotate(event, rotateAngle) {
    this.options.setRotate(rotateAngle);
  }

  // 调整大小事件处理
  onResize(event, left, top, width, height) {
    this.updateSizeAndPositionOptions(height, width, top, left);
  }

  // 获取顺序索引
  getOrderIndex() {
    return this.options.getTop();
  }

  // 获取HTML内容
  getHtml(paper, templateData, isPreview) {
    let pageIndex = 0;
    this.setCurrentTemplateData(templateData);

    let htmlResults = [];
    let beginPrintTop = this.getBeginPrintTopInPaperByReferenceElement(paper);
    let paperFooter = paper.getPaperFooter(pageIndex);

    if (!this.isHeaderOrFooter() && !this.isFixed()) {
      if (beginPrintTop > paperFooter && paper.panelPageRule !== "none") {
        htmlResults.push(
          new PaperHtmlResult({
            target: undefined,
            printLine: undefined,
          })
        );
        beginPrintTop = beginPrintTop - paperFooter + paper.paperHeader;
        pageIndex++;
        paperFooter = paper.getPaperFooter(pageIndex);
      }
    }

    const data = this.getData(templateData);
    const target = this.createTarget(this.getTitle(), data, isPreview);
    this.updateTargetSize(target);
    this.css(target, data);
    target.css("position", "absolute");
    target.css("left", this.options.displayLeft());
    target.css("top", `${beginPrintTop}pt`);

    htmlResults.push(
      new PaperHtmlResult({
        target: target,
        printLine: beginPrintTop + this.options.getHeight(),
        referenceElement: new PrintReferenceElement({
          top: this.options.getTop(),
          left: this.options.getLeft(),
          height: this.options.getHeight(),
          width: this.options.getWidth(),
          beginPrintPaperIndex: paper.index,
          bottomInLastPaper: beginPrintTop + this.options.getHeight(),
          printTopInPaper: beginPrintTop,
        }),
      })
    );

    if (templateData && this.options.pageBreak) {
      htmlResults[0].target.css("top", `${paper.paperHeader}pt`);
      htmlResults[0].referenceElement.top =
        this.options.getTop() - this.options.getHeight() - paper.paperHeader;
      htmlResults[0].printLine = paper.paperHeader;
      htmlResults[0].referenceElement.bottomInLastPaper = 0;
      htmlResults[0].referenceElement.printTopInPaper = paper.paperHeader;
      htmlResults.unshift(
        new PaperHtmlResult({
          target: target,
          printLine: paper.height,
          referenceElement: new PrintReferenceElement({
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            beginPrintPaperIndex: paper.index,
            bottomInLastPaper: paper.height,
            printTopInPaper: paper.paperHeader,
          }),
        })
      );
    }

    return htmlResults;
  }

  // 获取HTML内容
  getHtml2(paper, templateData, isPreview) {
    let pageIndex = 0;
    this.setCurrentTemplateData(templateData);

    let htmlResults = [];
    let beginPrintTop = this.getBeginPrintTopInPaperByReferenceElement(paper);
    let paperFooter = paper.getPaperFooter(pageIndex);

    // 处理文本/辅助元素 当高度大于模板高度, 插入的分页...
    if (!this.isHeaderOrFooter() && !this.isFixed()) {
      if (paper.panelPageRule !== "none" && beginPrintTop > paperFooter) {
        htmlResults.push(
          new PaperHtmlResult({
            target: undefined,
            printLine: undefined,
          })
        );
        beginPrintTop = beginPrintTop - paperFooter + paper.paperHeader;
        pageIndex++;
        paperFooter = paper.getPaperFooter(pageIndex);
      }
      if (
        beginPrintTop <= paperFooter &&
        templateData &&
        beginPrintTop + this.options.getHeight() > paperFooter &&
        paper.panelPageRule !== "none"
      ) {
        htmlResults.push(
          new PaperHtmlResult({
            target: undefined,
            printLine: undefined,
          })
        );
        beginPrintTop = paper.paperHeader;
        pageIndex++;
        paperFooter = paper.getPaperFooter(pageIndex);
      }
    }

    const data = this.getData(templateData);
    const target = this.createTarget(this.getTitle(), data);

    if (
      paper.panelPageRule === "none" &&
      beginPrintTop + this.options.getHeight() > paperFooter
    ) {
      this.updatePanelHeight(beginPrintTop + this.options.getHeight(), paper);
    }

    this.updateTargetSize(target);
    this.css(target, data);
    target.css("position", "absolute");
    target.css("left", this.options.displayLeft());
    target.css("top", `${beginPrintTop}pt`);

    htmlResults.push(
      new PaperHtmlResult({
        target: target,
        printLine: beginPrintTop + this.options.getHeight(),
        referenceElement: new PrintReferenceElement({
          top: this.options.getTop(),
          left: this.options.getLeft(),
          height: this.options.getHeight(),
          width: this.options.getWidth(),
          beginPrintPaperIndex: paper.index,
          bottomInLastPaper: beginPrintTop + this.options.getHeight(),
          printTopInPaper: beginPrintTop,
        }),
      })
    );

    if (templateData && this.options.pageBreak) {
      htmlResults[0].target.css("top", `${paper.paperHeader}pt`);
      htmlResults[0].referenceElement.top =
        this.options.getTop() - this.options.getHeight() - paper.paperHeader;
      htmlResults[0].printLine = paper.paperHeader;
      htmlResults[0].referenceElement.bottomInLastPaper = 0;
      htmlResults[0].referenceElement.printTopInPaper = paper.paperHeader;
      htmlResults.unshift(
        new PaperHtmlResult({
          target: target,
          printLine: paper.height,
          referenceElement: new PrintReferenceElement({
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            beginPrintPaperIndex: paper.index,
            bottomInLastPaper: paper.height,
            printTopInPaper: paper.paperHeader,
          }),
        })
      );
    }

    return htmlResults;
  }

  // 更新面板高度
  updatePanelHeight(newHeightPt, paper) {
    if (this.panel.panelPageRule === "none") {
      const newHeightMm = hinnn.pt.toMm(newHeightPt);
      paper.paperFooter = newHeightPt;
      paper.target.css("height", `${newHeightMm}mm`);
      paper.target.attr("original-height", newHeightMm);
    }
  }

  // 获取参考元素的打印起始位置
  getBeginPrintTopInPaperByReferenceElement(paper) {
    const top = this.options.getTop();

    if (this.isHeaderOrFooter() || this.isFixed()) {
      return top;
    }

    return paper.referenceElement.isPositionLeftOrRight(top)
      ? paper.referenceElement.printTopInPaper +
          (top - paper.referenceElement.top)
      : paper.referenceElement.bottomInLastPaper +
          (top - (paper.referenceElement.top + paper.referenceElement.height));
  }

  // 设置CSS样式
  css(element, data) {
    const configOptions = this.getConfigOptions();
    let cssList = [];

    if (configOptions) {
      let optionItems;
      if (configOptions.tabs && configOptions.tabs.length) {
        optionItems = [];
        configOptions.tabs.forEach((tab) => {
          optionItems = optionItems.concat(tab.options);
        });
      } else {
        optionItems = configOptions.supportOptions;
      }

      optionItems.forEach((optionItem) => {
        const option = PrintElementOptionItemManager.getItem(optionItem.name);
        if (option && option.css) {
          const cssResult = option.css(
            element,
            this.options.getValueFromOptionsOrDefault(optionItem.name)
          );
          if (cssResult) {
            cssList.push(cssResult);
          }
        }
      });
    }

    this.applyStylerCss(element, data);
  }

  // 应用样式CSS
  applyStylerCss(element, data) {
    const styler = this.getStyler();

    if (styler) {
      const styles = styler(
        data,
        this.options,
        element,
        this._currentTemplateData
      );
      if (styles) {
        Object.keys(styles).forEach((styleKey) => {
          element.css(styleKey, styles[styleKey]);
        });
      }
    }
  }

  // 获取数据
  getData(templateData) {
    const field = this.getField();
    if (!templateData) {
      return this.printElementType.getData();
    }
    if (!field) {
      return "";
    }
    return (
      field
        .split(".")
        .reduce(
          (data, key) => (data ? data[key] : templateData[key] || ""),
          templateData
        ) || ""
    );
  }

  // 从类型中复制选项
  copyFromType() {
    const options = this.options;
    const type = this.printElementType;
    const configOptions = this.getConfigOptions();
    let optionNames = [];

    if (configOptions && configOptions.tabs && configOptions.tabs.length) {
      configOptions.tabs.forEach((tab) => {
        tab.options.forEach((option) => {
          optionNames.push(option.name);
        });
      });
    } else {
      optionNames = configOptions.supportOptions.map((option) => option.name);
    }

    Object.keys(type).forEach((key) => {
      if (type[key] && key !== "columns" && optionNames.includes(key)) {
        options[key] =
          typeof type[key] === "function" ? type[key].toString() : type[key];
      }
    });

    return options;
  }

  // 获取打印元素选项标签页
  getPrintElementOptionTabs() {
    if (this._printElementOptionTabs) {
      return this._printElementOptionTabs;
    }

    const configOptions = this.getConfigOptions();
    let tabs = [];

    if (configOptions) {
      const tabList = configOptions.tabs;
      if (tabList) {
        tabList.forEach((tab, index) => {
          tabs.push({ name: tab.name, list: [] });
          tab.options
            .filter((option) => !option.hidden)
            .forEach((option) => {
              const item = PrintElementOptionItemManager.getItem(option.name);
              tabs[index].list.push(item);
            });
        });
      }
    }

    this._printElementOptionTabs = tabs;
    this._printElementOptionItems = undefined;
    return this._printElementOptionTabs;
  }

  // 获取打印元素选项项
  getPrintElementOptionItems() {
    if (this._printElementOptionItems) {
      return this._printElementOptionItems;
    }

    const configOptions = this.getConfigOptions();
    let items = [];

    if (configOptions) {
      let optionItems;
      if (configOptions.tabs && configOptions.tabs.length) {
        optionItems = [];
        configOptions.tabs.forEach((tab) => {
          optionItems = optionItems.concat(tab.options);
        });
      } else {
        optionItems = configOptions.supportOptions;
      }

      optionItems
        .filter((option) => !option.hidden)
        .forEach((option) => {
          const item = PrintElementOptionItemManager.getItem(option.name);
          items.push(item);
        });
    }

    this._printElementOptionItems = this.filterOptionItems(items.concat());
    this._printElementOptionTabs = undefined;
    return this._printElementOptionItems;
  }

  // 根据名称获取打印元素选项项
  getPrintElementOptionItemsByName(name) {
    const optionItems = [];
    const configOptions = this.getConfigOptionsByName(name);

    if (configOptions) {
      let items;
      if (configOptions.tabs && configOptions.tabs.length) {
        items = [];
        configOptions.tabs.forEach((tab) => {
          items = items.concat(tab.options);
        });
      } else {
        items = configOptions.supportOptions;
      }

      items
        .filter((option) => !option.hidden)
        .forEach((option) => {
          const item = PrintElementOptionItemManager.getItem(option.name);
          optionItems.push(item);
        });
    }

    return optionItems.concat();
  }

  // 过滤选项项
  filterOptionItems(optionItems) {
    return this.printElementType.field
      ? optionItems.filter((option) => option.name !== "field")
      : optionItems;
  }

  // 创建临时容器
  createTempContainer() {
    this.removeTempContainer();
    $("body").append(
      $(
        '<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'
      )
    );
  }

  // 移除临时容器
  removeTempContainer() {
    $(".hiprint_temp_Container").remove();
  }

  // 获取临时容器
  getTempContainer() {
    return $(".hiprint_temp_Container");
  }

  // 判断是否是页眉或页脚
  isHeaderOrFooter() {
    return (
      this.options.getTopInDesign() < this.panel.paperHeader ||
      this.options.getTopInDesign() >= this.panel.paperFooter
    );
  }

  // 删除设计目标
  delete() {
    if (this.designTarget) {
      this.designTarget.remove();
    }
  }

  // 设置当前模板数据
  setCurrentTemplateData(templateData) {
    this._currentTemplateData = templateData;
  }

  // 判断是否固定
  isFixed() {
    return this.options.fixed;
  }

  // 渲染完成后的回调
  onRendered(target, data) {
    if (this.printElementType && this.printElementType.onRendered) {
      this.printElementType.onRendered(data, this.options, target.getTarget());
    }
  }
  // 创建位置线条
  createLineOfPosition(displayElement) {
    // 获取各个位置线条和位置标记元素
    const topLine = $(`.toplineOfPosition.id${this.id}`);
    const topPos = $(`.topPosition.id${this.id}`);
    const leftLine = $(`.leftlineOfPosition.id${this.id}`);
    const leftPos = $(`.leftPosition.id${this.id}`);
    const rightLine = $(`.rightlineOfPosition.id${this.id}`);
    const bottomLine = $(`.bottomlineOfPosition.id${this.id}`);

    const config = PrintConfig.instance;

    // 处理顶部线条
    if (topLine.length) {
      topLine.css("top", this.options.displayTop(true));
    } else {
      const newTopLine = $(
        `<div class="toplineOfPosition id${this.id}" style="position: absolute; width: 100%;"></div>`
      );
      newTopLine.css("top", this.options.displayTop(true));
      newTopLine.css("width", displayElement.displayWidth());
      this.designTarget
        .parents(".hiprint-printPaper-content")
        .append(newTopLine);
    }

    // 处理顶部位置标记
    if (config.showPosition) {
      if (topPos.length) {
        this.updateTopPosition(topPos, config);
      } else {
        this.createTopPosition(config);
      }
    }

    // 处理左侧线条
    if (leftLine.length) {
      leftLine.css("left", this.options.displayLeft(true));
    } else {
      const newLeftLine = $(
        `<div class="leftlineOfPosition id${this.id}" style="position: absolute;height: 100%;"></div>`
      );
      newLeftLine.css("left", this.options.displayLeft(true));
      newLeftLine.css("height", displayElement.displayHeight());
      this.designTarget
        .parents(".hiprint-printPaper-content")
        .append(newLeftLine);
    }

    // 处理左侧位置标记
    if (config.showPosition) {
      if (leftPos.length) {
        this.updateLeftPosition(leftPos, config);
      } else {
        this.createLeftPosition(config);
      }
    }

    // 处理右侧线条
    if (rightLine.length) {
      rightLine.css(
        "left",
        this.options.getLeft() + this.options.getWidth() + "pt"
      );
    } else {
      const newRightLine = $(
        `<div class="rightlineOfPosition id${this.id}" style="position: absolute;height: 100%;"></div>`
      );
      newRightLine.css(
        "left",
        this.options.getLeft() + this.options.getWidth() + "pt"
      );
      newRightLine.css("height", displayElement.displayHeight());
      this.designTarget
        .parents(".hiprint-printPaper-content")
        .append(newRightLine);
    }

    // 处理底部线条
    if (bottomLine.length) {
      bottomLine.css(
        "top",
        this.options.getTop() + this.options.getHeight() + "pt"
      );
    } else {
      const newBottomLine = $(
        `<div class="bottomlineOfPosition id${this.id}" style="position: absolute;width: 100%;"></div>`
      );
      newBottomLine.css(
        "top",
        this.options.getTop() + this.options.getHeight() + "pt"
      );
      newBottomLine.css("width", displayElement.displayWidth());
      this.designTarget
        .parents(".hiprint-printPaper-content")
        .append(newBottomLine);
    }
  }

  // 更新顶部位置标记
  updateTopPosition(topPos, config) {
    topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
    topPos.text(this.options.posTop() + (config.positionUnit ? "pt" : ""));
    topPos.css("top", this.options.posTop() - topPos.height() + "pt");
    if (config.positionLineMode) {
      topPos.css("left", this.options.posLeft() - topPos.width() / 2 + "pt");
    } else {
      topPos.css("left", this.options.posLeft() + 2 + "pt");
    }
    this.designTarget.find(".size-box") &&
      this.designTarget.find(".size-box").toggleClass("hide", true);
  }

  // 创建顶部位置标记
  createTopPosition(config) {
    const topPos = $(
      `<div class="topPosition id${this.id}" style="position: absolute;"></div>`
    );
    topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
    topPos.text(this.options.posTop() + (config.positionUnit ? "pt" : ""));
    if (config.positionLineMode) {
      topPos.css("left", this.options.posLeft() - topPos.width() / 2 + "pt");
    } else {
      topPos.css("left", this.options.posLeft() + 2 + "pt");
    }
    this.designTarget.find(".size-box") &&
      this.designTarget.find(".size-box").toggleClass("hide", true);
    this.designTarget.parents(".hiprint-printPaper-content").append(topPos);
    topPos.css("top", this.options.posTop() - topPos.height() + "pt");
  }

  // 更新左侧位置标记
  updateLeftPosition(leftPos, config) {
    leftPos.text(this.options.posLeft() + (config.positionUnit ? "pt" : ""));
    leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
    leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
    if (config.positionLineMode) {
      leftPos.css("top", this.options.posTop() - leftPos.height() / 3 + "pt");
    } else {
      leftPos.css("top", this.options.posTop() + 2 + "pt");
    }
  }

  // 创建左侧位置标记
  createLeftPosition(config) {
    const leftPos = $(
      `<div class="leftPosition id${this.id}" style="position: absolute;"></div>`
    );
    leftPos.text(this.options.posLeft() + (config.positionUnit ? "pt" : ""));
    leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
    if (config.positionLineMode) {
      leftPos.css("top", this.options.posTop() - leftPos.height() / 3 + "pt");
    } else {
      leftPos.css("top", this.options.posTop() + 2 + "pt");
    }
    this.designTarget.parents(".hiprint-printPaper-content").append(leftPos);
    leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
  }
  // 移除位置线条
  removeLineOfPosition() {
    $(`.toplineOfPosition.id${this.id}`).remove();
    $(`.topPosition.id${this.id}`).remove();
    this.designTarget.find(".size-box") &&
      this.designTarget.find(".size-box").toggleClass("hide", false);
    $(`.leftlineOfPosition.id${this.id}`).remove();
    $(`.leftPosition.id${this.id}`).remove();
    $(`.rightlineOfPosition.id${this.id}`).remove();
    $(`.bottomlineOfPosition.id${this.id}`).remove();
  }

  // 获取字体列表
  getFontList() {
    const fontList = this.options.fontList;
    return (
      fontList ||
      PrintLib.instance.getPrintTemplateById(this.templateId).getFontList()
    );
  }

  // 获取字段
  getFields() {
    if (this.printElementType.type === "table") {
      return this.options.tableFields;
    }
    const fields = this.options.fields;
    return (
      fields ||
      PrintLib.instance.getPrintTemplateById(this.templateId).getFields()
    );
  }

  // 获取图片选择点击事件
  getOnImageChooseClick() {
    const onImageChooseClick = this.options.onImageChooseClick;
    return (
      onImageChooseClick ||
      PrintLib.instance
        .getPrintTemplateById(this.templateId)
        .getOnImageChooseClick()
    );
  }

  // 绑定复制事件
  bindCopyEvent(targetElement) {
    targetElement.keydown((event) => {
      if (this._editing) {
        if (!event.altKey && event.keyCode === 13) {
          this.updateByContent();
          return;
        }
      }
      // ctrl + c / command + c
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 67) {
        this.copyJson();
        event.preventDefault();
      }
    });
  }

  // 复制JSON
  copyJson() {
    try {
      // 使用textarea 存储复制的元素信息
      let copyArea = $("#copyArea");
      if (!copyArea.length) {
        copyArea = $(
          '<textarea id="copyArea" style="position: absolute; left: 0px; top: 0px;opacity: 0"></textarea>'
        );
      }
      $("body").append(copyArea);

      const copyElements = this.panel.printElements
        .filter(
          (ele) =>
            "block" === ele.designTarget.children().last().css("display") &&
            !ele.printElementType.type.includes("table")
        )
        .map((ele) => ({
          options: ele.options,
          printElementType: ele.printElementType,
          id: ele.id,
          templateId: ele.templateId,
        }));

      const json = JSON.stringify(copyElements);
      copyArea.text(json);
      copyArea.css("visibility", "visible");

      if (copyArea.setSelectionRange) {
        copyArea.setSelectionRange(0, copyArea.value.length);
      } else {
        copyArea.select();
      }

      const flag = document.execCommand("copy");
      copyArea.css("visibility", "hidden");
      this.designTarget.focus();
      console.log("copyJson success");
      return flag;
    } catch (error) {
      console.log("copyJson error", error);
      return false;
    }
  }

  // 克隆元素
  clone() {
    const newObj = this.printElementType.createPrintElement();
    Object.keys(this.options).forEach((key) => {
      newObj.options[key] = this.options[key];
    });
    return newObj;
  }

  // 获取格式化器
  getFormatter() {
    let formatter;
    if (this.printElementType.formatter) {
      formatter = this.printElementType.formatter;
    }
    if (this.options.formatter) {
      try {
        eval(`formatter = ${this.options.formatter}`);
      } catch (error) {
        console.log(error);
      }
    }
    return formatter;
  }

  // 获取样式器
  getStyler() {
    let fnstyler;
    if (this.printElementType.styler) {
      fnstyler = this.printElementType.styler;
    }
    if (this.options.styler) {
      try {
        eval(`fnstyler = ${this.options.styler}`);
      } catch (error) {
        console.log(error);
      }
    }
    return fnstyler;
  }

  // 绑定键盘移动事件
  bindKeyboardMoveEvent(targetElement, isMultiple) {
    let left, top;
    targetElement.attr("tabindex", "1");
    targetElement.keydown((event) => {
      // 处理特殊情况
      if (
        event.target.tagName === "INPUT" ||
        (this._editing && !event.altKey) ||
        this.options.draggable === false
      ) {
        return;
      }

      const elements = this.panel.printElements.filter(
        (el) =>
          "block" === el.designTarget.children().last().css("display") &&
          !el.printElementType.type.includes("table")
      );
      const isMultiple = elements.length > 1;
      const movingDistance = PrintConfig.instance.movingDistance;

      switch (event.keyCode) {
        case 8:
        case 46:
          this.handleDelete(elements);
          break;
        case 37:
          this.handleMove(elements, isMultiple, -movingDistance, 0);
          break;
        case 38:
          this.handleMove(elements, isMultiple, 0, -movingDistance);
          break;
        case 39:
          this.handleMove(elements, isMultiple, movingDistance, 0);
          break;
        case 40:
          this.handleMove(elements, isMultiple, 0, movingDistance);
          break;
      }

      if ([37, 38, 39, 40].includes(event.keyCode)) {
        hinnn.event.trigger(
          `hiprintTemplateDataChanged_${this.templateId}`,
          "键盘移动"
        );
      }
      event.preventDefault();
    });
  }

  // 处理删除操作
  handleDelete(elements) {
    const template = PrintLib.instance.getPrintTemplateById(this.templateId);
    template.deletePrintElement(this);
    hinnn.event.trigger(
      `hiprintTemplateDataChanged_${this.templateId}`,
      "删除"
    );
    hinnn.event.trigger("clearSettingContainer");
    elements.forEach((element) => {
      template.deletePrintElement(element);
      hinnn.event.trigger(
        `hiprintTemplateDataChanged_${element.templateId}`,
        "删除"
      );
    });
    hinnn.event.trigger("clearSettingContainer");
  }

  // 处理移动操作
  handleMove(elements, isMultiple, deltaX, deltaY) {
    if (isMultiple) {
      elements.forEach((element) => {
        element.updatePositionByMultipleSelect(deltaX, deltaY);
      });
    } else {
      this.updateSizeAndPositionOptions(
        this.options.getLeft() + deltaX,
        this.options.getTop() + deltaY
      );
      this.designTarget.css({
        left: this.options.displayLeft(),
        top: this.options.displayTop(),
      });
    }
  }

  // 判断是否在矩形内
  inRect(event) {
    const ptr = this.designPaper.scale || 1;
    const {
      offsetLeft: x1,
      offsetTop: y1,
      offsetHeight: height,
      offsetWidth: width,
    } = this.designTarget[0];
    const x2 = x1 + width;
    const y2 = y1 + height;
    const { left: ex1, top: ey1 } = $(event.target[0]).position();
    const { offsetHeight: eh, offsetWidth: ew } = event.target[0];
    const ex2 = ex1 / ptr + ew;
    const ey2 = ey1 / ptr + eh;
    return ex1 / ptr < x2 && ex2 > x1 && y1 < ey2 && y2 > ey1 / ptr;
  }

  // 多选
  multipleSelect(isSelected) {
    this.designTarget.toggleClass("multipleSelect", isSelected);
  }

  // 通过多选更新位置
  updatePositionByMultipleSelect(deltaX, deltaY) {
    if (this.options.draggable === false) return;
    this.updateSizeAndPositionOptions(
      deltaX + this.options.getLeft(),
      deltaY + this.options.getTop()
    );
    this.designTarget.css({
      left: this.options.displayLeft(),
      top: this.options.displayTop(),
    });
  }
}
export default BasePrintElement;
