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
exports.WeChatSdk = void 0;
const helper_1 = require("../helper");
const sdk_1 = require("../sdk");
class WeChatSdk extends sdk_1.MySdk {
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_ret = yield (0, helper_1.promisify_wx)('login')();
            console.log('third-sdk login ret:', login_ret);
            if (!login_ret.code) {
                console.error('third-sdk login error:', login_ret.errMsg);
                return;
            }
            console.log('third-sdk login ok:', login_ret.code);
            const [req_body, req_header] = (0, helper_1.build_sdk_req)(this.game_id, this.sdk_key, login_ret.code);
            const req = {
                url: this.sdk_login_url,
                data: req_body,
                method: 'POST',
                header: req_header
            };
            console.log('my-sdk ready to code2session:', this.sdk_login_url, JSON.stringify(req));
            // const ret: any = await promisify_wx2(this.inner.request)(req);
            // const sdkResp: any = await http_request("POST", this.sdk_login_url, req_header, req_body)();
            const ret = yield (0, helper_1.promisify_request)()(req);
            // if (!ret.data){
            //     throw new Error("fail to login sdk")
            // }
            console.log('my-sdk login resp:', ret);
            const sdkResp = (0, helper_1.parse_sdk_resp)(ret);
            this.session_key = sdkResp.session_key;
            return sdkResp;
        });
    }
    // 建议每秒调用一次，不需要太频繁
    // async update(){
    //     if (this.sdk_login_url){
    //         try {
    //             await promisify_wx(this.inner.checkSession)();
    //         }catch (e){
    //             await this.login()
    //             console.warn("the secret key expired")
    //         }
    //     }
    // }
    // true表示session_key已经过期
    checkSession() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, helper_1.promisify_wx)('checkSession')();
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    // adInfo{adUnitId:广告单元id} 广告单元id需要在小程序后台 流量主界面创建
    // cb 玩家看广告结束的回调， isEnd: 广告是否看完, true:看完，false:中途退出
    createRewardedVideoAd(adInfo) {
        let videoAd = this.videoAd['adUnitId'];
        console.log('createRewardedVideoAd', adInfo, videoAd);
        if (!videoAd) {
            videoAd = this.inner.createRewardedVideoAd(adInfo);
            this.videoAd['adUnitId'] = videoAd;
        }
        return new Promise((resolve, reject) => {
            let fn = '';
            if (typeof (videoAd.show) !== 'undefined') {
                fn = 'show';
            }
            else if (typeof (videoAd.load) !== 'undefined') {
                fn = 'load';
            }
            else {
                console.error('unsupported createRewardedVideoAd');
                return;
            }
            videoAd.onError((err) => {
                console.error(err);
            });
            // 视频关闭
            videoAd.onClose((res) => {
                console.log(res);
                if ((res && res.isEnded) || res === undefined) {
                    res = res || {
                        isEnded: true,
                        count: 1
                    };
                    res.count = res.count || 1;
                    console.info('广告观看结束，此处添加奖励代码', res);
                    resolve(res);
                }
                else {
                    resolve(res);
                    console.error('广告没看完，不能获奖');
                }
            });
            try {
                videoAd[fn](adInfo);
            }
            catch (e) {
                console.error('show videoAd err:', e);
            }
        });
    }
    addCommonUse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['addCommonUse']) == 'undefined') {
                console.error('不支持addCommonUse');
            }
            const checkRet = yield this.checkCommonUse();
            if (!checkRet.isSupport || checkRet.isCommonUse) {
                console.log('已经设置为常用，不再重复');
                return;
            }
            yield (0, helper_1.promisify_wx)('addCommonUse')();
        });
    }
    checkCommonUse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['checkCommonUse']) == 'undefined') {
                console.error('不支持checkCommonUse');
                return {
                    isSupport: false,
                    isCommonUse: false
                };
            }
            try {
                const ret = yield (0, helper_1.promisify_wx)('checkCommonUse')();
                console.log('checkCommonUse-ret:', ret);
                return {
                    isSupport: true,
                    isCommonUse: ret.isCommonUse
                };
            }
            catch (e) {
                return {
                    isSupport: true,
                    isCommonUse: false
                };
            }
        });
    }
    addShortcut() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['addShortcut']) == 'undefined') {
                console.error('不支持addShortcut');
            }
            // const needAdd = await this.checkShortcut()
            // if (needAdd.exist || needAdd.needUpdate) {
            //     console.log("已经设置为addShortcut，不再重复")
            //     return;
            // }
            yield (0, helper_1.promisify_wx)('addShortcut')();
        });
    }
    checkShortcut() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['checkShortcut']) == 'undefined') {
                console.error('不支持checkShortcut');
                return {
                    isSupport: false,
                    exist: true,
                    needUpdate: false
                };
            }
            try {
                const ret = yield (0, helper_1.promisify_wx)('checkShortcut')();
                console.log('checkShortcut-ret:', ret);
                return {
                    isSupport: true,
                    exist: ret.installed || ret.exist,
                    needUpdate: ret.needUpdate
                };
            }
            catch (e) {
                if (e.msg === 'apk info is invalid') {
                    return {
                        isSupport: true,
                        exist: false,
                        needUpdate: false
                    };
                }
                return {
                    isSupport: true,
                    exist: true,
                    needUpdate: false
                };
            }
        });
    }
    // 抖音侧边栏访问功能
    checkScene() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['checkScene']) == 'undefined') {
                console.error('不支持checkScene');
                return {
                    isSupport: false,
                    isScene: false
                };
            }
            try {
                const ret = yield (0, helper_1.promisify_wx_a)('checkScene')({ scene: 'sidebar' });
                console.log('checkScene-ret:', ret);
                return {
                    isSupport: false,
                    isScene: ret.isExist
                };
            }
            catch (e) {
                return {
                    isSupport: true,
                    isScene: false
                };
            }
        });
    }
    navigateToScene() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['navigateToScene']) == 'undefined') {
                console.error('不支持navigateToScene');
                return;
            }
            try {
                const ret = yield (0, helper_1.promisify_wx_a)('navigateToScene')({ scene: 'sidebar' });
                console.log('navigateToScene-ret:', ret);
            }
            catch (e) {
                console.error('navigateToScene', e);
            }
        });
    }
    shareAppMessage(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['shareAppMessage']) == 'undefined') {
                console.error('不支持shareAppMessage');
                return false;
            }
            try {
                yield (0, helper_1.promisify_wx_a)('shareAppMessage')(param);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (this.inner['getUserInfo']) == 'undefined') {
                console.error('不支持getUserInfo');
                return {};
            }
            try {
                return yield (0, helper_1.promisify_wx_a)('getUserInfo')({});
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.WeChatSdk = WeChatSdk;
