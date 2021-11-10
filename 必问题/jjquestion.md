#核心基础篇
# 一、JS基础
# 1 类型及检测方式
JS内置类型
JavaScript一共有8种数据类型，其中有7种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol（es6新增，表示独一无二的值）和BigInt（es10新增）；
数据类型检测
typeof
instanceof
1. 数据类型转换
转换为布尔值
转换为数字
转换为字符串
转Boolean
四则运算符
null 和 undefined 的区别？

# 2 This
obj.fn()，便是 obj 调用了函数，既函数中的 this === obj
fn()，这里可以看成 window.fn()，因此 this === window
但这种机制并不完全能满足我们的业务需求，因此提供了三种方式可以手动修改 this 的指向:
call: fn.call(target, 1, 2)
apply: fn.apply(target, [1, 2])
bind: fn.bind(target)(1,2)

# 3 apply/call/bind 原理

# 4 变量提升
相同的函数会覆盖上一个函数，并且函数优先于变量提升
# 5 执行上下文
当执行 JS 代码时，会产生三种执行上下文

全局执行上下文
函数执行上下文
eval 执行上下文
每个执行上下文中都有三个重要的属性,执行上下文可以简单理解为一个对象:
变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
this指向

# 6 作用域
作用域：
作用域链： 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和 函数。
作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前 端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。
全局作用域
函数作用域
块级作用域，ES6 中的 let、const 就可以产生该作用域


# 7 闭包
闭包其实就是一个可以访问其他函数内部变量的函数。创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以 访问到当前函数的局部变量。


# 8 New的原理
常见考点
new 做了那些事？
new 返回不同的类型时会有什么表现？
手写 new 的实现过程
new 关键词的主要作用就是执行一个构造函数、返回一个实例对象，在 new 的过程中，根据构造函数的情况，来确定是否可以接受参数的传递。
new 操作符可以帮助我们构建出一个实例，并且绑定上 this，内部执行步骤可大概分为以下几步：

创建一个新对象
对象连接到构造函数原型上，并绑定 this（this 指向新对象）
执行构造函数代码（为这个新对象添加属性）
返回新对象
在第四步返回新对象这边有一个情况会例外：
当构造函数中 return 的不是一个对象时，那么它还是会根据 new 关键词的执行逻辑，生成一个新的对象（绑定了最新 this），最后返回出来

因此我们总结一下：new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象
手工实现New的过程

# 9 原型/原型链
__proto__和prototype关系：__proto__和constructor是对象独有的。2️⃣prototype属性是函数独有的

# 10 继承
涉及面试题：原型如何实现继承？Class 如何实现继承？Class 本质是什么？
首先先来讲下 class，其实在 JS中并不存在类，class 只是语法糖，本质还是函数
# 11 面向对象
一般面向对象包含：继承，封装，多态，抽象

1. 对象形式的继承
2. 类的继承
3. 封装
4. 静态成员
5. 私有与公有
6. 模块化
7. 多态
8. 抽象类


# 12 事件机制
涉及面试题：事件的触发过程是怎么样的？知道什么是事件代理嘛？
事件流有三个阶段
事件捕获阶段
处于目标阶段
事件冒泡阶段
事件捕获
1. 捕获和冒泡
2. 事件对象
3. 事件流阻止
4. 事件注册
5. 事件委托

# 13 模块化
js 中现在比较成熟的有四种模块加载方案：
CommonJS ,AMD,CMD ,ES6
AMD 和 CMD 规范的区别？
谈谈对模块化开发的理解?
# 14 Iterator迭代器
原型部署了Iterator接口的数据结构有三种，具体包含四种，分别是数组，类似数组的对象，Set和Map结构
为什么对象（Object）没有部署Iterator接口呢？
一是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。然而遍历遍历器是一种线性处理，对于非线性的数据结构，部署遍历器接口，就等于要部署一种线性转换
对对象部署Iterator接口并不是很必要，因为Map弥补了它的缺陷，又正好有Iteraotr接口


# 15 Promise
# 16 Generator
Generator 最大的特点就是可以控制函数的执行。
这里你可以说说 Generator的异步编程，以及它的语法糖 async 和 awiat，传统的异步编程。ES6 之前，异步编程大致如下
回调函数
事件监听
发布/订阅
传统异步编程方案之一：协程，多个线程互相协作，完成异步任务。

# 17 async/await
Generator 函数的语法糖。有更好的语义、更好的适用性、返回值是 Promise。
await 和 promise 一样，更多的是考笔试题，当然偶尔也会问到和 promise 的一些区别。
# 18 事件循环


1. 浏览器事件循环

涉及面试题：异步代码执行顺序？解释一下什么是 Event Loop ？
总结起来就是：一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。

1. Node 中的 Event loop

Node 的 Event loop 分为6个阶段，它们会按照顺序反复运行
总结来说，Node.js 事件循环的发起点有 4 个：

Node.js 启动后；
setTimeout 回调函数；
setInterval 回调函数；
也可能是一次 I/O 后的回调函数。
无限循环有没有终点

Node.js 是单线程的还是多线程的？

EventLoop 对渲染的影响
requestIdlecallback 和 requestAnimationFrame

# 19 垃圾回收
针对JavaScript的来及回收机制有以下两种方法（常用）：标记清除，引用计数

# 20 内存泄露
意外的全局变量: 无法被回收
定时器: 未被正确关闭，导致所引用的外部变量无法被释放
事件监听: 没有正确销毁 (低版本浏览器可能出现)
闭包

# 21 深浅拷贝

# 22 节流与防抖

# 23 Proxy代理

# 24 Ajax

# 25 深入数组
1. 冒泡排序
2. 快速排序
3. 插入排序
4. 选择排序
5. 堆排序
6. 归并排序



#
二、HTML
# 3 性能优化
性能优化是前端开发中避不开的问题，性能问题无外乎两方面原因：渲染速度慢、请求时间长。性能优化虽然涉及很多复杂的原因和解决方案，但其实只要通过合理地使用标签，就可以在一定程度上提升渲染速度以及减少请求时间

1. script 标签：调整加载顺序提升渲染速度
2. link 标签：通过预处理提升渲染速度
3. 搜索优化

# 4 如何高效操作DOM
1. 为什么说 DOM 操作耗时
1.1 线程切换
1.2 重新渲染
2.1 在循环外操作元素
2.2 批量操作元素

三、CSS基础
# 1 盒模型
box-sizing
# 2 BFC
# 3 层叠上下文
# 4 左右居中方案
# 5 上下垂直居中方案
# 6 选择器权重计算方式
# 7 清除浮动
# 8 左边定宽，右边自适应方案
# 9 左右两边定宽，中间自适应
# 10 CSS动画和过渡
# 11 CSS3的新特性
# 12 列举几个css中可继承和不可继承的元素
# flex grid







# 四、浏览器


# 1 浏览器架构
# 2 JavaScript单线程模型
JavaScript语言的一大特点就是单线程，也就是说，同一时间只能做一件事，前面的任务没做完，后面的任务只能等着。
1. 为什么JavaScript是单线程的呢?
2. 浏览器内核中线程之间的关系
3. 浏览器是多进程的优点
4. 进程和线程又是什么呢
5. 任务队列
# 3 Chrome 打开一个页面需要启动多少进程？分别有哪些进程？
# 4 渲染机制

1. 浏览器如何渲染网页
浏览器渲染一共有五步


1. 渲染优化相关

3.1 Load 和 DOMContentLoaded 区别

3.2 图层

3.3 重绘（Repaint）和回流（Reflow）

# 5 缓存机制
1. 首先得明确 http 缓存的好处

减少了冗余的数据传输，减少网费
减少服务器端的压力
Web 缓存能够减少延迟与网络阻塞，进而减少显示某个资源所用的时间
加快客户端加载网页的速度
2. 常见 http 缓存的类型

私有缓存（一般为本地浏览器缓存）
代理缓存
3. 然后谈谈本地缓存
与本地缓存相关的头有：Cache-Control、Expires，Cache-Control有多个可选值代表不同的意义，而Expires就是一个日期格式的绝对值。
Last-Modified/If-Modified-Since 与 ETag/If-None-Match

缓存位置

浏览器缓存的位置的话，可以分为四种,优先级从高到低排列分别👇

Service Worker
Memory Cache
Disk Cache
Push Cache

# 6 浏览器存储
cookie和localSrorage、session、indexDB 的区别
# 7 跨域方案
很多种方法，但万变不离其宗，都是为了搞定同源策略。重用的有 jsonp、iframe、cors、img、HTML5 postMessage等等。其中用到 html 标签进行跨域的原理就是 html 不受同源策略影响。但只是接受 Get 的请求方式，这个得清楚。

# 8 XSS 和 CSRF

# 9 Service Worker

# 10 DOM 节点操作
# 11 掌握页面的加载过程
# 12 从输入URL到页面展示过程

# 14 定时器与requestAnimationFrame、requestIdleCallback


#
五、框架通识
框架通识(opens new window)

#
六、Vue
# 1 Vue 响应式原理
# 2 发布订阅模式和观察者模式
# 3 为什么使用 Virtual DOM
# 4 VDOM：三个 part
# 5 vue 和 react技术选型
# 6 nextTick

# 7 生命周期

# 8 vue-router
# 9 vuex
# 10 vue3带来的新特性/亮点
1. 压缩包体积更小
2. Object.defineProperty -> Proxy
3. Virtual DOM 重构
4. Performance
5. Tree-shaking support
6. Composition API
7. 新增的三个组件Fragment、Teleport、Suspense
8. Better TypeScript support

# 11 Compositon api
Composition API也叫组合式API，是Vue3.x的新特性。
compositon api提供了以下几个函数：

setup
ref
reactive
watchEffect
watch
computed
toRefs
生命周期的hooks
都说Composition API与React Hook很像，说说区别

# 12 computed 的实现原理
# 13 watch 的理解
# 14 vue 渲染过程
# 15 说一说keep-alive实现原理
# 16 为什么访问data属性不需要带data
# 17 template预编译是什么
# 18 介绍一下Vue中的Diff算法
# 19 说说Vue2.0和Vue3.0有什么区别



#
七、React
# 0 对虚拟DOM的理解

# 1 谈谈你对React的理解
# 2 如何避免React生命周期中的坑
# 3 React Fiber架构

1. React 都做过哪些优化

2. 浏览器一帧都会干些什么以及requestIdleCallback的启示

3. React Fiber是什么
4. 组件的渲染顺序
5. React Fiber架构总结

# 4 createElement过程
# 5 调和阶段 setState内部干了什么
# 6 setState
# 7 setState原理分析
1. setState异步更新

# 8 React事务机制

# 9 React组件和渲染更新过程
渲染和更新过程

jsx如何渲染为页面
setState之后如何更新页面
面试考察全流程
JSX本质和vdom

JSX即createElement函数
执行生成vnode
patch(elem,vnode)和patch(vnode,newNode)
组件渲染过程

props state
render()生成vnode
patch(elem, vnode)
组件更新过程

setState-->dirtyComponents(可能有子组件)
render生成newVnode
patch(vnode, newVnode)
# 10 如何解释 React 的渲染流程

# 11 diff算法是怎么运作
# 12 合成事件原理
 101. React的创建元素方法

# 14 为什么 React 元素有一个 $$typeof 属性

# 15 Virtual DOM 的工作原理是什么

# 16 React有哪些优化性能的手段

# 17 Redux实现原理解析
常见的中间件:
redux-logger:提供日志输出;
redux-thunk:处理异步操作;
redux-promise: 处理异步操作;
actionCreator 的返回值是 promise
redux中间件的原理是什么

# 18 谈谈你对状态管理的理解
# 19 connect组件原理分析
# 20 React Hooks
# 21 受控组件和非受控组件
# 22 如何避免ajax数据请求重新获取
# 23 组件之间通信
# 24 类组件与函数组件有什么区别呢？
# 25 如何设计React组件
# 26 组件的协同及（不）可控组件
# 27 React-Router 的实现原理及工作方式分别是什么
# 28 React 17 带来了哪些改变
最重要的是以下三点：

新的 JSX 转换逻辑
事件系统重构
Lane 模型的引入

# 八、性能
# 1 DNS 预解析
# 2 缓存
实现强缓存可以通过两种响应头实现：Expires和 Cache-Control 。强缓存表示在缓存期间不需要请求，state code为 200
协商缓存

Last-Modified 和 If-Modified-Since
ETag 和 If-None-Match

# 3 使用 HTTP / 2.0
# 4 预加载
# 5 预渲染
# 6 懒执行与懒加载
# 7 文件优化
# 8 其他
# 9 如何根据chrome的timing优化
# 10 移动端优化


# 九、工程化
# 1 介绍一下 webpack 的构建流程
# 2 介绍 Loader
# 3 介绍 plugin
# 4 webpack 热更新实现原理
# 5 webpack 层面如何做性能优化
# 6 介绍一下 Tree Shaking
# 7 介绍一下 webpack scope hosting
# 8 Webpack Proxy工作原理？为什么能解决跨域
# 9 介绍一下 babel原理
# 10 介绍一下Rollup

# 十、HTTP
# HTTP状态码
# 1 HTTP前生今世
# 2 HTTP世界全览
# 3 HTTP分层
# 4 HTTP报文是什么样子的
# 5 HTTP之URL
# 6 HTTP实体数据
# 8 说一说HTTP 的请求方法
# 9 谈一谈GET 和 POST 的区别
# 10 谈一谈队头阻塞问题
# 11 谈一谈HTTP数据传输
# 12 cookie 和 session
# 13 介绍一下HTTPS和HTTP区别
# 14 HTTPS握手过程
# 15 介绍一个HTTPS工作原理
# 17 谈一谈你对HTTP/2理解
# 18 HTTP3
# 19 HTTP/1.0 HTTP1.1 HTTP2.0版本之间的差异
# 21 短轮询、长轮询和 WebSocket 间的区别
# 24 http/https 协议总结
# 25 TCP为什么要三次握手
# 26 为什么要有 WebSocket
# 27 UDP和TCP有什么区别

# 十一、9种前端常见的设计模式
# 1. 外观模式
# 2. 代理模式
# 3. 工厂模式
# 4. 单例模式
# 5. 策略模式
# 6. 迭代器模式
# 7. 观察者模式
# 8. 中介者模式
# 9. 访问者模式
