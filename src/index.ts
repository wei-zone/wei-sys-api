/**
 * server entry
 */
import App from './app'
import config from './config'
import http from 'node:http'
import { AddressInfo } from 'node:net'
import chalk from 'chalk'
import _package from '../package.json'
import ErrnoException = NodeJS.ErrnoException

// Check if the address is an AddressInfo
function isAddressInfo(address: string | AddressInfo | null): address is AddressInfo {
    const addr = address as AddressInfo
    return addr.address !== undefined && addr.port !== undefined
}

// Launch the app as an HTTP server
function main(): void {
    const app = new App()
    // createServer
    const server = http.createServer(app.callback())
    const port = config.PORT
    server.listen(port)

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
        console.log('env', chalk.cyan(process.env.NODE_ENV))
        if (isAddressInfo(address)) {
            console.log('\t')
            console.log(chalk.blueBright(_package.name), chalk.grey('v' + _package.version))
            console.log('\t')
            console.log(chalk.cyan('➜  Local:   http://%s:%s/'), 'localhost', port)
            console.log(chalk.cyan('➜  Network: http://%s:%s/'), '127.0.0.1', port)
            console.log(chalk.cyan('➜  ApiDocs: http://%s:%s%s'), '127.0.0.1', port, '/api-docs')
            // [api-docs](http://127.0.0.1:3003/api-docs)
            console.log('\t')
        }
    })
}

main()
