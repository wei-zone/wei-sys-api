import { Model, BuildOptions } from 'sequelize'
export interface ISysUserAttributes {
    id: number
    username?: string
    nickname?: string
    gender?: number
    password?: string
    deptId?: number
    avatar?: string
    mobile?: string
    status?: number
    email?: string
    createdAt?: Date
    createdBy?: number
    updatedAt?: Date
    updatedBy?: number
    lastLoginAt?: Date
    deletedAt?: Date
}
export interface ISysUserModel extends ISysUserAttributes, Model {}
export type ISysUserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysUserModel
}
