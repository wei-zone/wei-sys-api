import { Model, BuildOptions } from 'sequelize'
export interface ISysRoleMenuAttributes {
    roleId: number
    menuId: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}
export interface ISysRoleMenuModel extends ISysRoleMenuAttributes, Model {}
export type ISysRoleMenuModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysRoleMenuModel
}
