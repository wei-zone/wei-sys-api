import { getFileExtension, getFileName } from './file'
import { expect } from 'chai'

describe('#test file libs', () => {
    describe('#test getFileExtension', () => {
        it('should return the correct file extension', () => {
            expect(getFileExtension('test.txt')).to.be.equal('txt')
            expect(getFileExtension('document.pdf')).to.be.equal('pdf')
            expect(getFileExtension('image.png')).to.be.equal('png')
            expect(getFileExtension('archive.tar.gz')).to.be.equal('gz')
            expect(getFileExtension('fileWithoutExtension')).to.be.equal('')
        })
    })
    describe('#test getFileName', () => {
        it('should return the correct file name without extension', () => {
            expect(getFileName('test.txt')).to.be.equal('test')
            expect(getFileName('document.pdf')).to.be.equal('document')
            expect(getFileName('image.png')).to.be.equal('image')
            expect(getFileName('archive.tar.gz')).to.be.equal('archive.tar')
            expect(getFileName('fileWithoutExtension')).to.be.equal('fileWithoutExtension')
        })
        it('should return the correct file name with specified extension', () => {
            expect(getFileName('test.txt', 'txt')).to.be.equal('test')
            expect(getFileName('document.pdf', 'pdf')).to.be.equal('document')
            expect(getFileName('image.png', 'png')).to.be.equal('image')
            expect(getFileName('archive.tar.gz', 'gz')).to.be.equal('archive.tar')
            expect(getFileName('fileWithoutExtension', '')).to.be.equal('fileWithoutExtension')
        })
    })
})
