import Router from '@koa/router'
import { Context } from 'koa'
import * as controller from '@/controllers/admin/stats'

const route = new Router({
    prefix: '/stats' // 路由前缀
})

/**
 * @swagger
 * /v1/admin/stats/visit:
 *   get:
 *     summary: 访问统计
 *     tags: [admin]
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/visit', async (context: Context) => {
    await controller.visit(context)
})

/**
 * @swagger
 * /v1/admin/stats/trend:
 *   get:
 *     summary: 访问趋势
 *     tags: [admin]
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/trend', async (context: Context) => {
    await controller.trend(context)
})

export default route
