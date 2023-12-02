import crypto from 'crypto'

// sha1加密
export const sha1 = str => {
    const shasum = crypto.createHash('sha1')
    shasum.update(str)
    str = shasum.digest('hex')
    return str
}

/**
 * 生成签名的时间戳
 * @return {string}
 */
export const createTimestamp = () => {
    return new Date().getTime() / 1000 + ''
}

/**
 * 生成签名的随机串
 * @return {string}
 */
export const createNonceStr = () => {
    return Math.random().toString(36).substr(2, 15)
}

/**
 * 对参数对象进行字典排序
 * @param  {object} args 签名所需参数对象
 * @return {string}    排序后生成字符串
 */
export const raw = args => {
    let keys = Object.keys(args)
    keys = keys.sort()
    const newArgs = {}
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key]
    })

    let string = ''
    for (const k in newArgs) {
        string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)
    return string
}

/**
 * 生成唯一字符
 * @param {string} prefix 前缀
 * @param {number} length 字符串长度
 * @returns {string} 唯一字符
 */
export function generateUniqueChar(prefix: string, length: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let char = ''
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length)
        char += chars[index]
    }
    return `${prefix}${char}`
}
