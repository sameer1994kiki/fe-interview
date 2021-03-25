<!-- React 灵魂 23 问，你能答对几个？https://zhuanlan.zhihu.com/p/304213203 -->
<!-- https://juejin.cn/post/6844903993278201870 -->
<!-- 21 个 React 性能优化技巧https://www.infoq.cn/article/KVE8xtRs-uPphptq5LUz -->
1. setState 是异步还是同步？
   
     * setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
  
     * setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
  
     * setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

2. 聊聊 react@16.4 + 的生命周期  
   
     * React16废弃的三个生命周期函数(componentWillMount,componentWillReceiveProps,componentWillUpdate)
     * 取而代之的是两个新的生命周期函数(static getDerivedStateFromProps, getSnapshotBeforeUpdate)

     * 挂载阶段:
      constructor
      getDerivedStateFromProps
      ~~componentWillMount/UNSAVE_componentWillMount~~
      render
      componentDidMount
     * 更新阶段:
      ~~componentWillReceiveProps/UNSAFE_componentWillReceiveProps~~
      getDerivedStateFromProps(在更新阶段，无论我们接收到新的属性，调用了setState还是调用了forceUpdate，这个方法都会被调用)
      shouldComponentUpdate
      ~~componentWillUpdate/UNSAFE_componentWillUpdate~~
      render
      getSnapshotBeforeUpdate
      componentDidUpdate
    * 卸载阶段
      componentWillUnmount
3. useEffect(fn, []) 和 componentDidMount 有什么差异？useLayoutEffect呢
   * useEffect 会捕获 props 和 state。所以即便在回调函数里，你拿到的还是初始的 props 和 state。如果想得到“最新”的值，可以使用 ref。
   * 场景：useEffect中使用定时器
4. hooks 为什么不能放在条件判断里
   * 以 useState 为例，在 react 内部，每个组件(Fiber)的 hooks 都是以链表的形式存在 memoizeState 属性中
   * update 阶段，每次调用 useState，链表就会执行 next 向后移动一步。如果将 useState 写在条件判断中，假设条件判断不成立，没有执行里面的 useState 方法，会导致接下来所有的 useState 的取值出现偏移，从而导致异常发生。
5. fiber 是什么？
   * React Fiber 是一种基于浏览器的单线程调度算法。
   * React Fiber 用类似 requestIdleCallback 的机制来做异步 diff。但是之前数据结构不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能做到异步可更新了。
6. 聊一聊 diff 算法
   * tree diff：只对比同一层的 dom 节点，忽略 dom 节点的跨层级移动，即同一个父节点下的所有子节点。当发现节点不存在时，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。这就意味着，如果 dom 节点发生了跨层级移动，react 会删除旧的节点，生成新的节点，而不会复用。
   * component diff：如果不是同一类型的组件，会删除旧的组件，创建新的组件
   * element diff：对于同一层级的一组子节点，需要通过唯一 id 进行来区分。如果没有 id 来进行区分，一旦有插入动作，会导致插入位置之后的列表全部重新渲染。这也是为什么渲染列表时为什么要使用唯一的 key。
7. 调用 setState 之后发生了什么？
   * 在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
   * 然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到**异步可中断的执行**。
   * 然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
   * 在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
   * 当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
   * 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。
8. 为什么虚拟dom 会提高性能?
   * 虚拟dom 相当于在 JS 和真实 dom 中间加了一个缓存，利用 diff 算法避免了没有必要的 dom 操作，从而提高性能。
9. 错误边界是什么？它有什么用？
   * 在 React 中，如果任何一个组件发生错误，它将破坏整个组件树，导致整页白屏。这时候我们可以用错误边界优雅地降级处理这些错误。
10. 什么是 Portals？
    * 传送门
    * Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。ReactDOM.createPortal(child, container)
    * https://juejin.cn/post/6892951045685641224
11. React 组件间有那些通信方式
    * 父组件向子组件通信（通过 props 传递）
    * 子组件向父组件通信（主动调用通过 props 传过来的方法，并将想要传递的信息，作为参数，传递到父组件的作用域中）
    * 跨层级通信（1.context 2.Redux 或者 Mobx 等状态管理库 3.使用订阅发布模式）
12. React 父组件如何调用子组件中的方法
    * 如果是在函数组件中调用子组件可以使用 useRef 和 useImperativeHandle:
    * 如果是在类组件中调用子组件可以使用 createRef:
13. React有哪些优化性能的手段
   * 类组件中的优化手段
      * 使用纯组件 PureComponent 作为基类
      * 使用 React.memo 高阶函数包装组件
      * 使用 shouldComponentUpdate 生命周期函数来自定义渲染逻辑。
   * 方法组件中的优化手段
      * 使用 useMemo
      * 使用 useCallBack
   * 其他
      * 在列表需要频繁变动时，使用唯一 id 作为 key，而不是数组下标
      * 必要时通过改变 CSS 样式隐藏显示组件，而不是通过条件判断显示隐藏组件
      * 使用 Suspense 和 lazy 进行懒加载
14. 为什么 React 元素有一个 $$typeof 属性？
   * 目的是为了防止 XSS 攻击。因为 Synbol 无法被序列化，所以 React 可以通过有没有 $$typeof 属性来断出当前的 element 对象是从数据库来的还是自己生成的。如果没有 $$typeof 这个属性，react 会拒绝处理该元素。
15. React 如何区分 Class组件 和 Function组件？
    * React 区分 Class组件 和 Function组件的方式很巧妙，由于所有的类组件都要继承 React.Component，所以只要判断原型链上是否有 React.Component 就可以了（AComponent.prototype instanceof React.Component）
16. HTML 和 React 事件处理有什么区别?
    * 在 HTML 中事件名必须小写，而在 React 中需要遵循驼峰写法。
    * 在 HTML 中可以返回 false 以阻止默认的行为，在 React 中必须地明确地调用 preventDefault()
17. 什么是 suspense 组件?
    * Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。
    * Suspense 也可以用于懒加载
18. 为什么 JSX 中的组件名要以大写字母开头？
    * 因为 React 要知道当前渲染的是组件还是 HTML 元素
19. redux 是什么
    * Redux 是一个为 JavaScript 应用设计的，可预测的状态容器。
    * 优点：
      1. 跨层级组件之间的数据传递变得很容易
      2. 所有对状态的改变都需要 dispatch，使得整个数据的改变可追踪，方便排查问题。
    * 缺点
      1. 概念偏多，理解起来不容易
      2. 样板代码太多
20. react-redux 的实现原理？
    * 通过 redux 和 react context 配合使用，并借助高阶函数，实现了 react-redux。
21. reudx 和 mobx 的区别？
    * 得益于 Mobx 的 observable，使用 mobx 可以做到精准更新；对应的 Redux 是用 dispath 进行广播，通过Provider 和 connect 来比对前后差别控制更新粒度；
22. redux 异步中间件有什么什么作用
23. redux 有哪些异步中间件？
    * redux-thunk
    * redux-saga
    * redux-observable





