import {$} from "../../hiprint.comm.js";
import PrintConfig from "../PrintConfig.js";
import BasePrintElement from "../BasePrintElement.js";
import PrintElementOption from "../PrintElementOption.js";
//HTML打印元素
class HtmlPrintElementOption extends PrintElementOption {
  constructor(option) {
    super(option);
  }
}

class HtmlPrintElement extends BasePrintElement {
  constructor(elementType, options) {
    const instance = super(elementType) || this;
    instance.options = new HtmlPrintElementOption(options);
    instance.options.setDefault(
      new HtmlPrintElementOption(
        PrintConfig.instance.html.default
      ).getPrintElementOptionEntity()
    );
    return instance;
  }

  // 从选项更新设计视图
  updateDesignViewFromOptions() {
    if (this.designTarget) {
      const data = this.getData();
      this.css(this.designTarget, data);
      this.updateTargetHtml();
    }
  }

  // 更新目标 HTML
  updateTargetHtml() {
    const formatter = this.getFormatter();
    if (formatter) {
      const htmlContent = formatter(
        this.getData(),
        this.options,
        this._currenttemplateData
      );
      this.designTarget
        .find(".hiprint-printElement-html-content")
        .html(htmlContent);
    }
  }

  // 获取配置选项
  getConfigOptions() {
    return PrintConfig.instance.html;
  }

  // 创建目标元素
  createTarget(title, data) {
    const target = $(
      '<div class="hiprint-printElement hiprint-printElement-html" style="position: absolute;"><div class="hiprint-printElement-html-content" style="height:100%;width:100%"></div></div>'
    );
    const formatter = this.getFormatter();
    if (formatter) {
      const htmlContent = formatter(
        this.getData(),
        this.options,
        this._currenttemplateData
      );
      target.find(".hiprint-printElement-html-content").append(htmlContent);
    } else if (this.options.content) {
      target
        .find(".hiprint-printElement-html-content")
        .append(this.options.content);
    }
    return target;
  }

  // 获取 HTML 内容
  getHtml(paper, templateData, extraParam) {
    return this.getHtml2(paper, templateData, extraParam);
  }
}

export default HtmlPrintElement;