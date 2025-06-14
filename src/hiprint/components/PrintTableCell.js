"use strict";

/**
 * import 相关资源
 */
import {i18n,$} from "../hiprint.comm.js";
import TableRect from "./TableRect.js";
import TableRectHelper from "./TableRectHelper.js";
import IdUtil from "./IdGenerator.js";
import ExpressionEngine from "./ExpressionEngine.js";

// 文本编辑器类
class TextEditor {
  constructor() {}

  init(cell) {
    this.target = $('<input type="text" class="hitable-editor-text" value="" />');
    cell.getTarget().append(this.target);
    this.target.focus();
  }

  getValue() {
    return this.target.val();
  }

  setValue(value) {
    this.target.val(value);
  }

  destroy() {
    this.target.remove();
  }
}

// 编辑器工厂类
class EditorFactory {
  constructor() {
    this.text = new TextEditor();
  }

  static get Instance() {
    if (!EditorFactory._instance) {
      EditorFactory._instance = new EditorFactory();
    }
    return EditorFactory._instance;
  }
}

// 选择器类
class Selector {
  constructor() {}

  // 初始化表格头双击字段选择
  init(fields, cell) {
    let optionsHtml = `<select class="auto-submit" style="width:100%">
                <option value="" disabled>${i18n.__('请选择字段')}</option>`;
    
    fields.forEach((field) => {
      if (field.field == cell.field) {
        optionsHtml += ` <option value="${field.field || ""}" selected>${field.text || ""}</option>`;
      } else {
        optionsHtml += ` <option value="${field.field || ""}">${field.text || ""}</option>`;
      }
    });
    
    optionsHtml += " </select>";
    this.target = $(optionsHtml);
    cell.getTarget().append(this.target);
    this.target.focus();
  }

  getValue() {
    const val = this.target.val();
    const text = this.target.find(`option[value="${val}"]`).text();
    return `${text}#${val}`;
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target.find("select").prepend(`<option value="${value}">${value}</option>`);
      }
      this.target.find("select").val(value);
    }
  }

  destroy() {
    this.target.remove();
  }
}

// 选择器工厂类
class SelectorFactory {
  constructor() {
    this.select = new Selector();
  }

  static get Instance() {
    if (!SelectorFactory._instance) {
      SelectorFactory._instance = new SelectorFactory();
    }
    return SelectorFactory._instance;
  }
}

// 编辑器管理类
class EditorManager {
  static get Instance() {
    if (!EditorFactory._instance) {
      EditorManager._instance = new EditorManager();
    }
    return EditorManager._instance;
  }

  createEditor(type) {
    var editor = $.extend({}, EditorFactory.Instance[type]);
    Object.setPrototypeOf(editor, Object.getPrototypeOf(EditorFactory.Instance[type]));
    return editor;
  }

  createSelect(type) {
    var editor = $.extend({}, SelectorFactory.Instance[type]);
    Object.setPrototypeOf(editor, Object.getPrototypeOf(SelectorFactory.Instance[type]));
    return editor;
  }
}

// 内部元素类
class InnerElement {
  constructor() {}

  init(cell, tableOptions) {
    this.tableOptions = tableOptions;
    this.title = cell.title;
    this.field = cell.field;
    cell.getTarget().unbind("dblclick.hitable").bind("dblclick.hitable", () => {
      cell.isEditing = true;
      this.beginEdit(cell);
    });
  }

  getDisplayHtml() {
    return this.title;
  }

  beginEdit(cell) {
    if (this.tableOptions.options.fields && this.tableOptions.options.fields.length) {
      this.editor = EditorManager.Instance.createSelect("select");
      cell.getTarget().html("");
      this.editor.init(this.tableOptions.options.fields, cell);
      this.editor.setValue(this.field || "");
      $(this.editor.target).keydown((event) => {
        if (event.keyCode == 13) this.endEdit(cell);
      });
      $(this.editor.target).change(() => {
        this.endEdit(cell);
      });
      $(this.editor.target).blur(() => {
        this.endEdit(cell);
      });
    } else {
      this.editor = EditorManager.Instance.createEditor("text");
      cell.getTarget().html("");
      this.editor.init(cell);
      if (this.title || this.field) {
        this.tableOptions.options.isEnableEditField && !cell.isFoot
          ? this.editor.setValue(`${this.title || ""}#${this.field || ""}`)
          : this.editor.setValue(this.title || "");
      }
      $(this.editor.target).keydown((event) => {
        if (event.keyCode == 13) this.endEdit(cell);
      });
      $(this.editor.target).blur(() => {
        this.endEdit(cell);
      });
      if (this.tableOptions.editingCell && this.tableOptions.editingCell.id != cell.id) {
        this.tableOptions.editingCell.innerElement.endEdit(this.tableOptions.editingCell);
      }
      this.tableOptions.editingCell = cell;
    }
  }

  endEdit(cell) {
    cell.isEditing = false;
    const value = this.editor.getValue();
    let title = "";
    if (value) {
      if(cell.isFoot){
        cell.title = this.title = value;
        const context = {
          rows: this.tableOptions.options.testData,
          allRows: this.tableOptions.options.testData
        };
        title = value.startsWith("=")?ExpressionEngine.execute(value.substring(1), context):value;
        cell.field = this.field = "";
      }else if (this.tableOptions.options.isEnableEditField || this.tableOptions.options.fields) {
        const splitValue = value.split("#");
        title = cell.title = this.title = splitValue[0];
        if (splitValue.length > 0) {
          cell.columnId = cell.field = this.field = splitValue[1];
        }
        if (cell.id) cell.target.attr("id", cell.id);
        if (cell.columnId) cell.target.attr("column-id", cell.columnId);
        hinnn.event.trigger(`hiprintTemplateDataChanged_${this.tableOptions.options.templateId}`, "调整表格列字段");
      } else {
        title = cell.title = this.title = value;
      }
    } else {
      if (this.tableOptions.options.isEnableEditField) {
        title = cell.title = this.title = "";
        cell.field = this.field = "";
      } else {
        title = cell.title = this.title = "";
      }
    }
    this.editor.destroy();
    cell.getTarget().html(title);
  }
}

// 单元格实体类
class CellEntity {
  constructor(cell) {
    this.title = cell.title;
    this.field = cell.field;
    this.width = cell.width;
    this.align = cell.align;
    this.halign = cell.halign;
    this.hFontWeight = cell.hFontWeight;
    this.hFontSize = cell.hFontSize;
    this.hColor = cell.hColor;
    this.vAlign = cell.vAlign;
    this.colspan = cell.colspan;
    this.rowspan = cell.rowspan;
    this.checked = cell.checked;
    this.columnId = cell.columnId;
    this.tableSummaryTitle = cell.tableSummaryTitle;
    this.tableSummaryText = cell.tableSummaryText;
    this.tableSummaryColspan = cell.tableSummaryColspan;
    this.tableSummary = cell.tableSummary;
    this.tableSummaryAlign = cell.tableSummaryAlign;
    this.tableSummaryNumFormat = cell.tableSummaryNumFormat;
    this.tableSummaryFormatter = cell.tableSummaryFormatter;
    this.showCodeTitle = cell.showCodeTitle;
    this.upperCase = cell.upperCase;
    this.renderFormatter = cell.renderFormatter && cell.renderFormatter.toString();
    this.cellHiddenExpression = cell.cellHiddenExpression;
    this.cellFormatterExpression = cell.cellFormatterExpression;
    this.footerCellWrap = cell.footerCellWrap;
    this.formatter2 = cell.formatter2 && cell.formatter2.toString();
    this.styler2 = cell.styler2 && cell.styler2.toString();
    this.stylerHeader = cell.stylerHeader && cell.stylerHeader.toString();
    this.tableColumnHeight = cell.tableColumnHeight;
    this.tableTextType = cell.tableTextType;
    this.tableBarcodeMode = cell.tableBarcodeMode;
    this.tableQRCodeLevel = cell.tableQRCodeLevel;
    this.isFoot = cell.isFoot;
  }
}

// 表格单元格基类
class TableCell {
  constructor() {
    this.id = IdUtil.createId();
  }

  init(target, tableOptions, rowId, isHead) {
    this.isHead = isHead;
    this.rowId = rowId;
    this.isEditing = false;
    const numberPattern = /^[0-9]*$/;
    this.target = target;
    this.tableOptions = tableOptions;
    const colspanAttr = this.target.attr("colspan");
    this.colspan = numberPattern.test(colspanAttr) ? parseInt(colspanAttr) : 1;
    const rowspanAttr = this.target.attr("rowspan");
    this.rowspan = numberPattern.test(rowspanAttr) ? parseInt(rowspanAttr) : 1;
    this.initEvent();
    if (this.isHead) {
      this.initInnerEelement();
    }
  }

  beginEdit() {
    if (!this.isEditing && this.tableOptions.isEnableEdit && this.tableOptions.onBeforEdit(this)) {
      const value = this.getValue();
      this.editor = EditorManager.Instance.createEditor("text");
      this.isEditing = true;
      this.tableOptions.editingCell = this;
      this.target.html("");
      this.editor.init(this);
      this.editor.setValue(value);
    }
  }

  endEdit() {
    this.isEditing = false;
    const value = this.editor.getValue();
    this.editor.destroy();
    this.target.html(value);
  }

  getTarget() {
    return this.target;
  }

  getValue() {
    return this.target.html();
  }

  setValue(value) {
    // 实现待添加
  }

  initInnerEelement() {
    this.innerElement = new InnerElement();
    this.innerElement.init(this, this.tableOptions);
  }

  initEvent() {
    // 实现待添加
  }

  isXYinCell(x, y) {
    const point = new TableRect({
      x: x,
      y: y,
      height: 0,
      width: 0
    });
    return this.isOverlap(point);
  }

  getTableRect() {
    return new TableRect({
      x: this.target.offset().left,
      y: this.target.offset().top,
      height: this.target[0].offsetHeight,
      width: this.target[0].offsetWidth
    });
  }

  isOverlap(rect) {
    const cellRect = this.getTableRect();
    return (
      rect.x + rect.width > cellRect.x &&
      cellRect.x + cellRect.width > rect.x &&
      rect.y + rect.height > cellRect.y &&
      cellRect.y + cellRect.height > rect.y
    );
  }

  isInRect(selectionRect) {
    const rect = selectionRect.rect;
    const cellRect = this.getTableRect();

    if (
      cellRect.x >= rect.x &&
      cellRect.x + cellRect.width <= rect.x + rect.width &&
      cellRect.y >= rect.y &&
      cellRect.y + cellRect.height <= rect.y + rect.height
    ) {
      const mergedRect = TableRectHelper.mergeRect(rect, cellRect);
      if (JSON.stringify(rect) === JSON.stringify(mergedRect)) {
        return true;
      } else {
        selectionRect.changed = true;
        selectionRect.rect = mergedRect;
        return true;
      }
    }

    return false;
  }

  isSelected() {
    return this.target.hasClass("selected");
  }

  select() {
    this.target.addClass("selected");
  }

  isHeader() {
    return false;
  }

  setAlign(align) {
    this.align = align;
    if (align) {
      this.target.css("text-align", align);
    } else {
      this.target[0].style.textAlign = "";
    }
  }

  setVAlign(vAlign) {
    this.vAlign = vAlign;
    if (vAlign) {
      this.target.css("vertical-align", vAlign);
    } else {
      this.target[0].style.verticalAlign = "";
    }
  }

  getEntity() {
    return new CellEntity(this);
  }
}

// 打印表格单元格类
class PrintTableCell extends TableCell {
  constructor(options = {}) {
    super();
    this.width = options.width ? parseFloat(options.width.toString()) : 100;
    this.title = options.title;
    this.descTitle = options.descTitle;
    this.field = options.field;
    this.fixed = options.fixed;
    this.rowspan = options.rowspan ? parseInt(options.rowspan) : 1;
    this.colspan = options.colspan ? parseInt(options.colspan) : 1;
    this.align = options.align;
    this.halign = options.halign;
    this.hFontWeight = options.hFontWeight;
    this.hFontSize = options.hFontSize;
    this.hColor = options.hColor;
    this.vAlign = options.vAlign;
    this.cellHiddenExpression = options.cellHiddenExpression;
    this.cellFormatterExpression = options.cellFormatterExpression;
    this.footerCellWrap = options.footerCellWrap;
    this.formatter = options.formatter;
    this.styler = options.styler;
    this.renderFormatter = options.renderFormatter;
    this.formatter2 = options.formatter2;
    this.styler2 = options.styler2;
    this.stylerHeader = options.stylerHeader;
    this.checkbox = options.checkbox;
    this.checked = options.checked != 0;
    this.columnId = options.columnId || options.field;
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
    this.isFoot = !!options.isFoot;
  }

  css(styles) {
    // 实现待添加
  }
}

export default PrintTableCell;