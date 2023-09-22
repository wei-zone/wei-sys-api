import Router from '@koa/router'
import v1 from './v1/index'
import { Context } from 'koa'

const index = new Router({
    // Current folder
    prefix: '/api'
})

index.all('/', (context: Context) => {
    context.send({
        data: 'Hello Koa!',
        code: 201
    })
})

// Mount sub-routes here
index.use(v1.routes())
index.use(v1.allowedMethods())

export default index
