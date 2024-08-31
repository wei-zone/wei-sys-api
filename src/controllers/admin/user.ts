import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import { Op } from 'sequelize'
import sysUser from '@/models/sysUser'
import sysUserRole from '@/models/sysUserRole'
import sysRole from '@/models/sysRole'
import sysDept from '@/models/sysDept'
import { COMMA, ENABLES_TATUS } from '@/constant'
import { getJwtInfo } from '@/libs'
import { optionByCode } from './dict'
const User = sysUser(sequelize)
const UserRole = sysUserRole(sequelize)
const Role = sysRole(sequelize)
const Dept = sysDept(sequelize)

// 定义关联关系
User.belongsTo(Dept, {
    foreignKey: 'deptId',
    as: 'dept' // 给关联定义一个别名
})

// 多对多
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    // otherKey: 'roleId',
    as: 'roles' // 给关联定义一个别名
})
Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    // otherKey: 'userId',
    as: 'user' // 给关联定义一个别名
})

/**
 * 创建
 * @param ctx
 */
export const create = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const res = await User.create(data)
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
        const res = await User.bulkCreate(data)
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
        await User.update(
            {
                updatedBy: user.id
            },
            query
        )

        const data = await User.destroy(query)

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
        const res = await User.update(data, {
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
        const { id } = ctx.params
        // 使用提供的主键从表中仅获得一个条目.
        const res: any = await User.findByPk(id, {
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] }, // 不需要某些字段
            // 关联表查询
            include: [
                {
                    model: Dept,
                    as: 'dept', // 给关联定义一个别名
                    attributes: ['code', 'name', 'id'] // 不单独返回角色的其他字段
                },
                {
                    model: Role,
                    as: 'roles', // 给关联定义一个别名
                    through: { attributes: [] }, // 不需要返回中间表的数据
                    attributes: ['code', 'name', 'id'] // 不单独返回角色的其他字段
                }
            ]
        })
        ctx.success({
            data: {
                ...res.toJSON(),
                roleIds: res.roles ? res.roles.map((item: any) => item.toJSON().id) : []
            }
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
         * 联表查询，原始 sql
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

        const {
            deptId = '',
            pageSize = 10,
            pageCurrent = 1,
            keywords = '',
            order = [['createdAt', 'DESC']]
        } = ctx.request.body

        const filter: any = {
            /**
             * 模糊查询
             */
            [Op.or]: [
                { username: { [Op.like]: `%${keywords}%` } },
                { nickname: { [Op.like]: `%${keywords}%` } },
                { mobile: { [Op.like]: `%${keywords}%` } }
            ]
        }

        if (deptId) {
            filter.deptId = { [Op.eq]: deptId }
        }
        const { count: total, rows } = await User.findAndCountAll({
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
            // 关联表查询
            include: [
                {
                    model: Dept,
                    as: 'dept', // 给关联定义一个别名
                    attributes: ['code', 'name', 'id'] // 不单独返回角色的其他字段
                },
                {
                    model: Role,
                    as: 'roles', // 给关联定义一个别名
                    through: { attributes: [] }, // 不需要返回中间表的数据
                    attributes: ['code', 'name', 'id'] // 不单独返回角色的其他字段
                }
            ]
            // raw: true // 返回平坦的结果集【此时无分组】
        })

        const list: any[] = []
        for (let index = 0; index < rows.length; index++) {
            const item: any = rows[index]
            const gender: any = await optionByCode({
                code: 'gender',
                value: item?.gender
            })
            list.push({
                ...item.toJSON(),
                genderLabel: gender?.name
            })
        }

        ctx.success({
            data: {
                pageSize,
                pageCurrent,
                list: list,
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

        const data = await User.findAll({
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
                value: item.id
            }))
        })
    } catch (error) {
        throw error
    }
}
