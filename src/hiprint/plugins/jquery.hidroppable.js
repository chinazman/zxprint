import {jQuery} from "../hiprint.comm.js";
// 定义 $ 插件 hidroppable
!function ($) {
  $.fn.hidroppable = function (options, param) {
    if (typeof options == "string") {
      return $.fn.hidroppable.methods[options](this, param);
    }
    
    options = options || {};
    return this.each(function () {
      let element,
        data = $.data(this, "hidroppable");
      if (data) {
        $.extend(data.options, options);
      } else {
        // 初始化 hidroppable 元素
        element = this;
        $(element).addClass("hidroppable");
        
        // 绑定拖拽相关事件
        $(element).bind("_dragenter", function (event, dragData) {
          $.data(element, "hidroppable").options.onDragEnter.apply(element, [event, dragData]);
        });
        
        $(element).bind("_dragleave", function (event, dragData) {
          $.data(element, "hidroppable").options.onDragLeave.apply(element, [event, dragData]);
        });
        
        $(element).bind("_dragover", function (event, dragData) {
          $.data(element, "hidroppable").options.onDragOver.apply(element, [event, dragData]);
        });
        
        $(element).bind("_drop", function (event, dragData) {
          $.data(element, "hidroppable").options.onDrop.apply(element, [event, dragData]);
        });
        
        $.data(this, "hidroppable", {
          options: $.extend({}, $.fn.hidroppable.defaults, $.fn.hidroppable.parseOptions(this), options)
        });
      }
    });
  };

  // hidroppable 方法定义
  $.fn.hidroppable.methods = {
    options: function (jqElements) {
      return $.data(jqElements[0], "hidroppable").options;
    },
    enable: function (jqElements) {
      return jqElements.each(function () {
        $(this).hidroppable({ disabled: false });
      });
    },
    disable: function (jqElements) {
      return jqElements.each(function () {
        $(this).hidroppable({ disabled: true });
      });
    }
  };

  // 解析 hidroppable 选项
  $.fn.hidroppable.parseOptions = function (target) {
    let jqTarget = $(target);
    return $.extend({}, $.hiprintparser.parseOptions(target, ["accept"]), {
      disabled: !!jqTarget.attr("disabled") || undefined
    });
  };

  // hidroppable 默认选项
  $.fn.hidroppable.defaults = {
    accept: null,
    disabled: false,
    onDragEnter: function (event, dragData) {},
    onDragOver: function (event, dragData) {},
    onDragLeave: function (event, dragData) {},
    onDrop: function (event, dragData) {}
  };
}(jQuery);