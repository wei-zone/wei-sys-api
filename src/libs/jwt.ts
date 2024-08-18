import jsonwebtoken from 'jsonwebtoken'
import { Context, Next } from 'koa'
import config from '@/config'
const { ADMIN_APP } = config
/**
 * jwt 中间件
 * @param context
 * @param next
 * @returns
 */
export const jwtVerify = async (context: any, next: Next) => {
    const url = context.request.originalUrl
    // 白名单
    const unless = [/^\/v1\/admin\/common/, /^\/v1\/admin\/auth\/login/]
    if (unless.some(item => item.test(url))) {
        return next()
    }
    const token: any = context.request.headers?.authorization?.split(' ')?.[1]
    jsonwebtoken.verify(token, ADMIN_APP.JWT_SECRET)
    await next()
}

/**
 * 获取 jwt 信息
 * @param context
 * @returns
 */
export const getJwtInfo = (
    context: Context
): {
    id: number
    username: string
    role: string
    exp: number
    iat: number
} => {
    const token: any = context.request.headers?.authorization?.split(' ')?.[1]
    const user: any = jsonwebtoken.verify(token, ADMIN_APP.JWT_SECRET)
    console.log('jwt info', user)
    return user || {}
}
