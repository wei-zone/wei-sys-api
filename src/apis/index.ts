import Router from '@koa/router'
import { Context } from 'koa'
import { swaggerSpec } from '@/config'
import v1 from './v1/index'
import path from 'path'
import fs from 'fs'

const route = new Router({
    // Current folder
})

route.all('/', async (ctx: Context) => {
    ctx.success({
        data: 'Hello Koa2'
    })
})

// 通过路由获取生成的注解文件
route.get('/api-docs.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
})

/**
 * 日志浏览
 */
const publicDir = path.resolve(__dirname, '../public/logs')
route.get('/api-logs/:splat*', async (ctx: any) => {
    const relativePath = ctx.path.replace('/api-logs', '')
    const dirPath = path.join(publicDir, relativePath)
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath)
        ctx.body = `
          <h3>日志预览：</h3>
          <code>${ctx.path}</code>
          <ul>
            ${files
                .map(file => {
                    const filePath = path.join(relativePath, file).replace(/\\/g, '/')
                    const fileStat = fs.statSync(path.join(dirPath, file))
                    if (fileStat.isDirectory()) {
                        return `<li><a href="/api-logs${filePath}/" target="_blank">${file}/</a></li>`
                    } else {
                        return `<li><a href="/logs${filePath}" target="_blank">${file}</a></li>`
                    }
                })
                .join('')}
          </ul>
        `
    } else {
        ctx.status = 404
        ctx.body = '目录未找到'
    }
})

// Mount sub-routes here
route.use(v1.routes())
route.use(v1.allowedMethods())

export default route
