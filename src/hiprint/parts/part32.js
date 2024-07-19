"use strict";

/**
 * import 相关资源
 */
import {$,jQuery} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports) {
    var v12361, v12362;
    window, document, v12361 = jQuery, (v12362 = function v12363(v12364, v12365) {
      this.init(v12364, v12365);
    }).prototype = {
      init: function init(v12366, v12367) {
        this.ele = v12366, this.defaults = {
          menu: [{
            text: "text",
            menus: [{}, {}],
            callback: function callback() {
            }
          }],
          target: function target(v12368) {
          },
          width: 100,
          itemHeight: 28,
          bgColor: "#fff",
          color: "#333",
          fontSize: 14,
          hoverBgColor: "#f5f5f5"
        }, this.opts = v12361.extend(!0, {}, this.defaults, v12367), this.random = new Date().getTime() + parseInt(1e3 * Math.random()), this.eventBind();
      },
      renderMenu: function renderMenu(v12369, v12370) {
        var v12371 = this,
          v12372 = v12370;
  
        if (v12369 && v12369.length) {
          var v12373 = $('<ul class="hicontextmenu" style="z-index: 9999;"></ul>');
          v12372 || (v12372 = v12373).addClass("hicontextmenuroot"), $.each(v12369, function (v12374, v12375) {
            var v12376 = !!v12375.disable && v12375.disable(),
              v12377 = $('<li class="hicontextmenuitem"><a href="javascript:void(0);"><span>' + (v12375.text || "") + "</span></a></li>");
            v12376 && v12377.addClass("disable"), v12375.borderBottom && v12377.addClass("borderBottom"), v12375.menus && (v12377.addClass("hicontextsubmenu"), v12371.renderMenu(v12375.menus, v12377)), v12375.callback && v12377.click(function (v12378) {
              $(this).hasClass("disable") ? v12378.stopPropagation() : ($(".hicontextmenuroot").remove(), v12375.callback(), v12378.stopPropagation());
            }), v12373.append(v12377);
          }), v12370 && v12370.append(v12373);
        }
  
        v12370 || $("body").append(v12372).find(".hicontextmenuroot").hide();
      },
      setPosition: function setPosition(v12379) {
        $(".hicontextmenuroot").css({
          left: v12379.pageX + 2,
          top: v12379.pageY + 2
        }).show();
      },
      eventBind: function eventBind() {
        var v12380 = this;
        this.ele.on("contextmenu", function (v12381) {
          $(".hicontextmenuroot").remove(), v12381.preventDefault(), v12380.renderMenu(v12380.opts.menus), v12380.setPosition(v12381), v12380.opts.target && "function" == typeof v12380.opts.target && v12380.opts.target(v12361(this));
        }), v12361("body").on("click", function () {
          v12361(".hicontextmenuroot").remove();
        });
      }
    }, v12361.fn.hicontextMenu = function (v12382) {
      return new v12362(this, v12382), this;
    };
  }