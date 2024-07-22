import {$} from "../../hiprint.comm.js";
import PrintTableCell from "../PrintTableCell.js";

// 列选项类
class ColumnsOption {
  constructor() {
    this.name = "columns";
  }

  // 创建选项目标元素
  createTarget() {
    $('<div class="indicator"></div>').appendTo("body");
    this.target = $(` <div class="hiprint-option-item hiprint-option-item-row">
       <div>
            <ul class="hiprint-option-table-selected-columns"> </ul>
       </div>
    </div>`);
    return this.target;
  }

  // 获取值
  getValue() {
    return this.buildData();
  }

  // 设置值
  setValue(value, options, printElementType) {
    this.value = value;
    this.options = options;
    this.printElementType = printElementType;

    const unselectedColumns = printElementType.columns[0].filter(column => 
      value[0].columns.filter(selectedColumn => column.columnId == selectedColumn.columnId).length == 0
    ).map(column => {
      const newColumn = new PrintTableCell(column);
      newColumn.checked = false;
      return newColumn;
    });

    this.allColumns = value[0].columns.concat(unselectedColumns);

    if (value && value.length == 1) {
      this.target.find("ul").html(this.allColumns.map((column, index) => 
        `<li  class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">
                ${column.checked ? 
                  `<input type="checkbox"   checked column-id="${column.id || column.columnId}" />` : 
                  `<input type="checkbox"  column-id="${column.id || column.columnId}" />`}
                <div class="state">
                    <label></label>
                </div>
            </div><span class="column-title">${column.title || column.descTitle || ""}</span></li>`
      ).join(""));

      this.target.find("input").change(e => {
        const checked = e.target.checked;
        const id = e.target.attributes['column-id'].nodeValue || '';
        const idx = this.allColumns.findIndex(col => col.field == id || col.id == id);
        if (idx >= 0) {
          this.allColumns[idx]['checked'] = checked;
        }
        this.submit();
      });

      if (this.printElementType.columnDisplayIndexEditable) {
        this.target.find("li").hidraggable({
          revert: true,
          handle: ".column-title",
          moveUnit: "pt",
          deltaX: 0,
          deltaY: 0
        }).hidroppable({
          onDragOver: function (event, dragElement) {
            $(this).css("border-top-color", "red");
          },
          onDragLeave: function (event, dragElement) {
            $(this).css("border-top-color", "");
          },
          onDrop: (event, dragElement) => {
            $(dragElement).insertBefore(this);
            $(this).css("border-top-color", "");
            this.submit();
          }
        });
      }
    }
  }

  // 构建数据
  buildData() {
    const columns = [];
    if (this.options.columns.length > 1) {
      return this.value;
    }
    this.printElementType.makeColumnObj(this.allColumns);
    this.target.find("input").map((index, input) => {
      const columnId = $(input).attr("column-id");
      const column = this.printElementType.getColumnByColumnId(columnId);
      if (column) {
        const tableColumn = new PrintTableCell(column);
        tableColumn.checked = column.checked;
        columns.push(tableColumn);
      }
    });
    this.value[0].columns = columns;
    return this.value;
  }

  // 销毁
  destroy() {
    this.target.remove();
  }
}

export default ColumnsOption;