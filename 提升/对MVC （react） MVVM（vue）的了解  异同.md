<!-- https://mp.weixin.qq.com/s/15HcPt1U48v6DhLAL3SZIg -->
<!-- https://juejin.cn/post/6844903861258289159 -->
M：Model 模型
V：View 视图
C：Controller 控制器
VM：ViewModel 视图模型


vue和react都是借鉴了mvvm的概念思想，加上工程师自己的想法而出现的两个优秀框架。
他们的区别:

vue的标签如v-model,比react的方便，其实也是一层封装好的语法糖，绑一个input也就不用再写change事件之类的。
react的jsx功能很强大，扩展性极强。
vue的dom操作很方便，各种方便的for指令 if指令等等。
react的思想很棒，各种抽象和模式使得代码更加美观等等。


react和vue有什么区别吗？你可以这样说！
引出mvc和mvvm的概念。
讲解react和vue的底层思想。
说出他们的优点和缺点。
实践：你在xx项目中，因为xx问题所以选择xx框架。
最后说出结论。


mvc和mvvm具体是指xxxxxxx，他们的区别是xxxx，各方的优缺点xxxx。
vue的底层是用xxxx实现的，另外碰到数组的话因为有xx缺陷，vue的底层是重写了关于数组的八个函数等等。
react的jsx功能强大，灵活性强，但是代码必须要规范，每个人都有自己的代码风格。
4.因为项目的迭代更新很快，便于多人开发，所以我选择的是xx框架。
其实用任何框架都要根据真实环境下的各种因素结合，并不是哪个框架就是强无敌，拿起来直接黏贴复制一把梭的。


相同点：1，都是用了Virtual DOM。2，都提供了响应式和组件化的视图组件。3，都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关库。
不同点：1，React中，当某组件的状态发生改变时，它会以该组件为根，重新渲染整个组件子树，而在Vue中，组件的依赖是在渲染的过程中自动追踪的，所以系统能准确知晓哪个组件确实需要被重新渲染。2，Vue的路由库和状态管理库都由官方维护支持且与核心库同步更新，而React选择把这些问题交给社区维护，因此生态更丰富。3，Vue-cli脚手架可进行配置



MVVM与MVC最大的区别就是：它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。非常的神奇~


view：接收用户交互请求，将请求交给controller处理
controller：操作model进行数据更新保存，数据更新保存后，model通知view更新
view：更新变化数据是用户得到反馈

M——Model，代表数据模型，也可以在model中定义数据修改和操作的业务逻辑。

V——View，View代表UI组件，他负责将数据模型转化为UI展示出来。

VM——ViewModel，ViewModel监听模型数据的改变与控制视图行为、处理用户交互，即连接View与Model的桥梁。

（1）View接收用户交互请求，将请求交给ViewModel处理
（2）ViewModel操作Model使数据更新
（3）Model更新完数据，通知ViewModel数据发生变化
（4）ViewModel更新View的数据

两者的区别：
（1）ViewModel替换了Controller在UI层之下
（2）ViewModel向View暴露了它所需要的数据和指令。
（3）ViewModel接收来自Model的数据


mvc,mvp,mvvm定义

MVC：Model-View-Controller，经典模式，很容易理解，主要缺点有两个：
View对Model的依赖，会导致View也包含了业务逻辑；
Controller会变得很厚很复杂。
MVP：Model-View-Presenter，MVC的一个演变模式，将Controller换成了Presenter，主要为了解决上述第一个缺点，将View和Model解耦，不过第二个缺点依然没有解决。
MVVM：Model-View-ViewModel，是对MVP的一个优化模式，采用了双向绑定：View的变动，自动反映在ViewModel，反之亦然

MVVM的优点

低耦合。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
可重用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。
独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
可测试。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写



在 MVC 中，Model 和 View 之间耦合，视图的更新需要 Model 去直接通知。Model 内因为有 View 的引用才能让视图更新。


在 MVP 模式中，工程师M的工作专注于数据，通知的活甩给了工程师P。 和 MVC 同样的场景，工程师P接到反馈后，把工程师M拉过来处理了数据，然后又让飞机模型依据已经处理后的数据自主调整。每次数据的变化都要主动去通知视图更新。

如今主流的web框架基本都采用的是MVVM模式，为什么放弃了MVC模式，转而投向了MVVM模式呢。在之前的MVC中我们提到一个控制器对应一个视图，控制器用状态机进行管理，这里就存在一个问题，如果项目足够大的时候，状态机的代码量就变得非常臃肿，难以维护。还有一个就是性能问题，在MVC中我们大量的操作了DOM，而大量操作DOM会让页面渲染性能降低，加载速度变慢，影响用户体验。最后就是当Model频繁变化的时候，开发者就主动更新View，那么数据的维护就变得困难。世界是懒人创造的，为了减小工作量，节约时间，一个更适合前端开发的架构模式就显得非常重要。这时候MVVM模式在前端中的应用就应运而生。
MVVM让用户界面和逻辑分离更加清晰。下面是MVVM的示意图，可以看到它由Model、ViewModel、View这三个部分组成。


这样我们是不是就实现了数据的观测了呢。
在Angular中实现数据的观测使用的是脏检查，就是在用户进行可能改变ViewModel的操作的时候，对比以前老的ViewModel然后做出改变。
而在Vue中，采取的是数据劫持，就是当数据获取或者设置的时候，会触发Object.defineProperty()。
这里我们采取的是Vue数据观测的方法，简单一些。下面是具体的代码



<!-- https://juejin.cn/post/6844903774234869767   good-->
<!-- https://juejin.cn/post/6844903565543079943 good -->
<!-- https://juejin.cn/post/6844903825225023502 best -->
<!-- https://juejin.cn/post/6844903586103558158 best-->