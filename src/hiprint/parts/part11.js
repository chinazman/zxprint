"use strict";

/*

 */


export default function (v11330, v11331, v11332) {
    "use strict";
  
    v11332.d(v11331, "a", function () {
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