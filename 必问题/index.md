1. http(状态吗，http1.0VShttp2.0VShttps)
2. XSS，CSRF
3. 浏览器渲染
4. 浏览器缓存
5. Event Loop
6. Fiber
7. 算法
8. AMD，CMD，ESM
9. Service Worker







10. 闭包
11. 原型链
12. 防抖截流
13. this指向







<!-- http://interview.poetries.top/principle-docs/vue/01-%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BBVue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.html#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86  这个很全面很能忽悠人 -->


## 从浏览器地址栏输入url到显示页面的步骤

基础版本

浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
载入解析到的资源文件，渲染页面，完成。

详细版
在浏览器地址栏输入URL
浏览器查看缓存，如果请求资源在缓存中并且新鲜，跳转到转码步骤
如果资源未缓存，发起新请求
如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。
检验新鲜通常有两个HTTP头进行控制Expires和Cache-Control：
HTTP1.0提供Expires，值为一个绝对时间表示缓存新鲜日期
HTTP1.1增加了Cache-Control: max-age=,值为以秒为单位的最大新鲜时间
浏览器解析URL获取协议，主机，端口，path
浏览器组装一个HTTP（GET）请求报文
浏览器获取主机ip地址，过程如下：
浏览器缓存
本机缓存
hosts文件
路由器缓存
ISP DNS缓存
DNS递归查询（可能存在负载均衡导致每次IP不一样）
打开一个socket与目标IP地址，端口建立TCP链接，三次握手如下：
客户端发送一个TCP的SYN=1，Seq=X的包到服务器端口
服务器发回SYN=1， ACK=X+1， Seq=Y的响应包
客户端发送ACK=Y+1， Seq=Z
TCP链接建立后发送HTTP请求
服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP Host头部判断请求的服务程序
服务器检查HTTP请求头是否包含缓存验证信息如果验证缓存新鲜，返回304等对应状态码
处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作
服务器将响应报文通过TCP连接发送回浏览器
浏览器接收HTTP响应，然后根据情况选择关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下：
主动方发送Fin=1， Ack=Z， Seq= X报文
被动方发送ACK=X+1， Seq=Z报文
被动方发送Fin=1， ACK=X， Seq=Y报文
主动方发送ACK=Y， Seq=X报文
浏览器检查响应状态吗：是否为1XX，3XX， 4XX， 5XX，这些情况处理与2XX不同
如果资源可缓存，进行缓存
对响应进行解码（例如gzip压缩）
根据资源类型决定如何处理（假设资源为HTML文档）
解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本，这些操作没有严格的先后顺序，以下分别解释
构建DOM树：
Tokenizing：根据HTML规范将字符流解析为标记
Lexing：词法分析将标记转换为对象并定义属性和规则
DOM construction：根据HTML标记关系将对象组成DOM树
解析过程中遇到图片、样式表、js文件，启动下载
构建CSSOM树：
Tokenizing：字符流转换为标记流
Node：根据标记创建节点
CSSOM：节点创建CSSOM树
根据DOM树和CSSOM树构建渲染树 (opens new window):
从DOM树的根节点遍历所有可见节点，不可见节点包括：1）script,meta这样本身不可见的标签。2)被css隐藏的节点，如display: none
对每一个可见节点，找到恰当的CSSOM规则并应用
发布可视节点的内容和计算样式
js解析如下：
浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时document.readystate为loading
HTML解析器遇到没有async和defer的script时，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用document.write()把文本插入到输入流中。同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容
当解析器遇到设置了async属性的script时，开始下载脚本并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器不会停下来等它下载。异步脚本禁止使用document.write()，它们可以访问自己script和之前的文档元素
当文档完成解析，document.readState变成interactive
所有defer脚本会按照在文档出现的顺序执行，延迟脚本能访问完整文档树，禁止使用document.write()
浏览器在Document对象上触发DOMContentLoaded事件
此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些内容完成载入并且所有异步脚本完成载入和执行，document.readState变为complete，window触发load事件
显示页面（HTML解析过程中会逐步显示页面）


详细简版
从浏览器接收url到开启网络请求线程（这一部分可以展开浏览器的机制以及进程与线程之间的关系）
开启网络线程到发出一个完整的HTTP请求（这一部分涉及到dns查询，TCP/IP请求，五层因特网协议栈等知识）
从服务器接收到请求到对应后台接收到请求（这一部分可能涉及到负载均衡，安全拦截以及后台内部的处理等等）
后台和前台的HTTP交互（这一部分包括HTTP头部、响应码、报文结构、cookie等知识，可以提下静态资源的cookie优化，以及编码解码，如gzip压缩等）
单独拎出来的缓存问题，HTTP的缓存（这部分包括http缓存头部，ETag，catch-control等）
浏览器接收到HTTP数据包后的解析流程（解析html-词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、复合图层的合成、GPU绘制、外链资源的处理、loaded和DOMContentLoaded等）
CSS的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC等概念）
JS引擎解析过程（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
其它（可以拓展不同的知识模块，如跨域，web安全，hybrid模式等等内容）


## HTTP状态码及其含义
1XX：信息状态码
100 Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
2XX：成功状态码
200 OK 正常返回信息
201 Created 请求成功并且服务器创建了新的资源
202 Accepted 服务器已接受请求，但尚未处理
3XX：重定向
301 Moved Permanently 请求的网页已永久移动到新位置。
302 Found 临时性重定向。
303 See Other 临时性重定向，且总是使用 GET 请求新的 URI。
304 Not Modified 自从上次请求后，请求的网页未修改过。
4XX：客户端错误
400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
401 Unauthorized 请求未授权。
403 Forbidden 禁止访问。
404 Not Found 找不到如何与 URI 相匹配的资源。
5XX: 服务器错误
500 Internal Server Error 最常见的服务器端错误。
503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。


## html5有哪些新特性、移除了那些元素？
HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加

新增选择器 document.querySelector、document.querySelectorAll
拖拽释放(Drag and drop) API
媒体播放的 video 和 audio
本地存储 localStorage 和 sessionStorage
离线应用 manifest
桌面通知 Notifications
语意化标签 article、footer、header、nav、section
增强表单控件 calendar、date、time、email、url、search
地理位置 Geolocation
多任务 webworker
全双工通信协议 websocket
历史管理 history
跨域资源共享(CORS) Access-Control-Allow-Origin
页面可见性改变事件 visibilitychange
跨窗口通信 PostMessage
Form Data 对象
绘画 canvas
移除的元素：

纯表现的元素：basefont、big、center、font、 s、strike、tt、u
对可用性产生负面影响的元素：frame、frameset、noframes
支持HTML5新标签：

IE8/IE7/IE6支持通过document.createElement方法产生的标签
可以利用这一特性让这些浏览器支持HTML5新标签
浏览器支持新标签后，还需要添加标签默认的样式
当然也可以直接使用成熟的框架、比如html5shim



## 请描述一下 cookies，sessionStorage 和 localStorage 的区别？
cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）

cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递

sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存

存储大小：

cookie数据大小不能超过4k
sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大
有期时间：

localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
sessionStorage 数据在当前浏览器窗口关闭后自动删除
cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭



css3有哪些新特性
新增选择器 p:nth-child(n){color: rgba(255, 0, 0, 0.75)}
弹性盒模型 display: flex;
多列布局 column-count: 5;
媒体查询 @media (max-width: 480px) {.box: {column-count: 1;}}
个性化字体 @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}
颜色透明度 color: rgba(255, 0, 0, 0.75);
圆角 border-radius: 5px;
渐变 background:linear-gradient(red, green, blue);
阴影 box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);
倒影 box-reflect: below 2px;
文字装饰 text-stroke-color: red;
文字溢出 text-overflow:ellipsis;
背景效果 background-size: 100px 100px;
边框效果 border-image:url(bt_blue.png) 0 10;
转换
旋转 transform: rotate(20deg);
倾斜 transform: skew(150deg, -10deg);
位移 transform: translate(20px, 20px);
缩放 transform: scale(.5);
平滑过渡 transition: all .3s ease-in .1s;
动画 @keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;

CSS3新增伪类有那些？
p:first-of-type 选择属于其父元素的首个<p>元素的每个<p> 元素。
p:last-of-type 选择属于其父元素的最后 <p> 元素的每个<p> 元素。
p:only-of-type 选择属于其父元素唯一的 <p>元素的每个 <p> 元素。
p:only-child 选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2) 选择属于其父元素的第二个子元素的每个 <p> 元素。
:after 在元素之前添加内容,也可以用来做清除浮动。
:before 在元素之后添加内容。
:enabled 已启用的表单元素。
:disabled 已禁用的表单元素。
:checked 单选框或复选框被选中。

## 如何最小化重绘(repaint)和回流(reflow)：

需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document
缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）
避免使用css表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx
#


## 浏览器缓存
浏览器缓存分为强缓存和协商缓存。当客户端请求某个资源时，获取缓存的流程如下

先根据这个资源的一些 http header 判断它是否命中强缓存，如果命中，则直接从本地获取缓存资源，不会发请求到服务器；
当强缓存没有命中时，客户端会发送请求到服务器，服务器通过另一些request header验证这个资源是否命中协商缓存，称为http再验证，如果命中，服务器将请求返回，但不返回资源，而是告诉客户端直接从缓存中获取，客户端收到返回后就会从缓存中获取资源；
强缓存和协商缓存共同之处在于，如果命中缓存，服务器都不会返回资源； 区别是，强缓存不对发送请求到服务器，但协商缓存会。
当协商缓存也没命中时，服务器就会将资源发送回客户端。
当 ctrl+f5 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
当 f5刷新网页时，跳过强缓存，但是会检查协商缓存；
强缓存

Expires（该字段是 http1.0 时的规范，值为一个绝对时间的 GMT 格式的时间字符串，代表缓存资源的过期时间）
Cache-Control:max-age（该字段是 http1.1的规范，强缓存利用其 max-age 值来判断缓存资源的最大生命周期，它的值单位为秒）
协商缓存

Last-Modified（值为资源最后更新时间，随服务器response返回）
If-Modified-Since（通过比较两个时间来判断资源在两次请求期间是否有过修改，如果没有修改，则命中协商缓存）
ETag（表示资源内容的唯一标识，随服务器response返回）
If-None-Match（服务器通过比较请求头部的If-None-Match与当前资源的ETag是否一致来判断资源是否在两次请求之间有过修改，如果没有修改，则命中协商缓存）



## 说说event loop
首先，js是单线程的，主要的任务是处理用户的交互，而用户的交互无非就是响应DOM的增删改，使用事件队列的形式，一次事件循环只处理一个事件响应，使得脚本执行相对连续，所以有了事件队列，用来储存待执行的事件，那么事件队列的事件从哪里被push进来的呢。那就是另外一个线程叫事件触发线程做的事情了，他的作用主要是在定时触发器线程、异步HTTP请求线程满足特定条件下的回调函数push到事件队列中，等待js引擎空闲的时候去执行，当然js引擎执行过程中有优先级之分，首先js引擎在一次事件循环中，会先执行js线程的主任务，然后会去查找是否有微任务microtask（promise），如果有那就优先执行微任务，如果没有，在去查找宏任务macrotask（setTimeout、setInterval）进行执行

众所周知 JS 是门非阻塞单线程语言，因为在最初 JS 就是为了和浏览器交互而诞生的。如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点）

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task

微任务

process.nextTick
promise
Object.observe
MutationObserver
宏任务

script
setTimeout
setInterval
setImmediate
I/O
UI rendering
宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务

所以正确的一次 Event loop 顺序是这样的

执行同步代码，这属于宏任务
执行栈为空，查询是否有微任务需要执行
执行所有微任务
必要的话渲染 UI
然后开始下一轮 Event loop，执行宏任务中的异步代码
通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的响应界面响应，我们可以把操作 DOM 放入微任务中


## 浏览器的渲染过程：

解析HTML构建 DOM(DOM树)，并行请求 css/image/js
CSS 文件下载完成，开始构建 CSSOM(CSS树)
CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)
布局(Layout)：计算出每个节点在屏幕中的位置
显示(Painting)：通过显卡把页面画到屏幕上


## JavaScript 中，调用函数有哪几种方式
方法调用模式 Foo.foo(arg1, arg2);
函数调用模式 foo(arg1, arg2);
构造器调用模式 (new Foo())(arg1, arg2);
call/applay调用模式 Foo.foo.call(that, arg1, arg2);
bind调用模式 Foo.foo.bind(that)(arg1, arg2)();


## this指向
1. this 指向有哪几种

默认绑定：全局环境中，this默认绑定到window
隐式绑定：一般地，被直接对象所包含的函数调用时，也称为方法调用，this隐式绑定到该直接对象
隐式丢失：隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到window。显式绑定：通过call()、apply()、bind()方法把对象绑定到this上，叫做显式绑定
new绑定：如果函数或者方法调用之前带有关键字new，它就构成构造函数调用。对于this绑定来说，称为new绑定
构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值
如果构造函数使用return语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果
如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象
2. 改变函数内部 this 指针的指向函数（bind，apply，call的区别）

apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法
call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法
bind除了返回是函数以外，它的参数和call一样
3. 箭头函数

箭头函数没有this，所以需要通过查找作用域链来确定this的值，这就意味着如果箭头函数被非箭头函数包含，this绑定的就是最近一层非箭头函数的this，
箭头函数没有自己的arguments对象，但是可以访问外围函数的arguments对象
不能通过new关键字调用，同样也没有new.target值和原型