import { Model, BuildOptions } from 'sequelize'
export interface ISysMenuAttributes {
    id: number
    parentId: number
    treePath?: string
    name: string
    type: number
    routeName?: string
    routePath?: string
    component?: string
    perm?: string
    alwaysShow?: number
    keepAlive?: number
    visible: number
    sort?: number
    icon?: string
    redirect?: string
    createdAt?: Date
    updatedAt?: Date
    params?: any
    deletedAt?: Date
}
export interface ISysMenuModel extends ISysMenuAttributes, Model {}
export type ISysMenuModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ISysMenuModel
}
