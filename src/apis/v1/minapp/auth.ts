import Router from '@koa/router'
import { Context } from 'koa'
import controller from '@/controllers/minapp/auth'

const route = new Router({
    prefix: '/auth' // 路由前缀
})

/**
 * 静默登录
 */
route.get('/login', async (context: Context) => {
    await controller.login(context)
})

export default route
