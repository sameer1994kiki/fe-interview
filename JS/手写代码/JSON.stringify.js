function stringify(value) {
  var type = typeof value;

  function getValues(value) {
    if (type === "symbol" || type === "undefined" || type === "function") {
      return undefined;
    }

    if (type === "number" || type === "boolean") {
      return "" + value + "";
    }

    if (type === "string") {
      return '"' + value + '"';
    }
  }

  // 对于对象数据类型
  // 在javascript中，数组和对象都是对象
  if (type === "object") {
    // 检查值是否为null
    if (!value) {
      return "" + value + "";
    }

    // 检查值是否为日期对象
    if (value instanceof Date) {
      return '"' + new Date(value).toISOString() + '"'; // 返回ISO 8601日期字符串
    }

    // 检查值是否为Array
    if (value instanceof Array) {
      return "[" + value.map(stringify) + "]"; // 递归调用stringify函数
    } else {
      // 递归调用stringify函数
      return (
        "{" +
        Object.keys(value)
          .map((key) => {
            let result = stringify(value[key]);
            if (result === undefined) {
              return undefined;
            }
            return '"' + key + '"' + ":" + result;
          })
          .filter((item) => item !== undefined) +
        "}"
      );
    }
  }

  return getValues(value);
}

console.log(stringify([1, 2, 3])); // "[1,2,3]"
console.log(stringify(new Date())); // 返回日期字符串
console.log(stringify({ a: 1 })); // "{"a":1}"

// https://mp.weixin.qq.com/s/sITny2gKbue9kbxyuBQfVw

// https://mp.weixin.qq.com/s/3KoZUVubPu4yN99vIMdBSA
