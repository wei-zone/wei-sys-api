import Router from '@koa/router'
import { Context } from 'koa'
import controller from '../../../controllers/weapp/jssdk'

const route = new Router({
    prefix: '/jssdk' // 路由前缀
})

/**
 * @swagger
 * tags:
 *   - name: Weapp
 *     description: 微信
 * definitions:
 *     JSSDK:
 *         type: object
 *         description: JSSDK
 *         properties:
 *             jsapi_ticket:
 *                 type: string
 *                 description: jsapi_ticket临时票据
 *             nonceStr:
 *                 type: string
 *                 description: 随机字符串
 *             timestamp:
 *                 type: string
 *                 description: 时间戳
 *             url:
 *                 type: string
 *                 description: encodeURIComponent(location.href.split('#')[0])
 *             signature:
 *                 type: string
 *                 description: 签名
 *             appId:
 *                 type: string
 *                 description: appId
 */

/**
 * @swagger
 * /weapp/jssdk:
 *   get:
 *     description: 微信jssdk配置
 *     tags: [Weapp]
 *     produces:
 *       - route.ication/json
 *     parameters:
 *       - name: url
 *         description: encodeURIComponent(location.href.split('#')[0])
 *         in: query
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: 微信jssdk配置
 *         schema:
 *           type: object
 *           $ref: '#/definitions/JSSDK'
 */
route.get('/', async (context: Context) => {
    await controller.configSdk(context)
})

route.post('/', async (context: Context) => {
    await controller.configSdk(context)
})

export default route
