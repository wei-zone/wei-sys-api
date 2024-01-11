import Router from '@koa/router'
import upload from './upload'

const route = new Router({
    prefix: '/common'
})

route.use(upload.routes()).use(upload.allowedMethods())

export default route
