import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import model from '@/models/examUser'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const Model = model(sequelize)

/**
 * 登录
 * @param ctx
 */
export const login = async (ctx: Context) => {
    try {
        const data = ctx.request.body
        const { username, password } = data
        const res: any = await Model.findOne({
            where: {
                username,
                password
            }
        })
        if (!res) {
            ctx.fail({
                message: '用户名或密码错误'
            })
            return
        }

        // 更新登录时间
        await Model.update(
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
 *  用户信息
 * @param ctx
 */
export const me = async (ctx: Context) => {
    try {
        const { id } = ctx.request.body
        const res = await Model.findByPk(id)
        ctx.success({
            data: res
        })
    } catch (error) {
        throw error
    }
}
