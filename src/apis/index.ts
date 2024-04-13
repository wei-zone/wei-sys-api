import Router from '@koa/router'
import { Context } from 'koa'
import { swaggerSpec } from '@/config'
import { cloud } from '@/libs'
import v1 from './v1/index'

const route = new Router({
    // Current folder
})

route.all('/', async (ctx: Context) => {
    const res = await cloud.get('users', 1, 10, [{}])
    ctx.success({
        data: res,
        code: 201
    })
})

// 通过路由获取生成的注解文件
route.get('/api-docs.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
})

// Mount sub-routes here
route.use(v1.routes())
route.use(v1.allowedMethods())

export default route
