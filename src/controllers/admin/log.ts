import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import { Op } from 'sequelize'
import sysModel from '@/models/sysLog'
import sysUser from '@/models/sysUser'
import { getJwtInfo, parseUserAgent } from '@/libs'
const Model = sysModel(sequelize)
const User = sysUser(sequelize)

// 设置关联
Model.belongsTo(User, { foreignKey: 'createdBy', as: 'operator' }) // 假设外键字段名为 createBy
// User.hasMany(Model, { foreignKey: 'createdBy' }) // 这个关联是可选的，取决于你的查询需求

/**
 * 数据库日志记录
 * @param ctx
 * @param data
 */
export const apiLog = async (ctx: Context, data: any, from = 'api') => {
    try {
        // 数据库日志记录
        const originalUrl = ctx.request.originalUrl
        const group = (ctx.request.originalUrl?.match(/(\/v1\/admin\/)([\w]+)/)?.[2] || 'others').toUpperCase()
        let module = group.slice(0, group.length - 1)

        const moduleEnum = ['LOGIN', 'USER', 'ROLE', 'DEPT', 'MENU', 'DICT', 'OTHER']
        if (!moduleEnum.includes(module)) {
            module = 'OTHER'
        }
        const userAgent = ctx.request.header['user-agent']
        const authorization = ctx.request.header.authorization
        const { browserName, browserVersion, osName, osVersion } = parseUserAgent(userAgent)

        const executionTime = Date.now() - (ctx.requestTime || 0)

        const user = authorization ? getJwtInfo(ctx) : data?.user || {}

        const logData: any = {
            createdBy: user?.id || 0,
            from,
            module,
            content: JSON.stringify(ctx.request.body || ctx.request.query)?.slice(0, 1000),
            requestUri: originalUrl,
            ip: ctx.request.ip,
            executionTime,
            userAgent,
            browser: browserName,
            browserVersion,
            os: osName,
            osVersion,
            method: ctx.request.method,
            message: data?.message?.slice(0, 1000),
            status: data?.code
        }
        await Model.create(logData)
    } catch (error) {
        throw error
    }
}
/**
 * 创建
 * @param ctx
 */
export const create = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const res = await apiLog(ctx, data, 'web-admin')
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
            [Op.or]: [{ content: { [Op.like]: `%${keywords}%` } }]
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
            where: filter,
            include: {
                model: User,
                as: 'operator',
                attributes: ['username', 'nickname']
            }
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
        const { keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const filter = {
            /**
             * 模糊查询
             */
            [Op.or]: [{ content: { [Op.like]: `%${keywords}%` } }]
        }

        const data = await Model.findAll({
            order,
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] }, // 不需要某些字段
            // 筛选
            where: filter,
            include: {
                model: User,
                as: 'operator',
                attributes: ['username', 'nickname']
            }
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
