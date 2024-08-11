import Router from '@koa/router'
import { Context } from 'koa'
import * as controller from '@/controllers/admin/stats'

const route = new Router({
    prefix: '/stats' // 路由前缀
})

/**
 * @swagger
 * /v1/admin/visit-stats:
 *   get:
 *     summary: 访问统计
 *     tags: [admin]
 *     parameters:
 *       - name: request
 *         in: body
 *         type: object
 *         required: true
 *         description: 入参
 *         schema:
 *             type: object
 *             required: true
 *             properties:
 *                username:
 *                    type: string
 *                    example: zhangsan
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/visit-stats', async (context: Context) => {
    await controller.visit(context)
})

route.get('/visit-trend', async (context: Context) => {
    await controller.trend(context)
})

export default route
