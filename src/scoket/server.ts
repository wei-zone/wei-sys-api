import { Server } from 'socket.io'

// 定义函数来处理数据
export default function socketServer(httpServer) {
    // 创建io 这个服务器它和koa用的端口是一个
    const io = new Server(httpServer, {
        /* options */
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })
    io.on('connection', async socket => {
        console.log('user connection')
        // 播放请求
        socket.on('play', () => {
            console.log('play --->')
            // 就给前端返回列表
            socket.emit('playing', [
                {
                    name: '张三',
                    age: 18
                },
                {
                    name: '李四',
                    age: 20
                }
            ])
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}
