/**
 * 云开发API
 */
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import { Database } from '@cloudbase/node-sdk'
import OrderByDirection = Database.OrderByDirection

import cloudApp from './index'
import config from '@/config'
import { getFileExtension, getFileName } from '@/libs'
import { ReadStream } from 'fs'

const { CLOUD_APP } = config
const { PAGE_SIZE, DB_PREFIX } = CLOUD_APP // 默认分页

// 数据库初始化
const db = cloudApp.database()
const _ = db.command

/**
 * @desc 添加数据
 * @param tableName
 * @param data
 */
const add = function (tableName: string, data: any) {
    console.log('database add --->', {
        tableName,
        data
    })
    return db.collection(`${DB_PREFIX}${tableName}`).add({
        ...data,
        _createTime: Date.now(),
        _updateTime: Date.now()
    })
}

/**
 * @desc 查询数据
 * @param tableName
 * @param current 从1开始
 * @param size
 * @param filters 可多条件查询 [{ ENABLEd: true }]
 * @param orderBy
 * @param order 默认降序desc，asc升序
 */
const get = function (
    tableName: string,
    current = 1,
    size: number = PAGE_SIZE,
    filters: object[] = [],
    orderBy = '_createTime',
    order: OrderByDirection = 'desc' // 'desc' | 'asc'
) {
    console.log('database get --->', {
        tableName,
        current,
        size,
        filters,
        orderBy,
        order
    })
    const query = filters.length ? filters : [{}]
    return db
        .collection(`${DB_PREFIX}${tableName}`)
        .orderBy(orderBy, order) // 默认时间降序，从大到小
        .skip((current - 1) * size)
        .limit(Number(size))
        .where(_.or(query))
        .get()
}

/**
 * @desc 查询数据
 * @param tableName
 * @param filters 可多条件查询 [{ ENABLEd: true }]
 * @param orderBy
 * @param order 默认降序desc，asc升序
 */
const all = function (
    tableName: string,
    filters: object[] = [],
    orderBy = '_createTime',
    order: OrderByDirection = 'desc' // 'desc' | 'asc'
) {
    console.log('database all --->', {
        tableName,
        filters,
        orderBy,
        order
    })
    const query = filters.length ? filters : [{}]
    return db
        .collection(`${DB_PREFIX}${tableName}`)
        .orderBy(orderBy, order) // 默认时间降序，从大到小
        .where(_.or(query))
        .limit(1000)
        .get()
}

/**
 * @desc 查询总数
 * @param tableName
 * @param filters
 */
const getTotal = function (tableName: string, filters: object[] = []) {
    console.log('database getTotal --->', {
        tableName,
        filters
    })
    const query = filters.length ? filters : [{}]
    return db.collection(`${DB_PREFIX}${tableName}`).where(_.or(query)).count()
}

/**
 * @desc 条件查询数据
 * @param tableName
 * @param filters
 */
const getBy = function (tableName: string, filters: object[] = []) {
    console.log('database getBy --->', {
        tableName,
        filters
    })
    const query = filters.length ? filters : [{}]
    return db.collection(`${DB_PREFIX}${tableName}`).where(_.or(query)).get()
}

/**
 * @desc 获取单条数据
 * @param tableName
 * @param id
 */
const getOne = function (tableName: string, id: string | number) {
    console.log('database getOne --->', {
        tableName,
        id
    })
    return db.collection(`${DB_PREFIX}${tableName}`).doc(id).get()
}

/**
 * @desc 更新数据
 * @param tableName
 * @param data
 * @param id
 */
const update = function (tableName: string, data: object, id: string) {
    console.log('database update --->', {
        tableName,
        data,
        id
    })
    return db
        .collection(`${DB_PREFIX}${tableName}`)
        .doc(id)
        .update({
            ...data,
            _updateTime: Date.now()
        })
}

/**
 * @desc 删除
 * @param tableName
 * @param id
 */
const remove = function (tableName: string, id: string) {
    console.log('database remove --->', {
        tableName,
        id
    })
    return db.collection(`${DB_PREFIX}${tableName}`).doc(id).remove()
}

/**
 * @desc 文件上传
 * @param file
 * @param name
 */
const upload = function (file: ReadStream, name: string) {
    console.log('file upload --->', {
        name
    })
    const basePath = `cloud-app/${dayjs().format('YYYYMM')}/`
    const fileId = uuid()
    const fileType = getFileExtension(name)
    const fileName = getFileName(name, fileType)
    const cloudPath = `${basePath}${fileName}.${fileId}.${fileType}`
    return cloudApp.uploadFile({
        cloudPath: cloudPath,
        fileContent: file
    })
}

/**
 * @desc 获取云储存https链接
 * @param fileList
 */
const getTempFileURL = function (fileList: string[]) {
    console.log('getTempFileURL --->', {
        fileList
    })
    return cloudApp.getTempFileURL({
        fileList
    })
}

export default {
    db,
    add,
    get,
    all,
    getTotal,
    getOne,
    getBy,
    update,
    remove,
    upload,
    getTempFileURL,
    _
}
