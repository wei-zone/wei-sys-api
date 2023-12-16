import fs from 'fs'
import path from 'path'
import schedule from 'node-schedule'
import config from '../config'
const { CHUNK_DIR } = config.chunkConfig

// 大文件存储目录
const UPLOAD_DIR = path.join(__dirname, '../public', CHUNK_DIR)

// 空目录删除
function remove(file, stats) {
    const now = Date.now()
    // stats.ctimeMs 创建时间
    const offset = now - stats.ctimeMs
    if (offset > 1000 * 60 * 5) {
        // 大于60s*5=5min的切片文件删除
        fs.unlinkSync(file)
        console.log(file, '文件已过期，删除完毕')
    }
}

async function scan(dir, callback?: (fileDir, stats) => void) {
    const files = fs.readdirSync(dir)
    files.forEach(filename => {
        const fileDir = path.resolve(dir, filename)
        const stats = fs.statSync(fileDir)
        if (stats.isDirectory()) {
            // 删除文件
            scan(fileDir, remove)
            // 删除空的文件夹
            if (fs.readdirSync(fileDir).length == 0) {
                fs.rmdirSync(fileDir)
            }
            return
        }
        if (callback) {
            callback(fileDir, stats)
        }
    })
}

// * * * * * *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ │
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
export const startChunkClear = function () {
    // 每5秒
    schedule.scheduleJob('*/5 * * * * *', async () => {
        console.log('---> 定时清理chunks开始', UPLOAD_DIR)
        await scan(UPLOAD_DIR)
        console.log('<--- 定时清理chunks结束')
    })
}
