"use strict";

/**
 * import 相关资源
 */
import {i18n,$,_instanceof} from "../hiprint.comm.js";

export default function (v10434, v10435, v10436) {
    "use strict";
  
    var v10437 = function () {
        function v10438() {
        }
  
        return v10438.prototype.init = function (v10439) {
          this.target = $('<input type="text" class="hitable-editor-text" value="" />'), v10439.getTarget().append(this.target), this.target.focus();
        }, v10438.prototype.getValue = function () {
          return this.target.val();
        }, v10438.prototype.setValue = function (v10440) {
          this.target.val(v10440);
        }, v10438.prototype.destroy = function () {
          this.target.remove();
        }, v10438;
      }(),
      v10441 = function () {
        function v10442() {
          this.text = new v10437();
        }
  
        return Object.defineProperty(v10442, "Instance", {
          get: function get() {
            return v10442._instance || (v10442._instance = new v10442()), v10442._instance;
          },
          enumerable: !0,
          configurable: !0
        }), v10442;
      }(),
      i2 = function () {
        function v10443() {
        }
        // 表格头双击字段选择
        return v10443.prototype.init = function (v10444, v10445) {
          var v10446 = `<select class="auto-submit" style="width:100%">\n                <option value="" disabled>${i18n.__('请选择字段')}</option>`;
          v10444.forEach(function (v10447, v10448) {
            if (v10447.field == v10445.field) {
              v10446 += ' <option value="' + (v10447.field || "") + '" selected >' + (v10447.text || "") + "</option>";
            } else {
              v10446 += ' <option value="' + (v10447.field || "") + '" >' + (v10447.text || "") + "</option>";
            }
          }), v10446 += " </select>";
          this.target = $(v10446), v10445.getTarget().append(this.target), this.target.focus();
        }, v10443.prototype.getValue = function () {
          var val = this.target.val();
          var text = this.target.find('option[value="' + val + '"]').text();
          return text + '#' + val;
        }, v10443.prototype.setValue = function (v10449) {
          v10449 && (this.target.find('option[value="' + v10449 + '"]').length || this.target.find("select").prepend('<option value="' + v10449 + '" >' + v10449 + "</option>"));
          this.target.find("select").val(v10449);
        }, v10443.prototype.destroy = function () {
          this.target.remove();
        }, v10443;
      }(),
      o2 = function () {
        function v10450() {
          this.select = new i2();
        }
  
        return Object.defineProperty(v10450, "Instance", {
          get: function get() {
            return v10450._instance || (v10450._instance = new v10450()), v10450._instance;
          },
          enumerable: !0,
          configurable: !0
        }), v10450;
      }(),
      v10451 = function () {
        function v10452() {
        }
  
        return Object.defineProperty(v10452, "Instance", {
          get: function get() {
            return v10441._instance || (v10452._instance = new v10452()), v10452._instance;
          },
          enumerable: !0,
          configurable: !0
        }), v10452.prototype.createEditor = function (v10453) {
          return $.extend({}, v10441.Instance[v10453]);
        }, v10452.prototype.createSelect = function (v10454) {
          return $.extend({}, o2.Instance[v10454]);
        }, v10452;
      }(),
      v10455 = v10436(10),
      v10456 = v10436(14),
      v10457 = v10436(11),
      v10458 = function () {
        function v10459() {
        }
  
        return v10459.prototype.init = function (v10460, v10461) {
          var v10462 = this;
          this.tableOptions = v10461, this.title = v10460.title, this.field = v10460.field, v10460.getTarget().unbind("dblclick.hitable").bind("dblclick.hitable", function () {
            v10460.isEditing = !0, v10462.beginEdit(v10460);
          });
        }, v10459.prototype.getDisplayHtml = function () {
          return this.title;
        }, v10459.prototype.beginEdit = function (v10463) {
          var v10464 = this;
          if (v10464.tableOptions.options.fields && v10464.tableOptions.options.fields.length) {
            this.editor = v10451.Instance.createSelect("select"), v10463.getTarget().html(""), this.editor.init(v10464.tableOptions.options.fields, v10463), this.editor.setValue(this.field || ""), $(this.editor.target).keydown(function (v10465) {
              13 == v10465.keyCode && v10464.endEdit(v10463);
            }), $(this.editor.target).change(function (v10466) {
              v10464.endEdit(v10463);
            }), $(this.editor.target).blur(function (v10467) {
              v10464.endEdit(v10463);
            });
          } else {
            this.editor = v10451.Instance.createEditor("text"), v10463.getTarget().html(""), this.editor.init(v10463), (this.title || this.field) && (this.tableOptions.options.isEnableEditField ? this.editor.setValue((this.title || "") + "#" + (this.field || "")) : this.editor.setValue(this.title || "")), $(this.editor.target).keydown(function (v10468) {
              13 == v10468.keyCode && v10464.endEdit(v10463);
            }), $(this.editor.target).blur(function (v10469) {
              v10464.endEdit(v10463);
            }), this.tableOptions.editingCell && this.tableOptions.editingCell.id != v10463.id && this.tableOptions.editingCell.innerElement.endEdit(this.tableOptions.editingCell), this.tableOptions.editingCell = v10463;
          }
        }, v10459.prototype.endEdit = function (v10470) {
          v10470.isEditing = 0;
          var v10471 = this.editor.getValue();
          if (v10471) {
            if (this.tableOptions.options.isEnableEditField || this.tableOptions.options.fields) {
              var v10472 = v10471.split("#");
              v10470.title = this.title = v10472[0], v10472.length > 0 && (v10470.columnId = v10470.field = this.field = v10472[1]);
              v10470.id && v10470.target.attr("id", v10470.id), v10470.columnId && v10470.target.attr("column-id", v10470.columnId);
              hinnn.event.trigger("hiprintTemplateDataChanged_" + this.tableOptions.options.templateId, "调整表格列字段");
            } else v10470.title = this.title = v10471;
          } else this.tableOptions.options.isEnableEditField ? (v10470.title = this.title = "", v10470.field = this.field = "") : v10470.title = this.title = "";
          this.editor.destroy(), v10470.getTarget().html(this.title);
        }, v10459;
      }(),
      v10473 = function () {
        return function (v10474) {
          this.title = v10474.title, this.field = v10474.field, this.width = v10474.width, this.align = v10474.align, this.halign = v10474.halign, this.vAlign = v10474.vAlign, this.colspan = v10474.colspan, this.rowspan = v10474.rowspan, this.checked = v10474.checked, this.columnId = v10474.columnId, this.tableSummaryTitle = v10474.tableSummaryTitle, this.tableSummaryText = v10474.tableSummaryText, this.tableSummaryColspan = v10474.tableSummaryColspan, this.tableSummary = v10474.tableSummary, this.tableSummaryAlign = v10474.tableSummaryAlign, this.tableSummaryNumFormat = v10474.tableSummaryNumFormat, this.tableSummaryFormatter = v10474.tableSummaryFormatter, this.showCodeTitle = v10474.showCodeTitle, this.upperCase = v10474.upperCase, this.renderFormatter = v10474.renderFormatter && v10474.renderFormatter.toString(), this.formatter2 = v10474.formatter2 && v10474.formatter2.toString(), this.styler2 = v10474.styler2 && v10474.styler2.toString(), this.stylerHeader = v10474.stylerHeader && v10474.stylerHeader.toString(), this.tableColumnHeight = v10474.tableColumnHeight, this.tableTextType = v10474.tableTextType, this.tableBarcodeMode = v10474.tableBarcodeMode, this.tableQRCodeLevel = v10474.tableQRCodeLevel;
        };
      }(),
      v10475 = function () {
        function v10476() {
          this.id = v10457.a.createId();
        }
  
        return v10476.prototype.init = function (v10478, v10479, v10480, v10481) {
          this.isHead = v10481, this.rowId = v10480, this.isEditing = !1;
          var v10482 = /^[0-9]*$/;
          this.target = v10478, this.tableOptions = v10479;
          var v10483 = this.target.attr("colspan");
          this.colspan = v10482.test(v10483) ? parseInt(v10483) : 1;
          var v10484 = this.target.attr("rowspan");
          this.rowspan = v10482.test(v10484) ? parseInt(v10484) : 1, this.initEvent(), this.isHead && this.initInnerEelement();
        }, v10476.prototype.beginEdit = function () {
          if (!this.isEditing && this.tableOptions.isEnableEdit && this.tableOptions.onBeforEdit(this)) {
            var v10485 = this.getValue();
            this.editor = v10451.Instance.createEditor("text"), this.isEditing = !0, this.tableOptions.editingCell = this, this.target.html(""), this.editor.init(this), this.editor.setValue(v10485);
          }
        }, v10476.prototype.endEdit = function () {
          this.isEditing = !1;
          var v10486 = this.editor.getValue();
          this.editor.destroy(), this.target.html(v10486);
        }, v10476.prototype.getTarget = function () {
          return this.target;
        }, v10476.prototype.getValue = function () {
          return this.target.html();
        }, v10476.prototype.setValue = function (v10487) {
        }, v10476.prototype.initInnerEelement = function () {
          this.innerElement = new v10458(), this.innerElement.init(this, this.tableOptions);
        }, v10476.prototype.initEvent = function () {
        }, v10476.prototype.isXYinCell = function (v10488, v10489) {
          var v10490 = new v10455.b({
            x: v10488,
            y: v10489,
            height: 0,
            width: 0
          });
          return this.isOverlap(v10490);
        }, v10476.prototype.getTableRect = function () {
          return new v10455.b({
            x: this.target.offset().left,
            y: this.target.offset().top,
            height: this.target[0].offsetHeight,
            width: this.target[0].offsetWidth
          });
        }, v10476.prototype.isOverlap = function (v10497) {
          var v10498 = this.getTableRect();
          return v10497.x + v10497.width > v10498.x && v10498.x + v10498.width > v10497.x && v10497.y + v10497.height > v10498.y && v10498.y + v10498.height > v10497.y;
        }, v10476.prototype.isInRect = function (v10507) {
          var v10508 = v10507.rect,
            v10509 = this.getTableRect();
  
          // if (e.x + e.width > n.x && n.x + n.width > e.x && e.y + e.height > n.y && n.y + n.height > e.y) {
          if (v10509.x >= v10508.x && v10509.x + v10509.width <= v10508.x + v10508.width && v10509.y >= v10508.y && v10509.y + v10509.height <= v10508.y + v10508.height) {
            var v10518 = v10456.a.mergeRect(v10508, v10509);
            return JSON.stringify(v10508) == JSON.stringify(v10518) || (v10507.changed = !0, v10507.rect = v10518, !0);
          }
  
          return !1;
        }, v10476.prototype.isSelected = function () {
          return this.target.hasClass("selected");
        }, v10476.prototype.select = function () {
          this.target.addClass("selected");
        }, v10476.prototype.isHeader = function () {
          return !1;
        }, v10476.prototype.setAlign = function (v10520) {
          this.align = v10520, v10520 ? this.target.css("text-align", v10520) : this.target[0].style.textAlign = "";
        }, v10476.prototype.setVAlign = function (v10521) {
          this.vAlign = v10521, v10521 ? this.target.css("vertical-align", v10521) : this.target[0].style.verticalAlign = "";
        }, v10476.prototype.getEntity = function () {
          return new v10473(this);
        }, v10476;
      }();
  
    v10436.d(v10435, "a", function () {
      return v10523;
    });
  
    var _c,
      v10524 = (_c = function v10525(v10526, v10527) {
        return (_c = Object.setPrototypeOf || _instanceof({
          __proto__: []
        }, Array) && function (v10528, v10529) {
          v10528.__proto__ = v10529;
        } || function (v10530, v10531) {
          for (var v10532 in v10531) {
            v10531.hasOwnProperty(v10532) && (v10530[v10532] = v10531[v10532]);
          }
        })(v10526, v10527);
      }, function (v10533, v10534) {
        function v10535() {
          this.constructor = v10533;
        }
  
        _c(v10533, v10534), v10533.prototype = null === v10534 ? Object.create(v10534) : (v10535.prototype = v10534.prototype, new v10535());
      }),
      v10523 = function (v10536) {
        function v10539(v10537) {
          var v10538 = this;
          return v10537 = v10537 || {}, (v10538 = v10536.call(this) || this).width = v10537.width ? parseFloat(v10537.width.toString()) : 100, v10538.title = v10537.title, v10538.descTitle = v10537.descTitle, v10538.field = v10537.field, v10538.fixed = v10537.fixed, v10538.rowspan = v10537.rowspan ? parseInt(v10537.rowspan) : 1, v10538.colspan = v10537.colspan ? parseInt(v10537.colspan) : 1, v10538.align = v10537.align, v10538.halign = v10537.halign, v10538.vAlign = v10537.vAlign, v10538.formatter = v10537.formatter, v10538.styler = v10537.styler, v10538.renderFormatter = v10537.renderFormatter, v10538.formatter2 = v10537.formatter2, v10538.styler2 = v10537.styler2, v10538.stylerHeader = v10537.stylerHeader, v10538.checkbox = v10537.checkbox, v10538.checked = 0 != v10537.checked, v10538.columnId = v10537.columnId || v10537.field, v10538.tableColumnHeight = v10537.tableColumnHeight, v10538.tableTextType = v10537.tableTextType, v10538.tableBarcodeMode = v10537.tableBarcodeMode, v10538.tableQRCodeLevel = v10537.tableQRCodeLevel, v10538.tableSummaryTitle = v10537.tableSummaryTitle, v10538.tableSummaryText = v10537.tableSummaryText, v10538.tableSummaryColspan = v10537.tableSummaryColspan, v10538.tableSummary = v10537.tableSummary, v10538.tableSummaryAlign = v10537.tableSummaryAlign, v10538.tableSummaryNumFormat = v10537.tableSummaryNumFormat, v10538.tableSummaryFormatter = v10537.tableSummaryFormatter,
          v10538.showCodeTitle = v10537.showCodeTitle, v10538.upperCase = v10537.upperCase, v10538;
        }
  
        return v10524(v10539, v10536), v10539.prototype.css = function (v10540) {
        }, v10539;
      }(v10475);
  }