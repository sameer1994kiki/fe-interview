<!-- https://juejin.cn/post/6844904047913205767 -->

target：触发事件的源组件(事件注册/绑定所在组件)

currentTarget：事件触发的当前事件

（当前事件，可能是触发事件的源组件，可能是触发的事件组件（即触发事件源组件的子元素），

此时点击子元还是父元素，都是当前事件，应用e.currentTarget）。


说明：取值方面（一般用于页面传值）

1、如果绑定的事件所在组件没有子元素，则用e.target===e.currentTarget一样；

2、如果事件绑定在父元素中，且该父元素有子元素，

     当用e.currentTarget时，不管点击父元素所在区域还是子元素（当前事件），都正确执行，

     若用e.target时，点击父元素所在区域无错，点击子元素区域，执行报错-------》

     报错的原因是事件没绑定在子元素上，是在父元素上，子元素要用e.currentTarget才正确！

   

总之：使用e.target时要注意，e.currentTarget就无所谓了~ 



qq_遁去的一_1
e.currentTarget始终是事件实际绑定的元素。e.target是事件起源的元素，因此e.target可能是e.currentTarget，或e.target可以=e.currentTarget，这取决于您的标记是如何构造的。


e.target 和 e.currentTarget 的区别

e.target：返回触发事件的对象。即用户操作的对象。（假设：你点击了谁就是谁）
e.currentTarget : 程序员监听的元素， 即你绑定了谁就是谁
this就是e.currentTarget
<!-- https://mp.weixin.qq.com/s/2cEbrUcDPXPEgP7oI-I01w -->