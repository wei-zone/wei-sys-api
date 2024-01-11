import Router from '@koa/router'
import weapp from './weapp/index'
import common from './common/index'

const route = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here
route.use(weapp.routes())
route.use(weapp.allowedMethods())
route.use(common.routes())
route.use(common.allowedMethods())

export default route
