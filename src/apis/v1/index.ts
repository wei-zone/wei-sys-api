import Router from '@koa/router'
import common from './common/index'
import admin from './admin/index'

const route = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here

route.use(common.routes())
route.use(common.allowedMethods())
route.use(admin.routes())
route.use(admin.allowedMethods())

export default route
