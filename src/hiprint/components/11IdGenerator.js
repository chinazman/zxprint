"use strict";
/**
 * id 工具
 */

/**
 * IdGenerator 类
 * 用于生成唯一的递增 ID
 */
class IdGenerator {
  /**
   * 当前 ID 值，初始化为 1
   * @static
   * @type {number}
   */
  static id = 1;

  /**
   * 创建并返回一个新的唯一 ID
   * @static
   * @returns {number} 新的唯一 ID
   */
  static createId() {
      return ++this.id;
  }
}

export default IdGenerator;