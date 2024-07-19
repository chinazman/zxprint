"use strict";

/**
 * import 相关资源
 */
import {$} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return v11371;
    });
  
    var v11372 = webpack_require(11),
      v11373 = webpack_require(5),
      v11371 = function () {
        function v11374() {
          this.id = v11372.a.createId();
        }
  
        return v11374.prototype.init = function (v11376, v11377, v11378) {
          this.isHead = v11378, this.target = v11377 || $("<tr></tr>"), this.tableOptions = v11376,
          this.allColumns = this.columns || [],
          this.initCells((this.columns || []).filter(function (column) {return column.checked;}));
        }, v11374.prototype.getTarget = function () {
          return this.target;
        }, v11374.prototype.initCells = function (v11379) {
          var v11380 = this;
          v11379 ? (this.columns = v11379, v11379.forEach(function (v11381, v11382) {
            v11381.init(v11380.target.find("td:eq(" + v11382 + ")"), v11380.tableOptions, v11380.id, v11380.isHead);
          })) : (this.columns = [], this.target.find("td").map(function (v11383, v11384) {
            var v11385 = new v11373.a();
            v11385.init($(v11384), v11380.tableOptions, v11380.id, v11380.isHead), v11380.columns.push(v11385);
          }));
        }, v11374.prototype.removeCell = function (v11387) {
          var v11388 = this.columns.indexOf(v11387);
          this.columns[v11388].getTarget().remove(), this.columns.splice(v11388, 1);
        }, v11374.prototype.createTableCell = function (v11389, v11390) {
          var v11391 = new v11373.a();
          return v11391.init($("<td></td>"), this.tableOptions, this.id, this.isHead), v11389 > 1 && (v11391.getTarget().attr("rowspan", v11389), v11391.rowspan = v11389), v11390 > 1 && (v11391.getTarget().attr("colspan", v11390), v11391.colspan = v11390), v11391;
        }, v11374.prototype.insertToTargetCellLeft = function (v11393, v11394) {
          var v11395 = this.columns.indexOf(v11393);
          v11393.getTarget().before(v11394.getTarget()), this.columns.splice(v11395, 0, v11394);
        }, v11374.prototype.insertToTargetCellRight = function (v11396, v11397) {
          var v11398 = this.columns.indexOf(v11396);
          this.columns[v11398].getTarget().after(v11397.getTarget()), this.columns.splice(v11398 + 1, 0, v11397);
        }, v11374.prototype.insertCellToFirst = function (v11399) {
          this.target.prepend(v11399.getTarget()), this.columns.splice(0, 0, v11399);
        }, v11374.prototype.insertCellToLast = function (v11400) {
          this.columns.push(v11400), this.target.append(v11400.getTarget());
        }, v11374.prototype.getPrintElementOptionEntity = function () {
          var v11401 = [];
          return [...this.columns, ...this.allColumns.filter(function (v11402) {return !v11402.checked;})].forEach(function (v11403) {
            v11401.push(v11403.getEntity());
          }), v11401;
        }, v11374;
      }();
  }