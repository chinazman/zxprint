import TableRect from './10TableRect';
/**
 * 界面元素工具类
 */
var TableRectHelper = function () {
    function v11410() {
    }

    return v11410.mergeRect = function (v11411, v11412) {
      var v11413 = Math.min(v11411.x, v11412.x),
        v11416 = Math.min(v11411.y, v11412.y);
      return new TableRect({
        x: v11413,
        y: v11416,
        height: Math.max(v11411.y + v11411.height, v11412.y + v11412.height) - v11416,
        width: Math.max(v11411.x + v11411.width, v11412.x + v11412.width) - v11413
      });
    }, v11410.Rect = function (v11426, v11427, v11428, v11429) {
      return {
        minX: v11426 < v11428 ? v11426 : v11428,
        minY: v11427 < v11429 ? v11427 : v11429,
        maxX: v11426 < v11428 ? v11428 : v11426,
        maxY: v11427 < v11429 ? v11429 : v11427
      };
    }, v11410;
  }();

  export default TableRectHelper;