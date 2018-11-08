---
layout: post
title:  "Stack Overflow Collections"
categories: drafts
---


[📝 Edit this post](https://github.com/jizusun/jizusun.github.io/edit/master/_posts/2018-10-24-stackoverflow-collections.md)

## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}



## JavaScript

<https://stackoverflow.com/questions/tagged/javascript?sort=votes&pageSize=15>

### How to display all methods of an object? (206 votes)

<https://stackoverflow.com/questions/2257993/how-to-display-all-methods-of-an-object>

```js
// 
Object.getOwnPropertyNames(Array)
// (6) ["length", "name", "prototype", "isArray", "from", "of"]
Object.getOwnPropertyNames([])
// ["length"]
Object.getOwnPropertyNames(Array.prototype)
// (31) ["length", "constructor", "concat", "find", "findIndex", "pop", "push", "shift", "unshift", "slice", "splice", "includes", "indexOf", "keys", "entries", "forEach", "filter", "map", "every", "some", "reduce", "reduceRight", "toString", "toLocaleString", "join", "reverse", "sort", "lastIndexOf", "copyWithin", "fill", "values"]
```

### Get the name of an object's type (1027 votes)

<https://stackoverflow.com/questions/332422/get-the-name-of-an-objects-type>

### A function to print prototype chain for a given object (9 votes)

<https://stackoverflow.com/questions/22168033/a-function-to-print-prototype-chain-for-a-given-object>

A tool for visualizing and experimenting with JavaScript object relationships: <http://www.objectplayground.com/>


### Plain object is not iterable (57 votes)
- <https://stackoverflow.com/questions/29886552/why-are-objects-not-iterable-in-javascript>

```js
var obj = {aa: 'bb', cc: 'dd'}
// undefined
[...obj]
// VM514:1 Uncaught TypeError: obj is not iterable
//    at <anonymous>:1:5
```

- <http://exploringjs.com/es6/ch_iteration.html#sec_plain-objects-not-iterable>


### TC39 Process (96 votes)

<https://stackoverflow.com/questions/37251552/whats-the-difference-between-babel-preset-stage-0-babel-preset-stage-1-etc>
- <https://tc39.github.io/process-document/>
- <http://2ality.com/2015/11/tc39-process.html>



### `arguments` alternative in ES6 arrow functions (33 votes)

<https://stackoverflow.com/questions/41731854/why-do-arrow-functions-not-have-the-arguments-array>

- An ES5 polyfill of `Array.of()`
` : <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of#Polyfill>

    ```js
    if (!Array.of) {
    Array.of = function() {
        return Array.prototype.slice.call(arguments);
    };
    }
    ```
also as:

    ```js
    const arrayOf = (...args) => [].slice.call(args);

    let result = arrayOf(1,3, 5)
    console.log(result)

    ```

### `Array.prototype.map` not working on an array of empty slots (152 votes)

<https://stackoverflow.com/questions/5501581/javascript-new-arrayn-and-array-prototype-map-weirdness>

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array>

> `arrayLength`: If the only argument passed to the Array constructor is an integer between 0 and 232-1 (inclusive), this returns a new JavaScript array with its length property set to that number (Note: this implies an array of arrayLength empty slots, not slots with actual undefined values). If the argument is any other number, a RangeError exception is thrown.

```js
let arr1 = []; arr1.length = 5;
// (5) [empty × 5]
let arr2 = new Array(5)
// (5) [empty × 5]
let arr3 = new Array(5).fill(undefined)
// (5) [undefined, undefined, undefined, undefined, undefined]

```


### How do I test for an empty JavaScript object?

<https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object>


### Spread Syntax vs Rest Parameter in ES2015 / ES6

<https://stackoverflow.com/questions/33898512/spread-syntax-vs-rest-parameter-in-es2015-es6>



### Get the last item in an array (761 votes)

<https://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array>
<https://stackoverflow.com/questions/33064377/destructuring-to-get-the-last-element-of-an-array-in-es6>

```js
// more consise
arr.slice(-1)[0] 
// or more faster, according to https://jsperf.com/slice-vs-length-1-arr
arr[arr.length -1]
```

### What does `void 0` mean? (1091 votes)
<https://stackoverflow.com/questions/7452341/what-does-void-0-mean>
<https://stackoverflow.com/questions/1291942/what-does-javascriptvoid0-mean>


### Copy array by value (1424 votes)

<https://jsperf.com/array-copy/5>
<https://stackoverflow.com/questions/7486085/copy-array-by-value>