/**
 * @Author: forguo
 * @Date: 2023/9/24 17:48
 * @Description: config
 */

export const env = process.env.NODE_ENV || 'development'
import development from './config.dev'
import production from './config.pro'

const configs: any = {
    development,
    production
}

// 通用配置
const common = {
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    dayFormat: 'YYYY-MM-DD'
}

const config = {
    ...common,
    ...configs[env]
}

export default config
export * from './swagger'
