"use strict";

export default function (v12222, v12223, v12224) {
    "use strict";
  
    v12222.exports = function (v12225) {
      var v12226 = [];
      return v12226.toString = function () {
        return this.map(function (v12227) {
          var v12228 = function (v12229, v12230) {
            var v12231 = v12229[1] || "",
              v12232 = v12229[3];
            if (!v12232) return v12231;
  
            if (v12230 && "function" == typeof btoa) {
              var v12233 = (v12234 = v12232, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(v12234)))) + " */"),
                v12235 = v12232.sources.map(function (v12236) {
                  return "/*# sourceURL=" + v12232.sourceRoot + v12236 + " */";
                });
              return [v12231].concat(v12235).concat([v12233]).join("\n");
            }
  
            var v12234;
            return [v12231].join("\n");
          }(v12227, v12225);
  
          return v12227[2] ? "@media " + v12227[2] + "{" + v12228 + "}" : v12228;
        }).join("");
      }, v12226.i = function (v12238, v12239) {
        "string" == typeof v12238 && (v12238 = [[null, v12238, ""]]);
  
        for (var v12240 = {}, v12241 = 0; v12241 < this.length; v12241++) {
          var v12242 = this[v12241][0];
          null != v12242 && (v12240[v12242] = !0);
        }
  
        for (v12241 = 0; v12241 < v12238.length; v12241++) {
          var v12243 = v12238[v12241];
          null != v12243[0] && v12240[v12243[0]] || (v12239 && !v12243[2] ? v12243[2] = v12239 : v12239 && (v12243[2] = "(" + v12243[2] + ") and (" + v12239 + ")"), v12226.push(v12243));
        }
      }, v12226;
    };
  }