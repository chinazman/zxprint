import {languages,i18n,$,_instanceof,_typeof} from "../hiprint.comm.js";
// 条形码
import JsBarcode from "jsbarcode";
import bwipjs from "bwip-js";
// 水印
import watermark from "../plugins/watermark.js";
//引入标尺
import lImg from "../css/image/l_img.svg";
import vImg from "../css/image/v_img.svg";
// pdf
import { jsPDF } from "jspdf";
import html2canvas from "@wtto00/html2canvas";
// 解析svg 到 canvas, 二维码条形码需要
import Canvg from 'canvg';

import "../plugins/22jquery.hidraggable.js";
import "../plugins/23jquery.hidroppable.js";
import "../plugins/24jquery.hiprintparser.js";
import "../plugins/25jquery.hireizeable.js";
import hinnn from "../components/00hinnn.js";
import "../plugins/26hiwebSocket.js";
//import "../plugins/27css.js";
import "../plugins/32jquery.hicontextMenu.js";
import PrintConfig from "./01PrintConfig.js";
import PrintLib from "./02PrintLib.js";
import PrintTableCell from "./05PrintTableCell.js";
import TablePrintElement from "./15TablePrintElement.js";
import BasePrintElement from "./04BasePrintElement.js";
import PrintElementOption from "./03PrintElementOption.js";
import PrintReferenceElement from "./08PrintReferenceElement.js";
import PaperHtmlResult from "./06PaperHtmlResult.js";
// import PrintTable from "./16PrintTable.js";
import PrintElementTableRow from "./12PrintElementTableRow.js";
import PrintElementOptionItemManager from "./09PrintElementOptionItemManager.js";

import "../plugins/hiLocalStorage.js"

import {PrintElementTypeContext,PrintElementTypeHtmlProvider,PrintElementTypeEntity,PrintElementType} from "./commonEntitys.js";
import PrintPage from "./PrintPage.js";

import ImagePrintElement from "./elements/ImagePrintElement.js";
import LongTextPrintElement from "./elements/LongTextPrintElement.js";
import TextPrintElement from "./elements/TextPrintElement.js";
import HtmlPrintElement from "./elements/HtmlPrintElement.js";
import VLinePrintElement from "./elements/VLinePrintElement.js";
import HLinePrintElement from "./elements/HLinePrintElement.js";
import RectPrintElement from "./elements/RectPrintElement.js";
import OvalPrintElement from "./elements/OvalPrintElement.js";
import BarcodePrintElement from "./elements/BarcodePrintElement.js";
import QrcodePrintElement from "./elements/QrcodePrintElement.js";
var

      v12980 = function () {
        function v12981() {
        }
  
        return v12981.createPrintElement = function (v12982, v12983) {
          return "text" == v12982.type ? new TextPrintElement(v12982, v12983) : "image" == v12982.type ? new ImagePrintElement(v12982, v12983) : "longText" == v12982.type ? new LongTextPrintElement(v12982, v12983) : "table" == v12982.type ? new TablePrintElement(v12982, v12983) : "html" == v12982.type ? new HtmlPrintElement(v12982, v12983) : "vline" == v12982.type ? new VLinePrintElement(v12982, v12983) : "hline" == v12982.type ? new HLinePrintElement(v12982, v12983) : "rect" == v12982.type ? new RectPrintElement(v12982, v12983) : "oval" == v12982.type ? new OvalPrintElement(v12982, v12983) : "barcode" == v12982.type ? new BarcodePrintElement(v12982, v12983) : "qrcode" == v12982.type ? new QrcodePrintElement(v12982, v12983) : void 0;
        }, v12981;
      }(),
      v12985 = function () {
        function v12987(v12986) {
          this.field = v12986.field, this.fields = v12986.fields, this.title = v12986.title, this.text = v12986.text, this.tid = v12986.tid, this.data = v12986.data, this.styler = v12986.styler, this.formatter = v12986.formatter, this.type = v12986.type, this.onRendered = v12986.onRendered, this.options = v12986.options;
        }
  
        return v12987.prototype.getText = function (v12988) {
          return v12988 ? this.title || this.text || "" : this.text || this.title || "";
        }, v12987.prototype.getData = function () {
          return this.data;
        }, v12987.prototype.createPrintElement = function (v12989) {
          var v12990 = {};
          return $.extend(v12990, v12989 || {}), v12980.createPrintElement(this, v12990);
        }, v12987.prototype.getPrintElementTypeEntity = function () {
          return new PrintElementTypeEntity({
            title: this.title,
            type: this.type
          });
        }, v12987.prototype.getFields = function () {
          return this.fields;
        }, v12987.prototype.getOptions = function () {
          return this.options || {};
        }, v12987;
      }(),

      
      v12993 = function () {
        var _t14 = function v12994(v12995, v12996) {
          return (_t14 = Object.setPrototypeOf || _instanceof({
            __proto__: []
          }, Array) && function (v12997, v12998) {
            v12997.__proto__ = v12998;
          } || function (v12999, v13000) {
            for (var v13001 in v13000) {
              v13000.hasOwnProperty(v13001) && (v12999[v13001] = v13000[v13001]);
            }
          })(v12995, v12996);
        };
  
        return function (v13002, v13003) {
          function v13004() {
            this.constructor = v13002;
          }
  
          _t14(v13002, v13003), v13002.prototype = null === v13003 ? Object.create(v13003) : (v13004.prototype = v13003.prototype, new v13004());
        };
      }(),
      v13005 = function (v13006) {
        function v13014(v13007) {
          var v13008 = v13006.call(this, v13007) || this;
          (v13007 = v13007 || {}).columns ? (v13008.columns = [], v13007.columns.forEach(function (v13009) {
            v13008.columns.push(new PrintElementTableRow(v13009));
          })) : v13008.columns = [new PrintElementTableRow({
            columns: [new PrintTableCell({
              width: 100
            }), new PrintTableCell({
              width: 100
            })]
          })];
          return v13008.lHeight = v13007.lHeight, v13008.autoCompletion = v13007.autoCompletion, v13008.tableFooterRepeat = v13007.tableFooterRepeat, v13008;
        }
  
        return v12993(v13014, v13006), v13014.prototype.getPrintElementOptionEntity = function () {
          var v13015 = v13006.prototype.getPrintElementOptionEntity.call(this);
          v13015.fields = this.fields;
          return v13015.columns = [], this.columns.forEach(function (v13016) {
            v13015.columns.push(v13016.getPrintElementOptionEntity());
          }), v13015;
        }, v13014;
      }(PrintElementOption),
      tt = function () {
        var _t17 = function v13030(v13031, v13032) {
          return (_t17 = Object.setPrototypeOf || _instanceof({
            __proto__: []
          }, Array) && function (v13033, v13034) {
            v13033.__proto__ = v13034;
          } || function (v13035, v13036) {
            for (var v13037 in v13036) {
              v13036.hasOwnProperty(v13037) && (v13035[v13037] = v13036[v13037]);
            }
          })(v13031, v13032);
        };
  
        return function (v13038, v13039) {
          function v13040() {
            this.constructor = v13038;
          }
  
          _t17(v13038, v13039), v13038.prototype = null === v13039 ? Object.create(v13039) : (v13040.prototype = v13039.prototype, new v13040());
        };
      }(),
      et = function (v13041) {
        function v13043(v13042) {
          return v13041.call(this, v13042) || this;
        }
  
        return tt(v13043, v13041), v13043.prototype.createPrintElement = function (v13044) {
          var v13045 = {};
          return $.extend(v13045, v13044 || {}), v12980.createPrintElement(this, v13045);
        }, v13043.prototype.getPrintElementTypeEntity = function () {
          return new PrintElementTypeEntity({
            title: this.title,
            type: this.type
          });
        }, v13043;
      }(v12985),
      nt = function () {
        function v13046() {
        }
  
        return v13046.createPrintElementType = function (v13047) {
          return v13047.type = v13047.type || "text", "text" == v13047.type ? new et(v13047) : "table" == v13047.type ? new PrintElementType(v13047) : new v12985(v13047);
        }, v13046;
      }(),
      PrintElementTypeManager = function () {
        function v13048() {
        }
  
        return v13048.getElementTypeGroups = function (v13049) {
          var v13050 = v13048.formatterModule(v13049);
          return PrintElementTypeContext.instance[v13050] || [];
        }, v13048.getElementType = function (v13051, v13052) {
          if (v13051) return PrintElementTypeContext.instance.getElementType(v13051);
          nt.createPrintElementType({
            type: v13052
          });
        }, v13048.build = function (v13053, v13054) {
          var v13055 = v13048.formatterModule(v13054),
            v13056 = new PrintElementTypeHtmlProvider().createPrintElementTypeHtml(v13053, this.getElementTypeGroups(v13055));
          this.enableDrag(v13056);
        }, v13048.buildByHtml = function (v13057) {
          this.enableDrag(v13057);
        }, v13048.enableDrag = function (v13058) {
          v13058.hidraggable({
            revert: !0,
            proxy: function proxy(v13059) {
              var v13060 = PrintLib.instance.getDragingPrintElement(),
                v13062 = v13060.printElement.getProxyTarget(v13060.printElement.printElementType.getOptions());
              return v13062.appendTo("body"), v13062.css("z-index", "9999"), v13062;
            },
            moveUnit: "pt",
            minMove: 4,
            onBeforeDrag: function onBeforeDrag(v13063) {
              PrintLib.instance.draging = !0;
              var tid = $(v13063.data.target).attr("tid");
              var v13065 = v13048.getElementType(tid, $(v13063.data.target).attr("ptype"));
              if (!v13065) {
                throw new Error(`${i18n.__('请检查 hiprint.init 的 provider 是否配置了')} [${tid}]`);
                return !1;
              }
              var ele = v13065.createPrintElement();
              if (!ele) {
                if (v13065.type == 'tableCustom') {
                  throw new Error(`${i18n.__("已移除'tableCustom',请替换使用'table'详情见更新记录")}`);
                  return !1;
                }
              }
              return PrintLib.instance.setDragingPrintElement(ele), !0;
            },
            onDrag: function onDrag(v13067, v13068, v13069) {
              PrintLib.instance.getDragingPrintElement().updatePosition(v13068, v13069);
            },
            onStopDrag: function onStopDrag(v13071) {
              PrintLib.instance.draging = !1;
            }
          });
        }, v13048.formatterModule = function (v13073) {
          return v13073 || "_default";
        }, v13048;
      }(),
      PrintElementTypeGroup = function () {
        return function (v13074, v13075) {
          var v13076 = this;
          this.name = v13074, this.printElementTypes = [], v13075.forEach(function (v13077) {
            v13076.printElementTypes.push(nt.createPrintElementType(v13077));
          });
        };
      }(),
      PrintPanelOption = function () {
        return function (v13078) {
          if (this.index = v13078.index, this.name = v13078.name, this.paperType = v13078.paperType, this.paperType) {
            var v13079 = PrintLib.instance[this.paperType];
            v13078.height ? (this.height = v13078.height, this.width = v13078.width) : (this.height = v13079.height, this.width = v13079.width);
          } else this.height = v13078.height, this.width = v13078.width;
  
          this.paperHeader = v13078.paperHeader || 0, this.paperFooter = v13078.paperFooter || hinnn.mm.toPt(this.height), this.printElements = v13078.printElements || [], this.paperNumberLeft = v13078.paperNumberLeft, this.paperNumberTop = v13078.paperNumberTop, this.paperNumberDisabled = v13078.paperNumberDisabled, this.paperNumberContinue = v13078.paperNumberContinue, this.paperNumberFormat = v13078.paperNumberFormat, this.panelPaperRule = v13078.panelPaperRule, this.panelPageRule = v13078.panelPageRule, this.rotate = v13078.rotate || void 0, this.firstPaperFooter = v13078.firstPaperFooter, this.evenPaperFooter = v13078.evenPaperFooter, this.oddPaperFooter = v13078.oddPaperFooter, this.lastPaperFooter = v13078.lastPaperFooter, this.topOffset = v13078.topOffset, this.fontFamily = v13078.fontFamily, this.leftOffset = v13078.leftOffset, this.orient = v13078.orient, this.scale = v13078.scale, this.watermarkOptions = v13078.watermarkOptions, this.panelLayoutOptions = v13078.panelLayoutOptions;
        };
      }(),
      MouseRect = function () {
        function v13086(v13082, v13083, v13084, v13085) {
          this.bx = v13082, this.by = v13083, this.ex = v13082, this.ey = v13083, this.startX = this.minX = v13082, this.startY = this.minY = v13083, this.maxX = v13082, this.maxY = v13083, this.lastLeft = v13084, this.lastTop = v13085;
        }
  
        return v13086.prototype.updateRect = function (v13087, v13088, v13089) {
          var scale = v13089.designPaper.scale || 1.0;
          this.ex = v13087;
          this.ey = v13088;
          this.minX = this.startX / scale < v13087 / scale ? this.startX / scale : v13087 / scale,
          this.minY = this.startY / scale < v13088 / scale ? this.startY / scale : v13088 / scale,
          this.maxX = this.startX / scale < v13087 / scale ? v13087 / scale : this.startX / scale,
          this.maxY = this.startY / scale < v13088 / scale ? v13088 / scale : this.startY / scale;
  
        }, v13086.prototype.updatePositionByMultipleSelect = function (v13090, v13091) {
          null != v13090 && (this.lastLeft = this.lastLeft + v13090), null != v13091 && (this.lastTop = this.lastTop + v13091), this.target.css({
            left: this.lastLeft + "pt",
            top: this.lastTop + "pt"
          });
        }, v13086;
      }(),
      PrintPanel = function () {
        function v13094(v13092, v13093) {
          this.templateId = v13093, this.index = v13092.index, this.name = v13092.name, this.width = v13092.width, this.height = v13092.height, this.paperType = v13092.paperType, this.paperHeader = v13092.paperHeader, this.paperFooter = v13092.paperFooter, this.initPrintElements(v13092.printElements), this.paperNumberLeft = v13092.paperNumberLeft, this.paperNumberTop = v13092.paperNumberTop, this.paperNumberDisabled = v13092.paperNumberDisabled, this.paperNumberContinue = v13092.paperNumberContinue == void 0 ? true : v13092.paperNumberContinue, this.paperNumberFormat = v13092.paperNumberFormat, this.panelPaperRule = v13092.panelPaperRule, this.panelPageRule = v13092.panelPageRule, this.firstPaperFooter = v13092.firstPaperFooter, this.evenPaperFooter = v13092.evenPaperFooter, this.oddPaperFooter = v13092.oddPaperFooter, this.lastPaperFooter = v13092.lastPaperFooter, this.topOffset = v13092.topOffset, this.leftOffset = v13092.leftOffset, this.fontFamily = v13092.fontFamily, this.orient = v13092.orient, this.target = this.createTarget(), this.rotate = v13092.rotate, this.scale = v13092.scale, this.watermarkOptions = v13092.watermarkOptions || {}, this.panelLayoutOptions = v13092.panelLayoutOptions || {};
        }
  
        return v13094.prototype.design = function (v13095) {
          var v13096 = this;
          this.orderPrintElements(), this.designPaper = this.createNewPage(0), this.target.html(""), this.target.append(this.designPaper.getTarget()), this.droppablePaper(this.designPaper), this.designPaper.design(v13095), this.designPaper.subscribePaperBaseInfoChanged(function (v13097) {
            v13096.paperHeader = v13097.paperHeader, v13096.paperFooter = v13097.paperFooter, v13096.paperNumberLeft = v13097.paperNumberLeft, v13096.paperNumberTop = v13097.paperNumberTop, v13096.paperNumberDisabled = v13097.paperNumberDisabled, v13096.paperNumberFormat = v13097.paperNumberFormat;
          }), this.printElements.forEach(function (v13098) {
            v13096.appendDesignPrintElement(v13096.designPaper, v13098), v13098.design(v13095, v13096.designPaper);
          }), this.target.bind("click.hiprint", function (v13099) {
            let panelOptions = {
              panelPaperRule: v13096.panelPaperRule,
              panelPageRule: v13096.panelPageRule,
              firstPaperFooter: v13096.firstPaperFooter,
              evenPaperFooter: v13096.evenPaperFooter,
              oddPaperFooter: v13096.oddPaperFooter,
              lastPaperFooter: v13096.lastPaperFooter,
              leftOffset: v13096.leftOffset,
              topOffset: v13096.topOffset,
              panelLayoutOptions: v13096.panelLayoutOptions || {},
              fontFamily: v13096.fontFamily,
              orient: v13096.orient,
              paperNumberDisabled: v13096.paperNumberDisabled,
              paperNumberContinue: v13096.paperNumberContinue,
              paperNumberFormat: v13096.paperNumberFormat,
              watermarkOptions: v13096.watermarkOptions || {}
            };
            if (!PrintConfig.instance.paperNumberContinue) {
              delete panelOptions['paperNumberContinue'];
            }
            hinnn.event.trigger("BuildCustomOptionSettingEventKey_" + v13096.templateId, {
              options: panelOptions,
              callback: function callback(v13102) {
                v13096.panelLayoutOptions = v13102.panelLayoutOptions || {}, v13096.watermarkOptions = v13102.watermarkOptions || void 0, v13102.watermarkOptions && v13096.designPaper.createWaterMark(true, 1, v13102.watermarkOptions);
                v13096.panelPaperRule = v13102.panelPaperRule, v13096.panelPageRule = v13102.panelPageRule, v13096.firstPaperFooter = v13102.firstPaperFooter, v13096.evenPaperFooter = v13102.evenPaperFooter, v13096.oddPaperFooter = v13102.oddPaperFooter, v13096.lastPaperFooter = v13102.lastPaperFooter, v13096.leftOffset = v13102.leftOffset, v13096.topOffset = v13102.topOffset, v13096.fontFamily = v13102.fontFamily, v13096.orient = v13102.orient, v13096.paperNumberDisabled = v13096.designPaper.paperNumberDisabled = !!v13102.paperNumberDisabled || void 0, v13096.paperNumberContinue = v13096.designPaper.paperNumberContinue = v13102.paperNumberContinue, v13096.paperNumberFormat = v13102.paperNumberFormat, v13096.designPaper.paperNumberFormat = v13102.paperNumberFormat, v13102.paperNumberFormat && (v13096.designPaper.paperNumberTarget = v13096.designPaper.createPaperNumber(v13096.designPaper.formatPaperNumber(1, 1), true)), v13096.designPaper.setOffset(v13096.leftOffset, v13096.topOffset), v13096.css(v13096.target), v13096.designPaper.resetPaperNumber(v13096.designPaper.paperNumberTarget), v13096.designPaper.triggerOnPaperBaseInfoChanged();
              }
            });
          }), this.bindShortcutKeyEvent();
          this.bingPasteEvent();
          this.bindBatchMoveElement();
        }, v13094.prototype.update = function (v13103) {
          try {
            var start = Date.now();
            console.log('start', start);
            var v13104 = this;
            this.index = v13103.index, this.name = v13103.name, this.width = v13103.width, this.height = v13103.height, this.paperType = v13103.paperType, this.paperHeader = v13103.paperHeader, this.paperFooter = v13103.paperFooter;
            this.designPaper.width = hinnn.mm.toPt(v13103.width), this.designPaper.height = hinnn.mm.toPt(this.height), this.designPaper.paperType = this.paperType, this.designPaper.paperHeader = this.paperHeader, this.designPaper.paperFooter = this.paperFooter;
            this.designPaper.mmheight = v13103.height, this.designPaper.mmwidth = v13103.width;
            // 页眉线
            this.designPaper.headerLinetarget.css("top", (this.paperHeader || -1) + "pt"),
            0 == this.paperHeader && this.designPaper.headerLinetarget.addClass("hideheaderLinetarget");
            // 页脚线
            this.designPaper.footerLinetarget.css("top", parseInt(this.paperFooter.toString()) + "pt"),
            this.paperFooter == this.height && this.designPaper.footerLinetarget.css("top", v13103.height - PrintConfig.instance.paperHeightTrim + "mm");
            // 水印参数
            this.watermarkOptions = v13103.watermarkOptions || {};
            this.designPaper.createWaterMark(true, this.index, this.watermarkOptions);
            // 页码
            this.paperNumberLeft = v13103.paperNumberLeft, this.paperNumberTop = v13103.paperNumberTop, this.paperNumberDisabled = v13103.paperNumberDisabled, this.paperNumberContinue = v13103.paperNumberContinue, this.paperNumberFormat = v13103.paperNumberFormat;
            this.designPaper.paperNumberLeft = this.paperNumberLeft, this.designPaper.paperNumberTop = this.paperNumberTop, this.designPaper.paperNumberDisabled = this.paperNumberDisabled, this.designPaper.paperNumberContinue = this.paperNumberContinue, this.designPaper.paperNumberFormat = this.paperNumberFormat;
            this.designPaper.paperNumberTarget.css("top", this.paperNumberTop + "pt").css("left", this.paperNumberLeft + "pt"), this.designPaper.resetPaperNumber(this.designPaper.paperNumberTarget);
            // 字体方向
            this.fontFamily = v13103.fontFamily, this.orient = v13103.orient, this.rotate = v13103.rotate, this.scale = v13103.scale;
            this.designPaper.fontFamily = this.fontFamily, this.designPaper.orient = this.orient, this.designPaper.scale = v13104.designPaper.scale || this.scale;
            // 面板参数
            this.panelLayoutOptions = v13103.panelLayoutOptions, this.panelPaperRule = v13103.panelPaperRule, this.panelPageRule = v13103.panelPageRule, this.firstPaperFooter = v13103.firstPaperFooter, this.evenPaperFooter = v13103.evenPaperFooter,
            this.oddPaperFooter = v13103.oddPaperFooter, this.lastPaperFooter = v13103.lastPaperFooter, this.topOffset = v13103.topOffset, this.leftOffset = v13103.leftOffset;
            this.designPaper.setFooter(this.firstPaperFooter, this.evenPaperFooter, this.oddPaperFooter, this.lastPaperFooter),
            this.designPaper.setOffset(this.leftOffset, this.topOffset);
            var end = Date.now();
            console.log('更新参数 end', end);
            console.log('更新参数 time:', end - start);
            // 清空面板
            this.printElements.forEach(function (v13108) {
              v13108.designTarget && v13108.designTarget.length && v13108.designTarget.remove();
            }), this.printElements = [];
            var end = Date.now();
            console.log('清空面板 end', end);
            console.log('清空面板 time:', end - start);
            // 更新面板
            this.initPrintElements(v13103.printElements);
            var end = Date.now();
            console.log('初始化元素 end', end);
            console.log('初始化元素 time:', end - start);
            this.printElements.forEach(function (v13109) {
              v13104.appendDesignPrintElement(v13104.designPaper, v13109), v13109.design(v13103, v13104.designPaper);
            });
            var end = Date.now();
            console.log('插入面板 end', end);
            console.log('插入面板 time:', end - start);
          } catch (v13110) {
            console.log('???????');
            console.log(v13110);
          }
        }, v13094.prototype.bindShortcutKeyEvent = function () {
          var v13111 = this;
          $(document).keydown(function (v13112) {
            if ('INPUT' == v13112.target.tagName) return;
            // ctrl/command + z 撤销 / ctrl/command + shift + z 重做
            if ((v13112.ctrlKey || v13112.metaKey) && 90 == v13112.keyCode) {
              if (v13112.shiftKey) {
                hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + v13111.templateId, "redo");
              } else {
                hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + v13111.templateId, "undo");
              }
              v13112.preventDefault();
            }
          });
        }, v13094.prototype.bingPasteEvent = function () {
          var v13115 = this;
          v13115.designPaper.target.attr("tabindex", "1");
          v13115.designPaper.target.keydown(function (v13116) {
            // ctrl + v / command + v
            if ('INPUT' == v13116.target.tagName) return;
            if ((v13116.ctrlKey || v13116.metaKey) && 86 == v13116.keyCode) {
              v13115.pasteJson(v13116);
              v13116.preventDefault();
            }
          });
        }, v13094.prototype.pasteJson = function (v13117) {
          var copyArea = $('#copyArea');
          if (!copyArea.length) return;
          try {
            var json = copyArea.text();
            var objList = JSON.parse(json);
            let operationPasterPosition = null;
            let replacePosition = null;
            var left = null;
            var top = null;
            objList.forEach((obj, index) => {
              if (!obj.printElementType && !obj.templateId) return;
              // 复制使用当前模板内的元素 进行克隆
              // todo: 使用参数创建
              var v13118 = this,v13119 = obj.options,ele = v13118.getElementById(obj.id);
              if (!ele) return;
              var v13120 = ele.clone(obj);
              if (!v13120) return;
              // 判断是否是在元素上进行paste
              if (index === 0) {
                operationPasterPosition = {
                  x: obj.options.left,
                  y: obj.options.top
                };
                var useMouse = v13117.currentTarget.className != v13117.target.className;
                left = !useMouse && v13118.mouseOffsetX && hinnn.px.toPt(v13118.mouseOffsetX) || (v13119.left += 10);
                top = !useMouse && v13118.mouseOffsetY && hinnn.px.toPt(v13118.mouseOffsetY) || (v13119.top += 10);
                replacePosition = {
                  x: left,
                  y: top
                };
              } else {
                const position = {
                  x: obj.options.left,
                  y: obj.options.top
                };
                const incrementPosition = {
                  x: position.x - operationPasterPosition.x,
                  y: position.y - operationPasterPosition.y
                };
                left = replacePosition.x + incrementPosition.x;
                top = replacePosition.y + incrementPosition.y;
  
              }
              v13120.options.setLeft(left);
              v13120.options.setTop(top);
              v13120.setTemplateId(v13118.templateId), v13120.setPanel(v13118);
              v13118.appendDesignPrintElement(v13118.designPaper, v13120, !1);
              // 在复制的地方也重新给他算轮次
              const template = PrintLib.instance.getPrintTemplateById(v13118.templateId);
              if (v13120.options.field && template.qtDesigner) {
                v13120.options.qid = template.qtDesignderFunction(v13120.options.field);
              }
              v13118.printElements.push(v13120), v13120.design(void 0, v13118.designPaper);
              console.log('pasteJson success');
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v13118.templateId, "复制");
              // 点击克隆出来的元素
              v13120.designTarget.children('.resize-panel').trigger($.Event('click'));
            });
          } catch (v13141) {
            console.error('pasteJson error', v13141);
          }
        }, v13094.prototype.css = function (v13142) {
          if (this.fontFamily) v13142.css("fontFamily", this.fontFamily);else
          v13142[0].style.fontFamily = '';
        }, v13094.prototype.getConfig = function () {
          return PrintConfig.instance;
        }, v13094.prototype.getHtml = function (v13144, v13145, v13146, v13147, v13148) {
          var v13149 = this;
          this.orderPrintElements();
          let config = v13149.getConfig();
          var v13150,
            v13151 = v13146 || [],
            v13152 = v13147 || this,
            v13153 = void 0;
  
          if (v13147) {
            v13153 = v13151[v13151.length - 1];
            v13150 = v13153.getPanelTarget();
            v13153.updateReferenceElement(new PrintReferenceElement({
              top: this.paperHeader,
              left: 0,
              height: 0,
              width: 0,
              bottomInLastPaper: v13153.referenceElement.bottomInLastPaper,
              beginPrintPaperIndex: v13151.length - 1,
              printTopInPaper: v13153.referenceElement.bottomInLastPaper,
              endPrintPaperIndex: v13151.length - 1
            }));
          } else {
            v13150 = v13152.createTarget();
            v13153 = v13152.createNewPage(v13151.length);
            v13151.push(v13153);
            v13150.append(v13153.getTarget());
          }
          this.printElements.filter(function (v13155) {
            return !v13155.isFixed() && !v13155.isHeaderOrFooter();
          }).forEach(function (v13156) {
            var v13157 = [],
              v13158 = v13151[v13151.length - 1];
            if (v13158.referenceElement.isPositionLeftOrRight(v13156.options.getTop())) {
              v13153 = v13151[v13158.referenceElement.beginPrintPaperIndex];
            } else {
              v13153 = v13151[v13158.referenceElement.endPrintPaperIndex];
            }
            v13157 = v13156.getHtml(v13153, v13144);
            v13157.forEach(function (v13159, v13160) {
              v13159.referenceElement && (v13159.referenceElement.endPrintPaperIndex = v13159.referenceElement.beginPrintPaperIndex + v13157.length - 1);
              if (v13160 > 0) {
                if (v13153.index < v13151.length - 1) {
                  v13153 = v13151[v13153.index + 1];
                } else {
                  v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement);
                  v13151.push(v13153);
                }
                v13150.append(v13153.getTarget());
              }
              // 元素隐藏时不添加到html内
              v13159.target && ("none" != v13156.options.showInPage && v13153.append(v13159.target), v13153.updatePrintLine(v13159.printLine), v13156.onRendered(v13153, v13159.target));
              v13160 == v13157.length - 1 && v13159.referenceElement && v13153.updateReferenceElement(v13159.referenceElement);
            });
          });
          v13148 && v13148.templates.forEach(function (v13161, v13162) {
            var v13163 = v13161.data || {},
              v13164 = v13161.options || {};
            v13161.template.printPanels.forEach(function (v13165) {
              v13165.getHtml(v13163, v13164, v13146, v13149);
            });
          });
          // config 是否开启页码续排
          if (config.paperNumberContinue) {
            // 面板是否页码续排
            if (v13149.paperNumberContinue) {
              hinnn._paperList = [...(hinnn._paperList || []), ...v13151];
            } else {
              hinnn._paperList = [...v13151];
            }
          }
          if (!v13147) {
            if (this.lastPaperFooter) v13151[v13151.length - 1].printLine > this.lastPaperFooter && (v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement), v13151.push(v13153), v13150.append(v13153.getTarget()));
            // 这里是处理奇偶页设置
            this.panelPaperRule && ("odd" == this.panelPaperRule && v13151.length % 2 == 0 && (v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement), v13151.push(v13153), v13150.append(v13153.getTarget())), "even" == this.panelPaperRule && v13151.length % 2 == 1 && (v13153 = v13152.createNewPage(v13151.length, v13153.referenceElement), v13151.push(v13153), v13150.append(v13153.getTarget())));
            v13151.forEach(function (v13166) {
              v13166.updatePaperNumber(v13166.index + 1, v13151.length, v13145.paperNumberToggleInEven), v13149.fillPaperHeaderAndFooter(v13166, v13144, v13151.length), v13145 && (null != v13145.leftOffset && v13166.setLeftOffset(v13145.leftOffset), null != v13145.topOffset && v13166.setTopOffset(v13145.topOffset));
            });
            v13150.prepend(this.getPrintStyle());
            // config 是否开启页码续排
            if (config.paperNumberContinue) {
              hinnn._paperList.forEach(function (v13167, index) {
                v13167.updatePaperNumber(index + 1, hinnn._paperList.length);
              });
            }
          }
  
          return v13150;
        }, v13094.prototype.resize = function (v13168, v13169, v13170, v13171) {
          this.width = v13169, this.height = v13170, this.paperType = v13168, this.rotate = v13171, this.designPaper.resize(v13169, v13170);
        }, v13094.prototype.rotatePaper = function () {
          null == this.rotate && (this.rotate = !1), this.rotate = !this.rotate, this.resize(this.paperType, this.height, this.width, this.rotate);
        }, v13094.prototype.zoom = function (v13172, v13173) {
          if (v13173) {
            this.scale = v13172;
          } else {
            this.scale = void 0;
          }
          this.designPaper.zoom(v13172);
        }, v13094.prototype.getTarget = function () {
          return this.target;
        }, v13094.prototype.enable = function () {
          this.target.removeClass("hipanel-disable");
        }, v13094.prototype.disable = function () {
          this.target.addClass("hipanel-disable");
        }, v13094.prototype.getPanelEntity = function (v13174) {
          var v13175 = [];
          return this.printElements.forEach(function (v13176) {
            v13175.push(v13176.getPrintElementEntity(v13174));
          }), new PrintPanelOption({
            index: this.index,
            name: this.name || this.index + 1,
            width: this.width,
            height: this.height,
            paperType: this.paperType,
            paperHeader: this.paperHeader,
            paperFooter: this.paperFooter,
            paperNumberDisabled: !!this.paperNumberDisabled || void 0,
            paperNumberContinue: this.paperNumberContinue == void 0 ? !0 : this.paperNumberContinue,
            paperNumberFormat: this.paperNumberFormat ? this.paperNumberFormat : void 0,
            panelPaperRule: this.panelPaperRule ? this.panelPaperRule : void 0,
            panelPageRule: this.panelPageRule ? this.panelPageRule : void 0,
            paperNumberLeft: this.paperNumberLeft,
            paperNumberTop: this.paperNumberTop,
            printElements: v13175,
            rotate: this.rotate,
            firstPaperFooter: this.firstPaperFooter,
            evenPaperFooter: this.evenPaperFooter,
            oddPaperFooter: this.oddPaperFooter,
            lastPaperFooter: this.lastPaperFooter,
            topOffset: this.topOffset,
            fontFamily: this.fontFamily,
            orient: this.orient,
            scale: this.scale,
            watermarkOptions: this.watermarkOptions ? this.watermarkOptions : void 0,
            leftOffset: this.leftOffset,
            panelLayoutOptions: this.panelLayoutOptions || {}
          });
        }, v13094.prototype.createTarget = function () {
          var v13177 = $('<div class="hiprint-printPanel panel-index-' + this.index + '"></div>');
          return this.css(v13177), v13177;
        }, v13094.prototype.droppablePaper = function (v13178) {
          var v13179 = this;
          v13178.getTarget().hidroppable({
            accept: ".ep-draggable-item",
            onDrop: function onDrop(v13180, v13181) {
              const template = PrintLib.instance.getPrintTemplateById(v13179.templateId);
              var v13183 = PrintLib.instance.getDragingPrintElement(),
                v13182 = v13183.printElement;
              var ptr = v13179.designPaper.scale || 1;
              var left = (v13183.left - hinnn.px.toPt(v13179.target.children(".hiprint-printPaper").offset().left)) / ptr,
                top = (v13183.top - hinnn.px.toPt(v13179.target.children(".hiprint-printPaper").offset().top)) / ptr;
              v13182.updateSizeAndPositionOptions(v13179.mathroundToporleft(left), v13179.mathroundToporleft(top));
              v13182.setTemplateId(v13179.templateId), v13182.setPanel(v13179), v13179.appendDesignPrintElement(v13179.designPaper, v13182, !0);
              // 如果说编辑器开启qtDesigner,那么就将唯一ID构建唯一ID生成逻辑代码
              if (v13182.options.field && template.qtDesigner) {
                v13182.options.qid = template.qtDesignderFunction(v13182.options.field);
              }
              v13179.printElements.push(v13182), v13182.design(void 0, v13178);
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v13179.templateId, "新增");
            }
          });
        }, v13094.prototype.initPrintElements = function (v13188) {
          var v13189 = this;
          this.printElements = [], v13188 && v13188.forEach(function (v13190) {
            var v13191;
  
            if (v13191 = v13190.printElementType ? nt.createPrintElementType(v13190.printElementType) : PrintElementTypeContext.instance.getElementType(v13190.tid)) {
              var v13192 = v13191.createPrintElement(v13190.options);
              v13192.setTemplateId(v13189.templateId), v13192.setPanel(v13189), v13189.printElements.push(v13192);
            } else console.log("miss " + JSON.stringify(v13188));
          });
        }, v13094.prototype.mathroundToporleft = function (v13193) {
          var v13194 = PrintConfig.instance.movingDistance;
          return Math.round(v13193 / v13194) * v13194;
        }, v13094.prototype.appendDesignPrintElement = function (v13196, v13197, v13198) {
          v13197.setCurrentTemplateData(void 0);
          var v13199 = v13197.getDesignTarget(v13196);
          v13199.addClass("design"), v13198 && v13197.initSizeByHtml(v13199), v13196.append(v13199);
        }, v13094.prototype.createNewPage = function (v13200, v13201) {
          var v13202 = new PrintPage(this.templateId, this.index, this.watermarkOptions, this.panelPageRule, this.scale, this.width, this.height, this.paperHeader, this.paperFooter, this.paperNumberLeft, this.paperNumberTop, this.paperNumberDisabled, this.paperNumberContinue, this.paperNumberFormat, v13200, v13201);
          return v13202.setFooter(this.firstPaperFooter, this.evenPaperFooter, this.oddPaperFooter, this.lastPaperFooter), v13202.setOffset(this.leftOffset, this.topOffset), v13202;
        }, v13094.prototype.orderPrintElements = function () {
          this.printElements = hinnn.orderBy(this.printElements, function (v13204) {
            return v13204.options.getLeft();
          }), this.printElements = hinnn.orderBy(this.printElements, function (v13206) {
            return v13206.options.getTop();
          });
        }, v13094.prototype.fillPaperHeaderAndFooter = function (v13207, v13208, v13209) {
          this.printElements.filter(function (v13210) {
            return v13210.isFixed() || v13210.isHeaderOrFooter();
          }).forEach(function (v13211) {
            if (v13211.isFixed(), v13211.showInPage(v13207.index, v13209)) {
              var v13212 = v13211.getHtml(v13207, v13208);
              v13212.length && v13207.append(v13212[0].target);
            }
          });
        }, v13094.prototype.clear = function () {
          this.printElements.forEach(function (v13213) {
            v13213.designTarget && v13213.designTarget.length && v13213.designTarget.remove();
          }), this.printElements = [];
          hinnn.event.trigger("hiprintTemplateDataChanged_" + this.templateId, "清空");
        }, v13094.prototype.insertPrintElementToPanel = function (v13215) {
          var v13216 = this.getPrintElementTypeByEntity(v13215);
  
          if (v13216) {
            var v13217 = v13216.createPrintElement(v13215.options);
            v13217.setTemplateId(this.templateId), v13217.setPanel(this), this.printElements.push(v13217);
          }
        }, v13094.prototype.addPrintText = function (v13218) {
          v13218.printElementType = v13218.printElementType || {}, v13218.printElementType.type = "text", this.insertPrintElementToPanel(v13218);
        }, v13094.prototype.addPrintHtml = function (v13219) {
          v13219.printElementType = v13219.printElementType || {}, v13219.printElementType.type = "html", this.insertPrintElementToPanel(v13219);
        }, v13094.prototype.addPrintTable = function (v13220) {
          if (v13220.printElementType = v13220.printElementType || {}, v13220.printElementType.type = "table", v13220.options && v13220.options.columns) {
            var v13221 = $.extend({}, v13220.options.columns);
            v13220.printElementType.columns = v13221.columns, v13221.columns = void 0;
          }
  
          this.insertPrintElementToPanel(v13220);
        }, v13094.prototype.addPrintImage = function (v13222) {
          v13222.printElementType = v13222.printElementType || {}, v13222.printElementType.type = "image", this.insertPrintElementToPanel(v13222);
        }, v13094.prototype.addPrintLongText = function (v13223) {
          v13223.printElementType = v13223.printElementType || {}, v13223.printElementType.type = "longText", this.insertPrintElementToPanel(v13223);
        }, v13094.prototype.addPrintVline = function (v13224) {
          v13224.printElementType = v13224.printElementType || {}, v13224.printElementType.type = "vline", this.insertPrintElementToPanel(v13224);
        }, v13094.prototype.addPrintHline = function (v13225) {
          v13225.printElementType = v13225.printElementType || {}, v13225.printElementType.type = "hline", this.insertPrintElementToPanel(v13225);
        }, v13094.prototype.addPrintRect = function (v13226) {
          v13226.printElementType = v13226.printElementType || {}, v13226.printElementType.type = "rect", this.insertPrintElementToPanel(v13226);
        }, v13094.prototype.addPrintOval = function (v13227) {
          v13227.printElementType = v13227.printElementType || {}, v13227.printElementType.type = "oval", this.insertPrintElementToPanel(v13227);
        }, v13094.prototype.getPrintElementTypeByEntity = function (v13228) {
          var v13229;
          return (v13229 = v13228.tid ? PrintElementTypeContext.instance.getElementType(v13228.tid) : nt.createPrintElementType(v13228.printElementType)) || console.log("miss " + JSON.stringify(v13228)), v13229;
        }, v13094.prototype.getPrintStyle = function () {
          let layoutStyle = '';
          if (this.panelLayoutOptions && this.panelLayoutOptions['layoutType'] === 'row') {
            layoutStyle = `
              <style>
              .hiprint-printTemplate{
                margin: -${(Number(this.panelLayoutOptions['layoutRowGap']) || 0) / 2}mm -${(Number(this.panelLayoutOptions['layoutColumnGap']) || 0) / 2}mm;
              }
                .hiprint-printTemplate .hiprint-printPanel {
                  display:inline-block;
                  padding: ${(Number(this.panelLayoutOptions['layoutRowGap']) || 0) / 2}mm ${(Number(this.panelLayoutOptions['layoutColumnGap']) || 0) / 2}mm;
                }
              </style>
            `;
          }
          return layoutStyle + " <style printStyle>\n        @page\n        {\n             border:0;\n             padding:0cm;\n             margin:0cm;\n             " + this.getPrintSizeStyle() + "\n        }\n        </style>\n";
        }, v13094.prototype.getPrintSizeStyle = function () {
          return this.paperType ? "size:" + this.paperType + " " + (this.height > this.width ? "portrait" : "landscape") + ";" : "size: " + this.width + "mm " + this.height + "mm " + (this.orient ? 1 == this.orient ? "portrait" : "landscape" : "") + ";";
        }, v13094.prototype.deletePrintElement = function (v13230) {
          var v13231 = this;
          this.printElements.filter(function (v13232, v13233) {
            v13232.id == v13230.id && (v13230.delete(), v13231.printElements.splice(v13233, 1));
          });
        }, v13094.prototype.getElementByTid = function (v13234) {
          return this.printElements.filter(function (v13235) {
            return v13235.printElementType.tid === v13234;
          }).map(function (v13236, v13237) {
            return v13236;
          });
        }, v13094.prototype.getElementByName = function (v13238) {
          return this.printElements.filter(function (v13239) {
            return v13239.options.name === v13238;
          }).map(function (v13240, v13241) {
            return v13240;
          });
        }, v13094.prototype.getElementById = function (v13242) {
          return this.printElements.find(function (v13243) {
            return v13243.id === v13242;
          });
        }, v13094.prototype.getFieldsInPanel = function () {
          var v13244 = [];
          return this.printElements.forEach(function (v13245) {
            v13245.options && v13245.options.field ? v13244.push(v13245.options.field) : v13245.printElementType.field && v13244.push(v13245.printElementType.field);
          }), v13244;
        }, v13094.prototype.getTestData = function () {
          var v13246 = {};
          return this.printElements.forEach(function (v13247) {
            if ("table" != v13247.printElementType.type) {
              v13247.options && v13247.options.field ? v13246[v13247.options.field] = v13247.options.testData : v13247.printElementType.field ? v13246[v13247.printElementType.field] = v13247.printElementType.data || v13247.options.testData : void 0;
            }
          }), v13246;
        }, v13094.prototype.bindBatchMoveElement = function () {
          var v13248 = this;
          this.designPaper.getTarget().on("mousemove", function (v13249) {
            if (v13249.target.className && _typeof(v13249.target.className) == "string" && v13249.target.className.includes("editing")) {
              return;
            }
            if (v13249.currentTarget.className == v13248.designPaper.target[0].className) {
              v13248.mouseOffsetX = v13249.offsetX, v13248.mouseOffsetY = v13249.offsetY;
            } else {
              v13248.mouseOffsetX = v13248.mouseOffsetY = void 0;
            }
            PrintLib.instance.draging || 1 === v13249.buttons && PrintLib.instance.rectDraging && v13248.mouseRect && (v13248.mouseRect.updateRect(v13249.pageX, v13249.pageY, v13248), v13248.updateRectPanel(v13248.mouseRect));
          }).on("mousedown", function (v13252) {
            PrintLib.instance.rectDraging = true;
            if (v13252.target.className && _typeof(v13252.target.className) == "string" && v13252.target.className.includes("editing")) {
              return;
            }
            PrintLib.instance.draging || (v13248.mouseRect && v13248.mouseRect.target && v13248.mouseRect.target.remove(), 1 === v13252.buttons && _typeof(v13252.target.className) == "string" && v13252.target.className.includes("hiprint-printPaper hidroppable design") && (v13248.mouseRect = new MouseRect(v13252.pageX, v13252.pageY, PrintLib.instance.dragLengthCNum(v13252.pageX - v13248.designPaper.getTarget().offset().left, PrintConfig.instance.movingDistance), PrintLib.instance.dragLengthCNum(v13252.pageY - v13248.designPaper.getTarget().offset().top, PrintConfig.instance.movingDistance))));
          }).on("mouseup", function (v13259) {
            PrintLib.instance.rectDraging = false;
          });
        }, v13094.prototype.getElementInRect = function (v13261) {
          var v13262 = [];
          return this.printElements.filter(function (v13263) {
            return v13263.options.draggable !== false;
          }).forEach(function (v13264) {
            v13264.inRect(v13261) && v13262.push(v13264);
          }), v13262;
        }, v13094.prototype.updateRectPanel = function (v13265) {
          var v13266 = this,
            v13267 = this.designPaper.getTarget();
          var ptr = this.designPaper.scale || 1;
          this.mouseRect.target || (this.mouseRect.target = $('<div tabindex="1" class="mouseRect" style="z-index:2;position: absolute;opacity:0.2;border: 1px dashed #000;background-color:#31676f;"><span></span></div>'), v13267.find(".hiprint-printPaper-content").append(this.mouseRect.target), this.bindKeyboardMoveEvent(this.mouseRect.target), this.mouseRect.target.hidraggable({
            onDrag: function onDrag(v13268, v13269, v13270) {
              v13266.mouseRect.lastLeft = v13266.mouseRect.lastLeft ? hinnn.px.toPt(v13266.mouseRect.target[0].offsetLeft) : v13269 / ptr, v13266.mouseRect.lastTop = v13266.mouseRect.lastTop ? hinnn.px.toPt(v13266.mouseRect.target[0].offsetTop) : v13270 / ptr,
              (v13266.mouseRect.mouseRectSelectedElement || []).forEach(function (v13273) {
                v13273.updatePositionByMultipleSelect(v13269 - v13266.mouseRect.lastLeft, v13270 - v13266.mouseRect.lastTop);
              }),
              v13266.mouseRect.lastLeft = v13269 / ptr,
              v13266.mouseRect.lastTop = v13270 / ptr,
              PrintLib.instance.changed = !0;
            },
            moveUnit: "pt",
            minMove: PrintConfig.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(v13276) {
              v13266.mouseRect.target.focus(), PrintLib.instance.draging = !0, v13266.mouseRect.mouseRectSelectedElement || (v13266.mouseRect.mouseRectSelectedElement = v13266.getElementInRect(v13266.mouseRect));
              v13266.mouseRect.target.css({
                transform: 'unset'
              });
            },
            getScale: function getScale() {
              return v13266.designPaper.scale || 1;
            },
            onStopDrag: function onStopDrag(v13278) {
              if (PrintLib.instance.changed) hinnn.event.trigger("hiprintTemplateDataChanged_" + v13267.templateId, "框选移动");
              PrintLib.instance.draging = !1;
              PrintLib.instance.changed = !1;
            }
          }));
          if (v13265.ex >= v13265.bx && v13265.ey >= v13265.by) {// 终点大于起点
            this.mouseRect.target.css({
              height: v13265.maxY - v13265.minY + "px",
              width: v13265.maxX - v13265.minX + "px",
              left: v13265.lastLeft / ptr + "pt",
              top: v13265.lastTop / ptr + "pt",
              transform: 'unset'
            });
          } else if (v13265.ex < v13265.bx && v13265.ey < v13265.by) {
            this.mouseRect.target.css({
              height: v13265.maxY - v13265.minY + "px",
              width: v13265.maxX - v13265.minX + "px",
              left: v13265.lastLeft / ptr + "pt",
              top: v13265.lastTop / ptr + "pt",
              transform: 'rotate(180deg)',
              'transform-origin': '0 0'
            });
            // 左下角
          } else if (v13265.ex < v13265.bx && v13265.ey > v13265.by) {
            this.mouseRect.target.css({
              height: v13265.maxY - v13265.minY + "px",
              width: v13265.maxX - v13265.minX + "px",
              left: v13265.lastLeft / ptr + "pt",
              top: v13265.lastTop / ptr + "pt",
              transform: 'rotateY(180deg)',
              'transform-origin': '0 0'
            });
          } else if (v13265.ex > v13265.bx && v13265.ey < v13265.by) {
            this.mouseRect.target.css({
              height: v13265.maxY - v13265.minY + "px",
              width: v13265.maxX - v13265.minX + "px",
              left: v13265.lastLeft / ptr + "pt",
              top: v13265.lastTop / ptr + "pt",
              transform: 'rotateX(180deg)',
              'transform-origin': '0 0'
            });
          }
          v13265.target.focus();
        }, v13094.prototype.bindKeyboardMoveEvent = function (v13283) {
          var v13284 = this;
          v13283.attr("tabindex", "1"), v13283.keydown(function (v13285) {
            v13284.mouseRect.mouseRectSelectedElement || (v13284.mouseRect.mouseRectSelectedElement = v13284.getElementInRect(v13284.mouseRect));
            var v13286 = v13284.mouseRect.mouseRectSelectedElement || [];
  
            switch (v13285.keyCode) {
              case 37:
                v13284.mouseRect.updatePositionByMultipleSelect(0 - PrintConfig.instance.movingDistance, 0), v13286.forEach(function (v13288) {
                  v13288.updatePositionByMultipleSelect(0 - PrintConfig.instance.movingDistance, 0);
                }), v13285.preventDefault();
                break;
  
              case 38:
                v13284.mouseRect.updatePositionByMultipleSelect(0, 0 - PrintConfig.instance.movingDistance), v13286.forEach(function (v13291) {
                  v13291.updatePositionByMultipleSelect(0, 0 - PrintConfig.instance.movingDistance);
                }), v13285.preventDefault();
                break;
  
              case 39:
                v13284.mouseRect.updatePositionByMultipleSelect(PrintConfig.instance.movingDistance, 0), v13286.forEach(function (v13294) {
                  v13294.updatePositionByMultipleSelect(PrintConfig.instance.movingDistance, 0);
                }), v13285.preventDefault();
                break;
  
              case 40:
                v13284.mouseRect.updatePositionByMultipleSelect(0, PrintConfig.instance.movingDistance), v13286.forEach(function (v13297) {
                  v13297.updatePositionByMultipleSelect(0, PrintConfig.instance.movingDistance);
                }), v13285.preventDefault();
            }
            if ([37, 38, 39, 40].includes(v13285.keyCode)) {
              hinnn.event.trigger("hiprintTemplateDataChanged_" + v13284.templateId, "框选移动");
            }
          });
        }, v13094;
      }(),
      st = function () {
        return function (v13300) {
          if (v13300) if (v13300.panels) {
            this.panels = [];
  
            for (var v13301 = 0; v13301 < v13300.panels.length; v13301++) {
              this.panels.push(new PrintPanelOption(v13300.panels[v13301]));
            }
          } else this.panels = [];
        };
      }(),

      ut = function () {
        function v13310(v13302, v13303) {
          var v13304 = this;
          this.printElementOptionSettingPanel = {}, this.printTemplate = v13302, this.settingContainer = $(v13303), hinnn.event.on(v13302.getPrintElementSelectEventKey(), function (v13306) {
            v13304.buildSetting(v13306);
          }), hinnn.event.on(v13302.getBuildCustomOptionSettingEventKey(), function (v13308) {
            v13304.buildSettingByCustomOptions(v13308);
          }), hinnn.event.on('clearSettingContainer', function () {
            v13304.clearSettingContainer();
          });
        }
  
        return v13310.prototype.init = function () {
        }, v13310.prototype.clearSettingContainer = function () {
          this.clearLastPrintElement(), this.settingContainer.html("");
        }, v13310.prototype.clearLastPrintElement = function () {
          if (this.lastPrintElement) {
            if (this.lastPrintElement._editing) {
              this.lastPrintElement.updateByContent(true);
            }
            if (this.lastPrintElement._printElementOptionTabs) {
              this.lastPrintElement._printElementOptionTabs.forEach(function (v13311) {
                v13311.list && v13311.list.forEach(function (v13312) {
                  v13312.destroy();
                });
              });
            }
            if (this.lastPrintElement._printElementOptionItems) {
              this.lastPrintElement._printElementOptionItems.forEach(function (v13313) {
                v13313.destroy();
              });
            }
          }
          this.lastPrintElement = void 0;
        }, v13310.prototype.buildSetting = function (v13314) {
          var v13315 = this,
            v13316 = this,
            v13317 = v13314.printElement,
            v13318 = v13314.customOptionsInput;
          var tabs = v13317.getPrintElementOptionTabs();
          v13315.clearSettingContainer();
          var v13319;
          if (tabs.length) {
            v13319 = $('<div class="prop-tabs"><ul class="prop-tab-items"></ul></div>');
            tabs.forEach(function (tab) {
              var item = $('<li class="prop-tab-item"><span class="tab-title">' + i18n.__(tab.name) + '</span></li>');
              v13319.find('.prop-tab-items').append(item);
              var options = $('<div class="hiprint-option-items" data-title="' + i18n.__(tab.name) + '"></div>');
              tab.list.forEach(function (v13320) {
                v13320.submit = function (v13321) {
                  v13317.submitOption();
                };
                var v13322 = v13320.createTarget(v13317, v13317.options, v13317.printElementType);
                v13315.printElementOptionSettingPanel[v13320.name] = v13322, options.append(v13322);
                // 貌似只有这两个才需要多个参数
                if (['columns', 'dataType'].includes(v13320.name)) {
                  v13320.setValue(v13317.options[v13320.name], v13317.options, v13317.printElementType);
                } else {
                  // 传入所有参数
                  if (['coordinate', 'widthHeight'].includes(v13320.name)) {
                    v13320.setValue(v13317.options, v13317);
                  } else {
                    // options 没有就取 printElementType内的 (如 table 的 footerFormatter)
                    v13320.setValue(v13317.options[v13320.name] || v13317.printElementType[v13320.name]);
                  }
                }
                v13322.find("textarea").bind("dblclick.textarea", function (event) {
                  if (!$(this).val()) {
                    var placeholder = event.target.placeholder || "";
                    $(this).val(placeholder);
                  };
                });
              });
              if (tab.list.length == 0 && v13318 && v13318.length) {
                v13318.forEach(function (v13323) {
                  var n2 = v13323.callback;
                  v13323.callback = function (v13324) {
                    n2 && n2(v13324);
                  };
                  var tableColumn = v13323.optionItems;
                  v13323.title && options.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + v13323.title + "\n            </div>\n        </div>");
                  tableColumn.forEach(function (v13325) {
                    v13325.submit = function (v13326) {
                      v13323.callback(v13316.getValueByOptionItems(tableColumn));
                    }, options.append(v13325.createTarget(v13316.printTemplate, v13323.options, void 0)),
                    v13325.setValue(v13323.options[v13325.name], v13323.options, void 0);
                  });
                  options.find('.auto-submit').change(function () {
                    v13323.callback(v13316.getValueByOptionItems(tableColumn));
                  });
                  options.find('.auto-submit:input').bind('keydown.submitOption', function (v13327) {
                    13 === v13327.keyCode && v13323.callback(v13316.getValueByOptionItems(tableColumn));
                  });
                  options.find("textarea").bind("dblclick.textarea", function (event) {
                    if (!$(this).val()) {
                      var placeholder = event.target.placeholder || "";
                      $(this).val(placeholder);
                    };
                  });
                });
              }
              v13319.append(options);
            });
          } else {
            v13319 = $('<div class="hiprint-option-items"></div>');
            v13317.getPrintElementOptionItems().forEach(function (v13328) {
              v13328.submit = function (v13329) {
                v13317.submitOption();
              };
  
              var v13330 = v13328.createTarget(v13317, v13317.options, v13317.printElementType);
              v13315.printElementOptionSettingPanel[v13328.name] = v13330, v13319.append(v13330);
              // 貌似只有这两个才需要多个参数
              if (['columns', 'dataType'].includes(v13328.name)) {
                v13328.setValue(v13317.options[v13328.name], v13317.options, v13317.printElementType);
              } else {
                // 传入所有参数
                if (['coordinate', 'widthHeight'].includes(v13328.name)) {
                  v13328.setValue(v13317.options, v13317);
                } else {
                  // options 没有就取 printElementType内的 (如 table 的 footerFormatter)
                  v13328.setValue(v13317.options[v13328.name] || v13317.printElementType[v13328.name]);
                }
              }
            });
          }
          var v13331 = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">${i18n.__('确定')}</button>`),
            v13332 = $(`<button  class="hiprint-option-item-settingBtn hiprint-option-item-deleteBtn"\n        type="button">${i18n.__('删除')}</button>`);
          v13319.append(v13331);
          v13317.options.draggable != false && v13319.append(v13332); // draggable 为 false 时不显示参数面板 删除 按钮
          if (tabs.length) {
            v13319.on('click', '.prop-tab-item', function () {
              var $li = $(this);
              var index = $li.index();
              // 上次点击tab的index
              v13315.settingContainer.data('last-index', index);
              $li.addClass('active');
              $li.siblings().removeClass('active');
              var options = v13319.find('.hiprint-option-items:eq(' + index + ')');
              options.addClass('active');
              options.siblings().removeClass('active');
            });
            var lastIndex = +(v13315.settingContainer.data('last-index') || 0);
            if (lastIndex >= tabs.length) {
              lastIndex = 0;
            }
            v13319.find('.prop-tab-item:eq(' + lastIndex + ')').click();
          }
          v13331.bind("click.submitOption", function () {
            v13317.submitOption();
          }), v13332.bind("click.deleteBtn", function () {
            hinnn.event.trigger("hiprintTemplateDataChanged_" + v13317.templateId, "删除");
            v13316.printTemplate.deletePrintElement(v13317);
            v13315.clearSettingContainer();
          }), v13319.find(".auto-submit").change(function (v13333) {
            v13317.submitOption();
          }), v13319.find(".auto-submit:input").bind("keydown.submitOption", function (v13334) {
            13 == v13334.keyCode && v13317.submitOption();
          }), this.settingContainer.append(v13319), tabs.length < 1 && v13318 && v13318.forEach(function (v13335) {
            var v13336 = v13335.callback;
            v13335.callback = function (v13337) {
              v13336 && (v13336(v13337), v13317.submitOption());
            }, v13315.buildSettingByCustomOptions(v13335, v13315.settingContainer);
          }), this.lastPrintElement = v13317;
        }, v13310.prototype.buildSettingByCustomOptions = function (v13338, v13339) {
          var v13340 = this;
          this.clearLastPrintElement();
          var v13341 = v13339 || this.settingContainer;
          v13339 || this.settingContainer.html("");
          var v13342 = [],supportOptions = PrintConfig.instance.panel.supportOptions.filter(function (v13344) {
              return !v13344.hidden;
            }).map(function (v13345) {
              return v13345.name;
            });
          v13338.optionItems ? v13342 = v13338.optionItems : Object.keys(v13338.options).filter(function (v13346) {
            return supportOptions.includes(v13346);
          }).forEach(function (v13347) {
            var v13348 = PrintElementOptionItemManager.getItem(v13347);
            v13348 && v13342.push(v13348);
          });
          var v13350 = $('<div class="hiprint-option-items"></div>');
          v13338.title && v13350.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + v13338.title + "\n            </div>\n        </div>"), v13342.forEach(function (v13351) {
            v13351.submit = function (v13352) {
              v13338.callback(v13340.getValueByOptionItems(v13342));
            }, v13350.append(v13351.createTarget(v13340.printTemplate, v13338.options, void 0)), v13351.setValue(v13338.options[v13351.name], v13338.options, void 0);
          });
          var v13343 = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">${i18n.__('确定')}</button>`);
          v13350.append(v13343), v13343.bind("click.submitOption", function () {
            v13338.callback(v13340.getValueByOptionItems(v13342));
          }), v13350.find(".auto-submit").change(function (v13353) {
            v13338.callback(v13340.getValueByOptionItems(v13342));
          }), v13350.find(".auto-submit:input").bind("keydown.submitOption", function (v13354) {
            13 == v13354.keyCode && v13338.callback(v13340.getValueByOptionItems(v13342));
          }), v13341.append(v13350);
        }, v13310.prototype.getValueByOptionItems = function (v13355) {
          var v13356 = {};
          return v13355.forEach(function (v13357) {
            v13356[v13357.name] = v13357.getValue();
          }), v13356;
        }, v13310;
      }(),
      dt = function () {
        function v13360(v13358, v13359) {
          this.paginationContainer = v13358, this.jqPaginationContainer = $(this.paginationContainer), this.template = v13359;
        }
  
        return v13360.prototype.buildPagination = function (v13361) {
          var v13362 = this.template.getPaneltotal(),
            v13363 = this;
          this.jqPaginationContainer.html("");
  
          for (var v13364 = $('<ul class="hiprint-pagination"></ul>'), v13365 = function v13366() {
              var v13367 = v13368,
                name = v13363.template.printPanels[v13367].name || v13367 + 1,
                v13369 = $("<li><span>" + name + '</span><a href="javascript:void(0);">x</a></li>');
              v13369.find("span").click(function () {
                v13363.template.selectPanel(v13367), v13369.siblings().removeClass("selected"), $(this).parent("li").addClass("selected");
              }), v13369.find("a").click(function () {
                v13363.template.deletePanel(v13367), v13363.buildPagination();
              }), v13364.append(v13369);
            }, v13368 = 0; v13368 < v13362; v13368++) {
            v13365();
          }
  
          var v13370 = $("<li><span>+</span></li>");
          v13364.append(v13370), this.jqPaginationContainer.append(v13364), v13370.click(function () {
            var createPanel = function (v13371) {
              v13363.template.addPrintPanel(v13371 || void 0, !0), v13363.buildPagination();
              $('.hiprint-pagination li').removeClass('selected');
              $('.hiprint-pagination li:nth-last-child(2)').addClass('selected');
            };
            if (v13363.template.onPanelAddClick) {
              var panel = {
                index: v13363.template.printPanels.length,
                paperType: "A4"
              };
              v13363.template.onPanelAddClick(panel, createPanel);
            } else {
              createPanel();
            }
          });
        }, v13360.prototype.selectPanel = function (idx) {
          var v13372 = idx || this.template.editingPanel.index;
          var li = $('.hiprint-pagination li:nth(' + v13372 + ')');
          if (li.length) {
            li.siblings().removeClass('selected');
            li.addClass("selected");
          }
          hinnn.event.trigger("onSelectPanel", this.template.editingPanel, v13372, li);
        }, v13360;
      }(),
      PrintTemplate = function () {
        function v13381(v13373) {
          var v13374 = this;
          this.tempimageBase64 = {}, this.id = PrintLib.instance.guid(), PrintLib.instance.setPrintTemplateById(this.id, this);
          var v13377 = v13373 || {};
          this.printPanels = [];
          this.dataMode = v13377.dataMode || 1;
          this.history = v13377.history != void 0 ? v13377.history : !0;
          this.willOutOfBounds = v13377.willOutOfBounds != void 0 ? v13377.willOutOfBounds : !0;
          this.onDataChanged = v13377.onDataChanged;
          this.onUpdateError = v13377.onUpdateError;
          this.lastJson = v13377.template || {};
          this.historyList = [{ id: PrintLib.instance.guid(), type: '初始', json: this.lastJson }];
          this.historyPos = 0;
          this.defaultPanelName = v13377.defaultPanelName;
          this.designOptions = {};
          this.qtDesigner = v13377.qtDesigner != void 0 ? v13377.qtDesigner : !0;
          this.qtDesignerMap = {};
          this.qtDesignderFunction = function (field) {
            this.qtDesignerMap = {};
            const fieldTitle = field.split("_")[0];
            for (const item of this.editingPanel.printElements) {
              if (item.options.field === void 0) {
                continue;
              }
              const renderKey = item.options.field.split("_")[0];
              if (this.qtDesignerMap[renderKey] === void 0) {
                this.qtDesignerMap[renderKey] = 1;
              } else {
                this.qtDesignerMap[renderKey] += 1;
              }
            }
            if (this.qtDesignerMap[fieldTitle] === 0 || this.qtDesignerMap[fieldTitle] === void 0) {
              return fieldTitle;
            } else {
              return fieldTitle + "_" + this.qtDesignerMap[fieldTitle];
            }
          };
          var v13379 = new st(v13377.template || []);
          v13377.template && v13379.panels.forEach(function (v13380) {
            v13374.printPanels.push(new PrintPanel(v13380, v13374.id));
          }), v13377.fontList && (this.fontList = v13377.fontList), v13377.fields && (this.fields = v13377.fields), v13377.onImageChooseClick && (this.onImageChooseClick = v13377.onImageChooseClick),
          v13377.onPanelAddClick && (this.onPanelAddClick = v13377.onPanelAddClick),
          v13377.settingContainer && new ut(this, v13377.settingContainer), v13377.paginationContainer && (this.printPaginationCreator = new dt(v13377.paginationContainer, this), this.printPaginationCreator.buildPagination()), this.initAutoSave();
        }
  
        return v13381.prototype.design = function (v13382, v13383) {
          var v13384 = this;
  
          if (v13383 || (v13383 = {}), 0 == this.printPanels.length) {
            var v13385 = this.createDefaultPanel();
            this.printPanels.push(v13385);
          }
  
          if (!v13382) throw new Error("options.container can not be empty");
          v13384.designOptions = v13383;
          this.createContainer(v13382), this.printPanels.forEach(function (v13386, v13387) {
            v13384.container.append(v13386.getTarget()), v13387 > 0 && v13386.disable(), v13386.design(v13383);
          }), this.selectPanel(0);
        }, v13381.prototype.getSimpleHtml = function (v13388, v13389) {
          var v13390 = this;
          v13389 || (v13389 = {});
          var v13391 = $('<div class="hiprint-printTemplate"></div>');
          v13388 && v13388.constructor === Array ? v13388.forEach(function (data, dataIndex) {
            data && v13390.printPanels.forEach(function (v13392, v13393) {
              v13391.append(v13392.getHtml(data, v13389));
              // 批量打印 续排页码
              if (dataIndex == v13388.length - 1) {
                delete hinnn._paperList;
              }
            });
          }) : this.printPanels.forEach(function (panel, panelIndex) {
            v13391.append(panel.getHtml(v13388, v13389));
            // 多面板打印 续排页码
            if (panelIndex == v13390.printPanels.length - 1) {
              delete hinnn._paperList;
            }
          });
          return v13389 && v13389.imgToBase64 && this.transformImg(v13391.find("img")), v13391;
        }, v13381.prototype.getHtml = function (v13394, v13395) {
          return v13394 || (v13394 = {}), this.getSimpleHtml(v13394, v13395);
        }, v13381.prototype.getJointHtml = function (v13396, v13397, v13398) {
          var v13399 = $('<div class="hiprint-printTemplate"></div>'),
            v13400 = [];
          return this.printPanels.forEach(function (v13401, v13402) {
            v13399.append(v13401.getHtml(v13396, v13397, v13400, void 0, v13398));
          }), v13399;
        }, v13381.prototype.setPaper = function (v13403, v13404) {
          if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(v13403)) this.editingPanel.resize(void 0, parseFloat(v13403), parseFloat(v13404), !1);else {
            var v13405 = PrintLib.instance[v13403];
            if (!v13405) throw new Error("not found pagetype:" + (v13403 || ""));
            this.editingPanel.resize(v13403, v13405.width, v13405.height, !1);
          }
        }, v13381.prototype.rotatePaper = function () {
          this.editingPanel.rotatePaper();
        }, v13381.prototype.zoom = function (v13407, v13408) {
          this.editingPanel.zoom(v13407, v13408);
        }, v13381.prototype.addPrintPanel = function (v13409, v13410) {
          var v13411 = v13409 ? new PrintPanel(new PrintPanelOption(v13409), this.id) : this.createDefaultPanel();
          return v13409 && (v13409.index = this.printPanels.length), v13410 && (this.container.append(v13411.getTarget()), v13411.design(this.designOptions)), this.printPanels.push(v13411), v13410 && this.selectPanel(v13411.index), v13411;
        }, v13381.prototype.selectPanel = function (v13412) {
          var v13413 = this;
          if (v13412 > v13413.printPanels.length - 1) v13412 = v13413.printPanels.length - 1;
          this.printPanels.forEach(function (v13414, v13415) {
            v13412 == v13415 ? (v13414.enable(), v13413.editingPanel = v13414, v13413.printPaginationCreator && v13413.printPaginationCreator.selectPanel(v13412)) : v13414.disable();
          });
        }, v13381.prototype.deletePanel = function (v13416) {
          this.printPanels[v13416].clear(), this.printPanels[v13416].getTarget().remove(), this.printPanels.splice(v13416, 1);
        }, v13381.prototype.getPaneltotal = function () {
          return this.printPanels.length;
        }, v13381.prototype.createDefaultPanel = function () {
          return new PrintPanel(new PrintPanelOption({
            index: this.printPanels.length,
            name: this.defaultPanelName,
            paperType: "A4"
          }), this.id);
        }, v13381.prototype.createContainer = function (v13417) {
          v13417 ? (this.container = $(v13417), this.container.addClass("hiprint-printTemplate")) : this.container = $('<div class="hiprint-printTemplate"></div>');
        }, v13381.prototype.getJsonTid = function () {
          var v13418 = [];
          return this.printPanels.forEach(function (v13419) {
            v13419.getPanelEntity().printElements.length && v13418.push(v13419.getPanelEntity());
          }), new st({
            panels: v13418
          });
        }, v13381.prototype.getJson = function () {
          var v13420 = [];
          return this.printPanels.forEach(function (v13421) {
            v13420.push(v13421.getPanelEntity(!0));
          }), new st({
            panels: v13420
          });
        }, v13381.prototype.undo = function (v13422) {
          hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "undo");
        }, v13381.prototype.redo = function (v13424) {
          hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "redo");
        }, v13381.prototype.getPrintElementSelectEventKey = function () {
          return "PrintElementSelectEventKey_" + this.id;
        }, v13381.prototype.getBuildCustomOptionSettingEventKey = function () {
          return "BuildCustomOptionSettingEventKey_" + this.id;
        }, v13381.prototype.clear = function () {
          this.printPanels.forEach(function (v13426) {
            if (v13426.clear(), v13426.index > 0) {
              var v13427 = v13426.getTarget();
              v13427 && v13427.length && v13427.remove();
            }
          }), this.printPanels = [this.printPanels[0]], this.printPaginationCreator && this.printPaginationCreator.buildPagination();
        }, v13381.prototype.getPaperType = function (v13428) {
          return null == v13428 && (v13428 = 0), this.printPanels[0].paperType;
        }, v13381.prototype.getOrient = function (v13429) {
          return null == v13429 && (v13429 = 0), this.printPanels[v13429].height > this.printPanels[v13429].width ? 1 : 2;
        }, v13381.prototype.getPrintStyle = function (v13430) {
          return this.printPanels[v13430].getPrintStyle();
        }, v13381.prototype.print = function (v13431, v13432, v13433) {
          v13431 || (v13431 = {}), this.getHtml(v13431, v13432).hiwprint(v13433);
        }, v13381.prototype.print2 = function (v13434, v13435) {
          if (v13434 || (v13434 = {}), v13435 || (v13435 = {}), this.clientIsOpened()) {
            var v13436 = this,
              v13437 = 0,
              v13438 = {},
              v13439 = $('link[media=print][href*="print-lock.css"]'),
              css = '';
            if (v13435.styleHandler) {
              css += v13435.styleHandler();
            }
            if (v13439.length <= 0) {
              throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
              return;
            }
            v13439.each(function (v13440, v13441) {
              var v13442 = new XMLHttpRequest();
              v13442.open("GET", $(v13441).attr("href")), v13442.onreadystatechange = function () {
                if (4 === v13442.readyState && 200 === v13442.status && (v13438[v13440 + ""] = '<style rel="stylesheet" type="text/css">' + v13442.responseText + "</style>", ++v13437 == v13439.length)) {
                  for (var v13443 = "", v13444 = 0; v13444 < v13439.length; v13444++) {
                    v13443 += v13438[v13444 + ""];
                  }
                  if (css) v13443 = css + v13443;
                  v13436.sentToClient(v13443, v13434, v13435);
                }
              }, v13442.send();
            });
          } else alert(`${i18n.__('连接客户端失败')}`);
        }, v13381.prototype.imageToBase64 = function (v13445) {
          var v13446 = $(v13445).attr("src");
          if (-1 == v13446.indexOf("base64")) try {
            if (!this.tempimageBase64[v13446]) {
              var v13447 = document.createElement("canvas"),
                v13448 = new Image();
              v13448.src = v13445.attr("src"), v13447.width = v13448.width, v13447.height = v13448.height, v13447.getContext("2d").drawImage(v13448, 0, 0), v13446 && (this.tempimageBase64[v13446] = v13447.toDataURL("image/png"));
            }
  
            v13445.attr("src", this.tempimageBase64[v13446]);
          } catch (v13449) {
            try {
              this.xhrLoadImage(v13445);
            } catch (v13450) {
              console.log(v13450);
            }
          }
        }, v13381.prototype.xhrLoadImage = function (v13451) {
        }, v13381.prototype.sentToClient = function (v13452, v13453, v13454) {
          v13453 || (v13453 = {});
          var v13455 = $.extend({}, v13454 || {});
          v13455.imgToBase64 = !0;
          var v13456 = v13452 + this.getHtml(v13453, v13455)[0].outerHTML;
          v13455.id = PrintLib.instance.guid(), v13455.html = v13456, v13455.templateId = this.id, hiwebSocket.send(v13455);
        }, v13381.prototype.printByHtml = function (v13458) {
          $(v13458).hiwprint();
        }, v13381.prototype.printByHtml2 = function (v13459, v13460) {
          if (v13460 || (v13460 = {}), this.clientIsOpened()) {
            var v13461 = this,
              v13462 = 0,
              v13463 = {},
              v13464 = $('link[media=print][href*="print-lock.css"]');
            if (v13464.length <= 0) {
              throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
              return;
            }
            v13464.each(function (v13465, v13466) {
              var v13467 = new XMLHttpRequest();
              v13467.open("GET", $(v13466).attr("href")), v13467.onreadystatechange = function () {
                if (4 === v13467.readyState && 200 === v13467.status && (v13463[v13465 + ""] = '<style rel="stylesheet" type="text/css">' + v13467.responseText + "</style>", ++v13462 == v13464.length)) {
                  for (var v13468 = "", v13469 = 0; v13469 < v13464.length; v13469++) {
                    v13468 += v13463[v13469 + ""];
                  }
  
                  var v13470 = v13468 + $(v13459)[0].outerHTML,
                    v13471 = $.extend({}, v13460 || {});
                  v13471.id = PrintLib.instance.guid(), v13471.html = v13470, v13471.templateId = v13461.id, hiwebSocket.send(v13471);
                }
              }, v13467.send();
            });
          } else alert(`${i18n.__('连接客户端失败')}`);
        }, v13381.prototype.deletePrintElement = function (v13473) {
          this.printPanels.forEach(function (v13474) {
            v13474.deletePrintElement(v13473);
          });
        }, v13381.prototype.transformImg = function (v13475) {
          var v13476 = this;
          v13475.map(function (v13477, v13478) {
            v13476.imageToBase64($(v13478));
          });
        }, v13381.prototype.toPdf = function (v13479, v13480, options) {
          var v13481 = this;
          var dtd = $.Deferred();
          var isDownload = true;
          if (this.printPanels.length) {
            var v13482 = hinnn.mm.toPt(this.printPanels[0].width),
              v13483 = hinnn.mm.toPt(this.printPanels[0].height),
              v13485 = $.extend({
                scale: 2,
                width: hinnn.pt.toPx(v13482),
                x: 0,
                y: 0,
                useCORS: !0
              }, options || {}),
              v13489 = new jsPDF({
                orientation: 1 == this.getOrient(0) ? "portrait" : "landscape",
                unit: "pt",
                format: this.printPanels[0].paperType ? this.printPanels[0].paperType.toLocaleLowerCase() : [v13482, v13483]
              }),
              v13490 = this.getHtml(v13479, options);
            if (options && undefined != options.isDownload) {
              isDownload = options.isDownload;
            }
            this.createTempContainer();
            var v13491 = this.getTempContainer();
            this.svg2canvas(v13490), v13491.html(v13490[0]);
            var v13492 = v13491.find(".hiprint-printPanel .hiprint-printPaper").length;
            $(v13490).css("position:fixed"), html2canvas(v13490[0], v13485).then(function (v13493) {
              var v13494 = v13493.getContext("2d");
              v13494.mozImageSmoothingEnabled = !1, v13494.webkitImageSmoothingEnabled = !1, v13494.msImageSmoothingEnabled = !1, v13494.imageSmoothingEnabled = !1;
  
              for (var v13495 = v13493.toDataURL("image/jpeg"), v13496 = 0; v13496 < v13492; v13496++) {
                v13489.addImage(v13495, "JPEG", 0, 0 - v13496 * v13483, v13482, v13492 * v13483), v13496 < v13492 - 1 && v13489.addPage();
              }
              if (isDownload) {
                v13481.removeTempContainer(), v13480.indexOf(".pdf") > -1 ? v13489.save(v13480) : v13489.save(v13480 + ".pdf");
              } else {
                v13481.removeTempContainer();
                let type = options.type || 'blob';
                var pdfFile = v13489.output(type);
                dtd.resolve(pdfFile);
              }
            });
          }
          return dtd.promise();
        }, v13381.prototype.createTempContainer = function () {
          this.removeTempContainer(), $("body").prepend($('<div class="hiprint_temp_Container" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'));
        }, v13381.prototype.removeTempContainer = function () {
          $(".hiprint_temp_Container").remove();
        }, v13381.prototype.getTempContainer = function () {
          return $(".hiprint_temp_Container");
        }, v13381.prototype.svg2canvas = function (v13497) {
          var that = this;
          v13497.find("svg").each(function (v13498, v13499) {
            var v13500 = v13499.parentNode,v13501 = that.parentWidthHeight(v13500),
              v13502 = document.createElement("canvas");
            v13502.width = v13501.width, v13502.height = v13501.height;
            var ctx = v13502.getContext('2d'),
              str = new XMLSerializer().serializeToString(v13499);
            Canvg.fromString(ctx, str).render(), $(v13499).before(v13502), v13500.removeChild(v13499);
          });
        }, v13381.prototype.parentWidthHeight = function (v13503) {
          if (v13503.style.width.endsWith('%') || v13503.style.height.endsWith('%')) {
            if (v13503.className != 'hiprint-printPaper-content') {
              return this.parentWidthHeight(v13503.parentNode);
            }
            return { width: 10, height: 10 };
          } else {
            return { width: hinnn.pt.toPx(parseFloat(v13503.style.width)), height: hinnn.pt.toPx(parseFloat(v13503.style.height)) };
          }
        }, v13381.prototype.on = function (v13506, v13507) {
          hinnn.event.clear(v13506 + "_" + this.id);
          hinnn.event.on(v13506 + "_" + this.id, v13507);
        }, v13381.prototype.clientIsOpened = function () {
          return hiwebSocket.opened;
        }, v13381.prototype.getPrinterList = function () {
          var v13510 = hiwebSocket.getPrinterList();
          return v13510 || [];
        }, v13381.prototype.getElementByTid = function (v13511, v13512) {
          return null == v13512 && (v13512 = 0), this.printPanels[v13512].getElementByTid(v13511);
        }, v13381.prototype.getElementByName = function (v13513, v13514) {
          return null == v13514 && (v13514 = 0), this.printPanels[v13514].getElementByName(v13513);
        }, v13381.prototype.getPanel = function (v13515) {
          return null == v13515 && (v13515 = 0), this.printPanels[v13515];
        }, v13381.prototype.loadAllImages = function (v13516, v13517, v13518) {
          var v13519 = this;
          null == v13518 && (v13518 = 0);
  
          for (var v13520 = v13516[0].getElementsByTagName("img"), v13521 = !0, v13522 = 0; v13522 < v13520.length; v13522++) {
            var v13523 = v13520[v13522];
            v13523.src && v13523.src !== window.location.href && -1 == v13523.src.indexOf("base64") && (v13523 && void 0 !== v13523.naturalWidth && 0 !== v13523.naturalWidth && v13523.complete || (v13521 = !1));
          }
  
          v13518++, !v13521 && v13518 < 10 ? setTimeout(function () {
            v13519.loadAllImages(v13516, v13517, v13518);
          }, 500) : v13517();
        }, v13381.prototype.setFontList = function (v13524) {
          this.fontList = v13524;
        }, v13381.prototype.getFontList = function () {
          return this.fontList;
        }, v13381.prototype.setFields = function (v13525) {
          this.fields = v13525;
        }, v13381.prototype.getFields = function () {
          return this.fields;
        }, v13381.prototype.setOnImageChooseClick = function (v13526) {
          this.onImageChooseClick = v13526;
        }, v13381.prototype.getOnImageChooseClick = function () {
          return this.onImageChooseClick;
        }, v13381.prototype.getFieldsInPanel = function () {
          var v13527 = [];
          return this.printPanels.forEach(function (v13528) {
            v13527 = v13527.concat(v13528.getFieldsInPanel());
          }), v13527;
        }, v13381.prototype.getTestData = function () {
          var v13529 = {};
          return this.printPanels.forEach(function (v13530) {
            v13529 = Object.assign(v13529, v13530.getTestData());
          }), v13529;
        }, v13381.prototype.update = function (v13531, idx) {
          var v13532 = this;
          try {
            if (v13531 && "object" == _typeof(v13531) && v13531.panels.length > 0) {
              var curLen = v13532.printPanels.length - 1;
              v13531.panels.forEach(function (panel, index) {
                if (index > curLen) {
                  v13532.printPanels.push(new PrintPanel(panel, v13532.id));
                  var v13533 = v13532.printPanels[index];
                  v13532.container.append(v13533.getTarget()), index > 0 && v13533.disable(), v13533.design(v13532.designOptions);
                  v13532.printPaginationCreator && v13532.printPaginationCreator.buildPagination();
                }
                var temp = new PrintPanelOption(panel);
                v13532.editingPanel = v13532.printPanels[index];
                v13532.editingPanel.update(temp);
              });
              v13532.selectPanel(idx || 0);
            }
          } catch (er) {
            console.log(er);
            v13532.onUpdateError && v13532.onUpdateError(er);
          }
        }, v13381.prototype.getSelectEls = function () {
          var v13534 = this;
          var elements = [];
          // 获取选区元素
          if (v13534.editingPanel.mouseRect && v13534.editingPanel.mouseRect.target && $(".mouseRect").length) {
            elements = v13534.editingPanel.getElementInRect(v13534.editingPanel.mouseRect);
          } else {// 获取多选元素
            elements = v13534.editingPanel.printElements.filter(function (el) {
              return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
            });
          }
          return elements;
        },
        v13381.prototype.selectElementsByField = function (fieldsArray) {
          var hiPrintEntity = this;
          var v13535 = $;
          hiPrintEntity.editingPanel.printElements.forEach((v13536, index) => {
            if (fieldsArray && fieldsArray.includes(v13536.options.field)) {
              let designTarget = v13536.designTarget;
              designTarget.children("div[panelindex]").addClass("selected");
              designTarget.children().last().css({
                display: "block"
              });
              designTarget = designTarget[0];
              v13535.data(designTarget, "hidraggable").options.onBeforeSelectAllDrag.call(designTarget, {});
            }
          });
        },
        v13381.prototype.selectAllElements = function () {
          var hiPrintEntity = this;
          var v13537 = $;
          hiPrintEntity.editingPanel.printElements.forEach((v13538, index) => {
            let designTarget = v13538.designTarget;
            designTarget.children("div[panelindex]").addClass("selected");
            designTarget.children().last().css({
              display: "block"
            });
            designTarget = designTarget[0];
            v13537.data(designTarget, "hidraggable").options.
            onBeforeSelectAllDrag.
            call(designTarget, {});
          });
        },
        v13381.prototype.updateOption = function (option, v13539) {// 批量更新参数
          var elements = this.getSelectEls();
          if (elements && elements.length) {
            elements.forEach(function (v13540) {
              v13540.updateOption(option, v13539, true);
            });
            hinnn.event.trigger("hiprintTemplateDataChanged_" + this.id, "批量修改");
          }
        }, v13381.prototype.setElsAlign = function (v13542) {// 设置框选、多选元素对齐api
          var v13543 = this;
          var elements = this.getSelectEls();
          if (elements.length) {
            var minLeft = Math.min.apply(null, elements.map(function (el) {return el.options.left;}));
            var maxRight = Math.max.apply(null, elements.map(function (el) {return el.options.left + el.options.width;}));
            var minTop = Math.min.apply(null, elements.map(function (el) {return el.options.top;}));
            var maxBottom = Math.max.apply(null, elements.map(function (el) {return el.options.top + el.options.height;}));
            switch (v13542) {
              case "left": // 左对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(minLeft);
                  el.designTarget.css("left", el.options.displayLeft());
                });
                break;
              case "vertical": // 居中
                var vertical = minLeft + (maxRight - minLeft) / 2;
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(vertical - el.options.width / 2);
                  el.designTarget.css("left", el.options.displayLeft());
                });
                break;
              case "right": // 右对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(maxRight - el.options.width);
                  el.designTarget.css("left", el.options.displayLeft());
                });
                break;
              case "top": // 顶部对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(undefined, minTop);
                  el.designTarget.css("top", el.options.displayTop());
                });
                break;
              case "horizontal": // 垂直居中
                var horizontal = minTop + (maxBottom - minTop) / 2;
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(undefined, horizontal - el.options.height / 2);
                  el.designTarget.css("top", el.options.displayTop());
                });
                break;
              case "bottom": //底部对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(undefined, maxBottom - el.options.height);
                  el.designTarget.css("top", el.options.displayTop());
                });
                break;
              case "distributeHor": // 横向分散
                var sumWidth = [].reduce.call(elements, function (total, el) {
                  return total + el.options.width;
                }, 0);
                var distributeHor = (maxRight - minLeft - sumWidth) / (elements.length - 1);
                elements.sort(function (prev, curr) {
                  return prev.options.left - curr.options.left;
                });
                elements.forEach(function (el, index) {
                  if (![0, elements.length - 1].includes(index)) {
                    el.updateSizeAndPositionOptions(elements[index - 1].options.left + elements[index - 1].options.width + distributeHor);
                    el.designTarget.css("left", el.options.displayLeft());
                  }
                });
                break;
              case "distributeVer": // 纵向分散
                var sumHeight = [].reduce.call(elements, function (total, el) {
                  return total + el.options.height;
                }, 0);
                var distributeVer = (maxBottom - minTop - sumHeight) / (elements.length - 1);
                elements.sort(function (prev, curr) {
                  return prev.options.top - curr.options.top;
                });
                elements.forEach(function (el, index) {
                  if (![0, elements.length - 1].includes(index)) {
                    el.updateSizeAndPositionOptions(undefined, elements[index - 1].options.top + elements[index - 1].options.height + distributeVer);
                    el.designTarget.css("top", el.options.displayTop());
                  }
                });
                break;
            }
          }
        }, v13381.prototype.setElsSpace = function (dis, isHor) {
          var v13544 = this;
          var elements = this.getSelectEls();
          if (elements.length) {
            if (isHor) {// 水平距离 →
              elements.sort(function (prev, curr) {
                return prev.options.left - curr.options.left;
              });
              elements.forEach(function (el, index) {
                if (index > 0) {
                  el.updateSizeAndPositionOptions(elements[index - 1].options.left + elements[index - 1].options.width + dis);
                  el.designTarget.css("left", el.options.displayLeft());
                }
              });
            } else {// 垂直距离 ↓
              elements.sort(function (prev, curr) {
                return prev.options.top - curr.options.top;
              });
              elements.forEach(function (el, index) {
                if (index > 0) {
                  el.updateSizeAndPositionOptions(undefined, elements[index - 1].options.top + elements[index - 1].options.height + dis);
                  el.designTarget.css("top", el.options.displayTop());
                }
              });
            }
          }
        }, v13381.prototype.initAutoSave = function () {
          var v13545 = this;
          hinnn.event.on("hiprintTemplateDataShortcutKey_" + this.id, function (key) {
            if (!v13545.history) return;
            switch (key) {
              case "undo":
                if (v13545.historyPos > 0) {
                  v13545.historyPos -= 1;
                  var cur = v13545.historyList[v13545.historyPos];
                  v13545.update(cur.json);
                }
                break;
              case "redo":
                if (v13545.historyPos < v13545.historyList.length - 1) {
                  v13545.historyPos += 1;
                  var cur = v13545.historyList[v13545.historyPos];
                  v13545.update(cur.json);
                }
                break;
            }
          });
          hinnn.event.on("hiprintTemplateDataChanged_" + this.id, function (type) {
            if (v13545.history) {
              var v13548 = 1 == v13545.dataMode ? v13545.getJson() : v13545.getJsonTid();
              v13545.lastJson = v13548;
              if (v13545.historyPos < v13545.historyList.length - 1) {
                v13545.historyList = v13545.historyList.slice(0, v13545.historyPos + 1);
              }
              v13545.historyList.push({ id: PrintLib.instance.guid(), type: type, json: v13548 });
              if (v13545.historyList.length > 50) {
                v13545.historyList = v13545.historyList.slice(0, 1).concat(v13545.historyList.slice(1, 50));
              } else {
                v13545.historyPos += 1;
              }
              v13545.onDataChanged && v13545.onDataChanged(type, v13548);
            }
          });
        }, v13381;
      }();
  
    function print(v13550) {
      this.getHtml(v13550).hiwprint();
    }
  
    function print2(v13551, v13552, v13553) {
      $.extend({}, v13551 || {}).imgToBase64 = !0;
      var v13554 = new PrintTemplate({});
      v13554.on("printSuccess", v13552), v13554.on("printError", v13553), v13554.printByHtml2(this.getHtml(v13551), v13551.options);
    }
  
    function getHtml(v13555) {
      var v13556 = void 0;
      return v13555 && v13555.templates.forEach(function (v13557, v13558) {
        var v13559 = $.extend({}, v13557.options || {});
        v13555.imgToBase64 && (v13559.imgToBase64 = !0), v13556 ? v13556.append(v13557.template.getHtml(v13557.data, v13559).html()) : v13556 = v13557.template.getHtml(v13557.data, v13559);
      }), v13556;
    }
  
    function init(v13560) {
      PrintConfig.instance.init(v13560), PrintConfig.instance.providers && PrintConfig.instance.providers.forEach(function (v13564) {
        v13564.addElementTypes(PrintElementTypeContext.instance);
      });
      if (window.autoConnect && (PrintConfig.instance.host != hiwebSocket.host || PrintConfig.instance.token != hiwebSocket.token)) {
        hiwebSocket.stop();
        PrintConfig.instance.host && (hiwebSocket.host = PrintConfig.instance.host);
        PrintConfig.instance.token && (hiwebSocket.token = PrintConfig.instance.token);
        hiwebSocket.start();
      }
      if (PrintConfig.instance.lang && Object.keys(languages).includes(PrintConfig.instance.lang)) {
        i18n.lang = PrintConfig.instance.lang;
      } else {
        i18n.lang = 'cn';
      }
    }
  
    function setConfig(v13574) {
      if (v13574) {
        v13574 && Object.keys(v13574).forEach(function (v13575) {
          if (v13575 == "optionItems" && v13574.optionItems && v13574.optionItems.length) {
            PrintConfig.instance.registerItems(v13574.optionItems);
          } else
          if (v13574[v13575].tabs && v13574[v13575].tabs.length) {
            v13574[v13575].tabs.forEach(function (tab, idx) {
              if (tab.replace) {
                $.extend(PrintConfig.instance[v13575].tabs[idx], tab);
              } else {
                var options = tab.options,list = PrintConfig.instance[v13575].tabs[idx].options;
                options.forEach(function (v13579) {
                  var idx = list.findIndex(function (v13580) {
                    return v13580.name == v13579.name;
                  });
                  if (idx > -1) list[idx].hidden = v13579.hidden;else
                  {
                    if (v13579.after) {
                      idx = list.findIndex(function (v13581) {
                        return v13581.name == v13579.after;
                      });
                      if (idx > -1) list.splice(idx + 1, 0, v13579);
                    } else list.push(v13579);
                  }
                });
                $.extend(PrintConfig.instance[v13575].tabs[idx], {
                  name: tab.name,
                  options: list
                });
              }
            });
            delete v13574[v13575].tabs;
          } else
          if (v13574[v13575].supportOptions) {
            var options = v13574[v13575].supportOptions,list = PrintConfig.instance[v13575].supportOptions;
            options.forEach(function (v13584) {
              var idx = list.findIndex(function (v13585) {
                return v13585.name == v13584.name;
              });
              if (idx > -1) list[idx].hidden = v13584.hidden;else
              {
                if (v13584.after) {
                  idx = list.findIndex(function (v13586) {
                    return v13586.name == v13584.after;
                  });
                  if (idx > -1) list.splice(idx + 1, 0, v13584);
                } else list.push(v13584);
              }
            });
            $.extend(PrintConfig.instance[v13575].supportOptions, list);
            delete v13574[v13575].supportOptions;
          } else {
            var keyMap = {};
            keyMap[v13575] = v13574[v13575];
            $.extend(PrintConfig.instance, keyMap);
          }
        });
      } else {
        $.extend(PrintConfig.instance, HIPRINT_CONFIG);
      }
    }
  
    function updateElementType(v13590, v13591) {
      return PrintElementTypeContext.instance.updateElementType(v13590, v13591);
    }
  
    function refreshPrinterList(v13592) {
      PrintConfig.instance.clear("printerList");
      PrintConfig.instance.on("printerList", v13592);
      hiwebSocket.refreshPrinterList();
    }
  
    function getClients(v13595) {
      PrintConfig.instance.clear("clients");
      PrintConfig.instance.on("clients", v13595);
      hiwebSocket.getClients();
    }
  
    function getClientInfo(v13598) {
      PrintConfig.instance.clear("clientInfo");
      PrintConfig.instance.on("getClientInfo", v13598);
      hiwebSocket.getClientInfo();
    }
  
    function getAddress(type, v13601, ...args) {
      PrintConfig.instance.clear("address_" + type);
      PrintConfig.instance.on("address_" + type, v13601);
      hiwebSocket.getAddress(type, ...args);
    }
  
    function ippPrint(options, callback, connected) {
      PrintConfig.instance.clear("ippPrinterCallback");
      PrintConfig.instance.on("ippPrinterCallback", callback);
      PrintConfig.instance.clear("ippPrinterConnected");
      PrintConfig.instance.on("ippPrinterConnected", connected);
      hiwebSocket.ippPrint(options);
    }
  
    function ippRequest(options, callback) {
      PrintConfig.instance.clear("ippRequestCallback");
      PrintConfig.instance.on("ippRequestCallback", callback);
      hiwebSocket.ippRequest(options);
    }

    //放这里不合适后续要移除了
    $(document).ready(function () {
      console.log('document ready');
      console.log(window.autoConnect);
      if (hiwebSocket.hasIo() && window.autoConnect) {
        hiwebSocket.start();
      }
    });

    export default {
      init: init,
      setConfig: setConfig,
      updateElementType: updateElementType,
      hiwebSocket: hiwebSocket,
      refreshPrinterList: refreshPrinterList,
      getClients: getClients,
      getClientInfo: getClientInfo,
      getAddress: getAddress,
      ippPrint: ippPrint,
      ippRequest: ippRequest,
      PrintElementTypeManager: PrintElementTypeManager,
      PrintElementTypeGroup: PrintElementTypeGroup,
      PrintTemplate: PrintTemplate,
      print: print,
      print2: print2,
      getHtml: getHtml
    };