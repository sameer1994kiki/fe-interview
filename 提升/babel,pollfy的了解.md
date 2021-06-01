[babel,pollfy()](https://juejin.cn/post/6844903566809759758)
<!-- https://juejin.cn/post/6844904008679686152 -->
<!-- https://juejin.cn/post/6844903956905197576 -->
<!-- https://juejin.cn/post/6844903743121522701 -->
<!-- https://juejin.cn/post/6844904065223098381 -->

<!-- https://juejin.cn/post/6844903849442934798 -->

<!-- https://juejin.cn/post/6844903849442934798 -->

如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。

插件在 Presets 前运行。
插件顺序从前往后排列。
Preset 顺序是颠倒的（从后往前）。


插件和 preset 都可以接受参数，参数由插件名和参数对象组成一个数组。preset 设置参数也是这种格式。

babel-cli
babel-core
babel-runtime
babel-node
babel-polyfill

使用方法
总共存在三种方式：

使用单体文件 (standalone script)
命令行 (cli)
构建工具的插件 (webpack 的 babel-loader, rollup 的 rollup-plugin-babel)。

其中后面两种比较常见。第二种多见于 package.json 中的 scripts 段落中的某条命令；第三种就直接集成到构建工具中。


执行顺序
很简单的几条原则：

Plugin 会运行在 Preset 之前。
Plugin 会从前到后顺序执行。
Preset 的顺序则 刚好相反(从后向前)。


core-js: 转换一些内置类 (Promise, Symbols等等) 和静态方法 (Array.from 等)。绝大部分转换是这里做的。自动引入。


regenerator: 作为 core-js 的拾遗补漏，主要是 generator/yield 和 async/await 两组的支持。当代码中有使用 generators/async 时自动引入。


babel-cli
允许命令行使用 babel 命令转译文件


｜名称	｜作用	｜备注｜
｜----|----|----|
｜babel-node ｜ 允许命令行使用 babel-node 直接转译+执行 node 文件｜  随 babel-cli 一同安装  babel-node = babel-polyfill + babel-register
｜babel-register｜改写 require 命令，为其加载的文件进行转码，不对当前文件转码｜只适用于开发环境
｜babel-polyfill｜为所有 API 增加兼容方法｜需要在所有代码之前 require，且体积比较大
｜babel-plugin-transform-runtime & babel-runtime｜把帮助类方法从每次使用前定义改为统一 require，精简代码｜babel-runtime 需要安装为依赖，而不是开发依赖
｜babel-loader｜使用 webpack 时作为一个 loader 在代码混淆之前进行代码转换




@babel/cli
plugins
presets
配置Babel
polyfill



Babel 大概分为三大部分:

解析: 将代码(其实就是字符串)转换成 AST( 抽象语法树)
转换: 访问 AST 的节点进行变换操作生成新的 AST
生成: 以新的 AST 为基础生成代码
