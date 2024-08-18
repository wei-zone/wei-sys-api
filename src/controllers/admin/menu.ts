import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import { Op } from 'sequelize'
import sysModel from '@/models/sysMenu'
import { EnableStatus, MenuTypeEnum } from '@/types/enums'
const Model = sysModel(sequelize)

/**
 * 创建
 * @param ctx
 */
export const create = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const res = await Model.create(data)
        ctx.success({
            data: res
        })
    } catch (error) {
        throw error
    }
}

/**
 * 批量创建
 * @param ctx
 */
export const createBatch = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const res = await Model.bulkCreate(data)
        ctx.success({
            data: res
        })
    } catch (error) {
        throw error
    }
}

/**
 * 删除 - 软删除，增加 deletedAt 字段 paranoid: true
 * 如果你想要恢复一个软删除的记录，你可以设置deletedAt字段为null。
 * @param ctx
 */
export const destroy = async (ctx: Context) => {
    try {
        const { id } = ctx.params
        const list = await Model.destroy({
            // 条件筛选
            where: {
                id
            }
        })
        ctx.success({
            data: list
        })
    } catch (error) {
        throw error
    }
}

/**
 * 更新
 * @param ctx
 */
export const update = async (ctx: Context) => {
    try {
        const { id } = ctx.params
        const data = ctx.request.body
        const res = await Model.update(data, {
            // 条件筛选
            where: {
                id
            }
        })
        ctx.success({
            data: res
        })
    } catch (error) {
        throw error
    }
}

/**
 * 详情
 * @param ctx
 */
export const detail = async (ctx: Context) => {
    try {
        console.log('ctx.params', ctx.params)
        const { id } = ctx.params
        // 使用提供的主键从表中仅获得一个条目.
        const res = await Model.findByPk(id, {
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] } // 不需要某些字段
        })
        ctx.success({
            data: res
        })
    } catch (error) {
        throw error
    }
}

/**
 * 生成菜单树
 */
const transferMenuTree = (list: any[], lastParentId = 0) => {
    const length = list.length
    const menus: any[] = []
    for (let i = 0; i < length; i++) {
        const menu = list[i]
        const { id, parentId, name, type, routeName, routePath, component, sort, visible, icon, redirect, perm } = menu
        if (parentId === lastParentId) {
            const children: any = transferMenuTree(list, id)
            const menu = {
                id,
                parentId,
                name,
                type: MenuTypeEnum[type],
                routeName,
                routePath,
                component,
                sort,
                visible,
                icon,
                redirect,
                perm,
                children: []
            }
            if (children.length) {
                menu.children = children
            }
            menus.push(menu)
        }
    }
    return menus.sort((a, b) => a.sort - b.sort)
}

/**
 * 生成选择树
 */
const transferMenuTreeOptions = (list: any[], lastParentId = 0) => {
    const length = list.length
    const menus: any[] = []
    for (let i = 0; i < length; i++) {
        const menu = list[i]
        const { id, parentId, name, sort } = menu
        if (parentId === lastParentId) {
            const children: any = transferMenuTreeOptions(list, id)
            const menu = {
                sort,
                value: id,
                label: name,
                children: []
            }
            if (children.length) {
                menu.children = children
            }
            menus.push(menu)
        }
    }
    return menus.sort((a, b) => a.sort - b.sort)
}

/**
 * 查询列表
 * @param ctx
 */
export const list = async (ctx: Context) => {
    try {
        const { keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const filter = {
            /**
             * 模糊查询
             */
            [Op.or]: [{ name: { [Op.like]: `%${keywords}%` } }]
        }

        const data = await Model.findAll({
            // 排序
            order,
            /**
             * 字段过滤
             * attribute: ['name', 'id’], // 只查出某些字段
             * attributes: { exclude: ['id'] }, // 不需要某些字段
             * attributes: ['id', ['name', 'label_name']], // 重写字段名称，name 改成 label_name
             */
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] }, // 不需要某些字段
            // 筛选
            where: filter
            // raw: true // 返回平坦的结果集【此时无分组】
        })

        ctx.success({
            data: transferMenuTree(data, 0)
        })
    } catch (error) {
        throw error
    }
}

/**
 * 全量列表
 * @param ctx
 */
export const options = async (ctx: Context) => {
    try {
        const { status = EnableStatus.enable, keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const data = await Model.findAll({
            // 排序
            order,
            /**
             * 字段过滤
             * attribute: ['name', 'id’], // 只查出某些字段
             * attributes: { exclude: ['id'] }, // 不需要某些字段
             * attributes: ['id', ['name', 'label_name']], // 重写字段名称，name 改成 label_name
             */
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] } // 不需要某些字段
        })

        ctx.success({
            data: transferMenuTreeOptions(data, 0)
        })
    } catch (error) {
        throw error
    }
}