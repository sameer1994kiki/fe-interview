1. 简答
   * **setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的**。
  
   * setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
  
   * setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。



2. 详答(https://juejin.cn/post/6844903951721037837)
    1. 生命周期和合成事件中
      * 在 React的生命周期和合成事件中， React仍然处于他的更新机制中，这时无论调用多少次 setState，都会不会立即执行更新，而是将要更新的·存入 _pendingStateQueue，将要更新的组件存入 dirtyComponent。当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount后会将批处理标志设置为 false。这时将取出 dirtyComponent中的组件以及 _pendingStateQueue中的 state进行更新。这样就可以确保组件不会被重新渲染多次。  componentDidMount() {    this.setState({      index: this.state.index + 1    })    console.log('state', this.state.index);  }复制代码所以，如上面的代码，当我们在执行 setState后立即去获取 state，这时是获取不到更新后的 state的，因为处于 React的批处理机制中， state被暂存起来，待批处理机制完成之后，统一进行更新。所以。setState本身并不是异步的，而是 React的批处理机制给人一种异步的假象。
    2. 异步代码和原生事件中
      * 当我们在异步代码中调用 setState时，根据 JavaScript的异步机制，会将异步代码先暂存，等所有同步代码执行完毕后在执行，这时 React的批处理机制已经走完，处理标志设被设置为 false，这时再调用 setState即可立即执行更新，拿到更新后的结果。在原生事件中调用 setState并不会出发 React的批处理机制，所以立即能拿到最新结果。
  