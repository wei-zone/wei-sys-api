/**
 * server entry
 */

// 别名
import './alias.config'
import { AddressInfo } from 'node:net'
import chalk from 'chalk'
import config from '@/config'
import _package from '@/package'
import App from '@/app'
import SocketServer from '@/scoket/server'
import ErrnoException = NodeJS.ErrnoException
import dayjs from 'dayjs'

// Check if the address is an AddressInfo
function isAddressInfo(address: string | AddressInfo | null): address is AddressInfo {
    const addr = address as AddressInfo
    return addr.address !== undefined && addr.port !== undefined
}

// Launch the app as an HTTP server
function main(): void {
    const app = new App()
    // createServer
    const port = config.PORT
    const server = app.listen(port)
    SocketServer(server)

    // Event listener for HTTP server "error" event.
    server.on('error', (error: ErrnoException) => {
        console.dir(error)

        if (error.syscall !== 'listen') {
            throw error
        }
        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                console.error(bind + ' is already in use')
                process.exit(1)
                break
            default:
                throw error
        }
    })

    // Event listener for HTTP server "listening" event.
    server.on('listening', () => {
        const address = server.address()
        if (address === null) {
            return
        }
        console.log(chalk.blueBright(_package.name))
        console.log('➜ v', chalk.grey(_package.version))
        console.log('➜ env', chalk.grey(config.env))
        console.log('➜ time', chalk.grey(dayjs().format('YYYY-MM-DD HH:mm:ss')))
        if (isAddressInfo(address)) {
            console.log('\t')
            const host = '127.0.0.1'
            console.log(chalk.cyan('➜  Local:   http://%s:%s/'), 'localhost', port)
            console.log(chalk.cyan('➜  Network: http://%s:%s/'), host, port)
            console.log(chalk.cyan('➜  ApiDocs: http://%s:%s%s'), host, port, '/api-docs')
            console.log('\t')
        }
    })
}

main()
