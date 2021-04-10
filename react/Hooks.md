![Mixin,HOC,Hook](https://mmbiz.qpic.cn/mmbiz_png/aDoYvepE5x3PR2Hhkq5cd43ibQeNLEaJyaZ48C5joW0hR44yDPZgDyUge6NSX6kXIFr29JGynEGOSjcXBzBJD9w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### tips: 在 React中 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用”


## 基础 Hook
    * useState
    * useEffect
    * useContext
    * 
## 额外的 Hook
    * useReducer
    * useCallback
    * useMemo
    * useRef
    * useImperativeHandle
    * useLayoutEffect
    * useDebugValue

### Hook有哪些优势？
1. 减少状态逻辑复用的风险
  * Hook和 Mixin在用法上有一定的相似之处，但是 Mixin引入的逻辑和状态是可以相互覆盖的，而多个 Hook之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC也有可能带来一定冲突，比如 props覆盖等等，使用 Hook则可以避免这些问题。
2. 避免地狱式嵌套
  * 大量使用 HOC的情况下让我们的代码变得嵌套层级非常深，使用 Hook，我们可以实现扁平式的状态逻辑复用，而避免了大量的组件嵌套。
4. 让组件更容易理解
  * 在使用 class组件构建我们的程序时，他们各自拥有自己的状态，业务逻辑的复杂使这些组件变得越来越庞大，各个生命周期中会调用越来越多的逻辑，越来越难以维护。使用 Hook，可以让你更大限度的将公用逻辑抽离，将一个组件分割成更小的函数，而不是强制基于生命周期方法进行分割。
5. 使用函数代替class
  * 相比函数，编写一个 class可能需要掌握更多的知识，需要注意的点也越多，比如 this指向、绑定事件等等。另外，计算机理解一个 class比理解一个函数更快。Hooks让你可以在 classes之外使用更多 React的新特性。





1.  自定义hooks，useDiff
2. React Hooks的原理和使用注意事项有哪些
    原理：
    <!-- https://juejin.im/post/6844903861434449933#heading-8 -->
    注意事项
      * 只能在组件顶层调用 hooks。不要在循环，控制流和嵌套的函数中调用 hooks
      * 只能从 React 的函数组件中调用 hooks
      * 自定义 hooks 使用 use*命名
3.  实现一个自定义hook - usePrevious
  ```
   const usePrevious = value => {
      const ref = React.useEffect();
      React.useEffect(()=> {
        ref.current = value;
      });
      return ref.current;
    }
  ```





<!-- https://juejin.cn/post/6844903985338400782 -->
<!-- https://juejin.cn/post/6844903918577664007 很棒-->
<!-- https://juejin.cn/post/6844904165500518414 实践 -->

<!-- https://majing.io/posts/10000059401249 自定义React Hooks（记录先前状态）：usePrevious -->
<!-- https://github.com/rehooks/awesome-react-hooks -->