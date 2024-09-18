import {$} from "../../hiprint.comm.js";
import hinnn from "../hinnn.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
import PrintReferenceElement from "../PrintReferenceElement.js";
import PaperHtmlResult from "../PaperHtmlResult.js";
import PrintPage from "../PrintPage.js";

// 长文本打印元素选项类
class LongTextPrintElementOption extends PrintElementOption {
  constructor(options) {
    options = options || {};
    super(options);
    this.leftSpaceRemoved = options.leftSpaceRemoved;
  }

  // 获取隐藏标题选项
  getHideTitle() {
    return this.hideTitle == null ? this.defaultOptions.hideTitle : this.hideTitle;
  }
}

//长文本打印元素
class LongTextPrintElement extends BasePrintElement {
  constructor(elementType, options) {
    const instance = super(elementType) || this;
    instance.options = new LongTextPrintElementOption(options);
    instance.options.setDefault(new LongTextPrintElementOption(PrintConfig.instance.longText.default).getPrintElementOptionEntity());
    return instance;
  }

  // 获取设计目标
  getDesignTarget(designPaper) {
    const designTarget = super.getDesignTarget(designPaper);
    designTarget.find(".hiprint-printElement-longText-content").css("border", "1px dashed #cebcbc");
    return designTarget;
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
    if (this.designTarget) {
      const data = this.getData();
      const targetHtml = this.getHtml(this.designPaper)[0].target;
      this.designTarget.find(".hiprint-printElement-longText-content").html(targetHtml.find(".hiprint-printElement-longText-content").html());
      this.css(this.designTarget, data);
    }
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.longText;
  }

  // 获取标题
  getTitle() {
    return this.options.title || this.printElementType.title;
  }

  // 获取数据
  getData(dataContext) {
    const field = this.getField();
    const value = field ? field.split('.').reduce((context, part) => context ? context[part] : dataContext ? dataContext[part] : "", false) || "" : "";
    return dataContext ? value || "" : this.options.testData || this.printElementType.getData() || "";
  }

  // 更新目标文本
  updateTargetText(target, title, value) {
    if(this.execHiddenExpression(target, value)){
      return ;
    }
    value = this.execFormatterExpression(value);
    const contentElement = target.find(".hiprint-printElement-longText-content");
    const text = this.getText(title, value);
    contentElement.html(hinnn.textToHtml(text));
  }

  // 创建目标
  createTarget(title, data) {
    const target = $('<div class="hiprint-printElement hiprint-printElement-longText" style="position: absolute;"><div class="hiprint-printElement-longText-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>');
    this.updateTargetText(target, title, data);
    return target;
  }

  // 获取文本
  getText(title, data) {
    const formatter = this.getFormatter();
    if (data) {
      data = this.options.leftSpaceRemoved !== 0 ? data.toString().replace(/^\s*/, "") : data;
    }
    return (
      (this.getField()
        ? (this.options.getHideTitle() ? "" : title ? `${title}：` : "") +
          (formatter ? formatter(title, data, this.options, this._currenttemplateData) : data)
        : formatter ? formatter(title, title, this.options, this._currenttemplateData) : title || "") || ""
    );
  }

  // 获取 HTML 内容
  getHtml(paper, templateData, extraParam) {
    // return this.getHtml2(paper, templateData, extraParam);
    this.setCurrentTemplateData(templateData);
    this.createTempContainer();
    const paperHtmlResult = this.getPaperHtmlResult(paper, templateData);
    this.removeTempContainer();
    return paperHtmlResult;
  }

  // 通过数据获取高度
  getHeightByData(data) {
    this.createTempContainer();
    const paperHtmlResult = this.getPaperHtmlResult(new PrintPage("", "", undefined, 1000, 1000, 0, 25000, 0, 0, true, true, undefined, 0, undefined), {}, data);
    this.removeTempContainer();
    return paperHtmlResult[0].referenceElement.bottomInLastPaper - paperHtmlResult[0].referenceElement.printTopInPaper;
  }

  // 获取长文本缩进
  getLongTextIndent() {
    return this.options.longTextIndent
      ? `<span class="long-text-indent" style="margin-left:${this.options.longTextIndent}pt"></span>`
      : '<span class="long-text-indent"></span>';
  }

  // 获取纸张 HTML 结果
  getPaperHtmlResult(paper, templateData, longTextData) {
    const instance = this;
    const results = [];
    let paperIndex = 0;
    const data = longTextData || this.getData(templateData);
    const text = this.getText(this.getTitle(), data);
    const target = this.createTarget(this.getTitle(), this.options.testData || "");
    this.css(target, data);
    if (templateData) {
      this.updateTargetWidth(target);
    } else {
      this.updateTargetSize(target);
    }
    this.getTempContainer().html("");
    this.getTempContainer().append(target);
    let contentArray = [this.getLongTextIndent()];
    const contentLines = text.split(new RegExp("\r|\n", "g"));
    contentLines.forEach((line, index) => {
      const trimmedLine = instance.options.leftSpaceRemoved !== 0 ? (line || "").toString().replace(/^\s*/, "") : line;
      contentArray = contentArray.concat(trimmedLine.split(""));
      if (index < contentLines.length - 1) {
        contentArray.push("<br/>" + instance.getLongTextIndent());
      }
    });
    if (contentArray.length === 0) {
      contentArray = [""];
    }
    if (this.isHeaderOrFooter() || this.isFixed() || !templateData) {
      const paginationResult = this.getStringBySpecificHeight(contentArray, 25000, target);
      paginationResult.target.css("left", this.options.displayLeft());
      paginationResult.target.css("top", this.options.displayTop());
      paginationResult.target[0].height = "";
      results.push(
        new PaperHtmlResult({
          target: paginationResult.target,
          printLine: this.options.displayTop() + paginationResult.height,
          referenceElement: new PrintReferenceElement({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: paper.index,
            bottomInLastPaper: this.options.getTop() + paginationResult.height,
            printTopInPaper: this.options.getTop(),
          }),
        })
      );
      return results;
    }
    let beginPrintTop = this.getBeginPrintTopInPaperByReferenceElement(paper);
    while (contentArray.length > 0) {
      let remainingHeight = 0;
      let footerHeight = paper.getPaperFooter(paperIndex);
      if (paperIndex === 0 && beginPrintTop > footerHeight && paper.panelPageRule !== "none") {
        beginPrintTop = beginPrintTop - footerHeight + paper.paperHeader;
        results.push(new PaperHtmlResult({ target: undefined, printLine: undefined }));
        paperIndex++;
        remainingHeight = paper.getContentHeight(paperIndex) - (beginPrintTop - paper.paperHeader);
        footerHeight = paper.getPaperFooter(paperIndex);
      }
      const pageResult = this.getStringBySpecificHeight(contentArray, remainingHeight > 0 ? remainingHeight : paperIndex === 0 ? footerHeight - beginPrintTop : paper.getContentHeight(paperIndex), target);
      contentArray.splice(0, pageResult.length);
      let topPosition;
      let printLine;
      pageResult.target.css("left", this.options.displayLeft());
      pageResult.target[0].height = "";
      if (paperIndex === 0 || remainingHeight > 0) {
        topPosition = beginPrintTop;
        pageResult.target.css("top", `${topPosition}pt`);
        // printLine = contentArray.length > 0 ? beginPrintTop + pageResult.height : this.options.lHeight !== null ? beginPrintTop + (pageResult.height > this.options.lHeight ? pageResult.height : this.options.lHeight) : beginPrintTop + pageResult.height;
        if (contentArray.length > 0) {
            printLine = beginPrintTop + pageResult.height;
        } else if (this.options.lHeight != null) {
            printLine = beginPrintTop + (pageResult.height > this.options.lHeight? pageResult.height : this.options.lHeight);
        } else {
            printLine = beginPrintTop + pageResult.height;
        }
      
      } else {
        topPosition = paper.paperHeader;
        pageResult.target.css("top", `${topPosition}pt`);
        printLine = topPosition + pageResult.height;
      }
      results.push(
        new PaperHtmlResult({
          target: pageResult.target,
          printLine: printLine,
          referenceElement: new PrintReferenceElement({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: paper.index,
            bottomInLastPaper: printLine,
            printTopInPaper: topPosition
          }),
          })
        );
        paperIndex++;
        if (templateData) {
          this.updatePanelHeight(printLine + this.options.getHeight(), paper);
        }
      }
      return results;
    }
  
    // 根据特定高度获取字符串
    getStringBySpecificHeight(contentArray, maxHeight, target) {
      const maxHeightInPx = hinnn.pt.toPx(maxHeight);
      const pagingResult = this.IsPaginationIndex(contentArray, contentArray.length, -1, target);
      if (pagingResult.IsPagination) {
        return pagingResult;
      }
      return this.BinarySearch(contentArray, 0, contentArray.length - 1, maxHeightInPx, target);
    }
  
    // 二分搜索
    BinarySearch(contentArray, start, end, maxHeight, target) {
      const mid = Math.floor((start + end) / 2);
      if (start > end) {
        target.find(".hiprint-printElement-longText-content").html("");
        return {
          IsPagination: true,
          height: 0,
          length: 0,
          target: target.clone(),
        };
      }
      const paginationResult = this.IsPaginationIndex(contentArray, mid, maxHeight, target);
      if (paginationResult.IsPagination) {
        return paginationResult;
      }
      return paginationResult.move === "l"
        ? this.BinarySearch(contentArray, start, mid - 1, maxHeight, target)
        : this.BinarySearch(contentArray, mid + 1, end, maxHeight, target);
    }
  
    // 判断分页索引
    IsPaginationIndex(contentArray, index, maxHeight, target) {
      if (maxHeight === -1) {
        target.find(".hiprint-printElement-longText-content").html(contentArray.slice(0, index).join(""));
        const height = target.height();
        return {
          IsPagination: true,
          height: hinnn.px.toPt(height),
          length: contentArray.length,
          target: target.clone(),
        };
      }
      target.find(".hiprint-printElement-longText-content").html(contentArray.slice(0, index + 2).join(""));
      const totalHeight = target.height();
      target.find(".hiprint-printElement-longText-content").html(contentArray.slice(0, index + 1).join(""));
      const height = target.height();
      if (index >= contentArray.length - 1 && height < maxHeight) {
        return {
          IsPagination: true,
          height: hinnn.px.toPt(height),
          length: contentArray.length,
          target: target.clone(),
        };
      }
      if (height <= maxHeight && totalHeight >= maxHeight) {
        return {
          IsPagination: true,
          height,
          length: index + 1,
          target: target.clone(),
        };
      }
      return height >= maxHeight
        ? { IsPagination: false, move: "l" }
        : { IsPagination: false, move: "r" };
    }
  }

  export default LongTextPrintElement;