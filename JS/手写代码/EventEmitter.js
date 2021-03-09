// EventEmitter就是发布订阅模式

class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }

  emit(name) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环,slice是为了复制一个新数组
      const tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn();
      }
    }
  }

  emit(name, once = false) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      const tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn();
      }
      if (once) {
        delete this.cache[name];
      }
    }
  }
}

// 测试
const eventBus = new EventEmitter();
const task1 = () => {
  console.log("task1");
};
const task2 = () => {
  console.log("task2");
};
eventBus.on("task", task1);
eventBus.on("task", task2);

setTimeout(() => {
  eventBus.emit("task");
}, 1000);

// another

function EventEmitter() {
  this.events = new Map();
}

// 需要实现的一些方法：
// addListener、removeListener、once、removeAllListeners、emit

// 模拟实现addlistener方法
const wrapCallback = (fn, once = false) => ({ callback: fn, once });
EventEmitter.prototype.addListener = function (type, fn, once = false) {
  const hanlder = this.events.get(type);
  if (!hanlder) {
    // 没有type绑定事件
    this.events.set(type, wrapCallback(fn, once));
  } else if (hanlder && typeof hanlder.callback === "function") {
    // 目前type事件只有一个回调
    this.events.set(type, [hanlder, wrapCallback(fn, once)]);
  } else {
    // 目前type事件数>=2
    hanlder.push(wrapCallback(fn, once));
  }
};
// 模拟实现removeListener
EventEmitter.prototype.removeListener = function (type, listener) {
  const hanlder = this.events.get(type);
  if (!hanlder) return;
  if (!Array.isArray(this.events)) {
    if (hanlder.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < hanlder.length; i++) {
    const item = hanlder[i];
    if (item.callback === listener.callback) {
      hanlder.splice(i, 1);
      i--;
      if (hanlder.length === 1) {
        this.events.set(type, hanlder[0]);
      }
    }
  }
};
// 模拟实现once方法
EventEmitter.prototype.once = function (type, listener) {
  this.addListener(type, listener, true);
};
// 模拟实现emit方法
EventEmitter.prototype.emit = function (type, ...args) {
  const hanlder = this.events.get(type);
  if (!hanlder) return;
  if (Array.isArray(hanlder)) {
    hanlder.forEach((item) => {
      item.callback.apply(this, args);
      if (item.once) {
        this.removeListener(type, item);
      }
    });
  } else {
    hanlder.callback.apply(this, args);
    if (hanlder.once) {
      this.events.delete(type);
    }
  }
  return true;
};
EventEmitter.prototype.removeAllListeners = function (type) {
  const hanlder = this.events.get(type);
  if (!hanlder) return;
  this.events.delete(type);
};
//发布订阅模式和观察者模式 https://mp.weixin.qq.com/s/QbJTN2gBMW-qb_hj2TQI1g
