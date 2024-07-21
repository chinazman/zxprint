"use strict";
/*
这个JavaScript文件定义了一个名为`Ct`的模块，它主要负责管理和注册一系列的打印元素选项项（print element options）。这些选项项用于配置打印元素的各种样式和行为，例如字体、对齐方式、边框、水印、页码等。具体来说，该文件实现了以下功能：

1. **选项项注册与管理**：`Ct`模块提供了`registerItem`和`getItem`方法，用于注册和获取打印元素的选项配置。

2. **创建用户界面**：每个选项项都有一个`createTarget`方法，用于生成对应的HTML元素，这些元素构成了用户界面的一部分，允许用户进行配置。

3. **获取和设置值**：每个选项项都有`getValue`和`setValue`方法，用于从用户界面获取配置值，以及设置选项项的值。

4. **样式应用**：一些选项项具有`css`方法，用于将用户选择的样式应用到打印元素上。

5. **事件处理**：一些选项项可能还包括事件处理逻辑，例如处理用户的输入或选择。

6. **销毁方法**：每个选项项都有`destroy`方法，用于清理和移除创建的DOM元素，防止内存泄漏。

7. **国际化支持**：使用`i18n`进行国际化处理，支持多语言。

8. **条形码和二维码生成**：包含条形码和二维码的格式设置和样式配置。

9. **水印功能**：提供水印的设置选项，包括内容、颜色、大小、旋转角度等。

10. **页面布局和分页规则**：允许用户设置页面的布局方式、分页规则、页码显示等。

11. **文本格式化**：提供文本格式化的选项，如字体大小、行高、对齐方式、颜色等。

12. **边框和背景设置**：允许用户设置元素的边框样式、颜色、圆角以及背景颜色。

13. **表格特定选项**：针对表格元素的特定配置，如行列合并、表头重复、表尾显示等。

14. **数据类型和格式化**：允许用户根据不同的数据类型（如日期时间、布尔值）设置不同的显示格式。

15. **函数选项**：提供了一系列函数选项，如格式化函数、样式函数等，允许用户定义自定义的逻辑来进一步控制打印元素的行为和样式。

整体来看，这个文件是一个打印配置模块，用于构建和管理打印元素的选项，并通过用户界面允许用户进行详细的打印设置。

 */

/**
 * 打印设置
 */
import {i18n,$} from "../hiprint.comm.js";
import PrintTableCell from "./05PrintTableCell.js";
  
import LineHeightOption from "./options/LineHeightOption.js";
import FontFamilyOption from "./options/FontFamilyOption.js";
import FontSizeOption from "./options/FontSizeOption.js";
import FontWeightOption from "./options/FontWeightOption.js";
import LetterSpacingOption from "./options/LetterSpacingOption.js";
import TextAlignOption from "./options/TextAlignOption.js";
import HideTitleOption from "./options/HideTitleOption.js";
import TableBorderOption from "./options/TableBorderOption.js";
import TableHeaderBorderOption from "./options/TableHeaderBorderOption.js";
import TableHeaderCellBorderOption from "./options/TableHeaderCellBorderOption.js";
import TableFooterBorderOption from "./options/TableFooterBorderOption.js";
import TableFooterCellBorderOption from "./options/TableFooterCellBorderOption.js"; 
import TableHeaderRowHeightOption from "./options/TableHeaderRowHeightOption.js";
import TableHeaderFontWeightOption from "./options/TableHeaderFontWeightOption.js";
import TableHeaderFontSizeOption from "./options/TableHeaderFontSizeOption.js";
import TableBodyCellBorderOption from "./options/TableBodyCellBorderOption.js";
import TableBodyRowHeightOption from "./options/TableBodyRowHeightOption.js";
import TableHeaderBackgroundOption from "./options/TableHeaderBackgroundOption.js";
import BorderWidthOption from "./options/BorderWidthOption.js";
import BarcodeModeOption from "./options/BarcodeModeOption.js";
import BarWidthOption from "./options/BarWidthOption.js";
import BarAutoWidthOption from "./options/BarAutoWidthOption.js";
import BarcodeTypeOption from "./options/BarcodeTypeOption.js";
import QrcodeTypeOption from "./options/QrcodeTypeOption.js";
import QrCodeLevelOption from "./options/QrCodeLevelOption.js";
    var 
      v10837 = function () {
        function v10838() {
          this.name = "color";
        }
  
        return v10838.prototype.css = function (v10839, v10840) {
          if (v10839 && v10839.length) {
            if (v10840) return v10839.css("color", v10840), "color:" + v10840;
            v10839[0].style.color = "";
          }
  
          return null;
        }, v10838.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字体颜色')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v10838.prototype.getValue = function () {
          var v10841 = this.target.find("input").val();
          if (v10841) return v10841.toString();
        }, v10838.prototype.setValue = function (v10842) {
          this.target.find("input").minicolors({
            defaultValue: v10842 || "",
            theme: "bootstrap"
          }), this.target.find("input").val(v10842);
        }, v10838.prototype.destroy = function () {
          this.target.remove();
        }, v10838;
      }(),
      v10843 = function () {
        function v10844() {
          this.name = "textDecoration";
        }
  
        return v10844.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('文本修饰')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="underline" >${i18n.__('下划线')}</option>\n            <option value="overline" >${i18n.__('上划线')}</option>\n            <option value="line-through" >${i18n.__('穿梭线')}</option>\n           \n        </select>\n        </div>\n    </div>`), this.target;
        }, v10844.prototype.css = function (v10845, v10846) {
          if (v10845 && v10845.length) {
            if (v10846) return v10845.css("text-decoration", v10846), "text-decoration:" + v10846;
            v10845[0].style.textDecoration = "";
          }
  
          return null;
        }, v10844.prototype.getValue = function () {
          var v10847 = this.target.find("select").val();
          if (v10847) return v10847.toString();
        }, v10844.prototype.setValue = function (v10848) {
          v10848 && (this.target.find('option[value="' + v10848 + '"]').length || this.target.find("select").prepend('<option value="' + v10848 + '" >' + v10848 + "</option>"));
          this.target.find("select").val(v10848);
        }, v10844.prototype.destroy = function () {
          this.target.remove();
        }, v10844;
      }(),
      v10849 = function () {
        function v10850() {
          this.name = "field";
        }
  
        return v10850.prototype.createTarget = function (v10851) {
          var v10852 = void 0;
  
          if (v10851 && (v10852 = v10851.getFields()), v10852) {
            this.isSelect = !0;
            var v10853 = `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__('字段名')}\n            </div>\n            <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n                <option value="" >${i18n.__('请选择字段')}</option>`;
            v10852.forEach(function (v10854, v10855) {
              v10853 += ' <option value="' + (v10854.field || "") + '" >' + (v10854.text || "") + "</option>";
            }), v10853 += " </select>\n            </div>\n        </div>", this.target = $(v10853);
          } else {
            this.isSelect = !1;
            this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__('字段名')}\n            </div>\n            <div class="hiprint-option-item-field">\n            <input type="text" placeholder="${i18n.__('请输入字段名')}" class="auto-submit">\n            </div>\n        </div>`);
          }
  
          return this.target;
        }, v10850.prototype.getValue = function () {
          return (this.isSelect ? this.target.find("select").val() : this.target.find("input").val()) || void 0;
        }, v10850.prototype.setValue = function (v10856) {
          this.isSelect ? v10856 && (this.target.find('option[value="' + v10856 + '"]').length || this.target.find("select").prepend('<option value="' + v10856 + '" >' + v10856 + "</option>"), this.target.find("select").val(v10856)) : this.target.find("input").val(v10856);
        }, v10850.prototype.destroy = function () {
          this.target.remove();
        }, v10850;
      }(),
      v10857 = function () {
        function v10858() {
          this.name = "title";
        }
  
        return v10858.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('标题')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:50px;" placeholder="${i18n.__('请输入标题')}" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v10858.prototype.getValue = function () {
          var v10859 = this.target.find("textarea").val();
          if (v10859) return v10859;
        }, v10858.prototype.setValue = function (v10860) {
          this.target.find("textarea").val(v10860);
        }, v10858.prototype.destroy = function () {
          this.target.remove();
        }, v10858;
      }(),
      v10861 = function () {
        function v10862() {
          this.name = "testData";
        }
  
        return v10862.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('测试数据')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('仅字段名称存在时有效')}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
        }, v10862.prototype.getValue = function () {
          var v10863 = this.target.find("input").val();
          if (v10863) return v10863.toString();
        }, v10862.prototype.setValue = function (v10864) {
          this.target.find("input").val(v10864);
        }, v10862.prototype.destroy = function () {
          this.target.remove();
        }, v10862;
      }(),
      coordinate = function () {
        function v10865() {
          this.name = "coordinate";
        }
  
        return v10865.prototype.createTarget = function (v10866, v10867) {
          var v10868 = this;
          v10868.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
            <div class="hiprint-option-item-label">\n        ${i18n.__('位置坐标')}\n        </div>
            <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
            <input type="number" style="width:48%" placeholder="${i18n.__('X位置(左)')}" class="auto-submit" />\n
            <input type="number" style="width:48%" placeholder="${i18n.__('Y位置(上)')}" class="auto-submit" />\n
            </div>\n
            </div>`);
          v10868.syncLock = v10867.coordinateSync || false;
          v10868.createSyncLock(v10868.syncLock);
          return v10868.target;
        }, v10865.prototype.createSyncLock = function (v10869) {
          var v10870 = this;
          v10870.lockTarget = v10870.syncLock ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`) : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
          v10870.lockTarget.click(function () {
            if (v10870.syncLock) {
              v10870.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
            } else {
              v10870.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
            }
            v10870.syncLock = !v10870.syncLock;
          });
          v10870.target.find("input:first").after(v10870.lockTarget);
          // 同步编辑...
          v10870.target.find("input:first").change(function () {
            if (v10870.syncLock) {
              v10870.target.find("input:last").val($(this).val());
            }
          });
          v10870.target.find("input:last").change(function () {
            if (v10870.syncLock) {
              v10870.target.find("input:first").val($(this).val());
            }
          });
          return v10870.lockTarget;
        }, v10865.prototype.css = function (v10871) {
          if (v10871 && v10871.length && this.target) {
            // 仅当前元素被选中才更新坐标位置, 以避免冲突
            if (('block' == v10871.find('.resize-panel').css('display') || v10871[0].className.includes('table')) && this.el == v10871) {
              var v10872 = this.getValue();
              return v10871.css("left", v10872.left + "pt").css("top", v10872.top + "pt");
            }
          }
          return null;
        }, v10865.prototype.getValue = function () {
          var v10873 = {
            coordinateSync: this.syncLock,
            left: 0,
            top: 0
          };
          v10873.left = parseFloat(this.target.find("input:first").val() || 0);
          v10873.top = parseFloat(this.target.find("input:last").val() || 0);
          return v10873;
        }, v10865.prototype.setValue = function (v10874, el) {
          this.el = el.designTarget || el;
          this.target.find("input:first").val(v10874.left);
          this.target.find("input:last").val(v10874.top);
        }, v10865.prototype.destroy = function () {
          this.target.remove();
        }, v10865;
      }(),
      widthHeight = function () {
        function v10875() {
          this.name = "widthHeight";
        }
  
        return v10875.prototype.createTarget = function (v10876, v10877) {
          var v10878 = this;
          v10878.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
            <div class="hiprint-option-item-label">\n        ${i18n.__('宽高大小')}\n        </div>
            <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
            <input type="number" style="width:48%" placeholder="${i18n.__('宽')}" class="auto-submit" />\n
            <input type="number" style="width:48%" placeholder="${i18n.__('高')}" class="auto-submit" />\n
            </div>\n
            </div>`);
          v10878.syncLock = v10877.widthHeightSync || false;
          v10878.createSyncLock(v10878.syncLock);
          return v10878.target;
        }, v10875.prototype.createSyncLock = function (v10879) {
          var v10880 = this;
          v10880.lockTarget = v10880.syncLock ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`) : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
          v10880.lockTarget.click(function () {
            if (v10880.syncLock) {
              v10880.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
            } else {
              v10880.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
            }
            v10880.syncLock = !v10880.syncLock;
          });
          v10880.target.find("input:first").after(v10880.lockTarget);
          // 同步编辑...
          v10880.target.find("input:first").change(function () {
            if (v10880.syncLock) {
              v10880.target.find("input:last").val($(this).val());
            }
          });
          v10880.target.find("input:last").change(function () {
            if (v10880.syncLock) {
              v10880.target.find("input:first").val($(this).val());
            }
          });
          return v10880.lockTarget;
        }, v10875.prototype.css = function (v10881) {
          if (v10881 && v10881.length && this.target) {
            // 仅当前元素被选中才更新宽高大小, 以避免冲突
            if (('block' == v10881.find('.resize-panel').css('display') || v10881[0].className.includes('table')) && this.el == v10881) {
              var v10882 = this.getValue();
              return v10881.css("width", v10882.width + "pt").css("height", v10882.height + "pt");
            }
          }
          return null;
        }, v10875.prototype.getValue = function () {
          var v10883 = {
            widthHeightSync: this.syncLock,
            width: 0,
            height: 0
          };
          v10883.width = parseFloat(this.target.find("input:first").val() || 0);
          v10883.height = parseFloat(this.target.find("input:last").val() || 0);
          return v10883;
        }, v10875.prototype.setValue = function (v10884, el) {
          this.el = el.designTarget || el;
          this.target.find("input:first").val(v10884.width);
          this.target.find("input:last").val(v10884.height);
        }, v10875.prototype.destroy = function () {
          this.target.remove();
        }, v10875;
      }(),
      v10885 = function () {
        function v10886() {
          this.name = "src";
        }
  
        return v10886.prototype.createTarget = function (v10887) {
          this.el = v10887;
          var v10888 = void 0,v10889 = this;
          this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('图片地址')}\n        </div>\n        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n        <input type="text" placeholder="${i18n.__('请输入图片地址')}" class="auto-submit" style="width:70%">\n    <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__('选择')}</button>        </div>\n    </div>`);
          if (v10887 && (v10888 = v10887.getOnImageChooseClick()), v10888) {
            this.target.find('button').click(function () {
              v10888 && v10888(v10889);
            });
          }
          return this.target;
        }, v10886.prototype.getValue = function () {
          var v10890 = this.target.find("input").val();
          if (v10890) return v10890.toString();
        }, v10886.prototype.setValue = function (v10891) {
          this.target.find("input").val(v10891);
        }, v10886.prototype.refresh = function (v10892, opt, cb) {
          var that = this;
          this.setValue(v10892), this.target.find("input").change();
          if (this.el && opt) {
            var img = new Image();
            img.src = v10892;
            if (img.complete) {
              that.updateEl(img.width, img.height, opt, cb);
            } else {
              img.onload = function () {
                that.updateEl(img.width, img.height, opt, cb);
              };
            }
          }
        }, v10886.prototype.updateEl = function (width, height, opt, cb) {
          if (opt) {
            var ratio, v10893, v10894;
            if (opt && opt.auto) {
              if (width >= height) {
                opt.width = true;
              } else {
                opt.height = true;
              }
            }
            if (opt.width) {
              ratio = height / width;
              v10893 = this.el.options.width;
              v10894 = Math.floor(v10893 * ratio * 10) / 10;
              this.el.options.height = v10894;
              this.el.designTarget.css('height', v10894 + "pt");
            } else if (opt.height) {
              ratio = width / height;
              v10894 = this.el.options.height;
              v10893 = Math.floor(v10894 * ratio * 10) / 10;
              this.el.options.width = v10893;
              this.el.designTarget.css('width', v10893 + "pt");
            } else if (opt.real) {
              v10893 = hinnn.px.toPt(width);
              v10894 = hinnn.px.toPt(height);
              this.el.options.width = v10893;
              this.el.options.height = v10894;
              this.el.designTarget.css('width', v10893 + "pt");
              this.el.designTarget.css('height', v10894 + "pt");
            }
            this.el.designTarget.children('.resize-panel').trigger($.Event('click'));
          }
          cb && cb(this.el, width, height);
        }, v10886.prototype.destroy = function () {
          this.target.remove();
        }, v10886;
      }(),
      imageFit = function () {
        function v10895() {
          this.name = "fit";
        }
  
        return v10895.prototype.css = function (v10896, v10897) {
          if (v10896 && v10896.length) {
            if (v10897) return v10896.find("img").css("object-fit", v10897), "object-fit:" + v10897;
            v10896.find("img")[0].style['object-fit'] = "";
          }
          return null;
        }, v10895.prototype.createTarget = function () {
          this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('图片缩放')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="contain" >${i18n.__('等比')}</option>\n        <option value="cover" >${i18n.__('剪裁')}</option>\n        <option value="fill" >${i18n.__('填充')}</option>\n        <option value="none" >${i18n.__('原始尺寸')}</option>\n                </select>\n        </div>\n    </div>`), this.target;
          return this.target;
        }, v10895.prototype.getValue = function () {
          return this.target.find("select").val();
        }, v10895.prototype.setValue = function (v10898) {
          this.target.find("select").val(v10898);
        }, v10895.prototype.destroy = function () {
          this.target.remove();
        }, v10895;
      }(),
      v10899 = function () {
        function v10900() {
          this.name = "borderColor";
        }
  
        return v10900.prototype.css = function (v10901, v10902) {
          if (v10901 && v10901.length) {
            if (v10902) return v10901.css("border-color", v10902), "border-color:" + v10902;
            v10901[0].style.borderColor = "";
          }
  
          return null;
        }, v10900.prototype.createTarget = function (v10903) {
          var name = ['hline', 'vline', 'rect', 'oval'].includes(v10903.printElementType.type) ? `${i18n.__('颜色')}` : `${i18n.__('边框颜色')}`;
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit" />\n        </div>\n    </div>`), this.target;
        }, v10900.prototype.getValue = function () {
          var v10904 = this.target.find("input").val();
          if (v10904) return v10904.toString();
        }, v10900.prototype.setValue = function (v10905) {
          this.target.find("input").minicolors({
            defaultValue: v10905 || "",
            theme: "bootstrap"
          }), this.target.find("input").val(v10905);
        }, v10900.prototype.destroy = function () {
          this.target.remove();
        }, v10900;
      }(),
      watermarkOptions = function () {
        function v10906() {
          this.name = "watermarkOptions";
        }
        return v10906.prototype.createTarget = function () {
          this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('水印功能')}</div></div>`);
          this.content = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('水印内容')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('水印内容')}" class="auto-submit"></div>`);
          this.fillStyle = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;margin-top: 4px"><div style="width:25%">${i18n.__('字体颜色')}:</div><input style="width:110%" data-format="rgb" data-opacity="0.3" type="text" placeholder="${i18n.__('字体颜色')}" class="auto-submit"></div>`);
          this.fontSize = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('字体大小')}:</div><input style="width:75%" type="range" min="10" max="80" placeholder="${i18n.__('字体大小')}" class="auto-submit"></div>`);
          this.rotate = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('旋转角度')}:</div><input style="width:75%" type="range" min="0" max="180" placeholder="${i18n.__('旋转角度')}" class="auto-submit"></div>`);
          this.width = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('水平密度')}:</div><input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__('水平密度')}" class="auto-submit"></div>`);
          this.height = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('垂直密度')}:</div><input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__('垂直密度')}" class="auto-submit"></div>`);
          this.timestamp = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">${i18n.__('水印时间')}:</div><input style="width:18px;height:18px;margin:0 0 4px 0;" type="checkbox" placeholder="${i18n.__('水印时间')}" class="auto-submit"></div>`);
          let formatlist = [
          "YYYY-MM-DD HH:mm:ss",
          "YYYY-MM-DD HH:mm",
          "YYYY-MM-DD HH",
          "YYYY-MM-DD",
          "YYYY-MMMM",
          "YYYY-MM",
          "YYYY"];
  
          let timeFormatList = `\n            <option value="" >${i18n.__('默认')}(YYYY-MM-DD HH:mm)</option>`;
          formatlist.forEach(function (v10907) {
            timeFormatList += '\n            <option value="' + v10907 + '">' + v10907 + '</option>';
          });
          this.format = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('时间格式')}:</div><select style="width:75%" class="auto-submit"></select></div>`);
          this.format.find(".auto-submit").append($(timeFormatList));
          this.target.append(this.content);
          this.target.append(this.fillStyle);
          this.target.append(this.fontSize);
          this.target.append(this.rotate);
          this.target.append(this.width);
          this.target.append(this.height);
          this.target.append(this.timestamp);
          this.target.append(this.format);
          return this.target;
        }, v10906.prototype.getValue = function () {
          let opt = {
            content: this.content.find('input').val(),
            fillStyle: this.fillStyle.find('input').val() || "rgba(184, 184, 184, 0.3)",
            fontSize: parseInt(this.fontSize.find('input').val() || "14") + "px",
            rotate: parseInt(this.rotate.find('input').val() || "25"),
            width: parseInt(this.width.find('input').val() || "200"),
            height: parseInt(this.height.find('input').val() || "200"),
            timestamp: this.timestamp.find('input').is(':checked'),
            format: this.format.find('select').val() == "" ? "YYYY-MM-DD HH:mm" : this.format.find('select').val()
          };
          let options = Object.assign({}, this.options, opt);
          return options;
        }, v10906.prototype.setValue = function (v10908) {
          this.options = v10908;
          this.content.find("input").val(v10908.content || "");
          this.fillStyle.find("input").val(v10908.fillStyle || "rgba(184, 184, 184, 0.3)");
          this.fillStyle.find("input").minicolors({
            format: "rgb",
            opacity: true,
            theme: "bootstrap"
          });
          const fontSize = parseInt(v10908.fontSize || "14");
          this.fontSize.find("input").val(fontSize);
          this.rotate.find("input").val(v10908.rotate || 25);
          this.width.find("input").val(v10908.width || 200);
          this.height.find("input").val(v10908.height || 200);
          this.timestamp.find("input").attr("checked", v10908.timestamp == void 0 ? false : v10908.timestamp);
          this.format.find("select").val(v10908.format || "YYYY-MM-DD HH:mm");
        }, v10906.prototype.destroy = function () {
          this.target.remove();
        }, v10906;
      }(),
      v10909 = function () {
        function v10910() {
          this.name = "paperNumberFormat";
        }
  
        return v10910.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('页码格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="\${paperNo}-\${paperCount}" class="auto-submit">\n        </div>\n    </div>`), this.target;
        }, v10910.prototype.getValue = function () {
          var v10911 = this.target.find("input").val();
          if (v10911) return v10911.toString();
        }, v10910.prototype.setValue = function (v10912) {
          this.target.find("input").val(v10912);
        }, v10910.prototype.destroy = function () {
          this.target.remove();
        }, v10910;
      }(),
      v10913 = function () {
        function v10914() {
          this.name = "paperNumberDisabled";
        }
  
        return v10914.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('显示页码')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('显示')}</option>\n        <option value="true" >${i18n.__('隐藏')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10914.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }, v10914.prototype.setValue = function (v10915) {
          this.target.find("select").val((null == v10915 ? "" : v10915).toString());
        }, v10914.prototype.destroy = function () {
          this.target.remove();
        }, v10914;
      }(),
      paperNumberContinue = function () {
        function v10916() {
          this.name = "paperNumberContinue";
        }
  
        return v10916.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('页码续排')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="true" >${i18n.__('续排')}</option>\n        <option value="reset" >${i18n.__('重排')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10916.prototype.getValue = function () {
          return "true" == this.target.find("select").val();
        }, v10916.prototype.setValue = function (v10917) {
          this.target.find("select").val((v10917 == void 0 || v10917 ? "true" : "reset").toString());
        }, v10916.prototype.destroy = function () {
          this.target.remove();
        }, v10916;
      }(),
      v10918 = function () {
        function v10919() {
          this.name = "longTextIndent";
        }
  
        return v10919.prototype.css = function (v10920, v10921) {
          return null;
        }, v10919.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('每行缩进')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        <option value="22.5" >22.5pt</option>\n        <option value="23.25" >23.25pt</option>\n        <option value="24" >24pt</option>\n        <option value="24.75" >24.75pt</option>\n        <option value="25.5" >25.5pt</option>\n        <option value="26.25" >26.25pt</option>\n        <option value="27" >27pt</option>\n        <option value="27.75" >27.75pt</option>\n        <option value="28.5" >28.5pt</option>\n        <option value="29.25" >29.25pt</option>\n        <option value="30" >30pt</option>\n        <option value="30.75" >30.75pt</option>\n        <option value="31.5" >31.5pt</option>\n        <option value="32.25" >32.25pt</option>\n        <option value="33" >33pt</option>\n        <option value="33.75" >33.75pt</option>\n        <option value="34.5" >34.5pt</option>\n        <option value="35.25" >35.25pt</option>\n        <option value="36" >36pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10919.prototype.getValue = function () {
          var v10922 = this.target.find("select").val();
          if (v10922) return parseFloat(v10922.toString());
        }, v10919.prototype.setValue = function (v10923) {
          v10923 && (this.target.find('option[value="' + v10923 + '"]').length || this.target.find("select").prepend('<option value="' + v10923 + '" >' + v10923 + "</option>"));
          this.target.find("select").val(v10923);
        }, v10919.prototype.destroy = function () {
          this.target.remove();
        }, v10919;
      }(),
      v10924 = function () {
        function v10925() {
          this.name = "showInPage";
        }
  
        return v10925.prototype.css = function (v10926, v10927) {
          if (v10926 && v10926.length) {
            if (v10927 && 'none' == v10927) return v10926.addClass('alwaysHide');
            v10926.removeClass('alwaysHide');
          }
          return null;
        }, v10925.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('显示规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="none" >${i18n.__('始终隐藏')}</option>\n            <option value="first" >${i18n.__('首页')}</option>\n            <option value="odd" >${i18n.__('奇数页')}</option>\n            <option value="even" >${i18n.__('偶数页')}</option>\n            <option value="last" >${i18n.__('尾页')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10925.prototype.getValue = function () {
          var v10928 = this.target.find("select").val();
          if (v10928) return v10928.toString();
        }, v10925.prototype.setValue = function (v10929) {
          this.target.find("select").val(v10929);
        }, v10925.prototype.destroy = function () {
          this.target.remove();
        }, v10925;
      }(),
      pageBreak = function () {
        function v10930() {
          this.name = "pageBreak";
        }
  
        return v10930.prototype.css = function (v10931, v10932) {
          if (v10931 && v10931.length) {
            if (v10932 && 'none' == v10932) return v10931.addClass('alwaysHide');
            v10931.removeClass('alwaysHide');
          }
          return null;
        }, v10930.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('强制分页')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="true" >${i18n.__('是')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10930.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }, v10930.prototype.setValue = function (v10933) {
          this.target.find("select").val((null == v10933 ? "" : v10933).toString());
        }, v10930.prototype.destroy = function () {
          this.target.remove();
        }, v10930;
      }(),
      v10934 = function () {
        function v10935() {
          this.name = "panelPaperRule";
        }
  
        return v10935.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('打印规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="odd" >${i18n.__('保持奇数')}</option>\n            <option value="even" >${i18n.__('保持偶数')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10935.prototype.getValue = function () {
          var v10936 = this.target.find("select").val();
          if (v10936) return v10936.toString();
        }, v10935.prototype.setValue = function (v10937) {
          this.target.find("select").val(v10937);
        }, v10935.prototype.destroy = function () {
          this.target.remove();
        }, v10935;
      }(),
      M2 = function () {
        function v10938() {
          this.name = "panelPageRule";
        }
  
        return v10938.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分页规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="none" >${i18n.__('不分页')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10938.prototype.getValue = function () {
          var v10939 = this.target.find("select").val();
          if (v10939) return v10939.toString();
        }, v10938.prototype.setValue = function (v10940) {
          this.target.find("select").val(v10940);
        }, v10938.prototype.destroy = function () {
          this.target.remove();
        }, v10938;
      }(),
      v10941 = function () {
        function v10942() {
          this.name = "leftSpaceRemoved";
        }
  
        return v10942.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('移除段落左侧空白')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="true" >${i18n.__('移除')}</option>\n            <option value="false" >${i18n.__('不移除')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10942.prototype.getValue = function () {
          if ("false" == this.target.find("select").val()) return !1;
        }, v10942.prototype.setValue = function (v10943) {
          this.target.find("select").val((null == v10943 ? "" : v10943).toString());
        }, v10942.prototype.destroy = function () {
          this.target.remove();
        }, v10942;
      }(),
      v10944 = function () {
        function v10945() {
          this.name = "firstPaperFooter";
        }
  
        return v10945.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('首页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('首页页尾')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
        }, v10945.prototype.getValue = function () {
          var v10946 = this.target.find("input").val();
          if (v10946) return parseFloat(v10946.toString());
        }, v10945.prototype.setValue = function (v10947) {
          this.target.find("input").val(v10947);
        }, v10945.prototype.destroy = function () {
          this.target.remove();
        }, v10945;
      }(),
      v10948 = function () {
        function v10949() {
          this.name = "lastPaperFooter";
        }
  
        return v10949.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('尾页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('尾页页尾')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
        }, v10949.prototype.getValue = function () {
          var v10950 = this.target.find("input").val();
          if (v10950) return parseFloat(v10950.toString());
        }, v10949.prototype.setValue = function (v10951) {
          this.target.find("input").val(v10951);
        }, v10949.prototype.destroy = function () {
          this.target.remove();
        }, v10949;
      }(),
      v10952 = function () {
        function v10953() {
          this.name = "evenPaperFooter";
        }
  
        return v10953.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('偶数页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偶数页页尾')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
        }, v10953.prototype.getValue = function () {
          var v10954 = this.target.find("input").val();
          if (v10954) return parseFloat(v10954.toString());
        }, v10953.prototype.setValue = function (v10955) {
          this.target.find("input").val(v10955);
        }, v10953.prototype.destroy = function () {
          this.target.remove();
        }, v10953;
      }(),
      v10956 = function () {
        function v10957() {
          this.name = "oddPaperFooter";
        }
  
        return v10957.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('奇数页页尾')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('奇数页页尾')}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
        }, v10957.prototype.getValue = function () {
          var v10958 = this.target.find("input").val();
          if (v10958) return parseFloat(v10958.toString());
        }, v10957.prototype.setValue = function (v10959) {
          this.target.find("input").val(v10959);
        }, v10957.prototype.destroy = function () {
          this.target.remove();
        }, v10957;
      }(),
      v10960 = function () {
        function v10961() {
          this.name = "fixed";
        }
  
        return v10961.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('位置固定')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="false" >${i18n.__('否')}</option>\n            <option value="true" >${i18n.__('是')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10961.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }, v10961.prototype.setValue = function (v10962) {
          this.target.find("select").val((null == v10962 ? "" : v10962).toString());
        }, v10961.prototype.destroy = function () {
          this.target.remove();
        }, v10961;
      }(),
      v10963 = function () {
        function v10964() {
          this.name = "axis";
        }
  
        return v10964.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('拖动方向')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="h" >${i18n.__('横向')}</option>\n        <option value="v" >${i18n.__('竖向')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10964.prototype.getValue = function () {
          var v10965 = this.target.find("select").val();
          return v10965 || void 0;
        }, v10964.prototype.setValue = function (v10966) {
          this.target.find("select").val(v10966);
        }, v10964.prototype.destroy = function () {
          this.target.remove();
        }, v10964;
      }(),
      v10967 = function () {
        function v10968() {
          this.name = "leftOffset";
        }
  
        return v10968.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左偏移')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit" >\n        </div>\n    </div>`), this.target;
        }, v10968.prototype.getValue = function () {
          var v10969 = this.target.find("input").val();
          if (v10969) return parseFloat(v10969.toString());
        }, v10968.prototype.setValue = function (v10970) {
          this.target.find("input").val(v10970);
        }, v10968.prototype.destroy = function () {
          this.target.remove();
        }, v10968;
      }(),
      v10971 = function () {
        function v10972() {
          this.name = "lHeight";
        }
  
        return v10972.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('最低高度')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('文本过短或为空时的高度')}" class="auto-submit">\n        </div>\n    </div>`), this.target;
        }, v10972.prototype.getValue = function () {
          var v10973 = this.target.find("input").val();
          if (v10973) return parseFloat(v10973.toString());
        }, v10972.prototype.setValue = function (v10974) {
          this.target.find("input").val(v10974);
        }, v10972.prototype.destroy = function () {
          this.target.remove();
        }, v10972;
      }(),
      v10975 = function () {
        function v10976() {
          this.name = "unShowInPage";
        }
  
        return v10976.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('隐藏规则')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="first" >${i18n.__('首页')}</option>\n            <option value="last" >${i18n.__('尾页')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10976.prototype.getValue = function () {
          var v10977 = this.target.find("select").val();
          if (v10977) return v10977;
        }, v10976.prototype.setValue = function (v10978) {
          this.target.find("select").val(v10978);
        }, v10976.prototype.destroy = function () {
          this.target.remove();
        }, v10976;
      }(),
      v10979 = function () {
        function v10980() {
          this.name = "tableBodyRowBorder";
        }
  
        return v10980.prototype.css = function (v10981, v10982) {
          if (v10981.find("tbody tr").length) {
            if ("border" == v10982 || void 0 == v10982) return v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-all");
            "noBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-none") : "leftBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-left") : "rightBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-right") : "leftRightBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-lr") : "topBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-top") : "bottomBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-bottom") : "topBottomBorder" == v10982 ? v10981.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-tb") : v10981.find("tbody tr").removeClass();
          }
  
          return null;
        }, v10980.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表体行边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>    \n        <option value="border" >${i18n.__('有边框')}</option>\n        <option value="noBorder" >${i18n.__('无边框')}</option>\n        <option value="leftBorder" >${i18n.__('左边框')}</option>\n        <option value="rightBorder" >${i18n.__('右边框')}</option>\n        <option value="leftRightBorder" >${i18n.__('左右边框')}</option>\n        <option value="topBorder" >${i18n.__('上边框')}</option>\n        <option value="bottomBorder" >${i18n.__('下边框')}</option>\n        <option value="topBottomBorder" >${i18n.__('上下边框')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v10980.prototype.getValue = function () {
          var v10983 = this.target.find("select").val();
          if (v10983) return v10983.toString();
        }, v10980.prototype.setValue = function (v10984) {
          this.target.find("select").val(v10984);
        }, v10980.prototype.destroy = function () {
          this.target.remove();
        }, v10980;
      }(),
      TransformOption = function () {
        function v10986() {
          this.name = "transform";
        }
  
        return v10986.prototype.css = function (v10987, v10988) {
          if (v10987 && v10987.length) {
            var v10989 = v10987.find(".hiprint-printElement-content").parent(".hiprint-printElement");
            if (!v10989.length) {
              v10989 = v10987;
            }
            if (v10988) return v10989.css("transform", "rotate(" + v10988 + "deg)"), v10989.css("-ms-transform", "rotate(" + v10988 + "deg)"), v10989.css("-moz-transform", "rotate(" + v10988 + "deg)"), v10989.css("-webkit-transform", "rotate(" + v10988 + "deg)"), v10989.css("-o-transform", "rotate(" + v10988 + "deg)"), "transform:rotate(" + v10988 + "deg)";
            v10989.length && (v10989[0].style.transform = "");
          }
  
          return null;
        }, v10986.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('旋转角度')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v10986.prototype.getValue = function () {
          var v10990 = this.target.find("input").val();
          if (v10990) return parseFloat(v10990.toString());
        }, v10986.prototype.setValue = function (v10991) {
          this.target.find("input").val(v10991);
        }, v10986.prototype.destroy = function () {
          this.target.remove();
        }, v10986;
      }(),
      zIndex = function () {
        function v10992() {
          this.name = "zIndex";
        }
  
        return v10992.prototype.css = function (v10993, v10994) {
          if (v10993 && v10993.length) {
            if (v10994) return v10993.css('z-index', v10994);
          }
          return null;
        }, v10992.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('元素层级')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v10992.prototype.getValue = function () {
          var v10995 = this.target.find("input").val();
          if (v10995) return parseInt(v10995.toString());
        }, v10992.prototype.setValue = function (v10996) {
          this.target.find("input").val(v10996);
        }, v10992.prototype.destroy = function () {
          this.target.remove();
        }, v10992;
      }(),
      borderRadius = function () {
        function v10997() {
          this.name = "borderRadius";
        }
  
        return v10997.prototype.css = function (v10998, v10999) {
          if (v10998 && v10998.length) {
            if (v10999) return v10998.css('border-raduis', v10999);
          }
          return null;
        }, v10997.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('边框圆角')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v10997.prototype.getValue = function () {
          var v11000 = this.target.find("input").val();
          if (v11000) return v11000;
        }, v10997.prototype.setValue = function (v11001) {
          this.target.find("input").val(v11001);
        }, v10997.prototype.destroy = function () {
          this.target.remove();
        }, v10997;
      }(),
      v11002 = function () {
        function v11003() {
          this.name = "optionsGroup";
        }
  
        return v11003.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('边框设置')}\n        </div>\n       \n    </div>`), this.target;
        }, v11003.prototype.getValue = function () {
        }, v11003.prototype.setValue = function (v11004) {
        }, v11003.prototype.destroy = function () {
          this.target.remove();
        }, v11003;
      }(),
      v11005 = function () {
        function v11006() {
          this.name = "borderTop";
        }
  
        return v11006.prototype.css = function (v11007, v11008) {
          if (v11007 && v11007.length) {
            if (v11008) return v11007.css("border-top-style", v11008), "border-top:1px";
            v11007[0].style.borderTopStyle = "", v11007[0].style.borderTopWidth = "";
          }
  
          return null;
        }, v11006.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('上边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >${i18n.__('否')}</option>\n            <option value="solid" >${i18n.__('实线')}</option>\n            <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11006.prototype.getValue = function () {
          var v11009 = this.target.find("select").val();
          if (v11009) return v11009;
        }, v11006.prototype.setValue = function (v11010) {
          this.target.find("select").val(v11010);
        }, v11006.prototype.destroy = function () {
          this.target.remove();
        }, v11006;
      }(),
      v11011 = function () {
        function v11012() {
          this.name = "borderLeft";
        }
  
        return v11012.prototype.css = function (v11013, v11014) {
          if (v11013 && v11013.length) {
            if (v11014) return v11013.css("border-left-style", v11014), "border-left:1px";
            v11013[0].style.borderLeftStyle = "", v11013[0].style.borderLeftWidth = "";
          }
  
          return null;
        }, v11012.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('否')}</option>\n        <option value="solid" >${i18n.__('实线')}</option>\n        <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11012.prototype.getValue = function () {
          var v11015 = this.target.find("select").val();
          if (v11015) return v11015;
        }, v11012.prototype.setValue = function (v11016) {
          this.target.find("select").val(v11016);
        }, v11012.prototype.destroy = function () {
          this.target.remove();
        }, v11012;
      }(),
      v11017 = function () {
        function v11018() {
          this.name = "borderRight";
        }
  
        return v11018.prototype.css = function (v11019, v11020) {
          if (v11019 && v11019.length) {
            if (v11020) return v11019.css("border-right-style", v11020), "border-right:1px";
            v11019[0].style.borderRightStyle = "", v11019[0].style.borderRightWidth = "";
          }
  
          return null;
        }, v11018.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('右边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('否')}</option>\n        <option value="solid" >${i18n.__('实线')}</option>\n        <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11018.prototype.getValue = function () {
          var v11021 = this.target.find("select").val();
          if (v11021) return v11021;
        }, v11018.prototype.setValue = function (v11022) {
          this.target.find("select").val(v11022);
        }, v11018.prototype.destroy = function () {
          this.target.remove();
        }, v11018;
      }(),
      v11023 = function () {
        function v11024() {
          this.name = "borderBottom";
        }
  
        return v11024.prototype.css = function (v11025, v11026) {
          if (v11025 && v11025.length) {
            if (v11026) return v11025.css("border-bottom-style", v11026), "border-bottom-style:1px solid";
            v11025[0].style.borderBottomStyle = "", v11025[0].style.borderBottomWidth = "";
          }
  
          return null;
        }, v11024.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('下边框')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('否')}</option>\n        <option value="solid" >${i18n.__('实线')}</option>\n        <option value="dotted" >${i18n.__('虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11024.prototype.getValue = function () {
          var v11027 = this.target.find("select").val();
          if (v11027) return v11027;
        }, v11024.prototype.setValue = function (v11028) {
          this.target.find("select").val(v11028);
        }, v11024.prototype.destroy = function () {
          this.target.remove();
        }, v11024;
      }(),
      v11029 = function () {
        function v11030() {
          this.name = "contentPaddingLeft";
        }
  
        return v11030.prototype.css = function (v11031, v11032) {
          var v11033 = v11031.find(".hiprint-printElement-content");
  
          if (v11033 && v11033.length) {
            if (v11032) return v11033.css("padding-left", v11032 + "pt"), "padding-left";
            v11033[0].style.paddingLeft = "";
          }
  
          return null;
        }, v11030.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11030.prototype.getValue = function () {
          var v11034 = this.target.find("select").val();
          if (v11034) return parseFloat(v11034.toString());
        }, v11030.prototype.setValue = function (v11035) {
          v11035 && (this.target.find('option[value="' + v11035 + '"]').length || this.target.find("select").prepend('<option value="' + v11035 + '" >' + v11035 + "</option>"));
          this.target.find("select").val(v11035);
        }, v11030.prototype.destroy = function () {
          this.target.remove();
        }, v11030;
      }(),
      ContentPaddingTopOption = function () {
        function v11037() {
          this.name = "contentPaddingTop";
        }
  
        return v11037.prototype.css = function (v11038, v11039) {
          var v11040 = v11038.find(".hiprint-printElement-content");
  
          if (v11040 && v11040.length) {
            if (v11039) return v11040.css("padding-top", v11039 + "pt"), "padding-top";
            v11040[0].style.paddingTop = "";
          }
  
          return null;
        }, v11037.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('上内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11037.prototype.getValue = function () {
          var v11041 = this.target.find("select").val();
          if (v11041) return parseFloat(v11041.toString());
        }, v11037.prototype.setValue = function (v11042) {
          v11042 && (this.target.find('option[value="' + v11042 + '"]').length || this.target.find("select").prepend('<option value="' + v11042 + '" >' + v11042 + "</option>"));
          this.target.find("select").val(v11042);
        }, v11037.prototype.destroy = function () {
          this.target.remove();
        }, v11037;
      }(),
      v11043 = function () {
        function v11044() {
          this.name = "contentPaddingRight";
        }
  
        return v11044.prototype.css = function (v11045, v11046) {
          var v11047 = v11045.find(".hiprint-printElement-content");
  
          if (v11047 && v11047.length) {
            if (v11046) return v11047.css("padding-right", v11046 + "pt"), "padding-right";
            v11047[0].style.paddingRight = "";
          }
  
          return null;
        }, v11044.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('右内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11044.prototype.getValue = function () {
          var v11048 = this.target.find("select").val();
          if (v11048) return parseFloat(v11048.toString());
        }, v11044.prototype.setValue = function (v11049) {
          v11049 && (this.target.find('option[value="' + v11049 + '"]').length || this.target.find("select").prepend('<option value="' + v11049 + '" >' + v11049 + "</option>"));
          this.target.find("select").val(v11049);
        }, v11044.prototype.destroy = function () {
          this.target.remove();
        }, v11044;
      }(),
      tt = function () {
        function v11050() {
          this.name = "contentPaddingBottom";
        }
  
        return v11050.prototype.css = function (v11051, v11052) {
          var v11053 = v11051.find(".hiprint-printElement-content");
  
          if (v11053 && v11053.length) {
            if (v11052) return v11053.css("padding-bottom", v11052 + "pt"), "padding-bottom";
            v11053[0].style.paddingBottom = "";
          }
  
          return null;
        }, v11050.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('下内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11050.prototype.getValue = function () {
          var v11054 = this.target.find("select").val();
          if (v11054) return parseFloat(v11054.toString());
        }, v11050.prototype.setValue = function (v11055) {
          v11055 && (this.target.find('option[value="' + v11055 + '"]').length || this.target.find("select").prepend('<option value="' + v11055 + '" >' + v11055 + "</option>"));
          this.target.find("select").val(v11055);
        }, v11050.prototype.destroy = function () {
          this.target.remove();
        }, v11050;
      }(),
      et = function () {
        function v11056() {
          this.name = "borderStyle";
        }
  
        return v11056.prototype.css = function (v11057, v11058) {
          if (v11057 && v11057.length) {
            if (v11058) return v11057.css("border-style", v11058), "border-style:1px";
            v11057[0].style.borderStyle = "";
          }
  
          return null;
        }, v11056.prototype.createTarget = function (v11059) {
          var name = ['hline', 'vline', 'rect', 'oval'].includes(v11059.printElementType.type) ? `${i18n.__('样式')}` : `${i18n.__('边框样式')}`;
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n       ${name}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="solid" >${i18n.__('实线')}</option>\n            <option value="dashed" >${i18n.__('长虚线')}</option>\n            <option value="dotted" >${i18n.__('短虚线')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11056.prototype.getValue = function () {
          var v11060 = this.target.find("select").val();
          if (v11060) return v11060;
        }, v11056.prototype.setValue = function (v11061) {
          this.target.find("select").val(v11061);
        }, v11056.prototype.destroy = function () {
          this.target.remove();
        }, v11056;
      }(),
      nt = function () {
        function v11062() {
          this.name = "backgroundColor";
        }
  
        return v11062.prototype.css = function (v11063, v11064) {
          if (v11063 && v11063.length) {
            if (v11064) return v11063.css("background-color", v11064), "background-color:" + v11064;
            v11063[0].style.backgroundColor = "";
          }
  
          return null;
        }, v11062.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('背景颜色')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v11062.prototype.getValue = function () {
          var v11065 = this.target.find("input").val();
          if (v11065) return v11065.toString();
        }, v11062.prototype.setValue = function (v11066) {
          this.target.find("input").minicolors({
            defaultValue: v11066 || "",
            theme: "bootstrap"
          }), this.target.find("input").val(v11066);
        }, v11062.prototype.destroy = function () {
          this.target.remove();
        }, v11062;
      }(),
      barColor = function () {
        function v11067() {
          this.name = "barColor";
        }
  
        return v11067.prototype.css = function (v11068, v11069) {
          if (v11068 && v11068.length) {
  
  
            // if (e) return t.css("background-color", e), "background-color:" + e;
            // t[0].style.backgroundColor = "";
          }return null;}, v11067.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('条码颜色')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v11067.prototype.getValue = function () {
          var v11070 = this.target.find("input").val();
          if (v11070) return v11070.toString();
        }, v11067.prototype.setValue = function (v11071) {
          this.target.find("input").minicolors({
            defaultValue: v11071 || "",
            theme: "bootstrap"
          }), this.target.find("input").val(v11071);
        }, v11067.prototype.destroy = function () {
          this.target.remove();
        }, v11067;
      }(),
  
      it = function () {
        function v11072() {
          this.name = "orient";
        }
  
        return v11072.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('纸张方向(仅自定义纸质有效)')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1" >${i18n.__('纵向')}</option>\n        <option value="2" >${i18n.__('横向')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11072.prototype.getValue = function () {
          var v11073 = this.target.find("select").val();
          if (v11073) return parseFloat(v11073.toString());
        }, v11072.prototype.setValue = function (v11074) {
          this.target.find("select").val(v11074);
        }, v11072.prototype.destroy = function () {
          this.target.remove();
        }, v11072;
      }(),
      ot = function () {
        function v11075() {
          this.name = "textContentVerticalAlign";
        }
  
        return v11075.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('上下对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="middle" >${i18n.__('垂直居中')}</option>\n        <option value="bottom" >${i18n.__('底部')}</option>\n       \n        </select>\n        </div>\n    </div>`), this.target;
        }, v11075.prototype.css = function (v11076, v11077) {
          if (v11076 && v11076.length) {
            v11076.removeClass("hiprint-text-content-middle"), v11076.removeClass("hiprint-text-content-bottom");
            if (v11077) return "middle" === v11077 && v11076.addClass("hiprint-text-content-middle"), "bottom" === v11077 && v11076.addClass("hiprint-text-content-bottom"), "";
          }
  
          return null;
        }, v11075.prototype.getValue = function () {
          var v11078 = this.target.find("select").val();
          if (v11078) return v11078.toString();
        }, v11075.prototype.setValue = function (v11079) {
          this.target.find("select").val(v11079);
        }, v11075.prototype.destroy = function () {
          this.target.remove();
        }, v11075;
      }(),
      textWrap = function () {
        function v11080() {
          this.name = "textContentWrap";
        }
  
        return v11080.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('文本换行')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="nowrap" >${i18n.__('不换行')}</option>\n        <option value="clip" >${i18n.__('不换行&隐藏')}</option>\n        <option value="ellipsis" >${i18n.__('不换行&省略')}</option>\n       </select>\n        </div>\n    </div>`), this.target;
        }, v11080.prototype.css = function (v11081, v11082) {
          if (v11081 && v11081.length) {
            v11081.removeClass("hiprint-text-content-wrap");
            v11081.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-nowrap");
            v11081.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-clip");
            v11081.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-ellipsis");
            if (v11082) return v11081.addClass("hiprint-text-content-wrap"), v11081.find(".hiprint-printElement-text-content").addClass("hiprint-text-content-wrap-" + v11082), "";
          }
  
          return null;
        }, v11080.prototype.getValue = function () {
          var v11083 = this.target.find("select").val();
          if (v11083) return v11083.toString();
        }, v11080.prototype.setValue = function (v11084) {
          this.target.find("select").val(v11084);
        }, v11080.prototype.destroy = function () {
          this.target.remove();
        }, v11080;
      }(),
    //   rt = webpack_require(5),
      at = function () {
        function v11085() {
          this.name = "columns";
        }
  
        return v11085.prototype.createTarget = function () {
          $('<div class="indicator"></div>').appendTo("body");
          return " </ul>\n       </div>\n    </div>", this.target = $(' <div class="hiprint-option-item hiprint-option-item-row">\n       <div>\n            <ul class="hiprint-option-table-selected-columns"> </ul>\n       </div>\n    </div>'), this.target;
        }, v11085.prototype.getValue = function () {
          return this.buildData();
        }, v11085.prototype.setValue = function (v11086, v11087, v11088) {
          var v11089 = this,
            v11090 = this;
          this.value = v11086, this.options = v11087, this.printElementType = v11088;
          var v11091 = v11088.columns[0].filter(function (v11092) {
            return 0 == v11086[0].columns.filter(function (v11093) {
              return v11092.columnId == v11093.columnId;
            }).length;
          }).map(function (v11094) {
            var v11095 = new PrintTableCell(v11094);
            return v11095.checked = !1, v11095;
          });
          this.allColumns = v11086[0].columns.concat(v11091), v11086 && 1 == v11086.length && (this.target.find("ul").html(this.allColumns.map(function (v11097, v11098) {
            return '<li  class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">\n                ' + (v11097.checked ? '<input type="checkbox"   checked column-id="' + (v11097.id || v11097.columnId) + '" />' : '<input type="checkbox"  column-id="' + (v11097.id || v11097.columnId) + '" />') + '\n                <div class="state">\n                    <label></label>\n                </div>\n            </div><span class="column-title">' + (v11097.title || v11097.descTitle || "") + "</span></li>";
          }).join("")), this.target.find("input").change(function (v11099) {
            var checked = v11099.target.checked,id = v11099.target.attributes['column-id'].nodeValue || '';
            var idx = v11089.allColumns.findIndex(function (v11100) {
              return v11100.field == id || v11100.id == id;
            });
            if (idx >= 0) {
              v11089.allColumns[idx]['checked'] = checked;
            }
            v11089.submit();
          }), this.printElementType.columnDisplayIndexEditable && this.target.find("li").hidraggable({
            revert: !0,
            handle: ".column-title",
            moveUnit: "pt",
            deltaX: 0,
            deltaY: 0
          }).hidroppable({
            onDragOver: function onDragOver(v11101, v11102) {
              $(this).css("border-top-color", "red");
            },
            onDragLeave: function onDragLeave(v11103, v11104) {
              $(this).css("border-top-color", "");
            },
            onDrop: function onDrop(v11105, v11106) {
              $(v11106).insertBefore(this), $(this).css("border-top-color", ""), v11090.submit();
            }
          }));
        }, v11085.prototype.buildData = function () {
          var v11107 = this,v11108 = [];
          if (v11107.options.columns.length > 1) {
            return this.value;
          }
          v11107.printElementType.makeColumnObj(v11107.allColumns);
          this.target.find("input").map(function (v11109, v11110) {
            var v11111 = $(v11110).attr("column-id");
            var v11112 = v11107.printElementType.getColumnByColumnId(v11111);
            if (v11112) {
              var v11113 = new PrintTableCell(v11112);
              v11113.checked = v11112.checked, v11108.push(v11113);
            }
          });
          return this.value[0].columns = v11108, this.value;
        }, v11085.prototype.destroy = function () {
          this.target.remove();
        }, v11085;
      }(),
      pt = function () {
        function v11115() {
          this.name = "textType";
        }
  
        return v11115.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('打印类型')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="" >${i18n.__('文本')}</option>\n        <option value="barcode" >${i18n.__('条形码')}</option>\n        <option value="qrcode" >${i18n.__('二维码')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11115.prototype.getValue = function () {
          var v11116 = this.target.find("select").val();
          if (v11116) return v11116;
        }, v11115.prototype.setValue = function (v11117) {
          this.target.find("select").val(v11117);
        }, v11115.prototype.destroy = function () {
          this.target.remove();
        }, v11115;
      }(),
      tablept = function () {
        function v11118() {
          this.name = "tableTextType";
        }
  
        return v11118.prototype.createTarget = function () {
          return this.target = $(
            `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('字段类型')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认(文本)')}</option>\n        <option value="text" >${i18n.__('文本')}</option>\n <option value="sequence" >${i18n.__('序号')}</option>\n       <option value="barcode" >${i18n.__('条形码')}</option>\n        <option value="qrcode" >${i18n.__('二维码')}</option>\n    <option value="image" >${i18n.__('图片')}</option>\n        </select>\n        </div>\n    </div>`
          ), this.target;
        }, v11118.prototype.getValue = function () {
          var v11119 = this.target.find("select").val();
          if (v11119) return v11119;
        }, v11118.prototype.setValue = function (v11120) {
          this.target.find("select").val(v11120);
        }, v11118.prototype.destroy = function () {
          this.target.remove();
        }, v11118;
      }(),
      tableE = function () {
        function v11121() {
          this.name = "tableBarcodeMode";
        }
  
        return v11121.prototype.createTarget = function () {
          return this.target = $(
            `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('条形码格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n         <option value="" >${i18n.__('默认')}(CODE128A)</option>\n         <option value="CODE128A" >CODE128A</option>\n        <option value="CODE128B" >CODE128B</option>\n        <option value="CODE128C" >CODE128C</option>\n        <option value="CODE39" >CODE39</option>\n        <option value="EAN-13" >EAN-13</option>\n        <option value="EAN-8" >EAN-8</option>\n        <option value="EAN-5" >EAN-5</option>\n        <option value="EAN-2" >EAN-2</option>\n        <option value="UPC（A）" >UPC（A）</option>\n        <option value="ITF" >ITF</option>\n        <option value="ITF-14" >ITF-14</option>\n        <option value="MSI" >MSI</option>\n            <option value="MSI10" >MSI10</option>\n            <option value="MSI11" >MSI11</option>\n            <option value="MSI1010" >MSI1010</option>\n            <option value="MSI1110" >MSI1110</option>\n            <option value="Pharmacode" >Pharmacode</option>\n        </select>\n        </div>\n    </div>`
          ), this.target;
        }, v11121.prototype.getValue = function () {
          var v11122 = this.target.find("select").val();
          return v11122 || void 0;
        }, v11121.prototype.setValue = function (v11123) {
          this.target.find("select").val(v11123);
        }, v11121.prototype.destroy = function () {
          this.target.remove();
        }, v11121;
      }(),
      tableQRCodeLevel = function () {
        function v11124() {
          this.name = "tableQRCodeLevel";
        }
  
        return v11124.prototype.createTarget = function () {
          return this.target = $(
            `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('二维码容错率')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1" >7% L</option>\n        <option value="0" >15% M</option>\n        <option value="3" >25% Q</option>\n        <option value="2" >30% H</option>\n        </select>\n        </div>\n    </div>`
          ), this.target;
        }, v11124.prototype.getValue = function () {
          var v11125 = this.target.find("select").val();
          return parseInt(v11125 || 0);
        }, v11124.prototype.setValue = function (v11126) {
          this.target.find("select").val(v11126);
        }, v11124.prototype.destroy = function () {
          this.target.remove();
        }, v11124;
      }(),
      TableColumnHeightOption = function () {
        function v11127() {
          this.name = "tableColumnHeight";
        }
  
        return v11127.prototype.createTarget = function () {
          return this.target = $(
            `<div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格高度')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('条形码、二维码以及图片有效')}" class="auto-submit" >\n        </div>\n    </div>`
          ), this.target;
        }, v11127.prototype.getValue = function () {
          var v11128 = this.target.find("input").val();
          if (v11128) return v11128.toString();
        }, v11127.prototype.setValue = function (v11129) {
          this.target.find("input").val(v11129);
        }, v11127.prototype.destroy = function () {
          this.target.remove();
        }, v11127;
      }(),
      TableSummaryTitleOption = function () {
        function v11130() {
          this.name = "tableSummaryTitle";
        }
  
        return v11130.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合标题')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="true">${i18n.__('显示')}</option><option value="false">${i18n.__('隐藏')}</option></select></div></div>`), this.target;
        }, v11130.prototype.getValue = function () {
          return !("false" == this.target.find("select").val());
        }, v11130.prototype.setValue = function (v11131) {
          this.target.find("select").val((null == v11131 ? "" : v11131).toString());
        }, v11130.prototype.destroy = function () {
          this.target.remove();
        }, v11130;
      }(),
      TableSummaryTextOption = function () {
        function v11132() {
          this.name = "tableSummaryText";
        }
  
        return v11132.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合文本')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('聚合类型')}:" class="auto-submit" >\n        </div>\n    </div>`), this.target;
        }, v11132.prototype.getValue = function () {
          var v11133 = this.target.find("input").val();
          if (v11133) return v11133.toString();
        }, v11132.prototype.setValue = function (v11134) {
          this.target.find("input").val(v11134);
        }, v11132.prototype.destroy = function () {
          this.target.remove();
        }, v11132;
      }(),
      TableSummaryColspanOption = function () {
        function v11135() {
          this.name = "tableSummaryColspan";
        }
  
        return v11135.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合合并列数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" min="0" step="1" placeholder="${i18n.__('合并列数')}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
        }, v11135.prototype.getValue = function () {
          var v11136 = this.target.find("input").val();
          if (v11136) return v11136.toString();
        }, v11135.prototype.setValue = function (v11137) {
          this.target.find("input").val(v11137);
        }, v11135.prototype.destroy = function () {
          this.target.remove();
        }, v11135;
      }(),
      TableSummaryAlignOption = function () {
        function v11138() {
          this.name = "tableSummaryAlign";
        }
  
        return v11138.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合类型左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11138.prototype.getValue = function () {
          var v11139 = this.target.find("select").val();
          if (v11139) return v11139.toString();
        }, v11138.prototype.setValue = function (v11140) {
          this.target.find("select").val(v11140);
        }, v11138.prototype.destroy = function () {
          this.target.remove();
        }, v11138;
      }(),
      TableSummaryNumFormatOption = function () {
        function v11141() {
          this.name = "tableSummaryNumFormat";
        }
  
        return v11141.prototype.createTarget = function () {
          var list = [{ t: `${i18n.__('整数')}`, v: '0' }],num = [1, 2, 3, 4, 5, 6];
          num.forEach(function (v11144) {
            list.push({ t: i18n.__n(`保留%s位`, v11144), v: '' + v11144 });
          });
          var v11147 = `\n            <option value="" >${i18n.__('默认')}</option>`;
          list.forEach(function (v11148) {
            v11147 += '\n            <option value="' + (v11148.v || "") + '">' + (v11148.t || "") + '</option>';
          });
          this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合小数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit"></select>\n        </div>\n    </div>`);
          this.target.find(".auto-submit").append($(v11147));
          return this.target;
        }, v11141.prototype.getValue = function () {
          var v11151 = this.target.find("select").val();
          if (v11151) return v11151.toString();
        }, v11141.prototype.setValue = function (v11152) {
          this.target.find("select").val(v11152);
        }, v11141.prototype.destroy = function () {
          this.target.remove();
        }, v11141;
      }(),
      ShowCodeTitleOption = function () {
        function v11153() {
          this.name = 'showCodeTitle';
        }
        return (
          v11153.prototype.createTarget = function () {
            return (
              this.target = $(
                ` <div class="hiprint-option-item" title="条形码底部是否显示内容">\n        <div class="hiprint-option-item-label">\n          ${i18n.__('显示码值')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n            <option value="true" >${i18n.__('显示')}</option>\n            <option value="false" >${i18n.__('隐藏')}</option>\n        </select>\n        </div>\n    </div>`
              ),
              this.target);
  
          },
          v11153.prototype.getValue = function () {
            if ('true' == this.target.find('select').val()) return !0;
          },
          v11153.prototype.setValue = function (v11154) {
            this.target.find('select').val((null == v11154 ? '' : v11154).toString());
          },
          v11153.prototype.destroy = function () {
            this.target.remove();
          },
          v11153);
  
      }(),
      TableSummaryFormatterOption = function () {
        function v11155() {
          this.name = "tableSummaryFormatter";
        }
        return v11155.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('底部聚合格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(column,fieldPageData,tableData,options){ return \'<td></td>\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11155.prototype.getValue = function () {
          var v11156 = this.target.find("textarea").val();
          if (v11156) return v11156;
        }, v11155.prototype.setValue = function (v11157) {
          this.target.find("textarea").val(v11157 ? v11157.toString() : null);
        }, v11155.prototype.destroy = function () {
          this.target.remove();
        }, v11155;
      }(),
  
      UpperCaseOption = function () {
        function v11158() {
          this.name = "upperCase";
        }
        return v11158.prototype.createTarget = function () {
          var list = [
          { t: "「小写」十点八", v: "0" },
          { t: "「小写」一十点八", v: "1" },
          { t: "「大写」拾点捌", v: "2" },
          { t: "「大写」壹拾点捌", v: "3" },
          { t: "「金额」人民币拾元捌角", v: "4" },
          { t: "「金额」人民币壹拾元捌角", v: "5" },
          { t: "「金额」人民币壹拾元捌角零分", v: "6" },
          { t: "「金额」壹拾元捌角零分", v: "7" }];
  
          var v11175 = `\n<option value="">${i18n.__('默认')}</option>`;
          list.forEach((v11176) => {
            v11175 += `\n<option value='${v11176.v}'>${v11176.t}</option>`;
          });
          this.target = $(
            `<div class="hiprint-option-item hiprint-option-item-row">\n<div class="hiprint-option-item-label">\n${i18n.__('转大小写')}\n</div>\n<div class="hiprint-option-item-field">\n<select class="auto-submit"></select>\n</div>\n</div>`
          );
          this.target.find(".auto-submit").append($(v11175));
          return this.target;
        }, v11158.prototype.getValue = function () {
          var v11179 = this.target.find("select").val();
          if (v11179) return v11179.toString();
        }, v11158.prototype.setValue = function (v11180) {
          this.target.find("select").val(v11180);
        }, v11158.prototype.destroy = function () {
          this.target.remove();
        }, v11158;
      }(),
  
      // 表格底部合计栏
      TableSummaryOption = function () {
        function v11181() {
          this.name = "tableSummary";
        }
        return v11181.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合类型')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('不聚合')}</option><option value="count">${i18n.__('计数')}</option><option value="sum">${i18n.__('合计')}</option><option value="avg">${i18n.__('平均值')}</option><option value="min">${i18n.__('最小值')}</option><option value="max">${i18n.__('最大值')}</option><option value="text">${i18n.__('仅文本')}</option></select></div></div>`), this.target;
        }, v11181.prototype.getValue = function () {
          return this.target.find("select").val();
        }, v11181.prototype.setValue = function (v11182) {
          this.target.find("select").val(v11182);
        }, v11181.prototype.destroy = function () {
          this.target.remove();
        }, v11181;
      }(),
      st = function () {
        function v11183() {
          this.name = "topOffset";
        }
  
        return v11183.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('顶部偏移')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit">\n        </div>\n    </div>`), this.target;
        }, v11183.prototype.getValue = function () {
          var v11184 = this.target.find("input").val();
          if (v11184) return parseFloat(v11184.toString());
        }, v11183.prototype.setValue = function (v11185) {
          this.target.find("input").val(v11185);
        }, v11183.prototype.destroy = function () {
          this.target.remove();
        }, v11183;
      }(),
      panelLayoutOptions = function () {
        function v11186() {
          this.name = "panelLayoutOptions";
        }
        return v11186.prototype.createTarget = function () {
          this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('面板排列')}</div></div>`);
          this.layoutType = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('排列方式')}:</div><select style="width:75%" class="auto-submit"><option value="column" >${i18n.__('纵向')}</option><option value="row" >${i18n.__('横向')}</option></select></div></div>`);
          this.layoutRowGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('垂直间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('垂直间距mm')}" class="auto-submit"></div>`);
          this.layoutColumnGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('水平间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('水平间距mm')}" class="auto-submit"></div>`);
          this.target.append(this.layoutType);
          this.target.append(this.layoutRowGap);
          this.target.append(this.layoutColumnGap);
          return this.target;
        }, v11186.prototype.getValue = function () {
          let opt = {
            layoutType: this.layoutType.find("select").val() || 'column',
            layoutRowGap: parseInt(this.layoutRowGap.find('input').val() || 0),
            layoutColumnGap: parseInt(this.layoutColumnGap.find('input').val() || 0)
          };
          let options = Object.assign({}, this.options, opt);
          return options;
        }, v11186.prototype.setValue = function (v11187) {
          this.options = v11187;
          this.layoutType.find("select").val(v11187.layoutType || 'column');
          this.layoutRowGap.find("input").val(v11187.layoutRowGap);
          this.layoutColumnGap.find("input").val(v11187.layoutColumnGap);
        }, v11186.prototype.destroy = function () {
          this.target.remove();
        }, v11186;
      }(),
      lt = function () {
        function v11188() {
          this.name = "gridColumns";
        }
  
        return v11188.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('一行多组')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="2" >${i18n.__('一行二列')}</option>\n        <option value="3" >${i18n.__('一行三列')}</option>\n        <option value="4" >${i18n.__('一行四列')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11188.prototype.getValue = function () {
          var v11189 = this.target.find("select").val();
          if (v11189) return parseFloat(v11189.toString());
        }, v11188.prototype.setValue = function (v11190) {
          v11190 && (this.target.find('option[value="' + v11190 + '"]').length || this.target.find("select").prepend('<option value="' + v11190 + '" >' + v11190 + "</option>"));
          this.target.find("select").val(v11190);
        }, v11188.prototype.destroy = function () {
          this.target.remove();
        }, v11188;
      }(),
      ut = function () {
        function v11191() {
          this.name = "gridColumnsGutter";
        }
  
        return v11191.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('一行多组间隔')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.25" >7.25pt</option>\n        <option value="8.5" >8.5pt</option>\n        <option value="9" >9pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11191.prototype.getValue = function () {
          var v11192 = this.target.find("select").val();
          if (v11192) return parseFloat(v11192.toString());
        }, v11191.prototype.css = function (v11193, v11194) {
          if (v11193 && v11193.length) {
            if (v11194) return v11193.find(".table-grid-row").css("margin-left", "-" + v11194 + "pt").css("margin-right", "-" + v11194 + "pt"), v11193.find(".tableGridColumnsGutterRow").css("padding-left", v11194 + "pt").css("padding-right", v11194 + "pt"), null;
            v11193.find(".table-grid-row").map(function (v11195, v11196) {
              v11196.style.marginLeft = "", v11196.style.marginRight = "";
            }), v11193.find(".tableGridColumnsGutterRow").map(function (v11197, v11198) {
              v11198.style.paddingLeft = "", v11198.style.paddingRight = "";
            });
          }
  
          return null;
        }, v11191.prototype.setValue = function (v11199) {
          v11199 && (this.target.find('option[value="' + v11199 + '"]').length || this.target.find("select").prepend('<option value="' + v11199 + '" >' + v11199 + "</option>"));
          this.target.find("select").val(v11199);
        }, v11191.prototype.destroy = function () {
          this.target.remove();
        }, v11191;
      }(),
      ith = function () {
        function v11200() {
          this.name = "tableHeaderRepeat";
        }
  
        return v11200.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格头显示')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="page" >${i18n.__('每页显示')}</option>\n        <option value="first" >${i18n.__('首页显示')}</option>\n        <option value="none" >${i18n.__('不显示')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11200.prototype.getValue = function () {
          var v11201 = this.target.find("select").val();
          if (v11201) return v11201.toString();
        }, v11200.prototype.setValue = function (v11202) {
          this.target.find("select").val(v11202);
        }, v11200.prototype.destroy = function () {
          this.target.remove();
        }, v11200;
      }(),
      dt = function () {
        function v11203() {
          this.name = "paddingLeft";
        }
  
        return v11203.prototype.css = function (v11204, v11205) {
          var v11206 = v11204;
  
          if (v11206 && v11206.length) {
            if (v11205) return v11206.css("padding-left", v11205 + "pt"), "padding-left";
            v11206[0].style.paddingLeft = "";
          }
  
          return null;
        }, v11203.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11203.prototype.getValue = function () {
          var v11207 = this.target.find("select").val();
          if (v11207) return parseFloat(v11207.toString());
        }, v11203.prototype.setValue = function (v11208) {
          v11208 && (this.target.find('option[value="' + v11208 + '"]').length || this.target.find("select").prepend('<option value="' + v11208 + '" >' + v11208 + "</option>"));
          this.target.find("select").val(v11208);
        }, v11203.prototype.destroy = function () {
          this.target.remove();
        }, v11203;
      }(),
      ct = function () {
        function v11209() {
          this.name = "paddingRight";
        }
  
        return v11209.prototype.css = function (v11210, v11211) {
          var v11212 = v11210;
  
          if (v11212 && v11212.length) {
            if (v11211) return v11212.css("padding-right", v11211 + "pt"), "padding-right";
            v11212[0].style.paddingRight = "";
          }
  
          return null;
        }, v11209.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('右内边距')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11209.prototype.getValue = function () {
          var v11213 = this.target.find("select").val();
          if (v11213) return parseFloat(v11213.toString());
        }, v11209.prototype.setValue = function (v11214) {
          v11214 && (this.target.find('option[value="' + v11214 + '"]').length || this.target.find("select").prepend('<option value="' + v11214 + '" >' + v11214 + "</option>"));
          this.target.find("select").val(v11214);
        }, v11209.prototype.destroy = function () {
          this.target.remove();
        }, v11209;
      }(),
      ht = function () {
        function v11215() {
          this.name = "dataType";
        }
  
        return v11215.prototype.createTarget = function () {
          var v11216 = this;
          return this.target = $(`\n        <div class="hiprint-option-item-row">\n        <div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('数据类型')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="hiprint-option-item-datatype">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="datetime" >${i18n.__('日期时间')}</option>\n        <option value="boolean" >${i18n.__('布尔')}</option>\n        </select>\n        </div>\n    </div>\n    <div class="hiprint-option-item ">\n        <div class="hiprint-option-item-label ">\n        ${i18n.__('格式')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select  class="auto-submit hiprint-option-item-datatype-select-format">\n        <option value="" >${i18n.__('默认')}</option>\n        \n        </select>\n        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">\n        </div>\n    </div>\n        </div>\n`), $(this.target.find(".hiprint-option-item-datatype")).change(function () {
            var v11217 = $(v11216.target.find(".hiprint-option-item-datatype")).val();
            v11216.loadFormatSelectByDataType(v11217), v11216.submit(v11216.getValue());
          }), this.target;
        }, v11215.prototype.getValue = function () {
          var v11218 = this.target.find(".hiprint-option-item-datatype").val();
  
          if (v11218) {
            var v11219 = this.target.find(".hiprint-option-item-datatype-format").val();
            return {
              dataType: v11218,
              format: v11219 || void 0
            };
          }
  
          return {
            dataType: void 0,
            format: void 0
          };
        }, v11215.prototype.setValue = function (v11220, v11221) {
          this.target.find(".hiprint-option-item-datatype").val(v11221.dataType || ""), this.loadFormatSelectByDataType(v11221.dataType), this.target.find(".hiprint-option-item-datatype-format").val(v11221.format || "");
        }, v11215.prototype.destroy = function () {
          this.target.remove();
        }, v11215.prototype.loadFormatSelectByDataType = function (v11222) {
          "boolean" === v11222 ? (this.target.find(".hiprint-option-item-datatype-select-format").removeClass("hiprint-option-item-datatype-format").hide().val(""), this.target.find(".hiprint-option-item-datatype-input-format").addClass("hiprint-option-item-datatype-format").show()) : "datetime" === v11222 ? (this.target.find(".hiprint-option-item-datatype-select-format").addClass("hiprint-option-item-datatype-format").show(), this.target.find(".hiprint-option-item-datatype-input-format").removeClass("hiprint-option-item-datatype-format").hide().val(""), this.target.find(".hiprint-option-item-datatype-select-format").html(`\n            <option value="" >${i18n.__('默认')}</option>\n            <option value="M/d" >M/d</option>\n            <option value="MM/dd" >MM/dd</option>\n            <option value="yy/M/d" >yy/M/d</option>\n            <option value="yy/MM/dd" >yy/MM/dd</option>\n            <option value="yyyy/M/d" >yyyy/M/d</option>\n            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>\n            <option value="yy/M/d H:m" >yy/M/d H:m</option>\n            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>\n            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>\n            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>\n            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>\n            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>\n            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>\n            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>\n            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>\n            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>\n            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>\n            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>\n            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>\n            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>\n            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>\n            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>\n\n            <option value="M-d" >M-d</option>\n            <option value="MM-dd" >MM-dd</option>\n            <option value="yy-M-d" >yy-M-d</option>\n            <option value="yy-MM-dd" >yy-MM-dd</option>\n            <option value="yyyy-M-d" >yyyy-M-d</option>\n            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>\n            <option value="yy-M-d H:m" >yy-M-d H:m</option>\n            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>\n            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>\n            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>\n            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>\n            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>\n            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>\n            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>\n            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>\n            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>\n            <option value="yyyy-M-d HH:mm" >yyyy-M-d HH:mm</option>\n            <option value="yyyy-M-d HH:mm:ss" >yyyy-M-d HH:mm:ss</option>\n            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>\n            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>\n            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>\n            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>\n`)) : (this.target.find(".hiprint-option-item-datatype-select-format").show(), this.target.find(".hiprint-option-item-datatype-input-format").hide().val(""), this.target.find(".hiprint-option-item-datatype-format").html(`\n            <option value="" >${i18n.__('默认')}</option>\n`));
        }, v11215;
      }(),
      ft = function () {
        function v11223() {
          this.name = "formatter";
        }
  
        return v11223.prototype.createTarget = function () {
          var v11224 = `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(title,value,options,templateData,target){}" class="auto-submit"></textarea>\n        </div>\n    </div>`;
          return this.target = $(v11224), this.target;
        }, v11223.prototype.getValue = function () {
          var v11225 = this.target.find("textarea").val();
          if (v11225) return v11225;
        }, v11223.prototype.setValue = function (v11226) {
          this.target.find("textarea").val(v11226 ? v11226.toString() : null);
        }, v11223.prototype.destroy = function () {
          this.target.remove();
        }, v11223;
      }(),
      gt = function () {
        function v11227() {
          this.name = "styler";
        }
  
        return v11227.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value, options, target,templateData){}" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11227.prototype.getValue = function () {
          var v11228 = this.target.find("textarea").val();
          if (v11228) return v11228;
        }, v11227.prototype.setValue = function (v11229) {
          this.target.find("textarea").val(v11229 ? v11229.toString() : null);
        }, v11227.prototype.destroy = function () {
          this.target.remove();
        }, v11227;
      }(),
      rowcolumns = function () {
        function v11230() {
          this.name = "rowsColumnsMerge";
        }
  
        return v11230.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('行/列合并函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(data, col, colIndex, rowIndex, tableData, printData){ return [1,1] }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11230.prototype.getValue = function () {
          var v11231 = this.target.find("textarea").val();
          if (v11231) return v11231;
        }, v11230.prototype.setValue = function (v11232) {
          this.target.find("textarea").val(v11232 ? v11232.toString() : null);
        }, v11230.prototype.destroy = function () {
          this.target.remove();
        }, v11230;
      }(),
      rowsColumnsMergeClean = function () {
        function v11233() {
          this.name = "rowsColumnsMergeClean";
        }
  
        return v11233.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('跨页合并是否清除')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="true" >${i18n.__('是')}</option>\n        <option value="false" >${i18n.__('否')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11233.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }, v11233.prototype.setValue = function (v11234) {
          this.target.find("select").val((null == v11234 ? "" : v11234).toString());
        }, v11233.prototype.destroy = function () {
          this.target.remove();
        }, v11233;
      }(),
      mt = function () {
        function v11235() {
          this.name = "footerFormatter";
        }
  
        return v11235.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格脚函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return \'<tr></tr>\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11235.prototype.getValue = function () {
          var v11236 = this.target.find("textarea").val();
          if (v11236) return v11236;
        }, v11235.prototype.setValue = function (v11237) {
          this.target.find("textarea").val(v11237 ? v11237.toString() : null);
        }, v11235.prototype.destroy = function () {
          this.target.remove();
        }, v11235;
      }(),
      groupFieldsFormatter = function () {
        function v11238() {
          this.name = "groupFieldsFormatter";
        }
  
        return v11238.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分组字段函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(type,options,data){ return [] }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11238.prototype.getValue = function () {
          var v11239 = this.target.find("textarea").val();
          if (v11239) return v11239;
        }, v11238.prototype.setValue = function (v11240) {
          this.target.find("textarea").val(v11240 ? v11240.toString() : null);
        }, v11238.prototype.destroy = function () {
          this.target.remove();
        }, v11238;
      }(),
      groupFormatter = function () {
        function v11241() {
          this.name = "groupFormatter";
        }
  
        return v11241.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分组头格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return \'${i18n.__('分组头信息')}(html)\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11241.prototype.getValue = function () {
          var v11242 = this.target.find("textarea").val();
          if (v11242) return v11242;
        }, v11241.prototype.setValue = function (v11243) {
          this.target.find("textarea").val(v11243 ? v11243.toString() : null);
        }, v11241.prototype.destroy = function () {
          this.target.remove();
        }, v11241;
      }(),
      groupFooterFormatter = function () {
        function v11244() {
          this.name = "groupFooterFormatter";
        }
  
        return v11244.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('分组脚格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return \'${i18n.__('分组脚信息')}(html)\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11244.prototype.getValue = function () {
          var v11245 = this.target.find("textarea").val();
          if (v11245) return v11245;
        }, v11244.prototype.setValue = function (v11246) {
          this.target.find("textarea").val(v11246 ? v11246.toString() : null);
        }, v11244.prototype.destroy = function () {
          this.target.remove();
        }, v11244;
      }(),
      vt = function () {
        function v11247() {
          this.name = "gridColumnsFooterFormatter";
        }
  
        return v11247.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('多组表格脚函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return \'\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11247.prototype.getValue = function () {
          var v11248 = this.target.find("textarea").val();
          if (v11248) return v11248;
        }, v11247.prototype.setValue = function (v11249) {
          this.target.find("textarea").val(v11249 ? v11249.toString() : null);
        }, v11247.prototype.destroy = function () {
          this.target.remove();
        }, v11247;
      }(),
      yt = function () {
        function v11250() {
          this.name = "rowStyler";
        }
  
        return v11250.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('行样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,options){ return \'\' }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11250.prototype.getValue = function () {
          var v11251 = this.target.find("textarea").val();
          if (v11251) return v11251;
        }, v11250.prototype.setValue = function (v11252) {
          this.target.find("textarea").val(v11252 ? v11252.toString() : null);
        }, v11250.prototype.destroy = function () {
          this.target.remove();
        }, v11250;
      }(),
      bt = function () {
        function v11253() {
          this.name = "align";
        }
  
        return v11253.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11253.prototype.getValue = function () {
          var v11254 = this.target.find("select").val();
          if (v11254) return v11254.toString();
        }, v11253.prototype.setValue = function (v11255) {
          this.target.find("select").val(v11255);
        }, v11253.prototype.destroy = function () {
          this.target.remove();
        }, v11253;
      }(),
      Et = function () {
        function v11256() {
          this.name = "vAlign";
        }
  
        return v11256.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格上下对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="top" >${i18n.__('上')}</option>\n        <option value="middle" >${i18n.__('中')}</option>\n        <option value="bottom" >${i18n.__('下')}</option>\n        \n        </select>\n        </div>\n    </div>`), this.target;
        }, v11256.prototype.getValue = function () {
          var v11257 = this.target.find("select").val();
          if (v11257) return v11257.toString();
        }, v11256.prototype.setValue = function (v11258) {
          this.target.find("select").val(v11258);
        }, v11256.prototype.destroy = function () {
          this.target.remove();
        }, v11256;
      }(),
      Tt = function () {
        function v11259() {
          this.name = "halign";
        }
  
        return v11259.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格头单元格左右对齐')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="left" >${i18n.__('居左')}</option>\n        <option value="center" >${i18n.__('居中')}</option>\n        <option value="right" >${i18n.__('居右')}</option>\n        <option value="justify" >${i18n.__('两端对齐')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11259.prototype.getValue = function () {
          var v11260 = this.target.find("select").val();
          if (v11260) return v11260.toString();
        }, v11259.prototype.setValue = function (v11261) {
          this.target.find("select").val(v11261);
        }, v11259.prototype.destroy = function () {
          this.target.remove();
        }, v11259;
      }(),
      Pt = function () {
        function v11262() {
          this.name = "styler2";
        }
  
        return v11262.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11262.prototype.getValue = function () {
          var v11263 = this.target.find("textarea").val();
          if (v11263) return v11263;
        }, v11262.prototype.setValue = function (v11264) {
          this.target.find("textarea").val(v11264 ? v11264.toString() : null);
        }, v11262.prototype.destroy = function () {
          this.target.remove();
        }, v11262;
      }(),
      stylerHeader = function () {
        function v11265() {
          this.name = "stylerHeader";
        }
  
        return v11265.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格头样式函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(options){ return {color:\'red\' }; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11265.prototype.getValue = function () {
          var v11266 = this.target.find("textarea").val();
          if (v11266) return v11266;
        }, v11265.prototype.setValue = function (v11267) {
          this.target.find("textarea").val(v11267 ? v11267.toString() : null);
        }, v11265.prototype.destroy = function () {
          this.target.remove();
        }, v11265;
      }(),
      _t = function () {
        function v11268() {
          this.name = "formatter2";
        }
  
        return v11268.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格格式化函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return \'\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11268.prototype.getValue = function () {
          var v11269 = this.target.find("textarea").val();
          if (v11269) return v11269;
        }, v11268.prototype.setValue = function (v11270) {
          this.target.find("textarea").val(v11270 ? v11270.toString() : null);
        }, v11268.prototype.destroy = function () {
          this.target.remove();
        }, v11268;
      }(),
      renderFormatter = function () {
        function v11271() {
          this.name = "renderFormatter";
        }
  
        return v11271.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('单元格渲染函数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <textarea style="height:80px;" placeholder="function(value,row,colIndex,options,rowIndex){ return \'<td></td>\'; }" class="auto-submit"></textarea>\n        </div>\n    </div>`), this.target;
        }, v11271.prototype.getValue = function () {
          var v11272 = this.target.find("textarea").val();
          if (v11272) return v11272;
        }, v11271.prototype.setValue = function (v11273) {
          this.target.find("textarea").val(v11273 ? v11273.toString() : null);
        }, v11271.prototype.destroy = function () {
          this.target.remove();
        }, v11271;
      }(),
      wt = function () {
        function v11274() {
          this.name = "autoCompletion";
        }
  
        return v11274.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('自动补全')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="true" >${i18n.__('是')}</option>\n        <option value="false" >${i18n.__('否')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11274.prototype.getValue = function () {
          if ("true" == this.target.find("select").val()) return !0;
        }, v11274.prototype.setValue = function (v11275) {
          this.target.find("select").val((null == v11275 ? "" : v11275).toString());
        }, v11274.prototype.destroy = function () {
          this.target.remove();
        }, v11274;
      }(),
      maxRows = function () {
        function v11276() {
          this.name = "maxRows";
        }
  
        return v11276.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('每页最大行数')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="number" value="1" step="1" min="1" class="auto-submit"/>\n        </div>\n    </div>`), this.target;
        }, v11276.prototype.getValue = function () {
          var v11277 = this.target.find("input").val();
          if (v11277) return parseInt(v11277.toString());
        }, v11276.prototype.setValue = function (v11278) {
          this.target.find("input").val(v11278);
        }, v11276.prototype.destroy = function () {
          this.target.remove();
        }, v11276;
      }(),
      xt = function () {
        function v11279() {
          this.name = "tableFooterRepeat";
        }
  
        return v11279.prototype.createTarget = function () {
          return this.target = $(`<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('表格脚显示')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__('默认')}</option>\n        <option value="no" >${i18n.__('不显示')}</option>\n        <option value="page" >${i18n.__('每页显示')}</option>\n        <option value="last" >${i18n.__('最后显示')}</option>\n        </select>\n        </div>\n    </div>`), this.target;
        }, v11279.prototype.getValue = function () {
          var v11280 = this.target.find("select").val();
          if (v11280) return v11280.toString();
        }, v11279.prototype.setValue = function (v11281) {
          this.target.find("select").val(v11281);
        }, v11279.prototype.destroy = function () {
          this.target.remove();
        }, v11279;
      }();
  
    // webpack_require.d(webpack_exports, "a", function () {
    //   return Ct;
    // });
  
    var PrintElementOptionItemManager = function () {
      function v11283() {
      }
  
      return v11283.init = function () {
        v11283.printElementOptionItems || (v11283.printElementOptionItems = {}, v11283._printElementOptionItems.forEach(function (v11284) {
          v11283.printElementOptionItems[v11284.name] = v11284;
        }));
      }, v11283.registerItem = function (v11285) {
        if (!v11285.name) throw new Error("styleItem must have name");
        v11283.init(), v11283.printElementOptionItems[v11285.name] = v11285;
      }, v11283.getItem = function (v11286) {
        return v11283.init(), v11283.printElementOptionItems[v11286];
      }, v11283._printElementOptionItems = [new FontFamilyOption(), new FontSizeOption(), new FontWeightOption(), new LetterSpacingOption(), new LineHeightOption(), new TextAlignOption(), new HideTitleOption(), new pt(), new TableBorderOption(), new TableHeaderBorderOption(), new TableHeaderCellBorderOption(), new TableHeaderRowHeightOption(), new TableHeaderFontSizeOption(), new TableHeaderFontWeightOption(), new TableBodyCellBorderOption(), new TableFooterBorderOption(), new TableFooterCellBorderOption(), new TableBodyRowHeightOption(), new TableHeaderBackgroundOption(), new BorderWidthOption(), new BarcodeModeOption(), new QrCodeLevelOption(), new v10837(), new v10843(), new v10849(), new v10857(), new v10861(), new coordinate(), new widthHeight(), new v10885(), new imageFit(), new v10899(), new v10909(), new v10913(), new paperNumberContinue(), new watermarkOptions(), new v10918(), new v10924(), new pageBreak(), new v10934(), new M2(), new v10941(), new v10944(), new v10948(), new v10952(), new v10956(), new v10960(), new v10963(), new st(), new v10967(), new v10971(), new v10975(), new v10979(), new TransformOption(), new borderRadius(), new zIndex(), new v11002(), new v11005(), new v11011(), new v11017(), new v11023(), new ContentPaddingTopOption(), new v11029(), new v11043(), new tt(), new et(), new nt(), new it(), new ot(), new textWrap(), new at(), new lt(), new panelLayoutOptions(), new ut(), new ith(), new dt(), new ct(), new ht(), new ft(), new gt(), new mt(), new rowcolumns(), new rowsColumnsMergeClean(), new groupFieldsFormatter(), new groupFormatter(), new groupFooterFormatter(), new vt(), new yt(), new bt(), new Tt(), new Et(), new Pt(), new stylerHeader(), new renderFormatter(), new _t(), new wt(), new maxRows(), new xt(), new TableColumnHeightOption(), new tableE(), new tableQRCodeLevel(), new tablept(), new TableSummaryTitleOption(), new TableSummaryTextOption(), new TableSummaryColspanOption(), new TableSummaryOption(), new TableSummaryAlignOption(), new TableSummaryNumFormatOption(), new TableSummaryFormatterOption(), new ShowCodeTitleOption(), new UpperCaseOption(), new BarcodeTypeOption(), new QrcodeTypeOption(), new barColor(), new BarWidthOption(), new BarAutoWidthOption()], v11283;
    }();
  
export default PrintElementOptionItemManager;