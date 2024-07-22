"use strict";

/**
 * hiwebSocket 打印客户端连接对象定义
 */

    // WebSocket 客户端类
var CONNECTED = "connected", RECONNECTING = "reconnecting";
let hiwebSocket = {
  opened: false,
  name: "webSockets",
  host: "http://localhost:17521",
  token: null,
  reconnectTimeout: 60000,
  reconnectWindowSetTimeout: null,
  reconnectDelay: 2000,
  
  // 检查是否支持保持连接
  supportsKeepAlive: function supportsKeepAlive() {
    return true;
  },
  
  // 检查是否有 io 对象
  hasIo: function hasIo(unused) {
    return window.io;
  },
  
  // 发送数据
  send: function send(data) {
    try {
      this.socket.emit("news", data);
    } catch (error) {
      console.log("send data error:" + (data || "") + JSON.stringify(error));
    }
  },
  
  // 获取打印机列表
  getPrinterList: function getPrinterList() {
    return this.printerList;
  },
  
  // 刷新打印机列表
  refreshPrinterList: function refreshPrinterList() {
    try {
      this.socket.emit("refreshPrinterList");
    } catch (error) {
      console.log("refreshPrinterList error:" + JSON.stringify(error));
    }
  },
  
  // 获取纸张大小信息
  getPaperSizeInfo: function getPaperSizeInfo(printer) {
    try {
      console.warn("getPaperSizeInfo 是一个测试功能，仅win客户端支持该api！");
      this.socket.emit("getPaperSizeInfo", printer);
    } catch (error) {
      console.log("getPaperSizeInfo error:" + JSON.stringify(error));
    }
  },
  
  // 获取客户端列表
  getClients: function getClients() {
    try {
      this.socket.emit("getClients");
    } catch (error) {
      console.log("getClients error:" + JSON.stringify(error));
    }
  },
  
  // 获取客户端信息
  getClientInfo: function getClientInfo() {
    try {
      this.socket.emit("getClientInfo");
    } catch (error) {
      console.log("getClientInfo error:" + JSON.stringify(error));
    }
  },
  
  // 获取地址信息
  getAddress: function getAddress(type, ...args) {
    try {
      this.socket.emit("address", type, ...args);
    } catch (error) {
      console.log("getAddress error:" + JSON.stringify(error));
    }
  },
  
  // IPP 打印
  ippPrint: function ippPrint(options) {
    try {
      this.socket.emit("ippPrint", options);
    } catch (error) {
      console.log("ippPrint error:" + JSON.stringify(error));
    }
  },
  
  // IPP 请求
  ippRequest: function ippRequest(options) {
    try {
      this.socket.emit("ippRequest", options);
    } catch (error) {
      console.log("ippRequest error:" + JSON.stringify(error));
    }
  },
  
  // 设置主机地址
  setHost: function (host, token, cb) {
    if (typeof token === "function") {
      cb = token;
      token = undefined;
    }
    this.host = host;
    this.token = token;
    this.stop();
    this.start(cb);
  },
  
  // 启动 WebSocket 连接
  start: function start(cb) {
    var _this = this;
    var self = this;
    
    if (window.WebSocket) {
      if (!this.socket) {
        this.socket = window.io(this.host, {
          transports: ['websocket'],
          reconnectionAttempts: 5,
          auth: {
            token: this.token
          }
        });
        
        // 连接成功事件
        this.socket.on("connect", function (connectInfo) {
          self.opened = true;
          console.log("Websocket opened.");
          
          // 注册各种事件监听
          _this.socket.on("successs", function (successData) {
            hinnn.event.trigger("printSuccess_" + successData.templateId, successData);
          });
          
          _this.socket.on("error", function (errorData) {
            hinnn.event.trigger("printError_" + errorData.templateId, errorData);
          });
          
          _this.socket.on("clients", function (clients) {
            self.clients = clients;
            hinnn.event.trigger("clients", clients);
          });
          
          _this.socket.on("clientInfo", function (clientInfo) {
            self.clientInfo = clientInfo;
            hinnn.event.trigger("clientInfo", clientInfo);
          });
          
          _this.socket.on("printerList", function (printerList) {
            self.printerList = printerList;
            hinnn.event.trigger("printerList", printerList);
          });
          
          _this.socket.on("paperSizeInfo", function (paperSizeInfo) {
            self.paperSize = Array.isArray(paperSizeInfo) ? paperSizeInfo : [paperSizeInfo];
            hinnn.event.trigger("paperSizeInfo", self.paperSize);
          });
          
          _this.socket.on("address", function (type, addr, extraInfo) {
            hinnn.event.trigger("address_" + type, { 'addr': addr, 'e': extraInfo });
          });
          
          _this.socket.on("ippPrinterConnected", function (printer) {
            hinnn.event.trigger("ippPrinterConnected", printer);
          });
          
          _this.socket.on("ippPrinterCallback", function (err, res) {
            hinnn.event.trigger("ippPrinterCallback", { 'err': err, 'res': res });
          });
          
          _this.socket.on("ippRequestCallback", function (err, res) {
            hinnn.event.trigger("ippRequestCallback", { 'err': err, 'res': res });
          });
          
          self.state = CONNECTED;
          cb && cb(true, connectInfo);
        });
        
        // 连接错误事件
        this.socket.on("connect_error", function (error) {
          console.error(error);
          hinnn.event.trigger("connect_error", error);
        });
        
        // 断开连接事件
        this.socket.on("disconnect", function () {
          self.opened = false;
          cb && cb(false);
        });
      }
    } else {
      console.log("WebSocket start fail");
      cb && cb(false);
    }
  },
  
  // 重新连接
  reconnect: function reconnect() {
    if (this.state === CONNECTED || this.state === RECONNECTING) {
      this.stop();
      if (this.ensureReconnectingState()) {
        console.log("Websocket reconnecting.");
        this.start();
      }
    }
  },
  
  // 停止连接
  stop: function stop() {
    if (this.socket) {
      console.log("Closing the Websocket.");
      this.socket.close();
      this.socket = null;
      this.printerList = [];
    }
  },
  
  // 确保重连状态
  ensureReconnectingState: function ensureReconnectingState() {
    this.state = RECONNECTING;
    return this.state === RECONNECTING;
  }
};

window.hiwebSocket = hiwebSocket;
export default hiwebSocket;