import { Model, BuildOptions } from 'sequelize'
export interface ISysDeptAttributes {
    id: number
    name: string
    code: string
    parentId: number
    treePath: string
    sort?: number
    status: number
    createdBy?: number
    createdAt?: Date
    updatedBy?: number
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysDeptModel extends ISysDeptAttributes, Model {}
export type ISysDeptModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysDeptModel
}
