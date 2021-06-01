### commonjs
   ```
    module.exports = {}
    exports.name = 'lindaidai';
    module.exports.name = 'lindaidai';
   ```
   require()它是Node.js中的一个全局方法，并不是CommonJS独有的，CommonJS只是众多规范中的其中一种。这种规范允许我们：
    使用module.exports = {}或者exports.name = xxx导出模块
    使用const m1 = require('./m1')引入模块
    甚至能允许你是一个表达式
    ```
      var m1Url = './m1.js';
      var m1 = require(m1Url);
      var m1 = require('./m' + '1.js');
    ```
#  模块标识符(标识)
    核心模块(Node.js自带的模块)
    路径模块(相对或绝对定位开始的模块)
    自定义模块(node_modules里的模块)

  三种模块的查找方式：
  * 核心模块，直接跳过路径分析和文件定位
  * 路径模块，直接得出相对路径就好了
  *自定义模块，先在当前目录的node_modules里找这个模块，如果没有，它会往上一级目录查找，查找上一级的node_modules，依次往上，直到根目录下都没有, 就抛出错误。

# 文件定位：
  * 在NodeJS中, 省略了扩展名的文件, 会依次补充上.js, .node, .json来尝试, 如果传入的是一个目录, 那么NodeJS会把它当成一个包来看待, 会采用以下方式确定文件名
  * 第一步, 找出目录下的package.json, 用JSON.parse()解析出main字段
  * 第二步, 如果main字段指定的文件还是省略了扩展, 那么会依次补充.js, .node, .json尝试.
  * 第三步, 如果main字段制定的文件不存在, 或者根本就不存在package.json, 那么会默认加载这个目录下的index.js, index.node, index.json文件.
  * 以上就是文件定位的过程, 再搭配上路径分析的过程, 进行排列组合, 这得有多少种可能呀. 所以说, 自定义模块的引入, 是最费性能的.

#  CommonJS规范的特点
  * 所有代码都运行在模块作用域，不会污染全局作用域；
  * 模块是同步加载的，即只有加载完成，才能执行后面的操作；
  * 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
  * CommonJS输出是值的拷贝(即，require返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值)。


### AMD规范

在介绍AMD之前让我们看看CommonJS规范对服务器端和浏览器的不同，它有助于让你理解为什么说CommonJS不太适合于客户端：
服务器端所有的模块都存放在本地硬盘中，可以同步加载完成，等待时间就是硬盘的读取时间。
浏览器，所有的模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于”假死”状态。

AMD它的产生很大一部分原因就是为了能让我们采用异步的方式加载模块。


### CMD规范

现在再来说说AMD和CMD的区别。
虽然它们的define()方法的参数都相同，但是:
AMD中会把当前模块的依赖模块放到dependencies中加载，并在factory回调中拿到加载成功的依赖
CMD一般不在dependencies中加载，而是写在factory中，使用require加载某个依赖模块

AMD和CMD的区别
AMD和CMD最大的区别是对依赖模块的执行时机处理不同，注意不是加载的时机或者方式不同，二者皆为异步加载模块。
1、AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块2、CMD推崇就近依赖，只有在用到某个模块的时候再去require

### ES6 Modules规范

1. export导出模块

export有两种模块导出方式：
命名式导出(名称导出)
默认导出(自定义导出)

ES6 Modules规范的特点

总结一下它的特点哈：
输出使用export
输入使用import
可以使用export...from...这种写法来达到一个"中转"的效果
输入的模块变量是不可重新赋值的，它只是个可读引用，不过却可以改写属性
export命令和import命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
import命令具有提升效果，会提升到整个模块的头部，首先执行。



#### CommonJS与ES6 Modules规范的区别

* CommonJS模块是运行时加载，ES6 Modules是编译时输出接口
* CommonJS输出是值的拷贝；ES6 Modules输出的是值的引用，被输出模块的内部的改变会影响引用的改变
* CommonJs导入的模块路径可以是一个表达式，因为它使用的是require()方法；而ES6 Modules只能是字符串
* CommonJS this指向当前模块，ES6 Modules this指向undefined
* 且ES6 Modules中没有这些顶层变量：arguments、require、module、exports、__filename、__dirname




   https://mp.weixin.qq.com/s/eMC2ZQrFpuHbgQooQdv4xg 


commonjs 和 esm 的主要区别可以概括成以下几点：

输出拷贝 vs 输出引用
esm 的 import read-only 特性
esm 存在 export/import 提升




五、 ES6 模块与 CommonJS 模块的差异
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。


运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。


编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。


CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

作者：subwaydown
链接：https://juejin.cn/post/6844903576309858318
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


3. commonjs 服务端规范

一个文件就是一个模块
每个模块都有单独的作用域
通过module.exports导出成员
通过require函数载入模块
commonjs是以同步的方式加载模块 node的执行机制是在启动时去加载模块 在执行阶段不需要加载模块
CommonJS 模块输出的是一个值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值
CommonJS 模块加载的顺序，按照其在代码中出现的顺序
由于 CommonJS 是同步加载模块的，在服务器端，文件都是保存在硬盘上，所以同步加载没有问题，但是对于浏览器端，需要将文件从服务器端请求过来，那么同步加载就不适用了，所以，CommonJS 是不适用于浏览器端的。
CommonJS 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存

4. ESmodules 浏览器模块化规范

在语言层面实现了模块化 通过给script的标签 将type设置成module 就可以使用这个规范了
基本特性
自动采用严格模式，忽略use strict
每个ESM模块都是单独的私有作用域
ESM是通过CORS去请求外部JS模块的
ESM中的script标签会延迟执行脚本
ES6 模块是动态引用，引用类型属性被改变会相互影响
export import 进行导入导出
导出的并不是成员的值 而是内存地址 内部发生改变外部也会改变，外部导入的是只读成员不能修改
ES module中可以导入CommonJS模块
CommonJS中不能导入ES module模块
CommonJS始终只会导出一个默认成员
注意import不是解构导出对象