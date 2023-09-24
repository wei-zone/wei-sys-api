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
