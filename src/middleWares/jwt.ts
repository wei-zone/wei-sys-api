/**
 * @Description: jwt登录鉴权
 * @author: forguo
 * @date: 2020/7/28
 */

import JWT from 'koa-jwt'
import config from '../config'
const {
    MIN_APP: { JWT_SECRET }
} = config
/**
 *  定义公共的路径，不需要jwt鉴权
 */
const jwt = JWT({
    secret: JWT_SECRET
}).unless({
    // 该prefix下的不做校验，【授权接口】
    path: [
        /^favicon.png/,
        /^\/favicon.png/,
        /^favicon.ico/,
        /^\/favicon.ico/,
        /^\/api-docs/,
        /^\/api-docs.json/,
        /^\/v1\/common/,
        /^\/v1\/weapp\/jssdk/
    ]
})
export default jwt
