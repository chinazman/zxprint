"use strict";

/**
 * hiwebSocket 打印客户端连接对象定义
 */
import {jQuery} from "../hiprint.comm.js";

export default function (v12190, v12191) {
    var v12192, v12193;
    jQuery, v12192 = "connected", v12193 = "reconnecting", window.hiwebSocket = {
      opened: !1,
      name: "webSockets",
      host: "http://localhost:17521",
      token: null,
      reconnectTimeout: 6e4,
      reconnectWindowSetTimeout: null,
      reconnectDelay: 2e3,
      supportsKeepAlive: function supportsKeepAlive() {
        return !0;
      },
      hasIo: function hasIo(v12194) {
        return window.io;
      },
      send: function send(v12195) {
        try {
          this.socket.emit("news", v12195);
        } catch (v12196) {
          console.log("send data error:" + (v12195 || "") + JSON.stringify(v12196));
        }
      },
      getPrinterList: function getPrinterList() {
        return this.printerList;
      },
      refreshPrinterList: function refreshPrinterList() {
        try {
          this.socket.emit("refreshPrinterList");
        } catch (v12197) {
          console.log("refreshPrinterList error:" + JSON.stringify(v12197));
        }
      },
      getPaperSizeInfo: function getPaperSizeInfo(printer) {
        try {
          console.warn("getPaperSizeInfo 是一个测试功能，仅win客户端支持该api！");
          this.socket.emit("getPaperSizeInfo", printer);
        } catch (v12198) {
          console.log("getPaperSizeInfo error:" + JSON.stringify(v12198));
        }
      },
      getClients: function getClients() {
        try {
          this.socket.emit("getClients");
        } catch (v12199) {
          console.log("getClients error:" + JSON.stringify(v12199));
        }
      },
      getClientInfo: function getClientInfo() {
        try {
          this.socket.emit("getClientInfo");
        } catch (v12200) {
          console.log("getClientInfo error:" + JSON.stringify(v12200));
        }
      },
      getAddress: function getAddress(type, ...args) {
        try {
          this.socket.emit("address", type, ...args);
        } catch (v12201) {
          console.log("getAddress error:" + JSON.stringify(v12201));
        }
      },
      ippPrint: function ippPrint(options) {
        try {
          this.socket.emit("ippPrint", options);
        } catch (v12202) {
          console.log("ippPrint error:" + JSON.stringify(v12202));
        }
      },
      ippRequest: function ippRequest(options) {
        try {
          this.socket.emit("ippRequest", options);
        } catch (v12203) {
          console.log("ippRequest error:" + JSON.stringify(v12203));
        }
      },
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
      start: function start(cb) {
        var _this = this;
  
        var v12204 = this;
        window.WebSocket ? this.socket || (this.socket = window.io(this.host, {
          transports: ['websocket'],
          reconnectionAttempts: 5,
          auth: {
            token: this.token
          }
        }), this.socket.on("connect", function (v12205) {
          v12204.opened = !0, console.log("Websocket opened."), _this.socket.on("successs", function (v12206) {
            hinnn.event.trigger("printSuccess_" + v12206.templateId, v12206);
          }), _this.socket.on("error", function (v12207) {
            hinnn.event.trigger("printError_" + v12207.templateId, v12207);
          }), _this.socket.on("clients", function (clients) {
            v12204.clients = clients;
            hinnn.event.trigger("clients", clients);
          }), _this.socket.on("clientInfo", function (clientInfo) {
            v12204.clientInfo = clientInfo;
            hinnn.event.trigger("clientInfo", clientInfo);
          }), _this.socket.on("printerList", function (v12208) {
            v12204.printerList = v12208;
            hinnn.event.trigger("printerList", v12208);
          }), _this.socket.on("paperSizeInfo", function (v12209) {
            v12204.paperSize = Array.isArray(v12209) ? v12209 : [v12209];
            hinnn.event.trigger("paperSizeInfo", v12204.paperSize);
          }), _this.socket.on("address", function (type, addr, v12210) {
            hinnn.event.trigger("address_" + type, { 'addr': addr, 'e': v12210 });
          }), _this.socket.on("ippPrinterConnected", function (printer) {
            hinnn.event.trigger("ippPrinterConnected", printer);
          }), _this.socket.on("ippPrinterCallback", function (err, res) {
            hinnn.event.trigger("ippPrinterCallback", { 'err': err, 'res': res });
          }), _this.socket.on("ippRequestCallback", function (err, res) {
            hinnn.event.trigger("ippRequestCallback", { 'err': err, 'res': res });
          }), v12204.state = v12192;
          cb && cb(true, v12205);
        }), this.socket.on("connect_error", function (v12211) {
          console.error(v12211);
          hinnn.event.trigger("connect_error", v12211);
        }), this.socket.on("disconnect", function () {
          v12204.opened = !1;
          cb && cb(false);
        })) : console.log("WebSocket start fail"), cb && cb(false);
      },
      reconnect: function reconnect() {
        this.state !== v12192 && this.state !== v12193 || (this.stop(), this.ensureReconnectingState() && (console.log("Websocket reconnecting."), this.start()));
      },
      stop: function stop() {
        this.socket && (console.log("Closing the Websocket."), this.socket.close(), this.socket = null, this.printerList = []);
      },
      ensureReconnectingState: function ensureReconnectingState() {
        return this.state = v12193, this.state === v12193;
      }
    };
  }