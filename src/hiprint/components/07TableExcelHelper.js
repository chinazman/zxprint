"use strict";

/**
 * 导入相关资源
 */
import { i18n, $ } from "../hiprint.comm.js";
// 条形码
import JsBarcode from "jsbarcode";
import ReconsitutionTableColumns from "./19ReconsitutionTableColumns";
import hinnn from "./00hinnn.js";

/**
 * 表格Excel辅助类
 */
class TableExcelHelper {
  constructor() {}

  /**
   * 创建表格头部
   */
  static createTableHead(columns, tableWidth) {
    const reconstitutedColumns = TableExcelHelper.reconsitutionTableColumnTree(columns);
    const thead = $("<thead></thead>");
    let colgroup = $("<colgroup></colgroup>");
    const columnsWidth = TableExcelHelper.getColumnsWidth(reconstitutedColumns, tableWidth);
    
    const createRow = (layerIndex) => {
      const row = $("<tr></tr>");
      // 重置 colgroup，解决多行表头 col 添加错误问题，仅以最后一行添加
      colgroup = $("<colgroup></colgroup>");
      reconstitutedColumns[layerIndex].filter(column => column.checked).forEach(column => {
        const cell = $("<td></td>");
        column.id && cell.attr("id", column.id);
        column.columnId && cell.attr("column-id", column.columnId);
        (column.align || column.halign) && cell.css("text-align", column.halign || column.align);
        column.vAlign && cell.css("vertical-align", column.vAlign);
        column.colspan > 1 && cell.attr("colspan", column.colspan);
        column.rowspan > 1 && cell.attr("rowspan", column.rowspan);
        cell.html(column.title);
        if (columnsWidth[column.id]) {
          column.hasWidth = true;
          column.targetWidth = columnsWidth[column.id];
          cell.attr("haswidth", "haswidth");
          cell.css("width", columnsWidth[column.id] + "pt");
        } else {
          column.hasWidth = false;
        }
        const headerStyler = TableExcelHelper.getHeaderStyler(column);
        if (headerStyler) {
          const style = headerStyler(column);
          if (style) {
            Object.keys(style).forEach(key => {
              cell.css(key, style[key]);
            });
          }
        }
        row.append(cell);
        colgroup.append(`<col column-id="${column.columnId}" width="${column.width}pt"></col>`);
      });
      thead.append(row);
    };

    for (let layerIndex = 0; layerIndex < reconstitutedColumns.totalLayer; layerIndex++) {
      createRow(layerIndex);
    }

    TableExcelHelper.syncTargetWidthToOption(columns);
    return [thead, colgroup];
  }

  /**
   * 创建表格页脚
   */
  static createTableFooter(tableData,allData, options, printData,  index, groupData) {
    const tfoot = $("<tfoot></tfoot>");
    const footerFormatter = this.getFooterFormatter(options, printData);
    const tableSummaryTitle = this.tableSummaryTitle;
    const summaryData = options.tableFooterRepeat === "last" ? allData : groupData;
    const lastIndex = options.columns.length - 1;
    const rowColumns = this.rowColumns || options.columns[lastIndex].columns;

    if (options.tableFooterRepeat !== 'no' && rowColumns.some(column => column.tableSummary)) {
      const tableFooter = $("<tr></tr>");
      rowColumns.filter(column => column.checked).forEach(column => {
        const fieldData = summaryData.filter(row => row && row[column.field])
          .map(row => new RegExp("^-?(0|[1-9]\\d*)(\\.\\d+)?").test(row[column.field]) ? Number(row[column.field]) : 0);
        const text = column.tableSummaryText;
        const numF = column.tableSummaryNumFormat || 2;
        const style = `text-align: ${column.tableSummaryAlign || "center"}`;
        const colspan = column.tableSummaryColspan === undefined ? 1 : column.tableSummaryColspan;
        const upperCaseType = column.upperCase;
        const { toUpperCase, numFormat } = hinnn;
        const tableSummaryFormatter = TableExcelHelper.getColumnTableSummaryFormatter(column);
        const formatterResult = tableSummaryFormatter ? tableSummaryFormatter(column, fieldData, allData, options) : '';
        
        if (formatterResult) {
          tableFooter.append(formatterResult);
          return;
        }

        switch (column.tableSummary) {
          case "count":
            const countTitle = tableSummaryTitle(column, text || `${i18n.__('计数')}:`, index);
            const count = toUpperCase(upperCaseType, summaryData.filter(row => row).length || 0);
            tableFooter.append(`<td style="${style}" colspan="${colspan}">${countTitle}${count}</td>`);
            break;
          case "sum":
            const sum = parseFloat(Number(fieldData.reduce((prev, cur) => prev + cur, 0)));
            const sumFormatted = toUpperCase(upperCaseType, numFormat(sum, numF));
            const sumTitle = tableSummaryTitle(column, text || `${i18n.__('合计')}:`, index);
            tableFooter.append(`<td style="${style}" colspan="${colspan}">${sumTitle}${sumFormatted}</td>`);
            break;
          case "avg":
            const avgSum = parseFloat(Number(fieldData.reduce((prev, cur) => prev + cur, 0)));
            const avg = parseFloat(Number(avgSum / (fieldData.length || 1)));
            const avgFormatted = toUpperCase(upperCaseType, numFormat(avg, numF));
            const avgTitle = tableSummaryTitle(column, text || `${i18n.__('平均值')}:`, index);
            tableFooter.append(`<td style="${style}" colspan="${colspan}">${avgTitle}${avgFormatted}</td>`);
            break;
          case "min":
            let min = Math.min(...fieldData) || 0;
            min = min === Infinity ? 0 : min;
            const minFormatted = toUpperCase(upperCaseType, numFormat(min, numF));
            const minTitle = tableSummaryTitle(column, text || `${i18n.__('最小值')}:`, index);
            tableFooter.append(`<td style="${style}" colspan="${colspan}">${minTitle}${minFormatted || 0}</td>`);
            break;
          case "max":
            let max = Math.max(...fieldData);
            max = max === -Infinity ? 0 : max;
            const maxFormatted = toUpperCase(upperCaseType, numFormat(max, numF));
            const maxTitle = tableSummaryTitle(column, text || `${i18n.__('最大值')}:`, index);
            tableFooter.append(`<td style="${style}" colspan="${colspan}">${maxTitle}${maxFormatted || 0}</td>`);
            break;
          case "text":
            tableFooter.append(`<td style="${style}" colspan="${colspan}">${text || ""}</td>`);
            break;
          default:
            if (colspan >= 1) {
              tableFooter.append(`<td style="${style}" colspan="${colspan}">${text || ""}</td>`);
            }
            break;
        }
      });
      tfoot.append(tableFooter);
    }

    if (footerFormatter) {
      tfoot.append(footerFormatter(options, allData, index, groupData));
    }

    return tfoot;
  }

  /**
   * 表格汇总标题
   */
  static tableSummaryTitle(column, title, data) {
    const showTitle = column.tableSummaryTitle === undefined || column.tableSummaryTitle === true;
    return showTitle ? `${title}` : data ? `` : `<span style="color:firebrick">${title}</span>`;
  }

  /**
   * 创建表格行
   */
  static createTableRow(columns, data, printData, options, tablePrintElementType) {
    const reconstitutedColumns = TableExcelHelper.reconsitutionTableColumnTree(columns);
    const tbody = $("<tbody></tbody>");
    const groupFieldsFormatter = this.getGroupFieldsFormatter(options, tablePrintElementType);
    const groupFields = groupFieldsFormatter ? options.groupFields = groupFieldsFormatter(tablePrintElementType, options, data) : tablePrintElementType.groupFields ? tablePrintElementType.groupFields : [];

    if (!data) {
      data = [];
    }

    if (groupFields.length) {
      hinnn.groupBy(data, groupFields, item => {
        const groupKey = {};
        groupFields.forEach(field => groupKey[field] = item[field]);
        return groupKey;
      }).forEach(group => {
        const groupFormatter = this.getGroupFormatter(options, tablePrintElementType);
        if (groupFormatter) {
          const result = groupFormatter(reconstitutedColumns.colspan, data, printData, group, options);
          if ($(result).is("tr")) {
            tbody.append(result);
          } else if ($(result).is("td")) {
            tbody.append(`<tr>${result}</tr>`);
          } else {
            tbody.append(`<tr><td>${result}</td></tr>`);
          }
        }

        const groupFooterFormatter = this.getGroupFooterFormatter(options, tablePrintElementType);
        group.rows.forEach((rowData, rowIndex) => {
          const row = TableExcelHelper.createRowTarget(reconstitutedColumns, rowData, options, tablePrintElementType, rowIndex, group.rows, printData);
          tbody.append(row);
        });

        if (groupFooterFormatter) {
          const result = groupFooterFormatter(reconstitutedColumns.colspan, data, printData, group, options);
          if ($(result).is("tr")) {
            tbody.append(result);
          } else if ($(result).is("td")) {
            tbody.append(`<tr>${result}</tr>`);
          } else {
            tbody.append(`<tr><td>${result}</td></tr>`);
          }
        }
      });
    } else {
      data.forEach((rowData, rowIndex) => {
        const row = TableExcelHelper.createRowTarget(reconstitutedColumns, rowData, options, tablePrintElementType, rowIndex, data, printData);
        tbody.append(row);
      });
    }

    return tbody;
  }

  /**
   * 创建行目标
   */
  static createRowTarget(reconstitutedColumns, rowData, options, tablePrintElementType, rowIndex, tableData, printData) {
    const row = $("<tr></tr>");
    const columns = reconstitutedColumns.rowColumns.filter(column => column.checked);
    row.data("rowData", rowData);

    reconstitutedColumns.rowColumns.filter(column => column.checked).forEach((column, columnIndex) => {
      if (!column.checked) return;

      let rowsColumnsMerge = '';
      let cell;

      if (options.rowsColumnsMerge) {
        eval('rowsColumnsMerge=' + options.rowsColumnsMerge);
        const rowsColumnsArr = rowsColumnsMerge(rowData, column, columnIndex, rowIndex, tableData, printData) || [1, 1];
        cell = $(`<td style='display:${!(rowsColumnsArr[0] && rowsColumnsArr[1]) ? "none" : ""}' rowspan='${rowsColumnsArr[0]}' colspan='${rowsColumnsArr[1]}'></td>`);
      } else {
        cell = $("<td></td>");
      }

      // 设计时不去计算宽度
      if (rowData && Object.keys(rowData).length > 0 && (options.tableHeaderRepeat === "first" || options.tableHeaderRepeat === "none")) {
        column.field && cell.attr("field", column.field);
        column.align && cell.css("text-align", column.align);
        column.vAlign && cell.css("vertical-align", column.vAlign);

        // 无表头时跨行无效，需根据所跨行数重新计算宽度
        if (options.rowsColumnsMerge) {
          if (rowsColumnsArr[1] > 1) {
            let width = 0;
            columns.forEach((item, index) => {
              if (index >= columnIndex && index < columnIndex + rowsColumnsArr[1]) {
                width += item.width;
              }
            });
            cell.css("width", width + "pt");
          } else {
            cell.css("width", column.width + "pt");
          }
        } else {
          cell.css("width", column.width + "pt");
        }
      } else {
        column.field && cell.attr("field", column.field);
        column.align && cell.css("text-align", column.align);
        column.vAlign && cell.css("vertical-align", column.vAlign);
      }

      const formatter = TableExcelHelper.getColumnFormatter(column);
      const formattedValue = formatter ? formatter(rowData[column.field], rowData, columnIndex, options) : rowData[column.field];

      const renderFormatter = TableExcelHelper.getColumnRenderFormatter(column);
      if (renderFormatter) {
        cell.html(renderFormatter(rowData[column.field], rowData, columnIndex, options, rowIndex));
      } else if (column.tableTextType === "text" || column.tableTextType === undefined) {
        cell.html(formattedValue);
      } else {
        if (column.tableTextType === "barcode") {
          cell.html('<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg><div class="hibarcode_displayValue"></div>');
          try {
            if (formattedValue) {
              JsBarcode(cell.find(".hibarcode_imgcode")[0], formattedValue, {
                format: column.tableBarcodeMode || "CODE128A",
                width: 1,
                textMargin: -1,
                lineColor: "#000000",
                margin: 0,
                height: parseInt(10),
                displayValue: false
              });
              cell.find(".hibarcode_imgcode").attr("height", (column.tableColumnHeight || 30) + 'pt');
              cell.find(".hibarcode_imgcode").css("margin", '5pt 10pt');
              cell.find(".hibarcode_imgcode").attr("width", "calc(100% - 20pt)");
              if (column.showCodeTitle) {
                cell.find('.hibarcode_displayValue').html(formattedValue);
              }
            } else {
              cell.html("");
            }
          } catch (error) {
            console.log(error);
            cell.html(`${i18n.__('此格式不支持该文本')}`);
          }
        }

        if (column.tableTextType === "image") {
          cell.html('');
          if (formattedValue) {
            const imagebox = $('<div><img style="max-width:100%;max-height:100%"/></div>');
            imagebox.find('img').attr('src', formattedValue);
            console.log(imagebox.find('img').css('width'));
            cell.html(imagebox);
          }
        }

        if (column.tableTextType === "qrcode") {
          cell.html("");
          try {
            if (formattedValue) {
              const qrcodebox = $('<div style="margin:2pt 0pt" class="hiqrcode_imgcode"></div>');
              const width = parseInt(column.width || column.targetWidth || 20);
              const height = parseInt(column.tableColumnHeight || 20);
              qrcodebox.css('height', (width > height ? height : width) + 'pt');
              new QRCode(qrcodebox[0], {
                width: width > height ? height : width,
                height: width > height ? height : width,
                colorDark: "#000000",
                useSVG: true,
                correctLevel: column.tableQRCodeLevel || 0
              }).makeCode(formattedValue);
              cell.html(qrcodebox);
              if (column.showCodeTitle) {
                cell.append('<div class="hiqrcode_displayValue"></div>');
                cell.find('.hiqrcode_displayValue').html(formattedValue);
              }
            }
          } catch (error) {
            console.log(error);
            cell.html(`${i18n.__('二维码生成失败')}`);
          }
        }

        if (column.tableTextType === 'sequence') {
          cell.html(rowIndex + 1);
        }
      }

      const styler = TableExcelHelper.getColumnStyler(column);
      if (styler) {
        const style = styler(rowData[column.field], rowData, columnIndex, options);
        if (style) {
          Object.keys(style).forEach(key => {
            cell.css(key, style[key]);
          });
        }
      }

      row.append(cell);
    });

    const rowStyler = TableExcelHelper.getRowStyler(options, tablePrintElementType);
    if (rowStyler) {
      const style = rowStyler(rowData, options);
      if (style) {
        Object.keys(style).forEach(key => {
          row.css(key, style[key]);
        });
      }
    }

    return row;
  }

  /**
   * 创建空行目标
   */
  static createEmptyRowTarget(options, tableElement) {
    const reconstitutedColumns = TableExcelHelper.reconsitutionTableColumnTree(options);
    const row = $("<tr></tr>");

    reconstitutedColumns.rowColumns.filter(column => column.checked).forEach((column, columnIndex) => {
      const cell = $("<td></td>");
      column.field && cell.attr("field", column.field);
      column.align && cell.css("text-align", column.align);
      column.vAlign && cell.css("vertical-align", column.vAlign);
      row.append(cell);
    });

    if (tableElement && tableElement.options.tableBodyRowHeight) {
      row.find('td:not([rowspan])').css('height', tableElement.options.tableBodyRowHeight + 'pt');
    }

    return row;
  }

  /**
   * 获取列宽度
   */
  static getColumnsWidth(reconstitutedColumns, tableWidth) {
    const columnsWidth = {};
    const allAutoWidth = TableExcelHelper.allAutoWidth(reconstitutedColumns);
    const allFixedWidth = TableExcelHelper.allFixedWidth(reconstitutedColumns);

    reconstitutedColumns.rowColumns.filter(column => column.checked).forEach(column => {
      if (column.fixed) {
        columnsWidth[column.id] = column.width;
      } else {
        const remainingWidth = tableWidth - allFixedWidth;
        const columnWidth = column.width / allAutoWidth * (remainingWidth > 0 ? remainingWidth : 0);
        columnsWidth[column.id] = columnWidth;
      }
    });

    return columnsWidth;
  }

  /**
   * 调整表格单元格宽度
   */
  static resizeTableCellWidth(table, options, tableWidth) {
    const reconstitutedColumns = TableExcelHelper.reconsitutionTableColumnTree(options);
    const columnsWidth = TableExcelHelper.getColumnsWidth(reconstitutedColumns, tableWidth);

    table.find("thead tr td[haswidth]").map((index, element) => {
      const id = $(element).attr("id");
      const width = columnsWidth[id];
      $(element).css("width", width + "pt");
    });
  }

  /**
   * 获取所有自动宽度
   */
  static allAutoWidth(reconstitutedColumns) {
    let totalWidth = 0;
    const widthMap = {};

    reconstitutedColumns.rowColumns.filter(column => column.checked).forEach(column => {
      widthMap[column.id] = widthMap[column.id] ? 0 : column.width;
      totalWidth += column.fixed ? 0 : widthMap[column.id];
    });

    return totalWidth;
  }

  /**
   * 获取所有固定宽度
   */
  static allFixedWidth(reconstitutedColumns) {
    let totalWidth = 0;
    const widthMap = {};

    reconstitutedColumns.rowColumns.filter(column => column.checked).forEach(column => {
      widthMap[column.id] = widthMap[column.id] ? 0 : column.width;
      totalWidth += column.fixed ? widthMap[column.id] : 0;
    });

    return totalWidth;
  }

  /**
   * 重构表格列树
   */
  static reconsitutionTableColumnTree(columns, reconstitutedColumns, parent) {
    const result = reconstitutedColumns || new ReconsitutionTableColumns();
    result.colspan = 0;

    for (let layerIndex = 0; layerIndex < columns.length; layerIndex++) {
      result.totalLayer = layerIndex + 1;
      result[layerIndex] = columns[layerIndex].columns;
      if (layerIndex === 0) {
        columns[layerIndex].columns.forEach(column => {
          result.colspan += column.colspan;
        });
      }
    }

    result.rowColumns = TableExcelHelper.getOrderdColumns(result);
    return result;
  }

  /**
   * 同步目标宽度到选项
   */
  static syncTargetWidthToOption(columns) {
    columns.forEach(layer => {
      layer.columns.forEach(column => {
        if (column.hasWidth) {
          column.width = column.targetWidth;
        }
      });
    });
  }

  /**
   * 获取分组字段格式化器
   */
  static getGroupFieldsFormatter(options, tablePrintElementType) {
    let groupFieldsFormatter;

    if (tablePrintElementType.groupFields && tablePrintElementType.groupFields.length) {
      const arr = typeof tablePrintElementType.groupFields === "string" ? tablePrintElementType.groupFields : JSON.stringify(tablePrintElementType.groupFields);
      options.groupFieldsFormatter = `function(type,options,data){ return ${arr} }`;
    }

    if (tablePrintElementType.groupFieldsFormatter) {
      groupFieldsFormatter = tablePrintElementType.groupFieldsFormatter;
    }

    if (options.groupFieldsFormatter) {
      try {
        eval(`groupFieldsFormatter=${options.groupFieldsFormatter}`);
      } catch (error) {
        console.log(error);
      }
    }

    return groupFieldsFormatter;
  }

  /**
   * 获取分组格式化器
   */
  static getGroupFormatter(options, tablePrintElementType) {
    let groupFormatter;

    if (tablePrintElementType.groupFormatter) {
      groupFormatter = tablePrintElementType.groupFormatter;
    }

    if (options.groupFormatter) {
      try {
        eval(`groupFormatter=${options.groupFormatter}`);
      } catch (error) {
        console.log(error);
      }
    }

    return groupFormatter;
  }

  /**
   * 获取分组页脚格式化器
   */
  static getGroupFooterFormatter(options, tablePrintElementType) {
    let groupFooterFormatter;

    if (tablePrintElementType.groupFooterFormatter) {
      groupFooterFormatter = tablePrintElementType.groupFooterFormatter;
    }

    if (options.groupFooterFormatter) {
      try {
        eval(`groupFooterFormatter=${options.groupFooterFormatter}`);
      } catch (error) {
        console.log(error);
      }
    }

    return groupFooterFormatter;
  }

  /**
   * 获取页脚格式化器
   */
  static getFooterFormatter(options, tablePrintElementType) {
    let footerFormatter;

    if (tablePrintElementType.footerFormatter) {
      footerFormatter = tablePrintElementType.footerFormatter;
    }

    if (options.footerFormatter) {
      try {
        eval(`footerFormatter=${options.footerFormatter}`);
      } catch (error) {
        console.log(error);
      }
    }

    return footerFormatter;
  }

  /**
   * 获取行样式器
   */
  static getRowStyler(options, tablePrintElementType) {
    let rowStyler;

    if (tablePrintElementType.rowStyler) {
      rowStyler = tablePrintElementType.rowStyler;
    }

    if (options.rowStyler) {
      try {
        eval(`rowStyler=${options.rowStyler}`);
      } catch (error) {
        console.log(error);
      }
    }

    return rowStyler;
  }

  /**
   * 获取列表格汇总格式化器
   */
  static getColumnTableSummaryFormatter(column) {
    let tableSummaryFormatter;

    if (column.tableSummaryFormatter) {
      tableSummaryFormatter = column.tableSummaryFormatter;
    }

    if (column.tableSummaryFormatter) {
      try {
        eval(`tableSummaryFormatter=${column.tableSummaryFormatter}`);
      } catch (error) {
        console.log(error);
      }
    }

    return tableSummaryFormatter;
  }

  /**
   * 获取列样式器
   */
  static getColumnStyler(column) {
    let styler;

    if (column.styler) {
      styler = column.styler;
    }

    if (column.styler2) {
      try {
        eval(`styler=${column.styler2}`);
      } catch (error) {
        console.log(error);
      }
    }

    return styler;
  }

  /**
   * 获取表头样式器
   */
  static getHeaderStyler(column) {
    let stylerHeader;

    if (column.stylerHeader) {
      stylerHeader = column.stylerHeader;
    }

    if (column.stylerHeader) {
      try {
        eval(`stylerHeader=${column.stylerHeader}`);
      } catch (error) {
        console.log(error);
      }
    }

    return stylerHeader;
  }

  /**
   * 获取列渲染格式化器
   */
  static getColumnRenderFormatter(column) {
    let renderFormatter;

    if (column.renderFormatter) {
      renderFormatter = column.renderFormatter;
    }

    if (column.renderFormatter) {
      try {
        eval(`renderFormatter=${column.renderFormatter}`);
      } catch (error) {
        console.log(error);
      }
    }

    return renderFormatter;
  }

  /**
   * 获取列格式化器
   */
  static getColumnFormatter(column) {
    let formatter;

    if (column.formatter) {
      formatter = column.formatter;
    }

    if (column.formatter2) {
      try {
        eval(`formatter=${column.formatter2}`);
      } catch (error) {
        console.log(error);
      }
    }

    return formatter;
  }

  /**
   * 获取有序列
   */
  static getOrderdColumns(reconstitutedColumns) {
    // 新数据
    const newColumns = {};
    // 遍历所有 rawData columns，先处理 colspan 防止后面 rowspan 插入取下标错误
    for (let layerIndex = 0; layerIndex < reconstitutedColumns.totalLayer; layerIndex++) {
      newColumns[layerIndex] = []; // 新数据中添加对应 columns
      reconstitutedColumns[layerIndex].forEach(column => {
        newColumns[layerIndex].push(...new Array(column.colspan).fill({ ...column, colspan: 1 })); // 创建 colspan 个
      });
    }
    // 再次遍历 rawData columns，处理 rowspan 给后面 columns 插入相同 column
    for (let layerIndex = 0; layerIndex < reconstitutedColumns.totalLayer; layerIndex++) {
      newColumns[layerIndex].forEach((column, columnIndex) => {
        for (let rowspanIndex = 1; rowspanIndex < column.rowspan; rowspanIndex++) {
          newColumns[layerIndex + rowspanIndex].splice(columnIndex, 0, { ...column, rowspan: 1 });
        }
      });
    }
    // 把上层/其他层的 field 赋值给最下层
    const lastColumns = [];
    for (let layerIndex = 0; layerIndex < reconstitutedColumns.totalLayer; layerIndex++) {
      if (layerIndex >= reconstitutedColumns.totalLayer - 1) {
        newColumns[layerIndex].forEach((column, columnIndex) => {
          if (!column.field) {
            column.field = lastColumns[columnIndex];
          }
        });
      } else {
        newColumns[layerIndex].forEach((column, columnIndex) => {
          if (layerIndex === 0) {
            lastColumns.push(column.field || "");
          } else {
            column.field && (lastColumns[columnIndex] = column.field);
          }
        });
      }
    }
    this.rowColumns = newColumns[reconstitutedColumns.totalLayer - 1];
    return newColumns[reconstitutedColumns.totalLayer - 1];
  }
}

export default TableExcelHelper;