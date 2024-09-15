# wei-sys-api

> 基于 Koa2、TypeScript、MySQL、Sequelize、JWT、Vue3、Element Plu 构建后台权限管理系统

[在线预览](https://wei-sys-admin.vercel.app)
[前端仓库](https://github.com/wei-zone/wei-sys-admin)

## Features

🚀 开发框架: 服务端 `Koa2` + `TypeScript`，前端 `Vue3` + `TypeScript` + `Element-Plus`。

🛠️ 功能模块: 包括用户管理、角色管理、菜单管理、部门管理、字典管理等功能，REST 风格 api。

📘 接口文档: [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) 生成 `Swagger UI` 接口文档，支持在线调试。

📔 日志记录: [log4js](https://github.com/log4js-node/log4js-node) 进行日志管理，支持在线预览。

🗄 数据操作: `MySQL 8.0` + [Sequelize](https://github.com/sequelize/sequelize) ORM 工具，简化数据库操作。

📐 代码规范: 使用 ESLint 和 Prettier 确保代码质量和风格一致性。

🧪 单元测试: `mocha` 实现单元测试。

## Start

首先，需要去导出数据库，`src/models/wei_sys.sql`

### 数据库

MySQL 8.0

[Ubuntu - 安装MySQL8](https://blog.csdn.net/qq_43116031/article/details/133823687)

#### 数据库同步

[sequelize-automate](https://github.com/nodejh/sequelize-automate)

### 运行

```bash
# npm config set registry https://registry.npmmirror.com

# install dependencies
pnpm install

# serve with hot reload at localhost:3000
pnpm run dev

# build for production with minification
pnpm run build
```

