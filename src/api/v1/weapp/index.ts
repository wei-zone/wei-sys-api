import Router from '@koa/router'
import fs from 'fs'
import jssdk from './jssdk'

const route = new Router({
    prefix: '/weapp'
})

// 读取并遍历所有路由文件
// try {
//     fs.readdirSync(__dirname).forEach((file: string) => {
//         console.log(file)
//         // 过滤index.ts文件
//         if (file !== 'index.ts') {
//             // 引入路由文件
//             // 注册路由
//             // allowedMethods 响应options请求
//         }
//     })
// } catch (e) {
//     throw e
// }

route.use(jssdk.routes()).use(jssdk.allowedMethods())

export default route
