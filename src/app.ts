import Koa from 'koa'
import api from './api/route'
import config from 'config'
import koaBody from 'koa-body'
import koaCompress from 'koa-compress'
import koaHelmet from 'koa-helmet'
import koaResponseTime from 'koa-response-time'

class App extends Koa {
    constructor() {
        super()

        // Add extra HTTP headers and disable compression in non-production environments
        if (this.env !== 'production') {
            this.use(koaResponseTime({ hrtime: true }))
            this.use(async (context, next) => {
                context.compress = false
                context.set('Access-Control-Allow-Origin', '*')
                context.set('Access-Control-Allow-Headers', '*')
                await next()
            })
        }

        // Add Koa-Helmet headers (https://github.com/venables/koa-helmet)
        this.use(koaHelmet())

        // Use Koa application options, if present
        try {
            const appOptions: object = config.get('appOptions')
            Object.assign(this, appOptions)
        } catch {
            // Continue using Koa's default options
        }

        // Use compression options, if present
        const koaCompressOptions = {}
        try {
            const compressOptions = config.get('compressOptions')
            Object.assign(koaCompressOptions, compressOptions)
        } catch {
            // Continue using the default compression options
        }
        this.use(koaCompress(koaCompressOptions))

        // Use body parser options, if present
        const koaBodyOptions = {}
        try {
            const bodyParserOptions = config.get('bodyParserOptions')
            Object.assign(koaBodyOptions, bodyParserOptions)
        } catch {
            // Continue using the default body parsing options
        }
        this.use(koaBody(koaBodyOptions))

        // Finally, mount the top-level API router
        this.use(api.routes())
        this.use(api.allowedMethods())
    }
}

export default App
