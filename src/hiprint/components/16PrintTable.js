"use strict";

/**
这个JavaScript文件定义了一个表格编辑的功能模块，它提供了一系列操作表格的方法，包括但不限于：

1. **创建和初始化表格**：通过构造函数`v11710`初始化表格实例，设置表格的各种属性和行为。

2. **行和列的增删**：提供`insertRow`和`deleteRow`方法来在表格中插入或删除行，以及`insertColumn`和`deleteColums`（可能是`deleteColumns`的拼写错误）来插入或删除列。

3. **单元格的合并与拆分**：`mergeCell`方法用于合并选定的单元格，`splitCell`用于拆分单元格。

4. **单元格的编辑**：提供了启用和禁用编辑模式的方法`enableEidt`和`disableEdit`（可能是`enableEdit`和`disableEdit`的拼写错误），以及设置单元格对齐方式的方法`setAlign`和`setVAlign`。

5. **表格的调整大小**：通过`resizeTableCellWidth`和`resizeTableCellWeight`方法调整单元格的宽度。

6. **上下文菜单**：初始化上下文菜单`initContext`，提供了一系列表格操作的快捷选项，如插入行列、删除行列、对齐方式设置、合并单元格等。

7. **事件触发**：在执行操作后，如插入行、删除列等，会触发相应的事件，例如`"newRow" + this.id`和`"updateTable" + this.id`。

8. **辅助功能**：例如`getCellGrid`用于获取表格的网格布局信息，`getColumnStep`用于获取列的跨度步长。

9. **表格尺寸获取**：`getTableWidth`方法用于获取表格的宽度。

10. **表格的调整手柄**：通过`createColumnGrips`和`createRowGrips`方法创建用于调整列宽和行高的手柄。

整个文件看起来是一个复杂的表格操作库的一部分，它提供了丰富的API来对HTML表格进行各种编辑和操作。代码中使用了大量的闭包和立即执行函数表达式（IIFE），这可能是为了创建私有作用域和模块化的代码结构。此外，代码中存在一些潜在的拼写错误，如`deleteColums`和`enableEidt`，它们可能是`deleteColumns`和`enableEdit`的误拼。

 */
import {i18n,$} from "../hiprint.comm.js";
import hinnn from "./00hinnn.js";
import PrintTableCellSelector from "./10PrintTableCellSelector.js";
import PrintTableRow from "./13PrintTableRow.js";
import IdGenerator from "./11IdGenerator.js";
import PrintLib from "./02PrintLib.js"

  
class PrintTableOption {
  constructor(config) {
    this.table = config.table;
    this.templateId = config.templateId;
    this.fields = config.fields;
    this.isEnableEdit = config.isEnableEdit;
    this.trs = config.trs;
    this.resizeRow = config.resizeRow;
    this.resizeColumn = config.resizeColumn;
    this.isEnableEditField = config.isEnableEditField;
    this.isEnableContextMenu = config.isEnableContextMenu;
    this.isEnableInsertRow = config.isEnableInsertRow;
    this.isEnableDeleteRow = config.isEnableDeleteRow;
    this.isEnableInsertColumn = config.isEnableInsertColumn;
    this.isEnableDeleteColumn = config.isEnableDeleteColumn;
    this.isEnableMergeCell = config.isEnableMergeCell;
    this.columnResizable = config.columnResizable;
    this.columnAlignEditable = config.columnAlignEditable;
  }
}

class PrintTableOptionCoat {
  constructor(config) {
    this.options = new PrintTableOption(config);
  }

  enableEdit() {
    this.options.isEnableEdit;
  }

  disableEdit() {
    this.options.isEnableEdit;
  }

  isEditEnabled() {
    return this.options.isEnableEdit;
  }
}

class PrintGridCell {
  constructor(cellConfig) {
    this.cell = cellConfig.cell;
    this.link = cellConfig.link;
    this.linkType = cellConfig.linkType;
    this.bottom = cellConfig.bottom;
    this.rightMost = cellConfig.rightMost;
    this.rowLevel = cellConfig.rowLevel;
    this.columnLevel = cellConfig.columnLevel;
    this.indexInTableGridRow = cellConfig.indexInTableGridRow;
    this.indexInTableGridColumn = cellConfig.indexInTableGridColumn;
  }
}

class PrintGridCellHelper {
  static getLeftTableCell(tableCells, index) {
    let leftTableCell;
    tableCells.forEach((cell, i) => {
      if (cell.cell && i < index) {
        leftTableCell = cell.cell;
      }
    });
    return leftTableCell;
  }

  static getIndex(tableCells, cellId) {
    let cellIndex;
    tableCells.forEach((cell, i) => {
      if (cell.cell && cell.cell.id == cellId) {
        cellIndex = i;
      }
    });
    return cellIndex;
  }
}

class CgripContainer {
  constructor(target, grips) {
    this.target = target;
    this.grips = grips;
  }
}

class Grips {
  constructor(target) {
    this.target = target;
  }
}

class PrintGridRow {
  constructor() {
    this.rowColumns = [];
  }
}

class PrintGridRowHelper {
  static getColumnsWidth(gridRow, availableWidth) {
    let columnWidths = {};
    let totalAutoWidth = this.allAutoWidth(gridRow);

    gridRow.rowColumns.forEach(column => {
      let columnWidth = column.width / totalAutoWidth * (availableWidth > 0 ? availableWidth : 0);
      columnWidths[column.id] = columnWidth;
    });

    return columnWidths;
  }

  static resizeTableCellWeight(rows) {
    rows.forEach(row => {
      row.columns.forEach(column => {
        if (column.hasWidth) {
          $(column.getTarget()).css("width", `${column.width}pt`);
        }
      });
    });
  }

  static allAutoWidth(gridRow) {
    let totalWidth = 0;
    gridRow.rowColumns.forEach(column => {
      totalWidth += column.width;
    });
    return totalWidth;
  }

  static reconstituteTableColumnTree(gridRows, existingGridRow = new PrintGridRow()) {
    gridRows.forEach((row, rowIndex) => {
      existingGridRow.totalLayer = rowIndex + 1;
      existingGridRow[rowIndex] = row.columns;
      existingGridRow.rowColumns = existingGridRow.rowColumns.concat(
        row.columns.filter(column => column.rowspan == gridRows.length - rowIndex)
      );
    });

    return existingGridRow;
  }
}

class PrintGripResizer {
  constructor(printTable) {
    this.signature = "HiTresizer";
    this.hitable = printTable;
    this.rows = printTable.rows;
    this.target = printTable.target;
  }

  init() {
    this.addResizeRowAndColumn();
    if (this.hitable.optionsCoat.options.resizeColumn) {
      this.createColumnGrips();
    }
    if (this.hitable.optionsCoat.options.resizeRow) {
      this.createRowGrips();
    }
  }

  resizeTableCellWidth() {
    PrintGridRowHelper.resizeTableCellWeight(this.rows);
  }

  addResizeRowAndColumn() {
    // implementation needed
  }

  createColumnGrips() {
    let gripsList = [];
    let columnGripsContainer = $('<div class="columngrips"/>');
    columnGripsContainer.width(this.target.width());

    this.rows.forEach(row => {
      (row.columns || []).filter(column => column.checked).forEach((column, index) => {
        if (column.getTarget().attr("haswidth")) {
          let columnGrip = $('<div class="columngrip"><div class="gripResizer"></div></div>');
          columnGripsContainer.append(columnGrip);
          let newGrip = new Grips(columnGrip);
          if (gripsList.length > 0) {
            gripsList[gripsList.length - 1].nextGrip = newGrip;
          }
          gripsList.push(newGrip);
          this.syncGrips(column, newGrip);
          $(columnGrip).hidraggable({
            axis: "h",
            onDrag: function (event, ui, instance) {},
            moveUnit: "pt",
            minMove: 1,
            getScale: function () {
              return $('.hiprint-printPaper')[0].style.transform && parseFloat($('.hiprint-printPaper')[0].style.transform.slice(6, -1)) || 1;
            },
            onBeforeDrag: (event) => {
              if (PrintLib.instance.draging = !0, !newGrip.nextGrip) return !1;
              this.dragingGrip = newGrip;
              this.dragingGrip.left = parseFloat(this.dragingGrip.target.css("left").replace("px", ""));
              newGrip.target.addClass("columngripDraging");
            },
            onStopDrag: (event) => {
              PrintLib.instance.draging = !1;
              let leftPosition = parseFloat(this.dragingGrip.target.css("left").replace("px", ""));
              let widthChange = hinnn.px.toPt(leftPosition - this.dragingGrip.left);
              // 表格列宽限制 最小宽度为10pt
              if (newGrip.cell.width + widthChange < 10) {
                widthChange = 10 - newGrip.cell.width;
              } else if (newGrip.nextGrip.cell.width - widthChange < 10) {
                widthChange = newGrip.nextGrip.cell.width - 10;
              }
              newGrip.cell.width = newGrip.cell.width + widthChange;
              newGrip.nextGrip.cell.width = newGrip.nextGrip.cell.width - widthChange;
              this.resizeTableCellWidth();
              newGrip.target.removeClass("columngripDraging");
              this.updateColumnGrips();
            }
          });
        }
      });
    });

    this.target.before(columnGripsContainer);
    this.columnGripContainer = new CgripContainer(columnGripsContainer, gripsList);
  }

  updateColumnGrips() {
    if (this.columnGripContainer) {
      this.columnGripContainer.target.remove();
      this.createColumnGrips();
    }
  }

  updateRowGrips() {
    if (this.rowGripContainer) {
      this.rowGripContainer.target.remove();
      this.createRowGrips();
    }
  }

  createRowGrips() {
    let gripsList = [];
    let rowGripsContainer = $('<div class="rowgrips"/>');

    this.rows.forEach((row, index) => {
      let rowGrip = $('<div class="rowgrip"><div class="gripResizer"></div></div>');
      rowGripsContainer.append(rowGrip);
      let newGrip = new Grips(rowGrip);
      gripsList.push(newGrip);
      if (index > 0 && index < this.rows.length) {
        $(rowGrip).hidraggable({
          axis: "v",
          onDrag: function (event, ui, instance) {},
          moveUnit: "pt",
          minMove: 1,
          onBeforeDrag: (event) => {
            this.dragingGrip = newGrip;
            this.dragingGrip.top = parseFloat(this.dragingGrip.target.css("top").replace("px", ""));
            newGrip.target.addClass("rowgripDraging");
          },
          onStopDrag: (event) => {
            let topPosition = parseFloat(this.dragingGrip.target.css("top").replace("px", ""));
            let heightChange = hinnn.px.toPt(topPosition - this.dragingGrip.top + this.rows[index].columns[0].getTarget().height());
            this.rows[index].columns[0].getTarget().css("height", `${heightChange}pt`);
            this.syncRowGrips();
            newGrip.target.removeClass("rowgripDraging");
          }
        });
      }
    });

    this.target.before(rowGripsContainer);
    this.rowGripContainer = new CgripContainer(rowGripsContainer, gripsList);
    this.syncRowGrips();
  }

  syncGrips(column, grip) {
    let targetElement = column.getTarget();
    grip.cell = column;
    grip.target.css({
      left: targetElement.offset().left - this.target.offset().left      + targetElement.outerWidth(false),
      height: 30
    });
  }

  syncRowGrips() {
    this.rowGripContainer.target.height(this.target.height());
    this.rows.forEach((row, index) => {
      let targetElement = row.columns[0].getTarget();
      this.rowGripContainer.grips[index].target.css({
        top: targetElement.offset().top - this.target.offset().top + targetElement.outerHeight(false),
        width: 30
      });
    });
  }

  addResizerHeadRow() {
    this.target.find("thead").prepend();
  }
}
  
  
// 打印表格类
class PrintTable {
  /**
   * 构造函数
   * @param {Object} options 配置选项
   */
  constructor(options) {
    this.id = IdGenerator.createId();
    this.optionsCoat = new PrintTableOptionCoat(options);
    this.handle = options.handle;
    this.target = options.table;
    this.initRows(options.rows);
    this.init(options);
    this.tableCellSelector = new PrintTableCellSelector(this.rows, this.target);
    this.resizer = this.optionsCoat.options.columnResizable ? new PrintGripResizer(this) : new DefaultResizer();
    this.resizer.init();
  }

  /**
   * 插入行
   * @param {string} position 插入位置
   * @param {Object} selectedCell 选中的单元格
   * @param {string} className 新行的类名
   */
  insertRow(position, selectedCell, className) {
    const singleSelect = selectedCell || this.tableCellSelector.getSingleSelect();
    const cell = singleSelect.cell;
    const currentRow = this.rows[singleSelect.rowIndex];
    const rowIndex = singleSelect.rowIndex;
    const cellGrid = this.getCellGrid();
    const newRow = new PrintTableRow();

    newRow.init(this.optionsCoat, undefined, currentRow.isHead);
    if (className) {
      newRow.getTarget().addClass(className);
    }

    if (position === "above") {
      cellGrid[rowIndex].forEach(gridCell => {
        const targetCell = gridCell.link ? gridCell.link : gridCell.cell;
        const cellWidth = targetCell.width / targetCell.colspan;

        if (gridCell.columnLevel === 0) {
          const newCell = newRow.createTableCell();
          newCell.width = cellWidth;
          newRow.insertCellToLast(newCell);
        } else if (gridCell.linkType === "column") {
          const linkTarget = gridCell.link.getTarget();
          gridCell.link.rowspan += 1;
          linkTarget.attr("rowspan", gridCell.link.rowspan);
        }
      });

      this.rows.splice(rowIndex, 0, newRow);
      currentRow.getTarget().before(newRow.getTarget());
      hinnn.event.trigger("newRow" + this.id, newRow);
    } else {
      const lastRowIndex = rowIndex + cell.rowspan - 1;
      cellGrid[lastRowIndex].forEach(gridCell => {
        const targetCell = gridCell.link ? gridCell.link : gridCell.cell;
        const cellWidth = targetCell.width / targetCell.colspan;

        if (gridCell.bottom) {
          const newCell = newRow.createTableCell();
          newCell.width = cellWidth;
          newRow.insertCellToLast(newCell);
        } else {
          if (gridCell.cell) {
            const cellTarget = gridCell.cell.getTarget();
            gridCell.cell.rowspan += 1;
            cellTarget.attr("rowspan", gridCell.cell.rowspan);
          }

          if (gridCell.linkType === "column") {
            const linkTarget = gridCell.link.getTarget();
            gridCell.link.rowspan += 1;
            linkTarget.attr("rowspan", gridCell.link.rowspan);
          }
        }
      });

      this.rows.splice(lastRowIndex + 1, 0, newRow);
      this.rows[lastRowIndex].getTarget().after(newRow.getTarget());
      hinnn.event.trigger("newRow" + this.id, newRow);
    }
  }

  /**
   * 插入列
   * @param {string} position 插入位置
   * @param {Object} selectedCell 选中的单元格
   * @param {string} className 新列的类名
   * @param {number} width 新列的宽度
   */
  insertColumn(position, selectedCell, className, width) {
    const allRows = this.rows.concat(this.trRows);
    const singleSelect = selectedCell || this.tableCellSelector.getSingleSelect();
    const cell = singleSelect.cell;
    const rowIndex = singleSelect.rowIndex;
    const cellGrid = this.getCellGrid(allRows);
    const targetCells = cellGrid[rowIndex].filter(gridCell => 
      (gridCell.cell && gridCell.cell.id === cell.id) || 
      (gridCell.link && gridCell.link.id === cell.id)
    );

    if (position === "left") {
      const columnIndex = targetCells[0].indexInTableGridRow;
      
      cellGrid.forEach((row, rowIdx) => {
        const currentCell = row[columnIndex];
        const cellsAfterCurrent = row.filter((cell, idx) => idx >= columnIndex && cell.cell);

        if (currentCell.rowLevel === 0) {
          const currentRow = allRows[rowIdx];
          const newCell = allRows[rowIdx].createTableCell();
          
          if (className) {
            newCell.getTarget().addClass(className);
          }
          if (width != null) {
            newCell.width = width;
          }
          
          if (cellsAfterCurrent.length) {
            currentRow.insertToTargetCellLeft(cellsAfterCurrent[0].cell, newCell);
          } else {
            currentRow.insertCellToLast(newCell);
          }
          
          hinnn.event.trigger("newCell" + this.id, newCell);
        } else if (currentCell.linkType === "row") {
          const linkTarget = currentCell.link.getTarget();
          currentCell.link.colspan += 1;
          linkTarget.attr("colspan", currentCell.link.colspan);
        }
      });
    } else {
      const lastColumnIndex = targetCells[targetCells.length - 1].indexInTableGridRow;
      
      cellGrid.forEach((row, rowIdx) => {
        const currentCell = row[lastColumnIndex];
        const cellsBeforeCurrent = row.filter((cell, idx) => idx <= lastColumnIndex && cell.cell);

        if (currentCell.rightMost) {
          const currentRow = allRows[rowIdx];
          const newCell = currentRow.createTableCell();
          
          if (className) {
            newCell.getTarget().addClass(className);
          }
          if (width != null) {
            newCell.width = width;
          }
          
          if (cellsBeforeCurrent.length) {
            currentRow.insertToTargetCellRight(cellsBeforeCurrent[cellsBeforeCurrent.length - 1].cell, newCell);
          } else {
            currentRow.insertCellToFirst(newCell);
          }
          
          hinnn.event.trigger("newCell" + this.id, newCell);
        } else {
          const targetCell = currentCell.link || currentCell.cell;

          if (currentCell.linkType === "row") {
            const cellTarget = targetCell.getTarget();
            targetCell.colspan += 1;
            cellTarget.attr("colspan", targetCell.colspan);
          }

          if (currentCell.cell) {
            const cellTarget = targetCell.getTarget();
            targetCell.colspan += 1;
            cellTarget.attr("colspan", targetCell.colspan);
          }
        }
      });
    }
  }

  /**
   * 删除行
   */
  deleteRow() {
    const singleSelect = this.tableCellSelector.getSingleSelect();
    const rowIndex = singleSelect.rowIndex;
    const cellGrid = this.getCellGrid();
    const rowToDelete = this.rows[rowIndex];

    cellGrid[rowIndex].forEach((gridCell, columnIndex) => {
      if (gridCell.cell) {
        if (gridCell.cell.rowspan === 1) {
          rowToDelete.removeCell(gridCell.cell);
        } else {
          rowToDelete.removeCell(gridCell.cell);
          const cellsInNextRow = cellGrid[rowIndex + 1].filter((cell, idx) => cell.cell && idx > columnIndex);
          const nextRow = this.rows[rowIndex + 1];
          const newCell = nextRow.createTableCell(gridCell.cell.rowspan - 1, gridCell.cell.colspan);
          
          if (cellsInNextRow.length) {
            nextRow.insertToTargetCellLeft(cellsInNextRow[0].cell, newCell);
          } else {
            nextRow.insertCellToLast(newCell);
          }
        }
      } else if (gridCell.linkType === "column") {
        const linkedCell = gridCell.link;
        linkedCell.rowspan -= 1;
        linkedCell.getTarget().attr("rowspan", linkedCell.rowspan);
      }
    });

    rowToDelete.getTarget().remove();
    this.rows.splice(rowIndex, 1);
  }

  /**
   * 删除列
   */
  deleteColumns() {
    const allRows = this.rows.concat(this.trRows);
    const singleSelect = this.tableCellSelector.getSingleSelect();
    const cell = singleSelect.cell;
    const rowIndex = singleSelect.rowIndex;
    const cellGrid = this.getCellGrid(allRows);
    const columnIndex = cellGrid[rowIndex].find(gridCell => 
      (gridCell.cell && gridCell.cell.id === cell.id) || 
      (gridCell.link && gridCell.link.id === cell.id)
    ).indexInTableGridRow;

    cellGrid.forEach((row, rowIdx) => {
      const targetCell = row[columnIndex];
      if (targetCell.cell) {
        if (targetCell.cell.colspan === 1) {
          allRows[rowIdx].removeCell(targetCell.cell);
        } else {
          targetCell.cell.colspan -= 1;
          targetCell.cell.getTarget().attr("colspan", targetCell.cell.colspan);
        }
      } else if (targetCell.linkType === "row") {
        targetCell.link.colspan -= 1;
        targetCell.link.getTarget().attr("colspan", targetCell.link.colspan);
      }
    });
  }

  /**
   * 合并单元格
   */
  mergeCell() {
    const selectedCells = this.tableCellSelector.getSelectedCells();

    if (selectedCells.length === 0) return;

    const targetCell = selectedCells[0][0].cell;

    selectedCells.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (rowIndex === 0) {
          if (columnIndex !== 0) {
            targetCell.colspan += cell.cell.colspan;
            this.rows[cell.rowIndex].removeCell(cell.cell);
          }
        } else {
          this.rows[cell.rowIndex].removeCell(cell.cell);
        }
        if (columnIndex === 0 && selectedCells[0][0].rowIndex + targetCell.rowspan - 1 < cell.rowIndex) {
          targetCell.rowspan += cell.cell.rowspan;
        }
      });
    });

    targetCell.getTarget().attr("colspan", targetCell.colspan);
    targetCell.getTarget().attr("rowspan", targetCell.rowspan);
    this.tableCellSelector.setSingleSelect(selectedCells[0][0]);
  }

  /**
   * 拆分单元格
   */
  splitCell() {
    const singleSelect = this.tableCellSelector.getSingleSelect();
    const cellGrid = this.getCellGrid();
    const columnIndex = PrintGridCellHelper.getIndex(cellGrid[singleSelect.rowIndex], singleSelect.cell.id);

    if (singleSelect) {
      for (let i = singleSelect.rowIndex; i < singleSelect.rowIndex + singleSelect.cell.rowspan; i++) {
        const currentRow = this.rows[i];
        const targetCell = i === singleSelect.rowIndex ? singleSelect.cell : PrintGridCellHelper.getLeftTableCell(cellGrid[i], columnIndex);
        
        for (let j = 0; j < singleSelect.cell.colspan; j++) {
          if (i === singleSelect.rowIndex && j === 0) continue;
          
          if (targetCell) {
            currentRow.insertToTargetCellRight(targetCell, currentRow.createTableCell());
          } else {
            currentRow.insertCellToFirst(currentRow.createTableCell());
          }
        }
      }

      singleSelect.cell.rowspan = 1;
      singleSelect.cell.colspan = 1;
      singleSelect.cell.getTarget().attr("colspan", singleSelect.cell.colspan);
      singleSelect.cell.getTarget().attr("rowspan", singleSelect.cell.rowspan);
    }
  }

  /**
   * 初始化表格
   * @param {Object} options 配置选项
   */
  init(options) {
    $(this.target).addClass("hitable");

    this.optionsCoat.onBeforEdit = editInfo => {
      if (this.optionsCoat.options.onBeforEdit && options.onBeforEdit(editInfo) === false) {
        return false;
      }
      if (this.optionsCoat.editingCell) {
        this.optionsCoat.editingCell.endEdit();
      }
      return true;
    };

    $(this.target).mousedown(e => {
      this.optionsCoat.isLeftMouseButtonDown = true;
    });

    $(this.target).mouseup(e => {
      this.optionsCoat.isLeftMouseButtonDown = false;
    });

    this.initContext();

    this.target.on("mousemove", e => {
      if (e.buttons === 1) {
        this.tableCellSelector.multipleSelectByXY(e.pageX, e.pageY);
      }
    }).on("mousedown", e => {
      if (e.buttons === 1) {
        this.tableCellSelector.singleSelectByXY(e.pageX, e.pageY);
      }
    });
  }

  /**
   * 初始化行
   * @param {Array} rows 行数据
   */
  initRows(rows) {
    this.trRows = [];

    if (rows) {
      this.rows = rows;
      rows.forEach((row, index) => {
        row.init(this.optionsCoat, this.target.find("tr:eq(" + index + ")"), true);
      });

      const trs = this.optionsCoat.options.trs;
      if (trs) {
        this.initRowsByTrs(trs).forEach(row => {
          this.trRows.push(row);
        });
      }
    } else {
      this.rows = this.initRowsByTrs(this.target.find("tr"));
    }
  }

  /**
   * 根据 TR 元素初始化行
   * @param {Array} trs TR 元素数组
   * @returns {Array} 初始化后的行数组
   */
  initRowsByTrs(trs) {
    return trs.map((index, tr) => {
      const row = new PrintTableRow();
      row.init(this.optionsCoat, $(tr));
      return row;
    }).get();
  }

  /**
   * 启用编辑
   */
  enableEdit() {
    this.optionsCoat.enableEdit();
  }

  /**
   * 禁用编辑
   */
  disableEdit() {
    this.optionsCoat.disableEdit();
  }

/**
   * 获取单元格网格
   * @param {Array} rows 行数组
   * @returns {Array} 单元格网格
   */
getCellGrid(rows) {
  const targetRows = rows || this.rows;
  const columnStep = this.getColumnStep();
  const grid = [];

  targetRows.forEach((row, rowIndex) => {
    row.columns.forEach((cell, cellIndex) => {
      for (let i = 0; i < cell.colspan; i++) {
        for (let j = 0; j < columnStep; j++) {
          if (!grid[rowIndex]) {
            grid[rowIndex] = [];
          }

          if (!grid[rowIndex][j]) {
            grid[rowIndex][j] = new PrintGridCell({
              cell: i === 0 ? cell : undefined,
              link: i !== 0 ? cell : undefined,
              linkType: i > 0 ? "row" : undefined,
              rightMost: i === cell.colspan - 1 || undefined,
              bottom: cell.rowspan - 1 === 0,
              rowLevel: i,
              columnLevel: 0,
              indexInTableGridRow: j,
              indexInTableGridColumn: rowIndex
            });

            for (let k = rowIndex + 1, m = 1; m < cell.rowspan; m++) {
              if (!grid[k]) {
                grid[k] = [];
              }
              grid[k][j] = new PrintGridCell({
                cell: undefined,
                link: cell,
                linkType: i > 0 ? "rowColumn" : "column",
                rightMost: i === cell.colspan - 1 || undefined,
                bottom: m === cell.rowspan - 1,
                rowLevel: i,
                columnLevel: m,
                indexInTableGridRow: j,
                indexInTableGridColumn: k
              });
              k++;
            }

            break;
          }
        }
      }
    });
  });

  return grid;
}

/**
 * 设置对齐方式
 * @param {string} align 对齐方式
 */
setAlign(align) {
  const singleSelect = this.tableCellSelector.getSingleSelect();
  if (singleSelect) {
    singleSelect.cell.setAlign(align);
  }
}

/**
 * 设置垂直对齐方式
 * @param {string} vAlign 垂直对齐方式
 */
setVAlign(vAlign) {
  const singleSelect = this.tableCellSelector.getSingleSelect();
  if (singleSelect) {
    singleSelect.cell.setVAlign(vAlign);
  }
}

/**
 * 获取列步长
 * @param {number} rowIndex 行索引
 * @returns {number} 列步长
 */
getColumnStep(rowIndex) {
  let step = 0;
  if (this.rows.length) {
    this.rows[rowIndex || 0].columns.forEach(cell => {
      step += cell.colspan;
    });
  }
  return step;
}

/**
 * 初始化上下文菜单
 */
initContext() {
  if (!this.optionsCoat.options.isEnableContextMenu) {
    return false;
  }

  $(this.handle).hicontextMenu({
    menus: [
      {
        text: `${i18n.__('在上方插入行')}`,
        enabled: this.optionsCoat.options.isEnableInsertRow,
        disable: () => !this.tableCellSelector.getSingleSelect(),
        callback: () => {
          this.insertRow("above");
          this.resizer.updateRowGrips();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('在下方插入行')}`,
        borderBottom: true,
        enabled: this.optionsCoat.options.isEnableInsertRow,
        disable: () => !this.tableCellSelector.getSingleSelect(),
        callback: () => {
          this.insertRow("below");
          this.resizer.updateRowGrips();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('向左方插入列')}`,
        enabled: this.optionsCoat.options.isEnableInsertColumn,
        disable: () => !this.tableCellSelector.getSingleSelect(),
        callback: () => {
          this.insertColumn("left");
          this.resizer.updateColumnGrips();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('向右方插入列')}`,
        enabled: this.optionsCoat.options.isEnableInsertColumn,
        disable: () => !this.tableCellSelector.getSingleSelect(),
        borderBottom: true,
        callback: () => {
          this.insertColumn("right");
          this.resizer.updateColumnGrips();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('删除行')}`,
        enabled: this.optionsCoat.options.isEnableDeleteRow,
        disable: () => !this.tableCellSelector.getSingleSelect() || this.rows.length <= 1,
        callback: () => {
          this.deleteRow();
          this.resizer.updateRowGrips();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('删除列')}`,
        borderBottom: true,
        enabled: this.optionsCoat.options.isEnableDeleteColumn,
        disable: () => !this.tableCellSelector.getSingleSelect() || (this.rows.length > 0 && this.rows[0].columns.length <= 1),
        callback: () => {
          this.deleteColumns();
          this.resizer.updateColumnGrips();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('对齐')}`,
        borderBottom: true,
        enabled: this.optionsCoat.options.columnAlignEditable,
        menus: [
          {
            text: `${i18n.__('左')}`,
            callback: () => this.setAlign("left")
          },
          {
            text: `${i18n.__('左右居中')}`,
            callback: () => this.setAlign("center")
          },
          {
            text: `${i18n.__('右')}`,
            callback: () => this.setAlign("right")
          },
          {
            text: `${i18n.__('默认')}`,
            borderBottom: true,
            callback: () => this.setAlign("")
          },
          {
            text: `${i18n.__('上')}`,
            callback: () => this.setVAlign("top")
          },
          {
            text: `${i18n.__('垂直居中')}`,
            callback: () => this.setVAlign("middle")
          },
          {
            text: `${i18n.__('下')}`,
            callback: () => this.setVAlign("bottom")
          },
          {
            text: `${i18n.__('默认')}`,
            callback: () => this.setVAlign("")
          }
        ]
      },
      {
        text: `${i18n.__('合并单元格')}`,
        enabled: this.optionsCoat.options.isEnableMergeCell,
        disable: () => this.tableCellSelector.getSingleSelect(),
        callback: () => {
          this.mergeCell();
          hinnn.event.trigger("updateTable" + this.id);
        }
      },
      {
        text: `${i18n.__('解开单元格')}`,
        enabled: this.optionsCoat.options.isEnableMergeCell,
        disable: () => {
          const singleSelect = this.tableCellSelector.getSingleSelect();
          return !singleSelect || (singleSelect.cell.rowspan === 1 && singleSelect.cell.colspan === 1);
        },
        callback: () => {
          this.splitCell();
          hinnn.event.trigger("updateTable" + this.id);
        }
      }
    ].filter(menu => menu.enabled)
  });
}

/**
 * 获取表格宽度
 * @returns {number} 表格宽度
 */
getTableWidth() {
  return hinnn.px.toPt(this.target.outerWidth(false));
}

/**
 * 更新列宽调整器
 */
updateColumnGrips() {
  this.resizer.updateColumnGrips();
}

/**
 * 更新行高调整器
 */
updateRowGrips() {
  this.resizer.updateRowGrips();
}
}
  export default PrintTable;