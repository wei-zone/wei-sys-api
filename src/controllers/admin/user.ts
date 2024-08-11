import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import { Op } from 'sequelize'
import sysUser from '@/models/sysUser'
import sysUserRole from '@/models/sysUserRole'
import sysRole from '@/models/sysRole'
import sysRoleMenu from '@/models/sysRoleMenu'
import sysMenu from '@/models/sysMenu'
import sysDept from '@/models/sysDept'
const User = sysUser(sequelize)
const UserRole = sysUserRole(sequelize)
const Role = sysRole(sequelize)
const RoleMenu = sysRoleMenu(sequelize)
const Menu = sysMenu(sequelize)
const Dept = sysDept(sequelize)

// 定义关联关系
User.belongsTo(Dept, {
    foreignKey: 'deptId',
    as: 'dept' // 给关联定义一个别名
})
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
        const { id } = ctx.request.body
        const list = await User.destroy({
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
        const { id } = ctx.request.body
        // 使用提供的主键从表中仅获得一个条目.
        const res = await User.findByPk(id, {
            attributes: { exclude: ['password'] } // 不需要某些字段
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
        const { pageSize, pageCurrent, status = 1, keywords = '', order = [['createdAt', 'DESC']] } = ctx.request.body

        const filter = {
            /**
             * 模糊查询
             */
            [Op.or]: [
                { username: { [Op.like]: `%${keywords}%` } },
                { nickname: { [Op.like]: `%${keywords}%` } },
                { mobile: { [Op.like]: `%${keywords}%` } }
            ],
            status
        }

        const { count, rows } = await User.findAndCountAll({
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
            attributes: { exclude: ['password'] }, // 不需要某些字段
            // 筛选
            where: filter,
            include: [
                {
                    model: Dept,
                    as: 'dept', // 给关联定义一个别名
                    attributes: ['code', 'name'] // 不单独返回角色的其他字段
                },
                {
                    model: Role,
                    as: 'roles', // 给关联定义一个别名
                    through: { attributes: [] }, // 不需要返回中间表的数据
                    attributes: ['code', 'name'] // 不单独返回角色的其他字段
                }
            ],
            nest: true,
            group: ['sysUserModel.id'], // 根据用户ID进行分组
            raw: true // 返回平坦的结果集
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
