/**
 * 状态(1-正常 0-禁用)
 */
export enum ENABLES_TATUS {
    ENABLE = 1,
    DISABLED = 0
}

/**
 * 菜单类型(1-菜单 2-目录 3-外链 4-按钮)
 */
export enum MENU_TYPE {
    MENU = 1,
    CATALOG = 2,
    EXTLINK = 3,
    BUTTON = 4
}

/**
 * 返回码
 */
export enum RES_CODE {
    // 成功
    SUCCESS = 200,
    // 失败
    COMMFAIL = 1001,
    // 参数验证失败
    VALIDATEFAIL = 1002,
    // 核心异常
    COREFAIL = 1003,
    // code不合法
    INVALIDCODE = 1004,
    // 验证码无效
    INVALIDCAPTCHA = 1005,
    /**
     * 令牌无效或过期
     */
    TOKEN_INVALID = 401
}

/**
 * 返回信息
 */
export enum RES_MESSAGE {
    // 成功
    SUCCESS = 'success',
    // 失败
    COMMFAIL = '服务异常，请重试!',
    // 参数验证失败
    VALIDATEFAIL = '参数验证失败',
    // 核心异常
    COREFAIL = 'core fail',
    // code不合法
    INVALIDCODE = 'code错误',
    // 验证码无效
    INVALIDCAPTCHA = '验证码错误'
}

/**
 * 事件
 */
export enum EVENT {}
