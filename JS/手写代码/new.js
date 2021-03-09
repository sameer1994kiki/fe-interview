// use this
function New(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  if (result && (typeof result === "object" || typeof result === "function"))
    return result;
  return obj;
}

// 第二版
function create() {
  // 创建一个空的对象
  var obj = new Object(),
    // 获得构造函数，arguments中去除第一个参数
    Con = [].shift.call(arguments);
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments);
  // 优先返回构造函数返回的对象
  return typeof ret === "object" ? ret : obj;
}

function myNew(fun) {
  return function () {
    // 创建一个新对象且将其隐式原型指向构造函数原型
    let obj = {
      __proto__: fun.prototype,
    };
    // 执行构造函数
    fun.call(obj, ...arguments);
    // 返回该对象
    return obj;
  };
}

function person(name, age) {
  this.name = name;
  this.age = age;
}
let obj = myNew(person)("chen", 18); // {name: "chen", age: 18}
// 前置知识：原型和原型链+继承+call+apply
// 扩展：
// 如何访问对象中的的原型
// 如何判断属性是对象实例中的属性还是原型中的属性
// JavaScript常用八种继承方案
// https://mp.weixin.qq.com/s/XfjElSdKNFfIzW0ov6Wn6g  Object.create和new的区别
// https://mp.weixin.qq.com/s/er5ALxcSk-5oCYjO8x1JXw
// https://mp.weixin.qq.com/s/pYUd90c2_1pqx9RFuQ73tQ
// https://mp.weixin.qq.com/s/GQA1TwVN3cTKaJL4nC20tQ
// https://juejin.cn/post/6921985542879969294
