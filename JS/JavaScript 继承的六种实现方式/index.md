1.  原型链继承
 ```
function Parent() {
  this.name = "parent1";
  this.play = [1, 2, 3];
}

function Child() {
  this.type = "child2";
}

Child.prototype = new Parent();
// 弊端：内存空间是共享的
```
2. 构造函数继承
```
function Parent() {
  this.name = "parent1";
}
Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);// 相当于this.parent()
  this.type = "child";
}
let child = new Child();

//  弊端：不能继承原型属性或者方法
```
3. 组合继承
```
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3, 4];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.type = "child";
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

//  弊端：Parent执行了两次
```
4. 原型式继承
```
const Parent = {
  name: "parent",
  friends: [1, 2, 3],
  getName: function () {
    return this.name;
  },
};
const person = Object.create(Parent);
person.name = "timo";
person.friends.push(66);

const person2 = Object.create(Parent);
person.name = "timo2";
person.friends.push(665);
// 弊端：Object.creat是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能
```
5. 寄生式继承
```
const Parent = {
  name: "parent",
  friends: [1, 2, 3],
  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let person5 = clone(parent5);

// 在原型继承的基础上进行了浅拷贝的优化，添加了一些方法
// 缺点：和原型继承一样
```
6. 寄生组合式继承
```


function Parent() {
  this.name = "parent6";
  this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  Parent.call(this);
  this.friends = "timo";
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.getFriends = function () {
  return this.friends;
};
let person = new Child();
// extends实际采用的也是寄生组合继承方式，因此也证明了这种方式是较优的解决继承的方式
```
[图片总结](https://mmbiz.qpic.cn/mmbiz_png/gH31uF9VIibSPnibW7Mr5w4lh1DtxTGmQM5vfcIEv1t5TeMaXiaFicqhxr1bUYqeicw0Uebiciaiavkib0zIacDVAg3LM1g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

https://mp.weixin.qq.com/s/7yDF6lkGQNTzCQrvK70pyA    

https://mp.weixin.qq.com/s/mnQde8T6frvYautX4Ajdxg   

https://cassiellee.github.io/2020/04/10/JS%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81%E4%B9%8B%E5%AF%84%E7%94%9F%E7%BB%84%E5%90%88%E7%BB%A7%E6%89%BF%E5%92%8CES6%E7%BB%A7%E6%89%BF/   

https://www.jianshu.com/p/6925ed009f1e
