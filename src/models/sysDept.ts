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
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '部门名称',
            field: 'name'
        },
        code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '部门编号',
            field: 'code',
            unique: 'uk_code'
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0',
            primaryKey: false,
            autoIncrement: false,
            comment: '父节点id',
            field: 'parentId'
        },
        treePath: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '父节点id路径',
            field: 'treePath'
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0',
            primaryKey: false,
            autoIncrement: false,
            comment: '显示顺序',
            field: 'sort'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '1',
            primaryKey: false,
            autoIncrement: false,
            comment: '状态(1-正常 0-禁用)',
            field: 'status'
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '创建时间',
            field: 'createdAt'
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
        tableName: 'sys_dept',
        comment: '',
        indexes: []
    }
    const SysDeptModel = sequelize.define('sysDeptModel', attributes, options)
    return SysDeptModel
}
