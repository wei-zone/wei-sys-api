import Router from '@koa/router'
import common from './common/index'
import weapp from './weapp/index'
import minapp from './minapp/index'

const route = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here

route.use(common.routes())
route.use(common.allowedMethods())
route.use(weapp.routes())
route.use(weapp.allowedMethods())
route.use(minapp.routes())
route.use(minapp.allowedMethods())

export default route
