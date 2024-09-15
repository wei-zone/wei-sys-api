/**
 * @Author: forguo
 * @Date: 2023/9/24 20:09
 * @Description: errHandle.ts
 */
import { Context } from 'koa'
import { IResponse, RES_CODE, RES_MESSAGE } from '@/constant'

export default () => {
    return (ctx: Context, next: () => any) => {
        // 拦截用户非法请求
        return next().catch((err: any = {}) => {
            console.log('err catch -->', JSON.stringify(err))
            const message = err?.response?.data?.error?.message || ''
            const res: IResponse = {
                code: err?.errCode || err?.errcode || err?.code || err?.status || RES_CODE.COMMFAIL,
                message: err.errmsg || err?.message || message || RES_MESSAGE.COMMFAIL,
                data: err.data || err
            }
            ctx.fail(res)
        })
    }
}
