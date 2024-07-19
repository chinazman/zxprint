"use strict";

/**
 * import 相关资源
 */
import {i18n,$} from "../hiprint.comm.js";
// 条形码
import JsBarcode from "jsbarcode";

export default function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
  
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return TableExcelHelper;
    });
  
    var _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19),
      _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
      TableExcelHelper = function () {
        function TableExcelHelper() {
        }
  
        return TableExcelHelper.createTableHead = function (v10548, v10549) {
          for (var v10550 = TableExcelHelper.reconsitutionTableColumnTree(v10548), v10551 = $("<thead></thead>"), colgroup = $("<colgroup></colgroup>"), v10552 = TableExcelHelper.getColumnsWidth(v10550, v10549), v10553 = function v10554(v10555) {
              var v10556 = $("<tr></tr>");
              // 重置 colgroup，解决多行表头 col 添加错误问题，仅以最后一行添加
              colgroup = $("<colgroup></colgroup>");
              v10550[v10555].filter(function (v10557) {
                return v10557.checked;
              }).forEach(function (v10558) {
                var v10559 = $("<td></td>");
                v10558.id && v10559.attr("id", v10558.id), v10558.columnId && v10559.attr("column-id", v10558.columnId), (v10558.align || v10558.halign) && v10559.css("text-align", v10558.halign || v10558.align), v10558.vAlign && v10559.css("vertical-align", v10558.vAlign), v10558.colspan > 1 && v10559.attr("colspan", v10558.colspan), v10558.rowspan > 1 && v10559.attr("rowspan", v10558.rowspan), v10559.html(v10558.title), v10552[v10558.id] ? (v10558.hasWidth = !0, v10558.targetWidth = v10552[v10558.id], v10559.attr("haswidth", "haswidth"), v10559.css("width", v10552[v10558.id] + "pt")) : v10558.hasWidth = !1;
                var v10560 = TableExcelHelper.getHeaderStyler(v10558);
                if (v10560) {
                  var v10561 = v10560(v10558);
                  if (v10561) Object.keys(v10561).forEach(function (v10562) {
                    v10559.css(v10562, v10561[v10562]);
                  });
                }
                v10556.append(v10559);
                colgroup.append(`<col column-id="${v10558.columnId}" width="${v10558.width}pt"></col>`);
              }), v10551.append(v10556);
            }, v10563 = 0; v10563 < v10550.totalLayer; v10563++) {
            v10553(v10563);
          }
          return TableExcelHelper.syncTargetWidthToOption(v10548), [v10551, colgroup];
        }, TableExcelHelper.createTableFooter = function (v10564, v10565, v10566, v10567, v10568, v10569) {
          // n=>options e=>表格所有数据 o=>所有打印数据 r=>表格每页数据
          var v10570 = $("<tfoot></tfoot>"),v10571 = this.getFooterFormatter(v10566, v10567);
          var tst = this.tableSummaryTitle;
          let tSumData = v10566.tableFooterRepeat == "last" ? v10565 : v10569;
          let idx = v10566.columns.length - 1;
          var rowColumns = this.rowColumns || v10566.columns[idx].columns;
          if (v10566.tableFooterRepeat != 'no' && rowColumns.some(function (column) {return column.tableSummary;})) {
            var tableFooter = $("<tr></tr>");
            rowColumns.filter(function (v10572) {
              return v10572.checked;
            }).forEach(function (column) {
              var fieldData = tSumData.filter(function (row) {
                return row && row[column.field];
              }).map(function (row) {
                return new RegExp("^-?(0|[1-9]\\d*)(\\.\\d+)?").test(row[column.field]) ? Number(row[column.field]) : 0;
              });
              var text = column.tableSummaryText;
              var numF = column.tableSummaryNumFormat || 2;
              var style = `text-align: ${column.tableSummaryAlign || "center"}`;
              var colspan = column.tableSummaryColspan == void 0 ? 1 : column.tableSummaryColspan;
              var upperCaseType = column.upperCase;
              let { toUpperCase, numFormat } = _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a;
              var tableSummaryFormatter = TableExcelHelper.getColumnTableSummaryFormatter(column);
              var formatterResult = tableSummaryFormatter ? tableSummaryFormatter(column, fieldData, v10565, v10566) : '';
              if (formatterResult) {
                tableFooter.append(formatterResult);
                return;
              }
              switch (column.tableSummary) {
                case "count":
                  var title = tst(column, text || `${i18n.__('计数')}:`, v10568);
                  var count = toUpperCase(upperCaseType, tSumData.filter((v10574) => v10574).length || 0);
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${count}</td>`);
                  break;
                case "sum":
                  var sum = parseFloat(Number(fieldData.reduce(function (prev, cur) {
                    return prev + cur;
                  }, 0)));
                  sum = toUpperCase(upperCaseType, numFormat(sum, numF));
                  var title = tst(column, text || `${i18n.__('合计')}:`, v10568);
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${sum}</td>`);
                  break;
                case "avg":
                  var sum = parseFloat(Number(fieldData.reduce(function (prev, cur) {
                    return prev + cur;
                  }, 0)));
                  var avg = parseFloat(Number(sum / (fieldData.length || 1)));
                  avg = toUpperCase(upperCaseType, numFormat(avg, numF));
                  var title = tst(column, text || `${i18n.__('平均值')}:`, v10568);
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${avg}</td>`);
                  break;
                case "min":
                  var min = Math.min(...fieldData) || 0;
                  min == Infinity && (min = 0);
                  min = toUpperCase(upperCaseType, numFormat(min, numF));
                  var title = tst(column, text || `${i18n.__('最小值')}:`, v10568);
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${min || 0}</td>`);
                  break;
                case "max":
                  var max = Math.max(...fieldData);
                  max == -Infinity && (max = 0);
                  max = toUpperCase(upperCaseType, numFormat(max, numF));
                  var title = tst(column, text || `${i18n.__('最大值')}:`, v10568);
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${title}${max || 0}</td>`);
                  break;
                case "text":
                  tableFooter.append(`<td style="${style}" colspan="${colspan}">${text || ""}</td>`);
                  break;
                default:
                  if (colspan >= 1) {
                    tableFooter.append(`<td style="${style}" colspan="${colspan}">${text || ""}</td>`);
                  }
                  break;
              }
            });
            v10570.append(tableFooter);
          }
          if (v10571) {
            v10570.append(v10571(v10566, v10565, v10568, v10569));
          }
          return v10570;
        }, TableExcelHelper.tableSummaryTitle = function (column, title, data) {
          var v10575 = column.tableSummaryTitle == undefined || column.tableSummaryTitle == true;
          return v10575 ? `${title}` : data ? `` : `<span style="color:firebrick">${title}</span>`;
        }, TableExcelHelper.createTableRow = function (v10576, v10577, printData, v10578, v10579) {
          var v10580 = this;
          var v10581 = TableExcelHelper.reconsitutionTableColumnTree(v10576),
            v10582 = $("<tbody></tbody>");
          var gff = v10580.getGroupFieldsFormatter(v10578, v10579);
          var groupFields = gff ? v10578.groupFields = gff(v10579, v10578, v10577) : v10579.groupFields ? v10579.groupFields : [];
          (v10577 || (v10577 = []), groupFields.length) ? _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a.groupBy(v10577, groupFields, function (v10584) {
            var v10585 = {};
            return groupFields.forEach(function (v10586) {
              return v10585[v10586] = v10584[v10586];
            }), v10585;
          }).forEach(function (v10587) {
            var groupFormatter = v10580.getGroupFormatter(v10578, v10579);
            if (groupFormatter) {
              let result = groupFormatter(v10581.colspan, v10577, printData, v10587, v10578);
              if ($(result).is("tr")) {
                v10582.append(result);
              } else if ($(result).is("td")) {
                v10582.append(`<tr>${result}</tr>`);
              } else {
                v10582.append(`<tr><td>${result}</td></tr>`);
              }
            }
            var groupFooterFormatter = v10580.getGroupFooterFormatter(v10578, v10579);
            var groupData = v10587;
            if (groupData.rows.forEach(function (v10588, rowIndex) {
              var v10589 = TableExcelHelper.createRowTarget(v10581, v10588, v10578, v10579, rowIndex, groupData.rows, printData);
              v10582.append(v10589);
            }), groupFooterFormatter) {
              let result = groupFooterFormatter(v10581.colspan, v10577, printData, v10587, v10578);
              if ($(result).is("tr")) {
                v10582.append(result);
              } else if ($(result).is("td")) {
                v10582.append(`<tr>${result}</tr>`);
              } else {
                v10582.append(`<tr><td>${result}</td></tr>`);
              }
            }
          }) : v10577.forEach(function (v10590, rowIndex) {
            var row = TableExcelHelper.createRowTarget(v10581, v10590, v10578, v10579, rowIndex, v10577, printData);
            v10582.append(row);
          });
          return v10582;
        }, TableExcelHelper.createRowTarget = function (v10591, v10592, v10593, v10594, rowIndex, tableData, printData) {
          var v10595 = $("<tr></tr>");
          var columns = v10591.rowColumns.filter(function (v10596) {
            return v10596.checked;
          });
          v10595.data("rowData", v10592), v10591.rowColumns.filter(function (v10597) {
            return v10597.checked;
          }).forEach(function (v10598, v10599) {
            if (!v10598.checked) return;
            var rowsColumnsMerge = '';
            if (v10593.rowsColumnsMerge) {
              eval('rowsColumnsMerge=' + v10593.rowsColumnsMerge);
              var rowsColumnsArr = rowsColumnsMerge(v10592, v10598, v10599, rowIndex, tableData, printData) || [1, 1];
              var v10600 = $(`<td style = 'display:${!(rowsColumnsArr[0] && rowsColumnsArr[1]) ? "none" : ""}' rowspan = '${rowsColumnsArr[0]}' colspan = '${rowsColumnsArr[1]}'></td>`);
            } else {
              var v10600 = $("<td></td>");
            }
            // 设计时不去计算宽度
            if (v10592 && Object.keys(v10592).length > 0 && ("first" == v10593.tableHeaderRepeat || "none" == v10593.tableHeaderRepeat)) {
              v10598.field && v10600.attr("field", v10598.field), v10598.align && v10600.css("text-align", v10598.align), v10598.vAlign && v10600.css("vertical-align", v10598.vAlign);
              // 无表头时跨行无效，需根据所跨行数重新计算宽度
              if (v10593.rowsColumnsMerge) {
                if (rowsColumnsArr[1] > 1) {
                  var width = 0;
                  columns.forEach((item, index) => {
                    if (index >= v10599 && index < v10599 + rowsColumnsArr[1]) {
                      width += item.width;
                    }
                  });
                }
              }
              v10600.css("width", (width || v10598.width) + "pt");
            } else {
              v10598.field && v10600.attr("field", v10598.field), v10598.align && v10600.css("text-align", v10598.align), v10598.vAlign && v10600.css("vertical-align", v10598.vAlign);
            }
            var v10601 = TableExcelHelper.getColumnFormatter(v10598),
              v10602 = v10601 ? v10601(v10592[v10598.field], v10592, v10599, v10593) : v10592[v10598.field];
            var rf = TableExcelHelper.getColumnRenderFormatter(v10598);
            if (rf) {
              v10600.html(rf(v10592[v10598.field], v10592, v10599, v10593, rowIndex));
              //表格内容插入二维码等
            } else if ("text" == v10598.tableTextType || v10598.tableTextType == void 0) v10600.html(v10602);else
            {
              if ("barcode" == v10598.tableTextType) {
                v10600.html(
                  '<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg ><div class="hibarcode_displayValue"></div>'
                );
                try {
                  v10602 ? (JsBarcode(v10600.find(".hibarcode_imgcode")[0], v10602, {
                    format: v10598.tableBarcodeMode || "CODE128A",
                    width: 1,
                    textMargin: -1,
                    lineColor: "#000000",
                    margin: 0,
                    height: parseInt(10),
                    displayValue: !1
                  }), v10600.find(".hibarcode_imgcode").attr("height", v10598.tableColumnHeight || 30 + 'pt'), v10600.find(".hibarcode_imgcode").css("margin", '5pt 10pt'), v10600.find(".hibarcode_imgcode").attr("width", "calc(100% - 20pt)")) : v10600.html("");
                  // this.options.hideTitle || r.find(".hibarcode_displayValue").html(n)
                  if (v10598.showCodeTitle) {
                    v10600.find('.hibarcode_displayValue').html(v10602);
                  }
                } catch (v10603) {
                  console.log(v10603), v10600.html(`${i18n.__('此格式不支持该文本')}`);
                }
              }
              if ("image" == v10598.tableTextType) {
                v10600.html('');
                if (v10602) {
  
                  var imagebox = $('<div><img style = "max-width:100%;max-height:100%"/></div>');
                  imagebox.find('img').attr('src', v10602);
                  console.log(imagebox.find('img').css('width'));
                  v10600.html(imagebox);
                }
  
              }
              if ("qrcode" == v10598.tableTextType) {
                v10600.html("");
                try {
                  var qrcodebox = $('<div style="margin:2pt 0pt" class="hiqrcode_imgcode"></div>');
  
                  if (v10602) {
                    var v10604 = parseInt(v10598.width || v10598.targetWidth || 20),
                      v10605 = parseInt(v10598.tableColumnHeight || 20);
                    qrcodebox.css('height', (v10604 > v10605 ? v10605 : v10604) + 'pt');
                    new QRCode(qrcodebox[0], {
                      width: v10604 > v10605 ? v10605 : v10604,
                      height: v10604 > v10605 ? v10605 : v10604,
                      colorDark: "#000000",
                      useSVG: !0,
                      correctLevel: v10598.tableQRCodeLevel || 0
                    }).makeCode(v10602);
                    // r.find(".hiqrcode_imgcode").css("margin", '5pt 0pt'),
                    v10600.html(qrcodebox);
                    if (v10598.showCodeTitle) {
                      v10600.append(
                        '<div class="hiqrcode_displayValue"></div>'
                      );
                      v10600.find('.hiqrcode_displayValue').html(v10602);
                    }
                  }
                } catch (v10606) {
                  console.log(v10606), v10600.html(`${i18n.__('二维码生成失败')}`);
                }
              }
              if ('sequence' === v10598.tableTextType) {
                v10600.html(rowIndex + 1);
              }
            }
            var v10607 = TableExcelHelper.getColumnStyler(v10598);
  
            if (v10607) {
              var v10604 = v10607(v10592[v10598.field], v10592, v10599, v10593);
              if (v10604) Object.keys(v10604).forEach(function (v10608) {
                v10600.css(v10608, v10604[v10608]);
              });
            }
  
            v10595.append(v10600);
          });
          var v10609 = TableExcelHelper.getRowStyler(v10593, v10594);
  
          if (v10609) {
            var v10610 = v10609(v10592, v10593);
            if (v10610) Object.keys(v10610).forEach(function (v10611) {
              v10595.css(v10611, v10610[v10611]);
            });
          }
  
          return v10595;
        }, TableExcelHelper.createEmptyRowTarget = function (v10612, tableElement) {
          var v10613 = TableExcelHelper.reconsitutionTableColumnTree(v10612),
            v10614 = $("<tr></tr>");
          v10613.rowColumns.filter(function (v10615) {
            return v10615.checked;
          }).forEach(function (v10616, v10617) {
            var v10618 = $("<td></td>");
            v10616.field && v10618.attr("field", v10616.field), v10616.align && v10618.css("text-align", v10616.align), v10616.vAlign && v10618.css("vertical-align", v10616.vAlign), v10614.append(v10618);
          });
          if (tableElement && tableElement.options.tableBodyRowHeight) {
            v10614.find('td:not([rowspan])').css('height', tableElement.options.tableBodyRowHeight + 'pt');
          }
          return v10614;
        }, TableExcelHelper.getColumnsWidth = function (v10619, v10620) {
          var v10621 = {},
            v10622 = TableExcelHelper.allAutoWidth(v10619),
            v10623 = TableExcelHelper.allFixedWidth(v10619);
          return v10619.rowColumns.filter(function (v10624) {
            return v10624.checked;
          }).forEach(function (v10625) {
            if (v10625.fixed) v10621[v10625.id] = v10625.width;else {
              var v10626 = v10620 - v10623,
                v10627 = v10625.width / v10622 * (v10626 > 0 ? v10626 : 0);
              v10621[v10625.id] = v10627;
            }
          }), v10621;
        }, TableExcelHelper.resizeTableCellWidth = function (v10628, v10629, v10630) {
          var v10631 = TableExcelHelper.reconsitutionTableColumnTree(v10629),
            v10632 = TableExcelHelper.getColumnsWidth(v10631, v10630);
          v10628.find("thead tr td[haswidth]").map(function (v10633, v10634) {
            var v10635 = $(v10634).attr("id"),
              v10636 = v10632[v10635];
            $(v10634).css("width", v10636 + "pt");
          });
        }, TableExcelHelper.allAutoWidth = function (v10637) {
          var v10638 = 0,v10639 = {};
          return v10637.rowColumns.filter(function (v10640) {
            return v10640.checked;
          }).forEach(function (v10641) {
            v10639[v10641.id] ? v10639[v10641.id] = 0 : v10639[v10641.id] = v10641.width;
            v10638 += v10641.fixed ? 0 : v10639[v10641.id];
          }), v10638;
        }, TableExcelHelper.allFixedWidth = function (v10642) {
          var v10643 = 0,v10644 = {};;
          return v10642.rowColumns.filter(function (v10645) {
            return v10645.checked;
          }).forEach(function (v10646) {
            v10644[v10646.id] ? v10644[v10646.id] = 0 : v10644[v10646.id] = v10646.width;
            v10643 += v10646.fixed ? v10644[v10646.id] : 0;
          }), v10643;
        }, TableExcelHelper.reconsitutionTableColumnTree = function (v10647, v10648, v10649) {
          var v10650 = v10648 || new _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__.a();
          v10650.colspan = 0;
  
          for (var v10652 = function v10653(v10654) {
              v10650.totalLayer = v10654 + 1, v10650[v10654] = v10647[v10654].columns, 0 == v10654 && v10647[v10654].columns.forEach(function (v10655) {
                0 == v10654 && (v10650.colspan += v10655.colspan);
              });
            }, v10656 = 0; v10656 < v10647.length; v10656++) {
            v10652(v10656);
          }
  
          return v10650.rowColumns = TableExcelHelper.getOrderdColumns(v10650), v10650;
        }, TableExcelHelper.syncTargetWidthToOption = function (v10657) {
          v10657.forEach(function (v10658) {
            v10658.columns.forEach(function (v10659) {
              v10659.hasWidth && (v10659.width = v10659.targetWidth);
            });
          });
        }, TableExcelHelper.getGroupFieldsFormatter = function (options, tablePrintElementType) {
          var groupFieldsFormatter = void 0;
          if (tablePrintElementType.groupFields && tablePrintElementType.groupFields.length) {
            var arr = typeof tablePrintElementType.groupFields == "string" ? tablePrintElementType.groupFields : JSON.stringify(tablePrintElementType.groupFields);
            options.groupFieldsFormatter = "function(type,options,data){ return " + arr + " }";
          }
          if (tablePrintElementType.groupFieldsFormatter && (groupFieldsFormatter = tablePrintElementType.groupFieldsFormatter), options.groupFieldsFormatter) try {
            var v10660 = "groupFieldsFormatter=" + options.groupFieldsFormatter;
            eval(v10660);
          } catch (v10661) {
            console.log(v10661);
          }
          return groupFieldsFormatter;
        }, TableExcelHelper.getGroupFormatter = function (options, tablePrintElementType) {
          var groupFormatter = void 0;
          if (tablePrintElementType.groupFormatter && (groupFormatter = tablePrintElementType.groupFormatter), options.groupFormatter) try {
            var v10662 = "groupFormatter=" + options.groupFormatter;
            eval(v10662);
          } catch (v10663) {
            console.log(v10663);
          }
          return groupFormatter;
        }, TableExcelHelper.getGroupFooterFormatter = function (options, tablePrintElementType) {
          var groupFooterFormatter = void 0;
          if (tablePrintElementType.groupFooterFormatter && (groupFooterFormatter = tablePrintElementType.groupFooterFormatter), options.groupFooterFormatter) try {
            var v10664 = "groupFooterFormatter=" + options.groupFooterFormatter;
            eval(v10664);
          } catch (v10665) {
            console.log(v10665);
          }
          return groupFooterFormatter;
        }, TableExcelHelper.getFooterFormatter = function (options, tablePrintElementType) {
          var footerFormatter = void 0;
          if (tablePrintElementType.footerFormatter && (footerFormatter = tablePrintElementType.footerFormatter), options.footerFormatter) try {
            var v10666 = "footerFormatter=" + options.footerFormatter;
            eval(v10666);
          } catch (v10667) {
            console.log(v10667);
          }
          return footerFormatter;
        }, TableExcelHelper.getRowStyler = function (options, tablePrintElementType) {
          var rowStyler = void 0;
          if (tablePrintElementType.rowStyler && (rowStyler = tablePrintElementType.rowStyler), options.rowStyler) try {
            var v10668 = "rowStyler=" + options.rowStyler;
            eval(v10668);
          } catch (v10669) {
            console.log(v10669);
          }
          return rowStyler;
        }, TableExcelHelper.getColumnTableSummaryFormatter = function (column) {
          var tableSummaryFormatter = void 0;
          if (column.tableSummaryFormatter && (tableSummaryFormatter = column.tableSummaryFormatter), column.tableSummaryFormatter) try {
            var v10670 = "tableSummaryFormatter=" + column.tableSummaryFormatter;
            eval(v10670);
          } catch (v10671) {
            console.log(v10671);
          }
          return tableSummaryFormatter;
        }, TableExcelHelper.getColumnStyler = function (column) {
          var styler = void 0;
          if (column.styler && (styler = column.styler), column.styler2) try {
            var v10672 = "styler=" + column.styler2;
            eval(v10672);
          } catch (v10673) {
            console.log(v10673);
          }
          return styler;
        }, TableExcelHelper.getHeaderStyler = function (column) {
          var stylerHeader = void 0;
          if (column.stylerHeader && (stylerHeader = column.stylerHeader), column.stylerHeader) try {
            var v10674 = "stylerHeader=" + column.stylerHeader;
            eval(v10674);
          } catch (v10675) {
            console.log(v10675);
          }
          return stylerHeader;
        }, TableExcelHelper.getColumnRenderFormatter = function (column) {
          var renderFormatter = void 0;
          if (column.renderFormatter && (renderFormatter = column.renderFormatter), column.renderFormatter) try {
            var v10676 = "renderFormatter=" + column.renderFormatter;
            eval(v10676);
          } catch (v10677) {
            console.log(v10677);
          }
          return renderFormatter;
        }, TableExcelHelper.getColumnFormatter = function (column) {
          var formatter = void 0;
          if (column.formatter && (formatter = column.formatter), column.formatter2) try {
            var v10678 = "formatter=" + column.formatter2;
            eval(v10678);
          } catch (v10679) {
            console.log(v10679);
          }
          return formatter;
        }, TableExcelHelper.getOrderdColumns = function (v10680) {
          // 新数据
          let newColumns = {};
          // 遍历所有 rawData columns，先处理 colspan 防止后面 rowspan 插入取下标错误
          for (let v10681 = 0; v10681 < v10680.totalLayer; v10681++) {
            newColumns[v10681] = []; // 新数据中添加对应 columns
            v10680[v10681].forEach((column, columnIdx) => {
              newColumns[v10681].push(...new Array(column.colspan).fill({ ...column, colspan: 1 })); // 创建 colspan 个
            });
          }
          // 再次遍历 rawData columns，处理 rowspan 给后面 columns 插入相同 column
          for (let v10682 = 0; v10682 < v10680.totalLayer; v10682++) {
            newColumns[v10682].forEach((column, columnIdx) => {
              for (let v10683 = 1; v10683 < column.rowspan; v10683++) {
                newColumns[v10682 + v10683].splice(columnIdx, 0, { ...column, rowspan: 1 });
              }
            });
          }
          // 把上层/其他层的 field 赋值给最下层
          let lastColumns = [];
          for (let v10684 = 0; v10684 < v10680.totalLayer; v10684++) {
            if (v10684 >= v10680.totalLayer - 1) {
              newColumns[v10684].forEach((column, columnIdx) => {
                if (!column.field) {
                  column.field = lastColumns[columnIdx];
                }
              });
            } else {
              newColumns[v10684].forEach((column, columnIdx) => {
                if (v10684 == 0) {
                  lastColumns.push(column.field || "");
                } else {
                  column.field && (lastColumns[columnIdx] = column.field);
                }
              });
            }
          }
          this.rowColumns = newColumns[v10680.totalLayer - 1];
          return newColumns[v10680.totalLayer - 1];
        }, TableExcelHelper;
      }();
  }