/**
 * @Author: forguo
 * @Date: 2023/9/24 17:50
 * @Description: config.dev.ts
 */

// 本地开发配置

export default {
    PORT: '3003', // 服务端口
    /**
     * 小程序配置
     * */
    MIN_APP: {
        APP_ID: 'APP_ID',
        APP_SECRET: 'APP_SECRET',
        JWT_SECRET: 'JWT_SECRET',
        JWT_EXPIRES_IN: 60 * 60 * 24 * 7 // token有效期7天
    },
    /**
     * 公众号配置
     * */
    WE_APP: {
        APP_ID: 'APP_ID',
        SECRET: 'SECRET',
        JWT_SECRET: 'JWT_SECRET',
        JWT_EXPIRES_IN: 60 * 60 * 24 * 7 // token有效期7天
    },
    /**
     * 后台配置
     * */
    ADMIN_APP: {
        JWT_SECRET: 'wei_sys',
        JWT_EXPIRES_IN: 60 * 60 * 24 * 7, // token有效期7天
        tokenType: 'Bearer'
    },
    /**
     * COS_CONFIG
     */
    COS_CONFIG: {
        COS_SECRET_ID: 'COS_SECRET_ID', // 腾讯云密钥id
        COS_SECRET_KEY: 'COS_SECRET_KEY', // 腾讯云密钥key
        COS_BUCKET: 'COS_BUCKET', // 存储桶名称
        COS_REGION: 'ap-shanghai', // 所属地域
        COS_PATH: 'city-exam-dev' // 所属地域
    },
    /**
     * 切片上传配置
     */
    CHUNK_CONFIG: {
        // 切片目录
        CHUNK_DIR: '/chunks/'
    },
    /**
     * 云开发配置
     */
    CLOUD_APP: {
        ENV_Id: 'ENV_Id', // 云开发环境id
        PAGE_SIZE: 10, // 默认分页 10，
        DB_PREFIX: 'wei_', // 数据库前缀
        SECRET_ID: '', // 腾讯云密钥id
        SECRET_KEY: '' // 腾讯云密钥key
    },
    /**
     * 数据库配置
     */
    DB_CONFIG: {
        DB_NAME: 'DB_NAME',
        DB_USER: 'DB_USER',
        DB_PASSWORD: 'DB_PASSWORD',
        DB_HOST: '127.0.0.1',
        DB_PORT: 3306,
        DB_PREFIX: 'exam'
    }
}
