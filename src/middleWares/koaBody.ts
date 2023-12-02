/**
 * @Author: forguo
 * @Date: 2023/11/26 15:08
 * @Description: koaBody / 请求体解析
 */

import koaBody from 'koa-body'
import path from 'path'

export default () => {
    return koaBody({
        multipart: true, // 支持文件上传
        // encoding: 'gzip',
        formidable: {
            // 设置文件上传目录/COS需要去除该设置
            // uploadDir: path.join(__dirname, '../public/uploads/'),
            keepExtensions: true, // 保持文件的后缀
            maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
            onFileBegin: (name, file) => {
                // 文件上传前的设置
            }
        }
    })
}
