import {i18n} from "../../hiprint.comm.js";
import TableHeaderRowHeightOption from "./TableHeaderRowHeightOption.js";
// 表尾背景类
class TableFooterRowHeightOption extends TableHeaderRowHeightOption{
    constructor() {
        super();
      this.name = "tableFooterRowHeight";
      this.type = "tfoot";
      this.label = i18n.__('表尾字体粗细');
    }
  }

  export default TableFooterRowHeightOption;