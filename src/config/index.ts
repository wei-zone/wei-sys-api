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
    TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    DAY_FORMAT: 'YYYY-MM-DD',
    env,
    host: 'cloud-app.com.cn'
}

const config = {
    ...common,
    ...configs[env]
}

export default config

/**
 * swagger 接口文档配置
 */
export * from './swagger'
