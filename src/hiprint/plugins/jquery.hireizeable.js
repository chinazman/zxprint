"use strict";

/**
 * import 相关资源
 */
import {jQuery} from "../hiprint.comm.js";
// jQuery 插件 hireizeable
var $, hireizeableGlobal, HireizeablePlugin;

$ = jQuery;
hireizeableGlobal = {
  maxPanelIndex: 0
};

// 主插件类
(HireizeablePlugin = function(options) {
  this.options = $.data(options.target, "hireizeable").options;
  this.init(options.target);
}).prototype = {
  // 处理数值并添加单位
  numHandlerText: function(value) {
    return this.numHandler(value) + "pt";
  },
  
  // 数值处理
  numHandler: function(value) {
    var minResize = 1.5,
      calculatedValue = 0.75 * value;
    if (this.options.minResize) {
      minResize = this.options.minResize;
    }
    return Math.round(calculatedValue / minResize) * minResize;
  },
  
  // 初始化
  init: function(target) {
    this.initResizeBox(target);
  },
  
  // 初始化调整大小的框
  initResizeBox: function(target) {
    var self = this;
    $(target).each(function() {
      var resizePanel;
      hireizeableGlobal.maxPanelIndex += 1;
      
      if (self.options.noContainer) {
        resizePanel = $(target);
      } else {
        resizePanel = $(`<div panelIndex=${hireizeableGlobal.maxPanelIndex} class="resize-panel"></div>`);
        resizePanel.css({
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          position: "absolute",
          "background-color": "rgba(0,0,0,0.5)",
          cursor: "move",
          display: "none"
        });
      }
      
      self.appendHandler(resizePanel, $(this));

      var northHandler = {
        name: "n",
        target: $('<div class="n resizebtn" style="cursor: n-resize;top: -12px;margin-left: -4px;left: 50%;"></div>')
      },
      southHandler = {
        name: "s",
        target: $('<div class="s resizebtn" style="cursor: s-resize;bottom: -12px;margin-left: -4px;left: 50%;"></div>')
      },
      westHandler = {
        name: "w",
        target: $('<div class="w resizebtn" style="cursor: w-resize;left: -12px;margin-top: -4px;top: 50%;"></div>')
      },
      eastHandler = {
        name: "e",
        target: $('<div class="e resizebtn" style="cursor: e-resize; top: 50%; margin-top:-4px;right: -12px;"></div>')
      },
      northeastHandler = {
        name: "ne",
        target: $('<div class="ne resizebtn" style="cursor: ne-resize;top: -12px;right: -12px;"></div>')
      },
      northwestHandler = {
        name: "nw",
        target: $('<div class="nw resizebtn" style=" cursor: nw-resize;top: -12px;left:-12px;"></div>')
      },
      southeastHandler = {
        name: "se",
        target: $('<div class="se resizebtn" style="cursor: se-resize;bottom:-12px;right: -12px;"></div>')
      },
      southwestHandler = {
        name: "sw",
        target: $('<div class="sw resizebtn" style="cursor: sw-resize;bottom: -12px;left: -12px;"></div>')
      },
      rotateHandler = {
        name: "r",
        target: $('<div class="r resizebtn" style="cursor:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURUdwTP///9XV1R0dHf///3Nzc////////////////1ZWVq+vr/T09PX19QQEBP///////8XFxf///////////wYGBv///+jo6P///4aGhqioqMzMzP///2BgYP///////////zExMf///wAAAP///xLps0AAAAAjdFJOUwCxxOdixRDmzSDMv8/Z+tz5wWpXWPk3zALCv8KnyXZVMNuNPnv3CwAAAJ1JREFUKM/NkckOwyAMRFkDBMhC9qWr+//fWCIV1WlzrjoXS36yxmMT8hdqqKoUvRAjMtw22kvecem1GjTuK1vApmI+wQMBbQFy5li+QQRaX4AtRX+vbntAJeRl9HTTx4TiwESs61DXNUPmVQeujzVrQwh43TTxpeRBslVfMUhbiXKWyiAwvnIsMcdyJkfJYdpNvG/ltDm+bjP+8KFP8ggL+zQLGxwAAAAASUVORK5CYII=\') 14 14,alias;top: -16px;margin-left: -4px;left: 50%;"></div>')
      },
      sizeBox = $('<div class="size-box" style="position: absolute;left:-2px;"></div>'),
      deleteBtn = $('<div class="del-btn">✕</div>'),
      getActiveHandlers = function() {
        var handlers = [],
          showPoints = self.options.showPoints;
        $.each([northHandler, southHandler, westHandler, eastHandler, northeastHandler, northwestHandler, southeastHandler, southwestHandler], function(index, handler) {
          if ($.inArray(handler.name, showPoints) > -1) {
            handlers.push(handler.target);
          }
        });
        return handlers;
      };

      self.refreshSizeBox(undefined, sizeBox, resizePanel);
      // 当 draggable 为 false 时不显示 resizebox 右上角删除按钮
      if (self.options.draggable != false) {
        resizePanel.append(deleteBtn);
        resizePanel.on("mousedown", ".del-btn", () => {
          var keyboardEvent = new KeyboardEvent("keydown", { bubbles: true, keyCode: 46 });
          target.dispatchEvent(keyboardEvent);
        });
      }
      self.addHandlerCss(getActiveHandlers());
      self.appendHandler(getActiveHandlers(), resizePanel);
      self.bindResizeEvent(resizePanel, $(this));
      
      var currentElement = $(this);
      $(resizePanel).on("mousedown", ".resizebtn", function() {
        currentElement.addClass("resizeing");
      });
      $(".easyui-droppable").on("mouseup", function() {
        currentElement.removeClass("resizeing");
      });
      self.bindTrigger($(this));
    });
    self.bindHidePanel();
  },
  
  // 添加处理器的 CSS 样式
  addHandlerCss: function(handlers) {
    for (var i = 0; i < handlers.length; i++) {
      handlers[i].css({
        position: "absolute",
        width: "8px",
        height: "8px",
        background: "#ff6600",
        "border-radius": "50%"
      });
    }
  },
  
  // 添加处理器到目标元素
  appendHandler: function(handlers, target) {
    target.find(".resize-panel").remove();
    for (var i = 0; i < handlers.length; i++) {
      target.append(handlers[i]);
    }
  },
  
  // 刷新尺寸显示框
  refreshSizeBox: function(element, box, resizePanel) {
    if (!this.options.showSizeBox) return;
    if (box) {
      resizePanel.append(box);
    }
    var style, sizeBox;
    if (element && element.length) {
      style = element[0].style;
      sizeBox = element.children("div[panelindex]").find(".size-box");
    } else if (resizePanel && resizePanel.parent()) {
      var element = resizePanel.parent();
      if (element.hasClass("hiprint-printPaper-content")) return;
      style = element[0].style;
      if (!style.width) {
        style.width = hinnn.px.toPt(element[0].offsetWidth) + "pt";
      }
      if (!style.height) {
        style.height = hinnn.px.toPt(element[0].offsetHeight) + "pt";
      }
      sizeBox = element.children("div[panelindex]").find(".size-box");
    }
    if (sizeBox) {
      sizeBox.text(style.width + ' x ' + style.height);
      sizeBox.css('top', -(sizeBox.outerHeight() || 20));
    }
  },
  
  // 触发调整大小
  triggerResize: function(target, event) {
    // 处理按住 ctrl / command 点击元素 多选
    if (!(event.ctrlKey || event.metaKey)) {
      target.siblings().children("div[panelindex]").removeClass('selected');
      target.siblings().children("div[panelindex]").css({
        display: "none"
      });
    }
    target.children("div[panelindex]").addClass('selected');
    target.children("div[panelindex]").css({
      display: "block"
    });
    this.refreshSizeBox(target);
  },
  
  // 绑定调整大小事件
  bindResizeEvent: function(resizePanel, target) {
    var self = this,
      startX = 0,
      startY = 0,
      startWidth = resizePanel.width(),
      startHeight = resizePanel.height(),
      startLeft = resizePanel.offset().left,
      startTop = resizePanel.offset().top,
      parent = self.options.noContainer ? $(target) : resizePanel.parent(),
      isResizingEast = false; // 右
    
    resizePanel.on("mousedown", ".e", function(e) {
      startX = e.pageX;
      startWidth = resizePanel.width();
      isResizingEast = true;
    });
    
    var isResizingSouth = false; // 下
    resizePanel.on("mousedown", ".s", function(e) {
      startY = e.pageY;
      startHeight = resizePanel.height();
      isResizingSouth = true;
    });
    
    var isResizingWest = false; // 左
    resizePanel.on("mousedown", ".w", function(e) {
      startX = e.pageX;
      startWidth = resizePanel.width();
      isResizingWest = true;
      startLeft = parent.offset().left;
    });
    
    var isResizingNorth = false; // 上
    resizePanel.on("mousedown", ".n", function(e) {
      startY = e.pageY;
      startHeight = resizePanel.height();
      isResizingNorth = true;
      startTop = parent.offset().top;
    });
    
    var isResizingNortheast = false; // 右上
    resizePanel.on("mousedown", ".ne", function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startWidth = resizePanel.width();
      startHeight = resizePanel.height();
      isResizingNortheast = true;
      startTop = parent.offset().top;
    });
    
    var isResizingNorthwest = false; // 左上
    resizePanel.on("mousedown", ".nw", function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startWidth = resizePanel.width();
      startHeight = resizePanel.height();
      startTop = parent.offset().top;
      startLeft = parent.offset().left;
      isResizingNorthwest = true;
    });
    
    var isResizingSoutheast = false; // 右下
    resizePanel.on("mousedown", ".se", function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startWidth = resizePanel.width();
      startHeight = resizePanel.height();
      isResizingSoutheast = true;
    });
    
    var isResizingSouthwest = false; // 左下
    resizePanel.on("mousedown", ".sw", function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startWidth = resizePanel.width();
      startHeight = resizePanel.height();
      isResizingSouthwest = true;
      startLeft = parent.offset().left;
    });
    
    var isRotating = false; // 旋转
    resizePanel.on("mousedown", ".r", function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startWidth = resizePanel.width();
      startHeight = resizePanel.height();
      isRotating = true;
      startLeft = startWidth / 2 + parent.offset().left;
      startTop = startHeight / 2 + parent.offset().top;
    });
    
    resizePanel.on("dblclick", ".r", function(e) {
      parent.css({ transform: "rotate(" + 0 + "deg)" });
      self.options.onResize(e, undefined, undefined, undefined, undefined, 0);
    });
    
    var isDragging = false;
    resizePanel.on("mousedown", function(e) {
      self.options.onBeforeResize();
      startX = e.pageX;
      startY = e.pageY;
      startTop = parent.offset().top;
      startLeft = parent.offset().left;
      isDragging = false;
    });
    
    $(self.options.stage).on("mousemove", function(e) {
      if (isResizingEast) {// 右
        var deltaX = (e.pageX - startX) / self.options.getScale();
        resizePanel.css({
          width: "100%"
        });
        parent.css({
          width: self.numHandlerText(startWidth + deltaX)
        });
        self.options.onResize(e, undefined, self.numHandler(startWidth + deltaX), undefined, undefined);
      } else if (isResizingSouth) {// 下
        var deltaY = (e.pageY - startY) / self.options.getScale();
        resizePanel.css({
          height: "100%"
        });
        parent.css({
          height: self.numHandlerText(startHeight + deltaY)
        });
        self.options.onResize(e, self.numHandler(startHeight + deltaY), undefined, undefined, undefined);
      } else if (isRotating) {// 旋转
        resizePanel.css({ height: "100%" });
        var currentX = e.pageX, currentY = e.pageY;
        var angle = (currentX - startX) * 360 / 100;
        startX = e.pageX;
        var lastAngle = parent[0].style.transform && parseInt(parent[0].style.transform.slice(7, -1)) || 0;
        var newAngle = lastAngle + angle;
        if (Math.abs(newAngle) > 360) {
          newAngle = newAngle % 360;
        }
        parent.css({ transform: "rotate(" + newAngle + "deg)" });
        self.options.onResize(e, undefined, undefined, undefined, undefined, newAngle);
      } else if (isResizingWest) {// 左
        deltaX = (e.pageX - startX) / self.options.getScale();
        resizePanel.css({
          width: "100%"
        });
        parent.css({
          width: self.numHandlerText(startWidth - deltaX),
          left: self.numHandlerText(self.options.noDrag ? undefined : self.numHandler(startLeft + deltaX))
        });
        self.options.onResize(e, undefined, self.numHandler(startWidth - deltaX), undefined, self.options.noDrag ? undefined : self.numHandler(startLeft + deltaX));
      } else if (isResizingNorth) {// 上
        deltaY = (e.pageY - startY) / self.options.getScale();
        resizePanel.css({
          height: "100%"
        });
        parent.css({
          height: self.numHandlerText(startHeight - deltaY),
          top: self.numHandlerText(self.options.noDrag ? undefined : startTop + deltaY)
        });
        self.options.onResize(e, self.numHandler(startHeight - deltaY), undefined, self.options.noDrag ? undefined : self.numHandler(startTop + deltaY), undefined);
      } else if (isResizingNortheast) {// 右上
        deltaX = (e.pageX - startX) / self.options.getScale();
        deltaY = (e.pageY - startY) / self.options.getScale();
        resizePanel.css({
          height: "100%",
          width: "100%"
        });
        parent.css({
          height: self.numHandlerText(startHeight - deltaY),
          top: self.numHandlerText(self.options.noDrag ? undefined : startTop + deltaY),
          width: self.numHandlerText(startWidth + deltaX)
        });
        self.options.onResize(e, self.numHandler(startHeight - deltaY), self.numHandler(startWidth + deltaX), self.options.noDrag ? undefined : self.numHandler(startTop + deltaY), undefined);
      } else if (isResizingNorthwest) {// 左上
        deltaX = (e.pageX - startX) / self.options.getScale();
        deltaY = (e.pageY - startY) / self.options.getScale();
        resizePanel.css({
          height: "100%",
          width: "100%"
        });
        parent.css({
          height: self.numHandlerText(startHeight - deltaY),
          top: self.numHandlerText(self.options.noDrag ? undefined : startTop + deltaY),
          width: self.numHandlerText(startWidth - deltaX),
          left: self.numHandlerText(self.options.noDrag ? undefined : startLeft + deltaX)
        });
        self.options.onResize(e, self.numHandler(startHeight - deltaY), self.numHandler(startWidth - deltaX), self.options.noDrag ? undefined : self.numHandler(startTop + deltaY), self.options.noDrag ? undefined : self.numHandler(startLeft + deltaX));
      } else if (isResizingSoutheast) {// 右下
        deltaX = (e.pageX - startX) / self.options.getScale();
        deltaY = (e.pageY - startY) / self.options.getScale();
        resizePanel.css({ width: "100%", height: "100%" });
        if (e.shiftKey) {
          parent.css({ width: self.numHandlerText(startWidth + deltaX), height: self.numHandlerText(startHeight + deltaY) });
          self.options.onResize(e, self.numHandler(startHeight + deltaY), self.numHandler(startWidth + deltaX), undefined, undefined);
        } else {
          // 保持宽高比
          var ratio = startHeight / startWidth;
          var newWidth = startWidth + deltaX, newHeight = startHeight + deltaY;
          newHeight = newWidth * ratio;
          parent.css({ width: self.numHandlerText(newWidth), height: self.numHandlerText(newHeight) });
          self.options.onResize(e, self.numHandler(newHeight), self.numHandler(newWidth), undefined, undefined);
        }
      } else if (isResizingSouthwest) {// 左下
        deltaX = (e.pageX - startX) / self.options.getScale();
        deltaY = (e.pageY - startY) / self.options.getScale();
        resizePanel.css({
          width: "100%",
          height: "100%"
        });
        parent.css({
          width: self.numHandlerText(startWidth - deltaX),
          left: self.numHandlerText(self.options.noDrag ? undefined : startLeft + deltaX),
          height: self.numHandlerText(startHeight + deltaY)
        });
        self.options.onResize(e, self.numHandler(startHeight + deltaY), self.numHandler(startWidth - deltaX), self.numHandler(startTop), self.options.noDrag ? undefined : self.numHandler(startLeft + deltaX));
      } else {// 拖动
        isDragging && (deltaX = (e.pageX - startX) / self.options.getScale(), deltaY = (e.pageY - startY) / self.options.getScale(), parent.css({
          left: self.numHandlerText(self.options.noDrag ? undefined : startLeft + deltaX),
          top: self.numHandlerText(self.options.noDrag ? undefined : startTop + deltaY)
        }), self.options.onResize(e, undefined, undefined, self.options.noDrag ? undefined : self.numHandler(startTop + deltaY), self.options.noDrag ? undefined : self.numHandler(startLeft + deltaX)));
      }
    }).on("mouseup", function(e) {
      // 当某个 '控制点' 按下时 (每个'控制点'按下状态是独立的)
      if (isResizingEast || isResizingSouth || isResizingWest || isResizingNorth || isResizingNortheast || isResizingNorthwest || isResizingSouthwest || isResizingSoutheast || isDragging || isRotating) {
        self.options.onStopResize(isRotating);
      }
      isResizingEast = false;
      isResizingSouth = false;
      isResizingWest = false;
      isResizingNorth = false;
      isResizingNortheast = false;
      isResizingNorthwest = false;
      isResizingSouthwest = false;
      isResizingSoutheast = false;
      isDragging = false;
      isRotating = false;
    });
  },
  
  // 绑定触发器
  bindTrigger: function(target) {
    var self = this;
    target.on("click", function (event) {
      event.stopPropagation();
      self.triggerResize(target, event);
      $(".mouseRect").remove();
    });
  },
  
  // 绑定隐藏面板
  bindHidePanel: function() {
    if (hireizeableGlobal.maxPanelIndex < 2) {
      var stage = this.options.stage;
      $(stage).bind("click", function (event) {
        // 仅点击设计面板时清除多选元素
        if (event.target.className && typeof event.target.className == "string" && event.target.className.includes("design")) {
          event.stopPropagation();
          $("div[panelindex]").css({
            display: "none"
          });
          $("div[panelindex]").removeClass("selected");
        }
      });
    }
  }
};

// 扩展 jQuery 插件
$.fn.extend({
  hireizeable: function(options) {
    return this.each(function() {
      var opts,
        existingInstance = $.data(this, "hireizeable");
      opts = existingInstance ? $.extend({}, existingInstance.options, options || {}) : $.extend({}, $.fn.hireizeable.defaults, options || {});
      $.data(this, "hireizeable", {
        options: opts
      });
      new HireizeablePlugin({
        target: this,
        onResize: function(event, height, width, top, left) {
        },
        onStopResize: function(isRotating, height, width, top, left) {
        }
      });
    });
  }
});

// 默认选项
$.fn.hireizeable.defaults = {
  stage: document,
  reizeUnit: "pt",
  minResize: 1.5,
  showSizeBox: true,
  showPoints: ["s", "e"],
  noContainer: false,
  onBeforeResize: function(event, height, width, top, left) {
  },
  onResize: function(event, height, width, top, left) {
  },
  onStopResize: function(isRotating, height, width, top, left) {
  },
  noDrag: false
};