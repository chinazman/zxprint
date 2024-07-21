import {jQuery} from "../hiprint.comm.js";
// hiprint 解析器
(function ($) {
  $.hiprintparser = {
    // 解析选项方法
    parseOptions: function (target, properties) {
      let jqTarget = $(target),
        options = {},
        dataOptions = $.trim(jqTarget.attr("data-options"));

      if (dataOptions) {
        if (dataOptions.substring(0, 1) != "{") {
          dataOptions = "{" + dataOptions + "}";
        }
        options = (new Function("return " + dataOptions))();
      }

      if (properties) {
        let propertyOptions = {};
        for (let i = 0; i < properties.length; i++) {
          let property = properties[i];
          if (typeof property == "string") {
            if (property == "width" || property == "height" || property == "left" || property == "top") {
              propertyOptions[property] = parseInt(target.style[property]) || undefined;
            } else {
              propertyOptions[property] = jqTarget.attr(property);
            }
          } else {
            for (let name in property) {
              let value = property[name];
              if (value == "boolean") {
                propertyOptions[name] = jqTarget.attr(name) ? (jqTarget.attr(name) == "true") : undefined;
              } else if (value == "number") {
                propertyOptions[name] = jqTarget.attr(name) == "0" ? 0 : parseFloat(jqTarget.attr(name)) || undefined;
              }
            }
          }
        }
        $.extend(options, propertyOptions);
      }
      return options;
    }
  };

  // 拖动长度计算方法
  $.fn.dragLengthC = function (distance, options) {
    return options.moveUnit == "pt" ? $.fn.dragLengthCNum(distance, options) + "pt" : $.fn.dragLengthCNum(distance, options);
  };

  $.fn.dragLengthCNum = function (distance, options) {
    let minMove = 3;
    if (options.moveUnit == "pt") {
      let ptDistance = distance * 0.75;
      if (options.minMove) {
        minMove = options.minMove;
      }
      return Math.round(ptDistance / minMove) * minMove;
    }
    return Math.round(distance / minMove) * minMove;
  };
})(jQuery);