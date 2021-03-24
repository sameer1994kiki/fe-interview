// 思路:在规定时间内未触发第二次，则执行
function debounce(fn, delay) {
  // 利用闭包保存定时器
  let timer = null;
  return function () {
    // 由于下面的使用的是普通函数，如果没有重新赋值，this，和arguments会指向下面调用的函数，如果不想赋值，可以使用箭头函数，箭头函数会自动绑定this，且没有arguments
    let context = this;
    let arg = arguments;
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, arg);
    }, delay);
  };
}

function myDebounce(fn, interval = 500) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}

function fn() {
  console.log("防抖");
}
addEventListener("scroll", debounce(fn, 1000));

// 思路：在规定时间内只触发一次
function throttle(fn, delay) {
  // 利用闭包保存时间
  let prev = Date.now();
  return function () {
    let context = this;
    let arg = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, arg);
      prev = Date.now();
    }
  };
}

function fn() {
  console.log("节流");
}
addEventListener("scroll", throttle(fn, 1000));

// https://juejin.cn/post/6844903752063778830
// https://mp.weixin.qq.com/s/4R0GNHY9a0nK1KO_tfqOIQ
