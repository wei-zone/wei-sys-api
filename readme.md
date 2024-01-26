# koa2-quick-start

> koa2-template, koa2-quick-start, koa2-ts-quick-start

## Start

[local](http://127.0.0.1:3000/)

[api-docs](http://127.0.0.1:3003/api-docs)

[https://forguo.cn/api/](https://forguo.cn/api/)

[https://forguo.cn/api/api-docs](https://forguo.cn/api/api-docs)

```bash
# install dependencies
pnpm install

# serve with hot reload at localhost:3000
pnpm run dev

# build for production with minification
pnpm run build
```

## Features

- [x] koa2
- [x] typescript
- [x] eslint
- [x] prettier
- [x] husky
- [x] lint-staged
- [x] release-it
- [x] commitizen
- [x] socket.io

## 接口

默认接口：微信jssdk

[http://127.0.0.1:3000/v1/weapp/jssdk?url=1](http://127.0.0.1:3000/v1/weapp/jssdk?url=1)

## 接口文档

[https://github.com/Surnet/swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

[https://editor.swagger.io/](https://editor.swagger.io/)

用法

```js
定义model
/**
 * @swagger
 * definitions:
 *   Pet:
 *     properties:
 *       name:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

/**
 * @swagger
 * /api/petAdd:
 *   post:
 *     tags:
 *       - pet
 *     description: Creates a new pet
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pet
 *         description: pet object
 *         in: body
 *         required: true
 *         schema:
 *           // 引用model
 *           $ref: '#/definitions/Pet'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/api/petAdd', (req, res, next) => {
  const { query } = req
  res.send({
    status: 200,
    data: true,
    msg: '请求成功',
  })
})

/**
 * @swagger
 * /api/puppies/{id}:
 *   put:
 *     tags:
 *      - pet
 *     description: Updates a single pet
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: pet
 *        description: Fields for the pet resource
 *        in: body
 *        schema:
 *         type: array
 *         $ref: '#/definitions/Pet'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.put('/api/petEdit', (req, res, next) => {
  const { query } = req
  res.send({
    status: 200,
    data: true,
    msg: '请求成功',
  })
})

/**
 * @swagger
 * /api/petDelete:
 *   delete:
 *     tags:
 *       - pet
 *     description: Deletes a single pet
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: pet's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.put('/api/petDelete', (req, res, next) => {
  const { query } = req
  res.send({
    status: 200,
    data: true,
    msg: '请求成功',
  })
})
```
