/**
 * 接口响应体
 */
export interface IResponse {
    code?: number
    message?: string
    success?: boolean
    serverTime?: number
    data?: any
}
