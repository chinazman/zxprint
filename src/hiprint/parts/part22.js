"use strict";

/**
这个函数是一个jQuery插件,名为hidraggable,用于实现元素的拖拽功能。它的主要功能包括:

1. 初始化拖拽功能:
   - 设置拖拽选项
   - 绑定鼠标事件处理程序

2. 拖拽过程处理:
   - 计算拖拽位置
   - 限制拖拽范围
   - 处理吸附对齐
   - 更新元素位置

3. 拖拽结束处理:
   - 处理拖放(drop)逻辑
   - 复位元素位置(如果设置了revert选项)
   - 清理临时对象

4. 提供一些方法:
   - 获取/更新选项
   - 启用/禁用拖拽

5. 定义默认选项和事件回调

主要的拖拽逻辑在v12019(拖拽开始)、v12020(拖拽中)和v12021(拖拽结束)这三个函数中实现。

此外,还实现了元素间的吸附对齐功能,通过计算元素边界位置来创建辅助线。

总的来说,这是一个功能较为完善的拖拽插件,支持自定义选项、事件回调,并考虑了一些细节处理如缩放、旋转等。
 */
import {$,jQuery} from "../hiprint.comm.js";


export default function (v11928, v11929) {
    !function (v11930) {
      function v11948(v11931) {
        var v11932 = v11930.data(v11931.data.target, "hidraggable"),
          v11933 = v11932.options,
          v11934 = v11932.proxy,
          v11935 = v11931.data,
          v11936 = v11935.startLeft + (v11931.pageX - v11935.startX) / (v11932.options.getScale() || 1),
          v11937 = v11935.startTop + (v11931.pageY - v11935.startY) / (v11932.options.getScale() || 1);
        v11934 && (v11934.parent()[0] == document.body ? (v11936 = null != v11933.deltaX && null != v11933.deltaX ? v11931.pageX + v11933.deltaX : v11931.pageX - v11931.data.offsetWidth, v11937 = null != v11933.deltaY && null != v11933.deltaY ? v11931.pageY + v11933.deltaY : v11931.pageY - v11931.data.offsetHeight) : (null != v11933.deltaX && null != v11933.deltaX && (v11936 += v11931.data.offsetWidth + v11933.deltaX), null != v11933.deltaY && null != v11933.deltaY && (v11937 += v11931.data.offsetHeight + v11933.deltaY))),
        v11931.data.parent != document.body && (v11936 += v11930(v11931.data.parent).scrollLeft(), v11937 += v11930(v11931.data.parent).scrollTop()),
        "h" == v11933.axis ? v11935.left = v11936 : "v" == v11933.axis ? v11935.top = v11937 : v11931.shiftKey && v11931.altKey ? v11935.top = v11937 : v11931.shiftKey ? v11935.left = v11936 : (v11935.left = v11936, v11935.top = v11937);
      }
  
      function v11949(v11939) {
        var v11938 = v11930.data(v11939.data.target, "hidraggable"),
          v11940 = v11938.options,
          v11941 = v11938.proxy;
        v11941 || (v11941 = v11930(v11939.data.target)), v11941.css({
          left: v11930.fn.dragLengthC(v11939.data.left, v11940),
          top: v11930.fn.dragLengthC(v11939.data.top, v11940)
        }), v11930("body").css("cursor", v11940.cursor);
      }
  
      function v12019(v11942) {
        v11930.fn.hidraggable.isDragging = !0;
        var v11943 = v11930.data(v11942.data.target, "hidraggable"),
          v11944 = v11943.options,
          v11945 = v11930(".hidroppable").filter(function () {
            return v11942.data.target != this;
          }).filter(function () {
            var v11946 = v11930.data(this, "hidroppable").options.accept;
            return !v11946 || v11930(v11946).filter(function () {
              return this == v11942.data.target;
            }).length > 0;
          });
        v11943.hidroppables = v11945;
        var v11947 = v11943.proxy;
        return v11947 || (v11944.proxy ? (v11947 = "clone" == v11944.proxy ? v11930(v11942.data.target).clone().insertAfter(v11942.data.target) : v11944.proxy.call(v11942.data.target, v11942.data.target), v11943.proxy = v11947) : v11947 = v11930(v11942.data.target)), v11947.css("position", "absolute"), v11948(v11942), v11949(v11942), v11944.onStartDrag.call(v11942.data.target, v11942), !1;
      }
  
      function createVerLine(op, cp, v11950, tt, v11951, pc) {
        if (Math.abs(op[v11950] - cp[tt]) <= HIPRINT_CONFIG.adsorbLineMin) {
          if (op.v.length) {
            op.v.css("left", op[v11950] + "pt");
          } else {
            op.v = $("<div class='verLine id-" + op.id + "'></div>");
            op.v.css("height", v11951 + "pt");
            op.v.css("left", op[v11950] + "pt");
            pc.append(op.v);
          }
        } else {
          op.v && op.v.remove();
        }
      }
  
      function removeVerLine(op) {
        if (op) op.v && op.v.remove();
        $(".verLine").remove();
      }
  
      function createHorLine(op, cp, v11962, tt, v11963, pc) {
        if (Math.abs(op[v11962] - cp[tt]) <= HIPRINT_CONFIG.adsorbLineMin) {
          if (op.h.length) {
            op.h.css("top", op[v11962] + "pt");
          } else {
            op.h = $("<div class='horLine id-" + op.id + "'></div>");
            op.h.css("width", v11963 + "pt");
            op.h.css("top", op[v11962] + "pt");
            pc.append(op.h);
          }
        } else {
          op.h && op.h.remove();
        }
      }
  
      function removeHorLine(op) {
        if (op) op.h && op.h.remove();
        $(".horLine").remove();
      }
  
      function v12020(v11975) {
        // 移动开始动作
        var v11974 = v11930.data(v11975.data.target, "hidraggable");
        v11948(v11975);
        if (!(v11975.ctrlKey || v11975.metaKey) && (v11975.data.target.className.startsWith('resize-panel') || "2" == v11975.data.target.style.zIndex || v11975.data.target.className.startsWith('hiprint-printElement'))) {
          var data = v11975.data;
          if (v11930(".mouseRect").length == 0 && v11974.options.designTarget && v11974.options.designTarget.panel.printElements.filter(function (el) {
            return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
          }).length <= 1) {
            let left = window.hinnn.px.toPt(data.left);
            let top = window.hinnn.px.toPt(data.top);
            let cPosition = v11974.options.designTarget.options;
            cPosition.left = left;
            cPosition.top = top;
            cPosition.right = left + cPosition.width;
            cPosition.bottom = top + cPosition.height;
            cPosition.vCenter = left + cPosition.width / 2;
            cPosition.hCenter = top + cPosition.height / 2;
            (() => {
              let oPositions = v11974.options.designTarget.panel.printElements.filter((el) => el.id != v11974.options.designTarget.id).map((el) => {
                let { left, top, width, height } = el.options;
                let right = left + width,vCenter = left + width / 2,hCenter = top + height / 2;
                let cVCenter = cPosition.left + cPosition.width / 2,cHCenter = cPosition.top + cPosition.height / 2,
                  cRight = cPosition.left + cPosition.width;
                let distance, d1, d2, d3;
                d1 = Math.sqrt(Math.pow(left - cPosition.left, 2) + Math.pow(hCenter - cHCenter, 2));
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
              }).sort((v11978, v11979) => v11978.distance - v11979.distance).slice(0, 1);
              let paper = v11974.options.designTarget.designPaper;
              let paperContent = paper.target.find(".hiprint-printPaper-content");
              let paperW = paper.width,paperH = paper.height;
              let showAline = HIPRINT_CONFIG.showAdsorbLine,aMin = HIPRINT_CONFIG.adsorbMin,aLMin = HIPRINT_CONFIG.adsorbLineMin;
              oPositions.forEach((item, idx) => {
                // 元素左边线
                if (Math.abs(oPositions[idx].left - cPosition.left) <= aMin) {
                  cPosition.left = oPositions[idx].left;
                  removeVerLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].vCenter - cPosition.left) <= aMin) {
                  cPosition.left = oPositions[idx].vCenter;
                  removeVerLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].right - cPosition.left) <= aMin) {
                  cPosition.left = oPositions[idx].right;
                  removeVerLine(oPositions[idx]);
                }
                // 元素垂直中线
                if (Math.abs(oPositions[idx].left - cPosition.vCenter) <= aMin) {
                  cPosition.left = oPositions[idx].left - cPosition.width / 2;
                  removeVerLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].vCenter - cPosition.vCenter) <= aMin) {
                  cPosition.left = oPositions[idx].vCenter - cPosition.width / 2;
                  removeVerLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].right - cPosition.vCenter) <= aMin) {
                  cPosition.left = oPositions[idx].right - cPosition.width / 2;
                  removeVerLine(oPositions[idx]);
                }
                // 元素右边线
                if (Math.abs(oPositions[idx].left - cPosition.right) <= aMin) {
                  cPosition.left = oPositions[idx].left - cPosition.width;
                  removeVerLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].vCenter - cPosition.right) <= aMin) {
                  cPosition.left = oPositions[idx].vCenter - cPosition.width;
                  removeVerLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].right - cPosition.right) <= aMin) {
                  cPosition.left = oPositions[idx].right - cPosition.width;
                  removeVerLine(oPositions[idx]);
                }
                // 元素顶边线
                if (Math.abs(oPositions[idx].top - cPosition.top) <= aMin) {
                  cPosition.top = oPositions[idx].top;
                  removeHorLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].hCenter - cPosition.top) <= aMin) {
                  cPosition.top = oPositions[idx].hCenter;
                  removeHorLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].bottom - cPosition.top) <= aMin) {
                  cPosition.top = oPositions[idx].bottom;
                  removeHorLine(oPositions[idx]);
                }
                // 元素水平中线
                if (Math.abs(oPositions[idx].top - cPosition.hCenter) <= aMin) {
                  cPosition.top = oPositions[idx].top - cPosition.height / 2;
                  removeHorLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].hCenter - cPosition.hCenter) <= aMin) {
                  cPosition.top = oPositions[idx].hCenter - cPosition.height / 2;
                  removeHorLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].bottom - cPosition.hCenter) <= aMin) {
                  cPosition.top = oPositions[idx].bottom - cPosition.height / 2;
                  removeHorLine(oPositions[idx]);
                }
                // 元素底边线
                if (Math.abs(oPositions[idx].top - cPosition.bottom) <= aMin) {
                  cPosition.top = oPositions[idx].top - cPosition.height;
                  removeHorLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].hCenter - cPosition.bottom) <= aMin) {
                  cPosition.top = oPositions[idx].hCenter - cPosition.height;
                  removeHorLine(oPositions[idx]);
                } else if (Math.abs(oPositions[idx].bottom - cPosition.bottom) <= aMin) {
                  cPosition.top = oPositions[idx].bottom - cPosition.height;
                  removeHorLine(oPositions[idx]);
                }
  
                if (showAline) {
                  if (Math.abs(oPositions[idx].left - cPosition.left) > aMin && Math.abs(oPositions[idx].left - cPosition.left) <= aLMin) {// 左
                    createVerLine(oPositions[idx], cPosition, "left", "left", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].vCenter - cPosition.left) > aMin && Math.abs(oPositions[idx].vCenter - cPosition.left) <= aLMin) {
                    createVerLine(oPositions[idx], cPosition, "vCenter", "left", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].right - cPosition.left) > aMin && Math.abs(oPositions[idx].right - cPosition.left) <= aLMin) {
                    createVerLine(oPositions[idx], cPosition, "right", "left", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].left - cPosition.vCenter) > aMin && Math.abs(oPositions[idx].left - cPosition.vCenter) <= aLMin) {// 中
                    createVerLine(oPositions[idx], cPosition, "left", "vCenter", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].vCenter - cPosition.vCenter) > aMin && Math.abs(oPositions[idx].vCenter - cPosition.vCenter) <= aLMin) {
                    createVerLine(oPositions[idx], cPosition, "vCenter", "vCenter", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].right - cPosition.vCenter) > aMin && Math.abs(oPositions[idx].right - cPosition.vCenter) <= aLMin) {
                    createVerLine(oPositions[idx], cPosition, "right", "vCenter", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].left - cPosition.right) > aMin && Math.abs(oPositions[idx].left - cPosition.right) <= aLMin) {// 右
                    createVerLine(oPositions[idx], cPosition, "left", "right", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].vCenter - cPosition.right) > aMin && Math.abs(oPositions[idx].vCenter - cPosition.right) <= aLMin) {
                    createVerLine(oPositions[idx], cPosition, "vCenter", "right", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].right - cPosition.right) > aMin && Math.abs(oPositions[idx].right - cPosition.right) <= aLMin) {
                    createVerLine(oPositions[idx], cPosition, "right", "right", paperH, paperContent);
                  } else if (Math.abs(oPositions[idx].top - cPosition.top) > aMin && Math.abs(oPositions[idx].top - cPosition.top) <= aLMin) {// 上
                    createHorLine(oPositions[idx], cPosition, "top", "top", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].hCenter - cPosition.top) > aMin && Math.abs(oPositions[idx].hCenter - cPosition.top) <= aLMin) {
                    createHorLine(oPositions[idx], cPosition, "hCenter", "top", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].bottom - cPosition.top) > aMin && Math.abs(oPositions[idx].bottom - cPosition.top) <= aLMin) {
                    createHorLine(oPositions[idx], cPosition, "bottom", "top", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].top - cPosition.hCenter) > aMin && Math.abs(oPositions[idx].top - cPosition.hCenter) <= aLMin) {// 中
                    createHorLine(oPositions[idx], cPosition, "top", "hCenter", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].hCenter - cPosition.hCenter) > aMin && Math.abs(oPositions[idx].hCenter - cPosition.hCenter) <= aLMin) {
                    createHorLine(oPositions[idx], cPosition, "hCenter", "hCenter", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].bottom - cPosition.hCenter) > aMin && Math.abs(oPositions[idx].bottom - cPosition.hCenter) <= aLMin) {
                    createHorLine(oPositions[idx], cPosition, "bottom", "hCenter", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].top - cPosition.bottom) > aMin && Math.abs(oPositions[idx].top - cPosition.bottom) <= aLMin) {// 下
                    createHorLine(oPositions[idx], cPosition, "top", "bottom", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].hCenter - cPosition.bottom) > aMin && Math.abs(oPositions[idx].hCenter - cPosition.bottom) <= aLMin) {
                    createHorLine(oPositions[idx], cPosition, "hCenter", "bottom", paperW, paperContent);
                  } else if (Math.abs(oPositions[idx].bottom - cPosition.bottom) > aMin && Math.abs(oPositions[idx].bottom - cPosition.bottom) <= aLMin) {
                    createHorLine(oPositions[idx], cPosition, "bottom", "bottom", paperW, paperContent);
                  } else {
                    removeVerLine(oPositions[idx]);
                    removeHorLine(oPositions[idx]);
                  }
                }
              });
            })();
            v11975.data.left = window.hinnn.pt.toPx(cPosition.left);
            v11975.data.top = window.hinnn.pt.toPx(cPosition.top);
          }
          // 当前纸张宽高
          var parent = data.parent.className.endsWith('design') ? data.parent : data.parent.offsetParent;
          var paperW = parent.clientWidth,paperH = parent.clientHeight;
          // 当前元素宽高
          var elementW = data.target.clientWidth,elementH = data.target.clientHeight,
            diffLeft = 0,diffTop = 0;
          if (v11974.options.designTarget && v11974.options.designTarget.options.transform) {
            var info = v11974.options.designTarget.options.getRectInfo();
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
          v11975.data = data;
        }
        0 != v11974.options.onDrag.call(v11975.data.target, v11975, v11930.fn.dragLengthCNum(v11975.data.left, v11974.options), v11930.fn.dragLengthCNum(v11975.data.top, v11974.options)) && v11949(v11975);
        var v11980 = v11975.data.target;
        return v11974.hidroppables.each(function () {
          var v11981 = v11930(this);
  
          if (!v11981.hidroppable("options").disabled) {
            var v11982 = v11981.offset();
            v11975.pageX > v11982.left && v11975.pageX < v11982.left + v11981.outerWidth() && v11975.pageY > v11982.top && v11975.pageY < v11982.top + v11981.outerHeight() ? (this.entered || (v11930(this).trigger("_dragenter", [v11980]), this.entered = !0), v11930(this).trigger("_dragover", [v11980])) : this.entered && (v11930(this).trigger("_dragleave", [v11980]), this.entered = !1);
          }
        }), !1;
      }
  
      function v12021(v11984) {
        // 这里原 mouseup时, 回调了 o(e) ==> onDrag
        v11930.fn.hidraggable.isDragging = !1;
        removeVerLine(), removeHorLine();
        var v11985,
          v11986,
          v11983 = v11930.data(v11984.data.target, "hidraggable"),
          v11987 = v11983.proxy,
          v11988 = v11983.options;
        v11988.revert ? 1 == v11989() ? v11930(v11984.data.target).css({
          position: v11984.data.startPosition,
          left: v11984.data.startLeft,
          top: v11984.data.startTop
        }) : v11987 ? (v11987.parent()[0] == document.body ? (v11985 = v11984.data.startX - v11984.data.offsetWidth, v11986 = v11984.data.startY - v11984.data.offsetHeight) : (v11985 = v11984.data.startLeft, v11986 = v11984.data.startTop), v11987.animate({
          left: v11985,
          top: v11986
        }, function () {
          v11990();
        })) : v11930(v11984.data.target).animate({
          left: v11984.data.startLeft,
          top: v11984.data.startTop
        }, function () {
          v11930(v11984.data.target).css("position", v11984.data.startPosition);
        }) : (v11930(v11984.data.target).css({
          position: "absolute",
          left: v11930.fn.dragLengthC(v11984.data.left, v11988),
          top: v11930.fn.dragLengthC(v11984.data.top, v11988)
        }), v11989());
  
        function v11990() {
          v11987 && v11987.remove(), v11983.proxy = null;
        }
  
        function v11989() {
          var v11991 = !1;
          return v11983.hidroppables.each(function () {
            var v11992 = v11930(this);
  
            if (!v11992.hidroppable("options").disabled) {
              var v11993 = v11992.offset();
              var ptr = this.style.transform && parseFloat(this.style.transform.slice(6, -1)) || 1;
              return v11984.pageX > v11993.left && v11984.pageX < v11993.left + v11992.outerWidth() * ptr && v11984.pageY > v11993.top && v11984.pageY < v11993.top + v11992.outerHeight() * ptr ? (v11988.revert && v11930(v11984.data.target).css({
                position: v11984.data.startPosition,
                left: v11984.data.startLeft,
                top: v11984.data.startTop
              }), v11930(this).trigger("_drop", [v11984.data.target]), v11990(), v11991 = !0, this.entered = !1, !1) : void 0;
            }
          }), v11991 || v11988.revert || v11990(), v11991;
        }
  
        return v11988.onStopDrag.call(v11984.data.target, v11984), v11930(document).unbind(".hidraggable"), setTimeout(function () {
          v11930("body").css("cursor", "");
        }, 100), !1;
      }
  
      v11930.fn.hidraggable = function (v11994, v11995) {
        return "string" == typeof v11994 ? v11930.fn.hidraggable.methods[v11994](this, v11995) : this.each(function () {
          var v11996,
            v11997 = v11930.data(this, "hidraggable");
          v11997 ? (v11997.handle.unbind(".hidraggable"), v11996 = v11930.extend(v11997.options, v11994)) : v11996 = v11930.extend({}, v11930.fn.hidraggable.defaults, v11930.fn.hidraggable.parseOptions(this), v11994 || {});
          var v11998 = v11996.handle ? "string" == typeof v11996.handle ? v11930(v11996.handle, this) : v11996.handle : v11930(this);
  
          function v12011(v12000) {
            var v12001 = v11930.data(v12000.data.target, "hidraggable"),
              v12002 = v12001.handle,
              v12003 = v11930(v12002).offset(),
              tr = v11930(v12002)[0].style.transform && parseInt(v11930(v12002)[0].style.transform.slice(7, -1)),
              ptr = v12001.options.getScale(),
              v12004 = v11930(v12002).outerWidth();
            var v12005 = v11930(v12002).outerHeight();
            if (tr) {
              var rad = tr * Math.PI / 180,
                width = v11930(v12002).outerWidth(),
                height = v11930(v12002).outerHeight(),
                sin = Math.sin(rad),
                cos = Math.cos(rad);
              v12004 = Math.abs(width * cos) + Math.abs(height * sin),
              v12005 = Math.abs(width * sin) + Math.abs(height * cos);
            }
            if (ptr) {
              v12004 *= ptr, v12005 *= ptr;
            }
            var v12006 = v12000.pageY - v12003.top,
              v11999 = v12003.left + v12004 - v12000.pageX,
              v12007 = v12003.top + v12005 - v12000.pageY,
              v12008 = v12000.pageX - v12003.left;
            return Math.min(v12006, v11999, v12007, v12008) > v12001.options.edge;
          }
  
          v11930.data(this, "hidraggable", {
            options: v11996,
            handle: v11998
          }), v11996.disabled ? v11930(this).css("cursor", "") : v11998.unbind(".hidraggable").bind("mousemove.hidraggable", {
            target: this
          }, function (v12009) {
            if (!v11930.fn.hidraggable.isDragging) {
              var v12010 = v11930.data(v12009.data.target, "hidraggable").options;
              v12011(v12009) ? v11930(this).css("cursor", v12010.cursor) : v11930(this).css("cursor", "");
            }
          }).bind("mouseleave.hidraggable", {
            target: this
          }, function (v12012) {
            v11930(this).css("cursor", "");
          }).bind("mousedown.hidraggable", {
            target: this
          }, function (v12013) {
            if (0 != v12011(v12013)) {
              v11930(this).css("cursor", "");
              var v12014 = v11930(v12013.data.target).position(),
                v12015 = v11930(v12013.data.target).offset(),
                v12016 = {
                  startPosition: v11930(v12013.data.target).css("position"),
                  startLeft: v12014.left,
                  startTop: v12014.top,
                  left: v12014.left,
                  top: v12014.top,
                  startX: v12013.pageX,
                  startY: v12013.pageY,
                  offsetWidth: v12013.pageX - v12015.left,
                  offsetHeight: v12013.pageY - v12015.top,
                  target: v12013.data.target,
                  parent: v11930(v12013.data.target).parent()[0]
                };
              var ops = v11930.data(v12013.data.target, "hidraggable");
              // item禁止移动
              if (ops.options.draggable === false) {
                return;
              }
              // 旋转时不允许移动
              if ('r resizebtn' == v12013.target.className) {
                return;
              }
              var ptr = ops.options.getScale();
              if (ptr) {
                v12016.left /= ptr, v12016.top /= ptr, v12016.startLeft /= ptr, v12016.startTop /= ptr;
              }
              var tr = v12016.target.style.transform && parseInt(v12016.target.style.transform.slice(7, -1));
              if (tr) {
                var rad = tr * Math.PI / 180,
                  width = v11930(v12013.data.target).outerWidth(),
                  height = v11930(v12013.data.target).outerHeight(),
                  sin = Math.sin(rad),
                  cos = Math.cos(rad);
                var v12017 = Math.abs(width * cos) + Math.abs(height * sin),
                  v12018 = Math.abs(width * sin) + Math.abs(height * cos);
                var diffW = (v12017 - width) / 2,diffH = (v12018 - height) / 2;
                v12016.left += diffW, v12016.top += diffH, v12016.startLeft += diffW, v12016.startTop += diffH;
              }
              v11930.extend(v12013.data, v12016);
              0 != v11930.data(v12013.data.target, "hidraggable").options.onBeforeDrag.call(v12013.data.target, v12013) && (v11930(document).bind("mousedown.hidraggable", v12013.data, v12019), v11930(document).bind("mousemove.hidraggable", v12013.data, v12020), v11930(document).bind("mouseup.hidraggable", v12013.data, v12021));
            }
          });
        });
      }, v11930.fn.hidraggable.methods = {
        options: function options(v12022) {
          return v11930.data(v12022[0], "hidraggable").options;
        },
        update: function update(v12023, v12024) {
          if (v12024 && "object" == typeof v12024) {
            v11930.data(v12023[0], "hidraggable") && Object.keys(v12024).forEach(function (v12025) {
              v11930.data(v12023[0], "hidraggable").options[v12025] = v12024[v12025];
            });
          }
        },
        proxy: function proxy(v12026) {
          return v11930.data(v12026[0], "hidraggable").proxy;
        },
        enable: function enable(v12027) {
          return v12027.each(function () {
            v11930(this).hidraggable({
              disabled: !1
            });
          });
        },
        disable: function disable(v12028) {
          return v12028.each(function () {
            v11930(this).hidraggable({
              disabled: !0
            });
          });
        }
      }, v11930.fn.hidraggable.parseOptions = function (v12029) {
        var v12030 = v11930(v12029);
        return v11930.extend({}, v11930.hiprintparser.parseOptions(v12029, ["cursor", "handle", "axis", {
          revert: "boolean",
          deltaX: "number",
          deltaY: "number",
          edge: "number"
        }]), {
          disabled: !!v12030.attr("disabled") || void 0
        });
      }, v11930.fn.hidraggable.defaults = {
        proxy: null,
        revert: !1,
        cursor: "move",
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: !1,
        edge: 0,
        axis: null,
        getScale: function getScale(v12031) {},
        onBeforeDrag: function onBeforeDrag(v12032) {
        },
        onStartDrag: function onStartDrag(v12033) {
        },
        onDrag: function onDrag(v12034) {
        },
        onStopDrag: function onStopDrag(v12035) {
        }
      }, v11930.fn.hidraggable.isDragging = !1;
    }(jQuery);
  }