import {i18n,$} from "../../hiprint.comm.js";
import hinnn from "../hinnn.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
import PrintLib from "../PrintLib.js";
import "../../plugins/jquery.tableEditor.js";
  
  class GridPrintElementOption extends PrintElementOption {
    constructor(option) {
      super(option);
    }
  }
  /**
   * 网格布局打印元素
   */
  class GridPrintElement extends BasePrintElement {
    constructor(elementType, options) {
      const instance = super(elementType) || this;
      instance.options = new GridPrintElementOption(options);
      instance.options.setDefault(new GridPrintElementOption(PrintConfig.instance.grid.default).getPrintElementOptionEntity());
      return instance;
    }
      // 设计
    design(designTarget, callback) {
      const that = this;
      this.designTarget.hidraggable({
        handle: this.designTarget.find(".hiprint-printElement-table-handle"),
        axis: that.options.axis || undefined,
        designTarget: that,
        onDrag: function onDrag(event, left, top) {
          that.updateSizeAndPositionOptions(left, top);
          that.createLineOfPosition(callback);
          PrintLib.instance.changed = true;
        },
        moveUnit: "pt",
        minMove: PrintConfig.instance.movingDistance,
        onBeforeDrag: function onBeforeDrag(event) {
          PrintLib.instance.draging = true;
          that.createLineOfPosition(callback);
        },
        getScale: function getScale() {
          return that.designPaper.scale || 1;
        },
        onStopDrag: function onStopDrag(event) {
          if (PrintLib.instance.changed) hinnn.event.trigger("hiprintTemplateDataChanged_" + that.templateId, "移动");
          PrintLib.instance.draging = false;
          PrintLib.instance.changed = false;
          that.removeLineOfPosition();
        }
      });

      this.designTarget.hireizeable({
        showPoints: that.getReizeableShowPoints(),
        showSizeBox: PrintConfig.instance.showSizeBox,
        noContainer: true,
        onBeforeResize: function onBeforeResize() {
          PrintLib.instance.draging = true;
        },
        getScale: function getScale() {
          return that.designPaper.scale || 1;
        },
        onResize: function onResize(event, height, width, top, left) {
          that.onResize(event, height, width, top, left);
          if (that.hitable) that.hitable.updateColumnGrips();
          that.createLineOfPosition(callback);
        },
        onStopResize: function onStopResize(event) {
          hinnn.event.trigger("hiprintTemplateDataChanged_" + that.templateId, event ? "旋转" : "大小");
          PrintLib.instance.draging = false;
          that.removeLineOfPosition();
        }
      });
      
      this.bindKeyboardMoveEvent(this.designTarget, callback);
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
      if (this.designTarget) {
        const data = this.getData();
        this.updateTargetGrid(this.designTarget, this.getTitle(), data);
        this.css(this.designTarget, data);
      }
    }
  
    // 获取配置选项
    getConfigOptions() {
      return PrintConfig.instance.grid;
    }
  
    // 获取标题
    getTitle() {
      let title = this.options.title || this.printElementType.title || "";
      return title;
    }
  
    // 获取数据
    getData(dataContext) {
      let data;
      const field = this.getField();
      //参考表格那边根据有没有数据来判断是否设计模式
      this.isNotDesign = dataContext !== undefined;
      if (dataContext) {
        if (field) {
          data = field.split('.').reduce((context, part) => {
            if (context) {
              return context[part];
            } else if (dataContext) {
              return dataContext[part];
            } else {
              return {};
            }
          }, false) || {};
        } else {
          data = dataContext;
        }
      } else {
        data = this.options.testData || this.printElementType.getData() || {};
      }
      //如果data是“{”开头的字符串，则解析为JSON对象
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data);
      }
      return data;
    }
  
    // 更新目标文本
    updateTargetGrid(target, title, value, extraParam, rowIndex) {
      const that = this;
      const contentElement = target.find(".hiprint-printElement-grid-content");
      if(this.options.gridHtml){
        contentElement.html(this.options.gridHtml);
      }
    //||"<table><tr><td>未知</td><td>未知</td></tr></table>"
      contentElement.find("td").each((index, element) => {
        const filed = $(element).attr("data-columnfield");
        if (filed){
          $(element).html(value[filed]);
        }else{
          const title = $(element).attr("data-title");
          $(element).html(title||" ");
        }
      });
      
      const $selCells = contentElement.find(".hiprint-selected-cell");
      //只有在设计模式才需要变成拖拉拽模式
      if(this.isNotDesign){
        // 移除选中单元格
        $selCells.removeClass("hiprint-selected-cell");
      }else{
        contentElement.find("table").tableEditor({
          // 单个单元格选中事件
          onCellsSelect: onCellsSelect,
          // 单元格大小改变事件
          onCellResize: function($cell, size) {
            // that.options.width = hinnn.px.toPt(contentElement.find("table").width());
            // that.options.height = hinnn.px.toPt(contentElement.find("table").height());
            // that.updateTargetSize(target);
            that.options.gridHtml = contentElement.html();
          }
        });
        //禁止冒泡，导致列选项无法显示
        contentElement.find("table").click(function(event){event.stopPropagation();})
        if ($selCells.length){
          onCellsSelect($selCells);
        }
      }

      function onCellsSelect($cell) {
        const columnOptions = that.getPrintElementOptionItemsByName("gridCell");
        const column = {};
        columnOptions.forEach(option => {
          column[option.name] = $cell.attr("data-" + option.name.toLowerCase());
        });
        hinnn.event.trigger(that.getPrintElementSelectEventKey(), {
          printElement: that,
          customOptionsInput: [{
            title: (column.title || "未知"),
            optionItems: columnOptions,
            options: column,
            callback: function callback(newOptions) {
              //hFontWeight hFontSize hFontColor hFontFamily hTextAlign
              that.fillCss($cell, newOptions);
              // 移除所有的resize-handle
              contentElement.find(".hiprint-resize-handle").remove();
              that.options.gridHtml = contentElement.html();
            }
          }]
        });
    }
    }
    static cssMap = {
      "hFontWeight": "font-weight",
      "hFontSize": "font-size",
      "hColor": "color",
      "align": "text-align",
      "vAlign": "vertical-align",
      "paddingLeft": "padding-left",
      "paddingRight": "padding-right",
    }
    // 根据选项赋值单元格样式
    fillCss($cell, cellOptions){
      Object.keys(cellOptions).forEach((key) => {
        if (cellOptions[key] && GridPrintElement.cssMap[key]) {
          $cell.css(GridPrintElement.cssMap[key], cellOptions[key]);
        }
        $cell.attr("data-"+key.toLowerCase(), cellOptions[key]);
      });
    }
  
    // 当元素调整大小时
    onResize(event, ui, width, height, forceUpdate) {
      super.onResize(event, ui, width, height, forceUpdate);
    }
  
    // 创建目标元素
    createTarget(title, data, extraParam) {
      const target = $('<div tabindex="1" class="hiprint-printElement hiprint-printElement-grid" style="position: absolute;"><div class="hiprint-printElement-table-handle" style=""></div><div class="hiprint-printElement-grid-content" style="height:100%;width:100%"></div></div>');
      this.updateTargetGrid(target, title, data, extraParam);
      return target;
    }
  
    // 获取 HTML
    getHtml(paper, templateData, extraParam) {
      return this.getHtml2(paper, templateData, extraParam);
    }
  }

  export default GridPrintElement;