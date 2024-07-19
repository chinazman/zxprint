"use strict";

/**
 * import 相关资源
 */
import PrintTableRow from "../components/13PrintTableRow";

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    webpack_require.d(webpack_exports, "a", function () {
      return PrintTableRow;
    });
  
    
  }