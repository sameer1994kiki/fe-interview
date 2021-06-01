<!-- https://juejin.cn/post/6906714992071213064 -->

应用场景：
数学运算

图像、影音等文件处理

大量数据检索

比如用户输入时，我们在后台检索答案，或者帮助用户联想，纠错等操作.

耗时任务都丢到 webworker 解放我们的主线程

<!-- https://juejin.cn/post/6844903725249593352 -->

<!-- https://yrq110.me/post/front-end/introduction-to-web-worker/ -->

<!-- https://juejin.cn/post/6844903590503383054 -->


Web Worker我们可以当做计算器来用，需要用的时候掏出来摁一摁，不用的时候一定要收起来~

加密数据
有些加解密的算法比较复杂，或者在加解密很多数据的时候，这会非常耗费计算资源，导致UI线程无响应，因此这是使用Web Worker的好时机，使用Worker线程可以让用户更加无缝的操作UI。


预取数据
有时候为了提升数据加载速度，可以提前使用Worker线程获取数据，因为Worker线程是可以是用 XMLHttpRequest 的。


预渲染
在某些渲染场景下，比如渲染复杂的canvas的时候需要计算的效果比如反射、折射、光影、材料等，这些计算的逻辑可以使用Worker线程来执行，也可以使用多个Worker线程，这里有个射线追踪的示例。


复杂数据处理场景
某些检索、排序、过滤、分析会非常耗费时间，这时可以使用Web Worker来进行，不占用主线程。


预加载图片
有时候一个页面有很多图片，或者有几个很大的图片的时候，如果业务限制不考虑懒加载，也可以使用Web Worker来加载图片，可以参考一下这篇文章的探索，这里简单提要一下。


<!-- https://mp.weixin.qq.com/s/Wkqe1rBVX6onOayD86Wpnw -->
<!-- https://mp.weixin.qq.com/s/UzHhyStgpjFjTqhk3b-NHQ -->


使用的时候需要注意的几个地方

同源限制
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
DOM限制
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。
通信
Worker 线程和主线程不在同一个上下文环境，所以它们不能直接通信，必须通过发布订阅消息完成。
脚本限制
Worker 线程内不能执行alert()方法和confirm()方法，但是可以使用 XMLHttpRequest 对象发送 AJAX 请求。
文件限制
Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

<!-- https://mp.weixin.qq.com/s/Asfopp0gFv8wTVK_JzTQ1Q -->
<!-- https://mp.weixin.qq.com/s/3MhSJoATeyHn3d96d3M3Sw -->