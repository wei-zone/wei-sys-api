echo -e "---------登录阿里云镜像容器服务--------"
# 登录阿里云镜像容器服务
docker login --username=$1 registry.cn-hangzhou.aliyuncs.com --password=$2
echo -e "---------停掉镜像--------"
# 停掉容器
docker stop koa2-ali
echo -e "---------删除本地容器和镜像--------"
# 删除本地容器
docker rm koa2-ali
# 删除本地镜像
docker rmi registry.cn-hangzhou.aliyuncs.com/cloud-apps/koa2:latest
echo -e "---------拉取镜像--------"
# 拉取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/cloud-apps/koa2:latest

echo -e "---------创建容器并运行容器--------"
# -rm: docker会在容器退出时删除与它关联的数据卷
# -d: 后台运行容器，并返回容器ID
# -p: 端口映射，本机端口:容器端口
# --name: 指定容器名称
# 最后一个为镜像名称
docker run --rm -d -p 10086:3003 --name koa2-ali registry.cn-hangzhou.aliyuncs.com/cloud-apps/koa2:latest
echo -e "--------- ✅  Successfully Deployed --------"
