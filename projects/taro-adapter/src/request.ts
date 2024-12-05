import {getAccessToken} from "./token";

type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

async function uniRequest(method: Method, url: string, body: any) {
    let headers: any = {
        'Content-Type': 'application/json; charset=utf-8',
    };
    const token = await getAccessToken();
    if (token != null) {
        headers.Authorization = token
    }
    return new Promise(
        (resolve, reject) => uni.request({
            url: url,
            method: method,
            header: headers,
            data: body,
            success: (res) => {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(null)
                }
            },
            fail: () => {
                resolve(null)
            }
        })
    )
}

export async function apiRequest<T>(method: Method, endpoint: string, data: any): Promise<T | null> {
    const host = process.env.TARO_APP_API_HOST;
    const path = endpoint.replace(/^\/+/, "")
    const result: any = await uniRequest(method, `${host}/${path}`, data);
    if (result == null) {
        return null;
    }
    if (result.code < 0) {
        console.error(result.message);
        return null;
    } else {
        return result.data;
    }
}