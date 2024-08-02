import path from 'path'
import moduleAlias from 'module-alias'
;(function () {
    // 根据环境变量选择别名指向地址
    const srcPath = path.resolve(__dirname, '../src/')

    const packagePath = path.resolve(__dirname, '../package.json')

    // 配置别名
    moduleAlias.addAlias('@', srcPath)
    moduleAlias.addAlias('@/package', packagePath)
})()
