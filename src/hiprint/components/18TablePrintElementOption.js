import { _instanceof } from "../hiprint.comm.js";
import PrintElementOption from "./03PrintElementOption.js";
import PrintElementTableRow from "./12PrintElementTableRow.js";
import PrintTableCell from "./05PrintTableCell.js";

/**
 * 表格列选项类
 */
class TableColumnOption {
  constructor(options) {
    this.width = options.width;
    this.title = options.title;
    this.field = options.field;
    this.checked = options.checked;
    this.columnId = options.columnId;
    this.fixed = false;
    this.rowspan = options.rowspan || 1;
    this.colspan = options.colspan || 1;
    this.align = options.align;
    this.halign = options.halign;
    this.vAlign = options.vAlign;
    this.renderFormatter = options.renderFormatter;
    this.formatter2 = options.formatter2;
    this.styler2 = options.styler2;
    this.stylerHeader = options.stylerHeader;
    this.tableColumnHeight = options.tableColumnHeight;
    this.tableTextType = options.tableTextType;
    this.tableBarcodeMode = options.tableBarcodeMode;
    this.tableQRCodeLevel = options.tableQRCodeLevel;
    this.tableSummaryTitle = options.tableSummaryTitle;
    this.tableSummaryText = options.tableSummaryText;
    this.tableSummaryColspan = options.tableSummaryColspan;
    this.tableSummary = options.tableSummary;
    this.tableSummaryAlign = options.tableSummaryAlign;
    this.tableSummaryNumFormat = options.tableSummaryNumFormat;
    this.tableSummaryFormatter = options.tableSummaryFormatter;
    this.showCodeTitle = options.showCodeTitle;
    this.upperCase = options.upperCase;
  }
}

/**
 * 表格打印元素选项类
 */
class TablePrintElementOption extends PrintElementOption {
  constructor(options, printElement) {
    options = options || {};
    super(options);
    
    this.lHeight = options.lHeight;
    this.autoCompletion = options.autoCompletion;
    this.tableFooterRepeat = options.tableFooterRepeat;

    if (printElement) {
      this.columns = [];
      // 如果是可编辑的并且有列定义
      if (printElement.editable && options.columns && options.columns.length) {
        options.columns.forEach(row => {
          const rowColumns = [];
          row.forEach(col => {
            const columnOption = new TableColumnOption(col);
            const existingColumn = printElement.getColumnByColumnId(columnOption.columnId);
            // 如果列已存在，则扩展它，否则创建新的列
            const column = existingColumn ? $.extend(existingColumn, columnOption) : new PrintTableCell(columnOption);
            rowColumns.push(column);
          });
          this.columns.push(new PrintElementTableRow(rowColumns));
        });
      } else {
        // 否则直接使用打印元素的列
        printElement.columns.forEach(row => {
          this.columns.push(new PrintElementTableRow(row));
        });
      }
    }
  }

  /**
   * 根据列ID获取列
   */
  getColumnByColumnId(columnId) {
    return this.makeColumnObj()[columnId];
  }

  /**
   * 创建列对象
   */
  makeColumnObj() {
    const columnObj = {};
    if (this.columns) {
      this.columns.forEach(row => {
        row.columns.forEach(col => {
          if (col.id || col.columnId) {
            columnObj[col.id || col.columnId] = col;
          }
        });
      });
    }
    return columnObj;
  }

  /**
   * 获取网格列数
   */
  getGridColumns() {
    return this.gridColumns || 1;
  }

  /**
   * 获取打印元素选项实体
   */
  getPrintElementOptionEntity() {
    const entity = super.getPrintElementOptionEntity();
    entity.fields = this.fields;
    
    // 处理列
    if (this.columns) {
      entity.columns = [];
      this.columns.forEach(row => {
        const rowColumns = row.getPrintElementOptionEntity().map(col => new TableColumnOption(col));
        entity.columns.push(rowColumns);
      });
    }
    
    return entity;
  }
}

export default TablePrintElementOption;