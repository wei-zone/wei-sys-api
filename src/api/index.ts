import Router from '@koa/router'
import v1 from './v1/index'
import { Context } from 'koa'

const route = new Router({
    // Current folder
    prefix: '/'
})

route.all('/', (context: Context) => {
    context.send({
        data: 'Hello Koa!',
        code: 201
    })
})

// Mount sub-routes here
route.use(v1.routes())
route.use(v1.allowedMethods())

export default route
