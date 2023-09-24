import Router from '@koa/router'
import weapp from './weapp/index'

const route = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here
route.use(weapp.routes())
route.use(weapp.allowedMethods())

export default route
