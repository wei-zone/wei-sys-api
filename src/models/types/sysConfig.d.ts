import { Model, BuildOptions } from 'sequelize'
export interface ISysConfigAttributes {
    id: number
    configName: string
    configKey: string
    configValue: string
    remark?: string
    createBy: number
    updateBy?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysConfigModel extends ISysConfigAttributes, Model {}
export type ISysConfigModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysConfigModel
}
