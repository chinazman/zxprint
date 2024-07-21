import { $ } from "../hiprint.comm.js";

/**
 * PrintElement类用于管理打印元素的位置。
 */
class PrintElement {
  constructor(printElement) {
    this.printElement = printElement;
  }

  /**
   * 更新打印元素的位置
   * @param {number} left - 元素的左边位置
   * @param {number} top - 元素的顶部位置
   */
  updatePosition(left, top) {
    this.left = left;
    this.top = top;
  }
}

/**
 * PrintLib类用于管理打印库的配置和操作。
 */
class PrintLib {
  constructor() {
    this.printTemplateContainer = {}; // 打印模板容器
    this.A1 = { width: 841, height: 594 };
    this.A2 = { width: 420, height: 594 };
    this.A3 = { width: 420, height: 297 };
    this.A4 = { width: 210, height: 297 };
    this.A5 = { width: 210, height: 148 };
    this.A6 = { width: 105, height: 148 };
    this.A7 = { width: 105, height: 74 };
    this.A8 = { width: 52, height: 74 };
    this.B1 = { width: 1000, height: 707 };
    this.B2 = { width: 500, height: 707 };
    this.B3 = { width: 500, height: 353 };
    this.B4 = { width: 250, height: 353 };
    this.B5 = { width: 250, height: 176 };
    this.B6 = { width: 125, height: 176 };
    this.B7 = { width: 125, height: 88 };
    this.B8 = { width: 62, height: 88 };
  }

  /**
   * 根据给定的值计算拖拽长度
   * @param {number} value - 输入值
   * @param {number} unit - 单位长度
   * @returns {number} - 计算后的拖拽长度
   */
  dragLengthCNum(value, unit) {
    const length = 0.75 * value;
    return unit ? Math.round(length / unit) * unit : length;
  }

  /**
   * 获取单例实例
   * @returns {PrintLib} - PrintLib单例实例
   */
  static get instance() {
    if (!this._instance) {
      this._instance = new PrintLib();
    }
    return this._instance;
  }

  /**
   * 获取正在拖动的打印元素
   * @returns {PrintElement} - 正在拖动的打印元素
   */
  getDragingPrintElement() {
    return PrintLib.instance.dragingPrintElement;
  }

  /**
   * 设置正在拖动的打印元素
   * @param {HTMLElement} element - 拖动的打印元素
   */
  setDragingPrintElement(element) {
    PrintLib.instance.dragingPrintElement = new PrintElement(element);
  }

  /**
   * 生成唯一标识符
   * @returns {string} - UUID
   */
  guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      const random = Math.random() * 16 | 0;
      return (char === "x" ? random : (random & 0x3 | 0x8)).toString(16);
    });
  }

  /**
   * 将图像转换为Base64格式
   * @param {jQuery} $image - 图像元素
   */
  imageToBase64($image) {
    if ($image.attr("src").indexOf("base64") === -1) {
      try {
        const canvas = document.createElement("canvas");
        const img = new Image();
        img.src = $image.attr("src");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        $image.attr("src", canvas.toDataURL("image/png"));
      } catch (error) {
        try {
          this.xhrLoadImage($image);
        } catch (xhrError) {
          console.log(xhrError);
        }
      }
    }
  }

  /**
   * 加载图像（未实现）
   * @param {jQuery} $image - 图像元素
   */
  xhrLoadImage($image) {
    // 未实现的方法
  }

  /**
   * 转换多个图像为Base64格式
   * @param {Array} images - 图像元素数组
   */
  transformImg(images) {
    const self = this;
    images.map((_, image) => {
      self.imageToBase64($(image));
    });
  }

  /**
   * 根据ID获取打印模板
   * @param {string} id - 模板ID
   * @returns {Object} - 打印模板
   */
  getPrintTemplateById(id) {
    return PrintLib.instance.printTemplateContainer[id];
  }

  /**
   * 根据ID设置打印模板
   * @param {string} id - 模板ID
   * @param {Object} template - 打印模板
   */
  setPrintTemplateById(id, template) {
    PrintLib.instance.printTemplateContainer[id] = template;
  }
}

export default PrintLib;
