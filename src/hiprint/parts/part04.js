"use strict";

/**
 * import 相关资源
 */
import {$,_typeof} from "../hiprint.comm.js";

export default  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
  
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return BasePrintElement;
    });
  
    var _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17),
      _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1),
      _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9),
      _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6),
      _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
      _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8),
      _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2),
      BasePrintElement = function () {
        function BasePrintElement(v10205) {
          this.printElementType = v10205, this.id = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.guid();
        }
  
        return BasePrintElement.prototype.getConfigOptionsByName = function (v10207) {
          return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance[v10207];
        }, BasePrintElement.prototype.getProxyTarget = function (v10209) {
          v10209 && this.SetProxyTargetOption(v10209);
          var v10210 = this.getData(),
            v10211 = this.createTarget(this.getTitle(), v10210);
          return this.updateTargetSize(v10211), this.css(v10211, v10210), v10211;
        }, BasePrintElement.prototype.SetProxyTargetOption = function (v10212) {
          this.options.getPrintElementOptionEntity();
          $.extend(this.options, v10212);
          this.copyFromType();
        }, BasePrintElement.prototype.showInPage = function (v10213, v10214) {
          var v10215 = this.options.showInPage,
            v10216 = this.options.unShowInPage;
  
          if (v10215) {
            if ("first" == v10215) return 0 == v10213;
            if (v10213 == v10214 - 1 && "last" == v10216) return !1;
            if ("odd" == v10215) return (0 != v10213 || "first" != v10216) && v10213 % 2 == 0;
            if ("even" == v10215) return v10213 % 2 == 1;
            if ("last" == v10215) return v10213 == v10214 - 1;
          }
  
          return (0 != v10213 || "first" != v10216) && (v10213 != v10214 - 1 || "last" != v10216);
        }, BasePrintElement.prototype.setTemplateId = function (v10217) {
          this.templateId = v10217;
        }, BasePrintElement.prototype.setPanel = function (v10218) {
          this.panel = v10218;
        }, BasePrintElement.prototype.getField = function () {
          return this.options.field || this.printElementType.field;
        }, BasePrintElement.prototype.getTitle = function () {
          return this.printElementType.title;
        }, BasePrintElement.prototype.updateSizeAndPositionOptions = function (v10219, v10220, v10221, v10222) {
          const template = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId);
          if (this.panel !== void 0 && !template.willOutOfBounds) {
            const panelWidthPt = hinnn.mm.toPt(this.panel.width);
            const panelHeightPt = hinnn.mm.toPt(this.panel.height);
            if (v10219 < 0) {
              return;
            }
            if (v10220 < 0) {
              return;
            }
            if (v10219 + this.options.width > panelWidthPt) {
              return;
            }
            if (v10220 + this.options.height > panelHeightPt) {
              return;
            }
          }
          this.options.setLeft(v10219), this.options.setTop(v10220), this.options.copyDesignTopFromTop(), this.options.setWidth(v10221), this.options.setHeight(v10222);
        }, BasePrintElement.prototype.initSizeByHtml = function (v10224) {
          if (v10224 && v10224.length) {
            this.createTempContainer();
            var v10225 = v10224.clone();
            this.getTempContainer().append(v10225), this.options.initSizeByHtml(parseInt(hinnn.px.toPt(v10225.width()).toString()), parseInt(hinnn.px.toPt(v10225.height()).toString())), this.removeTempContainer();
          }
        }, BasePrintElement.prototype.updateTargetSize = function (v10226) {
          v10226.css("width", this.options.displayWidth()), v10226.css("height", this.options.displayHeight());
        }, BasePrintElement.prototype.updateTargetWidth = function (v10227) {
          v10227.css("width", this.options.displayWidth());
        }, BasePrintElement.prototype.getDesignTarget = function (v10228) {
          var v10229 = this,lastTimeStamp = 0;
          return this.designTarget = this.getHtml(v10228)[0].target, this.designPaper = v10228, this.designTarget.click(function (ev) {
            if (ev.timeStamp - lastTimeStamp > 500) {
              hinnn.event.trigger(v10229.getPrintElementSelectEventKey(), {
                printElement: v10229
              });
            }
            lastTimeStamp = ev.timeStamp;
          }), this.designTarget.dblclick(function (ev) {
            var v10230 = v10229.designTarget.find(".hiprint-printElement-content");
            if (v10230) {
              var v10231 = v10229.designTarget.find(".resize-panel");
              if (v10229.printElementType.type == "text" && !(v10229.options.textType && "text" != v10229.options.textType)) {
                v10229._editing = true;
                v10229.designTarget.hidraggable('update', { draggable: false });
                v10230.css("cursor", "text"), v10230.addClass("editing");
                v10229.designTarget.addClass("editing");
                v10230.click(function (ev) {
                  if (v10229._editing) {
                    ev.stopPropagation();
                  }
                });
                v10230.attr("contenteditable", true), v10231 && v10231.css("display", "none");
                v10229.selectEnd(v10230);
              }
            }
          }), this.designTarget;
        }, BasePrintElement.prototype.selectEnd = function (el) {
          el.focus();
          if (typeof window.getSelection != "undefined" &&
          typeof document.createRange != "undefined") {
            var v10232 = document.createRange();
            v10232.selectNodeContents(el[0]);
            v10232.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(v10232);
          } else if (typeof document.body.createTextRange != "undefined") {
            var v10232 = document.body.createTextRange();
            v10232.moveToElementText(el[0]), v10232.collapse(false), v10232.select();
          }
        }, BasePrintElement.prototype.updateByContent = function (clear) {
          var v10233 = this,v10234 = v10233.designTarget.find(".hiprint-printElement-content");
          if (v10233._editing) {
            v10234 && v10234.css("cursor", "") && v10234.removeClass("editing") && v10234.removeAttr("contenteditable");
            v10233.designTarget.removeClass("editing");
            var v10235 = v10234.text(),title = v10233.options.title;
            if (v10235.startsWith(title) && v10233.options.field) {
              if (v10235.length > title.length) {
                v10233.options.testData = v10235.split("：")[1];
              } else {
                v10233.options.title = v10235;
                v10233.options.testData = "";
              }
            } else {
              v10233.options.title = v10235;
            }
            v10233.options.title = v10233.options.title.split("：")[0];
            if (!clear) {
              hinnn.event.trigger(v10233.getPrintElementSelectEventKey(), {
                printElement: v10233
              });
            }
            v10233.updateDesignViewFromOptions(), hinnn.event.trigger("hiprintTemplateDataChanged_" + v10233.templateId, "编辑修改");
            v10233._editing = false;
            var draggable = v10233.options.draggable == undefined || true == v10233.options.draggable;
            v10233.designTarget.hidraggable('update', { draggable: draggable });
          }
        }, BasePrintElement.prototype.getPrintElementSelectEventKey = function () {
          return "PrintElementSelectEventKey_" + this.templateId;
        }, BasePrintElement.prototype.design = function (v10236, v10237) {
          var v10238 = this;
          this.designTarget.hidraggable({
            // 添加 draggable 属性
            draggable: v10238.options.draggable,
            axis: v10238.options.axis ? v10238.options.axis : void 0,
            designTarget: v10238,
            onDrag: function onDrag(v10239, v10240, v10241) {
              // 处理按住 ctrl / command 多选元素
              var els = v10238.panel.printElements.filter(function (v10242) {
                return 'block' == v10242.designTarget.children().last().css('display') &&
                v10242.designTarget.children().last().hasClass('selected') && !v10242.printElementType.type.includes('table');
              });
              var isMultiple = els.length > 1;
              var notSelected = !v10238.designTarget.children().last().hasClass('selected');
              if (isMultiple) {
                var left = v10240 - v10238.options.left,top = v10241 - v10238.options.top;
                els.forEach(function (v10243) {
                  v10243.updateSizeAndPositionOptions(left + v10243.options.getLeft(), top + v10243.options.getTop()),
                  v10243.designTarget.css("left", v10243.options.displayLeft()), v10243.designTarget.css("top", v10243.options.displayTop());
                  v10243.createLineOfPosition(v10237);
                });
                if (notSelected) {
                  v10238.updateSizeAndPositionOptions(v10240, v10241), v10238.createLineOfPosition(v10237);
                }
              } else {
                v10238.updateSizeAndPositionOptions(v10240, v10241), v10238.createLineOfPosition(v10237);
              }
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = !0;
            },
            moveUnit: "pt",
            minMove: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(v10246) {
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0, v10238.designTarget.focus(), v10238.createLineOfPosition(v10237);
            },
            onBeforeSelectAllDrag: function onBeforeSelectAllDrag() {
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0, v10238.designTarget.focus();
            },
            getScale: function getScale() {
              return v10238.designPaper.scale || 1;
            },
            onStopDrag: function onStopDrag(v10249) {
              // 普通元素拖动结束事件history
              if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed) hinnn.event.trigger("hiprintTemplateDataChanged_" + v10238.templateId, "移动");
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !1,
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = !1;
              var els = v10238.panel.printElements.filter(function (v10253) {
                return 'block' == v10253.designTarget.children().last().css('display') && !v10253.printElementType.type.includes('table');
              });
              if (els.length > 1) {
                els.forEach(function (v10254) {v10254.removeLineOfPosition();});
              } else v10238.removeLineOfPosition();
            }
          }), this.setResizePanel(), this.bingCopyEvent(this.designTarget), this.bingKeyboardMoveEvent(this.designTarget, v10237);
        }, BasePrintElement.prototype.getPrintElementEntity = function (v10255) {
          return v10255 ? new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(void 0, this.options.getPrintElementOptionEntity(), this.printElementType.getPrintElementTypeEntity()) : new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(this.printElementType.tid, this.options.getPrintElementOptionEntity());
        }, BasePrintElement.prototype.submitOption = function () {
          var els = this.panel.printElements.filter(function (v10258) {
            return 'block' == v10258.designTarget.children().last().css('display') &&
            v10258.designTarget.children().last().hasClass('selected') &&
            !v10258.printElementType.type.includes('table');
          });
          els = els.filter((ele) => ele.printElementType.type == this.printElementType.type);
          var v10259 = this,v10260 = this.getConfigOptions();
          if (v10260 && v10260.tabs && v10260.tabs.length) {
            this.getPrintElementOptionTabs().forEach(function (tab) {
              // 样式更新要应用到其他选中的同种元素
              if (tab.name === "样式" && els.length) {
                tab.list.forEach(function (v10261) {
                  els.forEach((ele) => {
                    var v10262 = v10261.getValue(),
                      v10263 = 'textType' == v10261.name && ele.options[v10261.name] !== v10262,
                      v10264 = 'axis' == v10261.name && ele.options[v10261.name] !== v10262;
                    v10262 && "object" == _typeof(v10262) ? Object.keys(v10262).forEach(function (v10265) {
                      ele.options[v10265] = v10262[v10265];
                    }) : ele.options[v10261.name] = v10262;
                    if (v10263) {
                      ele.setResizePanel();
                    }
                    if (v10264) {
                      ele.designTarget.hidraggable('update', { axis: v10262 });
                    }
                  });
                });
              } else {
                tab.list.forEach(function (v10266) {
                  var v10267 = v10266.getValue(),v10268 = 'textType' == v10266.name && v10259.options[v10266.name] !== v10267,
                    v10269 = 'axis' == v10266.name && v10259.options[v10266.name] !== v10267;
                  v10267 && "object" == _typeof(v10267) ? Object.keys(v10267).forEach(function (v10270) {
                    v10259.options[v10270] = v10267[v10270];
                  }) : v10259.options[v10266.name] = v10267;
                  if (v10268) {
                    v10259.setResizePanel();
                  }
                  if (v10269) {
                    v10259.designTarget.hidraggable('update', { axis: v10267 });
                  }
                });
              }
            });
          } else {
            this.getPrintElementOptionItems().forEach(function (v10271) {
              var v10272 = v10271.getValue(),v10273 = 'textType' == v10271.name && v10259.options[v10271.name] !== v10272,
                v10274 = 'axis' == v10271.name && v10259.options[v10271.name] !== v10272;
              v10272 && "object" == _typeof(v10272) ? Object.keys(v10272).forEach(function (v10275) {
                v10259.options[v10275] = v10272[v10275];
              }) : v10259.options[v10271.name] = v10272;
              if (v10273) {
                v10259.setResizePanel();
              }
              if (v10274) {
                v10259.designTarget.hidraggable('update', { axis: v10272 });
              }
            });
          }
          this.updateDesignViewFromOptions(), hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "元素修改");
        }, BasePrintElement.prototype.updateOption = function (v10276, v10277, v10278) {
          try {
            var v10279 = this.getConfigOptions();
            var optionKeys = [];
            if (v10279 && v10279.tabs && v10279.tabs.length) {
              v10279.tabs.forEach(function (v10280) {
                v10280.options.forEach(function (v10281) {
                  optionKeys.push(v10281.name);
                });
              });
            } else {
              optionKeys = v10279.supportOptions.map(function (v10282) {return v10282.name;});
            }
            if (optionKeys && optionKeys.includes(v10276)) {
              this.options[v10276] = v10277;
              this.updateDesignViewFromOptions();
              if (!v10278) {
                hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "参数修改");
              }
            }
            this._printElementOptionTabs.forEach((tab) => {
              tab.list.forEach((item) => {
                if (item.name === v10276) {
                  item.target.find('select')?.val(v10277.toString());
                  item.target.find('input')?.val(v10277.toString());
                }
              });
            });
          } catch (v10283) {
            console.log('updateOption error', v10283);
          }
        }, BasePrintElement.prototype.getReizeableShowPoints = function () {
          return ['barcode', 'qrcode'].includes(this.options.textType) ? ["se", "s", "e", "r"] : ["s", "e", "r"];
        }, BasePrintElement.prototype.setResizePanel = function () {
          var v10284 = this,v10285 = this.designPaper;
          this.designTarget.hireizeable({
            showPoints: v10284.getReizeableShowPoints(),
            draggable: v10284.options.draggable, // 元素是否可拖拽、删除
            // 是否显示宽高box
            showSizeBox: _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.showSizeBox,
            getScale: function getScale() {
              return v10284.designPaper.scale || 1;
            },
            onBeforeResize: function onBeforeResize() {
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0;
            },
            onResize: function onResize(v10288, v10289, v10290, v10291, v10292, rt) {
              if (undefined != rt) {
                v10284.onRotate(v10288, rt);
              } else {
                v10284.onResize(v10288, v10289, v10290, v10291, v10292);
              }
              v10284.createLineOfPosition(v10285);
            },
            onStopResize: function onStopResize(v10293) {
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v10284.templateId, v10293 ? "旋转" : "大小");
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !1, v10284.removeLineOfPosition();
            }
          });
        }, BasePrintElement.prototype.onRotate = function (v10295, v10296) {
          this.options.setRotate(v10296);
        }, BasePrintElement.prototype.onResize = function (v10297, v10298, v10299, v10300, v10301) {
          this.updateSizeAndPositionOptions(v10301, v10300, v10299, v10298);
        }, BasePrintElement.prototype.getOrderIndex = function () {
          return this.options.getTop();
        }, BasePrintElement.prototype.getHtml = function (v10302, v10303, v10304) {
          var v10305 = 0;
          this.setCurrenttemplateData(v10303);
          var v10306 = [],
            v10307 = this.getBeginPrintTopInPaperByReferenceElement(v10302),
            v10308 = v10302.getPaperFooter(v10305);
          this.isHeaderOrFooter() || this.isFixed() || v10307 > v10308 && "none" != v10302.panelPageRule && (v10306.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: void 0,
            printLine: void 0
          })), v10307 = v10307 - v10308 + v10302.paperHeader, v10305++, v10308 = v10302.getPaperFooter(v10305));
          var v10310 = this.getData(v10303),
            v10311 = this.createTarget(this.getTitle(), v10310, v10304);
          this.updateTargetSize(v10311), this.css(v10311, v10310), v10311.css("position", "absolute"), v10311.css("left", this.options.displayLeft()), v10311.css("top", v10307 + "pt"), v10306.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: v10311,
            printLine: v10307 + this.options.getHeight(),
            referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
              top: this.options.getTop(),
              left: this.options.getLeft(),
              height: this.options.getHeight(),
              width: this.options.getWidth(),
              beginPrintPaperIndex: v10302.index,
              bottomInLastPaper: v10307 + this.options.getHeight(),
              printTopInPaper: v10307
            })
          }));
          if (v10303 && this.options.pageBreak) {
            v10306[0].target.css("top", v10302.paperHeader + "pt");
            v10306[0].referenceElement.top = this.options.getTop() - this.options.getHeight() - v10302.paperHeader;
            v10306[0].printLine = v10302.paperHeader;
            v10306[0].referenceElement.bottomInLastPaper = 0;
            v10306[0].referenceElement.printTopInPaper = v10302.paperHeader;
            v10306.unshift(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
              target: v10311,
              printLine: v10302.height,
              referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                beginPrintPaperIndex: v10302.index,
                bottomInLastPaper: v10302.height,
                printTopInPaper: v10302.paperHeader
              })
            }));
          }
          return v10306;
        }, BasePrintElement.prototype.getHtml2 = function (v10316, v10317, v10318) {
          var v10319 = 0;
          this.setCurrenttemplateData(v10317);
          var v10320 = [],
            v10321 = this.getBeginPrintTopInPaperByReferenceElement(v10316),
            v10322 = v10316.getPaperFooter(v10319);
          // 处理文本/辅助元素 当高度大于模板高度, 插入的分页...
          this.isHeaderOrFooter() || this.isFixed() || ("none" != v10316.panelPageRule && v10321 > v10322 && (v10320.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: void 0,
            printLine: void 0
            // (e && r + this.options.getHeight() > a) --> 设计时拖拽元素高度超过页脚线时,导致报错问题
          })), v10321 = v10321 - v10322 + v10316.paperHeader, v10319++, v10322 = v10316.getPaperFooter(v10319)), v10321 <= v10322 && v10317 && v10321 + this.options.getHeight() > v10322 && "none" != v10316.panelPageRule && (v10320.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: void 0,
            printLine: void 0
          })), v10321 = v10316.paperHeader, v10319++, v10322 = v10316.getPaperFooter(v10319)));
          var v10325 = this.getData(v10317),
            v10326 = this.createTarget(this.getTitle(), v10325);
          if ("none" == v10316.panelPageRule && v10321 + this.options.getHeight() > v10322) this.updatePanelHeight(v10321 + this.options.getHeight(), v10316);
          this.updateTargetSize(v10326), this.css(v10326, v10325), v10326.css("position", "absolute"), v10326.css("left", this.options.displayLeft()), v10326.css("top", v10321 + "pt"), v10320.push(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: v10326,
            printLine: v10321 + this.options.getHeight(),
            referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
              top: this.options.getTop(),
              left: this.options.getLeft(),
              height: this.options.getHeight(),
              width: this.options.getWidth(),
              beginPrintPaperIndex: v10316.index,
              bottomInLastPaper: v10321 + this.options.getHeight(),
              printTopInPaper: v10321
            })
          }));
          if (v10317 && this.options.pageBreak) {
            v10320[0].target.css("top", v10316.paperHeader + "pt");
            v10320[0].referenceElement.top = this.options.getTop() - this.options.getHeight() - v10316.paperHeader;
            v10320[0].printLine = v10316.paperHeader;
            v10320[0].referenceElement.bottomInLastPaper = 0;
            v10320[0].referenceElement.printTopInPaper = v10316.paperHeader;
            v10320.unshift(new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
              target: v10326,
              printLine: v10316.height,
              referenceElement: new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                beginPrintPaperIndex: v10316.index,
                bottomInLastPaper: v10316.height,
                printTopInPaper: v10316.paperHeader
              })
            }));
          }
          return v10320;
        }, BasePrintElement.prototype.updatePanelHeight = function (v10331, v10332) {
          if ("none" == this.panel.panelPageRule) {
            var nmh = hinnn.pt.toMm(v10331);
            // 更改模板高度 paperType, width(mm), height(mm), rotate
            // this.panel.resize(void 0, t.mmwidth, nmh, !1);
            // 这个会更新模板的高度...
            // this.panel.target.css("height", nmh + "mm"), this.panel.target.attr("original-height", nmh);
            v10332.paperFooter = v10331;
            v10332.target.css("height", nmh + "mm"), v10332.target.attr("original-height", nmh);
          }
        }, BasePrintElement.prototype.getBeginPrintTopInPaperByReferenceElement = function (v10333) {
          var v10334 = this.options.getTop();
          return this.isHeaderOrFooter() || this.isFixed() ? v10334 : v10333.referenceElement.isPositionLeftOrRight(v10334) ? v10333.referenceElement.printTopInPaper + (v10334 - v10333.referenceElement.top) : v10333.referenceElement.bottomInLastPaper + (v10334 - (v10333.referenceElement.top + v10333.referenceElement.height));
        }, BasePrintElement.prototype.css = function (v10335, v10336) {
          var v10337 = this,
            v10338 = [],
            v10339 = this.getConfigOptions();
  
          if (v10339) {
            var v10340;
            if (v10339.tabs && v10339.tabs.length) {
              v10340 = [];
              v10339.tabs.forEach(function (v10341) {
                v10340 = v10340.concat(v10341.options);
              });
            } else {
              v10340 = v10339.supportOptions;
            }
            v10340 && v10340.forEach(function (v10342) {
              var v10343 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10342.name);
  
              if (v10343 && v10343.css) {
                var v10345 = v10343.css(v10335, v10337.options.getValueFromOptionsOrDefault(v10342.name));
                v10345 && v10338.push(v10345);
              }
            });
          }
  
          this.stylerCss(v10335, v10336);
        }, BasePrintElement.prototype.stylerCss = function (v10346, v10347) {
          var v10348 = this.getStyler();
  
          if (v10348) {
            var v10349 = v10348(v10347, this.options, v10346, this._currenttemplateData);
            if (v10349) Object.keys(v10349).forEach(function (v10350) {
              v10346.css(v10350, v10349[v10350]);
            });
          }
        }, BasePrintElement.prototype.getData = function (v10351) {
          var v10352 = this.getField();
          return v10351 ? v10352 ? v10352.split('.').reduce((v10353, v10354) => v10353 ? v10353[v10354] : v10351 ? v10351[v10354] : "", !1) || "" : "" : this.printElementType.getData();
        }, BasePrintElement.prototype.copyFromType = function () {
          var options = this.options,type = this.printElementType;
          var v10355 = this.getConfigOptions();
          var names = [];
          if (v10355 && v10355.tabs && v10355.tabs.length) {
            v10355.tabs.forEach(function (v10356) {
              v10356.options.forEach(function (v10357) {
                names.push(v10357.name);
              });
            });
          } else {
            names = v10355.supportOptions.map(function (v10358) {return v10358.name;});
          }
          Object.keys(type).forEach(function (v10359) {
            if (type[v10359] && 'columns' != v10359 && names.indexOf(v10359) > -1) {
              options[v10359] = 'function' == _typeof(type[v10359]) ? type[v10359].toString() : type[v10359];
            }
          });
          return options;
        }, BasePrintElement.prototype.getPrintElementOptionTabs = function () {
          if (this._printElementOptionTabs) return this._printElementOptionTabs;
          var tabs = [],
            v10360 = this.getConfigOptions();
          if (v10360) {
            var v10361 = v10360.tabs;
            v10361 && v10361.forEach(function (v10362, v10363) {
              tabs.push({ name: v10362.name, list: [] });
              v10362.options.filter(function (v10364) {
                return !v10364.hidden;
              }).forEach(function (v10365) {
                var v10366 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10365.name);
                tabs[v10363].list.push(v10366);
              });
            });
          }
          return this._printElementOptionTabs = tabs, this._printElementOptionItems = void 0, this._printElementOptionTabs;
        }, BasePrintElement.prototype.getPrintElementOptionItems = function () {
          if (this._printElementOptionItems) return this._printElementOptionItems;
          var v10368 = [],
            v10369 = this.getConfigOptions();
  
          if (v10369) {
            var v10370;
            if (v10369.tabs && v10369.tabs.length) {
              v10370 = [];
              v10369.tabs.forEach(function (v10371) {
                v10371 = v10371.concat(v10371.options);
              });
            } else {
              v10370 = v10369.supportOptions;
            }
            v10370 && v10370.filter(function (v10372) {
              return !v10372.hidden;
            }).forEach(function (v10373) {
              var v10374 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10373.name);
  
              v10368.push(v10374);
            });
          }
  
          return this._printElementOptionItems = this.filterOptionItems(v10368.concat()), this._printElementOptionTabs = void 0, this._printElementOptionItems;
        }, BasePrintElement.prototype.getPrintElementOptionItemsByName = function (v10376) {
          var v10377 = [],
            v10378 = this.getConfigOptionsByName(v10376);
  
          if (v10378) {
            var v10379;
            if (v10378.tabs && v10378.tabs.length) {
              v10379 = [];
              v10378.tabs.forEach(function (v10380) {
                v10379 = v10379.concat(v10380.options);
              });
            } else {
              v10379 = v10378.supportOptions;
            }
            v10379 && v10379.filter(function (v10381) {
              return !v10381.hidden;
            }).forEach(function (v10382) {
              var v10383 = _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(v10382.name);
  
              v10377.push(v10383);
            });
          }
  
          return v10377.concat();
        }, BasePrintElement.prototype.filterOptionItems = function (v10385) {
          return this.printElementType.field ? v10385.filter(function (v10386) {
            return "field" != v10386.name;
          }) : v10385;
        }, BasePrintElement.prototype.createTempContainer = function () {
          this.removeTempContainer(), $("body").append($('<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'));
        }, BasePrintElement.prototype.removeTempContainer = function () {
          $(".hiprint_temp_Container").remove();
        }, BasePrintElement.prototype.getTempContainer = function () {
          return $(".hiprint_temp_Container");
        }, BasePrintElement.prototype.isHeaderOrFooter = function () {
          return this.options.getTopInDesign() < this.panel.paperHeader || this.options.getTopInDesign() >= this.panel.paperFooter;
        }, BasePrintElement.prototype.delete = function () {
          this.designTarget && this.designTarget.remove();
        }, BasePrintElement.prototype.setCurrenttemplateData = function (v10387) {
          this._currenttemplateData = v10387;
        }, BasePrintElement.prototype.isFixed = function () {
          return this.options.fixed;
        }, BasePrintElement.prototype.onRendered = function (v10388, v10389) {
          this.printElementType && this.printElementType.onRendered && this.printElementType.onRendered(v10389, this.options, v10388.getTarget());
        }, BasePrintElement.prototype.createLineOfPosition = function (v10390) {
          var v10391 = $(".toplineOfPosition.id" + this.id),
            topPos = $(".topPosition.id" + this.id),
            v10392 = $(".leftlineOfPosition.id" + this.id),
            leftPos = $(".leftPosition.id" + this.id),
            v10393 = $(".rightlineOfPosition.id" + this.id),
            v10394 = $(".bottomlineOfPosition.id" + this.id);
          var config = _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance;
          if (v10391.length) v10391.css("top", this.options.displayTop(true));else {
            var v10391 = $('<div class="toplineOfPosition id' + this.id + '" style="position: absolute; width: 100%;"></div>');
            v10391.css("top", this.options.displayTop(true)), v10391.css("width", v10390.displayWidth()), this.designTarget.parents(".hiprint-printPaper-content").append(v10391);
          }
          if (config.showPosition) {
            if (topPos.length) {
              topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
              topPos.text(this.options.posTop() + (config.positionUnit ? 'pt' : ''));
              topPos.css("top", this.options.posTop() - topPos.height() + "pt");
              if (config.positionLineMode) {
                topPos.css("left", this.options.posLeft() - topPos.width() / 2 + "pt");
              } else {
                topPos.css("left", this.options.posLeft() + 2 + "pt");
              }
              this.designTarget.find('.size-box') && this.designTarget.find('.size-box').toggleClass('hide', true);
            } else {
              var topPos = $('<div class="topPosition id' + this.id + '" style="position: absolute;"></div>');
              topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
              topPos.text(this.options.posTop() + (config.positionUnit ? 'pt' : ''));
              if (config.positionLineMode) {
                topPos.css("left", this.options.posLeft() - topPos.width() / 2 + "pt");
              } else {
                topPos.css("left", this.options.posLeft() + 2 + "pt");
              }
              this.designTarget.find('.size-box') && this.designTarget.find('.size-box').toggleClass('hide', true);
              this.designTarget.parents(".hiprint-printPaper-content").append(topPos);
              topPos.css("top", this.options.posTop() - topPos.height() + "pt");
            }
          }
          if (v10392.length) v10392.css("left", this.options.displayLeft(true));else {
            var v10396 = $('<div class="leftlineOfPosition id' + this.id + '" style="position: absolute;height: 100%;"></div>');
            v10396.css("left", this.options.displayLeft(true)), v10396.css("height", v10390.displayHeight()), this.designTarget.parents(".hiprint-printPaper-content").append(v10396);
          }
          if (config.showPosition) {
            if (leftPos.length) {
              leftPos.text(this.options.posLeft() + (config.positionUnit ? 'pt' : ''));
              leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
              leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
              if (config.positionLineMode) {
                leftPos.css("top", this.options.posTop() - leftPos.height() / 3 + "pt");
              } else {
                leftPos.css("top", this.options.posTop() + 2 + "pt");
              }
            } else {
              var leftPos = $('<div class="leftPosition id' + this.id + '" style="position: absolute;"></div>');
              leftPos.text(this.options.posLeft() + (config.positionUnit ? 'pt' : ''));
              leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
              if (config.positionLineMode) {
                leftPos.css("top", this.options.posTop() - leftPos.height() / 3 + "pt");
              } else {
                leftPos.css("top", this.options.posTop() + 2 + "pt");
              }
              this.designTarget.parents(".hiprint-printPaper-content").append(leftPos);
              leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
            }
          }
          if (v10393.length) v10393.css("left", this.options.getLeft() + this.options.getWidth() + "pt");else {
            var v10395 = $('<div class="rightlineOfPosition id' + this.id + '" style="position: absolute;height: 100%;"></div>');
            v10395.css("left", this.options.getLeft() + this.options.getWidth() + "pt"), v10395.css("height", v10390.displayHeight()), this.designTarget.parents(".hiprint-printPaper-content").append(v10395);
          }
          if (v10394.length) v10394.css("top", this.options.getTop() + this.options.getHeight() + "pt");else {
            var v10397 = $('<div class="bottomlineOfPosition id' + this.id + '" style="position: absolute;width: 100%;"></div>');
            v10397.css("top", this.options.getTop() + this.options.getHeight() + "pt"), v10397.css("width", v10390.displayWidth()), this.designTarget.parents(".hiprint-printPaper-content").append(v10397);
          }
        }, BasePrintElement.prototype.removeLineOfPosition = function () {
          $(".toplineOfPosition.id" + this.id).remove(), $(".topPosition.id" + this.id).remove(), this.designTarget.find('.size-box') && this.designTarget.find('.size-box').toggleClass('hide', false), $(".leftlineOfPosition.id" + this.id).remove(), $(".leftPosition.id" + this.id).remove(), $(".rightlineOfPosition.id" + this.id).remove(), $(".bottomlineOfPosition.id" + this.id).remove();
        }, BasePrintElement.prototype.getFontList = function () {
          var v10398 = this.options.fontList;
          return v10398 || (v10398 = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId).getFontList());
        }, BasePrintElement.prototype.getFields = function () {
          if ("table" == this.printElementType.type) {
            var v10400 = this.options.tableFields;
            return v10400;
          }
          var v10400 = this.options.fields;
          return v10400 || (v10400 = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId).getFields());
        }, BasePrintElement.prototype.getOnImageChooseClick = function () {
          var v10402 = this.options.onImageChooseClick;
          return v10402 || (v10402 = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(this.templateId).getOnImageChooseClick());
        }, BasePrintElement.prototype.bingCopyEvent = function (v10404) {
          var v10405 = this;
          v10404.keydown(function (v10406) {
            if (v10405._editing) {
              if (!v10406.altKey && 13 == v10406.keyCode) {
                v10405.updateByContent();
                return;
              }
            }
            // ctrl + c / command + c
            if ((v10406.ctrlKey || v10406.metaKey) && 67 == v10406.keyCode) {
              v10405.copyJson();
              v10406.preventDefault();
            }
          });
        }, BasePrintElement.prototype.copyJson = function () {
          try {
            var v10407 = this;
            // 使用textarea 存储复制的元素信息
            var copyArea = $('#copyArea');
            if (!copyArea.length) copyArea = $('<textarea id="copyArea" style="position: absolute; left: 0px; top: 0px;opacity: 0"></textarea>');
            $("body").append(copyArea);
            let copyElements = this.panel.printElements.filter((ele) => {
              return 'block' == ele.designTarget.children().last().css('display') && !ele.printElementType.type.includes('table');
            });
            copyElements = copyElements.map((ele) => {
              return {
                options: ele.options,
                printElementType: ele.printElementType,
                id: ele.id,
                templateId: ele.templateId
              };
            });
            var json = JSON.stringify(copyElements);
            // var json = JSON.stringify({
            //   options: n.options,
            //   printElementType: n.printElementType,
            //   id: n.id,
            //   templateId: n.templateId
            // });
            copyArea.text(json);
            // 元素需可见才能选中复制到剪切板
            copyArea.css('visibility', 'visible');
            // 尝试修复对复制元素的自动聚焦
            // copyArea.focus();
            if (copyArea.setSelectionRange)
            copyArea.setSelectionRange(0, copyArea.value.length);else
  
            copyArea.select();
            var flag = false;
            flag = document.execCommand("copy");
            copyArea.css('visibility', 'hidden');
            // 获取元素焦点，不然无法粘贴（keydown问题）
            v10407.designTarget.focus();
            console.log('copyJson success');
          } catch (v10408) {
            flag = false;
            console.log('copyJson error', v10408);
          }
          return flag;
        }, BasePrintElement.prototype.clone = function (v10409) {
          var v10410 = this;
          let newObj = v10410.printElementType.createPrintElement();
          Object.keys(v10410.options).forEach(function (key) {
            newObj.options[key] = v10410.options[key];
          });
          return newObj;
        }, BasePrintElement.prototype.getFormatter = function () {
          var formatter = void 0;
          if (this.printElementType.formatter && (formatter = this.printElementType.formatter), this.options.formatter) try {
            var v10411 = "formatter=" + this.options.formatter;
            eval(v10411);
          } catch (v10412) {
            console.log(v10412);
          }
          return formatter;
        }, BasePrintElement.prototype.getStyler = function () {
          var fnstyler = void 0;
          if (this.printElementType.styler && (fnstyler = this.printElementType.styler), this.options.styler) try {
            var v10413 = "fnstyler=" + this.options.styler;
            eval(v10413);
          } catch (v10414) {
            console.log(v10414);
          }
          return fnstyler;
        }, BasePrintElement.prototype.bingKeyboardMoveEvent = function (v10415, v10416) {
          var v10417 = this,
            v10418 = void 0,
            v10419 = void 0;
          v10415.attr("tabindex", "1"), v10415.keydown(function (v10420) {
            // 处理 table / input 输入时 删除元素问题
            if ('INPUT' == v10420.target.tagName) {
              return;
            }
            // 元素编辑
            if (v10417._editing && !v10420.altKey) {
              return;
            }
            // 元素禁止移动
            if (false === v10417.options.draggable) {
              return;
            }
            // 处理按住 ctrl / command 多选元素
            var els = v10417.panel.printElements.filter(function (v10421) {
              return 'block' == v10421.designTarget.children().last().css('display') && !v10421.printElementType.type.includes('table');
            });
            var isMultiple = els.length > 1;
            var movingDistance = _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance;
            switch (v10420.keyCode) {
              // BackSpace/Delete 删除元素
              case 8:
              case 46:
                var templete = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(v10417.templateId);
                templete.deletePrintElement(v10417);
                hinnn.event.trigger("hiprintTemplateDataChanged_" + v10417.templateId, "删除");
                hinnn.event.trigger("clearSettingContainer");
                // 获取到了template 拿到template里面所有被选中的元素
                els.forEach((ele) => {
                  templete.deletePrintElement(ele);
                  hinnn.event.trigger("hiprintTemplateDataChanged_" + ele.templateId, "删除");
                });
                hinnn.event.trigger("clearSettingContainer");
                break;
              case 37:
                v10418 = v10417.options.getLeft();
                if (isMultiple) {
                  els.forEach(function (v10424) {
                    v10424.updatePositionByMultipleSelect(0 - movingDistance, 0);
                  });
                } else {
                  v10417.updateSizeAndPositionOptions(v10418 - movingDistance), v10415.css("left", v10417.options.displayLeft());
                }
                v10420.preventDefault();
                break;
  
              case 38:
                v10419 = v10417.options.getTop();
                if (isMultiple) {
                  els.forEach(function (v10425) {
                    v10425.updatePositionByMultipleSelect(0, 0 - movingDistance);
                  });
                } else {
                  v10417.updateSizeAndPositionOptions(void 0, v10419 - movingDistance), v10415.css("top", v10417.options.displayTop());
                }
                v10420.preventDefault();
                break;
  
              case 39:
                v10418 = v10417.options.getLeft();
                if (isMultiple) {
                  els.forEach(function (v10426) {
                    v10426.updatePositionByMultipleSelect(movingDistance, 0);
                  });
                } else {
                  v10417.updateSizeAndPositionOptions(v10418 + movingDistance), v10415.css("left", v10417.options.displayLeft());
                }
                v10420.preventDefault();
                break;
  
              case 40:
                v10419 = v10417.options.getTop();
                if (isMultiple) {
                  els.forEach(function (v10427) {
                    v10427.updatePositionByMultipleSelect(0, movingDistance);
                  });
                } else {
                  v10417.updateSizeAndPositionOptions(void 0, v10419 + movingDistance), v10415.css("top", v10417.options.displayTop());
                }
                v10420.preventDefault();
            }
            if ([37, 38, 39, 40].includes(v10420.keyCode)) {
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v10417.templateId, "键盘移动");
            }
          });
        }, BasePrintElement.prototype.inRect = function (v10428) {
          var ptr = this.designPaper.scale || 1;
          var x1 = this.designTarget[0].offsetLeft,
            y1 = this.designTarget[0].offsetTop,v10429 = this.designTarget[0].offsetHeight,
            v10430 = this.designTarget[0].offsetWidth,
            x2 = x1 + v10430,y2 = y1 + v10429,
            ex1 = $(v10428.target[0]).position().left / ptr,ey1 = $(v10428.target[0]).position().top / ptr,
            eh = v10428.target[0].offsetHeight,ew = v10428.target[0].offsetWidth,
            ex2 = ex1 + ew,ey2 = ey1 + eh;
          return ex1 < x2 && ex2 > x1 && y1 < ey2 && y2 > ey1;
        }, BasePrintElement.prototype.multipleSelect = function (v10431) {
          v10431 ? this.designTarget.addClass("multipleSelect") : this.designTarget.removeClass("multipleSelect");
        }, BasePrintElement.prototype.updatePositionByMultipleSelect = function (v10432, v10433) {
          if (false === this.options.draggable) return;
          this.updateSizeAndPositionOptions(v10432 + this.options.getLeft(), v10433 + this.options.getTop()), this.designTarget.css("left", this.options.displayLeft()), this.designTarget.css("top", this.options.displayTop());
        }, BasePrintElement;
      }();
  }