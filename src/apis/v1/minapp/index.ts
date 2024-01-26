import Router from '@koa/router'
import auth from './auth'

const route = new Router({
    prefix: '/minapp'
})

route.use(auth.routes()).use(auth.allowedMethods())

export default route
