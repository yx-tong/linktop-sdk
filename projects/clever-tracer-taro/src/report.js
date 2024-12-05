"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLogger = callLogger;
exports.reportEvent = reportEvent;
const taro_1 = __importDefault(require("@tarojs/taro"));
const access_tokens_1 = require("./access_tokens");
function callLogger(method, endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = 'https://api.salesagent.cc/game-logger';
        const token = yield (0, access_tokens_1.getToken)();
        if (token == null) {
            return null;
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': token
        };
        try {
            const response = yield taro_1.default.request({
                method: method,
                url: `${host}/${endpoint}`,
                header: headers,
                data: data
            });
            if (response.statusCode !== 200) {
                console.error(response.errMsg);
                return null;
            }
            const result = response.data;
            if (result.code < 0) {
                console.error(result.message);
                return null;
            }
            else {
                return result.data;
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
function reportEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield callLogger('POST', 'event', data)) || false;
    });
}
