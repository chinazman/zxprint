import { $ } from "../../hiprint.comm.js";
import PrintConfig from "../01PrintConfig.js";
import BasePrintElement from "../04BasePrintElement.js";
import PrintElementOption from "../03PrintElementOption.js";
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
      const data = this.getData();
      this.css(this.designTarget, data);
    }
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.hline;
  }

  // 创建目标元素
  createTarget(title, data) {
    return $(
      '<div class="hiprint-printElement hiprint-printElement-hline" style="border-top:1px solid;position: absolute;"></div>'
    );
  }

  // 获取可调整大小的显示点
  getReizeableShowPoints() {
    return ["e", "r"];
  }
}

export default HLinePrintElement;
