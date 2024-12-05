import Taro from "@tarojs/taro";

export async function getAccessToken(): Promise<string | null> {
    const key = process.env.TARO_APP_API_ACCESS_TOKEN;
    if (key == undefined) {
        return null
    }
    return Taro.getStorage({key: key})
    .then(res => {
        return res.data
    })
    .catch(err => {
        return null
    })
}

export function setAccessToken(token: string): Promise<boolean> {
    const key = process.env.TARO_APP_API_ACCESS_TOKEN || "MISSING_ACCESS_TOKEN";
    return new Promise(
        (resolve, reject) => {
            Taro.setStorage({
                key: key,
                data: token,
                success: () => {
                    resolve(true);
                },
                fail: () => {
                    resolve(false);
                }
            });
        }
    )
}

export function getRefreshToken(): Promise<string | null> {
    const key = process.env.TARO_APP_API_REFRESH_TOKEN || "MISSING_REFRESH_TOKEN";
    return new Promise(
        (resolve, reject) => {
            uni.getStorage({
                key: key,
                success: (res) => {
                    resolve(res.data);
                },
                fail: () => {
                    resolve(null);
                }
            });
        }
    )
}

export function setRefreshToken(token: string): Promise<boolean> {
    const key = process.env.TARO_APP_API_REFRESH_TOKEN || "MISSING_REFRESH_TOKEN";
    return new Promise(
        (resolve, reject) => {
            uni.setStorage({
                key: key,
                data: token,
                success: () => {
                    resolve(true);
                },
                fail: () => {
                    resolve(false);
                }
            });
        }
    )
}
