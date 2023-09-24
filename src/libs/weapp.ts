/**
 * @Author: forguo
 * @Date: 2023/9/24 16:52
 * @Description: 微信用户信息解密
 */
import crypto from 'crypto'
import chalk from 'chalk'

export class Weapp {
    appId: string
    sessionKey: string

    constructor(appId: string, sessionKey: string) {
        this.appId = appId
        this.sessionKey = sessionKey
    }

    decryptData(encryptedData: string, iv: string) {
        // base64 decode
        const encoding = 'base64'
        const sessionKey = new Buffer(this.sessionKey, encoding)
        const data: unknown = new Buffer(encryptedData, encoding)
        const ivData = new Buffer(iv, encoding)

        // 解密
        let decodedRes: any = null

        try {
            // 解密
            const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, ivData)
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)
            const decoded: string = decipher.update(data as string, 'binary', 'utf8')
            const decodedFinal: string = decoded + decipher.final('utf8')
            decodedRes = JSON.parse(decodedFinal)
        } catch (err) {
            throw err
        }
        if (decodedRes?.watermark?.appid !== this.appId) {
            throw Error('Illegal Buffer')
        }
        return decodedRes
    }
}

/**
 * @description 微信用户信息解密
 * @param appId
 * @param session_key
 * @param encryptedData
 * @param iv
 */
export const decryptData = (appId: string, session_key: string, encryptedData: string, iv: string) => {
    try {
        const pc = new Weapp(appId, session_key)
        const data = pc.decryptData(encryptedData, iv)
        console.log(chalk.green('decryptData --->'), data)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
}
