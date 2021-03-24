/**
 * 将函数柯里化
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数，默认为原函数的形参个数
 */
function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}

/**
 * 中转函数
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数
 * @param args  已接收的参数列表
 */
function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params];
    if (_args.length >= len) {
      return fn.apply(this, _args);
    } else {
      return _curry.call(this, fn, len, ..._args);
    }
  };
}

function add() {
  // 1 把所有参数转换成数组
  let args = Array.prototype.slice.call(arguments);
  // 2 再次调用add函数，传递合并当前与之前的参数
  let fn = function () {
    let arg_fn = Array.prototype.slice.call(arguments);
    return add.apply(null, args.concat(arg_fn));
  };
  // 3 最后默认调用，返回合并的值
  fn.toString = function () {
    return args.reduce(function (a, b) {
      return a + b;
    });
  };
  return fn;
}

// ES6写法
function add() {
  let args = [...arguments];
  let fn = function () {
    return add.apply(null, args.concat([...arguments]));
  };
  fn.toString = () => args.reduce((a, b) => a + b);
  return fn;
}

// https://mp.weixin.qq.com/s/rvcuCxJj1p0Q0SUEx8WWDg
// https://juejin.cn/post/6873215243804213262
