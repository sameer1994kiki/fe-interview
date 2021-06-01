pm2 是 node 进程管理工具，可以利用它来简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，
<!-- https://juejin.cn/post/6844904048768843784 -->

PM2 的主要特性

内建负载均衡（使用 Node cluster 集群模块）
后台运行
0 秒停机重载，我理解大概意思是维护升级的时候不需要停机.
具有 Ubuntu 和 CentOS 的启动脚本
停止不稳定的进程（避免无限循环）
控制台检测
提供 HTTP API
远程控制和实时的接口 API ( Nodejs 模块,允许和 PM2 进程管理器交互 )

<!-- https://juejin.cn/post/6844903710037016584 -->


启动进程/应用 pm2 start bin/www 或 pm2 start app.js
重命名进程/应用 pm2 start app.js --name wb123
添加进程/应用watch pm2 start bin/www --watch
结束进程/应用 pm2 stop www
结束所有进程/应用 pm2 stop all
删除进程/应用 pm2 delete www
删除所有进程/应用 pm2 delete all
列出所有进程/应用 pm2 list
查看某个进程/应用具体情况 pm2 describe www
查看进程/应用的资源消耗情况 pm2 monit
查看pm2的日志 pm2 logs
若要查看某个进程/应用的日志,使用 pm2 logs www
重新启动进程/应用 pm2 restart www
重新启动所有进程/应用 pm2 restart all


<!-- https://juejin.cn/post/6844904146609373197 -->

<!-- https://juejin.cn/post/6960843722644783141 -->