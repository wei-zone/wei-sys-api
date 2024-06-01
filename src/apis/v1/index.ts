import Router from '@koa/router'
import common from './common/index'
import weapp from './weapp/index'
import minapp from './minapp/index'
import { Context } from 'koa'
import { randomUUID } from 'node:crypto'

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

route.get('/login', async (context: Context) => {
    context.success({
        data: {
            ...context.request.query,
            token: randomUUID()
        }
    })
})

route.post('/login', async (context: Context) => {
    context.success({
        data: {
            ...context.request.body,
            token: randomUUID()
        }
    })
})

export default route
