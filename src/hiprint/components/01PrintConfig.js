"use strict";

import { $ } from "../hiprint.comm";
import hinnn from "./00hinnn";
import PrintElementOptionItemManager from "./09PrintElementOptionItemManager";

/**
 * PrintConfig类用于管理打印配置。
 * 提供了初始化配置、事件绑定、事件清除和注册打印元素选项的方法。
 */
class PrintConfig {
  constructor() {
    // see hiprint.config.js
  }

  /**
   * 初始化配置
   * @param {Object} config - 配置对象
   */
  init(config) {
    if (config) {
      $.extend(this, config); // 合并配置对象到当前实例
    }
  }

  /**
   * 绑定事件处理函数
   * @param {string} event - 事件名称
   * @param {Function} handler - 事件处理函数
   */
  on(event, handler) {
    hinnn.event.on(event, handler); // 注册事件处理函数
  }

  /**
   * 清除事件处理函数
   * @param {string} event - 事件名称
   */
  clear(event) {
    hinnn.event.clear(event); // 清除指定事件的处理函数
  }

  /**
   * 注册打印元素选项
   * @param {Array} items - 打印元素选项类数组
   */
  registerItems(items) {
    items.forEach((ItemClass) => {
      PrintElementOptionItemManager.registerItem(new ItemClass()); // 注册每一个打印元素选项实例
    });
  }

  /**
   * 获取单例实例
   * @returns {PrintConfig} - PrintConfig单例实例
   */
  static get instance() {
    if (!PrintConfig._instance) {
      PrintConfig._instance = new PrintConfig();
      if (window.HIPRINT_CONFIG) {
        $.extend(PrintConfig._instance, HIPRINT_CONFIG);
        if (PrintConfig._instance.optionItems) {
          PrintConfig._instance.optionItems.forEach((ItemClass) => {
            PrintElementOptionItemManager.registerItem(new ItemClass());
          });
        }
      }
    }
    return PrintConfig._instance;
  }
}

export default PrintConfig;

