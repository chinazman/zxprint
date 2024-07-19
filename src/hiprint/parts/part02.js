"use strict";

/**
 * import 相关资源
 */
import {$} from "../hiprint.comm.js";
export default function (webpack_module, webpack_exports, webpack_require) {
    "use strict";
  
    var v10140 = function () {
      function v10142(v10141) {
        this.printElement = v10141;
      }
  
      return v10142.prototype.updatePosition = function (v10143, v10144) {
        this.left = v10143, this.top = v10144;
      }, v10142;
    }();
  
    webpack_require.d(webpack_exports, "a", function () {
      return v10146;
    });
  
    var v10146 = function () {
      function v10147() {
        this.printTemplateContainer = {}, this.A1 = {
          width: 841,
          height: 594
        }, this.A2 = {
          width: 420,
          height: 594
        }, this.A3 = {
          width: 420,
          height: 297
        }, this.A4 = {
          width: 210,
          height: 297
        }, this.A5 = {
          width: 210,
          height: 148
        }, this.A6 = {
          width: 105,
          height: 148
        }, this.A7 = {
          width: 105,
          height: 74
        }, this.A8 = {
          width: 52,
          height: 74
        }, this.B1 = {
          width: 1e3,
          height: 707
        }, this.B2 = {
          width: 500,
          height: 707
        }, this.B3 = {
          width: 500,
          height: 353
        }, this.B4 = {
          width: 250,
          height: 353
        }, this.B5 = {
          width: 250,
          height: 176
        }, this.B6 = {
          width: 125,
          height: 176
        }, this.B7 = {
          width: 125,
          height: 88
        }, this.B8 = {
          width: 62,
          height: 88
        }, this.dragLengthCNum = function (v10148, v10149) {
          var v10150 = .75 * v10148;
          return v10149 && (v10149 = v10149), Math.round(v10150 / v10149) * v10149;
        };
      }
  
      return Object.defineProperty(v10147, "instance", {
        get: function get() {
          return this._instance || (this._instance = new v10147()), this._instance;
        },
        enumerable: !0,
        configurable: !0
      }), v10147.prototype.getDragingPrintElement = function () {
        return v10147.instance.dragingPrintElement;
      }, v10147.prototype.setDragingPrintElement = function (v10151) {
        v10147.instance.dragingPrintElement = new v10140(v10151);
      }, v10147.prototype.guid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (v10152) {
          var v10153 = 16 * Math.random() | 0;
          return ("x" == v10152 ? v10153 : 3 & v10153 | 8).toString(16);
        });
      }, v10147.prototype.imageToBase64 = function (v10154) {
        if (-1 == $(v10154).attr("src").indexOf("base64")) try {
          var v10155 = document.createElement("canvas"),
            v10156 = new Image();
          v10156.src = v10154.attr("src"), v10155.width = v10156.width, v10155.height = v10156.height, v10155.getContext("2d").drawImage(v10156, 0, 0), v10154.attr("src", v10155.toDataURL("image/png"));
        } catch (v10157) {
          try {
            this.xhrLoadImage(v10154);
          } catch (v10158) {
            console.log(v10158);
          }
        }
      }, v10147.prototype.xhrLoadImage = function (v10159) {
      }, v10147.prototype.transformImg = function (v10160) {
        var v10161 = this;
        v10160.map(function (v10162, v10163) {
          v10161.imageToBase64($(v10163));
        });
      }, v10147.prototype.getPrintTemplateById = function (v10164) {
        return v10147.instance.printTemplateContainer[v10164];
      }, v10147.prototype.setPrintTemplateById = function (v10165, v10166) {
        return v10147.instance.printTemplateContainer[v10165] = v10166;
      }, v10147;
    }();
  }