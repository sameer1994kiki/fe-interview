<!-- PWA（Progressive web apps,渐进式 Web 应用） -->
<!-- https://juejin.cn/post/6844903588267835406 系列文章 -->
<!-- https://juejin.cn/book/6844733815944904712 小册子 -->
<!-- https://juejin.cn/post/6844904052166230030 问答形式 -->
<!-- https://mp.weixin.qq.com/s/e9I2G2JD-SXfJLLLThyaIg -->
PWA(Progressive web apps, 渐进式Web应用)，近两年被炒的十分火爆，它有什么优点呢？

可以生成桌面小图标，不需要打开浏览器，方便用户访问
通过网络缓存提升页面访问速度，达到渐进式的页面甚至离线访问，提升用户体验
实现类似app的推送功能，生成系统通知推送给用户

web应用依赖于浏览器作为入口就会很慢（新开webview的过程）



<!-- https://juejin.cn/post/6844903603967115272 -->

旨在使用现有的web技术提供用户更优的使用体验。
基本要求

可靠（Reliable）
即使在不稳定的网络环境下，也能瞬间加载并展现
快速响应（Fast）
快速响应，并且有平滑的动画响应用户的操作
粘性(Engaging)
像设备上的原生应用，具有沉浸式的用户体验，用户可以添加到桌面


除以上的基准要求外，还应该包括以下特性：

渐进式 - 适用于所有浏览器，因为它是以渐进式增强作为宗旨开发的
连接无关性 - 能够借助 Service Worker 在离线或者网络较差的情况下正常访问
类似应用 - 由于是在 App Shell 模型基础上开发，因为应具有 Native App 的交互和导航，给用户 Native App 的体验
持续更新 - 始终是最新的，无版本和更新问题
安全 - 通过 HTTPS 协议提供服务，防止窥探和确保内容不被篡改
可索引 - 应用清单文件和 Service Worker 可以让搜索引擎索引到，从而将其识别为『应用』
粘性 - 通过推送离线通知等，可以让用户回流
可安装 - 用户可以添加常用的 webapp 到桌面，免去去应用商店下载的麻烦
可链接 - 通过链接即可分享内容，无需下载安装




由以下几种技术构成：

App Manifest
Service Worker
Notifications API
Push API

其中Service Worker是PWA技术的关键，它们可以让app满足上面的三基准。其他技术则是锦上添花，让app更加的强大。


<!-- https://juejin.cn/post/6844903571356401677 -->


功能(还是比较逆天的)

后台数据的同步
从其他域获取资源请求
接受计算密集型数据的更新，多页面共享该数据
客户端编译与依赖管理
后端服务的hook机制
根据URL模式，自定义模板
性能优化
消息推送
定时默认更新
地理围栏


## 生命周期
Parsed （ 解析成功 ）： 首次注册 SW 时，浏览器解决脚本并获得入口点，如果解析成功，就可以访问到 SW 注册对象，在这一点中我们需要在 HTML 页面中添加一个判断，判断该浏览器是否支持 SW 。


Installing （ 正在安装 ）：SW 脚本解析完成之后，浏览器会尝试进行安装，installing 中 install 事件被执行，如果其中有 event.waitUntil ( ) 方法，则 installing 事件会一直等到该方法中的 Promise 完成之后才会成功，如果 Promise 被拒绝，则安装失败，SW会进入 Redundant（ 废弃 ）状态。


Installed / Waiting （安装成功/等待中）：如果安装成功，SW 将会进入这个状态。


Activating （ 正在激活 ）：处于 waiting 状态的 SW 发生以下情况，将会进入 activating 状态中：
当前已无激活状态的 worker 、 SW脚本中的 self.skipWaiting（）方法被调用 （ ps： self 是 SW 中作用于全局的对象，这个方法根据英文翻译过来也能明白什么意思啦，跳过等待状态 ）、用户已关闭 SW 作用域下的所有页面，从而释放了当前处于激活状态的 worker、超出指定时间，从而释放当前处于激活状态的 worker


Activated （ 激活成功 ）：该状态，其成功接收了 document 全面控制的激活态 worker 。


Redundant （ 废弃 ）：这个状态的出现时有原因的，如果 installing 事件失败或者 activating 事件失败或者新的 SW 替换其成为激活态 worker 。installing 事件失败和 activating 事件失败的信息我们可以在 Chrome 浏览器的 DevTools 中查看



<!-- https://juejin.cn/post/6844903599445639181 -->
<!-- https://juejin.cn/post/6919756817778262023 -->