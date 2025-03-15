import {i18n} from "../../hiprint.comm.js";
import TableHeaderBackgroundOption from "./TableHeaderBackgroundOption.js";
// 表尾背景类
class TableFooterBackgroundOption extends TableHeaderBackgroundOption{
    constructor() {
        super();
      this.name = "tableFooterBackground";
      this.type = "tfoot";
      this.label = i18n.__('表尾背景');
    }
  }

  export default TableFooterBackgroundOption;