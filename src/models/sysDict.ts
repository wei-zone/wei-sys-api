//@ts-nocheck
import { Sequelize, DataTypes } from 'sequelize'
export default function (sequelize: Sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键 ',
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '类型名称',
            field: 'name'
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '类型编码',
            field: 'code',
            unique: 'uk_code'
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0',
            primaryKey: false,
            autoIncrement: false,
            comment: '状态(0:正常;1:禁用)',
            field: 'status'
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
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
        tableName: 'sys_dict',
        comment: '',
        indexes: []
    }
    const SysDictModel = sequelize.define('sysDictModel', attributes, options)
    return SysDictModel
}
