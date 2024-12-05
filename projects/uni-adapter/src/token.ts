export function getAccessToken(): Promise<string | null> {
    const key = import.meta.env.VITE_API_ACCESS_TOKEN;
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

export function setAccessToken(token: string): Promise<boolean> {
    const key = import.meta.env.VITE_API_ACCESS_TOKEN;
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

export function getRefreshToken(): Promise<string | null> {
    const key = import.meta.env.VITE_API_REFRESH_TOKEN;
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
    const key = import.meta.env.VITE_API_REFRESH_TOKEN;
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
