"use strict";


export default function (v12345, v12346) {
    v12345.exports = function (v12347) {
      var v12348 = "undefined" != typeof window && window.location;
      if (!v12348) throw new Error("fixUrls requires window.location");
      if (!v12347 || "string" != typeof v12347) return v12347;
      var v12349 = v12348.protocol + "//" + v12348.host,
        v12350 = v12349 + v12348.pathname.replace(/\/[^\/]*$/, "/");
      return v12347.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (v12351, v12352) {
        var v12353,
          v12354 = v12352.trim().replace(/^"(.*)"$/, function (v12355, v12356) {
            return v12356;
          }).replace(/^'(.*)'$/, function (v12357, v12358) {
            return v12358;
          });
        return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(v12354) ? v12351 : (v12353 = 0 === v12354.indexOf("//") ? v12354 : 0 === v12354.indexOf("/") ? v12349 + v12354 : v12350 + v12354.replace(/^\.\//, ""), "url(" + JSON.stringify(v12353) + ")");
      });
    };
  }