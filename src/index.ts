import App from './app'
import config from 'config'
import http from 'node:http'
import { AddressInfo } from 'node:net'
import chalk from 'chalk'
import _package from '../package.json'

function isAddressInfo(address: string | AddressInfo | null): address is AddressInfo {
    const addr = address as AddressInfo
    return addr.address !== undefined && addr.port !== undefined
}

// Launch the app as an HTTP server
function main(): void {
    const app = new App()
    const server = http.createServer(app.callback())
    const listenOptions = {
        host: process.env.HOST ?? config.get('server.host') ?? '3003',
        port: Number(process.env.PORT) || config.get('server.port')
    }
    server.listen(listenOptions, () => {
        const addr = server.address()
        console.log('\t')
        console.log(chalk.blueBright(_package.name), chalk.grey('v' + _package.version))
        console.log('\t')
        if (isAddressInfo(addr)) {
            console.log(chalk.cyan('➜  Local:   http://%s:%s/api/'), 'localhost', addr.port)
            console.log(chalk.cyan('➜  Network: http://%s:%s/api/'), '127.0.0.1', addr.port)
        } else {
            console.log(chalk.cyan('➜  Local:   http://%s:%s/api/'), 'localhost', String(addr))
            console.log(chalk.cyan('➜  Network: http://%s:%s/api/'), '127.0.0.1', String(addr))
        }
    })
}

main()
