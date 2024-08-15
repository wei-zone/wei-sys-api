//@ts-nocheck
import { Sequelize, DataTypes } from 'sequelize'
export default function (sequelize: Sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '角色名称',
            field: 'name',
            unique: 'uk_name'
        },
        code: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '角色编码',
            field: 'code',
            unique: 'uk_code'
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '显示顺序',
            field: 'sort'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '1',
            primaryKey: false,
            autoIncrement: false,
            comment: '角色状态(1-正常 0-停用)',
            field: 'status'
        },
        dataScope: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '数据权限(0-所有数据 1-部门及子部门数据 2-本部门数据3-本人数据)',
            field: 'dataScope'
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '创建人 ID',
            field: 'createdBy'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '更新时间',
            field: 'createdAt'
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '更新人ID',
            field: 'updatedBy'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '创建时间',
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
        tableName: 'sys_role',
        comment: '',
        indexes: []
    }
    const SysRoleModel = sequelize.define('sysRoleModel', attributes, options)
    return SysRoleModel
}
