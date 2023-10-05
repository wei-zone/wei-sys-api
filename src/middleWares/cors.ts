import { Context, Next } from 'koa'
import chalk from 'chalk'
import dayjs from 'dayjs'
const cors = async (context: Context, next: Next) => {
    /**
     * 设置跨域
     */
    context.compress = false
    context.set('Access-Control-Allow-Origin', context.origin as string)
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
        console.log(chalk.gray(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`))
    }
    await next()
}

export default cors
