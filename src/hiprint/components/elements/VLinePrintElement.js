
import {$} from "../../hiprint.comm.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
//竖线打印元素
class VLinePrintElement extends BasePrintElement {
  constructor(elementType, options) {
    const instance = super(elementType) || this;
    instance.options = new PrintElementOption(options);
    instance.options.setDefault(new PrintElementOption(PrintConfig.instance.vline.default).getPrintElementOptionEntity());
    return instance;
  }

  // 从选项更新设计视图
  updateDesignViewFromOptions() {
    if (this.designTarget) {
      const data = this.getData();
      this.css(this.designTarget, data);
      this.execHiddenExpression(this.designTarget, data);
    }
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.vline;
  }

  // 创建目标元素
  createTarget(title, value) {
    const target = $('<div class="hiprint-printElement hiprint-printElement-vline" style="border-left:1px solid;position: absolute;"></div>');
    this.execHiddenExpression(target, value);
    return target;
  }

  // 获取可调整大小的显示点
  getReizeableShowPoints() {
    return ["s", "r"];
  }

  // 获取 HTML 内容
  getHtml(paper, templateData, extraParam) {
    return this.getHtml2(paper, templateData, extraParam);
  }
}

export default VLinePrintElement;