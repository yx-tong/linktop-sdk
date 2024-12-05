// @ts-ignore
import * as CryptoJS from "crypto-js"

export function wechatDecryptData(encryptedData: string, iv: string, sessionKey: string): string {
    // Base64 解码
    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
    const keyBytes = CryptoJS.enc.Base64.parse(sessionKey);
    const ivBytes = CryptoJS.enc.Base64.parse(iv);
    // 使用 AES-128-CBC 解密
    const decryptedBytes = CryptoJS.AES.decrypt(
        // @ts-ignore
        {
            ciphertext: encryptedBytes,
        },
        keyBytes, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: ivBytes,
        });
    return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
}