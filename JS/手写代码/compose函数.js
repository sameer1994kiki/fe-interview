function compose(...funcs) {
  // ...funcs ：传递的函数集合
  return function proxy(...args) {
    //=>...args：第一次调用函数传递进来的参数
    let len = funcs.length;
    if (len === 0) {
      //=> 一个函数都不需要执行，直接返回ARGS
      return args;
    }
    if (len === 1) {
      // 只有一个函数需要执行，把函数执行后的结果返回即可
      return funcs[0](...args);
    }
    // 两个及两个以上的情况
    return funcs.reduce((x, y) => {
      return typeof x === "function" ? y(x(...args)) : y(x);
    });
  };
}
//  console.log(compose()(5)); //=> 5
//  console.log(compose(fn1)(5)); //=>15
// console.log(compose(fn1,fn2)(5));//=>fn1(5)=15 fn2(15) ...
console.log(compose(fn1, fn2, fn1, fn3)(5)); //=>16

// redux的compose实现
module.exports.compose = (middlewares = []) => {
  if (!Array.isArray(middlewares)) {
    middlewares = Array.from(arguments);
  }

  if (middlewares.length === 0) {
    return (arg) => arg;
  }

  if (middlewares.some((fn) => typeof fn !== "function")) {
    throw new TypeError("Middleware must be composed of functions!");
  }

  return (next = async () => {}) =>
    middlewares.reduce((a, b) => (arg) => a(() => b(arg)))(next);
};

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// https://mp.weixin.qq.com/s/ED-zyj51PC9HR6kx8SZGBA
// https://juejin.cn/post/6844903988647690254
// https://mp.weixin.qq.com/s/7iSW9TwSE0F_huinWG2HZw
// 异步的compose;   important！！！
