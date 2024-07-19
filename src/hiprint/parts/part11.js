"use strict";

/*

 */
import IdGenerator from "../components/11IdGenerator";

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return IdGenerator;
    });
  }