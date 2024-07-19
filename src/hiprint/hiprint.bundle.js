/* eslint-disable */
/**
 * jQuery Hiprint 2.5.4
 *
 * Copyright (c) 2016-2021 www.hinnn.com. All rights reserved.
 *
 * Licensed under the LGPL or commercial licenses
 * To use it on other terms please contact us: hinnn.com@gmail.com
 *
 */

"use strict";

/**
 * import 相关资源
 */
import {$} from "./hiprint.comm.js";
// js颜色选择
import "@claviska/jquery-minicolors/jquery.minicolors.min";

// 二维码
import "./plugins/qrcode.js";

// 直接打印需要
import { io } from "socket.io-client";

// 默认自定义拖拽列表
import defaultTypeProvider from "./etypes/default-etyps-provider";
import hiprint from "./components/33hiprint.js"

window.$ = window.jQuery = $;
window.autoConnect = true;
window.io = io;

var defaultElementTypeProvider = defaultTypeProvider(hiprint);

export {
  hiprint,
  defaultElementTypeProvider };