<!-- https://blog.csdn.net/halations/article/details/109284050 -->
<!-- https://www.zhihu.com/question/266800762/answer/392365854 -->
## 传统diff和React的diff的区别
> 传统Diff算法需要找到两个树的最小更新方式，所以需要[两两]对比每个叶子节点是否相同，对比就需要O(n^2)次了，再加上更新（移动、创建、删除）时需要遍历一次，所以是O(n^3)

> Reactdiff:计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。
> 
**React用 三大策略 将O(n^3)复杂度 转化为 O(n)复杂度**
1) tree diff
基于策略1, React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较。
由于DOM节点跨层级的移动操作少到可以忽略不计，针对这一现象，React通过updateDepth 对Virtual DOM树进行层级控制，只会对同一个父节点下的所有子节点进行比较。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进—步的比较。这样只需要对树进行一次遍历，便能完成整个DOM树的比较。

2) component diff
React是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效。
1.如果是同一类型的组件，按照原策略继续比较virtual DOM tree。
2.如果不是，则将该组件判断为dirty component,从而替换整个组件下的所有子节点。
3.对于同一类型的组件，有可能其Virtual DOM没有任何变化，如果能够确切-的知道这点那可以节省大量的diff运算时间，因此 React允许用户通过shouldComponentUpdate()来判断该组件是否需要进行diff。

3) element diff
当节点处于同一层级时，React diff 提供了三种节点操作，分别为: INSERT_MARKUP(插入)、MOVE_EXISTING(移动)和REMOVE_NODE(删除)。
INSERT_MARKUP，新的component类型不在老集合里，即是全新的节点，需要对新节点执行插入操作。
MOVE_EXISTING，在老集合有新component类型，且element是可更新的类型，
generateComponentChildren已调用receiveComponent，这种情况下
preChild=nextChild，就需要做移动操作，可以复用以前的DOM节点。
REMOVE_NODE，老component类型，在新集合里也有，但对应的element 不同则不能直接复用和更新，需要执行删除操作，或者老component不在新集合里的，也需要执行删除操作。
允许开发者对同一层级的同组子节点，添加唯—key进行区分。


## React 15的Diff算法和React 16的Diff算法的区别
  **虚拟DOM的变化：树结构 转变成 链表结构**
  **Fiber核心是实现了一个基于优先级和requestIdleCallback的循环任务调度算法：**







  <!-- https://blog.csdn.net/halations/article/details/109284050 -->




  2. React不同版本**DOM-DIFF**算法分别是怎样的
   * https://juejin.cn/post/6919376064833667080
   * https://juejin.cn/post/6925342156135596046
   * https://juejin.cn/post/6916439520116211726