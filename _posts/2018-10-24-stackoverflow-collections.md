---
layout: post
title:  "StackOverflow Collections"
categories: drafts
---

## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

<https://github.com/jizusun/jizusun.github.io/edit/master/_posts/2018-10-24-stackoverflow-collections.md>

## JavaScript

### How to display all methods of an object? (206 votes)

<https://stackoverflow.com/questions/2257993/how-to-display-all-methods-of-an-object>

```js
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
