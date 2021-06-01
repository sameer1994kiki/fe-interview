<!-- https://juejin.cn/post/6844904086823780366 -->
<!-- https://juejin.cn/post/6844904065202126856 -->
<!-- https://juejin.cn/post/6844903591375814669 -->
<!-- https://juejin.cn/post/6868201557436055565 -->
<!-- https://juejin.cn/post/6844903874050916365 -->
<!-- https://juejin.cn/post/6844904009333997582 -->

<!-- https://juejin.cn/post/6844903837774397447 因此这条命令也可以删除，使用挂载的方式来启动容器。 -->
<!-- https://juejin.cn/post/6844903956305412109 -->
<!-- https://juejin.cn/post/6844903829033451534 -->
<!-- https://juejin.cn/post/6844903849006727176 -->
<!-- https://juejin.cn/post/6844904118020997128 -->
<!-- https://juejin.cn/post/6844903512959107080 -->



docker ps：查询处于运行状态的容器
查看服务启动情况：
sudo docker-compose ps

查看对应服务日志：
sudo docker-compose logs -f counselor-mece

可进入docker容器内部进行代码确定：(exit命令退出)
sudo docker-compose exec counselor-mece sh

docker相关其它命令
sudo docker-compose up -d xxx     // 启动对应服务
sudo docker-compose stop xxx       // 停止对应服务
sudo docker-compose rm -f xxx      // 删除对应服务及内存配置（需执行完stop后再执行）



# 查找镜像、搜索docker hub网站镜像的详细信息
docker search 关键词
 
# 查看本地所有镜像
docker images
 
# 删除指定本地镜像
docker rmi -f 镜像ID或者镜像名:TAG # -f 表示强制删除
 
# 获取镜像的元信息，详细信息
docker inspect 镜像ID或者镜像名:TAG
 
 
# 下载镜像，Tag表示版本，有些镜像的版本显示latest，为最新版本
docker pull 镜像名:TAG
 
 
# 构建镜像
d docker build -t 镜像名(地址):TAG 路径
 
 
# 推送镜像
docker pull 镜像名(地址):TAG



# 运行容器
docker run --name 容器名 -i -t -p 主机端口:容器端口 -d -v 主机目录:容器目录:ro 镜像TD或镜像名:TAG
 
# --name 指定容器名，可自定义，不指定自动命名
# -i 以交互模式运行容器
# -t 分配一个伪终端，即命令行，通常组合来使用
# -p 指定映射端口，将主机端口映射到容器内的端口
# -d 后台运行容器
# -v 指定挂载主机目录到容器目录，默认为rw读写模式，ro表示只读
 
# 查看正在运行的容器
docker ps -a -q # -a 查看所有容器(运行中、未运行) 
                # -q 只查看容器的ID
 
# 启动容器：
docker start 容器ID或容器名
 
# 停止容器：
docker stop 容器ID或容器名
 
# 删除容器：
docker rm -f 容器ID或容器名 # -f 表示强制删除
 
# 查看日志：
docker logs 容器ID或容器名
 
# 进入正在运行容器：
docker exec -it 容器ID或者容器名 /bin/bash
docker exec -it 容器ID或者容器名 sh
 
# 进入正在运行的容器并且开启交互模式终端
# /bin/bash是固有写法，作用是因为docker后台必须运行一个进程，否则容器就会退出，在这里表示启动容器后启动bash。
# 也可以用docker exec在运行中的容器执行命令
 
# 拷贝文件：
docker cp 主机文件路径 容器ID或容器名:容器路径 # 主机中文件拷贝到容器中
docker cp 容器ID或容器名:容器路径 主机文件路径 # 容器中文件拷贝到主机中
 
# 获取容器元信息：
docker inspect 容器ID或容器名


















FROM nginx：基于哪个镜像
COPY ./index.html /usr/share/nginx/html/index.html：将宿主机中的./index.html文件复制进容器里的/usr/share/nginx/html/index.html
EXPOSE 80：容器对外暴露80端口




