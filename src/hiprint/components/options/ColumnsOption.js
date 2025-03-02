import {$} from "../../hiprint.comm.js";
import PrintTableCell from "../PrintTableCell.js";
import TableExcelHelper from "../TableExcelHelper.js";


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
    const self = this;
    this.value = value;
    value = value.filter(column => !TableExcelHelper.isFooterRow(column));
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
        `<li  class="hiprint-option-table-selected-item" column-id="${column.id || column.columnId}"> <div class="hi-pretty p-default">
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
        const idx = self.allColumns.findIndex(col => col.field == id || col.id == id);
        if (idx >= 0) {
          self.allColumns[idx]['checked'] = checked;
          checked?self.showColumns(self.getSelectedIdx(id), self.allColumns[idx]) :self.hideColumns(self.getSelectedIdx(id));
        }
        self.submit();
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
          onDrop: function (event, dragElement) {
            const id = dragElement.attributes['column-id'].nodeValue;
            const dragIdx = self.getSelectedIdx(id);
            let thisIdx = self.getSelectedIdx(this.attributes['column-id'].nodeValue);
            if (dragIdx < thisIdx) {
              thisIdx--;
            }
            self.hideColumns(dragIdx);
            const oldColumn = self.allColumns.find(col => col.field == id || col.id == id)
            self.showColumns(thisIdx, oldColumn);

            $(dragElement).insertBefore(this);
            $(this).css("border-top-color", "");
            self.submit();
          }
        });
      }
    }
  }
  //找到位置，这个位置是有勾选的问题，没有勾选不算。
  getSelectedIdx(id) {
    let selIdx = 0; 
    for (let i = 0; i < this.allColumns.length; i++) {
      const col = this.allColumns[i];
      if (col.field == id || col.id == id) {
        break;
      }else if (col.checked) {
        selIdx++; 
      }
    }
    return selIdx;
  }
  //显示列
  showColumns(idx, oldColumn) {
    for (let i = 1; i < this.value.length; i++) {
      let newColumns = [];
      if (idx == 0) {
        const tableColumn = new PrintTableCell(oldColumn);
        tableColumn.checked = true;
        newColumns.push(tableColumn); 
      }
      let colIdx = 0;
      for (let j = 0; j < this.value[i].columns.length; j++) {
        let column = this.value[i].columns[j];
        let colspan = column.colspan || 1;
        //没有选中的列，跳过
        if (!column.checked){
          continue;
        }
        if (colspan > 1 && colIdx < idx && colIdx + colspan > idx) {
          column.colspan = colspan + 1;
          const tableColumn = new PrintTableCell(column);
          tableColumn.checked = column.checked;
          newColumns.push(tableColumn);
        }else{
          const tableColumn = new PrintTableCell(column);
          tableColumn.checked = column.checked;
          newColumns.push(tableColumn);
        }
        if (colspan == 1 && colIdx == idx - 1) {
          const tableColumn = new PrintTableCell(oldColumn);
          tableColumn.checked = true;
          tableColumn.title = "";
          tableColumn.descTitle = "";
          tableColumn.field = "";
          newColumns.push(tableColumn); 
        }
        colIdx = colIdx + colspan;
      }
      this.value[i].columns = newColumns;
    }
  }
  //隐藏列
  hideColumns(idx) {
    for (let i = 1; i < this.value.length; i++) {
      let newColumns = [];
      let colIdx = 0;
      for (let j = 0; j < this.value[i].columns.length; j++) {
        let column = this.value[i].columns[j];
        let colspan = column.colspan || 1;
        //没有选中的列，跳过
        if (!column.checked){
          continue;
        }

        if (colspan == 1 && colIdx == idx) {
          
        }else if (colspan > 1 && colIdx <= idx && colIdx + colspan > idx) {
          column.colspan = colspan - 1;
          const tableColumn = new PrintTableCell(column);
          tableColumn.checked = true;
          newColumns.push(tableColumn);
        }else{
          const tableColumn = new PrintTableCell(column);
          tableColumn.checked = true;
          newColumns.push(tableColumn);
        }
        colIdx = colIdx + colspan;
      }
      this.value[i].columns = newColumns;
    }
  }

  // 构建数据
  buildData() {
    const columns = [];
    if (this.options.columns.filter(column => !TableExcelHelper.isFooterRow(column)).length > 1) {
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