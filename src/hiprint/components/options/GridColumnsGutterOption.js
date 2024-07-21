import {i18n,$} from "../../hiprint.comm.js";

// 网格列间距选项
class GridColumnsGutterOption {
  constructor() {
    this.name = "gridColumnsGutter";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__('一行多组间隔')}
        </div>
        <div class="hiprint-option-item-field">
        <select class="auto-submit">
        <option value="" >${i18n.__('默认')}</option>
        <option value="1.5" >1.5pt</option>
        <option value="2.25" >2.25pt</option>
        <option value="3" >3pt</option>
        <option value="3.75" >3.75pt</option>
        <option value="4.5" >4.5pt</option>
        <option value="5.25" >5.25pt</option>
        <option value="6" >6pt</option>
        <option value="6.75" >6.75pt</option>
        <option value="7.25" >7.25pt</option>
        <option value="8.5" >8.5pt</option>
        <option value="9" >9pt</option>
        </select>
        </div>
    </div>`);
    return this.target;
  }

  getValue() {
    const selectValue = this.target.find("select").val();
    if (selectValue) return parseFloat(selectValue.toString());
  }

  // 设置CSS样式
  css(container, value) {
    if (container && container.length) {
      if (value) {
        container.find(".table-grid-row").css("margin-left", "-" + value + "pt").css("margin-right", "-" + value + "pt");
        container.find(".tableGridColumnsGutterRow").css("padding-left", value + "pt").css("padding-right", value + "pt");
        return null;
      }
      container.find(".table-grid-row").map(function (index, element) {
        element.style.marginLeft = "";
        element.style.marginRight = "";
      });
      container.find(".tableGridColumnsGutterRow").map(function (index, element) {
        element.style.paddingLeft = "";
        element.style.paddingRight = "";
      });
    }
    return null;
  }

  setValue(value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default GridColumnsGutterOption;