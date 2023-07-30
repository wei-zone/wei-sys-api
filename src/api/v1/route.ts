import Router from '@koa/router'
import hello from './hello.route'

const route = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here
route.use(hello.routes())
route.use(hello.allowedMethods())

export default route
