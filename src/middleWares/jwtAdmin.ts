import jsonwebtoken from 'jsonwebtoken'
import { DefaultState, Next } from 'koa'
import config from '@/config'
import { RES_CODE } from '@/constant'
const { ADMIN_APP } = config

/**
 * jwt 中间件
 * @param context
 * @param next
 * @returns
 */
export const jwt = () => {
    return async (context: DefaultState, next: Next) => {
        try {
            const url = context.request.originalUrl
            // 白名单
            const unless = [
                /^\/v1\/admin\/common/,
                /^\/v1\/admin\/auth\/login/,
                /^\/v1\/admin\/auth\/captcha/ // captcha
            ]
            if (unless.some(item => item.test(url))) {
                return next()
            }
            const token: any = context.request.headers?.authorization?.split(' ')?.[1]
            jsonwebtoken.verify(token, ADMIN_APP.JWT_SECRET)
            await next()
        } catch (error) {
            console.log('jwt error')
            context.throw(RES_CODE.TOKEN_INVALID, error)
            await next()
        }
    }
}
