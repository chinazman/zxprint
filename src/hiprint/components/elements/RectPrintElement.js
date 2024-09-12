import {$} from "../../hiprint.comm.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
//矩形打印元素
class RectPrintElement extends BasePrintElement {
  constructor(elementType, options) {
    const instance = super(elementType) || this;
    instance.options = new PrintElementOption(options);
    instance.options.setDefault(new PrintElementOption(PrintConfig.instance.rect.default).getPrintElementOptionEntity());
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
    return PrintConfig.instance.rect;
  }

  // 创建目标元素
  createTarget(title, value) {
    const target = $('<div class="hiprint-printElement hiprint-printElement-rect" style="border:1px solid;position: absolute;"></div>');
    this.execHiddenExpression(target, value);
    return target;
  }

  // 获取 HTML 内容
  getHtml(paper, templateData, extraParam) {
    return this.getHtml2(paper, templateData, extraParam);
  }
}

export default RectPrintElement;