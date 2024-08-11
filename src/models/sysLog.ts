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
        module: {
            type: DataTypes.ENUM('LOGIN', 'USER', 'ROLE', 'DEPT', 'MENU', 'DICT', 'OTHER'),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '日志模块',
            field: 'module'
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '日志内容',
            field: 'content'
        },
        requestUri: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '请求路径',
            field: 'requestUri'
        },
        ip: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: 'IP地址',
            field: 'ip'
        },
        province: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '省份',
            field: 'province'
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '城市',
            field: 'city'
        },
        executionTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '执行时间(ms)',
            field: 'executionTime'
        },
        browser: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '浏览器',
            field: 'browser'
        },
        browserVersion: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '浏览器版本',
            field: 'browserVersion'
        },
        os: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '终端系统',
            field: 'os'
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
        tableName: 'sys_log',
        comment: '',
        indexes: []
    }
    const SysLogModel = sequelize.define('sysLogModel', attributes, options)
    return SysLogModel
}
