import { Context } from 'koa'
import sequelize from '@/config/sequelize'
import model from '@/models/sysUser'

const User = model(sequelize)

/**
 * 访问统计
 * @param ctx
 */
export const visit = async (ctx: Context) => {
    try {
        const totalCount = await User.count()
        const data = [
            {
                type: 'user',
                title: '总用户数',
                totalCount
            },
            {
                type: 'pv',
                title: '浏览量',
                totalCount: 400
            },
            {
                type: 'uv',
                title: '访客数',
                totalCount: 100
            },
            {
                type: 'ip',
                title: 'IP数',
                totalCount: 43
            }
        ]
        ctx.success({
            data
        })
    } catch (error) {
        throw error
    }
}

export const trend = (ctx: Context) => {
    const data = {
        dates: [
            '2024-06-30',
            '2024-07-01',
            '2024-07-02',
            '2024-07-03',
            '2024-07-04',
            '2024-07-05',
            '2024-07-06',
            '2024-07-07'
        ],
        pvList: [1751, 5168, 4882, 5301, 4721, 4885, 1901, 1003],
        uvList: null,
        ipList: [207, 566, 565, 631, 579, 496, 222, 152]
    }
    ctx.success({
        data
    })
}
