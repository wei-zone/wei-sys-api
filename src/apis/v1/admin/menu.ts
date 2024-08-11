import Router from '@koa/router'
import { Context } from 'koa'
import * as controller from '@/controllers/admin/menu'

const route = new Router({
    prefix: '/menu' // 路由前缀
})

/**
 * @swagger
 * /v1/admin/menu/create:
 *   post:
 *     summary: 菜单创建
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
 *                menuname:
 *                    type: string
 *                    example: zhangsan
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/create', async (context: Context) => {
    await controller.create(context)
})

/**
 * @swagger
 * /v1/admin/menu/createBatch:
 *   post:
 *     summary: 菜单创建
 *     tags: [admin]
 *     parameters:
 *       - name: request
 *         in: body
 *         type: object
 *         required: true
 *         description: 入参
 *         schema:
 *             type: array
 *             items:
 *               type: object
 *               required: true
 *               properties:
 *                 id:
 *                    type: number
 *                    example: 1
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/createBatch', async (context: Context) => {
    await controller.createBatch(context)
})

/**
 * @swagger
 * /v1/admin/menu/delete:
 *   post:
 *     summary: 菜单删除
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
 *                id:
 *                    type: number
 *                    example: 1
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/delete', async (context: Context) => {
    await controller.destroy(context)
})

/**
 * @swagger
 * /v1/admin/menu/update:
 *   post:
 *     summary: 菜单更新
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
 *                id:
 *                    type: number
 *                    example: 1
 *                menuname:
 *                    type: string
 *                    example: newName
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/update', async (context: Context) => {
    await controller.update(context)
})

/**
 * @swagger
 * /v1/admin/menu/detail:
 *   post:
 *     summary: 菜单详情
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
 *                id:
 *                    type: number
 *                    example: 1
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/detail', async (context: Context) => {
    await controller.detail(context)
})

/**
 * @swagger
 * /v1/admin/menu:
 *   post:
 *     summary: 菜单列表
 *     tags: [admin]
 *     parameters:
 *       - name: request
 *         in: body
 *         type: object
 *         required: true
 *         description: 入参
 *         schema:
 *           allOf:
 *              - $ref: '#/components/schemas/Pagination'
 *              - type: object
 *              - required: true
 *                properties:
 *                  fields:
 *                      type: object
 *                      description: 字段过滤，默认所有字段
 *                      example: {}
 *                  filter:
 *                      type: object
 *                      description: 条件筛选，默认所有数据
 *                      example: {}
 *                  order:
 *                      type: array
 *                      description: 排序，默认 [['createdAt', 'DESC']]
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/', async (context: Context) => {
    await controller.list(context)
})

export default route
