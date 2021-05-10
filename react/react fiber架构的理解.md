<!-- https://mp.weixin.qq.com/s/zjhCIUtJrSmw2icy2zkKFg -->
<!-- https://blog.csdn.net/halations/article/details/109284050 -->
<!-- http://www.ayqy.net/blog/dive-into-react-fiber/ -->

Fiber在diff阶段，做了如下的操作：

把可中断的工作拆分成小任务。
对正在做的工作调整优先次序、重做、复用上次（做了一半的）成果。
diff阶段任务调度优先级控制。

Fiber的关键特性：

增量渲染（把渲染任务拆分成块，匀到多帧）
更新时能够暂停，终止，复用渲染任务
给不同类型的更新赋予优先级
并发方面新的基础能力