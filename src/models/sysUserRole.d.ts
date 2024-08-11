import { Model, BuildOptions } from 'sequelize'
export interface ISysUserRoleAttributes {
    userId: number
    roleId: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysUserRoleModel extends ISysUserRoleAttributes, Model {}
export type ISysUserRoleModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysUserRoleModel
}
