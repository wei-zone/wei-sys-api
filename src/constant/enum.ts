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
    // 参数验证失败
    COREFAIL = 1003
}

/**
 * 返回信息
 */
export enum RES_MESSAGE {
    // 成功
    SUCCESS = 'success',
    // 失败
    COMMFAIL = 'comm fail',
    // 参数验证失败
    VALIDATEFAIL = 'validate fail',
    // 核心异常
    COREFAIL = 'core fail'
}

/**
 * 事件
 */
export enum EVENT {}
