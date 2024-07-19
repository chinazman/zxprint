"use strict";

/**
 * import 相关资源
 */
import PrintLib from "../components/02PrintLib";
export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";

    webpack_require.d(webpack_exports, "a", function () {
      return PrintLib;
    });
  }