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
        <input type="text" placeholder="${i18n.__('请输入图片地址')}" class="auto-submit" style="width:70%">
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
                panel.addBgImage(data);
            })
            .catch((error) => {
                console.error('图片压缩失败:', error);
            });
            // const reader = new FileReader();
            // reader.onload = function(e) {
            //     const panel = self.el.editingPanel;
            //     const data = {
            //         "filename": file.name,
            //         "x": 0,
            //         "y": 0,
            //         "width": hinnn.mm.toPt(panel.width),
            //         "height": hinnn.mm.toPt(panel.height),
            //         "src": e.target.result
            //     }

            //     self.setValue(data);
            //     self.refresh(data);

            //     // self.refresh(e.target.result);
            // };
            // reader.readAsDataURL(file); // 读取文件内容并转换成Base64编码
        }
        })
        // this.target.find('button').click(() => {
        //     const panel = printTemplate.editingPanel;
        //     const elementType = PrintElementTypeFactory.createPrintElementType({
        //         "title": "BgImage",
        //         "type": "image"
        //     });
        //     const bgElement = elementType.createPrintElement({
        //         "x": 0,
        //         "y": 0,
        //         "width": hinnn.mm.toPt(panel.width),
        //         "height": hinnn.mm.toPt(panel.height),
        //         "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAIIAQMAAAB99EudAAAABlBMVEUmf8vG2O41LStnAAABD0lEQVR42u3XQQqCQBSAYcWFS4/QUTpaHa2jdISWLUJjjMpclJoPGvq+1WsYfiJCZ4oCAAAAAAAAAAAAAAAAAHin6pL9c6H/fOzHbRrP0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0u/SY9LS0tLS0tLS0tLS0n+edm+UlpaWlpaWlpaWlpaW/tl0Ndyzbno7/+tPTJdd1wal69dNa6abx+Lq6TSeYtK7BX/Diek0XULSZZrakPRtV0i6Hu/KIt30q4fM0pvBqvR9mvsQkZaW9gyJT+f5lsnzjR54xAk8mAUeJyMPwYFH98ALx5Jr0kRLLndT7b64UX9QR/0eAAAAAAAAAAAAAAAAAAD/4gpryzr/bja4QgAAAABJRU5ErkJggg=="
        //     });
        //     bgElement.setTemplateId(panel.templateId);
        //     bgElement.setPanel(panel);
        //     panel.printElements.unshift(bgElement);
        //     panel.appendDesignPrintElement(panel.designPaper, bgElement);
        //     bgElement.design(null, panel.designPaper);
        //     bgElement.designTarget.prependTo(bgElement.designTarget.parent());
        // });
    }
    return this.target;
  }

  getValue() {
    const value = this.target.find("input[type=text]").data("value");
    if (value){
      value.filename = this.target.find("input[type=text]").val();
      return value;
    }
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