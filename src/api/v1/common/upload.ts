/**
 * @Author: forguo
 * @Date: 2023/11/25 23:32
 * @Description: upload.ts
 */
import Router from '@koa/router'
import { Context } from 'koa'
import controller from '../../../controllers/common/upload'

const route = new Router({
    prefix: '/upload' // 路由前缀
})

/**
 * @swagger
 * tags:
 *   - name: Common
 *     description: 通用
 */

/**
 * @swagger
 * /common/upload:
 *   post:
 *     description: 文件上传
 *     summary: Upload a file
 *     tags: [Common]
 *     parameters:
 *       - name: file
 *         description: The file to upload.
 *         in: formData
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: 文件上传
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApiResponse'
 *         examples:
 *           application/json:
 *            {
 *            "code": 200,
 *            "message": "ok",
 *            "success": true,
 *            "serverTime": 1637846400000,
 *            "data": "https://www.forguo.cn/uploads/2021-11-25T15:06:40.000Z-1.jpg"
 *            }
 *
 */
route.post('/', async (context: Context) => {
    await controller.upload(context)
})

export default route
