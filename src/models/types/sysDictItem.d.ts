import { Model, BuildOptions } from 'sequelize'
export interface ISysDictItemAttributes {
    id: number
    dictId?: number
    name?: string
    value?: string
    status?: number
    sort?: number
    remark?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysDictItemModel extends ISysDictItemAttributes, Model {}
export type ISysDictItemModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysDictItemModel
}
