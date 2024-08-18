import Router from '@koa/router'
import { Context } from 'koa'
import * as controller from '@/controllers/admin/config'

const route = new Router({
    prefix: '/configs' // 路由前缀
})

/**
 * @swagger
 * /v1/admin/configs/create:
 *   post:
 *     summary: 配置创建
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
 * /v1/admin/configs/createBatch:
 *   post:
 *     summary: 配置批量创建
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
 * /v1/admin/configs/{id}:
 *   delete:
 *     summary: 配置删除
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
route.delete('/:id', async (context: Context) => {
    await controller.destroy(context)
})

/**
 * @swagger
 * /v1/admin/configs/{id}:
 *   put:
 *     summary: 配置更新
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
 * /v1/admin/configs/{id}/form:
 *   get:
 *     summary: 配置详情
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
 * /v1/admin/configs/pages:
 *   post:
 *     summary: 配置列表
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
 * /v1/admin/configs/options:
 *   get:
 *     summary: 全量配置列表
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
