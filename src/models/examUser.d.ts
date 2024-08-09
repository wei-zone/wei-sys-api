import { Model, BuildOptions } from 'sequelize'
export interface IExamUserAttributes {
    id: number
    username: string
    nickname?: string
    password: string
    lastLoginAt?: Date
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}
export interface IExamUserModel extends IExamUserAttributes, Model {}
export type IExamUserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IExamUserModel
}
