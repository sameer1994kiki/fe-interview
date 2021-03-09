// 思路：右边变量的原型存在于左边变量的原型链上
function instanceOf(left, right) {
  let leftValue = left.__proto__;
  let rightValue = right.prototype;
  while (true) {
    if (leftValue === null) {
      return false;
    }
    if (leftValue === rightValue) {
      return true;
    }
    leftValue = leftValue.__proto__;
  }
}

let myInstanceof = (target, origin) => {
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    }
    target = target.__proto__;
  }
  return false;
};
let a = [1, 2, 3];
console.log(myInstanceof(a, Array)); // true
console.log(myInstanceof(a, Object)); // true

/**
 * 简单实现instanceof的原理
 *
 * @param {*} Ctor 构造函数
 * @param {*} obj 实例对象
 * @returns
 */
function instance_of(obj, Ctor) {
  var proto = Object.getPrototypeOf(obj);

  while (proto) {
    if (Ctor.prototype === proto) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

/**
 * 实现instanceof的原理
 *
 * @param {*} Ctor 构造函数
 * @param {*} obj 实例对象
 * @returns
 */
function instance_of(obj, Ctor) {
  // 容错
  if (typeof Ctor !== "function")
    throw new TypeError(
      "Uncaught TypeError: Right-hand side of 'instanceof' is not callable"
    );

  if (obj == null) return false;

  // 支持Symbol并且拥有Symbol.hasInstance的
  if (typeof Symbol !== "undefined") {
    var hasInstance = Ctor[Symbol.hasInstance];
    if (typeof hasInstance === "function") {
      return hasInstance.call(Ctor, obj);
    }
  }

  // 不支持Symbol的就继续原型链查找来实现
  var prototype = Ctor.prototype,
    proto = Object.getPrototypeOf(obj);

  // 没有原型的直接返回false就好了，例如箭头函数
  if (!prototype) return false;

  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
// https://mp.weixin.qq.com/s/NWq5Z1ubL7XMgTBMIIVlcA
// https://mp.weixin.qq.com/s/dw5D6wpOKJTlc_mNKjAPdQ
// https://mp.weixin.qq.com/s/NWq5Z1ubL7XMgTBMIIVlcA
