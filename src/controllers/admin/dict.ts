import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import { Op } from 'sequelize'
import sysModel from '@/models/sysDict'
import sysDictItem from '@/models/sysDictItem'
import { COMMA, ENABLES_TATUS } from '@/constant'
const Model = sysModel(sequelize)
const DictItem = sysDictItem(sequelize)

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
            [Op.or]: [{ name: { [Op.like]: `%${keywords}%` } }]
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
        const { status = ENABLES_TATUS.ENABLE, keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const filter = {
            /**
             * 模糊查询
             */
            [Op.or]: [{ name: { [Op.like]: `%${keywords}%` } }],
            status
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
            data: data.map((item: any) => ({
                label: item.name,
                value: item.value
            }))
        })
    } catch (error) {
        throw error
    }
}

/**
 * 全量列表
 * @param ctx
 */
export const optionsByCode = async (ctx: Context) => {
    try {
        const { code = '' } = ctx.params

        if (!code) {
            throw new Error('code 不能为空')
        }

        const find: any = await Model.findOne({
            where: {
                code,
                status: ENABLES_TATUS.ENABLE
            }
        })
        if (!find) {
            throw new Error('字典不存在')
        }

        const { status = ENABLES_TATUS.ENABLE, keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const filter = {
            /**
             * 模糊查询
             */
            [Op.or]: [{ name: { [Op.like]: `%${keywords}%` } }],
            status,
            dictId: find.id
        }

        const data = await DictItem.findAll({
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
            data: data.map((item: any) => ({
                label: item.name,
                value: item.value
            }))
        })
    } catch (error) {
        throw error
    }
}

/**
 * 单个字典值
 * @param ctx
 */
export const optionByCode = async ({ code, value }: any) => {
    try {
        if (!code || value == null) {
            throw new Error('code 和 value 不能为空')
        }

        const find: any = await Model.findOne({
            where: {
                status: ENABLES_TATUS.ENABLE,
                code
            }
        })
        if (!find) {
            throw new Error('字典不存在')
        }

        const filter = {
            dictId: find.id,
            status: ENABLES_TATUS.ENABLE,
            value
        }

        const data = await DictItem.findOne({
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] }, // 不需要某些字段
            where: filter
        })

        return data
    } catch (error) {
        throw error
    }
}
