9.  React新的生命周期，为什么 getDrivedStatefromProps是静态的

      * 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较。
      * 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用。


      * 无副作用 。**因为是处于 Fiber 的 render 阶段，所以有可能会被多次执行。所以 API 被设计为了静态函数，无法访问到实例的方法，也没有 ref 来操作 DOM，这就避免了实例方法带来副作用的可能性**。但是依旧可以从 props 中获得方法触发副作用，所以在执行可能触发副作用的函数前要三思。
      * 只用来更新 state 。其这个生命周期唯一的作用就是从 nextProps 和 prevState 中衍生出一个新的 state。它应返回一个对象来更新 state，或者返回null来不更新任何内容。
      * getDerivedStateFromProps前面要加上static保留字，声明为静态方法，不然会被react忽略掉。
      * getDerivedStateFromProps里面的this为undefined。static静态方法只能Class来调用，而实例是不能调用，所以React Class组件中，静态方法getDerivedStateFromProps无权访问Class实例的this，即this为undefined。

<!-- https://mp.weixin.qq.com/s/EO7amWDPozjtdD2SfdP-Yg -->