const config = require('src/config/index')

/**
 * 数据库配置
 */
const { DB_CONFIG } = config
const  { DDB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = DB_CONFIG

module.exports = {
    dbOptions: {
        database: DDB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        dialect: 'mysql',
        host: DB_HOST,
        port: DB_PORT,
        logging: true
    },
    options: {
        type: 'ts',
        dir: 'src/models',
        camelCase: true,
        fileNameCamelCase: true,
        tsNoCheck: true,
        indentation: 4
    }
}