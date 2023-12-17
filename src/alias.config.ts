import path from 'path'
import moduleAlias from 'module-alias'
;(function () {
    const NODE_ENV = process.env.NODE_ENV || 'development'
    // 根据环境变量选择别名指向地址
    const srcPath = NODE_ENV === 'development' ? path.resolve(__dirname, '../src/') : path.resolve(__dirname, '../src/')

    const packagePath =
        NODE_ENV === 'development'
            ? path.resolve(__dirname, '../package.json')
            : path.resolve(__dirname, '../package.json')

    // 配置别名
    moduleAlias.addAlias('@', srcPath)
    moduleAlias.addAlias('@/package', packagePath)
})()
