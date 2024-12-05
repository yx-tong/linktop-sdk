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
exports.callReport = callReport;
exports.callAnalyzer = callAnalyzer;
exports.isNewPlayer = isNewPlayer;
const axios_1 = __importDefault(require("axios"));
/**
 * 异步调用 Axios
 */
function callLogger(method, endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // const host = process.env.VUE_APP_API_HOST
        const host = 'https://api.salesagent.cc/game-logger';
        const bearer = 'ej';
        try {
            const response = yield (0, axios_1.default)({
                method: method,
                url: `${host}/${endpoint}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: bearer
                },
                data: data
            });
            if (response.status !== 200) {
                console.error(response.statusText);
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
function callReport(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield callLogger('POST', 'event', data);
        return result !== null && result !== void 0 ? result : false;
    });
}
/**
 * 异步调用 Axios
 */
function callAnalyzer(method, endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // const host = process.env.VUE_APP_API_HOST
        const host = 'https://api.salesagent.cc/game-analyzer';
        const bearer = 'ej';
        try {
            const response = yield (0, axios_1.default)({
                method: method,
                url: `${host}/${endpoint}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: bearer
                },
                data: data
            });
            if (response.status !== 200) {
                console.error(response.statusText);
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
function isNewPlayer(key) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield callAnalyzer('POST', 'player/check/new', key);
        return result !== null && result !== void 0 ? result : false;
    });
}
