/**
 * log4js config
 */

import path from 'path'

// 错误日志输出完整路径
const errorLogPath = path.resolve(__dirname, '../public/logs/error/error')
// 响应日志输出完整路径
const infoLogPath = path.resolve(__dirname, '../public/logs/info/info')

export const log4Config = {
    appenders: {
        console: { type: 'console' },
        info: {
            type: 'file', // 日志类型
            filename: infoLogPath, // 日志输出位置
            alwaysIncludePattern: true, // 是否总是有后缀名
            pattern: 'yyyy-MM-dd.log' // 后缀，每天创建一个新的日志文件
        },
        error: {
            type: 'dateFile',
            filename: errorLogPath,
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd.log'
        }
    },
    categories: {
        default: {
            // 只记录控制台
            appenders: ['console'],
            level: 'debug'
        },
        info: {
            // 只记录日志
            appenders: ['info'],
            level: 'info'
        },
        error: {
            // 同时记录日志和控制台
            appenders: ['error', 'console'],
            level: 'error'
        }
    }
}
