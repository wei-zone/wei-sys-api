/**
 * @Author: forguo
 * @Date: 2021/8/5 15:23
 * @Description: sdk.js
 */

import cache from 'memory-cache' // 缓存
import { createNonceStr, createTimestamp, raw, request, sha1 } from '@/libs'
import config from '@/config'
import { Context } from 'koa' // 配置
const { OFFICE_APP } = config
const { APP_ID, SECRET } = OFFICE_APP

export interface IRet {
    jsapi_ticket: string
    nonceStr: string
    timestamp: string
    url: string
    signature?: string
    appId?: string
}
class Controller {
    /**
     * @description 获取access_token访问令牌
     * @return {Promise}
     */
    async accessToken() {
        try {
            // 先判断缓存中是否存在access_token
            const cacheAccessToken = cache.get('accessToken')
            if (!cacheAccessToken) {
                // 如果 access_token 不存在则将请求结果保存进缓存
                const res: any = await request({
                    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${SECRET}`,
                    method: 'get'
                })
                if (!res.errcode) {
                    // 缓存access_token
                    cache.put('accessToken', res.access_token, (res.expires_in - 200) * 1000) // 缓存access_token
                    return Promise.resolve(res.access_token)
                } else {
                    return Promise.reject(res)
                }
            } else {
                // 返回缓存中的access_token
                return Promise.resolve(cacheAccessToken)
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * @description 获取jsapi_ticket临时票据
     * @return {Promise}
     */
    async jsapiTicket(): Promise<string> {
        try {
            const cacheTicket = cache.get('ticket')
            // 先判断缓存中是否存在ticket
            if (!cacheTicket) {
                // 如果 ticket 不存在则将请求结果保存进缓存
                const accessToken = await this.accessToken()

                const res: any = await request({
                    url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`,
                    method: 'get'
                })
                if (!res.errcode) {
                    // 缓存ticket
                    cache.put('ticket', res.ticket, (res.expires_in - 200) * 1000)
                    return Promise.resolve(res.ticket)
                } else {
                    return Promise.reject(res)
                }
            } else {
                return Promise.resolve(cacheTicket)
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * @description 返回微信sdk配置信息
     * @param url 页面路径
     * @return {Promise}
     */
    async generateConfig(url) {
        try {
            const res = await this.jsapiTicket()
            const ret: IRet = {
                jsapi_ticket: res,
                nonceStr: createNonceStr(),
                timestamp: createTimestamp(),
                url: decodeURIComponent(url)
            }
            const string = raw(ret)
            ret.signature = sha1(string)
            ret.appId = APP_ID
            return Promise.resolve(ret)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * @description 获取微信sdk配置信息
     * @param ctx
     */
    async configSdk(ctx: Context) {
        const method = ctx.request.method || 'GET'
        let params: any = {}
        if (method === 'GET') {
            params = ctx.query
        }
        if (method === 'POST') {
            params = ctx.body
        }
        const { url } = params
        if (!url) {
            ctx.fail({
                code: -1,
                message: '参数不能为空'
            })
            return false
        }
        try {
            const res = await this.generateConfig(url)
            ctx.send({
                data: res
            })
        } catch (e) {
            throw e
        }
    }
}

export default new Controller()
