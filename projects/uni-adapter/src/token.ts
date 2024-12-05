declare const API_ACCESS_TOKEN: string;
declare const API_REFRESH_TOKEN: string;

export function getRefreshToken(): Promise<string | null> {
    return new Promise(
        (resolve, reject) => {
            uni.getStorage({
                key: API_REFRESH_TOKEN,
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
    return new Promise(
        (resolve, reject) => {
            uni.setStorage({
                key: API_REFRESH_TOKEN,
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

export function getAccessToken(): Promise<string | null> {
    return new Promise(
        (resolve, reject) => {
            uni.getStorage({
                key: API_ACCESS_TOKEN,
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

export function setAccessToken(token: string): Promise<boolean> {
    return new Promise(
        (resolve, reject) => {
            uni.setStorage({
                key: API_ACCESS_TOKEN,
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