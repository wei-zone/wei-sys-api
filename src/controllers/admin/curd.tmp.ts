import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import model from '@/models/sysUser'
import { QueryTypes } from 'sequelize'

const Model = model(sequelize)

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
        const { id } = ctx.request.body
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
        const { id, ...data } = ctx.request.body
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
        const { id } = ctx.request.body
        // 使用提供的主键从表中仅获得一个条目.
        const res = await Model.findByPk(id)
        ctx.success({
            data: res
        })
    } catch (error) {
        throw error
    }
}

/**
 * 查询列表
 * @param ctx
 */
export const list = async (ctx: Context) => {
    try {
        /**
         * 原始 sql 查询
         */
        // const sql = `
        // SELECT
        //     u.id,
        //     u.username,
        //     u.nickname,
        //     u.mobile,
        //     u.gender,
        //     u.avatar,
        //     u.status,
        //     d.name AS deptName,
        //     GROUP_CONCAT(r.name) AS roleNames
        //         FROM
        //     sys_user u
        // LEFT JOIN sys_dept d ON u.deptId = d.id
        // LEFT JOIN sys_user_role sur ON u.id = sur.userId
        // LEFT JOIN sys_role r ON sur.roleId = r.id
        // GROUP BY
        //     u.id;
        // `
        // const list = await sequelize.query(sql, {
        //     type: QueryTypes.SELECT,
        //     raw: true, // 是否使用数组组装的方式展示结果
        //     logging: true // 是否将 SQL 语句打印到控制台
        // })

        const { pageSize, pageCurrent, fields, filter, order = [['createdAt', 'DESC']] } = ctx.request.body
        const { count, rows } = await Model.findAndCountAll({
            limit: pageSize,
            offset: (pageCurrent - 1) * pageSize,
            // 排序
            order,
            /**
             * 字段过滤
             * attribute: ['name', 'id’], // 只查出某些字段
             * attributes: { exclude: ['id'] }, // 不需要某些字段
             * attributes: ['id', ['name', 'label_name']], // 重写字段名称，name 改成 label_name
             */
            attributes: fields,
            // 条件筛选
            where: filter
        })

        ctx.success({
            data: {
                pageSize,
                pageCurrent,
                list: rows,
                count
            }
        })
    } catch (error) {
        throw error
    }
}
