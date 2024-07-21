import {i18n,$} from "../../hiprint.comm.js";

// 数据类型选项
class DataTypeOption {
  constructor() {
    this.name = "dataType";
  }

  createTarget() {
    const self = this;
    this.target = $(`
        <div class="hiprint-option-item-row">
        <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('数据类型')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="hiprint-option-item-datatype">
        <option value="" >${i18n.__('默认')}</option>
        <option value="datetime" >${i18n.__('日期时间')}</option>
        <option value="boolean" >${i18n.__('布尔')}</option>
        </select>
        </div>
    </div>
    <div class="hiprint-option-item ">
        <div class="hiprint-option-item-label ">
        ${i18n.__('格式')}
        </div>
        <div class="hiprint-option-item-field">
        <select  class="auto-submit hiprint-option-item-datatype-select-format">
        <option value="" >${i18n.__('默认')}</option>
        
        </select>
        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">
        </div>
    </div>
        </div>
`);
    $(this.target.find(".hiprint-option-item-datatype")).change(function () {
      const dataType = $(self.target.find(".hiprint-option-item-datatype")).val();
      self.loadFormatSelectByDataType(dataType);
      self.submit(self.getValue());
    });
    return this.target;
  }

  getValue() {
    const dataType = this.target.find(".hiprint-option-item-datatype").val();
    if (dataType) {
      const format = this.target.find(".hiprint-option-item-datatype-format").val();
      return {
        dataType: dataType,
        format: format || undefined
      };
    }
    return {
      dataType: undefined,
      format: undefined
    };
  }

  setValue(options, value) {
    this.target.find(".hiprint-option-item-datatype").val(value.dataType || "");
    this.loadFormatSelectByDataType(value.dataType);
    this.target.find(".hiprint-option-item-datatype-format").val(value.format || "");
  }

  destroy() {
    this.target.remove();
  }

  // 根据数据类型加载格式选择
  loadFormatSelectByDataType(dataType) {
    if (dataType === "boolean") {
      this.target.find(".hiprint-option-item-datatype-select-format").removeClass("hiprint-option-item-datatype-format").hide().val("");
      this.target.find(".hiprint-option-item-datatype-input-format").addClass("hiprint-option-item-datatype-format").show();
    } else if (dataType === "datetime") {
      this.target.find(".hiprint-option-item-datatype-select-format").addClass("hiprint-option-item-datatype-format").show();
      this.target.find(".hiprint-option-item-datatype-input-format").removeClass("hiprint-option-item-datatype-format").hide().val("");
      this.target.find(".hiprint-option-item-datatype-select-format").html(`
            <option value="" >${i18n.__('默认')}</option>
            <option value="M/d" >M/d</option>
            <option value="MM/dd" >MM/dd</option>
            <option value="yy/M/d" >yy/M/d</option>
            <option value="yy/MM/dd" >yy/MM/dd</option>
            <option value="yyyy/M/d" >yyyy/M/d</option>
            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>
            <option value="yy/M/d H:m" >yy/M/d H:m</option>
            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>
            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>
            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>
            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>
            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>
            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>
            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>
            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>
            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>
            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>
            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>
            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>
            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>
            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>
            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>

            <option value="M-d" >M-d</option>
            <option value="MM-dd" >MM-dd</option>
            <option value="yy-M-d" >yy-M-d</option>
            <option value="yy-MM-dd" >yy-MM-dd</option>
            <option value="yyyy-M-d" >yyyy-M-d</option>
            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>
            <option value="yy-M-d H:m" >yy-M-d H:m</option>
            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>
            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>
            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>
            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>
            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>
            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>
            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>
            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>
            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>
            <option value="yyyy-M-d HH:mm" >yyyy-M-d HH:mm</option>
            <option value="yyyy-M-d HH:mm:ss" >yyyy-M-d HH:mm:ss</option>
            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>
            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>
            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>
            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>
`);
    } else {
      this.target.find(".hiprint-option-item-datatype-select-format").show();
      this.target.find(".hiprint-option-item-datatype-input-format").hide().val("");
      this.target.find(".hiprint-option-item-datatype-format").html(`
            <option value="" >${i18n.__('默认')}</option>
`);
    }
  }
}

export default DataTypeOption;