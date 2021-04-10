## 虚拟DOM是什么？

React会先将你的代码转换成一个 JavaScript对象，然后这个 JavaScript对象再转换成真实 DOM。这个 JavaScript对象就是所谓的虚拟 DOM。

当我们需要创建或更新元素时， React首先会让这个 VitrualDom对象进行创建和更改，然后再将 VitrualDom对象渲染成真实DOM。

当我们需要对 DOM进行事件监听时，首先对 VitrualDom进行事件监听， VitrualDom会代理原生的 DOM事件从而做出响应。

## 为什么使用虚拟DOM

1. 提高开发效率
   * 使用 React，你只需要告诉 React你想让视图处于什么状态， React则通过 VitrualDom确保 DOM与该状态相匹配。你不必自己去完成属性操作、事件处理、 DOM更新， React会替你完成这一切。这让我们更关注我们的业务逻辑而非 DOM操作，这一点即可大大提升我们的开发效率
2. 提升性能
   * 如果是首次渲染， VitrualDom不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。
   * VitrualDom的优势在于 React的 Diff算法和批处理策略， React在页面更新之前，提前计算好了如何进行更新和渲染 DOM。实际上，这个计算过程我们在直接操作 DOM时，也是可以自己判断和实现的，但是一定会耗费非常多的精力和时间，而且往往我们自己做的是不如 React好的。所以，在这个过程中 React帮助我们"提升了性能"。
  * VitrualDom帮助我们提高了开发效率，在重复渲染时它帮助我们计算如何更高效的更新，而不是它比 DOM操作更快。
3. 跨浏览器兼容
   * React基于 VitrualDom自己实现了一套自己的事件机制，自己模拟了事件冒泡和捕获的过程，采用了事件代理，批量更新等方法，抹平了各个浏览器的事件兼容性问题。
4. 跨平台兼容
   *itrualDom为 React带来了跨平台渲染的能力。以 ReactNative为例子。 React根据 VitrualDom画出相应平台的 ui层，只不过不同平台画的姿势不同而已




## 虚拟DOM原理、特性总结
1. React组件的渲染流程
   * 使用 React.createElement或 JSX编写 React组件，实际上所有的 JSX代码最后都会转换成 React.createElement(...)， Babel帮助我们完成了这个转换的过程。
   * createElement函数对 key和 ref等特殊的 props进行处理，并获取 defaultProps对默认 props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个 ReactElement对象（所谓的虚拟 DOM）。
   * ReactDOM.render将生成好的虚拟 DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实 DOM。
2. 虚拟DOM的组成（即 ReactElementelement对象，我们的组件最终会被渲染成下面的结构：）
   * type：元素的类型，可以是原生html类型（字符串），或者自定义组件（函数或 class）
   * key：组件的唯一标识，用于 Diff算法，下面会详细介绍
   * ref：用于访问原生 dom节点
   * props：传入组件的 props， chidren是 props中的一个属性，它存储了当前组件的孩子节点，可以是数组（多个孩子节点）或对象（只有一个孩子节点）
   * owner：当前正在构建的 Component所属的 Component
   * self：（非生产环境）指定当前位于哪个组件实例
   * _source：（非生产环境）指定调试代码来自的文件( fileName)和代码行数( lineNumber)
3. 防止XSS
   * ReactElement对象还有一个 $$typeof属性，它是一个 Symbol类型的变量 Symbol.for('react.element')，当环境不支持 Symbol时， $$typeof被赋值为 0xeac7。
   * 这个变量可以防止 XSS。如果你的服务器有一个漏洞，允许用户存储任意 JSON对象， 而客户端代码需要一个字符串，这可能为你的应用程序带来风险。 JSON中不能存储 Symbol类型的变量，而 React渲染时会把没有 $$typeof标识的组件过滤掉。
4. 批处理和事务
   * React在渲染虚拟 DOM时应用了批处理以及事务机制，以提高渲染性能。
5. 针对性的性能优化
   * 在 IE（8-11）和 Edge浏览器中，一个一个插入无子孙的节点，效率要远高于插入一整个序列化完整的节点树。
   * React通过 lazyTree，在 IE（8-11）和 Edge中进行单个节点依次渲染节点，而在其他浏览器中则首先将整个大的 DOM结构构建好，然后再整体插入容器。
   * 并且，在单独渲染节点时， React还考虑了 fragment等特殊节点，这些节点则不会一个一个插入渲染
6. 虚拟DOM事件机制
   * React自己实现了一套事件机制，其将所有绑定在虚拟 DOM上的事件映射到真正的 DOM事件，并将所有的事件都代理到 document上，自己模拟了事件冒泡和捕获的过程，并且进行统一的事件分发。
   * React自己构造了合成事件对象 SyntheticEvent，这是一个跨浏览器原生事件包装器。 它具有与浏览器原生事件相同的接口，包括 stopPropagation()和 preventDefault()等等，在所有浏览器中他们工作方式都相同。这抹平了各个浏览器的事件兼容性问题。


## 你了解 Virtual DOM 吗？解释一下它的工作原理
> Virtual DOM 是一个轻量级的 JavaScript 对象，它最初只是 real DOM 的副本。它是一个节点树，它将元素、它们的属性和内容作为对象及其属性。 React 的渲染函数从 React 组件中创建一个节点树。然后它响应数据模型中的变化来更新该树，该变化是由用户或系统完成的各种动作引起的。
Virtual DOM 工作过程有三个简单的步骤。
   * 每当底层数据发生改变时，整个 UI 都将在 Virtual DOM 描述中重新渲染。
   * 然后计算之前 DOM 表示与新表示的之间的差异。
   *完成计算后，将只用实际更改的内容更新 real DOM。





## real Dom 和 虚拟Dom 的异同
   
｜Real DOM    ｜  Virtual  DOM｜   
｜----｜----｜   
｜更新缓慢    ｜  更新更快｜   
｜可以直接更新 HTML    ｜  无法直接更新 HTML｜   
｜如果元素更新，则创建新DOM   ｜  如果元素更新，则更新 JSX ｜   
｜DOM操作代价很高    ｜  DOM 操作非常简单｜   
｜消耗的内存较多     ｜  很少的内存消耗｜








<!-- https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484212&idx=1&sn=e4cf00c0c087c34ae2f181e7b2f2b257&chksm=ce6ec798f9194e8e0ef0327e9a4cbb8d1454218609a20663a5ea5fed9e31f4a39b7fb114e117&scene=21#wechat_redirect -->