import Koa from 'koa'
import api from './api/index'
import koaCompress from 'koa-compress'
import middleWares from './middleWares'

class App extends Koa {
    constructor() {
        super()

        this.on('error', error => {
            console.log('server error', error)
        })
        if (process.env.NODE_ENV === 'production') {
            this.use(koaCompress())
        }
        // Finally, mount the top-level API router
        this.use(middleWares)
        this.use(api.routes())
        this.use(api.allowedMethods())
    }
}

export default App
