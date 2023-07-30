import Router from '@koa/router'

const route = new Router({
    prefix: '/hello'
})

route.all('/', context => {
    context.body = 'Hello World!'
})

export default route
