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
exports.BrowserSdk = void 0;
const sdk_1 = require("../sdk");
const helper_1 = require("../helper");
class BrowserSdk extends sdk_1.MySdk {
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let old_guid = sys.localStorage.getItem('MARS_LOCAL_GUID');
            if (old_guid) {
                console.log('load guid from cache', old_guid);
            }
            else {
                old_guid = (0, helper_1.generateRandomString)(16);
                sys.localStorage.setItem('MARS_LOCAL_GUID', old_guid);
                console.log('load guid from create', old_guid);
            }
            const [req_body, req_header] = (0, helper_1.build_sdk_req)(this.game_id, this.sdk_key, old_guid);
            console.log('my-sdk login url:', old_guid, this.sdk_login_url, req_body);
            try {
                const req = {
                    url: this.sdk_login_url,
                    data: req_body,
                    method: 'POST',
                    header: req_header
                };
                const ret = yield (0, helper_1.http_request)('POST', this.sdk_login_url, req_header, req_body)();
                // const ret = await promisify_request()(req);
                console.log('my-sdk login resp:', ret);
                this.session_key = ret.session_key;
                return ret;
            }
            catch (e) {
                console.error('browser sdk login fail:', e);
                throw new Error(e);
            }
        });
    }
    createRewardedVideoAd(adInfo) {
        throw new Error('浏览器不支持广告');
    }
    // public override async addCommonUse() {
    //     throw new Error("浏览器不支持 addCommonUse")
    // }
    // public async checkCommonUse(): Promise<boolean> {
    //     return false
    // }
    addShortcut() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('浏览器不支持 addShortcut');
        });
    }
}
exports.BrowserSdk = BrowserSdk;
