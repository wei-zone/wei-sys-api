import Router from '@koa/router'
import fs from 'fs'

const route = new Router({
    prefix: '/weapp'
})

// 读取并遍历所有路由文件
fs.readdirSync(__dirname).forEach((file: string) => {
    // 过滤index.ts文件
    if (file !== 'index.ts') {
        // 引入路由文件
        const $route = require(`./${file}`)
        // 注册路由
        // allowedMethods 响应options请求
        route.use($route.default.routes()).use($route.default.allowedMethods())
    }
})

export default route
