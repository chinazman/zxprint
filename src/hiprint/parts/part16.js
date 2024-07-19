"use strict";

/**
这个JavaScript文件定义了一个表格编辑的功能模块，它提供了一系列操作表格的方法，包括但不限于：

1. **创建和初始化表格**：通过构造函数`v11710`初始化表格实例，设置表格的各种属性和行为。

2. **行和列的增删**：提供`insertRow`和`deleteRow`方法来在表格中插入或删除行，以及`insertColumn`和`deleteColums`（可能是`deleteColumns`的拼写错误）来插入或删除列。

3. **单元格的合并与拆分**：`mergeCell`方法用于合并选定的单元格，`splitCell`用于拆分单元格。

4. **单元格的编辑**：提供了启用和禁用编辑模式的方法`enableEidt`和`disableEdit`（可能是`enableEdit`和`disableEdit`的拼写错误），以及设置单元格对齐方式的方法`setAlign`和`setVAlign`。

5. **表格的调整大小**：通过`resizeTableCellWidth`和`resizeTableCellWeight`方法调整单元格的宽度。

6. **上下文菜单**：初始化上下文菜单`initContext`，提供了一系列表格操作的快捷选项，如插入行列、删除行列、对齐方式设置、合并单元格等。

7. **事件触发**：在执行操作后，如插入行、删除列等，会触发相应的事件，例如`"newRow" + this.id`和`"updateTable" + this.id`。

8. **辅助功能**：例如`getCellGrid`用于获取表格的网格布局信息，`getColumnStep`用于获取列的跨度步长。

9. **表格尺寸获取**：`getTableWidth`方法用于获取表格的宽度。

10. **表格的调整手柄**：通过`createColumnGrips`和`createRowGrips`方法创建用于调整列宽和行高的手柄。

整个文件看起来是一个复杂的表格操作库的一部分，它提供了丰富的API来对HTML表格进行各种编辑和操作。代码中使用了大量的闭包和立即执行函数表达式（IIFE），这可能是为了创建私有作用域和模块化的代码结构。此外，代码中存在一些潜在的拼写错误，如`deleteColums`和`enableEidt`，它们可能是`deleteColumns`和`enableEdit`的误拼。

 */
import {i18n,$} from "../hiprint.comm.js";


export default function (v11601, v11602, v11603) {
    "use strict";
  
    var v11604 = function () {
        return function (v11605) {
          this.table = v11605.table, this.templateId = v11605.templateId, this.fields = v11605.fields, this.isEnableEdit = v11605.isEnableEdit, this.trs = v11605.trs, this.resizeRow = v11605.resizeRow, this.resizeColumn = v11605.resizeColumn, this.isEnableEditField = v11605.isEnableEditField, this.isEnableContextMenu = v11605.isEnableContextMenu, this.isEnableEditField = v11605.isEnableEditField, this.isEnableInsertRow = v11605.isEnableInsertRow, this.isEnableDeleteRow = v11605.isEnableDeleteRow, this.isEnableInsertColumn = v11605.isEnableInsertColumn, this.isEnableDeleteColumn = v11605.isEnableDeleteColumn, this.isEnableMergeCell = v11605.isEnableMergeCell, this.columnResizable = v11605.columnResizable, this.columnAlignEditable = v11605.columnAlignEditable;
        };
      }(),
      v11606 = function () {
        function v11608(v11607) {
          this.options = new v11604(v11607);
        }
  
        return v11608.prototype.enableEidt = function () {
          this.options.isEnableEdit;
        }, v11608.prototype.disableEdit = function () {
          this.options.isEnableEdit;
        }, v11608.prototype.isEnableEdit = function () {
          return this.options.isEnableEdit;
        }, v11608;
      }(),
      v11609 = v11603(0),
      v11610 = function () {
        return function (v11611) {
          this.cell = v11611.cell, this.link = v11611.link, this.linkType = v11611.linkType, this.bottom = v11611.bottom, this.rightMost = v11611.rightMost, this.rowLevel = v11611.rowLevel, this.columnLevel = v11611.columnLevel, this.indexInTableGridRow = v11611.indexInTableGridRow, this.indexInTableGridColumn = v11611.indexInTableGridColumn;
        };
      }(),
      v11612 = v11603(10),
      v11613 = function () {
        function v11614() {
        }
  
        return v11614.getLeftTableCell = function (v11615, v11616) {
          var v11617;
          return v11615.forEach(function (v11618, v11619) {
            v11618.cell && v11619 < v11616 && (v11617 = v11618.cell);
          }), v11617;
        }, v11614.getIndex = function (v11620, v11621) {
          var v11622;
          return v11620.forEach(function (v11623, v11624) {
            v11623.cell && v11623.cell.id == v11621 && (v11622 = v11624);
          }), v11622;
        }, v11614;
      }(),
      v11625 = v11603(13),
      v11626 = v11603(11),
      v11627 = function () {
        return function (v11628, v11629) {
          this.target = v11628, this.grips = v11629;
        };
      }(),
      v11630 = function () {
        return function (v11631) {
          this.target = v11631;
        };
      }(),
      v11632 = function () {
        return function () {
          this.rowColumns = [];
        };
      }(),
      v11633 = function () {
        function v11634() {
        }
  
        return v11634.getColumnsWidth = function (v11635, v11636) {
          var v11637 = {},
            v11638 = v11634.allAutoWidth(v11635);
          return v11635.rowColumns.forEach(function (v11639) {
            var v11640 = v11636 - 0,
              v11641 = v11639.width / v11638 * (v11640 > 0 ? v11640 : 0);
            v11637[v11639.id] = v11641;
          }), v11637;
        }, v11634.resizeTableCellWeight = function (v11642) {
          v11642.forEach(function (v11643) {
            v11643.columns.forEach(function (v11644) {
              v11644.hasWidth && $(v11644.getTarget()).css("width", v11644.width + "pt");
            });
          });
        }, v11634.allAutoWidth = function (v11645) {
          var v11646 = 0;
          return v11645.rowColumns.forEach(function (v11647) {
            v11646 += v11647.width;
          }), v11646;
        }, v11634.reconsitutionTableColumnTree = function (v11648, v11649, v11650) {
          for (var v11651 = v11649 || new v11632(), v11652 = function v11653(v11654) {
              v11651.totalLayer = v11654 + 1, v11651[v11654] = v11648[v11654].columns, v11651.rowColumns = v11651.rowColumns.concat(v11651[v11654].filter(function (v11655) {
                return v11655.rowspan == v11648.length - v11654;
              }));
            }, v11656 = 0; v11656 < v11648.length; v11656++) {
            v11652(v11656);
          }
  
          return v11651;
        }, v11634;
      }(),
      v11657 = v11603(2),
      v11658 = function () {
        function v11660(v11659) {
          this.signature = "HiTresizer", this.hitable = v11659, this.rows = v11659.rows, this.target = v11659.target;
        }
  
        return v11660.prototype.init = function () {
          this.addResizeRowAndColumn(), this.hitable.optionsCoat.options.resizeColumn && this.createColumnGrips(), this.hitable.optionsCoat.options.resizeRow && this.createRowGrips();
        }, v11660.prototype.resizeTableCellWidth = function () {
          v11633.resizeTableCellWeight(this.rows);
        }, v11660.prototype.addResizeRowAndColumn = function () {
        }, v11660.prototype.createColumnGrips = function () {
          var v11661 = this,
            v11662 = this,
            v11663 = [],
            v11664 = $('<div class="columngrips"/>');
          v11664.width(this.target.width()), this.rows.forEach(function (v11665) {
            (v11665.columns || []).filter(function (column) {return column.checked;}).forEach(function (v11666, v11667) {
              if (v11666.getTarget().attr("haswidth")) {
                var v11668 = $('<div class="columngrip"><div class="gripResizer"></div></div>');
                v11664.append(v11668);
                var v11669 = new v11630(v11668);
                v11663.length > 0 && (v11663[v11663.length - 1].nextGrip = v11669), v11663.push(v11669), v11661.syncGrips(v11666, v11669), $(v11668).hidraggable({
                  axis: "h",
                  onDrag: function onDrag(v11670, v11671, v11672) {
                  },
                  moveUnit: "pt",
                  minMove: 1,
                  getScale: function getScale() {
                    return $('.hiprint-printPaper')[0].style.transform && parseFloat($('.hiprint-printPaper')[0].style.transform.slice(6, -1)) || 1;
                  },
                  onBeforeDrag: function onBeforeDrag(v11673) {
                    if (v11657.a.instance.draging = !0, !v11669.nextGrip) return !1;
                    v11662.dragingGrip = v11669, v11662.dragingGrip.left = parseFloat(v11662.dragingGrip.target.css("left").replace("px", "")), v11669.target.addClass("columngripDraging");
                  },
                  onStopDrag: function onStopDrag(v11675) {
                    v11657.a.instance.draging = !1;
                    var v11677 = parseFloat(v11662.dragingGrip.target.css("left").replace("px", "")),
                      v11678 = v11609.a.px.toPt(v11677 - v11662.dragingGrip.left);
                    // 表格列宽限制 最小宽度为10pt
                    if (v11669.cell.width + v11678 < 10) {
                      v11678 = 10 - v11669.cell.width;
                    } else if (v11669.nextGrip.cell.width - v11678 < 10) {
                      v11678 = v11669.nextGrip.cell.width - 10;
                    }
                    v11669.cell.width = v11669.cell.width + v11678, v11669.nextGrip.cell.width = v11669.nextGrip.cell.width - v11678, v11661.resizeTableCellWidth(), v11669.target.removeClass("columngripDraging"), v11662.updateColumnGrips();
                  }
                });
              }
            });
          }), this.target.before(v11664), this.cgripContariner = new v11627(v11664, v11663);
        }, v11660.prototype.updateColumnGrips = function () {
          this.cgripContariner && (this.cgripContariner.target.remove(), this.createColumnGrips());
        }, v11660.prototype.updateRowGrips = function () {
          this.rgripContariner && (this.rgripContariner.target.remove(), this.createRowGrips());
        }, v11660.prototype.createRowGrips = function () {
          var v11680 = this,
            v11681 = this,
            v11682 = [],
            v11683 = $('<div class="rowgrips"/>');
          this.rows.forEach(function (v11684, v11685) {
            var v11686 = $('<div class="rowgrip"><div class="gripResizer"></div></div>');
            v11683.append(v11686);
            var v11687 = new v11630(v11686);
            v11682.push(v11687), v11685 > 0 && v11685 < v11680.rows.length && $(v11686).hidraggable({
              axis: "v",
              onDrag: function onDrag(v11688, v11689, v11690) {
              },
              moveUnit: "pt",
              minMove: 1,
              onBeforeDrag: function onBeforeDrag(v11691) {
                v11681.dragingGrip = v11687, v11681.dragingGrip.top = parseFloat(v11681.dragingGrip.target.css("top").replace("px", "")), v11687.target.addClass("rowgripDraging");
              },
              onStopDrag: function onStopDrag(v11692) {
                var v11693 = parseFloat(v11681.dragingGrip.target.css("top").replace("px", "")),
                  v11694 = v11609.a.px.toPt(v11693 - v11681.dragingGrip.top + v11681.rows[v11685].columns[0].getTarget().height());
                v11681.rows[v11685].columns[0].getTarget().css("height", v11694 + "pt"), v11681.syncRowGrips(), v11687.target.removeClass("rowgripDraging");
              }
            });
          }), this.target.before(v11683), this.rgripContariner = new v11627(v11683, v11682), this.syncRowGrips();
        }, v11660.prototype.syncGrips = function (v11696, v11697) {
          var v11698 = v11696.getTarget();
          v11697.cell = v11696, v11697.target.css({
            left: v11698.offset().left - this.target.offset().left + v11698.outerWidth(!1),
            height: 30
          });
        }, v11660.prototype.syncRowGrips = function () {
          var v11699 = this;
          this.rgripContariner.target.height(this.target.height()), this.rows.forEach(function (v11700, v11701) {
            var v11702 = v11700.columns[0].getTarget();
            v11699.rgripContariner.grips[v11701].target.css({
              top: v11702.offset().top - v11699.target.offset().top + v11702.outerHeight(!1),
              width: 30
            });
          });
        }, v11660.prototype.addResizerHeadRow = function () {
          this.target.find("thead").prepend();
        }, v11660;
      }(),
      v11703 = function () {
        function v11704() {
        }
  
        return v11704.prototype.init = function () {
        }, v11704.prototype.updateRowGrips = function () {
        }, v11704.prototype.updateColumnGrips = function () {
        }, v11704;
      }();
  
    v11603.d(v11602, "a", function () {
      return v11706;
    });
  
    var v11706 = function () {
      function v11710(v11707) {
        this.id = v11626.a.createId(), this.optionsCoat = new v11606(v11707), this.handle = v11707.handle, this.target = v11707.table, this.initRows(v11707.rows), this.init(v11707), this.tableCellSelector = new v11612.a(this.rows, this.target), this.resizer = this.optionsCoat.options.columnResizable ? new v11658(this) : new v11703(), this.resizer.init();
      }
  
      return v11710.prototype.insertRow = function (v11711, v11712, v11713) {
        var v11714 = v11712 || this.tableCellSelector.getSingleSelect(),
          v11715 = v11714.cell,
          v11716 = this.rows[v11714.rowIndex],
          v11717 = v11714.rowIndex,
          v11718 = this.getCellGrid(),
          v11719 = new v11625.a();
        if (v11719.init(this.optionsCoat, void 0, v11716.isHead), v11713 && v11719.getTarget().addClass(v11713), "above" == v11711) v11718[v11717].forEach(function (v11721) {
          var v11722 = v11721.link ? v11721.link : v11721.cell,
            v11723 = v11722.width / v11722.colspan;
  
          if (0 == v11721.columnLevel) {
            var v11724 = v11719.createTableCell();
            v11724.width = v11723, v11719.insertCellToLast(v11724);
          } else {
            if ("column" == v11721.linkType) {
              var v11725 = v11721.link.getTarget();
              v11721.link.rowspan += 1, v11725.attr("rowspan", v11721.link.rowspan);
            }
  
            v11721.linkType;
          }
        }), this.rows.splice(v11717, 0, v11719), v11716.getTarget().before(v11719.getTarget()), v11609.a.event.trigger("newRow" + this.id, v11719);else {
          var v11727 = v11717 + v11715.rowspan - 1;
          v11718[v11727].forEach(function (v11728) {
            var v11729 = v11728.link ? v11728.link : v11728.cell,
              v11730 = v11729.width / v11729.colspan;
  
            if (v11728.bottom) {
              var v11731 = v11719.createTableCell();
              v11731.width = v11730, v11719.insertCellToLast(v11731);
            } else {
              if (v11728.cell) {
                var v11732 = v11728.cell.getTarget();
                v11728.cell.rowspan += 1, v11732.attr("rowspan", v11728.cell.rowspan);
              }
  
              if ("column" == v11728.linkType) {
                v11732 = v11728.link.getTarget();
                v11728.link.rowspan += 1, v11732.attr("rowspan", v11728.link.rowspan);
              }
            }
          }), this.rows.splice(v11727 + 1, 0, v11719), this.rows[v11727].getTarget().after(v11719.getTarget()), v11609.a.event.trigger("newRow" + this.id, v11719);
        }
      }, v11710.prototype.insertColumn = function (v11734, v11735, v11736, v11737) {
        var v11738 = this,
          v11739 = this.rows.concat(this.trRows),
          v11740 = v11735 || this.tableCellSelector.getSingleSelect(),
          v11741 = v11740.cell,
          v11742 = v11740.rowIndex,
          v11743 = this.getCellGrid(v11739),
          v11744 = v11743[v11742].filter(function (v11745) {
            return v11745.cell && v11745.cell.id == v11741.id || v11745.link && v11745.link.id == v11741.id;
          });
  
        if ("left" == v11734) {
          var v11746 = v11744[0].indexInTableGridRow;
          v11743.forEach(function (v11747, v11748) {
            var v11749 = v11747[v11746],
              v11750 = v11747.filter(function (v11751, v11752) {
                return v11752 >= v11746 && v11751.cell;
              });
  
            if (0 == v11749.rowLevel) {
              var v11753 = v11739[v11748],
                v11754 = v11739[v11748].createTableCell();
              v11736 && v11754.getTarget().addClass(v11736), null != v11737 && (v11754.width = v11737), v11750.length ? v11753.insertToTargetCellLeft(v11750[0].cell, v11754) : v11753.insertCellToLast(v11754), v11609.a.event.trigger("newCell" + v11738.id, v11754);
            } else if ("row" == v11749.linkType) {
              var v11756 = v11749.link.getTarget();
              v11749.link.colspan += 1, v11756.attr("colspan", v11749.link.colspan);
            }
          });
        } else {
          var v11757 = v11744[v11744.length - 1].indexInTableGridRow;
          v11743.forEach(function (v11758, v11759) {
            var v11760 = v11758[v11757],
              v11761 = v11758.filter(function (v11762, v11763) {
                return v11763 <= v11757 && v11762.cell;
              });
  
            if (v11760.rightMost) {
              var v11764 = v11739[v11759],
                v11765 = v11764.createTableCell();
              v11736 && v11765.getTarget().addClass(v11736), null != v11737 && (v11765.width = v11737), v11761.length ? v11764.insertToTargetCellRight(v11761[v11761.length - 1].cell, v11765) : v11764.insertCellToFirst(v11765), v11609.a.event.trigger("newCell" + v11738.id, v11765);
            } else {
              var v11767 = v11760.link || v11760.cell;
  
              if ("row" == v11760.linkType) {
                var v11768 = v11767.getTarget();
                v11767.colspan += 1, v11768.attr("colspan", v11767.colspan);
              }
  
              if (v11760.cell) {
                v11768 = v11767.getTarget();
                v11767.colspan += 1, v11768.attr("colspan", v11767.colspan);
              }
            }
          });
        }
      }, v11710.prototype.deleteRow = function () {
        var v11769 = this,
          v11770 = this.tableCellSelector.getSingleSelect(),
          v11771 = (v11770.cell, this.rows[v11770.rowIndex], v11770.rowIndex),
          v11772 = this.getCellGrid(),
          v11773 = this.rows[v11771];
        v11772[v11771].forEach(function (v11774, v11775) {
          if (v11774.cell) {
            if (1 == v11774.cell.rowspan) v11773.removeCell(v11774.cell);else {
              v11773.removeCell(v11774.cell);
              var v11776 = v11772[v11771 + 1].filter(function (v11777, v11778) {
                  return v11777.cell && v11778 > v11775;
                }),
                v11779 = v11769.rows[v11771 + 1],
                v11780 = v11779.createTableCell(v11774.cell.rowspan - 1, v11774.cell.colspan);
              v11776.length ? v11779.insertToTargetCellLeft(v11776[0].cell, v11780) : v11779.insertCellToLast(v11780);
            }
          } else if ("column" == v11774.linkType) {
            var v11781 = v11774.link;
            v11781.rowspan -= 1, v11781.getTarget().attr("rowspan", v11781.rowspan);
          }
        }), v11773.getTarget().remove(), this.rows.splice(v11771, 1);
      }, v11710.prototype.deleteColums = function () {
        var v11782 = this.rows.concat(this.trRows),
          v11783 = this.tableCellSelector.getSingleSelect(),
          v11784 = v11783.cell,
          v11785 = v11783.rowIndex,
          v11786 = this.getCellGrid(v11782),
          v11787 = v11786[v11785].filter(function (v11788) {
            return v11788.cell && v11788.cell.id == v11784.id || v11788.link && v11788.link.id == v11784.id;
          })[0].indexInTableGridRow;
        v11786.forEach(function (v11789, v11790) {
          var v11791 = v11789[v11787];
          v11791.cell ? 1 == v11791.cell.colspan ? v11782[v11790].removeCell(v11791.cell) : (v11791.cell.colspan -= 1, v11791.cell.getTarget().attr("colspan", v11791.cell.colspan)) : "row" == v11791.linkType && (v11791.link.colspan -= 1, v11791.link.getTarget().attr("colspan", v11791.link.colspan));
        });
      }, v11710.prototype.mergeCell = function () {
        var v11792 = this,
          v11793 = this.tableCellSelector.getSelectedCells();
  
        if (0 != v11793.length) {
          var v11794 = v11793[0][0].cell;
          v11793.forEach(function (v11795, v11796) {
            v11795.forEach(function (v11797, v11798) {
              0 == v11796 ? 0 != v11798 && (v11794.colspan += v11797.cell.colspan, v11792.rows[v11797.rowIndex].removeCell(v11797.cell)) : v11792.rows[v11797.rowIndex].removeCell(v11797.cell), 0 == v11798 && v11793[0][0].rowIndex + v11794.rowspan - 1 < v11797.rowIndex && (v11794.rowspan += v11797.cell.rowspan);
            });
          }), v11794.getTarget().attr("colspan", v11794.colspan), v11794.getTarget().attr("rowspan", v11794.rowspan), this.tableCellSelector.setSingleSelect(v11793[0][0]);
        }
      }, v11710.prototype.splitCell = function () {
        var v11799 = this.tableCellSelector.getSingleSelect(),
          v11800 = this.getCellGrid(),
          v11801 = v11613.getIndex(v11800[v11799.rowIndex], v11799.cell.id);
  
        if (v11799) {
          for (var v11802 = v11799.rowIndex; v11802 < v11799.rowIndex + v11799.cell.rowspan; v11802++) {
            for (var v11803 = this.rows[v11802], v11804 = v11802 == v11799.rowIndex ? v11799.cell : v11613.getLeftTableCell(v11800[v11802], v11801), v11805 = 0; v11805 < v11799.cell.colspan; v11805++) {
              v11802 == v11799.rowIndex && 0 == v11805 || (v11804 ? v11803.insertToTargetCellRight(v11804, v11803.createTableCell()) : v11803.insertCellToFirst(v11803.createTableCell()));
            }
          }
  
          v11799.cell.rowspan = 1, v11799.cell.colspan = 1, v11799.cell.getTarget().attr("colspan", v11799.cell.colspan), v11799.cell.getTarget().attr("rowspan", v11799.cell.rowspan);
        }
      }, v11710.prototype.init = function (v11806) {
        var v11807 = this;
        $(this.target).addClass("hitable"), this.optionsCoat.onBeforEdit = function (v11808) {
          if (v11807.optionsCoat.options.onBeforEdit && !1 === v11806.onBeforEdit(v11808)) return !1;
          return v11807.optionsCoat.editingCell && v11807.optionsCoat.editingCell.endEdit(), !0;
        }, $(this.target).mousedown(function (v11809) {
          v11807.optionsCoat.isLeftMouseButtonDown = !0;
        }), $(this.target).mouseup(function (v11810) {
          v11807.optionsCoat.isLeftMouseButtonDown = !1;
        }), this.initContext(), this.target.on("mousemove", function (v11811) {
          1 === v11811.buttons && v11807.tableCellSelector.multipleSelectByXY(v11811.pageX, v11811.pageY);
        }).on("mousedown", function (v11812) {
          1 === v11812.buttons && v11807.tableCellSelector.singleSelectByXY(v11812.pageX, v11812.pageY);
        });
      }, v11710.prototype.initRows = function (v11813) {
        var v11814 = this;
  
        if (this.trRows = [], v11813) {
          this.rows = v11813, v11813.forEach(function (v11815, v11816) {
            v11815.init(v11814.optionsCoat, v11814.target.find("tr:eq(" + v11816 + ")"), !0);
          });
          var v11817 = this.optionsCoat.options.trs;
          v11817 && this.initRowsByTrs(v11817).forEach(function (v11818) {
            v11814.trRows.push(v11818);
          });
        } else this.rows = this.initRowsByTrs(this.target.find("tr"));
      }, v11710.prototype.initRowsByTrs = function (v11819) {
        var v11820 = this;
        return v11819.map(function (v11821, v11822) {
          var v11823 = new v11625.a();
          return v11823.init(v11820.optionsCoat, $(v11822)), v11823;
        }).get();
      }, v11710.prototype.enableEidt = function () {
        this.optionsCoat.enableEidt();
      }, v11710.prototype.disableEdit = function () {
        this.optionsCoat.disableEdit();
      }, v11710.prototype.getCellGrid = function (v11825) {
        var v11826 = v11825 || this.rows,
          v11827 = this.getColumnStep(),
          v11828 = new Array();
        return v11826.forEach(function (v11829, v11830) {
          v11829.columns.forEach(function (v11831, v11832) {
            for (var v11833 = 0; v11833 < v11831.colspan; v11833++) {
              for (var v11834 = 0, v11835 = !1; v11834 < v11827 && !v11835;) {
                if (v11828[v11830] = v11828[v11830] || [], v11828[v11830][v11834]) ;else {
                  v11828[v11830][v11834] = new v11610({
                    cell: 0 == v11833 ? v11831 : void 0,
                    link: 0 != v11833 ? v11831 : void 0,
                    linkType: v11833 > 0 ? "row" : void 0,
                    rightMost: v11833 == v11831.colspan - 1 || void 0,
                    bottom: 0 == v11831.rowspan - 1,
                    rowLevel: v11833,
                    columnLevel: 0,
                    indexInTableGridRow: v11834,
                    indexInTableGridColumn: v11830
                  });
  
                  for (var v11836 = v11830 + 1, v11837 = 1; v11837 < v11831.rowspan; v11837++) {
                    v11828[v11836] = v11828[v11836] || [], v11828[v11836][v11834] = new v11610({
                      cell: void 0,
                      link: v11831,
                      linkType: v11833 > 0 ? "rowColumn" : "column",
                      rightMost: v11833 == v11831.colspan - 1 || void 0,
                      bottom: v11837 == v11831.rowspan - 1,
                      rowLevel: v11833,
                      columnLevel: v11837,
                      indexInTableGridRow: v11834,
                      indexInTableGridColumn: v11836
                    }), v11836 += 1;
                  }
  
                  v11835 = !0;
                }
                v11834++;
              }
            }
          });
        }), v11828;
      }, v11710.prototype.setAlign = function (v11838) {
        var v11839 = this.tableCellSelector.getSingleSelect();
        v11839 && v11839.cell.setAlign(v11838);
      }, v11710.prototype.setVAlign = function (v11840) {
        var v11841 = this.tableCellSelector.getSingleSelect();
        v11841 && v11841.cell.setVAlign(v11840);
      }, v11710.prototype.getColumnStep = function (v11842) {
        var v11843 = 0;
        return this.rows.length && this.rows[v11842 || 0].columns.forEach(function (v11844) {
          v11843 += v11844.colspan;
        }), v11843;
      }, v11710.prototype.initContext = function () {
        var v11845 = this;
        if (!this.optionsCoat.options.isEnableContextMenu) return !1;
        $(this.handle).hicontextMenu({
          menus: [{
            text: `${i18n.__('在上方插入行')}`,
            enabled: this.optionsCoat.options.isEnableInsertRow,
            disable: function disable() {
              return !v11845.tableCellSelector.getSingleSelect();
            },
            callback: function callback() {
              v11845.insertRow("above"), v11845.resizer.updateRowGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('在下方插入行')}`,
            borderBottom: !0,
            enabled: this.optionsCoat.options.isEnableInsertRow,
            disable: function disable() {
              return !v11845.tableCellSelector.getSingleSelect();
            },
            callback: function callback() {
              v11845.insertRow("below"), v11845.resizer.updateRowGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('向左方插入列')}`,
            enabled: this.optionsCoat.options.isEnableInsertColumn,
            disable: function disable() {
              return !v11845.tableCellSelector.getSingleSelect();
            },
            callback: function callback() {
              v11845.insertColumn("left"), v11845.resizer.updateColumnGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('向右方插入列')}`,
            enabled: this.optionsCoat.options.isEnableInsertColumn,
            disable: function disable() {
              return !v11845.tableCellSelector.getSingleSelect();
            },
            borderBottom: !0,
            callback: function callback() {
              v11845.insertColumn("right"), v11845.resizer.updateColumnGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('删除行')}`,
            enabled: this.optionsCoat.options.isEnableDeleteRow,
            disable: function disable() {
              return !v11845.tableCellSelector.getSingleSelect() || v11845.rows.length <= 1;
            },
            callback: function callback() {
              v11845.deleteRow(), v11845.resizer.updateRowGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('删除列')}`,
            borderBottom: !0,
            enabled: this.optionsCoat.options.isEnableDeleteColumn,
            disable: function disable() {
              return !v11845.tableCellSelector.getSingleSelect() || v11845.rows.length > 0 && v11845.rows[0].columns.length <= 1;
            },
            callback: function callback() {
              v11845.deleteColums(), v11845.resizer.updateColumnGrips(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('对齐')}`,
            borderBottom: !0,
            enabled: this.optionsCoat.options.columnAlignEditable,
            menus: [{
              text: `${i18n.__('左')}`,
              callback: function callback() {
                v11845.setAlign("left");
              }
            }, {
              text: `${i18n.__('左右居中')}`,
              callback: function callback() {
                v11845.setAlign("center");
              }
            }, {
              text: `${i18n.__('右')}`,
              callback: function callback() {
                v11845.setAlign("right");
              }
            }, {
              text: `${i18n.__('默认')}`,
              borderBottom: !0,
              callback: function callback() {
                v11845.setAlign("");
              }
            }, {
              text: `${i18n.__('上')}`,
              callback: function callback() {
                v11845.setVAlign("top");
              }
            }, {
              text: `${i18n.__('垂直居中')}`,
              callback: function callback() {
                v11845.setVAlign("middle");
              }
            }, {
              text: `${i18n.__('下')}`,
              callback: function callback() {
                v11845.setVAlign("bottom");
              }
            }, {
              text: `${i18n.__('默认')}`,
              callback: function callback() {
                v11845.setVAlign("");
              }
            }]
          }, {
            text: `${i18n.__('合并单元格')}`,
            enabled: this.optionsCoat.options.isEnableMergeCell,
            disable: function disable() {
              return v11845.tableCellSelector.getSingleSelect();
            },
            callback: function callback() {
              v11845.mergeCell(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }, {
            text: `${i18n.__('解开单元格')}`,
            enabled: this.optionsCoat.options.isEnableMergeCell,
            disable: function disable() {
              var v11853 = v11845.tableCellSelector.getSingleSelect();
              return !v11853 || 1 == v11853.cell.rowspan && 1 == v11853.cell.colspan;
            },
            callback: function callback() {
              v11845.splitCell(), v11609.a.event.trigger("updateTable" + v11845.id);
            }
          }].filter(function (v11855) {
            return v11855.enabled;
          })
        });
      }, v11710.prototype.getTableWidth = function () {
        return v11609.a.px.toPt(this.target.outerWidth(!1));
      }, v11710.prototype.updateColumnGrips = function () {
        this.resizer.updateColumnGrips();
      }, v11710.prototype.updateRowGrips = function () {
        this.resizer.updateRowGrips();
      }, v11710;
    }();
  }