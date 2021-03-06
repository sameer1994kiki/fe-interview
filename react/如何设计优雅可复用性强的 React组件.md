# 1. 组件设计的基本原则
  * 单一职责
    **收益**
      * 降低组件的复杂度. 职责单一组件代码量少, 容易被理解, 可读性高
      * 降低对其他组件的耦合. 当变更到来时可以降低对其他功能的影响, 不至于牵一发而动全身
      * 提高可复用性. 功能越单一可复用性越高, 就比如一些基础组件
  * 高内聚, 低耦合
  * 复用性/通用性
  PS:(another)
    * 标准性
    * 独立性
    * 复用与易用
    * 追求短小精悍
    * 适用SPOT法则
    * 避免暴露组件内部实现
    * 避免直接操作DOM，避免使用ref
    * 入口处检查参数的有效性，出口处检查返回的正确性
    * 无环依赖原则(ADP)
    * 稳定抽象原则(SAP)
    * 避免冗余状态
    * 合理的依赖关系
    * 扁平化参数
    * 良好的接口设计
    * API尽量和已知概念保持一致

# 2. 基本技巧（这些技巧来源于react-bits:）
  * 如果组件不需要状态, 则使用无状态组件
  * 性能上比较: 无状态函数 > 有状态函数 > class 组件
  * 最小化 props(接口). 不要传递超过要求的 props
  * 如果组件内部存在较多条件控制流, 这通常意味着需要对组件进行抽取
  * 不要过早优化. 只要求组件在当前需求下可被复用, 然后’随机应变’
# 3. 组件的分类
  * 容器组件和展示组件分离
  * 分离逻辑和视图
    **方式**
      * hooks
      * 高阶组件
      * Render Props
      * Context
  * 有状态组件和无状态组件
  * 纯组件和非纯组件
  * 按照 UI 划分为布局组件和内容组件
  * 接口一致的数据录入组件
  PS:(another)
    * 基础组件（通常在组件库里就解决了）
    * 容器型组件（Container）
    * 展示型组件（stateless）
    * 业务组件
    * 通用组件
    * UI组件
    * 逻辑组件
    * 高阶组件（HOC）

# 4. 目录划分
  * 基本目录结构
  * 多页应用的目录划分
# 5. 模块
  * 创建严格的模块边界
  * Named export vs default export
    * 对于’主体对象’明确的模块需要有默认导出, 例如页面组件，类
    * 对于’主体对象’不明确的模块不应该使用默认导出，例如组件库、utils(放置各种工具方法)、contants 常量
  * 避免循环依赖
  * 相对路径不要超过两级
# 6. 拆分
  * 拆分 render 方法
  * 拆分为组件
    * 纯渲染拆分
    * 纯逻辑拆分
    * 逻辑和渲染拆分
# 7. 组件划分示例
    * 划分页面
    * 划分基础 UI 组件
    * 设计组件的状态
* 8. 文档
    * Storybook


<!-- https://bobi.ink/2019/05/11/react-component-design-02/ -->
<!-- https://juejin.cn/post/6844903917470351367 -->
<!-- https://juejin.cn/post/6844903842392309768 React组件设计实践总结01 - 类型检查 -->