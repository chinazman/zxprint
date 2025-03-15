import {i18n,$} from "../../hiprint.comm.js";
import TableHeaderBorderOption from "./TableHeaderBorderOption.js";
// 表尾单元格边框类
class TableFooterCellBorderOption extends TableHeaderBorderOption{
    constructor() {
      super();
      this.name = "tableFooterCellBorder";
      this.type = "tfoot";
      this.label = i18n.__('表尾单元格边框');
    }
  }

  export default TableFooterCellBorderOption;