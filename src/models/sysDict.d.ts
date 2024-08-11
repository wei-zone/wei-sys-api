import { Model, BuildOptions } from 'sequelize'
export interface ISysDictAttributes {
    id: number
    name?: string
    code?: string
    status?: number
    remark?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysDictModel extends ISysDictAttributes, Model {}
export type ISysDictModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysDictModel
}
