"use strict";
/*
 * @Author: vegapan@hotmail.com
 * @Date: 2024-05-28 16:17:06
 * @Last Modified by: vegapan@hotmail.com
 * @Last Modified time: 2024-09-02 23:44:37
 */
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
exports.MySdk = void 0;
class MySdk {
    // game_id 游戏编号，每个游戏game_id唯一
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('dummy-sdk login');
        });
    }
    // async update(){"dummy-sdk update"}
    checkSession() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    createRewardedVideoAd(adInfo) {
        return Promise.resolve({});
    }
    // 设为常用
    addCommonUse() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    checkCommonUse() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve({
                isSupport: false,
                isCommonUse: false
            });
        });
    }
    addShortcut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    checkShortcut() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve({
                isSupport: false,
                exist: true,
                needUpdate: false
            });
        });
    }
    // 侧边栏复访
    checkScene() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve({
                isSupport: false,
                isScene: false
            });
        });
    }
    navigateToScene() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // 分享
    shareAppMessage(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(false);
        });
    }
    // 获取用户信息
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve({});
        });
    }
    constructor(platform, sdk_url, sdk_key, game_id, wx) {
        this.videoAd = {};
        this.sdk_login_url = '';
        this.session_key = '';
        this.platform = platform;
        this.sdk_url = sdk_url;
        this.sdk_key = sdk_key;
        this.game_id = game_id;
        this.inner = wx;
        let t_sdk_url = this.sdk_url;
        if (t_sdk_url) {
            if (t_sdk_url[t_sdk_url.length - 1] == '/') {
                t_sdk_url = t_sdk_url.substring(0, t_sdk_url.length - 1);
            }
            if (platform == 'WECHAT_GAME') {
                this.sdk_login_url = t_sdk_url + '/weChatLogin';
            }
            else if (platform == 'douyingame') {
                this.sdk_login_url = t_sdk_url + '/byteDanceLogin';
            }
            else if (platform == 'kuaishou') {
                this.sdk_login_url = t_sdk_url + '/kuaishouLogin';
            }
            else {
                this.sdk_login_url = t_sdk_url + '/devLogin';
            }
        }
    }
    // TODO: 为什么不在 ctor 传???
    initialize(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    // 广告接口
    createBannerAd() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inner.createBannerAd();
        });
    }
}
exports.MySdk = MySdk;
