"use strict";

/**
 * import 相关资源
 */

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return v11291;
    }), webpack_require.d(webpack_exports, "b", function () {
      return v11293;
    });
  
    var v11294 = webpack_require(14),
      v11291 = function () {
        function v11297(v11295, v11296) {
          this.selectedCells = [], this.rows = v11295, this.tableTatget = v11296;
        }
  
        return v11297.prototype.clear = function () {
          this.tableTatget.find("td").removeClass("selected");
        }, v11297.prototype.setSingleSelect = function (v11298) {
          this.startCell = v11298, this.selectedCells = [];
        }, v11297.prototype.getSingleSelect = function () {
          if (this.selectedCells.length) {
            if (1 == this.selectedCells.length) return 1 == this.selectedCells[0].length ? this.selectedCells[0][0] : void 0;
            if (this.selectedCells.length > 1) return;
          }
  
          return this.startCell;
        }, v11297.prototype.singleSelectByXY = function (v11299, v11300) {
          var v11301 = this.getCellByXY(v11299, v11300);
          v11301 && (this.clear(), v11301 && (v11301.cell.select(), this.startCell = v11301, this.selectedCells = []));
        }, v11297.prototype.multipleSelectByXY = function (v11302, v11303) {
          this.clear();
          var v11304 = [];
  
          if (this.startCell) {
            var v11305 = this.getCellByXY(v11302, v11303);
  
            if (v11305) {
              var v11306 = v11294.a.mergeRect(this.startCell.cell.getTableRect(), v11305.cell.getTableRect());
              this.selectByRect(new v11307(v11306), v11304);
            }
          }
  
          this.selectedCells = v11304;
        }, v11297.prototype.selectByRect = function (v11308, v11309) {
          this.rows.forEach(function (v11310, v11311) {
            var v11312 = [];
            v11310.columns.forEach(function (v11313) {
              v11313.isInRect(v11308) && (v11312.push(new v11314(v11311, v11313)), v11313.select());
            }), v11312.length && v11309.push(v11312);
          }), v11308.changed && (v11308.changed = !1, v11309.splice(0, v11309.length), this.selectByRect(v11308, v11309));
        }, v11297.prototype.getSelectedCells = function () {
          return this.selectedCells;
        }, v11297.prototype.getCellByXY = function (v11315, v11316) {
          var v11317;
          return this.rows.forEach(function (v11318, v11319) {
            var v11320 = (v11318.columns || []).filter(function (column) {return column.checked;}).filter(function (v11321) {
              return v11321.isXYinCell(v11315, v11316);
            });
            v11320.length && (v11317 = new v11314(v11319, v11320[0]));
          }), v11317;
        }, v11297;
      }(),
      v11293 = function () {
        return function (v11322) {
          this.x = v11322.x, this.y = v11322.y, this.height = v11322.height, this.width = v11322.width;
        };
      }(),
      v11307 = function () {
        return function (v11327) {
          this.rect = v11327;
        };
      }(),
      v11314 = function () {
        return function (v11328, v11329) {
          this.rowIndex = v11328, this.cell = v11329;
        };
      }();
  }