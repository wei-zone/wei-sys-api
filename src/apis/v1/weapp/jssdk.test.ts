import '../../../alias.config'
import request from 'supertest'
import App from '../../../app'
import { expect } from 'chai'
describe('#test api', function () {
    describe('#test api jssdk', function () {
        const server = new App().listen(9900)
        it('#test GET /v1/weapp/jssdk?url=1', async function () {
            const data = await request(server).get('/v1/weapp/jssdk?url=1')
            const { body: res } = data
            const { code } = res
            expect(code).to.be.equal(200)
        })
    })
})
