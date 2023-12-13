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
 * /v1/common/upload:
 *   post:
 *     description: 文件上传
 *     summary: 文件上传
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
 *            "data":  {
 *                "src": "http://localhost:3000/public/upload/2021//11/25/name.uuid.png"
 *              }
 *            }
 *
 */
route.post('/', async (context: Context) => {
    await controller.upload(context)
})

/**
 * @swagger
 * /v1/common/upload/cos:
 *   post:
 *     description: cos文件上传
 *     summary: cos文件上传
 *     tags: [Common]
 *     parameters:
 *       - name: file
 *         description: The file to upload.
 *         in: formData
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: cos文件上传
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApiResponse'
 */
route.post('/cos', async (context: Context) => {
    await controller.uploadCos(context)
})

/**
 * @swagger
 * /v1/common/upload/cos:
 *   post:
 *     description: 云开发文件上传
 *     summary: 云开发文件上传
 *     tags: [Common]
 *     parameters:
 *       - name: file
 *         description: The file to upload.
 *         in: formData
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: 云开发文件上传
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApiResponse'
 */
route.post('/cloud', async (context: Context) => {
    await controller.uploadCloud(context)
})

/**
 * @swagger
 * /v1/common/verify:
 *   post:
 *     description: 文件是否存在
 *     summary: 文件是否存在
 *     tags: [Common]
 *     parameters:
 *       - name: fileName
 *         description: fileName
 *         in: formData
 *         type: string
 *         required: true
 *       - name: fileHash
 *         description: fileHash
 *         in: formData
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 文件是否存在
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApiResponse'
 */
route.post('/verify', async (context: Context) => {
    await controller.verify(context)
})

/**
 * @swagger
 * /v1/common/upload/chunk:
 *   post:
 *     description: 文件切片上传
 *     summary: 文件切片上传
 *     tags: [Common]
 *     parameters:
 *       - name: file
 *         description: The file to upload.
 *         in: formData
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: 文件切片上传
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApiResponse'
 */
route.post('/chunk', async (context: Context) => {
    await controller.uploadChunk(context)
})

/**
 * @swagger
 * /v1/common/upload/merge:
 *   post:
 *     description: 文件切片合并
 *     summary: 文件切片合并
 *     tags: [Common]
 *     parameters:
 *       - name: file
 *         description: The file to upload.
 *         required: true
 *     responses:
 *       200:
 *         description: 文件切片合并
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApiResponse'
 */
route.post('/merge', async (context: Context) => {
    await controller.mergeChunks(context)
})

export default route
