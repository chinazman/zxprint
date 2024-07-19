"use strict";

/*

 */

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return v11408;
    });
  
    var v11409 = webpack_require(10),
      v11408 = function () {
        function v11410() {
        }
  
        return v11410.mergeRect = function (v11411, v11412) {
          var v11413 = Math.min(v11411.x, v11412.x),
            v11416 = Math.min(v11411.y, v11412.y);
          return new v11409.b({
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
  }