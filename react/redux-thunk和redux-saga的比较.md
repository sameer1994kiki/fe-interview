redux-thunk
  优点
    * redux-thunk 的任务执行方式是从 UI 组件直接触发任务。
    * redux-thunk 的主要思想是扩展 action，使得 action 从一个对象变成一个函数。
  缺点
    * action 虽然扩展了，但因此变得复杂，后期可维护性降低；
    * thunks 内部测试逻辑比较困难，需要mock所有的触发函数；
    * 协调并发任务比较困难，当自己的 action 调用了别人的 action，别人的 action 发生改动，则需要自己主动修改；
    * 业务逻辑会散布在不同的地方：启动的模块，组件以及thunks内部。
    
redux-saga 
redux-saga 是一个用于管理 Redux 应用异步操作的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件。
  优点
    * 声明式 Effects：所有的操作以JavaScript对象的方式被 yield，并被 middleware 执行。使得在 saga 内部测试变得更加容易，可以通过简单地遍历 Generator 并在 yield 后的成功值上面做一个 deepEqual 测试。
    * 高级的异步控制流以及并发管理：可以使用简单的同步方式描述异步流，并通过 fork 实现并发任务。
    * 架构上的优势：将所有的异步流程控制都移入到了 sagas，UI 组件不用执行业务逻辑，只需 dispatch action 就行，增强组件复用性。