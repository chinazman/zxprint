import TableRect from "./10TableRect";
/**
 * 界面元素工具类
 */

class TableRectHelper {
  /**
   * 合并两个矩形区域
   * @param {TableRect} rect1 第一个矩形
   * @param {TableRect} rect2 第二个矩形
   * @returns {TableRect} 合并后的新矩形
   */
  static mergeRect(rect1, rect2) {
    // 计算新矩形的左上角坐标
    var newX = Math.min(rect1.x, rect2.x),
      newY = Math.min(rect1.y, rect2.y);

    // 返回新的 TableRect 对象
    return new TableRect({
      x: newX,
      y: newY,
      // 计算新矩形的高度和宽度
      height: Math.max(rect1.y + rect1.height, rect2.y + rect2.height) - newY,
      width: Math.max(rect1.x + rect1.width, rect2.x + rect2.width) - newX,
    });
  }

  /**
   * 创建一个矩形对象，包含最小和最大的 x, y 坐标
   * @param {number} x1 第一个点的 x 坐标
   * @param {number} y1 第一个点的 y 坐标
   * @param {number} x2 第二个点的 x 坐标
   * @param {number} y2 第二个点的 y 坐标
   * @returns {Object} 包含 minX, minY, maxX, maxY 的对象
   */
  static Rect(x1, y1, x2, y2) {
    return {
      minX: Math.min(x1, x2),
      minY: Math.min(y1, y2),
      maxX: Math.max(x1, x2),
      maxY: Math.max(y1, y2),
    };
  }
}
export default TableRectHelper;
