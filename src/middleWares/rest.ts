/**
 * @author: forguo
 * @description: rest
 */
import { Context, Next } from 'koa'
import { IResponse } from '@/types/response'
import { successLogger, errorLogger } from '@/libs'

// 处理请求成功方法
const render = (context: Context) => {
    // 返回一个 function
    return ({ code = 200, message = 'success', data, success = true }: IResponse) => {
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
        code === 200 ? successLogger(context, response) : errorLogger(context, response)
        context.body = response
    }
}

// 处理请求失败方法
const renderFail = (context: Context) => {
    // 返回一个 function
    return ({ code = -1, message = 'error', data }: IResponse) => {
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
