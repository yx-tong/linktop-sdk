import {getAccessToken} from "./token";

declare const API_HOST: string;
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
            fail: (err) => {
                console.error(err);
                resolve(null)
            }
        })
    )
}

export async function apiRequest<T>(method: Method, endpoint: string, data: any): Promise<T | null> {
    const result: any = await uniRequest(method, `${API_HOST}${endpoint}`, data);
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