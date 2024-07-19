"use strict";

/**
 * import 相关资源
 */
import {_instanceof} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    var v11868 = webpack_require(3),
      v11869 = webpack_require(12),
      v11870 = (function () {
      }(), function () {
        return function (v11871) {
          this.width = v11871.width, this.title = v11871.title, this.field = v11871.field, this.checked = v11871.checked, this.columnId = v11871.columnId, this.fixed = !1, this.rowspan = v11871.rowspan || 1, this.colspan = v11871.colspan || 1, this.align = v11871.align, this.halign = v11871.halign, this.vAlign = v11871.vAlign, this.renderFormatter = v11871.renderFormatter, this.formatter2 = v11871.formatter2, this.styler2 = v11871.styler2, this.stylerHeader = v11871.stylerHeader, this.tableColumnHeight = v11871.tableColumnHeight, this.tableTextType = v11871.tableTextType, this.tableBarcodeMode = v11871.tableBarcodeMode, this.tableQRCodeLevel = v11871.tableQRCodeLevel, this.tableSummaryTitle = v11871.tableSummaryTitle, this.tableSummaryText = v11871.tableSummaryText, this.tableSummaryColspan = v11871.tableSummaryColspan, this.tableSummary = v11871.tableSummary, this.tableSummaryAlign = v11871.tableSummaryAlign, this.tableSummaryNumFormat = v11871.tableSummaryNumFormat, this.tableSummaryFormatter = v11871.tableSummaryFormatter, this.showCodeTitle = v11871.showCodeTitle, this.upperCase = v11871.upperCase;
        };
      }()),
      v11872 = webpack_require(5);
    webpack_require.d(webpack_exports, "a", function () {
      return v11874;
    });
  
    var _p,
      v11875 = (_p = function v11876(v11877, v11878) {
        return (_p = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v11879, v11880) {
          v11879.__proto__ = v11880;
        } || function (v11881, v11882) {
          for (var v11883 in v11882) {
            v11882.hasOwnProperty(v11883) && (v11881[v11883] = v11882[v11883]);
          }
        })(v11877, v11878);
      }, function (v11884, v11885) {
        function v11886() {
          this.constructor = v11884;
        }
  
        _p(v11884, v11885), v11884.prototype = null === v11885 ? Object.create(v11885) : (v11886.prototype = v11885.prototype, new v11886());
      }),
      v11874 = function (v11887) {
        function v11901(v11888, v11889) {
          var v11890 = this;
          (v11888 = v11888 || {}, (v11890 = v11887.call(this, v11888) || this).lHeight = v11888.lHeight, v11890.autoCompletion = v11888.autoCompletion, v11890.tableFooterRepeat = v11888.tableFooterRepeat, v11889) && (v11890.columns = [], v11889.editable && v11888.columns && v11888.columns.length ? v11888.columns.forEach(function (v11891) {
            var v11892 = [];
            v11891.forEach(function (v11893) {
              var v11894 = new v11870(v11893),
                v11895 = v11889.getColumnByColumnId(v11894.columnId),
                v11896 = v11895 ? $.extend(v11895, v11894) : new v11872.a(v11894);
              v11892.push(v11896);
            }), v11890.columns.push(new v11869.a(v11892));
          }) : v11889.columns.forEach(function (v11899) {
            v11890.columns.push(new v11869.a(v11899));
          }));
          return v11890;
        }
  
        return v11875(v11901, v11887), v11901.prototype.getColumnByColumnId = function (v11902) {
          return this.makeColumnObj()[v11902];
        }, v11901.prototype.makeColumnObj = function () {
          var v11903 = {};
          return this.columns && this.columns.forEach(function (v11904) {
            v11904.columns.forEach(function (v11905) {
              (v11905.id || v11905.columnId) && (v11903[v11905.id || v11905.columnId] = v11905);
            });
          }), v11903;
        }, v11901.prototype.getGridColumns = function () {
          return this.gridColumns || 1;
        }, v11901.prototype.getPrintElementOptionEntity = function () {
          var v11906 = v11887.prototype.getPrintElementOptionEntity.call(this);
          v11906.fields = this.fields;
          return this.columns && (v11906.columns = [], this.columns.forEach(function (v11907) {
            var v11908 = v11907.getPrintElementOptionEntity().map(function (v11909) {
              return new v11870(v11909);
            });
            v11906.columns.push(v11908);
          })), v11906;
        }, v11901;
      }(v11868.a);
  }