// 1. JOSN.stringify()/JSON.parse()
let obj = { a: 1, b: { x: 3 } };
JSON.parse(JSON.stringify(obj));

// 2. 递归拷贝
function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return copy;
}

function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj === "symbol") {
    let desc = obj.description;
    return desc ? Symbol(desc) : Symbol();
  }
  if (typeof obj !== "object") return obj;
  if (hash.has(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}
// 上面代码使用了 WeakMap 数据结构来解决循环引用的问题
// https://mp.weixin.qq.com/s/PQ9KH60s7xajNsjemXiNuQ
// https://mp.weixin.qq.com/s/fyqkKKbwIJi6tmIfJMGxKg
// https://juejin.cn/post/6844903937426849799
