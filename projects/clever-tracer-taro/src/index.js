"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.setToken = exports.reportEvent = exports.callLogger = void 0;
var report_1 = require("./report");
Object.defineProperty(exports, "callLogger", { enumerable: true, get: function () { return report_1.callLogger; } });
Object.defineProperty(exports, "reportEvent", { enumerable: true, get: function () { return report_1.reportEvent; } });
var access_tokens_1 = require("./access_tokens");
Object.defineProperty(exports, "setToken", { enumerable: true, get: function () { return access_tokens_1.setToken; } });
Object.defineProperty(exports, "getToken", { enumerable: true, get: function () { return access_tokens_1.getToken; } });
