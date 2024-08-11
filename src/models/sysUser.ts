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
        username: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '用户名',
            field: 'username',
            unique: 'login_name'
        },
        nickname: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '昵称',
            field: 'nickname'
        },
        gender: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '1',
            primaryKey: false,
            autoIncrement: false,
            comment: '性别((1-男 2-女 0-保密)',
            field: 'gender'
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '密码',
            field: 'password'
        },
        deptId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '部门ID',
            field: 'deptId'
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '用户头像',
            field: 'avatar'
        },
        mobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '联系方式',
            field: 'mobile'
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '1',
            primaryKey: false,
            autoIncrement: false,
            comment: '状态((1-正常 0-禁用)',
            field: 'status'
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '用户邮箱',
            field: 'email'
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
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '创建人ID',
            field: 'createdBy'
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
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '修改人ID',
            field: 'updatedBy'
        },
        lastLoginAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '登录时间',
            field: 'lastLoginAt'
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
        tableName: 'sys_user',
        comment: '',
        indexes: []
    }
    const SysUserModel = sequelize.define('sysUserModel', attributes, options)
    return SysUserModel
}
