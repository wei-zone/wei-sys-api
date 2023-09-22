import Router from '@koa/router'

const route = new Router({
    prefix: '/hello'
})

route.get('/', context => {
    context.body = 'Hello World!'
})

export default route
