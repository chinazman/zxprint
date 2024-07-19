"use strict";

/**
 * import 相关资源
 */
import {i18n,$,_instanceof} from "../hiprint.comm.js";
import BasePrintElement from "./04BasePrintElement.js";
import PrintConfig from "./01PrintConfig.js";
import PaperHtmlResult from "./06PaperHtmlResult.js";
import hinnn from "./00hinnn.js";
import PrintReferenceElement from "./08PrintReferenceElement.js";
import TablePrintElementOption from "./18TablePrintElementOption.js";
import TableExcelHelper from "./07TableExcelHelper.js";
import PrintTable from "./16PrintTable.js";
import GridColumnStructure from "./20GridColumnsStructure.js";
import PrintLib from "./02PrintLib.js";

  
    // _BasePrintElement__WEBPACK_IMPORTED_MODULE_0__ = webpack_require(4),
    //   _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = webpack_require(1),
    //   _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__ = webpack_require(6),
    //   _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__ = webpack_require(0),
    //   _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__ = webpack_require(8),
    //   _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__ = webpack_require(18),
    //   _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__ = webpack_require(7),
    //   _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__ = webpack_require(16),
    //   _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__ = webpack_require(20),
    //   _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__ = webpack_require(2),
      var    __extends = (_extendStatics = function extendStatics(v11431, v11432) {
        return (_extendStatics = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v11433, v11434) {
          v11433.__proto__ = v11434;
        } || function (v11435, v11436) {
          for (var v11437 in v11436) {
            v11436.hasOwnProperty(v11437) && (v11435[v11437] = v11436[v11437]);
          }
        })(v11431, v11432);
      }, function (v11438, v11439) {
        function v11440() {
          this.constructor = v11438;
        }
  
        _extendStatics(v11438, v11439), v11438.prototype = null === v11439 ? Object.create(v11439) : (v11440.prototype = v11439.prototype, new v11440());
      }),
      _extendStatics,
      TablePrintElement = function (_super) {
        function TablePrintElement(v11441, v11442) {
          var v11443 = _super.call(this, v11441) || this;
          return v11443.gridColumnsFooterCss = "hiprint-gridColumnsFooter", v11443.tableGridRowCss = "table-grid-row", v11443.options = new TablePrintElementOption(v11442, v11443.printElementType), v11443.options.setDefault(new TablePrintElementOption(PrintConfig.instance.table.default).getPrintElementOptionEntity()), v11443;
        }
  
        return __extends(TablePrintElement, _super), TablePrintElement.prototype.getColumns = function () {
          return this.options.columns;
        }, TablePrintElement.prototype.getColumnByColumnId = function (v11447) {
          return this.options.getColumnByColumnId(v11447);
        }, TablePrintElement.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var v11448 = this.designTarget.find(".hiprint-printElement-table-content"),
              v11449 = this.getHtml(this.designPaper);
            v11448.html("");
             v11448.append(v11449[0].target.find(".table-grid-row"));
              this.printElementType.editable && this.setHitable();
               this.setColumnsOptions();
            // 渲染完再处理样式 ==> fix 表脚边框参数设置问题
            this.css(this.designTarget, this.getData());
          }
        }, TablePrintElement.prototype.css = function (v11450, v11451) {
          if ((this.getField() || !this.options.content) && !this.printElementType.formatter) return _super.prototype.css.call(this, v11450, v11451);
        }, TablePrintElement.prototype.getDesignTarget = function (v11452) {
          return this.designTarget = this.getHtml(v11452)[0].target, this.css(this.designTarget, this.getData()), this.designPaper = v11452, this.designTarget.find("td").hidroppable({
            accept: ".rn-draggable-item",
            onDrop: function onDrop(v11453, v11454) {
            },
            onDragEnter: function onDragEnter(v11455, v11456) {
              $(v11456).removeClass("rn-draggable-item");
            },
            onDragLeave: function onDragLeave(v11457, v11458) {
              $(v11458).addClass("rn-draggable-item");
            }
          }), this.designTarget;
        }, TablePrintElement.prototype.getConfigOptions = function () {
          return PrintConfig.instance.table;
        }, TablePrintElement.prototype.createTarget = function (v11460, v11461, v11462) {
          for (var v11463 = $('<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>'), v11464 = this.createGridColumnsStructure(v11462), v11465 = 0; v11465 < v11464.gridColumns; v11465++) {
            v11464.getByIndex(v11465).append(this.getTableHtml(v11461, v11462));
          }
  
          return v11463.find(".hiprint-printElement-table-content").append(v11464.target), v11463;
        }, TablePrintElement.prototype.createGridColumnsStructure = function (v11466) {
          for (var v11467 = $('<div class="hi-grid-row table-grid-row"></div>'), v11468 = 0; v11468 < this.options.getGridColumns(); v11468++) {
            var v11469 = $('<div class="tableGridColumnsGutterRow hi-grid-col" style="width:' + 100 / this.options.getGridColumns() + '%;"></div>');
            v11467.append(v11469);
          }
  
          var v11470 = this.getGridColumnsFooterFormatter();
  
          if (v11470) {
            var v11471 = $('<div class="hiprint-gridColumnsFooter"></div>');
            v11471.append(v11470(this.options, this.getData(v11466), v11466, [])), v11467.append(v11471);
          }
  
          return new GridColumnStructure(this.options.getGridColumns(), v11467);
        }, TablePrintElement.prototype.createtempEmptyRowsTargetStructure = function (v11473) {
          if (this.getField()) return this.createTarget(this.printElementType.title, []);
          var v11474 = this.createTarget(this.printElementType.title, []).clone();
          return v11474.find(".hiprint-printElement-tableTarget tbody tr").remove(), v11474;
        }, TablePrintElement.prototype.getTableHtml = function (v11475, v11476) {
          var v11477, v11478;
          if (!this.getField() && this.options.content) return (v11477 = $("<div></div>")).append(this.options.content), (v11478 = v11477.find("table")).addClass("hiprint-printElement-tableTarget"), v11478;
          if (this.printElementType.formatter) return (v11477 = $("<div></div>")).append(this.printElementType.formatter(v11475)), (v11478 = v11477.find("table")).addClass("hiprint-printElement-tableTarget"), v11478;
          var v11479 = $('<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;"></table>');
          let headerList = TableExcelHelper.createTableHead(this.getColumns(), this.options.getWidth() / this.options.getGridColumns());
          return this.isNotDesign ? v11479.append(headerList) : v11479.append(headerList[0]), v11479.append(TableExcelHelper.createTableRow(this.getColumns(), v11475, v11476, this.options, this.printElementType)), "no" == this.options.tableFooterRepeat || TableExcelHelper.createTableFooter(this.printElementType.columns, v11475, this.options, this.printElementType, v11476, v11475).insertBefore(v11479.find("tbody")), v11479;
        }, TablePrintElement.prototype.getEmptyRowTarget = function () {
          return TableExcelHelper.createEmptyRowTarget(this.getColumns(), this);
        }, TablePrintElement.prototype.getHtml = function (v11484, v11485) {
          this.createTempContainer();
          this.isNotDesign = v11485 != void 0;
          var v11486 = this.getPaperHtmlResult(v11484, v11485);
          return this.removeTempContainer(), v11486;
        }, TablePrintElement.prototype.getPaperHtmlResult = function (v11487, v11488) {
          var v11489 = [],
            v11490 = this.getData(v11488),
            v11491 = this.getTableHtml(v11490, v11488),
            v11492 = this.createtempEmptyRowsTargetStructure(v11488);
          v11488 ? this.updateTargetWidth(v11492) : this.updateTargetSize(v11492), this.css(v11492, v11490), this.css(v11491, v11490), this.getTempContainer().html(""), this.getTempContainer().append(v11492);
          // 页脚导致 分页高度的问题, -> 获取到表格脚高度后移除避免重复
          var tfh = v11492.find('tfoot').outerHeight() || 0;
          v11492.find('tfoot').remove();
          for (var v11493, v11494 = this.getBeginPrintTopInPaperByReferenceElement(v11487), v11495 = 0, v11496 = !1; !v11496;) {
            var v11497 = 0,
              v11498 = v11487.getPaperFooter(v11495);
            0 == v11495 && v11494 > v11498 && "none" != v11487.panelPageRule && (v11494 = v11494 - v11498 + v11487.paperHeader, v11489.push(new PaperHtmlResult({
              target: void 0,
              printLine: void 0
            })), v11497 = v11487.getContentHeight(v11495) - (v11494 - v11487.paperHeader), v11495++, v11498 = v11487.getPaperFooter(v11495));
            var v11500 = v11489.length > 0 ? v11489[v11489.length - 1].target : void 0,
              v11501 = this.getRowsInSpecificHeight(v11488, v11497 > 0 ? v11497 : 0 == v11495 ? v11498 - v11494 : v11487.getContentHeight(v11495), v11492, v11491, v11495, v11500, tfh);
            v11496 = v11501.isEnd;
            if (v11497 < 0) {
              v11489[0].target = $(`<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__('没有足够空间进行表格分页，请调整页眉/页脚线')}</div>`);
              v11489[0].printLine = v11494;
              v11489[0].referenceElement = new PrintReferenceElement({
                top: this.options.getTop(),
                left: this.options.getLeft(),
                height: this.options.getHeight(),
                width: this.options.getWidth(),
                beginPrintPaperIndex: v11487.index,
                bottomInLastPaper: v11494 + this.options.lHeight,
                printTopInPaper: v11494
              });
              v11489[0].target.css("top", v11494 + "pt");
              v11489[0].target.css("left", this.options.displayLeft());
              break;
            }
            var v11503 = void 0;
            v11501.target && (v11501.target.css("left", this.options.displayLeft()), v11501.target[0].height = "");
            if (0 == v11495 || v11497 > 0) {
              v11501.target && (v11493 = v11494, v11501.target.css("top", v11494 + "pt")),
              v11503 = v11496 && null != this.options.lHeight ? v11494 + (v11501.height > this.options.lHeight ? v11501.height : this.options.lHeight) : v11494 + v11501.height;
            } else {
              v11501.target && (v11493 = v11487.paperHeader, v11501.target.css("top", v11487.paperHeader + "pt")), v11503 = v11487.paperHeader + v11501.height;
            }
            v11489.push(new PaperHtmlResult({
              target: v11501.target,
              printLine: v11503,
              referenceElement: new PrintReferenceElement({
                top: this.options.getTop(),
                left: this.options.getLeft(),
                height: this.options.getHeight(),
                width: this.options.getWidth(),
                beginPrintPaperIndex: v11487.index,
                bottomInLastPaper: v11503,
                printTopInPaper: v11493
              })
            })), v11495++;
            v11488 && this.updatePanelHeight(v11503 + this.options.getHeight(), v11487);
          }
  
          return v11489;
        }, TablePrintElement.prototype.getRowsInSpecificHeight = function (v11506, v11507, v11508, v11509, v11510, v11511, tfh) {
          var that = this;
          var v11512 = v11509.find("tbody"),
            v11513 = hinnn.pt.toPx(v11507);
  
          v11508.find(".hiprint-printElement-tableTarget tbody").html("");
          // 不是最后显示页脚
          if ("last" != this.options.tableFooterRepeat) {
            v11508.find(".hiprint-printElement-tableTarget tfoot").remove();
          }
          // 仅首页显示表头
          if ("first" == this.options.tableHeaderRepeat && v11510 > 0) {
            v11508.find(".hiprint-printElement-tableTarget thead").remove();
          } else if ("none" == this.options.tableHeaderRepeat) {
            // 有数据（不是design）
            if (v11506) {
              v11508.find(".hiprint-printElement-tableTarget thead").remove();
            } else {
              v11508.find(".hiprint-printElement-tableTarget thead").css("background", "firebrick");
              v11508.find(".hiprint-printElement-tableTarget thead tr").css("background", "firebrick");
            }
          }
          var noPaging = "none" == this.panel.panelPageRule;
          // 不分页, 且不是设计时, 移除 thead
          var headTr;
          if (v11506 && noPaging) {
            var headStyle = v11508.find(".hiprint-printElement-tableTarget thead").attr("style");
            headTr = v11508.find(".hiprint-printElement-tableTarget thead tr").clone();
            if (headStyle) {
              headTr.attr("style", headStyle);
            } else {
              headTr.css({ "background": "#e8e8e8" });
            }
            v11508.find(".hiprint-printElement-tableTarget thead").remove();
          }
          var v11515 = v11508.outerHeight();
          if (!noPaging && v11515 > v11513) return {
            target: void 0,
            length: 0,
            height: 0,
            isEnd: !1
          };
          var getGridColumns = this.options.getGridColumns();
          for (var v11516 = [], v11517 = 0; v11517 < getGridColumns; v11517++) {
            for (var v11518 = v11508.find(".hiprint-printElement-tableTarget:eq(" + v11517 + ")"), v11519 = void 0, v11520 = [];;) {
              // 不分页处理
              if (noPaging) {
                var trLen = v11512.find("tr").length;
                if (0 == trLen) v11519 = {
                  height: hinnn.px.toPt(v11515),
                  isEnd: !0
                }, v11506 && this.options.autoCompletion && (this.autoCompletion(v11513, v11518, tfh), v11515 = v11508.outerHeight());else {
                  var v11522 = v11512.find("tr:lt(1)");
                  if (v11520.length == 0 && headTr) {
                    v11518.find("tbody").append(headTr);
                  }
                  v11518.find("tbody").append(v11522);
                  var v11523 = v11522.data("rowData");
                  v11516.push(v11523), v11520.push(v11523), v11515 = v11508.outerHeight();
                  0 == trLen && (v11512.prepend(v11522), v11516.pop(), v11520.pop(), v11519 = {
                    height: hinnn.px.toPt(v11515),
                    isEnd: !1
                  });
                }
              } else {
                if (v11515 <= v11513) if (0 == v11512.find("tr").length) v11519 = {
                  height: hinnn.px.toPt(v11515),
                  isEnd: !0
                }, v11506 && this.options.autoCompletion && (this.autoCompletion(v11513, v11518, tfh), v11515 = v11518.outerHeight());else {
                  var v11522 = v11512.find("tr:lt(1)");
                  if (that.options.rowsColumnsMerge && (v11510 > 0 || v11517 > 0) && v11520.length == 0) {
                    v11522 = that.fixMergeSpan(v11522, v11512);
                  }
                  v11518.find("tbody").append(v11522);
                  var v11523 = v11522.data("rowData");
                  v11516.push(v11523), v11520.push(v11523), ((v11515 = v11518.outerHeight(), "last" == this.options.tableFooterRepeat ? v11515 : v11515 += tfh) > v11513 || this.options.maxRows && v11520.length > +this.options.maxRows) && (v11512.prepend(v11522), v11516.pop(), v11520.pop(), v11515 = v11518.outerHeight(), v11519 = {
                    height: hinnn.px.toPt(v11515),
                    isEnd: !1
                  });
                }
              }
  
              if (v11519) {
                // 这里是table 没有tfoot, 后面再看什么原因...
                if ("last" == this.options.tableFooterRepeat && !v11519.isEnd) break;
                if ("no" !== this.options.tableFooterRepeat) {
                  if (noPaging) {
                    v11518.find("tbody").append(TableExcelHelper.createTableFooter(this.printElementType.columns, this.getData(v11506), this.options, this.printElementType, v11506, v11520).children());
                  } else {
                    TableExcelHelper.createTableFooter(this.printElementType.columns, this.getData(v11506), this.options, this.printElementType, v11506, v11520).insertBefore(v11518.find("tbody"));
                  }
                  that.css(v11518, v11506);
                }
                break;
              }
            }
          }
  
          var v11529 = v11508.find(".hiprint-printElement-tableTarget tbody tr").length,
            v11530 = this.getGridColumnsFooterFormatter();
          v11530 && v11508.find(this.gridColumnsFooterCss).html(v11530(this.options, this.getData(v11506), v11506, v11516));
          v11515 = v11508.outerHeight();
          // 当每一页数据,都无法容纳表格行内容时:
          let curRow = v11512.find("tr:lt(1)");
          if (v11529 == 0 && curRow.length && v11523 == curRow.data("rowData")) {
            v11518.find("tbody").append(curRow);
            let height = v11518.find("tbody tr").outerHeight();
            v11512.prepend(curRow);
            return {
              target: $(`<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__('没有足够空间,显示下方内容, 可分页高度')}: ` + v11513 + `px < ${i18n.__('当前需要高度')}: ` + height + 'px</div>').append(curRow.css("background", "blue")),
              length: v11529,
              height: hinnn.px.toPt(v11515),
              isEnd: !1
            };
          }
          // 方便调试看 值...
          var zz = 0 == v11512.find("tr").length ? 0 == v11529 && v11511 ? {
            target: void 0,
            length: 0,
            height: 0,
            isEnd: !0
          } : {
            target: v11508.clone(),
            length: v11529,
            height: hinnn.px.toPt(v11515),
            isEnd: !0
          } : {
            target: v11508.clone(),
            length: v11529,
            height: hinnn.px.toPt(v11515),
            isEnd: !1
          };
          return zz;
        }, TablePrintElement.prototype.fixMergeSpan = function (tr, tbody) {
          const nextRowMap = new Map();
          tr.children().each((v11534, td) => {
            var field = $(td).attr('field');
            nextRowMap.set(field, {
              rowSpan: 1,
              rowEnd: false
            });
            tr.nextAll().each((v11535, nextTr) => {
              if ($(nextTr).has(`td[field=${field}][rowspan=0]`).length && !nextRowMap.get(field).rowEnd) {
                nextRowMap.set(field, { rowSpan: ++nextRowMap.get(field).rowSpan, rowEnd: false });
              } else {
                nextRowMap.set(field, { ...nextRowMap.get(field), rowEnd: true });
              }
            });
  
            if ($(td).attr("rowspan") < 1) {
              $(td).attr("rowspan", nextRowMap.get(field).rowSpan);
              $(td).css("display", "");
              if (this.options.rowsColumnsMergeClean) {
                $(td).text("");
              }
            }
          });
          return tr;
        }, TablePrintElement.prototype.autoCompletion = function (v11536, v11537, tfh) {
          var that = this;
          for (var v11538, v11539 = this.getEmptyRowTarget(), v11540 = v11537.outerHeight() + tfh; v11536 > v11540;) {
            v11538 = v11539.clone(), v11537.find("tbody").append(v11538), v11540 = v11537.outerHeight() + tfh;
            if (that.options.maxRows && v11537.find("tbody").children().length > that.options.maxRows) {
              break;
            }
          }
  
          v11538 && v11538.remove();
        }, TablePrintElement.prototype.getData = function (v11541) {
          if (!v11541) {
            // 设计时表格 测试数据
            try {
              let testData = this.options.testData || '[{}]';
              return JSON.parse(testData);
            } catch (v11542) {
              console.log('table testData parse error', v11542);
              return [{}];
            }
          };
          var v11543 = this.getField();
          var v11544 = v11543 ? v11543.split('.').reduce((v11545, v11546) => v11545 ? v11545[v11546] : v11541 ? v11541[v11546] : "", !1) || "" : "";
          return v11544 ? JSON.parse(JSON.stringify(v11544)) : [];
        }, TablePrintElement.prototype.onResize = function (v11547, v11548, v11549, v11550, v11551) {
          _super.prototype.updateSizeAndPositionOptions.call(this, v11551, v11550, v11549, v11548), TableExcelHelper.resizeTableCellWidth(this.designTarget, this.getColumns(), this.options.getWidth());
        }, TablePrintElement.prototype.getReizeableShowPoints = function () {
          return ["s", "e"];
        }, TablePrintElement.prototype.design = function (v11553, v11554) {
          var v11555 = this;
          this.designTarget.hidraggable({
            handle: this.designTarget.find(".hiprint-printElement-table-handle"),
            axis: v11555.options.axis ? v11555.options.axis : void 0,
            designTarget: v11555,
            onDrag: function onDrag(v11556, v11557, v11558) {
              v11555.updateSizeAndPositionOptions(v11557, v11558), v11555.createLineOfPosition(v11554);
              PrintLib.instance.changed = !0;
            },
            moveUnit: "pt",
            minMove: PrintConfig.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(v11561) {
              PrintLib.instance.draging = !0, v11555.createLineOfPosition(v11554);
            },
            getScale: function getScale() {
              return v11555.designPaper.scale || 1;
            },
            onStopDrag: function onStopDrag(v11563) {
              if (PrintLib.instance.changed) hinnn.event.trigger("hiprintTemplateDataChanged_" + v11555.templateId, "移动");
              PrintLib.instance.draging = !1,
              PrintLib.instance.changed = !1,
              v11555.removeLineOfPosition();
            }
          }), this.printElementType.editable && this.setHitable(), this.setColumnsOptions(), this.designTarget.hireizeable({
            showPoints: v11555.getReizeableShowPoints(),
            // 是否显示宽高box
            showSizeBox: PrintConfig.instance.showSizeBox,
            noContainer: !0,
            onBeforeResize: function onBeforeResize() {
              PrintLib.instance.draging = !0;
            },
            getScale: function getScale() {
              return v11555.designPaper.scale || 1;
            },
            onResize: function onResize(v11570, v11571, v11572, v11573, v11574) {
              v11555.onResize(v11570, v11571, v11572, v11573, v11574), v11555.hitable && v11555.hitable.updateColumnGrips(), v11555.createLineOfPosition(v11554);
            },
            onStopResize: function onStopResize(v11575) {
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v11555.templateId, v11575 ? "旋转" : "大小");
              PrintLib.instance.draging = !1, v11555.removeLineOfPosition();
            }
          }), this.bingKeyboardMoveEvent(this.designTarget, v11554);
        }, TablePrintElement.prototype.setHitable = function () {
          var v11578 = this;
          this.hitable = new PrintTable({
            templateId: v11578.templateId,
            table: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)"),
            rows: this.getColumns(),
            resizeRow: !1,
            resizeColumn: !0,
            fields: this.options.fields,
            trs: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("tbody tr"),
            handle: this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("thead"),
            isEnableEdit: this.printElementType.editable ? this.printElementType.editable : !0,
            columnDisplayEditable: this.printElementType.columnDisplayEditable != undefined ? this.printElementType.columnDisplayEditable : !0,
            columnDisplayIndexEditable: this.printElementType.columnDisplayIndexEditable != undefined ? this.printElementType.columnDisplayIndexEditable : !0,
            columnResizable: this.printElementType.columnResizable != undefined ? this.printElementType.columnResizable : !0,
            columnAlignEditable: this.printElementType.columnAlignEditable != undefined ? this.printElementType.columnAlignEditable : !0,
            isEnableEditText: this.printElementType.columnTitleEditable != undefined ? this.printElementType.columnTitleEditable : !0,
            isEnableEditField: this.printElementType.isEnableEditField != undefined ? this.printElementType.isEnableEditField : !0,
            isEnableContextMenu: this.printElementType.isEnableContextMenu != undefined ? this.printElementType.isEnableContextMenu : !0,
            isEnableInsertRow: this.printElementType.isEnableInsertRow != undefined ? this.printElementType.isEnableInsertRow : !0,
            isEnableDeleteRow: this.printElementType.isEnableDeleteRow != undefined ? this.printElementType.isEnableDeleteRow : !0,
            isEnableInsertColumn: this.printElementType.isEnableInsertColumn != undefined ? this.printElementType.isEnableInsertColumn : !0,
            isEnableDeleteColumn: this.printElementType.isEnableDeleteColumn != undefined ? this.printElementType.isEnableDeleteColumn : !0,
            isEnableMergeCell: this.printElementType.isEnableMergeCell != undefined ? this.printElementType.isEnableMergeCell : !0
          }), hinnn.event.on("updateTable" + this.hitable.id, function () {
            v11578.updateDesignViewFromOptions();
            hinnn.event.trigger("hiprintTemplateDataChanged_" + v11578.templateId, "调整表头");
          });
        }, TablePrintElement.prototype.setColumnsOptions = function () {
          var v11582 = this;
          this.designTarget.find(".hiprint-printElement-tableTarget:eq(0)").find("thead td").bind("click.hiprint", function (v11583) {
            var v11584 = $(v11583.target).attr("id") || $(v11583.target).attr("column-id"),
              v11585 = v11582.getColumnByColumnId(v11584);
  
            if (v11585) {
              var v11586 = v11582.getPrintElementOptionItemsByName("tableColumn");
  
              hinnn.event.trigger(v11582.getPrintElementSelectEventKey(), {
                printElement: v11582,
                customOptionsInput: [{
                  title: (v11585.title || `${v11585.id}(id)`) + `-${i18n.__('列属性')}`,
                  optionItems: v11586,
                  options: v11585,
                  callback: function callback(v11588) {
                    v11586.forEach(function (v11589) {
                      var v11590 = v11589.getValue();
                      if ("title" == v11589.name && v11590 && !v11590.trim().endsWith("#") && !v11590.trim().startsWith("#")) {
                        var v11591 = v11590 ? v11590.split("#") : "";
                        v11585.title = v11591[0], v11591.length > 1 && (v11585.columnId = v11585.field = v11591[1]);
                        v11585.columnId && v11585.target.attr("column-id", v11585.columnId);
                        v11589.target.find("textarea").val(v11591[0]);
                        return;
                      }
                      v11585[v11589.name] = v11590;
                    });
                  }
                }]
              });
            } else hinnn.event.trigger(v11582.getPrintElementSelectEventKey(), {
              printElement: v11582
            });
          });
        }, TablePrintElement.prototype.filterOptionItems = function (v11593) {
          var v11594 = _super.prototype.filterOptionItems.call(this, v11593);
  
          return this.printElementType.editable && 1 == this.options.columns.length ? v11594 : v11593.filter(function (v11595) {
            return "columns" != v11595.name;
          });
        }, TablePrintElement.prototype.getFooterFormatter = function () {
          var footerFormatter = void 0;
          if (this.printElementType.footerFormatter && (footerFormatter = this.printElementType.footerFormatter), this.options.footerFormatter) try {
            var v11596 = "footerFormatter=" + this.options.footerFormatter;
            eval(v11596);
          } catch (v11597) {
            console.log(v11597);
          }
          return footerFormatter;
        }, TablePrintElement.prototype.getGridColumnsFooterFormatter = function () {
          var gridColumnsFooterFormatter = void 0;
          if (this.printElementType.gridColumnsFooterFormatter && (gridColumnsFooterFormatter = this.printElementType.gridColumnsFooterFormatter), this.options.gridColumnsFooterFormatter) try {
            var v11598 = "gridColumnsFooterFormatter=" + this.options.gridColumnsFooterFormatter;
            eval(v11598);
          } catch (v11599) {
            console.log(v11599);
          }
          return gridColumnsFooterFormatter;
        }, TablePrintElement;
      }(BasePrintElement);
export default TablePrintElement;