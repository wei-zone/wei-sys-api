/**
 * @Description: 集成中间件
 * @author: forguo
 */

import helmet from 'koa-helmet'
import logger from 'koa-logger'
import compose from 'koa-compose'
import json from 'koa-json'
import path from 'path'
import { koaSwagger } from 'koa2-swagger-ui'
import koaBody from './koaBody'

import cors from './cors'
import rest from './rest'
import errHandle from './errHandle'

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    require('koa-static')(path.join(__dirname, '../public/')), // 静态资源
    // security headers (https://github.com/venables/koa-helmet)
    // helmet({
    //     // 本地为false，否则 swagger 报错，
    //     // Refused to load the script 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.21.0/swagger-ui-bundle.js' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.
    //     contentSecurityPolicy: false
    // }),
    logger(),
    cors(),
    json(),
    koaBody(),
    rest(),
    errHandle(),
    koaSwagger({
        routePrefix: '/api-docs', // 接口文档访问地址
        swaggerOptions: {
            url: './api-docs.json' // example path to json 其实就是之后swagger-jsdoc生成的文档地址
        }
    })
])

export default middleware
