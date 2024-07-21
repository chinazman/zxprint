"use strict";

/**
 * import 相关资源
 */
import {$} from "../hiprint.comm.js";
import IdGenerator from "./IdGenerator.js";
import PrintTableCell from "./PrintTableCell.js";

class PrintTableRow {
  constructor() {
    this.id = IdGenerator.createId();
  }

  /**
   * 初始化表格行
   * @param {Object} tableOptions 表格选项
   * @param {jQuery} targetElement 目标元素，默认为新的 tr 元素
   * @param {boolean} isHead 是否为表头
   */
  init(tableOptions, targetElement, isHead) {
    this.isHead = isHead;
    this.target = targetElement || $("<tr></tr>");
    this.tableOptions = tableOptions;
    this.allColumns = this.columns || [];
    this.initCells((this.columns || []).filter(column => column.checked));
  }

  getTarget() {
    return this.target;
  }

  /**
   * 初始化单元格
   * @param {Array} columns 列配置数组
   */
  initCells(columns) {
    if (columns) {
      this.columns = columns;
      columns.forEach((column, index) => {
        column.init(this.target.find(`td:eq(${index})`), this.tableOptions, this.id, this.isHead);
      });
    } else {
      this.columns = [];
      this.target.find("td").map((index, element) => {
        const cell = new PrintTableCell();
        cell.init($(element), this.tableOptions, this.id, this.isHead);
        this.columns.push(cell);
      });
    }
  }

  /**
   * 移除单元格
   * @param {PrintTableCell} cell 要移除的单元格
   */
  removeCell(cell) {
    const index = this.columns.indexOf(cell);
    this.columns[index].getTarget().remove();
    this.columns.splice(index, 1);
  }

  /**
   * 创建新的表格单元格
   * @param {number} rowspan 行合并数
   * @param {number} colspan 列合并数
   * @returns {PrintTableCell} 新创建的单元格
   */
  createTableCell(rowspan, colspan) {
    const cell = new PrintTableCell();
    cell.init($("<td></td>"), this.tableOptions, this.id, this.isHead);
    if (rowspan > 1) {
      cell.getTarget().attr("rowspan", rowspan);
      cell.rowspan = rowspan;
    }
    if (colspan > 1) {
      cell.getTarget().attr("colspan", colspan);
      cell.colspan = colspan;
    }
    return cell;
  }

  /**
   * 在目标单元格左侧插入新单元格
   * @param {PrintTableCell} targetCell 目标单元格
   * @param {PrintTableCell} newCell 新单元格
   */
  insertToTargetCellLeft(targetCell, newCell) {
    const index = this.columns.indexOf(targetCell);
    targetCell.getTarget().before(newCell.getTarget());
    this.columns.splice(index, 0, newCell);
  }

  /**
   * 在目标单元格右侧插入新单元格
   * @param {PrintTableCell} targetCell 目标单元格
   * @param {PrintTableCell} newCell 新单元格
   */
  insertToTargetCellRight(targetCell, newCell) {
    const index = this.columns.indexOf(targetCell);
    this.columns[index].getTarget().after(newCell.getTarget());
    this.columns.splice(index + 1, 0, newCell);
  }

  /**
   * 在行首插入单元格
   * @param {PrintTableCell} cell 要插入的单元格
   */
  insertCellToFirst(cell) {
    this.target.prepend(cell.getTarget());
    this.columns.splice(0, 0, cell);
  }

  /**
   * 在行尾插入单元格
   * @param {PrintTableCell} cell 要插入的单元格
   */
  insertCellToLast(cell) {
    this.columns.push(cell);
    this.target.append(cell.getTarget());
  }

  /**
   * 获取打印元素选项实体
   * @returns {Array} 打印元素选项实体数组
   */
  getPrintElementOptionEntity() {
    const entities = [];
    [...this.columns, ...this.allColumns.filter(column => !column.checked)].forEach(column => {
      entities.push(column.getEntity());
    });
    return entities;
  }
}

export default PrintTableRow;