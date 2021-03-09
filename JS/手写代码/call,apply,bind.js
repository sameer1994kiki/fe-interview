// (context, ...args)

// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  context = context || window;
  context.fn = this;
  let arg = [...arguments].slice(1);
  let result = context.fn(...arg);
  delete context.fn;
  return result;
};
// 优化版本
// Function.prototype.myCall = function (context) {
//   if (typeof this !== 'function') {
//       throw new TypeError('Error')
//       return
//   }
//   switch (typeof context) {
//       case 'number':
//           context = new Number(context);
//           break;
//       case 'boolean':
//           context = new Boolean(context);
//           break;
//       case 'symbol':
//           context = new Object(context);
//           break;
//   }
//   const curEnv = typeof module !== 'undefined' && module.exports ? global : window;
//   context = context || curEnv
//   const key = Symbol();
//   context[key] = this
//   const args = [...arguments].slice(1)
//   const result = context[key](...args)
//   delete context[key]
//   return result
// }

// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

// Function.prototype.myApply = function (context) {
//   if (typeof this !== 'function') {
//       throw new TypeError('Error')
//       return
//   }
//   if (arguments[1] && !Array.isArray(arguments[1])) {
//       throw new TypeError('Error')
//       return
//   }
//   switch (typeof context) {
//       case 'number':
//           context = new Number(context);
//           break;
//       case 'boolean':
//           context = new Boolean(context);
//           break;
//       case 'symbol':
//           context = new Object(context);
//           break;
//   }
//   const curEnv = typeof module !== 'undefined' && module.exports ? global : window;
//   context = context || curEnv
//   const key = Symbol();
//   context[key] = this

//   const args = arguments[1]
//   const result = context[key](...args)
//   delete context[key]
//   return result
// }

// 思路：类似call，但返回的是函数
Function.prototype.mybind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let fn = this;
  let arg = [...arguments].slice(1);
  return function F() {
    // 处理函数使用new的情况
    if (this instanceof F) {
      // return new fn(...arg, ...arguments);
      // 或者
      return fn.apply(this, arg.concat(...arguments));
    } else {
      return fn.apply(context, arg.concat(...arguments));
    }
  };
};

// bind 函数实现
// Function.prototype.myBind = function(context) {
//   // 【1】判断调用对象是否为函数
//   if (typeof this !== "function") {
//     throw new TypeError("Error");
//   }
//   // 【2】获取其余传入参数值, 保存当前函数的引用。
//   var args = [...arguments].slice(1),
//       fn = this;
//   // 【3】创建一个函数返回
//   return function Fn() {
//       // 根据调用方式，传入不同绑定值
//       return fn.apply(
//           this instanceof Fn ? this : context,
//           args.concat(...arguments)
//       );
//   };
// };
// MDN实现
// Function.prototype.bind = function () {
//   var thatFunc = this,
//     thatArg = arguments[0];
//   var args = slice.call(arguments, 1);
//   if (typeof thatFunc !== "function") {
//     throw new TypeError(
//       "Function.prototype.bind - " +
//         "what is trying to be bound is not callable"
//     );
//   }
//   return function () {
//     var funcArgs = args.concat(slice.call(arguments));
//     return thatFunc.apply(thatArg, funcArgs);
//   };
// };

// https://mp.weixin.qq.com/s/MqejL1g4vRJiiy31mioM5Q
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call
// 扩展：了解instanceof
