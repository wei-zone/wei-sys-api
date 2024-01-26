/**
 * @Author: forguo
 * @Date: 2021/8/9 12:12
 * @Description: util.js
 */
import chalk from 'chalk'
import { request } from '@/libs'
import config from '@/config'
import crypto from 'crypto'
const { MIN_APP } = config
const { APP_ID, APP_SECRET } = MIN_APP

export interface IMinUser {
    openid: string
    session_key: string
}

export class WXBizDataCrypt {
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
 * @desc 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。更多使用方法详见 小程序登录。
 */
export const code2Session = function (code) {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = await request({
                // 云托管需要http
                url: `http://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`,
                method: 'get'
            })
            if (!res.errcode) {
                resolve(res)
            } else {
                reject(res)
            }
        } catch (e) {
            reject(e)
        }
    })
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
        const pc = new WXBizDataCrypt(appId, session_key)
        const data = pc.decryptData(encryptedData, iv)
        console.log(chalk.green('decryptData --->'), data)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
}
