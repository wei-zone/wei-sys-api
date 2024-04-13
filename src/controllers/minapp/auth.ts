/**
 * @Author: forguo
 * @Date: 2024/1/6 16:25
 * @Description: auth.ts
 */

import jsonWebToken from 'jsonwebtoken'
import { code2Session, decryptData } from '@/libs/minapp'
import { cloud } from '@/libs'
import config from '@/config'
import { Context } from 'koa'

const { MIN_APP } = config
const { APP_ID, JWT_SECRET, JWT_EXPIRES_IN } = MIN_APP

class Controller {
    /**
     * 更新用户信息
     * @return {Promise<unknown>}
     */
    updateUserInfo(ctx, userId, userInfo = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const lastLoginIp = ctx.headers['x-forwarded-for'] // 客户端 IPv4 或IPv6 地址 【云托管容器内微信信息 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/container/wxinfo.html】
                // 根据文档id查询
                const userList = await cloud.getOne('map_users', userId)
                if (userList?.data?.length <= 0) {
                    const res = await cloud.add('map_users', {
                        ...userInfo,
                        _id: userId,
                        userId,
                        userRole: 0,
                        lastLoginIp
                    })
                    console.log('add user --->', res)
                    resolve({
                        ...userInfo,
                        userId
                    })
                } else {
                    // 更新用户信息
                    const res = await cloud.update(
                        'map_users',
                        {
                            ...userInfo,
                            lastLoginIp
                        },
                        userId
                    )
                    console.log('update user --->', res)
                    resolve({
                        ...userInfo,
                        userId
                    })
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * @description 微信授权
     * @param ctx
     * @return {Promise<void>}
     */
    async login(ctx: Context): Promise<void> {
        try {
            const { code = '' } = ctx.request.query
            if (!code) {
                ctx.throw({
                    code: 457,
                    message: 'code不合法'
                })
            }
            const res: any = await code2Session(code)
            const { openid: userId, session_key } = res
            const token = jsonWebToken.sign(
                {
                    userId
                    // session_key 暂时用不到，解析用户信息才需要
                },
                JWT_SECRET,
                {
                    expiresIn: JWT_EXPIRES_IN
                }
            )
            await this.updateUserInfo(ctx, userId)
            ctx.success({
                data: {
                    token,
                    expiresIn: Date.now() + JWT_EXPIRES_IN * 1000, // 返回token过期时间，多少毫秒过后，存储于客户端
                    userId
                }
            })
        } catch (e: any) {
            ctx.throw(e)
        }
    }

    /**
     * @description 获取用户信息
     * @param ctx
     * @return {Promise<void>}
     */
    async getUserInfo(ctx) {
        try {
            // 获取请求头token
            const token = (ctx.header.authorization || '').split(' ')[1]
            // 校验并解密token携带数据
            const userData = await jsonWebToken.verify(token, JWT_SECRET)

            // 获取openId
            const { userId, session_key } = userData
            const { encryptedData, iv } = ctx.request.body
            const data = await decryptData(APP_ID, session_key, encryptedData, iv)
            await this.updateUserInfo(ctx, userId, data)
            const userList = await cloud.getOne('map_users', userId)
            const user = userList.data[0]
            ctx.success({
                data: user
            })
        } catch (e) {
            ctx.throw(e)
        }
    }

    /**
     * @description 获取手机号
     * @param ctx
     * @return {Promise<void>}
     */
    async getUserMobile(ctx) {
        try {
            // 获取请求头token
            const token = (ctx.header.authorization || '').split(' ')[1]
            // 校验并解密token携带数据
            const userData = await jsonWebToken.verify(token, JWT_SECRET)

            // 获取openId
            const { userId, session_key } = userData

            const { encryptedData, iv } = ctx.request.body
            const data = await decryptData(APP_ID, session_key, encryptedData, iv)
            await this.updateUserInfo(ctx, userId, data)
            ctx.success({
                data: {
                    ...data,
                    userId
                }
            })
        } catch (e) {
            ctx.throw(e)
        }
    }
}

export default new Controller()
