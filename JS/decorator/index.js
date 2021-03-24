// decorator 外部可以包装一个函数，函数可以带参数
function Decorator(type) {
  /**
   * 这里是真正的 decorator
   * @target 装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 Car 的某个属性，这个 target 的值就是 Car.prototype
   * @name 装饰的属性的 key
   * @descriptor 装饰的对象的描述对象,等同于Object.defineProperty()中的configurable	enumerable	value	writable	get	set
   */
  return function (target, name, descriptor) {
    // 以此可以获取实例化的时候此属性的默认值
    let v = descriptor.initializer && descriptor.initializer.call(this);
    // 返回一个新的描述对象，或者直接修改 descriptor 也可以
    return {
      enumerable: true,
      configurable: true,
      get: function () {
        return v;
      },
      set: function (c) {
        v = c;
      },
    };
  };
}

// 1. 修饰器不仅可以修饰类的行为，还可以修饰类的属性
