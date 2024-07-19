"use strict";
/**
 * id 工具
 */

var IdGenerator = function () {
    function v11335() {
    }

    return v11335.createId = function () {
    return this.id += 1, this.id;
    }, v11335.id = 1, v11335;
}();


  export default IdGenerator;