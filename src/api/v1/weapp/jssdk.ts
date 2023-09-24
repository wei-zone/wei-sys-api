import Router from '@koa/router'
import { Context } from 'koa'
import controller from '../../../controllers/weapp/jssdk'

const route = new Router({
    prefix: '/jssdk' // 路由前缀
})

route.get('/', async (context: Context) => {
    await controller.configSdk(context)
})

route.post('/', async (context: Context) => {
    await controller.configSdk(context)
})

export default route
