// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class Promise {
  constructor(fn) {
    // 三个状态
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
      }
    };
    let reject = (value) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = value;
      }
    };
    // 自动执行函数
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // then
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case "fulfilled":
        onFulfilled();
        break;
      case "rejected":
        onRejected();
        break;
      default:
    }
  }
}

// another
const PENDING = 1;
const FULFILLED = 2;
const REJECTED = 3;

function MyPromise(executor) {
  let self = this;
  this.resolveQueue = [];
  this.rejectQueue = [];
  this.state = PENDING;
  this.val = undefined;
  function resolve(val) {
    if (self.state === PENDING) {
      setTimeout(() => {
        self.state = FULFILLED;
        self.val = val;
        self.resolveQueue.forEach((cb) => cb(val));
      });
    }
  }
  function reject(err) {
    if (self.state === PENDING) {
      setTimeout(() => {
        self.state = REJECTED;
        self.val = err;
        self.rejectQueue.forEach((cb) => cb(err));
      });
    }
  }
  try {
    // 回调是异步执行 函数是同步执行
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

MyPromise.prototype.then = function (onResolve, onReject) {
  let self = this;
  // 不传值的话默认是一个返回原值的函数
  onResolve = typeof onResolve === "function" ? onResolve : (v) => v;
  onReject =
    typeof onReject === "function"
      ? onReject
      : (e) => {
          throw e;
        };
  if (self.state === FULFILLED) {
    return new MyPromise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onResolve(self.val);
          if (x instanceof MyPromise) {
            x.then(resolve);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (self.state === REJECTED) {
    return new MyPromise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onReject(self.val);
          if (x instanceof MyPromise) {
            x.then(resolve);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (self.state === PENDING) {
    return new MyPromise(function (resolve, reject) {
      self.resolveQueue.push((val) => {
        try {
          let x = onResolve(val);
          if (x instanceof MyPromise) {
            x.then(resolve);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      });
      self.rejectQueue.push((val) => {
        try {
          let x = onReject(val);
          if (x instanceof MyPromise) {
            x.then(resolve);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

MyPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject);
};

MyPromise.all = function (promises) {
  return new MyPromise(function (resolve, reject) {
    let cnt = 0;
    let result = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (res) => {
          result[i] = res;
          if (++cnt === promises.length) resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};

MyPromise.race = function (promises) {
  return new MyPromise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

MyPromise.resolve = function (val) {
  return new MyPromise(function (resolve, reject) {
    resolve(val);
  });
};

MyPromise.reject = function (err) {
  return new MyPromise(function (resolve, reject) {
    reject(err);
  });
};
