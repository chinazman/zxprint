"use strict";
/**
 * 表格字段结构
 */
class GridColumnsStructure {
  constructor(gridColumns, target) {
    this.gridColumns = gridColumns;
    this.target = target;
  }
  getByIndex(index) {
    return this.target.find(".hi-grid-col:eq(" + index + ")");
  }
}
export default GridColumnsStructure;
