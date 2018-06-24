---
layout: post
title:  "Web Development: Fundamentals"
categories: readings
---

## Interview Collections
- <https://github.com/fejes713/30-seconds-of-interviews>
- <https://github.com/Chalarangelo/30-seconds-of-code>
- <https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions>
- <https://github.com/trekhleb/javascript-algorithms>
- <https://github.com/h5bp/Front-end-Developer-Interview-Questions>
- <https://github.com/vvscode/js--interview-questions>

## Same-origin policy & Cross-Origin Resource Sharing

- Definition of *an origin* ([RFC6514][rfc6514], Section 4)
    + the protocol (URI scheme)
    + the port (port number )
    + the host (host name)
- Why:
    + The same-origin policy helps protect sites that use authenticated sessions. [Wikipedia][wikipedia same origin policy]
- Inherited origins
- IE Exceptions
- Change origin: set `document.domain` to its current domain or a superdomain of its current domain
- The same-origin policy controls interactions of 3 categories:
    + Cross-origin writes
    + Cross-origin embedding
    + Cross-origin reads
- References
    + [Google Web Fundamentals: Content Security Policy][google csp]
    + [MDN: Same-origin policy][mdn same origin policy]
    + [MDN: Cross-Origin Resource Sharing (CORS)][mdn cors]
    
[google csp]: https://developers.google.com/web/fundamentals/security/csp/
[mdn same origin policy]: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
[mdn cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[rfc6514]: https://tools.ietf.org/html/rfc6454
[wikipedia same origin policy]: https://en.wikipedia.org/wiki/Same-origin_policy

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


