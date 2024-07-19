"use strict";

/**
 * webpack处理样式的没有用
 */
import {_instanceof,_typeof} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports, webpack_require) {
    var v12247,
      v12248,
      v12249 = {},
      v12250 = (v12247 = function v12251() {
        return window && document && document.all && !window.atob;
      }, function () {
        return void 0 === v12248 && (v12248 = v12247.apply(this, arguments)), v12248;
      }),
      v12252 = function (v12253) {
        var v12254 = {};
        return function (v12255, v12256) {
          if ("function" == typeof v12255) return v12255();
  
          if (void 0 === v12254[v12255]) {
            var v12257 = function (v12258, v12259) {
              return v12259 ? v12259.querySelector(v12258) : document.querySelector(v12258);
            }.call(this, v12255, v12256);
  
            if (window.HTMLIFrameElement && _instanceof(v12257, window.HTMLIFrameElement)) try {
              v12257 = v12257.contentDocument.head;
            } catch (v12260) {
              v12257 = null;
            }
            v12254[v12255] = v12257;
          }
  
          return v12254[v12255];
        };
      }(),
      v12261 = null,
      v12262 = 0,
      v12263 = [],
      v12264 = webpack_require(31);
  
    function v12265(v12266, v12267) {
      for (var v12268 = 0; v12268 < v12266.length; v12268++) {
        var v12269 = v12266[v12268],
          v12270 = v12249[v12269.id];
  
        if (v12270) {
          v12270.refs++;
  
          for (var v12271 = 0; v12271 < v12270.parts.length; v12271++) {
            v12270.parts[v12271](v12269.parts[v12271]);
          }
  
          for (; v12271 < v12269.parts.length; v12271++) {
            v12270.parts.push(v12272(v12269.parts[v12271], v12267));
          }
        } else {
          var v12273 = [];
  
          for (v12271 = 0; v12271 < v12269.parts.length; v12271++) {
            v12273.push(v12272(v12269.parts[v12271], v12267));
          }
  
          v12249[v12269.id] = {
            id: v12269.id,
            refs: 1,
            parts: v12273
          };
        }
      }
    }
  
    function v12274(v12275, v12276) {
      for (var v12277 = [], v12278 = {}, v12279 = 0; v12279 < v12275.length; v12279++) {
        var v12280 = v12275[v12279],
          v12281 = v12276.base ? v12280[0] + v12276.base : v12280[0],
          v12282 = {
            css: v12280[1],
            media: v12280[2],
            sourceMap: v12280[3]
          };
        v12278[v12281] ? v12278[v12281].parts.push(v12282) : v12277.push(v12278[v12281] = {
          id: v12281,
          parts: [v12282]
        });
      }
  
      return v12277;
    }
  
    function v12283(v12284, v12285) {
      var v12286 = v12252(v12284.insertInto);
      if (!v12286) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
      var v12287 = v12263[v12263.length - 1];
      if ("top" === v12284.insertAt) v12287 ? v12287.nextSibling ? v12286.insertBefore(v12285, v12287.nextSibling) : v12286.appendChild(v12285) : v12286.insertBefore(v12285, v12286.firstChild), v12263.push(v12285);else if ("bottom" === v12284.insertAt) v12286.appendChild(v12285);else {
        if ("object" != _typeof(v12284.insertAt) || !v12284.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
        var v12288 = v12252(v12284.insertAt.before, v12286);
        v12286.insertBefore(v12285, v12288);
      }
    }
  
    function v12289(v12290) {
      if (null === v12290.parentNode) return !1;
      v12290.parentNode.removeChild(v12290);
      var v12291 = v12263.indexOf(v12290);
      v12291 >= 0 && v12263.splice(v12291, 1);
    }
  
    function v12292(v12293) {
      var v12294 = document.createElement("style");
  
      if (void 0 === v12293.attrs.type && (v12293.attrs.type = "text/css"), void 0 === v12293.attrs.nonce) {
        var v12295 = function () {
          0;
          return webpack_require.nc;
        }();
  
        v12295 && (v12293.attrs.nonce = v12295);
      }
  
      return v12296(v12294, v12293.attrs), v12283(v12293, v12294), v12294;
    }
  
    function v12296(v12297, v12298) {
      Object.keys(v12298).forEach(function (v12299) {
        v12297.setAttribute(v12299, v12298[v12299]);
      });
    }
  
    function v12272(v12300, v12301) {
      var v12302, v12303, v12304, v12305;
  
      if (v12301.transform && v12300.css) {
        if (!(v12305 = "function" == typeof v12301.transform ? v12301.transform(v12300.css) : v12301.transform.default(v12300.css))) return function () {
        };
        v12300.css = v12305;
      }
  
      if (v12301.singleton) {
        var v12306 = v12262++;
        v12302 = v12261 || (v12261 = v12292(v12301)), v12303 = v12307.bind(null, v12302, v12306, !1), v12304 = v12307.bind(null, v12302, v12306, !0);
      } else v12300.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (v12302 = function (v12308) {
        var v12309 = document.createElement("link");
        return void 0 === v12308.attrs.type && (v12308.attrs.type = "text/css"), v12308.attrs.rel = "stylesheet", v12296(v12309, v12308.attrs), v12283(v12308, v12309), v12309;
      }(v12301), v12303 = function (v12310, v12311, v12312) {
        var v12313 = v12312.css,
          v12314 = v12312.sourceMap,
          v12315 = void 0 === v12311.convertToAbsoluteUrls && v12314;
        (v12311.convertToAbsoluteUrls || v12315) && (v12313 = v12264(v12313));
        v12314 && (v12313 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(v12314)))) + " */");
        var v12316 = new Blob([v12313], {
            type: "text/css"
          }),
          v12317 = v12310.href;
        v12310.href = URL.createObjectURL(v12316), v12317 && URL.revokeObjectURL(v12317);
      }.bind(null, v12302, v12301), v12304 = function v12318() {
        v12289(v12302), v12302.href && URL.revokeObjectURL(v12302.href);
      }) : (v12302 = v12292(v12301), v12303 = function (v12319, v12320) {
        var v12321 = v12320.css,
          v12322 = v12320.media;
        v12322 && v12319.setAttribute("media", v12322);
        if (v12319.styleSheet) v12319.styleSheet.cssText = v12321;else {
          for (; v12319.firstChild;) {
            v12319.removeChild(v12319.firstChild);
          }
  
          v12319.appendChild(document.createTextNode(v12321));
        }
      }.bind(null, v12302), v12304 = function v12323() {
        v12289(v12302);
      });
  
      return v12303(v12300), function (v12324) {
        if (v12324) {
          if (v12324.css === v12300.css && v12324.media === v12300.media && v12324.sourceMap === v12300.sourceMap) return;
          v12303(v12300 = v12324);
        } else v12304();
      };
    }
  
    webpack_module.exports = function (v12325, v12326) {
      if ("undefined" != typeof DEBUG && DEBUG && "object" != (typeof document === "undefined" ? "undefined" : _typeof(document))) throw new Error("The style-loader cannot be used in a non-browser environment");
      (v12326 = v12326 || {}).attrs = "object" == _typeof(v12326.attrs) ? v12326.attrs : {}, v12326.singleton || "boolean" == typeof v12326.singleton || (v12326.singleton = v12250()), v12326.insertInto || (v12326.insertInto = "head"), v12326.insertAt || (v12326.insertAt = "bottom");
      var v12327 = v12274(v12325, v12326);
      return v12265(v12327, v12326), function (v12328) {
        for (var v12329 = [], v12330 = 0; v12330 < v12327.length; v12330++) {
          var v12331 = v12327[v12330];
          (v12332 = v12249[v12331.id]).refs--, v12329.push(v12332);
        }
  
        v12328 && v12265(v12274(v12328, v12326), v12326);
  
        for (v12330 = 0; v12330 < v12329.length; v12330++) {
          var v12332;
  
          if (0 === (v12332 = v12329[v12330]).refs) {
            for (var v12333 = 0; v12333 < v12332.parts.length; v12333++) {
              v12332.parts[v12333]();
            }
  
            delete v12249[v12332.id];
          }
        }
      };
    };
  
    var v12334,
      v12335 = (v12334 = [], function (v12336, v12337) {
        return v12334[v12336] = v12337, v12334.filter(Boolean).join("\n");
      });
  
    function v12307(v12338, v12339, v12340, v12341) {
      var v12342 = v12340 ? "" : v12341.css;
      if (v12338.styleSheet) v12338.styleSheet.cssText = v12335(v12339, v12342);else {
        var v12343 = document.createTextNode(v12342),
          v12344 = v12338.childNodes;
        v12344[v12339] && v12338.removeChild(v12344[v12339]), v12344.length ? v12338.insertBefore(v12343, v12344[v12339]) : v12338.appendChild(v12343);
      }
    }
  }