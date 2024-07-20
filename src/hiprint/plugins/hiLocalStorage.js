// 初始化本地存储对象
const localStorageObject = window.localStorage || null;

window.hiLocalStorage = {
  /**
   * 保存本地数据
   * @param {string} key - 存储的键
   * @param {string} value - 存储的值
   * @returns {boolean} - 是否成功存储
   */
  saveLocalData(key, value) {
    if (!localStorageObject || !value) {
      return false;
    }
    localStorageObject.setItem(key, value);
    return true;
  },
  /**
   * 获取本地数据
   * @param {string} key - 存储的键
   * @returns {string|null} - 存储的值或null
   */
  getLocalData(key) {
    return localStorageObject ? localStorageObject.getItem(key) : null;
  },

  /**
   * 删除本地数据项
   * @param {string} key - 存储的键
   */
  removeItem(key) {
    if (localStorageObject) {
      localStorageObject.removeItem(key);
    }
  }
};