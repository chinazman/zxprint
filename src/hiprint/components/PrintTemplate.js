import {i18n,$} from "../hiprint.comm.js";
// pdf
import { jsPDF } from "jspdf";
import html2canvas from "@wtto00/html2canvas";
// 解析svg 到 canvas, 二维码条形码需要
import Canvg from 'canvg';
import hinnn from "./hinnn.js";
import PrintConfig from "./PrintConfig.js";
import PrintLib from "./PrintLib.js";
import PrintElementOptionItemManager from "./PrintElementOptionItemManager.js";
import PrintPanelOption from "./PrintPanelOption.js";
import PrintPanel from "./PrintPanel.js"

//打印面板选项集合
class PanelOptionCollection {
  constructor(panelData) {
    // 如果 panelData 有效且包含 panels 属性
    if (panelData && panelData.panels) {
      this.panels = [];

      // 遍历 panels 数组,创建 PrintPanelOption 对象并添加到 this.panels 数组
      for (let panelIndex = 0; panelIndex < panelData.panels.length; panelIndex++) {
        this.panels.push(new PrintPanelOption(panelData.panels[panelIndex]));
      }
    } else {
      this.panels = [];
    }
  }
}

// 设置容器事件管理器类
class SettingContainerEventManager {
  constructor(printTemplate, settingContainerSelector) {
    this.printElementOptionSettingPanel = {};
    this.printTemplate = printTemplate;
    this.settingContainer = $(settingContainerSelector);

    // 监听打印元素选择事件
    hinnn.event.on(printTemplate.getPrintElementSelectEventKey(), (eventData) => {
      this.buildSetting(eventData);
    });

    // 监听自定义选项设置事件
    hinnn.event.on(printTemplate.getBuildCustomOptionSettingEventKey(), (customOptions) => {
      this.buildSettingByCustomOptions(customOptions);
    });

    // 监听清除设置容器事件
    hinnn.event.on('clearSettingContainer', () => {
      this.clearSettingContainer();
    });
  }

  // 初始化方法
  init() {}

  // 清除设置容器
  clearSettingContainer() {
    this.clearLastPrintElement();
    this.settingContainer.html("");
  }

  // 清除上一个打印元素
  clearLastPrintElement() {
    if (this.lastPrintElement) {
      if (this.lastPrintElement._editing) {
        this.lastPrintElement.updateByContent(true);
      }
      if (this.lastPrintElement._printElementOptionTabs) {
        this.lastPrintElement._printElementOptionTabs.forEach((tab) => {
          tab.list && tab.list.forEach((item) => {
            item.destroy();
          });
        });
      }
      if (this.lastPrintElement._printElementOptionItems) {
        this.lastPrintElement._printElementOptionItems.forEach((item) => {
          item.destroy();
        });
      }
    }
    this.lastPrintElement = undefined;
  }

  // 构建设置面板
  buildSetting(eventData) {
    const self = this;
    const printElement = eventData.printElement;
    const customOptionsInput = eventData.customOptionsInput;
    const tabs = printElement.getPrintElementOptionTabs();

    self.clearSettingContainer();

    let settingContent;
    if (tabs.length) {
      // 创建选项卡结构
      settingContent = $('<div class="prop-tabs"><ul class="prop-tab-items"></ul></div>');
      tabs.forEach((tab) => {
        const tabItem = $('<li class="prop-tab-item"><span class="tab-title">' + i18n.__(tab.name) + '</span></li>');
        settingContent.find('.prop-tab-items').append(tabItem);
        const optionsContainer = $('<div class="hiprint-option-items" data-title="' + i18n.__(tab.name) + '"></div>');
        
        tab.list.forEach((optionItem) => {
          optionItem.submit = (formData) => {
            printElement.submitOption();
          };
          const optionTarget = optionItem.createTarget(printElement, printElement.options, printElement.printElementType);
          self.printElementOptionSettingPanel[optionItem.name] = optionTarget;
          optionsContainer.append(optionTarget);
          
          // 设置选项值
          if (['columns', 'dataType'].includes(optionItem.name)) {
            optionItem.setValue(printElement.options[optionItem.name], printElement.options, printElement.printElementType);
          } else if (['coordinate', 'widthHeight'].includes(optionItem.name)) {
            optionItem.setValue(printElement.options, printElement);
          } else {
            optionItem.setValue(printElement.options[optionItem.name] || printElement.printElementType[optionItem.name]);
          }
          
          optionTarget.find("textarea").bind("dblclick.textarea", function(event) {
            if (!$(this).val()) {
              const placeholder = event.target.placeholder || "";
              $(this).val(placeholder);
            }
          });
        });

        // 处理自定义选项
        if (tab.list.length == 0 && customOptionsInput && customOptionsInput.length) {
          customOptionsInput.forEach((customOption) => {
            const originalCallback = customOption.callback;
            customOption.callback = (data) => {
              originalCallback && originalCallback(data);
            };
            const tableColumn = customOption.optionItems;
            customOption.title && optionsContainer.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + customOption.title + "\n            </div>\n        </div>");
            
            tableColumn.forEach((columnItem) => {
              columnItem.submit = (formData) => {
                customOption.callback(self.getValueByOptionItems(tableColumn));
              };
              optionsContainer.append(columnItem.createTarget(self.printTemplate, customOption.options, undefined));
              columnItem.setValue(customOption.options[columnItem.name], customOption.options, undefined);
            });
            
            optionsContainer.find('.auto-submit').change(function() {
              customOption.callback(self.getValueByOptionItems(tableColumn));
            });
            optionsContainer.find('.auto-submit:input').bind('keydown.submitOption', function(event) {
              if (event.keyCode === 13) {
                customOption.callback(self.getValueByOptionItems(tableColumn));
              }
            });
            optionsContainer.find("textarea").bind("dblclick.textarea", function(event) {
              if (!$(this).val()) {
                const placeholder = event.target.placeholder || "";
                $(this).val(placeholder);
              }
            });
          });
        }
        settingContent.append(optionsContainer);
      });
    } else {
      // 创建单一选项列表
      settingContent = $('<div class="hiprint-option-items"></div>');
      printElement.getPrintElementOptionItems().forEach((optionItem) => {
        optionItem.submit = (formData) => {
          printElement.submitOption();
        };

        const optionTarget = optionItem.createTarget(printElement, printElement.options, printElement.printElementType);
        self.printElementOptionSettingPanel[optionItem.name] = optionTarget;
        settingContent.append(optionTarget);
        
        // 设置选项值
        if (['columns', 'dataType'].includes(optionItem.name)) {
          optionItem.setValue(printElement.options[optionItem.name], printElement.options, printElement.printElementType);
        } else if (['coordinate', 'widthHeight'].includes(optionItem.name)) {
          optionItem.setValue(printElement.options, printElement);
        } else {
          optionItem.setValue(printElement.options[optionItem.name] || printElement.printElementType[optionItem.name]);
        }
      });
    }

    // 添加确定和删除按钮
    const submitButton = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn" type="button">${i18n.__('确定')}</button>`);
    const deleteButton = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-deleteBtn" type="button">${i18n.__('删除')}</button>`);
    settingContent.append(submitButton);
    printElement.options.draggable !== false && settingContent.append(deleteButton);

    // 为选项卡添加点击事件
    if (tabs.length) {
      settingContent.on('click', '.prop-tab-item', function() {
        const $li = $(this);
        const index = $li.index();
        self.settingContainer.data('last-index', index);
        $li.addClass('active');
        $li.siblings().removeClass('active');
        const options = settingContent.find('.hiprint-option-items:eq(' + index + ')');
        options.addClass('active');
        options.siblings().removeClass('active');
      });
      let lastIndex = +(self.settingContainer.data('last-index') || 0);
      if (lastIndex >= tabs.length) {
        lastIndex = 0;
      }
      settingContent.find('.prop-tab-item:eq(' + lastIndex + ')').click();
    }

    // 绑定按钮事件
    submitButton.bind("click.submitOption", () => {
      printElement.submitOption();
    });
    deleteButton.bind("click.deleteBtn", () => {
      hinnn.event.trigger("hiprintTemplateDataChanged_" + printElement.templateId, "删除");
      self.printTemplate.deletePrintElement(printElement);
      self.clearSettingContainer();
    });
    settingContent.find(".auto-submit").change(() => {
      printElement.submitOption();
    });
    settingContent.find(".auto-submit:input").bind("keydown.submitOption", (event) => {
      if (event.keyCode == 13) printElement.submitOption();
    });

    this.settingContainer.append(settingContent);

    // 处理自定义选项
    if (tabs.length < 1 && customOptionsInput) {
      customOptionsInput.forEach((customOption) => {
        const originalCallback = customOption.callback;
        customOption.callback = (data) => {
          originalCallback && (originalCallback(data), printElement.submitOption());
        };
        self.buildSettingByCustomOptions(customOption, self.settingContainer);
      });
    }

    this.lastPrintElement = printElement;
  }

  // 根据自定义选项构建设置
  buildSettingByCustomOptions(customOption, container) {
    const self = this;
    this.clearLastPrintElement();
    const targetContainer = container || this.settingContainer;
    if (!container) this.settingContainer.html("");

    const optionItems = [];
    const supportOptions = PrintConfig.instance.panel.supportOptions.filter((option) => !option.hidden).map((option) => option.name);

    if (customOption.optionItems) {
      optionItems.push(...customOption.optionItems);
    } else {
      Object.keys(customOption.options).filter((key) => supportOptions.includes(key)).forEach((key) => {
        const optionItem = PrintElementOptionItemManager.getItem(key);
        optionItem && optionItems.push(optionItem);
      });
    }

    const optionsContainer = $('<div class="hiprint-option-items"></div>');
    customOption.title && optionsContainer.append('<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' + customOption.title + "\n            </div>\n        </div>");
    
    optionItems.forEach((optionItem) => {
      optionItem.submit = (formData) => {
        customOption.callback(self.getValueByOptionItems(optionItems));
      };
      optionsContainer.append(optionItem.createTarget(self.printTemplate, customOption.options, undefined));
      optionItem.setValue(customOption.options[optionItem.name], customOption.options, undefined);
    });

    const submitButton = $(`<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn" type="button">${i18n.__('确定')}</button>`);
    optionsContainer.append(submitButton);

    submitButton.bind("click.submitOption", () => {
      customOption.callback(self.getValueByOptionItems(optionItems));
    });
    optionsContainer.find(".auto-submit").change(() => {
      customOption.callback(self.getValueByOptionItems(optionItems));
    });
    optionsContainer.find(".auto-submit:input").bind("keydown.submitOption", (event) => {
      if (event.keyCode == 13) customOption.callback(self.getValueByOptionItems(optionItems));
    });

    targetContainer.append(optionsContainer);
  }

  // 获取选项值
  getValueByOptionItems(optionItems) {
    const result = {};
    optionItems.forEach((item) => {
      result[item.name] = item.getValue();
    });
    return result;
  }
}

// 打印分页创建器类
class PrintPaginationCreator {
  constructor(paginationContainer, template) {
    this.paginationContainer = paginationContainer;
    this.jqPaginationContainer = $(this.paginationContainer);
    this.template = template;
  }

  // 构建分页
  buildPagination() {
    const panelTotal = this.template.getPaneltotal();
    const self = this;
    this.jqPaginationContainer.html("");

    const paginationList = $('<ul class="hiprint-pagination"></ul>');

    // 创建面板列表项
    const createPanelItem = (index) => {
      const panelIndex = index;
      const panelName = self.template.printPanels[panelIndex].name || panelIndex + 1;
      const panelItem = $("<li><span>" + panelName + '</span><a href="javascript:void(0);">x</a></li>');

      panelItem.find("span").click(function() {
        self.template.selectPanel(panelIndex);
        panelItem.siblings().removeClass("selected");
        $(this).parent("li").addClass("selected");
      });

      panelItem.find("a").click(function() {
        self.template.deletePanel(panelIndex);
        self.buildPagination();
      });

      paginationList.append(panelItem);
    };

    for (let index = 0; index < panelTotal; index++) {
      createPanelItem(index);
    }

    // 添加新面板按钮
    const addPanelButton = $("<li><span>+</span></li>");
    paginationList.append(addPanelButton);
    this.jqPaginationContainer.append(paginationList);

    addPanelButton.click(function() {
      const createPanel = (options) => {
        self.template.addPrintPanel(options || undefined, true);
        self.buildPagination();
        $('.hiprint-pagination li').removeClass('selected');
        $('.hiprint-pagination li:nth-last-child(2)').addClass('selected');
      };

      if (self.template.onPanelAddClick) {
        const panel = {
          index: self.template.printPanels.length,
          paperType: "A4"
        };
        self.template.onPanelAddClick(panel, createPanel);
      } else {
        createPanel();
      }
    });
  }

  // 选择面板
  selectPanel(idx) {
    const panelIndex = idx || this.template.editingPanel.index;
    const panelItem = $('.hiprint-pagination li:nth(' + panelIndex + ')');
    if (panelItem.length) {
      panelItem.siblings().removeClass('selected');
      panelItem.addClass("selected");
    }
    hinnn.event.trigger("onSelectPanel", this.template.editingPanel, panelIndex, panelItem);
  }
}
//打印模板
class PrintTemplate {
  // 构造函数
  constructor(options) {
    let templateOptions = this;
    this.tempimageBase64 = {};
    this.id = PrintLib.instance.guid();
    PrintLib.instance.setPrintTemplateById(this.id, this);
    
    let initOptions = options || {};
    this.printPanels = [];
    this.dataMode = initOptions.dataMode || 1;
    this.history = initOptions.history !== undefined ? initOptions.history : true;
    this.willOutOfBounds = initOptions.willOutOfBounds !== undefined ? initOptions.willOutOfBounds : true;
    this.onDataChanged = initOptions.onDataChanged;
    this.onUpdateError = initOptions.onUpdateError;
    this.lastJson = initOptions.template || {};
    this.historyList = [{ id: PrintLib.instance.guid(), type: '初始', json: this.lastJson }];
    this.historyPos = 0;
    this.defaultPanelName = initOptions.defaultPanelName;
    this.designOptions = {};
    this.qtDesigner = initOptions.qtDesigner !== undefined ? initOptions.qtDesigner : true;
    this.qtDesignerMap = {};
    this.qtDesignderFunction = function (field) {
      this.qtDesignerMap = {};
      const fieldTitle = field.split("_")[0];
      for (const item of this.editingPanel.printElements) {
        if (item.options.field === undefined) {
          continue;
        }
        const renderKey = item.options.field.split("_")[0];
        if (this.qtDesignerMap[renderKey] === undefined) {
          this.qtDesignerMap[renderKey] = 1;
        } else {
          this.qtDesignerMap[renderKey] += 1;
        }
      }
      if (this.qtDesignerMap[fieldTitle] === 0 || this.qtDesignerMap[fieldTitle] === undefined) {
        return fieldTitle;
      } else {
        return fieldTitle + "_" + this.qtDesignerMap[fieldTitle];
      }
    };
    
    let panelOptions = new PanelOptionCollection(initOptions.template || []);
    if (initOptions.template) {
      panelOptions.panels.forEach(function (panelOption) {
        templateOptions.printPanels.push(new PrintPanel(panelOption, templateOptions.id));
      });
    }
    
    if (initOptions.fontList) this.fontList = initOptions.fontList;
    if (initOptions.fields) this.fields = initOptions.fields;
    if (initOptions.onImageChooseClick) this.onImageChooseClick = initOptions.onImageChooseClick;
    if (initOptions.onPanelAddClick) this.onPanelAddClick = initOptions.onPanelAddClick;
    if (initOptions.settingContainer) new SettingContainerEventManager(this, initOptions.settingContainer);
    if (initOptions.paginationContainer) {
      this.printPaginationCreator = new PrintPaginationCreator(initOptions.paginationContainer, this);
      this.printPaginationCreator.buildPagination();
    }
    this.initAutoSave();
  }

  // 设计方法
  design(container, options) {
    let templateOptions = this;

    if (!options) options = {};
    if (this.printPanels.length == 0) {
      let defaultPanel = this.createDefaultPanel();
      this.printPanels.push(defaultPanel);
    }

    if (!container) throw new Error("options.container cannot be empty");
    templateOptions.designOptions = options;
    this.createContainer(container);
    this.printPanels.forEach(function (panel, index) {
      templateOptions.container.append(panel.getTarget());
      if (index > 0) panel.disable();
      panel.design(options);
    });
    this.selectPanel(0);
  }

  // 获取简单HTML
  getSimpleHtml(data, options) {
    let templateOptions = this;
    if (!options) options = {};
    let container = $('<div class="hiprint-printTemplate"></div>');
    if (data && data.constructor === Array) {
      data.forEach(function(item, index) {
        if (item) {
          templateOptions.printPanels.forEach(function(panel, panelIndex) {
            container.append(panel.getHtml(item, options));
            // 批量打印 续排页码
            if (index == data.length - 1) {
              delete hinnn._paperList;
            }
          });
        }
      });
    } else {
      this.printPanels.forEach(function(panel, panelIndex) {
        container.append(panel.getHtml(data, options));
        // 多面板打印 续排页码
        if (panelIndex == templateOptions.printPanels.length - 1) {
          delete hinnn._paperList;
        }
      });
    }
    if (options && options.imgToBase64) {
      this.transformImg(container.find("img"));
    }
    return container;
  }

  // 获取HTML
  getHtml(data, options) {
    if (!data) data = {};
    return this.getSimpleHtml(data, options);
  }

  // 获取联合HTML
  getJointHtml(data, options, callback) {
    let container = $('<div class="hiprint-printTemplate"></div>');
    let printData = [];
    this.printPanels.forEach(function(panel, index) {
      container.append(panel.getHtml(data, options, printData, undefined, callback));
    });
    return container;
  }

  // 设置纸张
  setPaper(paperType, width) {
    if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(paperType)) {
      this.editingPanel.resize(undefined, parseFloat(paperType), parseFloat(width), false);
    } else {
      let paperSize = PrintLib.instance[paperType];
      if (!paperSize) throw new Error("not found pagetype:" + (paperType || ""));
      this.editingPanel.resize(paperType, paperSize.width, paperSize.height, false);
    }
  }

  // 旋转纸张
  rotatePaper() {
    this.editingPanel.rotatePaper();
  }

  // 缩放
  zoom(scale, center) {
    this.editingPanel.zoom(scale, center);
  }

  // 添加打印面板
  addPrintPanel(options, index) {
    let panel = options ? new PrintPanel(new PrintPanelOption(options), this.id) : this.createDefaultPanel();
    if (options) {
      options.index = this.printPanels.length;
    }
    if (index) {
      this.container.append(panel.getTarget());
      panel.design(this.designOptions);
    }
    this.printPanels.push(panel);
    if (index) {
      this.selectPanel(panel.index);
    }
    return panel;
  }

  // 选择面板
  selectPanel(index) {
    let templateOptions = this;
    if (index > templateOptions.printPanels.length - 1) index = templateOptions.printPanels.length - 1;
    this.printPanels.forEach(function(panel, i) {
      if (index == i) {
        panel.enable();
        templateOptions.editingPanel = panel;
        templateOptions.printPaginationCreator && templateOptions.printPaginationCreator.selectPanel(index);
      } else {
        panel.disable();
      }
    });
  }

  // 删除面板
  deletePanel(index) {
    this.printPanels[index].clear();
    this.printPanels[index].getTarget().remove();
    this.printPanels.splice(index, 1);
  }

  // 获取面板总数
  getPaneltotal() {
    return this.printPanels.length;
  }

  // 创建默认面板
  createDefaultPanel() {
    return new PrintPanel(new PrintPanelOption({
      index: this.printPanels.length,
      name: this.defaultPanelName,
      paperType: "A4"
    }), this.id);
  }

  // 创建容器
  createContainer(container) {
    if (container) {
      this.container = $(container);
      this.container.addClass("hiprint-printTemplate");
    } else {
      this.container = $('<div class="hiprint-printTemplate"></div>');
    }
  }

  // 获取JSON TID
  getJsonTid() {
    let panels = [];
    this.printPanels.forEach(function(panel) {
      if (panel.getPanelEntity().printElements.length) {
        panels.push(panel.getPanelEntity());
      }
    });
    return new PanelOptionCollection({
      panels: panels
    });
  }

  // 获取JSON
  getJson() {
    let panels = [];
    this.printPanels.forEach(function(panel) {
      panels.push(panel.getPanelEntity(true));
    });
    return new PanelOptionCollection({
      panels: panels
    });
  }

  // 撤销
  undo(callback) {
    hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "undo");
  }

  // 重做
  redo(callback) {
    hinnn.event.trigger("hiprintTemplateDataShortcutKey_" + this.id, "redo");
  }

  // 获取打印元素选择事件键
  getPrintElementSelectEventKey() {
    return "PrintElementSelectEventKey_" + this.id;
  }

  // 获取构建自定义选项设置事件键
  getBuildCustomOptionSettingEventKey() {
    return "BuildCustomOptionSettingEventKey_" + this.id;
  }

  // 清除
  clear() {
    this.printPanels.forEach(function(panel) {
      if (panel.clear(), panel.index > 0) {
        let target = panel.getTarget();
        target && target.length && target.remove();
      }
    });
    this.printPanels = [this.printPanels[0]];
    this.printPaginationCreator && this.printPaginationCreator.buildPagination();
  }

  // 获取纸张类型
  getPaperType(index) {
    if (index == null) index = 0;
    return this.printPanels[0].paperType;
  }

  // 获取方向
  getOrient(index) {
    if (index == null) index = 0;
    return this.printPanels[index].height > this.printPanels[index].width ? 1 : 2;
  }

  // 获取打印样式
  getPrintStyle(index) {
    return this.printPanels[index].getPrintStyle();
  }

  // 打印
  print(data, options, callback) {
    if (!data) data = {};
    this.getHtml(data, options).hiwprint(callback);
  }

  // 打印2
  print2(data, options) {
    if (!data) data = {};
    if (!options) options = {};
    if (this.clientIsOpened()) {
      let templateOptions = this;
      let cssIndex = 0;
      let cssMap = {};
      let printCss = $('link[media=print][href*="print-lock.css"]');
      let css = '';
      if (options.styleHandler) {
        css += options.styleHandler();
      }
      if (printCss.length <= 0) {
        throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
        return;
      }
      printCss.each(function(index, item) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", $(item).attr("href"));
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            cssMap[index + ""] = '<style rel="stylesheet" type="text/css">' + xhr.responseText + "</style>";
            if (++cssIndex == printCss.length) {
              let allCss = "";
              for (let i = 0; i < printCss.length; i++) {
                allCss += cssMap[i + ""];
              }
              if (css) allCss = css + allCss;
              templateOptions.sentToClient(allCss, data, options);
            }
          }
        };
        xhr.send();
      });
    } else {
      alert(`${i18n.__('连接客户端失败')}`);
    }
  }

  // 图片转Base64
  imageToBase64(image) {
    let src = $(image).attr("src");
    if (src.indexOf("base64") == -1) {
      try {
        if (!this.tempimageBase64[src]) {
          let canvas = document.createElement("canvas");
          let img = new Image();
          img.src = image.attr("src");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);
          if (src) {
            this.tempimageBase64[src] = canvas.toDataURL("image/png");
          }
        }
        image.attr("src", this.tempimageBase64[src]);
      } catch (error) {
        try {
          this.xhrLoadImage(image);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  // XHR加载图片
  xhrLoadImage(image) {
    // 实现XHR加载图片的逻辑
  }

  // 发送到客户端
  sentToClient(css, data, options) {
    if (!data) data = {};
    let printOptions = $.extend({}, options || {});
    printOptions.imgToBase64 = true;
    let html = css + this.getHtml(data, printOptions)[0].outerHTML;
    printOptions.id = PrintLib.instance.guid();
    printOptions.html = html;
    printOptions.templateId = this.id;
    hiwebSocket.send(printOptions);
  }

  // 通过HTML打印
  printByHtml(html) {
    $(html).hiwprint();
  }

  // 通过HTML打印2
  printByHtml2(html, options) {
    if (!options) options = {};
    if (this.clientIsOpened()) {
      let templateOptions = this;
      let cssIndex = 0;
      let cssMap = {};
      let printCss = $('link[media=print][href*="print-lock.css"]');
      if (printCss.length <= 0) {
        throw new Error("请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media=\"print\"]");
        return;
      }
      printCss.each(function(index, item) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", $(item).attr("href"));
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            cssMap[index + ""] = '<style rel="stylesheet" type="text/css">' + xhr.responseText + "</style>";
            if (++cssIndex == printCss.length) {
              let allCss = "";
              for (let i = 0; i < printCss.length; i++) {
                allCss += cssMap[i + ""];
              }
              let fullHtml = allCss + $(html)[0].outerHTML;
              let sendOptions = $.extend({}, options || {});
              sendOptions.id = PrintLib.instance.guid();
              sendOptions.html = fullHtml;
              sendOptions.templateId = templateOptions.id;
              hiwebSocket.send(sendOptions);
            }
          }
        };
        xhr.send();
      });
    } else {
      alert(`${i18n.__('连接客户端失败')}`);
    }
  }

  // 删除打印元素
  deletePrintElement(elementId) {
    this.printPanels.forEach(function(panel) {
      panel.deletePrintElement(elementId);
    });
  }

  // 转换图片
  transformImg(images) {
    let templateOptions = this;
    images.map(function(index, image) {
      templateOptions.imageToBase64($(image));
    });
  }

  // 转换为PDF
  toPdf(data, filename, options) {
    let templateOptions = this;
    let dtd = $.Deferred();
    let isDownload = true;
    if (this.printPanels.length) {
      let width = hinnn.mm.toPt(this.printPanels[0].width);
      let height = hinnn.mm.toPt(this.printPanels[0].height);
      let pdfOptions = $.extend({
        scale: 2,
        width: hinnn.pt.toPx(width),
        x: 0,
        y: 0,
        useCORS: true
      }, options || {});
      let pdf = new jsPDF({
        orientation: this.getOrient(0) == 1 ? "portrait" : "landscape",
        unit: "pt",
        format: this.printPanels[0].paperType ? this.printPanels[0].paperType.toLocaleLowerCase() : [width, height]
      });
      let htmlContent = this.getHtml(data, options);
      if (options && options.isDownload !== undefined) {
        isDownload = options.isDownload;
      }
      this.createTempContainer();
      let tempContainer = this.getTempContainer();
      this.svg2canvas(htmlContent);
      tempContainer.html(htmlContent[0]);
      let pageCount = tempContainer.find(".hiprint-printPanel .hiprint-printPaper").length;
      $(htmlContent).css("position:fixed");
      html2canvas(htmlContent[0], pdfOptions).then(function(canvas) {
        let context = canvas.getContext("2d");
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        let imgData = canvas.toDataURL("image/jpeg");
        for (let i = 0; i < pageCount; i++) {
          pdf.addImage(imgData, "JPEG", 0, 0 - i * height, width, pageCount * height);
          if (i < pageCount - 1) pdf.addPage();
        }
        if (isDownload) {
          templateOptions.removeTempContainer();
          filename.indexOf(".pdf") > -1 ? pdf.save(filename) : pdf.save(filename + ".pdf");
        } else {
          templateOptions.removeTempContainer();
          let type = options.type || 'blob';
          let pdfFile = pdf.output(type);
          dtd.resolve(pdfFile);
        }
      });
    }
    return dtd.promise();
  }

  // 创建临时容器
  createTempContainer() {
    this.removeTempContainer();
    $("body").prepend($('<div class="hiprint_temp_Container" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'));
  }

  // 移除临时容器
  removeTempContainer() {
    $(".hiprint_temp_Container").remove();
  }

  // 获取临时容器
  getTempContainer() {
    return $(".hiprint_temp_Container");
  }

  // SVG转Canvas
  svg2canvas(content) {
    let that = this;
    content.find("svg").each(function(index, svg) {
      let parent = svg.parentNode;
      let parentSize = that.parentWidthHeight(parent);
      let canvas = document.createElement("canvas");
      canvas.width = parentSize.width;
      canvas.height = parentSize.height;
      let ctx = canvas.getContext('2d');
      let svgString = new XMLSerializer().serializeToString(svg);
      Canvg.fromString(ctx, svgString).render();
      $(svg).before(canvas);
      parent.removeChild(svg);
    });
  }

  // 获取父元素宽高
  parentWidthHeight(element) {
    if (element.style.width.endsWith('%') || element.style.height.endsWith('%')) {
      if (element.className != 'hiprint-printPaper-content') {
        return this.parentWidthHeight(element.parentNode);
      }
      return { width: 10, height: 10 };
    } else {
      return { width: hinnn.pt.toPx(parseFloat(element.style.width)), height: hinnn.pt.toPx(parseFloat(element.style.height)) };
    }
  }

  // 绑定事件
  on(eventName, callback) {
    hinnn.event.clear(eventName + "_" + this.id);
    hinnn.event.on(eventName + "_" + this.id, callback);
  }

  // 客户端是否打开
  clientIsOpened() {
    return hiwebSocket.opened;
  }

  // 获取打印机列表
  getPrinterList() {
    let printers = hiwebSocket.getPrinterList();
    return printers || [];
  }

  // 通过TID获取元素
  getElementByTid(tid, index) {
    if (index == null) index = 0;
    return this.printPanels[index].getElementByTid(tid);
  }

  // 通过名称获取元素
  getElementByName(name, index) {
    if (index == null) index = 0;
    return this.printPanels[index].getElementByName(name);
  }

  // 获取面板
  getPanel(index) {
    if (index == null) index = 0;
    return this.printPanels[index];
  }

  // 加载所有图片
  loadAllImages(content, callback, tryCount) {
    let templateOptions = this;
    if (tryCount == null) tryCount = 0;
    let images = content[0].getElementsByTagName("img");
    let loadedFlag = true;
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (image.src && image.src !== window.location.href && image.src.indexOf("base64") == -1) {
        if (!(image && image.naturalWidth !== undefined && image.naturalWidth !== 0 && image.complete)) {
          loadedFlag = false;
        }
      }
    }
    tryCount++;
    if (!loadedFlag && tryCount < 10) {
      setTimeout(function() {
        templateOptions.loadAllImages(content, callback, tryCount);
      }, 500);
    } else {
      callback();
    }
  }

  // 设置字体列表
  setFontList(fontList) {
    this.fontList = fontList;
  }

  // 获取字体列表
  getFontList() {
    return this.fontList;
  }

  // 设置字段
  setFields(fields) {
    this.fields = fields;
  }

  // 获取字段
  getFields() {
    return this.fields;
  }

  // 设置图片选择点击事件
  setOnImageChooseClick(callback) {
    this.onImageChooseClick = callback;
  }

  // 获取图片选择点击事件
  getOnImageChooseClick() {
    return this.onImageChooseClick;
  }

  // 获取面板中的字段
  getFieldsInPanel() {
    let panelFields = [];
    this.printPanels.forEach(function(panel) {
      panelFields = panelFields.concat(panel.getFieldsInPanel());
    });
    return panelFields;
  }

  // 获取测试数据
  getTestData() {
    let testData = {};
    this.printPanels.forEach(function(panel) {
      testData = Object.assign(testData, panel.getTestData());
    });
    return testData;
  }

  // 更新
  update(json, index) {
    let templateOptions = this;
    try {
      if (json && typeof json === "object" && json.panels.length > 0) {
        let currentLength = templateOptions.printPanels.length - 1;
        json.panels.forEach(function(panelJson, panelIndex) {
          if (panelIndex > currentLength) {
            templateOptions.printPanels.push(new PrintPanel(panelJson, templateOptions.id));
            let newPanel = templateOptions.printPanels[panelIndex];
            templateOptions.container.append(newPanel.getTarget());
            if (panelIndex > 0) newPanel.disable();
            newPanel.design(templateOptions.designOptions);
            templateOptions.printPaginationCreator && templateOptions.printPaginationCreator.buildPagination();
          }
          let panelOption = new PrintPanelOption(panelJson);
          templateOptions.editingPanel = templateOptions.printPanels[panelIndex];
          templateOptions.editingPanel.update(panelOption);
        });
        templateOptions.selectPanel(index || 0);
      }
    } catch (error) {
      console.log(error);
      templateOptions.onUpdateError && templateOptions.onUpdateError(error);
    }
  }

  // 获取选中的元素
  getSelectEls() {
    let templateOptions = this;
    let elements = [];
    // 获取选区元素
    if (templateOptions.editingPanel.mouseRect && templateOptions.editingPanel.mouseRect.target && $(".mouseRect").length) {
      elements = templateOptions.editingPanel.getElementInRect(templateOptions.editingPanel.mouseRect);
    } else { // 获取多选元素
      elements = templateOptions.editingPanel.printElements.filter(function(el) {
        return "block" == el.designTarget.children().last().css("display") && !el.printElementType.type.includes("table");
      });
    }
    return elements;
  }

  // 通过字段选择元素
  selectElementsByField(fieldsArray) {
    let hiPrintEntity = this;
    let jQueryObj = $;
    hiPrintEntity.editingPanel.printElements.forEach((element, index) => {
      if (fieldsArray && fieldsArray.includes(element.options.field)) {
        let designTarget = element.designTarget;
        designTarget.children("div[panelindex]").addClass("selected");
        designTarget.children().last().css({
          display: "block"
        });
        designTarget = designTarget[0];
        jQueryObj.data(designTarget, "hidraggable").options.onBeforeSelectAllDrag.call(designTarget, {});
      }
    });
  }

  // 选择所有元素
  selectAllElements() {
    let hiPrintEntity = this;
    let jQueryObj = $;
    hiPrintEntity.editingPanel.printElements.forEach((element, index) => {
      let designTarget = element.designTarget;
      designTarget.children("div[panelindex]").addClass("selected");
      designTarget.children().last().css({
        display: "block"
      });
      designTarget = designTarget[0];
      jQueryObj.data(designTarget, "hidraggable").options.onBeforeSelectAllDrag.call(designTarget, {});
    });
  }

  // 更新选项
  updateOption(option, value) {
    let elements = this.getSelectEls();
    if (elements && elements.length) {
      elements.forEach(function(element) {
        element.updateOption(option, value, true);
      });
      hinnn.event.trigger("hiprintTemplateDataChanged_" + this.id, "批量修改");
    }
  }

    // 设置框选、多选元素对齐api
    setElsAlign = (alignType) => {
      const selectedElements = this.getSelectEls();
      if (selectedElements.length) {
        const minLeft = Math.min(...selectedElements.map(el => el.options.left));
        const maxRight = Math.max(...selectedElements.map(el => el.options.left + el.options.width));
        const minTop = Math.min(...selectedElements.map(el => el.options.top));
        const maxBottom = Math.max(...selectedElements.map(el => el.options.top + el.options.height));
  
        switch (alignType) {
          case "left": // 左对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(minLeft);
              el.designTarget.css("left", el.options.displayLeft());
            });
            break;
          case "vertical": // 居中
            const verticalCenter = minLeft + (maxRight - minLeft) / 2;
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(verticalCenter - el.options.width / 2);
              el.designTarget.css("left", el.options.displayLeft());
            });
            break;
          case "right": // 右对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(maxRight - el.options.width);
              el.designTarget.css("left", el.options.displayLeft());
            });
            break;
          case "top": // 顶部对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(undefined, minTop);
              el.designTarget.css("top", el.options.displayTop());
            });
            break;
          case "horizontal": // 垂直居中
            const horizontalCenter = minTop + (maxBottom - minTop) / 2;
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(undefined, horizontalCenter - el.options.height / 2);
              el.designTarget.css("top", el.options.displayTop());
            });
            break;
          case "bottom": //底部对齐
            selectedElements.forEach(el => {
              el.updateSizeAndPositionOptions(undefined, maxBottom - el.options.height);
              el.designTarget.css("top", el.options.displayTop());
            });
            break;
          case "distributeHor": // 横向分散
            const sumWidth = selectedElements.reduce((total, el) => total + el.options.width, 0);
            const distributeHor = (maxRight - minLeft - sumWidth) / (selectedElements.length - 1);
            selectedElements.sort((prev, curr) => prev.options.left - curr.options.left);
            selectedElements.forEach((el, index) => {
              if (![0, selectedElements.length - 1].includes(index)) {
                el.updateSizeAndPositionOptions(selectedElements[index - 1].options.left + selectedElements[index - 1].options.width + distributeHor);
                el.designTarget.css("left", el.options.displayLeft());
              }
            });
            break;
          case "distributeVer": // 纵向分散
            const sumHeight = selectedElements.reduce((total, el) => total + el.options.height, 0);
            const distributeVer = (maxBottom - minTop - sumHeight) / (selectedElements.length - 1);
            selectedElements.sort((prev, curr) => prev.options.top - curr.options.top);
            selectedElements.forEach((el, index) => {
              if (![0, selectedElements.length - 1].includes(index)) {
                el.updateSizeAndPositionOptions(undefined, selectedElements[index - 1].options.top + selectedElements[index - 1].options.height + distributeVer);
                el.designTarget.css("top", el.options.displayTop());
              }
            });
            break;
        }
      }
    }
  
    // 设置元素间距
    setElsSpace = (distance, isHorizontal) => {
      const selectedElements = this.getSelectEls();
      if (selectedElements.length) {
        if (isHorizontal) {// 水平距离 →
          selectedElements.sort((prev, curr) => prev.options.left - curr.options.left);
          selectedElements.forEach((el, index) => {
            if (index > 0) {
              el.updateSizeAndPositionOptions(selectedElements[index - 1].options.left + selectedElements[index - 1].options.width + distance);
              el.designTarget.css("left", el.options.displayLeft());
            }
          });
        } else {// 垂直距离 ↓
          selectedElements.sort((prev, curr) => prev.options.top - curr.options.top);
          selectedElements.forEach((el, index) => {
            if (index > 0) {
              el.updateSizeAndPositionOptions(undefined, selectedElements[index - 1].options.top + selectedElements[index - 1].options.height + distance);
              el.designTarget.css("top", el.options.displayTop());
            }
          });
        }
      }
    }
  
    // 初始化自动保存
    initAutoSave = () => {
      hinnn.event.on("hiprintTemplateDataShortcutKey_" + this.id, (key) => {
        if (!this.history) return;
        switch (key) {
          case "undo":
            if (this.historyPos > 0) {
              this.historyPos -= 1;
              const currentState = this.historyList[this.historyPos];
              this.update(currentState.json);
            }
            break;
          case "redo":
            if (this.historyPos < this.historyList.length - 1) {
              this.historyPos += 1;
              const currentState = this.historyList[this.historyPos];
              this.update(currentState.json);
            }
            break;
        }
      });
  
      hinnn.event.on("hiprintTemplateDataChanged_" + this.id, (type) => {
        if (this.history) {
          const currentJson = this.dataMode === 1 ? this.getJson() : this.getJsonTid();
          this.lastJson = currentJson;
          if (this.historyPos < this.historyList.length - 1) {
            this.historyList = this.historyList.slice(0, this.historyPos + 1);
          }
          this.historyList.push({ id: PrintLib.instance.guid(), type: type, json: currentJson });
          if (this.historyList.length > 50) {
            this.historyList = this.historyList.slice(0, 1).concat(this.historyList.slice(1, 50));
          } else {
            this.historyPos += 1;
          }
          this.onDataChanged && this.onDataChanged(type, currentJson);
        }
      });
    }
  }

export default PrintTemplate;