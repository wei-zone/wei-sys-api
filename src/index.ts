import App from './app'
import config from 'config'
import http from 'node:http'
import { AddressInfo } from 'node:net'

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
        const addrString = isAddressInfo(addr) ? `http://${addr.address}:${addr.port}` : String(addr)
        console.log(`Server running at：`)
        console.log('%s', `${addrString}`)
    })
}

main()
