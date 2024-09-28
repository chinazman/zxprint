import {i18n,$} from "../../hiprint.comm.js";
import PrintElementTypeFactory from "../PrintElementTypeFactory.js";

// 背景图片选项类
class BgImageOption {
  constructor() {
    this.name = "bgImage";
  }

  createTarget(element) {
    const self = this;
    this.el = element;
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__('背景图片')}
        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <input type="text" placeholder="${i18n.__('请输入图片地址')}"  style="width:70%">
    <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__('选择')}</button> <input type="file" class="hiprint-option-item-file" style="display:none"/>       </div>
    </div>`);

    if (element) {
        this.target.find('button').click(() => {
            this.target.find('.hiprint-option-item-file').click();
          });
        this.target.find('.hiprint-option-item-file').on("change", function () {
        const file = this.files[0];
        if (file) {
            const panel = self.el.editingPanel;
            compressImage(file, hinnn.mm.toPx(panel.width), hinnn.mm.toPx(panel.height), 0.75)
            .then((base64) => {
                const data = {
                    "filename": file.name,
                    "x": 0,
                    "y": 0,
                    "width": hinnn.mm.toPt(panel.width),
                    "height": hinnn.mm.toPt(panel.height),
                    "src": base64
                }

                self.setValue(data);
                // self.refresh(data);
                self.submit();
                panel.addBgImage();
            })
            .catch((error) => {
                console.error('图片压缩失败:', error);
            });
        }
        });
        //class="auto-submit"
        this.target.find('input[type=text]').on("change", function () {
            self.submit();
            self.el.editingPanel.addBgImage();
        });

    }
    return this.target;
  }

  getValue() {
    const data = this.target.find("input[type=text]").data("value");
    const filename = this.target.find("input[type=text]").val();
    if (data && filename){
        data.filename = filename;
      return data;
    }
    return undefined;
  }

  setValue(value) {
    if (value){
        this.target.find("input[type=text]").val(value.filename);
        this.target.find("input[type=text]").data("value", value);
    }
  }

  destroy() {
    this.target.remove();
  }

  refresh(data) {
    const panel = this.el.editingPanel;
    const elementType = PrintElementTypeFactory.createPrintElementType({
        "title": "BgImage",
        "type": "image"
    });
    const bgElement = elementType.createPrintElement({
        "x": 0,
        "y": 0,
        "width": hinnn.mm.toPt(panel.width),
        "height": hinnn.mm.toPt(panel.height),
        "src": data.src
    });
    bgElement.setTemplateId(panel.templateId);
    bgElement.setPanel(panel);
    // panel.printElements.unshift(bgElement);
    panel.appendDesignPrintElement(panel.designPaper, bgElement);
    // bgElement.design(null, panel.designPaper);
    bgElement.designTarget.prependTo(bgElement.designTarget.parent());
  }
}

function compressImage(file, width, height, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
        //   let width = img.width;
        //   let height = img.height;
  
          // 计算压缩后的尺寸
        //   if (width > height) {
        //     if (width > maxWidth) {
        //       height *= maxWidth / width;
        //       width = maxWidth;
        //     }
        //   } else {
        //     if (height > maxHeight) {
        //       width *= maxHeight / height;
        //       height = maxHeight;
        //     }
        //   }
  
          // 使用canvas进行压缩
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          // 将canvas转换为Base64
          const base64 = canvas.toDataURL('image/jpeg', quality);
          resolve(base64);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = e.target.result;
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
export default BgImageOption;