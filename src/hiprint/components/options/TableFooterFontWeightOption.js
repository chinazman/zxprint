import {i18n} from "../../hiprint.comm.js";
import TableHeaderFontWeightOption from "./TableHeaderFontWeightOption.js";
// 表尾背景类
class TableFooterFontWeightOption extends TableHeaderFontWeightOption{
    constructor() {
        super();
      this.name = "tableFooterFontWeight";
      this.type = "tfoot";
      this.label = i18n.__('表尾字体粗细');
    }
  }

  export default TableFooterFontWeightOption;