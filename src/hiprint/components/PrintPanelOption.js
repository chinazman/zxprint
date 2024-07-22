import hinnn from "./hinnn.js";
import PrintLib from "./PrintLib.js"

// 打印面板选项
class PrintPanelOption {
  constructor(options) {
    this.index = options.index;
    this.name = options.name;
    this.paperType = options.paperType;

    if (this.paperType) {
      const paperSize = PrintLib.instance[this.paperType];
      if (options.height) {
        this.height = options.height;
        this.width = options.width;
      } else {
        this.height = paperSize.height;
        this.width = paperSize.width;
      }
    } else {
      this.height = options.height;
      this.width = options.width;
    }

    this.paperHeader = options.paperHeader || 0;
    this.paperFooter = options.paperFooter || hinnn.mm.toPt(this.height);
    this.printElements = options.printElements || [];
    this.paperNumberLeft = options.paperNumberLeft;
    this.paperNumberTop = options.paperNumberTop;
    this.paperNumberDisabled = options.paperNumberDisabled;
    this.paperNumberContinue = options.paperNumberContinue;
    this.paperNumberFormat = options.paperNumberFormat;
    this.panelPaperRule = options.panelPaperRule;
    this.panelPageRule = options.panelPageRule;
    this.rotate = options.rotate || undefined;
    this.firstPaperFooter = options.firstPaperFooter;
    this.evenPaperFooter = options.evenPaperFooter;
    this.oddPaperFooter = options.oddPaperFooter;
    this.lastPaperFooter = options.lastPaperFooter;
    this.topOffset = options.topOffset;
    this.fontFamily = options.fontFamily;
    this.leftOffset = options.leftOffset;
    this.orient = options.orient;
    this.scale = options.scale;
    this.watermarkOptions = options.watermarkOptions;
    this.panelLayoutOptions = options.panelLayoutOptions;
  }
}

export default PrintPanelOption;