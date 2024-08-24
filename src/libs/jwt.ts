import jsonwebtoken from 'jsonwebtoken'
import { Context } from 'koa'
import config from '@/config'
const { ADMIN_APP } = config

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
    console.log('jwt user info', user)
    return user || {}
}
