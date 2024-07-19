"use strict";

/**
 * import 相关资源
 */
import PrintTableCell from "../components/05PrintTableCell.js";

export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
    webpack_require.d(webpack_exports, "a", function () {
      return PrintTableCell;
    });
  }