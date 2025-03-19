import {$} from "../hiprint.comm.js";
import PrintTableCell from "./PrintTableCell.js";
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
import TablePrintElement from "./elements/TablePrintElement.js";
import GridPrintElement from "./elements/GridPrintElement.js";

// 打印元素实体类
class PrintElementTypeEntity {
    constructor(options) {
      this.title = options.title;
      this.type = options.type;
    }
  }
  
  // 表格实体类
  class TableEntity {
    constructor(options) {
      this.title = options.title;
      this.type = options.type;
      this.editable = options.editable;
      this.columnDisplayEditable = options.columnDisplayEditable;
      this.columnDisplayIndexEditable = options.columnDisplayIndexEditable;
      this.columnTitleEditable = options.columnTitleEditable;
      this.columnResizable = options.columnResizable;
      this.columnAlignEditable = options.columnAlignEditable;
      this.isEnableEditField = options.isEnableEditField;
      this.isEnableContextMenu = options.isEnableContextMenu;
      this.isEnableInsertRow = options.isEnableInsertRow;
      this.isEnableDeleteRow = options.isEnableDeleteRow;
      this.isEnableInsertColumn = options.isEnableInsertColumn;
      this.isEnableDeleteColumn = options.isEnableDeleteColumn;
      this.isEnableMergeCell = options.isEnableMergeCell;
    }
  }
  
  // 打印元素类型
  class PrintElementTypeTable {
    constructor(options) {
      const self = this;
      this.text = options.text;
      this.field = options.field;
      this.fields = options.fields;
      this.title = options.title;
      this.tid = options.tid;
      this.data = options.data;
      this.hiddenExpression = options.hiddenExpression;
      this.formatterExpression = options.formatterExpression;
      this.styler = options.styler;
      this.formatter = options.formatter;
      this.type = options.type;
      this.options = options.options;
      this.editable = options.editable !== undefined ? options.editable : true;
      this.columnDisplayEditable = options.columnDisplayEditable !== undefined ? options.columnDisplayEditable : true;
      this.columnDisplayIndexEditable = options.columnDisplayIndexEditable !== undefined ? options.columnDisplayIndexEditable : true;
      this.columnTitleEditable = options.columnTitleEditable !== undefined ? options.columnTitleEditable : true;
      this.columnResizable = options.columnResizable !== undefined ? options.columnResizable : true;
      this.columnAlignEditable = options.columnAlignEditable !== undefined ? options.columnAlignEditable : true;
      this.columns = [];
      (options.columns || []).forEach(function (column, index) {
        self.columns.push(self.createTableColumnArray(column));
      });
      this.rowStyler = options.rowStyler;
      this.striped = options.striped;
      this.groupFields = options.groupFields || [];
      this.groupFormatter = options.groupFormatter;
      this.groupFooterFormatter = options.groupFooterFormatter;
      this.footerFormatter = options.footerFormatter;
      this.rowsColumnsMerge = options.rowsColumnsMerge;
      this.rowsColumnsMergeClean = options.rowsColumnsMergeClean;
      this.gridColumnsFooterFormatter = options.gridColumnsFooterFormatter;
      this.isEnableEditField = options.isEnableEditField !== undefined ? options.isEnableEditField : true;
      this.isEnableContextMenu = options.isEnableContextMenu !== undefined ? options.isEnableContextMenu : true;
      this.isEnableInsertRow = options.isEnableInsertRow !== undefined ? options.isEnableInsertRow : true;
      this.isEnableDeleteRow = options.isEnableDeleteRow !== undefined ? options.isEnableDeleteRow : true;
      this.isEnableInsertColumn = options.isEnableInsertColumn !== undefined ? options.isEnableInsertColumn : true;
      this.isEnableDeleteColumn = options.isEnableDeleteColumn !== undefined ? options.isEnableDeleteColumn : true;
      this.isEnableMergeCell = options.isEnableMergeCell !== undefined ? options.isEnableMergeCell : true;
      this.columnObj = this.makeColumnObj();
    }
  
    getText() {
      return this.text || this.title || "";
    }
  
    createPrintElement(options) {
      const self = this;
      if (this.columns && this.columns.length == 0) {
        (options.columns || []).forEach(function (column, index) {
          self.columns.push(self.createTableColumnArray(column));
        });
      }
      return new TablePrintElement(this, options);
    }
  
    getData() {
      return [{}];
    }
  
    createTableColumnArray(columns) {
      const tableColumns = [];
      columns.forEach(function (column, index) {
        tableColumns.push(new PrintTableCell(column));
      });
      return tableColumns;
    }
  
    getPrintElementTypeEntity() {
      if ('table' == this.type) {
        return new TableEntity({
          title: this.title,
          type: this.type,
          editable: this.editable,
          columnDisplayEditable: this.columnDisplayEditable,
          columnDisplayIndexEditable: this.columnDisplayIndexEditable,
          columnResizable: this.columnResizable,
          columnAlignEditable: this.columnAlignEditable,
          columnTitleEditable: this.columnTitleEditable,
          isEnableEditField: this.isEnableEditField,
          isEnableContextMenu: this.isEnableContextMenu,
          isEnableInsertRow: this.isEnableInsertRow,
          isEnableDeleteRow: this.isEnableDeleteRow,
          isEnableInsertColumn: this.isEnableInsertColumn,
          isEnableDeleteColumn: this.isEnableDeleteColumn,
          isEnableMergeCell: this.isEnableMergeCell
        });
      }
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
  
    getColumnByColumnId(columnId) {
      return this.columnObj[columnId];
    }
  
    makeColumnObj(columns) {
      const columnObject = {};
      if (columns) {
        columns.forEach(function (column) {
          (column.id || column.columnId) && (columnObject[column.id || column.columnId] = column);
        });
      } else if (this.columns) {
        this.columns.forEach(function (columnGroup) {
          columnGroup.forEach(function (column) {
            (column.id || column.columnId) && (columnObject[column.id || column.columnId] = column);
          });
        });
      }
      this.columnObj = columnObject;
      return columnObject;
    }
  }

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
        case "grid":
          return new GridPrintElement(elementType, options);
      default:
        return undefined;
    }
  }
}

// 打印元素类型基础
class PrintElementTypeBase {
  constructor(config) {
    this.field = config.field;
    this.fields = config.fields;
    this.title = config.title;
    this.text = config.text;
    this.tid = config.tid;
    this.data = config.data;
    this.hiddenExpression = config.hiddenExpression;
    this.formatterExpression = config.formatterExpression;
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
class PrintElementTypeText extends PrintElementTypeBase {
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
        return new PrintElementTypeBase(options);
    }
  }
}

export default PrintElementTypeFactory;