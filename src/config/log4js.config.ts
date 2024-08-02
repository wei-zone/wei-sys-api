/**
 * log4js config
 */

import path from 'path'

// 错误日志输出完整路径
const errorLogPath = path.resolve(__dirname, '../public/logs/error/error')
// 响应日志输出完整路径
const infoLogPath = path.resolve(__dirname, '../public/logs/info/info')
// debug输出完整路径
const debugLogPath = path.resolve(__dirname, '../public/logs/debug/debug')

export const log4Config = {
    appenders: {
        console: { type: 'console' },
        debug: {
            type: 'dateFile', // 日志类型
            filename: debugLogPath, // 日志输出位置
            alwaysIncludePattern: true, // 是否总是有后缀名
            pattern: 'yyyy-MM-dd.log' // 后缀，每天创建一个新的日志文件
        },
        info: {
            type: 'dateFile', // 日志类型
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
            // 同时记录日志和控制台
            appenders: ['debug', 'console'],
            level: 'debug'
        },
        info: {
            // 同时记录日志和控制台
            appenders: ['info', 'console'],
            level: 'info'
        },
        error: {
            // 同时记录日志和控制台
            appenders: ['error', 'console'],
            level: 'error'
        }
    }
}
