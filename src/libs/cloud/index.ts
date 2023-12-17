/**
 * 云开发初始化
 */
import cloud from '@cloudbase/node-sdk'
import config from '@/config'
const { CLOUD_APP } = config
const { ENV_Id, SECRET_ID, SECRET_KEY } = CLOUD_APP // 默认分页

// 开发环境初始化
const cloudApp = cloud.init({
    env: ENV_Id,
    secretId: SECRET_ID,
    secretKey: SECRET_KEY
})

export default cloudApp

export { default as cloud } from './apis'
