import Router from '@koa/router'
import admin from './admin/index'
import common from './common/index'
import minapp from './minapp/index'
import weapp from './weapp/index'

const route = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here
route.use(admin.routes()).use(admin.allowedMethods())
route.use(common.routes()).use(common.allowedMethods())
route.use(minapp.routes()).use(minapp.allowedMethods())
route.use(weapp.routes()).use(weapp.allowedMethods())

export default route
