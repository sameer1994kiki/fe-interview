1. 项目开发中有遇到什么挑战没，对哪个项目印象比较深刻深刻，遇到最难的项目是啥，未来会有什么样的规划，现在有的项目中觉得哪些项目可以继续优化，为啥没有优化，最近比较关心的技术
2. 如何判断 当前浏览器是否支持webp
3. 描述项目：
    + 团队协作，以前的开发流程？
    + 项目的背景是什么；
    + 当前项目的目的是什么
    + 在开发过程中，你的角色是什么
    + 在开发过程中有遇到过什么样的难题；
    + 遇到这些问题，你都是如何进行解决的；
    + 项目完成之后，取得了哪些成果；
4. 讲概念，说用途，理思路，优缺点，来一遍”，还需要对你长期开发过程中的思考，有经验层面的方法总结
5. 打造一个 lucas-scripts
6. 
7.  埋点组件构建（https://mp.weixin.qq.com/s/qPscY8VBawl74GmqS57SVg）
8. 更换主题色
9. OSS项目重构，推行eslint和primitter
10. css原子化
11. 复用相同的逻辑
12. dockerfile,jekins（https://mp.weixin.qq.com/s/ZkKcbGEqTQg4QEbzWqNjCg）
13. api缓存 https://mp.weixin.qq.com/s/tXMncif8P7MfjjIh91U_Eg，https://mp.weixin.qq.com/s/cys1vesfhKXRu-kVqppmfg
14. 中文连续输入问题


<!-- https://mp.weixin.qq.com/s/HjTcJh9H62MfAsvqYtfpFw -->






<!-- https://cdc.tencent.com/2018/09/13/frontend-exception-monitor-research/ -->

前端产生异常的原因主要分5类： 
原因	案例	频率
逻辑错误	1)    业务逻辑判断条件错误
2)    事件绑定顺序错误
3)    调用栈时序错误
4)    错误的操作js对象	经常
数据类型错误	1)    将null视作对象读取property
2)    将undefined视作数组进行遍历
3)    将字符串形式的数字直接用于加运算
4)    函数参数未传	经常
语法句法错误		较少
网络错误	1)    慢
2)    服务端未返回数据但仍200，前端按正常进行数据遍历
3)    提交数据时网络中断
4)    服务端500错误时前端未做任何错误处理	偶尔
系统错误	1)    内存不够用
2)    磁盘塞满
3)    壳不支持API
4)    不兼容