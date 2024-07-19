"use strict";

/**
 * import 相关资源
 */
import {jQuery,_typeof} from "../hiprint.comm.js";

    var v12085, v12086, v12087;
    v12085 = jQuery, v12086 = {
      maxPanelIndex: 0
    }, (v12087 = function v12088(v12089) {
      this.options = v12085.data(v12089.target, "hireizeable").options, this.init(v12089.target);
    }).prototype = {
      numHandlerText: function numHandlerText(v12090) {
        return this.numHandler(v12090) + "pt";
      },
      numHandler: function numHandler(v12091) {
        var v12092 = 1.5,
          v12093 = .75 * v12091;
        return this.options.minResize && (v12092 = this.options.minResize), Math.round(v12093 / v12092) * v12092;
      },
      init: function init(v12094) {
        this.initResizeBox(v12094);
      },
      initResizeBox: function initResizeBox(v12095) {
        var v12096 = this;
        v12085(v12095).each(function () {
          var v12097;
          v12086.maxPanelIndex += 1, v12096.options.noContainer ? v12097 = v12085(v12095) : (v12097 = v12085("<div panelIndex=" + v12086.maxPanelIndex + ' class="resize-panel"></div>')).css({
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            "background-color": "rgba(0,0,0,0.5)",
            cursor: "move",
            display: "none"
          }), v12096.appendHandler(v12097, v12085(this));
  
          var v12098 = {
              name: "n",
              target: v12085('<div class="n resizebtn" style="cursor: n-resize;top: -12px;margin-left: -4px;left: 50%;"></div>')
            },
            v12099 = {
              name: "s",
              target: v12085('<div class="s resizebtn" style="cursor: s-resize;bottom: -12px;margin-left: -4px;left: 50%;"></div>')
            },
            v12100 = {
              name: "w",
              target: v12085('<div class="w resizebtn" style="cursor: w-resize;left: -12px;margin-top: -4px;top: 50%;"></div>')
            },
            v12101 = {
              name: "e",
              target: v12085('<div class="e resizebtn" style="cursor: e-resize; top: 50%; margin-top:-4px;right: -12px;"></div>')
            },
            v12102 = {
              name: "ne",
              target: v12085('<div class="ne resizebtn" style="cursor: ne-resize;top: -12px;right: -12px;"></div>')
            },
            v12103 = {
              name: "nw",
              target: v12085('<div class="nw resizebtn" style=" cursor: nw-resize;top: -12px;left:-12px;"></div>')
            },
            v12104 = {
              name: "se",
              target: v12085('<div class="se resizebtn" style="cursor: se-resize;bottom:-12px;right: -12px;"></div>')
            },
            v12105 = {
              name: "sw",
              target: v12085('<div class="sw resizebtn" style="cursor: sw-resize;bottom: -12px;left: -12px;"></div>')
            },
            v12098 = {
              name: "r",
              target: v12085('<div class="r resizebtn" style="cursor:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURUdwTP///9XV1R0dHf///3Nzc////////////////1ZWVq+vr/T09PX19QQEBP///////8XFxf///////////wYGBv///+jo6P///4aGhqioqMzMzP///2BgYP///////////zExMf///wAAAP///xLps0AAAAAjdFJOUwCxxOdixRDmzSDMv8/Z+tz5wWpXWPk3zALCv8KnyXZVMNuNPnv3CwAAAJ1JREFUKM/NkckOwyAMRFkDBMhC9qWr+//fWCIV1WlzrjoXS36yxmMT8hdqqKoUvRAjMtw22kvecem1GjTuK1vApmI+wQMBbQFy5li+QQRaX4AtRX+vbntAJeRl9HTTx4TiwESs61DXNUPmVQeujzVrQwh43TTxpeRBslVfMUhbiXKWyiAwvnIsMcdyJkfJYdpNvG/ltDm+bjP+8KFP8ggL+zQLGxwAAAAASUVORK5CYII=\') 14 14,alias;top: -16px;margin-left: -4px;left: 50%;"></div>')
            },
            sizeBox = v12085('<div class="size-box" style="position: absolute;left:-2px;"></div>'),
            deleteBtn = v12085('<div class="del-btn">✕</div>'),
            v12106 = function v12107() {
              var v12108 = [],
                v12109 = v12096.options.showPoints;
              return v12085.each([v12098, v12099, v12100, v12101, v12102, v12103, v12104, v12105], function (v12110, v12111) {
                v12085.inArray(v12111.name, v12109) > -1 && v12108.push(v12111.target);
              }), v12108;
            };
          v12096.refreshSizeBox(void 0, sizeBox, v12097);
          // draggable 为 false 时不显示 resizebox 右上角删除按钮
          if (v12096.options.draggable != false) {
            v12097.append(deleteBtn);
            v12097.on("mousedown", ".del-btn", () => {
              var keyboardEvent = new KeyboardEvent("keydown", { bubbles: true, keyCode: 46 });
              v12095.dispatchEvent(keyboardEvent);
            });
          }
          v12096.addHandlerCss(v12106()), v12096.appendHandler(v12106(), v12097), v12096.bindResizeEvent(v12097, v12085(this));
          var v12112 = v12085(this);
          v12085(v12097).on("mousedown", ".resizebtn", function () {
            v12112.addClass("resizeing");
          }), v12085(".easyui-droppable").on("mouseup", function () {
            v12112.removeClass("resizeing");
          }), v12096.bindTrigger(v12085(this));
        }), v12096.bindHidePanel();
      },
      addHandlerCss: function addHandlerCss(v12113) {
        for (var v12114 = 0; v12114 < v12113.length; v12114++) {
          v12113[v12114].css({
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "#ff6600",
            "border-radius": "50%"
          });
        }
      },
      appendHandler: function appendHandler(v12115, v12116) {
        v12116.find(".resize-panel").remove();
        for (var v12117 = 0; v12117 < v12115.length; v12117++) {
          v12116.append(v12115[v12117]);
        }
      },
      refreshSizeBox: function refreshSizeBox(v12118, box, v12119) {
        if (!this.options.showSizeBox) return;
        if (box) {
          v12119.append(box);
        }
        var style, sizeBox;
        if (v12118 && v12118.length) {
          style = v12118[0].style;
          sizeBox = v12118.children("div[panelindex]").find(".size-box");
        } else if (v12119 && v12119.parent()) {
          var v12118 = v12119.parent();
          if (v12118.hasClass("hiprint-printPaper-content")) return;
          style = v12118[0].style;
          if (!style.width) {
            style.width = hinnn.px.toPt(v12118[0].offsetWidth) + "pt";
          }
          if (!style.height) {
            style.height = hinnn.px.toPt(v12118[0].offsetHeight) + "pt";
          }
          sizeBox = v12118.children("div[panelindex]").find(".size-box");
        }
        if (sizeBox) {
          sizeBox.text(style.width + ' x ' + style.height);
          sizeBox.css('top', -(sizeBox.outerHeight() || 20));
        }
      },
      triggerResize: function triggerResize(v12120, v12121) {
        // 处理按住 ctrl / command 点击元素 多选
        if (!(v12121.ctrlKey || v12121.metaKey)) {
          v12120.siblings().children("div[panelindex]").removeClass('selected');
          v12120.siblings().children("div[panelindex]").css({
            display: "none"
          });
        }
        v12120.children("div[panelindex]").addClass('selected');
        v12120.children("div[panelindex]").css({
          display: "block"
        });
        this.refreshSizeBox(v12120);
      },
      bindResizeEvent: function bindResizeEvent(v12122, v12123) {
        var v12124 = this,
          v12125 = 0,
          v12126 = 0,
          v12127 = v12122.width(),
          v12128 = v12122.height(),
          v12129 = v12122.offset().left,
          v12130 = v12122.offset().top,
          v12131 = v12124.options.noContainer ? v12085(v12123) : v12122.parent(),
          v12132 = !1; // 右
        v12122.on("mousedown", ".e", function (v12133) {
          v12125 = v12133.pageX, v12127 = v12122.width(), v12132 = !0;
        });
        var v12134 = !1; // 下
        v12122.on("mousedown", ".s", function (v12135) {
          v12126 = v12135.pageY, v12128 = v12122.height(), v12134 = !0;
        });
        var v12136 = !1; // 左
        v12122.on("mousedown", ".w", function (v12137) {
          v12125 = v12137.pageX, v12127 = v12122.width(), v12136 = !0, v12129 = v12131.offset().left;
        });
        var v12138 = !1; // 上
        v12122.on("mousedown", ".n", function (v12139) {
          v12126 = v12139.pageY, v12128 = v12122.height(), v12138 = !0, v12130 = v12131.offset().top;
        });
        var v12140 = !1; // 右上
        v12122.on("mousedown", ".ne", function (v12141) {
          v12125 = v12141.pageX, v12126 = v12141.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12140 = !0, v12130 = v12131.offset().top;
        });
        var v12142 = !1; // 左上
        v12122.on("mousedown", ".nw", function (v12143) {
          v12125 = v12143.pageX, v12126 = v12143.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12130 = v12131.offset().top, v12129 = v12131.offset().left, v12142 = !0;
        });
        var v12144 = !1; // 右下
        v12122.on("mousedown", ".se", function (v12145) {
          v12125 = v12145.pageX, v12126 = v12145.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12144 = !0;
        });
        var v12146 = !1; // 左下
        v12122.on("mousedown", ".sw", function (v12147) {
          v12125 = v12147.pageX, v12126 = v12147.pageY, v12127 = v12122.width(), v12128 = v12122.height(), v12146 = !0, v12129 = v12131.offset().left;
        });
        var rt = !1; // 旋转
        v12122.on("mousedown", ".r", function (v12148) {
          v12125 = v12148.pageX, v12126 = v12148.pageY, v12127 = v12122.width(), v12128 = v12122.height(), rt = !0, v12129 = v12127 / 2 + v12131.offset().left, v12130 = v12128 / 2 + v12131.offset().top;
        });
        v12122.on("dblclick", ".r", function (v12149) {
          v12131.css({ transform: "rotate(" + 0 + "deg)" });
          v12124.options.onResize(v12149, void 0, void 0, void 0, void 0, 0);
        });
        var v12150 = !1;
        v12122.on("mousedown", function (v12151) {
          v12124.options.onBeforeResize(), v12125 = v12151.pageX, v12126 = v12151.pageY, v12130 = v12131.offset().top, v12129 = v12131.offset().left, v12150 = !1;
        }), v12085(v12124.options.stage).on("mousemove", function (v12152) {
          if (v12132) {// 右
            var v12153 = (v12152.pageX - v12125) / v12124.options.getScale();
            v12122.css({
              width: "100%"
            }), v12131.css({
              width: v12124.numHandlerText(v12127 + v12153)
            }), v12124.options.onResize(v12152, void 0, v12124.numHandler(v12127 + v12153), void 0, void 0);
          } else if (v12134) {// 下
            var v12154 = (v12152.pageY - v12126) / v12124.options.getScale();
            v12122.css({
              height: "100%"
            }), v12131.css({
              height: v12124.numHandlerText(v12128 + v12154)
            }), v12124.options.onResize(v12152, v12124.numHandler(v12128 + v12154), void 0, void 0, void 0);
          } else if (rt) {// 旋转
            v12122.css({ height: "100%" });
            var eo = v12152.pageX,er = v12152.pageY;
            var direct = (eo - v12125) * 360 / 100;
            v12125 = v12152.pageX;
            var lastAngle = v12131[0].style.transform && parseInt(v12131[0].style.transform.slice(7, -1)) || 0;
            var v12155 = lastAngle + direct;
            if (Math.abs(v12155) > 360) {
              v12155 = v12155 % 360;
            }
            v12131.css({ transform: "rotate(" + v12155 + "deg)" });
            v12124.options.onResize(v12152, void 0, void 0, void 0, void 0, v12155);
          } else if (v12136) {// 左
            v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12122.css({
              width: "100%"
            }), v12131.css({
              width: v12124.numHandlerText(v12127 - v12153),
              left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153))
            }), v12124.options.onResize(v12152, void 0, v12124.numHandler(v12127 - v12153), void 0, v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153));
          } else if (v12138) {// 上
            v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
              height: "100%"
            }), v12131.css({
              height: v12124.numHandlerText(v12128 - v12154),
              top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154)
            }), v12124.options.onResize(v12152, v12124.numHandler(v12128 - v12154), void 0, v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), void 0);
          } else if (v12140) {// 右上
            v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
              height: "100%",
              width: "100%"
            }), v12131.css({
              height: v12124.numHandlerText(v12128 - v12154),
              top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154),
              width: v12124.numHandlerText(v12127 + v12153)
            }), v12124.options.onResize(v12152, v12124.numHandler(v12128 - v12154), v12124.numHandler(v12127 + v12153), v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), void 0);
          } else if (v12142) {// 左上
            v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
              height: "100%",
              width: "100%"
            }), v12131.css({
              height: v12124.numHandlerText(v12128 - v12154),
              top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154),
              width: v12124.numHandlerText(v12127 - v12153),
              left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12129 + v12153)
            }), v12124.options.onResize(v12152, v12124.numHandler(v12128 - v12154), v12124.numHandler(v12127 - v12153), v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153));
          } else if (v12144) {// 右下
            (v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale()),
            v12122.css({ width: "100%", height: "100%" });
            if (v12152.shiftKey) {
              v12131.css({ width: v12124.numHandlerText(v12127 + v12153), height: v12124.numHandlerText(v12128 + v12154) });
              v12124.options.onResize(v12152, v12124.numHandler(v12128 + v12154), v12124.numHandler(v12127 + v12153), void 0, void 0);
            } else {
              // 宽高比
              var ratio = v12128 / v12127;
              var width = v12127 + v12153,height = v12128 + v12154;
              height = width * ratio;
              v12131.css({ width: v12124.numHandlerText(width), height: v12124.numHandlerText(height) });
              v12124.options.onResize(v12152, v12124.numHandler(height), v12124.numHandler(width), void 0, void 0);
            }
          } else if (v12146) {// 左下
            v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12122.css({
              width: "100%",
              height: "100%"
            }), v12131.css({
              width: v12124.numHandlerText(v12127 - v12153),
              left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12129 + v12153),
              height: v12124.numHandlerText(v12128 + v12154)
            }), v12124.options.onResize(v12152, v12124.numHandler(v12128 + v12154), v12124.numHandler(v12127 - v12153), v12124.numHandler(otundefinedop), v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153));
          } else {// 按下
            v12150 && (v12153 = (v12152.pageX - v12125) / v12124.options.getScale(), v12154 = (v12152.pageY - v12126) / v12124.options.getScale(), v12131.css({
              left: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12129 + v12153),
              top: v12124.numHandlerText(v12124.options.noDrag ? void 0 : v12130 + v12154)
            }), v12124.options.onResize(v12152, void 0, void 0, v12124.options.noDrag ? void 0 : v12124.numHandler(v12130 + v12154), v12124.options.noDrag ? void 0 : v12124.numHandler(v12129 + v12153)));
          }
          ;
        }).on("mouseup", function (v12156) {
          // i.options.onStopResize(rt);
          // 当某个 '控制点' 按下时 (每个'控制点'按下状态是独立的)
          if (v12132 || v12134 || v12136 || v12138 || v12140 || v12142 || v12146 || v12144 || v12150 || rt) {
            v12124.options.onStopResize(rt);
          }
          v12132 = !1, v12134 = !1, v12136 = !1, v12138 = !1, v12140 = !1, v12142 = !1, v12146 = !1, v12144 = !1, v12150 = !1, rt = !1;
        });
      },
      bindTrigger: function bindTrigger(v12157) {
        var v12158 = this;
        v12157.on("click", function (_n) {
          _n.stopPropagation(), v12158.triggerResize(v12157, _n), v12085(".mouseRect").remove();
        });
      },
      bindHidePanel: function bindHidePanel(v12159) {
        if (v12086.maxPanelIndex < 2) {
          var v12160 = this.options.stage;
          v12085(v12160).bind("click", function (v12161) {
            // 仅点击设计面板时清除多选元素
            if (v12161.target.className && _typeof(v12161.target.className) == "string" && v12161.target.className.includes("design")) {
              v12161.stopPropagation(), v12085("div[panelindex]").css({
                display: "none"
              });
              v12085("div[panelindex]").removeClass("selected");
            }
          });
        }
      }
    }, v12085.fn.extend({
      hireizeable: function hireizeable(v12162) {
        return this.each(function () {
          var v12163,
            v12164 = v12085.data(this, "hireizeable");
          v12163 = v12164 ? v12085.extend({}, v12164.options, v12162 || {}) : v12085.extend({}, v12085.fn.hireizeable.defaults, v12162 || {});
          v12085.data(this, "hireizeable", {
            options: v12163
          }), new v12087({
            target: this,
            onResize: function onResize(v12165, v12166, v12167, v12168, v12169) {
            },
            onStopResize: function onStopResize(v12170, v12171, v12172, v12173, v12174) {
            }
          });
        });
      }
    }), v12085.fn.hireizeable.defaults = {
      stage: document,
      reizeUnit: "pt",
      minResize: 1.5,
      showSizeBox: !0,
      showPoints: ["s", "e"],
      noContainer: !1,
      onBeforeResize: function onBeforeResize(v12175, v12176, v12177, v12178, v12179) {
      },
      onResize: function onResize(v12180, v12181, v12182, v12183, v12184) {
      },
      onStopResize: function onStopResize(v12185, v12186, v12187, v12188, v12189) {
      },
      noDrag: !1
    };
