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
            comment: 'ID',
            field: 'id'
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '父菜单ID',
            field: 'parentId'
        },
        treePath: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '父节点ID路径',
            field: 'treePath'
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '菜单名称',
            field: 'name'
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '菜单类型（1-菜单 2-目录 3-外链 4-按钮）',
            field: 'type'
        },
        routeName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '路由名称（Vue Router 中用于命名路由）',
            field: 'routeName'
        },
        routePath: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '路由路径（Vue Router 中定义的 URL 路径）',
            field: 'routePath'
        },
        component: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '组件路径（组件页面完整路径，相对于 src/views/，缺省后缀 .vue）',
            field: 'component'
        },
        perm: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '【按钮】权限标识',
            field: 'perm'
        },
        alwaysShow: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '【目录】只有一个子路由是否始终显示（1-是 0-否）',
            field: 'alwaysShow'
        },
        keepAlive: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '【菜单】是否开启页面缓存（1-是 0-否）',
            field: 'keepAlive'
        },
        visible: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '1',
            primaryKey: false,
            autoIncrement: false,
            comment: '显示状态（1-显示 0-隐藏）',
            field: 'visible'
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
        icon: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
            autoIncrement: false,
            comment: '菜单图标',
            field: 'icon'
        },
        redirect: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '跳转路径',
            field: 'redirect'
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
        params: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: '路由参数',
            field: 'params'
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
        tableName: 'sys_menu',
        comment: '',
        indexes: []
    }
    const SysMenuModel = sequelize.define('sysMenuModel', attributes, options)
    return SysMenuModel
}
