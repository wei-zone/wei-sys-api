import Router from '@koa/router'
import user from './user'
import auth from './auth'

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

export default route
