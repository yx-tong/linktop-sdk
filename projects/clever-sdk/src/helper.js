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
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify_wx = promisify_wx;
exports.promisify_wx_a = promisify_wx_a;
exports.generateRandomString = generateRandomString;
exports.build_sdk_head = build_sdk_head;
exports.build_sdk_req = build_sdk_req;
exports.parse_sdk_resp = parse_sdk_resp;
exports.promisify_request = promisify_request;
exports.http_request = http_request;
// @ts-ignore
const sha256_js_1 = require("./sha256.js");
const index_1 = require("./index");
function promisify_wx(fn) {
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                globalValue['inner'][fn](Object.assign(Object.assign({}, (args || {})), { success: (res) => {
                        console.log('promisify_wx ok:', res);
                        resolve(res);
                    }, fail: (err) => {
                        console.error('promisify_wx fail:', err);
                        reject(err);
                    } }));
            });
        });
    };
}
function promisify_wx_a(fn) {
    return function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                globalValue['inner'][fn](Object.assign(Object.assign({}, (args || {})), { success: (res) => {
                        console.log('promisify_wx ok:', res);
                        resolve(res);
                    }, fail: (err) => {
                        console.error('promisify_wx fail:', err);
                        reject(err);
                    } }));
            });
        });
    };
}
// const promisify_wx2 = (fn) => {
//     return async function (args) {
//         return new Promise((resolve, reject) => {
//             args.success = function (res) {
//                 resolve(res)
//             };
//             args.fail = function (err) {
//                 reject(err)
//             };
//             fn(args);
//         });
//     };
// }
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function build_sdk_head(key, req_body) {
    const now = get_ts();
    const sign_str = key + '&POST&' + now + '&' + req_body;
    console.log('--------------get hash 111', typeof (sha256_js_1.sha256));
    const sha_str = new sha256_js_1.sha256('SHA-256', 'TEXT', { encoding: 'UTF8' });
    console.log('--------------get hash 222');
    sha_str.update(sign_str);
    console.log('--------------get hash 333');
    const hash = sha_str.getHash('HEX');
    console.log('--------------get hash', hash);
    const headers = {
        'content-type': 'application/json',
        Authorization: hash,
        'X-MARS-Timestamp': now,
    };
    return headers;
}
function build_sdk_req(game_id, key, code) {
    const req_body = JSON.stringify({
        game_id: game_id,
        session_id: code,
        Fields: {
            grant_type: 'authorization_code'
        }
    });
    const head = build_sdk_head(key, req_body);
    return [req_body, head];
}
const get_ts = () => {
    const date = new Date();
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
};
function parse_sdk_resp(resp) {
    if (resp.statusCode != 200) {
        throw new Error('error status code:' + resp.statusCode);
    }
    const sdkResp = resp.data;
    if (sdkResp.ErrorCode && sdkResp.ErrorCode != 0) {
        throw new Error('sdk login error:' + JSON.stringify(resp.data));
    }
    console.log('sdk login ok:', sdkResp);
    return sdkResp;
}
// Promise<any>
function promisify_request() {
    return function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                args.fail = (err) => {
                    console.error('fail:', err);
                    reject(err);
                };
                args.success = (res) => {
                    console.log('success:', res.data);
                    resolve(res);
                };
                globalValue['inner'].request(args);
            });
        });
    };
}
function http_request(method, url, heads, body) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    for (const [k, v] of heads) {
        xhr.setRequestHeader(k, v);
    }
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.onreadystatechange = function () {
                    console.log('----------', xhr.readyState, xhr.responseText);
                    if (xhr.readyState == 4) {
                        let resp = null;
                        try {
                            if (xhr.responseText && xhr.responseText != '') {
                                resp = JSON.parse(xhr.responseText);
                                resolve(resp);
                            }
                            else {
                                reject('xml http request no response');
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                };
                xhr.send(body);
            });
        });
    };
}
// @ts-ignore
let globalValue = GameGlobal;
globalValue['createSdk'] = index_1.createSdk;
