"use strict";

/**
 * import 相关资源
 */
import {jQuery} from "../hiprint.comm.js";

export default function (webpack_module, webpack_exports) {
    !function (v12038) {
      v12038.fn.hidroppable = function (v12039, v12040) {
        return "string" == typeof v12039 ? v12038.fn.hidroppable.methods[v12039](this, v12040) : (v12039 = v12039 || {}, this.each(function () {
          var v12041,
            v12042 = v12038.data(this, "hidroppable");
          v12042 ? v12038.extend(v12042.options, v12039) : (v12038(v12041 = this).addClass("hidroppable"), v12038(v12041).bind("_dragenter", function (v12043, v12044) {
            v12038.data(v12041, "hidroppable").options.onDragEnter.apply(v12041, [v12043, v12044]);
          }), v12038(v12041).bind("_dragleave", function (v12045, v12046) {
            v12038.data(v12041, "hidroppable").options.onDragLeave.apply(v12041, [v12045, v12046]);
          }), v12038(v12041).bind("_dragover", function (v12047, v12048) {
            v12038.data(v12041, "hidroppable").options.onDragOver.apply(v12041, [v12047, v12048]);
          }), v12038(v12041).bind("_drop", function (v12049, v12050) {
            v12038.data(v12041, "hidroppable").options.onDrop.apply(v12041, [v12049, v12050]);
          }), v12038.data(this, "hidroppable", {
            options: v12038.extend({}, v12038.fn.hidroppable.defaults, v12038.fn.hidroppable.parseOptions(this), v12039)
          }));
        }));
      }, v12038.fn.hidroppable.methods = {
        options: function options(v12051) {
          return v12038.data(v12051[0], "hidroppable").options;
        },
        enable: function enable(v12052) {
          return v12052.each(function () {
            v12038(this).hidroppable({
              disabled: !1
            });
          });
        },
        disable: function disable(v12053) {
          return v12053.each(function () {
            v12038(this).hidroppable({
              disabled: !0
            });
          });
        }
      }, v12038.fn.hidroppable.parseOptions = function (v12054) {
        var v12055 = v12038(v12054);
        return v12038.extend({}, v12038.hiprintparser.parseOptions(v12054, ["accept"]), {
          disabled: !!v12055.attr("disabled") || void 0
        });
      }, v12038.fn.hidroppable.defaults = {
        accept: null,
        disabled: !1,
        onDragEnter: function onDragEnter(v12056, v12057) {
        },
        onDragOver: function onDragOver(v12058, v12059) {
        },
        onDragLeave: function onDragLeave(v12060, v12061) {
        },
        onDrop: function onDrop(v12062, v12063) {
        }
      };
    }(jQuery);
  }