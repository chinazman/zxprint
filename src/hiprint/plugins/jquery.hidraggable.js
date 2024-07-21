/*
这段代码实现了一个名为 hidraggable 的 jQuery 插件,用于实现元素的拖拽功能。主要功能包括:

拖拽开始、拖拽过程中和拖拽结束的处理。
支持对齐线的创建和移除。
支持元素在特定区域内的拖拽限制。
支持缩放和旋转后的拖拽。
提供了一系列可配置的选项和回调函数。

主要的方法包括:

updateDraggablePosition: 更新拖拽元素的位置
applyDraggablePosition: 应用拖拽元素的位置
startDrag: 开始拖拽
onDrag: 拖拽过程中的处理
stopDrag: 停止拖拽
createVerLine 和 createHorLine: 创建垂直和水平对齐线
removeVerLine 和 removeHorLine: 移除垂直和水平对齐线

这个插件还提供了一些额外的方法如 options, update, proxy, enable, disable 等,用于操作和配置拖拽行为。
整体来说,这是一个功能丰富的拖拽插件,适用于复杂的拖拽需求,特别是在需要精确对齐、缩放、旋转等场景下。
*/
import {jQuery} from "../hiprint.comm.js";

!function ($) {
  // 更新拖拽元素位置
  function updateDraggablePosition(event) {
    var draggableData = $.data(event.data.target, "hidraggable"),
      options = draggableData.options,
      proxy = draggableData.proxy,
      startData = event.data,
      newLeft = startData.startLeft + (event.pageX - startData.startX) / (draggableData.options.getScale() || 1),
      newTop = startData.startTop + (event.pageY - startData.startY) / (draggableData.options.getScale() || 1);
    proxy && (proxy.parent()[0] == document.body ? (newLeft = null != options.deltaX && null != options.deltaX ? event.pageX + options.deltaX : event.pageX - event.data.offsetWidth, newTop = null != options.deltaY && null != options.deltaY ? event.pageY + options.deltaY : event.pageY - event.data.offsetHeight) : (null != options.deltaX && null != options.deltaX && (newLeft += event.data.offsetWidth + options.deltaX), null != options.deltaY && null != options.deltaY && (newTop += event.data.offsetHeight + options.deltaY))),
    event.data.parent != document.body && (newLeft += $(event.data.parent).scrollLeft(), newTop += $(event.data.parent).scrollTop()),
    "h" == options.axis ? startData.left = newLeft : "v" == options.axis ? startData.top = newTop : event.shiftKey && event.altKey ? startData.top = newTop : event.shiftKey ? startData.left = newLeft : (startData.left = newLeft, startData.top = newTop);
  }

  // 应用拖拽元素位置
  function applyDraggablePosition(event) {
    var draggableData = $.data(event.data.target, "hidraggable"),
      options = draggableData.options,
      proxy = draggableData.proxy;
    proxy || (proxy = $(event.data.target)), proxy.css({
      left: $.fn.dragLengthC(event.data.left, options),
      top: $.fn.dragLengthC(event.data.top, options)
    }), $("body").css("cursor", options.cursor);
  }

  // 开始拖拽
  function startDrag(event) {
    $.fn.hidraggable.isDragging = !0;
    var draggableData = $.data(event.data.target, "hidraggable"),
      options = draggableData.options,
      droppables = $(".hidroppable").filter(function () {
        return event.data.target != this;
      }).filter(function () {
        var accept = $.data(this, "hidroppable").options.accept;
        return !accept || $(accept).filter(function () {
          return this == event.data.target;
        }).length > 0;
      });
    draggableData.hidroppables = droppables;
    var proxy = draggableData.proxy;
    return proxy || (options.proxy ? (proxy = "clone" == options.proxy ? $(event.data.target).clone().insertAfter(event.data.target) : options.proxy.call(event.data.target, event.data.target), draggableData.proxy = proxy) : proxy = $(event.data.target)), proxy.css("position", "absolute"), updateDraggablePosition(event), applyDraggablePosition(event), options.onStartDrag.call(event.data.target, event), !1;
  }

  // 创建垂直对齐线
  function createVerLine(originPosition, currentPosition, originKey, targetKey, height, paperContent) {
    if (Math.abs(originPosition[originKey] - currentPosition[targetKey]) <= HIPRINT_CONFIG.adsorbLineMin) {
      if (originPosition.v.length) {
        originPosition.v.css("left", originPosition[originKey] + "pt");
      } else {
        originPosition.v = $(`<div class='verLine id-${originPosition.id}'></div>`);
        originPosition.v.css("height", height + "pt");
        originPosition.v.css("left", originPosition[originKey] + "pt");
        paperContent.append(originPosition.v);
      }
    } else {
      originPosition.v && originPosition.v.remove();
    }
  }

  // 移除垂直对齐线
  function removeVerLine(originPosition) {
    if (originPosition) originPosition.v && originPosition.v.remove();
    $(".verLine").remove();
  }

  // 创建水平对齐线
  function createHorLine(originPosition, currentPosition, originKey, targetKey, width, paperContent) {
    if (Math.abs(originPosition[originKey] - currentPosition[targetKey]) <= HIPRINT_CONFIG.adsorbLineMin) {
      if (originPosition.h.length) {
        originPosition.h.css("top", originPosition[originKey] + "pt");
      } else {
        originPosition.h = $(`<div class='horLine id-${originPosition.id}'></div>`);
        originPosition.h.css("width", width + "pt");
        originPosition.h.css("top", originPosition[originKey] + "pt");
        paperContent.append(originPosition.h);
      }
    } else {
      originPosition.h && originPosition.h.remove();
    }
  }

  // 移除水平对齐线
  function removeHorLine(originPosition) {
    if (originPosition) originPosition.h && originPosition.h.remove();
    $(".horLine").remove();
  }

  // 拖拽过程中
  function onDrag(event) {
    // 移动开始动作
    var draggableData = $.data(event.data.target, "hidraggable");
    updateDraggablePosition(event);
    if (!(event.ctrlKey || event.metaKey) && (event.data.target.className.startsWith('resize-panel') || "2" == event.data.target.style.zIndex || event.data.target.className.startsWith('hiprint-printElement'))) {
      var data = event.data;
      if ($(".mouseRect").length == 0 && draggableData.options.designTarget && draggableData.options.designTarget.panel.printElements.filter(function (el) {
        return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
      }).length <= 1) {
        let left = window.hinnn.px.toPt(data.left);
        let top = window.hinnn.px.toPt(data.top);
        let currentPosition = draggableData.options.designTarget.options;
        currentPosition.left = left;
        currentPosition.top = top;
        currentPosition.right = left + currentPosition.width;
        currentPosition.bottom = top + currentPosition.height;
        currentPosition.vCenter = left + currentPosition.width / 2;
        currentPosition.hCenter = top + currentPosition.height / 2;
        (() => {
          let otherPositions = draggableData.options.designTarget.panel.printElements.filter((el) => el.id != draggableData.options.designTarget.id).map((el) => {
            let { left, top, width, height } = el.options;
            let right = left + width,vCenter = left + width / 2,hCenter = top + height / 2;
            let cVCenter = currentPosition.left + currentPosition.width / 2,cHCenter = currentPosition.top + currentPosition.height / 2,
              cRight = currentPosition.left + currentPosition.width;
            let distance, d1, d2, d3;
            d1 = Math.sqrt(Math.pow(left - currentPosition.left, 2) + Math.pow(hCenter - cHCenter, 2));
            d2 = Math.sqrt(Math.pow(vCenter - cVCenter, 2) + Math.pow(hCenter - cHCenter, 2));
            d3 = Math.sqrt(Math.pow(right - cRight, 2) + Math.pow(hCenter - cHCenter, 2));
            distance = Math.min(d1, d2, d3);
            return {
              ...el.options,
              distance,
              h: $(".horLine.id-" + el.id),
              v: $(".verLine.id-" + el.id),
              bottom: top + height,
              right: left + width,
              vCenter,
              hCenter
            };
          }).sort((a, b) => a.distance - b.distance).slice(0, 1);
          let paper = draggableData.options.designTarget.designPaper;
          let paperContent = paper.target.find(".hiprint-printPaper-content");
          let paperW = paper.width,paperH = paper.height;
          let showAline = HIPRINT_CONFIG.showAdsorbLine,aMin = HIPRINT_CONFIG.adsorbMin,aLMin = HIPRINT_CONFIG.adsorbLineMin;
          otherPositions.forEach((item, idx) => {
            // 元素左边线
            if (Math.abs(otherPositions[idx].left - currentPosition.left) <= aMin) {
              currentPosition.left = otherPositions[idx].left;
              removeVerLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].vCenter - currentPosition.left) <= aMin) {
              currentPosition.left = otherPositions[idx].vCenter;
              removeVerLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].right - currentPosition.left) <= aMin) {
              currentPosition.left = otherPositions[idx].right;
              removeVerLine(otherPositions[idx]);
            }
            // 元素垂直中线
            if (Math.abs(otherPositions[idx].left - currentPosition.vCenter) <= aMin) {
              currentPosition.left = otherPositions[idx].left - currentPosition.width / 2;
              removeVerLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].vCenter - currentPosition.vCenter) <= aMin) {
              currentPosition.left = otherPositions[idx].vCenter - currentPosition.width / 2;
              removeVerLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].right - currentPosition.vCenter) <= aMin) {
              currentPosition.left = otherPositions[idx].right - currentPosition.width / 2;
              removeVerLine(otherPositions[idx]);
            }
            // 元素右边线
            if (Math.abs(otherPositions[idx].left - currentPosition.right) <= aMin) {
              currentPosition.left = otherPositions[idx].left - currentPosition.width;
              removeVerLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].vCenter - currentPosition.right) <= aMin) {
              currentPosition.left = otherPositions[idx].vCenter - currentPosition.width;
              removeVerLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].right - currentPosition.right) <= aMin) {
              currentPosition.left = otherPositions[idx].right - currentPosition.width;
              removeVerLine(otherPositions[idx]);
            }
            // 元素顶边线
            if (Math.abs(otherPositions[idx].top - currentPosition.top) <= aMin) {
              currentPosition.top = otherPositions[idx].top;
              removeHorLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].hCenter - currentPosition.top) <= aMin) {
              currentPosition.top = otherPositions[idx].hCenter;
              removeHorLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].bottom - currentPosition.top) <= aMin) {
              currentPosition.top = otherPositions[idx].bottom;
              removeHorLine(otherPositions[idx]);
            }
            // 元素水平中线
            if (Math.abs(otherPositions[idx].top - currentPosition.hCenter) <= aMin) {
              currentPosition.top = otherPositions[idx].top - currentPosition.height / 2;
              removeHorLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].hCenter - currentPosition.hCenter) <= aMin) {
              currentPosition.top = otherPositions[idx].hCenter - currentPosition.height / 2;
              removeHorLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].bottom - currentPosition.hCenter) <= aMin) {
              currentPosition.top = otherPositions[idx].bottom - currentPosition.height / 2;
              removeHorLine(otherPositions[idx]);
            }
            // 元素底边线
            if (Math.abs(otherPositions[idx].top - currentPosition.bottom) <= aMin) {
              currentPosition.top = otherPositions[idx].top - currentPosition.height;
              removeHorLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].hCenter - currentPosition.bottom) <= aMin) {
              currentPosition.top = otherPositions[idx].hCenter - currentPosition.height;
              removeHorLine(otherPositions[idx]);
            } else if (Math.abs(otherPositions[idx].bottom - currentPosition.bottom) <= aMin) {
              currentPosition.top = otherPositions[idx].bottom - currentPosition.height;
              removeHorLine(otherPositions[idx]);
            }

            if (showAline) {
              if (Math.abs(otherPositions[idx].left - currentPosition.left) > aMin && Math.abs(otherPositions[idx].left - currentPosition.left) <= aLMin) {// 左
                createVerLine(otherPositions[idx], currentPosition, "left", "left", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].vCenter - currentPosition.left) > aMin && Math.abs(otherPositions[idx].vCenter - currentPosition.left) <= aLMin) {
                createVerLine(otherPositions[idx], currentPosition, "vCenter", "left", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].right - currentPosition.left) > aMin && Math.abs(otherPositions[idx].right - currentPosition.left) <= aLMin) {
                createVerLine(otherPositions[idx], currentPosition, "right", "left", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].left - currentPosition.vCenter) > aMin && Math.abs(otherPositions[idx].left - currentPosition.vCenter) <= aLMin) {// 中
                createVerLine(otherPositions[idx], currentPosition, "left", "vCenter", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].vCenter - currentPosition.vCenter) > aMin && Math.abs(otherPositions[idx].vCenter - currentPosition.vCenter) <= aLMin) {
                createVerLine(otherPositions[idx], currentPosition, "vCenter", "vCenter", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].right - currentPosition.vCenter) > aMin && Math.abs(otherPositions[idx].right - currentPosition.vCenter) <= aLMin) {
                createVerLine(otherPositions[idx], currentPosition, "right", "vCenter", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].left - currentPosition.right) > aMin && Math.abs(otherPositions[idx].left - currentPosition.right) <= aLMin) {// 右
                createVerLine(otherPositions[idx], currentPosition, "left", "right", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].vCenter - currentPosition.right) > aMin && Math.abs(otherPositions[idx].vCenter - currentPosition.right) <= aLMin) {
                createVerLine(otherPositions[idx], currentPosition, "vCenter", "right", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].right - currentPosition.right) > aMin && Math.abs(otherPositions[idx].right - currentPosition.right) <= aLMin) {
                createVerLine(otherPositions[idx], currentPosition, "right", "right", paperH, paperContent);
              } else if (Math.abs(otherPositions[idx].top - currentPosition.top) > aMin && Math.abs(otherPositions[idx].top - currentPosition.top) <= aLMin) {// 上
                createHorLine(otherPositions[idx], currentPosition, "top", "top", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].hCenter - currentPosition.top) > aMin && Math.abs(otherPositions[idx].hCenter - currentPosition.top) <= aLMin) {
                createHorLine(otherPositions[idx], currentPosition, "hCenter", "top", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].bottom - currentPosition.top) > aMin && Math.abs(otherPositions[idx].bottom - currentPosition.top) <= aLMin) {
                createHorLine(otherPositions[idx], currentPosition, "bottom", "top", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].top - currentPosition.hCenter) > aMin && Math.abs(otherPositions[idx].top - currentPosition.hCenter) <= aLMin) {// 中
                createHorLine(otherPositions[idx], currentPosition, "top", "hCenter", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].hCenter - currentPosition.hCenter) > aMin && Math.abs(otherPositions[idx].hCenter - currentPosition.hCenter) <= aLMin) {
                createHorLine(otherPositions[idx], currentPosition, "hCenter", "hCenter", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].bottom - currentPosition.hCenter) > aMin && Math.abs(otherPositions[idx].bottom - currentPosition.hCenter) <= aLMin) {
                createHorLine(otherPositions[idx], currentPosition, "bottom", "hCenter", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].top - currentPosition.bottom) > aMin && Math.abs(otherPositions[idx].top - currentPosition.bottom) <= aLMin) {// 下
                createHorLine(otherPositions[idx], currentPosition, "top", "bottom", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].hCenter - currentPosition.bottom) > aMin && Math.abs(otherPositions[idx].hCenter - currentPosition.bottom) <= aLMin) {
                createHorLine(otherPositions[idx], currentPosition, "hCenter", "bottom", paperW, paperContent);
              } else if (Math.abs(otherPositions[idx].bottom - currentPosition.bottom) > aMin && Math.abs(otherPositions[idx].bottom - currentPosition.bottom) <= aLMin) {
                createHorLine(otherPositions[idx], currentPosition, "bottom", "bottom", paperW, paperContent);
              } else {
                removeVerLine(otherPositions[idx]);
                removeHorLine(otherPositions[idx]);
              }
            }
          });
        })();
        event.data.left = window.hinnn.pt.toPx(currentPosition.left);
        event.data.top = window.hinnn.pt.toPx(currentPosition.top);
      }
      // 当前纸张宽高
      var parent = data.parent.className.endsWith('design') ? data.parent : data.parent.offsetParent;
      var paperW = parent.clientWidth,paperH = parent.clientHeight;
      // 当前元素宽高
      var elementW = data.target.clientWidth,elementH = data.target.clientHeight,
        diffLeft = 0,diffTop = 0;
      if (draggableData.options.designTarget && draggableData.options.designTarget.options.transform) {
        var info = draggableData.options.designTarget.options.getRectInfo();
        diffLeft = window.hinnn.pt.toPx(info.diffW), diffTop = window.hinnn.pt.toPx(info.diffH);
      }
      // 左右
      if (data.left < 0 - diffLeft) {
        data.left = 0 - diffLeft;
      } else if (data.left >= paperW - elementW + diffLeft) {
        data.left = paperW - elementW + diffLeft;
      }
      // 上下
      if (data.top < 0 - diffTop) {
        data.top = 0 - diffTop;
      } else if (data.top >= paperH - elementH + diffTop) {
        data.top = paperH - elementH + diffTop;
      }
      event.data = data;
    }
    0 != draggableData.options.onDrag.call(event.data.target, event, $.fn.dragLengthCNum(event.data.left, draggableData.options), $.fn.dragLengthCNum(event.data.top, draggableData.options)) && applyDraggablePosition(event);
    var target = event.data.target;
    return draggableData.hidroppables.each(function () {
      var droppable = $(this);

      if (!droppable.hidroppable("options").disabled) {
        var p = droppable.offset();
        if (event.pageX > p.left && event.pageX < p.left + droppable.outerWidth() &&
            event.pageY > p.top && event.pageY < p.top + droppable.outerHeight()) {
          if (!this.entered) {
            $(this).trigger("_dragenter", [target]);
            this.entered = true;
          }
          $(this).trigger("_dragover", [target]);
        } else {
          if (this.entered) {
            $(this).trigger("_dragleave", [target]);
            this.entered = false;
          }
        }
      }
    }), !1;
  }

  // 停止拖拽
  function stopDrag(event) {
    $.fn.hidraggable.isDragging = !1;
    removeVerLine(), removeHorLine();
    var newLeft,
      newTop,
      draggableData = $.data(event.data.target, "hidraggable"),
      proxy = draggableData.proxy,
      options = draggableData.options;
    options.revert ? 1 == checkDroppable() ? $(event.data.target).css({
      position: event.data.startPosition,
      left: event.data.startLeft,
      top: event.data.startTop
    }) : proxy ? (proxy.parent()[0] == document.body ? (newLeft = event.data.startX - event.data.offsetWidth, newTop = event.data.startY - event.data.offsetHeight) : (newLeft = event.data.startLeft, newTop = event.data.startTop), proxy.animate({
      left: newLeft,
      top: newTop
    }, function () {
      removeProxy();
    })) : $(event.data.target).animate({
      left: event.data.startLeft,
      top: event.data.startTop
    }, function () {
      $(event.data.target).css("position", event.data.startPosition);
    }) : ($(event.data.target).css({
      position: "absolute",
      left: $.fn.dragLengthC(event.data.left, options),
      top: $.fn.dragLengthC(event.data.top, options)
    }), checkDroppable());

    function removeProxy() {
      proxy && proxy.remove(), draggableData.proxy = null;
    }

    function checkDroppable() {
      var droppable = false;
      return draggableData.hidroppables.each(function () {
        var droppableObj = $(this);

        if (!droppableObj.hidroppable("options").disabled) {
          var p = droppableObj.offset();
          var ptr = this.style.transform && parseFloat(this.style.transform.slice(6, -1)) || 1;
          if (event.pageX > p.left && event.pageX < p.left + droppableObj.outerWidth() * ptr &&
              event.pageY > p.top && event.pageY < p.top + droppableObj.outerHeight() * ptr) {
            if (options.revert) {
              $(event.data.target).css({
                position: event.data.startPosition,
                left: event.data.startLeft,
                top: event.data.startTop
              });
            }
            $(this).trigger("_drop", [event.data.target]);
            removeProxy();
            droppable = true;
            this.entered = false;
            return false;
          }
        }
      }), droppable || options.revert || removeProxy(), droppable;
    }

    return options.onStopDrag.call(event.data.target, event), $(document).unbind(".hidraggable"), setTimeout(function () {
      $("body").css("cursor", "");
    }, 100), !1;
  }

  // hidraggable插件定义
  $.fn.hidraggable = function (options, param) {
    if (typeof options == "string") {
      return $.fn.hidraggable.methods[options](this, param);
    }

    return this.each(function () {
      var opts;
      var state = $.data(this, "hidraggable");
      if (state) {
        state.handle.unbind(".hidraggable");
        opts = $.extend(state.options, options);
      } else {
        opts = $.extend({}, $.fn.hidraggable.defaults, $.fn.hidraggable.parseOptions(this), options || {});
      }
      var handle = opts.handle ? (typeof opts.handle == "string" ? $(opts.handle, this) : opts.handle) : $(this);

      function checkArea(e) {
        var state = $.data(e.data.target, "hidraggable"),
          handle = state.handle,
          offset = $(handle).offset(),
          transformAngle = $(handle)[0].style.transform && parseInt($(handle)[0].style.transform.slice(7, -1)),
          scalePercentage = state.options.getScale(),
          width = $(handle).outerWidth();
        var height = $(handle).outerHeight();
        if (transformAngle) {
          var rad = transformAngle * Math.PI / 180,
            originalWidth = $(handle).outerWidth(),
            originalHeight = $(handle).outerHeight(),
            sin = Math.sin(rad),
            cos = Math.cos(rad);
          width = Math.abs(originalWidth * cos) + Math.abs(originalHeight * sin),
          height = Math.abs(originalWidth * sin) + Math.abs(originalHeight * cos);
        }
        if (scalePercentage) {
          width *= scalePercentage, height *= scalePercentage;
        }
        var t = e.pageY - offset.top,
          r = offset.left + width - e.pageX,
          b = offset.top + height - e.pageY,
          l = e.pageX - offset.left;
        return Math.min(t, r, b, l) > state.options.edge;
      }

      $.data(this, "hidraggable", {
        options: opts,
        handle: handle
      });

      if (opts.disabled) {
        $(this).css("cursor", "");
      } else {
        handle.unbind(".hidraggable").bind("mousemove.hidraggable", {target: this}, function (e) {
          if (!$.fn.hidraggable.isDragging) {
            var opts = $.data(e.data.target, "hidraggable").options;
            if (checkArea(e)) {
              $(this).css("cursor", opts.cursor);
            } else {
              $(this).css("cursor", "");
            }
          }
        }).bind("mouseleave.hidraggable", {target: this}, function (e) {
          $(this).css("cursor", "");
        }).bind("mousedown.hidraggable", {target: this}, function (e) {
          if (checkArea(e) != 0) {
            $(this).css("cursor", "");
            var position = $(e.data.target).position();
            var offset = $(e.data.target).offset();
            var data = {
              startPosition: $(e.data.target).css("position"),
              startLeft: position.left,
              startTop: position.top,
              left: position.left,
              top: position.top,
              startX: e.pageX,
              startY: e.pageY,
              offsetWidth: (e.pageX - offset.left),
              offsetHeight: (e.pageY - offset.top),
              target: e.data.target,
              parent: $(e.data.target).parent()[0]
            };
            var state = $.data(e.data.target, "hidraggable");
            // item禁止移动
            if (state.options.draggable === false) {
              return;
            }
            // 旋转时不允许移动
            if ('r resizebtn' == e.target.className) {
              return;
            }
            var scalePercentage = state.options.getScale();
            if (scalePercentage) {
              data.left /= scalePercentage;
              data.top /= scalePercentage;
              data.startLeft /= scalePercentage;
              data.startTop /= scalePercentage;
            }
            var transformAngle = data.target.style.transform && parseInt(data.target.style.transform.slice(7, -1));
            if (transformAngle) {
              var rad = transformAngle * Math.PI / 180,
                width = $(e.data.target).outerWidth(),
                height = $(e.data.target).outerHeight(),
                sin = Math.sin(rad),
                cos = Math.cos(rad);
              var transformedWidth = Math.abs(width * cos) + Math.abs(height * sin),
                transformedHeight = Math.abs(width * sin) + Math.abs(height * cos);
              var diffW = (transformedWidth - width) / 2,diffH = (transformedHeight - height) / 2;
              data.left += diffW;
              data.top += diffH;
              data.startLeft += diffW;
              data.startTop += diffH;
            }
            $.extend(e.data, data);
            if (state.options.onBeforeDrag.call(e.data.target, e) != false) {
              $(document).bind("mousedown.hidraggable", e.data, startDrag);
              $(document).bind("mousemove.hidraggable", e.data, onDrag);
              $(document).bind("mouseup.hidraggable", e.data, stopDrag);
            }
          }
        });
      }
    });
  };

  $.fn.hidraggable.methods = {
    options: function (jq) {
      return $.data(jq[0], "hidraggable").options;
    },
    update: function (jq, param) {
      if (param && typeof param === "object") {
        var state = $.data(jq[0], "hidraggable");
        if (state) {
          Object.keys(param).forEach(function (key) {
            state.options[key] = param[key];
          });
        }
      }
    },
    proxy: function (jq) {
      return $.data(jq[0], "hidraggable").proxy;
    },
    enable: function (jq) {
      return jq.each(function () {
        $(this).hidraggable({disabled: false});
      });
    },
    disable: function (jq) {
      return jq.each(function () {
        $(this).hidraggable({disabled: true});
      });
    }
  };

  $.fn.hidraggable.parseOptions = function (target) {
    var $target = $(target);
    return $.extend({}, $.hiprintparser.parseOptions(target, [
      "cursor", "handle", "axis",
      {revert: "boolean", deltaX: "number", deltaY: "number", edge: "number"}
    ]), {
      disabled: !!$target.attr("disabled") || undefined
    });
  };

  // hidraggable默认配置
  $.fn.hidraggable.defaults = {
    proxy: null,
    revert: false,
    cursor: "move",
    deltaX: null,
    deltaY: null,
    handle: null,
    disabled: false,
    edge: 0,
    axis: null,
    getScale: function (e) {},
    onBeforeDrag: function (e) {},
    onStartDrag: function (e) {},
    onDrag: function (e) {},
    onStopDrag: function (e) {}
  };

  $.fn.hidraggable.isDragging = false;
}(jQuery);