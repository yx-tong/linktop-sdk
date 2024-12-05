import {apiRequest} from "../request";

function wechatLoginCode(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'weixin',
            success: (res) => {
                resolve(res.code);
            },
            fail: () => {
                reject(undefined);
            }
        });
    });
}

export async function wechatLoginRequest(endpoint: string, data?: Record<string, unknown>) {
    uni.showLoading({
        title: '正在登陆'
    });
    const code = await wechatLoginCode();
    if (code === undefined) {
        return null;
    }
    const result = await apiRequest('POST', endpoint, {
        code: code,
        ...(data || {})
    });
    uni.hideLoading();
    return result;
}
