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

/**
 * 转为大驼峰写法
 * @param target
 */
export const toCamelCase = (target: string, Delimiter = '-'): string => {
    return target
        .replace(/^\//, '') // 去除首字母的斜杠
        .split(Delimiter) // 按照 '-' 分割字符串
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase() // 第一个单词全小写
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // 首字母大写，后续字母小写
        })
        .join('') // 将数组拼接成字符串
}

/**
 * @description 解析用户代理字符串
 * @param agent
 * @returns
 */
export const parseUserAgent = (agent?: string) => {
    if (!agent) {
        return {
            browserName: undefined,
            browserVersion: undefined,
            osName: undefined,
            osVersion: undefined
        }
    }
    // 浏览器正则表达式
    const browsers = [
        { name: 'Edge', regex: /Edge\/(\d+)/ },
        { name: 'Chrome', regex: /Chrome\/(\d+)/ },
        { name: 'Firefox', regex: /Firefox\/(\d+)/ },
        { name: 'Safari', regex: /Safari\/(\d+)/ },
        { name: 'Opera', regex: /Opera\/(\d+)/ },
        { name: 'IE', regex: /MSIE (\d+)/ },
        { name: 'IE', regex: /Trident\/.*rv:(\d+)/ } // IE11 特殊处理
    ]

    // 操作系统正则表达式
    const os = [
        { name: 'Windows', regex: /Windows NT (\d+\.\d+)/ },
        { name: 'macOS', regex: /Mac OS X (\d+)/ },
        { name: 'iOS', regex: /iPhone OS (\d+)/ },
        { name: 'Android', regex: /Android (\d+)/ },
        { name: 'Linux', regex: /Linux/ }
    ]

    let browserName = 'Unknown'
    let browserVersion = 'Unknown'
    let osName = 'Unknown'
    let osVersion = 'Unknown'

    // 检测浏览器
    for (let i = 0; i < browsers.length; i++) {
        const match = agent.match(browsers[i].regex)
        if (match) {
            browserName = browsers[i].name
            browserVersion = match[1]
            break
        }
    }

    // 检测操作系统
    for (let i = 0; i < os.length; i++) {
        const match = agent.match(os[i].regex)
        if (match) {
            osName = os[i].name
            osVersion = match[1] || 'Unknown'
            break
        }
    }

    return {
        browserName,
        browserVersion,
        osName,
        osVersion
    }
}

// // 示例 User-Agent 字符串
// const userAgentString =
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'

// // 解析 User-Agent
// const parsedAgent = parseUserAgent(userAgentString)

// console.log(`浏览器: ${parsedAgent.browserName}, 版本: ${parsedAgent.browserVersion}`)
// console.log(`操作系统: ${parsedAgent.osName}, 版本: ${parsedAgent.osVersion}`)
