import PrintTableCell from "./PrintTableCell.js";
import PrintTableRow from "./PrintTableRow.js";

/**
 * PrintElementTableRow 类，继承自 PrintTableRow
 */
class PrintElementTableRow extends PrintTableRow {
  /**
   * 构造函数
   * @param {Array|Object} options 初始化选项
   */
  constructor(options) {
    super();
    this.columns = [];

    if (options && options.constructor === Array) {
      (options || []).forEach(columnOption => {
        this.columns.push(new PrintTableCell(columnOption));
      });
    } else if (options && options.columns) {
      (options.columns || []).forEach(columnOption => {
        this.columns.push(new PrintTableCell(columnOption));
      });
    }
  }

  /**
   * 获取打印元素选项实体
   * @returns {Array} 打印元素选项实体数组
   */
  getPrintElementOptionEntity() {
    const entities = [];
    const uncheckedColumns = this.allColumns ? this.allColumns.filter(column => !column.checked) : [];
    
    [...this.columns, ...uncheckedColumns].forEach(column => {
      entities.push(column.getEntity());
    });

    return entities;
  }
}

export default PrintElementTableRow;