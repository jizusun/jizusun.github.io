---
layout: post
title:  "[Excerpt]: JavaScript: The Good Parts"
categories: drafts
---



## Table of Content
{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

## Preface

## Good Parts



## Grammer

## Objects

## Functions

### Function Objects

### Function Literal

### Invocation

### Arguments

### Return

### Exceptions

### Augmenting Types


```js
// Add a method conditionally.

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};
```

### Recursion

### Scope

### Closure

### Callbacks

### Modules

### Cascade

### Curry

### Memoization



## Inheritance

## Arrays

## Regular Expressions

## Methods

## Style

## Beautiful Features

