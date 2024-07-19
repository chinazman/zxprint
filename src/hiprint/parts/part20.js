"use strict";

export default function (v11916, v11917, v11918) {
    "use strict";
  
    v11918.d(v11917, "a", function () {
      return v11920;
    });
  
    var v11920 = function () {
      function v11923(v11921, v11922) {
        this.gridColumns = v11921, this.target = v11922;
      }
  
      return v11923.prototype.getByIndex = function (v11924) {
        return this.target.find(".hi-grid-col:eq(" + v11924 + ")");
      }, v11923;
    }();
  }