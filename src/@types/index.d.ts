/**
 * 扩展 koa Context
 */
import { IResponse } from '@/types/type'

export * from 'koa'
declare module 'koa' {
    /**
     * 添加 send 和 fail 方法
     */
    interface Context {
        send: (data: IResponse) => void
        fail: (data: IResponse) => void
    }
}
