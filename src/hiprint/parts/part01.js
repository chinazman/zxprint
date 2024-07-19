"use strict";

/**
 * import 相关资源
 */
import {$} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return v10126;
    });
  
    var v10127 = webpack_require(9),
      v10126 = function () {
        function v10128() {
  
          // see hiprint.config.js
        }
        return v10128.prototype.init = function (v10129) {
          v10129 && $.extend(this, v10129);
        }, v10128.prototype.on = function (v10130, v10131) {
          hinnn.event.on(v10130, v10131);
        }, v10128.prototype.clear = function (v10132) {
          hinnn.event.clear(v10132);
        }, v10128.prototype.registerItems = function (items) {
          items.forEach(function (v10133) {
            v10127.a.registerItem(new v10133());
          });
        }, Object.defineProperty(v10128, "instance", {
          get: function get() {
            return v10128._instance || (v10128._instance = new v10128(), window.HIPRINT_CONFIG && $.extend(v10128._instance, HIPRINT_CONFIG), v10128._instance.optionItems && v10128._instance.optionItems.forEach(function (v10135) {
              v10127.a.registerItem(new v10135());
            })), v10128._instance;
          },
          enumerable: !0,
          configurable: !0
        }), v10128;
      }();
  }