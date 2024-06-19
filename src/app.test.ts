import { expect } from 'chai'
// import App from './app'

describe('#app main', () => {
    it('has the testing environment set correctly', () => {
        expect(process.env.NODE_ENV).to.not.equal('production')
    })
})
