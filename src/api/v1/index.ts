import Router from '@koa/router'
import hello from './hello/index'

const index = new Router({
    // Current folder
    prefix: '/v1'
})

// Mount sub-routes here
index.use(hello.routes())
index.use(hello.allowedMethods())

export default index
