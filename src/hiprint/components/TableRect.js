/**
 * TableRect 类
 * 表示一个矩形区域，通常用于表格中的单元格或选择区域
 */
class TableRect {
  /**
   * 创建一个新的 TableRect 实例
   * @param {Object} options - 矩形的属性
   * @param {number} options.x - 矩形左上角的 x 坐标
   * @param {number} options.y - 矩形左上角的 y 坐标
   * @param {number} options.width - 矩形的宽度
   * @param {number} options.height - 矩形的高度
   */
  constructor({ x, y, width, height }) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  }
}

export default TableRect;