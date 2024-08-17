import Router from '@koa/router'
import user from './user'
import auth from './auth'
import menu from './menu'
import dept from './dept'
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
route.use(user.routes()).use(user.allowedMethods())
route.use(auth.routes()).use(auth.allowedMethods())
route.use(menu.routes()).use(menu.allowedMethods())
route.use(dept.routes()).use(dept.allowedMethods())
route.use(stats.routes()).use(stats.allowedMethods())

export default route
