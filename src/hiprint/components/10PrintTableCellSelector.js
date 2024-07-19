/**
 * 表格元素
 */
import TableRectHelper from "./14TableRectHelper";

class PrintTableCellSelector {
  constructor(rows, tableTarget) {
    this.selectedCells = [];
    this.rows = rows;
    this.tableTarget = tableTarget;
  }

  // 清除所有选中的单元格
  clear() {
    this.tableTarget.find("td").removeClass("selected");
  }

  // 设置单选模式
  setSingleSelect(startCell) {
    this.startCell = startCell;
    this.selectedCells = [];
  }

  // 获取单选的单元格
  getSingleSelect() {
    if (this.selectedCells.length) {
      if (this.selectedCells.length === 1) {
        return this.selectedCells[0].length === 1 ? this.selectedCells[0][0] : undefined;
      }
      if (this.selectedCells.length > 1) {
        return undefined;
      }
    }
    return this.startCell;
  }

  // 通过坐标进行单选
  singleSelectByXY(x, y) {
    const targetCell = this.getCellByXY(x, y);
    if (targetCell) {
      this.clear();
      targetCell.cell.select();
      this.startCell = targetCell;
      this.selectedCells = [];
    }
  }

  // 通过坐标进行多选
  multipleSelectByXY(x, y) {
    this.clear();
    const selectedCellGroups = [];

    if (this.startCell) {
      const endCell = this.getCellByXY(x, y);
      if (endCell) {
        const mergedRect = TableRectHelper.mergeRect(
          this.startCell.cell.getTableRect(),
          endCell.cell.getTableRect()
        );
        this.selectByRect(new SelectionRect(mergedRect), selectedCellGroups);
      }
    }

    this.selectedCells = selectedCellGroups;
  }

  // 根据矩形区域选择单元格
  selectByRect(selectionRect, selectedCellGroups) {
    this.rows.forEach((row, rowIndex) => {
      const selectedCellsInRow = [];
      row.columns.forEach((cell) => {
        if (cell.isInRect(selectionRect)) {
          selectedCellsInRow.push(new SelectedCell(rowIndex, cell));
          cell.select();
        }
      });
      if (selectedCellsInRow.length) {
        selectedCellGroups.push(selectedCellsInRow);
      }
    });

    if (selectionRect.changed) {
      selectionRect.changed = false;
      selectedCellGroups.splice(0, selectedCellGroups.length);
      this.selectByRect(selectionRect, selectedCellGroups);
    }
  }

  // 获取所有选中的单元格
  getSelectedCells() {
    return this.selectedCells;
  }

  // 根据坐标获取单元格
  getCellByXY(x, y) {
    let targetCell;
    this.rows.forEach((row, rowIndex) => {
      const matchedColumns = (row.columns || [])
        .filter((column) => column.checked)
        .filter((column) => column.isXYinCell(x, y));
      
      if (matchedColumns.length) {
        targetCell = new SelectedCell(rowIndex, matchedColumns[0]);
      }
    });
    return targetCell;
  }
}

// 选择矩形类
class SelectionRect {
  constructor(rect) {
    this.rect = rect;
  }
}

// 选中的单元格类
class SelectedCell {
  constructor(rowIndex, cell) {
    this.rowIndex = rowIndex;
    this.cell = cell;
  }
}

export default PrintTableCellSelector;