import Koa from 'koa'
import api from './api/route'
import koaCompress from 'koa-compress'
import middleWares from './middleWares'

class App extends Koa {
    constructor() {
        super()

        if (process.env.NODE_ENV === 'production') {
            this.use(koaCompress())
        }

        this.on('error', error => {
            console.log('server error', error)
        })

        // Finally, mount the top-level API router
        this.use(middleWares)
        this.use(api.routes())
        this.use(api.allowedMethods())
    }
}

export default App
