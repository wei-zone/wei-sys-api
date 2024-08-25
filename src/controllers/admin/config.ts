import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import { Op } from 'sequelize'
import sysModel from '@/models/sysConfig'
import { COMMA, ENABLES_TATUS } from '@/constant'
import { getJwtInfo } from '@/libs'
const Model = sysModel(sequelize)

/**
 * 创建
 * @param ctx
 */
export const create = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const user = getJwtInfo(ctx)
        const res = await Model.create({
            ...data,
            createdBy: user.id
        })
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
        const { id = '' } = ctx.params

        const ids = id.split(COMMA)

        if (!ids || !ids.length) throw new Error('请选择要删除的数据')

        const query = {
            where: {
                [Op.or]: [
                    ...[
                        // 直接匹配 id
                        {
                            id: {
                                [Op.in]: ids
                            }
                        }
                    ]
                ]
            }
        }

        // 记录删除的人
        const user = getJwtInfo(ctx)
        await Model.update(
            {
                updatedBy: user.id
            },
            query
        )

        const data = await Model.destroy(query)

        ctx.success({
            data
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

        const user = getJwtInfo(ctx)
        const res = await Model.update(
            {
                ...data,
                updatedBy: user.id
            },
            {
                // 条件筛选
                where: {
                    id
                }
            }
        )
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
 * 查询列表
 * @param ctx
 */
export const list = async (ctx: Context) => {
    try {
        const { pageSize = 10, pageCurrent = 1, keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const filter = {
            /**
             * 模糊查询
             */
            [Op.or]: [{ configName: { [Op.like]: `%${keywords}%` } }, { configKey: { [Op.like]: `%${keywords}%` } }]
        }

        const { count: total, rows } = await Model.findAndCountAll({
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
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] }, // 不需要某些字段
            // 筛选
            where: filter
            // raw: true // 返回平坦的结果集【此时无分组】
        })

        ctx.success({
            data: {
                list: rows,
                total
            }
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
        const { order = [['createdAt', 'DESC']] } = ctx.request.body

        const data = await Model.findAll({
            // 排序
            order,
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] } // 不需要某些字段
        })

        ctx.success({
            data: data.map((item: any) => ({
                label: item.name,
                value: item.id
            }))
        })
    } catch (error) {
        throw error
    }
}
