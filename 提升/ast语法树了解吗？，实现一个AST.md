js 执行的第一步是读取 js 文件中的字符流，然后通过词法分析生成 token，之后再通过语法分析( Parser )生成 AST

整个解析过程主要分为以下两个步骤：

分词：将整个代码字符串分割成最小语法单元数组
语法分析：在分词基础上建立分析语法单元之间的关系

词法分析，也称之为扫描（scanner），简单来说就是调用 next() 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的Token。Token 是一个不可分割的最小单元:

词法分析器里，每个关键字是一个 Token ，每个标识符是一个 Token，每个操作符是一个 Token，每个标点符号也都是一个 Token。除此之外，还会过滤掉源程序中的注释和空白字符（换行符、空格、制表符等。
最终，整个代码将被分割进一个令牌（tokens）列表



常用的JavaScript Parser：

esprima

uglifyJS2

traceur

acorn

espree

@babel/parser


IDE使用，如代码风格检测(eslint等)、代码的格式化，代码高亮，代码错误等等

代码的混淆压缩

转换代码的工具。如webpack，rollup，各种代码规范之间的转换，ts，jsx等转换为原生js


三、AST能做什么
1.语法检查、代码风格检查、格式化代码、语法高亮、错误提示、自动补全等。
2.代码混淆压缩。
3.优化变更代码，改变代码结构等等


Program程序主体整段代码的主体
VariableDeclaration变量声明声明变量，比如 let const var
FunctionDeclaration函数声明声明函数，比如 function
ExpressionStatement表达式语句通常为调用一个函数，比如 console.log(1)
BlockStatement块语句包裹在 {} 内的语句，比如 if (true) { console.log(1) }
BreakStatement中断语句通常指 
breakContinueStatement持续语句通常指 
continueReturnStatement返回语句通常指 
returnSwitchStatementSwitch 语句通常指 
switchIfStatementIf 控制流语句通常指 if (true) {} else {}
Identifier标识符标识，比如声明变量语句中 const a = 1 中的 a
ArrayExpression数组表达式通常指一个数组，比如 [1, 2, 3]
StringLiteral字符型字面量通常指字符串类型的字面量，比如 const a = '1' 中的 '1'
NumericLiteral数字型字面量通常指数字类型的字面量，比如 const a = 1 中的 1
ImportDeclaration引入声明声明引入，比如 import


<!-- https://juejin.cn/post/6844903798347939853 -->
<!-- https://juejin.cn/post/6844903668492435470 -->
<!-- https://juejin.cn/post/6942016231214055454 -->
<!-- https://juejin.cn/post/6844903639417356302 不错-->

<!-- https://mp.weixin.qq.com/s/-CC2a31NgrsUZCYrfTI-Dg -->