import {$} from "../hiprint.comm.js";
// 水印
import watermark from "../plugins/watermark.js";
//引入标尺
import lImg from "../css/image/l_img.svg";
import vImg from "../css/image/v_img.svg";

import "../plugins/22jquery.hidraggable.js";
import "../plugins/23jquery.hidroppable.js";
import "../plugins/24jquery.hiprintparser.js";
import "../plugins/25jquery.hireizeable.js";
import hinnn from "../components/00hinnn.js";
import "../plugins/26hiwebSocket.js";
import "../plugins/32jquery.hicontextMenu.js";
import PrintConfig from "./01PrintConfig.js";
import PrintLib from "./02PrintLib.js";
import PrintReferenceElement from "./08PrintReferenceElement.js";

/**
 * 打印页面
 */
class PrintPage {
    /**
     * 构造函数
     * @param {string} templateId 模板ID
     * @param {number} idx 索引
     * @param {Object} watermarkOptions 水印选项
     * @param {Object} panelPageRule 面板页面规则
     * @param {number} scale 缩放比例
     * @param {number} width 宽度
     * @param {number} height 高度
     * @param {number} paperHeader 页眉高度
     * @param {number} paperFooter 页脚高度
     * @param {number} paperNumberLeft 页码左边距
     * @param {number} paperNumberTop 页码上边距
     * @param {boolean} paperNumberDisabled 是否禁用页码
     * @param {boolean} paperNumberContinue 页码是否连续
     * @param {string} paperNumberFormat 页码格式
     * @param {number} index 页面索引
     * @param {Object} referenceElement 参考元素
     */
    constructor(templateId, idx, watermarkOptions, panelPageRule, scale, width, height, paperHeader, paperFooter, paperNumberLeft, paperNumberTop, paperNumberDisabled, paperNumberContinue, paperNumberFormat, index, referenceElement) {
      this.panelPageRule = panelPageRule;
      this.scale = scale;
      this.watermarkOptions = watermarkOptions;
      this.defaultPaperNumberFormat = "${paperNo}-${paperCount}";
      this.printLine = 0;
      this.templateId = templateId;
      this.panelIdx = idx;
      this.width = hinnn.mm.toPt(width);
      this.height = hinnn.mm.toPt(height);
      this.mmwidth = width;
      this.mmheight = height;
      this.paperHeader = paperHeader >= 0 ? paperHeader : 0;
      this.paperFooter = paperFooter;
      this.contentHeight = paperFooter - paperHeader;
      this.createTarget();
      this.index = index;
      this.paperNumberLeft = paperNumberLeft || parseInt((this.width - 30).toString());
      this.paperNumberTop = paperNumberTop || parseInt((this.height - 22).toString());
      this.paperNumberDisabled = paperNumberDisabled;
      this.paperNumberContinue = paperNumberContinue;
      this.paperNumberFormat = paperNumberFormat;
      this.referenceElement = referenceElement ? $.extend({}, referenceElement) : new PrintReferenceElement({
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        bottomInLastPaper: 0,
        beginPrintPaperIndex: 0,
        printTopInPaper: 0,
        endPrintPaperIndex: 0
      });
    }
  
    /**
     * 订阅纸张基本信息变化
     * @param {Function} callback 回调函数
     */
    subscribePaperBaseInfoChanged(callback) {
      this.onPaperBaseInfoChanged = callback;
    }
  
    /**
     * 触发纸张基本信息变化事件
     * @param {string} reason 变化原因
     */
    triggerOnPaperBaseInfoChanged(reason) {
      if (this.onPaperBaseInfoChanged) {
        this.onPaperBaseInfoChanged({
          panelPageRule: this.panelPageRule,
          scale: this.scale,
          paperHeader: this.paperHeader,
          paperFooter: this.paperFooter,
          paperNumberLeft: this.paperNumberLeft,
          paperNumberTop: this.paperNumberTop,
          paperNumberDisabled: this.paperNumberDisabled,
          paperNumberContinue: this.paperNumberContinue,
          paperNumberFormat: this.paperNumberFormat
        });
      }
      hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, reason || "模板调整");
    }
  
    /**
     * 设置页脚
     * @param {number} firstPaperFooter 第一页页脚
     * @param {number} evenPaperFooter 偶数页页脚
     * @param {number} oddPaperFooter 奇数页页脚
     * @param {number} lastPaperFooter 最后一页页脚
     */
    setFooter(firstPaperFooter, evenPaperFooter, oddPaperFooter, lastPaperFooter) {
      this.firstPaperFooter = firstPaperFooter;
      this.evenPaperFooter = evenPaperFooter;
      this.oddPaperFooter = oddPaperFooter;
      this.lastPaperFooter = lastPaperFooter;
    }
  
    /**
     * 设置偏移
     * @param {number} leftOffset 左偏移
     * @param {number} topOffset 上偏移
     */
    setOffset(leftOffset, topOffset) {
      this.setLeftOffset(leftOffset);
      this.setTopOffset(topOffset);
    }
  
    /**
     * 设置左偏移
     * @param {number} leftOffset 左偏移
     */
    setLeftOffset(leftOffset) {
      if (leftOffset) {
        this.paperContentTarget.css("left", leftOffset + "pt");
      } else {
        this.paperContentTarget[0].style.left = "";
      }
    }
  
    /**
     * 设置上偏移
     * @param {number} topOffset 上偏移
     */
    setTopOffset(topOffset) {
      if (topOffset) {
        this.paperContentTarget.css("top", topOffset + "pt");
      } else {
        this.paperContentTarget[0].style.top = "";
      }
    }
  
    /**
     * 创建目标元素
     */
    createTarget() {
      this.target = $('<div class="hiprint-printPaper"><div class="hiprint-printPaper-content"></div></div>');
      this.paperContentTarget = this.target.find(".hiprint-printPaper-content");
      this.target.css("width", this.mmwidth + "mm");
      this.target.css("height", this.mmheight - PrintConfig.instance.paperHeightTrim + "mm");
      this.target.attr("original-height", this.mmheight);
      this.zoom(this.scale);
    }
  
    /**
     * 创建页眉线
     */
    createHeaderLine() {
      const self = this;
      this.headerLinetarget = $('<div class="hiprint-headerLine" style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>');
      this.headerLinetarget.css("top", (this.paperHeader || -1) + "pt");
      if (this.paperHeader == 0) {
        this.headerLinetarget.addClass("hideheaderLinetarget");
      }
      this.paperContentTarget.append(this.headerLinetarget);
      this.dragHeadLineOrFootLine(this.headerLinetarget, (left, top) => {
        if (top >= self.paperFooter) {
          top = self.paperFooter - 10;
        }
        self.paperHeader = top >= 0 ? top : 0;
        self.triggerOnPaperBaseInfoChanged();
      });
    }
  
    /**
     * 创建页脚线
     */
    createFooterLine() {
      const self = this;
      this.footerLinetarget = $('<div class="hiprint-footerLine" style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>');
      this.footerLinetarget.css("top", parseInt(this.paperFooter.toString()) + "pt");
      if (this.paperFooter == this.height) {
        this.footerLinetarget.css("top", this.mmheight - PrintConfig.instance.paperHeightTrim + "mm");
        this.footerLinetarget.addClass("hidefooterLinetarget");
      }
      this.paperContentTarget.append(this.footerLinetarget);
      this.dragHeadLineOrFootLine(this.footerLinetarget, (left, top) => {
        if (top <= self.paperHeader) {
          top = self.paperHeader + 10;
        }
        self.paperFooter = top;
        self.triggerOnPaperBaseInfoChanged();
      });
    }
  
    /**
     * 创建页码
     * @param {string} paperNumber 页码
     * @param {boolean} isDesign 是否为设计模式
     * @returns {jQuery} 页码元素
     */
    createPaperNumber(paperNumber, isDesign) {
      const self = this;
      let paperNumberTarget = this.target.find(".hiprint-paperNumber");
      if (paperNumberTarget.length) {
        paperNumberTarget.html(paperNumber);
        return paperNumberTarget;
      }
      paperNumberTarget = $(`<span class="hiprint-paperNumber" style="position: absolute">${paperNumber}</span>`);
      paperNumberTarget.css("top", this.paperNumberTop + "pt");
      paperNumberTarget.css("left", this.paperNumberLeft + "pt");
      this.paperContentTarget.append(paperNumberTarget);
      if (isDesign) {
        this.dragHeadLineOrFootLine(paperNumberTarget, (left, top) => {
          self.paperNumberTop = top;
          self.paperNumberLeft = left;
          self.triggerOnPaperBaseInfoChanged();
        }, true);
      }
      return paperNumberTarget;
    }
  
    /**
     * 获取目标元素
     * @returns {jQuery} 目标元素
     */
    getTarget() {
      return this.target;
    }
  
    /**
     * 添加元素
     * @param {jQuery} element 要添加的元素
     */
    append(element) {
      this.paperContentTarget.append(element);
    }
  
    /**
     * 更新参考元素
     * @param {Object} referenceElement 参考元素
     */
    updateReferenceElement(referenceElement) {
      if (referenceElement) {
        this.referenceElement = referenceElement;
      }
    }
  
    /**
     * 更新打印行
     * @param {number} printLine 打印行
     */
    updatePrintLine(printLine) {
      if (printLine >= this.printLine) {
        this.printLine = printLine;
      }
    }
  
    /**
     * 设计模式
     * @param {Object} options 选项
     */
    design(options) {
      const self = this;
      this.createHeaderLine();
      this.createFooterLine();
      this.target.addClass("design");
      if (options && options.grid) {
        this.target.addClass("grid");
      }
      this.paperNumberTarget = this.createPaperNumber(this.formatPaperNumber(1, 1), true);
      this.createRuler();
      this.createWaterMark(true, this.panelIdx, this.watermarkOptions);
      this.resetPaperNumber(this.paperNumberTarget);
      $(this.paperNumberTarget).bind("dblclick.hiprint", function () {
        self.paperNumberDisabled = self.paperNumberDisabled === null ? false : !self.paperNumberDisabled;
        self.resetPaperNumber(self.paperNumberTarget);
        self.triggerOnPaperBaseInfoChanged("初始");
      });
      $(this.paperNumberTarget).bind("click.hiprint", function () {
        hinnn.event.trigger("BuildCustomOptionSettingEventKey_" + self.templateId, {
          options: {
            paperNumberFormat: self.paperNumberFormat,
            paperNumberDisabled: self.paperNumberDisabled,
            paperNumberContinue: self.paperNumberContinue
          },
          callback: function callback(opts) {
            self.paperNumberDisabled = !!opts.paperNumberDisabled || undefined;
            self.paperNumberContinue = opts.paperNumberContinue;
            self.paperNumberFormat = opts.paperNumberFormat ? opts.paperNumberFormat : undefined;
            self.createPaperNumber(self.formatPaperNumber(1, 1), true);
            self.resetPaperNumber(self.paperNumberTarget);
            self.triggerOnPaperBaseInfoChanged();
          }
        });
      });
    }
  
    /**
     * 重置页码
     * @param {jQuery} paperNumberTarget 页码目标元素
     */
    resetPaperNumber(paperNumberTarget) {
      if (this.paperNumberDisabled) {
        paperNumberTarget.addClass("hiprint-paperNumber-disabled");
      } else {
        paperNumberTarget.removeClass("hiprint-paperNumber-disabled");
      }
    }
  
    /**
     * 更新页码
     * @param {number} paperNo 页码
     * @param {number} paperCount 总页数
     * @param {boolean} isEven 是否为偶数页
     */
    updatePaperNumber(paperNo, paperCount, isEven) {
      const paperNumberTarget = this.createPaperNumber(this.formatPaperNumber(paperNo, paperCount));
      if (this.paperNumberDisabled) {
        paperNumberTarget.hide();
      } else if (isEven && this.index % 2 == 1) {
        paperNumberTarget[0].style.left = "";
        paperNumberTarget.css("right", this.paperNumberLeft + "pt");
      }
    }
  
    /**
     * 格式化页码
     * @param {number} paperNo 页码
     * @param {number} paperCount 总页数
     * @returns {string} 格式化后的页码
     */
    formatPaperNumber(paperNo, paperCount) {
      this.createWaterMark(false, paperNo, this.watermarkOptions);
      return eval("`" + (this.paperNumberFormat ? this.paperNumberFormat : this.defaultPaperNumberFormat).replace("paperNo", paperNo).replace("paperCount", paperCount) + "`");
    }
  
    /**
     * 拖动页眉线或页脚线
     * @param {jQuery} target 目标元素
     * @param {Function} onDrag 拖动回调
     * @param {boolean} isHorizontal 是否水平拖动
     */
    dragHeadLineOrFootLine(target, onDrag, isHorizontal) {
      const self = this;
      target.hidraggable({
        axis: isHorizontal ? undefined : "v",
        onDrag: function(e, left, top) {
          onDrag(left, top);
        },
        moveUnit: "pt",
        minMove: PrintConfig.instance.movingDistance,
        onBeforeDrag: function(e) {
          PrintLib.instance.draging = true;
        },
        getScale: function() {
          return self.scale || 1;
        },
        onStopDrag: function(e) {
          self.headerLinetarget.css("top", self.paperHeader + "pt");
          self.footerLinetarget.css("top", self.paperFooter + "pt");
          PrintLib.instance.draging = false;
          self.footerLinetarget.removeClass("hidefooterLinetarget");
          self.headerLinetarget.removeClass("hideheaderLinetarget");
        }
      });
    }
  
  /**
   * 调整大小
   * @param {number} width 宽度
   * @param {number} height 高度
   */
  resize(width, height) {
    // 获取页脚高度比例
    const paperFooterRatio = this.paperFooter / this.height;
    this.width = hinnn.mm.toPt(width);
    this.height = hinnn.mm.toPt(height);
    this.mmwidth = width;
    this.mmheight = height;
    this.target.css("width", width + "mm");
    this.target.css("height", height - PrintConfig.instance.paperHeightTrim + "mm");
    this.target.attr("original-height", this.mmheight);
    // 按比例计算页脚高度
    const paperFooter = this.height * paperFooterRatio;
    this.paperFooter = paperFooter || this.height;
    this.footerLinetarget.css("top", paperFooter + "pt");
    this.contentHeight = this.paperFooter - this.paperHeader;
    // 设置纸张后, 页码位置重置问题
    this.paperNumberLeft = this.paperNumberLeft > this.width ? parseInt((this.width - 30).toString()) : this.paperNumberLeft;
    this.paperNumberTop = this.paperNumberTop > this.height ? parseInt((this.height - 22).toString()) : this.paperNumberTop;
    this.paperNumberTarget.css("top", this.paperNumberTop + "pt");
    this.paperNumberTarget.css("left", this.paperNumberLeft + "pt");
    this.triggerOnPaperBaseInfoChanged("调整大小");
  }
  
  /**
   * 缩放
   * @param {number} scale 缩放比例
   */
  zoom(scale) {
    if (scale) {
      this.scale = scale;
      this.target.css("transform", "scale(" + scale + ")");
      if (scale > 1) {
        this.target.css("transform-origin", "-" + scale + "% -" + scale + "%");
      } else {
        this.target.css("transform-origin", "0 0");
      }
      this.triggerOnPaperBaseInfoChanged("缩放");
    }
  }
  
  /**
   * 获取页脚高度
   * @param {number} index 页面索引
   * @returns {number} 页脚高度
   */
  getPaperFooter(index) {
    const pageIndex = this.index + index;
    if (pageIndex == 0) {
      return this.firstPaperFooter ? this.firstPaperFooter : 
             this.oddPaperFooter ? this.oddPaperFooter : 
             this.paperFooter;
    } else if (pageIndex % 2 == 0) {
      return this.oddPaperFooter ? this.oddPaperFooter : this.paperFooter;
    } else if (pageIndex % 2 == 1) {
      return this.evenPaperFooter ? this.evenPaperFooter : this.paperFooter;
    }
  }
  
  /**
   * 获取内容高度
   * @param {number} index 页面索引
   * @returns {number} 内容高度
   */
  getContentHeight(index) {
    return this.getPaperFooter(index) - this.paperHeader;
  }
  
  /**
   * 创建标尺
   */
  createRuler() {
    this.target.append(`<div class="hiprint_rul_wrapper">
                     <img class="h_img" src="${lImg}" />
                     <img class="v_img" src="${vImg}" />
                    </div>`);
  }
  
  /**
   * 创建水印
   * @param {boolean} watch 是否监视
   * @param {number} idx 索引
   * @param {Object} opts 水印选项
   */
  createWaterMark(watch, idx, opts) {
    const self = this;
    const options = Object.assign({}, opts || {}, {
      id: `${self.templateId}_${self.panelIdx}_${idx || 1}_${watch ? 'design' : self.index}`,
      watch: watch,
      container: self.target[0]
    });
    if (!options.container) return;
    if (options.content) {
      if (watch) {
        watermark.destroyWatermark(Object.assign({}, options, {
          id: `${self.templateId}_${self.panelIdx}_${idx || 1}_${self.index}`
        }));
      }
      watermark.createWatermark(options);
    } else {
      watermark.destroyWatermark(options);
    }
  }
  
  /**
   * 获取显示高度
   * @returns {string} 显示高度
   */
  displayHeight() {
    return this.mmheight - PrintConfig.instance.paperHeightTrim + "mm";
  }
  
  /**
   * 获取显示宽度
   * @returns {string} 显示宽度
   */
  displayWidth() {
    return this.mmwidth + "mm";
  }
  
  /**
   * 获取面板目标元素
   * @returns {jQuery} 面板目标元素
   */
  getPanelTarget() {
    return this.target.parent(".hiprint-printPanel ");
  }
  }

  export default PrintPage;