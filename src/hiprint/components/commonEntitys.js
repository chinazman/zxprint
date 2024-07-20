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

  // 打印元素类型管理器
class PrintElementTypeContext {
  constructor() {
    this.allElementTypes = [];
  }

  static get instance() {
    return PrintElementTypeContext._instance || (PrintElementTypeContext._instance = new PrintElementTypeContext()), PrintElementTypeContext._instance;
  }

  // 添加打印元素类型
  addPrintElementTypes(moduleName, types) {
    const self = this;
    this[moduleName] ? this[moduleName] = this[moduleName].concat(types) : this[moduleName] = types;
    types.forEach(function (typeGroup) {
      self.allElementTypes = self.allElementTypes.concat(typeGroup.printElementTypes);
    });
  }

  // 移除打印元素类型
  removePrintElementTypes(moduleName) {
    const self = this;
    delete self[moduleName];
    self.allElementTypes = self.allElementTypes.filter(function (elementType) {
      return !elementType.tid.startsWith(moduleName);
    });
  }

  // 获取元素类型分组
  getElementTypeGroups(moduleName) {
    return this[this.formatterModule(moduleName)] || [];
  }

  // 获取特定元素类型
  getElementType(typeId) {
    const matchedTypes = this.allElementTypes.filter(function (elementType) {
      return elementType.tid == typeId;
    });
    if (matchedTypes.length > 0) return matchedTypes[0];
  }

  // 更新元素类型
  updateElementType(typeId, updateFunction) {
    const type = this.getElementType(typeId);
    if (updateFunction) {
      const newType = updateFunction(type);
      const idx = this.allElementTypes.findIndex(function (elementType) {
        return elementType.tid == typeId;
      });
      if (idx >= 0) {
        this.allElementTypes.splice(idx, 1, newType);
        return newType;
      }
    }
    return type;
  }

  // 格式化模块名
  formatterModule(moduleName) {
    return moduleName || "_default";
  }
}

// 打印元素类型HTML生成器
class PrintElementTypeHtmlProvider {
  // 创建打印元素类型HTML
  createPrintElementTypeHtml(container, printElementTypes) {
    const ulElement = $('<ul class="hiprint-printElement-type"></ul>');
    printElementTypes.forEach(function (printElementType) {
      const liElement = $("<li></li>");
      liElement.append('<span class="title">' + printElementType.name + "</span>");
      const subUlElement = $("<ul></ul>");
      liElement.append(subUlElement);
      printElementType.printElementTypes.forEach(function (elementType) {
        subUlElement.append('<li><a class="ep-draggable-item" tid="' + elementType.tid + '">  ' + elementType.getText() + " </a></li>");
      });
      ulElement.append(liElement);
    });
    $(container).append(ulElement);
    return ulElement.find(".ep-draggable-item");
  }
}

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

export {
    PrintElementTypeContext,PrintElementTypeHtmlProvider,PrintElementTypeEntity,PrintElementTypeTable
}