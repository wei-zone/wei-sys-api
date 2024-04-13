/**
 * 扩展 koa Context，ts 会自动融合类型
 */
import { IResponse } from '@/types/response'

export * from 'koa'
declare module 'koa' {
    /**
     * 添加 send 和 fail 方法
     */
    interface Context {
        /**
         * 响应成功
         * @param data 响应数据
         */
        send: (data: IResponse) => void
        /**
         * 响应失败
         * @param data
         */
        fail: (data: IResponse) => void
    }
}
