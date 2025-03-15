import {i18n} from "../../hiprint.comm.js";
import TableHeaderFontSizeOption from "./TableHeaderFontSizeOption.js";
// 表尾背景类
class TableFooterFontSizeOption extends TableHeaderFontSizeOption{
    constructor() {
        super();
      this.name = "tableFooterFontSize";
      this.type = "tfoot";
      this.label = i18n.__('表尾字体大小');
    }
  }

  export default TableFooterFontSizeOption;