const compose = function(...args) {
  let init = args.pop()
  return function(...arg) {
    return args.reverse().reduce(function(sequence, func) {
      return sequence.then(function(result) {
        return func.call(null, result)
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}


<!-- https://blog.csdn.net/weixin_34037515/article/details/88963889 -->