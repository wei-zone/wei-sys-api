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
    browser?: string
    browserVersion?: string
    os?: string
    createdBy?: number
    createdAt?: Date
    deletedAt?: Date
}
export interface ISysLogModel extends ISysLogAttributes, Model {}
export type ISysLogModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysLogModel
}
