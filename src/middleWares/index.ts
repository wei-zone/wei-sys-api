/**
 * @Description: 集成中间件
 * @author: forguo
 */

import koaHelmet from 'koa-helmet'
import logger from 'koa-logger'
import compose from 'koa-compose'
import cors from './cors'
import rest from './rest'

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    require('koa-static')(__dirname + '/../public'), // 静态资源
    logger(),
    cors,
    // Add Koa-Helmet headers (https://github.com/venables/koa-helmet)
    koaHelmet(),
    rest()
])

export default middleware
