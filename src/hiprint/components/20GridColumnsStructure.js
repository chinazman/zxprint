"use strict";


  
    var GridColumnsStructure = function () {
      function v11923(v11921, v11922) {
        this.gridColumns = v11921, this.target = v11922;
      }
  
      return v11923.prototype.getByIndex = function (v11924) {
        return this.target.find(".hi-grid-col:eq(" + v11924 + ")");
      }, v11923;
    }();
export default GridColumnsStructure;