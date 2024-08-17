//@ts-nocheck
import { Sequelize, DataTypes } from 'sequelize'
export default function (sequelize: Sequelize) {
    const attributes = {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: false,
            comment: '角色ID',
            field: 'roleId'
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: false,
            comment: '菜单ID',
            field: 'menuId'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '创建时间',
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '更新时间',
            field: 'updatedAt'
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '删除时间，为空未删除',
            field: 'deletedAt'
        }
    }
    const options = {
        tableName: 'sys_role_menu',
        comment: '',
        indexes: [
            {
                name: 'ukRoleIdMenuId',
                unique: true,
                type: 'BTREE',
                fields: ['roleId', 'menuId']
            }
        ]
    }
    const SysRoleMenuModel = sequelize.define('sysRoleMenuModel', attributes, options)
    return SysRoleMenuModel
}
