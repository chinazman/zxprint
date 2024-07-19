"use strict";

/**
 * import 相关资源
 */
import {jQuery} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports) {
    var v12066;
    (v12066 = jQuery).hiprintparser = {
      parseOptions: function parseOptions(v12067, v12068) {
        var v12069 = v12066(v12067),
          v12070 = {},
          v12071 = v12066.trim(v12069.attr("data-options"));
  
        if (v12071 && ("{" != v12071.substring(0, 1) && (v12071 = "{" + v12071 + "}"), v12070 = new Function("return " + v12071)()), v12068) {
          for (var v12072 = {}, v12073 = 0; v12073 < v12068.length; v12073++) {
            var v12074 = v12068[v12073];
            if ("string" == typeof v12074) v12072[v12074] = "width" == v12074 || "height" == v12074 || "left" == v12074 || "top" == v12074 ? parseInt(v12067.style[v12074]) || void 0 : v12069.attr(v12074);else for (var v12075 in v12074) {
              var v12076 = v12074[v12075];
              "boolean" == v12076 ? v12072[v12075] = v12069.attr(v12075) ? "true" == v12069.attr(v12075) : void 0 : "number" == v12076 && (v12072[v12075] = "0" == v12069.attr(v12075) ? 0 : parseFloat(v12069.attr(v12075)) || void 0);
            }
          }
  
          v12066.extend(v12070, v12072);
        }
  
        return v12070;
      }
    }, v12066.fn.dragLengthC = function (v12077, v12078) {
      return "pt" == v12078.moveUnit ? v12066.fn.dragLengthCNum(v12077, v12078) + "pt" : v12066.fn.dragLengthCNum(v12077, v12078);
    }, v12066.fn.dragLengthCNum = function (v12079, v12080) {
      var v12081 = 3;
  
      if ("pt" == v12080.moveUnit) {
        var v12082 = .75 * v12079;
        return v12080.minMove && (v12081 = v12080.minMove), Math.round(v12082 / v12081) * v12081;
      }
  
      return Math.round(v12082 / v12081) * v12081;
    };
  }