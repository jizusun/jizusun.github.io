---
layout: post
title:  "Web Development: Fundamentals"
categories: readings
---

# Contents header
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## Web Security

### Same-origin policy & Cross-Origin Resource Sharing

- Definition of *an origin* ([RFC6514][rfc6514], Section 4)
    + the protocol (URI scheme)
    + the port (port number )
    + the host (host name)
- Why:
    + The same-origin policy helps protect sites that use authenticated sessions. [Wikipedia: Same-origin policy][wikipedia same origin policy]
- Inherited origins
- IE Exceptions
- Change origin: set `document.domain` to its current domain or a superdomain of its current domain
- The same-origin policy controls interactions of 3 categories:
    + Cross-origin writes
    + Cross-origin embedding
    + Cross-origin reads
- Relaxing the same-origin policy
    + `document.domain`
    + CORS
    + Cross-document messaging
    + JSONP
    + WebSockets
- Broadly, one origin **is permitted to send** information to another origin, but one origin **is not permitted to receive** information from another origin.[W3C: Same Origin Policy][w3c same origin policy]
- Cross-Origin Resource Sharing (CORS)
    + [Whatwg: Fetch Spec][whatwg fetch spec]
    + uses additional HTTP headers to tell a browser to ...
        * a new `Origin` request header, which cannot be changed programmatically
        * a new `Access-Control-Allow-Origin` response header
- References
    + [Google Web Fundamentals: Content Security Policy][google csp]
    + [MDN: Same-origin policy][mdn same origin policy]
    + [MDN: Cross-Origin Resource Sharing (CORS)][mdn cors]

    
[google csp]: https://developers.google.com/web/fundamentals/security/csp/
[mdn same origin policy]: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
[mdn cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[rfc6514]: https://tools.ietf.org/html/rfc6454
[wikipedia same origin policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[w3c same origin policy]: https://www.w3.org/Security/wiki/Same_Origin_Policy
[whatwg fetch spec]: https://fetch.spec.whatwg.org/#http-cors-protocol

## 什么时候会遇到跨域问题（除了域名不一样的情况下？）

## 模块（Require.js ， ES6 Module, Common.js Module）

## 如何优化页面加载时间

## Event Loop: setTimeout / nextTick

## HTTP Method 区别

## doctype 的区别

## cookie 和 session 的区别

## 从输入浏览器网址到用户看到页面，中间发生了什么

## null 和 undefined 的区别
- they are all JavaScript's primitive values
variables that aren't 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null

## querySelectorAll


## Interview Collections
- <https://github.com/fejes713/30-seconds-of-interviews>
- <https://github.com/Chalarangelo/30-seconds-of-code>
- <https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions>
- <https://github.com/trekhleb/javascript-algorithms>
- <https://github.com/h5bp/Front-end-Developer-Interview-Questions>
- <https://github.com/vvscode/js--interview-questions>

