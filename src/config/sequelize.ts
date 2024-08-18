import { Sequelize } from 'sequelize'
import config from '@/config'

const { DB_CONFIG } = config
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_PREFIX } = DB_CONFIG

/**
 * 连接数据库
 */
console.log('init sequelize...')

// 创建连接
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    logging: process.env.NODE_ENV !== 'development' ? (...msg) => console.log(msg) : false, // 显示所有日志函数调用参数
    pool: {
        max: 5, // 连接池最大连接数量
        min: 0, // 最小连接数量
        idle: 10000 // 如果一个线程10s内没有被用过就释放
    },
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    define: {
        // schema表前缀
        // schema: DB_PREFIX,
        // schemaDelimiter: '_',
        // 是否冻结表名,最好设置为true，要不sequelize会自动给表名加上复数s造成查询数据失败。
        // mongoose也有这样的问题..
        freezeTableName: true,
        // 是否为表添加 createdAt 和 updatedAt 字段
        // createdAt 记录表的创建时间
        // updatedAt 记录字段更新时间
        timestamps: true,
        // 是否为表添加 deletedAt 字段，软删除
        paranoid: true,
        // 把驼峰命名转换为下划线
        underscored: false,
        charset: 'utf8'
    },
    timezone: '+08:00', // 时区，在中国就是 +8
    dialectOptions: {
        // 字符集
        supportBigNumbers: true,
        bigNumberStrings: true,
        dateStrings: true,
        typeCast: true
    }
} as any)

// 测试是否能连通
sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.')
        // 仅当数据库名称以 'dev_' 开头时,它才会运行.sync()
        // sequelize.sync({ force: true })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })
export default sequelize
