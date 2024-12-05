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
exports.setToken = setToken;
exports.getToken = getToken;
const taro_1 = __importDefault(require("@tarojs/taro"));
function setToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield taro_1.default.setStorage({
            key: 'LIN_GAMES_LOGGER_TOKEN',
            data: token
        });
        return true;
    });
}
function getToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield taro_1.default.getStorage({ key: 'LIN_GAMES_LOGGER_TOKEN' });
            return token.data;
        }
        catch (e) {
            return null;
        }
    });
}
