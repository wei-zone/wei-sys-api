/**
 * @author: forguo
 * @description: rest
 */
import { Context, Next } from 'koa'
import { IResponse } from '../@types'

// 处理请求成功方法
const render = (context: Context) => {
    return ({ code = 200, message = 'success', data }: IResponse) => {
        context.response.type = 'application/json'
        const response: IResponse = {
            code,
            message,
            success: code.toString().startsWith('2'),
            serverTime: Date.now()
        }
        if (data) {
            response.data = data
        }
        context.body = response
    }
}

// 处理请求失败方法
const renderFail = (context: Context) => {
    return ({ code = -1, message = 'error', data }) => {
        context.send({
            code,
            message,
            data
        })
    }
}

export default () => {
    return async (context: Context, next: Next) => {
        context.send = render(context)
        context.fail = renderFail(context)
        await next()
    }
}