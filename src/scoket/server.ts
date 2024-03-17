import { Server } from 'socket.io'
import chalk from 'chalk'
import dayjs from 'dayjs'
import { consoleEmit, playerOn } from '@/types/scoket'
// import { instrument } from '@socket.io/admin-ui'

const logger = (type: any, data: any) => {
    console.log(chalk.gray('<-'), chalk.white(type))
    console.log(chalk.gray(JSON.stringify(data)))
    console.log(chalk.gray(dayjs().format('YYYY-MM-DD HH:mm:ss')))
    console.log('-> \n')
}

// 定义函数来处理数据
export default function socketServer(httpServer) {
    // 创建io 这个服务器它和koa用的端口是一个
    const io = new Server(httpServer, {
        allowEIO3: true,
        /* options */
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    })
    io.on('connection', async socket => {
        logger('socket connected:', socket.id)
        socket.on('disconnect', reason => {
            logger('device disconnected:', reason)
        })

        // 给客户端发送消息
        socket.emit('welcome', socket.id)

        /**
         * 控制台发送 s
         */
        socket.on(consoleEmit['controlPlay'], (data: any) => {
            logger('controlPlay:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })
        socket.on(consoleEmit['controlPause'], (data: any) => {
            logger('controlPause:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })
        socket.on(consoleEmit['controlVolumeIncrease'], (data: any) => {
            logger('controlVolumeIncrease:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })
        socket.on(consoleEmit['controlVolumeDecrease'], (data: any) => {
            logger('controlVolumeDecrease:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })
        socket.on(consoleEmit['controlFastRewind'], (data: any) => {
            logger('controlFastRewind:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })
        socket.on(consoleEmit['controlFastForward'], (data: any) => {
            logger('controlFastForward:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })
        socket.on(consoleEmit['controlReplay'], (data: any) => {
            logger('controlReplay:', data)
            const { type } = data
            if (type) {
                socket.broadcast.emit(playerOn[`player${type}`], data)
            }
        })

        /**
         * 播放端接收 s
         */
    })

    // instrument(io, {
    //     auth: false
    // })
}
