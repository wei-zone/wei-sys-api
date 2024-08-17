/**
 * @Author: forguo
 * @Date: 2021/8/5 15:23
 * @Description: sdk.js
 */

import { Context } from 'koa'
import path from 'path'
import fs from 'fs'
import dayjs from 'dayjs'
import { generateUniqueChar } from '@/libs'
import config from '@/config'
import { getFileExtension, getFileName } from '@/libs/file'
// 云开发api
const apis: any = {}

const COS_CONFIG = config.COS_CONFIG
const { CHUNK_DIR } = config.CHUNK_CONFIG
// COS实例
// import COS from 'cos-nodejs-sdk-v5'
function COS(options: any) {}

const cos: any = new COS({
    // 必选参数
    SecretId: COS_CONFIG.COS_SECRET_ID,
    SecretKey: COS_CONFIG.COS_SECRET_KEY,
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
const cosUpload = async (file: any) => {
    const fileName = file.name
    const fileSize = file.size
    const body = fs.createReadStream(file.path) // 创建可读流
    return new Promise((resolve, reject) => {
        cos.putObject(
            {
                Bucket: COS_CONFIG.COS_BUCKET /* 必须 */,
                Region: COS_CONFIG.COS_REGION /* 必须 */,
                /**
                 * 必须
                 * 请求的对象键，最前面不带 /，例如 images/1.jpg
                 */
                Key: `apps/wei/${dayjs().format('YYYY/MM/DD')}/${fileName}`,
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

/**
 * 针对 path 创建 readStream 并写入 writeStream,写入完成之后删除文件
 * @param {String} path
 * @param {String} writeStream
 */
const pipeStream = (path, writeStream) => {
    return new Promise<void>(async (resolve, reject) => {
        const stream = fs.createReadStream(path)
        stream.pipe(writeStream)
        stream.on('end', () => {
            fs.unlinkSync(path)
            resolve()
        })
        stream.on('error', reject)
    })
}

/**
 * 读取所有的 chunk 合并到 filePath 中
 * @param {String} filePath 文件存储路径
 * @param {String} chunkDir chunk存储文件夹名称
 * @param {String} size 每一个chunk的大小
 */
const mergeFileChunk = async (filePath, chunkDir, size) => {
    // 获取chunk列表
    const chunkPaths = fs.readdirSync(chunkDir)
    // 根据切片下标进行排序  否则直接读取目录的获得的顺序可能会错乱
    chunkPaths.sort((a: any, b: any) => a.split('-')[1] - b.split('-')[1])
    // 创建可写流
    await Promise.all(
        chunkPaths.map((chunkPath, index) =>
            pipeStream(
                path.resolve(chunkDir, chunkPath),
                // 指定位置创建可写流
                fs.createWriteStream(filePath, {
                    start: index * size
                    // end: ((index + 1) * size) as number
                })
            )
        )
    )
    // 合并后删除保存切片的目录
    fs.rmdirSync(chunkDir)
}

/**
 * 返回已经上传的切片名列表
 * @param UPLOAD_DIR
 */
const createUploadedList = UPLOAD_DIR => {
    return fs.existsSync(UPLOAD_DIR) ? fs.readdirSync(UPLOAD_DIR) : []
}

class Controller {
    /**
     * 文件上传 - 本地
     * @param ctx
     */
    async upload(ctx: Context & any) {
        try {
            const file = ctx.request?.files?.file // 获取上传文件
            if (!file) {
                ctx.throw({
                    code: -1,
                    message: '请选择上传文件'
                })
                return
            }
            const uploadDir = '/uploads/'

            // 获取文件扩展名
            const extname = getFileExtension(file.name)
            const name = getFileName(file.name, extname)

            // 重新生成文件名
            const fileName = `${name}.${generateUniqueChar('', 8)}.${extname}`

            // 文件夹相对路径
            const dirPath = `${uploadDir}${dayjs().format('YYYY/MM/DD')}`

            // 本地存储路径
            const fileSavePath = path.join(__dirname, '../../public', dirPath, fileName)

            // Create the directory if it does not exist
            const dirPathLocal = path.join(__dirname, '../../public', dirPath)

            if (!fs.existsSync(dirPathLocal)) {
                fs.mkdirSync(dirPathLocal, { recursive: true })
            }

            const stream = fs.createReadStream(file.path)
            const writeStream = fs.createWriteStream(fileSavePath)

            await new Promise((resolve, reject) => {
                stream.pipe(writeStream)
                stream.on('end', resolve)
                stream.on('error', reject)
            })

            // 生成上传后的文件链接
            const src = `${ctx.origin}${dirPath}/${fileName}`

            // 处理上传的文件
            ctx.success({
                data: {
                    src
                }
            })
        } catch (e) {
            console.log('upload error--->', e)
            ctx.throw(e)
        }
    }

    /**
     * 文件上传 - Cos 云存储
     * @param ctx
     */
    async uploadCos(ctx: Context & any) {
        const file = ctx.request?.files?.file // 获取上传文件
        if (!file) {
            ctx.throw({
                code: -1,
                message: '请选择上传文件'
            })
            return
        }
        // COS需要去除该设置 --> koa-body/uploadDir
        try {
            const res = await cosUpload(file)
            ctx.success({
                data: res
            })
        } catch (e) {
            ctx.throw(e)
        }
    }

    /**
     * 文件上传 - 云开发
     * @param ctx
     */
    async uploadCloud(ctx: Context & any) {
        try {
            const file = ctx.request?.files?.file // 获取上传文件
            if (!file) {
                ctx.throw({
                    code: -1,
                    message: '请选择上传文件'
                })
                return
            }
            const name = file.name
            const res = await apis.upload(fs.createReadStream(file.path), name)
            const files = await apis.getTempFileURL([res.fileID])
            console.log('get fileUrl--->', files)
            if (files.fileList.length > 0) {
                const data = files.fileList[0]
                data.src = data.download_url
                ctx.success({
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

    /**
     * 文件上传 - 文件是否已存在
     */
    async verify(ctx: Context & any) {
        const { fileName, fileHash } = ctx.request.body
        if (!fileName || !fileHash) {
            ctx.throw({
                code: -1,
                message: '文件名或文件hash值不能为空'
            })
            return
        }

        // 文件名及扩展名
        const extname = getFileExtension(fileName)
        const name = getFileName(fileName, extname)

        // 重新生成文件名
        const fileFullName = `${name}.${fileHash}.${extname}`

        // 生成文件保存路径，本地存储路径
        const fileSavePath = path.join(__dirname, '../../public', CHUNK_DIR, fileFullName)

        let shouldUpload = true
        let message = '文件不存在'
        if (fs.existsSync(fileSavePath)) {
            shouldUpload = false
            message = '文件已经存在'
        }
        const data: any = {
            shouldUpload
        }

        if (shouldUpload) {
            data.uploadList = createUploadedList(path.join(__dirname, '../../public', CHUNK_DIR, fileHash))
        } else {
            data.src = `${ctx.origin}${CHUNK_DIR}${fileFullName}`
        }
        ctx.success({
            data,
            message
        })
    }

    /**
     * 文件上传 - 切片上传
     * @param ctx
     */
    async uploadChunk(ctx: Context & any) {
        try {
            const { chunkHash, fileHash } = ctx.request.body
            const { chunk } = ctx.request.files
            if (!chunk) {
                ctx.throw({
                    code: -1,
                    message: '请选择上传文件'
                })
                return
            }
            // 切片文件夹，根据文件hash来命名
            const dirPath = `${CHUNK_DIR}${fileHash}`

            // 本地切片存储路径
            const chunkSavePath = path.join(__dirname, '../../public', dirPath, chunkHash)

            // Create the directory if it does not exist
            const dirPathLocal = path.join(__dirname, '../../public', dirPath)

            if (!fs.existsSync(dirPathLocal)) {
                fs.mkdirSync(dirPathLocal, { recursive: true })
            }

            /**
             * 读取切片文件流，写入到本地
             */
            const stream = fs.createReadStream(chunk.path)
            const writeStream = fs.createWriteStream(chunkSavePath)

            await new Promise((resolve, reject) => {
                stream.pipe(writeStream)
                stream.on('end', resolve)
                stream.on('error', reject)
            })

            // 生成上传后的文件链接
            const src = `${ctx.origin}${dirPath}/${chunkHash}`
            // 处理上传的文件
            ctx.success({
                data: {
                    src
                }
            })
        } catch (e) {
            console.log('upload error--->', e)
            ctx.throw(e)
        }
    }

    /**
     * 文件上传 - 合并切片
     * @param ctx
     */
    async mergeChunks(ctx: Context & any) {
        const { fileName, fileSize, size, fileHash } = ctx.request.body
        if (!fileName || !fileSize || !size || !fileHash) {
            ctx.throw({
                code: -1,
                message: '文件名、文件大小、切片大小、文件hash值不能为空'
            })
            return
        }

        // 文件名及扩展名
        const extname = getFileExtension(fileName)
        const name = getFileName(fileName, extname)

        // 重新生成文件名
        const fileFullName = `${name}.${fileHash}.${extname}`

        // 生成文件保存路径，本地存储路径
        const fileSavePath = path.join(__dirname, '../../public', CHUNK_DIR, fileFullName)

        // 切片存储目录，通过hash值来匹配
        const dirPathLocal = path.join(__dirname, '../../public', CHUNK_DIR, fileHash)

        // 合并切片
        await mergeFileChunk(fileSavePath, dirPathLocal, size)

        ctx.success({
            data: {
                src: `${ctx.origin}${CHUNK_DIR}${fileFullName}`
            }
        })
    }
}

export default new Controller()
