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
exports.AdSenseSdk = void 0;
//* 谷歌平台 */
const browserSdk_1 = require("./browserSdk");
class AdSenseSdk extends browserSdk_1.BrowserSdk {
    initialize(_a) {
        return __awaiter(this, arguments, void 0, function* ({ adSenseId }) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.async = true;
                script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`;
                script.crossOrigin = 'anonymous';
                // 将 script 元素插入到文档中
                document.body.appendChild(script);
                script.onload = function () {
                    // @ts-ignore
                    window.adsbygoogle = window.adsbygoogle || [];
                    // @ts-ignore
                    window.adBreak = function (o) {
                        // @ts-ignore
                        adsbygoogle.push(o);
                    };
                    // @ts-ignore
                    window.adConfig = function (o) {
                        // @ts-ignore
                        adsbygoogle.push(o);
                    };
                    // @ts-ignore
                    window.adConfig({
                        sound: 'on',
                        preloadAdBreaks: 'on',
                        onReady: () => {
                            console.log("AdSense onReady");
                        },
                    });
                    resolve(true);
                    // 可以在这里初始化广告
                };
                script.onerror = function (err) {
                    resolve(false);
                };
            });
        });
    }
    createRewardedVideoAd(adInfo) {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            window["adBreak"] && window["adBreak"]({
                // ad shows at start of next level
                type: 'reward',
                name: 'restart-game',
                beforeAd: () => {
                    console.log("激励视频开始播放");
                },
                // You may also want to mute the game's sound.
                afterAd: () => {
                    //关闭，观看完成都会走这里
                    console.log("激励视频播放结束");
                },
                // resume the game flow.
                // @ts-ignore
                beforeReward: (showAdFn) => {
                    showAdFn && showAdFn();
                },
                adDismissed: () => {
                    console.log("中途关闭广告");
                },
                adViewed: () => {
                    //google建议设置状态码，在afterAd中处理奖励逻辑
                    console.log("玩家完整看完广告");
                },
                adBreakDone: () => {
                    //Always called (if provided) even if an ad didn't show（始终调用，即使广告展示失败了）
                }
            });
        });
    }
}
exports.AdSenseSdk = AdSenseSdk;
