<!-- https://mp.weixin.qq.com/s/kLQtdVkSF-BiEnWlzKUZXQ -->
1. http和https tcp，http和tcp、https、http2(队头阻塞？解决了哪些问题？哪有哪些问题未解决？tcp和udp？)。摘要算法和对称加密、非对称加密大概说一下？摘要和加密的区别？知道哪些加密算法？websocket的使用场景（socket.io降级）？Html4，html5是建立在http上的，http的下一代要解决什么问题？
2. 缓存相关（对比缓存？强缓存？对应请求头，协商缓存）cookie有哪些属性？


![思维导图](https://static001.geekbang.org/resource/image/27/cc/2781919e73f5d258ff1dc371af632acc.png)
知识List:
1. HTTP/1.1 是目前互联网上使用最广泛的协议，功能也非常完善；
2. HTTP/2 基于 Google 的 SPDY 协议，注重性能改善，但还未普及
3. HTTP/3 基于 Google 的 QUIC 协议，是将来的发展方向。
4. HTTP 通常跑在 TCP/IP 协议栈之上，依靠 IP 协议实现寻址和路由、TCP 协议实现可靠数据传输、DNS 协议实现域名查找、SSL/TLS 协议实现安全通信。此外，还有一些协议依赖于 HTTP，例如 WebSocket、HTTPDNS 等
5. URI 是用来标记互联网上资源的一个名字，由“协议名 + 主机名 + 路径”构成，俗称 URL；
6. HTTPS 相当于“HTTP+SSL/TLS+TCP/IP”，为 HTTP 套了一个安全的外壳
7. TCP/IP 分为四层，核心是二层的 IP 和三层的 TCP，HTTP 在第四层；
8. OSI 分为七层，基本对应 TCP/IP，TCP 在第四层，HTTP 在第七层；
9. OSI 可以映射到 TCP/IP，但这期间一、五、六层消失了；
10. DNS查询过程：浏览器缓存->操作系统dnscache ->hosts文件->非权威域名服务器->根域名服务器->顶级域名服务器->二级域名服务器->权威域名服务器。
11. 1××：提示信息，表示目前是协议处理的中间状态，还需要后续的操作；2××：成功，报文已经收到并被正确处理；3××：重定向，资源位置发生变动，需要客户端重新发送请求；4××：客户端错误，请求报文有误，服务器无法处理；5××：服务器错误，服务器在处理请求时内部发生了错误。
12. HTTP 最大的优点是简单、灵活和易于扩展；
13. HTTP 是无状态的，可以轻松实现集群化，扩展性能，但有时也需要用 Cookie 技术来实现“有状态”；
14. HTTP 是明文传输，数据完全肉眼可见，能够方便地研究分析，但也容易被窃听；
15. HTTP 是不安全的，无法验证通信双方的身份，也不能判断报文是否被窜改；
16. HTTP 的性能不算差，但不完全适应现在的互联网，还有很大的提升空间。
17. 数据类型表示实体数据的内容是什么，使用的是 MIME type，相关的头字段是 Accept 和 Content-Type；数据编码表示实体数据的压缩方式，相关的头字段是 Accept-Encoding 和 Content-Encoding；语言类型表示实体数据的自然语言，相关的头字段是 Accept-Language 和 Content-Language；字符集表示实体数据的编码方式，相关的头字段是 Accept-Charset 和 Content-Type；
18. 分块传输可以流式收发数据，节约内存和带宽，使用响应头字段“Transfer-Encoding: chunked”来表示，分块的格式是 16 进制长度头 + 数据块；范围请求可以只获取部分数据，即“分块请求”，实现视频拖拽或者断点续传，使用请求头字段“Range”和响应头字段“Content-Range”，响应状态码必须是 206；也可以一次请求多个范围，这时候响应报文的数据类型是“multipart/byteranges”，body 里的多个部分会用 boundary 字符串分隔。
19. 通信安全必须同时具备机密性、完整性、身份认证和不可否认这四个特性；HTTPS 的语法、语义仍然是 HTTP，但把下层的协议由 TCP/IP 换成了 SSL/TLS；SSL/TLS 是信息安全领域中的权威标准，采用多种先进的加密技术保证通信安全；OpenSSL 是著名的开源密码学工具包，是 SSL/TLS 的具体实现。
20. 对称加密只使用一个密钥，运算速度快，密钥必须保密，无法做到安全的密钥交换，常用的有 AES 和 ChaCha20；非对称加密使用两个密钥：公钥和私钥，公钥可以任意分发而私钥保密，解决了密钥交换问题但速度慢，常用的有 RSA 和 ECC；把对称加密和非对称加密结合起来就得到了“又好又快”的混合加密，也就是 TLS 里使用的加密方式。
21. 数字签名是私钥对摘要的加密，可以由公钥解密后验证，实现身份认证和不可否认；公钥的分发需要使用数字证书，必须由 CA 的信任链来验证，否则就是不可信的；
22. 保密性：靠混合加密解决，非对称加密实现对称加密秘钥传递，对称加密实现内容加密。
完整性：靠摘要算法解决。
身份认证：靠数字证书解决，数字证书因为CA机构的信任变成一个完整信任链条，从而实现通过数字证书证明了对方真实身份，但注意身份真实也可能是挂羊头卖狗肉，是一个坏人，所以，有了CRL、OCSP，还有终止信任。
不可否认：靠数字签名解决，内容摘要算法得到摘要，私钥加密摘要，对方使用对应公钥解密，得到摘要，再和自己得到的服务器提供的原文摘要对比，一致说明这个内容就是原服务器提供的，由证书说明了服务器的身份。
关于证书验证：
服务器返回的是证书链（不包括根证书，根证书预置在浏览器中），然后浏览器就可以使用信任的根证书（根公钥）解析证书链的根证书得到一级证书的公钥+摘要验签，然后拿一级证书的公钥解密一级证书拿到二级证书的公钥和摘要验签，再然后拿二级证书的公钥解密二级证书得到服务器的公钥和摘要验签，验证过程就结束了。
23. HTTPS 协议会先与服务器执行 TCP 握手，然后执行 TLS 握手，才能建立安全连接；握手的目标是安全地交换对称密钥，需要三个随机数，第三个随机数“Pre-Master”必须加密传输，绝对不能让黑客破解；“Hello”消息交换随机数，“Key Exchange”消息交换“Pre-Master”；“Change Cipher Spec”之前传输的都是明文，之后都是对称密钥加密的密文。
24. 为了兼容 1.1、1.2 等“老”协议，TLS1.3 会“伪装”成 TLS1.2，新特性在“扩展”里实现；1.1、1.2 在实践中发现了很多安全隐患，所以 TLS1.3 大幅度删减了加密算法，只保留了 ECDHE、AES、ChaCha20、SHA-2 等极少数算法，强化了安全；TLS1.3 也简化了握手过程，完全握手只需要一个消息往返，提升了性能。
25. **HTTP/2 使用“HPACK”算法压缩头部信息，消除冗余数据节约带宽；HTTP/2 的消息不再是“Header+Body”的形式，而是分散为多个二进制“帧”；HTTP/2 使用虚拟的“流”传输消息，解决了困扰多年的“队头阻塞”问题，同时实现了“多路复用”，提高连接的利用率；HTTP/2 也增强了安全性，要求至少是 TLS1.2，而且禁用了很多不安全的密码套件**。
26. HTTP/2 必须先发送一个“连接前言”字符串，然后才能建立正式连接；HTTP/2 废除了起始行，统一使用头字段，在两端维护字段“Key-Value”的索引表，使用“HPACK”算法压缩头部；HTTP/2 把报文切分为多种类型的二进制帧，报头里最重要的字段是流标识符，标记帧属于哪个流；流是 HTTP/2 虚拟的概念，是帧的双向传输序列，相当于 HTTP/1 里的一次“请求 - 应答”；在一个 HTTP/2 连接上可以并发多个流，也就是多个“请求 - 响应”报文，这就是“多路复用”。
27. **HTTP/3 基于 QUIC 协议，完全解决了“队头阻塞”问题，弱网环境下的表现会优于 HTTP/2；QUIC 是一个新的传输层协议，建立在 UDP 之上，实现了可靠传输；QUIC 内含了 TLS1.3，只能加密通信，支持 0-RTT 快速建连；QUIC 的连接使用“不透明”的连接 ID，不绑定在“IP 地址 + 端口”上，支持“连接迁移”；QUIC 的流与 HTTP/2 的流很相似，但分为双向流和单向流；HTTP/3 没有指定默认端口号，需要用 HTTP/2 的扩展帧“Alt-Svc”来发现。**
28. HTTP/2 完全兼容 HTTP/1，是“更安全的 HTTP、更快的 HTTPS”，头部压缩、多路复用等技术可以充分利用带宽，降低延迟，从而大幅度提高上网体验；TCP 协议存在“队头阻塞”，所以 HTTP/2 在弱网或者移动网络下的性能表现会不如 HTTP/1；