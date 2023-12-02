/**
 * @Author: forguo
 * @Date: 2023/9/24 20:09
 * @Description: errHandle.ts
 */
import { Context } from 'koa'
import { IResponse } from '../@types'
import chalk from 'chalk'

export default () => {
    return (ctx: Context, next: () => any) => {
        // 拦截用户非法请求
        return next().catch((err: any = {}) => {
            console.error(chalk.gray('err ---'), chalk.red(JSON.stringify(err)))
            const message = err?.response?.data?.error?.message || ''
            const res: IResponse = {
                code: err?.errCode || err?.errcode || err?.code || err?.status || 500,
                message: err.errmsg || err?.message || message || '服务器开小差了，请稍后再试~',
                data: err.data || err
            }
            ctx.fail(res)
        })
    }
}
