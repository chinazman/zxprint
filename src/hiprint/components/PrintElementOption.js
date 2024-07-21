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
    // 定义一个空的类，用于元素选项实体
class ElementOptionEntity {
  constructor() {}
}

class PrintElementOption {
  constructor(options = {}) {
    this.left = options.left;
    this.top = options.top;
    this.topInDesign = this.top;
    this.height = options.height;
    this.width = options.width;
    this.transform = options.transform;
    this.init(options);
  }

  // 设置默认选项
  setDefault(defaultOptions) {
    this.defaultOptions = defaultOptions;
    this.initSize();
    Object.keys(this.defaultOptions).forEach((key) => {
      this[key] = this[key] || this.defaultOptions[key];
    });
  }

  // 初始化尺寸
  initSize() {
    if (!this.width) this.setWidth(this.defaultOptions.width);
    if (!this.height) this.setHeight(this.defaultOptions.height);
  }

  // 根据HTML尺寸初始化尺寸
  initSizeByHtml(width, height) {
    if (!this.width) this.setWidth(width);
    if (!this.height) this.setHeight(height);
  }

  // 根据变换获取矩形信息
  getRectInfo() {
    const rectInfo = { w: 0, h: 0, diffW: 0, diffH: 0 };
    if (this.transform) {
      const rad = this.transform * Math.PI / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      const transformedWidth = Math.abs(this.width * cos) + Math.abs(this.height * sin);
      const transformedHeight = Math.abs(this.width * sin) + Math.abs(this.height * cos);
      const diffW = (this.width - transformedWidth) / 2;
      const diffH = (this.height - transformedHeight) / 2;
      rectInfo.w = transformedWidth;
      rectInfo.h = transformedHeight;
      rectInfo.diffW = diffW;
      rectInfo.diffH = diffH;
    }
    return rectInfo;
  }

  // 获取左侧位置
  getLeft() {
    return this.left;
  }

  // 获取调整变换后的左侧位置
  posLeft() {
    let left = this.left;
    if (this.transform) left += this.getRectInfo().diffW;
    return Math.floor(left * 10) / 10;
  }

  // 设置旋转角度
  setRotate(angle) {
    if (angle != null) this.transform = angle;
  }

  // 显示左侧位置
  displayLeft(display) {
    if (this.transform && display) {
      return this.left + this.getRectInfo().diffW + "pt";
    }
    return this.left + "pt";
  }

  // 设置左侧位置
  setLeft(left) {
    if (left != null) this.left = left;
  }

  // 获取顶部位置
  getTop() {
    return this.top;
  }

  // 获取调整变换后的顶部位置
  posTop() {
    let top = this.top;
    if (this.transform) top += this.getRectInfo().diffH;
    return Math.floor(top * 10) / 10;
  }

  // 获取设计中的顶部位置
  getTopInDesign() {
    return this.topInDesign;
  }

  // 显示顶部位置
  displayTop(display) {
    if (this.transform && display) {
      return this.top + this.getRectInfo().diffH + "pt";
    }
    return this.top + "pt";
  }

  // 设置顶部位置
  setTop(top) {
    if (top != null) this.top = top;
  }

  // 复制顶部位置到设计顶部位置
  copyDesignTopFromTop() {
    this.topInDesign = this.top;
  }

  // 获取调整变换后的高度
  getHeight() {
    if (this.transform) {
      const rectInfo = this.getRectInfo();
      return rectInfo.h + rectInfo.diffH;
    }
    return this.height;
  }

  // 显示高度
  displayHeight() {
    return this.height + "pt";
  }

  // 设置高度
  setHeight(height) {
    if (height != null) this.height = height;
  }

  // 获取调整变换后的宽度
  getWidth() {
    if (this.transform) {
      const rectInfo = this.getRectInfo();
      return rectInfo.w + rectInfo.diffW;
    }
    return this.width;
  }

  // 显示宽度
  displayWidth() {
    return this.width + "pt";
  }

  // 设置宽度
  setWidth(width) {
    if (width != null) this.width = width;
  }

  // 从选项或默认值中获取值
  getValueFromOptionsOrDefault(option) {
    return this[option] == null ? this.defaultOptions[option] : this[option];
  }

  // 获取新的PrintElementOptionEntity实例
  getPrintElementOptionEntity() {
    const entity = new ElementOptionEntity();
    Object.keys(this).filter((key) => key !== "topInDesign").forEach((key) => {
      if (typeof this[key] === "number" || typeof this[key] === "string" || ["fields"].includes(key) || typeof this[key] === "boolean") {
        entity[key] = this[key];
      }
      if (key === "style") {
        entity.style = {};
        const style = this[key];
        if (style) {
          Object.keys(style).forEach((styleKey) => {
            if (typeof style[styleKey] === "number" || typeof style[styleKey] === "string") {
              entity.style[styleKey] = style[styleKey];
            }
          });
        }
      }
    });
    return entity;
  }

  // 初始化选项
  init(options) {
    if (options) {
      Object.keys(options).forEach((key) => {
        this[key] = options[key];
      });
    }
  }
}

export default PrintElementOption;
