import { Model, BuildOptions } from 'sequelize'
export interface ISysRoleAttributes {
    id: number
    name: string
    code: string
    sort?: number
    status?: number
    dataScope?: number
    createdBy?: number
    createdAt?: Date
    updatedBy?: number
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysRoleModel extends ISysRoleAttributes, Model {}
export type ISysRoleModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysRoleModel
}
