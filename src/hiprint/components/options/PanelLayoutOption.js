import {i18n,$} from "../../hiprint.comm.js";

// 面板布局选项
class PanelLayoutOption {
  constructor() {
    this.name = "panelLayoutOptions";
  }

  createTarget() {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('面板排列')}</div></div>`);
    this.layoutType = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('排列方式')}:</div><select style="width:75%" class="auto-submit"><option value="column" >${i18n.__('纵向')}</option><option value="row" >${i18n.__('横向')}</option></select></div></div>`);
    this.layoutRowGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('垂直间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('垂直间距mm')}" class="auto-submit"></div>`);
    this.layoutColumnGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('水平间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('水平间距mm')}" class="auto-submit"></div>`);
    this.target.append(this.layoutType);
    this.target.append(this.layoutRowGap);
    this.target.append(this.layoutColumnGap);
    return this.target;
  }

  getValue() {
    let opt = {
      layoutType: this.layoutType.find("select").val() || 'column',
      layoutRowGap: parseInt(this.layoutRowGap.find('input').val() || 0),
      layoutColumnGap: parseInt(this.layoutColumnGap.find('input').val() || 0)
    };
    let options = Object.assign({}, this.options, opt);
    return options;
  }

  setValue(value) {
    this.options = value;
    this.layoutType.find("select").val(value.layoutType || 'column');
    this.layoutRowGap.find("input").val(value.layoutRowGap);
    this.layoutColumnGap.find("input").val(value.layoutColumnGap);
  }

  destroy() {
    this.target.remove();
  }
}

export default PanelLayoutOption;