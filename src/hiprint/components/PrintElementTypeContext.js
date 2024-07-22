// 打印元素类型管理器
class PrintElementTypeContext {
  constructor() {
    this.allElementTypes = [];
  }

  static get instance() {
    return PrintElementTypeContext._instance || (PrintElementTypeContext._instance = new PrintElementTypeContext()), PrintElementTypeContext._instance;
  }

  // 添加打印元素类型
  addPrintElementTypes(moduleName, types) {
    const self = this;
    this[moduleName] ? this[moduleName] = this[moduleName].concat(types) : this[moduleName] = types;
    types.forEach(function (typeGroup) {
      self.allElementTypes = self.allElementTypes.concat(typeGroup.printElementTypes);
    });
  }

  // 移除打印元素类型
  removePrintElementTypes(moduleName) {
    const self = this;
    delete self[moduleName];
    self.allElementTypes = self.allElementTypes.filter(function (elementType) {
      return !elementType.tid.startsWith(moduleName);
    });
  }

  // 获取元素类型分组
  getElementTypeGroups(moduleName) {
    return this[this.formatterModule(moduleName)] || [];
  }

  // 获取特定元素类型
  getElementType(typeId) {
    const matchedTypes = this.allElementTypes.filter(function (elementType) {
      return elementType.tid == typeId;
    });
    if (matchedTypes.length > 0) return matchedTypes[0];
  }

  // 更新元素类型
  updateElementType(typeId, updateFunction) {
    const type = this.getElementType(typeId);
    if (updateFunction) {
      const newType = updateFunction(type);
      const idx = this.allElementTypes.findIndex(function (elementType) {
        return elementType.tid == typeId;
      });
      if (idx >= 0) {
        this.allElementTypes.splice(idx, 1, newType);
        return newType;
      }
    }
    return type;
  }

  // 格式化模块名
  formatterModule(moduleName) {
    return moduleName || "_default";
  }
}
export default PrintElementTypeContext;