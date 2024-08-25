import Router from '@koa/router'
import { Context } from 'koa'
import * as controller from '@/controllers/admin/role'

const route = new Router({
    prefix: '/roles' // 路由前缀
})

/**
 * @swagger
 * /v1/admin/roles/create:
 *   post:
 *     summary: 角色创建
 *     tags: [admin]
 *     parameters:
 *       - name: request
 *         in: body
 *         type: object
 *         required: true
 *         description: data
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
route.post('/create', async (context: Context) => {
    await controller.create(context)
})

/**
 * @swagger
 * /v1/admin/roles/createBatch:
 *   post:
 *     summary: 角色批量创建
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
 * /v1/admin/roles/{id}:
 *   delete:
 *     summary: 角色删除
 *     tags: [admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: object
 *         required: true
 *         description: id 多个使用,分割
 *         schema:
 *             type: integer
 *             required: true
 *             example: 1,2,3
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.delete('/:id', async (context: Context) => {
    await controller.destroy(context)
})

/**
 * @swagger
 * /v1/admin/roles/{id}:
 *   put:
 *     summary: 角色更新
 *     tags: [admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: object
 *         required: true
 *         description: id
 *         schema:
 *             type: integer
 *             required: true
 *             example: 1
 *       - name: data
 *         in: body
 *         type: object
 *         required: true
 *         description: data
 *         schema:
 *             type: object
 *             required: true
 *             properties:
 *                id:
 *                    type: number
 *                    example: 1
 *                username:
 *                    type: string
 *                    example: newName
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.put('/:id', async (context: Context) => {
    await controller.update(context)
})

/**
 * @swagger
 * /v1/admin/roles/{id}/form:
 *   get:
 *     summary: 角色详情
 *     tags: [admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: object
 *         required: true
 *         description: id
 *         schema:
 *             type: integer
 *             required: true
 *             example: 1
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/:id/form', async (context: Context) => {
    await controller.detail(context)
})

/**
 * @swagger
 * /v1/admin/roles/pages:
 *   post:
 *     summary: 角色列表
 *     tags: [admin]
 *     parameters:
 *       - name: request
 *         in: body
 *         type: object
 *         required: true
 *         description: data
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
route.post('/pages', async (context: Context) => {
    await controller.list(context)
})

/**
 * @swagger
 * /v1/admin/roles/options:
 *   get:
 *     summary: 全量角色列表
 *     tags: [admin]
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/options', async (context: Context) => {
    await controller.options(context)
})

export default route
