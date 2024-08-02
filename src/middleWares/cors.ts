import { debugLogger } from '@/libs'
import { Context, Next } from 'koa'
export default () => {
    return async (context: Context, next: Next) => {
        /**
         * 设置跨域
         */
        context.compress = false
        context.set('Access-Control-Allow-Origin', '*')
        context.set(
            'Access-Control-Allow-Headers',
            'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
        )
        context.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
        // 允许跨域携带cookie
        context.set('Access-Control-Allow-Credentials', 'true')
        if (context.method === 'OPTIONS') {
            context.body = 200
        } else {
            debugLogger.info(`${context.request.originalUrl}`, context.request.body || context.request.query)
        }
        await next()
    }
}
