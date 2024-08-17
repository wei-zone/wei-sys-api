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
            comment: '主键',
            field: 'id'
        },
        dictId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '字典ID',
            field: 'dictId'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '字典项名称',
            field: 'name'
        },
        value: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '字典项值',
            field: 'value'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0',
            primaryKey: false,
            autoIncrement: false,
            comment: '状态（1-正常，0-禁用）',
            field: 'status'
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0',
            primaryKey: false,
            autoIncrement: false,
            comment: '排序',
            field: 'sort'
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '备注',
            field: 'remark'
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
        tableName: 'sys_dict_item',
        comment: '',
        indexes: []
    }
    const SysDictItemModel = sequelize.define('sysDictItemModel', attributes, options)
    return SysDictItemModel
}
