//@ts-nocheck
import { Sequelize, DataTypes } from 'sequelize'
export default function (sequelize: Sequelize) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: 'id'
        },
        configName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '配置名称',
            field: 'configName'
        },
        configKey: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '配置key',
            field: 'configKey'
        },
        configValue: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '配置值',
            field: 'configValue'
        },
        remark: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '描述、备注',
            field: 'remark'
        },
        createBy: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '创建人ID',
            field: 'createBy'
        },
        updateBy: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '更新人ID',
            field: 'updateBy'
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
        tableName: 'sys_config',
        comment: '',
        indexes: []
    }
    const SysConfigModel = sequelize.define('sysConfigModel', attributes, options)
    return SysConfigModel
}
