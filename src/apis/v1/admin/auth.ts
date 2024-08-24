import Router from '@koa/router'
import { Context } from 'koa'
import * as controller from '@/controllers/admin/auth'

const route = new Router({
    prefix: '/auth' // 路由前缀
})

/**
 * @swagger
 * /v1/admin/auth/login:
 *   post:
 *     summary: 登录
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
 *                    example: admin
 *                password:
 *                    type: string
 *                    example: 123456
 *                captchaCode:
 *                    type: string
 *                    example: 1234
 *                captchaKey:
 *                    type: string
 *                    example: 123456
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/login', async (context: Context) => {
    await controller.login(context)
})

/**
 * @swagger
 * /v1/admin/auth/captcha:
 *   get:
 *     summary: 验证码
 *     tags: [admin]
 *     parameters:
 *       - name: width
 *         description: width
 *         in: query
 *         type: string
 *         required: false
 *       - name: height
 *         description: height
 *         in: query
 *         type: string
 *         required: false
 *       - name: color
 *         description: color
 *         in: query
 *         type: string
 *         required: false
 *         example: '#2c3142'
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/captcha', async (context: Context) => {
    await controller.captcha(context)
})

/**
 * @swagger
 * /v1/admin/auth/logout:
 *   post:
 *     summary: 登出
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
 *                    example: admin
 *                password:
 *                    type: string
 *                    example: 654321
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.post('/logout', async (context: Context) => {
    await controller.logout(context)
})

/**
 * @swagger
 * /v1/admin/auth/me:
 *   get:
 *     summary: 用户信息
 *     tags: [admin]
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/ApiResponse'
 */
route.get('/me', async (context: Context) => {
    await controller.me(context)
})

export default route
