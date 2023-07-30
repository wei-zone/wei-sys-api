import Router from '@koa/router'
import v1 from './v1/route'

const route = new Router({
    // Current folder
    prefix: '/api'
})

// Mount sub-routes here
route.use(v1.routes())
route.use(v1.allowedMethods())

export default route
