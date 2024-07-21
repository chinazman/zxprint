import {jQuery} from "../hiprint.comm.js";


// 上下文菜单插件
(function ($) {
  // 上下文菜单构造函数
  let ContextMenu = function (element, options) {
    this.init(element, options);
  };

  ContextMenu.prototype = {
    // 初始化方法
    init: function (element, options) {
      this.ele = element;
      this.defaults = {
        menu: [{
          text: "text",
          menus: [{}, {}],
          callback: function () {}
        }],
        target: function (element) {},
        width: 100,
        itemHeight: 28,
        bgColor: "#fff",
        color: "#333",
        fontSize: 14,
        hoverBgColor: "#f5f5f5"
      };
      this.opts = $.extend(true, {}, this.defaults, options);
      this.random = new Date().getTime() + parseInt(Math.random() * 1000);
      this.eventBind();
    },

    // 渲染菜单
    renderMenu: function (menuData, container) {
      let self = this;
      let rootMenu = container;

      if (menuData && menuData.length) {
        let menuList = $('<ul class="hicontextmenu" style="z-index: 9999;"></ul>');
        if (!rootMenu) {
          rootMenu = menuList;
          rootMenu.addClass("hicontextmenuroot");
        }

        $.each(menuData, function (index, menuItem) {
          let isDisabled = !!menuItem.disable && menuItem.disable();
          let menuItemElement = $('<li class="hicontextmenuitem"><a href="javascript:void(0);"><span>' + (menuItem.text || "") + '</span></a></li>');
          
          if (isDisabled) {
            menuItemElement.addClass("disable");
          }
          if (menuItem.borderBottom) {
            menuItemElement.addClass("borderBottom");
          }
          if (menuItem.menus) {
            menuItemElement.addClass("hicontextsubmenu");
            self.renderMenu(menuItem.menus, menuItemElement);
          }
          if (menuItem.callback) {
            menuItemElement.click(function (e) {
              if ($(this).hasClass("disable")) {
                e.stopPropagation();
              } else {
                $(".hicontextmenuroot").remove();
                menuItem.callback();
                e.stopPropagation();
              }
            });
          }
          menuList.append(menuItemElement);
        });

        if (container) {
          container.append(menuList);
        }
      }

      if (!container) {
        $("body").append(rootMenu).find(".hicontextmenuroot").hide();
      }
    },

    // 设置菜单位置
    setPosition: function (e) {
      $(".hicontextmenuroot").css({
        left: e.pageX + 2,
        top: e.pageY + 2
      }).show();
    },

    // 绑定事件
    eventBind: function () {
      let self = this;
      this.ele.on("contextmenu", function (e) {
        $(".hicontextmenuroot").remove();
        e.preventDefault();
        self.renderMenu(self.opts.menus);
        self.setPosition(e);
        if (self.opts.target && typeof self.opts.target === "function") {
          self.opts.target($(this));
        }
      });

      $("body").on("click", function () {
        $(".hicontextmenuroot").remove();
      });
    }
  };

  // 注册 jQuery 插件
  $.fn.hicontextMenu = function (options) {
    return new ContextMenu(this, options), this;
  };
})(jQuery);