"use strict";

/**
这个文件实现了一个 JavaScript 类，主要用于处理一些与图形元素相关的属性和方法。以下是主要功能和特点：

1. **类定义**：
   - 定义了一个名为 `v10174` 的类。

2. **构造函数**：
   - 构造函数接受一个参数 `v10173`，这个参数是一个对象，包含了一些初始属性如 `left`, `top`, `height`, `width`, `transform` 等。

3. **默认选项设置**：
   - `setDefault` 方法用于设置默认选项，并将这些选项应用到实例的属性中。

4. **尺寸初始化**：
   - `initSize` 方法用于根据默认选项初始化宽度和高度。
   - `initSizeByHtml` 方法允许通过 HTML 元素的宽度和高度来初始化尺寸。

5. **旋转和尺寸调整**：
   - `getRectInfo` 方法计算并返回一个对象，包含宽度、高度、宽度差和高度差，这些值考虑了元素的旋转角度。
   - `setRotate` 方法用于设置元素的旋转角度。

6. **位置和尺寸获取与设置**：
   - 提供了多个方法来获取和设置元素的 `left`, `top`, `height`, `width` 属性。
   - `getLeft`, `getTop`, `getHeight`, `getWidth` 等方法用于获取这些属性的值。
   - `setLeft`, `setTop`, `setHeight`, `setWidth` 等方法用于设置这些属性的值。

7. **显示位置和尺寸**：
   - `displayLeft`, `displayTop`, `displayHeight`, `displayWidth` 方法用于获取元素的显示位置和尺寸，考虑了旋转和默认选项的影响。

8. **复制设计顶部**：
   - `copyDesignTopFromTop` 方法将 `top` 属性的值复制到 `topInDesign` 属性。

9. **获取打印元素选项实体**：
   - `getPrintElementOptionEntity` 方法返回一个新对象，包含除了 `topInDesign` 属性外的所有属性，用于打印元素的选项。

10. **初始化**：
    - `init` 方法用于初始化实例属性，将传入的对象的属性复制到实例中。

整体来看，这个类主要用于管理图形元素的属性，包括位置、尺寸、旋转等，并提供了一些辅助方法来处理这些属性的显示和打印。

 */
import {_typeof} from "../hiprint.comm.js";

  
    var ElementOptionEntity = function () {
      return function () {
      };
    }();
  
    var PrintElementOption = function () {
      function v10174(v10173) {
        v10173 = v10173 || {}, this.left = v10173.left, this.top = v10173.top, this.topInDesign = this.top, this.height = v10173.height, this.width = v10173.width, this.transform = v10173.transform, this.init(v10173);
      }
  
      return v10174.prototype.setDefault = function (v10175) {
        this.defaultOptions = v10175, this.initSize();
        Object.keys(this.defaultOptions).forEach((key) => {
          this[key] = this[key] || this.defaultOptions[key];
        });
      }, v10174.prototype.initSize = function () {
        this.width || this.setWidth(this.defaultOptions.width), this.height || this.setHeight(this.defaultOptions.height);
      }, v10174.prototype.initSizeByHtml = function (v10176, v10177) {
        this.width || this.setWidth(v10176), this.height || this.setHeight(v10177);
      }, v10174.prototype.getRectInfo = function () {
        var v10178 = { w: 0, h: 0, diffW: 0, diffH: 0 };
        if (this.transform) {
          var rad = this.transform * Math.PI / 180,
            width = this.width,height = this.height,
            sin = Math.sin(rad),cos = Math.cos(rad),
            v10179 = Math.abs(width * cos) + Math.abs(height * sin),
            v10180 = Math.abs(width * sin) + Math.abs(height * cos),
            diffW = (width - v10179) / 2,diffH = (height - v10180) / 2;
          v10178.w = v10179, v10178.h = v10180, v10178.diffW = diffW, v10178.diffH = diffH;
        }
        return v10178;
      }, v10174.prototype.getLeft = function () {
        return this.left;
      }, v10174.prototype.posLeft = function () {
        var left = this.left;
        if (this.transform) left += this.getRectInfo().diffW;
        return Math.floor(left * 10) / 10;
      }, v10174.prototype.setRotate = function (v10183) {
        null != v10183 && (this.transform = v10183);
      }, v10174.prototype.displayLeft = function (v10184) {
        if (this.transform && v10184) {
          return this.left + this.getRectInfo().diffW + "pt";
        }
        return this.left + "pt";
      }, v10174.prototype.setLeft = function (v10185) {
        null != v10185 && (this.left = v10185);
      }, v10174.prototype.getTop = function () {
        return this.top;
      }, v10174.prototype.posTop = function () {
        var top = this.top;
        if (this.transform) top += this.getRectInfo().diffH;
        return Math.floor(top * 10) / 10;
      }, v10174.prototype.getTopInDesign = function () {
        return this.topInDesign;
      }, v10174.prototype.displayTop = function (v10186) {
        if (this.transform && v10186) {
          return this.top + this.getRectInfo().diffH + "pt";
        }
        return this.top + "pt";
      }, v10174.prototype.setTop = function (v10187) {
        null != v10187 && (this.top = v10187);
      }, v10174.prototype.copyDesignTopFromTop = function () {
        this.topInDesign = this.top;
      }, v10174.prototype.getHeight = function () {
        if (this.transform) {
          var v10188 = this.getRectInfo();
          return v10188.h + v10188.diffH;
        }
        return this.height;
      }, v10174.prototype.displayHeight = function () {
        return this.height + "pt";
      }, v10174.prototype.setHeight = function (v10190) {
        null != v10190 && (this.height = v10190);
      }, v10174.prototype.getWidth = function () {
        if (this.transform) {
          var v10191 = this.getRectInfo();
          return v10191.w + v10191.diffW;
        }
        return this.width;
      }, v10174.prototype.displayWidth = function () {
        return this.width + "pt";
      }, v10174.prototype.setWidth = function (v10193) {
        null != v10193 && (this.width = v10193);
      }, v10174.prototype.getValueFromOptionsOrDefault = function (v10194) {
        return null == this[v10194] ? this.defaultOptions[v10194] : this[v10194];
      }, v10174.prototype.getPrintElementOptionEntity = function () {
        var v10195 = new ElementOptionEntity(),
          v10196 = this;
        return Object.keys(this).filter(function (v10197) {
          return "topInDesign" != v10197;
        }).forEach(function (v10198) {
          if ("number" != typeof v10196[v10198] && "string" != typeof v10196[v10198] && !['fields'].includes(v10198) && _typeof(v10196[v10198]) != _typeof(!0) || (v10195[v10198] = v10196[v10198]), "style" == v10198) {
            v10195.style = {};
            var v10199 = v10196[v10198];
            if (v10199) Object.keys(v10199).forEach(function (v10200) {
              "number" != typeof v10199[v10200] && "string" != typeof v10199[v10200] || (v10195.style[v10200] = v10199[v10200]);
            });
          }
        }), v10195;
      }, v10174.prototype.init = function (v10201) {
        var v10202 = this;
        v10201 && Object.keys(v10201).forEach(function (v10203) {
          v10202[v10203] = v10201[v10203];
        });
      }, v10174;
    }();

export default PrintElementOption;