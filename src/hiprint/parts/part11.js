"use strict";

/*

 */

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return v11334;
    });
  
    var v11334 = function () {
      function v11335() {
      }
  
      return v11335.createId = function () {
        return this.id += 1, this.id;
      }, v11335.id = 1, v11335;
    }();
  }