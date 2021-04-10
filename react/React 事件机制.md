
> 合成事件是围绕浏览器原生事件充当跨浏览器包装器的对象。它们将不同浏览器的行为合并为一个 API。这样做是为了确保事件在不同浏览器中显示一致的属性。

1. 请说一下你对 React合成事件的理解?
   * React 根据 W3C 规范定义了每个事件处理函数的参数，即合成事件。
   * 事件处理程序将传递 SyntheticEvent 的实例，这是一个跨浏览器原生事件包装器。它具有与浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()，在所有浏览器中他们工作方式都相同。
   * React合成的 SyntheticEvent采用了事件池，这样做可以大大节省内存，而不会频繁的创建和销毁事件对象。
   * 管在什么浏览器环境下，浏览器会将该事件类型统一创建为合成事件，从而达到了浏览器兼容的目的。





React事件并没有绑定在真实的 Dom节点上，而是通过事件代理，在最外层的 document上对事件进行统一分发。

![示意图](https://user-gold-cdn.xitu.io/2019/9/24/16d624418b7be08c?imageslim])

1. 组件挂载、更新时：
   * 通过 lastProps、 nextProps判断是否新增、删除事件分别调用事件注册、卸载方法
   * 调用 EventPluginHub的 enqueuePutListener进行事件存储
   * 获取 document对象。
   * 根据事件名称（如 onClick、 onCaptureClick）判断是进行冒泡还是捕获。
   * 判断是否存在 addEventListener方法，否则使用 attachEvent（兼容IE）
   * 给 document注册原生事件回调为 dispatchEvent(统一的事件分发机制）。
2. 事件初始化：
   * EventPluginHub负责管理 React合成事件的 callback，它将 callback存储在 listenerBank中，另外还存储了负责合成事件的 Plugin。
   * 获取绑定事件的元素的唯一标识 key
   * 将 callback根据事件类型，元素的唯一标识 key存储在 listenerBank中
   * listenerBank的结构是： listenerBank[registrationName][key]
3. 触发事件时：
   * 触发 document注册原生事件的回调 dispatchEvent
   * 获取到触发这个事件最深一级的元素
   * 遍历这个元素的所有父元素，依次对每一级元素进行处理。
   * 构造合成事件。
   * 将每一级的合成事件存储在 eventQueue事件队列中。
   * 遍历 eventQueue。
   * 通过 isPropagationStopped判断当前事件是否执行了阻止冒泡方法
   * 如果阻止了冒泡，停止遍历，否则通过 executeDispatch执行合成事件。
   * 释放处理完成的事件。


tips: React在自己的合成事件中重写了 stopPropagation方法，将 isPropagationStopped设置为 true，然后在遍历每一级事件的过程中根据此遍历判断是否继续执行。这就是 React自己实现的冒泡机制。













<!-- https://juejin.cn/post/6844903951721037837 -->
<!-- https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484039&idx=1&sn=1f657356676d4809633f30668acb50d2&chksm=ce6ec62bf9194f3d8a4eb382bd01c56231908a1b08fb9c2c9783f96df6650ee808fe18343032&scene=21#wechat_redirect -->