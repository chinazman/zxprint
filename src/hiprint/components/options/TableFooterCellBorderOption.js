import {i18n,$} from "../../hiprint.comm.js";
import TableHeaderCellBorderOption from "./TableHeaderCellBorderOption.js";
// 表尾单元格边框类
class TableFooterCellBorderOption extends TableHeaderCellBorderOption{
    constructor() {
      super();
      this.name = "tableFooterCellBorder";
      this.type = "tfoot";
      this.label = i18n.__('表尾单元格边框');
    }
  }

  export default TableFooterCellBorderOption;