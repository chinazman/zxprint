import {languages,i18n,$} from "../hiprint.comm.js";
import "../plugins/jquery.hidraggable.js";
import "../plugins/jquery.hidroppable.js";
import "../plugins/jquery.hiprintparser.js";
import "../plugins/jquery.hireizeable.js";
import "../plugins/jquery.hicontextMenu.js";
import "../plugins/hiLocalStorage.js"
import hiwebSocket from "../plugins/hiwebSocket.js";
import PrintConfig from "./PrintConfig.js";
import PrintLib from "./PrintLib.js";
import PrintElementTypeContext from "./PrintElementTypeContext.js";

import PrintElementTypeFactory from "./PrintElementTypeFactory.js";
import PrintTemplate from "./PrintTemplate.js"

// 打印元素类型HTML生成器
class PrintElementTypeHtmlProvider {
  // 创建打印元素类型HTML
  createPrintElementTypeHtml(container, printElementTypes) {
    const ulElement = $('<ul class="hiprint-printElement-type"></ul>');
    printElementTypes.forEach(function (printElementType) {
      const liElement = $("<li></li>");
      liElement.append('<span class="title">' + printElementType.name + "</span>");
      const subUlElement = $("<ul></ul>");
      liElement.append(subUlElement);
      printElementType.printElementTypes.forEach(function (elementType) {
        subUlElement.append('<li><a class="ep-draggable-item" tid="' + elementType.tid + '">  ' + elementType.getText() + " </a></li>");
      });
      ulElement.append(liElement);
    });
    $(container).append(ulElement);
    return ulElement.find(".ep-draggable-item");
  }
}
// 打印元素类型管理器
class PrintElementTypeManager {
  static getElementTypeGroups(module) {
    const formattedModule = PrintElementTypeManager.formatterModule(module);
    return PrintElementTypeContext.instance[formattedModule] || [];
  }

  static getElementType(tid, type) {
    if (tid) return PrintElementTypeContext.instance.getElementType(tid);
    return PrintElementTypeFactory.createPrintElementType({
      type: type
    });
  }

  static build(container, module) {
    const formattedModule = PrintElementTypeManager.formatterModule(module);
    const elementTypeHtml = new PrintElementTypeHtmlProvider().createPrintElementTypeHtml(container, this.getElementTypeGroups(formattedModule));
    this.enableDrag(elementTypeHtml);
  }

  static buildByHtml(container) {
    this.enableDrag(container);
  }

  static enableDrag(container) {
    container.hidraggable({
      revert: true,
      proxy: function(source) {
        const dragingElement = PrintLib.instance.getDragingPrintElement();
        const proxyTarget = dragingElement.printElement.getProxyTarget(dragingElement.printElement.printElementType.getOptions());
        proxyTarget.appendTo("body");
        proxyTarget.css("z-index", "9999");
        return proxyTarget;
      },
      moveUnit: "pt",
      minMove: 4,
      onBeforeDrag: function(e) {
        PrintLib.instance.draging = true;
        const tid = $(e.data.target).attr("tid");
        const elementType = PrintElementTypeManager.getElementType(tid, $(e.data.target).attr("ptype"));
        if (!elementType) {
          throw new Error(`${i18n.__('请检查 hiprint.init 的 provider 是否配置了')} [${tid}]`);
        }
        const element = elementType.createPrintElement();
        if (!element) {
          if (elementType.type === 'tableCustom') {
            throw new Error(`${i18n.__("已移除'tableCustom',请替换使用'table'详情见更新记录")}`);
          }
          return false;
        }
        PrintLib.instance.setDragingPrintElement(element);
        return true;
      },
      onDrag: function(e, left, top) {
        PrintLib.instance.getDragingPrintElement().updatePosition(left, top);
      },
      onStopDrag: function(e) {
        PrintLib.instance.draging = false;
      }
    });
  }

  static formatterModule(module) {
    return module || "_default";
  }
}

// 打印元素类型组
class PrintElementTypeGroup {
  constructor(name, options) {
    this.name = name;
    this.printElementTypes = [];
    options.forEach(option => {
      this.printElementTypes.push(PrintElementTypeFactory.createPrintElementType(option));
    });
  }
}

    function print(printData) {
      this.getHtml(printData).hiwprint();
    }
  
    function print2(printData, printSuccessCallback, printErrorCallback) {
      $.extend({}, printData || {}).imgToBase64 = !0;
      var printTemplate = new PrintTemplate({});
      printTemplate.on("printSuccess", printSuccessCallback), printTemplate.on("printError", printErrorCallback), printTemplate.printByHtml2(this.getHtml(printData), printData.options);
    }
  
        // 获取HTML函数
    function getHtml(printData){
      let htmlResult = undefined;
      
      if (printData && printData.templates) {
        printData.templates.forEach((templateItem, templateIndex) => {
          const templateOptions = {...(templateItem.options || {})};
          
          if (printData.imgToBase64) {
            templateOptions.imgToBase64 = true;
          }
          
          if (htmlResult) {
            htmlResult.append(templateItem.template.getHtml(templateItem.data, templateOptions).html());
          } else {
            htmlResult = templateItem.template.getHtml(templateItem.data, templateOptions);
          }
        });
      }
      
      return htmlResult;
    }

    // 初始化函数
    function init(config){
      PrintConfig.instance.init(config);
      
      if (PrintConfig.instance.providers) {
        PrintConfig.instance.providers.forEach((provider) => {
          provider.addElementTypes(PrintElementTypeContext.instance);
        });
      }

      // 自动连接WebSocket
      if (window.autoConnect && (PrintConfig.instance.host != hiwebSocket.host || PrintConfig.instance.token != hiwebSocket.token)) {
        hiwebSocket.stop();
        
        if (PrintConfig.instance.host) {
          hiwebSocket.host = PrintConfig.instance.host;
        }
        
        if (PrintConfig.instance.token) {
          hiwebSocket.token = PrintConfig.instance.token;
        }
        
        hiwebSocket.start();
      }

      // 设置语言
      if (PrintConfig.instance.lang && Object.keys(languages).includes(PrintConfig.instance.lang)) {
        i18n.lang = PrintConfig.instance.lang;
      } else {
        i18n.lang = 'cn';
      }
    }

    // 设置配置函数
    function setConfig (customConfig){
      if (customConfig) {
        Object.keys(customConfig).forEach((configKey) => {
          if (configKey == "optionItems" && customConfig.optionItems && customConfig.optionItems.length) {
            PrintConfig.instance.registerItems(customConfig.optionItems);
          } else if (customConfig[configKey].tabs && customConfig[configKey].tabs.length) {
            customConfig[configKey].tabs.forEach((tab, tabIndex) => {
              if (tab.replace) {
                Object.assign(PrintConfig.instance[configKey].tabs[tabIndex], tab);
              } else {
                const newOptions = tab.options;
                const existingList = PrintConfig.instance[configKey].tabs[tabIndex].options;
                
                newOptions.forEach((newOption) => {
                  const existingIndex = existingList.findIndex((existingOption) => existingOption.name == newOption.name);
                  
                  if (existingIndex > -1) {
                    existingList[existingIndex].hidden = newOption.hidden;
                  } else {
                    if (newOption.after) {
                      const afterIndex = existingList.findIndex((existingOption) => existingOption.name == newOption.after);
                      if (afterIndex > -1) {
                        existingList.splice(afterIndex + 1, 0, newOption);
                      }
                    } else {
                      existingList.push(newOption);
                    }
                  }
                });
                
                Object.assign(PrintConfig.instance[configKey].tabs[tabIndex], {
                  name: tab.name,
                  options: existingList
                });
              }
            });
            delete customConfig[configKey].tabs;
          } else if (customConfig[configKey].supportOptions) {
            const newOptions = customConfig[configKey].supportOptions;
            const existingList = PrintConfig.instance[configKey].supportOptions;
            
            newOptions.forEach((newOption) => {
              const existingIndex = existingList.findIndex((existingOption) => existingOption.name == newOption.name);
              
              if (existingIndex > -1) {
                existingList[existingIndex].hidden = newOption.hidden;
              } else {
                if (newOption.after) {
                  const afterIndex = existingList.findIndex((existingOption) => existingOption.name == newOption.after);
                  if (afterIndex > -1) {
                    existingList.splice(afterIndex + 1, 0, newOption);
                  }
                } else {
                  existingList.push(newOption);
                }
              }
            });
            
            Object.assign(PrintConfig.instance[configKey].supportOptions, existingList);
            delete customConfig[configKey].supportOptions;
          } else {
            const keyMap = {};
            keyMap[configKey] = customConfig[configKey];
            Object.assign(PrintConfig.instance, keyMap);
          }
        });
      } else {
        Object.assign(PrintConfig.instance, HIPRINT_CONFIG);
      }
    }
  
    function updateElementType(typeId, updateFunction) {
      return PrintElementTypeContext.instance.updateElementType(typeId, updateFunction);
    }
  
    function refreshPrinterList(printerListCallback) {
      PrintConfig.instance.clear("printerList");
      PrintConfig.instance.on("printerList", printerListCallback);
      hiwebSocket.refreshPrinterList();
    }
  
    function getClients(clientsCallback) {
      PrintConfig.instance.clear("clients");
      PrintConfig.instance.on("clients", clientsCallback);
      hiwebSocket.getClients();
    }
  
    function getClientInfo(getClientInfoCallback) {
      PrintConfig.instance.clear("clientInfo");
      PrintConfig.instance.on("getClientInfo", getClientInfoCallback);
      hiwebSocket.getClientInfo();
    }
  
    function getAddress(type, addressCallback, ...args) {
      PrintConfig.instance.clear("address_" + type);
      PrintConfig.instance.on("address_" + type, addressCallback);
      hiwebSocket.getAddress(type, ...args);
    }
  
    function ippPrint(options, callback, connectedCallback) {
      PrintConfig.instance.clear("ippPrinterCallback");
      PrintConfig.instance.on("ippPrinterCallback", callback);
      PrintConfig.instance.clear("ippPrinterConnected");
      PrintConfig.instance.on("ippPrinterConnected", connectedCallback);
      hiwebSocket.ippPrint(options);
    }
  
    function ippRequest(options, callback) {
      PrintConfig.instance.clear("ippRequestCallback");
      PrintConfig.instance.on("ippRequestCallback", callback);
      hiwebSocket.ippRequest(options);
    }

    //放这里不合适后续要移除了
    $(document).ready(function () {
      console.log('document ready');
      console.log(window.autoConnect);
      if (hiwebSocket.hasIo() && window.autoConnect) {
        hiwebSocket.start();
      }
    });

    export default {
      init: init,
      setConfig: setConfig,
      updateElementType: updateElementType,
      hiwebSocket: hiwebSocket,
      refreshPrinterList: refreshPrinterList,
      getClients: getClients,
      getClientInfo: getClientInfo,
      getAddress: getAddress,
      ippPrint: ippPrint,
      ippRequest: ippRequest,
      PrintElementTypeManager: PrintElementTypeManager,
      PrintElementTypeGroup: PrintElementTypeGroup,
      PrintTemplate: PrintTemplate,
      print: print,
      print2: print2,
      getHtml: getHtml
    };