import * as log4js from 'log4js'

import { log4Config } from '../config'
import dayjs from 'dayjs'

// 加载配置文件
log4js.configure(log4Config as any)

export const error = log4js.getLogger('error')
export const info = log4js.getLogger('info')
export const debug = log4js.getLogger('debug')
export const debugLogger = {
    log: (message: any, data: any) => {
        debug.log(message + '\n' + JSON.stringify(data) + '\n')
    },
    debug: (message: any, data: any) => {
        debug.debug(message + '\n' + JSON.stringify(data) + '\n')
    },
    info: (message: any, data: any) => {
        debug.info(message + '\n' + JSON.stringify(data) + '\n')
    },
    warn: (message: any, data: any) => {
        debug.warn(message + '\n' + JSON.stringify(data) + '\n')
    },
    error: (message: any, data: any) => {
        debug.error(message + '\n' + JSON.stringify(data) + '\n')
    }
}

// 保存原始的 console 对象
const originalConsole = { ...console }

// 重写这些方法
const logFun = ['log', 'debug', 'info', 'warn', 'error']

logFun.forEach((method: string) => {
    console[method] = function (...args) {
        originalConsole[method](...args)
        if (args.length <= 2) {
            if (args.length === 1) {
                debugLogger[method](method, ...args)
            } else {
                debugLogger[method](...args)
            }
        }
    }
})

// 测试新的 log 和 warn 方法
// console.log('This is a log message')
// console.debug('This is a debug message')
// console.info('This is a info message')
// console.warn('This is a warn message')
// console.error('This is a error message')

// 封装错误日志
export const errorLogger = function (ctx: any, data: any) {
    if (ctx && data) {
        error.level = 'error'
        debug.info(formatError(ctx, data))
        error.error(formatError(ctx, data))
    }
}

// 封装响应日志
export const successLogger = function (ctx: any, data: any) {
    if (ctx) {
        info.level = 'info'
        debug.info(formatRes(ctx, data))
        info.info(formatRes(ctx, data))
    }
}

// 格式化请求日志
const formatReqLog = function (req: any, requestTime: any) {
    let logText = String()

    const method = req.method
    //请求原始地址
    logText += 'request    url: ' + req.originalUrl + '\n'

    //访问方法
    logText += 'request method: ' + method + '\n'

    //客户端ip
    logText += 'request client: ' + req.ip + '\n'

    // 请求时间
    logText += 'request   time: ' + dayjs(requestTime).format('YYYY-MM-DD HH:mm:ss') + '\n'

    // 请求时间
    logText += 'response  time: ' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '\n'

    // 请求参数
    if (method === 'GET') {
        logText += 'request  query: ' + JSON.stringify(req.query) + '\n'
    } else {
        logText += 'request   body: ' + '\n' + JSON.stringify(req.body) + '\n'
    }
    return logText
}
// 格式化响应日志
const formatRes = function (ctx: any, data: any) {
    let logText = String(ctx.request.originalUrl + '\n')

    //添加请求日志
    logText += formatReqLog(ctx.request, ctx.requestTime)

    //响应内容
    logText += 'response data : ' + '\n' + JSON.stringify(data) + '\n'

    return logText
}

//格式化错误日志
const formatError = function (ctx: any, err: any) {
    let logText = String(ctx.request.originalUrl + '\n')

    //添加请求日志
    logText += formatReqLog(ctx.request, ctx.requestTime)

    //错误信息
    logText += 'response error : ' + '\n' + JSON.stringify(err) + '\n'

    return logText
}
