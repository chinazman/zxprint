"use strict";

/**
 * import 相关资源
 */
import {i18n,$,_instanceof} from "../hiprint.comm.js";
import BasePrintElement from "./04BasePrintElement.js";
import PrintConfig from "./01PrintConfig.js";
import PaperHtmlResult from "./06PaperHtmlResult.js";
import hinnn from "./00hinnn.js";
import PrintReferenceElement from "./08PrintReferenceElement.js";
import TablePrintElementOption from "./18TablePrintElementOption.js";
import TableExcelHelper from "./07TableExcelHelper.js";
import PrintTable from "./16PrintTable.js";
import GridColumnStructure from "./20GridColumnsStructure.js";
import PrintLib from "./02PrintLib.js";

  


    class  TablePrintElement extends BasePrintElement {
      constructor(printElementType, options) {
          super(printElementType);
           this.gridColumnsFooterCss = "hiprint-gridColumnsFooter";
           this.tableGridRowCss = "table-grid-row";
           this.options = new TablePrintElementOption(options, this.printElementType);
           this.options.setDefault(new TablePrintElementOption(PrintConfig.instance.table.default).getPrintElementOptionEntity());
        }

getColumns () {
          return this.options.columns;
        }
// 通过列ID获取列
getColumnByColumnId(columnId) {
  return this.options.getColumnByColumnId(columnId);
}

// 根据选项更新设计视图
updateDesignViewFromOptions() {
  if (this.designTarget) {
    let contentElement = this.designTarget.find(".hiprint-printElement-table-content"),
        htmlContent = this.getHtml(this.designPaper);
    contentElement.html("");
    contentElement.append(htmlContent[0].target.find(".table-grid-row"));
    if (this.printElementType.editable) {
      this.setHitable();
    }
    this.setColumnsOptions();
    // 渲染完再处理样式 ==> fix 表脚边框参数设置问题
    this.css(this.designTarget, this.getData());
  }
}

// 设置样式
css(target, data) {
  if ((this.getField() || !this.options.content) && !this.printElementType.formatter) {
    return super.css(target, data);
  }
}

// 获取设计目标
getDesignTarget(designPaper) {
  this.designTarget = this.getHtml(designPaper)[0].target;
  this.css(this.designTarget, this.getData());
  this.designPaper = designPaper;
  this.designTarget.find("td").hidroppable({
    accept: ".rn-draggable-item",
    onDrop: function onDrop(event, ui) {},
    onDragEnter: function onDragEnter(event, ui) {
      $(ui).removeClass("rn-draggable-item");
    },
    onDragLeave: function onDragLeave(event, ui) {
      $(ui).addClass("rn-draggable-item");
    }
  });
  return this.designTarget;
}

// 获取配置选项
getConfigOptions() {
  return PrintConfig.instance.table;
}

// 创建目标元素
createTarget(title, data, gridColumns) {
  let targetElement = $('<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>'),
      gridColumnsStructure = this.createGridColumnsStructure(gridColumns);
  
  for (let i = 0; i < gridColumnsStructure.gridColumns; i++) {
    gridColumnsStructure.getByIndex(i).append(this.getTableHtml(data, gridColumns));
  }

  targetElement.find(".hiprint-printElement-table-content").append(gridColumnsStructure.target);
  return targetElement;
}

// 创建网格列结构
createGridColumnsStructure(gridColumns) {
  let gridRow = $('<div class="hi-grid-row table-grid-row"></div>');
  
  for (let i = 0; i < this.options.getGridColumns(); i++) {
    let column = $('<div class="tableGridColumnsGutterRow hi-grid-col" style="width:' + 100 / this.options.getGridColumns() + '%;"></div>');
    gridRow.append(column);
  }

  let footerFormatter = this.getGridColumnsFooterFormatter();
  
  if (footerFormatter) {
    let footer = $('<div class="hiprint-gridColumnsFooter"></div>');
    footer.append(footerFormatter(this.options, this.getData(gridColumns), gridColumns, []));
    gridRow.append(footer);
  }

  return new GridColumnStructure(this.options.getGridColumns(), gridRow);
}

// 创建临时空行目标结构
createTempEmptyRowsTargetStructure() {
  if (this.getField()) {
    return this.createTarget(this.printElementType.title, []);
  }
  let clonedTarget = this.createTarget(this.printElementType.title, []).clone();
  clonedTarget.find(".hiprint-printElement-tableTarget tbody tr").remove();
  return clonedTarget;
}

/**
 * 获取表格的HTML
 * @param {Object} data - 表格数据
 * @param {Object} options - 额外的选项
 * @returns {jQuery} 生成的表格jQuery对象
 */
getTableHtml(data, options) {
  let containerDiv, tableElement;

  // 如果没有设置字段且有内容选项，直接返回内容
  if (!this.getField() && this.options.content) {
    containerDiv = $("<div></div>").append(this.options.content);
    tableElement = containerDiv.find("table").addClass("hiprint-printElement-tableTarget");
    return tableElement;
  }

  // 如果有格式化函数，使用格式化函数处理
  if (this.printElementType.formatter) {
    containerDiv = $("<div></div>").append(this.printElementType.formatter(data));
    tableElement = containerDiv.find("table").addClass("hiprint-printElement-tableTarget");
    return tableElement;
  }

  // 创建表格
  let table = $('<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;"></table>');
  
  // 创建表头
  let columnWidth = this.options.getWidth() / this.options.getGridColumns();
  let headerList = TableExcelHelper.createTableHead(this.getColumns(), columnWidth);

  // 根据是否为设计模式决定如何添加表头
  if (this.isNotDesign) {
    table.append(headerList);
  } else {
    table.append(headerList[0]);
  }

  // 创建表格主体
  table.append(TableExcelHelper.createTableRow(this.getColumns(), data, options, this.options, this.printElementType));

  // 处理表格脚注
  if (this.options.tableFooterRepeat !== "no") {
    let footer = TableExcelHelper.createTableFooter(this.printElementType.columns, data, this.options, this.printElementType, options, data);
    footer.insertBefore(table.find("tbody"));
  }

  return table;
}
// 获取空行目标
getEmptyRowTarget() {
  return TableExcelHelper.createEmptyRowTarget(this.getColumns(), this);
}

// 获取HTML
getHtml(paper, isDesign) {
  this.createTempContainer();
  this.isNotDesign = isDesign !== undefined;
  let htmlResult = this.getPaperHtmlResult(paper, isDesign);
  this.removeTempContainer();
  return htmlResult;
}

// 获取纸张HTML结果
getPaperHtmlResult(paper, isDesign) {
  let paperHtmlResults = [],
      data = this.getData(isDesign),
      tableHtml = this.getTableHtml(data, isDesign),
      tempEmptyRowsTarget = this.createTempEmptyRowsTargetStructure(isDesign);
  
  if (isDesign) {
    this.updateTargetWidth(tempEmptyRowsTarget);
  } else {
    this.updateTargetSize(tempEmptyRowsTarget);
  }
  
  this.css(tempEmptyRowsTarget, data);
  this.css(tableHtml, data);
  this.getTempContainer().html("");
  this.getTempContainer().append(tempEmptyRowsTarget);
  
  // 页脚导致分页高度的问题, -> 获取到表格脚高度后移除避免重复
  let tableFooterHeight = tempEmptyRowsTarget.find('tfoot').outerHeight() || 0;
  tempEmptyRowsTarget.find('tfoot').remove();
  
  let beginPrintTop = this.getBeginPrintTopInPaperByReferenceElement(paper),
      pageIndex = 0,
      isEnd = false;
  
  while (!isEnd) {
    let availableHeight = 0,
        paperFooterHeight = paper.getPaperFooter(pageIndex);
    
    if (pageIndex === 0 && beginPrintTop > paperFooterHeight && paper.panelPageRule !== "none") {
      beginPrintTop = beginPrintTop - paperFooterHeight + paper.paperHeader;
      paperHtmlResults.push(new PaperHtmlResult({ target: undefined, printLine: undefined }));
      availableHeight = paper.getContentHeight(pageIndex) - (beginPrintTop - paper.paperHeader);
      pageIndex++;
      paperFooterHeight = paper.getPaperFooter(pageIndex);
    }
    
    let previousTarget = paperHtmlResults.length > 0 ? paperHtmlResults[paperHtmlResults.length - 1].target : undefined,
        rowResult = this.getRowsInSpecificHeight(isDesign, availableHeight > 0 ? availableHeight : (pageIndex === 0 ? paperFooterHeight - beginPrintTop : paper.getContentHeight(pageIndex)), tempEmptyRowsTarget, tableHtml, pageIndex, previousTarget, tableFooterHeight);
    
    isEnd = rowResult.isEnd;
    
    if (availableHeight < 0) {
      paperHtmlResults[0].target = $(`<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__('没有足够空间进行表格分页，请调整页眉/页脚线')}</div>`);
      paperHtmlResults[0].printLine = beginPrintTop;
      paperHtmlResults[0].referenceElement = new PrintReferenceElement({
        top: this.options.getTop(),
        left: this.options.getLeft(),
        height: this.options.getHeight(),
        width: this.options.getWidth(),
        beginPrintPaperIndex: paper.index,
        bottomInLastPaper: beginPrintTop + this.options.lHeight,
        printTopInPaper: beginPrintTop
      });
      paperHtmlResults[0].target.css("top", `${beginPrintTop}pt`);
      paperHtmlResults[0].target.css("left", this.options.displayLeft());
      break;
    }
    
    let topPosition;
    
    if (rowResult.target) {
      rowResult.target.css("left", this.options.displayLeft());
      rowResult.target[0].height = "";
    }
    
    if (pageIndex === 0 || availableHeight > 0) {
      if (rowResult.target) {
        topPosition = beginPrintTop;
        rowResult.target.css("top", `${beginPrintTop}pt`);
      }
      beginPrintTop = isEnd && this.options.lHeight !== null ? beginPrintTop + Math.max(rowResult.height, this.options.lHeight) : beginPrintTop + rowResult.height;
    } else {
      if (rowResult.target) {
        topPosition = paper.paperHeader;
        rowResult.target.css("top", `${paper.paperHeader}pt`);
      }
      beginPrintTop = paper.paperHeader + rowResult.height;
    }
    
    paperHtmlResults.push(new PaperHtmlResult({
      target: rowResult.target,
      printLine: beginPrintTop,
      referenceElement: new PrintReferenceElement({
        top: this.options.getTop(),
        left: this.options.getLeft(),
        height: this.options.getHeight(),
        width: this.options.getWidth(),
        beginPrintPaperIndex: paper.index,
        bottomInLastPaper: beginPrintTop,
        printTopInPaper: topPosition
      })
    }));
    
    pageIndex++;
    
    if (isDesign) {
      this.updatePanelHeight(beginPrintTop + this.options.getHeight(), paper);
    }
  }

  return paperHtmlResults;
}

/**
 * 获取特定高度内的行
 * @param {boolean} isRealData - 是否为真实数据
 * @param {number} specificHeight - 指定高度
 * @param {jQuery} tableContainer - 表格容器
 * @param {jQuery} tableElement - 表格元素
 * @param {number} pageIndex - 页面索引
 * @param {boolean} isEnding - 是否结束
 * @param {number} footerHeight - 页脚高度
 * @returns {Object} 包含目标、长度、高度和是否结束的对象
 */
getRowsInSpecificHeight(isRealData, specificHeight, tableContainer, tableElement, pageIndex, isEnding, footerHeight) {
  var that = this;
  var tbody = tableElement.find("tbody");
  var heightInPx = hinnn.pt.toPx(specificHeight);

  tableContainer.find(".hiprint-printElement-tableTarget tbody").html("");
  // 不是最后显示页脚
  if ("last" != this.options.tableFooterRepeat) {
    tableContainer.find(".hiprint-printElement-tableTarget tfoot").remove();
  }
  // 仅首页显示表头
  if ("first" == this.options.tableHeaderRepeat && pageIndex > 0) {
    tableContainer.find(".hiprint-printElement-tableTarget thead").remove();
  } else if ("none" == this.options.tableHeaderRepeat) {
    // 有数据（不是design）
    if (isRealData) {
      tableContainer.find(".hiprint-printElement-tableTarget thead").remove();
    } else {
      tableContainer.find(".hiprint-printElement-tableTarget thead").css("background", "firebrick");
      tableContainer.find(".hiprint-printElement-tableTarget thead tr").css("background", "firebrick");
    }
  }
  var noPaging = "none" == this.panel.panelPageRule;
  // 不分页, 且不是设计时, 移除 thead
  var headTr;
  if (isRealData && noPaging) {
    var headStyle = tableContainer.find(".hiprint-printElement-tableTarget thead").attr("style");
    headTr = tableContainer.find(".hiprint-printElement-tableTarget thead tr").clone();
    if (headStyle) {
      headTr.attr("style", headStyle);
    } else {
      headTr.css({ "background": "#e8e8e8" });
    }
    tableContainer.find(".hiprint-printElement-tableTarget thead").remove();
  }
  var containerHeight = tableContainer.outerHeight();
  if (!noPaging && containerHeight > heightInPx) return {
    target: void 0,
    length: 0,
    height: 0,
    isEnd: false
  };
  var gridColumns = this.options.getGridColumns();
  var allRowsData = [];
  for (var columnIndex = 0; columnIndex < gridColumns; columnIndex++) {
    var currentTable = tableContainer.find(".hiprint-printElement-tableTarget:eq(" + columnIndex + ")");
    var result;
    var currentRowsData = [];
    for (;;) {
      // 不分页处理
      if (noPaging) {
        var trLen = tbody.find("tr").length;
        if (0 == trLen) {
          result = {
            height: hinnn.px.toPt(containerHeight),
            isEnd: true
          };
          if (isRealData && this.options.autoCompletion) {
            this.autoCompletion(heightInPx, currentTable, footerHeight);
            containerHeight = tableContainer.outerHeight();
          }
        } else {
          let currentRow = tbody.find("tr:lt(1)");
          if (currentRowsData.length == 0 && headTr) {
            currentTable.find("tbody").append(headTr);
          }
          currentTable.find("tbody").append(currentRow);
          var rowData = currentRow.data("rowData");
          allRowsData.push(rowData);
          currentRowsData.push(rowData);
          containerHeight = tableContainer.outerHeight();
          if (0 == trLen) {
            tbody.prepend(currentRow);
            allRowsData.pop();
            currentRowsData.pop();
            result = {
              height: hinnn.px.toPt(containerHeight),
              isEnd: false
            };
          }
        }
      } else {
        if (containerHeight <= heightInPx) {
          if (0 == tbody.find("tr").length) {
            result = {
              height: hinnn.px.toPt(containerHeight),
              isEnd: true
            };
            if (isRealData && this.options.autoCompletion) {
              this.autoCompletion(heightInPx, currentTable, footerHeight);
              containerHeight = currentTable.outerHeight();
            }
          } else {
            let currentRow = tbody.find("tr:lt(1)");
            if (that.options.rowsColumnsMerge && (pageIndex > 0 || columnIndex > 0) && currentRowsData.length == 0) {
              currentRow = that.fixMergeSpan(currentRow, tbody);
            }
            currentTable.find("tbody").append(currentRow);
            var rowData = currentRow.data("rowData");
            allRowsData.push(rowData);
            currentRowsData.push(rowData);
            containerHeight = currentTable.outerHeight();
            if (("last" == this.options.tableFooterRepeat ? containerHeight : containerHeight += footerHeight) > heightInPx || (this.options.maxRows && currentRowsData.length > +this.options.maxRows)) {
              tbody.prepend(currentRow);
              allRowsData.pop();
              currentRowsData.pop();
              containerHeight = currentTable.outerHeight();
              result = {
                height: hinnn.px.toPt(containerHeight),
                isEnd: false
              };
            }
          }
        }
      }

      if (result) {
        // 这里是table 没有tfoot, 后面再看什么原因...
        if ("last" == this.options.tableFooterRepeat && !result.isEnd) break;
        if ("no" !== this.options.tableFooterRepeat) {
          if (noPaging) {
            currentTable.find("tbody").append(TableExcelHelper.createTableFooter(this.printElementType.columns, this.getData(isRealData), this.options, this.printElementType, isRealData, currentRowsData).children());
          } else {
            TableExcelHelper.createTableFooter(this.printElementType.columns, this.getData(isRealData), this.options, this.printElementType, isRealData, currentRowsData).insertBefore(currentTable.find("tbody"));
          }
          that.css(currentTable, isRealData);
        }
        break;
      }
    }
  }

  var rowCount = tableContainer.find(".hiprint-printElement-tableTarget tbody tr").length;
  var footerFormatter = this.getGridColumnsFooterFormatter();
  if (footerFormatter) {
    tableContainer.find(this.gridColumnsFooterCss).html(footerFormatter(this.options, this.getData(isRealData), isRealData, allRowsData));
  }
  containerHeight = tableContainer.outerHeight();
  // 当每一页数据,都无法容纳表格行内容时:
  let currentRow = tbody.find("tr:lt(1)");
  if (rowCount == 0 && currentRow.length && rowData == currentRow.data("rowData")) {
    currentTable.find("tbody").append(currentRow);
    let height = currentTable.find("tbody tr").outerHeight();
    tbody.prepend(currentRow);
    return {
      target: $(`<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__('没有足够空间,显示下方内容, 可分页高度')}: ` + heightInPx + `px < ${i18n.__('当前需要高度')}: ` + height + 'px</div>').append(currentRow.css("background", "blue")),
      length: rowCount,
      height: hinnn.px.toPt(containerHeight),
      isEnd: false
    };
  }
  // 方便调试看 值...
  var result = 0 == tbody.find("tr").length ? 0 == rowCount && isEnding ? {
    target: void 0,
    length: 0,
    height: 0,
    isEnd: true
  } : {
    target: tableContainer.clone(),
    length: rowCount,
    height: hinnn.px.toPt(containerHeight),
    isEnd: true
  } : {
    target: tableContainer.clone(),
    length: rowCount,
    height: hinnn.px.toPt(containerHeight),
    isEnd: false
  };
  return result;
}
// 修复合并单元格
fixMergeSpan(tr, tbody) {
  const nextRowMap = new Map();
  tr.children().each((index, td) => {
    const field = $(td).attr('field');
    nextRowMap.set(field, { rowSpan: 1, rowEnd: false });

    tr.nextAll().each((nextIndex, nextTr) => {
      if ($(nextTr).has(`td[field=${field}][rowspan=0]`).length && !nextRowMap.get(field).rowEnd) {
        nextRowMap.set(field, { rowSpan: nextRowMap.get(field).rowSpan + 1, rowEnd: false });
      } else {
        nextRowMap.set(field, { ...nextRowMap.get(field), rowEnd: true });
      }
    });

    if ($(td).attr("rowspan") < 1) {
      $(td).attr("rowspan", nextRowMap.get(field).rowSpan);
      $(td).css("display", "");
      if (this.options.rowsColumnsMergeClean) {
        $(td).text("");
      }
    }
  });
  return tr;
}

// 自动补全
autoCompletion(maxHeight, table, footerHeight) {
  const that = this;
  let newRow;
  const emptyRowTemplate = this.getEmptyRowTarget();
  let currentHeight = table.outerHeight() + footerHeight;

  while (maxHeight > currentHeight) {
    newRow = emptyRowTemplate.clone();
    table.find("tbody").append(newRow);
    currentHeight = table.outerHeight() + footerHeight;
    if (that.options.maxRows && table.find("tbody").children().length > that.options.maxRows) {
      break;
    }
  }

  if (newRow) newRow.remove();
}

// 获取数据
getData(isDesign) {
  if (!isDesign) {
    // 设计时表格 测试数据
    try {
      const testData = this.options.testData || '[{}]';
      return JSON.parse(testData);
    } catch (error) {
      console.log('table testData parse error', error);
      return [{}];
    }
  }

  const field = this.getField();
  const data = field ? field.split('.').reduce((obj, key) => obj ? obj[key] : (isDesign ? isDesign[key] : ""), false) || "" : "";
  return data ? JSON.parse(JSON.stringify(data)) : [];
}

// 调整大小
onResize(newWidth, newHeight, oldWidth, oldHeight, updateOptions) {
  super.updateSizeAndPositionOptions(updateOptions, oldHeight, oldWidth, newHeight);
  TableExcelHelper.resizeTableCellWidth(this.designTarget, this.getColumns(), this.options.getWidth());
}

// 获取可调整显示点
getReizeableShowPoints() {
  return ["s", "e"];
}

// 设计
design(designTarget, callback) {
  const that = this;
  this.designTarget.hidraggable({
    handle: this.designTarget.find(".hiprint-printElement-table-handle"),
    axis: that.options.axis || undefined,
    designTarget: that,
    onDrag: function onDrag(event, ui, position) {
      that.updateSizeAndPositionOptions(ui, position);
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

  if (this.printElementType.editable) this.setHitable();

  this.setColumnsOptions();

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
    onResize: function onResize(event, ui, oldSize, newSize) {
      that.onResize(event, ui, oldSize, newSize, callback);
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

// 设置可点击表格
setHitable() {
  const that = this;
  this.hitable = new PrintTable({
    templateId: that.templateId,
    table: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)"),
    rows: this.getColumns(),
    resizeRow: false,
    resizeColumn: true,
    fields: this.options.fields,
    trs: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("tbody tr"),
    handle: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("thead"),
    isEnableEdit: this.printElementType.editable || true,
    columnDisplayEditable: this.printElementType.columnDisplayEditable !== undefined ? this.printElementType.columnDisplayEditable : true,
    columnDisplayIndexEditable: this.printElementType.columnDisplayIndexEditable !== undefined ? this.printElementType.columnDisplayIndexEditable : true,
    columnResizable: this.printElementType.columnResizable !== undefined ? this.printElementType.columnResizable : true,
    columnAlignEditable: this.printElementType.columnAlignEditable !== undefined ? this.printElementType.columnAlignEditable : true,
    isEnableEditText: this.printElementType.columnTitleEditable !== undefined ? this.printElementType.columnTitleEditable : true,
    isEnableEditField: this.printElementType.isEnableEditField !== undefined ? this.printElementType.isEnableEditField : true,
    isEnableContextMenu: this.printElementType.isEnableContextMenu !== undefined ? this.printElementType.isEnableContextMenu : true,
    isEnableInsertRow: this.printElementType.isEnableInsertRow !== undefined ? this.printElementType.isEnableInsertRow : true,
    isEnableDeleteRow: this.printElementType.isEnableDeleteRow !== undefined ? this.printElementType.isEnableDeleteRow : true,
    isEnableInsertColumn: this.printElementType.isEnableInsertColumn !== undefined ? this.printElementType.isEnableInsertColumn : true,
    isEnableDeleteColumn: this.printElementType.isEnableDeleteColumn !== undefined ? this.printElementType.isEnableDeleteColumn : true,
    isEnableMergeCell: this.printElementType.isEnableMergeCell !== undefined ? this.printElementType.isEnableMergeCell : true
  });

  hinnn.event.on("updateTable" + this.hitable.id, function () {
    that.updateDesignViewFromOptions();
    hinnn.event.trigger("hiprintTemplateDataChanged_" + that.templateId, "调整表头");
  });
}

// 设置列选项
setColumnsOptions() {
  const that = this;
  this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("thead td").on("click.hiprint", function (event) {
    const columnId = $(event.target).attr("id") || $(event.target).attr("column-id");
    const column = that.getColumnByColumnId(columnId);

    if (column) {
      const columnOptions = that.getPrintElementOptionItemsByName("tableColumn");

      hinnn.event.trigger(that.getPrintElementSelectEventKey(), {
        printElement: that,
        customOptionsInput: [{
          title: (column.title || `${column.id}(id)`) + `-${i18n.__('列属性')}`,
          optionItems: columnOptions,
          options: column,
          callback: function callback(newOptions) {
            columnOptions.forEach(option => {
              const value = option.getValue();
              if (option.name === "title" && value && !value.trim().endsWith("#") && !value.trim().startsWith("#")) {
                const titleParts = value ? value.split("#") : "";
                column.title = titleParts[0];
                if (titleParts.length > 1) column.columnId = column.field = titleParts[1];
                if (column.columnId) column.target.attr("column-id", column.columnId);
                option.target.find("textarea").val(titleParts[0]);
                return;
              }
              column[option.name] = value;
            });
          }
        }]
      });
    } else {
      hinnn.event.trigger(that.getPrintElementSelectEventKey(), {
        printElement: that
      });
    }
  });
}


// 过滤选项
filterOptionItems(optionItems) {
  const filteredOptionItems = super.filterOptionItems(optionItems);
  return this.printElementType.editable && this.options.columns.length === 1 ? filteredOptionItems : optionItems.filter(option => option.name !== "columns");
}

// 获取页脚格式化器
getFooterFormatter() {
  let footerFormatter;
  if (this.printElementType.footerFormatter) footerFormatter = this.printElementType.footerFormatter;
  if (this.options.footerFormatter) {
    try {
      const formatterScript = "footerFormatter=" + this.options.footerFormatter;
      eval(formatterScript);
    } catch (error) {
      console.log(error);
    }
  }
  return footerFormatter;
}

// 获取网格列页脚格式化器
getGridColumnsFooterFormatter() {
  let gridColumnsFooterFormatter;
  if (this.printElementType.gridColumnsFooterFormatter) gridColumnsFooterFormatter = this.printElementType.gridColumnsFooterFormatter;
  if (this.options.gridColumnsFooterFormatter) {
    try {
      const formatterScript = "gridColumnsFooterFormatter=" + this.options.gridColumnsFooterFormatter;
      eval(formatterScript);
    } catch (error) {
      console.log(error);
    }
  }
  return gridColumnsFooterFormatter;
}
      }
export default TablePrintElement;