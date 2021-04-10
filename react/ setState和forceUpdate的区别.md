setState和forceUpdate
    * forceUpdate从函数名上理解：“强制更新
    * forceUpdate在批量与否的表现上，和setState是一样的。在React有控制权的函数里，是批量的。
    * forceUpdate只会强制本身组件的更新，即不调用“shouldComponentUpdate”直接更新，对于子孙后代组件还是要调用自己的“shouldComponentUpdate”来决定的
    * 所以forceUpdate 可以简单的理解为 this.setState({})，只不过这个setState 是不调用自己的“shouldComponentUpdate”声明周期的。
    * 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state
    * 如果shouldComponentUpdate()不返回false就没啥区别