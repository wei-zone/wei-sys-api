import * as log4js from 'log4js'

import { log4Config } from '@/config'

// 加载配置文件
log4js.configure(log4Config as any)

const logUtil: any = {}

const errorLogger = log4js.getLogger('error')
const successLogger = log4js.getLogger('info')

// 封装错误日志
logUtil.logError = function (ctx: any, error: any, resTime: any) {
    if (ctx && error) {
        successLogger.level = 'error'
        errorLogger.error(formatError(ctx, error, resTime))
    }
}

// 封装响应日志
logUtil.logSuccess = function (ctx: any, data: any, resTime: any) {
    if (ctx) {
        successLogger.level = 'info'
        successLogger.info(formatRes(ctx, data, resTime))
    }
}

//格式化请求日志
const formatReqLog = function (req: any, resTime: any) {
    let logText = String()

    const method = req.method
    //访问方法
    logText += 'request method: ' + method + '\n'

    //请求原始地址
    logText += 'request originalUrl:  ' + req.originalUrl + '\n'

    //客户端ip
    logText += 'request client ip:  ' + req.ip + '\n'

    //开始时间
    // 请求参数
    if (method === 'GET') {
        logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
        // startTime = req.query.requestStartTime;
    } else {
        logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n'
        // startTime = req.body.requestStartTime;
    }
    // 服务器响应时间
    logText += 'response time: ' + resTime + '\n'
    return logText
}
// 格式化响应日志
const formatRes = function (ctx: any, data: any, resTime: any) {
    let logText = String()

    //响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n'

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime)

    //响应内容
    logText += 'response data: ' + '\n' + JSON.stringify(data) + '\n'

    //响应日志结束
    logText += '*************** response log end ***************' + '\n'

    return logText
}

//格式化错误日志
const formatError = function (ctx: any, err: any, resTime: any) {
    let logText = String()

    //错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n'

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime)

    //错误信息
    logText += 'err data: ' + '\n' + JSON.stringify(err) + '\n'

    //错误信息结束
    logText += '*************** error log end ***************' + '\n'

    return logText
}

export default logUtil
