/**
 * swagger config
 */
import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import pkg from '@/package'

export const swaggerDefinition = {
    info: {
        title: pkg.name,
        version: pkg.version,
        description: pkg.description,
        contact: {
            name: pkg.author
        }
    },
    // production 使用 nginx 代理
    basePath: process.env.NODE_ENV !== 'development' ? '/' : '/', // Base path (optional)
    // 定义全局model
    components: {
        schemas: {
            Pagination: {
                type: 'object',
                required: ['pageSize', 'pageCurrent'],
                properties: {
                    pageSize: {
                        type: 'integer',
                        description: '每页的条目个数',
                        example: 10
                    },
                    pageCurrent: {
                        type: 'integer',
                        description: '当前页数',
                        example: 1
                    }
                }
            },
            ApiResponse: {
                type: 'object',
                description: '全局数据格式',
                properties: {
                    code: {
                        type: 'number',
                        description: '状态码',
                        example: 200
                    },
                    message: {
                        type: 'string',
                        description: '提示信息'
                    },
                    success: {
                        type: 'boolean',
                        description: '是否成功',
                        example: true
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
}

export const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: [
        path.join(__dirname, '../apis/*/*/*.yaml'),
        path.join(__dirname, '../apis/*/*/*.ts'),
        path.join(__dirname, '../apis/*/*/*.js'),
        path.join(__dirname, '../apis/*.ts'),
        path.join(__dirname, '../apis/*.js')
    ] // 写有注解的router的存放地址, 最好path.join()
})
