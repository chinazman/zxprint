import { $ } from "../../hiprint.comm.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
//横线打印元素
class HLinePrintElement extends BasePrintElement {
  constructor(elementType, options) {
    const instance = super(elementType) || this;
    instance.options = new PrintElementOption(options);
    instance.options.setDefault(
      new PrintElementOption(
        PrintConfig.instance.hline.default
      ).getPrintElementOptionEntity()
    );
    return instance;
  }

  // 从选项更新设计视图
  updateDesignViewFromOptions() {
    if (this.designTarget) {
      const value = this.getData();
      this.css(this.designTarget, value);
      this.execHiddenExpression(this.designTarget, value);
    }
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.hline;
  }

  // 创建目标元素
  createTarget(title, value) {
    const target = $(
      '<div class="hiprint-printElement hiprint-printElement-hline" style="border-top:1px solid;position: absolute;"></div>'
    );
    this.execHiddenExpression(target, value);
    return target;
  }

  // 获取可调整大小的显示点
  getReizeableShowPoints() {
    return ["e", "r"];
  }
}

export default HLinePrintElement;
