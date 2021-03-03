function request(url, body, succ, error, maxCount = 5) {
  return fetch(url, body)
    .then((res) => succ(res))
    .catch((err) => {
      if (maxCount <= 0) return error("请求超时");
      return request(url, body, succ, error, --maxCount);
    });
}

// 调用请求函数
request(
  "https://java.some.com/pc/reqCount",
  { method: "GET", headers: {} },
  (res) => {
    console.log(res.data);
  },
  (err) => {
    console.log(err);
  }
);
