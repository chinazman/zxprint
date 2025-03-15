import {i18n} from "../../hiprint.comm.js";
import TableHeaderBorderOption from "./TableHeaderBorderOption.js";
// 表尾边框类
class TableFooterBorderOption extends TableHeaderBorderOption{
    constructor() {
      super();
      this.name = "tableFooterBorder";
      this.type = "tfoot";
      this.label = i18n.__('表尾边框');
    }
  }

  export default TableFooterBorderOption;