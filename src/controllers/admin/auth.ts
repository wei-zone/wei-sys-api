import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import sysUser from '@/models/sysUser'
import sysUserRole from '@/models/sysUserRole'
import sysRole from '@/models/sysRole'
import sysRoleMenu from '@/models/sysRoleMenu'
import sysDept from '@/models/sysDept'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import sysMenu from '@/models/sysMenu'
import { toCamelCase } from '@/libs'
import { MenuTypeEnum } from '@/types/enums'

const User = sysUser(sequelize)
const UserRole = sysUserRole(sequelize)
const Role = sysRole(sequelize)
const RoleMenu = sysRoleMenu(sequelize)
const Menu = sysMenu(sequelize)
const Dept = sysDept(sequelize)

/**
 * 登录
 * @param ctx
 */
export const login = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const { username, password } = data
        const res: any = await User.findOne({
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] }, // 不需要某些字段
            where: {
                username,
                password
            }
        })
        console.log('user', res)
        if (!res) {
            ctx.fail({
                message: '用户名或密码错误'
            })
            return
        }

        // 更新登录时间
        await User.update(
            { lastLoginAt: dayjs() },
            {
                where: {
                    username,
                    password
                }
            }
        )
        ctx.success({
            data: {
                user: res,
                accessToken: uuid(),
                tokenType: 'Bearer',
                refreshToken: null,
                expires: null
            }
        })
    } catch (error) {
        throw error
    }
}

/**
 * 登出
 * @param ctx
 */
export const logout = async (ctx: Context) => {
    try {
        ctx.success({
            data: {}
        })
    } catch (error) {
        throw error
    }
}

/**
 * 生成路由树
 */
export const transferRouteTree = (list: any[], lastParentId = 0) => {
    const length = list.length
    const routes: any[] = []
    for (let i = 0; i < length; i++) {
        const menu = list[i]
        const {
            id,
            parentId,
            name,
            type,
            routeName,
            routePath,
            component,
            alwaysShow,
            keepAlive,
            visible,
            icon,
            redirect,
            params
        } = menu
        if (parentId === lastParentId && type !== MenuTypeEnum.BUTTON) {
            const meta: any = {
                title: name,
                icon,
                hidden: !visible,
                alwaysShow: !!alwaysShow,
                keepAlive: false,
                params: null
            }

            // 是否开启页面缓存
            if (MenuTypeEnum.MENU === type && !!keepAlive) {
                meta.keepAlive = true
            }

            if (params) {
                meta.params = params || {}
            }

            const children: any = transferRouteTree(list, id)

            const route = {
                // 根据path路由跳转 this.$router.push({path:xxx})
                path: routePath,
                component,
                redirect,
                // 根据name路由跳转 this.$router.push({name:xxx})
                // 路由 name 需要驼峰，首字母大写
                name: routeName || toCamelCase(routePath, '-'),
                meta,
                children: []
            }
            if (children.length) {
                route.children = children
            }
            routes.push(route)
        }
    }
    return routes
}

/**
 *  用户信息
 * @param ctx
 */
export const me = async (ctx: Context) => {
    try {
        const { id: userId = 2 } = ctx.request.body
        // mock
        const user: any = await User.findByPk(userId, {
            attributes: { exclude: ['password', 'updatedAt', 'deletedAt'] } // 不需要某些字段
        })

        if (!user) {
            ctx.fail({
                message: '用户不存在'
            })
            return
        }

        // 角色关系 --> 角色 id
        const userRoleIds = await UserRole.findAll({
            where: {
                userId
            }
        })

        // 角色列表
        const roles = await Role.findAll({
            where: {
                id: userRoleIds.map((item: any) => item.roleId)
            }
        })

        // 角色菜单 --> 菜单 id
        const roleMenuIds = await RoleMenu.findAll({
            where: {
                roleId: roles.map((item: any) => item.id)
            }
        })

        // 菜单列表
        const menus = await Menu.findAll({
            attributes: { exclude: ['deletedAt'] }, // 不需要某些字段
            where: {
                id: roleMenuIds.map((item: any) => item.menuId)
            }
        })

        const routes = transferRouteTree(menus, 0)

        const data = {
            userId,
            nickname: user.nickname,
            username: user.username,
            avatar: user.avatar,
            // 角色 ['ADMIN']
            roles: roles.map((item: any) => item.code),
            // 按钮权限标识
            perms: menus.filter((item: any) => item.type === MenuTypeEnum.BUTTON).map((item: any) => item.perm),
            // 路由权限
            routes
        }

        ctx.success({
            data: data
        })
    } catch (error) {
        throw error
    }
}
