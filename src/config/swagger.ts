import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import config, { env } from './index'
import pkg from '@/package'

const swaggerDefinition = {
    info: {
        title: pkg.name,
        version: pkg.version,
        description: pkg.description,
        contact: {
            name: pkg.author
        }
    },
    host: env === 'development' ? `127.0.0.1:${config.PORT}` : `forguo.cn/api`,
    basePath: '/', // Base path (optional)
    // 定义全局model
    definitions: {
        ApiResponse: {
            type: 'object',
            description: '全局数据格式',
            properties: {
                code: {
                    type: 'number',
                    description: '状态码'
                },
                message: {
                    type: 'string',
                    description: '提示信息'
                },
                success: {
                    type: 'boolean',
                    description: '是否成功'
                },
                serverTime: {
                    type: 'number',
                    description: '服务器时间'
                },
                data: {
                    type: 'object',
                    description: '返回数据'
                }
            }
        }
    }
}

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: [
        path.join(__dirname, '../apis/*/*/*.yaml'),
        path.join(__dirname, '../apis/*/*/*.ts'),
        path.join(__dirname, '../apis/*/*/*.js')
    ] // 写有注解的router的存放地址, 最好path.join()
})

export { swaggerDefinition, swaggerSpec }
