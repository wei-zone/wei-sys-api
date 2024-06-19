/**
 * @Author: forguo
 * @Date: 2023/12/3 21:10
 * @Description: file.ts
 */

/**
 * 获取文件后缀名
 * @param fileName
 */
export const getFileExtension = (fileName: string): string => {
    const ext = fileName.split('.').pop()
    if (!ext || ext === fileName) return ''
    return ext.toLowerCase()
}

/**
 * 获取文件名
 */
export const getFileName = (fileName: string, extname?: string): string => {
    const ext = extname || getFileExtension(fileName)
    return fileName.replace(`.${ext}`, '')
}
