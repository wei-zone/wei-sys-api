import Router from '@koa/router'
import auth from './auth'
import user from './user'
import role from './role'
import menu from './menu'
import dept from './dept'
import dict from './dict'
import log from './log'
import config from './config'
import stats from './stats'

const route = new Router({
    prefix: '/admin'
})

/**
 * @swagger
 * tags:
 *   - name: admin
 *     description: 管理端
 */
route.use(auth.routes()).use(auth.allowedMethods())
route.use(user.routes()).use(user.allowedMethods())
route.use(role.routes()).use(role.allowedMethods())
route.use(menu.routes()).use(menu.allowedMethods())
route.use(dept.routes()).use(dept.allowedMethods())
route.use(dict.routes()).use(dict.allowedMethods())
route.use(log.routes()).use(log.allowedMethods())
route.use(config.routes()).use(config.allowedMethods())
route.use(stats.routes()).use(stats.allowedMethods())

export default route
