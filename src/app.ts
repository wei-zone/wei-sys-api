/**
 * extends Koa
 */
import Koa from 'koa'
import koaCompress from 'koa-compress'
import middleWares from './middleWares'
import apis from '@/apis/index'
// import { startChunkClear } from './schedule'

class App extends Koa {
    constructor() {
        super()
        // startChunkClear()
        this.on('error', error => {
            console.log('server error', error)
        })
        if (process.env.NODE_ENV !== 'development') {
            this.use(koaCompress())
        }
        // Finally, mount the top-level API router
        this.use(middleWares)
        this.use(apis.routes())
        this.use(apis.allowedMethods())
    }
}

export default App
