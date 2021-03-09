
// https://weread.qq.com/web/reader/eb232f50718ff5e9eb2a999kf7132c6022cf7177163c01c
// https://mp.weixin.qq.com/s/epmJVhTa8rsRX0SXeOvJ3g(和高程里面一样的)
// https://mp.weixin.qq.com/s/QosvuHONrzw5hROz_Og7jw

1. 工厂模式
```
function createPerson(name, job) { 
 var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(this.name); 
 } 
 return o 
} 
var person1 = createPerson('Mike', 'student') 
var person2 = createPerson('X', 'engineer')
```

2. 构造函数模式
```
function Person(name, job) { 
 this.name = name;
 this.job = job;
 this.sayName = function() { 
  console.log(this.name);
 } 
} 
var person1 = new Person('Mike', 'student') 
var person2 = new Person('X', 'engineer')
```

3. 原型模式

```
function Person() { 
} 
Person.prototype.name = 'Mike' 
Person.prototype.job = 'student' 
Person.prototype.sayName = function() { 
 console.log(this.name) 
} 
var person1 = new Person()
```
4. 组合使用构造函数模式和原型模式
```
function Person(name) { 
 this.name = name; 
 this.friends = ['Jack', 'Merry']; 
} 
Person.prototype.sayName = function() { 
 console.log(this.name); 
} 
var person1 = new Person(); 
var person2 = new Person(); 
person1.friends.push('Van'); 
console.log(person1.friends) //["Jack", "Merry", "Van"] 
console.log(person2.friends) // ["Jack", "Merry"] 
console.log(person1.friends === person2.friends) //false
   ```
5. 动态原型模式

```
function Person(name, job) { 
  // 属性 
 this.name = name;
 this.job = job;
 // 方法 
 if(typeof this.sayName !== 'function') { 
  Person.prototype.sayName = function() { 
    console.log(this.name) 
  } 
 } 
} 
var person1 = new Person('Mike', 'Student') 
person1.sayName()

```
6. 寄生构造函数模式

```
function Person(name, job) { 
  var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(this.name) 
 } 
 return o 
} 
var person1 = new Person('Mike', 'student') 
person1.sayName()
```
7. 稳妥构造函数模式

```
function Person(name, job) { 
 var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(name) //注意这里没有了"this"；
 } 
 return o 
} 
var person1 = Person('Mike', 'student') 
person1.sayName();
```