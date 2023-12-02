/**
 * @Author: forguo
 * @Date: 2021/8/5 15:23
 * @Description: sdk.js
 */

import { Context } from 'koa'
import path from 'path'
import fs from 'fs'
import dayjs from 'dayjs'
import { generateUniqueChar } from '../../libs'
// 云开发api
const apis: any = {}

import config from '../../config'
const cosConfig = config.cosConfig

// COS实例
// import COS from 'cos-nodejs-sdk-v5'
function COS(options: any) {}

const cos: any = new COS({
    // 必选参数
    SecretId: cosConfig.COS_SECRET_ID,
    SecretKey: cosConfig.COS_SECRET_KEY,
    // 可选参数
    FileParallelLimit: 3, // 控制文件上传并发数
    ChunkParallelLimit: 5, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: 1024 * 1024 * 5, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    Proxy: ''
})

/**
 * @docs https://cloud.tencent.com/document/product/436/8629
 * @param file
 * @return {Promise<unknown>}
 */
function cosUpload(file: any) {
    const fileName = file.name
    const fileSize = file.size
    const body = fs.createReadStream(file.path) // 创建可读流
    return new Promise((resolve, reject) => {
        cos.putObject(
            {
                Bucket: cosConfig.COS_BUCKET /* 必须 */,
                Region: cosConfig.COS_REGION /* 必须 */,
                /**
                 * 必须
                 * 请求的对象键，最前面不带 /，例如 images/1.jpg
                 */
                Key: `apps/koa2/${dayjs().format('YYYY/MM/DD')}/${fileName}`,
                StorageClass: 'STANDARD',
                // 格式1. 传入文件内容
                // Body: fs.readFileSync(filepath),
                // 格式2. 传入文件流，必须需要传文件大小
                Body: body, // 上传文件对象
                ContentLength: fileSize,
                onTaskReady: function (tid) {
                    // console.log('TaskId', tid);
                    // TaskId = tid;
                },
                onProgress: function (progressData) {
                    // console.log('progressData', JSON.stringify(progressData));
                }
            },
            function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }
        )
    })
}

class Controller {
    /**
     * 文件上传
     * @param ctx
     * @returns {Promise<void>}
     */
    async upload(ctx: Context & any) {
        try {
            const uploadDir = '/uploads/'
            const file = ctx.request?.files?.file // 获取上传文件
            if (!file) {
                ctx.throw({
                    code: -1,
                    message: '请选择上传文件'
                })
                return
            }

            // 获取文件名
            console.log(file.name, file.size, file.type)

            // 获取文件扩展名
            const [name, extname] = file.name.split('.')
            const fileName = `${name}.${generateUniqueChar('', 8)}.${extname}`
            const filePath = `${uploadDir}${dayjs().format('YYYY/MM/DD')}`

            // 本地存储路径
            const fileSavePath = path.join(__dirname, '../../public', filePath, fileName)

            // 生成上传后的图片链接
            const url = `${ctx.origin}${filePath}/${fileName}`

            const stream = fs.createReadStream(file.path)
            const writeStream = fs.createWriteStream(fileSavePath)

            // Create the directory if it does not exist
            const dirPath = path.join(__dirname, '../../public', filePath)

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true })
            }

            await new Promise((resolve, reject) => {
                stream.pipe(writeStream)
                stream.on('end', resolve)
                stream.on('error', reject)
            })
            // 处理上传的文件
            ctx.send({
                data: url
            })
        } catch (e) {
            console.log('upload error--->', e)
            ctx.throw(e)
        }
    }

    /**
     * 文件上传 Cos 方式
     * @param ctx
     */
    async uploadCos(ctx: Context & any) {
        // COS需要去除该设置 --> koa-body/uploadDir
        const file = ctx.request.files.file // 获取上传文件
        try {
            const res = await cosUpload(file)
            ctx.body = {
                code: 200,
                success: true,
                message: 'ok',
                data: res
            }
        } catch (e) {
            ctx.throw(e)
        }
    }

    /**
     * 文件上传 - 云开发
     */
    async uploadCloud(ctx: Context & any) {
        try {
            const file = ctx.request.files.file // 获取上传文件
            const name = file.name
            const res = await apis.upload(fs.createReadStream(file.path), name)
            const files = await apis.getTempFileURL([res.fileID])
            console.log('get fileUrl--->', files)
            if (files.fileList.length > 0) {
                const data = files.fileList[0]
                data.src = data.download_url
                ctx.send({
                    data
                })
            } else {
                ctx.throw({
                    code: -1,
                    message: '获取图片链接失败，请重试'
                })
            }
        } catch (e) {
            ctx.throw(e)
        }
    }
}

export default new Controller()
