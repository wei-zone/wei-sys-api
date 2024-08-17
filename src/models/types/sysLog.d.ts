import { Model, BuildOptions } from 'sequelize'
export interface ISysLogAttributes {
    id: number
    module: any
    content: string
    requestUri?: string
    ip?: string
    province?: string
    city?: string
    executionTime?: number
    userAgent?: string
    browser?: string
    browserVersion?: string
    os?: string
    osVersion?: string
    from?: string
    method?: string
    status?: string
    message?: string
    createdBy?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysLogModel extends ISysLogAttributes, Model {}
export type ISysLogModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysLogModel
}
