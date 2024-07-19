"use strict";

/**
 * import 相关资源
 */
import {_instanceof} from "../hiprint.comm.js";
import PrintTableCell from "./05PrintTableCell.js";
import PrintTableRow from "./13PrintTableRow.js";


  
    var _i,
    //   v11341 = webpack_require(5),
    //   v11342 = webpack_require(13),
    v11343 = (_i = function v11344(v11345, v11346) {
        return (_i = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v11347, v11348) {
          v11347.__proto__ = v11348;
        } || function (v11349, v11350) {
          for (var v11351 in v11350) {
            v11350.hasOwnProperty(v11351) && (v11349[v11351] = v11350[v11351]);
          }
        })(v11345, v11346);
      }, function (v11352, v11353) {
        function v11354() {
          this.constructor = v11352;
        }
  
        _i(v11352, v11353), v11352.prototype = null === v11353 ? Object.create(v11353) : (v11354.prototype = v11353.prototype, new v11354());
      }),
      PrintElementTableRow = function (v11355) {
        function v11362(v11356) {
          var v11357 = v11355.call(this) || this;
          (v11357.columns = [], v11356 && v11356.constructor === Array) ? (v11356 || []).forEach(function (v11358) {
            v11357.columns.push(new PrintTableCell(v11358));
          }) : v11356.columns && (v11356.columns || []).forEach(function (v11360) {
            v11357.columns.push(new PrintTableCell(v11360));
          });
          return v11357;
        }
  
        return v11343(v11362, v11355), v11362.prototype.getPrintElementOptionEntity = function () {
          var v11363 = [];
          var all = this.allColumns ? this.allColumns.filter(function (v11364) {return !v11364.checked;}) : [];
          return [...this.columns, ...all].forEach(function (v11365) {
            v11363.push(v11365.getEntity());
          }), v11363;
        }, v11362;
      }(PrintTableRow);
export  default PrintElementTableRow;