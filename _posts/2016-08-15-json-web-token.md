---
layout: post
title:  "适用于前后端分离的下一代认证机制 —— JSON Web Token（译）"
categories: translations
tags: [jwt, authorization]
author: 孙继祖（译）
---

* 英文原文：[JSON Web Token 官网](https://jwt.io/introduction/)
* 延伸阅读
  - [JSON Web Token - 在Web应用间安全地传递信息
](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)
  - [Auth0 - Vue.js JWT Authentication](https://github.com/auth0-blog/vue-jwt-authentication)
  - [Auth0 - NodeJS JWT Authentication sample](https://github.com/auth0-blog/nodejs-jwt-authentication-sample)

译者注：最近在研究，前后端分离情况下，如何更安全地实现用户登录。偶然间发现了JWT这个标准，感觉官网讲的很详细，因此翻译了官网的介绍文章[https://jwt.io/introduction/](https://jwt.io/introduction/)

# JSON Web Token是什么？

JSON Web Token (JWT)是一种开放标准（[RFC 7519](https://tools.ietf.org/html/rfc7519)）（译者注：该RFC标准比较通俗易懂，建议进一步阅读），其中定义了一种紧凑 (compact) 且自包含(self-contained)（译者注：指的是在payload里包含更多的信息）的方式用于以JSON对象的形式在多方之间传递信息。信息可以被核实和信任，因为它经过了数字签名。JWT既可以使用密钥（采用**HMAC**算法），也可以使用公私钥（采用**RSA**算法）进行签名。

我们首先来更进一步解释一下本定义中的几个概念：
- **紧凑的（compact）**：因为JWT更短小，所以它可以通过URL、POST参数，或存于HTTP头部发送。此外，体积小意味着传输更快。
- **自包含（self-contained）**：有效载荷（payload）（译者注：通俗来讲，就是通信中实际需要传输的内容）中包含了与用户相关的所有必需信息，避免多次进行数据库查询。
# 为什么要使用JSON Web Token？

以下是JSON Web Token的一些有效应用场景：
- **身份验证（Authentication）**：这是使用JWT的最主要场景。一旦用户登录成功，每次后续的请求头包含了JWT，允许用户使用获得的令牌（token）来访问路由（routes）、服务和资源。单点登录（Single Sign On）是如今广泛使用JWT实现的一个特性，因为它具有短有效负载、便于跨域等优点。
- **信息交换**：JSON Web Token是一种在多方间安全传输信息的办法。由于经过了签名（signed），例如使用公私密钥对，因此你可以确信发送方确实是他自己。另外，由于签名是由头部和有效载荷进行计算而得到的，所以你可以验证信息是否被篡改过。
# JSON Web Token的结构是怎样的？

JSON Web Token包含了3个部分，使用点（.）进行分隔，它们是：
- 头部（Header）
- 有效负荷（Payload）
- 签名（Signature）

因此，一个JWT通常长这样：

`xxxxx.yyyy.zzzz`

让我们来拆解这几部分。
### 头部

头部通常包含两部分：令牌（token）类型，即`JWT`，以及使用的哈希算法，可以是`HMAC SHA256`或者`RSA`
例如

```
{
    "alg": "HS256",
    "typ": "JWT"
}
```

然后，这个JSON通过 **Base64Url** 编码为JWT的第一部分。
## 负荷

令牌的第二部分是负荷，包含了声明（claims）。声明是对于单个实体（entity，通常是用户）的叙述，以及其他的元数据。有三种类型的声明：保留（reserved）声明、公有声明（public）和私有（private）声明。
- 保留声明：这是一些预定义的声明，虽然不强制，但推荐使用，用以提供一组有用的、可互操作的（interoperable）的声明。其中一些包括：iss（issuer，发行人），exp（expiration time，过期时间），sub（subject，主题），aud（audience，受众）等。
  
  > 注意：声明名仅含3个字母，以便使JWT更加紧凑
- 公有声明：这些是使用JWT的那些标准化组织根据需要定义的。但是为了避免冲突，这些公有声明应该定义在IANA JSON Web Token Registry，或者被定义为URI，其中应包含避免冲突的命名空间（a collision resistant namespace）。（译者注：可参考http://www.iana.org/assignments/jwt/jwt.xhtml）
- 私有声明：这些是自定义的声明，用于在达成共识的多方之间共享信息。

负荷的一个例子如下：

```
{
    "sub": "123456789",
    "name": "John Doe",
    "admin": true
}
```

负载部分通过 **Base64Url** 编码为JWT的第二部分。
## 签名

为了创建签名，你需要利用编码后的头部、编码后的负荷、密钥、以及头部所规定的算法，进行签名。

例如，如果你想使用HMAC SHA256算法，签名将采用如下方式创建：

```
HMACSHA256(
    base64UrlEncode(header) + "." + 
    base64UrlEncode(payload), 
    secret)
```

签名用来校验JWT的发送方属实，以及确认消息在传递途中没有被更改。
## 放到一起

输出是3个Base64字符串，使用点符号分隔，能够轻松地在HTML和HTTP环境下传递，同时跟基于XML的标准如SAML相比更加紧凑。
下方展示了一个JWT，包含了上文中的头部、负荷，以及通过密钥进行的签名：

![encoded-jwt3](https://cloud.githubusercontent.com/assets/4011348/17654113/0004387e-62d2-11e6-9bbb-88a4c62e789a.png)

如果你想感受一下，并将概念付诸实践，你可以使用 [jwt.io Debugger](http://jwt.io/) 来解码，校验和生成JWT。
![legacy-app-auth-5](https://cloud.githubusercontent.com/assets/4011348/17654118/0a69b898-62d2-11e6-99a0-cdc12971d628.png)
# JSON Web Token 是如何工作的？

在身份验证中，当用户成功地使用它们的密码登录后，一个JSON Web Token就会被服务器返回，且必须存储于客户端本地（通常存于localStorage，也可以使用cookie存储），而不是传统做法中在服务器创建一个session，并返回一个cookie。

无论何时用户想要访问一个受保护的路由或资源，客户端应该随请求一起发送JWT。JWT通常在 **Authentication** HTTP头部中，使用 **Bearer** 格式（schema）存放。HTTP头部的内容可能长这样：

```
Authorization: Bearer <token>
```

这是一个无状态（stateless）的认证机制，因为用户状态并未存放在服务器内存中。服务器的受保护路由会在`Authentication`头部中检查是否存在合法的JWT，如果存在，用户就被允许访问受保护的资源。JWT是自包含的，所以相关的信息都在里面，减少了多次查询数据库的必要。

这让你充分可以依赖无状态的数据API，甚至向下游服务发出请求。哪个域名提供API无所谓，所以跨域资源共享（CORS，Cross-Origin Resource Sharing）不会引起麻烦，因为JWT不使用cookie。

下图展示了这个过程：
![jwt-diagram](https://cloud.githubusercontent.com/assets/4011348/17654120/15ae01fa-62d2-11e6-8ff4-b34005639fee.png)
# 为什么你要使用JSON Web Token?

我们来讨论一下，跟**Simple Web Token(SWT)** 和 **Security Assertion Markup Language Tokens (SAML)**相比，**JSON Web Tokens (JWT)** 有什么优势。

由于 JSON 比 XML 更简洁，所以编码它的体积更小，使 JWT 比SAML更紧凑。这使得JWT成为HTML和HTTP环境下进行传输的一个更好选择。

安全性方面，SWT 只能使用共享的密钥进行对等签名，但JWT和SAML令牌都可以使用公私密钥对，以X.509证书的形式进行签名。不引入数字签名却不引入隐晦的安全漏洞是很困难的，特别是与JSON签名的简洁性相比。

JSON解析器在大多数编程语言中都很常见，因为它们直接与对象映射。相反，XML并没有自然的"文档-对象"的映射。这使得JWT比SAML更容易操作。

在使用广泛性方面，JWT可以用于因特网级别，特别是减轻了多平台客户端，特别是移动端，方面对JSON Web Token的处理难度。

# Auth0给出的例子：
- 客户端 Vue.js: <https://github.com/auth0-blog/vue-jwt-authentication>
- 服务器端 Node.js: <https://github.com/auth0-blog/nodejs-jwt-authentication-sample>

# 中文其他文章：
- <http://blog.leapoahead.com/2015/09/06/understanding-jwt/>
- <http://www.haomou.net/2014/08/13/2014_web_token/>


