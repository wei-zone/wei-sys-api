/**
 * @Description: 集成中间件
 * @author: forguo
 */

import helmet from 'koa-helmet'
import logger from 'koa-logger'
import compose from 'koa-compose'
import cors from './cors'
import rest from './rest'
import errHandle from './errHandle'

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    require('koa-static')(__dirname + '/../public'), // 静态资源
    // security headers (https://github.com/venables/koa-helmet)
    helmet(),
    logger(),
    cors,
    rest(),
    errHandle
])

export default middleware
