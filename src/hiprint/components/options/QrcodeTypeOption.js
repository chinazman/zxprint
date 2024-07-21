import {i18n,$} from "../../hiprint.comm.js";
// 二维码类型 类定义
class QrcodeTypeOption {
    constructor() {
      // 设置属性名称
      this.name = "qrcodeType";
    }
  
    // 创建目标 UI 组件
    createTarget() {
      // 定义选项数据
      const options = [
        {
          label: `${i18n.__('默认')}(qrcode)`,
          value: ""
        },
        {
          label: "QR Code",
          value: "qrcode"
        },
        {
          label: "Micro QR Code",
          value: "microqrcode"
        },
        {
          label: "Swiss QR Code",
          value: "swissqrcode"
        },
        {
          label: "Rectangular Micro QR Code",
          value: "rectangularmicroqrcode"
        },
        {
          label: "Aztec Code",
          value: "azteccode"
        },
        {
          label: "Aztec Runes",
          value: "aztecrune"
        },
        {
          label: "Compact Aztec Code",
          value: "azteccodecompact"
        },
        {
          label: "Data Matrix",
          value: "datamatrix"
        },
        {
          label: "Data Matrix Rectangular",
          value: "datamatrixrectangular"
        },
        {
          label: "汉信码",
          value: "hanxin"
        },
        {
          label: "GS1 Data Matrix",
          value: "gs1datamatrix"
        },
        {
          label: "GS1 Data Matrix Rectangular",
          value: "gs1datamatrixrectangular"
        },
        {
          label: "GS1 QR Code",
          value: "gs1qrcode"
        },
        {
          label: "HIBC Data Matrix",
          value: "hibcdatamatrix"
        },
        {
          label: "HIBC Data Matrix Rectangular",
          value: "hibcdatamatrixrectangular"
        },
        {
          label: "HIBC MicroPDF417",
          value: "hibcmicropdf417"
        },
        {
          label: "HIBC PDF417",
          value: "hibcpdf417"
        },
        {
          label: "HIBC QR Code",
          value: "hibcqrcode"
        }
      ];
  
      // 创建 UI 组件
      this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__('二维码类型')}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit"></select>
        </div>
      </div>`);
  
      // 将选项添加到下拉框
      const select = this.target.find('select.auto-submit');
      options.forEach(item => {
        select.append(`<option value="${item.value}">${item.label}</option>`);
      });
  
      return this.target;
    }
  
    // 获取当前选择的二维码类型值
    getValue() {
      return this.target.find("select").val() || undefined;
    }
  
    // 设置当前选择的二维码类型值
    setValue(value) {
      this.target.find("select").val(value);
    }
  
    // 销毁 UI 组件
    destroy() {
      this.target.remove();
    }
  }
  
  // 导出 QrcodeTypeOption 类
  export default QrcodeTypeOption;