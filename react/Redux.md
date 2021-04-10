
* 实现一个 redux，实现 createStore 的功能，关键点发布订阅的功能，以及取消订阅的功能
* react-redux中connect怎么连接组件的


1. 是什么？ （redux是为了解决组件间通信、状态共享而提出的一种解决方案。）
   主要包括3个部分：store action reducer
  * store 是用来存储react当前状态的对象。store的改变驱动react生命周期循环，导致页面状态改变
  * action: 是改变state的唯一途径。Action是一个对象。有两部分，一个是type，另一个就是它的payload
  * reducer: action的处理器，会返回一个新的state。用来修改store中的state。 是一个纯函数
  场景： 1、用户操作较为繁琐，导致组件间需要有状态依赖关系

2. 核心概念 解决什么问题 如何使用 
    * Provider：从最外部封装了整个应用，并向connect模块传递store。
    * Connect：
      1. 包装原组件，将state和action通过props的方式传入到原组件内部。
      2. 监听store tree变化，使其包装的原组件可以响应state变化
    * connect方法有四个参数,常用的就是前面两个
      1. 第一个参数是mapStateToProps, 作用就是从store里把state注入到当前组件的props上
      2. 第二个参数可以是mapDispatchToProps, 这个的主要作用是把action生成的方法注入到当前组件的props上，通过一般来说也没必要这样用，

3. 方案对比 

# Redux的优缺点
  优点：
    * 状态持久化：globalstore 可以保证组件就算销毁了也依然保留之前状态。
    * 状态可回溯：每个 action 都会被序列化，Reducer 不会修改原有状态，总是返回新状态，方便做状态回溯。
    * Functional Programming：使用纯函数，输出完全依赖输入，没有任何副作用。
    * 中间件：针对异步数据流，提供了类 express 中间件的模式，社区也出现了一大批优秀的第三方插件，能够更精细地控制数据的流动，对复杂的业务场景起到了缓冲的作用
  缺点：
    * 繁重的代码模板：修改一个state可能要动四五个文件，可谓牵一发而动全身。
    * store 里状态残留：多组件共用 store 里某个状态时要注意初始化清空问题。
    * 无脑的发布订阅：每次 dispatch 一个 action 都会遍历所有的 reducer，重新计算 connect，这无疑是一种损耗；
    * 交互频繁时会有卡顿：如果 store 较大时，且频繁地修改 store，会明显看到页面卡顿。
    * 不支持 Typescript。



# MobX优点
  * 代码量少。
  * 基于数据劫持来实现精准定位（真正意义上的局部更新）。
  * 多 store 抽离业务逻辑（Model View 分离）。
  * 响应式性能良好（频繁的交互依然可以胜任）。
  * 完全可以替代 React 自身的状态管理。
  * 支持 Typescript。


4. 手写实现
   ```
const countState = {
    count: 100
};


const reducer = (state, action) => {
    console.log('action',action)
    if (!state) {
        state = countState
    }
    switch(action.type) {
        case 'jian': 
            return {
                ...state,
                count: state.count - action.n
            };
        case 'jia':
            return {
                ...state,
                count: state.count + action.n
            };
        default:
            return state
    }
};

const createStore = (reducer) => {
    let state = null;
    const getState = () => state;
    const listeners = [];
    const subscribe = listener => listeners.push(listener);
    const dispatch = (action) => {
        state = reducer(state, action);
        // 调用的不一定是renderCount,也有可能是其它的state,不能写死
        // renderCount();
        listeners.forEach(listener => listener());
    };
    dispatch({});
    return {
        getState,
        dispatch,
        subscribe
    }
}
const store = createStore(reducer);
// const store = Redux.createStore(reducer);
// *** 下次文件改动 reducer方法改变state，并返回一个新的state
// *** 下次文件改动 createStore 只传一个参数reducer
const renderCount = () => {
    document.getElementById('count').innerHTML = store.getState().count
};
renderCount();
store.subscribe(renderCount);
   ```









<!-- https://juejin.cn/post/6944975420026519589 -->
<!-- https://juejin.cn/post/6844903854543208461 -->
<!-- https://juejin.cn/post/6945481265277730824(挺好的) -->
<!-- https://juejin.cn/post/6844904175340519431（这个更好哦） -->
<!-- https://juejin.cn/post/6844904036013965325#heading-6 -->
<!-- https://juejin.cn/post/6844903848255946766 -->