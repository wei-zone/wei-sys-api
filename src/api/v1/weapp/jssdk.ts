import Router from '@koa/router'
import { Context } from 'koa'

const route = new Router({
    prefix: '/jssdk' // 路由前缀
})

route.get('/', (context: Context) => {
    context.send({
        data: 'Hello jssdk!',
        code: 201
    })
})

route.post('/', (context: Context) => {
    context.send({
        data: 'Hello jssdk!',
        code: 201
    })
})

export default route
