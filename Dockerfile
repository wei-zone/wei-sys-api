## 拉取node镜像来打包koa项目 #
## https://hub.docker.com/_/node
## 使用官方 Node.js 轻量级镜像.
FROM node:18.12-alpine as build

## 定义工作目录
WORKDIR /usr/src/app

## Copy application dependency manifests to the container image.
## A wildcard is used to ensure both package.json AND package-lock.json are copied.
## Copying this separately prevents re-running npm install on every code change.
## 将依赖定义文件拷贝到工作目录下
COPY . ./

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npmmirror.com

## Install production dependencies.
RUN npm install
# RUN npm run build

# 配置时区
RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone

## 将3003端口暴露出来
EXPOSE 3003

# 执行启动命令
# 写多行独立的CMD命令是错误写法！只有最后一行CMD命令会被执行，之前的都会被忽略，导致业务报错。
# 请参考[Docker官方文档之CMD命令](https://docs.docker.com/engine/reference/builder/#cmd)

CMD ["npm", "run", "start"]
