/**
 * @Description: 集成中间件
 * @author: forguo
 */

import koaHelmet from 'koa-helmet'
import logger from 'koa-logger'
// eslint-disable-next-line node/no-unpublished-import
import compose from 'koa-compose'
import cors from './cors'
import rest from './rest'

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    logger(),
    cors,
    // Add Koa-Helmet headers (https://github.com/venables/koa-helmet)
    koaHelmet(),
    rest()
])

export default middleware
