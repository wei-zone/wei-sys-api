/**
 * @author: forguo
 * @description: rest
 */
import { Context, Next } from 'koa'
import { IResponse, RES_CODE, RES_MESSAGE } from '@/constant'
import { successLogger, errorLogger } from '@/libs'

// 处理请求成功方法
const render = (context: Context) => {
    // 返回一个 function
    return ({ code = RES_CODE.SUCCESS, message = RES_MESSAGE.SUCCESS, data, success = true }: IResponse) => {
        context.response.type = 'application/json'
        const response: IResponse = {
            code,
            message,
            success,
            serverTime: Date.now()
        }
        if (data) {
            response.data = data
        }
        context.body = response
        if (code === RES_CODE.SUCCESS) {
            successLogger(context, response)
        } else {
            errorLogger(context, response)
        }
    }
}

// 处理请求失败方法
const renderFail = (context: Context) => {
    // 返回一个 function
    return ({ code = RES_CODE.COMMFAIL, message = RES_MESSAGE.COMMFAIL, data }: IResponse) => {
        context.success({
            code,
            message,
            data,
            success: false
        })
    }
}

export default () => {
    return async (context: Context, next: Next) => {
        // 返回一个 function，在 controller 中执行
        context.success = render(context)
        context.fail = renderFail(context)
        context.requestTime = Date.now()
        await next()
    }
}
